import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: '',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
    },
});

export default axiosConfig;
