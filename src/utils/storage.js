export const getFromLocalStorage = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value;
    } catch {
        return null;
    }
};

export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = (key) => {
    try {
        const value = JSON.parse(sessionStorage.getItem(key));
        return value;
    } catch {
        return null;
    }
};

export const saveToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const clearStorages = () => {
    sessionStorage.clear();
    localStorage.clear();
}
