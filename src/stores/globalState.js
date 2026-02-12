import { writable } from 'svelte/store';

// Set to true when the LoadingOverlay has finished its sequence
export const isLoaded = writable(false);
