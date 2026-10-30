document.addEventListener('DOMContentLoaded', function () {
	// Social link copy function.
	const socialLinkCopy = () => {
		const socialLinks = document.querySelectorAll(
			'.sp-smart-post-social-share .sp-smart-post-copy-btn'
		);

		if (0 < socialLinks.length) {
			socialLinks.forEach((element) => {
				element.addEventListener('click', (e) => {
					e.preventDefault();
					const link = e.target
						.closest('.sp-smart-post-copy-btn')
						.getAttribute('data-url');

					if (link && navigator.clipboard) {
						navigator.clipboard.writeText(link);
					} else {
						console.log(
							'Clipboard API not supported or link missing.'
						);
					}
				});
			});
		}
	};

	// Post Modal custom lightbox.
	const modal = () => {
		const modalContainers = document.querySelectorAll(
			".sp-smart-post-modal-container"
		);
		let imageSize;

		// Utility: Get next or previous post ID based on current
		const getNextPostId = (direction, currentId, allIds) => {
			const index = allIds.indexOf(String(currentId));
			if (index === -1) {
				return currentId;
			}
			if (direction === "next") {
				return allIds[(index + 1) % allIds.length];
			} else if (direction === "prev") {
				return allIds[(index - 1 + allIds.length) % allIds.length];
			}
			return currentId;
		};

		const getReadingTime = (content, attr) => {
			const text = content.trim();
			const characterCount = text.length;
			const wordCount = text.split(/\s+/).filter(Boolean).length;
			const allCount = {
				words: wordCount,
				chars: characterCount,
			};
			attr = JSON.parse(attr);
			const type = attr?.unit;
			return `${Math.floor(
				parseInt(allCount[type]) / parseInt(attr.value)
			)} Min Read`;
		};
		const sendPostIdAjax = (postId, modal) => {
			fetch(sp_smart_post_block_localize.ajaxUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					action: "sp_handle_post_id",
					nonce: sp_smart_post_block_localize.ajaxNonce,
					post_id: postId,
					image_size: imageSize,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						const postData = data.data;
						const modalImage = postData.post_image;
						const modalTitle = postData.title;
						const modalAuthor = postData.author_name;
						const modalDate = postData.date_time;
						const modalTaxonomy = postData.meta_taxonomy;
						const modalBadges = postData.post_badges_list;
						const modalContent = postData.content.replace(
							/^"|"$/g,
							""
						);
						const modalComment = postData.post_data.comment_count;
						const modalViews = postData.post_views;
						const modalLike = postData.like_button;
						const readingTimeContainer = modal.querySelector(
							".sp-smart-post-reading-time"
						);
						const readValue = readingTimeContainer
							? readingTimeContainer.dataset.readTime
							: "";
						let readTime;
						if (readValue) {
							readTime = getReadingTime(
								modalContent.replace(/<\/?p>/g, ""),
								readValue
							);
						}

						modal.querySelector(
							".sp-smart-post-card-modal-image"
						).innerHTML = modalImage;
						modal.querySelector(
							".sp-post-modal-title"
						).textContent = modalTitle;
						const authorEl = modal.querySelector(".sp-meta-author");
						if (authorEl) {
							authorEl.innerText = modalAuthor;
						}
						const dateEl = modal.querySelector(".sp-meta-date");
						if (dateEl) {
							dateEl.innerText = modalDate;
						}
						const commentsEl =
							modal.querySelector(".sp-meta-comments");
						if (commentsEl) {
							commentsEl.innerText = modalComment;
						}
						const viewsEl = modal.querySelector(".sp-meta-views");
						if (viewsEl) {
							viewsEl.innerText = modalViews;
						}
						const likesEl = modal.querySelector(
							".sp-smart-post-likes"
						);
						if (likesEl) {
							likesEl.innerHTML = modalLike;
						}
						const readTimeEl = modal.querySelector(
							".sp-meta-reading-time"
						);
						if (readTimeEl) {
							readTimeEl.innerHTML = readTime;
						}

						const postBadgesEl = modal.querySelector(
							".sp-title-badges-list"
						);
						if ( postBadgesEl && modalBadges && modalBadges?.length > 0 ) {
							const listItems = modalBadges.map( item => `<li class="sp-title-badge-item">${item.name}</li>`)?.join("");
							postBadgesEl.innerHTML = listItems;
						}

						modal.querySelector(
							".sp-post-modal-excerpt"
						).innerHTML = modalContent;
						modal.querySelector(
							".sp-meta-taxonomy-category"
						).innerText = modalTaxonomy;


						setTimeout(() => {
							modal.style.opacity = 1;
						}, 300);
					} else {
						console.log("PHP error:", data.data);
					}
				})
				.catch((err) => {
					console.log("Fetch error:", err);
				});
		};

		const cleanData = (modal) => {
			modal.querySelector(".sp-smart-post-card-modal-image").innerHTML =
				"";
			modal.querySelector(".sp-post-modal-title").textContent = "";
			modal.querySelector(".sp-meta-taxonomy-category").innerText = "";
			modal.querySelector(".sp-post-modal-excerpt").innerHTML = "";
		};

		// Open modal and setup navigation
		const openModal = (e, container) => {
			e.preventDefault();
			let modalData;

			const modal = container.querySelector( ".sp-smart-post-modal-container" );

			imageSize = container.querySelector(
				".sp-smart-post-modal-container .sp-smart-post-card-modal-image"
			).dataset.imageSize;

			const clickedCard = e.target.closest(".sp-smart-post-card");
			const clickedTitle = clickedCard?.querySelector(
				".sp-smart-post-title-wrapper"
			);

			if (!clickedTitle) {
				return;
			}

			let activePostId = String(clickedTitle.dataset.postId); // Initialize properly
			const allTitles = container.querySelectorAll(
				".sp-smart-post-title-wrapper"
			);
			const allIds = [
				...new Set(
					Array.from(allTitles).map((item) => item.dataset.postId)
				),
			];
			const nextBtn = container.querySelector(".sp-smart-modal-next");
			const prevBtn = container.querySelector(".sp-smart-modal-prev");

			// sendPostIdAjax( clickedTitle.dataset.postId, modal );
			// Setup navigation button handlers
			const setupNav = (btn, direction) => {
				if (!btn) {
					return;
				}
				btn.onclick = () => {
					activePostId = getNextPostId(
						direction,
						activePostId,
						allIds
					);
					//	modal.style.opacity = 0;
					sendPostIdAjax(activePostId, modal);
				};
			};

			setupNav(nextBtn, "next");
			setupNav(prevBtn, "prev");

			// modal.style.display = "block";
			modal.classList.add("is_open");
		};

		// Close modal
		const closeModal = (closeBtn) => {
			const modal = closeBtn.closest(".sp-smart-post-modal-container");
			// if ( modal ) modal.style.display = "none";

			modal.style.opacity = 0;
			if (modal) {
				modal.classList.remove("is_open");
			}
			cleanData(modal);
		};

		// Attach modal close events
		modalContainers.forEach((modal) => {
			const box = modal.querySelector(".sp-smart-post-modal-content");
			const nextBtn = modal.querySelector(".sp-smart-modal-next");
			const prevBtn = modal.querySelector(".sp-smart-modal-prev");
			modal
				.querySelectorAll(".sp-modal-close-btn.cursor")
				.forEach((btn) => {
					btn.addEventListener("click", () => closeModal(btn));
				});
			modal.addEventListener("click", (event) => {
				const clickedEl = event.target;
				// If click is NOT inside box AND not on next/prev buttons
				if (
					!box.contains(clickedEl) &&
					clickedEl !== nextBtn &&
					clickedEl !== prevBtn &&
					(!nextBtn || !nextBtn.contains(clickedEl)) &&
					(!prevBtn || !prevBtn.contains(clickedEl))
				) {
					closeModal(box);
				}
			});
		});

		// Attach open modal triggers using event delegation for better performance
		modalContainers.forEach((modal) => {
			if (!modal.textContent.trim()) {
				return;
			}

			const container = modal.parentElement;

			container.addEventListener("click", (e) => {
				// Do not trigger if the click is inside an already open modal.
				if (e.target.closest(".sp-smart-post-modal-container")) {
					return;
				}

				const trigger = e.target.closest(
					".sp-smart-post-card-image a, .sp-smart-post-title-wrapper, .sp-smart-post-read-more-button a"
				);

				if (!trigger) {
					return;
				}

				const clickedCard = trigger.closest(".sp-smart-post-card");
				if (!clickedCard) {
					return;
				}

				const clickedTitle = clickedCard.querySelector(
					".sp-smart-post-title-wrapper"
				);
				if (!clickedTitle || !clickedTitle.dataset.postId) {
					return;
				}

				e.preventDefault();
				modal.style.opacity = 0;
				sendPostIdAjax(clickedTitle.dataset.postId, modal);
				openModal(e, container);
			});
		});
	};

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
			videoContainer.addEventListener("click", function ( event ) {
				event.preventDefault(); 
				event.stopPropagation();

				const featureVideo = videoContainer.querySelector("video");
				if ( featureVideo ) {
					if (featureVideo.paused) {
						featureVideo.play();
					} else {
						featureVideo.pause();
					}
				}
			});
		});
	}

	initSmartPostFeatures();


	socialLinkCopy();

	modal();
	/**
	 * Carousel Pagination Function.
	 * @param paginationClass
	 */
	const paginationDotNumber = (paginationClass) => {
		return {
			el: paginationClass,
			clickable: true,
			renderBullet(index, className) {
				return (
					'<span class="' + className + '">' + (index + 1) + '</span>'
				);
			},
		};
	};
	/**
	 * Helper to safely parse JSON.
	 * @param str
	 * @param fallback
	 */
	const safeJSONParse = (str, fallback = {}) => {
		try {
			return JSON.parse(str) || fallback;
		} catch (e) {
			console.log('Failed to parse JSON:', str, e);
			return fallback;
		}
	};

	/**
	 * Initializes Timeline layout with dynamic height adjustment.
	 */
	document.querySelectorAll('.post-timeline-three').forEach((containerEl) => {
		const swiperEl = containerEl.querySelector('.swiper-container');
		if (!swiperEl) {
			return;
		}

		const postContainers = containerEl.querySelectorAll(
			'.sp-smart-post-timeline-three-post-container'
		);
		const wrapper = document.querySelector(
			'.timeline-three-layout-two .swiper-wrapper'
		);
		const timelineBorder = document.querySelector(
			'.timeline-three-layout-two .sp-smart-post-timeline-border'
		);

		// Calculate max height from posts.
		let maxHeight = 0;
		postContainers.forEach((post) => {
			maxHeight = Math.max(maxHeight, post.clientHeight);
		});
		maxHeight += 60; // Add margin

		// Apply calculated height
		if (wrapper) {
			wrapper.style.marginTop = `${maxHeight}px`;
		}
		if (timelineBorder) {
			timelineBorder.style.marginTop = `${maxHeight}px`;
		}

		const options = safeJSONParse(
			swiperEl.getAttribute('data-swiper-options')
		);
		if (!Object.keys(options).length) {
			return;
		}

		new PCPSwiper(swiperEl, options);
	});

	/**
	 * Initializes thumbnail sliders (layout one).
	 */
	document
		.querySelectorAll(
			'.sp-smart-post-thumbnail-slider.sp-smart-post-block-wrapper'
		)
		.forEach((containerEl) => {
			const [mainSwiperEl, thumbsSwiperEl] =
				containerEl.querySelectorAll('.swiper-container');
			const thumbsOptions = safeJSONParse(
				containerEl
					.querySelector('.sp-smart-post-swiper2')
					?.getAttribute('data-swiper-options')
			);
			const mainOptions = safeJSONParse(
				mainSwiperEl?.getAttribute('data-swiper-options')
			);

			if (
				!mainSwiperEl ||
				!thumbsSwiperEl ||
				!Object.keys(mainOptions).length
			) {
				return;
			}

			const thumbsSwiper = new PCPSwiper(thumbsSwiperEl, thumbsOptions);
			const carouselPagination = mainOptions?.pagination;
			const paginationClassName = carouselPagination?.el;
			const numberPagination = mainOptions?.pagination?.paginationType
				? true
				: false;
			const mainSwiper = new PCPSwiper(mainSwiperEl, {
				...mainOptions,
				thumbs: { swiper: thumbsSwiper },
				pagination: !numberPagination
					? carouselPagination
					: paginationDotNumber(paginationClassName),
			});
		});

	/**
	 * Initializes thumbnail sliders (layout two).
	 */
	document
		.querySelectorAll(
			'.sp-smart-post-block-wrapper.sp-smart-thumbnail-slider-two'
		)
		.forEach((containerEl) => {
			const [mainSwiperEl, thumbsSwiperEl] =
				containerEl.querySelectorAll('.swiper-container');
			const thumbsOptions = safeJSONParse(
				containerEl
					.querySelector('.sp-smart-post-swiper2')
					?.getAttribute('data-swiper-options')
			);
			const mainOptions = safeJSONParse(
				mainSwiperEl?.getAttribute('data-swiper-options')
			);

			if (
				!mainSwiperEl ||
				!thumbsSwiperEl ||
				!Object.keys(mainOptions).length
			) {
				return;
			}

			const thumbsSwiper = new PCPSwiper(thumbsSwiperEl, thumbsOptions);
			const mainSwiper = new PCPSwiper(mainSwiperEl, {
				...mainOptions,
				thumbs: { swiper: thumbsSwiper },
			});
		});

	/**
	 * Throttles a function using requestAnimationFrame for performance.
	 * @param {Function} callback The function to throttle.
	 * @return {Function} The throttled function.
	 */
	const throttle = (callback) => {
		let ticking = false;
		return (...args) => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					callback(...args);
					ticking = false;
				});
				ticking = true;
			}
		};
	};

	/**
	 * Initializes and manages scroll-based animations for all timeline blocks on the page.
	 * Caches DOM elements and uses a single throttled scroll listener for better performance.
	 */
	const initTimelineScroll = () => {
		const allTimelinesData = [];
		document
			.querySelectorAll('.sp-smart-post-show-scroll-wrapper')
			.forEach((timelineWrapper) => {
				const blockId = timelineWrapper.id;
				if (!blockId) {
					return;
				}

				const postCards = timelineWrapper.querySelectorAll(
					'.sp-smart-post-timeline-one-post-container .sp-smart-indicator-circle'
				);
				const indicatorArrows = timelineWrapper.querySelectorAll(
					'.sp-smart-post-timeline-one-post-container .sp-smart-indicator-arrow'
				);
				const timelineContainer = timelineWrapper.querySelector(
					'.sp-smart-post-timeline-container'
				);

				// Pre-create or find the style tag for this instance to avoid creating it on every scroll.
				let styleTag = timelineWrapper.querySelector(
					'style.sps-dynamic-styles'
				);
				if (!styleTag) {
					styleTag = document.createElement('style');
					styleTag.className = 'sps-dynamic-styles';
					timelineWrapper.insertBefore(
						styleTag,
						timelineWrapper.firstChild
					);
				}

				if (timelineContainer) {
					allTimelinesData.push({
						wrapper: timelineWrapper,
						blockId,
						postCards,
						indicatorArrows,
						timelineContainer,
						styleTag,
					});
				}
			});

		// 2. Skip if no timelines are found
		if (allTimelinesData.length === 0) {
			return;
		}

		// 3. Create a single, efficient scroll handler for all timelines
		const handleTimelineScrolls = () => {
			const scrollY = window.scrollY;
			const pageHeight = Math.max(document.body.offsetHeight);

			allTimelinesData.forEach((data) => {
				const wrapperRect = data.wrapper.getBoundingClientRect();

				// Only process timelines currently visible in the viewport (with a buffer)
				if (
					wrapperRect.bottom >= 0 &&
					wrapperRect.top <= window.innerHeight
				) {
					const scrollPosition = scrollY + 200;

					// Indicator activation logic
					const indicatorActive = (elements) => {
						elements.forEach((el) => {
							const elTop =
								el.getBoundingClientRect().top + scrollY;
							if (
								scrollY + 505 > elTop ||
								scrollPosition + 700 >= pageHeight
							) {
								el.classList.add('active');
							} else {
								el.classList.remove('active');
							}
						});
					};
					indicatorActive(data.postCards);
					indicatorActive(data.indicatorArrows);

					// Timeline line height calculation logic
					const timelineRect =
						data.timelineContainer.getBoundingClientRect();
					const timelineTop = timelineRect.top + scrollY;
					let height = 320;
					let heightUnit = 'px';

					if (
						timelineRect.bottom - 518 < 0 ||
						scrollPosition + 700 >= pageHeight
					) {
						height = 100;
						heightUnit = '%';
					} else if (
						scrollPosition > timelineTop &&
						timelineRect.bottom - 518 > 0
					) {
						height = scrollPosition + 320 - timelineTop;
					}
					// Update the dedicated style tag's content, which is more performant than creating new tags.
					const styleContent = `#${data.blockId} .sp-smart-post-timeline-container::after { height: ${height}${heightUnit} !important; }`;
					if (data.styleTag.textContent !== styleContent) {
						data.styleTag.textContent = styleContent;
					}
				}
			});
		};

		// 4. Add the single throttled listener
		window.addEventListener('scroll', throttle(handleTimelineScrolls));
	};

	// Initialize the timeline scroll animations.
	initTimelineScroll();
	function updatePaginationData(section, data) {
		if (!section || !data) {
			return;
		}
		// Update dataset attributes.
		section.dataset.pages = data.total_pages;
		section.dataset.current = data.current_page;
		if (section?.dataset.pages < 2) {
			section.style.display = 'none';
		} else {
			section.style.display = 'flex';
		}
		if (section?.dataset.pages < 2) {
			return false;
		}
		updatePaginationUI(section);
		createPaginationSection(section);
	}
	const createPaginationSection = (section) => {
		const totalPages = parseInt(section.dataset.pages, 10);
		const currentPage = parseInt(section.dataset.current, 10);
		const paginationtype = section?.dataset.paginationtype;
		if (paginationtype == 'pagination') {
			if (!totalPages || totalPages < 2) {
				return;
			}

			const paginationContainer = section.querySelector(
				'.sp-smart-post-pagination-buttons'
			);
			if (!paginationContainer) {
				return;
			}

			paginationContainer.innerHTML = ''; // Clear existing buttons

			// Previous Button
			const prevBtn = document.createElement('a');
			prevBtn.href = '#';
			prevBtn.className = 'page-numbers prev';
			if (currentPage === 1) {
				prevBtn.classList.add('disabled');
			}
			prevBtn.innerHTML = `<i class="sp-icon-left-open"></i> Previous`;
			paginationContainer.appendChild(prevBtn);

			// Number Buttons
			for (let i = 1; i <= totalPages; i++) {
				const pageBtn = document.createElement('a');
				pageBtn.href = '#';
				pageBtn.className = 'page-numbers';
				pageBtn.dataset.page = i;
				pageBtn.textContent = i;

				if (i === currentPage) {
					pageBtn.classList.add('current');
				}

				paginationContainer.appendChild(pageBtn);
			}

			// Next Button
			const nextBtn = document.createElement('a');
			nextBtn.href = '#';
			nextBtn.className = 'page-numbers next';
			if (currentPage === totalPages) {
				nextBtn.classList.add('disabled');
			}
			nextBtn.innerHTML = `Next <i class="sp-icon-right-open"></i>`;
			paginationContainer.appendChild(nextBtn);
		}
	};

	const updatePaginationUI = (section) => {
		const current = parseInt(section.dataset.current, 10);
		const total = parseInt(section.dataset.pages, 10);
		const paginationtype = section?.dataset.paginationtype;

		section.querySelectorAll('.page-numbers[data-page]').forEach((link) => {
			const page = parseInt(link.dataset.page, 10);
			link.classList.toggle('current', page === current);
		});
		const prev = section.querySelector('.page-numbers.prev');
		const next = section.querySelector('.page-numbers.next');
		const loadMoreWrapper = section.querySelector(
			'.sp-smart-post-load-more-button'
		);
		if (prev) {
			prev.classList.toggle('disabled', current <= 1);
		}
		if (next) {
			next.classList.toggle('disabled', current >= total);
		}
		// For nav-arrow buttons.
		const [prevNav, nextNav] = section.querySelectorAll(
			'.sp-smart-post-grid-nav-arrow-btn'
		);
		if (prevNav && nextNav) {
			prevNav.style.pointerEvents = current <= 1 ? 'none' : 'auto';
			prevNav.style.opacity = current <= 1 ? '0.5' : '1';
			nextNav.style.pointerEvents = current >= total ? 'none' : 'auto';
			nextNav.style.opacity = current >= total ? '0.5' : '1';
		}
		if (loadMoreWrapper) {
			if (current >= total) {
				const loadMoreWrapperBtn = loadMoreWrapper.querySelector('a');
				if (loadMoreWrapperBtn) {
					loadMoreWrapperBtn.style.display = 'none';
				}
			} else {
				loadMoreWrapper.style.display = 'block';
			}
		}
	};
	function hasFilterCounts(count_data) {
		if (!count_data || typeof count_data !== 'object') {
			return false;
		}

		return Object.entries(count_data).some(([key, value]) => {
			// Skip pagination
			if (key === 'pagination') {
				return false;
			}
			// Check if it's a non-empty array
			return Array.isArray(value) && value.length > 0;
		});
	}
	function getBlockParams() {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);
		const blockParams = {};
		for (const [key, value] of params.entries()) {
			if (
				key === 'block' ||
				key.startsWith('tx_') ||
				key.startsWith('sps_')
			) {
				blockParams[key] = value;
			}
		}
		return blockParams;
	}

	function updateSelectByParams(params, blockParent) {
		// Loop through each param and try to update the matching <select>
		for (const key in params) {
			if ('sps_page' == key) {
				const value = params[key];
				const pagination_section = blockParent.querySelector(
					'.sp-smart-post-pagination-section'
				);
				pagination_section.dataset.current = value;
			} else if ('sps_search' == key) {
				const search_input = blockParent.querySelector(
					`input[name="${key}"]`
				);
				const value = params[key];
				search_input.value = value;
			} else {
				const select = blockParent.querySelector(
					`select[name="${key}"]`
				);
				if (select) {
					const value = params[key];
					// Set value if option exists.
					const option = select.querySelector(
						`option[value="${value}"]`
					);
					if (option) {
						option.disabled = false;
						option.selected = true;
						select.value = value;
						// Optional: trigger change event
						// select.dispatchEvent(new Event('change'));
					}
				}
			}
		}
	}

	/**
	 * Groups slides into swiper-slide wrappers when using specific effects
	 * @param {HTMLElement} containerEl                                         - The swiper container element
	 * @param {Object}      sps_swiper_option                                   - Swiper configuration options
	 * @param {string[]}    [effectsRequiringWrapping=['fade', 'cube', 'flip']] - Effects that need slide wrapping
	 */
	function wrapSlidesForEffect(
		containerEl,
		sps_swiper_option,
		effectsRequiringWrapping = ['fade', 'cube', 'flip']
	) {
		// Check if we need to wrap slides
		if (
			sps_swiper_option?.effect &&
			effectsRequiringWrapping.includes(sps_swiper_option.effect)
		) {
			// Get valid slidesPerView (minimum 1)
			const slidesPerView = Math.max(
				1,
				parseInt(sps_swiper_option?.slidesPerView) || 1
			);
			// Only proceed if we need multiple slides per view
			if (slidesPerView > 1) {
				const swiperWrapper =
					containerEl.querySelector('.swiper-wrapper');
				const loopItems =
					containerEl.querySelectorAll('.sp-slide-item');
				loopItems.forEach((item) => {
					item.classList.remove('swiper-slide');
				});
				if (swiperWrapper && loopItems.length > 0) {
					// Create document fragment for better performance
					const fragment = document.createDocumentFragment();
					// Group slides into chunks
					for (let i = 0; i < loopItems.length; i += slidesPerView) {
						const slideWrapper = document.createElement('div');
						slideWrapper.className = 'swiper-slide';

						// Add slides to this group
						const endIndex = Math.min(
							i + slidesPerView,
							loopItems.length
						);
						for (let j = i; j < endIndex; j++) {
							slideWrapper.appendChild(
								loopItems[j].cloneNode(true)
							);
						}
						fragment.appendChild(slideWrapper);
					}

					// Clear existing content and add new grouped slides
					swiperWrapper.innerHTML = '';
					swiperWrapper.appendChild(fragment);
				}
			}
		}
	}
	const selected_params = getBlockParams();
	// Loop over each Smart Post block container.

	//.................................. js error-----------------
	document.querySelectorAll('.sp-smart-post-wrapper').forEach((container) => {
		/**
		 * Preloader.
		 * Fades out preloader.
		 */
		const preloader = container?.querySelector(
			'.sp-smart-post-show-pro-pre-query .sp-smart-post-preloader'
		);
		if (preloader) {
			// Wait 2.5 seconds before showing fallback.
			setTimeout(() => {
				preloader.classList.remove('sp-d-block');
				preloader.classList.add('sp-d-hidden');
				container.classList.add('sp-smart-preloader-removed');
			}, 500);
		}
		// Social Links Copy notification.
		const socialCopyLinks = container.querySelectorAll(
			'.sp-copy-url-area .sp-smart-post-copy-btn'
		);
		if (socialCopyLinks.length > 0) {
			let classText;
			socialCopyLinks.forEach((socialCopyLink) => {
				socialCopyLink.addEventListener('click', (e) => {
					const copyText = socialCopyLink.querySelector(
						'.sp-post-url-copy-popup'
					);
					// e.preventDefault();
					copyText.classList.remove('sp-d-hidden');
					copyText.classList.add('sp-d-block');
					clearTimeout(classText);
					classText = setTimeout(() => {
						copyText.classList.remove('sp-d-block');
						copyText.classList.add('sp-d-hidden');
					}, 2000);
				});
			});
		}
		if (
			container?.classList.contains('sp-smart-post-thumbnail-slider') ||
			container?.classList.contains(
				'sp-smart-post-thumbnail-slider-two'
			) ||
			container?.classList.contains('sp-smart-thumbnail-slider-two')
		) {
			return false;
		}

		// Closest parent block with specific block class.
		const blockParent = container.closest(
			'.wp-block-sp-smart-post-show-smart-post-parent'
		);

		const builderElement = container.closest(
			'.sp-smart-post-builder-wrap'
		);

		const builderTemplateId = builderElement?.dataset?.buildertemplateid || "";

		const blockId = container.dataset.blockid;
		const page_id = builderTemplateId ? builderTemplateId : container.dataset.pageid || "";
		const block_location = container.dataset.location || '';
		if (blockParent && selected_params?.block == blockId) {
			updateSelectByParams(selected_params, blockParent);
		}
		/**
		 * SECTION 1: INIT SWIPER OR MARQUEE SLIDERS
		 */
		const containerEl = container.querySelector(
			'.layout-standard, .layout-center, .swiper-container, .sp_marquee-container'
		);

		let sps_swiper = null;
		let sps_swiper_option = {};
		let sps_marquee = null;
		let sps_marquee_option = {};

		// Initialize Swiper slider if present
		if (containerEl?.classList.contains('swiper-container')) {
			const options = safeJSONParse(
				containerEl.getAttribute('data-swiper-options')
			);

			if (!Object.keys(options).length) {
				return;
			}
			const paginationOptions = options?.pagination;
			const paginationClassName = paginationOptions?.el;
			const isNumberPagination = !!options.pagination?.paginationType;
			sps_swiper_option = {
				...options,
				pagination: isNumberPagination
					? paginationDotNumber(paginationClassName)
					: paginationOptions,
			};
			// if (sps_swiper_option.effect && ['fade', 'cube', 'flip'].includes(sps_swiper_option?.effect)) {
			// 	// Get the slidesPerView value (default to 1 if invalid)
			// 	let slidesPerView = sps_swiper_option?.slidesPerView > 1 ? sps_swiper_option?.slidesPerView : 1;
			// 	let swiperWrapper = containerEl.querySelector('.swiper-wrapper')
			// 	if (slidesPerView > 1) {
			// 		const loopItems = containerEl.querySelectorAll('.sp-slide-item');
			// 		if (loopItems) {
			// 			loopItems.forEach((item) => {
			// 				item.classList.remove('swiper-slide')
			// 			});
			// 			// Create groups of `slidesPerView` items
			// 			for (let i = 0; i < loopItems.length; i += slidesPerView) {
			// 				// Create a new wrapper slide
			// 				const slideWrapper = document.createElement('div');
			// 				slideWrapper.className = 'swiper-slide';

			// 				// Take a slice of `slidesPerView` items and move them into the wrapper
			// 				const itemsToWrap = Array.from(loopItems).slice(i, i + slidesPerView);
			// 				itemsToWrap.forEach(item => {
			// 					slideWrapper.appendChild(item);
			// 				});
			// 				// Insert the wrapper into the container
			// 				swiperWrapper.appendChild(slideWrapper);
			// 			}
			// 		}
			// 	}
			// }
			if (
				sps_swiper_option.effect &&
				['fade', 'cube', 'flip'].includes(sps_swiper_option?.effect)
			) {
				wrapSlidesForEffect(containerEl, sps_swiper_option);
			}
			sps_swiper = new PCPSwiper(containerEl, sps_swiper_option);
		}

		// Initialize Marquee slider if present
		if (containerEl?.classList.contains('sp_marquee-container')) {
			sps_marquee_option = safeJSONParse(
				containerEl.getAttribute('data-options')
			);
			if (!Object.keys(sps_marquee_option).length) {
				return;
			}
			sps_marquee_option = {
				speed: sps_marquee_option.speed || 500,
				direction:
					sps_marquee_option.direction === 'left_to_right'
						? 'right'
						: 'left',
				pauseOnHover: sps_marquee_option.pauseOnHover !== false,
				slidesPerView: sps_marquee_option.slidesPerView || 1,
				slidesPerViewMobile:
					sps_marquee_option.slidesPerViewMobile || 1,
				slidesPerViewTablet:
					sps_marquee_option.slidesPerViewTablet || 1,
				spaceBetween: sps_marquee_option.spaceBetween || 0,
				spaceBetweenMobile: sps_marquee_option.spaceBetweenMobile || 0,
				spaceBetweenTablet: sps_marquee_option.spaceBetweenTablet || 0,
			};
			sps_marquee = new SP_Marquee(containerEl, sps_marquee_option);
		}

		/**
		 * SECTION 2: FILTER HANDLING
		 */
		const filter_fields =
			blockParent?.querySelectorAll(
				'.sp-smart-post-live-filter-parent select[name], .sp-smart-post-live-filter-parent input[name]'
			) || [];

		const filter_relation =
			blockParent?.querySelector('.sp-smart-post-live-filter-parent')
				?.dataset.relation || 'and';

		// Fetch filtered content.
		const loadQueryData = (state) => {
			state.block_location = block_location;
			return fetch(sp_smart_post_block_localize.restUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(state),
			}).then((res) => res.json());
		};
		// URL update utility.
		function updateURLQuery(customParams) {
			const baseUrl = new URL(
				sp_smart_post_block_localize.permalink_structure ||
					window.location.href
			);
			const customParamsFinal = new URLSearchParams();

			if (blockId && Object.values(customParams).some((val) => val)) {
				customParamsFinal.append('block', blockId);
			}

			Object.entries(customParams).forEach(([key, value]) => {
				if (value) {
					customParamsFinal.append(key, value);
				}
			});

			const joinChar = baseUrl.href.includes('?') ? '&' : '?';
			const finalUrl =
				baseUrl.href +
				(customParamsFinal.toString()
					? joinChar + customParamsFinal.toString()
					: '');
			window.history.replaceState({}, '', finalUrl);
		}

		// Build filter state object.
		function getFilterState(
			event,
			update_url = true,
			pagination_section = null
		) {
			const state = {};
			const currentField = event?.target || null;
			pagination_section =
				pagination_section ??
				currentField?.closest('.sp-smart-post-pagination-section');
			if (
				pagination_section &&
				'pagination' == pagination_section?.dataset.paginationtype &&
				currentField.tagName === 'A'
			) {
				const currentPage = parseInt(
					pagination_section.dataset.current,
					10
				);
				newPage = 1;
				if (currentField.classList.contains('prev')) {
					newPage = currentPage - 1;
				} else if (currentField.classList.contains('next')) {
					newPage = currentPage + 1;
				} else {
					newPage = parseInt(currentField.dataset.page, 10);
				}
				if (newPage > 1) {
					state.sps_page = newPage || 1;
				}
			}
			filter_fields.forEach((field) => {
				// 	if (pagination_section && field.tagName === 'DIV') {
				// 		if (field.dataset.current > 1) {
				// 			state['page'] = field.dataset.current || 1;
				// 		}
				// 	} else {
				let key = field.name;
				const value = field.value.trim();
				if (key === 'blog_search') {
					key = 'search';
				}
				state[key] = value;
				//	}
			});

			if (update_url) {
				updateURLQuery(state);
			}
			if (Object.keys(state).length > 0) {
				state.block = blockId;
				state.page_id = page_id;
				state.relation = filter_relation;
			}
			return state;
		}

		// Initial count load
		let currentState = getFilterState(null, false);
		function debounce(fn, delay) {
			let timer;
			return function (...args) {
				clearTimeout(timer);
				timer = setTimeout(() => fn.apply(this, args), delay);
			};
		}
		const pagination_section = container.querySelector(
			'.sp-smart-post-pagination-section'
		);
		// Load More
		const loadMoreWrapper = pagination_section?.querySelector(
			'.sp-smart-post-load-more-button'
		);
		// Listen to filter field changes
		if (page_id && filter_fields.length > 0) {
			currentState.html = false;
			loadQueryData(currentState)
				.then((data) => {
					if (!data.success) {
						return;
					}
					const termCounts = data.count_data;
					if (termCounts && hasFilterCounts(termCounts)) {
						updateFilterCounts(termCounts, false, blockParent);
						updateAllSmartPostFilterCounts(blockParent);
					} else if (Object.keys(currentState).length > 0) {
						blockParent
							.querySelectorAll(
								'.sp-smart-filter-area select option'
							)
							.forEach((option) => {
								const slug = option.value;
								if (slug) {
									option.textContent = `${capitalize(
										slug
									)} (0)`;
									option.disabled = true;
								}
							});
					} else {
						resetFilterCounts(blockParent);
					}
					initTimelineScroll();
				})
				.catch();
			const eventHandler = (e) => {
				currentState = getFilterState(e);
				if (preloader) {
					// Wait 2.5 seconds before showing fallback
					preloader.classList.add('sp-d-block');
					container.classList.remove('sp-smart-preloader-removed');
				}
				let itemsEl = null;
				loadQueryData(currentState).then((data) => {
					if (!data.success) {
						return;
					}
					if (pagination_section) {
						pagination_section.dataset.current = 1;
					}
					if (
						sps_marquee &&
						containerEl.classList.contains('sp_marquee-container')
					) {
						container.querySelector(
							'.sp_marquee-content'
						).innerHTML = data.html;
						sps_marquee = new SP_Marquee(
							containerEl,
							sps_marquee_option
						);
					} else if (sps_swiper) {
						// if (sps_swiper.slides && sps_swiper.slides.length > 0) {
						// 	//	sps_swiper.removeAllSlides();
						// }
						sps_swiper.destroy(true);
						container.querySelector('.swiper-wrapper').innerHTML =
							data.html;
						if (
							sps_swiper_option.effect &&
							['fade', 'cube', 'flip'].includes(
								sps_swiper_option?.effect
							)
						) {
							wrapSlidesForEffect(containerEl, sps_swiper_option);
						}
						sps_swiper = new PCPSwiper(
							containerEl,
							sps_swiper_option
						);
					} else {
						const items = container.querySelector(
							'.sp-smart-post-items'
						);
						items.innerHTML = data.html;
						itemsEl = items;
						// container.querySelector(
						// 	'.sp-smart-post-items'
						// ).style.opacity = '1';
						// 🎯 Staggered Animation
						if (itemsEl) {
							const childItems = itemsEl.querySelectorAll(
								'.sp-smart-post-card, .swiper-slide'
							);
							childItems.forEach((el, index) => {
								el.style.opacity = 0;
								el.style.animation = `fadeIn 0.7s ease-in-out forwards`;
								el.style.animationDelay = `${index * 0.1}s`; // 80ms stagger
							});
						}
					}
					const termCounts = data.count_data;
					if (termCounts && hasFilterCounts(termCounts)) {
						updateFilterCounts(
							termCounts,
							pagination_section,
							blockParent
						);
						updateAllSmartPostFilterCounts(blockParent);
					} else if (Object.keys(currentState).length > 0) {
						blockParent
							.querySelectorAll(
								'.sp-smart-post-taxonomy-filter select option'
							)
							.forEach((option) => {
								const slug = option.value;
								if (slug) {
									option.textContent = `${capitalize(
										slug
									)} (0)`;
									option.disabled = true;
								}
							});
						Object.entries(termCounts).forEach(
							([taxonomy, terms]) => {
								// Handle pagination update
								if (
									taxonomy === 'pagination' &&
									pagination_section
								) {
									updatePaginationData(
										pagination_section,
										terms
									);
								}
							}
						);
						updateAllSmartPostFilterCounts(blockParent);
					} else {
						resetFilterCounts(blockParent);
					}
					socialLinkCopy();
					modal();
					initTimelineScroll();
					initSmartPostFeatures();
					if (preloader) {
						// Wait 2.5 seconds before showing fallback
						setTimeout(() => {
							preloader.classList.remove('sp-d-block');
							preloader.classList.add('sp-d-hidden');
							container.classList.add(
								'sp-smart-preloader-removed'
							);
						}, 200);
					}
					if (loadMoreWrapper) {
						const no_more_button =
							loadMoreWrapper.querySelector('.sps-no-more-post');
						if (no_more_button) {
							const loadMoreWrapperBTN =
								loadMoreWrapper.querySelector('a');
							if (loadMoreWrapperBTN) {
								loadMoreWrapperBTN.style.display = 'flex';
							}
							no_more_button.style.display = 'none';
						}
					}
				});
			};
			filter_fields.forEach((field) => {
				const isInput = field.tagName === 'INPUT';
				const eventName = isInput ? 'input' : 'change';

				// Add event listener.
				field.addEventListener(
					eventName,
					isInput ? debounce(eventHandler, 400) : eventHandler
				);
			});
		}

		/**
		 * SECTION 3: PAGINATION HANDLING
		 */

		if (!pagination_section) {
			return;
		}
		let current = parseInt(pagination_section.dataset.current, 10);
		let total = parseInt(pagination_section.dataset.pages, 10);
		const endMessage = pagination_section.dataset.endmessage ?? '';
		const pagination_type = pagination_section.dataset.paginationtype;
		let contents = container.querySelector(
			pagination_type === 'load-more'
				? '.sp-smart-post-dynamic-grid-contents,.sp-smart-post-grid-five-static-contents,.sp-smart-post-grid-six-dynamic-contents,.sp-smart-post-timeline-container,.sp-smart-post-small-items,.sp-smart-post-list-one-container'
				: '.sp-smart-post-items,.sp-smart-post-list-item'
		);

		const updateCurrent = (newPage) => {
			pagination_section.dataset.current = newPage;
			current = newPage;
		};
		const appendHtml = (html) => {
			contents.insertAdjacentHTML('beforeend', html);
			return contents;
		};

		const replaceHtml = (html) => {
			contents.innerHTML = html;
			return contents;
		};

		const loadPage = (page, mode = 'replace', currentState = {}) => {
			total = parseInt(pagination_section.dataset.pages, 10);
			if (page < 1 || page > total || page === current) {
				return;
			}
			contents = container.querySelector(
				pagination_type === 'load-more'
					? '.sp-smart-post-dynamic-grid-contents,.sp-smart-post-grid-five-static-contents,.sp-smart-post-grid-six-dynamic-contents,.sp-smart-post-timeline-container,.sp-smart-post-small-items,.sp-smart-post-list-one-container'
					: '.sp-smart-post-items,.sp-smart-post-list-item'
			);
			currentState = {
				...currentState,
				sps_page: page,
				pagination_type,
				block: blockId,
				page_id,
			};
			const infinitePreloader = pagination_section.querySelector(
				'.sp-smart-post-show-preloading'
			);
			const buttonPreloader = pagination_section.querySelector(
				'.sp-smart-post-show-preloader'
			);

			// Show the correct preloader
			if (isInfiniteScroll) {
				if (infinitePreloader) {
					infinitePreloader.style.display = 'block';
				}
			} else {
				if (buttonPreloader) {
					// buttonPreloader.style.display = 'block';
					buttonPreloader?.classList?.remove('sp-d-hidden');
				}
				buttonPreloader?.classList?.add('sp-d-block');
			}
			loadQueryData(currentState)
				.then((data) => {
					if (!data.success) {
						return;
					}
					if (mode === 'append') {
						// Get items count before append.
						const existingCount = contents.querySelectorAll(
							'.sp-smart-post-card, .swiper-slide'
						).length;
						// Append new HTML.
						appendHtml(data.html);
						// Get all items after append.
						const allItems = contents.querySelectorAll(
							'.sp-smart-post-card, .swiper-slide'
						);
						// Animate only the new ones.
						allItems.forEach((el, index) => {
							if (index >= existingCount) {
								el.style.opacity = 0;
								el.style.animation = `fadeIn 0.7s ease-in-out forwards`;
								el.style.animationDelay = `${
									(index - existingCount) * 0.1
								}s`;
							}
						});
					} else {
						// Replace mode — animate all.
						replaceHtml(data.html);
						const childItems = contents.querySelectorAll(
							'.sp-smart-post-card, .swiper-slide'
						);
						childItems.forEach((el, index) => {
							el.style.opacity = 0;
							el.style.animation = `fadeIn 0.7s ease-in-out forwards`;
							el.style.animationDelay = `${index * 0.1}s`;
						});
					}
					updateCurrent(page);
					updatePaginationUI(pagination_section);
					socialLinkCopy();
					initSmartPostFeatures();
					modal();
					initTimelineScroll();
					loadMoreWrapper?.classList.remove('sps_disabled');
					if (isInfiniteScroll) {
						if (infinitePreloader) {
							infinitePreloader.style.display = 'none';
						}
					} else {
						if (buttonPreloader) {
							// buttonPreloader.style.display = 'none';
							buttonPreloader?.classList?.remove('sp-d-block');
						}
						buttonPreloader?.classList?.add('sp-d-hidden');
					}
					if (page >= total && loadMoreWrapper) {
						loadMoreWrapper.insertAdjacentHTML(
							'beforeend',
							`<span class="sps-no-more-post">${endMessage}</span>`
						);
						const loadMoreWrapperBtn =
							loadMoreWrapper.querySelector('a');
						loadMoreWrapperBtn.style.display = 'none';
					}
				})
				.catch((err) => console.log('Pagination Error:', err));
		};

		const loadMoreBtn = loadMoreWrapper?.querySelector('a');
		const isInfiniteScroll = !!loadMoreWrapper?.querySelector(
			'.sp-smart-post-show-preloading'
		);

		if (isInfiniteScroll && 'IntersectionObserver' in window) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						current = parseInt(
							pagination_section.dataset.current,
							10
						);
						if (current < total) {
							currentState = getFilterState(
								null,
								true,
								pagination_section
							);
							// Show preloader
							const preloader = loadMoreWrapper.querySelector(
								'.sp-smart-post-show-preloading'
							);
							if (preloader) {
								preloader.style.display = 'block';
							}
							loadPage(current + 1, 'append', currentState);
						}
					}
				},
				{ rootMargin: '100px' }
			);
			if (loadMoreWrapper) {
				observer.observe(loadMoreWrapper);
			}
		} else if (loadMoreBtn) {
			const load_more_preloader = loadMoreWrapper?.querySelector(
				'.sp-smart-post-show-preloader'
			);
			loadMoreBtn.addEventListener('click', (e) => {
				e.preventDefault();
				// load_more_preloader.style.display = 'block';
				load_more_preloader.classList.remove('sp-d-hidden');
				load_more_preloader.classList.add('sp-d-block');
				// Disable the button
				loadMoreWrapper.classList.add('sps_disabled');

				//	loadMoreBtn.textContent = 'Loading...';
				current = parseInt(pagination_section.dataset.current, 10);

				currentState = getFilterState(e, false);

				loadPage(current + 1, 'append', currentState);
			});
		}
		const paginationContainer = pagination_section.querySelector(
			'.sp-smart-post-pagination-buttons'
		);
		paginationContainer?.addEventListener('click', (e) => {
			const btn = e.target.closest('.page-numbers');
			if (
				!btn ||
				btn.classList.contains('disabled') ||
				btn.classList.contains('current')
			) {
				return;
			}
			e.preventDefault();
			const currentPage = parseInt(
				pagination_section.dataset.current,
				10
			);
			let newPage = null;

			if (btn.classList.contains('prev')) {
				newPage = currentPage - 1;
			} else if (btn.classList.contains('next')) {
				newPage = currentPage + 1;
			} else {
				newPage = parseInt(btn.dataset.page, 10);
			}

			if (isNaN(newPage) || newPage === currentPage) {
				return;
			}
			// Get current filter state (if you have one).

			const currentState = getFilterState(e);
			// Load the new page.

			loadPage(newPage, 'replace', currentState);
			// Optional: update the data-current attribute.

			pagination_section.dataset.current = newPage;
		});
		// Grid Nav Arrows (custom arrow buttons)
		const navArrows = pagination_section.querySelectorAll(
			'.sp-smart-post-grid-nav-arrow-btn'
		);
		if (navArrows.length === 2) {
			const [prevArrow, nextArrow] = navArrows;
			prevArrow.addEventListener('click', (e) => {
				e.preventDefault();
				currentState = getFilterState(e);
				loadPage(current - 1, 'replace', currentState);
			});
			nextArrow.addEventListener('click', (e) => {
				e.preventDefault();
				currentState = getFilterState(e);
				current = parseInt(pagination_section.dataset.current, 10);
				loadPage(current + 1, 'replace', currentState);
			});
		}

		updatePaginationUI(pagination_section);
	});
	//.................................. js error-----------------

	/**
	 * Capitalizes the first letter of a string.
	 *
	 * @param {string} str - The string to capitalize.
	 * @return {string} - Capitalized string.
	 */
	function capitalize(str) {
		if (!str) {
			return '';
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Updates the filter <select> options with post counts from the response.
	 *
	 * @param {Object}           termCounts         - Term count data (taxonomy → terms[]).
	 * @param {HTMLElement|null} pagination_section - Pagination DOM section (if exists).
	 * @param {HTMLElement}      blockParent        - The block wrapper containing filters.
	 */
	function updateFilterCounts(termCounts, pagination_section, blockParent) {
		if (!termCounts || !blockParent) {
			return;
		}
		const show_count = true;
		Object.entries(termCounts).forEach(([taxonomy, terms]) => {
			// Handle pagination update
			if (taxonomy === 'pagination' && pagination_section) {
				updatePaginationData(pagination_section, terms);
				return;
			}

			// Find the filter select dropdown for the taxonomy
			const select = blockParent.querySelector(`#filter-${taxonomy}`);
			if (!select) {
				return;
			}

			Array.from(select.options).forEach((option) => {
				const slug = option.value;
				if (!slug || !terms) {
					return;
				}
				const isSelected = option.selected;
				const defaultLabel = option.getAttribute('data-label') || slug;
				const term = terms.find((t) => t.slug == slug);
				if (term) {
					const count = show_count ? `(${term.count})` : '';
					// Term exists: show its updated count.
					option.textContent = `${capitalize(defaultLabel)} ${count}`;
					option.disabled = false;
				} else {
					// Term not in result: disable unless selected.
					const count = show_count ? `(0)` : '';
					option.textContent = `${capitalize(defaultLabel)} (0)`;
					option.disabled = !isSelected;
				}
			});
		});
	}

	/**
	 * Resets all filter dropdowns to their default counts (used when no filters are active).
	 *
	 * @param {HTMLElement} blockParent - The block wrapper containing filters.
	 */
	function resetFilterCounts(blockParent) {
		if (!blockParent) {
			return;
		}

		blockParent
			.querySelectorAll('.sp-smart-filter-area select option')
			.forEach((option) => {
				const slug = option.value;
				if (!slug) {
					return;
				} // Skip the "All" or blank option

				const defaultCount = option.getAttribute('data-default-count');
				if (defaultCount !== null) {
					option.textContent = `${capitalize(
						option.getAttribute('data-label') || slug
					)} (${defaultCount})`;
					option.disabled = false;
				}
			});
	}
	//-------------------------------------

	const filterWrappers = document.querySelectorAll(
		".sp-smart-post-taxonomy-filter, .sp-smart-post-sort-filter"
	);

	// Common handler function for dropdown items
	function handleDropdownClick(
		e,
		dropdown,
		oppositeDropdown,
		spanLabel,
		select
	) {
		const item = e.target.closest("a");
		if (!item || item.classList.contains("disabled")) return;

		e.preventDefault();

		// Remove active class from opposite dropdown if exists
		if (oppositeDropdown) {
			const links = oppositeDropdown.querySelectorAll(
				".sps-live-filter-nav-link"
			);
			links.forEach((link) => link.classList.remove("active"));
		}

		// Remove active from all items in current dropdown
		dropdown
			.querySelectorAll("a")
			.forEach((el) => el.classList.remove("active"));

		// Add active to clicked item
		item.classList.add("active");

		// Extract values
		const value = item.getAttribute("data-value");
		const label = item.getAttribute("data-label");
		const countMatch = item.textContent.match(/\((\d+)\)/);
		const count = countMatch ? countMatch[1] : "";

		// Update button label
		if (spanLabel) {
			spanLabel.innerHTML = `${label}${count ? ` (${count})` : ""}`;
		}

		// Update select and trigger change
		if (select) {
			select.value = value;
			select.dispatchEvent(new Event("change"));
		}

		// Close dropdown
		dropdown.classList.remove("open");
	}

	// Setup function for each filter wrapper
	function setupFilterWrapper(wrapper) {
		const btn = wrapper.querySelector(".sp-smart-post-live-filter-btn");
		const dropdown = wrapper.querySelector(
			".sp-smart-post-live-filter-dropdown, .sp-smart-post-live-filter-button"
		);
		const secondDropdown = wrapper.querySelector(
			".sps-live-filter-dropdown-menu"
		);
		const spanLabel = btn?.querySelector("span");

		// Find the closest hidden select
		const select = wrapper
			.closest(".sp-smart-post-live-filter-wrapper")
			?.querySelector("select");

		if (!select) {
			return;
		}

		// Setup dropdown toggle
		if (btn && dropdown) {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				dropdown.classList.toggle("open");
			});
		}

		// Setup dropdown click handlers
		if (dropdown) {
			dropdown.addEventListener("click", (e) =>
				handleDropdownClick(
					e,
					dropdown,
					secondDropdown,
					spanLabel,
					select
				)
			);
		}

		if (secondDropdown) {
			secondDropdown.addEventListener("click", (e) =>
				handleDropdownClick(
					e,
					secondDropdown,
					dropdown,
					spanLabel,
					select
				)
			);
		}
	}

	// Initialize all filter wrappers
	filterWrappers.forEach(setupFilterWrapper);

	// Single event listener for closing dropdowns on outside click
	document.addEventListener("click", (e) => {
		document
			.querySelectorAll(".sp-smart-post-live-filter-dropdown.open")
			.forEach((dropdown) => {
				const btn = dropdown.previousElementSibling;
				if (
					!dropdown.contains(e.target) &&
					(!btn || !btn.contains(e.target))
				) {
					dropdown.classList.remove("open");
				}
			});
	});
	//---------------------------------------
	/**
	 * Utility: Wait until all images inside an element are loaded before running a callback.
	 *
	 * @param {HTMLElement} el       - The container element to monitor.
	 * @param {Function}    callback - Function to call once all images are loaded.
	 */
	const imagesLoaded = (el, callback) => {
		const images = el.querySelectorAll("img");
		let loadedCount = 0;

		// No images? Run callback immediately
		if (images.length === 0) {
			return callback();
		}

		images.forEach((img) => {
			if (img.complete) {
				loadedCount++;
				if (loadedCount === images.length) {
					callback();
				}
			} else {
				img.onload = img.onerror = () => {
					loadedCount++;
					if (loadedCount === images.length) {
						callback();
					}
				};
			}
		});
	};

	/**
	 * Utility: Get the unique block ID from an element's closest wrapper.
	 *
	 * @param {HTMLElement} child - A child element inside the block.
	 * @return {string|null} - Block ID or null.
	 */
	const getBlockIdFromChild = (child) => {
		const wrapper = child.closest(".sp-smart-post-wrapper");
		return wrapper ? wrapper.id : null;
	};

	/**
	 * Equal height logic for carousel items (Swiper cards).
	 */
	const carouselContainers = document.querySelectorAll(
		'.sp-smart-post-swiper.sp-equal-height-wrapper'
	);

	carouselContainers.forEach((carousel) => {
		const containerId = getBlockIdFromChild(carousel);
		const equalHeightEnabled = carousel.dataset.equalHeight == '1';
		let container = document.getElementById(containerId);

		// Check inside iframe (used in editors like block preview)
		if (!container) {
			const iframe = document.querySelector('iframe');
			const iframeDoc = iframe?.contentWindow?.document;
			container = iframeDoc?.getElementById(containerId) || null;
		}

		if (container) {
			const cards = container.querySelectorAll('.sp-smart-post-card');

			const applyEqualHeight = () => {
				if (!cards.length) {
					return;
				}

				if (equalHeightEnabled) {
					// Calculate max height
					let maxHeight = 0;
					cards.forEach((card) => {
						card.style.height = 'auto'; // reset first
						const height = card.offsetHeight;
						if (height > maxHeight) {
							maxHeight = height;
						}
					});
					// Apply max height to all cards
					cards.forEach((card) => {
						card.style.height = `${maxHeight}px`;
					});
				} else {
					// Reset to auto
					cards.forEach((card) => {
						card.style.height = 'auto';
					});
				}
			};
			// Apply after all images load
			imagesLoaded(container, applyEqualHeight);
		}
	});
	// Update selection count field.
	update_selection_field_count();

	const containers = document.querySelectorAll('.sps-live-filter-layout-two');

	containers.forEach((container) => {
		const style = container.dataset.style;
		let currentPage = parseInt(container.dataset.currentPage);
		let isDropdownOpen = container.dataset.isDropdownOpen === 'true';
		const totalPages = parseInt(container.dataset.totalPages);

		const dropdown = container.querySelector('.sps-live-filter-dropdown');
		const dropdownList = container.querySelector('.sps-live-filter-dropdown-menu');
		if ( dropdownList && dropdownList?.children.length === 0 ) {
			dropdown.style.display = 'none';
		}

		// State management functions
		function updateState() {
			// container.dataset.activeItem = activeItem;
			container.dataset.currentPage = currentPage;
			container.dataset.isDropdownOpen = isDropdownOpen;
		}

		function toggleDropdown() {
			isDropdownOpen = !isDropdownOpen;
			updateState();
			updateUI();
		}

		function closeDropdown() {
			isDropdownOpen = false;
			updateState();
			updateUI();
		}

		function nextPage() {
			if (currentPage < totalPages - 1) {
				currentPage++;
				updateState();
			}
		}

		function prevPage() {
			if (currentPage > 0) {
				currentPage--;
				updateState();
				// updatePage();
			}
		}

		// UI update function
		function updateUI() {
			// Update dropdown visibility
			if (dropdown) {
				if (isDropdownOpen) {
					dropdown.classList.add('active');
				} else {
					dropdown.classList.remove('active');
				}
			}
		}

		// Event handlers - using event delegation
		container.addEventListener('click', function (e) {
			// Handle term clicks (including dynamically created ones)
			if (
				e.target.closest('.sps-live-filter-nav-link') &&
				!e.target.closest('.sps-live-filter-dropdown')
			) {
				e.preventDefault();
				const id = e.target.closest('.sps-live-filter-nav-link').dataset
					.id;
				// setActiveItem(id);
			}

			// Handle dropdown toggle
			if (
				e.target.closest(
					'.sps-live-filter-dropdown .sps-live-filter-nav-link'
				)
			) {
				e.preventDefault();
				if (style !== 'navigation') {
					toggleDropdown();
				}
			}

			// Handle dropdown item clicks
			if (e.target.closest('.sps-live-filter-dropdown-item')) {
				e.preventDefault();
				const id = e.target.closest('.sps-live-filter-dropdown-item')
					.dataset.id;
				// setActiveItem(id);
			}

			// Handle pagination clicks.
			if (e.target.closest('.sps-pagination-prev')) {
				e.preventDefault();
				prevPage();
			}

			if (e.target.closest('.sps-pagination-next')) {
				e.preventDefault();
				nextPage();
			}
		});

		// Close dropdown when clicking outside.
		document.addEventListener('click', function (e) {
			if (!container.contains(e.target)) {
				closeDropdown();
			}
		});
	});
});

