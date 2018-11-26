import axios from '../../axios-instance';
import * as actions from '../index';

export const fetchReviewData = (response_id, jwt) => {
    return dispatch => {
        console.log(response_id)
        return axios({
            method: 'get',
            url: 'response/view?id='+response_id,
            headers: { "Content-Type": "application/json",
                       AUTHORIZATION: "Bearer " + jwt},

        })
        .then(response => {
          // console.log("fetchReviewData:", response);
            dispatch(actions.fetchReviewDataSuccess(response.data))
        })
        .catch(error => {
                console.log(error)
                dispatch(actions.fetchReviewDataFailure())
               })
    }
}

export const fetchReviewDataSuccess = (payload) => {
    console.log("success")
    return {
        type: actions.FETCH_REVIEW_DATA_SUCCESS,
        payload: payload
    }
}

export const fetchReviewDataFailure = () => {
    console.log('failure')
    return {
        type: actions.FETCH_REVIEW_DATA_FAILURE
    }
}
