import {ENDPOINTS} from "../config/api";

class AuthService {
    login(email, password) {
        let data = {email, password};

        // Login
        return axios.post(ENDPOINTS.LOGIN, data)
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

        // Login
        return axios.post(ENDPOINTS.REGISTER, data)
            .then(response => {
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    refreshToken() {
        // Get refresh token
        return axios.post(ENDPOINTS.LOGIN_REFRESH, {token: this.getRefreshToken()})
            .then(response => {
                this.updateTokens(response.data.access_token, response.data.refresh_token);
                return Promise.resolve(response);
            })
            .catch(error => {
                this.logout();
                return Promise.reject(new Error('Refresh and Access Tokens have expired'));
            });
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
        return localStorage.getItem('token');
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }
}

export default new AuthService();