/**
 * Initializes or updates all smart filter dropdowns on the page.
 */
function update_selection_field_count() {
	document
		.querySelectorAll('.sp-smart-post-live-filter-wrapper')
		.forEach((wrapper) => {
			const selectEl = wrapper.querySelector('select');
			const dropdownUl = wrapper.querySelector(
				'.sp-smart-post-live-filter-dropdown, .sp-smart-post-live-filter-button'
			);
			const moreButton = wrapper.querySelector(
				'.sps-live-filter-dropdown-menu'
			);
			buildSmartFilterDropdown(selectEl, dropdownUl, moreButton);
		});
}

function buildSmartFilterDropdown(selectEl, dropdownUl, moreButton) {
	if (!selectEl || !dropdownUl) return;

	// Clear existing dropdown items
	dropdownUl.innerHTML = '';
	if (moreButton) moreButton.innerHTML = '';

	const options = Array.from(selectEl.options);

	let attributes = {};
	try {
		const dataAtt = selectEl.dataset.att;
		attributes =
			dataAtt && dataAtt !== 'undefined' ? JSON.parse(dataAtt) : {};
	} catch (e) {
		console.warn('Invalid JSON in data-att:', e);
		attributes = {};
	}
	const { taxonomyLimit, taxonomyStyle, filterType, uniqueId } = attributes;

	let device = 'Desktop';

	if (window.innerWidth <= 781) device = 'Mobile';
	else if (window.innerWidth <= 1024) device = 'Tablet';

	// Safely access taxonomyLimit.device
	const limit =
		taxonomyLimit && taxonomyLimit.device
			? taxonomyLimit.device[device] || 3
			: 3;

	if (taxonomyStyle === 'navigation') {
		// Initialize pagination state
		let currentPage = parseInt(dropdownUl.dataset.currentPage) || 1;
		const totalPages = Math.ceil(options.length / limit);

		// Ensure current page is within valid range
		currentPage = Math.max(1, Math.min(currentPage, totalPages));
		dropdownUl.dataset.currentPage = currentPage;

		// Calculate current page items
		const startIndex = (currentPage - 1) * limit;
		const endIndex = startIndex + limit;
		const currentOptions = options.slice(startIndex, endIndex);

		// Add current page options to dropdown
		currentOptions.forEach((option) => {
			const value = option.value;
			if (value === undefined) return;

			const label =
				option.getAttribute('data-label') || option.textContent.trim();
			const count = option.getAttribute('data-default-count') || '';
			const isSelected = option.selected ?? false;
			const isDisabled = parseInt(count) === 0;

			const li = document.createElement('li');
			const a = document.createElement('a');
			li.classList.add('sps-live-filter-nav-item');
			a.classList.add('sps-live-filter-nav-link');

			a.href = '#';
			a.setAttribute('data-value', value);
			a.setAttribute('data-label', label);
			a.textContent = `${label}${count ? ` (${count})` : ''}`;

			//   if (!count && selectEl.id !== "filter-sort") {
			//     a.classList.add("active");
			//   }

			li.appendChild(a);
			if ( label ) {
				dropdownUl.appendChild(li);
			}
		});

		// Create pagination controls
		const paginationContainer = document.createElement('div');
		paginationContainer.className = 'pagination-controls';

		// const container = document.querySelector(".sps-live-filter-layout-two");
		const container = document.querySelector(`#${uniqueId}`);
		const prev = container.querySelector('.sps-pagination-prev');
		const next = container.querySelector('.sps-pagination-next');

		prev.addEventListener('click', () => {
			dropdownUl.dataset.currentPage = currentPage - 1;
			buildSmartFilterDropdown(selectEl, dropdownUl, moreButton);
		});

		// Page indicator
		const pageIndicator = document.createElement('span');
		pageIndicator.className = 'pagination-info';
		pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

		next.addEventListener('click', () => {
			dropdownUl.dataset.currentPage = currentPage + 1;
			buildSmartFilterDropdown(selectEl, dropdownUl, moreButton);
		});
	} else if (moreButton) {
		// Non-navigation style with more button
		const optionsOne = options.slice(0, limit);
		const optionsTwo = options.slice(limit);

		// Add first set of options to dropdown

		if (filterType !== 'dropdown') {
			optionsOne.forEach((option) => {
				const value = option.value;
				if (value === undefined) return;

				const label =
					option.getAttribute('data-label') ||
					option.textContent.trim();
				const count = option.getAttribute('data-default-count') || '';
				const li = document.createElement('li');
				const a = document.createElement('a');
				li.classList.add('sps-live-filter-nav-item');
				a.classList.add('sps-live-filter-nav-link');
				if ( label === "All" ) {
					a.classList.add("active");
				}

				a.href = '#';
				a.setAttribute('data-value', value);
				a.setAttribute('data-label', label);
				a.textContent = `${label}${count ? ` (${count})` : ''}`;

				li.appendChild(a);
				if ( label ) {
					dropdownUl.appendChild(li);
				}
			});
		}

		// Add remaining options to more button
		Array.from(filterType === 'dropdown' ? options : optionsTwo).forEach(
			(option) => {
				const value = option.value;
				if (value === undefined) return;
				const label =
					option.getAttribute('data-label') ||
					option.textContent.trim();

				const a = document.createElement('a');
				a.classList.add('sps-live-filter-nav-link');
				a.href = '#';
				a.setAttribute('data-value', value);
				a.setAttribute('data-label', label);
				a.textContent = label;

				moreButton.appendChild(a);
			}
		);
	} else {
		// No more button - add all options to dropdown
		options.forEach((option) => {
			const value = option.value;
			if (value === undefined) return;

			const label =
				option.getAttribute('data-label') || option.textContent.trim();
			const count = option.getAttribute('data-default-count') || '';

			const li = document.createElement('li');
			const a = document.createElement('a');
			li.classList.add('sps-live-filter-nav-item');
			a.classList.add('sps-live-filter-nav-link');

			a.href = '#';
			a.setAttribute('data-value', value);
			a.setAttribute('data-label', label);
			a.textContent = `${label}${count ? ` (${count})` : ''}`;

			if (!count && selectEl.id !== 'filter-sort') {
				a.classList.add('active');
			}

			li.appendChild(a);
			dropdownUl.appendChild(li);
		});
	}
}

