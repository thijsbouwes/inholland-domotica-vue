import axios from "axios/index";
import { ENDPOINTS, HTTP_CODES } from "../config/api";
import { router } from '../router';
import Auth from "./auth-service";

// Add a request interceptor, to add token
axios.interceptors.request.use(config => {
    let token = Auth.getToken();
    if (token) {
        config.headers.common['Authorization'] = token;
    }

    return config;
});

// Add a response interceptor, to check response on auth
axios.interceptors.response.use(null, (error) => {
    let originalRequest = error.config;

    if (error.response.status === HTTP_CODES.UNAUTHORIZED && !originalRequest._retry) {
        console.warn("Access Token expired");
        originalRequest._retry = true;

        return Auth.refreshToken()
            .then(data => {
                // retry request, with new token
                Auth.resetAuthRefreshTokenRequest();
                originalRequest.headers['Authorization'] = Auth.getToken();
                return axios(originalRequest);
            })
            .catch(error => {
                Auth.logout();
                router.push('/login');
                console.warn(error);
            });
    }

    return Promise.reject(error);
});

// Setup base url
axios.defaults.baseURL = ENDPOINTS.BASE;

export default axios;

