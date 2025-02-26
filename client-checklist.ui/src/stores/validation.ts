import { writable } from "svelte/store";

const isErrorValidation = writable<boolean>(false);

export default isErrorValidation;