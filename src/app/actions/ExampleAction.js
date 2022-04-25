import HttpClient from './../services/Axios/HttpClient';

export const getExampleTransaction = () => {
    return new Promise((resolve, reject) => {
        HttpClient.get('/api/Example').then( resp => {
            resolve(resp);
        });
    });
}