import { ListStyle1, ListStyle2, ListStyle3, ListStyle4, ListStyle5, ListStyle6, ListStyle7 } from "../../icons/icons";

import { useDispatch, useSelect } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import { useEffect } from "@wordpress/element";
import { blockPreviewPanelLink } from "../../controls/constants";

// Panel body accordions close or open function.
export const togglePanelBody = (attributes, currentAccordionName, setAttributes) => {
	const { openedAccordion } = attributes;

	if (openedAccordion === currentAccordionName) {
		setAttributes({ openedAccordion: "" });
	} else {
		setAttributes({ openedAccordion: currentAccordionName });
	}
};

export function generateLayeredShadows(baseColor, layers = 5, offsetStep = 4) {
	const result = [];
	const rgba = toRGBA(baseColor);

	for (let i = 0; i < layers; i++) {
		const offset = offsetStep * (i + 1);
		const alpha = 0.5 - i * 0.1; // Start at 0.5 and decrease by 0.1 each layer
		const shadowColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha.toFixed(1)})`;
		result.push(`${shadowColor} ${offset}px ${offset}px`);
	}

	return result.join(", ");
}

// Helper: Converts hex or rgba string to RGB components
function toRGBA(color) {
	if (color?.startsWith("#")) {
		const hex = color.replace("#", "");
		const bigint = parseInt(
			hex.length === 3
				? hex
						.split("")
						.map((c) => c + c)
						.join("")
				: hex,
			16
		);

		return {
			r: (bigint >> 16) & 255,
			g: (bigint >> 8) & 255,
			b: bigint & 255,
		};
	} else if (color?.startsWith("rgb")) {
		const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		if (match) {
			return {
				r: parseInt(match[1]),
				g: parseInt(match[2]),
				b: parseInt(match[3]),
			};
		}
	}
	throw new Error("Unsupported color format. Use hex (#ff0066) or rgba().");
}

export const isEmptyObject = (obj) =>
	obj && typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length === 0;

// Css generator to object.
export const objectToCssString = (dynamicCss) => {
	let css = "";
	dynamicCss?.map((item) => {
		if (item.styles && typeof item.styles === "object" && Object.keys(item.styles).length > 0) {
			let propertyValue = "";
			Object.entries(item.styles).forEach(([property, value]) => {
				if (!["", "%", "px", " !important", "undefined"].includes(value)) {
					propertyValue += `${property}: ${value};`;
				}
			});
			css += propertyValue ? `${item.class} {${propertyValue}}` : "";
		}
	});
	return css;
};

// Spacing property css and class generator (margin or padding).
// spacingValue is margin or padding value.
// device is (desktop, tablet, or mobile)
// spacingType is check (margin or padding).
// returnSpacingClass is just return css class. (sp-mt-8px)

export const Icon = ({ iconSourse, color }) => {
	const icons = {
		list1: <ListStyle1 fillColor={color} />,
		list2: <ListStyle2 fillColor={color} />,
		list3: <ListStyle3 fillColor={color} />,
		list4: <ListStyle4 fillColor={color} />,
		list5: <ListStyle5 fillColor={color} />,
		list6: <ListStyle6 fillColor={color} />,
		list7: <ListStyle7 fillColor={color} />,
	};
	return icons[iconSourse] || null;
};

export const formatDate = (dateString, type = "date") => {
	const date = new Date(dateString);

	if (type === "daysAgo") {
		const now = new Date();
		const diffTime = now - date;
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "1 day ago";
		return `${diffDays} days ago`;
	}

	// Default: formatted date like "Jun 19, 2025"
	const options = { month: "short", day: "numeric", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
};

export const getClipPath = (style, position) => {
	switch (style) {
		case "one":
			switch (position) {
				case "right":
					return "polygon(100% 0%, 15% 0%, 0% 0%, 15% 102%, 100% 102%)";
				case "left":
					return "polygon(0% 0%, 85% 0%, 100% 0%, 85% 102%, 0% 102%)";
				default:
					return "none";
			}
		case "two":
			switch (position) {
				case "right":
					return "polygon(100% 0%, 15% 0%, 15% 0%, 0% 102%, 100% 102%)";

				case "left":
					return "polygon(0% 0%, 85% 0%, 85% 0%, 100% 102%, 0% 102%)";
				default:
					return "none";
			}
		case "three":
			switch (position) {
				case "right":
					return "polygon(100% 0%, 15% 0%, 0% 50%, 15% 102%, 100% 102%)";

				case "left":
					return "polygon(0% 0%, 85% 0%, 100% 50%, 85% 102%, 0% 102%)";
				default:
					return "none";
			}
		case "four":
			switch (position) {
				case "right":
					return "polygon(  100% -3px,  10% -7px,  10% 27%,  0% 52%,  10% 77%,  10% 102%,  100% 116%)";
				case "left":
					return "polygon(-5px -3px, 90% -7px, 90% 27%, 100% 52%, 90% 77%, 90% 102%, -3px 116%)";
				default:
					return "none";
			}

		default:
			return "none";
	}
};

export const spacingCss = (
	spacingValue,
	device,
	spacingType,
	returnSpacingClass = false,
	currentScreen = "Desktop",
	page = "editor"
) => {
	let generateNewCss = [];
	let cssPrefixName = returnSpacingClass ? "sp-" : ".sp-"; // css class prefix
	let cssUnit = spacingValue?.unit?.[device]; // css unit (px, em, %);
	let positionKeys = Object.keys(spacingValue.device?.[device]); // position keys (top, right, bottom, left);

	//Spacing css property.
	const cssSpacingProperty = {
		margin: {
			top: {
				cssProperty: "margin-top",
				cssClass: "mt",
			},
			right: {
				cssProperty: "margin-right",
				cssClass: "mr",
			},
			bottom: {
				cssProperty: "margin-bottom",
				cssClass: "mb",
			},
			left: {
				cssProperty: "margin-left",
				cssClass: "ml",
			},
		},
		padding: {
			top: {
				cssProperty: "padding-top",
				cssClass: "pt",
			},
			right: {
				cssProperty: "padding-right",
				cssClass: "pr",
			},
			bottom: {
				cssProperty: "padding-bottom",
				cssClass: "pb",
			},
			left: {
				cssProperty: "padding-left",
				cssClass: "pl",
			},
		},
		"border-width": {
			top: {
				cssProperty: "border-top-width",
				cssClass: "bwt",
			},
			right: {
				cssProperty: "border-right-width",
				cssClass: "bwr",
			},
			bottom: {
				cssProperty: "border-bottom-width",
				cssClass: "bwb",
			},
			left: {
				cssProperty: "border-left-width",
				cssClass: "bwl",
			},
		},
		"border-radius": {
			top: {
				cssProperty: "border-top-left-radius",
				cssClass: "brt",
			},
			right: {
				cssProperty: "border-top-right-radius",
				cssClass: "brr",
			},
			bottom: {
				cssProperty: "border-bottom-right-radius",
				cssClass: "brb",
			},
			left: {
				cssProperty: "border-bottom-left-radius",
				cssClass: "brl",
			},
		},
	};

	const deviceSuffixes = {
		Tablet: "md",
		Mobile: "sm",
	};

	const deviceSuffix = deviceSuffixes[device] ? `-${deviceSuffixes[device]}` : "";

	positionKeys?.map((spacingPosition) => {
		let cssValue = parseInt(spacingValue.device?.[device]?.[spacingPosition]); // css value
		let { cssProperty, cssClass } = cssSpacingProperty[spacingType][spacingPosition];

		cssClass = `${cssPrefixName}${cssClass}${deviceSuffix}-${parseInt(
			spacingValue.device?.[device][spacingPosition]
		)}${spacingValue?.unit?.[device]}`;

		let newSpaceCss = convertToClassName(cssClass); // css class pct ( .sp-mt-5% to .sp-mt-5pct)

		// Return spacing class list or styles object
		if (cssValue || cssValue === 0) {
			if (returnSpacingClass) {
				generateNewCss.push(`${newSpaceCss}`);
			} else {
				generateNewCss.push({
					class: `.${newSpaceCss.slice(1)}`,
					property: cssProperty,
					value: `${cssValue}${cssUnit}${
						page === "editor" && device.includes(currentScreen) ? " !important" : ""
					}`,
				});
			}
		}
	});

	return returnSpacingClass ? generateNewCss.join(" ") : generateNewCss;
};

export const buildSpacingClasses = (value, property) => {
	const screenSizes = ["Desktop", "Tablet", "Mobile"];
	const spacingCssCalls = screenSizes?.map((screenSize) => {
		return spacingCss(value, screenSize, property, true);
	});

	return spacingCssCalls.filter((item) => item.trim() !== "").join(" ");
};

export const convertToClassName = (value) => {
	let newValue = value.toString();

	// Remove the '#' if it exists
	if (newValue.startsWith("#")) {
		newValue = newValue.slice(1);
	}

	// Replace spaces with hyphens
	newValue = newValue.replace(/\s+/g, "-");

	// Replace '%' with 'pct'
	newValue = newValue.replace("%", "pct");

	// Replace '.' with '-'
	newValue = newValue.replace(/\./g, "-");

	return newValue;
};

// Trim The excerpt content.
export const stringTrim = (content, attributes) => {
	const getWords = (data, length = 10) => {
		const words = data?.split(" ");
		return words?.slice(0, length).join(" ");
	};
	const getCharacters = (data, length = 10) => {
		if (!data) return;
		return data?.substring(0, length);
	};

	let newContent = "";

	if (typeof attributes === "object") {
		if (attributes.unit === "words") {
			newContent = getWords(content, attributes.value);
		} else if (attributes.unit === "chars") {
			newContent = getCharacters(content, attributes.value);
		}
	}

	return "" !== newContent ? newContent : content;
};

export const getObjectValuesToJsArray = (object) => {
	return Object?.values(object);
};

// Generate box shadow css.
export const boxCss = (enable, device, shadow, color) => {
	if ("" === shadow[color]) {
		return "";
	}
	if (shadow?.selectDefault !== "custom") {
		return enable ? shadow?.selectDefault : "";
	}
	// If shadow have not any device property, return default box shadow.
	if (!shadow?.device || "object" === typeof shadow?.value) {
		return enable
			? `${shadow.unit.toLowerCase() === "inset" ? shadow.unit.toLowerCase() : ""} ${
					shadow.value.top
				}px ${shadow.value.right}px ${shadow.value.bottom}px ${shadow.value.left}px ${shadow[color]}`
			: "none";
	}
	return enable
		? `${shadow.unit?.[device].toLowerCase() === "inset" ? shadow.unit?.[device].toLowerCase() : ""} ${
				shadow.device?.[device].top
			}px ${shadow.device?.[device].right}px ${shadow.device?.[device].bottom}px ${
				shadow.device?.[device].left
			}px ${shadow[color]}`
		: "none";
};

export const jsonStringify = (data) => {
	return JSON.stringify(data);
};

export const jsonParse = (data) => {
	try {
		return JSON.parse(data);
	} catch (e) {
		return console.error(e); // error in the above string (in this case, yes)
	}
};

export const getBlockShortName = (name) => {
	const shortName = name.replace("sp-smart-post-show/", "");
	return shortName;
};

// export const arrayChunk = (arr, n = 1) => (arr.length ? [arr.slice(0, n), ...arrayChunk(arr.slice(n), n)] : []);
export const arrayChunk = (arr, n = 1) => {
	if (!Array.isArray(arr)) return [];
	if (n <= 0) n = 1;

	const chunks = [];
	for (let i = 0; i < arr.length; i += n) {
		chunks.push(arr.slice(i, i + n));
	}
	return chunks;
};

// Color controls fn.
export const colorControls = (colorType, normalColor, gradientColor, bgImgObject = {}) => {
	if (!colorType) {
		return "";
	}

	const imageUrl = bgImgObject?.url;

	const backgroundMap = {
		transparent: "transparent",
		bgColor: normalColor,
		gradient: gradientColor,
		image: imageUrl ? `url(${imageUrl})` : "none",
	};

	return backgroundMap[colorType] ?? normalColor;
};

export const hexToRgba = (hex, opacity) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const toggleEqualHeight = (containerId, equalHeightEnable) => {
	let container = document.getElementById(containerId);

	if (!container) {
		const iframe = document.getElementsByTagName("iframe")[0];
		const iframeDoc = iframe?.contentWindow?.document;
		container = iframeDoc?.getElementById(containerId) || null;
	}

	if (container) {
		const cards = container.querySelectorAll(".sp-smart-post-card");
		if (cards.length > 0) {
			if (equalHeightEnable) {
				let maxHeight = 0;
				let prevCardHeight = 0;

				const onAllImageLoad = () => {
					// Determine the tallest card
					cards.forEach((card) => {
						prevCardHeight = card.style.height;
						card.style.height = "auto"; // Reset height to get the true offsetHeight
						const cardHeight = card.offsetHeight;
						if (cardHeight > maxHeight) {
							maxHeight = cardHeight;
						}
					});

					// Set all cards to the tallest height
					cards.forEach((card) => {
						card.style.height = `${maxHeight}px`;
					});
				};

				const imagePromise = Array.from(container.querySelectorAll(".sp-smart-post-card-image img")).map(
					(img) =>
						new Promise((resolve) => {
							if (img.complete) {
								resolve();
							} else {
								img.addEventListener("load", resolve);
								img.addEventListener("error", resolve); // Handle broken images
							}
						})
				);
				Promise.all(imagePromise).then(onAllImageLoad);
			} else {
				// Set all cards to the tallest height
				cards.forEach((card) => {
					card.style.height = "";
				});
			}
		}
	}
};

export const wrapInMediaQuery = (cssString, mediaQuery) => {
	return `@media ${mediaQuery} { ${cssString} }`;
};

export const scrollToTop = (topPosition) => {
	window.scrollTo({
		top: topPosition,
		behavior: "smooth",
	});
};

export const innerBlockTemplate = (title) => [["sp-smart-post-show/section-heading", { sectionHeadingLabel: title }]];

export const removeEmptyCss = (classString, property, value, importance) => {
	return value
		? [
				{
					class: classString,
					styles: {
						[property]: `${value}${importance ? " !important" : ""}`,
					},
				},
			]
		: [];
};

export const setDefaultValue = (attributes, attrKey, value, deviceType = "Desktop", position = false) => {
	const { device } = attributes;

	const deviceValue = device && !position ? { device: { ...attributes.device, [deviceType]: value } } : {};

	const positionValue = position
		? {
				device: {
					...attributes.device,
					[deviceType]: {
						...attributes.device?.[deviceType],
						[position]: value,
					},
				},
			}
		: {};

	let newData = {
		[attrKey]: {
			...attributes,
			...deviceValue,
			...positionValue,
		},
	};

	return newData;
};

export const randomSolidColor = (colorType) => {
	if ("multi-solid" === colorType) {
		return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
			Math.random() * 255
		)}, .7)`;
	}
	if ("multi-gradient" === colorType) {
		const colorList = [
			`linear-gradient(293deg, rgba(251, 218, 97, .7) -0.37%, rgba(255, 90, 205, .7) 100%)`,
			`linear-gradient(90deg, rgba(203, 173, 109, .7) 0%, rgba(213, 51, 105, .7) 100%)`,
			`linear-gradient(90deg, rgba(36, 198, 220, .7) 0%, rgba(81, 74, 157, .7) 100%)`,
			`linear-gradient(90deg, rgba(255, 224, 0, .7) 0%, rgba(255, 75, 31, .7) 100%)`,
			`linear-gradient(90deg, rgba(28, 216, 210, .7) 0%, rgba(147, 237, 199, .7) 100%)`,
			`linear-gradient(90deg, rgba(255, 212, 82, .7) 0%, rgba(84, 74, 125, .7) 100%)`,
			`linear-gradient(90deg, rgba(91, 134, 229, .7) 0%, rgba(54, 209, 220, .7) 100%)`,
			`linear-gradient(90deg, rgba(253, 185, 155, .7) 0%, rgba(167, 112, 239, .7) 100%)`,
		];
		return colorList[Math.floor(Math.random() * 8)];
	}
};

