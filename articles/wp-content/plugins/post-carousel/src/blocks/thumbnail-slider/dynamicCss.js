import sharedDynamicCss from "../shared/dynamicCss";
import { colorControls, objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		postThumbnailHeight,
		postThumbnailVerticalGap,
		postThumbnailPosition,
		thumbnailSliderLayout,
		imagePosition,
		contentAreaInnerWidth,
		thumbnailItemsHeight,
		contentAreaBorder,
		contentAreaHoverBorderWidth,
		contentAreaHoverBorderRadius,
		contentAlignment,
		thumbnailItemsTitleColor,
		thumbnailItemsCateColor,
		layoutSixPostCardBg,
		thumbnailThumbBGColor,
		imageBorder,
		imageBorderWidth,
		imageRadius,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide .thumbnail-slider-layout-six .sp-smart-post-template-one-content:hover`,
				styles: {
					"border-style":
						spacingGenerate(contentAreaHoverBorderWidth, deviceType) !== "" ||
						contentAreaBorder.hoverStyle ||
						contentAreaBorder.hoverColor
							? contentAreaBorder.hoverStyle
							: "",
					"border-width": spacingGenerate(contentAreaHoverBorderWidth, deviceType),
					"border-color": contentAreaBorder.hoverColor,
					"border-radius": spacingGenerate(contentAreaHoverBorderRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider .sp-smart-post-swiper .swiper-slide .sp-smart-post-card`,
				styles: {
					height: rangerCss(postThumbnailHeight, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-right .sp-smart-post-thumbnail-thumb, #${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-left .sp-smart-post-thumbnail-thumb`,
				styles: {
					height: postThumbnailHeight.device?.[deviceType] + postThumbnailHeight.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-thumb .sp-slide-item-thumb .sp-smart-post-card`,
				styles: {
					height: `${
						["top", "bottom"].includes(postThumbnailPosition) && thumbnailItemsHeight.device?.[deviceType]
							? thumbnailItemsHeight.device?.[deviceType] +
								thumbnailItemsHeight.unit?.[deviceType] +
								" !important"
							: "100%"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-top .sp-smart-post-thumbnail-thumb .sp-slide-item-thumb, #${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-bottom .sp-smart-post-thumbnail-thumb .sp-slide-item-thumb`,
				styles: {
					height: `${
						thumbnailItemsHeight.device?.[deviceType]
							? thumbnailItemsHeight.device?.[deviceType] +
								thumbnailItemsHeight.unit?.[deviceType] +
								" !important"
							: "100px"
					}`,
				},
			},
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		right: `${
			// 			( carouselArrowHorizontal.unit[ deviceType ] !== '%' &&
			// 				carouselArrowHorizontal.device[ deviceType ] <
			// 					31 ) ||
			// 			carouselArrowHorizontal.device[ deviceType ] < 0
			// 				? carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ]
			// 				: '0'
			// 		} !important`,
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-background-layout:not(.thumbnail-slider-layout-six) .sp-smart-post-card .sp-smart-post-card-content`,
				styles: {
					width: `${
						contentAreaInnerWidth.device?.[deviceType] + contentAreaInnerWidth.unit?.[deviceType]
					} !important`,
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-layout-one .sp-smart-post-thumbnail-thumb .sp-smart-post-card-image, #${uniqueId} .thumbnail-slider-layout-two .sp-smart-post-thumbnail-thumb .sp-smart-post-card-image, #${uniqueId} .thumbnail-slider-layout-five .sp-smart-post-thumbnail-thumb .sp-smart-post-card-image, #${uniqueId} .thumbnail-slider-layout-six .sp-smart-post-thumbnail-thumb .sp-smart-post-card-image`,
				styles: {
					"border-style": imageBorder.style,
					"border-color": imageBorder.color,
					"border-width": spacingGenerate(imageBorderWidth, deviceType),
					"border-top-left-radius": imageRadius.device?.[deviceType].top / 2 + imageRadius.unit?.[deviceType],
					"border-top-right-radius":
						imageRadius.device?.[deviceType].right / 2 + imageRadius.unit?.[deviceType],
					"border-bottom-left-radius":
						imageRadius.device?.[deviceType].bottom / 2 + imageRadius.unit?.[deviceType],
					"border-bottom-right-radius":
						imageRadius.device?.[deviceType].left / 2 + imageRadius.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-layout-three .sp-smart-post-thumbnail-thumb .sp-smart-post-card, #${uniqueId} .thumbnail-slider-layout-four .sp-smart-post-thumbnail-thumb .sp-smart-post-card`,
				styles: {
					"border-style": imageBorder.style,
					"border-color": imageBorder.color,
					"border-width": spacingGenerate(imageBorderWidth, deviceType),
					"border-top-left-radius": imageRadius.device?.[deviceType].top / 2 + imageRadius.unit?.[deviceType],
					"border-top-right-radius":
						imageRadius.device?.[deviceType].right / 2 + imageRadius.unit?.[deviceType],
					"border-bottom-left-radius":
						imageRadius.device?.[deviceType].bottom / 2 + imageRadius.unit?.[deviceType],
					"border-bottom-right-radius":
						imageRadius.device?.[deviceType].left / 2 + imageRadius.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-layout-six .sp-smart-post-thumbnail-slide .sp-smart-post-card`,
				styles: {
					"border-style": imageBorder.style,
					"border-color": imageBorder.color,
					"border-width": spacingGenerate(imageBorderWidth, deviceType),
					"border-radius": spacingGenerate(imageRadius, deviceType),
				},
			},
		];
	};

	const layoutFiveContentStyle = (deviceType) => {
		return ["top", "bottom"].includes(postThumbnailPosition)
			? [
					{
						class: `#${uniqueId} .thumbnail-slider-layout-five .sp-smart-post-card .sp-smart-post-card-content`,
						styles: {
							[`padding-${postThumbnailPosition}`]: `calc( ${rangerCss(
								thumbnailItemsHeight,
								deviceType
							)} * 2 )`,
						},
					},
				]
			: [];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		...layoutFiveContentStyle("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider .sp-smart-post-thumbnail-slide`,
			styles: {
				[`margin-${postThumbnailPosition}`]: `${
					[
						"thumbnail-slider-layout-one",
						"thumbnail-slider-layout-four",
						"thumbnail-slider-layout-six",
					].includes(thumbnailSliderLayout)
						? postThumbnailVerticalGap.device.Desktop + postThumbnailVerticalGap.unit.Desktop
						: "0"
				}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider .sp-smart-post-thumbnail-slide`,
			styles: {
				width: `${
					[
						"thumbnail-slider-layout-one",
						"thumbnail-slider-layout-four",
						"thumbnail-slider-layout-six",
					].includes(thumbnailSliderLayout) && ["left", "right"].includes(postThumbnailPosition)
						? "75%"
						: "100%"
				}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider.thumbnail-slider-layout-two .sp-smart-post-thumbnail-thumb,
			#${uniqueId} .sp-smart-post-thumbnail-slider.thumbnail-slider-layout-three .sp-smart-post-thumbnail-thumb,
			#${uniqueId} .sp-smart-post-thumbnail-slider.thumbnail-slider-layout-five .sp-smart-post-thumbnail-thumb`,
			styles: {
				position: "absolute",
				width: `${["top", "bottom"].includes(postThumbnailPosition) ? "100%" : "25%"}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-top`,
			styles: {
				"flex-direction": `${
					[
						"thumbnail-slider-layout-two",
						"thumbnail-slider-layout-three",
						"thumbnail-slider-layout-five",
					].includes(thumbnailSliderLayout)
						? "column"
						: "column-reverse"
				}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-bottom`,
			styles: {
				"flex-direction": `${
					[
						"thumbnail-slider-layout-two",
						"thumbnail-slider-layout-three",
						"thumbnail-slider-layout-five",
					].includes(thumbnailSliderLayout)
						? "column-reverse"
						: "column"
				}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-left`,
			styles: {
				"flex-direction": `${
					[
						"thumbnail-slider-layout-two",
						"thumbnail-slider-layout-three",
						"thumbnail-slider-layout-five",
					].includes(thumbnailSliderLayout)
						? "row"
						: "row-reverse"
				}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-right`,
			styles: {
				"flex-direction": `${
					[
						"thumbnail-slider-layout-two",
						"thumbnail-slider-layout-three",
						"thumbnail-slider-layout-five",
					].includes(thumbnailSliderLayout)
						? "row-reverse"
						: "row"
				}`,
			},
		},
		// {
		// 	class: `#${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-swiper.thumbnail-slider-layout-six .sp-smart-post-template-one-content`,
		// 	styles: {
		// 		Background: colorControls(
		// 			layoutSixPostCardBg.color.style,
		// 			layoutSixPostCardBg.color.solidColor,
		// 			layoutSixPostCardBg.color.gradient
		// 		),
		// 		position: "absolute",
		// 		right: `${imagePosition === "right" ? "" : 0}`,
		// 		left: `${imagePosition === "left" ? "" : 0}`,
		// 	},
		// },
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-swiper.thumbnail-slider-layout-six .sp-smart-post-template-one-content:hover`,
			styles: {
				Background: colorControls(
					layoutSixPostCardBg.hover.style,
					layoutSixPostCardBg.hover.solidColor,
					layoutSixPostCardBg.hover.gradient
				),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper.thumbnail-slider-layout-three .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-swiper.thumbnail-slider-layout-four .sp-smart-post-card-content`,
			styles: {
				"align-items": contentAlignment === "" ? "center" : "",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb .sp-smart-post-category ul li a,
			#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb .sp-smart-post-category a`,
			styles: {
				color: `${thumbnailItemsCateColor.color} !important`,
				"letter-spacing": "0",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb:hover .sp-smart-post-category ul li a, #${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb:hover .sp-smart-post-category a, #${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-category ul li a, #${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-category a`,
			styles: {
				color: `${thumbnailItemsCateColor.hoverColor} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb .sp-smart-post-card-content .sp-smart-post-title`,
			styles: {
				color: `${thumbnailItemsTitleColor.color} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb:hover .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-card-content .sp-smart-post-title`,
			styles: {
				color: `${thumbnailItemsTitleColor.hoverColor} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb .sp-smart-post-card-content`,
			styles: {
				background: colorControls(
					thumbnailThumbBGColor?.color?.style,
					thumbnailThumbBGColor?.color?.solidColor,
					thumbnailThumbBGColor?.color?.gradient
				),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb:hover .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-swiper2 .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-card-content`,
			styles: {
				background: colorControls(
					thumbnailThumbBGColor?.hover?.style,
					thumbnailThumbBGColor?.hover?.solidColor,
					thumbnailThumbBGColor?.hover?.gradient
				),
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet style CSS.
		const tabletCss = [
			...sharedTabletCss,
			...responsiveCss("Tablet"),
			...layoutFiveContentStyle("Tablet"),
			{
				class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-template-one-content .sp-smart-post-card-content`,
				styles: {
					width: `${
						contentAreaInnerWidth.device.Tablet
							? contentAreaInnerWidth.device.Tablet + contentAreaInnerWidth.unit.Tablet
							: "50%"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider .sp-smart-post-thumbnail-slide`,
				styles: {
					[`margin-${postThumbnailPosition}`]: `${
						[
							"thumbnail-slider-layout-one",
							"thumbnail-slider-layout-four",
							"thumbnail-slider-layout-six",
						].includes(thumbnailSliderLayout)
							? postThumbnailVerticalGap.device.Tablet + postThumbnailVerticalGap.unit.Tablet
							: "0"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-right .sp-smart-post-thumbnail-slide, #${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-left .sp-smart-post-thumbnail-slide`,
				styles: {
					"margin-bottom": `${
						postThumbnailVerticalGap.device.Tablet
							? postThumbnailVerticalGap.device.Tablet + postThumbnailVerticalGap.unit.Tablet
							: "10px"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-right .sp-smart-post-thumbnail-thumb, #${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-left .sp-smart-post-thumbnail-thumb`,
				styles: {
					height: `${
						thumbnailItemsHeight.device.Tablet
							? thumbnailItemsHeight.device.Tablet + thumbnailItemsHeight.unit.Tablet
							: "100px"
					}`,
				},
			},
		];

		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile style CSS.
		const mobileCss = [
			...sharedMobileCss,
			...responsiveCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-template-one-content .sp-smart-post-card-content`,
				styles: {
					width: `${
						contentAreaInnerWidth.device.Mobile
							? contentAreaInnerWidth.device.Mobile + contentAreaInnerWidth.unit.Mobile
							: "50%"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider .sp-smart-post-thumbnail-slide`,
				styles: {
					[`margin-${postThumbnailPosition}`]: `${
						[
							"thumbnail-slider-layout-one",
							"thumbnail-slider-layout-four",
							"thumbnail-slider-layout-six",
						].includes(thumbnailSliderLayout)
							? postThumbnailVerticalGap.device.Mobile + postThumbnailVerticalGap.unit.Mobile
							: "0"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-right .sp-smart-post-thumbnail-thumb, #${uniqueId} .sp-smart-post-thumbnail-slider.sp-thumbnail-left .sp-smart-post-thumbnail-thumb`,
				styles: {
					height: `${
						thumbnailItemsHeight.device.Mobile
							? thumbnailItemsHeight.device.Mobile + thumbnailItemsHeight.unit.Mobile
							: "100px"
					}`,
				},
			},
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		right: `${
			// 			carouselArrowHorizontal.device.Mobile < 0
			// 				? carouselArrowHorizontal.device.Mobile +
			// 				  carouselArrowHorizontal.unit.Mobile
			// 				: 0
			// 		} !important`,
			// 	},
			// },
		];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
