<script>
    import { fade, slide } from "svelte/transition";
    import MagneticText from "./MagneticText.svelte";
    import { currentSection, curtainDrop } from "../../stores/globalState";

    export let activeSlide = 0;

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }

    function handleNav(targetSection, event) {
        event.preventDefault();

        // If we're already on this section, do nothing
        if ($currentSection === targetSection) {
            closeMenu();
            return;
        }

        closeMenu();

        // 1. Drop the curtain
        curtainDrop.set(true);

        // 2. Wait for curtain to fully cover (approx 1000ms based on frames)
        // usage of 80ms * 12 frames approx = 960ms
        setTimeout(() => {
            // 3. Swap content
            currentSection.set(targetSection);

            // 4. Lift curtain (reset drop trigger)
            // Small buffer to ensure DOM update
            setTimeout(() => {
                curtainDrop.set(false);
            }, 100);
        }, 1100);
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

        <!-- Desktop Links with Magnetic Interaction -->
        <div class="nav-links desktop-only">
            <MagneticText
                text="WORK"
                href="/SCL"
                className="nav-link {$currentSection === 'home'
                    ? 'active'
                    : ''}"
                onClick={(e) => handleNav("home", e)}
            />
            <MagneticText
                text="ABOUT"
                href="/SCL/about"
                className="nav-link {$currentSection === 'about'
                    ? 'active'
                    : ''}"
                onClick={(e) => handleNav("about", e)}
            />
            <MagneticText
                text="CONTACT"
                href="/SCL/contact"
                className="nav-link {$currentSection === 'contact'
                    ? 'active'
                    : ''}"
                onClick={(e) => handleNav("contact", e)}
            />
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
