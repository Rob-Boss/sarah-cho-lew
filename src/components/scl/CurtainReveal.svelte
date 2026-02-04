<script>
    import { onMount } from "svelte";

    let isRevealed = false;
    let curtainProgress = 0;
    let frameIndex = 0;

    // Stop-motion style curtain positions (intentionally imperfect)
    const curtainFrames = [
        { left: 0, right: 0 }, // Closed
        { left: -8, right: -8 }, // Jitter starts
        { left: -5, right: -12 }, // Misaligned
        { left: -18, right: -15 },
        { left: -25, right: -30 },
        { left: -22, right: -28 }, // Step back (stop motion feel)
        { left: -38, right: -42 },
        { left: -50, right: -48 },
        { left: -60, right: -62 },
        { left: -68, right: -65 },
        { left: -72, right: -72 }, // Locked symmetrical landing
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

    <!-- Content slot removed - this component is now purely visual -->
</div>

<style>
    .curtain-container {
        position: fixed; /* Changed to fixed to overlay properly as a sibling */
        inset: 0;
        z-index: 40; /* Queen Layer */
        pointer-events: none;
    }

    /* Curtains */
    .curtain {
        position: absolute; /* Relative to container */
        top: 0;
        bottom: 0;
        width: 55%;
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
</style>
