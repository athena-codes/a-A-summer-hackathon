// Import Firebase modules using ES6 import syntax
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyDhfk198F2ZUgT89ON9brPk5x96rHqfjvA',
  authDomain: 'hackathon-8dd5b.firebaseapp.com',
  projectId: 'hackathon-8dd5b',
  storageBucket: 'hackathon-8dd5b.appspot.com',
  messagingSenderId: '97407855709',
  appId: '1:97407855709:web:b9972d85d09d144eaff1b4',
  measurementId: 'G-1VRV2K96RS'
}


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the Firebase Auth object
export const auth = getAuth(firebaseApp)

// Get a reference to the Firestore service
export const db = getFirestore(firebaseApp)
