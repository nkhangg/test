import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8019/api/',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
    },
});

export default axiosConfig;
