<script>
    const images = [
        {
            src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop",
            alt: "Film production",
        },
        {
            src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=500&fit=crop",
            alt: "Camera",
        },
        {
            src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
            alt: "Cinema",
        },
        {
            src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop",
            alt: "Film reel",
        },
        {
            src: "https://images.unsplash.com/photo-1505229681483-846b0e2c6b38?w=800&h=500&fit=crop",
            alt: "Sunset",
        },
    ];

    let currentIndex = 0;
    let isAnimating = false;

    function next() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % images.length;
        setTimeout(() => (isAnimating = false), 500);
    }

    function prev() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        setTimeout(() => (isAnimating = false), 500);
    }

    function goTo(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        currentIndex = index;
        setTimeout(() => (isAnimating = false), 500);
    }
</script>

<div class="carousel">
    <div class="carousel-container">
        <div
            class="carousel-track"
            style="transform: translateX(-{currentIndex * 100}%)"
        >
            {#each images as image}
                <div class="carousel-slide">
                    <img src={image.src} alt={image.alt} />
                </div>
            {/each}
        </div>

        <button class="carousel-btn prev" on:click={prev}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>

        <button class="carousel-btn next" on:click={next}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
    </div>

    <div class="carousel-dots">
        {#each images as _, index}
            <button
                class="dot"
                class:active={index === currentIndex}
                on:click={() => goTo(index)}
                aria-label="Go to slide {index + 1}"
            ></button>
        {/each}
    </div>

    <div class="carousel-counter">
        {currentIndex + 1} / {images.length}
    </div>
</div>

<style>
    .carousel {
        max-width: 800px;
    }

    .carousel-container {
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .carousel-track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .carousel-slide {
        flex: 0 0 100%;
    }

    .carousel-slide img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
    }

    .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .carousel-btn:hover {
        background: rgba(139, 92, 246, 0.8);
        transform: translateY(-50%) scale(1.1);
    }

    .carousel-btn.prev {
        left: 1rem;
    }

    .carousel-btn.next {
        right: 1rem;
    }

    .carousel-dots {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .dot:hover {
        background: rgba(255, 255, 255, 0.5);
    }

    .dot.active {
        background: #8b5cf6;
        transform: scale(1.2);
    }

    .carousel-counter {
        text-align: center;
        margin-top: 0.75rem;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.5);
        font-family: monospace;
    }
</style>