export const spacingGenerate = (attr, device = "Desktop") => {
	if (!attr) {
		return "";
	}
	if (!attr?.device && "object" === typeof attr?.value) {
		let unit = attr?.unit;
		const { top, bottom, left, right } = attr?.value;
		const keys = ["top", "bottom", "left", "right"];
		const allEmpty = keys.every((key) => attr?.value[key] === "");
		if (allEmpty) return "";
		if (attr?.allChange) {
			return `${top || 0}${unit}`;
		}
		return `${top || 0}${unit} ${right || 0}${unit} ${bottom || 0}${unit} ${left || 0}${unit}`;
	}

	let unit = attr?.unit?.[device];
	const { top, bottom, left, right } = attr?.device?.[device] || {};
	const keys = ["top", "bottom", "left", "right"];
	const allEmpty = keys.every((key) => attr?.device?.[device][key] === "");
	if (allEmpty) return "";
	// if ( attr?.allChange ) { return `${top || 0 }${unit}` };

	let space = `${top || 0}${unit} ${right || 0}${unit} ${bottom || 0}${unit} ${left || 0}${unit}`;
	let margin = `${space}`;
	return margin;
};

// Override old attribute value.
export const changeAttrData = (parentAttr, attr) => {
	let newData = {
		...parentAttr,
	};
	attr?.forEach((data) => {
		const { attrName, value } = data;

		const dataType = parentAttr[attrName]?.type;
		const deviceType = data?.deviceType ? data?.deviceType : "Desktop";

		switch (dataType) {
			case "string":
			case "boolean":
				newData = {
					...newData,
					[attrName]: {
						...parentAttr[attrName],
						default: value,
					},
				};
				break;
			case "object":
				const { device, value: singleValue } = parentAttr[attrName]?.default;

				const single = {
					value,
				};

				const deviceValue = {
					device: {
						...device,
						[deviceType]: value,
					},
				};

				const newValue = device ? deviceValue : single;

				let defaultValue = {
					...parentAttr[attrName].default,
					...newValue,
				};

				newData = {
					...newData,
					[attrName]: {
						...parentAttr[attrName],
						default: defaultValue,
					},
				};
				break;
		}
	});
	return newData;
};

