import { writable } from 'svelte/store';
import IntegrationType from '$enums/integrationType';

const selectedIntegrationType = writable<IntegrationType>(IntegrationType.WALLET_INTEGRATION);

export default selectedIntegrationType
