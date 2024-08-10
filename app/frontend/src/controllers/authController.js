const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../firebase/firebaseConfig');
const { addUserToDB, setUserLevel } = require('../services/userService');
const { initializeUserProgress } = require('../services/userService');
const admin = require('../firebase/keyConfig/config')

// Register user
const registerUser = async (req, res) => {
        const { email, password, username, first_name, last_name, native_language, level } = req.body;

        // Validate level
        const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validLevels.includes(level)) {
        return res.status(400).json({ message: 'Invalid level. Must be one of: Beginner, Intermediate, Advanced.' });
        }

        try {
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        console.log('userCredential: ', userCredential, userId);
        // Save additional user data to Firestore
        await addUserToDB({ uid: userId, email, username, first_name, last_name, native_language, level });

        // Set user level in Firestore
        await setUserLevel(userId, level);

        // Initialize user progress
        await initializeUserProgress(userId);

        res.status(201).json({ message: 'User registered', uid: userId, loginCredential: userCredential });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('userCredential: ', userCredential);
        //get token
        const token = await userCredential.user.getIdToken();
        res.status(200).json({ message: 'User logged in', uid: userCredential.user.uid, token: token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// controllers/authController.js
const authenticateUser = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'No authorization header provided' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.currentUser = decodedToken; // Attach the user's info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};


module.exports = { registerUser, loginUser, authenticateUser };
