import { db } from '../firebase/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

// Action Types
const FETCH_CONCEPTS_BEGIN = 'concepts/FETCH_CONCEPTS_BEGIN'
const FETCH_CONCEPTS_SUCCESS = 'concepts/FETCH_CONCEPTS_SUCCESS'
const FETCH_CONCEPTS_FAILURE = 'concepts/FETCH_CONCEPTS_FAILURE'

// Action Creators
const fetchConceptsBegin = () => ({
  type: FETCH_CONCEPTS_BEGIN
})

const fetchConceptsSuccess = concepts => ({
  type: FETCH_CONCEPTS_SUCCESS,
  payload: { concepts }
})

const fetchConceptsFailure = error => ({
  type: FETCH_CONCEPTS_FAILURE,
  payload: { error }
})

// Thunks
export const fetchConcepts = () => {
  return async dispatch => {
    dispatch(fetchConceptsBegin())
    try {
      const querySnapshot = await getDocs(collection(db, 'concepts'))
      const concepts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch(fetchConceptsSuccess(concepts))
    } catch (error) {
      dispatch(fetchConceptsFailure(error))
    }
  }
}

// Reducer
const initialState = {
  items: [],
  loading: false,
  error: null
}

export default function conceptsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CONCEPTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_CONCEPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.concepts
      }
    case FETCH_CONCEPTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      }
    default:
      return state
  }
}
