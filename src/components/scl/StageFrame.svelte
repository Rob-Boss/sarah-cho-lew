<div class="stage-frame">
    <!-- Top Curtain (Valance) - Z-index 1 so it's behind the side curtains -->
    <div class="curtain-top">
        <img
            src="/MEDIA/static%20curtain/static%20curtain%20middle.webp"
            alt=""
        />
    </div>

    <!-- Side Curtains - Z-index 2 so they sit on top of the valance ends -->
    <div class="curtain-left">
        <img
            src="/MEDIA/static%20curtain/static%20curtain%20left.webp"
            alt=""
        />
    </div>

    <div class="curtain-right">
        <img
            src="/MEDIA/static%20curtain/static%20curtain%20left.webp"
            alt=""
            class="flipped"
        />
    </div>
</div>

<style>
    .stage-frame {
        position: fixed;
        inset: 0;
        z-index: 10000;
        pointer-events: none;
    }

    .curtain-left,
    .curtain-right {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100vh;
        z-index: 2;
    }

    .curtain-left {
        left: -2px; /* Slight bleed to avoid gaps */
    }

    .curtain-right {
        right: -2px;
    }

    .curtain-left img,
    .curtain-right img {
        height: 100%;
        width: auto;
        display: block;
        /* Ensure the curtain doesn't get too wide on giant screens */
        max-width: 35vw;
        object-fit: cover;
        object-position: left center;
    }

    .curtain-right img.flipped {
        transform: scaleX(-1);
        object-position: left center;
    }

    .curtain-top {
        position: absolute;
        top: -10px; /* Slight tuck to hide top edge */
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
    }

    .curtain-top img {
        width: 100%;
        height: auto;
        display: block;
        /* Keep it substantial */
        max-height: 45vh;
        object-fit: cover;
        object-position: center top;
    }

    @media (max-width: 768px) {
        .curtain-left img,
        .curtain-right img {
            max-width: 25vw;
        }
        .curtain-top {
            height: 15vh;
        }
    }
</style>
