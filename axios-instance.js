import axios from 'axios';
import { SecureStore } from 'expo';


const instance = axios.create({
    baseURL : 'http://10.152.60.94:3000/api/v1/'
});

export default instance;
