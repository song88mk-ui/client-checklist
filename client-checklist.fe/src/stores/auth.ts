import { writable } from "svelte/store";
import type Auth from "../types/auth";

const initAuth = JSON.parse(localStorage.getItem("auth") || "null");
export const auth = writable<Auth | null>(initAuth);

export const setAuth = (newAuth: Auth) => {
  localStorage.setItem("auth", JSON.stringify(newAuth));
  auth.set(newAuth);
};

export const removeAuth = () => {
  localStorage.removeItem("auth");
  auth.set(null);
};
