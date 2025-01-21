import type Step from "$types/step";
import { writable } from "svelte/store";

const steps2 = writable<Step[]>([]);