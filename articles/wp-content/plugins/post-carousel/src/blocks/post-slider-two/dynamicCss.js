import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		postSliderTwoHeight,
		imageWidth,
		imagePosition,
		contentAreaWidth,
		contentAreaHeight,
		contentAreaBorder,
		contentAreaBorderWidth,
		contentAreaBorderRadius,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const responsiveCss = (deviceType) => {
		const imageWidthLayoutThree = imageWidth.device?.[deviceType]
			? imageWidth.device?.[deviceType] + imageWidth.unit?.[deviceType]
			: "67%";

		return [
			{
				class: `#${uniqueId} .sp-smart-post-slider-two .sp-smart-post-swiper .swiper-slide .sp-smart-post-card`,
				styles: {
					height: rangerCss(postSliderTwoHeight, deviceType),
				},
			},
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-swiper:not(.post-slider-two-layout-three) + .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		top:
			// 			carouselArrowVertical.device[ deviceType ] === ''
			// 				? '50%'
			// 				: carouselArrowVertical.device[ deviceType ] +
			// 				  carouselArrowVertical.unit[ deviceType ],
			// 		left:
			// 			carouselArrowHorizontal.device[ deviceType ] === ''
			// 				? '32px'
			// 				: carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ],
			// 		right:
			// 			carouselArrowSpaceBetween.device[ deviceType ] === ''
			// 				? carouselArrowHorizontal.device[ deviceType ] ===
			// 				  ''
			// 					? '32px'
			// 					: carouselArrowHorizontal.device[ deviceType ] +
			// 					  carouselArrowHorizontal.unit[ deviceType ]
			// 				: '0',
			// 	},
			// },
			// Post Slider Two Layout Three image and its overlay position.
			{
				class: `#${uniqueId} .post-slider-two-layout-three .sp-smart-post-card .sp-smart-post-card-image,
				#${uniqueId} .post-slider-two-layout-three .sp-smart-post-card .image-overlay`,
				styles: {
					"max-width": imageWidthLayoutThree,
					left: imagePosition === "left" ? "0" : "unset",
					right: imagePosition === "right" ? "0" : "unset",
				},
			},
			// Post Slider Two Layout Three categories position.
			{
				class: `#${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-top-left, #${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-bottom-left`,
				styles: {
					left: imagePosition === "right" ? `calc(100% - ${imageWidthLayoutThree})` : "0",
				},
			},
			{
				class: `#${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-top-right, #${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-bottom-right`,
				styles: {
					right: imagePosition === "left" ? `calc(100% - ${imageWidthLayoutThree})` : "0",
				},
			},
			{
				class: `#${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-center-top, #${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-center-bottom`,
				styles: {
					left:
						imagePosition === "left"
							? `calc(${imageWidthLayoutThree} / 2)`
							: `calc(100% - ${imageWidthLayoutThree} / 2)`,
					transform: `translateX(-calc(${imageWidthLayoutThree} / 2 ))`,
				},
			},
			{
				class: `#${uniqueId} .post-slider-two-layout-three .sp-smart-post-category.sp-position-center-center`,
				styles: {
					top: "50%",
					left:
						imagePosition === "left"
							? `calc(${imageWidthLayoutThree} / 2)`
							: `calc(100% - ${imageWidthLayoutThree} / 2)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-template-one-content .sp-smart-post-card-content`,
				styles: {
					width: contentAreaWidth.device?.[deviceType] + contentAreaWidth.unit?.[deviceType],
					height: contentAreaHeight.device?.[deviceType] + contentAreaHeight.unit?.[deviceType],
					"border-width": spacingGenerate(contentAreaBorderWidth, deviceType),
					"border-radius": spacingGenerate(contentAreaBorderRadius, deviceType),
				},
			},
		];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		...sharedDesktopCss,
		{
			class: `#${uniqueId} .sp-smart-post-slider-two .sp-smart-post-swiper:not(.post-slider-two-layout-three) .sp-smart-post-card .image-overlay`,
			styles: {
				left: 0,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-slider-two .category-container.category-image`,
			styles: {
				height: "auto",
			},
		},
		{
			class: `#${uniqueId} .post-slider-two-layout-three .sp-smart-post-card .sp-smart-post-template-one-content.overlay-*`,
			styles: {
				Background: "none",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-template-one-content .sp-smart-post-card-content`,
			styles: {
				"border-style": contentAreaBorder.style,
				"border-color": contentAreaBorder.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-template-one-content .sp-smart-post-card-content:hover`,
			styles: {
				"border-color": contentAreaBorder.hoverColor,
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [...responsiveCss("Tablet"), ...sharedTabletCss];

		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [...responsiveCss("Mobile"), ...sharedMobileCss];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
