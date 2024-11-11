export const getValue = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const setValue = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const removeValue = (key: string) => {
    localStorage.removeItem(key);
}

export const LocalStorage = {
    getValue,
    setValue,
    removeValue
} 