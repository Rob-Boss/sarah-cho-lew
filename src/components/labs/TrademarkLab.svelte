<script>
    const text = "SARAH CHO LEW";
    const letters = text.split("");

    const variations = [
        { id: "dance", name: "The Stop-Motion Dance" },
        { id: "spin", name: "The 3D Spin" },
        { id: "wave", name: "The Sinusoidal Wave" },
        { id: "bounce", name: "The Elastic Bounce" },
        { id: "flicker", name: "The Neon Flicker" },
        { id: "tilt", name: "The Perspective Tilt" },
        { id: "float", name: "The Anti-Gravity Float" },
        { id: "pulse", name: "The Group Pulse" },
        { id: "reveal", name: "The Staggered Reveal" },
        { id: "prism", name: "The Color Prism" },
    ];
</script>

<div class="lab-container">
    <header class="lab-header">
        <h1>Trademark Animation Lab</h1>
        <p>Experimenting with 10 ways to make the brand text feel "alive".</p>
    </header>

    <div class="animation-grid">
        {#each variations as variation}
            <div class="variation-card">
                <span class="variation-label"
                    >{variation.id}. {variation.name}</span
                >
                <div class="stage">
                    <div class="trademark {variation.id}">
                        {#each letters as char, i}
                            <span
                                class="letter"
                                style="--index: {i}; --delay: {i * 0.1}s"
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .lab-container {
        padding: 4rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .lab-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .lab-header h1 {
        font-size: 3rem;
        color: var(--scl-rust);
        text-shadow: 4px 4px 0 white;
        margin-bottom: 0.5rem;
    }

    .animation-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
    }

    .variation-card {
        background: white;
        border: 2px solid var(--scl-teal);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 8px 8px 0 var(--scl-teal-deep);
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }

    .variation-label {
        align-self: flex-start;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: var(--scl-teal);
        margin-bottom: 2rem;
    }

    .stage {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .trademark {
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--scl-teal-deep);
        white-space: nowrap;
        display: flex;
    }

    .letter {
        display: inline-block;
        position: relative;
    }

    /* 1. DANCE (Stop Motion) */
    .dance .letter {
        animation: dance 0.6s step-end infinite;
        animation-delay: var(--delay);
    }
    @keyframes dance {
        0%,
        100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(-2px, 2px) rotate(-3deg);
        }
        50% {
            transform: translate(2px, -1px) rotate(2deg);
        }
        75% {
            transform: translate(-1px, -2px) rotate(-1deg);
        }
    }

    /* 2. SPIN (3D Y-Axis) */
    .spin .letter {
        animation: spin 3s ease-in-out infinite;
        animation-delay: var(--delay);
        perspective: 1000px;
    }
    @keyframes spin {
        0%,
        10% {
            transform: rotateY(0deg);
        }
        40%,
        60% {
            transform: rotateY(360deg);
        }
        90%,
        100% {
            transform: rotateY(360deg);
        }
    }

    /* 3. WAVE (Sinusoidal) */
    .wave .letter {
        animation: wave 2s ease-in-out infinite;
        animation-delay: var(--delay);
    }
    @keyframes wave {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    /* 4. BOUNCE (Elastic) */
    .bounce .letter {
        animation: bounce 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
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

    /* 5. FLICKER (Neon) */
    .flicker .letter {
        animation: flicker 1.5s linear infinite;
        animation-delay: var(--delay);
    }
    @keyframes flicker {
        0%,
        19%,
        21%,
        23%,
        25%,
        54%,
        56%,
        100% {
            opacity: 1;
            transform: scale(1);
        }
        20%,
        22%,
        24%,
        55% {
            opacity: 0.3;
            transform: scale(0.98);
        }
    }

    /* 6. TILT (Whole Word Perspective) */
    .tilt {
        animation: tilt 4s ease-in-out infinite;
        perspective: 500px;
    }
    @keyframes tilt {
        0%,
        100% {
            transform: rotateX(0deg) rotateY(0deg);
        }
        25% {
            transform: rotateX(15deg) rotateY(-10deg);
        }
        75% {
            transform: rotateX(-15deg) rotateY(10deg);
        }
    }

    /* 7. FLOAT (Anti-Gravity) */
    .float .letter {
        animation: float 5s ease-in-out infinite;
        animation-delay: var(--delay);
    }
    @keyframes float {
        0%,
        100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(4px, -8px) scale(1.02);
        }
        66% {
            transform: translate(-4px, -4px) scale(0.98);
        }
    }

    /* 8. PULSE (Group) */
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
            filter: blur(0);
        }
        50% {
            transform: scale(1.1);
            filter: blur(0.5px);
        }
    }

    /* 9. REVEAL (Staggered Pop) */
    .reveal .letter {
        animation: reveal 4s ease-in-out infinite;
        animation-delay: var(--delay);
        opacity: 0;
    }
    @keyframes reveal {
        0%,
        5% {
            opacity: 0;
            transform: translateY(20px);
        }
        10%,
        80% {
            opacity: 1;
            transform: translateY(0);
        }
        90%,
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    /* 10. PRISM (Color Cycle) */
    .prism .letter {
        animation: prism 6s linear infinite;
        animation-delay: var(--delay);
    }
    @keyframes prism {
        0%,
        100% {
            color: var(--scl-teal-deep);
        }
        25% {
            color: var(--scl-rust);
        }
        50% {
            color: var(--scl-mustard);
        }
        75% {
            color: var(--scl-teal);
        }
    }

    @media (max-width: 768px) {
        .animation-grid {
            grid-template-columns: 1fr;
        }
        .variation-card {
            padding: 1rem;
        }
        .trademark {
            font-size: 1.5rem;
        }
    }
</style>
