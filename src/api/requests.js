import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../utils/storage';
import { ACCESS_TOKEN } from '../constants/localStorageKeys';
import jwtDecode from 'jwt-decode';

const apiURL = 'https://prozaapp.art/api/v1/';
const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
let token;
if (accessToken) {
    token = jwtDecode(accessToken);
}

export const getRecommendations = async () => {
    try {
        const response = await axios.get(apiURL + 'recommendations/?format=json', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        return response.data.reverse();
    } catch (error) {
        console.log(error);
    }
};

export const getArticles = async () => {
    try {
        const response = await axios.get(apiURL + 'article/?format=json');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getArticlesCategories = async (cat) => {
    try {
        const response = await axios.get(
            apiURL + 'getarticlesfromcategory/' + cat + '/?format=json'
        );
        return response.data.reverse();
    } catch (error) {
        console.log(error);
    }
};
export const getArticleId = async (id) => {
    try {
        const response = await axios.get(apiURL + 'article/' + id + '/?format=json');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(apiURL + 'prozauserprofile/?format=json', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getUserProfile = async (author) => {
    try {
        const response = await axios.get(apiURL + 'prozauserprofile/' + author + '/?format=json');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getCurrentUserArticles = async () => {
    try {
        const response = await axios.get(apiURL + 'getcurrentuserarticles/?format=json', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getUserArticles = async (id) => {
    try {
        const response = await axios.get(apiURL + 'getuserarticles/' + id + '/?format=json');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getSavedArticles = async () => {
    try {
        const response = await axios.get(apiURL + 'savedarticles/?format=json', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        return response.data.reverse();
    } catch (error) {
        console.log(error);
    }
};

export const getTopArticles = async () => {
    try {
        const response = await axios.get(apiURL + 'toparticles/?format=json');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const setSubscribeUser = async (author) => {
    try {
        const response = await axios.put(
            apiURL + 'subscription/' + author + '/',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getArticleReviews = async (id) => {
    try {
        const response = await axios.get(apiURL + 'getarticlereviews/' + id + '/?format=json', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const setLike = async (id) => {
    try {
        const response = await axios.put(
            apiURL + 'like/' + id + '/',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const setSave = async (id) => {
    try {
        const response = await axios.put(
            apiURL + 'save/' + id + '/',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const postReview = async (id, text) => {
    const response = await axios.post(
        apiURL + 'reviewcreate/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            user: token.user_id,
            content: text,
            article: id
        },
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );
    return response.data;
};
export const postComplaint = async (message, text, id) => {
    const response = await axios.post(
        apiURL + 'report/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            name: message,
            content: text,
            user: token.user_id,
            article: id
        },
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );
    return response.data;
};
export const deleteArticle = async (id) => {
    const response = await axios.delete(apiURL + 'articledelete/' + id, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    return response.data;
};
export const publishPost = async (title, text, category) => {
    const response = await axios.post(
        apiURL + 'articlecreate/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            title: title,
            content: text,
            cat: category,
            user: token.user_id
        },
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};
export const updateProfile = async (data) => {
    const response = await axios.put(
        apiURL + 'prozauserprofile/update/' + token.user_id + '/',
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + accessToken
            }
        }
    );
    return response.data;
};
export const getAchievements = async (id) => {
    const response = await axios.get(apiURL + 'userachievements/' + id + '/?format=json');
    return response.data;
};
