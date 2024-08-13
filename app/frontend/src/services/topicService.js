const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where , deleteDoc } = require('firebase/firestore');

//service to view topics
const getTopicsFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'topics'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching topics: ' + error.message);
    }
};

const getTopicByIdFromDB = async (topicId) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        const topicSnap = await getDoc(topicRef);
        if (topicSnap.exists()) {
            return { id: topicSnap.id, ...topicSnap.data() };
        } else {
            throw new Error('Topic not found');
        }
    } catch (error) {
        throw new Error('Error fetching topic: ' + error.message);
    }
}

//service to check topic progression
const checkTopicProgression = async (topicId, passes) => {
    //use this service to check curr_passes and update status
    //calling this means
    try {
        const topicRef = doc(db, 'topics', topicId);
        await updateDoc(topicRef, { passes });
        const topic = await getDoc(topicRef);
        console.log('passes: ', topic.data().passes)
        const curr_passes = topic.data().passes
        if (curr_passes === 3) {
            await updateDoc(topicRef, { status: true });
        }

    } catch (error) {
        throw new Error('Error updating topic: ' + error.message);
    }
}


const addTopicToDB = async (topicData) => {
    try {
        const docRef = await addDoc(collection(db, 'topics'), topicData);
        return docRef.id;
    } catch (error) {
        throw new Error('Error adding topic: ' + error.message);
    }
}

const updateTopicInDB = async (topicId, updatedData) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        await updateDoc(topicRef, updatedData);
        return true;
    } catch (error) {
        throw new Error('Error updating topic: ' + error.message);
    }
}

const removeTopicFromDB = async (topicId) => {
    try {
        const topicRef = doc(db, 'topics', topicId);
        await deleteDoc(topicRef);
        return true;
    } catch (error) {
        throw new Error('Error removing topic: ' + error.message);
    }
}

module.exports = { getTopicByIdFromDB, getTopicsFromDB, addTopicToDB, updateTopicInDB, removeTopicFromDB, getTopicByIdFromDB, checkTopicProgression };