export const bgColor = (attr, colorType = "color") => {
	const bgStyle = "bgColor" === attr[colorType]?.style ? "solidColor" : attr[colorType]?.style;
	return `${attr[colorType][bgStyle]}`;
};

export const checkInArray = (value, arr = "default") => {
	if (!value) return;
	let defaultArray = arr === "default" ? ["social-profiles-layout-four", "social-profiles-layout-five"] : arr;
	return defaultArray.includes(value) ? true : false;
};

export const rangerCss = (attr, device = "Desktop") => {
	if ("" === attr?.device?.[device]) {
		return "";
	}
	const unit = attr?.unit?.[device] || "";
	return `${attr?.device?.[device]}${unit}`;
};

export const borderCss = (attr, device = "Desktop", colorType = "color") => {
	if (attr?.device && "object" === typeof attr?.device) {
		return {
			"border-width": spacingGenerate(attr, device),
		};
	}
	if (attr?.style && "string" === typeof attr?.style) {
		return "none" !== attr.style
			? {
					"border-style": attr.style,
					"border-color": attr[colorType],
				}
			: {};
	}
};

export const rearrangeAboveTitle = (items) => {
	const taxonomyIndex = items?.findIndex((item) => item.value === "taxonomy");
	const titleIndex = items.findIndex((item) => item.value === "title");

	// Only move if both are found and taxonomy is not already before title
	if (taxonomyIndex !== -1 && titleIndex !== -1 && taxonomyIndex !== titleIndex - 1) {
		const taxonomyItem = items.splice(taxonomyIndex, 1)[0];
		const newTitleIndex = items.findIndex((item) => item.value === "title");
		items.splice(newTitleIndex, 0, taxonomyItem);
	}
};
export const useAddChildBlock = (liveFilterEnable, paginationEnable, clientId) => {
	const { replaceBlocks, replaceInnerBlocks, selectBlock } = useDispatch("core/block-editor");

	const currentBlock = useSelect((select) => select("core/block-editor").getBlock(clientId), [clientId]);

	const parentClientId = useSelect(
		(select) => {
			const { getBlock, getBlockParents } = select("core/block-editor");

			// Get all parent IDs (closest first)
			const parentIds = getBlockParents(clientId);

			if (!parentIds?.length) return null;

			// Find the first parent with the target block name
			return (
				parentIds.find((parentId) => {
					const parentBlock = getBlock(parentId);
					return parentBlock?.name === "sp-smart-post-show/smart-post-parent";
				}) || null
			);
		},
		[clientId]
	);
	const parentBlock = useSelect(
		(select) => parentClientId && select("core/block-editor").getBlock(parentClientId),
		[parentClientId]
	);

	useEffect(() => {
		if (!currentBlock) return;

		const isWrapped = parentBlock?.name === "sp-smart-post-show/smart-post-parent";
		const shouldWrap = liveFilterEnable;
		const optionalBlocks = [
			{
				name: "sp-smart-post-show/live-filter",
				enable: liveFilterEnable,
			},
			{
				name: currentBlock.name,
				attrs: currentBlock.attributes,
				innerBlocks: currentBlock.innerBlocks,
				alwaysInclude: true,
			},
			// {
			// 	name: 'sp-smart-post-show/pagination',
			// 	enable: paginationEnable,
			// }
		];
		if (!isWrapped && shouldWrap) {
			// Wrap current block inside a parent with optional children
			const newInnerBlocks = optionalBlocks
				.filter((b) => b.alwaysInclude || b.enable)
				.map((b) => createBlock(b.name, b.attrs || {}, b.innerBlocks || []));

			selectBlock(newInnerBlocks[0]?.clientId);
			const newParentBlock = createBlock(
				"sp-smart-post-show/smart-post-parent",
				{ align: currentBlock?.attributes?.align },
				newInnerBlocks
			);
			replaceBlocks([clientId], newParentBlock);
			return;
		}

		if (!shouldWrap && isWrapped) {
			// Unwrap: restore the main block alone
			const mainBlock = parentBlock.innerBlocks.find((b) => b.name === currentBlock.name);

			mainBlock.attributes["align"] = currentBlock?.attributes?.align;

			if (mainBlock) {
				const newBlock = createBlock(mainBlock.name, mainBlock.attributes, mainBlock.innerBlocks);
				selectBlock(newBlock.clientId);
				replaceBlocks([parentClientId], [newBlock]);
			}
			return;
		}
	}, [liveFilterEnable, paginationEnable, clientId]);
};

