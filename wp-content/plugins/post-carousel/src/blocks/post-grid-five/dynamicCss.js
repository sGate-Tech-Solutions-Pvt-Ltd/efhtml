import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, removeEmptyCss, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gridFiveColumns,
		gridFiveHorizontalGap,
		gridFiveVerticalGap,
		postGridLayout,
		largeItemTitleFontSize,
		largeItemTitleTypography,
		largeItemTitleLatterSpacing,
		largeItemTitleLineHeight,
		metaLargeFontSize,
		metaLargeFontSpacing,
		metaLargeLineHeight,
		largeItemHeight,
		smallItemHeight,
		equalHeightEnable,
		largeItemTitleWordSpacing,
		metaLargeWordSpacing,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const imagePosition = {
		"grid-five-layout-one": 1,
		"grid-five-layout-two": 2,
		"grid-five-layout-three": 3,
		"grid-five-layout-four": 1,
		"grid-five-layout-five": 1,
		"grid-five-layout-six": 3,
		"grid-five-layout-seven": 4,
		"grid-five-layout-eight": 2,
		"grid-five-layout-nine": 4,
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-grid-five-static-contents:has(.sp-smart-post-card )`,
				styles: {
					"grid-template-columns": `repeat(${gridFiveColumns.device?.[deviceType]}, 1fr)`,
					"column-gap": `${gridFiveHorizontalGap.device?.[deviceType]}${gridFiveHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridFiveVerticalGap.device?.[deviceType]}${gridFiveVerticalGap.unit?.[deviceType]}`,
					"margin-top": `${gridFiveVerticalGap.device?.[deviceType]}${gridFiveVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-five-container .sp-smart-post-grid-five-dynamic-contents`,
				styles: {
					height: `${largeItemHeight.device?.[deviceType]}${largeItemHeight.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-five-container .sp-smart-post-grid-five-static-contents .sp-smart-post-card`,
				styles: {
					"min-height": equalHeightEnable
						? "auto"
						: `${smallItemHeight.device?.[deviceType]}${smallItemHeight.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-five-dynamic-contents`,
				styles: {
					"column-gap": `${gridFiveHorizontalGap.device?.[deviceType]}${gridFiveHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridFiveVerticalGap.device?.[deviceType]}${gridFiveVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-title`,
				styles: {
					"font-size":
						largeItemTitleFontSize.device?.[deviceType] +
						largeItemTitleFontSize.unit?.[deviceType] +
						" !important",
					"letter-spacing":
						largeItemTitleLatterSpacing.device?.[deviceType] +
						largeItemTitleLatterSpacing.unit?.[deviceType],
					"word-spacing":
						largeItemTitleWordSpacing.device?.[deviceType] + largeItemTitleWordSpacing.unit?.[deviceType],
					"line-height": largeItemTitleLineHeight.device?.[deviceType] + " !important",
				},
			},
			// Metadata Large items Typography.
			{
				class: `#${uniqueId} .sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-author .sp-smart-post-author-name,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-date span,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-post-show-comment span,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-view span,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-like span,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-like i,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-reading-time span`,
				styles: {
					"font-size": `${metaLargeFontSize.device?.[deviceType]}${metaLargeFontSize.unit?.[deviceType]} !important`,
					"letter-spacing": `${metaLargeFontSpacing.device?.[deviceType]}${metaLargeFontSpacing.unit?.[deviceType]}`,
					"word-spacing": `${metaLargeWordSpacing.device?.[deviceType]}${metaLargeWordSpacing.unit?.[deviceType]}`,
					"line-height": `${metaLargeLineHeight.device?.[deviceType]} !important`,
					display: "flex",
					"align-items": "center",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-author svg,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-date .sp-smart-post-release-date,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-post-show-comment span,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-view span:first-of-type,
				.sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-reading-time span:first-of-type`,
				styles: {
					height: `${metaLargeFontSize.device?.[deviceType]}${metaLargeFontSize.unit?.[deviceType]} !important`,
					width: `${metaLargeFontSize.device?.[deviceType]}${metaLargeFontSize.unit?.[deviceType]} !important`,
					display: "flex",
					"align-items": "center",
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-title`,
			styles: {
				"font-style": largeItemTitleTypography.typography.style || "normal",
				"text-decoration": largeItemTitleTypography.typography.decoration + " !important",
				"text-transform": largeItemTitleTypography.typography.transform + " !important",
			},
		},
		...removeEmptyCss(
			`#${uniqueId} .sp-smart-post-grid-five-dynamic-contents > div:nth-of-type(${imagePosition[postGridLayout]}) .sp-smart-post-card-content .sp-smart-post-title`,
			"font-family",
			largeItemTitleTypography.typography.family,
			true
		),
	];
	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet CSS styles.
		const tabletCss = [...sharedTabletCss, ...responsiveCss("Tablet")];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile CSS styles.
		const mobileCss = [
			...sharedMobileCss,
			...responsiveCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-grid-five-static-contents, #${uniqueId} .grid-five-container .sp-smart-post-grid-five-dynamic-contents `,
				styles: {
					"grid-template-areas": `"post1" "post2" "post3"`,
					"grid-template-columns": `repeat(${gridFiveColumns.device.Mobile || 1}, 1fr)`,
				},
			},
			{
				class: `#${uniqueId} .grid-five-container .sp-smart-post-grid-five-dynamic-contents .sp-smart-post-card `,
				styles: {
					// 'grid-column': '1 / 1',
					// 'grid-row': 'auto',
					height: `${smallItemHeight.device.Mobile}${smallItemHeight.unit.Mobile} !important`,
				},
			},
			{
				class: `#${uniqueId} .grid-five-container .sp-smart-post-grid-five-dynamic-contents`,
				styles: {
					height: "auto !important",
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
