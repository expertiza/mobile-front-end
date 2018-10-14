import  * as actions from '../index'
import axios from '../../axios-instance';
import { SecureStore } from 'expo';

// export const forgetUsername = () => {
//     return {
//         type: actions.FORGET_USERNAME
//     }
// }
// export const forgetPasswordUpdate = (email, password, repassword, token) => {
//     // console.log(email, password, repassword, token)
//     return dispatch => {
//         axios({
//             method: 'post',
//             url: 'password_retrieval/forgottenPasswordUpdatePassword',
//             headers: { "Content-Type": "application/json"},
//             data:{ "token": token, "reset": { "email": email, "password": password, "repassword": repassword }}
//         })
//         .then(response => {
//             console.log(response)
//             // alert('A password reset link has been sent to the address on file for this account.')
//             dispatch(actions.passwordResetSuccess())
//         })
//         .catch(error => {
//                 console.log(error)
//                 alert('password reset failed')
//                 dispatch(actions.passwordResetFailure())
//                } )
//     }
// }

// export const passwordResetSuccess = () => {
//     return {
//         type: actions.PASSWORD_RESET_SUCCESS
//     }
// }

// export const passwordResetFailure = () => {
//     return {
//         type: actions.PASSWORD_RESET_FAILURE
//     }
// }

// export const passwordResetEmailSend = (email, username) => {
//     return dispatch => {
//         console.log('props recieved are:', email, username)
//         axios({
//             method: 'post',
//             url: 'password_retrieval/forgottenPasswordSendLink',
//             headers: { "Content-Type": "application/json"},
//             data: { "user": { "email" : email, "username": username} }
//         })
//         .then(response => {
//             console.log(response)
//             alert('password reset successful')
//             dispatch(actions.forgetPasswordSendSuccess())
//         })
//         .catch(error => {
//                         console.log(error)
//                         alert('Something went wrong. adding the log: ', error)
//                         dispatch(actions.forgetPasswordSendFailure())
//                         } )
//     }
// } 

// export const forgetPasswordSendSuccess = () => {
//     return {
//         type: actions.PASSWORD_RESET_EMAIL_SEND_SUCCESS,
//     }
// }
// export const forgetPasswordSendFailure = () => {
//     return {
//         type: actions.PASSWORD_RESET_EMAIL_SEND_FAILURE,
//     }
// }


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

// export const logOut = () => {
//     localStorage.removeItem('jwt')
//     return {
//         type: actions.AUTH_LOGOUT
//     }
// }

export const auth = (name, password) => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'sessions',
            headers: { "Content-Type": "application/json"},
            data: {auth: { name: name, password: password }}
        })
        .then(response => {
            SecureStore.setItemAsync('jwt', JSON.stringify(response.data))
        })
        .then(()=>{
             SecureStore.getItemAsync('jwt')
             .then((jwt)=>{
                let token = JSON.parse(jwt)
                dispatch(actions.authSuccess(token.jwt))
                dispatch(actions.fetchProfile())
                console.log(jwt + "in action")
             })
        })
        .catch(error => {
            console.log(error)
            alert('Invalid username or password')
            dispatch(actions.authFailure(error))
        })
    }
}
displaydata = async () =>{
    try{
        let jwt = await AsyncStorage.getItem('jwt');
        let t = JSON.parse(jwt)
        console.log(t.jwt);
    }
    catch(error){
        console.log(error)
    }
}

// export const checkForAutoLogIn = () =>  {
//     return dispatch => {
//         if(AsyncStorage.getItem('jwt')) {
//             dispatch(authSuccess(AsyncStorage.getItem('jwt')))
//             dispatch(actions.fetchInstitutions())
//         }
//     }
// }