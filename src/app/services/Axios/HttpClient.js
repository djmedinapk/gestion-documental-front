import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/gestionDocumental/";
// axios.defaults.headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// }
// axios.interceptors.request.use((config) => {
//     const tokenSec = window.localStorage.getItem('jwt_access_token');
//     if (tokenSec) {
//         config.headers.Authorization = 'Bearer '+ tokenSec;
//         return config;
//     }
// },error => {
//     return Promise.reject(error);
// });
const genericRequest = {
    get : (url) => axios.get(url),
    post : (url, body) => axios.post(url, body),
    put : (url, body) => axios.put(url, body),
    delete: (url) => axios.delete(url),
    getWithParams : (url,params) => axios.get(url,params),
};

export default genericRequest;