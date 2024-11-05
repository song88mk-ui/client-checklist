import { writable } from 'svelte/store';

export const isModalOpen:any = writable(false);
export const modalContent:any = writable(null);

export function openModal(content:any) {
  modalContent.set(content);
  isModalOpen.set(true);
}

export function closeModal() {
  isModalOpen.set(false);
  modalContent.set(null);
}
