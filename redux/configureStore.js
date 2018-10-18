import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Profile } from './reducers/Profile';
import studentTaskList from './reducers/StudentTaskList';
import studentTeamView from './reducers/StudentTeamView';
import { Institutions } from './reducers/Institution';
import authReducer from './reducers/Auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profile: Profile,
            studentTaskList: studentTaskList,
            studentTeamView: studentTeamView,
            institutions: Institutions,
            auth: authReducer,
        }),
        applyMiddleware(thunk)
    );
    return  store;
}
