import { __ } from "@wordpress/i18n";
import { BgIcon, GradientIcon, Image, Video } from "../components/background/svgIcon";
import {
	ArrowMinimal,
	ArrowOutline,
	ArrowSolid,
	ChevronBold,
	ChevronBorderLine,
	ChevronOutline,
	ChevronSolid,
	DoubleChevron,
	DoubleChevronOutline,
	TriangleOutline,
} from "../icons/arrowIcons";
import {
	BottomSpaceIcon,
	GapHorizontalIcon,
	GapVerticalIcon,
	HorizontalAxisSpaceIcon,
	LeftSpaceIcon,
	LinkedIcon,
	RadiusAllIcon,
	RadiusBottomLeftIcon,
	RadiusBottomRightIcon,
	RadiusTopLeftIcon,
	RadiusTopRightIcon,
	RightSpaceIcon,
	TopSpaceIcon,
	VerticalAxisSpaceIcon,
} from "../icons/icons";

export const availableLargeContent = [
	"grid-one-layout-six",
	"grid-one-layout-six-updated",
	"grid-one-layout-seven",
	"grid-one-layout-eight",
	"grid-one-layout-nine",
];

export const skipItemsForGridTopSection = {
	"grid-one-layout-one": 0,
	"grid-one-layout-three": 2,
	"grid-one-layout-four": 2,
	"grid-one-layout-five": 0,
	"grid-one-layout-six": 3,
	"grid-one-layout-six-updated": 5,
	"grid-one-layout-seven": 5,
	"grid-one-layout-eight": 4,
	"grid-one-layout-nine": 4,
};

export const largeItemPosition = {
	"grid-one-layout-six": { left: 0, right: 2 },
	"grid-one-layout-six-updated": { left: 0, right: 4 },
	"grid-one-layout-seven": { left: 0, right: 3 },
	"grid-one-layout-eight": { left: 0, right: 1 },
	"grid-one-layout-nine": { left: 0, right: 2 },
};

export const openLinksOptions = [
	{
		label: "Select Details Page Link Type",
		value: "",
		disabled: "disabled",
	},
	{ label: "Current Tab", value: "current-tab" },
	{ label: "New Tab", value: "new-tab" },
	{ label: "Single Popup (Pro)", value: "single-popup", disabled: "disabled"},
	{ label: "Multi Popup (Pro)", value: "multi-popup", disabled: "disabled" },
];

export const orderByOptions = [
	{ label: "None", value: "all", type: "order_by" },
	{ label: "ID", value: "id", type: "order_by" },
	{ label: "Title", value: "title", type: "order_by" },
	{ label: "Published Date", value: "date", type: "order_by" },
	{ label: "Modified Date", value: "modified", type: "order_by" },
	{
		label: "Post In (Drag & Drop) Date",
		value: "post__in",
		type: "order_by",
	},
	{ label: "Post Slug", value: "name", type: "order_by" },
	{ label: "Post Type", value: "post_type", type: "order_by" },
	{ label: "Random", value: "rand", type: "order_by" },
	{ label: "Comment Count", value: "comment_count", type: "order_by" },
	{ label: "Menu Order", value: "menu_order", type: "order_by" },
	{ label: "Author", value: "author", type: "order_by" },
	{ label: "Most Liked (Pro)", value: "most_liked", type: "order_by", disabled: "disabled" },
	{ label: "Most Viewed (Pro)", value: "most_viewed", type: "order_by", disabled: "disabled" },
];

export const orderDirectionOptions = [
	{ label: "Default", value: "all", type: "order" },
	{ label: "Ascending", value: "ASC", type: "order" },
	{ label: "Descending", value: "DESC", type: "order" },
];

export const tagNameObj = {
	button: {
		parent: "div",
		child: "button",
	},
	radio: {
		parent: "div",
		child: "radio",
	},
	dropdown: {
		parent: "div",
		child: "div",
	},
};

export const skipItemsForGridThreeTopSection = {
	"grid-three-layout-one": 2,
	"grid-three-layout-two": 2,
	"grid-three-layout-three": 1,
	"grid-three-layout-four": 0,
	"grid-three-layout-five": 3,
};

