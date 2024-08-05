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
const createDeckInDB = async ({ topic_id, createdAt, archived }) => {
    try {
        const docRef = await addDoc(collection(db, 'decks'), {
            topic_id,
            createdAt,
            archived
        });
        const deck = { id: docRef.id, topic_id, createdAt, archived };
        return deck;
    } catch (error) {
        throw new Error('Error creating deck: ' + error.message);
    }
};

//service to add a card to a deck
const addCardToDeckInDB = async () => {
    try {
        const deck = []
        //call ai route to request a card
        //while loop? until deck is full (10 cards)
        return deck
    } catch (error) {
        throw new Error('Error adding card to deck: ' + error.message);
    }
}

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
    createDeckInDB, addCardToDeckInDB,
    removeCardFromDeckInDB, removeDeckFromDB,
    archiveDeckInDB, getArchivedDecksFromDB,
    getUserArchivedDecksFromDB, getDeckFromDB
};
