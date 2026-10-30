import { useSelect, select } from "@wordpress/data";
import { useEffect, useRef, useState } from "@wordpress/element";
import axios from "axios";
import { colorControls, convertToClassName } from "../blocks/shared/helpFn";

// Device type fn.
export const useDeviceType = () => {
	const { deviceType } = useSelect((select) => {
		const coreEditor = select("core/editor");

		// Old WP (5.9) → fallback
		if (!coreEditor?.getDeviceType) {
			return { deviceType: "Desktop" };
		}

		// New WP (6.2+) → use core API
		return { deviceType: coreEditor.getDeviceType() };
	}, []);
	return deviceType || "Desktop";
};

export const cssString = (css) => {
	let result = "";
	for (const selector in css) {
		let cssProps = "";
		for (const property in css[selector]) {
			if (css[selector][property] && css[selector][property].length > 0) {
				cssProps += property + ":" + css[selector][property] + ";";
			}
		}
		result += "" !== cssProps ? selector + "{" + cssProps + "}" : "";
	}
	return result;
};

// this function create for capitalize any strings first word.
export const capitalizeString = (name) => {
	if (name === "post_format") {
		return "Post_Format";
	}
	return name.charAt(0).toUpperCase() + name.slice(1);
};

// this function accept an random array, one label key and value key and return a array of objects that use for select fields options.
export const filterSelectOptions = (dataArray, labelKey, valueKey, indexKey = false) => {
	const selectFieldData = dataArray?.map((data, index) => {
		return {
			id: indexKey ? data[indexKey] : index,
			label: data[labelKey],
			value:
				"number" === typeof data[valueKey] ? data[valueKey] : data[valueKey].replace(/\s+/g, "_").toLowerCase(),
		};
	});
	return selectFieldData;
};

// Calculate time ago (Human Readable) for metadata.
export const humanReadableTimeAgo = (postDate) => {
	const dateNow = new Date();
	const secondsPast = Math.floor((dateNow.getTime() - parseInt(postDate.getTime())) / 1000);

	if (secondsPast < 60) {
		return `${secondsPast} seconds ago`;
	}
	if (secondsPast < 3600) {
		const minutes = Math.floor(secondsPast / 60);
		return `${minutes} minutes ago`;
	}
	if (secondsPast < 86400) {
		const hours = Math.floor(secondsPast / 3600);
		return `${hours} hours ago`;
	}
	if (secondsPast < 604800) {
		// 30 days
		const days = Math.floor(secondsPast / 86400);
		return `${days} days ago`;
	}
	if (secondsPast < 2592000) {
		// 30 days
		const weeks = Math.floor(secondsPast / 604800);
		return `${weeks} weeks ago`;
	}
	if (secondsPast < 31536000) {
		// 365 days
		const months = Math.floor(secondsPast / 2592000);
		return `${months} months ago`;
	}
	const years = Math.floor(secondsPast / 31536000);
	return `${years} years ago`;
};

// Strip Gutenberg Comments for metadata reading time.
export const stripGutenbergComments = (content) => {
	// Remove gutenberg comments.
	content = content.replace(/<!-- wp:.*? -->/g, "");
	content = content.replace(/<!-- \/wp:.*? -->/g, "");

	// Remove HTML Tag.
	content = content.replace(/<\/?[^>]+(>|$)/g, "");

	return content.trim();
};

// Count total word and character of the content.
export const countWordAndCharacter = (content) => {
	const text = stripGutenbergComments(content).trim();
	const characterCount = text.length;
	const wordCount = text.split(/\s+/).filter(Boolean).length;
	return {
		words: wordCount,
		chars: characterCount,
	};
};

export const filterDndSelectValues = (values) => {
	const updatedValues = Array.isArray(values) && values?.map((val) => val.value);
	return updatedValues;
};

