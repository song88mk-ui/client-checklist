import type { Component } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const isModalOpen: Writable<boolean> = writable(false);
export const modalContent: Writable<Component | null> = writable(null);

export function openModal(content: Component) {
	modalContent.set(content);
	isModalOpen.set(true);
}

export function closeModal() {
	isModalOpen.set(false);
	modalContent.set(null);
}
