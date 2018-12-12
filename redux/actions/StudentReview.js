import axios from '../../axios-instance'
import * as actions from '../index'

export const fetchAssignmentReviewData = (id,jwt) => (dispatch) =>{
    return axios ({
        method : 'get',
        url : 'student_review/list?id='+id,
        headers: { 
                    AUTHORIZATION: "Bearer " + jwt
                 }
    })
    .then(response => {
        dispatch(actions.addReviewList(response.data));
    })
    .catch(error => console.log(error));
}

export const addReviewList = (reviewData) => ({
    type: actions.ADD_ASSIGNMENT_REVIEW_DATA,
    payload: reviewData
});

export const reviewNewTopic = (assignment_id, user_id, topic_id,jwt) => {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + jwt
    }
    return axios ({
        method: 'post',
        url: 'review_mapping/assign_reviewer_dynamically',
        data: {
            assignment_id: assignment_id,
            reviewer_id:user_id,
            topic_id: topic_id
        },
        headers
    })
    .then(response => {
             console.log(response.data.server_msg);
    })
    .catch(error => console.log(error));
}