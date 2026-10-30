import { maxValueFromObject, showHide } from "../../controls/controls";
import { boxCss, colorControls, spacingGenerate, rangerCss } from "./helpFn";

const sharedDynamicCss = (attributes, page) => {
	const {
		uniqueId,
		blockName,
		titleMargin,
		titleColor,
		titleFontSize,
		titleTypography,
		titleLatterSpacing,
		titleLineHeight,
		catTabCategoryTypography,
		catTabCategoryFontSize,
		catTabCategoryLineHeight,
		catTabCategoryLetterSpacing,
		catTabCategoryColor,
		imageGrayscaleLevel,
		imageBlurEffect,
		imageBrightness,
		imageGrayscaleLevelHover,
		imageBlurEffectHover,
		imageBrightnessHover,
		catTabCategoryBg,
		catTabCategorySpaceBetween,
		catTabCategoryPadding,
		catTabCategoryBorderRadius,
		catTabCategoryMargin,
		contentAreaBg,
		contentAreaHeight,
		metaTypography,
		metaFontSize,
		metaFontSpacing,
		metaLineHeight,
		metaColors,
		metaSpaceBetween,
		metadataMargin,
		excerptTypography,
		excerptFontSize,
		excerptFontSpacing,
		excerptLineHeight,
		excerptColor,
		excerptMargin,
		socialShareIconSize,
		socialShareBorder,
		socialShareBorderWidth,
		socialShareBorderRadius,
		socialShareSpaceBetween,
		socialShareMargin,
		socialShareCustomColor,
		socialShareCustomBgColor,
		socialShareIconType,
		contentAreaBoxShadow,
		contentAreaEnableBoxShadow,
		contentAreaPadding,
		imageOpacityEffect,
		imageMode,
		imageNormalHover,
		imageGrayscaleHover,
		imageBorderWidth,
		imageBorder,
		imageRadius,
		imageSpace,
		imageWidth,
		imageHeight,
		imageSize,
		imageScale,
		readMoreButtonTypography,
		readMoreButtonFontSize,
		readMoreButtonFontSpacing,
		readMoreButtonLineHeight,
		readMoreBg,
		readMoreColor,
		readMoreButtonBorder,
		readMoreButtonBorderWidth,
		readMoreButtonBorderRadius,
		readMoreButtonPadding,
		readMoreButtonMargin,
		contentAlignment,
		advancedBg,
		advancedBorderStyleWidth,
		advancedBorderStyle,
		advancedBorderRadius,
		advancedBoxShadow,
		advancedBoxShadowEnable,
		advancedPadding,
		advancedMargin,
		postCardBg,
		imageOverlayCustomColor,
		postCardBorder,
		postCardBorderWidth,
		postCardHoverBorderWidth,
		postCardBorderRadius,
		postCardHoverBorderRadius,
		postCardHoverBoxShadow,
		postCardBoxShadow,
		postCardHoverBoxShadowEnable,
		postCardBoxShadowEnable,
		postCardPadding,
		paginationColor,
		paginationBGColor,
		paginationBorder,
		paginationBorderWidth,
		paginationSpaceBetween,
		paginationBorderRadius,
		paginationPadding,
		paginationMargin,
		paginationTypography,
		paginationFontSize,
		paginationLetterSpacing,
		paginationLineHeight,
		navigationArrowHeight,
		navigationArrowWidth,
		navigationArrowSize,
		carouselArrowSize,
		carouselArrowWidth,
		carouselArrowHeight,
		carouselArrowSpaceBetween,
		carouselArrowColor,
		carouselArrowBgColor,
		carouselArrowBorder,
		carouselArrowBorderWidth,
		carouselArrowBorderRadius,
		carouselArrowHorizontal,
		carouselArrowVertical,
		carouselBoxShadowEnable,
		carouselBoxShadow,
		carouselPaginationStyle,
		carouselPaginationWidth,
		carouselPaginationHeight,
		carouselPaginationSpaceBetween,
		carouselPaginationHorizontal,
		carouselPaginationVertical,
		carouselPaginationTextColor,
		carouselPaginationColor,
		carouselPaginationBorder,
		carouselPaginationBorderWidth,
		carouselPaginationBorderWidthHover,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		popupImageSize,
		popupImageWidth,
		popupImageHeight,
		catTabCategoryBorder,
		catTabCategoryBorderWidth,
		contentAreaWidth,
		contentAreaMargin,
		imagePosition,
		metaRowGap,
		timelineConnectorColor,
		timelineIndicatorColor,
		timelineCircleBgColor,
		timelineConnectorBorder,
		timelineConnectorBorderWidth,
		timelineConnectorBorderRadius,
		timelineLayout,
		readMoreIconGap,
		socialSharePadding,
		socialShareIconPosition,
		socialPopupShareColor,
		socialPopupShareBGColor,
		socialPopupContainerBGColor,
		socialSharePopupBorder,
		socialSharePopupBorderWidth,
		socialShareBoxShadow,
		socialPopupBoxShadow,
		socialPopupBoxShadowValue,
		socialPopupPadding,
		titleShow,
		excerptShow,
		catTabCategoryEnable,
		carouselNavArrow,
		carouselPaginationDot,
		showReadMoreButton,
		socialShareEnableSocial,
		socialIconDisplayType,
		paginationType,
		contentVerticalPosition,
		contentHorizontalPosition,
		popupCloseBtnColor,
		generalLinkOpen,
		popupCloseBtnSize,
		popupMaxWidth,
		popupMaxHeight,
		popupBgColor,
		popupOverlayColor,
		popupTitleColor,
		popupMetaFieldsColor,
		popupExcerptColor,
		popupNavArrowColor,
		popupNavArrowBgColor,
		titleWordSpacing,
		metaWordSpacing,
		excerptWordSpacing,
		catTabCategoryWordSpacing,
		readMoreButtonWordSpacing,
		paginationWordSpacing,
		socialShareBoxShadowValue,
		catTabCategoryBorderWidthHover,
		catTabCategoryBorderRadiusHover,
		readMoreButtonBorderRadiusHover,
		readMoreButtonBorderWidthHover,
		carouselArrowBorderWidthHover,
		advancedBorderStyleWidthHover,
		advancedBorderRadiusHover,
		imageFeaturedImg,
		imageOverlayColor,
		readMoreIocVisibility,
		metaSeparatorColor,
		showImageGallery,
		imageGalleryNavArrowSize,
		titleEffect,
		titleUnderlineEffect,
		titleEffectColor,
		imageGalleryNavArrowColor,
		imageGalleryNavArrowBgColor,
	} = attributes;

	const spContentPosition = {
		top: "start",
		center: "center",
		bottom: "end",
		left: "start",
		right: "end",
	};

	const typographyCss = (attr) => {
		return {
			"font-family": attr?.typography?.family,
			"font-weight": attr?.typography?.fontWeight,
			"font-style": attr?.typography?.style,
			"text-decoration": attr?.typography?.decoration,
			"text-transform": attr?.typography?.transform,
		};
	};

	// Title Css.
	const titleCss = () => {
		return titleShow
			? [
					{
						class: `#${uniqueId} .sp-smart-post-title`,
						styles: {
							...typographyCss(titleTypography),
							"font-size": rangerCss(titleFontSize),
							"line-height": rangerCss(titleLineHeight),
							"letter-spacing": rangerCss(titleLatterSpacing),
							"word-spacing": rangerCss(titleWordSpacing),
							color: titleColor.color,
							margin: spacingGenerate(titleMargin, "Desktop"),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-title:hover`,
						styles: {
							color: titleColor.hoverColor,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-title-wrapper`,
						styles: {
							"justify-content": contentAlignment,
						},
					},
				]
			: [];
	};

	// Title responsive Css.
	const titleResponsiveCss = (deviceType) => {
		return titleShow
			? {
					[`#${uniqueId} .sp-smart-post-title`]: {
						"font-size": rangerCss(titleFontSize, deviceType),
						"line-height": rangerCss(titleLineHeight, deviceType),
						"letter-spacing": rangerCss(titleLatterSpacing, deviceType),
						"word-spacing": rangerCss(titleWordSpacing, deviceType),
						margin: spacingGenerate(titleMargin, deviceType),
					},
				}
			: {};
	};

	// Meta data css.
	const metaCss = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-details`,
				styles: {
					...typographyCss(metaTypography),
					"column-gap": `${metaSpaceBetween?.value}px`,
					"row-gap": `${metaRowGap?.value}px`,
					"justify-content": spContentPosition[contentAlignment],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-date-orientation-two .sp-smart-post-day, #${uniqueId} .sp-smart-post-date-orientation-two .sp-smart-post-month-year`,
				styles: {
					...typographyCss(metaTypography),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-details .sp-smart-post-meta-text, #${uniqueId} .sp-smart-post-details ul li a`,
				styles: {
					...typographyCss(metaTypography),
					color: metaColors?.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-details .sp-smart-post-meta-icon`,
				styles: {
					color: metaColors.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-details i,
				#${uniqueId} .sp-smart-post-details .pcpl-count`,
				styles: {
					color: metaColors.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-details .sp-smart-post-meta-icon svg path`,
				styles: {
					fill: metaColors.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-details .sp-smart-post-meta:hover .sp-smart-post-meta-text, #${uniqueId} .sp-smart-post-details ul li:hover a`,
				styles: {
					color: metaColors.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-details .sp-smart-post-meta:hover .sp-smart-post-meta-icon,
				#${uniqueId} .sp-smart-post-details .sp-smart-post-meta:hover .sp-smart-post-meta-icon svg path, 
				#${uniqueId} .sp-smart-post-details .sp-smart-post-meta:hover i,
				#${uniqueId} .sp-smart-post-details .sp-smart-post-meta:hover .pcpl-count`,
				styles: {
					color: metaColors.hoverColor,
					fill: metaColors.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-meta-data.sp-smart-post-meta-details-inline:not(.sp-space-between)`,
				styles: {
					"justify-content": spContentPosition[contentAlignment],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-meta-separator`,
				styles: {
					color: metaSeparatorColor,
				},
			},
		];
	};

	// Meta data responsive css.
	const metaResponsiveCss = (deviceType) => {
		return {
			[`#${uniqueId} .sp-smart-post-details`]: {
				"letter-spacing": rangerCss(metaFontSpacing, deviceType),
				"word-spacing": rangerCss(metaWordSpacing, deviceType),
				"line-height": rangerCss(metaLineHeight, deviceType),
				margin: spacingGenerate(metadataMargin, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-date-orientation-two .sp-smart-post-day, #${uniqueId} .sp-smart-post-date-orientation-two .sp-smart-post-month-year`]:
				{
					"letter-spacing": rangerCss(metaFontSpacing, deviceType),
					"word-spacing": rangerCss(metaWordSpacing, deviceType),
					"line-height": rangerCss(metaLineHeight, deviceType),
				},
			[`#${uniqueId} .sp-smart-post-details .sp-smart-post-meta-text, #${uniqueId} .sp-smart-post-details ul li a`]:
				{
					"font-size": rangerCss(metaFontSize, deviceType) + " !important",
					"line-height": rangerCss(metaLineHeight, deviceType),
					"word-spacing": rangerCss(metaWordSpacing, deviceType),
					"letter-spacing": rangerCss(metaFontSpacing, deviceType),
				},
			[`#${uniqueId} .sp-smart-post-details .sp-smart-post-meta-icon`]: {
				width: rangerCss(metaFontSize, deviceType),
				height: rangerCss(metaFontSize, deviceType),
				"font-size": rangerCss(metaFontSize, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-meta-separator`]: {
				"font-size": rangerCss(metaFontSize, deviceType),
			},
		};
	};

	// Excerpt Css
	const excerptCss = () => {
		return excerptShow
			? [
					{
						class: `#${uniqueId} .sp-smart-post-excerpt-wrapper .sp-smart-post-excerpt`,
						styles: {
							...typographyCss(excerptTypography),
							color: excerptColor.color,
						},
					},
				]
			: [];
	};

	// Excerpt responsive Css
	const excerptResponsiveCss = (deviceType) => {
		return excerptShow
			? {
					[`#${uniqueId} .sp-smart-post-excerpt-wrapper .sp-smart-post-excerpt`]: {
						"font-size": rangerCss(excerptFontSize, deviceType),
						"line-height": rangerCss(excerptLineHeight, deviceType),
						"letter-spacing": rangerCss(excerptFontSpacing, deviceType),
						"word-spacing": rangerCss(excerptWordSpacing, deviceType),
						margin: spacingGenerate(excerptMargin, deviceType),
					},
				}
			: {};
	};

	// Taxonomy css.
	const taxonomyCss = () => {
		return catTabCategoryEnable
			? [
					{
						class: `#${uniqueId} .sp-smart-post-category`,
						styles: {
							"justify-content": contentAlignment,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-category ul, #${uniqueId} .sp-smart-post-category span`,
						styles: {
							gap: `${catTabCategorySpaceBetween.value}px`,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-category ul`,
						styles: {
							margin: spacingGenerate(catTabCategoryMargin, "Desktop"),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-category .sp-taxonomy-type-category a, #${uniqueId} .sp-smart-post-category .sp-taxonomy-type-post_tag a`,
						styles: {
							...typographyCss(catTabCategoryTypography),
							color: catTabCategoryColor.color,
							background: colorControls(
								catTabCategoryBg.color.style,
								catTabCategoryBg.color.solidColor,
								catTabCategoryBg.color.gradient
							),
							"border-style": catTabCategoryBorder.style,
							"border-color": catTabCategoryBorder.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-category a:hover`,
						styles: {
							color: catTabCategoryColor.hoverColor,
							background: colorControls(
								catTabCategoryBg.hover.style,
								catTabCategoryBg.hover.solidColor,
								catTabCategoryBg.hover.gradient
							),
							"border-style": catTabCategoryBorder.hoverStyle,
							"border-color": catTabCategoryBorder.hoverColor,
						},
					},
					{
						class: `#${uniqueId} .category-container .sp-position-top-right`,
						styles: {
							top: "10px",
							right: "50px",
						},
					},
				]
			: [];
	};

	// Taxonomy responsive css.
	const taxonomyResponsiveCss = (deviceType) => {
		return catTabCategoryEnable
			? {
					[`#${uniqueId} .sp-smart-post-category ul`]: {
						margin: spacingGenerate(catTabCategoryMargin, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-category .sp-taxonomy-type-category a, #${uniqueId} .sp-smart-post-category .sp-taxonomy-type-post_tag a`]:
						{
							"font-size": rangerCss(catTabCategoryFontSize, deviceType),
							"line-height": rangerCss(catTabCategoryLineHeight, deviceType),
							"letter-spacing": rangerCss(catTabCategoryLetterSpacing, deviceType),
							"word-spacing": rangerCss(catTabCategoryWordSpacing, deviceType),
							"border-width": spacingGenerate(catTabCategoryBorderWidth, deviceType),
							"border-radius": spacingGenerate(catTabCategoryBorderRadius, deviceType),

							padding: spacingGenerate(catTabCategoryPadding, deviceType),
						},
					[`#${uniqueId} .sp-smart-post-category a:hover`]: {
						"border-width": spacingGenerate(catTabCategoryBorderWidthHover, deviceType),
						"border-radius": spacingGenerate(catTabCategoryBorderRadiusHover, deviceType),
					},
				}
			: {};
	};

	// Feature image css.
	const featureImageCss = () => {
		const grayscaleNormal = `grayscale(${imageGrayscaleLevel.value}%)`;
		let grayscaleHover = `grayscale(${imageGrayscaleLevelHover.value}%)`;

		if (imageGrayscaleHover && "original" === imageMode) {
			grayscaleHover = `grayscale(1)`;
		}

		if (imageNormalHover && "grayscale" === imageMode) {
			grayscaleHover = `grayscale(0)`;
		}

		return imageFeaturedImg
			? [
					{
						class: `#${uniqueId} .sp-smart-post-card-image img`,
						styles: {
							filter: `blur(${imageBlurEffect.value}px) brightness(${imageBrightness}) ${grayscaleNormal}`,
							"object-fit": imageScale,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card-image:hover img, #${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card:hover .sp-smart-post-card-image img`,
						styles: {
							filter: `blur(${imageBlurEffectHover.value}px) brightness(${imageBrightnessHover}) ${grayscaleHover}`,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-card-image:hover.img-opacity img, #${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card:hover .sp-smart-post-card-image.img-opacity img`,
						styles: {
							opacity: imageOpacityEffect,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card-image`,
						styles: {
							"border-radius": spacingGenerate(imageRadius, "Desktop"),
							"border-style": imageBorder.style,
							"border-color": imageBorder.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card-image:hover`,
						styles: {
							"border-color": imageBorder.hoverColor,
						},
					},
				]
			: [];
	};

	// Feature image responsive css.
	const featureImageResponsiveCss = (deviceType) => {
		const imageSizeCss =
			"custom" === imageSize
				? {
						width: rangerCss(imageWidth, deviceType),
						height: rangerCss(imageHeight, deviceType),
					}
				: {};

		return imageFeaturedImg
			? {
					[`#${uniqueId} .sp-smart-post-card-image`]: {
						"border-width": spacingGenerate(imageBorderWidth, deviceType),
						"border-radius": spacingGenerate(imageRadius, deviceType),
						...imageSizeCss,
					},
				}
			: {};
	};

	// Content area css.
	const contentAreaCss = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-card`,
				styles: {
					background: colorControls(
						postCardBg.color.style,
						postCardBg.color.solidColor,
						postCardBg.color.gradient
					),
					"border-style": postCardBorder.style,
					"border-color": postCardBorder.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card .sp-smart-post-template-one-content`,
				styles: {
					"align-items": spContentPosition[contentVerticalPosition],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-box .sp-smart-post-card-content`,
				styles: {
					background:
						colorControls(
							contentAreaBg.color.style,
							contentAreaBg.color.solidColor,
							contentAreaBg.color.gradient
						) + " !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-card-content`,
				styles: {
					background: colorControls(
						contentAreaBg.color.style,
						contentAreaBg.color.solidColor,
						contentAreaBg.color.gradient
					),
					"text-align": contentAlignment,
					// 'align-items': spContentPosition[ contentAlignment ],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-card:hover`,
				styles: {
					background: colorControls(
						postCardBg.hover.style,
						postCardBg.hover.solidColor,
						postCardBg.hover.gradient
					),
					"border-style": postCardBorder.hoverStyle,
					"border-color": postCardBorder.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-block-wrapper:not(.sp-smart-post-background-layout) .sp-smart-post-card, #${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-full .sp-smart-post-template-one-content`,
				styles: {
					padding: spacingGenerate(postCardPadding, "Desktop"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-box .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-box .image-overlay`,
				styles: {
					position: "absolute",
				},
			},
		];
	};

	// Content area responsive css.
	const contentAreaResponsiveCss = (deviceType) => {
		const contentPadding =
			"background" !== imagePosition ? { padding: spacingGenerate(postCardPadding, deviceType) } : {};
		const overlayPositionH = (position, attr) => {
			if (["top", "left"].includes(position)) {
				return "0";
			}
			if ("center" === position) {
				return `50%`;
			}
			if (["bottom", "right"].includes(position)) {
				return `100%`;
			}
		};

		return {
			[`#${uniqueId} .sp-smart-post-card`]: {
				"border-width": spacingGenerate(postCardBorderWidth, deviceType),
				"border-radius": spacingGenerate(postCardBorderRadius, deviceType),
				"box-shadow": boxCss(postCardBoxShadowEnable, deviceType, postCardBoxShadow, "color"),
				...contentPadding,
				margin: spacingGenerate(contentAreaMargin, deviceType),
				gap: rangerCss(imageSpace, deviceType),
			},
			[`#${uniqueId} sp-smart-post-block-wrapper:not(.sp-smart-post-background-layout) .sp-smart-post-card, #${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-full .sp-smart-post-template-one-content`]:
				{
					padding: spacingGenerate(postCardPadding, deviceType),
				},
			[`#${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-box .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-background-layout .sp-smart-post-card.overlay-type-box .image-overlay`]:
				{
					width: rangerCss(contentAreaWidth, deviceType),
					height: rangerCss(contentAreaHeight, deviceType),
					top: overlayPositionH(contentVerticalPosition, contentAreaHeight),
					left: overlayPositionH(contentHorizontalPosition, contentAreaWidth),
					transform: `translate(-${overlayPositionH(
						contentHorizontalPosition,
						contentAreaWidth
					)}, -${overlayPositionH(contentVerticalPosition, contentAreaHeight)})`,
				},
			[`#${uniqueId} .sp-smart-post-card .sp-smart-post-card-content`]: {
				padding: spacingGenerate(contentAreaPadding, deviceType),
			},
			[`#${uniqueId} .sp-smart-post-card:hover`]: {
				"border-width": spacingGenerate(postCardHoverBorderWidth, deviceType),
				"border-radius": spacingGenerate(postCardHoverBorderRadius, deviceType),
				"box-shadow": boxCss(postCardHoverBoxShadowEnable, deviceType, postCardHoverBoxShadow, "color"),
			},
		};
	};
	// Container area Css.
	const containerCss = () => {
		return [
			{
				class: `#${uniqueId}`,
				styles: {
					background: colorControls(
						advancedBg.color.style,
						advancedBg.color.solidColor,
						advancedBg.color.gradient
					),
					"border-style": advancedBorderStyle.style,
					"border-color": advancedBorderStyle.color,
				},
			},
			{
				class: `#${uniqueId}:hover`,
				styles: {
					background: colorControls(
						advancedBg.hover.style,
						advancedBg.hover.solidColor,
						advancedBg.hover.gradient
					),
					"border-style": advancedBorderStyle.hoverStyle,
					"border-color": advancedBorderStyle.hoverColor,
				},
			},
		];
	};

	// Container area responsive Css.
	const containerResponsiveCss = (deviceType) => {
		return {
			[`#${uniqueId}`]: {
				"border-width": spacingGenerate(advancedBorderStyleWidth, deviceType),
				"border-radius": spacingGenerate(advancedBorderRadius, deviceType),
				"box-shadow": boxCss(advancedBoxShadowEnable, deviceType, advancedBoxShadow, "color"),
				padding: spacingGenerate(advancedPadding, deviceType),
				margin: spacingGenerate(advancedMargin, deviceType),

				// "margin-block-start": "editor" === page ? "" : "0px",
			},
			[`#${uniqueId}:hover`]: {
				"border-width": spacingGenerate(advancedBorderStyleWidthHover, deviceType),
				"border-radius": spacingGenerate(advancedBorderRadiusHover, deviceType),
			},
		};
	};

	// Carousel Navigation button css.
	const carouselNavBtnCss = () => {
		const navigationArrowCss =
			carouselArrowSpaceBetween?.device?.Desktop > 99 && carouselArrowSpaceBetween?.unit?.Desktop === "%"
				? {
						right: rangerCss(carouselArrowHorizontal),
						left: "auto",
					}
				: {
						left: rangerCss(carouselArrowHorizontal),
					};
		return carouselNavArrow
			? [
					{
						class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow`,
						styles: {
							top: rangerCss(carouselArrowVertical),
							gap: rangerCss(carouselArrowSpaceBetween),
							width: `calc(100% - ${carouselArrowWidth.device.Desktop * 2}px)`,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-prev`,
						styles: {
							left: rangerCss(carouselArrowHorizontal),
						},
					},
					{
						class: `#${uniqueId} div:not(.post-timeline-three) .sp-smart-post-swiper-nav-arrow .btn-next`,
						styles: {
							...navigationArrowCss,
						},
					},
					{
						class: `#${uniqueId} .post-timeline-three .sp-smart-post-swiper-nav-arrow .btn-next`,
						styles: {
							...navigationArrowCss,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i`,
						styles: {
							color: carouselArrowColor.color,
							background: carouselArrowBgColor.color,
							"border-color": carouselArrowBorder.color,
							"border-style": carouselArrowBorder.style,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i svg`,
						styles: {
							fill: carouselArrowColor.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i:hover`,
						styles: {
							color: carouselArrowColor.hoverColor,
							background: carouselArrowBgColor.hoverColor,
							"border-color": carouselArrowBorder.hoverColor,
							"border-style": carouselArrowBorder.hoverStyle,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i:hover svg`,
						styles: {
							fill: carouselArrowColor.hoverColor,
						},
					},
				]
			: [];
	};

	// Carousel Navigation button responsive css.
	const carouselNavBtnResponsiveCss = (deviceType) => {
		const navigationArrowCss =
			carouselArrowSpaceBetween?.device?.[deviceType] > 99 && carouselArrowSpaceBetween?.unit?.[deviceType] === "%"
				? {
						right: rangerCss(carouselArrowHorizontal, deviceType),
						left: "auto",
					}
				: {
						left: rangerCss(carouselArrowHorizontal, deviceType),
					};
		return carouselNavArrow
			? {
					[`#${uniqueId} .sp-smart-post-swiper-nav-arrow`]: {
						top: rangerCss(carouselArrowVertical, deviceType),
						gap: rangerCss(carouselArrowSpaceBetween, deviceType),
						width: `calc(100% - ${carouselArrowWidth.device?.[deviceType] * 2}px)`,
					},
					[`#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-prev`]: {
						left: rangerCss(carouselArrowHorizontal, deviceType),
					},
					// [ `#${ uniqueId } div:not(.post-timeline-three) .sp-smart-post-swiper-nav-arrow .btn-next` ]:
					// 	{
					// 		left: `calc(${rangerCss( carouselArrowSpaceBetween, deviceType )} - ${carouselArrowWidth.device?.[deviceType]}px)`,
					// 	},
					[`#${uniqueId} div:not(.post-timeline-three) .sp-smart-post-swiper-nav-arrow .btn-next`]: {
						...navigationArrowCss,
					},
					[`#${uniqueId} .post-timeline-three .sp-smart-post-swiper-nav-arrow .btn-next`]: {
						...navigationArrowCss,
					},
					[`#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i`]: {
						"font-size": rangerCss(carouselArrowSize, deviceType),
						width: rangerCss(carouselArrowWidth, deviceType),
						height: rangerCss(carouselArrowHeight, deviceType),
						"border-width": spacingGenerate(carouselArrowBorderWidth, deviceType),
						"border-radius": spacingGenerate(carouselArrowBorderRadius, deviceType),
						"box-shadow": boxCss(carouselBoxShadowEnable, deviceType, carouselBoxShadow, "color"),
					},
					[`#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i svg`]: {
						width: rangerCss(carouselArrowSize, deviceType),
						height: rangerCss(carouselArrowSize, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i:hover`]: {
						"border-width": spacingGenerate(carouselArrowBorderWidthHover, deviceType),
					},
				}
			: {};
	};

	// Carousel Pagination Dots css.
	const paginationDotsCss = () => {
		const scrollbarCss =
			"scrollbar" === carouselPaginationStyle
				? [
						{
							class: `#${uniqueId} .swiper-scrollbar`,
							styles: {
								background: carouselPaginationColor.color,
							},
						},
						{
							class: `#${uniqueId} .swiper-scrollbar .swiper-scrollbar-drag`,
							styles: {
								background: carouselPaginationColor.hoverColor,
							},
						},
					]
				: [];

		const notFraction =
			"fraction" !== carouselPaginationStyle
				? {
						width: "max-content !important",
						height: "fit-content !important",
					}
				: {};

		return carouselPaginationDot
			? [
					{
						class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle}`,
						styles: {
							color: carouselPaginationTextColor.color,
							...notFraction,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle} .swiper-pagination-bullet`,
						styles: {
							background: carouselPaginationColor.color,
							"border-color": carouselPaginationBorder.color,
							"border-style": carouselPaginationBorder.style,
							opacity: "1",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle} .swiper-pagination-bullet:hover`,
						styles: {
							background: carouselPaginationColor.color,
							"border-color": carouselPaginationBorder.color,
							"border-style": carouselPaginationBorder.style,
							opacity: "1",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
						styles: {
							background: carouselPaginationColor.hoverColor + " !important",
							color: carouselPaginationTextColor.activeColor,
							"border-color": carouselPaginationBorder.hoverColor,
							"border-style": carouselPaginationBorder.hoverStyle,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-strokes .swiper-pagination-bullet.swiper-pagination-bullet-active`,
						styles: {
							width: "50px",
							"border-radius": "5px",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-fraction`,
						styles: {
							background: carouselPaginationColor.color,
							"border-color": carouselPaginationBorder.color,
							"border-style": carouselPaginationBorder.style,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-fraction:hover`,
						styles: {
							background: carouselPaginationColor.hoverColor,
							"border-color": carouselPaginationBorder.hoverColor,
							"border-style": carouselPaginationBorder.hoverStyle,
							color: carouselPaginationTextColor.activeColor,
						},
					},
					...scrollbarCss,
				]
			: [];
	};

	// Carousel Pagination Dots responsive css.
	const paginationDotsResponsiveCss = (deviceType) => {
		return carouselPaginationDot
			? {
					[`#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle}`]: {
						gap: rangerCss(carouselPaginationSpaceBetween, deviceType),
						bottom: rangerCss(carouselPaginationVertical, deviceType),
						left: rangerCss(carouselPaginationHorizontal, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle} .swiper-pagination-bullet`]: {
						width: rangerCss(carouselPaginationWidth, deviceType),
						height: rangerCss(carouselPaginationHeight, deviceType),
						"border-width": spacingGenerate(carouselPaginationBorderWidth, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-pagination-fraction`]: {
						width: `${rangerCss(carouselPaginationWidth, deviceType)} !important`,
						height: rangerCss(carouselPaginationWidth, deviceType),
						"border-width": spacingGenerate(carouselPaginationBorderWidth, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-pagination-fraction:hover`]: {
						"border-width": spacingGenerate(carouselPaginationBorderWidthHover, deviceType),
					},
				}
			: {};
	};

	// Read More Button css.
	const readMoreButtonCss = () => {
		return showReadMoreButton
			? [
					{
						class: `#${uniqueId} .sp-smart-post-read-more-button`,
						styles: {
							"justify-content": spContentPosition[contentAlignment],
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-read-more-button a`,
						styles: {
							...typographyCss(readMoreButtonTypography),
							color: readMoreColor.color,
							background: colorControls(
								readMoreBg.color.style,
								readMoreBg.color.solidColor,
								readMoreBg.color.gradient
							),
							"border-style": readMoreButtonBorder.style,
							"border-color": readMoreButtonBorder.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-read-more-button a:hover`,
						styles: {
							color: readMoreColor.hoverColor,
							background: colorControls(
								readMoreBg.hover.style,
								readMoreBg.hover.solidColor,
								readMoreBg.hover.gradient
							),
							"border-color": readMoreButtonBorder.hoverColor,
							"border-style": readMoreButtonBorder.hoverStyle,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-read-more-button a i`,
						styles: {
							"margin-left": ["always"].includes(readMoreIocVisibility)
								? rangerCss(readMoreIconGap)
								: "0",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-read-more-button a:hover i`,
						styles: {
							"margin-left": ["always", "hover"].includes(readMoreIocVisibility)
								? rangerCss(readMoreIconGap)
								: "0",
						},
					},
				]
			: [];
	};

	// Read More Button responsive css.
	const readMoreButtonResponsiveCss = (deviceType) => {
		return showReadMoreButton
			? {
					[`#${uniqueId} .sp-smart-post-read-more-button a`]: {
						"font-size": rangerCss(readMoreButtonFontSize, deviceType),
						"letter-spacing": rangerCss(readMoreButtonFontSpacing, deviceType),
						"word-spacing": rangerCss(readMoreButtonWordSpacing, deviceType),
						"line-height": rangerCss(readMoreButtonLineHeight, deviceType),
						"border-width": spacingGenerate(readMoreButtonBorderWidth, deviceType),
						"border-radius": spacingGenerate(readMoreButtonBorderRadius, deviceType),
						padding: spacingGenerate(readMoreButtonPadding, deviceType),
						margin: spacingGenerate(readMoreButtonMargin, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-read-more-button a:hover`]: {
						"border-width": spacingGenerate(readMoreButtonBorderWidthHover, deviceType),
						"border-radius": spacingGenerate(readMoreButtonBorderRadiusHover, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-read-more-button a i`]: {
						"margin-left": ["always"].includes(readMoreIocVisibility)
							? rangerCss(readMoreIconGap, deviceType)
							: "0",
					},
					[`#${uniqueId} .sp-smart-post-read-more-button a:hover i`]: {
						"margin-left": ["always", "hover"].includes(readMoreIocVisibility)
							? rangerCss(readMoreIconGap, deviceType)
							: "0",
					},
				}
			: {};
	};

	// Social Share css.
	const socialShareCss = () => {
		const customCss =
			"custom" === socialShareIconType
				? {
						"background-color": socialShareCustomBgColor.color,
						color: socialShareCustomColor.color,
						"box-shadow": boxCss(socialShareBoxShadow, "Desktop", socialPopupBoxShadowValue, "color"),
					}
				: {};
		const customCssHover =
			"custom" === socialShareIconType
				? {
						"background-color": socialShareCustomBgColor.hoverColor,
						color: socialShareCustomColor.hoverColor,
						"box-shadow": boxCss(socialShareBoxShadow, "Desktop", socialPopupBoxShadowValue, "hover"),
					}
				: {};

		const popupCss =
			"popup-share" === socialIconDisplayType
				? [
						{
							class: `#${uniqueId} .sp-social-share-popup .sp-social-popup-icon-list`,
							styles: {
								background: socialPopupContainerBGColor.color,
								"border-color": socialSharePopupBorder.color,
								"border-style": socialSharePopupBorder.style,
								"border-width": spacingGenerate(socialSharePopupBorderWidth),
								padding: spacingGenerate(socialPopupPadding),
								"box-shadow": boxCss(
									socialPopupBoxShadow,
									"Desktop",
									socialPopupBoxShadowValue,
									"color"
								),
							},
						},
						{
							class: `#${uniqueId} .sp-social-share-popup .sp-social-popup-icon-list:after`,
							styles: {
								"border-top-color": socialPopupContainerBGColor.color,
							},
						},
						{
							class: `#${uniqueId} .sp-social-share-popup .sp-social-popup-icon-list:before`,
							styles: {
								"border-top-color": socialSharePopupBorder.color,
								"border-top-style": socialSharePopupBorder.style,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-card .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon svg`,
							styles: {
								width: socialShareIconSize.value + "px",
								height: socialShareIconSize.value + "px",
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-card .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon`,
							styles: {
								background: socialPopupShareBGColor.color,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-card .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon svg path`,
							styles: {
								fill: socialPopupShareColor.color,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-card .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon:hover`,
							styles: {
								background: socialPopupShareBGColor.hoverColor,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-card .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon:hover svg path`,
							styles: {
								fill: socialPopupShareColor.hoverColor,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-card .sp-meta-data .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon`,
							styles: {
								margin: spacingGenerate(metadataMargin, "Desktop"),
							},
						},
					]
				: [];

		return socialShareEnableSocial
			? [
					{
						class: `#${uniqueId} .sp-smart-post-social-share`,
						styles: {
							gap: `${socialShareSpaceBetween.value}${socialShareSpaceBetween.unit}`,
							"justify-content": spContentPosition[contentAlignment],
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-social-share li a i, #${uniqueId} .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon`,
						styles: {
							"font-size": `${socialShareIconSize.value}${socialShareIconSize.unit}`,
							...customCss,
							"border-color": socialShareBorder.color,
							"border-style": socialShareBorder.style,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-social-share li a:hover i, #${uniqueId} .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon:hover`,
						styles: {
							"border-color": socialShareBorder.hoverColor,
							...customCssHover,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card-content .sp-smart-post-social-share .sp-post-url-copy-popup`,
						styles: {
							left: contentAlignment !== "right" ? "0" : "",
							right: contentAlignment === "right" ? "0" : "",
						},
					},
					...popupCss,
				]
			: [];
	};

	// Social Share Responsive css.
	const socialShareResponsiveCss = (deviceType) => {
		const socialCustomCss = {
			"box-shadow": boxCss(socialShareBoxShadow, deviceType, socialShareBoxShadowValue, "color"),
		};

		const socialAlignment = !["space-between-taxonomy", "space-between-meta"].includes(socialShareIconPosition)
			? {
					left:
						"center" === contentAlignment
							? `calc(50% - 15px)`
							: "left" === contentAlignment
								? "0"
								: "unset",
					right: "right" === contentAlignment ? `0` : "unset",
				}
			: {};

		const socialPopupCss =
			"popup-share" === socialIconDisplayType
				? {
						[`#${uniqueId} .sp-social-share-popup .sp-social-popup-icon-list`]: {
							"border-width": spacingGenerate(socialSharePopupBorderWidth, deviceType),
							padding: spacingGenerate(socialPopupPadding, deviceType),
							"box-shadow": boxCss(socialPopupBoxShadow, deviceType, socialPopupBoxShadowValue, "color"),
							...socialAlignment,
						},
						[`#${uniqueId} .sp-smart-post-card .sp-meta-data .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon`]:
							{
								margin: spacingGenerate(metadataMargin, deviceType),
							},
					}
				: {};

		return socialShareEnableSocial
			? {
					[`#${uniqueId} .sp-smart-post-social-share`]: {
						margin: spacingGenerate(socialShareMargin, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-social-share li a i, #${uniqueId} .sp-social-share-popup .sp-social-share-popup-icon.popup-share-icon`]:
						{
							"font-size": `${socialShareIconSize.value}${socialShareIconSize.unit}`,
							"border-width": spacingGenerate(socialShareBorderWidth, deviceType),
							"border-radius": spacingGenerate(socialShareBorderRadius, deviceType),
							padding: spacingGenerate(socialSharePadding, deviceType),
							...socialCustomCss,
						},
					...socialPopupCss,
				}
			: {};
	};

	// Load more button css.
	const loadMoreButtonCss = () => {
		return ["load-more", "pagination", "navigation"].includes(paginationType)
			? [
					{
						class: `#${uniqueId} .sp-smart-post-pagination-buttons a, #${uniqueId} .sp-smart-post-navigation-buttons span, #${uniqueId} .sp-smart-post-load-more-button a`,
						styles: {
							...typographyCss(paginationTypography),
							"border-style": paginationBorder.style,
							"border-color": paginationBorder.color,
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-pagination-buttons a:hover,
				#${uniqueId} .sp-smart-post-pagination-buttons .current,
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
						class: `#${uniqueId} .sp-smart-post-navigation-buttons .sp-smart-post-grid-nav-arrow,
				#${uniqueId} .sp-smart-post-pagination-buttons`,
						styles: {
							gap: `${paginationSpaceBetween.device.Desktop}px`,
						},
					},
				]
			: [];
	};

	// Load more button responsive css.
	const loadMoreButtonResponsiveCss = (deviceType) => {
		return ["load-more", "pagination", "navigation"].includes(paginationType)
			? {
					[`#${uniqueId} .sp-smart-post-pagination-buttons a, #${uniqueId} .sp-smart-post-navigation-buttons span, #${uniqueId} .sp-smart-post-load-more-button a`]:
						{
							"font-size": rangerCss(paginationFontSize, deviceType),
							"letter-spacing": rangerCss(paginationLetterSpacing, deviceType),
							"word-spacing": rangerCss(paginationWordSpacing, deviceType),
							"line-height": rangerCss(paginationLineHeight, deviceType),
							margin: spacingGenerate(paginationMargin, deviceType),
							padding: spacingGenerate(paginationPadding, deviceType),
							"border-width": spacingGenerate(paginationBorderWidth, deviceType),
							"border-radius": spacingGenerate(paginationBorderRadius, deviceType),
						},
					[`#${uniqueId} .sp-smart-post-navigation-buttons:not(.sp-prev-next) span`]: {
						width: rangerCss(navigationArrowWidth, deviceType),
						height: rangerCss(navigationArrowHeight, deviceType),
						"font-size": rangerCss(navigationArrowSize, deviceType),
					},
					[`#${uniqueId} .sp-smart-post-navigation-buttons .sp-smart-post-grid-nav-arrow, #${uniqueId} .sp-smart-post-pagination-buttons`]:
						{
							gap: `${paginationSpaceBetween.device?.[deviceType]}px`,
						},
				}
			: {};
	};

	// Popup Css.
	const popupCss = () => {
		return ["single-popup", "multi-popup"].includes(generalLinkOpen)
			? [
					{
						class: `#${uniqueId}-modal .sp-smart-post-modal-content-lightbox.sp-smart-post-modal-content`,
						styles: {
							"background-color": popupBgColor,
							"max-width": popupMaxWidth.value + popupMaxWidth.unit,
							"max-height": popupMaxHeight.value + popupMaxHeight.unit,
						},
					},
					{
						class: `#${uniqueId}-modal`,
						styles: {
							"background-color": popupOverlayColor,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-smart-post-card-modal-image img`,
						styles: {
							"object-fit": "cover",
							"max-width": "100%",
						},
					},
					{
						class: `#${uniqueId}-modal .sp-modal-close-btn.cursor`,
						styles: {
							color: popupCloseBtnColor.color,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-modal-close-btn.cursor:hover`,
						styles: {
							color: popupCloseBtnColor.hover,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-post-modal-title`,
						styles: {
							color: popupTitleColor,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-smart-post-card-content-modal .sp-smart-post-meta-text`,
						styles: {
							color: popupMetaFieldsColor,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-smart-post-card-content-modal .sp-smart-post-meta-icon svg path`,
						styles: {
							fill: popupMetaFieldsColor,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-smart-post-card-content-modal .sp-post-modal-excerpt p`,
						styles: {
							color: popupExcerptColor,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-smart-modal-navigation`,
						styles: {
							color: popupNavArrowColor.color,
							"background-color": popupNavArrowBgColor.color,
						},
					},
					{
						class: `#${uniqueId}-modal .sp-smart-modal-navigation:hover`,
						styles: {
							color: popupNavArrowColor.hover,
							"background-color": popupNavArrowBgColor.hover,
						},
					},
				]
			: [];
	};
	// Popup Responsive Css.
	const responsivePopupCss = (device) => {
		return ["single-popup", "multi-popup"].includes(generalLinkOpen)
			? {
					[`#${uniqueId}-modal .sp-smart-post-card-modal-image img`]: {
						width: `${
							popupImageSize === "custom"
								? popupImageWidth.device?.[device] + popupImageWidth.unit?.[device]
								: ""
						}`,
						height: `${
							popupImageSize === "custom"
								? popupImageHeight.device?.[device] + popupImageHeight.unit?.[device]
								: ""
						}`,
					},
					[`#${uniqueId}-modal .sp-modal-close-btn i`]: {
						"font-size": rangerCss(popupCloseBtnSize, device),
					},
				}
			: {};
	};

	// Responsive css.
	const responsiveCss = (deviceType) => {
		//---------------------------------------------------------title effects---------------------------------------------------------//
		const titleEffects =
			[
				"post-carousel-two",
				"post-grid-two",
				"post-grid-three",
				"post-grid-four",
				"post-grid-five",
				"post-grid-six",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
				"post-timeline-two",
			].includes(blockName) && titleEffect !== "none"
				? [
						{
							class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId} .sp-smart-post-slider .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId} .sp-smart-post-slider-two .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId}.sp-smart-post-grid-four .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId}.sp-smart-post-grid-five .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId}.sp-smart-post-grid-six .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId}.sp-smart-post-grid-three .sp-smart-post-card .sp-smart-post-title:after,
						        #${uniqueId}.sp-smart-post-timeline-two .sp-smart-post-card .sp-smart-post-title:after`,

							styles: {
								...(titleEffect === "topBottomLine" &&
									(titleUnderlineEffect === "leftToRight" ||
										titleUnderlineEffect === "oppositeStart") && {
										left: 0,
										bottom: 0,
										height: "2px",
									}),

								...(titleEffect === "topBottomLine" &&
									(titleUnderlineEffect === "rightToLeft" ||
										titleUnderlineEffect === "oppositeStartReversed") && {
										right: 0,
										bottom: 0,
										height: "2px",
									}),

								...(titleEffect === "topBottomLine" &&
									titleUnderlineEffect === "startCentered" && {
										left: "50%",
										"-webkit-transform": "translateX(-50%)",
										transform: "translateX(-50%)",
										bottom: 0,
										height: "2px",
									}),

								width: 0,
								"background-color": titleEffectColor,
							},
						},

						{
							class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId} .sp-smart-post-slider .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId} .sp-smart-post-slider-two .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId}.sp-smart-post-grid-four .sp-smart-post-card .sp-smart-post-title:before,
					    #${uniqueId}.sp-smart-post-grid-five .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId}.sp-smart-post-grid-six .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId}.sp-smart-post-grid-three .sp-smart-post-card .sp-smart-post-title:before,
						#${uniqueId}.sp-smart-post-timeline-two .sp-smart-post-card .sp-smart-post-title:before`,
							styles: {
								...(titleEffect === "topBottomLine" &&
									(titleUnderlineEffect === "leftToRight" ||
										titleUnderlineEffect === "oppositeStartReversed") && {
										left: 0,
										top: 0,
										height: "2px",
									}),

								...(titleEffect === "topBottomLine" &&
									(titleUnderlineEffect === "rightToLeft" ||
										titleUnderlineEffect === "oppositeStart") && {
										right: 0,
										top: 0,
										height: "2px",
									}),

								...(titleEffect === "topBottomLine" &&
									titleUnderlineEffect === "startCentered" && {
										left: "50%",
										"-webkit-transform": "translateX(-50%)",
										transform: "translateX(-50%)",
										top: 0,

										height: "2px",
									}),

								width: 0,
								"background-color": titleEffectColor,
							},
						},

						{
							class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId} .sp-smart-post-slider .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId} .sp-smart-post-slider .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId} .sp-smart-post-slider-two .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId} .sp-smart-post-slide-two .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId}.sp-smart-post-grid-four .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId}.sp-smart-post-grid-four .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId}.sp-smart-post-grid-three .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId}.sp-smart-post-grid-three .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId}.sp-smart-post-grid-five .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId}.sp-smart-post-grid-five .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId}.sp-smart-post-grid-six .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId}.sp-smart-post-grid-six .sp-smart-post-card .sp-smart-post-title:hover:before,
						 #${uniqueId}.sp-smart-post-timeline-two .sp-smart-post-card .sp-smart-post-title:hover:after, #${uniqueId}.sp-smart-post-timeline-two .sp-smart-post-card .sp-smart-post-title:hover:before`,
							styles: {
								width: "100%",
							},
						},

						{
							class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card .sp-smart-post-title .line::after, 
						#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId} .sp-smart-post-slider .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId} .sp-smart-post-slider-two .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId}.sp-smart-post-grid-four .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId}.sp-smart-post-grid-five .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId}.sp-smart-post-grid-six .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId}.sp-smart-post-grid-three .sp-smart-post-card .sp-smart-post-title .line::after,
						#${uniqueId}.sp-smart-post-timeline-two .sp-smart-post-card .sp-smart-post-title .line::after`,
							styles: {
								...(titleEffect !== "topBottomLine" && {
									height: titleEffect === "backgroundFill" ? "100%" : "2px",
									background: `linear-gradient(90deg, ${titleEffectColor})`,
									"transform-origin":
										titleEffect === "backgroundFill"
											? "left"
											: titleUnderlineEffect === "rightToLeft"
												? "right"
												: titleUnderlineEffect === "leftToRight"
													? "left"
													: "center",
								}),
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-grid-two .sp-smart-post-card .sp-smart-post-title, 
						#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId} .sp-smart-post-slider .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId} .sp-smart-post-slider-two .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId} .sp-smart-post-thumbnail-slide .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId} .sp-smart-post-thumbnail-slide-two .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId}.sp-smart-post-grid-four .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId}.sp-smart-post-grid-five .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId}.sp-smart-post-grid-three .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId}.sp-smart-post-grid-six .sp-smart-post-card .sp-smart-post-title,
						#${uniqueId}.sp-smart-post-timeline-two .sp-smart-post-card .sp-smart-post-title`,
							styles: {
								...(titleEffect === "backgroundFill" && {
									"box-shadow": `inset 0 0 0 0  ${titleEffectColor}`,
									// padding: "2px .30rem",
									// margin: "0 -.30rem",
									transition: "color .8s ease-in-out, box-shadow .6s ease-in-out",
								}),
							},
						},
					]
				: [];
		//---------------------------------------------------------title effects---------------------------------------------------------//

		const thumbnailPaginationPosition = {
			Desktop: "180px",
			Tablet: "130px",
			Mobile: "110px",
		};

		const carouselNavigationCss = (deviceType) => {
			return carouselNavArrow
				? [
						{
							class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i`,
							styles: {
								"box-shadow": boxCss(carouselBoxShadowEnable, [deviceType], carouselBoxShadow, "color"),
							},
						},
					]
				: [];
		};

		const paginationDots = (deviceType) => {
			return carouselPaginationDot
				? [
						{
							class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle}`,
							styles: {
								"justify-content": `${
									carouselPaginationHorizontal.device?.[deviceType] !== "" ? "flex-start" : "center"
								}`,
								gap: `${
									carouselPaginationSpaceBetween.device?.[deviceType] +
									carouselPaginationSpaceBetween.unit?.[deviceType]
								}`,
								bottom: `${
									carouselPaginationVertical.device?.[deviceType]
										? carouselPaginationVertical.device?.[deviceType] +
											carouselPaginationVertical.unit?.[deviceType]
										: 180 === carouselPaginationVertical.device.Desktop
											? thumbnailPaginationPosition[deviceType]
											: carouselPaginationVertical.device.Desktop
								}`,
								left: `${
									carouselPaginationHorizontal.device?.[deviceType] === ""
										? "50%"
										: carouselPaginationHorizontal.device?.[deviceType] +
											carouselPaginationHorizontal.unit?.[deviceType]
								}`,
								transform: "translateX(-50%)",
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle} .swiper-pagination-bullet`,
							styles: {
								width: `${
									carouselPaginationWidth.device?.[deviceType] +
									carouselPaginationWidth.unit?.[deviceType]
								}`,
								height:
									carouselPaginationHeight.device?.[deviceType] +
									carouselPaginationHeight.unit?.[deviceType],
								"font-size": `${
									carouselPaginationWidth.device?.[deviceType] < 10
										? "10px"
										: Math.floor(carouselPaginationWidth.device?.[deviceType] / 1.5) +
											carouselPaginationWidth.unit?.[deviceType]
								}`,
								"border-width": spacingGenerate(carouselPaginationBorderWidth, deviceType),
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-${carouselPaginationStyle} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
							styles: {
								width: `${
									carouselPaginationWidth.device?.[deviceType] +
									carouselPaginationWidth.unit?.[deviceType]
								}`,
								"border-width": spacingGenerate(carouselPaginationBorderWidthHover, deviceType),
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-strokes`,
							styles: {
								left: `${
									"" === carouselPaginationStyle
										? "50%"
										: carouselPaginationHorizontal.device?.[deviceType] +
											carouselPaginationHorizontal.unit?.[deviceType]
								}`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-strokes:not(.sp-pagination-vertical)`,
							styles: {
								transform: `translateX(-${
									"" === carouselPaginationStyle
										? "50%"
										: carouselPaginationHorizontal.device?.[deviceType] +
											carouselPaginationHorizontal.unit?.[deviceType]
								})`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-strokes:not(.sp-pagination-vertical) .swiper-pagination-bullet-active`,
							styles: {
								width: `${
									carouselPaginationWidth.device?.[deviceType] * 2 +
									carouselPaginationWidth.unit?.[deviceType]
								} !important`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-strokes.sp-pagination-vertical .swiper-pagination-bullet-active`,
							styles: {
								height: `${
									carouselPaginationHeight.device?.[deviceType] * 2 +
									carouselPaginationHeight.unit?.[deviceType]
								} !important`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-fraction `,
							styles: {
								width: `${
									carouselPaginationWidth.device?.[deviceType] +
									carouselPaginationWidth.unit?.[deviceType]
								} !important`,
								height: `${
									carouselPaginationWidth.device?.[deviceType] +
									carouselPaginationWidth.unit?.[deviceType]
								}`,
								"font-size": `${
									Math.ceil(carouselPaginationWidth.device?.[deviceType] / 2.5) +
									carouselPaginationWidth.unit?.[deviceType]
								}`,
								"border-width": spacingGenerate(carouselPaginationBorderWidth, deviceType),
								left: `${
									carouselPaginationHorizontal.device?.[deviceType] +
									carouselPaginationHorizontal.unit?.[deviceType]
								}`,
								bottom: `${
									"" === carouselPaginationVertical.device?.[deviceType]
										? ""
										: carouselPaginationVertical.device?.[deviceType] +
											carouselPaginationVertical.unit?.[deviceType]
								}`,
								transform: `translate(-${
									"" === carouselPaginationHorizontal.device?.[deviceType]
										? "50%"
										: carouselPaginationHorizontal.device?.[deviceType] +
											carouselPaginationHorizontal.unit?.[deviceType]
								}, -${
									"" === carouselPaginationVertical.device?.[deviceType]
										? "94%"
										: carouselPaginationVertical.device?.[deviceType] +
											carouselPaginationVertical.unit?.[deviceType]
								})`,
								gap: "0px",
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-fraction:hover`,
							styles: {
								"border-width": spacingGenerate(carouselPaginationBorderWidthHover, deviceType),
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-numbers`,
							styles: {
								bottom: `${
									"" === carouselPaginationVertical.device?.[deviceType]
										? ""
										: carouselPaginationVertical.device?.[deviceType] +
											carouselPaginationVertical.unit?.[deviceType]
								}`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-pagination-numbers .swiper-pagination-bullet`,
							styles: {
								width: `${
									carouselPaginationWidth.device?.[deviceType] +
									carouselPaginationWidth.unit?.[deviceType]
								} !important`,
							},
						},
						{
							class: `#${uniqueId} .swiper-scrollbar:not(.swiper-scrollbar-vertical)`,
							styles: {
								height: `${
									carouselPaginationHeight.device?.[deviceType] +
									carouselPaginationHeight.unit?.[deviceType]
								}`,
								bottom: `${
									carouselPaginationVertical.device?.[deviceType] > -1
										? carouselPaginationVertical.device?.[deviceType] +
											carouselPaginationVertical.unit?.[deviceType]
										: "0px"
								}`,
							},
						},
					]
				: [];
		};

		let allResponsiveCss = ["single-popup", "multi-popup"].includes(generalLinkOpen)
			? [
					//Post modal content styles
					{
						class: `#${uniqueId} .sp-smart-post-modal-portal .sp-smart-post-modal-content img`,
						styles: {
							width: `${
								popupImageSize === "custom"
									? popupImageWidth.device?.[deviceType] + popupImageWidth.unit?.[deviceType]
									: "auto"
							}`,
							height: `${
								popupImageSize === "custom"
									? popupImageHeight.device?.[deviceType] + popupImageHeight.unit?.[deviceType]
									: "auto"
							}`,
							"object-fit": "cover",
						},
					},
				]
			: [];
		if (imageFeaturedImg && blockName !== "post-grid-one") {
			allResponsiveCss = [
				...allResponsiveCss,
				{
					class: `#${uniqueId} .sp-smart-post-card.template-one .sp-smart-post-card-image`,
					styles: {
						width: `${
							imageSize === "custom" && imageWidth.device?.[deviceType]
								? imageWidth.device?.[deviceType] + imageWidth.unit?.[deviceType]
								: blockName === "post-grid-six"
									? "50%"
									: ""
						}`,
					},
				},
			];
		}
		if (blockName && !["post-grid-one", "post-grid-six"].includes(blockName)) {
			allResponsiveCss = [...allResponsiveCss];
		}
		if (
			blockName &&
			![
				"post-carousel",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
				"post-timeline-three",
			].includes(blockName)
		) {
			allResponsiveCss = [
				...allResponsiveCss,
				{
					class: `#${uniqueId}:not(.post-timeline-one, .sp-smart-post-timeline-one)`,
					styles: (function () {
						const calculatePadding = () => {
							if (!postCardBoxShadowEnable || !postCardBoxShadow.device?.[deviceType]) {
								return "";
							}
							return maxValueFromObject(postCardBoxShadow.device?.[deviceType]) + "px";
						};
						const paddingLeft = calculatePadding();
						const paddingRight = calculatePadding();
						const style = {};
						if (paddingLeft) {
							style["padding-left"] = paddingLeft + " !important";
						}
						if (paddingRight) {
							style["padding-right"] = paddingRight + " !important";
						}

						return style;
					})(),
				},
			];
		}

		if (
			blockName &&
			[
				"post-carousel",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
				"post-timeline-three",
			].includes(blockName)
		) {
			allResponsiveCss = [
				...allResponsiveCss,
				...carouselNavigationCss(deviceType),
				...paginationDots(deviceType),

				{
					class: `#${uniqueId} .sp-smart-post-carousel .swiper, #${uniqueId} .sp-smart-post-slider .swiper, #${uniqueId} .sp-smart-post-timeline-three-container .swiper`,
					styles: {
						"border-top-left-radius":
							advancedBorderRadius.device?.[deviceType].top + advancedBorderRadius.unit?.[deviceType],
						"border-top-right-radius":
							advancedBorderRadius.device?.[deviceType].right + advancedBorderRadius.unit?.[deviceType],
						transition: "all 0.3s ease-in-out",
					},
				},
				{
					class: `#${uniqueId}:hover .sp-smart-post-carousel .swiper, #${uniqueId}:hover .sp-smart-post-slider .swiper, #${uniqueId}:hover .sp-smart-post-timeline-three-container .swiper`,
					styles: {
						"border-top-left-radius":
							advancedBorderRadiusHover.device?.[deviceType].top +
							advancedBorderRadiusHover.unit?.[deviceType],
						"border-top-right-radius":
							advancedBorderRadiusHover.device?.[deviceType].right +
							advancedBorderRadiusHover.unit?.[deviceType],
					},
				},
				{
					class: `#${uniqueId} .sp-smart-post-thumbnail-slide .swiper, #${uniqueId} .sp-smart-post-timeline-three-container`,
					styles: {
						"border-top-left-radius":
							advancedBorderRadius.device?.[deviceType].top + advancedBorderRadius.unit?.[deviceType],
						"border-top-right-radius":
							advancedBorderRadius.device?.[deviceType].right + advancedBorderRadius.unit?.[deviceType],
					},
				},
				//............................carousel-two

				{
					class: `#${uniqueId} .sp-smart-post-carousel-two .swiper, #${uniqueId} .sp-smart-post-slider .swiper, #${uniqueId} .sp-smart-post-timeline-three-container .swiper`,
					styles: {
						"border-top-left-radius":
							advancedBorderRadius.device?.[deviceType].top + advancedBorderRadius.unit?.[deviceType],
						"border-top-right-radius":
							advancedBorderRadius.device?.[deviceType].right + advancedBorderRadius.unit?.[deviceType],
						transition: "all 0.3s ease-in-out",
					},
				},
				{
					class: `#${uniqueId}:hover .sp-smart-post-carousel-two .swiper, #${uniqueId}:hover .sp-smart-post-slider .swiper, #${uniqueId}:hover .sp-smart-post-timeline-three-container .swiper`,
					styles: {
						"border-top-left-radius":
							advancedBorderRadiusHover.device?.[deviceType].top +
							advancedBorderRadiusHover.unit?.[deviceType],
						"border-top-right-radius":
							advancedBorderRadiusHover.device?.[deviceType].right +
							advancedBorderRadiusHover.unit?.[deviceType],
					},
				},

				//............................carousel-two

				{
					class: `#${uniqueId} .sp-smart-post-thumbnail-thumb .swiper`,
					styles: {
						"border-bottom-left-radius":
							advancedBorderRadius.device?.[deviceType].bottom + advancedBorderRadius.unit?.[deviceType],
						"border-bottom-right-radius":
							advancedBorderRadius.device?.[deviceType].left + advancedBorderRadius.unit?.[deviceType],
					},
				},
				{
					class: `#${uniqueId} div:not(.sp-smart-post-slider) .swiper`,
					styles: {
						padding: `${
							(postCardBoxShadowEnable
								? "0 " +
									maxValueFromObject(postCardBoxShadow.device?.[deviceType]) +
									"px " +
									maxValueFromObject(postCardBoxShadow.device?.[deviceType]) +
									"px"
								: "") ||
							(postCardHoverBoxShadowEnable
								? "0 " +
									maxValueFromObject(postCardHoverBoxShadow.device?.[deviceType]) +
									"px " +
									maxValueFromObject(postCardHoverBoxShadow.device?.[deviceType]) +
									"px"
								: "")
						}`,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-post-slider .swiper .sp-smart-post-template-one-content`,
					styles: {
						margin: `${
							contentAreaEnableBoxShadow
								? maxValueFromObject(contentAreaBoxShadow.device?.[deviceType]) + "px"
								: ""
						}`,
					},
				},
			];
		}

		// Image gallery navigation icon size.
		const imageGalleryNavIconSize = showImageGallery
			? [
					{
						class: `#${uniqueId} .sp-slider-wrapper svg`,
						styles: {
							height: rangerCss(imageGalleryNavArrowSize, deviceType),
							width: rangerCss(imageGalleryNavArrowSize, deviceType),
						},
					},
				]
			: [];

		allResponsiveCss = [...allResponsiveCss, ...imageGalleryNavIconSize, ...titleEffects];

		return allResponsiveCss;
	};

	const responsive = (deviceType) => {
		return {
			// Title responsive css.
			...titleResponsiveCss(deviceType),

			// Excerpt responsive css.
			...excerptResponsiveCss(deviceType),

			// Meta data responsive css.
			...metaResponsiveCss(deviceType),

			// Taxonomy responsive Css
			...taxonomyResponsiveCss(deviceType),

			// Image responsive css.
			...featureImageResponsiveCss(deviceType),

			// Content area responsive css.
			...contentAreaResponsiveCss(deviceType),

			// Container area responsive css.
			...containerResponsiveCss(deviceType),

			// Navigation responsive css.
			...carouselNavBtnResponsiveCss(deviceType),

			// Pagination responsive css.
			...paginationDotsResponsiveCss(deviceType),

			// Read more button responsive css.
			...readMoreButtonResponsiveCss(deviceType),

			// Social share responsive css.
			...socialShareResponsiveCss(deviceType),

			// Load more button responsive css.
			...loadMoreButtonResponsiveCss(deviceType),

			// Popup responsive css.
			...responsivePopupCss(deviceType),
		};
	};

	const dynamicCss = () => {
		return [
			...titleCss(),
			// ...badgesCss(),
			...excerptCss(),
			...metaCss(),
			...taxonomyCss(),
			...featureImageCss(),
			...contentAreaCss(),
			...containerCss(),
			...carouselNavBtnCss(),
			...paginationDotsCss(),
			...readMoreButtonCss(),
			...socialShareCss(),
			...loadMoreButtonCss(),
			...popupCss(),
		];
	};

	const customOverlayCss =
		"custom" === imageOverlayColor
			? [
					{
						class: `#${uniqueId} .sp-smart-post-card.template-one .sp-smart-post-template-one-content.overlay-custom`,
						styles: {
							background: colorControls(
								imageOverlayCustomColor.color.style,
								imageOverlayCustomColor.color.solidColor,
								imageOverlayCustomColor.color.gradient
							),
							transition: "background 0.3s ease-in-out",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card.template-one .sp-smart-post-template-one-content.overlay-custom:hover`,
						styles: {
							background: colorControls(
								imageOverlayCustomColor.hover.style,
								imageOverlayCustomColor.hover.solidColor,
								imageOverlayCustomColor.hover.gradient
							),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card.template-one .sp-smart-post-card-image .image-overlay.overlay-custom`,
						styles: {
							background: colorControls(
								imageOverlayCustomColor.color.style,
								imageOverlayCustomColor.color.solidColor,
								imageOverlayCustomColor.color.gradient
							),
							transition: "all 0.3s ease-in-out",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card.template-one .sp-smart-post-card-image:hover .image-overlay.overlay-custom`,
						styles: {
							background: colorControls(
								imageOverlayCustomColor.hover.style,
								imageOverlayCustomColor.hover.solidColor,
								imageOverlayCustomColor.hover.gradient
							),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card .image-overlay.overlay-custom`,
						styles: {
							background: colorControls(
								imageOverlayCustomColor.color.style,
								imageOverlayCustomColor.color.solidColor,
								imageOverlayCustomColor.color.gradient
							),
							transition: "all 0.3s ease-in-out",
						},
					},
					{
						class: `#${uniqueId} .sp-smart-post-card:hover .image-overlay.overlay-custom`,
						styles: {
							background: colorControls(
								imageOverlayCustomColor.hover.style,
								imageOverlayCustomColor.hover.solidColor,
								imageOverlayCustomColor.hover.gradient
							),
						},
					},
				]
			: [];

	const imageGalleryNavStyles = showImageGallery
		? [
				{
					class: `#${uniqueId} .sp-smart-image-gallery-nav-arrow .sp-prev, #${uniqueId} .sp-smart-image-gallery-nav-arrow .sp-next`,
					styles: {
						color: imageGalleryNavArrowColor.color,
						background: imageGalleryNavArrowBgColor.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-image-gallery-nav-arrow .sp-prev:hover, #${uniqueId} .sp-smart-image-gallery-nav-arrow .sp-next:hover`,
					styles: {
						color: imageGalleryNavArrowColor.hoverColor,
						background: imageGalleryNavArrowBgColor.hoverColor,
					},
				},
			]
		: [];

	let sharedDesktopCss = [
		...responsiveCss("Desktop"),
		...dynamicCss()?.map((css) => ({
			...css,
			styles: { ...css.styles, ...responsive("Desktop")[css.class] },
		})),

		...imageGalleryNavStyles,
		...customOverlayCss,
		{
			class: `#${uniqueId}`,
			styles: {
				background: colorControls(
					advancedBg.color.style,
					advancedBg.color.solidColor,
					advancedBg.color.gradient
				),
				transition: "all 0.3s ease-in-out",
			},
		},
		{
			class: `#${uniqueId}:hover`,
			styles: {
				background: colorControls(
					advancedBg.hover.style,
					advancedBg.hover.solidColor,
					advancedBg.hover.gradient
				),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-show-equal-height .sp-smart-post-template-one-content, #${uniqueId} .sp-smart-post-show-equal-height .sp-smart-post-card-content, #${uniqueId} .sp-smart-post-show-equal-height .sp-smart-post-card`,
			styles: {
				height: `${imagePosition === "top" ? "50%" : "100%"}`,
			},
		},
	];

	// Timeline connector css
	if (blockName && ["post-timeline-one", "post-timeline-two", "post-timeline-three"].includes(blockName)) {
		sharedDesktopCss = [
			...sharedDesktopCss,
			{
				class: `#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container::before, #${uniqueId} .post-timeline-two .sp-smart-post-timeline-container::before`,
				styles: {
					"background-color": `${timelineConnectorColor.color}`,
				},
			},
			{
				class: `#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container::after, #${uniqueId} .post-timeline-two .sp-smart-post-timeline-container::after, #${uniqueId} .post-timeline-three .sp-smart-post-timeline-three-container .sp-smart-post-timeline-border`,
				styles: {
					"background-color": `${timelineConnectorColor.active}`,
				},
			},
			// Timeline bubble speech ( indicator )
			{
				class: `
				#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(odd) .sp-smart-indicator-arrow,
				#${uniqueId} .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(odd) .sp-smart-indicator-arrow
				`,
				styles: {
					border: `medium solid ${timelineIndicatorColor.color}`,
					"border-color": `${
						timelineLayout !== "timeline-one-layout-six"
							? "transparent transparent transparent " + timelineIndicatorColor.color
							: "transparent " + timelineIndicatorColor.color + " transparent transparent"
					}`,
					"border-width": `${
						timelineLayout !== "timeline-one-layout-six" ? "15px 0 15px 15px" : "15px 15px 15px 0"
					}`,
				},
			},
			{
				class: `#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even) .sp-smart-indicator-arrow,
				#${uniqueId} .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even) .sp-smart-indicator-arrow`,
				styles: {
					border: `medium solid ${timelineIndicatorColor.color}`,
					"border-color": `${
						timelineLayout !== "timeline-one-layout-five"
							? "transparent " + timelineIndicatorColor.color + " transparent transparent"
							: "transparent transparent transparent " + timelineIndicatorColor.color
					} `,
					"border-width": `${
						timelineLayout !== "timeline-one-layout-five" ? "15px 15px 15px 0" : "15px 0 15px 15px"
					}`,
				},
			},
			// Timeline connector circle
			{
				class: `
				#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container .sp-smart-indicator-circle,
				#${uniqueId} .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container .sp-smart-indicator-circle`,
				styles: {
					"background-color": `${timelineCircleBgColor.color}`,
					"border-width": spacingGenerate(timelineConnectorBorderWidth, "Desktop"),
					"border-style": `${timelineConnectorBorder.style}`,
					"border-color": `${timelineConnectorBorder.color}`,
					"border-radius": spacingGenerate(timelineConnectorBorderRadius, "Desktop"),
				},
			},
			{
				class: `#${uniqueId} .post-timeline-three .sp-smart-post-timeline-three-container.timeline-three-layout-one .sp-smart-post-timeline-three-post-container::before`,
				styles: {
					border: `medium solid ${timelineIndicatorColor.color}`,
					"border-color": `transparent transparent ${timelineIndicatorColor.color} transparent`,
					"border-width": "0 15px 15px 15px",
				},
			},
			{
				class: `#${uniqueId} .post-timeline-three .sp-smart-post-timeline-three-container.timeline-three-layout-two .sp-smart-post-timeline-three-post-container:nth-of-type(odd)::before`,
				styles: {
					border: `medium solid ${timelineIndicatorColor.color}`,
					"border-color": `transparent transparent ${timelineIndicatorColor.color} transparent`,
					"border-width": "0 15px 15px 15px",
				},
			},
			{
				class: `#${uniqueId} .post-timeline-three.timeline-three-layout-two .sp-smart-post-timeline-three-post-container:nth-of-type(even)::before`,
				styles: {
					border: `medium solid ${timelineIndicatorColor.color}`,
					"border-color": `transparent transparent ${timelineIndicatorColor.color} transparent`,
					"border-width": "0 15px 15px 15px",
				},
			},
			{
				class: `#${uniqueId} .post-timeline-three .sp-smart-post-timeline-three-container .sp-smart-post-timeline-three-post-container::after `,
				styles: {
					"background-color": `${timelineCircleBgColor.color}`,
					"border-width": spacingGenerate(timelineConnectorBorderWidth, "Desktop"),
					"border-style": `${timelineConnectorBorder.style}`,
					"border-color": `${timelineConnectorBorder.color}`,
					"border-radius": spacingGenerate(timelineConnectorBorderRadius, "Desktop"),
				},
			},
			{
				class: `#${uniqueId}.sp-smart-post-timeline-one`,
				styles: {
					"padding-left": `0`,
					"padding-right": `0`,
				},
			},
		];
	}

	let sharedTabletCss = [
		...responsiveCss("Tablet"),
		...dynamicCss()?.map((css) => ({
			...css,
			styles: { ...responsive("Tablet")[css.class] },
		})),
	];

	let sharedMobileCss = [
		...responsiveCss("Mobile"),
		...dynamicCss()?.map((css) => ({
			...css,
			styles: { ...responsive("Mobile")[css.class] },
		})),
	];

	if (blockName && ["post-timeline-one", "post-timeline-two", "post-timeline-three"].includes(blockName)) {
		sharedMobileCss = [
			...sharedMobileCss,
			// Timeline bubble speech ( indicator )
			{
				class: `#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even)::before, #${uniqueId} .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even)::before`,
				styles: {
					border: `medium solid ${timelineIndicatorColor.color}`,
					"border-color": `${
						timelineLayout !== "timeline-one-layout-six"
							? "transparent transparent transparent " + timelineIndicatorColor.color
							: "transparent " + timelineIndicatorColor.color + " transparent transparent"
					}`,
					"border-width": `${
						timelineLayout !== "timeline-one-layout-six" ? "15px 0 15px 15px" : "15px 15px 15px 0"
					}`,
				},
			},
		];
	}

	// Show/hide on device sizes
	sharedDesktopCss = showHide(sharedDesktopCss, uniqueId, hideOnDesktop, "");
	// sharedTabletCss = showHide(sharedTabletCss, uniqueId, hideOnTablet, "flex");
	// sharedMobileCss = showHide(sharedMobileCss, uniqueId, hideOnMobile, "flex");

	const deviceCss = {
		sharedDesktopCss,
		sharedTabletCss,
		sharedMobileCss,
	};

	return deviceCss;
};

export default sharedDynamicCss;
