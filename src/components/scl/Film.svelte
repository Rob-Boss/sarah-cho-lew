<script>
    import { fade } from "svelte/transition";
    import PuppetTheater from "./PuppetTheater.svelte";
    import ProjectSlide from "./ProjectSlide.svelte";
    import { projects } from "../../data/projects";
    import { currentSection } from "../../stores/globalState";

    // Filter projects for Film (Commercial, Short Film, Documentary)
    // Or just all non-music video?
    $: filmProjects = projects.filter(
        (p) =>
            p.category === "Commercial" ||
            p.category === "Short Film" ||
            p.category === "Documentary",
    );
</script>

{#if $currentSection === "film"}
    <main
        class="stage-feed"
        in:fade={{ duration: 400 }}
        out:fade={{ duration: 400 }}
    >
        <!-- Slide 1: Main Reel (Film Header) -->
        <section class="feed-slide reel-slide">
            <div class="hero-overlay">
                <h1 class="hero-headline">
                    <span class="line line-1">Sarah Lew</span>
                    <span class="line line-2">Film</span>
                </h1>
            </div>
            <div class="theater-wrapper">
                <PuppetTheater />
            </div>
            <div class="scroll-indicator">
                <span>Scroll for Films</span>
                <div class="chevron">↓</div>
            </div>
        </section>

        <!-- Project Slides -->
        {#each filmProjects as project, index}
            <section class="feed-slide">
                <ProjectSlide {project} {index} />
            </section>
        {/each}
    </main>
{/if}

<style>
    /* Global reset for all children inside this component's feed */
    .stage-feed :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .stage-feed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100dvh;
        width: 100vw;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: y mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
        z-index: 1;
        isolation: isolate;
        padding: 60px var(--scl-curtain-width) 0;
        touch-action: pan-y;
        box-sizing: border-box;
    }

    .stage-feed::-webkit-scrollbar {
        display: none;
    }

    .feed-slide {
        height: 100vh;
        width: 100%;
        scroll-snap-align: start;
        scroll-snap-stop: always;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .reel-slide {
        padding: 0 4vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hero-headline {
        margin-top: 4vh;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 5;
        position: relative;
    }

    .line {
        display: block;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 0.85;
    }

    .line-1 {
        font-size: clamp(2rem, 6vmin, 5rem);
        color: var(--scl-teal-deep);
        transform: rotate(-2deg);
        text-shadow: 4px 4px 0 white;
    }

    .line-2 {
        font-size: clamp(3rem, 12vmin, 10rem);
        color: var(--scl-rust);
        margin-top: -0.1em;
        transform: rotate(2deg);
        text-shadow: 8px 8px 0 white;
    }

    .theater-wrapper {
        z-index: 1;
        width: 100%;
        max-width: 900px;
        display: flex;
        justify-content: center;
        transform: scale(0.75);
        margin-top: -2vh;
        animation: theaterHold 6s ease-in-out infinite;
    }

    @keyframes theaterHold {
        0%,
        100% {
            transform: scale(0.75) rotate(-0.5deg);
        }
        50% {
            transform: scale(0.76) rotate(0.5deg);
        }
    }

    .scroll-indicator {
        position: absolute;
        bottom: 8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--scl-teal-deep);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.8rem;
        animation: bounce 2s infinite;
        opacity: 0.6;
    }

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    /* Media Queries */
    @media (max-width: 768px) {
        .reel-slide {
            padding: 5vh 10vw;
        }
        .theater-wrapper {
            transform: scale(0.65);
        }
        .line-1 {
            font-size: clamp(2rem, 8vw, 4rem);
        }
        .line-2 {
            font-size: clamp(3rem, 15vw, 8rem);
        }

        .stage-feed {
            padding: 60px 0 0; /* Remove curtain padding on mobile if needed, but keeping consistent with index.astro */
            /* Actually index.astro uses --scl-curtain-width which is 25vw */
        }
    }

    @media (max-height: 850px) {
        .theater-wrapper {
            transform: scale(0.6);
            margin-top: -4vh;
        }
        .line-2 {
            font-size: 10vmin;
        }
    }
</style>
