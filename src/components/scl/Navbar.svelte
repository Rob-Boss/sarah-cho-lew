<script>
    import { fade, slide } from "svelte/transition";
    import { spring } from "svelte/motion";
    export let activeSlide = 0;

    let isMenuOpen = false;
    const trademarkText = "SARAH CHO LEW";
    const letters = trademarkText.split("");

    // Initialize a single spring for the entire array of letter states
    let letterSprings = spring(
        letters.map(() => ({ x: 0, y: 0, scale: 1 })),
        {
            stiffness: 0.1,
            damping: 0.25,
        },
    );

    let brandContainer;

    function handleMouseMove(e) {
        if (!brandContainer) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate new offsets for all letters at once
        const newSpringValues = letters.map((char, i) => {
            const letterEl =
                brandContainer.querySelectorAll(".magnetic-wrap")[i];
            if (!letterEl) return { x: 0, y: 0, scale: 1 };

            const letterRect = letterEl.getBoundingClientRect();
            const letterCenterX = letterRect.left + letterRect.width / 2;
            const letterCenterY = letterRect.top + letterRect.height / 2;

            const distanceX = mouseX - letterCenterX;
            const distanceY = mouseY - letterCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            const threshold = 100;
            if (distance < threshold) {
                const power = (threshold - distance) / threshold;
                return {
                    x: distanceX * 0.4 * power,
                    y: distanceY * 0.4 * power,
                    scale: 1 + 0.5 * power,
                };
            }
            return { x: 0, y: 0, scale: 1 };
        });

        letterSprings.set(newSpringValues);
    }

    function resetSprings() {
        letterSprings.set(letters.map(() => ({ x: 0, y: 0, scale: 1 })));
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<nav class="navbar">
    <div class="nav-content">
        <a
            href="/SCL"
            class="brand"
            on:click={closeMenu}
            bind:this={brandContainer}
            on:mousemove={handleMouseMove}
            on:mouseleave={resetSprings}
        >
            {#each letters as char, i}
                <span
                    class="magnetic-wrap"
                    style="transform: translate({$letterSprings[i]
                        .x}px, {$letterSprings[i].y}px) scale({$letterSprings[i]
                        .scale}); z-index: {Math.round(
                        $letterSprings[i].scale * 10,
                    )};"
                >
                    <span class="letter" style="--delay: {i * 0.1}s">
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            {/each}
        </a>

        <!-- Desktop Links -->
        <div class="nav-links desktop-only">
            <a href="/SCL" class="nav-link">WORK</a>
            <a href="/SCL/about" class="nav-link">ABOUT</a>
            <a href="/SCL/contact" class="nav-link">CONTACT</a>
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
            <a href="/SCL" class="mobile-link" on:click={closeMenu}>WORK</a>
            <a href="/SCL/about" class="mobile-link" on:click={closeMenu}
                >ABOUT</a
            >
            <a href="/SCL/contact" class="mobile-link" on:click={closeMenu}
                >CONTACT</a
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

    .brand {
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--scl-teal-deep);
        text-decoration: none;
        letter-spacing: 0.05em;
        display: flex;
        /* Padding to capture mouse events near the letters */
        padding: 1rem;
        margin: -1rem;
    }

    .magnetic-wrap {
        display: inline-block;
        position: relative;
        will-change: transform;
    }

    .letter {
        display: inline-block;
        animation: dance 0.6s step-end infinite;
        animation-delay: var(--delay);
    }

    @keyframes dance {
        0%,
        100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(-1.5px, 1px) rotate(-2deg);
        }
        50% {
            transform: translate(1.5px, -0.5px) rotate(1.5deg);
        }
        75% {
            transform: translate(-0.5px, -1.5px) rotate(-1deg);
        }
    }

    .nav-links {
        display: flex;
        gap: 2.5rem;
    }

    .nav-link {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--scl-teal-deep);
        text-decoration: none;
        position: relative;
        transition: color 0.2s ease;
    }

    .nav-link:hover {
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
