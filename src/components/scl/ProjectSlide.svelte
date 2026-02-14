<script>
    import { currentSection } from "../../stores/globalState";

    export let project;
    export let index;

    // Split title for that "letter-by-letter" cutout feel
    $: titleParts = project.title.split(" ");
</script>

<div class="project-poster" style="--accent: {project.color};">
    <!-- Main Background Color (matches Sarah's mustard/teal preference) -->
    <div class="poster-bg"></div>

    <!-- Scattering of images (Collage Style) -->
    <div class="collage">
        {#each project.images.slice(0, 3) as img, i}
            <div
                class="sticker-image sticker-{i}"
                style="--rot: {i * 4 - 6}deg;"
            >
                <img src={img} alt="{project.title} detail" />
                <div class="tape"></div>
            </div>
        {/each}
    </div>

    <!-- Bold Cutout Typography -->
    <div class="typography-layer">
        <div class="category-banner">{project.category}</div>

        <h2 class="poster-title">
            {#each titleParts as word, i}
                <span
                    class="word"
                    style="--rot: {i % 2 === 0 ? 2 : -3}deg; --y: {i * 5}px;"
                >
                    {word}
                </span>
            {/each}
        </h2>

        <div class="description-block">
            <p>{project.description}</p>
        </div>
    </div>

    <!-- Call to Action -->
    <a
        href="/SCL/project/{project.id}?from={$currentSection}"
        class="cta-button"
    >
        GO TO PROJECT
        <div class="cta-arrow">→</div>
    </a>

    <!-- Hand-drawn Stickers (SVGs) -->
    <div class="decorations">
        <div class="star-deco deco-1">★</div>
        <div class="star-deco deco-2">✦</div>
        <div class="squiggle deco-3">
            <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0,10 Q25,0 50,10 T100,10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4"
                />
            </svg>
        </div>
    </div>

    <!-- Numbering -->
    <div class="poster-number">
        {String(index + 1).padStart(2, "0")}
    </div>
</div>

<style>
    .project-poster {
        height: 100vh;
        width: 100%;
        scroll-snap-align: start;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-items: center;
        justify-content: center;
        /* Background removed to rely on global body background */
    }

    .poster-bg {
        position: absolute;
        inset: 4rem;
        background: var(--accent);
        opacity: 0.15;
        z-index: 0;
        /* Irregular hand-cut shape */
        clip-path: polygon(2% 1%, 98% 3%, 99% 97%, 1% 95%);
    }

    /* Collage Elements */
    .collage {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .sticker-image {
        position: absolute;
        background: white;
        padding: 0.5rem;
        padding-bottom: 2rem;
        box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
        transform: rotate(var(--rot));
        z-index: 1;
        border: 2px solid #333;
    }

    .sticker-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .sticker-0 {
        width: 25vw;
        height: 35vh;
        top: 15vh;
        left: 5vw;
    }

    .sticker-1 {
        width: 20vw;
        height: 25vh;
        bottom: 10vh;
        right: 8vw;
    }

    .sticker-2 {
        width: 15vw;
        height: 20vh;
        top: 20vh;
        right: 15vw;
        z-index: 0;
    }

    .tape {
        position: absolute;
        top: -15px;
        left: 50%;
        width: 80px;
        height: 30px;
        background: rgba(255, 255, 255, 0.4);
        transform: translateX(-50%) rotate(-3deg);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Typography */
    .typography-layer {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 80%;
    }

    .category-banner {
        background: var(--scl-cream, #f5f0e0);
        color: var(--scl-brown);
        padding: 0.5rem 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 2rem;
        transform: rotate(-2deg);
        box-shadow: 4px 4px 0 var(--accent);
        border: 2px solid var(--scl-brown);
    }

    .poster-title {
        font-size: clamp(3rem, 12vw, 8rem);
        color: var(--scl-teal-deep);
        line-height: 0.85;
        margin-bottom: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .word {
        display: inline-block;
        transform: rotate(var(--rot)) translateY(var(--y));
        text-shadow: 6px 6px 0 white;
    }

    .description-block {
        max-width: 500px;
        background: white;
        padding: 1.5rem;
        border: 3px solid var(--scl-brown);
        transform: rotate(1deg);
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
    }

    .description-block p {
        font-weight: 500;
        line-height: 1.4;
        color: var(--scl-brown);
    }

    /* CTA */
    .cta-button {
        margin-top: 4rem;
        background: var(--scl-rust, #c44a2d);
        color: white;
        text-decoration: none;
        padding: 1.2rem 3rem;
        font-size: 1.5rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 20;
        transform: rotate(-1deg);
        box-shadow: 6px 6px 0 #333;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .cta-button:hover {
        transform: rotate(0deg) scale(1.05);
    }

    /* Decorations */
    .decorations {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 5;
    }

    .star-deco {
        position: absolute;
        font-size: 4rem;
        color: var(--accent);
    }

    .deco-1 {
        top: 15%;
        left: 35%;
        transform: rotate(15deg);
    }
    .deco-2 {
        bottom: 20%;
        right: 30%;
        transform: rotate(-10deg);
        color: var(--scl-rust);
    }

    .squiggle {
        position: absolute;
        width: 150px;
        color: var(--scl-teal);
    }
    .deco-3 {
        bottom: 35%;
        left: 10%;
        transform: rotate(-20deg);
    }

    .poster-number {
        position: absolute;
        top: 5vh;
        left: 5vw;
        font-size: 8rem;
        font-weight: 700;
        color: white;
        opacity: 0.15;
    }

    @media (max-width: 900px) {
        .sticker-image {
            width: 35vw;
        }
        .sticker-2 {
            display: none;
        }
        .poster-title {
            font-size: 4rem;
        }
    }
</style>
