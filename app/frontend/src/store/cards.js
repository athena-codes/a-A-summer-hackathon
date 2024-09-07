const { db } = require("../firebase/firebaseConfig");
const {
    collection,
    getDocs,
    doc,
    updateDoc,
    setDoc,
    getDoc,
  } = require("firebase/firestore");


  export const ANSWER_CARD = 'cards/ANSWER_CARD';

  const answerCard = (card) => ({
    type: ANSWER_CARD,
    card
  })


  export const updateCardStatus = async (userId, id, attemptId, answer, deckId) => {

  }
