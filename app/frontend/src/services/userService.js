const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where, setDoc } = require('firebase/firestore');

// Service to add a user
// const addUserToDB = async (userData) => {
//     try {
//         const docRef = await addDoc(collection(db, 'users'), userData);
//         return docRef.id;
//     } catch (error) {
//         throw new Error('Error adding user: ' + error.message);
//     }
// };

const addUserToDB = async ({ uid, email, username, first_name, last_name, native_language }) => {
    await setDoc(doc(db, 'users', uid), {
        email,
        username,
        first_name,
        last_name,
        native_language,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
};

const setUserLevel = async (uid, level) => {
    await setDoc(doc(db, 'user_levels', uid), {
        current_level: level
    });
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
    console.log('get progress route is hit', uid);
    try {
        const userDocRef = doc(db, 'progress', uid);

        // Access the 'concepts' subcollection
        const conceptsCollectionRef = collection(userDocRef, 'concepts');
        const conceptsSnapshot = await getDocs(conceptsCollectionRef);
        const concepts = conceptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Access the 'topics' subcollection
        const topicsCollectionRef = collection(userDocRef, 'topics');
        const topicsSnapshot = await getDocs(topicsCollectionRef);
        const topics = topicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { uid, concepts, topics };
    } catch (error) {
        throw new Error('Error fetching progress: ' + error.message);
    }
};

// Service to add progress
const updateUserProgressFromDB = async (userId, progressData) => {
    try {
        const userDocRef = doc(db, 'user_progress', userId);

        // Update concepts
        const conceptsCollectionRef = collection(userDocRef, 'concepts');
        for (const concept of progressData.concepts) {
            const conceptDocRef = doc(conceptsCollectionRef, concept.id);
            await setDoc(conceptDocRef, {
            status: concept.status,
            level: concept.level
            }, { merge: true });
        }

        // Update topics
        const topicsCollectionRef = collection(userDocRef, 'topics');
        for (const topic of progressData.topics) {
            const topicDocRef = doc(topicsCollectionRef, topic.id);
            await setDoc(topicDocRef, {
            conceptId: topic.conceptId,
            status: topic.status
            }, { merge: true });
        }

        console.log('User progress updated successfully');
    } catch (error) {
        console.error('Error updating user progress:', error);
    }
};


module.exports = {
    addUserToDB,
    getUsersFromDB,
    updateUserInDB,
    getUserByIdFromDB,
    getProgressFromDB,
    updateUserProgressFromDB,
    setUserLevel
};