export const skipItemsForGridFourTopSection = {
	"grid-four-layout-one": 5,
	"grid-four-layout-two": 5,
	"grid-four-layout-three": 5,
	"grid-four-layout-four": 4,
	"grid-four-layout-five": 4,
	"grid-four-layout-six": 3,
};

export const gridFourLargeItemPosition = {
	"grid-four-layout-one": 1,
	"grid-four-layout-two": 0,
	"grid-four-layout-three": 2,
	"grid-four-layout-four": 0,
	"grid-four-layout-five": 0,
	"grid-four-layout-six": 0,
};

export const gradientOverlayColor = {
	"warm-sunset": "linear-gradient(2deg, rgba(244, 66, 70, 0.40) 33.02%, rgba(221, 36, 118, 0.40) 98.51%)",
	"ocean-breeze": "linear-gradient(1deg, rgba(43, 88, 118, 0.40) 0.5%, rgba(78, 67, 118, 0.40) 99.51%)",
	"royal-gold": "linear-gradient(1deg, rgba(255, 215, 0, 0.40) 0.5%, rgba(184, 134, 11, 0.40) 99.51%)",
	"cool-blues": "linear-gradient(1deg, rgba(30, 60, 114, 0.40) 0.5%, rgba(42, 82, 152, 0.40) 99.51%)",
	"soft-pastel": "linear-gradient(1deg, rgba(252, 227, 138, 0.40) 0.5%, rgba(243, 129, 129, 0.40) 99.51%)",
	"elegant-purple": "linear-gradient(180deg, rgba(65, 41, 90, 0.40) 0%, rgba(47, 7, 67, 0.40) 100%)",
	"energetic-orange": "linear-gradient(180deg, rgba(255, 81, 47, 0.40) 0%, rgba(240, 152, 25, 0.40) 100%)",
};

export const boxShadowDefault = [
	{ label: "XS — Subtle (1dp)", value: "xs—subtle-1dp" },
	{ label: "S — Light (2dp)", value: "s-light-2dp" },
	{ label: "M — Medium (4dp)", value: "m-medium-4dp" },
	{ label: "L — Strong (8dp)", value: "l-strong-8dp" },
	{ label: "XL — Deep (12dp)", value: "xl-deep-12dp" },
	{ label: "Card Shadow — 4dp", value: "card-shadow-4dp" },
	{ label: "Card Shadow — 8dp", value: "card-shadow-8dp" },
	{ label: "Button Shadow — 1dp", value: "button-shadow-1dp" },
	{ label: "Button Shadow — 2dp", value: "button-shadow-2dp" },
	{ label: "Button Shadow — 4dp", value: "button-shadow-4dp" },
	{ label: "Custom", value: "custom" },
];

export const boxShadowDefaultValueAttr = {
	"xs—subtle-1dp": {
		top: 0,
		right: 1,
		bottom: 2,
		left: 0,
		color: " rgba(0, 0, 0, 0.12)",
	},
	"s-light-2dp": {
		top: 0,
		right: 2,
		bottom: 4,
		left: 0,
		color: "rgba(0, 0, 0, 0.14)",
	},
	"m-medium-4dp": {
		top: 0,
		right: 4,
		bottom: 6,
		left: 0,
		color: "rgba(0, 0, 0, 0.16)",
	},
	"l-strong-8dp": {
		top: 0,
		right: 8,
		bottom: 10,
		left: 0,
		color: "rgba(0, 0, 0, 0.18)",
	},
	"xl-deep-12dp": {
		top: 0,
		right: 12,
		bottom: 17,
		left: 0,
		color: "rgba(0, 0, 0, 0.20)",
	},
	"card-shadow-4dp": {
		top: 0,
		right: 4,
		bottom: 6,
		left: 0,
		color: "rgba(0, 0, 0, 0.16)",
	},
	"card-shadow-8dp": {
		top: 0,
		right: 8,
		bottom: 10,
		left: 0,
		color: "rgba(0, 0, 0, 0.18)",
	},
	"button-shadow-1dp": {
		top: 0,
		right: 1,
		bottom: 2,
		left: 0,
		color: "rgba(0, 0, 0, 0.12)",
	},
	"button-shadow-2dp": {
		top: 0,
		right: 2,
		bottom: 4,
		left: 0,
		color: "rgba(0, 0, 0, 0.14)",
	},
	"button-shadow-4dp": {
		top: 0,
		right: 4,
		bottom: 6,
		left: 0,
		color: "rgba(0, 0, 0, 0.16)",
	},
};

