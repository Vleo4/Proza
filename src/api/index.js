/* eslint-disable no-undef */
import Auth from './auth';
import Posts from './posts';
const apiPrefix = process.env.REACT_APP_API_PREFIX;

const api = {
    auth: new Auth(apiPrefix),
    posts: new Posts(apiPrefix)
};

export default api;
