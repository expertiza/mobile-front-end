import axios from 'axios';
import { SecureStore } from 'expo'; 


const instance = axios.create({
    baseURL : 'http://152.46.17.203:3001/api/v1/'
});


export default instance;
