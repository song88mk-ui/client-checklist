const isBrowser = typeof window !== 'undefined';


export const getValue = (key: string) => {
    if (!isBrowser) return null;
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const setValue = (key: string, value: string) => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
}

export const removeValue = (key: string) => {
    if (!isBrowser) return;
    localStorage.removeItem(key);
}

export const LocalStorage = {
    getValue,
    setValue,
    removeValue
} 