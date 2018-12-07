import axios from 'axios';
import { SecureStore } from 'expo'; 


const instance = axios.create({
<<<<<<< HEAD
    baseURL : 'http://192.168.1.124:3001/api/v1/'
=======
    baseURL : 'http://192.168.1.122:3000/api/v1/'
>>>>>>> bdf99bf7d5b76fef4a73c97f9319a6334cfbc7d2
});


export default instance;
