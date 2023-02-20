import api from 'api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/localStorageKeys';
import { createContext, useContext, useEffect, useState } from 'react';
import checkIsTokenExpiry from 'utils/checkIsTokenExpiry';
import {
    clearStorages,
    getFromLocalStorage,
    getFromSessionStorage,
    saveToLocalStorage,
    saveToSessionStorage
} from 'utils/storage';

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isSessionLogin: false,
        isAuthentificated: false,
        isLoading: true,
        user: null
    });
    const sessionRefresh = getFromSessionStorage(REFRESH_TOKEN);
    const localRefresh = getFromLocalStorage(REFRESH_TOKEN);

    useEffect(() => {
        const checkAuth = async () => {
            if (!sessionRefresh && !localRefresh) return;

            setAuthState((state) => ({
                ...state,
                isLoading: true
            }));

            try {
                const isExpired = await checkIsTokenExpiry();

                if (isExpired.refreshToken) {
                    clearStorages();
                    window.location.href = '/login';
                    return;
                }

                if (isExpired.accessToken) {
                    const saveHandler = sessionRefresh ? saveToSessionStorage : saveToLocalStorage;
                    const data = await api.auth.valide(sessionRefresh ?? localRefresh);

                    saveHandler(ACCESS_TOKEN, data.access);
                    saveHandler(REFRESH_TOKEN, data.refresh);
                }

                setAuthState((state) => ({
                    ...state,
                    isLoading: false,
                    isSessionLogin: !!sessionRefresh,
                    isAuthentificated: true
                }));
            } catch {
                setAuthState((state) => ({
                    ...state,
                    isAuthentificated: false,
                    isLoading: false
                }));
            }
        };

        checkAuth();
    }, []);

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const state = useContext(AuthContext);

    return state;
};

export default AuthContextProvider;
