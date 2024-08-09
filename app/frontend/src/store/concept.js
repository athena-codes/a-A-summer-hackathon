import { csrfFetch } from "./csrf";

const LOAD_CONCEPTS = "songs/LOAD_CONCEPTS";
const ADD_CONCEPT = "songs/ADD_CONCEPT";
const EDIT_CONCEPT = "songs/EDIT_CONCEPT";
const REMOVE_CONCEPT = "songs/REMOVE_CONCEPT";

/* ----- ACTIONS ------ */
const load = (concepts) => ({
  type: LOAD_CONCEPTS,
  concepts,
});

const add = (concept) => ({
  type: ADD_CONCEPT,
  concept,
});

const remove = (concept) => ({
  type: REMOVE_CONCEPT,
  concept,
});

const edit = (concept) => ({
  type: EDIT_CONCEPT,
  concept,
});

/* ------ SELECTORS ------ */

export const getConcepts = () => async (dispatch) => {
  const response = await csrfFetch("/api/all-concepts");

  if (response.ok) {
    const concepts = await response.json();
    return dispatch(load(concepts));
  } else {
    console.log("internal server error");
  }
};

export const getSingle = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/concepts/${id}`);

  if (response.ok) {
    const concepts = await response.json();
    dispatch(load(concepts));
    return concepts;
  }
};

export const addConcept = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/add-concept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newConcept = await response.json();
    dispatch(add(newConcept));
  }
  return response;
};

export const deleteConcept = (conceptId) => async (dispatch) => {
  const response = await csrfFetch(`/api/concepts/${conceptId}`, {
    method: "DELETE",
    body: JSON.stringify({ conceptId }),
  });
  dispatch(remove({ conceptId }));
  return response;
};

export const editConcept = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/concepts/${payload.conceptId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const editedConcept = await response.json();
    dispatch(edit(editedConcept));
    return editedConcept;
  }
};

const initialState = {
  concepts: [],
};

const conceptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONCEPTS:
      return {
        ...state,
        concepts: action.concepts,
      };
    case ADD_CONCEPT:
      return {
        ...state,
        concepts: [...state.concepts, action.concept],
      };
    case EDIT_CONCEPT:
      return {
        ...state,
        concepts: state.concepts.map((concept) =>
          concept.id === action.concept.id ? action.concept : concept
        ),
      };
    case REMOVE_CONCEPT:
      return {
        ...state,
        concepts: state.concepts.filter(
          (concept) => concept.id !== action.concept.id
        ),
      };
    default:
      return state;
  }
};
