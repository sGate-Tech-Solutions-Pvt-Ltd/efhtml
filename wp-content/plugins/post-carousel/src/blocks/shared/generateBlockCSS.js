// Import dynamic CSS generators
import sectionHeadingDynamicCSS from "../section-heading/dynamicCss";
import postCarouselDynamicCSS from "../post-carousel/dynamicCss";
import postSliderDynamicCSS from "../post-slider/dynamicCss";
import postSliderTwoDynamicCSS from "../post-slider-two/dynamicCss";
import postThumbnailDynamicCSS from "../thumbnail-slider/dynamicCss";
import postThumbnailTwoDynamicCSS from "../thumbnail-slider-two/dynamicCss";
import gridOneDynamicCSS from "../post-grid-one/dynamicCss";
import gridTwoDynamicCSS from "../post-grid-two/dynamicCss";
import gridThreeDynamicCSS from "../post-grid-three/dynamicCss";
import gridFourDynamicCSS from "../post-grid-four/dynamicCss";
import gridFiveDynamicCSS from "../post-grid-five/dynamicCss";
import gridSixDynamicCSS from "../post-grid-six/dynamicCss";
import listOneDynamicCSS from "../post-list-one/dynamicCss";
import listTwoDynamicCSS from "../post-list-two/dynamicCss";
import listThreeDynamicCSS from "../post-list-three/dynamicCss";
import timelineOneDynamicCSS from "../post-timeline-one/dynamicCss";
import timelineTwoDynamicCSS from "../post-timeline-two/dynamicCss";
import timelineThreeDynamicCSS from "../post-timeline-three/dynamicCss";
import containerDynamicCSS from "../container/dynamicCss";
import columnDynamicCSS from "../column/dynamicCss";
import socialProfilesDynamicCSS from "../social-profiles/dynamicCss";
import socialItemDynamicCSS from "../social-profile-item/dynamicCss";
import paginationDynamicCSS from "../pagination/dynamicCss";
import buttonsDynamicCSS from "../buttons/dynamicCss";
import buttonDynamicCSS from "../button/dynamicCss";
import taxonomyFilterDynamicCSS from "../taxonomy-filter/dynamicCss";
import authorFilterDynamicCSS from "../author-filter/dynamicCss";
import liveFilterDynamicCSS from "../live-filter/dynamicCss";
import smartSearchDynamicCss from "../smart-search/dynamicCss";
import taxonomyDynamicCSS from "../taxonomy/dynamicCss";
import NewsDynamicCssFn from "../news-ticker/dynamicCss";
import smartImageDynamicCSS from "../smart-image/dynamicCss";
import TocDynamicCss from "../table-of-content/dynamicCss";
import CarouselTwoDynamicCss from "../post-carousel-two/dynamicCss";
import smartInfoBoxDynamicCss from "../smart-info-box/dynamicCss";
import ListsDynamicCssFn from "../smart-lists/dynamicCss";
import ListDynamicCssFn from "../smart-list/dynamicCss";

// Create a block CSS generator mapping object
const blockCSSGenerators = {
	"sp-smart-post-show/section-heading": sectionHeadingDynamicCSS,
	"sp-smart-post-show/post-carousel": postCarouselDynamicCSS,
	"sp-smart-post-show/post-slider": postSliderDynamicCSS,
	"sp-smart-post-show/post-slider-two": postSliderTwoDynamicCSS,
	"sp-smart-post-show/thumbnail-slider": postThumbnailDynamicCSS,
	"sp-smart-post-show/thumbnail-slider-two": postThumbnailTwoDynamicCSS,
	"sp-smart-post-show/post-grid-one": gridOneDynamicCSS,
	"sp-smart-post-show/post-grid-two": gridTwoDynamicCSS,
	"sp-smart-post-show/post-grid-three": gridThreeDynamicCSS,
	"sp-smart-post-show/post-grid-four": gridFourDynamicCSS,
	"sp-smart-post-show/post-grid-five": gridFiveDynamicCSS,
	"sp-smart-post-show/post-grid-six": gridSixDynamicCSS,
	"sp-smart-post-show/post-list-one": listOneDynamicCSS,
	"sp-smart-post-show/post-list-two": listTwoDynamicCSS,
	"sp-smart-post-show/post-list-three": listThreeDynamicCSS,
	"sp-smart-post-show/post-timeline-one": timelineOneDynamicCSS,
	"sp-smart-post-show/post-timeline-two": timelineTwoDynamicCSS,
	"sp-smart-post-show/post-timeline-three": timelineThreeDynamicCSS,
	"sp-smart-post-show/container": containerDynamicCSS,
	"sp-smart-post-show/column": columnDynamicCSS,
	"sp-smart-post-show/social-profiles": socialProfilesDynamicCSS,
	"sp-smart-post-show/social-profile-item": socialItemDynamicCSS,
	"sp-smart-post-show/pagination": paginationDynamicCSS,
	"sp-smart-post-show/buttons": buttonsDynamicCSS,
	"sp-smart-post-show/button": buttonDynamicCSS,
	"sp-smart-post-show/news-ticker": NewsDynamicCssFn,
	"sp-smart-post-show/taxonomy-filter": taxonomyFilterDynamicCSS,
	"sp-smart-post-show/author-filter": authorFilterDynamicCSS,
	"sp-smart-post-show/live-filter": liveFilterDynamicCSS,
	// 'sp-smart-post-show/smart-post-parent': smartPostParentDynamicCSS,
	"sp-smart-post-show/taxonomy": taxonomyDynamicCSS,
	"sp-smart-post-show/smart-image": smartImageDynamicCSS,
	"sp-smart-post-show/smart-search": smartSearchDynamicCss,
	"sp-smart-post-show/table-of-content": TocDynamicCss,
	"sp-smart-post-show/post-carousel-two": CarouselTwoDynamicCss,
	"sp-smart-post-show/smart-info-box": smartInfoBoxDynamicCss,
	"sp-smart-post-show/smart-lists": ListsDynamicCssFn,
	"sp-smart-post-show/smart-list": ListDynamicCssFn,
};

/**
 * Central function to generate CSS for any block
 * @param   {string} blockName - The block name
 * @param   {Object} attributes - Block attributes
 * @param   {string} page - Context (editor/frontend)
 * @returns {string} Generated CSS
 */
const generateBlockCSS = (attributes, blockName, page = "frontend") => {
	const { uniqueId } = attributes;

	if (!uniqueId) {
		return "";
	}
	// Get the CSS generator function from the mapping object
	const cssGenerator = blockCSSGenerators[blockName];

	// If a generator exists for this block, call it
	if (cssGenerator && typeof cssGenerator === "function") {
		return cssGenerator(attributes, page);
	}

	// Return undefined for unknown blocks (no default CSS)
	return;
};

// Optional: Create a default export for convenience
export default generateBlockCSS;
