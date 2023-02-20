import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/localStorageKeys';
import { getFromLocalStorage, getFromSessionStorage } from './storage';

async function checkIsTokenExpiry() {
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const refreshToken = getFromSessionStorage(REFRESH_TOKEN) ?? getFromLocalStorage(REFRESH_TOKEN);

    if (!accessToken || !refreshToken) return {
        accessToken: true,
        refreshToken: true
    };

    const decodedAccess = jwtDecode(accessToken);
    const decodedRefresh = jwtDecode(refreshToken);
    const isExpiredAccess = decodedAccess.exp < (Date.now() - 1000 * 60 * 5) / 1000;
    const isExpiredRefresh = decodedRefresh.exp < (Date.now() - 1000 * 60 * 5) / 1000;

    return {
        accessToken: isExpiredAccess,
        refreshToken: isExpiredRefresh
    };
}

export default checkIsTokenExpiry;
