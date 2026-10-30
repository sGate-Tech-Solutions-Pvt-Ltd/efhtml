const DefaultPresetAttr = (type, data = "", datafallback = "") => {
	if (type == "colorStacks") {
		return {
			color_type_1: [
				"#FAFAFA",
				"#FFFFFF",
				"#EBEBEB",
				"#999999",
				"#1D1D1D",
				"#0054FB",
				"#3E3E3E",
				"#0A0A0A",
				"#000000",
			],
			color_type_2: [
				"#ffffff",
				"#E5E9FD",
				"#F898FF",
				"#E546F1",
				"#7A13C8",
				"#658BF1",
				"#455B8E",
				"#2F3E69",
				"#000000",
			],
			color_type_3: [
				"#F6F3EC",
				"#ECE4DA",
				"#CFA592",
				"#9C6A51",
				"#6A3C27",
				"#6C5840",
				"#59534D",
				"#36302B",
				"#000000",
			],
			color_type_4: [
				"#F5FFFA",
				"#F7F1FC",
				"#CEB2E5",
				"#8B51BD",
				"#350792",
				"#266663",
				"#775189",
				"#68497E",
				"#000000",
			],
			color_type_5: [
				"#FFFFFF",
				"#EEEEEE",
				"#4FD0D4",
				"#00ADB5",
				"#095F5C",
				"#C41C10",
				"#343C48",
				"#222831",
				"#000000",
			],
			color_type_6: [
				"#FFFAF2",
				"#FEFAE0",
				"#F49100",
				"#E46700",
				"#DA4D00",
				"#4E6E3E",
				"#3A502A",
				"#283618",
				"#000000",
			],
			// color_type_7: [
			// 	'#f8f3ed',
			// 	'#f2e2d0',
			// 	'#D6C4B4',
			// 	'#dd8336',
			// 	'#f09f4d',
			// 	'#3D2A1D',
			// 	'#6E5F52',
			// 	'#483324',
			// 	'#2e1e11',
			// ],
			// color_type_8: [
			// 	'#ffffff',
			// 	'#faf0f4',
			// 	'#D6B4CF',
			// 	'#d948a2',
			// 	'#e56ab5',
			// 	'#401B2E',
			// 	'#725468',
			// 	'#4e2239',
			// 	'#290e1d',
			// ],
		};
	}
};
/**
 * Generate CSS root variables from color settings
 * @param {Object} colorSettings - The color settings object
 * @param {Object} breakPoint - The color settings object
 * @returns {string} CSS string with root variables
 */
const generateRootCSS = (colorSettings, breakPoint) => {
	let cssVariables = [];
	if (breakPoint) {
		cssVariables.push(`  --sp-smart-breakpoint-tablet: ${breakPoint.tablet}px;`);
		cssVariables.push(`  --sp-smart-breakpoint-mobile: ${breakPoint.mobile}px;`);
	}
	// Process default colors
	if (colorSettings.presetColors && Array.isArray(colorSettings.presetColors)) {
		colorSettings.presetColors.forEach((colorObj) => {
			if (colorObj.color && colorObj.slug) {
				const variableName = convertToVariableName(colorObj.slug);
				cssVariables.push(`${variableName}: ${colorObj.color};`);
			}
		});
	}

	// Process custom colors
	if (colorSettings.customColors && Array.isArray(colorSettings.customColors)) {
		colorSettings.customColors.forEach((colorObj) => {
			if (colorObj.color && colorObj.slug) {
				const variableName = convertToVariableName(colorObj.slug);
				cssVariables.push(`  ${variableName}: ${colorObj.color};`);
			}
		});
	}

	// Process default gradients
	if (colorSettings.defaultGradient && Array.isArray(colorSettings.defaultGradient)) {
		colorSettings.defaultGradient.forEach((gradientObj) => {
			if (gradientObj.gradient && gradientObj.slug) {
				const variableName = convertToVariableName(gradientObj.slug);
				cssVariables.push(`  ${variableName}: ${gradientObj.gradient};`);
			}
		});
	}

	// Process custom gradients
	if (colorSettings.customGradients && Array.isArray(colorSettings.customGradients)) {
		colorSettings.customGradients.forEach((gradientObj) => {
			if (gradientObj.gradient && gradientObj.slug) {
				const variableName = convertToVariableName(gradientObj.slug);
				cssVariables.push(`  ${variableName}: ${gradientObj.gradient};`);
			}
		});
	}

	// Return the complete CSS
	if (cssVariables.length === 0) {
		return "";
	}

	return `:root {${cssVariables.join(" ")}}`;
};
/**
 * Convert color name to CSS variable name
 * @param {string} name - Color name
 * @param {string} prefix - Prefix for the variable
 * @return {string} CSS variable name
 */
