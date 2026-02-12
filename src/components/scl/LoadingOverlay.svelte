<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { cubicIn } from "svelte/easing";
    import { isLoaded } from "../../stores/globalState";

    let progress = 0;
    let isVisible = true;
    const text = "SARAH CHO LEW";
    const letters = text.split("");

    const MIN_LOAD_TIME = 3500; // Increased to 3.5s for authenticity
    const startTime = Date.now();

    onMount(() => {
        // Very slow, deliberate progress simulation
        const interval = setInterval(() => {
            if (progress < 95) {
                progress += Math.random() * 2; // Tiny increments
            }
        }, 1200); // Very slow frequency

        const handleLoad = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_LOAD_TIME - elapsed);

            // Wait until the minimum time has passed to make it "believable"
            setTimeout(() => {
                progress = 100;
                setTimeout(() => {
                    isVisible = false;
                    // Signal to CurtainReveal that it can start
                    isLoaded.set(true);
                }, 400); // Hold at 100% briefly before roll-up
            }, remaining);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener("load", handleLoad);
        };
    });
</script>

{#if isVisible}
    <!-- Full-screen mechanical roll-up transition (No Fades!) -->
    <div
        class="loading-overlay"
        out:fly={{ y: "-100%", duration: 800, easing: cubicIn }}
    >
        <div class="content-wrapper">
            <div class="trademark bounce">
                {#each letters as char, i}
                    <span
                        class="letter"
                        style="--index: {i}; --delay: {i * 0.08}s"
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                {/each}
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width: {progress}%"></div>
            </div>
            <span class="status-text">INITIALIZING STAGE...</span>
        </div>

        <div class="texture-overlay"></div>
    </div>
{/if}

<style>
    .loading-overlay {
        position: fixed;
        inset: 0;
        background: var(--scl-cream);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        overflow: hidden;
        /* Hardware acceleration for smooth roll-up */
        will-change: transform;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        position: relative;
        z-index: 10;
    }

    .trademark {
        font-size: clamp(2.5rem, 6vw, 4.5rem);
        font-weight: 700;
        color: var(--scl-teal-deep);
        display: flex;
        white-space: nowrap;
    }

    .letter {
        display: inline-block;
        /* Sped up from 1.2s to 1s */
        animation: bounce 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
        animation-delay: var(--delay);
    }

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0) scaleY(1);
        }
        40% {
            transform: translateY(-35px) scaleY(1.15);
        }
        60% {
            transform: translateY(-18px) scaleY(1.1);
        }
    }

    .progress-bar-container {
        width: 320px;
        height: 6px;
        background: rgba(29, 96, 104, 0.1);
        border: 2px solid var(--scl-teal-deep);
        padding: 2px;
        border-radius: 0; /* Boxy, mechanical look */
    }

    .progress-bar {
        height: 100%;
        background: var(--scl-rust);
        transition: width 0.8s ease-out;
    }

    .status-text {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        color: var(--scl-teal-deep);
        opacity: 0.6;
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

    @media (max-width: 768px) {
        .progress-bar-container {
            width: 220px;
        }
    }
</style>
