const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../firebase/firebaseConfig');
const { addUserToDB } = require('../services/userService');

// Register user
const registerUser = async (req, res) => {
    const { email, password, username, first_name, last_name, native_language } = req.body;
    try {
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Save additional user data to Firestore
        await addUserToDB({ uid: userId, email, username, first_name, last_name, native_language });

        res.status(201).json({ message: 'User registered', uid: userId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        res.status(200).json({ message: 'User logged in', uid: userCredential.user.uid });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
