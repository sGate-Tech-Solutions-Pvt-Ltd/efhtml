import sharedDynamicCss from "../shared/dynamicCss";
import { colorControls, objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		thumbnailSliderTwoHeight,
		thumbnailTwoItemsHeight,
		thumbnailThumbBGColor,
		largeItemTitleFontSize,
		largeItemTitleLatterSpacing,
		largeItemTitleLineHeight,
		largeItemTitleTypography,
		contentAreaInnerWidth,
		largeItemTitleColor,
		titleColor,
		postCardBorderRadius,
		thumbnailSliderTwoLayout,
		postCardPadding,
		thumbnailProgressPosition,
		thumbnailProgressThickness,
		thumbnailProgressBarWidth,
		thumbnailProgressColor,
		thumbnailItemsToShow,
		catTabCategoryBarColor,
		carouselAutoPlayDelay,
		contentAreaThumbsBorder,
		contentAreaThumbsBorderWidth,
		contentAreaThumbsBorderRadius,
		catTabCategoryBarHoverColor,
		carouselAutoPlay,
		largeItemTitleWordSpacing,
		imageBorder,
		imageBorderWidth,
		imageRadius,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const thumbsBgColor = (layout, colorType = "color") => {
		const thumbConfig = {
			"thumbnail-slider-two-layout-one": "#F0F0F0",
			"thumbnail-slider-two-layout-two": "transparent",
			"thumbnail-slider-two-layout-three": "#0000001a",
			"thumbnail-slider-two-layout-four": "transparent",
			"thumbnail-slider-two-layout-five": "#00000066",
		};
		const finalBgColorConfig = {
			"thumbnail-slider-two-layout-one": "var(--smart-post-secondary)",
			"thumbnail-slider-two-layout-two": "transparent",
			"thumbnail-slider-two-layout-three": "transparent",
			"thumbnail-slider-two-layout-four": "transparent",
			"thumbnail-slider-two-layout-five": "#00000066",
		};

		return colorType === "color" ? thumbConfig[layout] : finalBgColorConfig[layout];
	};
	const thumbsNormalBgColor = thumbsBgColor(thumbnailSliderTwoLayout);
	const thumbsBgHoverColor = thumbsBgColor(thumbnailSliderTwoLayout, "hover");

	const thumbsGap = (layout) => {
		const thumbsConfig = {
			"thumbnail-slider-two-layout-one": 0,
			"thumbnail-slider-two-layout-two": 48,
			"thumbnail-slider-two-layout-three": 20,
			"thumbnail-slider-two-layout-four": 12,
			"thumbnail-slider-two-layout-five": 24,
		};
		return thumbsConfig[layout];
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-thumbnail-slider-two .sp-smart-post-swiper .sp-smart-post-card`,
				styles: {
					height: rangerCss(thumbnailSliderTwoHeight, deviceType),
				},
			},

			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-card`,
				styles: {
					height:
						thumbnailTwoItemsHeight.device?.[deviceType] +
						28 +
						thumbnailTwoItemsHeight.unit?.[deviceType] +
						" !important",
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-card .sp-smart-post-template-one-content, #${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-card .sp-smart-post-template-one-content`,
				styles: {
					"align-items": "center",
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb .sp-smart-post-card, #${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb .sp-smart-post-card, #${uniqueId} .thumbnail-slider-two-layout-three .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb .sp-smart-post-card`,
				styles: {
					height:
						thumbnailTwoItemsHeight.device?.[deviceType] +
						thumbnailTwoItemsHeight.unit?.[deviceType] +
						" !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-card .thumbnail-slider-two-layout-two`,
				styles: {
					height: "fit-content !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title`,
				styles: {
					"font-size":
						largeItemTitleFontSize.device?.[deviceType] +
						largeItemTitleFontSize.unit?.[deviceType] +
						" !important",
					"letter-spacing":
						largeItemTitleLatterSpacing.device?.[deviceType] +
						largeItemTitleLatterSpacing.unit?.[deviceType] +
						" !important",
					"word-spacing":
						largeItemTitleWordSpacing.device?.[deviceType] +
						largeItemTitleWordSpacing.unit?.[deviceType] +
						" !important",
					"line-height": largeItemTitleLineHeight.device?.[deviceType] + " !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-template-one-content`,
				styles: {
					width: contentAreaInnerWidth.device?.[deviceType] + contentAreaInnerWidth.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-thumbnail-slider-two`,
				styles: {
					"border-radius": spacingGenerate(postCardBorderRadius, deviceType),
					overflow: "hidden",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-thumbnail-slider-two .sp-smart-post-thumbnail-two-thumb .sp-smart-post-card`,
				styles: {
					"border-radius": "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-card.thumbnail-slider-two-layout-two .sp-smart-post-title`,
				styles: {
					[`padding-${thumbnailProgressPosition}`]: `${thumbnailProgressThickness.device?.[deviceType] + 8}px`,
					"margin-top": "0 !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-card.thumbnail-slider-two-layout-two .sp-thumbnail-progress-bar`,
				styles: {
					width:
						thumbnailProgressPosition === "left"
							? thumbnailProgressThickness.device?.[deviceType] +
								thumbnailProgressThickness.unit?.[deviceType]
							: thumbnailProgressBarWidth.device?.[deviceType] +
								thumbnailProgressBarWidth.unit?.[deviceType],
					height:
						thumbnailProgressPosition === "left"
							? thumbnailProgressBarWidth.device?.[deviceType] +
								thumbnailProgressBarWidth.unit?.[deviceType]
							: thumbnailProgressThickness.device?.[deviceType] +
								thumbnailProgressThickness.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .swiper-slide-thumb-active .sp-smart-post-card .sp-thumbnail-progress-bar::after`,
				styles: {
					animation: `${carouselAutoPlay ? "progress" : "progress-auto-off"} ${
						carouselAutoPlayDelay.value + 200 + carouselAutoPlayDelay.unit
					} linear forwards`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb.progress-bar-left .swiper-slide-thumb-active .sp-smart-post-card .sp-thumbnail-progress-bar::after`,
				styles: {
					animation: `${carouselAutoPlay ? "progress-left" : "progress-left-auto-off"} ${
						carouselAutoPlayDelay.value + carouselAutoPlayDelay.unit
					} linear forwards`,
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb.thumbnails-left, #${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb.thumbnails-right`,
				styles: {
					height: `${
						"calc( " +
						thumbnailSliderTwoHeight.device?.[deviceType] +
						thumbnailSliderTwoHeight.unit?.[deviceType] +
						" - 15% )"
					} !important`,
					overflow: "overlay",
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb.thumbnails-left .sp-smart-post-swiper2 .sp-slide-item-thumb, #${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb.thumbnails-right .sp-smart-post-swiper2 .sp-slide-item-thumb`,
				styles: {
					height: `${
						"calc( " +
						(thumbnailSliderTwoHeight.device?.[deviceType] -
							thumbnailSliderTwoHeight.device?.[deviceType] * 0.1) +
						thumbnailSliderTwoHeight.unit?.[deviceType] +
						" / " +
						thumbnailItemsToShow.device?.[deviceType] +
						" - " +
						thumbsGap(thumbnailSliderTwoLayout) +
						"px )"
					} !important`,
					"margin-top": thumbsGap(thumbnailSliderTwoLayout) / 2 + "px !important",
					"margin-bottom": thumbsGap(thumbnailSliderTwoLayout) / 2 + "px !important",
				},
			},
			// Layout One & Two Navigation Arrow.
			// {
			// 	class: `#${ uniqueId } .thumbnail-slider-two-layout-one .sp-smart-post-swiper-nav-arrow, #${ uniqueId } .thumbnail-slider-two-layout-two .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		top:
			// 			carouselArrowHorizontal.device[ deviceType ] === ''
			// 				? '50%'
			// 				: carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ],
			// 	},
			// },
			// Layout three Navigation Arrow.
			// {
			// 	class: `#${ uniqueId } .thumbnail-slider-two-layout-three .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		top:
			// 			carouselArrowHorizontal.device[ deviceType ] === ''
			// 				? '88%'
			// 				: carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ],
			// 	},
			// },
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-four .sp-smart-post-thumbnail-two-thumb`,
				styles: {
					height: 90 * thumbnailItemsToShow.device?.[deviceType] + "px",
				},
			},
			// Layout Four Navigation Arrow.
			// {
			// 	class: `#${ uniqueId } .thumbnail-slider-two-layout-four .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		top:
			// 			carouselArrowHorizontal.device[ deviceType ] === ''
			// 				? '90%'
			// 				: carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ],
			// 	},
			// },
			// Layout Five Navigation Arrow
			// {
			// 	class: `#${ uniqueId } .thumbnail-slider-two-layout-five .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		top:
			// 			carouselArrowHorizontal.device[ deviceType ] === ''
			// 				? '90%'
			// 				: carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ],
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .thumbnail-slider-two-layout-one .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(postCardPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .thumbnail-slider-two-layout-two .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(postCardPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .thumbnail-slider-two-layout-three .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(postCardPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .thumbnail-slider-two-layout-four .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(postCardPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .thumbnail-slider-two-layout-five .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(postCardPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-three .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb, #${uniqueId} .thumbnail-slider-two-layout-four .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb, #${uniqueId} .thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-card-image img`,
				styles: {
					"border-width": spacingGenerate(contentAreaThumbsBorderWidth, deviceType) + " !important",
					"border-radius": spacingGenerate(contentAreaThumbsBorderRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb .sp-thumbnail-progress-bar`,
				styles: {
					width:
						thumbnailProgressPosition !== "left"
							? thumbnailProgressBarWidth.device?.[deviceType] +
								thumbnailProgressBarWidth.unit?.[deviceType]
							: thumbnailProgressThickness.device?.[deviceType] +
								thumbnailProgressThickness.unit?.[deviceType],
					height:
						thumbnailProgressPosition !== "left"
							? thumbnailProgressThickness.device?.[deviceType] +
								thumbnailProgressThickness.unit?.[deviceType]
							: thumbnailProgressBarWidth.device?.[deviceType] +
								thumbnailProgressBarWidth.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb.thumbs-align-right`,
				styles: {
					"border-bottom-style": imageBorder.style,
					"border-bottom-color": "transparent",
					"border-bottom-width":
						imageBorderWidth.device?.[deviceType].bottom + imageBorderWidth.unit?.[deviceType],
					"border-bottom-right-radius":
						imageRadius.device?.[deviceType].left * 0.8 + imageRadius.unit?.[deviceType],
					left: `calc( 40% - ${
						imageBorderWidth.device?.[deviceType].right + imageBorderWidth.unit?.[deviceType]
					} )`,
					right: "unset",
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb.thumbs-align-left`,
				styles: {
					"border-bottom-style": imageBorder.style,
					"border-bottom-color": "transparent",
					"border-bottom-width":
						imageBorderWidth.device?.[deviceType].bottom + imageBorderWidth.unit?.[deviceType],
					"border-bottom-left-radius":
						imageRadius.device?.[deviceType].right * 0.8 + imageRadius.unit?.[deviceType],
					left: "unset",
					right: `calc( 40% - ${
						imageBorderWidth.device?.[deviceType].left + imageBorderWidth.unit?.[deviceType]
					} )`,
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb.thumbs-align-center`,
				styles: {
					"border-bottom-style": imageBorder.style,
					"border-bottom-color": "transparent",
					"border-bottom-width":
						imageBorderWidth.device?.[deviceType].bottom + imageBorderWidth.unit?.[deviceType],
					right: "unset",
				},
			},
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-four .sp-smart-post-thumbnail-two-thumb .sp-smart-post-card-image, #${uniqueId} .thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-two-thumb .sp-smart-post-card-image`,
				styles: {
					"border-top-left-radius": imageRadius.device?.[deviceType].top / 2 + imageRadius.unit?.[deviceType],
					"border-top-right-radius":
						imageRadius.device?.[deviceType].right / 2 + imageRadius.unit?.[deviceType],
					"border-bottom-left-radius":
						imageRadius.device?.[deviceType].bottom / 2 + imageRadius.unit?.[deviceType],
					"border-bottom-right-radius":
						imageRadius.device?.[deviceType].left / 2 + imageRadius.unit?.[deviceType],
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-swiper2 .swiper-wrapper .sp-slide-item-thumb .sp-smart-post-card::after`,
			styles: {
				opacity: 0,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-swiper2 .sp-smart-post-card:not(.thumbnail-slider-two-layout-five)`,
			styles: {
				background: colorControls(
					thumbnailThumbBGColor?.color?.style,
					thumbnailThumbBGColor?.color?.solidColor,
					thumbnailThumbBGColor?.color?.gradient
				)
					? colorControls(
							thumbnailThumbBGColor?.color?.style,
							thumbnailThumbBGColor?.color?.solidColor,
							thumbnailThumbBGColor?.color?.gradient
						)
					: thumbsNormalBgColor,
				transition: "all 0.3s ease-in-out",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-swiper2 .swiper-slide-thumb-active .sp-smart-post-card:not(.thumbnail-slider-two-layout-five), #${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-swiper2 .sp-smart-post-card:not(.thumbnail-slider-two-layout-five):hover`,
			styles: {
				background: colorControls(
					thumbnailThumbBGColor?.hover?.style,
					thumbnailThumbBGColor?.hover?.solidColor,
					thumbnailThumbBGColor?.hover?.gradient
				)
					? colorControls(
							thumbnailThumbBGColor?.hover?.style,
							thumbnailThumbBGColor?.hover?.solidColor,
							thumbnailThumbBGColor?.hover?.gradient
						)
					: thumbsBgHoverColor,
			},
		},
		{
			class: `#${uniqueId} .thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-two-thumb .sp-smart-post-swiper2 .sp-smart-post-card`,
			styles: {
				background: "transparent",
			},
		},
		{
			class: `#${uniqueId} .thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-two-thumb`,
			styles: {
				background: colorControls(
					thumbnailThumbBGColor?.color?.style,
					thumbnailThumbBGColor?.color?.solidColor,
					thumbnailThumbBGColor?.color?.gradient
				)
					? colorControls(
							thumbnailThumbBGColor?.color?.style,
							thumbnailThumbBGColor?.color?.solidColor,
							thumbnailThumbBGColor?.color?.gradient
						)
					: thumbsNormalBgColor,
				transition: "background 0.3s ease-in-out",
			},
		},
		{
			class: `#${uniqueId} .thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-two-thumb:hover`,
			styles: {
				background: colorControls(
					thumbnailThumbBGColor?.hover?.style,
					thumbnailThumbBGColor?.hover?.solidColor,
					thumbnailThumbBGColor?.hover?.gradient
				)
					? colorControls(
							thumbnailThumbBGColor?.hover?.style,
							thumbnailThumbBGColor?.hover?.solidColor,
							thumbnailThumbBGColor?.hover?.gradient
						)
					: thumbsBgHoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title`,
			styles: {
				color: largeItemTitleColor.color + " !important",
				"font-family": largeItemTitleTypography.typography.family + " !important",
				"font-style": largeItemTitleTypography.typography.style || "normal",
				"font-weight": largeItemTitleTypography.typography.fontWeight,
				"text-decoration": largeItemTitleTypography.typography.decoration + " !important",
				"text-transform": largeItemTitleTypography.typography.transform + " !important",
				transition: "color 0.3s ease-in-out",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title:hover`,
			styles: {
				color: largeItemTitleColor.hoverColor + " !important",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb .sp-smart-post-swiper2 .swiper-slide-thumb-active .sp-smart-post-card.thumbnail-slider-two-layout-one .sp-smart-post-title`,
			styles: {
				color: titleColor.hoverColor + " !important",
			},
		},
		{
			class: `#${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb .sp-thumbnail-progress-bar`,
			styles: {
				background: colorControls(
					thumbnailProgressColor?.color?.style,
					thumbnailProgressColor?.color?.solidColor,
					thumbnailProgressColor?.color?.gradient
				),
			},
		},
		{
			class: `#${uniqueId} .thumbnail-slider-two-layout-two .sp-smart-post-thumbnail-two-thumb .sp-thumbnail-progress-bar::after`,
			styles: {
				background: colorControls(
					thumbnailProgressColor?.hover?.style,
					thumbnailProgressColor?.hover?.solidColor,
					thumbnailProgressColor?.hover?.gradient
				),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-category .post-categories li a::before, #${uniqueId} .sp-smart-post-category a::before`,
			styles: {
				background: catTabCategoryBarColor,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-category .post-categories li a:hover::before, #${uniqueId} .sp-smart-post-category a:hover::before`,
			styles: {
				background: catTabCategoryBarHoverColor,
			},
		},
		{
			class: `#${uniqueId} .thumbnail-slider-two-layout-three .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb, #${uniqueId} .thumbnail-slider-two-layout-four .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb, #${uniqueId} .thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-two-thumb .sp-slide-item-thumb.swiper-slide-thumb-active .sp-smart-post-card-image img`,
			styles: {
				"border-style": contentAreaThumbsBorder.style + " !important",
				// 'border-color': contentAreaThumbsBorder.color || '#ffffffff',
				"border-color": contentAreaThumbsBorder.color,
				overflow: "hidden",
				"border-width": "3px",
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet style CSS.
		const tabletCss = [
			...sharedTabletCss,
			...responsiveCss("Tablet"),
			{
				class: `#${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb.thumbs-align-left, #${uniqueId} .thumbnail-slider-two-layout-one .sp-smart-post-thumbnail-two-thumb.thumbs-align-right`,
				styles: {
					"border-bottom-style": imageBorder.style,
					"border-bottom-color": "transparent",
					"border-bottom-width": imageBorderWidth.device.Tablet.bottom + imageBorderWidth.unit.Tablet,
					"border-bottom-left-radius": imageRadius.device.Tablet.right * 0.8 + imageRadius.unit.Tablet,
					"border-bottom-right-radius": imageRadius.device.Tablet.left * 0.8 + imageRadius.unit.Tablet,
					left: "0",
					width: "100%",
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
				class: `#${uniqueId} .sp-smart-post-thumbnail-two-thumb`,
				styles: {
					display: "none",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-block-wrapper.thumbnail-slider-two-layout-five .sp-smart-post-thumbnail-slide-two .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-block-wrapper.thumbnail-slider-two-layout-four .sp-smart-post-thumbnail-slide-two .sp-smart-post-card-content, #${uniqueId}  .sp-smart-post-block-wrapper.thumbnail-slider-two-layout-three .sp-smart-post-card-content`,
				styles: {
					width: "100%",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-block-wrapper.thumbnail-slider-two-layout-five .sp-smart-post-template-one-content, #${uniqueId} .sp-smart-post-block-wrapper.thumbnail-slider-two-layout-four .sp-smart-post-template-one-content, #${uniqueId} .sp-smart-post-block-wrapper.thumbnail-slider-two-layout-three .sp-smart-post-template-one-content`,
				styles: {
					"align-items": "center !important",
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