export const filteredTaxonomiesValues = (taxonomies) => {
	const filteredTaxonomy = taxonomies?.map((taxonomy) => {
		return { ...taxonomy, value: filterDndSelectValues(taxonomy?.value) };
	});
	return filteredTaxonomy;
};

export const findDataFromArray = (itemsArray, firstKey, secondKey) => {
	const result = itemsArray?.find((f) => f[firstKey] === secondKey);
	return result;
};

export const unit = (attributes, deviceType) => {
	if ("object" !== typeof attributes.unit) {
		return attributes.unit || "";
	}
	return attributes.unit?.[deviceType];
};

export const filterActivatedAjaxLiveFilter = (liveFilters) => {
	return liveFilters.filter(
		(liveFilter) => liveFilter?.ajaxLiveOderDirect === true && liveFilter.value !== "keywordSearch"
	);
};

export const getMediaUrlFromContent = (tags, content) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(content, "text/html");
	const contentImages = doc.querySelectorAll("img");

	if (tags === "img_gallery_in_post_content" && contentImages.length > 0) {
		return Array.from(contentImages)?.map((el) => ({ source_url: el.src }));
	} else if (Array.isArray(tags)) {
		const values = tags.map((tag) => {
			const element = doc.querySelector(tag);
			return element ? { type: tag, url: element.src } : null;
		});

		const filterValues = values.filter((val) => val);
		return filterValues.length > 0 ? filterValues[0] : null;
	}

	return null;
};

export const debounce = (func, delay) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

export const getMediaUrl = (attachment, attributes) => {
	const { attachment_metadata, content, attachment_url } = attachment;
	const {
		imageReplaceWith,
		imageFallbackReplace,
		toggleCustomFallbackBg,
		imageReplaceWithImage,
		imageReplaceWithVideo,
		post_thumbnail_url,
		imageGallerySource,
	} = attributes;

	const sourceImages =
		"img_gallery_in_post_content" === imageGallerySource
			? getMediaUrlFromContent("img_gallery_in_post_content", content)
			: [];

	let metadataImgUrl = "";
	let mediaFromContent = {};
	if (post_thumbnail_url) {
		metadataImgUrl = post_thumbnail_url;
	} else if (!attachment_metadata && imageFallbackReplace === "source") {
		const replaceWith = imageReplaceWith?.length > 0 ? imageReplaceWith : ["img", "video", "audio"];
		mediaFromContent = getMediaUrlFromContent(replaceWith, content);
		sourceImages?.shift();
	} else if (!attachment_metadata && imageFallbackReplace === "custom") {
		const items = {
			img: {
				type: "img",
				url: imageReplaceWithImage?.url,
			},
			video: {
				type: "video",
				url: imageReplaceWithVideo?.url,
			},
		};
		mediaFromContent = items[toggleCustomFallbackBg];
	} else if (!metadataImgUrl && attachment_url) {
		metadataImgUrl = attachment_url;
	}
	return { mediaUrl: metadataImgUrl, mediaFromContent, sourceImages };
};

export const uniqueIdToClientId = (uniqueId, blockName) => {
	const removeSlice = `sp-smart-${blockName}-`;
	return uniqueId?.replace(removeSlice, "");
};

export const getPaginationUniqueId = (uniqueId, blockName) => {
	const clientId = uniqueIdToClientId(uniqueId, blockName);
	const paginationUniqueId = `sp-smart-post-show-pagination-${clientId}`;
	return paginationUniqueId;
};

const accordionStore = {
	get: () => localStorage.getItem("sp-opened-accordion"),
	set: (e) => localStorage.setItem("sp-opened-accordion", e),
};

export const manageOpenAccordion = () => {
	const [openedAccordion, setOpenAccordion] = useState(accordionStore.get());

	const togglePanelBody = (val) => {
		if (openedAccordion === val) {
			setOpenAccordion("");
			accordionStore.set("");
		} else {
			setOpenAccordion(val);
			accordionStore.set(val);
		}
	};

	return { togglePanelBody, openedAccordion };
};

