import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import conceptsReducer from './conceptsReducer';
import sessionReducer from './sessionReducer';
import topicsReducer from './topicsReducer';
import questionsReducer from '../questions';

const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    concepts: conceptsReducer,
    topics: topicsReducer,
    questions: questionsReducer
});

export default rootReducer;
