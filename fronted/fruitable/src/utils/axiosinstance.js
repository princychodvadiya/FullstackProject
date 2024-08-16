import axios from "axios";
import { baseURL } from "./baseURL"
import Cookies from 'js-cookie'
import { logout } from "../redux/reducer/slice/login.slice";

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

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(baseURL + '/users/generateNewTokens', {}, { withCredentials: true })
                console.log("axiosInstance generateNewTokens", response);

                if (response.status === 200) {
                    const { AccessToken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${AccessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/store').configStore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;