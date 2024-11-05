import { writable } from 'svelte/store';

export const errorMessage = writable('');
export const isAuthenticated = writable(false);
export const isLoginLoading = writable(false);