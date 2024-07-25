const { db } = require('../firebase/firebase');
const { collection, addDoc, getDocs } = require('firebase/firestore');

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

module.exports = { addUserToDB, getUsersFromDB };
