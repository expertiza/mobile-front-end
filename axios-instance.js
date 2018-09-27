import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://10.155.2.54:3001/api/v1/'
});

export default instance;