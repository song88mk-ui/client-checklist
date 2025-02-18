import { writable } from 'svelte/store';

export const isFormModified = writable<boolean>(false);
