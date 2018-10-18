import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://10.152.12.134:3000/api/v1/'
});

export default instance;
