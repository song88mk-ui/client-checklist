import { writable } from "svelte/store";

const isConfirm = writable<boolean>(false);

export default isConfirm;