export const useHandleScroll = () => {
	const [height, setHeight] = useState();
	const [heightUnit, setHeightUnit] = useState("px");
	const ref = useRef(null);
	let newHeight = 0;

	const handleScroll = (e) => {
		e.defaultPrevent;
		const scrollPosition = window.scrollY + 200;
		const elementPosition = ref.current?.getBoundingClientRect().top + window.scrollY;

		if (ref.current?.getBoundingClientRect().bottom - 518 < 0) {
			setHeightUnit("%");
			setHeight(100);
		} else {
			setHeightUnit("px");
		}

		if (scrollPosition > elementPosition && ref.current?.getBoundingClientRect().bottom - 518 > 0) {
			newHeight = scrollPosition + 320 - elementPosition;
			setHeight(newHeight);
		}
	};
	window.addEventListener("scroll", handleScroll);
	return { height, heightUnit, ref };
};

export const queryFn = async (data) => {
	const response = await axios.post(sp_smart_post_block_localize.ajaxUrl, data);
	return response.data;
};

///
// Create css link for responsive device,
export const createCssLink = (Id, linkId, href) => {
	// Tablet / Mobile Starts.
	const tabletPreview = document.getElementsByClassName("is-tablet-preview");
	const mobilePreview = document.getElementsByClassName("is-mobile-preview");
	const canvas = document.getElementsByClassName("edit-site-visual-editor__editor-canvas");

	if (0 !== tabletPreview.length || 0 !== mobilePreview.length || 0 !== canvas.length) {
		const preview = tabletPreview[0] || mobilePreview[0] || canvas[0];

		let iframe = false;

		if (preview) {
			iframe = preview.getElementsByTagName("iframe")[0];
			if (0 !== canvas.length) {
				iframe = preview;
			}
		}

		const IframeDocument = iframe?.contentWindow.document || iframe?.contentDocument;

		linkId = IframeDocument.getElementById(linkId);

		if (null === linkId || undefined === linkId) {
			const $link = document.createElement("link");
			$link.setAttribute("id", Id);
			$link.setAttribute("href", href);
			$link.setAttribute("media", "all");
			$link.setAttribute("rel", "stylesheet");

			IframeDocument.head.appendChild($link);
		}
	}
};

// Create js link for responsive device,
export const createJsLink = (Id, linkId, href) => {
	// Tablet / Mobile Starts.
	const tabletPreview = document.getElementsByClassName("is-tablet-preview");
	const mobilePreview = document.getElementsByClassName("is-mobile-preview");
	const canvas = document.getElementsByClassName("edit-site-visual-editor__editor-canvas");

	if (0 !== tabletPreview.length || 0 !== mobilePreview.length || 0 !== canvas.length) {
		const preview = tabletPreview[0] || mobilePreview[0] || canvas[0];

		let iframe = false;

		if (preview) {
			iframe = preview.getElementsByTagName("iframe")[0];
			if (0 !== canvas.length) {
				iframe = preview;
			}
		}

		const IframeDocument = iframe?.contentWindow.document || iframe?.contentDocument;

		linkId = IframeDocument.getElementById(linkId);

		if (null === linkId || undefined === linkId) {
			const $link = document.createElement("script");
			$link.setAttribute("id", Id);
			$link.setAttribute("src", href);
			$link.setAttribute("type", "text/javascript");

			IframeDocument.body.appendChild($link);
		}
	}
};
// path edit fn.
const shortUniqueId = (uniqueId) => {
	return uniqueId.slice(uniqueId.length - 8, uniqueId.length);
};

export const spSplit = (data, splitBy) => {
	return data?.split([splitBy]);
};

export const inArray = (array, value) => {
	return array.includes(value);
};

