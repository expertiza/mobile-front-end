import axios from 'axios';
import { SecureStore } from 'expo';


const instance = axios.create({
    baseURL : 'http://10.152.53.68:3000/api/v1/'
});

export default instance;
