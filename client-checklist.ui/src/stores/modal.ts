import type { Component } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const isModalOpen: Writable<boolean> = writable(false);
export const modalContent: Writable<Component | null> = writable(null);
export const modalProps: Writable<Record<string, unknown> | null> = writable({});

export function openModal(content: Component, props: Record<string, unknown> = {}) {
	modalContent.set(content);
	modalProps.set(props);
	isModalOpen.set(true);
}

export function closeModal() {
	isModalOpen.set(false);
	modalContent.set(null);
	modalProps.set(null);
}
