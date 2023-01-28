import Auth from './auth';

const apiPrefix = process.env.REACT_APP_API_PREFIX;

const api = {
    auth: new Auth(apiPrefix)
};

export default api;
