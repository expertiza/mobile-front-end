import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Profile } from './reducers/Profile';
import studentTaskList from './reducers/StudentTaskList';
import studentTeamView from './reducers/StudentTeamView';
import { Institutions } from './reducers/Institution';
import authReducer from './reducers/Auth';
import studentTaskViewReducer from './reducers/StudentTaskView';
import responseReducer from './reducers/Response';
import signUpSheetList from './reducers/SignUpSheetList';
import Grades from './reducers/Grade';


import submittedContent from './reducers/SubmittedContent';
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
            studentTaskView: studentTaskViewReducer,
            responseReducer: responseReducer,
            signUpSheetList: signUpSheetList,
            grades: Grades,
            submittedContent: submittedContent,
        }),
        applyMiddleware(thunk)
    );
    return  store;
}
