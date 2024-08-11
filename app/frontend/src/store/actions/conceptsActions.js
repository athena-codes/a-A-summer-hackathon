const { db } = require("../../firebase/firebaseConfig");
const { collection, getDocs } = require("firebase/firestore");

export const LOAD_CONCEPTS = () => "concepts/LOAD_CONCEPTS";
export const LOAD_ONE_CONCEPT = () => "concepts/LOAD_ONE_CONCEPT";
export const LOAD_TOPICS_BY_CONCEPT = () => "concepts/LOAD_TOPICS_BY_CONCEPT";

const load = (concepts) => ({
    type: LOAD_CONCEPTS,
    concepts,
});

const loadOne = (concept) => ({
    type: LOAD_ONE_CONCEPT,
    concept,
});

const loadConceptTopics = (topics) => ({
    type: LOAD_TOPICS_BY_CONCEPT,
    topics
})

// export const fetchConcepts = () => async (dispatch) => {
//     try {
//         const response = await fetch("/api/concepts/all-concepts");

//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.statusText}`);
//         }

//         const concepts = await response.json();
//         dispatch(load(concepts));
//         return concepts
//     } catch (error) {
//         console.error("Error fetching concepts:", error);
//         // Dispatch error action or handle error appropriately
//     }
// };

// use this if the 1st fetchConcepts break, may need to import things

export const fetchConcepts = () => async (dispatch) => {
    try {
      const conceptsCollectionRef = collection(db, 'concepts');
      const conceptsSnapshot = await getDocs(conceptsCollectionRef);
  
      const conceptsData = conceptsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      dispatch(load(conceptsData)); // Update Redux state with concepts data
    } catch (error) {
      console.error("Error fetching concepts:", error);
      // Dispatch error action or handle error appropriately
    }
  };

export const fetchOneConcept = (conceptId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/concepts/${conceptId}`);

        if (response.ok) {
            const concept = await response.json();
            dispatch(loadOne(concept));
            return concept
        } else {
            console.error("Response failed:", response.statusText);
        }
    } catch (error) {
        console.error('Error fetching concept:', error);
        // Dispatch error action or handle error appropriately
    }
};

export const fetchTopicsbyConcept = (conceptId) => async (dispatch) => {
    console.log("CONCEPTIDHERE", conceptId);
    try {
        const response = await fetch(`/api/concepts/${conceptId}/topics`);
        console.log("CONCEPTID", response);
        if (response.ok) {
            const topics = await response.json();
            dispatch(loadConceptTopics(topics));
            return topics
        } else {
            console.error("Response failed:", response.statusText);
        }
    } catch (error) {
        console.error('Error fetching concept:', error);
        // Dispatch error action or handle error appropriately
    }
};