export const paginationDotsStyle = {
	dots: { width: 12, height: 12 },
	dynamic: { width: 12, height: 12 },
	strokes: { width: 12, height: 12 },
	scrollbar: { width: "", height: 8 },
	fraction: { width: 36, height: 12 },
	numbers: { width: 24, height: 24 },
};

export const imageBlandMode = [
	{
		label: __("No Bland", "post-carousel"),
		value: "normal",
	},
	{
		label: __("Multiply", "post-carousel"),
		value: "multiply",
	},
	{
		label: __("Screen", "post-carousel"),
		value: "screen",
	},
	{
		label: __("Overlay", "post-carousel"),
		value: "overlay",
	},
	{
		label: __("Darken", "post-carousel"),
		value: "darken",
	},
	{
		label: __("Lighten", "post-carousel"),
		value: "lighten",
	},
	{
		label: __("Color Dodge", "post-carousel"),
		value: "color-dodge",
	},
	{
		label: __("Saturation", "post-carousel"),
		value: "saturation",
	},
	{
		label: __("Color", "post-carousel"),
		value: "color",
	},
	{
		label: __("Luminosity", "post-carousel"),
		value: "luminosity",
	},
	{
		label: __("Difference", "post-carousel"),
		value: "difference",
	},
	{
		label: __("Exclusion", "post-carousel"),
		value: "exclusion",
	},
	{
		label: __("Hue", "post-carousel"),
		value: "hue",
	},
];

export const overlayTypeItems = [
	{
		label: __("No Overlay", "post-carousel"),
		value: "no-overlay",
	},
	{
		label: __("Solid", "post-carousel"),
		value: "solid-overlay",
	},
	{
		label: __("Gradient", "post-carousel"),
		value: "gradient-overlay",
	},
];
export const allBgType = [
	{
		label: <BgIcon />,
		value: "bgColor",
		tooltip: "Solid",
	},
	{
		label: <GradientIcon />,
		value: "gradient",
		tooltip: "Gradient",
	},
	{
		label: <Image />,
		value: "image",
		tooltip: "Image",
	},
	{
		label: <Video />,
		value: "video",
		tooltip: "Video",
	},
];
export const excludeVideoBgType = [
	{
		label: <BgIcon />,
		value: "bgColor",
		tooltip: "Solid",
	},
	{
		label: <GradientIcon />,
		value: "gradient",
		tooltip: "Gradient",
	},
	{
		label: <Image />,
		value: "image",
		tooltip: "Image",
	},
];
export const solidGradientBgType = [
	{
		label: <BgIcon />,
		value: "bgColor",
		tooltip: "Solid",
	},
	{
		label: <GradientIcon />,
		value: "gradient",
		tooltip: "Gradient",
	},
];

export const arrowIcons = {
	"chevron-solid": ChevronSolid,
	"chevron-outline": ChevronOutline,
	"chevron-bold": ChevronBold,
	"double-chevron": DoubleChevron,
	"arrow-solid": ArrowSolid,
	"arrow-outline": ArrowOutline,
	"arrow-minimal": ArrowMinimal,
	"chevron-border-line": ChevronBorderLine,
	"double-chevron-outline": DoubleChevronOutline,
	"triangle-outline": TriangleOutline,
};

