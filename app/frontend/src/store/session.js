import { auth } from '../firebase/firebaseConfig'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

// Assuming Firebase app is initialized in another file and exported
import { firebaseApp } from '../firebase/firebaseConfig'
import { db } from '../firebase/firebaseConfig' // Import Firestore database reference
import { doc, setDoc } from 'firebase/firestore' // Make sure you're using Firestore SDK v9+



// Action Types
const SET_USER = 'session/SET_USER'

// Action Creators
const setUser = user => ({
  type: SET_USER,
  payload: user
})

// Thunks
export const authenticate = () => async dispatch => {
  const user = auth.currentUser
  if (user) {
    dispatch(setUser(user))
  }
}

export const login = (email, password) => async dispatch => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    dispatch(setUser(userCredential.user))
  } catch (error) {
    console.error('Error logging in:', error)
  }
}


export const signUp = async (email, password, username, firstName, lastName, nativeLanguage, level) => {
  console.log('Signing up with:', {
  email,
  password,
  username,
  firstName,
  lastName,
  nativeLanguage,
  level
})

if (!email) {
  console.error('Email is undefined or empty.')
  return // Prevent further execution if email is empty
}


  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    // Create or update the Firestore document
    await setDoc(doc(db, 'users', user.uid), {
      email,
      username,
      first_name: firstName || '',
      last_name: lastName || '',
      native_language: nativeLanguage || 'en', // Assume default or get from another input
      level: level || 1
    })

    console.log('User signed up and added to Firestore')
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}



export const logout = () => async dispatch => {
  try {
    await auth.signOut()
    dispatch(setUser(null))
  } catch (error) {
    console.error('Error logging out', error)
  }
}

// Reducer
const initialState = { user: null }

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
