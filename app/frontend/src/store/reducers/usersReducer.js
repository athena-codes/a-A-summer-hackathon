import { LOAD_USERS } from "../actions/usersActions";

const initialState = {
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            const newState = { ...state };

            action.users.forEach((user) => {
                newState[user.id] = user;
            });

            return newState;
        }
        default:
            return state;
    }
};

export default usersReducer;
