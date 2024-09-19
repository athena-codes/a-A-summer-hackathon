import {
  AddUserAttemptToDB,
  checkAnswerInDB,
} from "../services/attemptService";
import { getAttemptByDeckIdFromDB } from "../services/deckService";
import { modifyUserAttempt } from "./attempt";

// Action Types

const { db } = require("../firebase/firebaseConfig");
const {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
} = require("firebase/firestore");

export const SET_SELECTED_ANSWERS = "answers/SET_SELECTED_ANSWERS";

const addSelectedAnswers = (cardIndex, optionIndex) => ({
  type: "attempt/SET_SELECTED_ANSWER",
  payload: {
    cardIndex,
    optionIndex,
  },
});

export const setSelectedAnswerThunk = (userId, cardIndex, optionIndex, questionId, deckId, selectedOption, attemptId) => async (dispatch) => {
    try {
     // Now perform any async logic like modifying user attempt in the backend
     const checkAttempt = await dispatch(
        modifyUserAttempt(userId, questionId, attemptId, selectedOption, deckId)
      );
  
      // Dispatch an action for feedback based on the result of the check attempt
      if (checkAttempt && checkAttempt.message === "Answer is correct!") {
        dispatch({
          type: "attempt/SET_FEEDBACK",
          payload: {
            cardIndex,
            feedback: {
              isCorrect: true,
            },
          }
        });
      } else if (checkAttempt && checkAttempt.message === "Answer is incorrect.") {
        dispatch({
          type: "attempt/SET_FEEDBACK",
          payload: {
            cardIndex,
            feedback: {
              isCorrect: false,
              correctAnswer: checkAttempt.correctAnswer,
            },
          }
        });
      }
  
      // If all answers are attempted, dispatch an action to archive the deck and fetch the updated deck
      // This logic could stay the same as in your current component.
    } catch (error) {
      console.error("Error setting selected answer:", error);
    }
}

// reducers/attemptReducer.js
const initialState = {
    selectedAnswers: {},
    feedback: {}
  };
  
  const answerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "attempt/SET_SELECTED_ANSWER":
        const { cardIndex, optionIndex } = action.payload;
        return {
          ...state,
          selectedAnswers: {
            ...state.selectedAnswers,
            [cardIndex]: optionIndex,
          },
        };
  
      case "attempt/SET_FEEDBACK":
        const { cardIndex: feedbackCardIndex, feedback } = action.payload;
        return {
          ...state,
          feedback: {
            ...state.feedback,
            [feedbackCardIndex]: feedback,
          },
        };
  
      // Add other attempt-related cases if necessary
  
      default:
        return state;
    }
  };
  
  export default answerReducer;
