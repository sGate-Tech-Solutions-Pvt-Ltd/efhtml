document.addEventListener("DOMContentLoaded", function () {
	const searchContainers = document.querySelectorAll(
		".sp-smart-post-search-wrapper"
	);
	function debounce(fn, delay) {
		let timer;
		return function (...args) {
			clearTimeout(timer);
			timer = setTimeout(() => fn.apply(this, args), delay);
		};
	}
	const safeJSONParse = (str, fallback = {}) => {
		try {
			return JSON.parse(str) || fallback;
		} catch (e) {
			console.log("Failed to parse JSON:", str, e);
			return fallback;
		}
	};
	const loadQueryData = (state) => {
		return fetch(sp_smart_search_block_localize.searchRestUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(state),
		}).then((res) => res.json());
	};
	function highlightSearchTerm(container, term) {
		if (!term) {
			return;
		}
		const regex = new RegExp(
			"(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
			"gi"
		);

		const walker = document.createTreeWalker(
			container,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);
		const nodes = [];
		while (walker.nextNode()) {
			nodes.push(walker.currentNode);
		}

		nodes?.forEach(function (node) {
			const parent = node.parentNode;
			if (parent && parent.nodeName !== "MARK") {
				const newHTML = node.nodeValue.replace(
					regex,
					'<mark class="sp-smart-post-search-highlight">$1</mark>'
				);
				if (newHTML !== node.nodeValue) {
					const span = document.createElement("span");
					span.innerHTML = newHTML;
					parent.replaceChild(span, node);
				}
			}
		});
	}
	const eventHandler = async (e, container, query) => {
		e.preventDefault();
		const target = e.target;
		const searchResults = container.querySelector(
			".sp-smart-post-search-results"
		);
		const searchInput = target.closest(".sp-smart-post-search-input");
		const taxonomyField = container.querySelector(
			".sp-smart-post-search-cate-list"
		);

		if (taxonomyField) {
			const termId = taxonomyField.value;
			query.term = termId;
		}
		if (searchInput) {
			const searchTerm = searchInput.value.trim();
			if (searchTerm.length > 0) {
				searchResults.classList.add(
					"sp-smart-post-search-results--show"
				);
				query.s = searchTerm;
			} else {
				searchResults.classList.remove(
					"sp-smart-post-search-results--show"
				);
				return;
			}
		}

		loadQueryData(query).then((data) => {
			const resultList = container.querySelector(
				".sp-smart-post-search-list"
			);
			if (resultList) {
				resultList.innerHTML = data.html;
				if (query.s && query?.hightLightSearchTerm) {
					highlightSearchTerm(resultList, query.s.trim());
				}
			}
			const loadMore = container.querySelector(
				".sp-smart-post-search-load-more"
			);
			if (loadMore) {
				const showCount = query?.showResultsCount || true;
				const viewMoreText =
					loadMore.dataset.view_more_text ?? "View More";
				if (data.remaining_posts > 0) {
					if (query?.moreResultClickAction === "expanded") {
						loadMore.innerHTML = `<button type="button" class="sp-smart-post-search-load-more-button"> ${viewMoreText}${ showCount ? (" " + data.remaining_posts +  " + Posts") : ""}</button>`;
						const loadMoreBtn = loadMore.querySelector(
							".sp-smart-post-search-load-more-button"
						);
						loadMoreBtn?.addEventListener("click", () => {
							query.loadMore = true;
							eventHandler(e, container, query);
						});
					} else {
						loadMore.innerHTML = `<a href="/?s=${query.s}" ${query?.moreResultClickAction === "new_tab" ? `target="_blank"` : ""} class="sp-smart-post-search-load-more-button">
						${viewMoreText}${ showCount ? (" " + data.remaining_posts +  " + Posts") : ""} </a>`;
					}
				} else {
					loadMore.innerHTML = "";
				}
			}
		});
	};
	searchContainers?.forEach((container) => {
		const searchForm = container.querySelector(
			".sp-smart-post-search-form"
		);

		let searchSettings = searchForm?.dataset?.search_settings ?? "{}";
		searchSettings = safeJSONParse(searchSettings, {});
		const blockWrapper = container.closest(".sp-smart-post-wrapper");
		if (blockWrapper) {
			searchSettings.block = blockWrapper.id;
			if (searchSettings?.displayType === "popup") {
				const searchTrigger = blockWrapper.querySelector(
					"button.sp-smart-post-search-trigger-button"
				);
				
				if (searchTrigger) {
					searchTrigger.addEventListener("click", () => {
						container.classList.toggle(
							"sp-smart-post-search-popup--active"
						);
						const searchOverlay = blockWrapper.querySelector(
							".sp-smart-post-search-overlay"
						);
						if(searchOverlay) {
							searchOverlay.classList.toggle("sp-d-block");
							
							searchOverlay.addEventListener("click", () => {
								container.classList.remove(
									"sp-smart-post-search-popup--active"
								);
								searchOverlay.classList.remove("sp-d-block");
							});
						}
						// Close button functionality
						const popupCloseBtn = container.querySelector(
							".sp-smart-post-popup-close-icon"
						);
						if ( popupCloseBtn ) {
							popupCloseBtn.addEventListener( "click", () => {
								container.classList.remove(
									"sp-smart-post-search-popup--active"
								);
								if(searchOverlay) {
									searchOverlay.classList.remove("sp-d-block");
								}
							});
						}
						
					});
				}
				
			}
		}

		if (searchSettings?.isAjaxSearch) {
			const filter_fields =
				container?.querySelectorAll(
					".sp-smart-post-search-form select[name], .sp-smart-post-search-form input[name]"
				) || [];
			filter_fields?.forEach((field) => {
				const isInput = field.tagName === "INPUT";
				const eventName = isInput ? "input" : "change";

				// Add event listener.
				field?.addEventListener(
					eventName,
					isInput
						? debounce(
								(e) =>
									eventHandler(e, container, searchSettings),
								400
							)
						: (e) => eventHandler(e, container, searchSettings)
				);
			});
		} else {
			searchForm?.addEventListener("submit", (event) => {
				event.preventDefault();
			});
		}
		const resultDiv = container.querySelector(".sp-smart-post-search-results");
		container.addEventListener(
			"blur",
			function (event) {
				// If focus moved *outside* the wrapper
				if (!container.contains(event.relatedTarget) && resultDiv ) {
					resultDiv.classList.remove("sp-smart-post-search-results--show"); // or your hide logic
				}
			},
			true // IMPORTANT! useCapture to detect blur properly
		);
	});
});

document.addEventListener( "DOMContentLoaded", () => {
	// const popupSearchIcon = document.querySelectorAll(".sp-smart-post-wrapper .sp-smart-post-search-trigger");
	const elements = document.querySelectorAll(".sp-smart-post-search-wrapper.sp-smart-post-search-popup");
	if ( elements.length < 1 ) return;

	function adjustPosition() {
		elements.forEach( el => {
			const rect = el.getBoundingClientRect();

			if ( (rect.width + rect.left) < window.innerWidth) {
				el.classList.remove("sp-popup-position-right");
				el.classList.add("sp-popup-position-left");
			}
			// If element goes past the right edge
			else if ( (rect.width + rect.left) > window.innerWidth) {
				el.classList.remove("sp-popup-position-left");
				el.classList.add("sp-popup-position-right");
			}
		})
	}
	// Call when you show/move the element
	adjustPosition();

	// Optional: also check on window resize
	window.addEventListener("resize", adjustPosition);
})