//................................ second layout part 2...................................................................

/**
 * Updates all custom dropdowns and their labels based on selected values.
 *
 * @param {HTMLElement} blockParent - The parent block element containing filter wrappers.
 */
function updateAllSmartPostFilterCounts(blockParent) {
	const wrappers = blockParent.querySelectorAll(
		'.sp-smart-post-live-filter-wrapper'
	);

	wrappers.forEach((wrapper) => {
		const select = wrapper.querySelector('select');
		const dropdown = wrapper.querySelector(
			'.sp-smart-post-live-filter-dropdown, .sp-smart-post-live-filter-button'
		);
		const selectedButton = wrapper.querySelector(
			'.sp-smart-post-live-filter-btn span'
		);
		const this_filter = wrapper.querySelector('.sp-smart-post-live-filter');
		if (select.id === 'filter-sort') {
			// Build map: value → { label, count }
			const optionMap = Array.from(select.options).reduce(
				(map, option) => {
					const value = option.value;
					const label =
						option.getAttribute('data-label') ||
						option.textContent.trim();
					// Extract count from text, fallback to 0
					const isSelected = option.selected ?? false;
					map[value] = { label, isSelected };
					return map;
				},
				{}
			);
			dropdown.querySelectorAll('a').forEach((a) => {
				const value = a.getAttribute('data-value');
				const { label, isSelected } = optionMap[value];
				if (isSelected) {
					dropdown
						.querySelectorAll('a')
						.forEach((el) => el.classList.remove('active'));
					a.classList.add('active');
				}
			});
			// Update selected button label
			if (select.value && selectedButton) {
				const { label, count } = optionMap[select.value] || {};
				if (label !== undefined) {
					selectedButton.textContent = `${label}`;
				}
			}
		}

		if (!select || !dropdown || select.id === 'filter-sort') {
			return;
		}
		const show_count = this_filter?.getAttribute('data-show-count');
		// Build map: value → { label, count }
		const optionMap = Array.from(select.options).reduce((map, option) => {
			const value = option.value;
			const label =
				option.getAttribute('data-label') || option.textContent.trim();
			// Extract count from text, fallback to 0
			const countMatch = option.textContent.trim().match(/\((\d+)\)/);
			const count = countMatch ? countMatch[1] : '0';
			const isSelected = option.selected ?? false;
			map[value] = { label, count, isSelected };
			return map;
		}, {});

		// Update selected button label
		if (select.value && selectedButton) {
			const { label, count } = optionMap[select.value] || {};
			const count_text = show_count ? `(${count})` : '';
			if (label !== undefined) {
				selectedButton.textContent = `${label} ${count_text}`;
			}
		}

		// Update dropdown items with latest labels and counts
		dropdown.querySelectorAll('a').forEach((a) => {
			const value = a.getAttribute('data-value');
			if (!value || !optionMap[value]) {
				return;
			}

			const { label, count, isSelected } = optionMap[value];

			a.setAttribute('data-label', label);
			a.setAttribute('data-default-count', count);
			const count_text = show_count ? `(${count})` : '';
			a.textContent = `${label} ${count_text}`;
			if (parseInt(count) === 0) {
				a.classList.add('disabled');
				a.setAttribute('aria-disabled', 'true');
			} else {
				a.classList.remove('disabled');
				a.removeAttribute('aria-disabled');
				if (isSelected) {
					dropdown
						.querySelectorAll('a')
						.forEach((el) => el.classList.remove('active'));
					a.classList.add('active');
				}
			}
		});
	});
}

