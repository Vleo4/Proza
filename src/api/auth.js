import axios from 'axios';

class Auth {
    constructor(apiPrefix) {
        if (!apiPrefix) throw new Error('apiPrefix is not valid');
        this.apiPrefix = apiPrefix;
    }

    async login(email, password) {
        const response = await axios.post(`${this.apiPrefix}/api/auth/login`, {
            email,
            password
        });
        return response.data;
    }

    async register(name, email, password) {
        const response = await axios.post(`${this.apiPrefix}/api/auth/register`, {
            name,
            email,
            password
        });
        return response.data;
    }
}

export default Auth;
