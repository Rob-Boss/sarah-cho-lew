<script>
    const items = [
        {
            title: "What services do you offer?",
            content:
                "I specialize in commercial directing, music videos, narrative short films, and branded content. Each project is approached with a unique visual language tailored to your story.",
        },
        {
            title: "What is your creative process?",
            content:
                "Every project begins with deep collaboration. I start with mood boarding, location scouting, and extensive pre-production to ensure we're aligned on vision before cameras roll.",
        },
        {
            title: "What equipment do you use?",
            content:
                "I work with top-tier cinema cameras including ARRI, RED, and Sony Venice. The choice of gear is always dictated by the story—form follows function.",
        },
        {
            title: "How can we work together?",
            content:
                "Reach out through the contact form with your project details. I'll review and respond within 48 hours to schedule an initial creative call.",
        },
    ];

    let openIndex = -1;

    function toggle(index) {
        openIndex = openIndex === index ? -1 : index;
    }
</script>

<div class="accordion">
    {#each items as item, index}
        <div class="accordion-item" class:open={openIndex === index}>
            <button class="accordion-header" on:click={() => toggle(index)}>
                <span>{item.title}</span>
                <span class="icon" class:rotated={openIndex === index}>+</span>
            </button>
            <div class="accordion-content" class:expanded={openIndex === index}>
                <div class="content-inner">
                    <p>{item.content}</p>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .accordion {
        max-width: 700px;
    }

    .accordion-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        margin-bottom: 0.75rem;
        overflow: hidden;
        transition: border-color 0.3s;
    }

    .accordion-item.open {
        border-color: rgba(139, 92, 246, 0.5);
    }

    .accordion-header {
        width: 100%;
        padding: 1.25rem 1.5rem;
        background: rgba(255, 255, 255, 0.03);
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;
        font-weight: 500;
        color: #fff;
        text-align: left;
        transition: background 0.3s;
    }

    .accordion-header:hover {
        background: rgba(255, 255, 255, 0.06);
    }

    .icon {
        font-size: 1.5rem;
        color: #8b5cf6;
        transition: transform 0.3s ease;
    }

    .icon.rotated {
        transform: rotate(45deg);
    }

    .accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
    }

    .accordion-content.expanded {
        max-height: 200px;
    }

    .content-inner {
        padding: 0 1.5rem 1.5rem;
    }

    .content-inner p {
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
        margin: 0;
    }
</style>
