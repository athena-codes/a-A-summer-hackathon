const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where } = require('firebase/firestore');

const getAllUserLevelsFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'user_levels'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error('Error fetching user levels: ' + error.message);
    }
}

const getUserLevelFromDB = async (uid) => {
    console.log('get user level route is hit', uid);
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error('User not found');
        }
        //use userDoc to find user_level in DB
        const userLevelDocRef = doc(db, 'user_levels', userDoc.id);
        const userLevelDoc = await getDoc(userLevelDocRef);

        if (!userLevelDoc.exists()) {
            throw new Error('User level not found');
        }

        return { uid, ...userDoc.data(), ...userLevelDoc.data() };
    } catch (error) {
        throw new Error('Error fetching user level: ' + error.message);
    }
}

const checkAndUpdateUserLevel = async (userId) => {
    try {
        const userDocRef = doc(db, 'progress', userId);

        // Query to get all concepts and their topic completion status
        const conceptsCollectionRef = collection(userDocRef, 'concepts');
        const topicsCollectionRef = collection(userDocRef, 'topics');

        const conceptsSnapshot = await getDocs(conceptsCollectionRef);
        let passedConceptsCount = 0;

        for (const conceptDoc of conceptsSnapshot.docs) {
            const conceptId = conceptDoc.id;
            const topicsQuery = query(topicsCollectionRef, where("conceptId", "==", conceptId));
            const topicsSnapshot = await getDocs(topicsQuery);

            const totalTopics = topicsSnapshot.size;
            const passedTopics = topicsSnapshot.docs.filter(doc => doc.data().status === true).length;

            // Check if 80% of the topics are passed
            if (passedTopics / totalTopics >= 0.8) {
                // Mark the concept as passed if not already passed
                if (!conceptDoc.data().status) {
                    await updateDoc(conceptDoc.ref, { status: true });
                }
                passedConceptsCount++;
            }
        }
        // Define criteria for level progression
        const criteria = {
            beginner: 5, // Number of concepts to pass to move from beginner to intermediate
            intermediate: 10, // Number of concepts to pass to move from intermediate to advanced
        };

        let newLevel = "beginner";

        if (passedConceptsCount >= criteria.intermediate) {
            newLevel = "advanced";
        } else if (passedConceptsCount >= criteria.beginner) {
            newLevel = "intermediate";
        }

        // Update the user level if it has changed
        const userLevelDocRef = doc(db, 'user_levels', userId);
        await updateDoc(userLevelDocRef, {
            current_level: newLevel
        });

        console.log(`User level updated to ${newLevel}`);
    } catch (error) {
        console.error('Error checking or updating user level:', error);
    }
};

module.exports = { getAllUserLevelsFromDB, getUserLevelFromDB, checkAndUpdateUserLevel };
