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
            Beginner: 5, // Number of concepts to pass to move from Beginner to Intermediate
            Intermediate: 10, // Number of concepts to pass to move from Intermediate to Advanced
        };

        let newLevel = "Beginner";

        if (passedConceptsCount >= criteria.Intermediate) {
            newLevel = "Advanced";
        } else if (passedConceptsCount >= criteria.Beginner) {
            newLevel = "Intermediate";
        }

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
