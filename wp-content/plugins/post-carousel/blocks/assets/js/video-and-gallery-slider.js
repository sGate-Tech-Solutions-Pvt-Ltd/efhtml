// class SPSlider {
//     constructor(wrapper, { loop = true, autoplay = true, interval = 4000, speed = 600 } = {}) {
//         const link = wrapper.closest("a");
//         this.imageWrapper = wrapper.closest(".sp-smart-post-card-image, .sp-smart-post-featured-image");
//         if ( link ) {
//             link.addEventListener("click", e => e.preventDefault());
//         }

//         this.wrapper = wrapper;
//         this.track = wrapper.querySelector(".sp-slider-track");
//         this.originalSlides = Array.from(wrapper.querySelectorAll(".sp-slide"));
//         this.prevBtn = this.imageWrapper.querySelector(".sp-prev");
//         this.nextBtn = this.imageWrapper.querySelector(".sp-next");

//         this.loop = loop;
//         this.autoplay = autoplay;
//         this.interval = interval;
//         this.speed = speed;
//         this.autoplayInterval = null;

//         this.isDragging = false;
//         this.startX = 0;
//         this.currentX = 0;

//         this.setupClones();
//         this.slides = Array.from(this.track.querySelectorAll(".sp-slide"));
//         this.total = this.slides.length;

//         this.index = this.loop ? 1 : 0; // Start at first real slide

//         this.init();
//     }

//     // --- Clone first & last slide for seamless loop ---
//     setupClones() {
//         if (!this.loop) return;

//         const firstClone = this.originalSlides[0].cloneNode(true);
//         const lastClone = this.originalSlides[this.originalSlides.length - 1].cloneNode(true);

//         firstClone.classList.add("sp-clone");
//         lastClone.classList.add("sp-clone");

//         this.track.innerHTML = "";
//         this.track.appendChild(lastClone);
//         this.originalSlides.forEach(slide => this.track.appendChild(slide));
//         this.track.appendChild(firstClone);
//     }

//     init() {
//         this.setupSlides();
//         this.updateSlides(false);
//         this.bindEvents();

//         this.slides.forEach(slide => {
//             const img = slide.querySelector("img");
//             if (img) img.addEventListener("dragstart", e => e.preventDefault());
//         });

//         if (this.autoplay) this.startAutoplay();
//         window.addEventListener("resize", () => this.updateSlides(false));
//     }

//     setupSlides() {
//         this.track.style.position = "relative";
//         this.track.style.overflow = "hidden";

//         this.slides.forEach((slide) => {
//             this.track.style.height = `${slide.clientHeight || ""}px`;
//             slide.style.position = "absolute";
//             slide.style.top = "0";
//             slide.style.left = "0";
//             slide.style.width = "100%";
//             slide.style.transition = `transform ${this.speed}ms ease, opacity ${this.speed}ms ease`;
//         });
//     }

//     // --- Update slide positions in percent ---
//     updateSlides(animate = true) {
//         this.slides.forEach((slide, i) => {
//             if (!animate) slide.style.transition = "none";
//             else slide.style.transition = `transform ${this.speed}ms ease, opacity ${this.speed}ms ease`;

//             const offset = i - this.index;
//             slide.style.transform = `translateX(${offset * 100}%)`;
//             slide.style.opacity = Math.abs(offset) <= 1 ? "1" : "0";
//             slide.style.zIndex = offset === 0 ? "2" : "1";
//         });
//     }

//     next() {

//         this.index++;
//         this.updateSlides();
//         if (this.loop && this.index === this.total - 1) {
//             setTimeout(() => {
//                 this.index = 1;
//                 this.updateSlides(false);
//             }, this.speed);
//         }
//     }

//     prev() {
//         this.index--;
//         this.updateSlides();
//         if (this.loop && this.index === 0) {
//             setTimeout(() => {
//                 this.index = this.total - 2;
//                 this.updateSlides(false);
//             }, this.speed);
//         }
//     }

//     startAutoplay() {
//         this.stopAutoplay();
//         if (!this.autoplay) return;
//         this.autoplayInterval = setInterval(() => this.next(), this.interval);
//     }

//     stopAutoplay() {
//         clearInterval(this.autoplayInterval);
//     }

