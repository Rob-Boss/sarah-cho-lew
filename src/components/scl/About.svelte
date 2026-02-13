<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { currentSection } from "../../stores/globalState";
</script>

{#if $currentSection === "about"}
    <section
        class="about-section"
        in:fade={{ duration: 800, delay: 300 }}
        out:fade={{ duration: 400 }}
    >
        <div class="content-container">
            <h1>About Sarah</h1>
            <div class="bio">
                <p>
                    Sarah Cho Lew is a director based in Los Angeles,
                    specializing in narrative-driven commercials and music
                    videos.
                </p>
                <p>
                    Her work combines magical realism with grounded emotion,
                    often utilizing mixed media and stop-motion techniques to
                    build unique worlds.
                </p>
            </div>
        </div>
    </section>
{/if}

<style>
    .about-section {
        position: fixed;
        inset: 0;
        z-index: 20; /* Below curtain, above feed background */
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 4vw 0;
        background: var(--scl-mustard);
        overflow-y: auto;
    }

    .content-container {
        max-width: 800px;
        text-align: center;
        color: var(--scl-teal-deep);
    }

    h1 {
        font-family: "Fredoka", sans-serif;
        font-size: clamp(3rem, 8vw, 6rem);
        color: var(--scl-rust);
        margin-bottom: 2rem;
        transform: rotate(-2deg);
        text-shadow: 4px 4px 0 var(--scl-cream);
    }

    .bio p {
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }
</style>
