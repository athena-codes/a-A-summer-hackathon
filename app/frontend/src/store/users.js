// import { csrfFetch } from "./csrf";

const LOAD_USERS = "users/LOAD_USERS";
const ADD_USER = "users/ADD_USER";
const EDIT_USER = 'users/EDIT_USER'
const REMOVE_USER = 'users/REMOVE_USER'

/* ----- ACTIONS ------ */
const load = (users) => (console.log("USER ACTION", users), {
    type: LOAD_USERS,
    users,
});

const add = (user) => ({
    type: ADD_USER,
    user,
});

const remove = (user) => ({
    type: REMOVE_USER,
    user
});

const edit = (user) => ({
    type: EDIT_USER,
    user
})

/* ------ SELECTORS ------ */

export const getUsers = () => async (dispatch) => {
    const response = await fetch("/api/users");

    if (response.ok) {
        const users = await response.json();
        return dispatch(load(users));
    } else {
        console.log("Internal server error");
    }
};

export const getSingleUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`);
    console.log("RESPONSE", response);
    if (response.ok) {
        const user = await response.json();
        dispatch(load([user]));
        console.log("RESOK", user)
        return user;
    }
}

export const addUser = (payload) => async (dispatch) => {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const newUser = await response.json();
        dispatch(add(newUser));
    }
    return response;
};

export const deleteUser = userId => async dispatch => {
    const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        body: JSON.stringify({ userId })
    });
    dispatch(remove({ userId }))
    return response;
};

export const editUser = payload => async dispatch => {
    const response = await fetch(`/api/users/${payload.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const editedUser = await response.json();
        dispatch(edit(editedUser));
        return editedUser;
    }
};

const initialState = {};

/* ------ REDUCER ------ */
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            const newState = { ...state };
            console.log("REDUCER!", action)

            action.users.forEach((user) => {
                (newState[user.id] = user)
            });

            return newState;
        }

        case ADD_USER: {
            const newState = { ...state, users: { ...state.users } };
            newState.users = {
                ...newState.users,
                [action.user.id]: action.user,
            };
            return newState;
        }
        case EDIT_USER: {
            const newState = { ...state, users: { ...state.users } };
            newState.users = {
                ...newState.users,
                [action.user.id]: action.user,
            };
            return newState;
        }

        case REMOVE_USER: {
            const newState = { ...state, users: { ...state.users } };
            delete newState.users[action.user.id];
            return newState;
        }

        default:
            return state;
    }
};

export default usersReducer;
