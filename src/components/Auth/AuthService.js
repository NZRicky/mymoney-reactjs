import decode from 'jwt-decode';

export default class AuthService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || 'http://mymoney.local/api';
    }


    getToken() {
        return localStorage.getItem('token');
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    isLoggedIn() {
        const token = this.getToken();
        return (token && !this.isTokenExpired(token));
    }
    fetch(uri, options) {
        //this.logout();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'applicatioin/json');

        if (this.isLoggedIn()) {
            headers.append('Authorization', 'Bearer ' + this.getToken());
        }
        return fetch(this.baseUrl + uri, {
            headers,
            ...options
        }).then(res => {
            if (res.status >= 200 && res.status < 300) { // Success status lies between 200 to 300
                return res
            } else {
                var error = new Error(res.statusText)
                error.response = res
                throw error
            }
        }).then(res => res.json())
    }

    login(username, password) {
        return this.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res);
        });
    }

    logout() {
        localStorage.removeItem('token');
    }
}