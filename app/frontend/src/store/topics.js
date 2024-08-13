// Action Types
export const LOAD_TOPICS = "topics/LOAD_TOPICS";
export const LOAD_ONE_TOPIC = "topics/LOAD_ONE_TOPIC";

// Action Creators
const loadTopics = (topics) => ({
    type: LOAD_TOPICS,
    topics,
});

const loadOneTopic = (topic) => ({
    type: LOAD_ONE_TOPIC,
    topic,
});

// Thunk Actions
export const fetchTopics = () => async (dispatch) => {
    try {
        const response = await fetch("/api/topics/all-topics");

        if (response.ok) {
            const topics = await response.json();
            dispatch(loadTopics(topics));
            return topics;
        } else {
            console.error("Internal server error");
        }
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
};

export const fetchOneTopic = (topicId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/topics/${topicId}`);

        if (response.ok) {
            const topic = await response.json();
            dispatch(loadOneTopic(topic));
            return topic;
        } else {
            console.error("Response failed:", response.statusText);
        }
    } catch (error) {
        console.error('Error fetching topic:', error);
    }
};

// Initial State
const initialState = {};

// Reducer
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
            return { ...state, [action.topic.id]: action.topic };
        }
        default:
            return state;
    }
};

export default topicsReducer;
