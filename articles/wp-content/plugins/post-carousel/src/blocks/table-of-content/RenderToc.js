import { useBlockProps } from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect, useMemo, useRef, useState, useCallback } from "@wordpress/element";
import { usePanelBodyContext } from "../../context";
import { buildNestedStructure, flattenTOC, removePluginContent } from "./helper";
import {
	Icon1,
	Icon10,
	Icon11,
	Icon13,
	Icon14,
	Icon15,
	Icon3,
	Icon5,
	Icon7,
	Icon8,
	Icon9,
} from "../../icons/collapsibleIcons";

export default function TocRender({ attributes }) {
	const {
		tocHeading,
		supportedHeadingTag,
		listStyle,
		tocAlignment,
		listHierarchy,
		copyLink,
		tocCollapsed,
		collapsedInitially,
		childItemCollapsible,
		CollapsibleIconSource,
		collapseText,
		expandText,
		CollapsibleButtonType,
		collapsibleColor,
		collapsibleIconPosition,
		childCollapsibleIconSource,
		preset,
	} = attributes;

	const { togglePanelBody } = usePanelBodyContext();

	const blockProps = useBlockProps();
	const [headings, setHeadings] = useState([]);
	const [expandedItems, setExpandedItems] = useState([]);
	const [isTocExpanded, setIsTocExpanded] = useState(!collapsedInitially);
	const [selectedItem, setSelectedItem] = useState(null);
	const containerRef = useRef(null);
	const indicatorRef = useRef(null);
	const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
	const itemRefs = useRef({}); // Store refs for each item

	// Log when selectedItem changes
	useEffect(() => {}, [selectedItem]);

	const postContent = useSelect((select) => {
		const content = select("core/editor").getEditedPostContent();
		return removePluginContent(content);
	}, []);

	const dummyHeadingElements = [
		{
			tagName: "H2",
			className: "wp-block-heading",
			id: "",
			textContent: "Dummy Introduction",
		},
		{
			tagName: "H3",
			className: "wp-block-heading",
			id: "overview-section",
			textContent: "Dummy Overview Section",
		},
		{
			tagName: "H4",
			className: "wp-block-heading",
			id: "",
			textContent: "Dummy Details",
		},
		{
			tagName: "H2",
			className: "wp-block-heading",
			id: "",
			textContent: "Dummy Conclusion",
		},
		{
			tagName: "H3",
			className: "wp-block-heading",
			id: "final-thoughts",
			textContent: "Dummy Final Thoughts",
		},
	];

	// Parse headings and add IDs if missing
	useEffect(() => {
		if (!postContent) {
			return;
		}

		const parser = new DOMParser();
		const doc = parser.parseFromString(postContent, "text/html");
		const headingSelector = supportedHeadingTag?.map((tag) => tag.value).join(", ") || "h1,h2,h3,h4,h5,h6";

		const headingElements = Array.from(doc.querySelectorAll(headingSelector)).filter((el) => {
			let parent = el.parentElement;
			while (parent) {
				const classList = parent.classList || [];
				// Skip headings inside unwanted blocks
				if (classList.contains("wp-block-comments") || classList.contains("wp-block-query")) {
					return false;
				}
				parent = parent.parentElement;
			}
			// Keep any heading that's not empty
			return el.textContent.trim() !== "";
		});

		const nestedHeadings = buildNestedStructure(headingElements.length ? headingElements : dummyHeadingElements);
		setHeadings(nestedHeadings);
	}, [postContent, buildNestedStructure, setHeadings]);

	// Initialize headingItems
	const headingItems = useMemo(() => {
		return listHierarchy ? headings : flattenTOC(headings);
	}, [listHierarchy, headings]);

	// Expand all parent items with children initially
	useEffect(() => {
		const parentIds = [];
		const traverse = (items) => {
			items.forEach((item) => {
				if (item.children?.length > 0) {
					parentIds.push(item.id);
					traverse(item.children);
				}
			});
		};
		traverse(headingItems);
		setExpandedItems(parentIds);
	}, [headingItems]);

	// ---- Indicator Logic (refactored) ----
	const updateIndicatorPosition = useCallback(() => {
		if (containerRef.current && indicatorRef.current && selectedItem !== null) {
			const itemElement = itemRefs.current[selectedItem];

			if (itemElement) {
				const linkWrapper = itemElement.querySelector(".sps-toc-link-wrapper");

				if (linkWrapper) {
					const containerRect = containerRef.current.getBoundingClientRect();
					const linkWrapperRect = linkWrapper.getBoundingClientRect();
					const relativeTop = linkWrapperRect.top - containerRect.top;

					setIndicatorStyle({
						top: relativeTop,
						height: linkWrapperRect.height,
					});
				}
			}
		}
	}, [selectedItem, preset]);

	// Run when selection or TOC changes
	useEffect(() => {
		if (["presetThree", "presetFour", "presetFive"].includes(preset)) {
			// Add a small delay to ensure DOM has updated
			const timer = setTimeout(() => {
				updateIndicatorPosition();
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [updateIndicatorPosition, isTocExpanded, headingItems, preset, selectedItem, expandedItems]);

	// Run on window resize
	useEffect(() => {
		if (!["presetThree", "presetFour", "presetFive"].includes(preset)) return;

		const handleResize = () => {
			requestAnimationFrame(updateIndicatorPosition);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [updateIndicatorPosition, preset]);

	// ---- TOC Behavior ----
	const toggleItem = (itemId) => {
		setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
	};

	const toggleToc = () => {
		setIsTocExpanded(!isTocExpanded);
		togglePanelBody("collapsible");
	};

	// Icon maps
	const iconMap = {
		one: Icon1,
		two: Icon3,
		three: Icon5,
		four: isTocExpanded ? Icon8 : Icon7,
		five: isTocExpanded ? Icon10 : Icon9,
		six: Icon11,
		seven: isTocExpanded ? Icon14 : Icon13,
		eight: Icon15,
	};

	const TocItem = ({ item, depth = 0 }) => {
		const isExpanded = expandedItems.includes(item.id);
		const hasChildren = item.children?.length > 0;
		const isSelected = selectedItem === item.id;

		const childIconMap = {
			one: Icon1,
			two: Icon3,
			three: Icon5,
			four: isExpanded ? Icon8 : Icon7,
			five: isExpanded ? Icon10 : Icon9,
			six: Icon11,
			seven: isExpanded ? Icon14 : Icon13,
			eight: Icon15,
		};
		const ChildIconComponent = childIconMap[childCollapsibleIconSource] || null;

		// Store ref for this item
		const setItemRef = (element) => {
			if (element) {
				itemRefs.current[item.id] = element;
			}
		};

		return (
			<li
				ref={setItemRef}
				className={`sps-toc-item ${hasChildren ? "has-children" : ""}`}
				data-level={item.level}
				data-depth={depth}
				data-item-id={item.id}
			>
				<div
					className={`sps-toc-link-wrapper sps-toc-${tocAlignment} ${isSelected ? "sps-toc-selected-background" : ""}`}
				>
					<a
						href={`#${item.id}`}
						className={`sps-toc-link ${isSelected ? "sps-toc-link-selected" : ""}`}
						onClick={(e) => {
							e.preventDefault();
							// Log what we're setting as selected

							setSelectedItem(item.id);
							const headingElement = document.getElementById(item.id);
							if (headingElement) {
								headingElement.scrollIntoView({
									behavior: "smooth",
									block: "start",
								});
							}
						}}
					>
						{listStyle !== "none" && listStyle !== "bullet" ? (
							<span className="sps-toc-number"></span>
						) : null}
						<span className="sps-toc-text">{item.text}</span>
					</a>

					<div className="sps-toc-actions">
						{copyLink && (
							<button className="sps-toc-copy" title="Copy link" aria-label="Copy link to this section">
								#
							</button>
						)}

						{hasChildren && childItemCollapsible && (
							<button
								className="sps-toc-toggle"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									toggleItem(item.id);
								}}
								aria-label={isExpanded ? "Collapse section" : "Expand section"}
								aria-expanded={isExpanded}
							>
								<ChildIconComponent color={collapsibleColor.color} isTocExpanded={isExpanded} />
							</button>
						)}
					</div>
				</div>

				{hasChildren &&
					(childItemCollapsible ? (
						isExpanded && (
							<ul className="sps-toc-sublist">
								{item.children.map((child) => (
									<TocItem key={child.id} item={child} depth={depth + 1} />
								))}
							</ul>
						)
					) : (
						<ul className="sps-toc-sublist">
							{item.children.map((child) => (
								<TocItem key={child.id} item={child} depth={depth + 1} />
							))}
						</ul>
					))}
			</li>
		);
	};

	if (!headingItems.length) {
		return <p {...blockProps}>No headings found in this post for table of content.</p>;
	}

	const IconComponent = iconMap[CollapsibleIconSource] || null;

	return (
		<div {...blockProps} className="sps-toc-wrapper">
			<div className="sps-toc-header-row">
				<div onClick={() => togglePanelBody("heading")} className="sps-toc-header">
					<strong className="sps-toc-title">{tocHeading}</strong>
					{IconComponent &&
						collapsibleIconPosition === "besideTitle" &&
						CollapsibleButtonType === "icon" &&
						tocCollapsed && (
							<button
								className="sps-toc-main-toggle"
								onClick={toggleToc}
								aria-label={`${isTocExpanded ? "Collapse" : "Expand"} table of contents`}
								aria-expanded={isTocExpanded}
							>
								<IconComponent color={collapsibleColor.color} isTocExpanded={isTocExpanded} />
							</button>
						)}
				</div>
				{tocCollapsed && (
					<div className="sp-main-collapse-toggle">
						{(collapsibleIconPosition === "right" || CollapsibleButtonType !== "icon") && (
							<button
								className="sps-toc-main-toggle"
								onClick={toggleToc}
								aria-label={`${isTocExpanded ? "Collapse" : "Expand"} table of contents`}
								aria-expanded={isTocExpanded}
							>
								{CollapsibleButtonType === "icon"
									? IconComponent && (
											<IconComponent
												color={collapsibleColor.color}
												isTocExpanded={isTocExpanded}
											/>
										)
									: isTocExpanded
										? collapseText
										: expandText}
							</button>
						)}
					</div>
				)}
			</div>

			{isTocExpanded && (
				<div
					onClick={() => togglePanelBody("tocBody")}
					className={`sps-toc-container ${preset}`}
					ref={containerRef}
				>
					{["presetThree", "presetFour", "presetFive"].includes(preset) && (
						<div
							className="sps-toc-indicator"
							ref={indicatorRef}
							style={{
								top: `${indicatorStyle.top}px`,
								height: `${indicatorStyle.height}px`,
							}}
						/>
					)}
					<ul className={`sps-toc-list sps-toc-style-${listStyle}`}>
						{headingItems.map((heading) => (
							<TocItem key={heading.id} item={heading} depth={0} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
