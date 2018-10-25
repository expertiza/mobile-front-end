import axios from 'axios';
import { SecureStore } from 'expo'; 


const instance = axios.create({
    baseURL : 'http://10.153.35.244:3001/api/v1/'
});


export default instance;