export const useSPLocation = (id) => {
	const { search } = window.location;
	const liveFilterArray = ["author", "order_by", "order"];
	let queries = {};
	let keywordSearchFromUrl = "";
	let queriesArray = [];

	if (!search || !inArray(search, shortUniqueId(id))) {
		return { queries, keywordSearchFromUrl };
	}
	const searchArrayFromUrl = spSplit(search, "&&");
	const keywordSearch = spSplit(searchArrayFromUrl[searchArrayFromUrl.length - 1], "=");
	queriesArray = spSplit(spSplit(searchArrayFromUrl[1], "+")[1], "&");
	keywordSearchFromUrl = keywordSearch[0] === "search" ? decodeURIComponent(keywordSearch[1]) : "";

	queriesArray?.forEach((query) => {
		const queryKeyName = spSplit(query, "=")[0];
		const queryValueName = spSplit(query, "=")[1];
		const categoryName = inArray(liveFilterArray, queryKeyName) ? undefined : queryKeyName;
		const type = inArray(liveFilterArray, queryKeyName) ? queryKeyName : "taxonomy";
		const label = categoryName ? categoryName : type;
		const id =
			inArray(["order", "order_by"], type) || queryValueName === "all"
				? queryValueName
				: parseInt(queryValueName);

		queries = {
			...queries,
			[label]: { id, type, taxonomy_type: categoryName },
		};
	});
	return { queries, keywordSearchFromUrl };
};

export const setSPCustomPath = ({ uniqueId, queries, keywordSearch }) => {
	const id = shortUniqueId(uniqueId);
	const allQueries = Object.values(queries)?.filter((query) => query.id !== "all");

	const filter = allQueries?.reduce((acc, { id, type, taxonomy_type }, index) => {
		return `${acc}${index === 0 ? "" : "&"}${taxonomy_type ? taxonomy_type : type}=${id}`;
	}, "");

	const query = `?sps=${id}${filter.length > 0 ? `&&filter+${filter}` : ""}${
		keywordSearch.length > 0 ? `&&search=${keywordSearch}` : ""
	}`;
	const baseUrl = window.location.pathname;
	const url = filter.length > 0 || keywordSearch.length > 0 ? query : baseUrl;
	history.pushState({}, "", url);
};

export const breakpoint = () => {
	if (typeof select("core/edit-site") !== "undefined" || typeof select("core/editor") !== "undefined") {
		return useDeviceType();
	}

	let breakpoints = {
		"(min-width: 1024px)": "Desktop",
		"(min-width: 600px) and (max-width: 1023.98px)": "Tablet",
		"(min-width: 0px) and (max-width: 599.98px)": "Mobile",
	};

	for (let media in breakpoints) {
		if (window.matchMedia(media).matches) {
			return breakpoints[media];
		}
	}

	return "Desktop";
};

export const paginationDotType = (swiperDotsRef, type, uniqueId = "") => {
	const carousel_id = uniqueId ? `#${uniqueId}` : "";
	const paginationDotStyle = {
		dots: {
			el: swiperDotsRef?.current || `${carousel_id} .sp-pagination-horizontal`,
			clickable: true,
		},
		strokes: {
			el: swiperDotsRef?.current || `${carousel_id} .sp-pagination-horizontal`,
			clickable: true,
		},
		dynamic: {
			el: swiperDotsRef?.current || `${carousel_id} .sp-pagination-horizontal`,
			dynamicBullets: true,
			clickable: true,
		},
		fraction: {
			el: swiperDotsRef?.current || `${carousel_id} .sp-pagination-horizontal`,
			type: "fraction",
		},
		numbers: {
			el: swiperDotsRef?.current || `${carousel_id} .sp-pagination-horizontal`,
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
			paginationType: "number",
		},
		scrollbar: false,
	};

	return paginationDotStyle[type];
};

export const maxValueFromObject = (objName) => {
	const newArray = Object.values(objName);
	const arrayOfNumbers = newArray.map((value) => (value === "" ? 0 : Number(value)));
	return Math.max(...arrayOfNumbers);
};

