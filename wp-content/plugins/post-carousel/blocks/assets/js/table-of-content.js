document.addEventListener("DOMContentLoaded", function () {
	const tocContainer = document.querySelector(".sp-table-of-content-toc");
	if (!tocContainer) {
		return;
	}

	// Get all TOC links
	const smoothScroll = tocContainer.dataset.smoothScroll === "true";
	const offsetTop = parseFloat(tocContainer.dataset.offsetTop) || 0;
	const tocLinks = document.querySelectorAll(".sps-toc-link");
	const preset = tocContainer.dataset.preset || "presetOne";
	const hashUrl = tocContainer.dataset.hashUrl || false;

	//............ hash url
	const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
	headings.forEach((heading) => {
		// Find the link inside this heading
		const link = heading.querySelector(".sps-toc-heading-copy-link");

		if (link) {
			// Hide initially
			link.style.opacity = "0";
			link.style.transition = "opacity 0.3s";

			// Control hover: show/hide link only when desired
			heading.addEventListener("mouseenter", () => {
				// Example: only show for h3 and h4
				if (hashUrl) {
					link.style.setProperty("opacity", "1", "important");
				} else {
					link.style.pointerEvents = "none";
				}
			});
			heading.addEventListener("mouseleave", () => {
				link.style.opacity = "0";
			});
		}
	});

	//............

	// State management
	let selectedItem = null;
	const itemRefs = {};
	const containerRef = tocContainer.querySelector(".sps-toc-container");
	const indicatorRef = tocContainer.querySelector(".sps-toc-indicator");

	// Initialize item refs
	document.querySelectorAll(".sps-toc-item").forEach((item) => {
		const itemId = item.getAttribute("data-item-id");
		if (itemId) {
			itemRefs[itemId] = item;
		}
	});

	// Update indicator position
	const updateIndicatorPosition = () => {
		if (!containerRef || !indicatorRef || selectedItem === null) {
			// Hide indicator without transition
			if (indicatorRef) {
				indicatorRef.classList.add("hidden");
			}
			return;
		}

		// Check if container is visible using the class
		if (containerRef.classList.contains("sps-toc-hidden")) {
			if (indicatorRef) {
				indicatorRef.classList.add("hidden");
			}
			return;
		}

		const itemElement = itemRefs[selectedItem];
		if (!itemElement) {
			if (indicatorRef) {
				indicatorRef.classList.add("hidden");
			}
			return;
		}

		const linkWrapper = itemElement.querySelector(".sps-toc-link-wrapper");
		if (!linkWrapper) {
			if (indicatorRef) {
				indicatorRef.classList.add("hidden");
			}
			return;
		}

		// Remove hidden class to show indicator with transition
		indicatorRef.classList.remove("hidden");

		const containerRect = containerRef.getBoundingClientRect();
		const linkWrapperRect = linkWrapper.getBoundingClientRect();
		const relativeTop = linkWrapperRect.top - containerRect.top;

		indicatorRef.style.top = `${relativeTop}px`;
		indicatorRef.style.height = `${linkWrapperRect.height}px`;
	};

	// Update selected item background
	const updateSelectedItemBackground = () => {
		// Remove background from all wrappers
		document
			.querySelectorAll(".sps-toc-link-wrapper")
			.forEach((wrapper) => {
				wrapper.classList.remove("sps-toc-selected-background");
			});

		// Add background to selected item for presetTwo and presetFive
		if (
			["presetTwo", "presetFive", "presetThree", "presetFour"].includes(
				preset
			) &&
			selectedItem
		) {
			const itemElement = itemRefs[selectedItem];
			if (itemElement) {
				const linkWrapper = itemElement.querySelector(
					".sps-toc-link-wrapper"
				);
				if (linkWrapper) {
					linkWrapper.classList.add("sps-toc-selected-background");
				}
			}
		}
	};

	// Add click event listener to each link
	tocLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			// Get the target ID from the href attribute (URL encoded)
			const encodedTargetId = this.getAttribute("href").substring(1);
			// DECODE the URL-encoded ID to match the actual heading ID
			const decodedTargetId = decodeURIComponent(encodedTargetId);

			// Try to find the element with the decoded ID first
			let targetElement = document.getElementById(decodedTargetId);

			// If not found with decoded ID, try the encoded ID as fallback
			if (!targetElement) {
				targetElement = document.getElementById(encodedTargetId);
			}

			// Update selected item - use the actual ID that worked
			if (targetElement) {
				selectedItem = targetElement.id;
			} else {
				selectedItem = decodedTargetId; // Fallback to decoded ID
			}

			// Update selected item background
			updateSelectedItemBackground();

			// Update indicator position for presets 3, 4, 5
			if (["presetThree", "presetFour", "presetFive"].includes(preset)) {
				updateIndicatorPosition();
			}

			// Scroll to target
			if (targetElement) {
				const targetPosition =
					targetElement.getBoundingClientRect().top +
					window.pageYOffset;
				window.scrollTo({
					top: targetPosition - offsetTop,
					behavior: smoothScroll ? "smooth" : "auto",
				});
			} else {
				console.warn("TOC target not found:", decodedTargetId);
			}
		});
	});

	// Handle copy buttons
	const copyButtons = document.querySelectorAll(".sps-toc-copy");
	copyButtons.forEach((button) => {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopPropagation(); // Prevent triggering the parent link click

			const textToCopy = this.getAttribute("data-clipboard-text");
			// Create a temporary input element to copy the text
			const tempInput = document.createElement("input");
			tempInput.value = textToCopy;
			document.body.appendChild(tempInput);
			tempInput.select();
			try {
				// Execute the copy command
				const successful = document.execCommand("copy");
				if (successful) {
					// Show success feedback
					const originalTitle = this.getAttribute("title");
					this.setAttribute("title", "Copied!");
					this.classList.add("copied");
					// Reset after 2 seconds
					setTimeout(() => {
						this.setAttribute("title", originalTitle);
						this.classList.remove("copied");
					}, 2000);
				}
			} catch (err) {
				console.error("Copy error:", err);
			}
			// Remove the temporary input
			document.body.removeChild(tempInput);
		});
	});

	// Handle main toggle
	const mainToggle = document.querySelector(".sps-toc-main-toggle");
	if (mainToggle) {
		mainToggle.addEventListener("click", function (e) {
			e.preventDefault();
			const tocInnerContainer =
				document.querySelector(".sps-toc-container");
			const isExpanding =
				tocInnerContainer.classList.contains("sps-toc-hidden");

			// Toggle the hidden class
			tocInnerContainer.classList.toggle("sps-toc-hidden");

			// If collapsing, hide indicator immediately without animation
			if (!isExpanding && indicatorRef) {
				indicatorRef.classList.add("hidden");
			}

			// Update button state
			this.classList.toggle("expanded");

			// Update aria-expanded and label
			const isExpanded = this.classList.contains("expanded");
			this.setAttribute("aria-expanded", isExpanded ? "true" : "false");

			const buttonType = tocContainer.dataset.buttonType;
			const collapseText = tocContainer.dataset.collapseText;
			const expandText = tocContainer.dataset.expandText;
			const iconSource = tocContainer.dataset.iconSource;

			if (buttonType === "icon") {
				const tocWrapper =
					tocContainer.querySelector(".sps-toc-wrapper");
				const iconSvgs = JSON.parse(tocWrapper.dataset.icons);

				let newIcon;
				switch (iconSource) {
					case "one":
						newIcon = iconSvgs.one;
						break;
					case "two":
						newIcon = iconSvgs.two;
						break;
					case "three":
						newIcon = iconSvgs.three;
						break;
					case "four":
						newIcon = isExpanded
							? iconSvgs.four_expanded
							: iconSvgs.four_collapsed;
						break;
					case "five":
						newIcon = isExpanded
							? iconSvgs.five_expanded
							: iconSvgs.five_collapsed;
						break;
					case "six":
						newIcon = iconSvgs.six;
						break;
					case "seven":
						newIcon = isExpanded
							? iconSvgs.seven_expanded
							: iconSvgs.seven_collapsed;
						break;
					case "eight":
						newIcon = iconSvgs.eight;
						break;
					default:
						newIcon = isExpanded
							? iconSvgs.four_expanded
							: iconSvgs.four_collapsed;
				}

				this.innerHTML = newIcon;
			} else {
				// Update text
				this.textContent = isExpanded ? collapseText : expandText;
			}

			this.setAttribute(
				"aria-label",
				isExpanded ? collapseText : expandText
			);

			// Update indicator position after expanding (with delay for animation)
			if (
				isExpanding &&
				["presetThree", "presetFour", "presetFive"].includes(preset)
			) {
				setTimeout(() => {
					updateIndicatorPosition();
				}, 350); // Slightly longer than the transition duration
			}
		});
	}

	// Handle item toggles
	const itemToggles = document.querySelectorAll(".sps-toc-toggle");
	itemToggles.forEach((toggle) => {
		toggle.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			const parentLi = this.closest("li.sps-toc-item");
			const sublist = parentLi.querySelector(".sps-toc-sublist");
			if (sublist) {
				const isExpanding = sublist.classList.contains(
					"sps-toc-sublist-collapsed"
				);
				sublist.classList.toggle("sps-toc-sublist-collapsed");
				this.classList.toggle("expanded");

				// Update icon
				const isExpanded = this.classList.contains("expanded");

				const childIconSource = tocContainer.dataset.childIconSource;
				const tocWrapper =
					tocContainer.querySelector(".sps-toc-wrapper");
				const iconSvgs = JSON.parse(tocWrapper.dataset.icons);

				let newIcon;
				switch (childIconSource) {
					case "one":
						newIcon = iconSvgs.one;
						break;
					case "two":
						newIcon = iconSvgs.two;
						break;
					case "three":
						newIcon = iconSvgs.three;
						break;
					case "four":
						newIcon = isExpanded
							? iconSvgs.four_expanded
							: iconSvgs.four_collapsed;
						break;
					case "five":
						newIcon = isExpanded
							? iconSvgs.five_expanded
							: iconSvgs.five_collapsed;
						break;
					case "six":
						newIcon = iconSvgs.six;
						break;
					case "seven":
						newIcon = isExpanded
							? iconSvgs.seven_expanded
							: iconSvgs.seven_collapsed;
						break;
					case "eight":
						newIcon = iconSvgs.eight;
						break;
					default:
						newIcon = isExpanded
							? iconSvgs.four_expanded
							: iconSvgs.four_collapsed;
				}

				this.innerHTML = newIcon;

				// Update aria-expanded and label
				this.setAttribute(
					"aria-expanded",
					isExpanded ? "true" : "false"
				);
				this.setAttribute(
					"aria-label",
					isExpanded ? "Collapse section" : "Expand section"
				);

				// Update indicator position after expanding/collapsing (with delay for animation)
				if (
					["presetThree", "presetFour", "presetFive"].includes(preset)
				) {
					setTimeout(() => {
						updateIndicatorPosition();
					}, 350); // Slightly longer than the transition duration
				}
			}
		});
	});

	// Initialize indicator position for presets 3, 4, 5
	if (["presetThree", "presetFour", "presetFive"].includes(preset)) {
		// Set initial selected item if none is set
		if (!selectedItem && tocLinks.length > 0) {
			const firstLink = tocLinks[0];
			const firstItemId = firstLink.getAttribute("href").substring(1);
			selectedItem = firstItemId;
			updateIndicatorPosition();
		}

		// Update indicator on window resize
		window.addEventListener("resize", () => {
			requestAnimationFrame(updateIndicatorPosition);
		});

		// Update indicator when container size changes (using MutationObserver)
		if (containerRef) {
			const resizeObserver = new ResizeObserver(() => {
				requestAnimationFrame(updateIndicatorPosition);
			});

			resizeObserver.observe(containerRef);
		}
	}

	// Initialize selected item background for presetTwo and presetFive
	if (["presetTwo", "presetFive"].includes(preset)) {
		updateSelectedItemBackground();
	}

	// Copy to clipboard functionality for heading links.....................
	function copyToClipboard(text) {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.style.position = "fixed";
		textarea.style.top = 0;
		textarea.style.left = 0;
		textarea.style.opacity = "0";
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();
		try {
			document.execCommand("copy");
		} catch (err) {
			console.error("Failed to copy: ", err);
			prompt("Copy this link:", text);
		}
		document.body.removeChild(textarea);
	}

	document.body.addEventListener("click", function (e) {
		const target = e.target.closest(".sps-toc-heading-copy-link");
		if (!target) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		const url = target.dataset.url;
		copyToClipboard(url);
		// Optional tooltip message
		const msg = document.createElement("div");
		msg.textContent = "Link copied!";
		msg.style.position = "fixed";
		msg.style.bottom = "20px";
		msg.style.right = "20px";
		msg.style.background = "#333";
		msg.style.color = "#fff";
		msg.style.padding = "8px 12px";
		msg.style.borderRadius = "4px";
		msg.style.zIndex = "99999";
		msg.style.fontSize = "13px";
		document.body.appendChild(msg);
		setTimeout(() => {
			msg.style.opacity = "0";
			setTimeout(() => msg.remove(), 300);
		}, 1500);
	});
	
	const tocContainers = document.querySelectorAll(".sp-table-of-content-toc");
	tocContainers.forEach((container) => {
		const floatingContainer = container.classList.contains("sp-toc-position-floating");
		container.style.transition = "opacity 0.3s ease-in-out";
		if ( floatingContainer ) {
			const placeholder = document.createElement("div");
			placeholder.style.height = container.offsetHeight + "px";

			const rect = container.getBoundingClientRect();
			const containerPosition =  rect.top + window.scrollY + rect.height;
			window.addEventListener("scroll", () => {
				if ( window.scrollY > containerPosition) {
					container.style.position = "fixed";
					container.parentNode.insertBefore(placeholder, container);
					container.style.opacity = "1";
				} else {
					container.style.position = "static";
					container.style.opacity = "1";
					placeholder.remove();
				}
			})
		}
	})
});



