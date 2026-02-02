<script>
    let clickCount = 0;
    let lastClicked = "";
    let ripples = [];
    let celebrationMode = false;
    let magnetButtons = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ];
    let toggleStates = [false, false, false];
    let morphState = "idle"; // idle, loading, success
    let scrambleText = "Hover Me";
    const originalText = "Hover Me";
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function handleClick(buttonName, event) {
        clickCount++;
        lastClicked = buttonName;

        if (clickCount === 10) {
            celebrationMode = true;
            setTimeout(() => (celebrationMode = false), 2000);
        }
    }

    function createRipple(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ripple = { id: Date.now(), x, y };
        ripples = [...ripples, ripple];

        setTimeout(() => {
            ripples = ripples.filter((r) => r.id !== ripple.id);
        }, 600);
    }

    function handleMagnetMove(event, index) {
        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        magnetButtons[index] = { x: x * 0.3, y: y * 0.3 };
    }

    function handleMagnetLeave(index) {
        magnetButtons[index] = { x: 0, y: 0 };
    }

    function toggleButton(index) {
        toggleStates[index] = !toggleStates[index];
    }

    function handleMorphClick() {
        if (morphState === "idle") {
            morphState = "loading";
            setTimeout(() => {
                morphState = "success";
                setTimeout(() => {
                    morphState = "idle";
                }, 1500);
            }, 2000);
        }
    }

    let scrambleInterval;
    function startScramble() {
        let iteration = 0;
        scrambleInterval = setInterval(() => {
            scrambleText = originalText
                .split("")
                .map((char, i) => {
                    if (i < iteration) return originalText[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(scrambleInterval);
            }
            iteration += 1 / 3;
        }, 30);
    }

    function stopScramble() {
        clearInterval(scrambleInterval);
        scrambleText = originalText;
    }
</script>

<div class="interactive-section" class:celebration={celebrationMode}>
    <div class="stats-bar">
        <span>Clicks: <strong>{clickCount}</strong></span>
        {#if lastClicked}
            <span>Last: <strong>{lastClicked}</strong></span>
        {/if}
        {#if celebrationMode}
            <span class="celebration-text">🎉 10 clicks! 🎉</span>
        {/if}
    </div>

    <h3>Ripple Effect</h3>
    <div class="button-row">
        <button
            class="btn btn-ripple gradient-aurora"
            on:click={(e) => {
                handleClick("Aurora Ripple", e);
                createRipple(e);
            }}
        >
            Click Me
            {#each ripples as ripple (ripple.id)}
                <span
                    class="ripple"
                    style="left: {ripple.x}px; top: {ripple.y}px;"
                ></span>
            {/each}
        </button>

        <button
            class="btn btn-ripple gradient-ocean"
            on:click={(e) => {
                handleClick("Ocean Ripple", e);
                createRipple(e);
            }}
        >
            Or Me
            {#each ripples as ripple (ripple.id)}
                <span
                    class="ripple"
                    style="left: {ripple.x}px; top: {ripple.y}px;"
                ></span>
            {/each}
        </button>
    </div>

    <h3>Magnetic Buttons</h3>
    <p class="desc">Hover and move your mouse around - the button follows!</p>
    <div class="button-row">
        {#each ["Magnetic", "Hover Me", "Follow"] as label, i}
            <button
                class="btn btn-magnetic"
                style="transform: translate({magnetButtons[i]
                    .x}px, {magnetButtons[i].y}px)"
                on:mousemove={(e) => handleMagnetMove(e, i)}
                on:mouseleave={() => handleMagnetLeave(i)}
                on:click={(e) => handleClick(`Magnetic ${i + 1}`, e)}
            >
                {label}
            </button>
        {/each}
    </div>

    <h3>Toggle States</h3>
    <div class="button-row">
        <button
            class="btn btn-toggle"
            class:active={toggleStates[0]}
            on:click={() => {
                toggleButton(0);
                handleClick("Favorite", null);
            }}
        >
            <span class="icon">{toggleStates[0] ? "♥" : "♡"}</span>
            Favorite
        </button>

        <button
            class="btn btn-toggle toggle-gold"
            class:active={toggleStates[1]}
            on:click={() => {
                toggleButton(1);
                handleClick("Like", null);
            }}
        >
            <span class="icon">👍</span>
            Like
        </button>

        <button
            class="btn btn-toggle toggle-violet"
            class:active={toggleStates[2]}
            on:click={() => {
                toggleButton(2);
                handleClick("Bookmark", null);
            }}
        >
            <span class="icon">{toggleStates[2] ? "★" : "☆"}</span>
            Bookmark
        </button>
    </div>

    <h3>Morphing Button</h3>
    <p class="desc">Watch the button transform through states</p>
    <div class="button-row">
        <button
            class="btn btn-morph"
            class:loading={morphState === "loading"}
            class:success={morphState === "success"}
            on:click={handleMorphClick}
        >
            {#if morphState === "idle"}
                Submit
            {:else if morphState === "loading"}
                <span class="spinner"></span>
            {:else}
                <span class="checkmark">✓</span>
            {/if}
        </button>
    </div>

    <h3>Text Scramble</h3>
    <div class="button-row">
        <button
            class="btn btn-scramble"
            on:mouseenter={startScramble}
            on:mouseleave={stopScramble}
            on:click={(e) => handleClick("Scramble", e)}
        >
            {scrambleText}
        </button>
    </div>

    <h3>Expanding Button</h3>
    <div class="button-row">
        <button
            class="btn btn-expand"
            on:click={(e) => handleClick("Expand", e)}
        >
            <span class="expand-text">Explore</span>
            <span class="expand-icon">→</span>
        </button>
    </div>

    <h3>Jelly Effect</h3>
    <div class="button-row">
        <button
            class="btn btn-jelly gradient-candy"
            on:click={(e) => handleClick("Jelly", e)}
        >
            Squishy!
        </button>
        <button
            class="btn btn-jelly gradient-forest"
            on:click={(e) => handleClick("Jelly 2", e)}
        >
            Bounce!
        </button>
    </div>
</div>

<style>
    .interactive-section {
        padding: 2rem;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .interactive-section.celebration {
        animation: rainbowBorder 0.5s linear infinite;
    }

    @keyframes rainbowBorder {
        0% {
            border-color: #ff6b6b;
        }
        25% {
            border-color: #ffd700;
        }
        50% {
            border-color: #98ff98;
        }
        75% {
            border-color: #8b5cf6;
        }
        100% {
            border-color: #ff6b6b;
        }
    }

    .stats-bar {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }

    .stats-bar strong {
        color: #8b5cf6;
    }

    .celebration-text {
        color: #ffd700;
        animation: pulse 0.3s infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    h3 {
        font-size: 1rem;
        margin: 2rem 0 0.75rem;
        color: rgba(255, 255, 255, 0.5);
    }

    .desc {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 1rem;
    }

    .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
    }

    .btn {
        cursor: pointer;
        font-family: "Inter", sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        border: none;
        border-radius: 12px;
        padding: 0.85rem 1.75rem;
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        color: #fff;
    }

    /* Ripple Effect */
    .btn-ripple {
        position: relative;
    }
    .gradient-aurora {
        background: linear-gradient(135deg, #8b5cf6, #ff007f);
    }
    .gradient-ocean {
        background: linear-gradient(135deg, #00ffff, #0080ff);
        color: #0a1520;
    }
    .gradient-candy {
        background: linear-gradient(135deg, #ff007f, #ff6b6b, #ffd700);
    }
    .gradient-forest {
        background: linear-gradient(135deg, #98ff98, #00ff7f);
        color: #0a1a10;
    }

    .ripple {
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleAnim 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnim {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }

    /* Magnetic Button */
    .btn-magnetic {
        background: linear-gradient(135deg, #ff6b6b, #ffa07a);
        transition:
            transform 0.15s ease-out,
            box-shadow 0.3s;
    }

    .btn-magnetic:hover {
        box-shadow: 0 10px 40px rgba(255, 107, 107, 0.4);
    }

    /* Toggle Button */
    .btn-toggle {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .btn-toggle .icon {
        font-size: 1.2rem;
    }

    .btn-toggle.active {
        background: rgba(255, 0, 127, 0.2);
        border-color: #ff007f;
        color: #ff007f;
    }

    .btn-toggle.toggle-gold.active {
        background: rgba(255, 215, 0, 0.2);
        border-color: #ffd700;
        color: #ffd700;
    }

    .btn-toggle.toggle-violet.active {
        background: rgba(139, 92, 246, 0.2);
        border-color: #8b5cf6;
        color: #8b5cf6;
    }

    /* Morph Button */
    .btn-morph {
        background: linear-gradient(135deg, #8b5cf6, #6366f1);
        min-width: 140px;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .btn-morph.loading {
        width: 48px;
        min-width: 48px;
        border-radius: 50%;
        padding: 0;
    }

    .btn-morph.success {
        background: linear-gradient(135deg, #10b981, #059669);
        width: 48px;
        min-width: 48px;
        border-radius: 50%;
        padding: 0;
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .checkmark {
        font-size: 1.5rem;
        animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes scaleIn {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    /* Scramble Button */
    .btn-scramble {
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border: 1px solid #8b5cf6;
        font-family: monospace;
        min-width: 120px;
    }

    .btn-scramble:hover {
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
    }

    /* Expand Button */
    .btn-expand {
        background: transparent;
        border: 2px solid #00ffff;
        color: #00ffff;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        overflow: hidden;
    }

    .expand-icon {
        transition: transform 0.3s ease;
    }

    .btn-expand:hover {
        background: #00ffff;
        color: #0a1520;
        padding-right: 2.5rem;
    }

    .btn-expand:hover .expand-icon {
        transform: translateX(8px);
    }

    /* Jelly Button */
    .btn-jelly:active {
        animation: jelly 0.5s;
    }

    @keyframes jelly {
        0% {
            transform: scale(1, 1);
        }
        30% {
            transform: scale(1.25, 0.75);
        }
        40% {
            transform: scale(0.75, 1.25);
        }
        50% {
            transform: scale(1.15, 0.85);
        }
        65% {
            transform: scale(0.95, 1.05);
        }
        75% {
            transform: scale(1.05, 0.95);
        }
        100% {
            transform: scale(1, 1);
        }
    }
</style>