export const swiperPaddingForBoxShadow = (normalBool, normalObj, hoverBool, hoverObj) => {
	const normalValue = normalBool ? maxValueFromObject(normalObj) || 0 : 0;
	const hoverValue = hoverBool ? maxValueFromObject(hoverObj) || 0 : 0;

	const maxValue = Math.max(normalValue, hoverValue);

	return `0 ${maxValue}px ${maxValue}px`;
};

export const classNameDeviceType = (
	property,
	pValue,
	deviceType,
	currentScreen = "Desktop",
	page = "editor",
	important = false,
	extraClass = false,
	customUnit = ""
) => {
	const devicePrefix = {
		Desktop: "",
		Tablet: "md",
		Mobile: "sm",
	};
	const classNamePrefix = {
		"font-size": "font",
		"letter-spacing": "ls",
		"line-height": "lh",
		height: "h",
		width: "w",
		"column-gap": "c-gap",
		gap: "gap",
		top: "vertical",
		left: "horizontal",
	};

	const deviceValue = pValue?.device?.[deviceType];
	const classNameValue = typeof deviceValue === "object" && side ? deviceValue?.[side] : deviceValue;

	if (classNameValue == null || !classNamePrefix[property]) {
		console.warn(`Invalid inputs: property=${property}, deviceType=${deviceType}, pValue=`, pValue);
		return null;
	}

	const unit = customUnit ? customUnit : pValue?.unit?.[deviceType] || "";
	const endTag = extraClass && extraClass === "meta-svg" ? " svg" : "";
	const importantText =
		page === "editor" ? (deviceType.includes(currentScreen) ? " !important" : "") : important ? " !important" : "";
	const finalValue = `${classNameValue}${unit}${importantText}`;
	const suffix = devicePrefix[deviceType];

	return ![undefined, null].includes(classNameValue)
		? {
				class: `.sp-${extraClass ? `${extraClass}-` : ""}${classNamePrefix[property]}${
					suffix ? `-${suffix}` : ""
				}-${convertToClassName(classNameValue.toString() + unit)}${endTag}`,
				property,
				value: finalValue,
			}
		: {};
};

export const buildFontClasses = (property, value, extraClass = false, customUnit = "") => {
	const deviceSuffixes = {
		Desktop: "",
		Mobile: "sm",
		Tablet: "md",
	};

	// Abbreviations for CSS properties
	const propertyAbbreviations = {
		"font-size": "font",
		"letter-spacing": "ls",
		"line-height": "lh",
		height: "h",
		width: "w",
		"column-gap": "c-gap",
		gap: "gap",
		top: "vertical",
		left: "horizontal",
	};

	const shortProperty = propertyAbbreviations[property] || property;

	return Object.keys(deviceSuffixes).reduce((classes, device) => {
		const suffix = deviceSuffixes[device];

		// Ensure 0 is a valid value by explicitly checking for undefined or null
		if (value?.device?.[device] !== "" && (value?.unit?.[device] !== "" || customUnit)) {
			const className = `sp${extraClass ? `-${extraClass}` : ""}-${shortProperty}${
				suffix ? `-${suffix}` : ""
			}-${convertToClassName(value.device?.[device] + (customUnit ? customUnit : value?.unit?.[device]))}`;
			classes[className] = true;
		}
		return classes;
	}, {});
};

export const isObjectEmpty = (obj) => {
	if (!obj || typeof obj !== "object") return false;
	return Object.values(obj).every((value) => (typeof value === "object" ? isObjectEmpty(value) : value === ""));
};

export const isEditor = () => {
	// return typeof select( 'core/editor' ) !== 'undefined' ? true : false;
	return true;
};

