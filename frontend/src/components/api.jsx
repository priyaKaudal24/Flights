const axios = require('axios')
let apiUrl = "http://localhost:8000/";


export async function getFlights(data) {
    return new Promise(function (resolve, reject) {
        axios
            .request({
                method: 'get',
                url: `${apiUrl}flights`,
                headers: { "Content-Type": "application/json" }
            })
            .then(async response => {
                resolve(response);
            })
            .catch(function (err) {
                reject(err.response);
            });
    });
}

export async function postFlights(postData) {
    return new Promise(function (resolve, reject) {
        axios
            .request({
                method: 'post',
                url: `${apiUrl}flights`,
                data: postData,
                headers: { "Content-Type": "application/json" }
            })
            .then(async response => {
                resolve(response);
            })
            .catch(function (err) {
                reject(err.response);
            });
    });
}
