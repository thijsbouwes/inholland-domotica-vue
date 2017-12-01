import Vue from 'vue';
import App from './App';
import { router } from './router';
import axios from 'axios';
import Auth from './service/auth-service';
import {ENDPOINTS, HTTP_CODES} from './config/api';

try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');
    require('./theme-settings');
} catch (e) {}

Vue.config.productionTip = false;

// Add a request interceptor, to add token
axios.interceptors.request.use(config => {

    let token = Auth.getToken();

    if (token) {
        config.headers.common['Authorization'] = "Token " + token;
    }

    return config;
});

// Add a response interceptor, to check response
axios.interceptors.response.use(response => {
    console.log("token blabla hell");
    
    return response;


    },error => {
        console.log("hello 1233");

        if (error.response.status === HTTP_CODES.UNAUTHORIZED) {
            console.warn("Access Token expired");

            Auth.refreshToken()
                .catch(error => {
                    console.warn(error);
                    router.push('/');
                });
        }

    return Promise.reject(error);
});

window.axios = require('axios');
axios.defaults.baseURL = ENDPOINTS.BASE;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
