import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/localStorageKeys';
import { getFromLocalStorage, getFromSessionStorage } from './storage';

async function checkIsTokenExpiry() {
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const refreshToken = getFromSessionStorage(REFRESH_TOKEN) ?? getFromLocalStorage(REFRESH_TOKEN);
    if (!accessToken || !refreshToken) {
        return {
            accessToken: true,
            refreshToken: true
        };
    }

    const decodedAccess = jwtDecode(accessToken);
    const decodedRefresh = jwtDecode(refreshToken);
    const ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS = 2 * 24 * 60 * 60; // 2 days in seconds
    const REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days in seconds
    const isExpiredAccess =
        decodedAccess.exp < Date.now() / 1000 - ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS;
    const isExpiredRefresh =
        decodedRefresh.exp < Date.now() / 1000 - REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS;
    return {
        accessToken: isExpiredAccess,
        refreshToken: isExpiredRefresh
    };
}

export default checkIsTokenExpiry;