export const blockPreviewPanelLink = {
	"post-carousel": "https://wpsmartpost.com/blocks/#demoId3514",
	"post-carousel-two": "https://wpsmartpost.com/blocks/#demoId3516",
	"news-ticker": "https://wpsmartpost.com/blocks/#demoId3568",
	"post-slider": "https://wpsmartpost.com/blocks/#demoId3490",
	"post-slider-two": "https://wpsmartpost.com/blocks/#demoId3493",
	"post-thumbnail-slider": "https://wpsmartpost.com/blocks/#demoId3570",
	"thumbnail-slider-two": "https://wpsmartpost.com/blocks/#demoId3572",
	"post-grid-one": "https://wpsmartpost.com/blocks/#demoId3497",
	"post-grid-two": "https://wpsmartpost.com/blocks/#demoId3504",
	"post-grid-three": "https://wpsmartpost.com/blocks/#demoId3505",
	"post-grid-four": "https://wpsmartpost.com/blocks/#demoId3506",
	"post-grid-five": "https://wpsmartpost.com/blocks/#demoId3507",
	"post-grid-six": "https://wpsmartpost.com/blocks/#demoId3508",
	"post-list-one": "https://wpsmartpost.com/blocks/#demoId3509",
	"post-list-two": "https://wpsmartpost.com/blocks/#demoId3511",
	"post-list-three": "https://wpsmartpost.com/blocks/#demoId3520",
	"post-timeline-one": "https://wpsmartpost.com/blocks/#demoId3522",
	"post-timeline-two": "https://wpsmartpost.com/blocks/#demoId3524",
	"post-timeline-three": "https://wpsmartpost.com/blocks/#demoId3526",
	"social-profiles": "https://wpsmartpost.com/blocks/#demoId3528",
	buttons: "https://wpsmartpost.com/blocks/#demoId3588",
	button: "https://wpsmartpost.com/blocks/#demoId3588",
	taxonomy: "https://wpsmartpost.com/blocks/#demoId3604",
	"section-heading": "https://wpsmartpost.com/blocks/#demoId3586",
	"smart-info-box": "https://wpsmartpost.com/blocks/#demoId3590",
	"table-of-content": "https://wpsmartpost.com/blocks/#demoId3602",
	"smart-image": "https://wpsmartpost.com/blocks/#demoId3584",
	"smart-search": "https://wpsmartpost.com/blocks/#demoId3596",
	"smart-lists": "https://wpsmartpost.com/blocks/#demoId3592",
	// container: "https://wpsmartpost.com/blocks/#demoId3580", // currently turn off as recommendation.
};

