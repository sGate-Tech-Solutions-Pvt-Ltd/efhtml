import { boxCss, objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

// eslint-disable-next-line no-unused-vars
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		fieldLabelColor,
		fieldBorder,
		fieldBorderWidth,
		fieldBorderRadius,
		fieldPadding,
		dropdownOptionColor,
		dropdownOptionBg,
		dropdownOptionBorder,
		dropdownOptionBorderWidth,
		dropdownBorderRadius,
		dropdownAlignment,
		dropdownShadowEnable,
		dropdownShadow,
		dropdownPadding,
		searchBorder,
		searchBorderWidth,
		buttonColor,
		buttonBg,
		buttonBorder,
		buttonBorderWidth,
		buttonBorderRadius,
		buttonBorderHover,
		buttonBorderWidthHover,
		buttonBorderRadiusHover,
		buttonPadding,
		filterType,
		buttonGap,
		dropdownMargin,
		globalBreakPointData,
		filterWidth,
	} = attributes;

	const commonCss = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-live-filter`,
				styles: {
					width: rangerCss( filterWidth ),
				}
			},
		]
	}

	// Select field css.
	const fieldCss = () => {
		return "dropdown" === filterType
			? [
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-label`,
						styles: {
							color: fieldLabelColor,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-btn, #${uniqueId} .sp-smart-post-live-filter-btn svg path`,
						styles: {
							color: dropdownOptionColor.color,
							stroke: dropdownOptionColor.color,
							background: dropdownOptionBg.color,
							"border-color": fieldBorder.color,
							"border-style": fieldBorder.style,
							"border-width": spacingGenerate(fieldBorderWidth),
							"border-radius": spacingGenerate(fieldBorderRadius),
							padding: spacingGenerate(fieldPadding),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-dropdown`,
						styles: {
							background: dropdownOptionBg.color,
							"box-shadow": boxCss(dropdownShadowEnable, "Desktop", dropdownShadow, "color"),
							"text-align": dropdownAlignment,
							"border-color": dropdownOptionBorder.color,
							"border-style": dropdownOptionBorder.style,
							"border-width": spacingGenerate(dropdownOptionBorderWidth),
							"border-radius": spacingGenerate(dropdownBorderRadius),
							margin: spacingGenerate(dropdownMargin),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-dropdown li a`,
						styles: {
							color: dropdownOptionColor.color,
							padding: spacingGenerate(dropdownPadding),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-dropdown li .sp-smart-post-search-field input::placeholder`,
						styles: {
							color: dropdownOptionColor.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-dropdown li .sp-smart-post-search-field input`,
						styles: {
							color: dropdownOptionColor.color,
							background: dropdownOptionBg.color,
							"border-color": searchBorder.color,
							"border-style": searchBorder.style,
							"border-width": spacingGenerate(searchBorderWidth),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-dropdown li a.active, #${uniqueId} .sp-smart-post-live-filter-dropdown li a:hover`,
						styles: {
							color: dropdownOptionColor.hover,
							background: dropdownOptionBg.hover,
						},
					},
				]
			: [];
	};

	// Button css.
	const buttonCss = () => {
		return "button" === filterType
			? [
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-button`,
						styles: {
							gap: rangerCss(buttonGap),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-button li a`,
						styles: {
							color: buttonColor.color,
							background: buttonBg.color,
							"border-style": buttonBorder.style,
							"border-color": buttonBorder.color,
							"border-width": spacingGenerate(buttonBorderWidth),
							"border-radius": spacingGenerate(buttonBorderRadius),
							padding: spacingGenerate(buttonPadding),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-live-filter-button li a:hover,
                #${uniqueId} .sp-smart-post-live-filter-button li a.active,
                #${uniqueId} .sp-smart-post-live-filter-button li a:focus`,
						styles: {
							color: buttonColor.hover,
							background: buttonBg.hover + " !important",
							"border-style": buttonBorderHover.style,
							"border-color": buttonBorderHover.color,
							"border-width": spacingGenerate(buttonBorderWidthHover),
							"border-radius": spacingGenerate(buttonBorderRadiusHover),
						},
					},
				]
			: [];
	};

	// Load more button responsive css.
	const fieldResponsiveCss = ( deviceType ) => {
		return {
			[`#${uniqueId} .sp-smart-post-live-filter-btn, #${uniqueId} .sp-smart-post-live-filter-btn svg path`]: {
				"border-width": spacingGenerate(fieldBorderWidth, deviceType),
				"border-radius": spacingGenerate(fieldBorderRadius, deviceType),
				padding: spacingGenerate(fieldPadding, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-live-filter-dropdown`]: {
				"box-shadow": boxCss(dropdownShadowEnable, deviceType, dropdownShadow, "color"),
				"border-width": spacingGenerate(dropdownOptionBorderWidth, deviceType),
				"border-radius": spacingGenerate(dropdownBorderRadius, deviceType),
				margin: spacingGenerate(dropdownMargin, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-live-filter-dropdown li a`]: {
				padding: spacingGenerate(dropdownPadding, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-live-filter-dropdown li .sp-smart-post-search-field input`]: {
				"border-width": spacingGenerate(searchBorderWidth, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-live-filter-button`]: {
				gap: rangerCss(buttonGap, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-live-filter-button li a`]: {
				"border-width": spacingGenerate(buttonBorderWidth, deviceType),
				"border-radius": spacingGenerate(buttonBorderRadius, deviceType),
				padding: spacingGenerate(buttonPadding, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-live-filter-button li a:hover,
                #${uniqueId} .sp-smart-post-live-filter-button li a.active,
                #${uniqueId} .sp-smart-post-live-filter-button li a:focus`]: {
				"border-width": spacingGenerate(buttonBorderWidthHover, deviceType),
				"border-radius": spacingGenerate(buttonBorderRadiusHover, deviceType),
			},			
			[`#${uniqueId} .sp-smart-post-live-filter`]: {
				width: rangerCss( filterWidth, deviceType ),
			}
		};
	};

	const responsive = (deviceType) => {
		return {
			...fieldResponsiveCss(deviceType),
		};
	};

	const getCss = () => {
		return [
			...fieldCss(),
			...buttonCss(),
			...commonCss(),
		];
	};

	const desktopCss = [
		...getCss()?.map((css) => ({
			...css,
			styles: {
				...css.styles,
				...responsive("Desktop")[css.class],
			},
		})),
	];
	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Add Tablet styles
		const tabletCss = [
			...getCss()?.map((css) => ({
				...css,
				styles: { ...responsive("Tablet")[css.class] },
			})),
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Add Mobile styles
		const mobileCss = [
			...getCss()?.map((css) => ({
				...css,
				styles: { ...responsive("Mobile")[css.class] },
			})),
		];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
