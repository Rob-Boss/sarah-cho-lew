<script>
    import { currentSection } from "../../stores/globalState";
    import { onMount } from "svelte";

    // We can't easily toggle styles on the Astro-rendered main element from here without class manipulation
    // So we'll use a reactive statement to add/remove a class on the body or a specific target

    $: {
        if (typeof document !== "undefined") {
            const stageFeed = document.querySelector(".stage-feed");
            if (stageFeed) {
                if ($currentSection === "home") {
                    stageFeed.style.opacity = "1";
                    stageFeed.style.pointerEvents = "all";
                } else {
                    stageFeed.style.opacity = "0"; // Hide it but keep it in DOM
                    stageFeed.style.pointerEvents = "none";
                    // Optional: Scroll to top?
                    // stageFeed.scrollTo(0, 0);
                }
            }
        }
    }
</script>

<!-- No markup needed, just side effects -->
