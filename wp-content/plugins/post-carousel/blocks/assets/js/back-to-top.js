document.addEventListener("DOMContentLoaded", () => {
    const spBackToTop = document.querySelector("#sp-smart-post-back-to-top-btn");
    if (!spBackToTop) { return };

    const spBackToTopIcon = spBackToTop.querySelector(".sp-smart-post-back-to-top-icon");
    const spBackToTopLabel = spBackToTop.querySelector(".sp-smart-post-back-to-top-text.sp-back-to-top-text");
    const spBackToBottomLabel = spBackToTop.querySelector(".sp-smart-post-back-to-top-text.sp-go-to-bottom-text");

    const transitionDelay = (parseInt(spBackToTop.dataset?.transition) * 1000) || 1000;
    const goToBottom = spBackToTop.dataset?.goBottom || false;
    const entranceAnimation = spBackToTop.dataset?.animation || "fade-in";

    const animateTransform = {
        "fade-in": "translate(0px, 0px)",
        "slide-in-left": "translate(10px, 0px)",
        "slide-in-right": "translate(-10px, 0px)",
        "slide-in-up": "translate(0px, 10px)",
    };

    spBackToTop.style.transition = `all 0.3s ease`;
    spBackToTopIcon.style.transition = `transform 0.3s ease`;

    let lastScrollY = window.scrollY;
    let scrollDirection = null;

    // Helper to toggle labels
    const toggleLabels = (toBottom) => {
        if (!spBackToTopLabel || !spBackToBottomLabel) { return };
        // spBackToTopLabel.style.display = toBottom ? "none" : "block";
        // spBackToBottomLabel.style.display = toBottom ? "block" : "none";
        spBackToTopLabel.classList.add( toBottom ? "sp-hide-label" : "sp-show-label" );
        spBackToTopLabel.classList.remove( toBottom ? "sp-show-label" : "sp-hide-label" );
        spBackToBottomLabel.classList.add( toBottom ? "sp-show-label" : "sp-hide-label" );
        spBackToBottomLabel.classList.remove( toBottom ? "sp-hide-label" : "sp-show-label" );
    };

    function updateBackToTopButton() {
        const scrollY = window.scrollY;
        if (scrollY > 350) {
            spBackToTop.style.display = "inline-block";
            // eslint-disable-next-line
            spBackToTop.offsetHeight; // trigger reflow
            spBackToTop.style.opacity = "1";
            spBackToTop.style.transform = "translate(0px, 0px)";
        } else {
            spBackToTop.style.opacity = "0";
            spBackToTop.style.transform = animateTransform[entranceAnimation];
            setTimeout(() => {
                if (window.scrollY <= 250) { spBackToTop.style.display = "none" };
            }, 300);
        }
    }

    // Smooth scroll function
    function customScrollToTop(duration, direction = null) {
        const start = window.scrollY;
        const target = direction === "down" ? document.body.scrollHeight : 0;
        const distance = target - start;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5
                ? 4 * progress ** 3
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            window.scrollTo(0, start + distance * ease);
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll)
            };
        }

        requestAnimationFrame(animateScroll);
    }

    function isButtonAtEndOfPage(tolerance = 50, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const rect = spBackToTop.getBoundingClientRect();
                const absoluteBottom = rect.top + window.scrollY + rect.height;
                const docHeight = document.documentElement.scrollHeight;
                resolve((docHeight - absoluteBottom) <= tolerance);
            }, delay + 100);
        });
    }

    async function buttonChangeDirection() {
        if (await isButtonAtEndOfPage(100, transitionDelay)) {
            scrollDirection = "up";
            spBackToTopIcon.style.transform = `rotateX(0deg)`;
            toggleLabels(false);
        }
    }

    // Scroll direction tracking
    window.addEventListener("scroll", () => {
        if (goToBottom) {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                scrollDirection = "down";
                spBackToTopIcon.style.transform = `rotateX(180deg)`;
                toggleLabels(true);
            } else if (currentScrollY < lastScrollY) {
                scrollDirection = "up";
                spBackToTopIcon.style.transform = `rotateX(0deg)`;
                toggleLabels(false);
            }
            lastScrollY = currentScrollY;
        }
        buttonChangeDirection();
    });

    // Unified click handler (fixed duplicate listener)
    spBackToTop.addEventListener("click", (e) => {
        e.preventDefault();
        customScrollToTop(transitionDelay, goToBottom ? scrollDirection : null);
        buttonChangeDirection();
    });

    // Init setup
    toggleLabels(false);
    updateBackToTopButton();
    buttonChangeDirection();

    // Throttled scroll listener for visibility
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        if (scrollTimeout) { cancelAnimationFrame(scrollTimeout) };
        scrollTimeout = requestAnimationFrame(updateBackToTopButton);
    });
});