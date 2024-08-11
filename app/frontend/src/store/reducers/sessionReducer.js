import { SET_USER } from "../actions/sessionAction";

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}
