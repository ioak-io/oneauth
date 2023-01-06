export const getSessionValue = (key: string, defaultValue: string = ''): string => {
    return sessionStorage.getItem(key) || defaultValue;
}

export const setSessionValue = (key: string, value: string): void => {
    return sessionStorage.setItem(key, value);
}

export const removeSessionValue = (key: string): void => {
    return sessionStorage.removeItem(key);
}
