<div class="stage-frame">
    <!-- Top Curtain (Valance) - Highest Priority -->
    <!-- Top Curtain (Valance) - Highest Priority -->
    <div
        class="curtain-top"
        style="position: fixed; top: -10px; left: 0; right: 0; z-index: 2147483647; width: 100%; pointer-events: none;"
    >
        <img
            src="/MEDIA/static%20curtain/static%20curtain%20middle.webp"
            alt=""
        />
    </div>

    <!-- Side Curtains - High Priority -->
    <div
        class="curtain-left"
        style="position: fixed; top: 0; bottom: 0; left: -2px; z-index: 2147483646; height: 100vh; pointer-events: none;"
    >
        <img
            src="/MEDIA/static%20curtain/static%20curtain%20left.webp"
            alt=""
        />
    </div>

    <div
        class="curtain-right"
        style="position: fixed; top: 0; bottom: 0; right: -2px; z-index: 2147483646; height: 100vh; pointer-events: none;"
    >
        <img
            src="/MEDIA/static%20curtain/static%20curtain%20left.webp"
            alt=""
            class="flipped"
        />
    </div>
</div>

<style>
    .stage-frame {
        /* Container Logic Removed */
    }

    .curtain-left img,
    .curtain-right img {
        height: 100%; /* Fill viewport height */
        width: auto; /* Allow natural width based on aspect ratio */
        max-width: none; /* remove any limits */
        display: block;
        object-fit: cover; /* Maintain aspect ratio */
        object-position: left center;
    }

    .curtain-right img.flipped {
        transform: scaleX(-1);
        object-position: left center; /* Still left because we flipped the element */
    }

    .curtain-top img {
        width: 100%;
        height: auto;
        display: block;
        max-height: 45vh;
        object-fit: cover;
        object-position: center top;
    }

    @media (max-width: 768px) {
        .curtain-left img,
        .curtain-right img {
            /* No constraint on mobile either - let it flow */
        }
        .curtain-top {
            height: 15vh;
        }
    }
</style>