export const blockDocLink = {
	"post-carousel": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/post-carousel-01/",
	"post-carousel-two": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/post-carousel-02/",
	"news-ticker": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/news-ticker/",
	"post-slider": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/post-slider-01/",
	"post-slider-two": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/post-slider-02/",
	"post-thumbnail-slider": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/thumbnails-slider-01/",
	"thumbnail-slider-two": "https://wpsmartpost.com/docs/post-carousel-slider-blocks/thumbnails-slider-02/",
	"post-grid-one": "https://wpsmartpost.com/docs/post-grid-blocks/post-grid-01/",
	"post-grid-two": "https://wpsmartpost.com/docs/post-grid-blocks/post-grid-02/",
	"post-grid-three": "https://wpsmartpost.com/docs/post-grid-blocks/post-grid-03/",
	"post-grid-four": "https://wpsmartpost.com/docs/post-grid-blocks/post-grid-04/",
	"post-grid-five": "https://wpsmartpost.com/docs/post-grid-blocks/post-grid-05/",
	"post-grid-six": "https://wpsmartpost.com/docs/post-grid-blocks/post-grid-06/",
	"post-list-one": "https://wpsmartpost.com/docs/post-list-blocks/post-list-01/",
	"post-list-two": "https://wpsmartpost.com/docs/post-list-blocks/post-list-02/",
	"post-list-three": "https://wpsmartpost.com/docs/post-list-blocks/post-list-03/",
	"post-timeline-one": "https://wpsmartpost.com/docs/post-timeline-blocks/post-timeline-01/",
	"post-timeline-two": "https://wpsmartpost.com/docs/post-timeline-blocks/post-timeline-02/",
	"post-timeline-three": "https://wpsmartpost.com/docs/post-timeline-blocks/post-timeline-03/",
	"social-profiles": "https://wpsmartpost.com/docs/social-profiles/",
	"social-profile-item": "https://wpsmartpost.com/docs/social-profiles/",
	buttons: "https://wpsmartpost.com/docs/smart-button/",
	button: "https://wpsmartpost.com/docs/smart-button/",
	taxonomy: "https://wpsmartpost.com/docs/taxonomy/",
	container: "https://wpsmartpost.com/docs/container/",
	column: "https://wpsmartpost.com/docs/container/",
	"section-heading": "https://wpsmartpost.com/docs/section-heading/",
	"live-filter": "https://wpsmartpost.com/docs/smart-frontend-filter/",
	pagination: "https://wpsmartpost.com/docs/smart-pagination/",
	"smart-image": "https://wpsmartpost.com/docs/smart-image/",
	"smart-info-box": "https://wpsmartpost.com/docs/smart-info-box/",
	"table-of-content": "https://wpsmartpost.com/docs/table-of-contents-toc/",
	"smart-search": "https://wpsmartpost.com/docs/smart-search/",
	"smart-lists": "https://wpsmartpost.com/docs/smart-list/",
};
export const sideAxisIcons = {
	horizontal: <HorizontalAxisSpaceIcon />,
	vertical: <VerticalAxisSpaceIcon />,
	top: <TopSpaceIcon />,
	right: <RightSpaceIcon />,
	bottom: <BottomSpaceIcon />,
	left: <LeftSpaceIcon />,
	all: <LinkedIcon />,
	"radius-top": <RadiusTopLeftIcon />,
	"radius-right": <RadiusTopRightIcon />,
	"radius-bottom": <RadiusBottomRightIcon />,
	"radius-left": <RadiusBottomLeftIcon />,
	"radius-all": <RadiusAllIcon />,
	"gap-horizontal": <GapHorizontalIcon />,
	"gap-vertical": <GapVerticalIcon />,
};
export const shadowTypes = [
	{
		id: "xs-subtle-1dp",
		name: "Subtle (1dp)",
		style: { boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.12)" },
	},
	{
		id: "s-light-2dp",
		name: "Light (2dp)",
		style: { boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.14)" },
	},
	{
		id: "m-medium-4dp",
		name: "Medium (4dp)",
		style: {
			boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.16)",
		},
	},
	{
		id: "l-strong-8dp",
		name: "Strong (8dp)",
		style: {
			boxShadow: "0 8px 10px 0 rgba(0, 0, 0, 0.18)",
		},
	},
	{
		id: "xl-deep-12dp",
		name: "Deep (12dp)",
		style: {
			boxShadow: "0 12px 17px 0 rgba(0, 0, 0, 0.20)",
		},
	},
	{
		id: "2xl",
		name: "SHARP (4dp)",
		style: { boxShadow: "6px 6px 0 0 rgba(0, 0, 0, 0.25)" },
	},
];
export const boxShadowDefaultValue = {
	"xs-subtle-1dp": {
		top: 0,
		right: 1,
		bottom: 2,
		left: 0,
		color: "rgba(0, 0, 0, 0.12)",
	},
	"s-light-2dp": {
		top: 0,
		right: 2,
		bottom: 4,
		left: 0,
		color: "rgba(0, 0, 0, 0.14)",
	},
	"m-medium-4dp": {
		top: 0,
		right: 4,
		bottom: 6,
		left: 0,
		color: "rgba(0, 0, 0, 0.16)",
	},
	"l-strong-8dp": {
		top: 0,
		right: 8,
		bottom: 10,
		left: 0,
		color: "rgba(0, 0, 0, 0.18)",
	},
	"xl-deep-12dp": {
		top: 0,
		right: 12,
		bottom: 17,
		left: 0,
		color: "rgba(0, 0, 0, 0.20)",
	},
	"2xl": {
		top: 6,
		right: 6,
		bottom: 0,
		left: 0,
		color: "rgba(0, 0, 0, 0.25)",
	},
};

export const WEBSITE_BUILDER_BLOCKS = [
	"archive-title",
	"post-title",
	"post-featured-image",
	"post-content",
	"post-excerpt",
	"post-meta",
	"post-category",
	"smart-post-tag",
	"post-author-meta",
	"post-reading-time",
	"post-like-count",
	"post-view-count",
	"post-next-previous",
	"post-comment-count",
	"post-author-box",
	"post-date-meta",
	"post-breadcrumbs",
	"post-social-share",
	"post-comment",
];
