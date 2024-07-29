const { db } = require('../firebase/firebaseConfig');
const { collection, addDoc, getDocs, updateDoc, getDoc, doc, query, where } = require('firebase/firestore');

const getUserLevelFromDB = async (uid) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            throw new Error('User not found');
        }
        //use userDoc to find user_level in DB
        const qy = query(collection(db, 'user_level'), where('user_id', '==', uid));
        const querySnapshot = await getDocs(qy);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } else {
            throw new Error('User level not found');
        }
    } catch (error) {
        throw new Error('Error fetching user level: ' + error.message);
    }
}


module.exports = { getUserLevelFromDB }
