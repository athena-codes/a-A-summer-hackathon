const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where, setDoc } = require('firebase/firestore');

// Service to add a user
const addUserToDB = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, 'users'), userData);
        return docRef.id;
    } catch (error) {
        throw new Error('Error adding user: ' + error.message);
    }
};

// Service to get users from DB
const getUsersFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// Service to update a user
const updateUserInDB = async (uid, updatedData) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, updatedData);
        return true;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Service to get a user by id
const getUserByIdFromDB = async (id) => {
    try {
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

// Service to get user progress
const getProgressFromDB = async (uid) => {
    try {
        const q = query(collection(db, 'user_progress'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching progress: ' + error.message);
    }
};

// Service to add progress
const addProgressToDB = async (progressData) => {
    try {
        const docRef = await addDoc(collection(db, 'user_progress'), progressData);
        return docRef.id;
    } catch (error) {
        throw new Error('Error adding progress: ' + error.message);
    }
};

module.exports = {
    addUserToDB,
    getUsersFromDB,
    updateUserInDB,
    getUserByIdFromDB,
    getProgressFromDB,
    addProgressToDB
};
