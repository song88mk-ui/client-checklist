import { writable } from "svelte/store";

export const isFormModified = writable<boolean>(false);

const isErrorValidation = writable<boolean>(false);

export default isErrorValidation;