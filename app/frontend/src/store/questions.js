import { addQuestionsToDB } from "../services/aiService";
import { addCardsToDeckInDB, createDeckInDB } from "../services/deckService";

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
  (topicId, user_native_language, user_level, userId) => async (dispatch) => {

    const topicRef = doc(db, "topics", topicId);
    console.log("topicRef: ", topicRef);

    const topicDoc = await getDoc(topicRef);
    console.log("topicDoc: ", topicDoc);
    if (!topicDoc.exists()) {
      throw new Error("Topic does not exist!");
    }

    const topicData = topicDoc.data();
    console.log('topic name', topicData.topic_name)
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
        topicId
      );
      console.log("questionData: ", questionData);

      dispatch(
        add({
          topicId,
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


        // Create a new deck in the database
        const deck = await createDeckInDB({
          userId,
          topic_id: topicId,
          createdAt: new Date(),
          archived: false,
        });

        console.log("Deck created successfully:", deck);

        // Add the generated questions as cards to the deck
        const cardsAdded = await addCardsToDeckInDB(deck.id, userId, question_from_ai);

        console.log("Cards added to deck successfully:", cardsAdded);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };

const initialState = {};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default  questionsReducer;
