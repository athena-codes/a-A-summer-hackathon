const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, Timestamp } = require('firebase/firestore');
// Function to create a new session
const createSessionToDB = async (userId) => {
    try {
        const sessionRef = collection(db, 'sessions');
        const newSession = {
            user_id: userId,
            session_date: Timestamp.now(),
            progress: {}
        };

        const sessionDoc = await addDoc(sessionRef, newSession);
        console.log('Session created with ID:', sessionDoc.id);
        return sessionDoc.id;
    } catch (error) {
        console.error('Error creating session:', error);
    }
};

const updateSessionProgressInDB = async (sessionId, conceptId, topicId, status) => {
    try {
        const sessionDocRef = doc(db, 'sessions', sessionId);

        const progressUpdate = {
            [`progress.${conceptId}.topics.${topicId}.status`]: status
        };

        await updateDoc(sessionDocRef, progressUpdate);
        console.log('Session progress updated successfully');
    } catch (error) {
        console.error('Error updating session progress:', error);
    }
};

const getSessionProgressFromDB = async (sessionId, conceptId, topicId) => {
    try {
        const sessionDocRef = doc(db, 'sessions', sessionId);
        const sessionDoc = await getDoc(sessionDocRef);
        if (sessionDoc.exists()) {
            const sessionData = sessionDoc.data();
            if (sessionData.progress[conceptId] && sessionData.progress[conceptId].topics[topicId]) {
                return sessionData.progress[conceptId].topics[topicId].status;
            }
        }
    } catch (error) {
        console.error('Error getting session progress:', error);
    }
};

const endSessionInDB = async (sessionId, userId) => {
    try {
        const sessionDocRef = doc(db, 'sessions', sessionId);
        const sessionSnap = await getDoc(sessionDocRef);

        if (!sessionSnap.exists()) {
            throw new Error('Session not found');
        }

        const sessionData = sessionSnap.data();

        const userProgressRef = doc(db, 'progress', userId);
        const userProgressSnap = await getDoc(userProgressRef);

        if (userProgressSnap.exists()) {
            const userProgressData = userProgressSnap.data();

            // Merge session progress into user progress
            const updatedProgress = { ...userProgressData, ...sessionData.progress };

            await updateDoc(userProgressRef, updatedProgress);
            console.log('User progress updated successfully');
        } else {
            // Create new progress document if it doesn't exist
            await setDoc(userProgressRef, { progress: sessionData.progress });
            console.log('User progress created successfully');
        }
    } catch (error) {
        console.error('Error ending session:', error);
    }
};


module.exports = {
    createSessionToDB,
    updateSessionProgressInDB,
    getSessionProgressFromDB,
    endSessionInDB
};