//     bindEvents() {
//         // Buttons
//         this.nextBtn?.addEventListener("click", () => this.next());
//         this.prevBtn?.addEventListener("click", () => this.prev());

//         // Pause on hover
//         this.imageWrapper.addEventListener("mouseenter", () => this.stopAutoplay());
//         this.imageWrapper.addEventListener("mouseleave", () => this.startAutoplay());

//         // --- Drag / Swipe ---
//         this.track.addEventListener("mousedown", this.startDrag.bind(this));
//         this.track.addEventListener("touchstart", this.startDrag.bind(this), { passive: true });

//         window.addEventListener("mousemove", this.onDrag.bind(this));
//         window.addEventListener("touchmove", this.onDrag.bind(this), { passive: true });

//         window.addEventListener("mouseup", this.endDrag.bind(this));
//         window.addEventListener("touchend", this.endDrag.bind(this));
//     }

//     startDrag(e) {
//         this.isDragging = true;
//         this.startX = this.getX(e);
//         this.currentX = this.startX;
//         this.stopAutoplay();

//         this.slides.forEach(slide => (slide.style.transition = "none"));
//     }

//     onDrag(e) {
//         if (!this.isDragging) return;
//         this.currentX = this.getX(e);
//         const diff = ((this.currentX - this.startX) / this.wrapper.clientWidth) * 100; // percent

//         this.slides.forEach((slide, i) => {
//             const offset = i - this.index;
//             slide.style.transform = `translateX(${offset * 100 + diff}%)`;
//             slide.style.opacity = Math.abs(offset + diff / 100) <= 1 ? "1" : "0";
//         });
//     }

//     endDrag() {
//         if (!this.isDragging) return;
//         this.isDragging = false;
//         const diff = ((this.currentX - this.startX) / this.wrapper.clientWidth) * 100;

//         this.slides.forEach(slide => {
//             slide.style.transition = `transform ${this.speed}ms ease, opacity ${this.speed}ms ease`;
//         });

//         if (diff < -15) this.next();
//         else if (diff > 15) this.prev();
//         else this.updateSlides();

//         if (this.autoplay) this.startAutoplay();
//     }

//     getX(e) {
//         return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
//     }

//     destroy() {
//         // stop autoplay
//         if (this.autoplayInterval) {
//             clearInterval(this.autoplayInterval);
//             this.autoplayInterval = null;
//         }

//         // replace track (removes drag events)
//         if (this.track) {
//             const newTrack = this.track.cloneNode(true);
//             this.track.parentNode.replaceChild(newTrack, this.track);
//             this.track = newTrack;
//         }

//         // replace prev button
//         if (this.prevBtn) {
//             const newPrev = this.prevBtn.cloneNode(true);
//             this.prevBtn.parentNode.replaceChild(newPrev, this.prevBtn);
//             this.prevBtn = newPrev;
//         }

//         // replace next button
//         if (this.nextBtn) {
//             const newNext = this.nextBtn.cloneNode(true);
//             this.nextBtn.parentNode.replaceChild(newNext, this.nextBtn);
//             this.nextBtn = newNext;
//         }

//         // replace image wrapper (mouseenter / leave clean)
//         if (this.imageWrapper) {
//             const newWrapper = this.imageWrapper.cloneNode(true);
//             this.imageWrapper.parentNode.replaceChild(newWrapper, this.imageWrapper);
//             this.imageWrapper = newWrapper;
//         }

//         // reset slides to original (remove clones)
//         if (this.track && this.originalSlides) {
//             this.track.innerHTML = "";
//             this.originalSlides.forEach(slide => {
//                 slide.style = "";
//                 this.track.appendChild(slide);
//             });
//         }

//         // reset refs
//         this.wrapper = null;
//         this.slides = null;
//         this.originalSlides = null;
//         this.isDragging = false;
//         this.startX = 0;
//         this.currentX = 0;
//     }

// }

