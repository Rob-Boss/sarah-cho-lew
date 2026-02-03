<script>
    // Placeholder for reel URL - will be replaced with actual video
    export let reelUrl = "";

    let isPlaying = false;

    function togglePlay() {
        isPlaying = !isPlaying;
    }
</script>

<div class="puppet-theater">
    <!-- Theater Frame Top -->
    <div class="theater-top">
        <div class="valance">
            <div class="valance-scallop"></div>
            <div class="valance-scallop"></div>
            <div class="valance-scallop"></div>
            <div class="valance-scallop"></div>
            <div class="valance-scallop"></div>
            <div class="valance-scallop"></div>
            <div class="valance-scallop"></div>
        </div>
        <div class="theater-title">
            <span>✦</span> Sarah's Reel <span>✦</span>
        </div>
    </div>

    <!-- Theater Stage / Video Window -->
    <div class="stage">
        <div class="stage-inner">
            {#if reelUrl}
                <!-- Video will go here -->
                <video src={reelUrl} class:playing={isPlaying}></video>
            {:else}
                <!-- Placeholder -->
                <div class="placeholder">
                    <div class="placeholder-icon">▶</div>
                    <p>Reel Coming Soon</p>
                </div>
            {/if}
        </div>

        <!-- Side curtains (decorative) -->
        <div class="side-curtain left"></div>
        <div class="side-curtain right"></div>
    </div>

    <!-- Theater Frame Bottom -->
    <div class="theater-bottom">
        <div class="stage-front">
            <div class="decorative-element left">✿</div>
            <div
                class="play-button"
                on:click={togglePlay}
                on:keydown={(e) => e.key === "Enter" && togglePlay()}
                role="button"
                tabindex="0"
            >
                {isPlaying ? "⏸" : "▶"}
            </div>
            <div class="decorative-element right">✿</div>
        </div>
    </div>

    <!-- Theater Legs -->
    <div class="theater-legs">
        <div class="leg left"></div>
        <div class="leg right"></div>
    </div>
</div>

<style>
    .puppet-theater {
        --theater-width: min(90vw, 800px);
        --frame-color: var(--scl-teal-deep, #1d6068);
        --accent-color: var(--scl-rust, #c44a2d);
        --cream: var(--scl-cream, #f5f0e0);

        width: var(--theater-width);
        position: relative;
    }

    /* Theater Top */
    .theater-top {
        position: relative;
        background: var(--frame-color);
        padding: 1rem 1.5rem 0.5rem;
        border-radius: 20px 20px 0 0;
        /* Texture */
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-blend-mode: soft-light;
    }

    .valance {
        display: flex;
        justify-content: center;
        margin-bottom: 0.5rem;
    }

    .valance-scallop {
        width: 50px;
        height: 30px;
        background: var(--accent-color);
        border-radius: 0 0 50% 50%;
        margin: 0 -3px;
        /* Slight variation for hand-drawn feel */
    }

    .valance-scallop:nth-child(odd) {
        transform: scaleY(1.1);
    }

    .valance-scallop:nth-child(even) {
        transform: scaleY(0.95) translateY(-2px);
    }

    .theater-title {
        text-align: center;
        color: var(--cream);
        font-size: 1.25rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        padding: 0.5rem;
    }

    .theater-title span {
        color: var(--accent-color);
    }

    /* Stage */
    .stage {
        position: relative;
        background: var(--frame-color);
        padding: 0 2rem;
    }

    .stage-inner {
        aspect-ratio: 16 / 9;
        background: #0a0a0a;
        border: 4px solid var(--scl-brown, #5c4a3d);
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: var(--cream);
        opacity: 0.6;
    }

    .placeholder-icon {
        font-size: 4rem;
        width: 100px;
        height: 100px;
        border: 3px solid currentColor;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 8px; /* Optical centering for play icon */
    }

    .placeholder p {
        font-size: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    /* Side curtains */
    .side-curtain {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2rem;
        background: var(--accent-color);
    }

    .side-curtain.left {
        left: 0;
        border-radius: 0 8px 8px 0;
    }

    .side-curtain.right {
        right: 0;
        border-radius: 8px 0 0 8px;
    }

    /* Theater Bottom */
    .theater-bottom {
        background: var(--frame-color);
        padding: 1rem 2rem 1.5rem;
        border-radius: 0 0 20px 20px;
    }

    .stage-front {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .decorative-element {
        font-size: 2rem;
        color: var(--accent-color);
    }

    .play-button {
        width: 60px;
        height: 60px;
        background: var(--cream);
        border: 4px solid var(--scl-brown, #5c4a3d);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--frame-color);
        cursor: pointer;
        transition:
            transform 0.2s,
            background 0.2s;
        padding-left: 4px; /* Optical centering */
    }

    .play-button:hover {
        transform: scale(1.1);
        background: var(--scl-mustard, #e8b830);
    }

    /* Theater Legs */
    .theater-legs {
        display: flex;
        justify-content: space-between;
        padding: 0 3rem;
    }

    .leg {
        width: 30px;
        height: 40px;
        background: var(--scl-brown, #5c4a3d);
        border-radius: 0 0 8px 8px;
    }

    .leg.left {
        transform: rotate(-3deg);
    }

    .leg.right {
        transform: rotate(3deg);
    }

    @media (max-width: 600px) {
        .theater-top {
            padding: 0.75rem 1rem 0.5rem;
        }

        .valance-scallop {
            width: 35px;
            height: 22px;
        }

        .theater-title {
            font-size: 1rem;
        }

        .stage {
            padding: 0 1.25rem;
        }

        .side-curtain {
            width: 1.25rem;
        }

        .theater-bottom {
            padding: 0.75rem 1.25rem 1rem;
        }

        .play-button {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
        }
    }
</style>
