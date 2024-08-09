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
        const deckData = await getDeckFromDB(deckId);

        // Ensure attemptDoc exists and has data
        if (!attemptDoc.exists()) {
            throw new Error('Attempt not found');
        }

        const attemptData = attemptDoc.data();
        console.log('attemptData: ', attemptData);

        const correctAnswer = deckData.cards[0].questionData.jsonData[id].answer
        const checkIfAttempted = deckData.cards[0].questionData.jsonData[id].isAttempted
        console.log('checkIfAttempted: ', checkIfAttempted);
        if (checkIfAttempted === true) {
            throw new Error('Question already attempted');
        }

        console.log('correctAnswer: ', correctAnswer);
        // Ensure correctAnswer is defined
        if (correctAnswer === undefined) {
            throw new Error('Correct answer is not defined in the database');
        }

        if (answer === correctAnswer) {
            // Mark the question as attempted in the local deckData
            deckData.cards[0].questionData.jsonData[id].isAttempted = true;

            // Update the deck document in Firestore to reflect this change
            const deckDocRef = doc(db, 'decks', deckId);
            console.log('deckDocRef: ', deckDocRef);
            await updateDoc(deckDocRef, {
                [`cards[0].questionData.jsonData.${id}.isAttempted`]: true,
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
}

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
