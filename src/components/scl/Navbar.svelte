<script>
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { cubicOut } from "svelte/easing";
    import MagneticText from "./MagneticText.svelte";
    import {
        currentSection,
        curtainDrop,
        isCurtainDown,
    } from "../../stores/globalState";

    export let activeSlide = 0;

    let isMenuOpen = false;
    let pendingSection = null;

    onMount(() => {
        curtainDrop.set(false);
    });

    // Reactive: When curtain hits bottom, partial swap content
    $: if ($isCurtainDown && pendingSection) {
        finishNavigation();
    }

    async function finishNavigation() {
        if (!pendingSection) return;

        // 1. Swap Content
        currentSection.set(pendingSection);
        pendingSection = null;

        // 2. Lift Curtain
        // Small delay to ensure DOM updates before lifting
        await wait(50);
        curtainDrop.set(false);
    }

    // Data-driven nav items for shuffling
    let navItems = [
        { id: "home", label: "WORK", href: "/SCL" },
        { id: "about", label: "ABOUT", href: "/SCL/about" },
        { id: "contact", label: "CONTACT", href: "/SCL/contact" },
    ];

    // Custom Flip Animation for "Arcing" movement
    const FLIP_DURATION = 600;

    function arcFlip(node, { from, to }, params = {}) {
        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;

        const [dx, dy] = [from.left - to.left, from.top - to.top];

        const d = Math.sqrt(dx * dx + dy * dy);
        const {
            delay = 0,
            duration = (d) => Math.sqrt(d) * 120,
            easing = cubicOut,
        } = params;

        // Arc intensity - how high/low it dips
        const arcAmount = 25;
        const threshold = 10; // Minimum movement in px to trigger an arc

        return {
            delay,
            duration: typeof duration === "function" ? duration(d) : duration,
            easing,
            css: (t, u) => {
                // If movement is negligible, just do a normal transform without arc
                if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
                    return `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`;
                }

                const yOffset = Math.sin(t * Math.PI) * arcAmount;
                const directionalY = -Math.sign(dx) * yOffset;

                return `transform: ${transform} translate(${u * dx}px, ${u * dy + directionalY}px);`;
            },
        };
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }

    // Helper to generic wait
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    async function handleNav(targetSection, event) {
        event.preventDefault();

        // Even if we are on the current section, if we click again we might want to refresh?
        // But generally:
        if ($currentSection === targetSection && !pendingSection) {
            closeMenu();
            return;
        }

        closeMenu();

        // 1. Queue the Navigation
        pendingSection = targetSection;

        // 2. Drop the curtain (Reactive: If already dropping, it continues. If lifting, it reverses.)
        curtainDrop.set(true);

        // 3. Shuffle Links Visually
        const targetIndex = navItems.findIndex(
            (item) => item.id === targetSection,
        );
        let steps = targetIndex;

        for (let i = targetIndex; i > 0; i--) {
            const items = [...navItems];
            const temp = items[i];
            items[i] = items[i - 1];
            items[i - 1] = temp;
            navItems = items;

            await wait(FLIP_DURATION);
        }
    }
</script>

<nav class="navbar">
    <div class="nav-content">
        <!-- Brand with Magnetic Interaction -->
        <div class="brand-container">
            <MagneticText
                text="SARAH CHO LEW"
                href="/SCL"
                className="brand"
                onClick={(e) => handleNav("home", e)}
            />
        </div>

        <!-- Desktop Links with Shuffling Interaction -->
        <div class="nav-links desktop-only">
            {#each navItems as item (item.id)}
                <div animate:arcFlip={{ duration: 600 }}>
                    <MagneticText
                        text={item.label}
                        href={item.href}
                        className="nav-link {$currentSection === item.id
                            ? 'active'
                            : ''}"
                        onClick={(e) => handleNav(item.id, e)}
                    />
                </div>
            {/each}
        </div>

        <!-- Mobile Toggle -->
        <button
            class="mobile-toggle"
            on:click={toggleMenu}
            aria-label="Toggle Menu"
            class:open={isMenuOpen}
        >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </div>
</nav>

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
    <div class="mobile-menu" transition:slide={{ duration: 400 }}>
        <div class="mobile-links">
            <a
                href="/SCL"
                class="mobile-link"
                on:click={(e) => handleNav("home", e)}>WORK</a
            >
            <a
                href="/SCL/about"
                class="mobile-link"
                on:click={(e) => handleNav("about", e)}>ABOUT</a
            >
            <a
                href="/SCL/contact"
                class="mobile-link"
                on:click={(e) => handleNav("contact", e)}>CONTACT</a
            >
        </div>

        <!-- Subtle paper texture for the mobile menu too -->
        <div class="texture-overlay"></div>
    </div>

    <!-- Backdrop to close menu -->
    <div
        class="backdrop"
        on:click={closeMenu}
        transition:fade={{ duration: 200 }}
    ></div>
{/if}

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: var(--scl-cream);
        border-bottom: 2px solid var(--scl-rust);
        z-index: 2000; /* High Layer - Above Curtains */
        display: flex;
        align-items: center;
        padding: 0 2rem;

        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-size: 100px 100px;
        background-blend-mode: soft-light;
    }

    .nav-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 10;
    }

    .brand-container :global(.brand) {
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--scl-teal-deep);
        letter-spacing: 0.05em;
    }

    .nav-links {
        display: flex;
        gap: 1.5rem; /* Tighter gap for individual magnetic blocks */
    }

    .nav-links :global(.nav-link) {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--scl-teal-deep);
        transition: color 0.2s ease;
    }

    .nav-links :global(.nav-link:hover) {
        opacity: 0.8; /* Subtle feedback instead of color change */
    }

    .nav-links :global(.nav-link.active) {
        color: var(--scl-rust);
    }

    /* Mobile Menu Toggle Button */
    .mobile-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 20px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .bar {
        width: 100%;
        height: 3px;
        background-color: var(--scl-teal-deep);
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    /* Mobile Menu Styles */
    .mobile-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: var(--scl-cream);
        border-bottom: 4px solid var(--scl-rust);
        z-index: 1999;
        padding: 2rem 0;
        overflow: hidden;
    }

    .texture-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-size: 100px 100px;
        background-blend-mode: soft-light;
        opacity: 0.5;
    }

    .mobile-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        position: relative;
        z-index: 2;
    }

    .mobile-link {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--scl-teal-deep);
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1998;
        backdrop-filter: blur(2px);
    }

    @media (max-width: 768px) {
        .desktop-only {
            display: none;
        }

        .mobile-toggle {
            display: flex;
        }

        .mobile-toggle.open .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .mobile-toggle.open .bar:nth-child(2) {
            opacity: 0;
        }
        .mobile-toggle.open .bar:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    }
</style>
