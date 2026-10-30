/**
 * Constants for Smart Design Library
 */

// API Endpoints
export const API_ENDPOINTS = {
	PATTERNS: "/smart-post-show/v2/get_premade_patterns",
	WISHLIST: "/sp-smart-post/v2/save_wishlist_item",
	SINGLE_PATTERN: "https://demo.wpsmartpost.com/wp-json/smart-post/v1/single-pattern",
	UPGRADE_URL: "https://wpsmartpost.com/pricing/",
	SITES: "/sp-smart-post/v2/get-replace-pages",
	PAGE_DATA: "/sp-smart-post/v2/get-insert-page-data",
};

// CSS Classes
export const CSS_CLASSES = {
	MODAL: "sp-smart-builder-modal",
	POPUP_OPEN: "sp-smart-popup-open",
	TOOLBAR_LIBRARY: "sp-smart-toolbar-design-library",
	PATTERN_GRID: "sp-smart-pattern-grid",
	PATTERN_COL2: "sp-smart-pattern-col2",
	PATTERN_COL3: "sp-smart-pattern-col3",
};

// Default Values
export const DEFAULTS = {
	COLUMN: "3",
	SEARCH_QUERY: "",
	TREND: "default",
	FREE_PRO: "all",
	DEBOUNCE_DELAY: 200,
	SKELETON_COUNT: 25,
};

// Pattern Categories
export const PATTERN_CATEGORIES = [
	{ label: "All Blocks", value: "all" },
	{ label: "Post Grid 01", value: "post-grid-one" },
	{ label: "Post Grid 02", value: "post-grid-two" },
	{ label: "Post Grid 03", value: "post-grid-three" },
	{ label: "Post Grid 04", value: "post-grid-four" },
	{ label: "Post Grid 05", value: "post-grid-five" },
	{ label: "Post Grid 06", value: "post-grid-six" },
	{ label: "Post List 01", value: "post-list-one" },
	{ label: "Post List 02", value: "post-list-two" },
	{ label: "Post List 03", value: "post-list-three" },
	{ label: "Post Slider 01", value: "post-slider" },
	{ label: "Post Slider 02", value: "post-slider-two" },
	{ label: "Thumbnail Slider", value: "thumbnail-slider" },
	// { label: "Thumbnail Slider 02", value: "thumbnail-slider-two" },
	{ label: "Social Profiles", value: "social-profiles" },
	{ label: "Section Heading", value: "section-heading" },
	{ label: "Post Timeline 01", value: "post-timeline-one" },
	{ label: "Post Timeline 02", value: "post-timeline-two" },
	{ label: "Post Timeline 03", value: "post-timeline-three" },
	{ label: "News ticker", value: "news-ticker" },
	{ label: "Taxonomy", value: "taxonomy" },
	{ label: "Table of Contents", value: "table-of-content" },
	{ label: "Button Group", value: "buttons" },
];

// Keyboard Keys
export const KEYBOARD_KEYS = {
	ESCAPE: 27,
	ENTER: "Enter",
	SPACE: " ",
};

// Filter Options
export const FILTER_OPTIONS = {
	FREE_PRO: [
		{ value: "all", label: "All (Free / Pro)" },
		{ value: "free", label: "Free" },
		{ value: "pro", label: "Pro" },
	],
	TREND: [
		{ value: "default", label: "Sort By" },
		{ value: "popular", label: "Popular" },
		{ value: "latest", label: "Latest" },
	],
};
