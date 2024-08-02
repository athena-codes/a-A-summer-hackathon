const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where } = require('firebase/firestore');


//Service to view all user attempts
const getUserAttemptsFromDB = async (uid) => {
    try {
        const userAttemptsRef = collection(db, 'attempts');
        const userAttemptsSnapshot = await getDocs(userAttemptsRef);
        const userAttempts = userAttemptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userAttempts;
    } catch (error) {
        throw new Error('Error fetching user attempts: ' + error.message);
    }
}

//Service to add user attempt (session start)
const addUserAttemptToDB = async (attemptData, uid) => {
    try {
        // find user doc based on uid and then add attempt to attemps subcollection
        const userDocRef = doc(db, 'users', uid);
        const docRef = await addDoc(collection(userDocRef, 'attempts'), attemptData);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        throw new Error('Error adding user attempt: ' + error.message);
    }
}

//Service to update user attempt (adding score)
const updateUserAttemptInDB = async (uid, updatedData) => {
    try {
        const userAttemptRef = doc(db, 'attempts', uid);
        await updateDoc(userAttemptRef, updatedData);
        return true;
    } catch (error) {
        throw new Error('Error updating user attempt: ' + error.message);
    }
}

//Service to end user attempt (session end)
const endUserAttemptInDB = async (uid) => {
    try {
        const userAttemptRef = doc(db, 'attempts', uid);
        await updateDoc(userAttemptRef, { end_time: new Date().toISOString() });
        return true;
    } catch (error) {
        throw new Error('Error ending user attempt: ' + error.message);
    }
}

module.exports = { getUserAttemptsFromDB, addUserAttemptToDB, updateUserAttemptInDB, endUserAttemptInDB };
