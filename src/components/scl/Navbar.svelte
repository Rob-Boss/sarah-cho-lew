<script>
    import { fade, slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { cubicOut } from "svelte/easing";
    import MagneticText from "./MagneticText.svelte";
    import { currentSection, curtainDrop } from "../../stores/globalState";

    export let activeSlide = 0;

    let isMenuOpen = false;

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
                // This prevents floating point jitter or tiny layout shifts from causing a bounce
                if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
                    return `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`;
                }

                // t goes 0 -> 1 (progress)
                // u goes 1 -> 0 (inverted progress)

                // Parabolic arc (sine wave)
                const yOffset = Math.sin(t * Math.PI) * arcAmount;

                // Directional Logic:
                // Moving Left (dx > 0): Arc Up (-yOffset)
                // Moving Right (dx < 0): Arc Down (+yOffset)
                // We multiply yOffset by sign of dx, but negative y is Up.
                // So: if dx > 0, we want -yOffset. if dx < 0, we want +yOffset.
                // -Math.sign(dx) * yOffset

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

        if ($currentSection === targetSection) {
            closeMenu();
            return;
        }

        closeMenu();

        // 1. Drop the curtain
        curtainDrop.set(true);

        // 2. Sequential Shuffle Logic
        const targetIndex = navItems.findIndex(
            (item) => item.id === targetSection,
        );

        // We only care if we aren't already at 0 (which shouldn't happen due to currentSection check,
        // but physically the list might be different if we allowed random shuffling).
        // Since we always move TO index 0:

        let steps = targetIndex; // If at index 2, we need 2 swaps (2->1, 1->0)

        for (let i = targetIndex; i > 0; i--) {
            // Swap item at i with item at i-1
            const items = [...navItems];
            const temp = items[i];
            items[i] = items[i - 1];
            items[i - 1] = temp;
            navItems = items;

            // Wait for animation to finish before next hop
            await wait(FLIP_DURATION);
        }

        // Calculate visual duration vs required curtain duration
        // Each hop is 600ms.
        // If 1 hop: 600ms. Curtain needs ~1000ms. We wait 400ms more.
        // If 2 hops: 1200ms. Curtain is down. We can swap immediately.

        const totalShuffleTime = steps * FLIP_DURATION;
        const minCurtainTime = 1100;
        const remainingTime = minCurtainTime - totalShuffleTime;

        if (remainingTime > 0) {
            await wait(remainingTime);
        }

        // 3. Swap Content
        currentSection.set(targetSection);

        // 4. Lift Curtain
        await wait(100);
        curtainDrop.set(false);
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