// This class handles the sp_marquee functionality
// It can be used to create a scrolling sp_marquee effect for any container with items
// The class takes a container element and options for speed, direction, and pause on hover.
class SP_Marquee {
	constructor(container, options = {}) {
		this.container =
			typeof container === 'string'
				? document.querySelector(container)
				: container;

		this.options = {
			speed: 500, // pixels per second
			direction: 'left', // 'left', 'right', 'up', 'down'
			pauseOnHover: true,
			duplicateItems: true,
			slidesPerView: 3,
			slidesPerViewTablet: 2,
			slidesPerViewMobile: 1,
			spaceBetween: 24,
			spaceBetweenTablet: 16,
			spaceBetweenMobile: 8,
			...options,
		};

		this.content = this.container.querySelector('.sp_marquee-content');
		this.items = Array.from(this.content.children);
		this.isPaused = false;
		this.itemWidth = 300; // Default width for items, can be adjusted.

		this.init();
	}
	getCurrentBreakpoint() {
		const width = window.innerWidth;
		if (width <= 600) {
			return 'mobile';
		}
		if (width <= 1024) {
			return 'tablet';
		}
		return 'desktop';
	}

	init() {
		const containerWidth = this.container.offsetWidth;
		// Duplicate until content is longer than container by at least one screen.
		if (this.options.duplicateItems) {
			// while (this.content.scrollWidth < containerWidth * 2) {
			// 	console.log(this.content.scrollWidth);
			// 	this.items.forEach((item) => {
			// 		const clone = item.cloneNode(true);
			// 		this.content.appendChild(clone);
			// 	});
			// }
			const originalChildren = Array.from(this.items);
			// Take the first 3 (or less if not enough items)
			const clones = originalChildren.slice(0, this.slidesPerView || 3);
			clones.forEach((item) => {
				const clone = item.cloneNode(true);
				clone.setAttribute('data-marquee-clone', 'true');
				this.content.appendChild(clone);
			});
		}

		// Set animation direction and speed
		this.setDirection(this.options.direction);

		this.setSpeed(this.options.speed);
		// Add hover events
		if (this.options.pauseOnHover) {
			this.container.addEventListener('mouseenter', () => this.pause());
			this.container.addEventListener('mouseleave', () => this.resume());
		}
		window.addEventListener('resize', () => {
			this.setSlidesPerView();
			this.updateAnimation();
		});
	}
	//  setSlidesPerView() {
	// 	 this.options.slidesPerView = this.options.slidesPerView || 3;
	// 	 const containerWidth = this.container.offsetWidth;
	// 	 // Calculate item width based on slidesPerView
	// 	 console.log(this.options.slidesPerView);
	// 	 const itemWidth = containerWidth / this.options.slidesPerView;
	// 	 this.items.forEach(item => {
	// 		 item.style.width = `${itemWidth}px`;
	// 	 });

