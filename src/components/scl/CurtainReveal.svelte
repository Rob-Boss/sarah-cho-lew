<script>
    import { onMount, onDestroy } from "svelte";
    import {
        isLoaded,
        curtainDrop,
        isCurtainDown,
    } from "../../stores/globalState";

    let isRevealed = false;
    let frameIndex = 0;
    let animationFrameId;
    let lastTime = 0;

    // Target speeds (ms per frame)
    const LIFT_SPEED = 100;
    const DROP_SPEED = 80;

    // Stop-motion style vertical rise (strictly upward)
    const curtainFrames = [
        { y: 0 }, // Closed (Index 0)
        { y: -4 },
        { y: -12 },
        { y: -22 },
        { y: -35 },
        { y: -42 },
        { y: -55 },
        { y: -70 },
        { y: -85 },
        { y: -98 },
        { y: -115 }, // Fully cleared (Index 10)
    ];

    // Reactive: Watch `curtainDrop` store
    // True = Drop (Go to Index 0)
    // False = Lift (Go to Index 10)
    $: targetState = $curtainDrop ? "DROP" : "LIFT";

    // Loop
    function animate(time) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        const speed = targetState === "DROP" ? DROP_SPEED : LIFT_SPEED;

        if (delta > speed) {
            if (targetState === "DROP") {
                // GOING DOWN -> Index 0
                if (frameIndex > 0) {
                    frameIndex--;
                    isRevealed = false; // Ensure visible
                } else {
                    // Fully Down
                    isCurtainDown.set(true);
                }
            } else {
                // GOING UP -> Index Max
                if (frameIndex < curtainFrames.length - 1) {
                    // Start lifting
                    // Only start if loaded (or force lift)
                    if ($isLoaded) {
                        frameIndex++;
                        isCurtainDown.set(false);
                    }
                } else {
                    // Fully Up
                    isRevealed = true; // Optimization to hide DOM
                }
            }
            lastTime = time;
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    onMount(() => {
        // Initialize state
        frameIndex = 0;
        isCurtainDown.set(true);
        animationFrameId = requestAnimationFrame(animate);
    });

    onDestroy(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });

    $: currentFrame =
        curtainFrames[
            Math.min(Math.max(frameIndex, 0), curtainFrames.length - 1)
        ];
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
