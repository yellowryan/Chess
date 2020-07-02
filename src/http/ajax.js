import axios from 'axios'
import Vue from 'vue'

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

axios.interceptors.request.use(config => {

    return config;
}, error => {
    return Promise.reject(error);
});



axios.interceptors.response.use(response => {

    return response;
}, function (error) {
    Vue.prototype.$message({
        type: 'error',
        message: error.response.data.message
    })

    return Promise.reject(error);
});


export function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {
        return axios.get(url, {
            params: data
        })
    } else {
        return axios.post(url, data)
    }
}