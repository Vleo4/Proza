import axios from 'axios';

class Auth {
    constructor(apiPrefix) {
        if (!apiPrefix) throw new Error('apiPrefix is not valid');
        this.apiPrefix = apiPrefix;
    }

    async login(username, password) {
        const response = await axios.post(`${this.apiPrefix}/v1/token/`, {
            username,
            password
        });
        return response.data;
    }

    async register(username, email, password) {
        const response = await axios.post(`${this.apiPrefix}/v1/register/`, {
            username,
            email,
            password
        });
        return response.data;
    }

    async valide(token) {
        const response = await axios.post(`${this.apiPrefix}/v1/token/refresh/`, {
            refresh: token
        });
        return response.data;
    }
}

export default Auth;