export function removeEmptyValues(obj) {
	if (!obj) return;
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (!["", " ", "%", "undefined", "px"].includes(value)) {
			acc[key] = value;
		}
		return acc;
	}, {});
}

export const getPaginationBlock = (clientId) => {
	const { selectBlock, replaceInnerBlocks } = useDispatch("core/block-editor");

	const currentBlock = useSelect((select) => select("core/block-editor").getBlock(clientId), [clientId]);

	const paginationBlock = currentBlock?.innerBlocks?.find((block) => block.name === "sp-smart-post-show/pagination");

	return {
		select: selectBlock,
		block: paginationBlock,
	};
};
export const getSimpleRadiusCss = (attr, deviceType = "Desktop") => {
	if (!attr) {
		return "";
	}
	if (attr.device && "object" === typeof attr.device) {
		const { top, right, bottom, left } = attr.device?.[deviceType];
		const unit = attr?.unit;
		if (!top && !right && !bottom && !left) {
			return "";
		}
		return `${top || 0}${unit} ${right || 0}${unit} ${bottom || 0}${unit} ${left || 0}${unit}`;
	}
	if (!attr.device) {
		const { top, right, bottom, left } = attr;
		const unit = attr?.unit;
		if (!top && !right && !bottom && !left) {
			return "";
		}
		return `${top || 0}${unit} ${right || 0}${unit} ${bottom || 0}${unit} ${left || 0}${unit}`;
	}

	return "";
};

