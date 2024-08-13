import axios from "axios";
import { baseURL } from "./baseURL"
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('AccessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;