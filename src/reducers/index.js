import { combineReducers } from 'redux';
import postReducer from './postReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
    posts: postReducer,
    users: usersReducer
});

export default reducers;