<script>
    import { fade } from "svelte/transition";
    import { currentSection } from "../../stores/globalState";
</script>

{#if $currentSection === "contact"}
    <section
        class="contact-section"
        in:fade={{ duration: 800, delay: 300 }}
        out:fade={{ duration: 400 }}
    >
        <div class="content-container">
            <h1>Get in Touch</h1>
            <div class="contact-links">
                <a href="mailto:hello@sarahcholew.com" class="contact-link">
                    hello@sarahcholew.com
                </a>
                <a
                    href="https://instagram.com/sarahcholew"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contact-link"
                >
                    @sarahcholew
                </a>
            </div>
        </div>
    </section>
{/if}

<style>
    .contact-section {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 4vw 0;
        background: var(--scl-mustard);
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
    }

    h1 {
        font-family: "Fredoka", sans-serif;
        font-size: clamp(3rem, 8vw, 6rem);
        color: var(--scl-teal-deep);
        transform: rotate(2deg);
        text-shadow: 4px 4px 0 var(--scl-cream);
        margin: 0;
    }

    .contact-links {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
    }

    .contact-link {
        font-size: 2rem;
        font-weight: 700;
        color: var(--scl-rust);
        text-decoration: none;
        transition: transform 0.2s ease;
    }

    .contact-link:hover {
        transform: scale(1.05) rotate(-1deg);
        color: var(--scl-teal-deep);
    }
</style>
