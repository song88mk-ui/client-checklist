import { writable } from "svelte/store";
import type Auth from "$types/auth";

const auth = writable<Auth | null>(null);

export default auth;