const { db } = require('../firebase/firebaseConfig');
const { increment, collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where } = require('firebase/firestore');
const { getDeckFromDB } = require('./deckService');
const { getDeck } = require('../controllers/deckController');

//Service to view all user attempts
const getUserAttemptsFromDB = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userAttemptsRef = collection(userRef, 'attempts');
        console.log('userAttemptsRef: ', userAttemptsRef);
        const userAttemptsSnapshot = await getDocs(userAttemptsRef);
        const userAttempts = userAttemptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userAttempts;
    } catch (error) {
        throw new Error('Error fetching user attempts: ' + error.message);
    }
}

//Service to add user attempt; call this service after user starts a deck
const AddUserAttemptToDB = async (attemptData, id) => {
    try {
        //attempt data = grab json data from frontend, its passed thru this and if it matches
        //with correct answer, add +1 to pass count for this attempt
        console.log('attemptData: ', attemptData);
        const userDocRef = doc(db, 'users', id);
        const userAttemptsRef = collection(userDocRef, 'attempts')
        const docRef = await addDoc(userAttemptsRef, attemptData);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        throw new Error('Error adding user attempt: ' + error.message);
    }
}

const checkAnswerInDB = async (userId, id, attemptId, answer, deckId) => {
    try {
        const attemptDocRef = doc(db, 'users', userId, 'attempts', attemptId);
        const attemptDoc = await getDoc(attemptDocRef);
        const deckDocRef = doc(db, 'decks', deckId);
        const deckDoc = await getDoc(deckDocRef);

        // Ensure attemptDoc and deckDoc exist
        if (!attemptDoc.exists()) {
            throw new Error('Attempt not found');
        }
        if (!deckDoc.exists()) {
            throw new Error('Deck not found');
        }

        const deckData = deckDoc.data();
        const attemptData = attemptDoc.data();

        // Find the specific question in the cards array
        const questionIndex = deckData.cards[0].questionData.jsonData.findIndex(q => q.id === id);
        if (questionIndex === -1) {
            throw new Error('Question not found');
        }

        const correctAnswer = deckData.cards[0].questionData.jsonData[questionIndex].answer;
        const checkIfAttempted = deckData.cards[0].questionData.jsonData[questionIndex].isAttempted;

        if (checkIfAttempted === true) {
            throw new Error('Question already attempted');
        }

        if (answer === correctAnswer) {
            // Mark the question as attempted
            deckData.cards[0].questionData.jsonData[questionIndex].isAttempted = true;

            // Update the deck document in Firestore with the modified cards array
            await updateDoc(deckDocRef, {
                cards: deckData.cards,  // Update the entire cards array
            });

            // Increment the passes count in the attempt document
            await updateDoc(attemptDocRef, { passes: increment(1) });

            return { message: 'Answer is correct!' };
        } else {
            return { message: 'Answer is incorrect.', correctAnswer };
        }
    } catch (error) {
        throw new Error('Error checking answer: ' + error.message);
    }
};



//Service to update user attempt
const updateUserAttemptInDB = async (uid, attemptId, updateData) => {
    try {
        const attemptDocRef = doc(db, 'users', uid, 'attempts', attemptId);
        await updateDoc(attemptDocRef, updateData);
        console.log('Attempt updated:', attemptId);
    } catch (error) {
        throw new Error('Error updating user attempt: ' + error.message);
    }
};


//Service to end user attempt (session end)
const endUserAttemptInDB = async (uid, attemptId) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const attemptDocRef = doc(userDocRef, 'attempts', attemptId);
        await updateDoc(attemptDocRef, { status: 'ended', endTime: new Date() });
        console.log('User attempt ended');
    } catch (error) {
        throw new Error('Error ending user attempt: ' + error.message);
    }
}


module.exports = { checkAnswerInDB, getUserAttemptsFromDB, AddUserAttemptToDB, updateUserAttemptInDB, endUserAttemptInDB };
