const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where, Timestamp, setDoc } = require('firebase/firestore');

//service to view all decks
const getDecksFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'decks'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching decks: ' + error.message);
    }
}

const getDecksByTopicIdFromDB = async (topicId) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'decks'), where('topic_id', '==', topicId)));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching decks: ' + error.message);
    }
}

//service to view a deck
const getDeckFromDB = async (deckId) => {
    try {
        const docRef = doc(db, 'decks', deckId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Deck not found');
        }
    } catch (error) {
        throw new Error('Error fetching deck: ' + error.message);
    }
}

//service to create a deck (empty)
const createDeckInDB = async ({ userId, topic_id, createdAt, archived }) => {
    console.log('userId: ', userId, 'topic_id: ', topic_id, 'createdAt: ', createdAt, 'archived: ', archived)
    try {
        const topicRef = doc(db, 'topics', topic_id);
        const topicDoc = await getDoc(topicRef);

        if (!topicDoc.exists()) {
            throw new Error('Topic not found');
        }
        let conceptId = topicDoc.data().concept_id;
        console.log('conceptId: ', conceptId)
        const conceptRef = doc(db, 'concepts', conceptId);
        const conceptDoc = await getDoc(conceptRef);
        if (!conceptDoc.exists()) {
            throw new Error('Concept not found');
        }
        console.log('hit here', conceptDoc.data().level)
        const level = conceptDoc.data().level
        const docRef = await addDoc(collection(db, 'decks'), {
            userId,
            level,
            topic_id,
            createdAt,
            archived
        });
        const deck = { id: docRef.id, level, userId: userId, topic_id: topic_id, createdAt, archived };
        console.log('deck check: ', deck)
        return deck;
    } catch (error) {
        throw new Error('Error creating deck: ' + error.message);
    }
};

//service to add cards to a deck
const addCardsToDeckInDB = async (deckId, userId, aiGeneratedRequestId) => {
    try {
        const deck = [];
        const userRef = doc(db, 'users', userId);
        const deckRef = doc(db, 'decks', deckId);
        const deckDoc = await getDoc(deckRef);
        if (!deckDoc.exists()) {
            throw new Error('Deck not found');
        }

        // Reference the specific ai_generated_requests document in the subcollection
        const aiGeneratedRequestRef = doc(db, 'users', userId, 'ai_generated_requests', aiGeneratedRequestId);
        const aiGeneratedRequestDoc = await getDoc(aiGeneratedRequestRef);
        if (!aiGeneratedRequestDoc.exists()) {
            throw new Error('AI Generated Request not found');
        }

        const questionData = aiGeneratedRequestDoc.data().questionData;
        const deckLevel = deckDoc.data().level;
        const deckTopicId = deckDoc.data().topic_id;

        const topicRef = doc(db, 'topics', deckTopicId);
        const topicDoc = await getDoc(topicRef);
        if (!topicDoc.exists()) {
            throw new Error('Topic not found');
        }
        const topicName = topicDoc.data().topic_name;

        // Check if the question data matches the deck's topic and level
        if (questionData.topic === topicName && questionData.level === deckLevel) {
            deck.push(aiGeneratedRequestDoc.data());
        }

        // Update the deck with the new cards
        await setDoc(deckRef, { ...deckDoc.data(), cards: deck }, { merge: true });

        return deck;
    } catch (error) {
        throw new Error('Error adding card to deck: ' + error.message);
    }
};

// const addCardsToDeckInDB = async (deckId, userId) => {
//     try {
//         const deck = [];
//         const userRef = doc(db, 'users', userId);
//         const deckRef = doc(db, 'decks', deckId);
//         const deckDoc = await getDoc(deckRef);
//         if (!deckDoc.exists()) {
//             throw new Error('Deck not found');
//         }

//         const topicRef = doc(db, 'topics', deckDoc.data().topic_id);
//         console.log('topicRef: ', topicRef);
//         const topicDoc = await getDoc(topicRef);
//         if (!topicDoc.exists()) {
//             throw new Error('Topic not found');
//         }
//         const level = deckDoc.data().level;
//         const topic_name = topicDoc.data().topic_name;
//         const aiGeneratedRequestsRef = collection(userRef, "ai_generated_requests");
//         //check ai_generated_id, then check topic/level
//         console.log('topic_name: ', topic_name, 'level: ', level)
//         const snapshot = await getDocs(aiGeneratedRequestsRef);
//         console.log('snapshot: ', snapshot.docs);
//         snapshot.docs.map(doc => {
//             console.log('doc: ', doc.data());
//             if (doc.data().questionData.topic === topic_name && doc.data().questionData.level === level) {
//                 console.log('inside if statement: ', doc.data());
//                 deck.push(doc.data());
//             }
//         })
//         console.log('deck: ', deck);
//         //we look for the deck in the db and add the deck

//         await setDoc(deckRef, { userId: userId, cards: deck });
//         return deck;
//     } catch (error) {
//         throw new Error('Error adding card to deck: ' + error.message);
//     }
// }

//service to remove a card from a deck
const removeCardFromDeckInDB = async () => {
    return
}

//service to remove a deck
const removeDeckFromDB = async () => {
    return
}

//service to archive a deck
const archiveDeckInDB = async (deckId, uid) => {
    try {
        // Update the deck's archived status in the main collection
        const deckRef = doc(db, 'decks', deckId);
        await updateDoc(deckRef, { archived: true });

        // Get the deck data
        const deckDoc = await getDoc(deckRef);
        if (!deckDoc.exists()) {
            throw new Error('Deck not found');
        }
        const deckData = deckDoc.data();

        // Add the deck to the user's subcollection
        const userDecksCollectionRef = collection(doc(db, 'users', uid), 'decks');
        await setDoc(doc(userDecksCollectionRef, deckId), deckData);

        return true;
    } catch (error) {
        throw new Error('Error archiving deck: ' + error.message);
    }
};


//service to view archived decks
const getArchivedDecksFromDB = async () => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'decks'), where('archived', '==', true)));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching archived decks: ' + error.message);
    }
}

//service to view user archived decks
const getUserArchivedDecksFromDB = async (uid) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error('User not found');
        }
        const userDecksCollectionRef = collection(userDocRef, 'decks');

        const userDecksSnapshot = await getDocs(userDecksCollectionRef);
        const userDecks = userDecksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userDecks;
    } catch (error) {
        throw new Error('Error fetching user archived decks: ' + error.message);
    }
}


module.exports = {
    getDecksFromDB, getDecksByTopicIdFromDB,
    createDeckInDB, addCardsToDeckInDB,
    removeCardFromDeckInDB, removeDeckFromDB,
    archiveDeckInDB, getArchivedDecksFromDB,
    getUserArchivedDecksFromDB, getDeckFromDB
};
