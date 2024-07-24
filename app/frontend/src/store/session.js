import { auth } from '../firebase'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

// Assuming Firebase app is initialized in another file and exported
import { firebaseApp } from '../firebase'


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


export const signUp = (email, password) => async dispatch => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    dispatch(setUser(userCredential.user)) // Make sure you handle setting the user in your state
  } catch (error) {
    console.error('Error signing up', error)
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
