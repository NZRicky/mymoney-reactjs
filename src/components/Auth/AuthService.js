import decode from 'jwt-decode';

export default class AuthService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl ||  'http://localhost:8080';
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
        return token && !this.isTokenExpired(token);
    }
    fetch(url, options) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'applicatioin/json');

        return fetch(url, {
            headers,
            ...options
        });
    }

    login(username, password) {
        return this.fetch(`${this.baseUrl}/auth/login`, {
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
}