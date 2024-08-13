const { db } = require("../firebase/firebaseConfig");
const { collection, getDocs, getDoc, doc } = require("firebase/firestore");

// Action Types
export const LOAD_DECKS = "concepts/LOAD_DECKS";
export const LOAD_ONE_DECK = "concepts/LOAD_ONE_DECK";
export const LOAD_TOPICS_BY_DECK = "concepts/LOAD_TOPICS_BY_DECK";

// Action Creators
const loadDecks = (decks) => ({
  type: LOAD_DECKS,
  decks,
});

const loadOneDeck = (deck) => ({
  type: LOAD_ONE_DECK,
  deck,
});

// Thunk Actions
export const fetchDecks = (userId, topicId) => async (dispatch) => {
  try {
    // Adjust this query to filter decks based on userId and topicId
    const decksCollectionRef = collection(db, "decks");
    const decksSnapshot = await getDocs(decksCollectionRef);

    const decksData = decksSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((deck) => deck.userId === userId && deck.topic_id === topicId); // Filtering by userId and topicId

    console.log(decksData);

    dispatch(loadDecks(decksData)); // Update Redux state with filtered decks data
  } catch (error) {
    console.error("Error fetching decks:", error);
    // Handle error appropriately
  }
};

export const fetchOneDeck = (deckId) => async (dispatch) => {
  try {
    // Get the specific deck document by its ID
    const deckDocRef = doc(db, "decks", deckId);
    const deckSnapshot = await getDoc(deckDocRef);

    if (deckSnapshot.exists()) {
      const deckData = { id: deckSnapshot.id, ...deckSnapshot.data() };
      dispatch(loadOneDeck(deckData)); // Dispatch the action to load the deck
    } else {
      console.log("No such deck found!");
    }
  } catch (error) {
    console.error("Error fetching deck:", error);
    // Handle error appropriately
  }
};

const initialState = {
  decks: [],
};

const decksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        decks: action.decks, // Set decks data
      };
    case LOAD_ONE_DECK:
      return {
        ...state,
        selectedDeck: action.deck, // Set the selected deck data
      };
    default:
      return state;
  }
};

export default decksReducer;