class SPSlider {
    constructor(wrapper, { loop = true, autoplay = true, interval = 4000, speed = 600 } = {}) {
        const link = wrapper.closest("a");
        this.imageWrapper = wrapper.closest(".sp-smart-post-card-image, .sp-smart-post-featured-image");
        if ( link ) {
            link.addEventListener("click", e => e.preventDefault());
        }

        this.wrapper = wrapper;
        this.track = wrapper.querySelector(".sp-slider-track");
        this.originalSlides = Array.from(wrapper.querySelectorAll(".sp-slide"));
        this.prevBtn = this.imageWrapper.querySelector(".sp-prev");
        this.nextBtn = this.imageWrapper.querySelector(".sp-next");

        this.loop = loop;
        this.autoplay = autoplay;
        this.interval = interval;
        this.speed = speed;
        this.autoplayInterval = null;

        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;

        this.setupClones();
        this.slides = Array.from(this.track.querySelectorAll(".sp-slide"));
        this.total = this.slides.length;

        this.index = this.loop ? 1 : 0; // Start at first real slide

        this.init();
    }

    // --- Clone first & last slide for seamless loop ---
    setupClones() {
        if (!this.loop) return;

        const firstClone = this.originalSlides[0].cloneNode(true);
        const lastClone = this.originalSlides[this.originalSlides.length - 1].cloneNode(true);

        firstClone.classList.add("sp-clone");
        lastClone.classList.add("sp-clone");

        this.track.innerHTML = "";
        this.track.appendChild(lastClone);
        this.originalSlides.forEach(slide => this.track.appendChild(slide));
        this.track.appendChild(firstClone);
    }

    init() {
        this.setupSlides();
        this.updateSlides(false);
        this.bindEvents();

        this.slides.forEach(slide => {
            const img = slide.querySelector("img");
            if (img) img.addEventListener("dragstart", e => e.preventDefault());
        });

        if (this.autoplay) this.startAutoplay();
        window.addEventListener("resize", () => this.updateSlides(false));
    }

    setupSlides() {
        this.track.style.position = "relative";
        this.track.style.overflow = "hidden";

        this.slides.forEach((slide) => {
            this.track.style.height = `${slide.clientHeight || ""}px`;
            slide.style.position = "absolute";
            slide.style.top = "0";
            slide.style.left = "0";
            slide.style.width = "100%";
            slide.style.transition = `transform ${this.speed}ms ease, opacity ${this.speed}ms ease`;
        });
    }

    // --- Update slide positions in percent ---
    updateSlides(animate = true) {
        this.slides.forEach((slide, i) => {
            if (!animate) slide.style.transition = "none";
            else slide.style.transition = `transform ${this.speed}ms ease, opacity ${this.speed}ms ease`;

            const offset = i - this.index;
            slide.style.transform = `translateX(${offset * 100}%)`;
            slide.style.opacity = Math.abs(offset) <= 1 ? "1" : "0";
            slide.style.zIndex = offset === 0 ? "2" : "1";
        });
    }

    next() {

        this.index++;
        this.updateSlides();
        if (this.loop && this.index === this.total - 1) {
            setTimeout(() => {
                this.index = 1;
                this.updateSlides(false);
            }, this.speed);
        }
    }

    prev() {
        this.index--;
        this.updateSlides();
        if (this.loop && this.index === 0) {
            setTimeout(() => {
                this.index = this.total - 2;
                this.updateSlides(false);
            }, this.speed);
        }
    }

    startAutoplay() {
        this.stopAutoplay();
        if (!this.autoplay) return;
        this.autoplayInterval = setInterval(() => this.next(), this.interval);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }

    bindEvents() {
        // Buttons
        this.nextBtn?.addEventListener("click", () => this.next());
        this.prevBtn?.addEventListener("click", () => this.prev());

        // Pause on hover
        this.imageWrapper.addEventListener("mouseenter", () => this.stopAutoplay());
        this.imageWrapper.addEventListener("mouseleave", () => this.startAutoplay());

        // --- Drag / Swipe ---
        this.track.addEventListener("mousedown", this.startDrag.bind(this));
        this.track.addEventListener("touchstart", this.startDrag.bind(this), { passive: true });

        window.addEventListener("mousemove", this.onDrag.bind(this));
        window.addEventListener("touchmove", this.onDrag.bind(this), { passive: true });

        window.addEventListener("mouseup", this.endDrag.bind(this));
        window.addEventListener("touchend", this.endDrag.bind(this));
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = this.getX(e);
        this.currentX = this.startX;
        this.stopAutoplay();

        this.slides.forEach(slide => (slide.style.transition = "none"));
    }

