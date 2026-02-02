<script>
    import { onMount } from "svelte";

    let scrollY = 0;
    let containerRef;

    onMount(() => {
        const handleScroll = () => {
            if (containerRef) {
                const rect = containerRef.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                // Calculate scroll progress within the component's viewport
                scrollY = Math.max(
                    0,
                    Math.min(
                        1,
                        (viewportHeight - rect.top) /
                            (viewportHeight + rect.height),
                    ),
                );
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<div class="parallax-container" bind:this={containerRef}>
    <div class="parallax-scene">
        <div
            class="parallax-layer layer-back"
            style="transform: translateY({scrollY * 100}px)"
        >
            <div class="shape circle"></div>
            <div class="shape circle small"></div>
        </div>

        <div
            class="parallax-layer layer-mid"
            style="transform: translateY({scrollY * 50}px)"
        >
            <div class="shape square"></div>
            <div class="text-element">SCROLL</div>
        </div>

        <div
            class="parallax-layer layer-front"
            style="transform: translateY({scrollY * 20}px)"
        >
            <div class="shape triangle"></div>
            <div class="shape diamond"></div>
        </div>

        <div class="center-text">
            <span
                class="main-text"
                style="transform: translateY({scrollY * -30}px)"
            >
                Parallax
            </span>
            <span
                class="sub-text"
                style="transform: translateY({scrollY * -60}px)"
            >
                Demo
            </span>
        </div>
    </div>

    <div class="scroll-indicator">
        Scroll Progress: {Math.round(scrollY * 100)}%
    </div>
</div>

<style>
    .parallax-container {
        position: relative;
        height: 400px;
        overflow: hidden;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: linear-gradient(180deg, #0d1117, #1a1030);
    }

    .parallax-scene {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .parallax-layer {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .shape {
        position: absolute;
    }

    .circle {
        width: 200px;
        height: 200px;
        border: 2px solid rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        top: 20%;
        right: 15%;
    }

    .circle.small {
        width: 80px;
        height: 80px;
        border-color: rgba(0, 255, 255, 0.3);
        top: 60%;
        left: 10%;
    }

    .square {
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 107, 107, 0.4);
        transform: rotate(45deg);
        top: 30%;
        left: 20%;
    }

    .text-element {
        position: absolute;
        font-size: 0.75rem;
        letter-spacing: 0.3em;
        color: rgba(255, 255, 255, 0.2);
        top: 70%;
        right: 20%;
    }

    .triangle {
        width: 0;
        height: 0;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        border-bottom: 70px solid rgba(255, 215, 0, 0.2);
        top: 20%;
        left: 60%;
    }

    .diamond {
        width: 50px;
        height: 50px;
        background: linear-gradient(
            135deg,
            rgba(255, 0, 127, 0.2),
            rgba(139, 92, 246, 0.2)
        );
        transform: rotate(45deg);
        top: 65%;
        right: 30%;
    }

    .center-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 10;
    }

    .main-text {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(135deg, #8b5cf6, #ff007f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        transition: transform 0.1s ease-out;
    }

    .sub-text {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.5);
        transition: transform 0.1s ease-out;
    }

    .scroll-indicator {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.4);
        font-family: monospace;
        background: rgba(0, 0, 0, 0.5);
        padding: 0.5rem 1rem;
        border-radius: 100px;
    }
</style>
