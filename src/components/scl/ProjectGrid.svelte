<script>
    // Placeholder projects - will be replaced with real data
    const projects = [
        {
            id: 1,
            title: "Project One",
            category: "Commercial",
            color: "#C44A2D", // rust
            images: [
                "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=200&fit=crop",
            ],
        },
        {
            id: 2,
            title: "Project Two",
            category: "Music Video",
            color: "#3A9DAD", // teal
            images: [
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop",
            ],
        },
        {
            id: 3,
            title: "Project Three",
            category: "Short Film",
            color: "#1D6068", // deep teal
            images: [
                "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1505229681483-846b0e2c6b38?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1559329145-380ae9e39a69?w=200&h=200&fit=crop",
            ],
        },
        {
            id: 4,
            title: "Project Four",
            category: "Documentary",
            color: "#A8A090", // gray
            images: [
                "https://images.unsplash.com/photo-1524673360092-e07b7ae58845?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop",
            ],
        },
    ];

    let hoveredProject = null;

    function handleHover(id) {
        hoveredProject = id;
    }

    function handleLeave() {
        hoveredProject = null;
    }
</script>

<div class="projects-grid">
    {#each projects as project, index}
        <a
            href="/SCL/project/{project.id}"
            class="project-card"
            class:hovered={hoveredProject === project.id}
            style="--accent: {project.color}; --delay: {index * 0.1}s;"
            on:mouseenter={() => handleHover(project.id)}
            on:mouseleave={handleLeave}
        >
            <!-- Image collage -->
            <div class="image-collage">
                <div
                    class="main-image"
                    style="transform: rotate({-2 + index}deg);"
                >
                    <img src={project.images[0]} alt="{project.title} main" />
                </div>
                <div
                    class="secondary-image img-1"
                    style="transform: rotate({3 - index}deg);"
                >
                    <img
                        src={project.images[1]}
                        alt="{project.title} detail 1"
                    />
                </div>
                <div
                    class="secondary-image img-2"
                    style="transform: rotate({-4 + index * 0.5}deg);"
                >
                    <img
                        src={project.images[2]}
                        alt="{project.title} detail 2"
                    />
                </div>
            </div>

            <!-- Project info -->
            <div class="project-info">
                <span class="category">{project.category}</span>
                <h3 class="title">{project.title}</h3>
                <span class="arrow">→</span>
            </div>

            <!-- Decorative elements -->
            <div class="deco deco-1">✦</div>
            <div class="deco deco-2">✿</div>
        </a>
    {/each}
</div>

<style>
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
    }

    .project-card {
        position: relative;
        text-decoration: none;
        padding: 1.5rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.1);
        border: 3px solid var(--accent);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        /* Slight rotation for hand-placed feel */
        transform: rotate(calc(-1deg + var(--delay) * 20));
        animation: fadeSlideIn 0.6s ease backwards;
        animation-delay: var(--delay);
    }

    @keyframes fadeSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) rotate(calc(-1deg + var(--delay) * 20));
        }
        to {
            opacity: 1;
            transform: translateY(0) rotate(calc(-1deg + var(--delay) * 20));
        }
    }

    .project-card:hover {
        transform: rotate(0deg) scale(1.03);
        box-shadow: 8px 8px 0 var(--accent);
    }

    /* Image Collage */
    .image-collage {
        position: relative;
        height: 250px;
        margin-bottom: 1rem;
    }

    .main-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 75%;
        height: 80%;
        border: 4px solid var(--scl-cream, #f5f0e0);
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        z-index: 1;
        transition: transform 0.3s ease;
    }

    .project-card:hover .main-image {
        transform: rotate(0deg) scale(1.02) !important;
    }

    .secondary-image {
        position: absolute;
        width: 35%;
        height: 45%;
        border: 3px solid var(--scl-cream, #f5f0e0);
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
    }

    .img-1 {
        top: 10%;
        right: 0;
        z-index: 2;
    }

    .img-2 {
        bottom: 0;
        right: 5%;
        z-index: 0;
    }

    .project-card:hover .secondary-image {
        transform: rotate(0deg) translateY(-5px) !important;
    }

    .image-collage img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    /* Project Info */
    .project-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-top: 0.5rem;
    }

    .category {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--accent);
        background: rgba(255, 255, 255, 0.2);
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
        font-weight: 600;
    }

    .title {
        flex: 1;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--scl-teal-deep, #1d6068);
        margin: 0;
        transform: rotate(-1deg);
    }

    .arrow {
        font-size: 1.5rem;
        color: var(--accent);
        transition: transform 0.3s ease;
    }

    .project-card:hover .arrow {
        transform: translateX(8px);
    }

    /* Decorative Elements */
    .deco {
        position: absolute;
        font-size: 1.5rem;
        color: var(--accent);
        opacity: 0.6;
        transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        pointer-events: none;
    }

    .deco-1 {
        top: -10px;
        right: 20px;
        transform: rotate(15deg);
    }

    .deco-2 {
        bottom: -5px;
        left: 15px;
        transform: rotate(-10deg);
    }

    .project-card:hover .deco {
        opacity: 1;
    }

    .project-card:hover .deco-1 {
        transform: rotate(15deg) scale(1.3);
    }

    .project-card:hover .deco-2 {
        transform: rotate(-10deg) scale(1.3);
    }

    @media (max-width: 900px) {
        .projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .project-card {
            transform: rotate(0deg);
        }

        .image-collage {
            height: 200px;
        }
    }

    @media (max-width: 500px) {
        .image-collage {
            height: 180px;
        }

        .title {
            font-size: 1.25rem;
        }
    }
</style>
