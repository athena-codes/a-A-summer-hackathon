import { LOAD_TOPICS, LOAD_ONE_TOPIC } from "../actions/topicsActions";

const initialState = {
};

const topicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOPICS: {
            const newState = { ...state };

            action.topics.forEach((topic) => {
                newState[topic.id] = topic;
            });

            return newState;
        }
        case LOAD_ONE_TOPIC: {
            return { ...state, [action.topic.id]: action.topic }
        }
        default:
            return state;
    }
};

export default topicsReducer;
