import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Profile } from './reducers/Profile';
import { Institutions } from './reducers/Institution';
import studentTaskList from './reducers/StudentTaskList';
import studentTaskViewReducer from './reducers/StudentTaskView';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profile: Profile,
            studentTaskList: studentTaskList,
            institutions: Institutions,
            studentTaskView: studentTaskViewReducer,

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}