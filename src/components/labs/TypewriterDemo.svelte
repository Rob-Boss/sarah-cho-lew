<script>
    import { onMount } from "svelte";

    const phrases = [
        "Sarah Cho Lew",
        "Director",
        "Visual Storyteller",
        "Cinematic Vision",
    ];

    let currentPhraseIndex = 0;
    let displayText = "";
    let isDeleting = false;
    let cursorVisible = true;

    onMount(() => {
        // Cursor blink
        const cursorInterval = setInterval(() => {
            cursorVisible = !cursorVisible;
        }, 500);

        // Typing effect
        const type = () => {
            const currentPhrase = phrases[currentPhraseIndex];

            if (!isDeleting) {
                // Typing
                displayText = currentPhrase.substring(
                    0,
                    displayText.length + 1,
                );

                if (displayText === currentPhrase) {
                    // Pause at end of phrase
                    setTimeout(() => {
                        isDeleting = true;
                        setTimeout(type, 50);
                    }, 2000);
                    return;
                }
            } else {
                // Deleting
                displayText = currentPhrase.substring(
                    0,
                    displayText.length - 1,
                );

                if (displayText === "") {
                    isDeleting = false;
                    currentPhraseIndex =
                        (currentPhraseIndex + 1) % phrases.length;
                }
            }

            setTimeout(type, isDeleting ? 50 : 100);
        };

        type();

        return () => clearInterval(cursorInterval);
    });
</script>

<div class="typewriter-container">
    <div class="typewriter">
        <span class="typed-text">{displayText}</span>
        <span class="cursor" class:visible={cursorVisible}>|</span>
    </div>

    <div class="phrase-indicators">
        {#each phrases as phrase, index}
            <span class="indicator" class:active={index === currentPhraseIndex}>
                {phrase}
            </span>
        {/each}
    </div>
</div>

<style>
    .typewriter-container {
        padding: 3rem 2rem;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
    }

    .typewriter {
        font-family: "Sacramento", cursive;
        font-size: 4rem;
        min-height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .typed-text {
        background: linear-gradient(135deg, #8b5cf6, #ff007f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .cursor {
        color: #8b5cf6;
        font-weight: 300;
        margin-left: 2px;
        opacity: 0;
        transition: opacity 0.1s;
    }

    .cursor.visible {
        opacity: 1;
    }

    .phrase-indicators {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }

    .indicator {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        border-radius: 100px;
        border: 1px solid transparent;
    }

    .indicator.active {
        color: #fff;
        border-color: rgba(139, 92, 246, 0.5);
        background: rgba(139, 92, 246, 0.1);
    }

    @media (max-width: 768px) {
        .typewriter {
            font-size: 2.5rem;
        }
    }
</style>
