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
        <div class="curtain-fabric">
            <div class="fold"></div>
            <div class="fold"></div>
            <div class="fold"></div>
            <div class="fold"></div>
        </div>
        <div class="curtain-fringe"></div>
    </div>

    <!-- Right Curtain -->
    <div
        class="curtain curtain-right"
        style="transform: translateX({-currentFrame.right}%);"
    >
        <div class="curtain-fabric">
            <div class="fold"></div>
            <div class="fold"></div>
            <div class="fold"></div>
            <div class="fold"></div>
        </div>
        <div class="curtain-fringe"></div>
    </div>

    <!-- Curtain Rod -->
    <div class="curtain-rod">
        <div class="rod-end left"></div>
        <div class="rod-bar"></div>
        <div class="rod-end right"></div>
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

    .curtain-fabric {
        position: absolute;
        inset: 0;
        background: var(--scl-rust, #c44a2d);
        display: flex;
        /* Paper/flat texture look */
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-blend-mode: overlay;
    }

    .fold {
        flex: 1;
        border-right: 3px solid rgba(0, 0, 0, 0.15);
        border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .fold:last-child {
        border-right: none;
    }

    .curtain-left .fold:first-child {
        border-left: none;
    }

    .curtain-fringe {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: repeating-linear-gradient(
            90deg,
            var(--scl-rust-dark, #a33d25) 0px,
            var(--scl-rust-dark, #a33d25) 8px,
            transparent 8px,
            transparent 12px
        );
        background-size: 12px 100%;
    }

    /* Curtain Rod */
    .curtain-rod {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 30px;
        z-index: 101;
        display: flex;
        align-items: center;
        padding: 0 10px;
    }

    .rod-bar {
        flex: 1;
        height: 12px;
        background: var(--scl-brown, #5c4a3d);
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .rod-end {
        width: 24px;
        height: 24px;
        background: var(--scl-rust, #c44a2d);
        border-radius: 50%;
        border: 3px solid var(--scl-brown, #5c4a3d);
    }

    .rod-end.left {
        margin-right: -6px;
        z-index: 1;
    }

    .rod-end.right {
        margin-left: -6px;
        z-index: 1;
    }

    /* Content */
    .content {
        opacity: 0;
        transition: opacity 0.5s ease;
        padding-top: 30px; /* Space for rod */
    }

    .content.visible {
        opacity: 1;
    }

    /* When fully revealed, hide curtains */
    .curtain-container.revealed .curtain {
        display: none;
    }

    .curtain-container.revealed .curtain-rod {
        display: none;
    }

    .curtain-container.revealed .content {
        padding-top: 0;
    }
</style>
