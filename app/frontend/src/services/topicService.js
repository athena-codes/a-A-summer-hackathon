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
const checkTopicProgression = async (userId, topicId, isPassing) => {
    // topicId from deck
    // passes from attempt

    console.log('topicId: ', topicId, 'isPassing: ', isPassing, 'userId: ', userId)

    try {
        const userProgressRef = doc(db, 'progress', userId);
        const conceptsCollectionRef = collection(userProgressRef, 'concepts');
        const conceptsSnapshot = await getDocs(conceptsCollectionRef);

        for (const conceptDoc of conceptsSnapshot.docs) {
            const conceptData = conceptDoc.data();
            //console.log('conceptData: ', conceptData);

            // Create a new array with updated topics
            const updatedTopics = conceptData.topics.map(topic => {
                if (topic.id === topicId) {
                    const passes = isPassing ? topic.passes + 1 : 0;
                    return {
                        ...topic, // Keep all other properties of the topic unchanged
                        passes: passes, // Update the passes value
                        status: passes >= 3 // Update the status if passes is 3 or more
                    };
                }
                return topic; // Return the topic unchanged if the id does not match
            });
            console.log('updatedTopics: ', updatedTopics);
            // Update the document with the modified topics array
            await updateDoc(conceptDoc.ref, { topics: updatedTopics });
        }
    } catch (error) {
        throw new Error('Error checking topic progression: ' + error.message);
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