    onDrag(e) {
        if (!this.isDragging) return;
        this.currentX = this.getX(e);
        const diff = ((this.currentX - this.startX) / this.wrapper.clientWidth) * 100; // percent

        this.slides.forEach((slide, i) => {
            const offset = i - this.index;
            slide.style.transform = `translateX(${offset * 100 + diff}%)`;
            slide.style.opacity = Math.abs(offset + diff / 100) <= 1 ? "1" : "0";
        });
    }

    endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;
        const diff = ((this.currentX - this.startX) / this.wrapper.clientWidth) * 100;

        this.slides.forEach(slide => {
            slide.style.transition = `transform ${this.speed}ms ease, opacity ${this.speed}ms ease`;
        });

        if (diff < -15) this.next();
        else if (diff > 15) this.prev();
        else this.updateSlides();

        if (this.autoplay) this.startAutoplay();
    }

    getX(e) {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

    // --- DESTROY METHOD ---
    destroy() {
        // stop autoplay
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }

        // remove events safely by replacing nodes
        if (this.track) {
            const newTrack = this.track.cloneNode(true);
            this.track.parentNode.replaceChild(newTrack, this.track);
            this.track = newTrack;
        }

        if (this.prevBtn) {
            const newPrev = this.prevBtn.cloneNode(true);
            this.prevBtn.parentNode.replaceChild(newPrev, this.prevBtn);
            this.prevBtn = newPrev;
        }

        if (this.nextBtn) {
            const newNext = this.nextBtn.cloneNode(true);
            this.nextBtn.parentNode.replaceChild(newNext, this.nextBtn);
            this.nextBtn = newNext;
        }

        if (this.imageWrapper) {
            const newWrapper = this.imageWrapper.cloneNode(true);
            this.imageWrapper.parentNode.replaceChild(newWrapper, this.imageWrapper);
            this.imageWrapper = newWrapper;
        }

        // reset slides to original
        if (this.track && this.originalSlides) {
            this.track.innerHTML = "";
            this.originalSlides.forEach(slide => {
                slide.style = "";
                this.track.appendChild(slide);
            });
        }

        // reset refs
        this.wrapper = null;
        this.slides = null;
        this.originalSlides = null;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
    }
}

class SpSmartVideoPlayer {
	constructor(selector, url, options = {}) {
		const link = selector.closest("a");
		if (link) {
			this.link = link;
			this.preventLink = (e) => e.preventDefault();
			link.addEventListener("click", this.preventLink);
		}

		this.container =
			typeof selector === "string"
				? document.querySelector(selector)
				: selector;

		this.url = url;
		this.options = Object.assign(
			{
				featureImage: null,
				videoCaption: null,
				showFeatureImage: true,
				width: "100%",
				height: "",
				transitionSpeed: 400,
			},
			options
		);

		if (!this.container) {
			console.error("SmartVideoPlayer: container not found!");
			return;
		}

		this.init();
	}

	init() {
		this.container.classList.add("svp-container");
		Object.assign(this.container.style, {
			position: "relative",
			width: this.options.width,
			height: this.options.height,
			overflow: "hidden",
			background: "#000",
		});

		if (this.options.showFeatureImage && this.options.featureImage) {
			this.createFeatureImage();
		} else {
			this.loadVideo();
		}
	}

