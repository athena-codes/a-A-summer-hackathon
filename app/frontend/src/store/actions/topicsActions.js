export const LOAD_TOPICS = () => "topics/LOAD_TOPICS";
export const LOAD_ONE_TOPIC = () => "topics/LOAD_ONE_TOPIC";

const load = (topics) => ({
    type: LOAD_TOPICS,
    topics,
});

const loadOne = (topic) => ({
    type: LOAD_ONE_TOPIC,
    topic,
});

export const fetchTopics = () => async (dispatch) => {
    const response = await fetch("/api/topics/all-topics");

    if (response.ok) {
        const topics = await response.json();
        dispatch(load(topics));
        return topics
    } else {
        console.log("Internal server error");
    }
};

export const fetchOneTopic = (topicId) => async (dispatch) => {
    try {
        console.log("ID", topicId)
        const response = await fetch(`/api/topics/${topicId}`);
        console.log("RES", response)

        if (response.ok) {
            const topic = await response.json();
            dispatch(loadOne(topic));
            console.log("TOPIC", topic);
            return topic
        } else {
            console.error("Response failed:", response.statusText);
        }
    } catch (error) {
        console.error('Error fetching topic:', error);
        // Dispatch error action or handle error appropriately
    }
};
