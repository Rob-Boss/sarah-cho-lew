<script>
    let activeFrame = 0;
    let isExpanded = false;
    let hoverIntensity = 0;
    let mousePos = { x: 0, y: 0 };

    const frames = [
        { name: "Scribble", color: "#8b5cf6" },
        { name: "Neon", color: "#00ffff" },
        { name: "Sunset", color: "#ff6b6b" },
    ];

    function cycleFrame() {
        activeFrame = (activeFrame + 1) % frames.length;
    }

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        mousePos = {
            x: ((event.clientX - rect.left) / rect.width - 0.5) * 20,
            y: ((event.clientY - rect.top) / rect.height - 0.5) * 20,
        };
        hoverIntensity = 1;
    }

    function handleMouseLeave() {
        mousePos = { x: 0, y: 0 };
        hoverIntensity = 0;
    }
</script>

<div class="interactive-frames">
    <h3>Click to Cycle Frame Styles</h3>
    <div class="frame-switcher">
        <div
            class="switchable-frame"
            class:scribble={activeFrame === 0}
            class:neon={activeFrame === 1}
            class:sunset={activeFrame === 2}
            on:click={cycleFrame}
            on:keydown={(e) => e.key === "Enter" && cycleFrame()}
            role="button"
            tabindex="0"
        >
            <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop"
                alt="Film production"
            />
            <span class="frame-name">{frames[activeFrame].name}</span>
        </div>
        <p class="hint">Click the image to change frame style</p>
    </div>

    <h3>3D Perspective Frame</h3>
    <p class="desc">Move your mouse over the image</p>
    <div class="perspective-container">
        <div
            class="perspective-frame"
            style="transform: perspective(1000px) rotateY({mousePos.x}deg) rotateX({-mousePos.y}deg); --intensity: {hoverIntensity};"
            on:mousemove={handleMouseMove}
            on:mouseleave={handleMouseLeave}
            role="presentation"
        >
            <div class="perspective-border"></div>
            <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop"
                alt="Film reel"
            />
            <div class="perspective-shine"></div>
        </div>
    </div>

    <h3>Expandable Frame</h3>
    <div class="expand-container">
        <div
            class="expandable-frame"
            class:expanded={isExpanded}
            on:click={() => (isExpanded = !isExpanded)}
            on:keydown={(e) => e.key === "Enter" && (isExpanded = !isExpanded)}
            role="button"
            tabindex="0"
        >
            <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop"
                alt="Cinema"
            />
            <div class="expand-overlay">
                <span>{isExpanded ? "Click to close" : "Click to expand"}</span>
            </div>
        </div>
    </div>

    <h3>Animated Border Draw</h3>
    <div class="draw-frame-container">
        <div class="draw-frame">
            <svg viewBox="0 0 404 304" fill="none">
                <rect
                    x="2"
                    y="2"
                    width="400"
                    height="300"
                    rx="8"
                    class="draw-rect"
                />
            </svg>
            <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop"
                alt="Camera"
            />
        </div>
    </div>
</div>

<style>
    .interactive-frames {
        padding: 2rem;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    h3 {
        font-size: 1rem;
        margin: 2rem 0 0.75rem;
        color: rgba(255, 255, 255, 0.5);
    }

    h3:first-child {
        margin-top: 0;
    }

    .desc,
    .hint {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 1rem;
    }

    /* Frame Switcher */
    .frame-switcher {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .switchable-frame {
        position: relative;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 400px;
    }

    .switchable-frame img {
        display: block;
        width: 100%;
    }

    .switchable-frame.scribble {
        border: 3px dashed #8b5cf6;
        border-radius: 4px;
        padding: 8px;
    }

    .switchable-frame.neon {
        border: 2px solid #00ffff;
        border-radius: 0;
        box-shadow:
            0 0 10px #00ffff,
            0 0 30px rgba(0, 255, 255, 0.4),
            inset 0 0 10px rgba(0, 255, 255, 0.1);
    }

    .switchable-frame.sunset {
        border: 4px solid transparent;
        border-image: linear-gradient(135deg, #ff6b6b, #ffa07a, #ffd700) 1;
        padding: 4px;
    }

    .frame-name {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 0.25rem 1rem;
        border-radius: 100px;
        font-size: 0.8rem;
        color: #fff;
    }

    /* Perspective Frame */
    .perspective-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
    }

    .perspective-frame {
        position: relative;
        max-width: 400px;
        transition: transform 0.1s ease-out;
        transform-style: preserve-3d;
    }

    .perspective-frame img {
        display: block;
        width: 100%;
        border-radius: 8px;
    }

    .perspective-border {
        position: absolute;
        inset: -8px;
        border: 2px solid #8b5cf6;
        border-radius: 12px;
        transform: translateZ(-20px);
        opacity: calc(0.3 + var(--intensity) * 0.7);
        transition: opacity 0.3s;
    }

    .perspective-shine {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 50%
        );
        border-radius: 8px;
        opacity: calc(var(--intensity) * 0.5);
        pointer-events: none;
    }

    /* Expandable Frame */
    .expand-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
    }

    .expandable-frame {
        position: relative;
        max-width: 300px;
        cursor: pointer;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 3px solid #ff007f;
        border-radius: 8px;
        overflow: hidden;
    }

    .expandable-frame.expanded {
        max-width: 600px;
        border-color: #ffd700;
    }

    .expandable-frame img {
        display: block;
        width: 100%;
        transition: transform 0.5s;
    }

    .expandable-frame:hover img {
        transform: scale(1.05);
    }

    .expand-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .expandable-frame:hover .expand-overlay {
        opacity: 1;
    }

    .expand-overlay span {
        color: #fff;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 100px;
    }

    /* Draw Frame */
    .draw-frame-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
    }

    .draw-frame {
        position: relative;
        max-width: 400px;
        padding: 10px;
    }

    .draw-frame svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .draw-rect {
        stroke: url(#animGradient);
        stroke-width: 3;
        stroke-dasharray: 1400;
        stroke-dashoffset: 1400;
        transition: stroke-dashoffset 1s ease;
        fill: none;
    }

    .draw-frame:hover .draw-rect {
        stroke-dashoffset: 0;
        stroke: #98ff98;
    }

    .draw-frame img {
        display: block;
        width: 100%;
        border-radius: 6px;
    }
</style>
