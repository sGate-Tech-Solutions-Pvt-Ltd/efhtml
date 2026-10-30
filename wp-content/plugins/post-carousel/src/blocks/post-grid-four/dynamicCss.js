import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, removeEmptyCss, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gridFourHorizontalGap,
		gridFourVerticalGap,
		gridFourColumns,
		contentVerticalPosition,
		largeItemTitleTypography,
		largeItemTitleFontSize,
		postGridLayout,
		largeItemTitleLineHeight,
		largeItemTitleLatterSpacing,
		metaLargeFontSize,
		metaLargeLineHeight,
		metaLargeFontSpacing,
		smallItemHeight,
		largeItemHeight,
		// gridSixMasonryEnable,
		metaLargeTypography,
		largeItemTitleWordSpacing,
		metaLargeWordSpacing,
		globalBreakPointData,
	} = attributes;

	const contentAreaVerticalPosition = {
		top: "start",
		center: "center",
		bottom: "end",
	}[contentVerticalPosition];

	const gridFourLargeItem = {
		"grid-four-layout-one": 2,
		"grid-four-layout-two": 1,
		"grid-four-layout-three": 3,
		"grid-four-layout-four": 1,
		"grid-four-layout-five": 1,
		"grid-four-layout-six": 1,
	}[postGridLayout];

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const gridCss = (device) => {
		const css = [
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents`,
				styles: {
					display: "grid",
					"grid-template-columns": `repeat(${gridFourColumns.device?.[device]},1fr)`,
					"column-gap": `${gridFourHorizontalGap.device?.[device]}${gridFourHorizontalGap.unit?.[device]}`,
					"row-gap": `${gridFourVerticalGap.device?.[device]}${gridFourVerticalGap.unit?.[device]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-four-container .sp-smart-post-grid-four-static-contents`,
				styles: {
					height: `${largeItemHeight.device?.[device]}${largeItemHeight.unit?.[device]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-four-container .sp-smart-post-dynamic-grid-contents .sp-smart-post-card`,
				styles: {
					height: `${smallItemHeight.device?.[device]}${smallItemHeight.unit?.[device]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-four-static-contents`,
				styles: {
					"column-gap": `${gridFourHorizontalGap.device?.[device]}${gridFourHorizontalGap.unit?.[device]}`,
					"row-gap": `${gridFourVerticalGap.device?.[device]}${gridFourVerticalGap.unit?.[device]}`,
					// 'margin-bottom': `${ gridFourVerticalGap.device[ device ] }${ gridFourVerticalGap.unit[ device ] }`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-show-pro.grid-four-container:has(.sp-smart-post-dynamic-grid-contents .sp-smart-post-card)`,
				styles: {
					display: "grid",
					"row-gap": `${gridFourVerticalGap.device?.[device] + gridFourVerticalGap.unit?.[device]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-four-container .sp-smart-post-grid-four-static-contents`,
				styles: {
					"margin-bottom": "0",
				},
			},
			{
				class: `#${uniqueId} .template-two:not(.large) .sp-smart-post-card-content`,
				styles: {
					"justify-content": "end",
				},
			},
			// large item
			{
				class: `#${uniqueId} .template-two.large`,
				styles: {
					display: "flex",
					"align-items": contentAreaVerticalPosition,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-show-pro .sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-title`,
				styles: {
					"font-size":
						largeItemTitleFontSize?.device?.[device] +
						largeItemTitleFontSize?.unit?.[device] +
						"!important",
					"font-weight": largeItemTitleTypography?.typography?.fontWeight + "!important",
					"font-style": largeItemTitleTypography?.typography?.style + "!important",
					"text-transform": largeItemTitleTypography?.typography?.transform + "!important",
					"text-decoration": largeItemTitleTypography?.typography?.decoration + "!important",
					"line-height": largeItemTitleLineHeight?.device?.[device] + "!important",
					"letter-spacing":
						largeItemTitleLatterSpacing?.device?.[device] +
						largeItemTitleLatterSpacing?.unit?.[device] +
						"!important",
					"word-spacing":
						largeItemTitleWordSpacing?.device?.[device] +
						largeItemTitleWordSpacing?.unit?.[device] +
						"!important",
				},
			},
			...removeEmptyCss(
				`#${uniqueId} .sp-smart-show-pro .sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-title`,
				"font-family",
				largeItemTitleTypography?.typography?.family,
				false
			),
			// Metadata Large items Typography.
			{
				class: `#${uniqueId} .sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-author .sp-smart-post-author-name,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-date span,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-post-show-comment span,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-view span,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-like span,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-like i,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-reading-time span`,
				styles: {
					"font-size": `${metaLargeFontSize.device?.[device]}${metaLargeFontSize.unit?.[device]} !important`,
					"font-weight": `${metaLargeTypography?.typography?.fontWeight} !important`,
					"font-style": `${metaLargeTypography?.typography?.style} !important`,
					"letter-spacing": `${metaLargeFontSpacing.device?.[device]}${metaLargeFontSpacing.unit?.[device]}`,
					"word-spacing": `${metaLargeWordSpacing.device?.[device]}${metaLargeWordSpacing.unit?.[device]}`,
					"line-height": `${metaLargeLineHeight.device?.[device]} !important`,
					display: "flex",
					"align-items": "center",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-author svg,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-date .sp-smart-post-release-date,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-post-show-comment span,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-view span:first-of-type,
				.sp-smart-post-grid-four-static-contents .sp-smart-post-card:nth-of-type(${gridFourLargeItem}) .sp-smart-post-card-content .sp-smart-post-reading-time span:first-of-type`,
				styles: {
					height: `${metaLargeFontSize.device?.[device]}${metaLargeFontSize.unit?.[device]} !important`,
					width: `${metaLargeFontSize.device?.[device]}${metaLargeFontSize.unit?.[device]} !important`,
					display: "flex",
					"align-items": "center",
				},
			},
		];
		return css;
	};

	// desktop styles
	const desktopCss = [...sharedDesktopCss, ...gridCss("Desktop")];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet styles
		const tabletCss = [...sharedTabletCss, ...gridCss("Tablet")];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile styles
		const mobileCss = [
			...sharedMobileCss,
			...gridCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents, #${uniqueId} .sp-smart-post-grid-four-static-contents`,
				styles: {
					display: "grid",
					"grid-template-columns": `repeat(${gridFourColumns.device.Mobile || 1}, 1fr)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-show-pro.grid-four-container .sp-smart-post-grid-four-static-contents .sp-smart-post-card`,
				styles: {
					// 'grid-column': '1 / 1',
					// 'grid-row': 'auto',
					height: `${smallItemHeight.device.Mobile + smallItemHeight.unit.Mobile}`,
				},
			},
		];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
