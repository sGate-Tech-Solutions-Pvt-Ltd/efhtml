import sharedDynamicCss from "../shared/dynamicCss";
import {
	convertToClassName,
	isEmptyObject,
	objectToCssString,
	removeEmptyCss,
	removeEmptyValues,
	spacingGenerate,
	wrapInMediaQuery,
} from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gridThreeHorizontalGap,
		gridThreeVerticalGap,
		gridThreeColumns,
		largeItemHeight,
		smallItemHeight,
		largeItemTitleTypography,
		largeItemTitleFontSize,
		largeItemTitleLatterSpacing,
		largeItemTitleLineHeight,
		equalHeightEnable,
		contentAreaPadding,
		titleFontSize,
		titleLatterSpacing,
		titleLineHeight,
		catTabCategoryMargin,
		largeItemTitleWordSpacing,
		titleWordSpacing,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const largeItemTitleClass = `#${uniqueId} .sp-smart-post-static-grid-contents.grid-three-layout-one .sp-smart-post-card .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .sp-smart-post-dynamic-grid-contents.grid-three-layout-four .sp-smart-post-card:nth-child(4n + 1) .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .sp-smart-post-dynamic-grid-contents.grid-three-layout-four .sp-smart-post-card:nth-child(4n + 4) .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .sp-smart-post-static-grid-contents.grid-three-layout-two .sp-smart-post-card:first-child .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .sp-smart-post-static-grid-contents.grid-three-layout-three .sp-smart-post-card:first-child .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .sp-smart-post-static-grid-contents.grid-three-layout-five .sp-smart-post-card:first-child .sp-smart-post-card-content .sp-smart-post-title`;

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `.sp-h-gap-${convertToClassName(
					gridThreeHorizontalGap.device.Desktop + gridThreeHorizontalGap.unit.Desktop
				)}`,
				property: "column-gap",
				value: gridThreeHorizontalGap.device?.[deviceType] + gridThreeHorizontalGap.unit?.[deviceType],
			},
			{
				class: `.sp-v-gap-${convertToClassName(
					gridThreeVerticalGap.device.Desktop + gridThreeVerticalGap.unit.Desktop
				)}`,
				property: "row-gap",
				value: gridThreeVerticalGap.device?.[deviceType] + gridThreeVerticalGap.unit?.[deviceType],
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-three-contents:has(.sp-smart-post-static-grid-contents .sp-smart-post-card)`,
				styles: {
					display: "grid",
					"row-gap": gridThreeVerticalGap.device?.[deviceType] + gridThreeVerticalGap.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-three-contents .sp-smart-post-dynamic-grid-contents:not(.grid-three-layout-four):not(.grid-three-layout-five)`,
				styles: {
					"grid-template-columns": `repeat(${
						gridThreeColumns.device?.[deviceType] ? gridThreeColumns.device?.[deviceType] : 3
					}, 1fr)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-three-contents .sp-smart-post-dynamic-grid-contents.grid-three-layout-five`,
				styles: {
					"grid-template-columns": `repeat(${
						gridThreeColumns.device?.[deviceType] ? gridThreeColumns.device?.[deviceType] : 2
					}, 1fr)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-three-contents .sp-smart-post-dynamic-grid-contents.grid-three-layout-four`,
				styles: {
					"grid-template-columns": `repeat( 3, 1fr)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-static-grid-contents`,
				styles: {
					"column-gap": `${gridThreeHorizontalGap.device?.[deviceType]}${gridThreeHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridThreeVerticalGap.device?.[deviceType]}${gridThreeVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"column-gap": `${gridThreeHorizontalGap.device?.[deviceType]}${gridThreeHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridThreeVerticalGap.device?.[deviceType]}${gridThreeVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-static-grid-contents:not(.grid-three-layout-four)`,
				styles: {
					height: `${largeItemHeight.device?.[deviceType]}${largeItemHeight.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-dynamic-grid-contents .sp-smart-post-card`,
				styles: {
					"min-height": equalHeightEnable
						? "auto"
						: `${smallItemHeight.device?.[deviceType]}${smallItemHeight.unit?.[deviceType]}`,
				},
			},
			{
				class: `${largeItemTitleClass}`,
				styles: {
					"font-size": `${largeItemTitleFontSize.device?.[deviceType]}${largeItemTitleFontSize.unit?.[deviceType]} !important`,
					"letter-spacing": `${largeItemTitleLatterSpacing.device?.[deviceType]}${largeItemTitleLatterSpacing.unit?.[deviceType]}`,
					"word-spacing": `${largeItemTitleWordSpacing.device?.[deviceType]}${largeItemTitleWordSpacing.unit?.[deviceType]}`,
					"line-height": `${largeItemTitleLineHeight.device?.[deviceType]} !important`,
				},
			},
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(contentAreaPadding, deviceType)
						? spacingGenerate(contentAreaPadding, deviceType)
						: "0 20px 20px 20px",
				},
			},
			{
				class: `#${uniqueId} .grid-three-layout-three .sp-smart-post-category`,
				styles: {
					margin: spacingGenerate(catTabCategoryMargin, deviceType)
						? spacingGenerate(catTabCategoryMargin, deviceType)
						: "10px",
				},
			},
		];
	};

	const gridThreeStyles = [
		{
			class: `${largeItemTitleClass}`,
			styles: {
				"font-weight": `${largeItemTitleTypography.typography.fontWeight} !important`,
				"font-style": `${largeItemTitleTypography.typography.style || "normal"}`,
				"text-transform": `${largeItemTitleTypography.typography.transform} !important`,
				"text-decoration": `${largeItemTitleTypography.typography.decoration} !important`,
			},
		},
		...removeEmptyCss(largeItemTitleClass, "font-family", largeItemTitleTypography.typography.family, true),
	];

	const desktopCss = [...sharedDesktopCss, ...responsiveCss("Desktop"), ...gridThreeStyles];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Add Tablet styles
		const tabletCss = [...sharedTabletCss, ...responsiveCss("Tablet"), ...gridThreeStyles];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Add Mobile styles
		const mobileCss = [
			...sharedMobileCss,
			...gridThreeStyles,
			...responsiveCss("Mobile"),
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-grid-three-contents .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"grid-template-columns": `repeat(${gridThreeColumns.device.Mobile || 1}, 1fr) !important`,
				},
			},
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-grid-three-contents .sp-smart-post-static-grid-contents`,
				styles: {
					"grid-template-columns": `repeat(${gridThreeColumns.device.Mobile || 1}, 1fr) !important`,
				},
			},
			// {
			// 	class: `#${ uniqueId } .grid-three-container .sp-smart-post-grid-three-contents .sp-smart-post-static-grid-contents .sp-smart-post-card, #${ uniqueId } .grid-three-container .sp-smart-post-grid-three-contents .sp-smart-post-dynamic-grid-contents .sp-smart-post-card`,
			// 	styles: {
			// 		'grid-column': `1 / 1`,
			// 		'grid-row': `auto`,
			// 	},
			// },
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-static-grid-contents`,
				styles: {
					height: "auto !important",
				},
			},
			{
				class: `#${uniqueId} .grid-three-container .sp-smart-post-dynamic-grid-contents .sp-smart-post-card, #${uniqueId} .grid-three-container .sp-smart-post-static-grid-contents .sp-smart-post-card`,
				styles: {
					"min-height": `${smallItemHeight.device.Mobile}${smallItemHeight.unit.Mobile}`,
				},
			},
			{
				class: `${largeItemTitleClass}`,
				styles: {
					"font-size": `${titleFontSize.device.Mobile}${titleFontSize.unit.Mobile} !important`,
					"letter-spacing": `${titleLatterSpacing.device.Mobile}${
						titleLatterSpacing.device.Mobile ? titleLatterSpacing.unit.Mobile : ""
					}`,
					"word-spacing": `${titleWordSpacing.device.Mobile}${
						titleWordSpacing.device.Mobile ? titleWordSpacing.unit.Mobile : ""
					}`,
					"line-height": `${titleLineHeight.device.Mobile}${
						titleLineHeight.device.Mobile ? " !important" : ""
					}`,
				},
			},
			{
				class: `${uniqueId} .grid-three-container .grid-three-layout-four .sp-smart-post-static-grid-contents`,
				styles: {
					display: "none",
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
