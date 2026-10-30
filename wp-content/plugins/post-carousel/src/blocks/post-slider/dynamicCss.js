import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		postSliderHeight,
		carouselPaginationStyle,
		carouselPaginationHorizontal,
		carouselPaginationVertical,
		contentVerticalPosition,
		contentAreaInnerWidth,
		imageBorder,
		imageBorderWidth,
		imageRadius,
		contentAlignment,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const spContentPosition = {
		top: "flex-start",
		center: "center",
		bottom: "flex-end",
		left: "flex-start",
		right: "flex-end",
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-slider .sp-smart-post-card, #${uniqueId} .sp-smart-post-slider .sp-smart-post-swiper.post-slider-layout-two`,
				styles: {
					height: `${postSliderHeight.device?.[deviceType] + postSliderHeight.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-slider .sp-smart-post-pagination-dots.swiper-pagination-vertical`,
				styles: {
					"flex-direction": "column",
					top: `${
						carouselPaginationVertical?.device?.[deviceType] !== ""
							? carouselPaginationVertical.device?.[deviceType] +
								carouselPaginationVertical.unit?.[deviceType]
							: "50% !important"
					}`,
					left: `${
						carouselPaginationHorizontal.device?.[deviceType] !== ""
							? carouselPaginationHorizontal.device?.[deviceType] +
								carouselPaginationHorizontal.unit?.[deviceType]
							: "98%"
					} !important`,
					height: "fit-content",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-template-one-content  .sp-smart-post-card-content`,
				styles: {
					width: `${
						contentAreaInnerWidth.device?.[deviceType]
							? contentAreaInnerWidth.device?.[deviceType] + contentAreaInnerWidth.unit?.[deviceType]
							: "85%"
					}`,
					"max-width": "100%",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-card.post-slider-layout-five::after`,
				styles: {
					"border-style": imageBorder.style,
					"border-color": imageBorder.color,
					"border-width": spacingGenerate(imageBorderWidth, deviceType),
					"border-radius": spacingGenerate(imageRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId}:has( .sp-smart-post-slider ) .sp-smart-post-pagination-${carouselPaginationStyle}`,
				styles: {
					bottom: `${
						carouselPaginationVertical.device?.[deviceType]
							? carouselPaginationVertical.device?.[deviceType] +
								carouselPaginationVertical.unit?.[deviceType]
							: "30px"
					}`,
				},
			},
			{
				class: `#${uniqueId}:has( .sp-smart-post-slider ) .sp-smart-post-pagination-${carouselPaginationStyle}.sp-pagination-vertical `,
				styles: {
					left: `${
						carouselPaginationHorizontal.device?.[deviceType] === ""
							? "97%"
							: carouselPaginationHorizontal.device?.[deviceType] +
								carouselPaginationHorizontal.unit?.[deviceType]
					} !important`,
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle}.sp-pagination-vertical `,
			styles: {
				"flex-direction": `${carouselPaginationStyle !== "fraction" ? "column" : "row"}`,
				width: "max-content !important",
				"max-height": "calc(100% - 20px)",
				"padding-bottom": "20px",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper .sp-smart-post-card-content`,
			styles: {
				height: "fit-content !important",
			},
		},
		{
			class: `#${uniqueId} .post-slider-layout-five .sp-smart-post-card-content`,
			styles: {
				background: "transparent",
			},
		},
		{
			class: `#${uniqueId} .post-slider-layout-one .sp-smart-post-card-content,
			#${uniqueId} .post-slider-layout-two .sp-smart-post-card-content`,
			styles: {
				background: "transparent",
			},
		},
		{
			class: `#${uniqueId} .post-slider-layout-five .sp-smart-post-card-content:hover`,
			styles: {
				background: "transparent",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-card.post-slider-layout-five .sp-smart-post-template-one-content `,
			styles: {
				overflow: "hidden",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-card.post-slider-layout-five .sp-smart-post-template-one-content  .sp-smart-post-card-content`,
			styles: {
				border: "none",
				"border-radius": "0",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-card.post-slider-layout-one .sp-smart-post-template-one-content  .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-card.post-slider-layout-two .sp-smart-post-template-one-content  .sp-smart-post-card-content`,
			styles: {
				border: "none",
				"border-radius": "0",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-slider:not(.post-slider-layout-five) .sp-smart-post-card-content`,
			styles: {
				"box-shadow": "none",
				"pointer-events": "all",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-slider .sp-smart-post-background-layout .sp-smart-post-card .sp-smart-post-template-one-content`,
			styles: {
				"align-items": spContentPosition[contentVerticalPosition],
				"justify-content": spContentPosition[contentAlignment],
				"pointer-events": "none",
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [...sharedTabletCss, ...responsiveCss("Tablet")];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile styles
		const mobileCss = [...sharedMobileCss, ...responsiveCss("Mobile")];
		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