export const ensureHttps = (url) => {
	if (!url.startsWith("http://") && !url.startsWith("https://")) {
		return "https://" + url;
	}
	return url;
};

export const getClipPathForShape = (shape) => {
	switch (shape) {
		case "backgroundShapeHexagon":
			return "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)";
		case "backgroundShapeDiamond":
			return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
		case "backgroundShapeStarburst":
			return "polygon( 100% 50%,  92% 58%,   98% 68%,  88% 72%, 92% 84%, 82% 82%,  80% 94%, 70% 88%,66% 100%,  58% 92%,  50%  100%,42% 92%,34% 100%,30% 88%,20% 94%, 18% 82%, 8% 84%, 12% 72%,2% 68%, 8% 58%, 0% 50%,8% 42%, 2% 32%,12% 28%,8% 16%, 18% 18%, 20% 6%,30% 12%,34% 0%, 42% 8%, 50% 0%,58% 8%, 66% 0%,70% 12%,80% 6%,82% 18%, 92% 16%, 88% 28%, 98% 32%, 92% 42%)";
		default:
			return "";
	}
};

export const getFormatDate = (dateTimeFormat) => {
	switch (dateTimeFormat) {
		case "publish-date":
			return "Oct 7, 2025";

		case "time-only":
			return "2:20 PM";

		case "full-date":
			return "October 7, 2025";

		case "date-time-short":
			return "Oct 7, 2025 2:20 PM";

		case "date-time-long":
			return "October 7, 2025 2:20 PM";

		case "day-month-year":
			return "7 Oct 2025";

		case "day-month-year-time":
			return "7 Oct 2025 2:20 PM";

		case "time-ago":
			return "6 hours ago";

		case "wp-default-date":
			return "December 4, 2025";

		case "wp-default-datetime":
			return "December 4, 2025 4:18 am";

		default:
			return "Oct 7, 2025";
	}
};

