<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { isLoaded } from "../../stores/globalState";

    let progress = 0;
    let isVisible = true;
    const text = "SARAH CHO LEW";
    const letters = text.split("");

    onMount(() => {
        // Simple progress simulation to give the animations room to breathe
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += Math.random() * 15;
            }
        }, 400);

        // Actual completion check
        const handleLoad = () => {
            progress = 100;
            setTimeout(() => {
                isVisible = false;
                // Signal to CurtainReveal that it can start
                isLoaded.set(true);
            }, 800);
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
    <div class="loading-overlay" out:fade={{ duration: 600 }}>
        <div class="content-wrapper">
            <div class="trademark bounce">
                {#each letters as char, i}
                    <span
                        class="letter"
                        style="--index: {i}; --delay: {i * 0.1}s"
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                {/each}
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width: {progress}%"></div>
            </div>
        </div>

        <!-- Paper texture overlay locally since it's fullscreen -->
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
        z-index: 3000; /* Above Navbar and Curtains */
        overflow: hidden;
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
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 700;
        color: var(--scl-teal-deep);
        display: flex;
        white-space: nowrap;
    }

    .letter {
        display: inline-block;
        animation: bounce 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
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
            transform: translateY(-30px) scaleY(1.1);
        }
        60% {
            transform: translateY(-15px) scaleY(1.05);
        }
    }

    .progress-bar-container {
        width: 300px;
        height: 4px;
        background: rgba(29, 96, 104, 0.1);
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid rgba(29, 96, 104, 0.2);
    }

    .progress-bar {
        height: 100%;
        background: var(--scl-rust);
        transition: width 0.4s ease-out;
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
            width: 200px;
        }
    }
</style>
