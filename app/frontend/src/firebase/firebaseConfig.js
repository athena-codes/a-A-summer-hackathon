
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'


// const firebaseConfig = {
//   apiKey: 'AIzaSyDhfk198F2ZUgT89ON9brPk5x96rHqfjvA',
//   authDomain: 'hackathon-8dd5b.firebaseapp.com',
//   projectId: 'hackathon-8dd5b',
//   storageBucket: 'hackathon-8dd5b.appspot.com',
//   messagingSenderId: '97407855709',
//   appId: '1:97407855709:web:b9972d85d09d144eaff1b4',
//   measurementId: 'G-1VRV2K96RS'
// }


// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig)

// // Get a reference to the Firebase Auth object
// export const auth = getAuth(firebaseApp)

// // Get a reference to the Firestore service
// export const db = getFirestore(firebaseApp)
require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

module.exports = { auth, db };
