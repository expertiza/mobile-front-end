import  * as actions from '../index'
// import axios from '../../axios-instance';
import axios from 'axios';
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
            url:  'http://10.153.35.244:3001/api/v1/sessions',     
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