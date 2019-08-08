import * as actions from '../index'
import {updateObject}  from '../../shared/utility/utility'

const initialize={
        loaded : false, 
        signupsheet : {},
        alertMsg : {},
    }

const signUpSheetList = (state = initialize, action) => {
    console.log("Reducer start: Flag = " + action.flag)

    switch(action.type){
        case actions.ADD_SIGNUPSHEETLIST:
            if(action.flag){
                console.log("Initialize")
                return updateObject(state = initialize , {
                    loaded: true,
                    signupsheet: action.payload
                }) 
            }
            else{
                return updateObject(state, {
                    loaded: true,
                    signupsheet: action.payload
                })
            }
                
        case actions.ADD_SIGNUP:
        return {
            ...state, alertMsg: action.payload
        }
        case actions.ADD_DELETE:
        return{
            ...state, alertMsg: action.payload
        }
        default: 
            console.log("No change in state by signup reducer")
            return state;
    }
};





export default signUpSheetList