	// }
	setSlidesPerView() {
		const breakpoint = this.getCurrentBreakpoint();

		const slidesPerView = {
			desktop: this.options.slidesPerView,
			tablet: this.options.slidesPerViewTablet,
			mobile: this.options.slidesPerViewMobile,
		}[breakpoint];

		const spaceBetween = {
			desktop: this.options.spaceBetween,
			tablet: this.options.spaceBetweenTablet,
			mobile: this.options.spaceBetweenMobile,
		}[breakpoint];
		this.spaceBetween = spaceBetween;
		const containerWidth = this.container.offsetWidth;
		const totalSpacing = spaceBetween * (slidesPerView - 1);
		const itemWidth = (containerWidth - totalSpacing) / slidesPerView;

		this.itemWidth = itemWidth; // Store item width for later use
		this.slidesPerView = slidesPerView;
		this.items.forEach((item, index) => {
			item.style.width = `${this.itemWidth}px`;
			item.style.marginRight =
				index !== this.items.length - 1 ? `${spaceBetween}px` : "0";
		});
	}
	setDirection(direction) {
		// Remove previous direction classes.
		this.content.classList.remove(
			"sp_marquee-left",
			"sp_marquee-right",
			"sp_marquee-up",
			"sp_marquee-down"
		);

		// Add new direction class
		this.content.classList.add(`sp_marquee-${direction}`);

		// Update animation
		this.updateAnimation();
	}

