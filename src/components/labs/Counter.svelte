<script>
    let count = 0;

    function increment() {
        count++;
    }

    function decrement() {
        count--;
    }

    function reset() {
        count = 0;
    }
</script>

<div class="counter">
    <button class="counter-btn minus" on:click={decrement}>−</button>
    <div
        class="counter-display"
        class:positive={count > 0}
        class:negative={count < 0}
    >
        {count}
    </div>
    <button class="counter-btn plus" on:click={increment}>+</button>
    <button class="counter-btn reset" on:click={reset}>Reset</button>
</div>

<style>
    .counter {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        width: fit-content;
    }

    .counter-btn {
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 12px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 600;
    }

    .counter-btn.minus {
        background: linear-gradient(135deg, #ff6b6b, #ff4757);
        color: #fff;
    }

    .counter-btn.plus {
        background: linear-gradient(135deg, #98ff98, #2ed573);
        color: #0a1a0a;
    }

    .counter-btn.reset {
        width: auto;
        padding: 0 1.25rem;
        font-size: 0.9rem;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .counter-btn:hover {
        transform: scale(1.1);
    }

    .counter-btn:active {
        transform: scale(0.95);
    }

    .counter-display {
        min-width: 80px;
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        color: #fff;
        transition:
            color 0.2s,
            transform 0.2s;
    }

    .counter-display.positive {
        color: #98ff98;
    }

    .counter-display.negative {
        color: #ff6b6b;
    }
</style>
