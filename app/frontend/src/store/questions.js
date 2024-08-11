import { addQuestionsToDB } from "../services/aiService";

const { db } = require("../firebase/firebaseConfig");
const { collection, getDoc, doc } = require("firebase/firestore");
const { generateQuestionsByAI } = require("../models/aiModel");

export const LOAD_QUESTIONS = () => "questions/LOAD_QUESTIONS";
export const ADD_QUESTION = () => "questions/ADD_QUESTION";

const load = (questions) => ({
  type: LOAD_QUESTIONS,
  questions,
});

const add = (question) => ({
  type: ADD_QUESTION,
  question,
});


export const addQuestions =
  (topic_id, user_native_language, user_level, userId) => async (dispatch) => {
    const topicRef = doc(db, "topics", topic_id);
    console.log("topicRef: ", topicRef);

    const topicDoc = await getDoc(topicRef);
    console.log("topicDoc: ", topicDoc);
    if (!topicDoc.exists()) {
      throw new Error("Topic does not exist!");
    }

    const topicData = topicDoc.data();
    const topic_name = topicData.topic_name;
    console.log("topicData: ", topicData);

    if (!topicData.concept_id) {
      throw new Error("Invalid topic due to concept_id is empty!!");
    }

    try {
      let questionData = await generateQuestionsByAI(
        topic_name,
        user_native_language,
        user_level,
        topic_id
      );
      console.log("questionData: ", questionData);

      dispatch(
        add({
          topic_id,
          user_native_language,
          user_level,
          userId,
        })
      );

      if (questionData) {
        const question_from_ai = await addQuestionsToDB(userId, {
          questionData,
        });
        console.log("Created questions successfully:", question_from_ai);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };

const initialState = {};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
