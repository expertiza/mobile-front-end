import  * as actions from '../index'
import axios from '../../axios-instance';
// import axios from 'axios';
import { SecureStore } from 'expo';

export const authSuccess = (jwt) => {
    return {
        type: actions.AUTH_SUCCESS,
        jwt : jwt,
    }
}
export const authFailure = (error) => {
    return {
        type: actions.AUTH_FAILURE,
        error: error
    }
}


export const auth = (name, password) => {
    return dispatch => {
        axios({
            method: 'post',
            url:  'sessions',     
            headers: { "Content-Type": "application/json"},
            data: {auth: { name: name, password: password }}
        })
        // axios({
        //     method: 'post',
        //     url: 'sessions',
        //     headers: { "Content-Type": "application/json"},
        //     data: {auth: { name: name, password: password }}
        // })
        .then(response => {
            SecureStore.setItemAsync('jwt', JSON.stringify(response.data))
        })
        .then(()=>{
             SecureStore.getItemAsync('jwt')
             .then((jwt)=>{
                let token = JSON.parse(jwt)
                dispatch(actions.authSuccess(token.jwt))
             })
        })
        .catch(error => {
            console.log(error)
            alert('Invalid username or password')
            dispatch(actions.authFailure(error))
        })
    }
}

export const forgetPasswordSendSuccess = () => {
    return {
        type: actions.PASSWORD_RESET_EMAIL_SEND_SUCCESS,
    }
}
export const forgetPasswordSendFailure = () => {
    return {
        type: actions.PASSWORD_RESET_EMAIL_SEND_FAILURE,
    }
}

export const passwordResetEmailSend = (email) => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'password_retrieval/forgottenPasswordSendLink',
            headers: { "Content-Type": "application/json"},
            data: { user: { email : email, username: null} }
        })
        .then(response => {
            console.log(response)
            alert('password reset successful')
            dispatch(actions.forgetPasswordSendSuccess())
        })
        .catch(error => {
            console.log(error)
            alert('Something went wrong. adding the log: ', error)
            dispatch(actions.forgetPasswordSendFailure())
        })
    }
} 