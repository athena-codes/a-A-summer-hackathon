const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where, setDoc } = require('firebase/firestore');
const { checkAndUpdateUserLevel } = require('./levelService');
const { getConceptsByLevel, getTopicsByConceptId } = require('./conceptService');

// Service to add a user
const addUserToDB = async ({ uid, email, username, first_name, last_name, native_language, level }) => {
    await setDoc(doc(db, 'users', uid), {
        email,
        username,
        first_name,
        last_name,
        native_language,
        current_level: level,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    console.log('database', db)
};

const setUserLevel = async (uid, level) => {
    await setDoc(doc(db, 'users', uid), {
        current_level: level,
        updatedAt: new Date().toISOString()
    }, { merge: true });
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

const initializeUserProgress = async (uid) => {
    console.log('initialize user progress route is hit', uid);
    try {
        const userDocRef = doc(db, 'progress', uid);
        const userInfoRef = doc(db, 'users', uid);
        const userInfoSnap = await getDoc(userInfoRef);

        if (!userInfoSnap.exists()) {
            throw new Error('User not found');
        }
        // Create the 'concepts' subcollection
        const conceptsCollectionRef = collection(userDocRef, 'concepts');

        const userInfo = userInfoSnap.data();
        console.log('User info:', userInfo);
        const currentLevel = userInfo.current_level;
        // Use getConceptsByLevel to get the concepts for the current level
        let concepts = []
        if (currentLevel === 'Advanced') {
            const [AdvancedConcepts, IntermediateConcepts, BeginnerConcepts] = await Promise.all([
                getConceptsByLevel('Advanced'),
                getConceptsByLevel('Intermediate'),
                getConceptsByLevel('Beginner')
            ]);
            concepts = [...AdvancedConcepts, ...IntermediateConcepts, ...BeginnerConcepts];
        } else if (currentLevel === 'Intermediate') {
            const [IntermediateConcepts, BeginnerConcepts] = await Promise.all([
                getConceptsByLevel('Intermediate'),
                getConceptsByLevel('Beginner')
            ]);
            concepts = [...IntermediateConcepts, ...BeginnerConcepts];
        } else {
            concepts = await getConceptsByLevel(currentLevel);
        }


        // Initialize concepts and topics based on the current level
        for (const concept of concepts) {
            const topics = await getTopicsByConceptId(concept.id);
            const conceptDocRef = doc(conceptsCollectionRef, concept.id);

            await setDoc(conceptDocRef, {
                status: false,
                level: concept.level,
                topics: topics.map(topic => ({
                    id: topic.id,
                    conceptId: topic.concept_id,
                    status: false,
                    //this passes => we change it as user answers decks correctly
                    passes: 0
                }))
            }, { merge: true });
        }
    } catch (error) {
        throw new Error('Error initializing user progress: ' + error.message);
    }
}

// Service to get user progress
const getProgressFromDB = async (uid) => {
    console.log('get progress route is hit', uid);
    try {
        const progressDocRef = doc(db, 'progress', uid);
        const userDocRef = doc(db, 'users', uid);

        const userDoc = await getDoc(userDocRef);
        console.log('User doc:', userDoc.data());

        // Access the 'concepts' subcollection
        const conceptsCollectionRef = collection(progressDocRef, 'concepts');
        const conceptsSnapshot = await getDocs(conceptsCollectionRef);
        const concepts = conceptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { uid, username: userDoc.data().username, current_level: userDoc.data().current_level, concepts };
    } catch (error) {
        throw new Error('Error fetching progress: ' + error.message);
    }
};

// Service to update user progress
const updateUserProgressFromDB = async (uid) => {
    try {
        const userProgressRef = doc(db, 'progress', uid);
        const conceptsCollectionRef = collection(userProgressRef, 'concepts');
        const conceptsSnapshot = await getDocs(conceptsCollectionRef);

        for (const conceptDoc of conceptsSnapshot.docs) {
            const conceptData = conceptDoc.data();
            const conceptDocRef = doc(conceptsCollectionRef, conceptDoc.id);

            // Check if all topics within the concept are passed
            let allTopicsPassed = true;

            if (conceptData.topics && conceptData.topics.length > 0) {
                for (const topic of conceptData.topics) {
                    if (!topic.status) {
                        allTopicsPassed = false;
                        console.log('Topic not passed:', topic.id);
                        break;
                    }
                }
            } else {
                allTopicsPassed = false;
            }

            // Update concept status if all topics have been passed
            if (allTopicsPassed && !conceptData.status) {
                await updateDoc(conceptDocRef, { status: true });
                console.log(`Concept ${conceptDoc.id} status updated to true`);
            }
        }

        // Check and update user level (NOT WORKING YET)
        await checkAndUpdateUserLevel(uid);

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
    setUserLevel,
    initializeUserProgress
};
