import { writable } from 'svelte/store';

export const dark = writable(false);
export const showLeftMenu = writable(false);
export const notificationsMenu = writable([]);