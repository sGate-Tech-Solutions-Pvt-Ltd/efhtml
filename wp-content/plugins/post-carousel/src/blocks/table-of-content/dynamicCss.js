import {
	boxCss,
	colorControls,
	objectToCssString,
	rangerCss,
	spacingGenerate,
	wrapInMediaQuery,
} from "../shared/helpFn";

const dynamicCss = (attributes) => {
	const {
		uniqueId,
		headingAlignment,
		bottomGap,
		headingLineHeight,
		headingWordSpacing,
		headingLetterSpacing,
		headingFontSize,
		headingTypography,
		headingBg,
		headingColor,
		headingPadding,
		headingBorderWidth,
		headingBorder,
		headingBorderRadius,
		listTypography,
		listFontSize,
		listLetterSpacing,
		listLineHeight,
		listWordSpacing,
		contentColor,
		contentChildColor,
		tocPadding,
		tocBorderWidth,
		tocBorder,
		tocBg,
		TOCBorderRadius,
		tocBoxShadow,
		tocBoxShadowEnable,
		hierarchyDistance,
		separatorStyle,
		separatorThickness,
		separator,
		separatorColor,
		tocAlignment,
		collapsibleBg,
		collapsibleBorderWidth,
		collapsibleBorder,
		collapsibleBorderRadius,
		collapsiblePadding,
		collapseLineHeight,
		collapseWordSpacing,
		collapseLetterSpacing,
		collapseFontSize,
		collapseTypography,
		collapsibleColor,
		preset,
		itemBg,
		activeLineColor,
		stickyOffsetTop,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		listHierarchy,
		tocWidth,
	} = attributes;

	const getTypographyStyles = ({
		typography,
		fontSize,
		fontSpacing,
		lineHeight,
		wordSpacing,
		device = "Desktop",
	}) => {
		const { family, fontWeight, decoration, transform, style } = typography;
		const typographyStyles = {
			"font-family": family,
			"font-weight": fontWeight,
			"text-decoration": decoration,
			"text-transform": transform,
			"font-style": style,
		};

		const fontStyles = {};
		const styleProperties = [
			{ key: "font-size", source: fontSize },
			{ key: "letter-spacing", source: fontSpacing },
			{ key: "line-height", source: lineHeight },
			{ key: "word-spacing", source: wordSpacing },
		];
		styleProperties.forEach(({ key, source }) => {
			if (source?.device?.[device]) {
				fontStyles[key] = source.device?.[device] + (source?.unit?.[device] || "");
			}
		});
		return device === "Desktop" ? { ...typographyStyles, ...fontStyles } : fontStyles;
	};

	const tocResponsiveCss = (deviceType) => {
		const allResponsiveCss = [
			{
				class: `#${uniqueId}`,
				styles: {
					width: rangerCss(tocWidth, deviceType) + " !important",
				},
			},
			{
				class: `#${uniqueId}.sp-table-of-content-toc.sp-toc-position-sticky`,
				styles: {
					top: rangerCss(stickyOffsetTop, deviceType),
				},
			},
			{
				class: `#${uniqueId}.sp-table-of-content-toc.sp-toc-position-floating.sp-toc-floating-top-left, #${uniqueId}.sp-table-of-content-toc.sp-toc-position-floating.sp-toc-floating-top-right, #${uniqueId}.sp-table-of-content-toc.sp-toc-position-floating.sp-toc-floating-top-center`,
				styles: {
					top: rangerCss(stickyOffsetTop, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sps-toc-list`,
				styles: {
					"text-align": tocAlignment,
				},
			},

			{
				class: `#${uniqueId} .sps-toc-style-romanAlphabeticMix .sps-toc-text`,
				styles: {
					"padding-left": !listHierarchy ? "20px" : "2px",
				},
			},

			{
				class: `#${uniqueId} .sps-toc-header`,
				styles: {
					"justify-content": headingAlignment,
				},
			},
			{
				class: `#${uniqueId} .sps-toc-wrapper`,
				styles: {
					background: colorControls(tocBg.color.style, tocBg.color.solidColor, tocBg.color.gradient),

					padding: spacingGenerate(tocPadding, deviceType),
					"border-radius": spacingGenerate(TOCBorderRadius, deviceType),

					"border-style": tocBorder.style,
					"border-color": tocBorder.color,
					"border-width": spacingGenerate(tocBorderWidth, deviceType),

					"box-shadow": boxCss(tocBoxShadowEnable, deviceType, tocBoxShadow, "color"),
				},
			},

			{
				class: `#${uniqueId} .sps-toc-main-toggle`,
				styles: {
					background: colorControls(
						collapsibleBg.color.style,
						collapsibleBg.color.solidColor,
						collapsibleBg.color.gradient
					),
					"border-style": collapsibleBorder.style,
					"border-color": collapsibleBorder.color,
					"border-width": spacingGenerate(collapsibleBorderWidth, deviceType),
					"border-radius": spacingGenerate(collapsibleBorderRadius, deviceType),
					padding: spacingGenerate(collapsiblePadding, deviceType),
					...getTypographyStyles({
						typography: collapseTypography.typography,
						fontSize: collapseFontSize,
						fontSpacing: collapseLetterSpacing,
						lineHeight: collapseLineHeight,
						wordSpacing: collapseWordSpacing,
					}),

					color: collapsibleColor.color,
				},
			},
			{
				class: `#${uniqueId} .sps-toc-wrapper:hover`,
				styles: {
					background: colorControls(tocBg.hover.style, tocBg.hover.solidColor, tocBg.color.gradient),
				},
			},

			{
				class: `#${uniqueId} .sps-toc-header-row`,
				styles: {
					"margin-bottom": rangerCss(bottomGap, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sps-toc-title`,
				styles: {
					...getTypographyStyles({
						typography: headingTypography.typography,
						fontSize: headingFontSize,
						fontSpacing: headingLetterSpacing,
						lineHeight: headingLineHeight,
						wordSpacing: headingWordSpacing,
					}),
					color: headingColor.color,
					background: colorControls(
						headingBg.color.style,
						headingBg.color.solidColor,
						headingBg.color.gradient
					),
					"border-radius": spacingGenerate(headingBorderRadius, deviceType),

					"border-style": headingBorder.style,
					"border-color": headingBorder.color,
					"border-width": spacingGenerate(headingBorderWidth, deviceType),
					padding: spacingGenerate(headingPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sps-toc-title:hover`,
				styles: {
					color: headingColor.hoverColor,
					background: colorControls(
						headingBg.hover.style,
						headingBg.hover.solidColor,
						headingBg.hover.gradient
					),
				},
			},

			{
				class: `#${uniqueId} .sps-toc-link, #${uniqueId} .sps-toc-copy`,
				styles: {
					...getTypographyStyles({
						typography: listTypography.typography,
						fontSize: listFontSize,
						fontSpacing: listLetterSpacing,
						lineHeight: listLineHeight,
						wordSpacing: listWordSpacing,
					}),
					color: contentColor.color,
					"margin-right": "5px",
				},
			},

			{
				class: ` #${uniqueId} .presetTwo .sps-toc-style-bullet .sps-toc-link-wrapper::before, 
				#${uniqueId} .presetFive .sps-toc-style-bullet .sps-toc-link-wrapper::before `,
				styles: {
					color: contentColor.color,
				},
			},
			{
				class: `#${uniqueId} .sps-toc-link:hover, #${uniqueId} .presetTwo .sps-toc-style-bullet .sps-toc-link-wrapper:hover::before,
				 #${uniqueId} .presetFive .sps-toc-style-bullet .sps-toc-link-wrapper:hover::before`,
				styles: {
					color: contentColor.hoverColor,
				},
			},

			{
				class: `#${uniqueId} .sps-toc-sublist .sps-toc-link, #${uniqueId} .presetTwo .sps-toc-style-bullet .sps-toc-sublist .sps-toc-link-wrapper::before,
				 #${uniqueId} .presetFive .sps-toc-style-bullet .sps-toc-sublist .sps-toc-link-wrapper::before`,
				styles: {
					color: contentChildColor.color,
				},
			},

			{
				class: `#${uniqueId} .sps-toc-sublist .sps-toc-link:hover,
            #${uniqueId} .presetTwo .sps-toc-style-bullet .sps-toc-sublist .sps-toc-link-wrapper:hover::before,  
			 #${uniqueId} .presetFive .sps-toc-style-bullet .sps-toc-sublist .sps-toc-link-wrapper:hover::before`,
				styles: {
					color: contentChildColor.hoverColor,
				},
			},

			{
				class: `#${uniqueId} .sps-toc-sublist`,
				styles: {
					"margin-left": `${hierarchyDistance.device?.[deviceType]}${hierarchyDistance.unit?.[deviceType]}`,
				},
			},

			{
				class: `#${uniqueId} .sps-toc-link-wrapper`,
				styles: {
					"border-bottom": separator ? `${separatorThickness}px ${separatorStyle} ${separatorColor}` : "",
					// padding: `${cssDataCheck(gapBetweenListItems.device?.[deviceType], unit(gapBetweenListItems, deviceType))} 10px`,
					"border-radius": separator ? "0px" : "4px",

					// padding: spacingGenerate(gapBetweenListItems, [deviceType]),
				},
			},

			{
				class: `#${uniqueId} .sps-toc-selected-background`,
				styles: {
					background: ["presetTwo", "presetFive"].includes(preset)
						? colorControls(itemBg.color.style, itemBg.color.solidColor, itemBg.color.gradient)
						: "",
				},
			},

			{
				class: `#${uniqueId} .sps-toc-selected-background .sps-toc-link`,
				styles: {
					color: ["presetThree", "presetFour"].includes(preset) ? activeLineColor : "",
				},
			},

			{
				class: `#${uniqueId} .sps-toc-indicator`,
				styles: {
					"background-color": activeLineColor,
				},
			},

			{
				class: `#${uniqueId} .sps-toc-item:has(> .sps-toc-link-wrapper.sps-toc-selected-background)::marker `,
				styles: {
					color: ["presetThree", "presetFour"].includes(preset) ? activeLineColor : "",
				},
			},
		];

		return allResponsiveCss;
	};

	const desktopCss = [
		...tocResponsiveCss("Desktop")
	];
	// Tablet CSS styles.
	const tabletCss = [
		...tocResponsiveCss("Tablet")
	];

	// Mobile CSS styles.
	const mobileCss = [
		...tocResponsiveCss("Mobile")
	];

	const tabletMediaQueryCss = wrapInMediaQuery(objectToCssString(tabletCss), "only screen and (max-width: 1023px)");
	const mobileMediaQueryCss = wrapInMediaQuery(objectToCssString(mobileCss), "only screen and (max-width: 599px)");

	return `${objectToCssString(desktopCss)} ${tabletMediaQueryCss} ${mobileMediaQueryCss}`;
};
export default dynamicCss;
