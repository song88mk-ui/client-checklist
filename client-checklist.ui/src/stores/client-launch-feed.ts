import { writable } from "svelte/store";

export const hasBetValidation = writable<boolean>(false);
export const sportsFeed = writable<string[]>([]);
