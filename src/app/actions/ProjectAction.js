import HttpClient from './../services/Axios/HttpClient';

export const getProjectsTransaction = () => {
    return new Promise((resolve, reject) => {
        HttpClient.get('/api/Project').then( resp => {
            resolve(resp);
        });
    });
}