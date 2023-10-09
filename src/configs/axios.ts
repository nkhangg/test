import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8019/api/',
    timeout: 4000,
    headers: {
        'Content-type': 'application/json; charset=utf-8',
    },
});

export default axiosConfig;
