<script>
    import { onMount } from "svelte";

    let isRevealed = false;
    let curtainProgress = 0;
    let frameIndex = 0;

    // Stop-motion style curtain positions (intentionally imperfect)
    const curtainFrames = [
        { left: 0, right: 0 }, // Closed
        { left: -8, right: -6 }, // Slight jitter
        { left: -5, right: -10 }, // Misaligned on purpose
        { left: -15, right: -12 },
        { left: -20, right: -25 },
        { left: -18, right: -30 }, // Step back (stop motion feel)
        { left: -35, right: -40 },
        { left: -45, right: -42 },
        { left: -50, right: -55 },
        { left: -55, right: -52 },
        { left: -60, right: -65 },
    ];

    onMount(() => {
        // Delay before curtain starts opening
        setTimeout(() => {
            const interval = setInterval(() => {
                frameIndex++;
                if (frameIndex >= curtainFrames.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        isRevealed = true;
                    }, 300);
                }
            }, 120); // Choppy, stop-motion timing
        }, 500);
    });

    $: currentFrame =
        curtainFrames[Math.min(frameIndex, curtainFrames.length - 1)];
</script>

<div class="curtain-container" class:revealed={isRevealed}>
    <!-- Left Curtain -->
    <div
        class="curtain curtain-left"
        style="transform: translateX({currentFrame.left}%);"
    >
        <img
            src="/MEDIA/moving%20curtains/curtain%20open%20left.webp"
            alt=""
            class="curtain-img"
        />
    </div>

    <!-- Right Curtain -->
    <div
        class="curtain curtain-right"
        style="transform: translateX({-currentFrame.right}%);"
    >
        <img
            src="/MEDIA/moving%20curtains/curtain%20open%20right.webp"
            alt=""
            class="curtain-img"
        />
    </div>

    <!-- Content behind curtain -->
    <div class="content" class:visible={frameIndex > 3}>
        <slot />
    </div>
</div>

<style>
    .curtain-container {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
    }

    /* Curtains */
    .curtain {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 55%;
        z-index: 100;
        pointer-events: none;
        /* No CSS transition - we want choppy stop-motion feel */
    }

    .curtain-left {
        left: 0;
    }

    .curtain-right {
        right: 0;
    }

    .curtain-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    /* Content */
    .content {
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    .content.visible {
        opacity: 1;
    }

    .curtain-container.revealed .content {
        padding-top: 0;
    }
</style>
