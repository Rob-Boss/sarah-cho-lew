<script>
    import { onMount } from "svelte";

    let isRevealed = false;
    let frameIndex = 0;

    // Stop-motion style vertical rise (strictly upward)
    const curtainFrames = [
        { y: 0 }, // Closed
        { y: -4 }, // Jitter starts
        { y: -12 }, // Lifting
        { y: -22 },
        { y: -35 },
        { y: -42 }, // Steady rise (choppy but always up)
        { y: -55 },
        { y: -70 },
        { y: -85 },
        { y: -98 },
        { y: -115 }, // Fully cleared
    ];

    onMount(() => {
        // Start reveal after short initial pause
        setTimeout(() => {
            const interval = setInterval(() => {
                frameIndex++;
                if (frameIndex >= curtainFrames.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        isRevealed = true;
                    }, 400);
                }
            }, 100); // Stop-motion frame speed
        }, 600);
    });

    $: currentFrame =
        curtainFrames[Math.min(frameIndex, curtainFrames.length - 1)];
</script>

<div class="curtain-container" class:revealed={isRevealed}>
    <div class="curtain-up" style="transform: translateY({currentFrame.y}%);">
        <img
            src="/MEDIA/moving%20curtains/curtain-up-wide.webp"
            alt=""
            class="curtain-img"
        />
    </div>
</div>

<style>
    .curtain-container {
        position: fixed;
        inset: 0;
        z-index: 40; /* Queen Layer */
        pointer-events: none;
        overflow: hidden;
    }

    .curtain-container.revealed {
        display: none;
    }

    .curtain-up {
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        height: calc(100vh - 60px);
        pointer-events: none;
    }

    .curtain-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* CRITICAL: Anchor to bottom so the ruffles are always the LAST thing seen */
        object-position: bottom center;
        display: block;
    }
</style>
