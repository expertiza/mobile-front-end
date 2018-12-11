import * as actions from '../index';
import axios from '../../axios-instance';


export const fetchScore=(participantId, jwt) =>(dispatch) =>{
    return axios({
        method: 'get',
        url: 'grades/view_team/'+participantId,
        headers: {AUTHORIZATION: "Bearer " + jwt}
    })
    .then(response => response.data)
    .then(scores => dispatch(addScores(scores)))
    .catch(error=>console.log(error));
}
export const addScores =(scores) =>({
    type: actions.ADD_SCORE,
    payload: scores
}); 