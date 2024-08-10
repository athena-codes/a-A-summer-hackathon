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

export const signUp =(email, password, username, first_name, last_name, locale, level) =>  async dispatch =>{
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        username,
        first_name,
        last_name,
        native_language: locale,
        level
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error signing up:', errorData.message);
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log('User signed up successfully:', data);
    dispatch(setUser(data))
    return data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};


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
