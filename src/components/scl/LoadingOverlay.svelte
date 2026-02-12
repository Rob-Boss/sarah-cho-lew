<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { isLoaded } from "../../stores/globalState";

    let progress = 0;
    let isVisible = true;
    const text = "SARAH CHO LEW";
    const letters = text.split("");

    onMount(() => {
        // Deliberate progress simulation
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += Math.random() * 4; // Smaller increments
            }
        }, 800); // Slower frequency

        const handleLoad = () => {
            progress = 100;
            // Short delay to let the user see the 100% state
            setTimeout(() => {
                isVisible = false;
                // Signal to CurtainReveal that it can start
                isLoaded.set(true);
            }, 600);
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
    <div class="loading-overlay">
        <!-- Shutter Panels -->
        <div
            class="shutter shutter-top"
            out:fly={{ y: "-100%", duration: 1000, easing: cubicOut }}
        >
            <div class="texture-overlay"></div>
        </div>
        <div
            class="shutter shutter-bottom"
            out:fly={{ y: "100%", duration: 1000, easing: cubicOut }}
        >
            <div class="texture-overlay"></div>
        </div>

        <div
            class="content-wrapper"
            out:fly={{ y: -50, opacity: 0, duration: 400 }}
        >
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
        </div>
    </div>
{/if}

<style>
    .loading-overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        overflow: hidden;
    }

    .shutter {
        position: absolute;
        left: 0;
        width: 100%;
        height: 51%; /* Slight overlap to prevent gap */
        background: var(--scl-cream);
        z-index: 1;
    }

    .shutter-top {
        top: 0;
        /* "Torn" bottom edge */
        clip-path: polygon(
            0% 0%,
            100% 0%,
            100% 95%,
            95% 100%,
            90% 95%,
            85% 100%,
            80% 95%,
            75% 100%,
            70% 95%,
            65% 100%,
            60% 95%,
            55% 100%,
            50% 95%,
            45% 100%,
            40% 95%,
            35% 100%,
            30% 95%,
            25% 100%,
            20% 95%,
            15% 100%,
            10% 95%,
            5% 100%,
            0% 95%
        );
    }

    .shutter-bottom {
        bottom: 0;
        /* "Torn" top edge */
        clip-path: polygon(
            0% 5%,
            5% 0%,
            10% 5%,
            15% 0%,
            20% 5%,
            25% 0%,
            30% 5%,
            35% 0%,
            40% 5%,
            45% 0%,
            50% 5%,
            55% 0%,
            60% 5%,
            65% 0%,
            70% 5%,
            75% 0%,
            80% 5%,
            85% 0%,
            90% 5%,
            95% 0%,
            100% 5%,
            100% 100%,
            0% 100%
        );
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
        /* Sped up from 2s to 1.2s */
        animation: bounce 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
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
        transition: width 0.6s ease-out; /* Smoother bar transition */
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
