import Auth from './auth';

const apiPrefix = 'https://example.com/api';

const api = {
    auth: new Auth(apiPrefix)
};

export default api;