	createFeatureImage() {
		const img = document.createElement("img");
		const imageArea = this.container.closest(
			".sp-smart-post-card-image, .sp-smart-post-featured-image"
		);

		this.featureImg = img;
		this.imageArea = imageArea;

		img.src = this.options.featureImage;
		img.className = "sp-video-feature-image";

		Object.assign(img.style, {
			width: "100%",
			height: "100%",
			objectFit: "cover",
			display: "block",
			transition: `opacity ${this.options.transitionSpeed}ms ease, transform ${this.options.transitionSpeed}ms ease`,
		});

		const playBtn = document.createElement("div");
		playBtn.className = "sp-video-play-btn";
		playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="12" viewBox="0 0 9 12" fill="none"><path d="M0 11.842V0l8.882 5.921z" fill="#fff"/></svg>`;
		playBtn.title = this.options.videoCaption || "";

		this.playBtn = playBtn;

		this.onPlayClick = () => {
			playBtn.style.pointerEvents = "none";
			img.style.opacity = "0";
			img.style.transform = "scale(1.1)";
			playBtn.style.opacity = "0";
			playBtn.style.transform = "translate(-50%, -50%) scale(0.7)";

			this.playTimeout = setTimeout(() => {
				if (!this.container) return;
				this.container.innerHTML = "";
				this.loadVideo();
			}, this.options.transitionSpeed);
		};

		playBtn.addEventListener("click", this.onPlayClick);

		this.container.appendChild(img);

		const hasPlayBtn = imageArea.querySelector(".sp-video-play-btn");
		if (!hasPlayBtn) {
			imageArea.appendChild(playBtn);
		}

		this.container.style.height =
			imageArea.clientHeight > 0 ? imageArea.clientHeight + "px" : "";
	}

	loadVideo() {
		this.container.innerHTML = this.getEmbedHTML(this.url);
	}

	getEmbedHTML(url) {
		if (!url) {
			return `<p style="color:red;">⚠️ No video URL provided.</p>`;
		}

		if (url.includes("youtube.com") || url.includes("youtu.be")) {
			const id = (url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) || [])[1];
			if (id) {
				return `
					<iframe
						width="100%"
						height="100%"
						src="https://www.youtube.com/embed/${id}?autoplay=1"
						frameborder="0"
						allow="autoplay; encrypted-media"
						allowfullscreen
					></iframe>`;
			}
		}

		if (url.includes("vimeo.com")) {
			const id = url.split("/").pop();
			return `
				<iframe
					width="100%"
					height="100%"
					src="https://player.vimeo.com/video/${id}?autoplay=1"
					frameborder="0"
					allow="autoplay; fullscreen"
					allowfullscreen
				></iframe>`;
		}

		if (url.match(/\.(mp4|webm|ogg)$/)) {
			return `
				<video width="100%" height="100%" controls autoplay>
					<source src="${url}" type="video/mp4">
					Your browser does not support the video tag.
				</video>`;
		}

		return `<p style="color:red;">⚠️ Unsupported video link!</p>`;
	}

	/**
	 * DESTROY METHOD
	 */
	destroy() {
        // clear timeout
        if (this.playTimeout) {
            clearTimeout(this.playTimeout);
            this.playTimeout = null;
        }

        // remove play button listener + element
        if (this.playBtn && this.onPlayClick) {
            this.playBtn.removeEventListener("click", this.onPlayClick);

            if (this.playBtn.parentNode) {
                this.playBtn.parentNode.removeChild(this.playBtn);
            }
        }

        // remove link prevent default
        if (this.link && this.preventLink) {
            this.link.removeEventListener("click", this.preventLink);
        }

        // stop iframe / video
        if (this.container) {
            const iframe = this.container.querySelector("iframe");
            const video = this.container.querySelector("video");

            if (iframe) iframe.src = "";
            if (video) {
                video.pause();
                video.removeAttribute("src");
                video.load();
            }

            this.container.innerHTML = "";
            this.container.classReminder?.remove?.("svp-container");
        }

        // null references
        this.container = null;
        this.url = null;
        this.options = null;
        this.playBtn = null;
        this.featureImg = null;
        this.imageArea = null;
        this.link = null;
        this.onPlayClick = null;
    }

}


document.addEventListener("DOMContentLoaded", () => {
    // Initialize image gallery and video players.
	const initSmartPostFeatures = (context = document) => {
		// --- Slider Init ---
		const sliderWrappers = context.querySelectorAll(".sp-slider-wrapper");

		sliderWrappers.forEach(slideWrapper => {
			if (!slideWrapper.classList.contains("sp-slider-initialized")) {
				new SPSlider(slideWrapper, {
					loop: true,
					autoplay: true,
					interval: 3000,
					speed: 600,
				});
				slideWrapper.classList.add("sp-slider-initialized");
			}
		});

		// --- Video Player Init ---
		const videoPostList = context.querySelectorAll(".sp-smart-video-player");

		videoPostList.forEach(videoContainer => {
			if (!videoContainer.classList.contains("sp-video-initialized")) {
				const videoUrl = videoContainer.dataset.video_url;
				const featureImage = videoContainer.dataset.image_url;
				const videoCaption = videoContainer.dataset.video_caption;

				new SpSmartVideoPlayer(videoContainer, videoUrl, {
					featureImage,
					videoCaption,
					showFeatureImage: true,
					transitionSpeed: 500,
				});
				videoContainer.classList.add("sp-video-initialized");
			}
		});
	}

	initSmartPostFeatures();
})