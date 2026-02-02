<script>
    let items = [
        { id: 1, text: "Narrative", color: "#8b5cf6" },
        { id: 2, text: "Commercial", color: "#ff6b6b" },
        { id: 3, text: "Music Video", color: "#00ffff" },
        { id: 4, text: "Documentary", color: "#ffd700" },
    ];

    let draggedItem = null;
    let draggedOverItem = null;

    function handleDragStart(event, item) {
        draggedItem = item;
        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event, item) {
        event.preventDefault();
        if (item.id !== draggedItem?.id) {
            draggedOverItem = item;
        }
    }

    function handleDragLeave() {
        draggedOverItem = null;
    }

    function handleDrop(event, targetItem) {
        event.preventDefault();
        if (!draggedItem || draggedItem.id === targetItem.id) return;

        const draggedIndex = items.findIndex((i) => i.id === draggedItem.id);
        const targetIndex = items.findIndex((i) => i.id === targetItem.id);

        // Swap items
        const newItems = [...items];
        [newItems[draggedIndex], newItems[targetIndex]] = [
            newItems[targetIndex],
            newItems[draggedIndex],
        ];
        items = newItems;

        draggedItem = null;
        draggedOverItem = null;
    }

    function handleDragEnd() {
        draggedItem = null;
        draggedOverItem = null;
    }
</script>

<div class="drag-container">
    <p class="instructions">Drag and drop to reorder:</p>

    <div class="drag-list">
        {#each items as item (item.id)}
            <div
                class="drag-item"
                class:dragging={draggedItem?.id === item.id}
                class:drag-over={draggedOverItem?.id === item.id}
                style="--item-color: {item.color}"
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, item)}
                on:dragover={(e) => handleDragOver(e, item)}
                on:dragleave={handleDragLeave}
                on:drop={(e) => handleDrop(e, item)}
                on:dragend={handleDragEnd}
                role="listitem"
            >
                <span class="drag-handle">⋮⋮</span>
                <span class="item-text">{item.text}</span>
                <span class="item-number"
                    >#{items.findIndex((i) => i.id === item.id) + 1}</span
                >
            </div>
        {/each}
    </div>

    <div class="current-order">
        <span>Current order: </span>
        {#each items as item, i}
            <span class="order-chip" style="background: {item.color}">
                {item.text}{i < items.length - 1 ? "" : ""}
            </span>
        {/each}
    </div>
</div>

<style>
    .drag-container {
        padding: 2rem;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        max-width: 500px;
    }

    .instructions {
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .drag-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .drag-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.25rem;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-left: 4px solid var(--item-color);
        border-radius: 8px;
        cursor: grab;
        transition: all 0.2s ease;
        user-select: none;
    }

    .drag-item:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
    }

    .drag-item.dragging {
        opacity: 0.5;
        cursor: grabbing;
    }

    .drag-item.drag-over {
        border-color: var(--item-color);
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.02);
    }

    .drag-handle {
        color: rgba(255, 255, 255, 0.3);
        font-size: 1.2rem;
        letter-spacing: -3px;
    }

    .item-text {
        flex: 1;
        color: #fff;
        font-weight: 500;
    }

    .item-number {
        color: rgba(255, 255, 255, 0.3);
        font-size: 0.85rem;
        font-family: monospace;
    }

    .current-order {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .current-order > span:first-child {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
    }

    .order-chip {
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
        font-size: 0.75rem;
        font-weight: 500;
        color: #000;
    }
</style>
