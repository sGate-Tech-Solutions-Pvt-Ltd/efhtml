import { objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		paginationTypography,
		paginationBorder,
		paginationColor,
		paginationBGColor,
		navigationArrowWidth,
		navigationArrowSize,
		navigationArrowHeight,
		paginationSpaceBetween,
		paginationFontSize,
		paginationLetterSpacing,
		paginationBorderRadius,
		paginationBorderWidth,
		paginationPadding,
		paginationMargin,
		paginationLineHeight,
		paginationType,
		paginationWordSpacing,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		globalBreakPointData,
	} = attributes;

	const typographyCss = (attr) => {
		return {
			"font-family": attr?.typography?.family,
			"font-weight": attr?.typography?.fontWeight,
			"font-style": attr?.typography?.style,
			"text-decoration": attr?.typography?.decoration,
			"text-transform": attr?.typography?.transform,
		};
	};

	// Load more button css.
	const loadMoreButtonCss = () => {
		return ["load-more", "pagination", "navigation"].includes(paginationType)
			? [
					{
						class: `#${uniqueId} .sp-smart-post-pagination-buttons span, #${uniqueId} .sp-smart-post-pagination-buttons a, #${uniqueId} .sp-smart-post-navigation-buttons span, #${uniqueId} .sp-smart-post-load-more-button a`,
						styles: {
							...typographyCss(paginationTypography),
							"border-style": paginationBorder.style,
							"border-color": paginationBorder.color,
							color: paginationColor.color,
							"background-color": paginationBGColor.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-navigation-buttons span svg`,
						styles: {
							fill: paginationColor.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-buttons a:hover, #${uniqueId} .sp-smart-post-pagination-buttons .current,
						#${uniqueId} .sp-smart-post-navigation-buttons span:hover,
						#${uniqueId} .sp-smart-post-load-more-button a:hover`,
						styles: {
							color: paginationColor.hoverColor,
							"background-color": paginationBGColor.hoverColor,
							"border-color": paginationBorder.hoverColor,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-navigation-buttons:not(.sp-prev-next) span`,
						styles: {
							width: rangerCss(navigationArrowWidth),
							height: rangerCss(navigationArrowHeight),
							"font-size": rangerCss(navigationArrowSize),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-navigation-buttons:not(.sp-prev-next) span svg`,
						styles: {},
					},
					{
						class: `#${uniqueId} .sp-smart-post-navigation-buttons .sp-smart-post-grid-nav-arrow, #${uniqueId} .sp-smart-post-pagination-buttons, #${uniqueId} .sp-smart-post-load-more-button`,
						styles: {
							gap: rangerCss(paginationSpaceBetween),
						},
					},
				]
			: [];
	};

	// Load more button responsive css.
	const loadMoreButtonResponsiveCss = (deviceType) => {
		return ["load-more", "pagination", "navigation"].includes(paginationType)
			? {
					[`#${uniqueId} .sp-smart-post-pagination-buttons span, #${uniqueId} .sp-smart-post-pagination-buttons a, #${uniqueId} .sp-smart-post-navigation-buttons span, #${uniqueId} .sp-smart-post-load-more-button a`]:
						{
							"font-size": rangerCss(paginationFontSize, deviceType),
							"letter-spacing": rangerCss(paginationLetterSpacing, deviceType),
							"word-spacing": rangerCss(paginationWordSpacing, deviceType),
							"line-height": rangerCss(paginationLineHeight, deviceType),
							padding: spacingGenerate(paginationPadding, deviceType),
							"border-width": spacingGenerate(paginationBorderWidth, deviceType),
							"border-radius": spacingGenerate(paginationBorderRadius, deviceType),
						},
					[`#${uniqueId} .sp-smart-post-navigation-buttons:not(.sp-prev-next) span`]: {
						width: rangerCss(navigationArrowWidth, deviceType),
						height: rangerCss(navigationArrowHeight, deviceType),
						"font-size": rangerCss(navigationArrowSize, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-navigation-buttons:not(.sp-prev-next) span svg`]: {
						width: rangerCss(navigationArrowSize, deviceType),
						height: rangerCss(navigationArrowSize, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-navigation-buttons .sp-smart-post-grid-nav-arrow, #${uniqueId} .sp-smart-post-pagination-buttons, #${uniqueId} .sp-smart-post-load-more-button`]:
						{
							margin: spacingGenerate(paginationMargin, deviceType),
							gap: rangerCss(paginationSpaceBetween, deviceType),
						},
				}
			: {};
	};

	const responsive = (deviceType) => {
		return {
			...loadMoreButtonResponsiveCss(deviceType),
		};
	};

	const dynamicCssBtn = () => {
		return [...loadMoreButtonCss()];
	};

	const desktopCss = [
		...dynamicCssBtn()?.map((css) => ({
			...css,
			styles: {
				...css.styles,
				...responsive("Desktop")[css.class],
			},
		}))
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Add Tablet styles
		const tabletCss = [
			...dynamicCssBtn()?.map((css) => ({
				...css,
				styles: { ...responsive("Tablet")[css.class] },
			}))
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Add Mobile styles
		const mobileCss = [
			...dynamicCssBtn()?.map((css) => ({
				...css,
				styles: { ...responsive("Mobile")[css.class] },
			}))
		];
		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
