const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where } = require('firebase/firestore');

const getAllUserLevelsFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));

        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return users.map(user => {
            return { id: user.id, current_level: user.current_level };
        })
    } catch (error) {
        throw new Error('Error fetching user levels: ' + error.message);
    }
}

const getUserLevelFromDB = async (uid) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        return { id: uid, username: userDoc.data().username, current_level: userDoc.data().current_level};

    } catch (error) {
        throw new Error('Error fetching user level: ' + error.message);
    }
}

const checkAndUpdateUserLevel = async (userId, newLevel) => {
    try {
        const userDocRef = doc(db, 'progress', userId);

        // Update the user level if it has changed
        const userLevelDocRef = doc(db, 'users', userId);

        if (newLevel !== userDoc.data().current_level) {
            await updateDoc(userLevelDocRef, { current_level: newLevel });
        }

        console.log(`User level updated to ${newLevel}`);
    } catch (error) {
        console.error('Error checking or updating user level:', error);
    }
};

module.exports = { getAllUserLevelsFromDB, getUserLevelFromDB, checkAndUpdateUserLevel };
