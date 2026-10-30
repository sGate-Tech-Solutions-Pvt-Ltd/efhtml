import { objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const cacheCss = { desktop: "", tablet: "", mobile: "" };

	const {
		uniqueId,
		gap,
		titleTypography,
		titleFontSize,
		titleLineHeight,
		optionTypography,
		optionFontSize,
		optionLineHeight,
		titleColor,
		optionColor,
		bgColor,
		borderNormal,
		borderWidthNormal,
		borderRadiusNormal,
		padding,
		margin,
		fieldAlignment,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		globalBreakPointData,
		menuAlignment,
		menuTypography,
		menuFontSize,
		menuLatterSpacing,
		menuLineHeight,
		menuWordSpacing,
		menuColor,
		activeBottomLine,
		headingTypography,
		headingLineHeight,
		headingWordSpacing,
		headingLatterSpacing,
		headingFontSize,
		headingGlobalTypography,
		widthLineThickness,
		headingColor,
		headingBg,
		headingBorder,
		headingBorderWidth,
		headingBorderRadius,
		headingPadding,
		widthLineColor,
		headingStyle,
	} = attributes;

	// Safe fallback breakpoints
	const tabletBp = globalBreakPointData?.tablet || 1024;
	const mobileBp = globalBreakPointData?.mobile || 767;

	// Simplified typography function (flat structure)
	const typographyCss = (attr) => {
		return {
			"font-family": attr.typography.family,
			"font-weight": attr.typography.fontWeight,
			"font-style": attr.typography.style,
			"text-decoration": attr.typography.decoration,
			"text-transform": attr.typography.transform,
		};
	};

	// Responsive inner width
	const innerBlockWidth = {
		Desktop: "33.33%",
		Tablet: "50%",
		Mobile: "100%",
	};

	// Base CSS (shared for all devices)
	const baseLiveFilterCss = () => [
		{
			class: `#${uniqueId} .block-editor-block-list__layout, #${uniqueId} .wp-block-sp-smart-post-show-live-filter`,
			styles: {
				display: "flex",
				"justify-content": fieldAlignment === "full" ? "stretch" : fieldAlignment,
			},
		},
		{
			class: `#${uniqueId}.sp-smart-full.sp-width-33 .block-editor-block-list__layout .block-editor-block-list__block, #${uniqueId}.sp-smart-full.sp-width-33 .wp-block-sp-smart-post-show-live-filter > .sp-smart-post-live-filter`,
			styles: {
				width: `calc(${innerBlockWidth["Desktop"]} - ${rangerCss(gap, "Desktop")})`,
			},
		},
		{
			class: `#${uniqueId}`,
			styles: {
				margin: spacingGenerate(margin),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-live-filter-label`,
			styles: {
				...typographyCss(titleTypography),
				color: titleColor?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-live-filter-button li a,
              #${uniqueId} .sp-smart-post-live-filter-dropdown li a,
              #${uniqueId} .sp-smart-post-live-filter-btn,
              #${uniqueId} .sp-smart-post-live-filter-btn svg path`,
			styles: {
				...typographyCss(optionTypography),
				color: optionColor?.color,
				stroke: optionColor?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-live-filter-btn`,
			styles: {
				"border-color": borderNormal?.color,
				"border-style": borderNormal?.style,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-live-filter-btn input,
              #${uniqueId} .sp-smart-post-live-filter-btn input::placeholder, #${uniqueId} .sp-smart-post-live-filter-button li a`,
			styles: {
				...typographyCss(optionTypography),
				color: optionColor?.color,
				background: bgColor?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-live-filter-dropdown,
              #${uniqueId} .sp-smart-post-live-filter-btn`,
			styles: {
				background: bgColor?.color,
			},
		},
		{
			class: `#${uniqueId}.layoutOne .sp-smart-post-live-filter-button li a.active,
              #${uniqueId}.layoutOne .sp-smart-post-live-filter-dropdown li a.active,
              #${uniqueId}.layoutOne .sp-smart-post-live-filter-button li a:hover,
              #${uniqueId}.layoutOne .sp-smart-post-live-filter-dropdown li a:hover`,
			styles: {
				color: optionColor?.hover,
				stroke: optionColor?.hover,
				background: bgColor?.hover,
			},
		},
		{
			class: `#${uniqueId} .sps-live-filter-nav-menu`,
			styles: { gap: rangerCss(gap, currentDevice) },
		},
		{
			class: `#${uniqueId} .sps-live-filter-nav-container`,
			styles: {
				"justify-content": menuAlignment,

				"border-bottom": ["styleOne", "styleThree"].includes(headingStyle)
					? `${widthLineColor} solid ${widthLineThickness}px`
					: "",
			},
		},
		{
			class: `#${uniqueId} .sps-live-filter-nav-link, #${uniqueId} .sps-live-filter-dropdown-item`,
			styles: {
				...typographyCss(menuTypography),
				color: menuColor?.color,
			},
		},
		{
			class: `#${uniqueId} .sps-live-filter-dropdown-item.active`,
			styles: {
				color: menuColor?.color,
				background: menuColor?.hover,
			},
		},

		{
			class: `#${uniqueId} .sps-live-filter-nav-link:hover, #${uniqueId} .sps-live-filter-dropdown-item:hover`,
			styles: {
				color: menuColor?.hover,
			},
		},

		// base (non-active)
		{
			class: `#${uniqueId}.layoutTwo .sps-live-filter-nav-link`,
			styles: {
				color: menuColor?.color,
				// "border-bottom": `${widthLineThickness}px solid transparent`,
				// "margin-bottom": `-${widthLineThickness}px`,
				// transition: "color 0.5s ease, border-color 0.5s ease",
			},
		},

		{
			class: `#${uniqueId}.layoutTwo .sps-live-filter-nav-link.active `,
			styles: {
				color: menuColor?.hover,
				"border-bottom": activeBottomLine ? `${widthLineThickness}px solid ${menuColor?.hover}` : "",
				"margin-bottom": `-${widthLineThickness}px`,
			},
		},

		{
			class: `#${uniqueId}.layoutTwo .sps-live-filter-dropdown-menu .sps-live-filter-nav-link.active `,
			styles: {
				color: menuColor?.hover,
				"border-bottom": activeBottomLine ? ` 0px solid ${menuColor?.hover}` : "",
			},
		},

		{
			class: `#${uniqueId} .sps-live-filter-latest-post-btn `,
			styles: {
				...typographyCss(headingTypography),
				color: headingColor?.color,
				background: headingBg.color,
				"border-color": headingBorder?.color,
				"border-style": headingBorder?.style,
				"border-bottom": ["styleTwo", "styleThree"].includes(headingStyle) ? `4px solid #503AA8` : "",
				"border-left": "styleFour" === headingStyle ? "4px solid #503AA8" : "",
			},
		},

		{
			class: `#${uniqueId} .sps-live-filter-latest-post-btn:hover `,
			styles: {
				color: headingColor?.hover,
				background: headingBg.hover,
			},
		},
	];

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sps-live-filter-nav-link, #${uniqueId} .sps-live-filter-dropdown-item`,
				styles: {
					"font-size": rangerCss(menuFontSize, deviceType),
					"line-height": menuLineHeight?.device?.[deviceType],
					"letter-spacing": rangerCss(menuLatterSpacing),
					"word-spacing": rangerCss(menuWordSpacing),
				},
			},
			{
				class: `#${uniqueId} .sps-live-filter-latest-post-btn `,
				styles: {
					"font-size": rangerCss(headingFontSize, deviceType),
					"line-height": headingLineHeight?.device?.[deviceType],
					"letter-spacing": rangerCss(headingLatterSpacing),
					"word-spacing": rangerCss(headingWordSpacing),
					"border-width": spacingGenerate(headingBorderWidth, deviceType),
					"border-radius": spacingGenerate(headingBorderRadius, deviceType),
					padding: spacingGenerate(headingPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .block-editor-block-list__layout, #${uniqueId} .wp-block-sp-smart-post-show-live-filter`,
				styles: {
					gap: rangerCss(gap, deviceType),
				},
			},
			{
				class: `#${uniqueId}.sp-smart-full.sp-width-33 .block-editor-block-list__layout .block-editor-block-list__block,
       			#${uniqueId}.sp-smart-full.sp-width-33 .wp-block-sp-smart-post-show-live-filter > .sp-smart-post-live-filter`,
				styles: {
					width: `calc(${innerBlockWidth[deviceType]} - ${rangerCss(gap, deviceType)})`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-live-filter-label`,
				styles: {
					"font-size": rangerCss(titleFontSize, deviceType),
					"line-height": titleLineHeight?.device?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-live-filter-button li a,
       			#${uniqueId} .sp-smart-post-live-filter-dropdown li a,
       			#${uniqueId} .sp-smart-post-live-filter-btn,
       			#${uniqueId} .sp-smart-post-live-filter-btn svg path`,
				styles: {
					"font-size": rangerCss(optionFontSize, deviceType),
					"line-height": optionLineHeight?.device?.[deviceType],
					padding: spacingGenerate(padding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-live-filter-btn`,
				styles: {
					"border-width": spacingGenerate(borderWidthNormal, deviceType),
					"border-radius": spacingGenerate(borderRadiusNormal, deviceType),
				},
			},
		];
	}

	// Desktop
	if (["Desktop", "all"].includes(currentDevice)) {
		const desktopCss = [
			...baseLiveFilterCss(),
			...responsiveCss("Desktop"),
		];
		cacheCss.desktop = objectToCssString(desktopCss);
	}

	//  Tablet
	if (["Tablet", "all"].includes(currentDevice)) {
		const tabletCss = [
			...baseLiveFilterCss(),
			...responsiveCss("Tablet"),
		];
		cacheCss.tablet = wrapInMediaQuery(objectToCssString(tabletCss), `only screen and (max-width: ${tabletBp}px)`);
	}

	// Mobile
	if (["Mobile", "all"].includes(currentDevice)) {
		const mobileCss = [
			...baseLiveFilterCss(),
			...responsiveCss("Mobile"),
		];
		cacheCss.mobile = wrapInMediaQuery(objectToCssString(mobileCss), `only screen and (max-width: ${mobileBp}px)`);
	}

	// Return final combined CSS
	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