const convertToVariableName = (name, prefix = "smart-post") => {
	return `--${prefix}-${name
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")}`;
};
export { DefaultPresetAttr, generateRootCSS, convertToVariableName };

const camelToKebab = (str) => {
	return str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

export const generateSizeRootCSS = (fontSizes, breakpoint) => {
	let css = ":root {";

	// Devices breakpoint config
	const devices = {
		Desktop: { media: null, max: null },
		Tablet: {
			media: `@media (max-width: ${breakpoint?.tablet}px)`,
			max: 1023,
		},
		Mobile: {
			media: `@media (max-width: ${breakpoint?.mobile}px)`,
			max: 767,
		},
	};

	// Collect CSS by device
	const cssByDevice = {
		Desktop: "",
		Tablet: "",
		Mobile: "",
	};

	fontSizes.forEach((sizeList) => {
		sizeList?.sizes?.forEach((item, index) => {
			const i = index + 1;
			Object.keys(devices).forEach((device) => {
				const fontSize = item.fontSize?.device?.[device] || "";
				const fontUnit = item.fontSize?.unit?.[device] || "px";
				if (fontSize) {
					cssByDevice[device] += `  --sp-smart-font-size-${sizeList.type}-${i}: ${fontSize}${fontUnit};`;
				}

				const lineHeight = item.lineHeight?.device?.[device] || "";
				// const lineUnit = item.lineHeight?.unit?.[ device ] || 'px';
				if (lineHeight) {
					cssByDevice[device] += `  --sp-smart-line-height-${sizeList.type}-${i}: ${lineHeight};`;
				}
			});
		});
	});

	// Desktop root vars
	css += cssByDevice.Desktop;
	css += "}";

	// Tablet & Mobile inside media queries
	["Tablet", "Mobile"].forEach((device) => {
		if (cssByDevice[device]) {
			css += `${devices[device].media} {  :root {${cssByDevice[device]}  }}`;
		}
	});

	return css;
};

const generateCSS = (obj, breakpoint) => {
	const className = `.sp-smart-post-wrapper :is(.sp-smart-${obj.slug}, .sp-smart-${obj.slug}.sp-smart-post-category a )`;
	const devices = ["Desktop", "Tablet", "Mobile"];
	const properties = ["fontSize", "lineHeight", "letterSpacing", "wordSpacing"];

	let cssClass = `${className}{`;
	let css = "";

	// Typography
	if (obj.typography) {
		const { fontWeight, style, transform, decoration, family } = obj.typography;
		if (fontWeight) css += `font-weight:${fontWeight};`;
		if (style) css += `font-style:${style};`;
		if (transform) css += `text-transform:${transform};`;
		if (decoration) css += `text-decoration:${decoration};`;
		if (family) css += `font-family:${family};`;
	}

	// Desktop styles
	properties.forEach((prop) => {
		const value = obj[prop]?.device?.Desktop;
		const unit = obj[prop]?.unit?.Desktop || "";
		if (value) css += `${camelToKebab(prop)}:${value}${unit};`;
	});

	// css += `}`;

	// Tablet + Mobile responsive
	devices.forEach((device) => {
		if (device === "Desktop") return;
		let rules = "";
		properties.forEach((prop) => {
			const value = obj[prop]?.device?.[device];
			const unit = obj[prop]?.unit?.[device] || "";
			if (value) rules += `${camelToKebab(prop)}:${value}${unit};`;
		});

		if (rules) {
			if (device === "Tablet") {
				css += `@media(max-width:${breakpoint?.tablet}px){${rules}}`;
			}
			if (device === "Mobile") {
				css += `@media(max-width:${breakpoint?.mobile}px){${rules}}`;
			}
		}
	});

	return css.length ? `${cssClass}${css}}` : "";
};

export const generateTypoSizesClass = (attr, breakpoint) => {
	const rootCSS = generateSizeRootCSS(attr, breakpoint);

	return `${rootCSS}${attr?.map((obj) => generateCSS(obj, breakpoint)).join(" ")}`;
};

export const generateShadowRootCSS = (shadows) => {
	let css = ":root {";

	shadows.forEach((shadow) => {
		const slug = shadow.slug;
		const x = shadow["x-offset"] || "0";
		const y = shadow["y-offset"] || "0";
		const blur = shadow["blur"] || "0";
		const spread = shadow["speared"] || "0";
		const color = shadow["color"] || "rgba(0,0,0,0.2)";
		const type = shadow.type === "inset" ? "inset " : "";

		css += `  --smart-post-shadow-${slug}: ${type}${x}px ${y}px ${blur}px ${spread}px ${color};`;
	});

	css += "}";

	return css;
};
