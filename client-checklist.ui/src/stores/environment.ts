import Environment from '$enums/Environment';
import { writable } from 'svelte/store';

const environment = writable<Environment>(Environment.STAGING);

export default environment;
