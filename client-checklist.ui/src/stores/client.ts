import { writable } from 'svelte/store';
import { type Clients, type Client } from '$types/client';

export const clients = writable<Clients>([]);

export const selectedClient = writable<Client | null>(null);

export const selectedClientId = writable<string | null>(null);

export const deletedClient = writable<Client | null>(null);
