import axios from '../../axios-instance'
import * as actions from '../index'

export const onSubmittedContentLoad = (id) => {

    return dispatch => {
        console.log('id in actions is :', id)
        axios({
            method: 'get',
            url: 'submitted_content/'+id+'/edit',
            headers: { "Content-Type": "application/json",
                       AUTHORIZATION: "Bearer " + localStorage.getItem('jwt')},
            data: { "id": id }
        })
        .then(response => dispatch(actions.getSumittedContent(response.data)))
        .catch(error => {
                console.log(error)
        } )
    }
}

export const onUpdateSubmittedHyperlinks = (team, jwt) => (dispatch) => {
  console.log("onUpdateSubmittedHyperlinks");
  return axios({
      method: 'post',
      url: 'student_teams/update_submitted_hyperlinks',
      headers: {
        'Content-Type': 'application/json',
        HTTP_ACCEPT: 'application/json',
        AUTHORIZATION: "Bearer " + jwt,
      },
      data: {"team": team},
    })
    .then(response => {
      if (response.status === 200) {
        // console.log("response new team: ", response.data.team);
        return response.data.team;
      }
    })
    .then(team => dispatch(actions.updateTeam(team)))
    .catch(error => {
      console.log(error);
    });
  }

// export const onSignUp = (id, topic_id, assignment_id) => {
//     return dispatch => {
//         console.log('id in actions is :', id, topic_id, assignment_id)
//         axios({
//             method: 'get',
//             url: 'sign_up_sheet/sign_up',
//             headers: { "Content-Type": "application/json",
//                        AUTHORIZATION: "Bearer " + localStorage.getItem('jwt')},
//             params: { "id": id, "topic_id": topic_id, "assignment_id": assignment_id }
//         })
//         .then(response => dispatch(actions.addSignUp(response.data)))
//         .catch(error => {
//                 console.log(error)
//         } )
//     }
// }

// export const onDelete = (id, topic_id, assignment_id) => {
//     return dispatch => {
//         console.log('id in actions is :', id, topic_id, assignment_id)
//         axios({
//             method: 'get',
//             url: 'sign_up_sheet/delete_signup',
//             headers: { "Content-Type": "application/json",
//                        AUTHORIZATION: "Bearer " + localStorage.getItem('jwt')},
//             params: { "id": id, "topic_id": topic_id, "assignment_id": assignment_id }
//         })
//         .then(response => dispatch(actions.addDelete(response.data)))
//         .catch(error => {
//                 console.log(error)
//         } )
//     }
// }


export const getSumittedContent = (submittedContent) => ({
    type: actions.ADD_SUBMITTEDCONTENT,
    payload: submittedContent
});

// export const addSignUp = (signupmsg) => ({
//     type: actions.ADD_SIGNUP,
//     payload: signupmsg
// });

// export const addDelete = (deletemsg) => ({
//     type: actions.ADD_DELETE,
//     payload: deletemsg
// });
