import Vue from 'vue';
import App from './App';
import { router } from './router';
import axios from 'axios';
import Auth from './service/auth-service';
import {ENDPOINTS, HTTP_CODES} from './config/api';

try {
    require('materialize-css');
    require('materialize-css/extras/noUiSlider/nouislider.css');
} catch (e) {}

Vue.config.productionTip = false;

Vue.filter('capitalize', value => {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

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

window.axios = require('axios');
axios.defaults.baseURL = ENDPOINTS.BASE;

Vue.prototype.$http_external = axios.create();

// Register event buss
window.Event = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
