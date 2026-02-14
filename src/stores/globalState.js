import { writable } from 'svelte/store';

// Set to true when the LoadingOverlay has finished its sequence
export const isLoaded = writable(false);

// Detect initial section from URL path
function getInitialSection() {
    if (typeof window === 'undefined') return 'about';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/film')) return 'film';
    if (path.includes('/live')) return 'live';
    if (path.includes('/contact')) return 'contact';
    return 'about'; // default landing
}

// Tracks the currently visible section
export const currentSection = writable(getInitialSection());

// URL path map for pushState
export const sectionPaths = {
    about: '/SCL',
    film: '/SCL/film',
    live: '/SCL/live',
    contact: '/SCL/contact',
};

// Curtain State
export const curtainDrop = writable(false);
export const isCurtainDown = writable(false);

// Navigation State
