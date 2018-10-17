import axios from '../../axios-instance';
import jwt from './jwt';
import * as actions from '../index';

export const fetchStudentsTeamedWith = () =>(dispatch) => {
    return axios ({
        method : 'get',
        url : 'student_task/list',
        headers: { AUTHORIZATION: "Bearer " + jwt }
    })

    .then(response => dispatch(actions.addStudentsTeamedWith(response.data.studentsTeamedWith)))
    .catch(error => console.log(error));
    
    // .then(response =>{ 
    //     console.log('hhhh', response.data)
    //     dispatch(actions.addStudentsTeamedWith(response.data.studentsTeamedWith[""]))
    // } )
    // .catch(error => console.log(error));

}

export const fetchStudentTasks = () =>(dispatch) => {
    return axios({
        method: 'get',
        url: 'student_task/list',
        headers: { AUTHORIZATION: "Bearer " + jwt }
    })
    // .then(response => console.log(response.data))
    .then(response => dispatch(actions.addStudentTasks(response.data.studentTasks)))
    .catch(error => console.log(error));

    
}




export const addStudentsTeamedWith = (studentsTeamedWith) => ({
    type: actions.ADD_STUDENTSTEAMEDWITH,
    payload: studentsTeamedWith
});

export const addStudentTasks = (studentTasks) => ({
    type: actions.ADD_STUDENTTASKS,
    payload: studentTasks
});

