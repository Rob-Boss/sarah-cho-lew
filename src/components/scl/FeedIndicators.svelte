<script>
    import { onMount } from "svelte";
    export let totalSlides = 0;
    export let container = null;

    let activeIndex = 0;

    onMount(() => {
        const feedContainer =
            container || document.querySelector(".stage-feed");
        if (!feedContainer) return;

        const handleScroll = () => {
            const scrollPos = feedContainer.scrollTop;
            const slideHeight = feedContainer.clientHeight;
            activeIndex = Math.round(scrollPos / slideHeight);
        };

        feedContainer.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        // Finalize reference for click handler
        if (!container) container = feedContainer;

        return () => feedContainer.removeEventListener("scroll", handleScroll);
    });

    function scrollToSlide(index) {
        if (!container) return;
        container.scrollTo({
            top: index * container.clientHeight,
            behavior: "smooth",
        });
    }
</script>

<div class="indicators">
    {#each Array(totalSlides) as _, i}
        <button
            class="dot"
            class:active={activeIndex === i}
            on:click={() => scrollToSlide(i)}
            aria-label="Go to slide {i + 1}"
        ></button>
    {/each}
</div>

<style>
    .indicators {
        position: fixed;
        /* Moved to LEFT side */
        left: calc(var(--scl-curtain-width) + 2rem);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        z-index: 30; /* Prince Layer */
        pointer-events: auto;
    }

    .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--scl-rust, #c44a2d);
        opacity: 0.6; /* Higher base opacity */
        border: 2px solid white; /* White border to separate from background */
        padding: 0;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .dot:hover {
        opacity: 0.9;
        transform: scale(1.2);
    }

    .dot.active {
        opacity: 1;
        transform: scale(1.6);
        background: var(--scl-rust);
        border-color: var(--scl-cream);
        box-shadow: 0 0 15px rgba(196, 74, 45, 0.5);
    }

    @media (max-width: 768px) {
        .indicators {
            left: calc(var(--scl-curtain-width) + 1rem);
            gap: 1rem;
        }
        .dot {
            width: 8px;
            height: 8px;
        }
    }
</style>
