export const getSessionValue = (key: string, defaultValue: (string | null) = ''): (string | null) => {
    return localStorage.getItem(key) || defaultValue;
}

export const setSessionValue = (key: string, value: string | number): void => {
    return localStorage.setItem(key, value.toString());
}

export const getSessionValueAsJson = (key: string, defaultValue: any = {}) => {
    return JSON.parse(localStorage.getItem(key) || '{}') || defaultValue;
}

export const setSessionValueAsJson = (key: string, value: any): void => {
    return localStorage.setItem(key, JSON.stringify(value || {}));
}

export const removeSessionValue = (key: string): void => {
    return localStorage.removeItem(key);
}

export const toNumber = (value: (string | null)) => {
    return value ? parseInt(value) : null;
}