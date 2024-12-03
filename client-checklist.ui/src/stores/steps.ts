import type Step from "$types/step";
import { writable } from "svelte/store";

const steps = writable<Step[]>([]);

export default steps;