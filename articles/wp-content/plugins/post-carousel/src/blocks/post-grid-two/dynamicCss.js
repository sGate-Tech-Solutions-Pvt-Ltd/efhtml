import sharedDynamicCss from "../shared/dynamicCss";
import { bgColor, convertToClassName, objectToCssString, removeEmptyCss, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gridTwoHorizontalGap,
		gridTwoVerticalGap,
		gridTwoColumns,
		largeItemHeight,
		smallItemHeight,
		largeItemTitleTypography,
		equalHeightEnable,
		globalBreakPointData,
		contentOnHover,
		contentHoverAnimate,
		titleOnHover,
		taxonomyOnHover,
		metaOnHover,
		readMoreOnHover,
		excerptOnHover,
		socialShareOnHover,
		imageOverlayCustomColor,
		// titleEffect,
		// titleUnderlineEffect,
		// titleEffectColor,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const animationTransforms = {
		fadeInDown: "translateY(-20px)",
		fadeInUp: "translateY(20px)",
		fadeInRight: "translateX(20px)",
		fadeInLeft: "translateX(-20px)",
		slideInUp: "translateY(20px)",
		slideInDown: "translateY(-20px)",
		zoomIn: "scale(0.8)",
		zoomOut: "scale(1.2)",
		none: "translateY(0)", // fallback
	};

	const commonHiddenStyles = {
		"max-height": 0,
		overflow: "hidden",

		transition: "opacity 1s ease-out, all 1s ease, max-height 1s ease-out, margin 1s;",
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `.sp-h-gap-${convertToClassName(
					gridTwoHorizontalGap.device.Desktop + gridTwoHorizontalGap.unit.Desktop
				)}`,
				property: "column-gap",
				value: gridTwoHorizontalGap.device?.[deviceType] + gridTwoHorizontalGap.unit?.[deviceType],
			},
			{
				class: `.sp-v-gap-${convertToClassName(
					gridTwoVerticalGap.device.Desktop + gridTwoVerticalGap.unit.Desktop
				)}`,
				property: "row-gap",
				value: gridTwoVerticalGap.device?.[deviceType] + gridTwoVerticalGap.unit?.[deviceType],
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-two-contents`,
				styles: {
					display: "grid",
					"row-gap": gridTwoVerticalGap.device?.[deviceType] + gridTwoVerticalGap.unit?.[deviceType],
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-grid-two-contents .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"grid-template-columns": `repeat(${
						gridTwoColumns.device?.[deviceType] ? gridTwoColumns.device?.[deviceType] : 2
					}, 1fr)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-static-grid-contents`,
				styles: {
					"column-gap": `${gridTwoHorizontalGap.device?.[deviceType]}${gridTwoHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridTwoVerticalGap.device?.[deviceType]}${gridTwoVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"column-gap": `${gridTwoHorizontalGap.device?.[deviceType]}${gridTwoHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridTwoVerticalGap.device?.[deviceType]}${gridTwoVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-two-container .sp-smart-post-static-grid-contents:not(.grid-two-layout-four)`,
				styles: {
					height: `${largeItemHeight.device?.[deviceType]}${largeItemHeight.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-two-container .sp-smart-post-dynamic-grid-contents .sp-smart-post-card`,
				styles: {
					"min-height": equalHeightEnable
						? "auto"
						: `${smallItemHeight.device?.[deviceType]}${smallItemHeight.unit?.[deviceType]}`,
				},
			},

			// on hover content..............
			{
				class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-card-content`,
				styles: {
					opacity: contentOnHover ? 0 : 1,
					transform: contentOnHover
						? animationTransforms[contentHoverAnimate] || "translateY(0)"
						: "translateY(0)",
					transition: "opacity 0.3s ease, transform 0.3s ease",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-card:hover .sp-smart-post-card-content`,
				styles: {
					opacity: contentOnHover ? 1 : 1,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-template-one-content  .sp-smart-post-title`,
				styles: {
					...commonHiddenStyles,
					opacity: titleOnHover && !contentOnHover ? 0 : 1,
					"max-height": titleOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card  .sp-smart-post-category`,
				styles: {
					...commonHiddenStyles,
					opacity: taxonomyOnHover && !contentOnHover ? 0 : 1,
					"max-height": taxonomyOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-template-one-content .sp-meta-data`,
				styles: {
					...commonHiddenStyles,
					opacity: metaOnHover && !contentOnHover ? 0 : 1,
					"max-height": metaOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-template-one-content  .sp-smart-post-read-more-button`,
				styles: {
					...commonHiddenStyles,
					opacity: readMoreOnHover && !contentOnHover ? 0 : 1,
					"max-height": readMoreOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-template-one-content  .sp-smart-post-excerpt-wrapper`,
				styles: {
					...commonHiddenStyles,
					opacity: excerptOnHover && !contentOnHover ? 0 : 1,
					"max-height": excerptOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-template-one-content  .sp-smart-post-social-share`,
				styles: {
					...commonHiddenStyles,
					opacity: socialShareOnHover && !contentOnHover ? 0 : 1,
					"max-height": socialShareOnHover && !contentOnHover ? "0" : "auto",
				},
			},
		];
	};

	const gridTwoStyles = [...removeEmptyCss("font-family", largeItemTitleTypography.typography.family, true)];

	// Add Tablet styles

	// Add Mobile styles

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		...gridTwoStyles,
		{
			class: `#${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientation-three .sp-smart-post-card-content, #${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientations-four .sp-smart-post-card-content`,
			styles: {
				background: bgColor( imageOverlayCustomColor )
			},
		},
		
	];
	if ( imageOverlayCustomColor.hover.style === "bgColor" ) {
		desktopCss.push(...[
			{
				class: `#${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientation-three:hover .sp-smart-post-card-content, #${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientations-four:hover .sp-smart-post-card-content`,
				styles: {
					background: bgColor( imageOverlayCustomColor, "hover" )
				},
			},
		])
	}
	if ( imageOverlayCustomColor.hover.style !== "bgColor" ) {
		desktopCss.push(...[
			{
				class: `#${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientation-three:hover .sp-smart-post-card-content:after, #${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientations-four:hover .sp-smart-post-card-content:after, #${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientation-three .sp-smart-post-card-content:after, #${uniqueId}.sp-smart-post-grid-two .sp-smart-post-card.overlay-type-orientations-four .sp-smart-post-card-content:after`,
				styles: {
					background: bgColor( imageOverlayCustomColor, "hover" )
				},
			},
		])
	}

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [...sharedTabletCss, ...responsiveCss("Tablet"), ...gridTwoStyles];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...sharedMobileCss,
			...gridTwoStyles,
			...responsiveCss("Mobile"),
			{
				class: `#${uniqueId} .grid-two-container .sp-smart-post-grid-two-contents .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"grid-template-columns": `repeat(${gridTwoColumns.device.Mobile || 1}, 1fr) !important`,
				},
			},
			{
				class: `#${uniqueId} .grid-two-container .sp-smart-post-grid-two-contents .sp-smart-post-static-grid-contents`,
				styles: {
					"grid-template-columns": `repeat(${gridTwoColumns.device.Mobile || 1}, 1fr) !important`,
				},
			},
			{
				class: `#${uniqueId} .grid-two-container .sp-smart-post-grid-two-contents .sp-smart-post-static-grid-contents .sp-smart-post-card`,
				styles: {
					"grid-column": `1 / 1`,
					"grid-row": `auto`,
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
