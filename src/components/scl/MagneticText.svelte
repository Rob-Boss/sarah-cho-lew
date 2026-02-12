<script>
    import { spring } from "svelte/motion";
    import { onMount } from "svelte";

    export let text = "";
    export let href = "";
    export let className = "";
    export let onClick = () => {};

    const letters = text.split("");

    // Spring for all letters in this specific text block
    const letterSprings = spring(
        letters.map(() => ({ x: 0, y: 0, scale: 1 })),
        {
            stiffness: 0.1,
            damping: 0.25,
        },
    );

    let container;

    function handleMouseMove(e) {
        if (!container) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const newValues = letters.map((_, i) => {
            const letterEl = container.querySelectorAll(".magnetic-wrap")[i];
            if (!letterEl) return { x: 0, y: 0, scale: 1 };

            const rect = letterEl.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const threshold = 100;
            if (distance < threshold) {
                const power = (threshold - distance) / threshold;
                return {
                    x: dx * 0.35 * power, // Slightly reduced pull for links
                    y: dy * 0.35 * power,
                    scale: 1 + 0.4 * power, // Slightly reduced scale for links
                };
            }
            return { x: 0, y: 0, scale: 1 };
        });

        letterSprings.set(newValues);
    }

    function resetSprings() {
        letterSprings.set(letters.map(() => ({ x: 0, y: 0, scale: 1 })));
    }
</script>

<a
    {href}
    class="magnetic-text {className}"
    on:click={onClick}
    bind:this={container}
    on:mousemove={handleMouseMove}
    on:mouseleave={resetSprings}
>
    {#each letters as char, i}
        <span
            class="magnetic-wrap"
            style="transform: translate({$letterSprings[i]
                .x}px, {$letterSprings[i].y}px) scale({$letterSprings[i]
                .scale}); z-index: {Math.round($letterSprings[i].scale * 10)};"
        >
            <span class="letter" style="--delay: {i * 0.1}s">
                {char === " " ? "\u00A0" : char}
            </span>
        </span>
    {/each}
</a>

<style>
    .magnetic-text {
        display: flex;
        text-decoration: none;
        color: inherit;
        position: relative;
        /* Padding to capture mouse events near the text */
        padding: 0.5rem;
        margin: -0.5rem;
    }

    .magnetic-wrap {
        display: inline-block;
        position: relative;
        will-change: transform;
    }

    .letter {
        display: inline-block;
        /* Subtle "Stop-Motion Dance" */
        animation: dance 0.6s step-end infinite;
        animation-delay: var(--delay);
    }

    @keyframes dance {
        0%,
        100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(-0.8px, 0.5px) rotate(-1deg);
        }
        50% {
            transform: translate(0.8px, -0.3px) rotate(0.8deg);
        }
        75% {
            transform: translate(-0.3px, -0.8px) rotate(-0.5deg);
        }
    }
</style>
