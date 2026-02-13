import { writable } from 'svelte/store';

// Set to true when the LoadingOverlay has finished its sequence
export const isLoaded = writable(false);

// Tracks the currently visible section: 'home', 'about', or 'contact'
export const currentSection = writable('home');

// Curtain State
export const curtainDrop = writable(false);
export const isCurtainDown = writable(false);

// Navigation State