export const getTimeAgo = (dateString) => {
	const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

	let interval = seconds / 31536000;
	if (interval > 1) {
		return Math.floor(interval) + " years ago";
	}

	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + " months ago";
	}

	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + " days ago";
	}

	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + " hours ago";
	}

	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes ago";
	}

	return "Just now";
};

export const bgImageGradientStyle = (
    className,
    attr,
    hover = false,
    hoverClass = "",
    customOpacity = 1,
) => {
    // 1. Setup selectors
    const hoverSelector = hoverClass || `${className}:hover`;
    
    // 2. Get the correct color settings
    const settings = hover ? attr?.hover : attr?.color;
    const background = colorControls(
        settings?.style,
        settings?.solidColor,
        settings?.gradient
    );

    // 3. Logic for Normal State (Applied directly to the class)
    if ( settings?.style === "bgColor" ) {
		const updateClassName = hover ? hoverSelector : className;
        return [
            {
                class: `${updateClassName}`,
                styles: {
                    //position: "relative", // Required for ::after to position correctly
                    background,
					transition: "all 0.3s ease-in-out",
                },
            },
        ]
    }

    // 4. Logic for Hover State (Applied to ::after)
    return !hover ? [
			{
                class: `${className}`,
                styles: {
                    //position: "relative", // Required for ::after to position correctly
                    background: background,
					opacity: customOpacity,
                    "z-index": 1,
                    overflow: "hidden", // Ensures overlay doesn't spill out
                },
            },
	] : [
        {
            class: `${className}::after`,
            styles: {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: background,
                opacity: 0, // Hidden by default
                transition: "opacity 0.3s ease-in-out",
                "z-index": 2,
                "pointer-events": "none",
            },
        },
        {
            class: `${hoverSelector}::after`,
            styles: {
                opacity: customOpacity, // Fades in to 0.6 on hover
            },
        },
    ];
};

export const priceLink = "https://wpsmartpost.com/pricing/?ref=1";

export const ProTopBar = ({blockName, title}) => {
	return (
		<div className="sp-smart-pro-block-top-bar">
			<span>Unlock this premium <strong>{title}</strong> block with Pro</span>
			<a className="sp-smart-pro-block-demo-btn" style={{marginLeft: "auto"}} rel="noreferrer" target="_blank" href={blockPreviewPanelLink[blockName]}>View Demo</a>
			<a className="sp-upgrade-to-pro-btn" rel="noreferrer" target="_blank" href={priceLink}>Upgrade Pro</a>
		</div>
	)
}