	// setSpeed(speed) {
	// 	// Calculate duration based on content width and speed
	// 	const itemWidth = this.items[0].offsetWidth +
	// 		parseInt(window.getComputedStyle(this.items[0]).marginRight) * 2;
	// 	const totalWidth = itemWidth * this.items.length;
	// 	const duration = totalWidth / speed;

	// 	this.content.style.animationDuration = `${duration}s`;
	// }
	// setSpeed(speed) {
	// 	// Get full content width
	// 	//const contentWidth = this.content.scrollWidth;
	// 	const containerWidth = this.container.offsetWidth;
	// 	this.items = Array.from(this.content.children);
	// 	this.setSlidesPerView();

	// 	// count total items
	// 	const speed_x = this.content.scrollWidth / containerWidth;

	// 	const duration = speed_x * speed;
	// 	console.log(duration / 1000);
	// 	this.content.style.animationDuration = `${duration}ms`;
	// }

	setSpeed(pixelsPerSecond) {
		pixelsPerSecond = (1000 * 250) / pixelsPerSecond;
		// Make sure slidesPerView & item widths are up to date.
		this.items = Array.from(this.content.children);
		this.setSlidesPerView();
		this.itemWidth = Number(this.itemWidth);
		this.spaceBetween = Number(this.spaceBetween);
		this.slidesPerView = Number(this.slidesPerView);
		const extraWidth =
			(this.itemWidth + this.spaceBetween) * this.slidesPerView;
		// Total distance to scroll (the entire marquee width).
		const distance = this.content.scrollWidth - extraWidth;
		// Duration in seconds = distance(px) / speed(px/sec).
		const duration = distance / pixelsPerSecond;
		//console.log(distance);
		// Apply as seconds to match CSS animation-duration.
		this.content.style.animationDuration = `${duration}s`;
		this.content.style.setProperty('--sps_extrawidth', `${extraWidth}px`);
	}