// Google fonts list controls fn.
export const googleFonts = (fonts, page = "edit") => {
	if (!fonts?.length) {
		return [];
	}

	let returnFont = "";

	if (page !== "edit") {
		// Frontend fonts array (unique + cleaned).
		const fontList = fonts
			.map((font) =>
				font?.typography?.family?.length > 0 ? `${font.typography.family}:${font.typography.fontWeight}` : ""
			)
			.filter(Boolean); // remove empty strings

		// Return unique values only
		returnFont = [...new Set(fontList)];
	} else {
		// Edit page (Google Fonts import)
		const fontList = fonts
			.map((font) =>
				font?.typography?.family?.length > 0
					? `family=${font.typography.family.replaceAll(" ", "+")}:wght@${font.typography.fontWeight}&`
					: ""
			)
			.filter(Boolean);

		// Deduplicate imports
		const uniqueFonts = [...new Set(fontList)];

		const updatedUniqueFonts =
			uniqueFonts.length > 0 &&
			uniqueFonts?.filter((item) => {
				const [name] = item.split(":");
				return name.trim() !== "";
			});

		returnFont =
			updatedUniqueFonts.length > 0
				? `@import url('https://fonts.googleapis.com/css2?${updatedUniqueFonts.join("")}display=swap');`
				: "";
	}
	return returnFont;
};

// Show/hide on device type (Desktop, Tablet, Mobile)
export const showHide = (deviceCss, id, hide, defaultVal = "") => {
	return [
		...deviceCss,
		{
			class: `#${id}`,
			styles: {
				display: hide ? "none" : defaultVal,
			},
		},
	];
};

export const backgroundStyle = (attributes, bgImageObj = {}, hover = false, condition = true) => {
	if (!attributes && !condition) return {};

	if (attributes?.color?.style === "video") {
		return {};
	}
	if ((!hover && attributes?.color?.style === "image") || (hover && attributes?.hover?.style === "image")) {
		return {
			"background-image": Object.keys(bgImageObj).length !== 0 ? `url(${bgImageObj?.url})` : "",
			"background-position": "center",
			"background-attachment": "scroll",
			"background-repeat": "no-repeat",
			"background-size": "cover",
		};
	}
	// Handle hover style
	const styleSource = hover ? attributes?.hover : attributes?.color;

	return {
		background: colorControls(styleSource?.style, styleSource?.solidColor, styleSource?.gradient),
	};
};

export const gradientHoverStyle = (selector, bgAttr, imgObj = "", alt = "") => {
	if (!bgAttr) return;

	const normalBGStyle = [
		{
			class: `${selector}:hover`,
			styles: {
				...(backgroundStyle(bgAttr, imgObj, true) || backgroundStyle(bgAttr, alt, true)),
			},
		},
	];
	const gradientBGStyle = [
		{
			class: `${selector}::before`,
			styles: {
				content: '""',
				display: "block",
				position: "absolute",
				width: "100%",
				height: "100%",
				top: "0",
				left: "0",
				"z-index": "1",
				opacity: "0",
				...backgroundStyle(bgAttr, "", true),
				transition: "opacity 0.3s ease-in-out",
			},
		},
		{
			class: `${selector}`,
			styles: {
				position: "relative",
			},
		},
		{
			class: `${selector}:hover::before`,
			styles: {
				opacity: "1",
			},
		},
	];
	return bgAttr?.hover?.style !== "gradient" ? normalBGStyle : gradientBGStyle;
};

export const capitalizeWords = (str) =>
	str
		.trim()
		.toLowerCase()
		.split(" ")
		.map((word) => {
			const i = ["(", "-", "/", "{", "[", "_"].includes(word.charAt(0)) ? 1 : 0;
			return word.slice(0, i) + word.charAt(i).toUpperCase() + word.slice(i + 1);
		})
		.join(" ");

export const typographyCss = (attr) => {
	return {
		"font-family": attr?.typography?.family,
		"font-weight": attr?.typography?.fontWeight,
		"font-style": attr?.typography?.style || "normal",
		"text-decoration": attr?.typography?.decoration || "none",
		"text-transform": attr?.typography?.transform,
	};
};
