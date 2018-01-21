import { ENDPOINTS } from '../config/api';
import request from './request';
let authRefreshTokenRequest;

class AuthService {
    login(email, password) {
        let data = {email, password};

        // Login
        return request.post(ENDPOINTS.LOGIN, data)
            .then(response => {
                this.updateTokens(response.data.access_token, response.data.refresh_token);
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    register(name, email, password) {
        let data = {name, email, password};

        // Register
        return request.post(ENDPOINTS.REGISTER, data)
            .then(response => {
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    requestRefreshToken() {
        // Get refresh token
        return request.post(ENDPOINTS.LOGIN_REFRESH, {token: this.getRefreshToken()})
            .then(response => {
                this.updateTokens(response.data.access_token, response.data.refresh_token);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(new Error('Refresh and Access Tokens have expired'));
            });
    }

    // Check if we are already making a token refresh request
    refreshToken() {
        if (!authRefreshTokenRequest) {
            authRefreshTokenRequest = this.requestRefreshToken();
            return authRefreshTokenRequest;
        }

        return authRefreshTokenRequest;
    }

    // Reset auth refresh request
    resetAuthRefreshTokenRequest() {
        authRefreshTokenRequest = null;
    }

    isLoggedIn() {
        return Boolean(localStorage.getItem('token'));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }

    updateTokens(token, refreshToken) {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refreshToken);
    }

    getToken() {
        return "Token " + localStorage.getItem('token');
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }
}

export default new AuthService();