	pause() {
		this.content.style.animationPlayState = 'paused';
		this.isPaused = true;
	}
	resume() {
		if (this.isPaused) {
			this.content.style.animationPlayState = 'running';
			this.isPaused = false;
		}
	}
	updateAnimation() {
		// Force reflow to restart animation
		this.content.style.animation = 'none';
		this.content.offsetHeight; // Trigger reflow
		this.content.style.animation = '';
		// Reapply speed
		this.setSpeed(this.options.speed);
	}
}

//------------------------title effect js--------
function wrapLines() {
	const selector = `
        .sp-smart-post-grid-two .sp-smart-post-title,
        .sp-smart-post-grid-three .sp-smart-post-title,
        .sp-smart-post-carousel-two .sp-smart-post-title,
        .sp-smart-post-slider .sp-smart-post-title,
        .sp-smart-post-slider-two .sp-smart-post-title,
        .sp-smart-post-thumbnail-slider .sp-smart-post-title,
        .sp-smart-post-thumbnail-slide-two .sp-smart-post-title,
        .sp-smart-post-grid-four .sp-smart-post-title,
        .sp-smart-post-grid-five .sp-smart-post-title,
        .sp-smart-post-grid-six .sp-smart-post-title,
        .sp-smart-post-timeline-two .sp-smart-post-title`;

	document.querySelectorAll(selector).forEach((title) => {
		if (title.dataset.processed === 'true') return;

		const textElement = title.querySelector('.sp-smart-post-title-text');
		if (!textElement) return;

		// Get trimmed text content only from title-text span
		const text = textElement.textContent.trim();
		if (!text) return;

		const temp = document.createElement('div');
		const style = window.getComputedStyle(textElement);
		Object.assign(temp.style, {
			position: 'absolute',
			visibility: 'hidden',
			whiteSpace: 'nowrap',
			fontSize: style.fontSize,
			fontFamily: style.fontFamily,
			fontWeight: style.fontWeight,
		});
		document.body.appendChild(temp);

		const containerWidth = textElement.offsetWidth || title.offsetWidth;
		const words = text.split(' ');
		const lines = [];
		let currentLine = '';

		words.forEach((word) => {
			const testLine = currentLine ? `${currentLine} ${word}` : word;
			temp.textContent = testLine;
			if (temp.offsetWidth > containerWidth && currentLine) {
				lines.push(currentLine);
				currentLine = word;
			} else {
				currentLine = testLine;
			}
		});
		if (currentLine) lines.push(currentLine);
		document.body.removeChild(temp);

		textElement.innerHTML = ''; // ✅ clear only text span

		lines.forEach((line, index) => {
			const span = document.createElement('span');
			span.className = 'line';
			span.textContent = line;
			textElement.appendChild(span);
			if (index < lines.length - 1) {
				textElement.appendChild(document.createElement('br'));
			}
		});

		title.dataset.processed = 'true';
	});
}

document.addEventListener('DOMContentLoaded', () => {
	wrapLines();
});

document.addEventListener( 'DOMContentLoaded', () => {
	const dividerHideShow = () => {
		const containers = document.querySelectorAll(".sp-smart-post-smart-lists-wrapper.sp-smart-post-smart-lists-front-end");
		if ( ! containers.length ) return;
		containers.forEach( container => {
			const horizontalList = container?.classList.contains("sp-list-orientation-horizontal");
			if ( ! horizontalList ) return;
			const itemsEl = container.querySelectorAll(".wp-block-sp-smart-post-show-smart-list");
			let currentTop = null;
			let lastInRow = null;
			itemsEl.forEach(element => {
				element.classList.add("sp-list-divider");
			});
			itemsEl.forEach(element => {
				if ( currentTop === null ) {
					currentTop = element.offsetTop;
				}
				if (element.offsetTop !== currentTop) {
					// new row started
					if (lastInRow) {
						lastInRow.classList.remove("sp-list-divider");
					}
					currentTop = element.offsetTop;
				}
				lastInRow = element;
			});
			if (lastInRow) {
				lastInRow.classList.remove("sp-list-divider");
			}
		})
	}
	dividerHideShow();
	window.addEventListener("resize", dividerHideShow);
})

document.addEventListener( "DOMContentLoaded", () => {
	document.querySelectorAll(".sp-smart-post-background-layout .sp-smart-post-card-image video").forEach(video => {
		video.controls = false;
		video.muted = true;
		video.autoplay = true;
		video.loop = true;
		video.play();
	});
})