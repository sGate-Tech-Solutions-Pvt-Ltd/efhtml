import { boxCss, colorControls, objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		tickerHeight,
		tickerTitleGap,
		contentBg,
		ContentBorder,
		ContentBorderWidth,
		ContentBorderRadius,
		gapBetweenHeadingContent,
		newsTickerShadowEnable,
		newsTickerBoxShadow,
		headingStyle,
		HeadingPosition,
		displayStyle,
		tickerHeadingBg,
		headingColor,
		headingTypography,
		headingFontSize,
		headingLatterSpacing,
		headingLineHeight,
		tickerTitleTypography,
		tickerTitleFontSize,
		tickerTitleLatterSpacing,
		tickerTitleLineHeight,
		tickerIconPosition,
		tickertitleColor,
		tickerDateStyle,
		tickerDateColor,
		tickerDateTypography,
		tickerDateLineHeight,
		tickerDateLatterSpacing,
		tickerDateFontSize,
		tickerDateBgColor,
		tickerImageHeight,
		tickerImageWidth,
		tickerImgSize,
		tickerImgShape,
		tickerDisplaySticky,
		tickerStickyTopPosition,
		newsTickerArrowBgColor,
		newsTickerCarouselArrowColor,
		newsTickerCarouselArrowBorderRadius,
		newsTickerCarouselArrowBorder,
		newsTickerCarouselArrowWidth,
		tickerNavigation,
		newsCarouselArrowSpaceBetween,
		carouselAnimationEffect,
		tickerTitleWordSpacing,
		tickerDateWordSpacing,
		headingWordSpacing,
		newsTickerIconSize,
		newsTickerHeadingPadding,
		titleListStyleIconSize,
		titleListStyleIconGap,
		newsTickerImageRadius,
		newsTickerCarouselDividerColor,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		carouselArrowHeight,
		carouselArrowSize,
		globalBreakPointData,
	} = attributes;

	const rangerCss = (attr, device = "Desktop") => {
		const unit = attr?.unit?.[device] || "";

		return `${attr?.device?.[device] ?? ""}${unit}`;
	};

	const typographyCss = (attr) => {
		return {
			"font-family": attr.typography.family,
			"font-weight": attr.typography.fontWeight,
			"font-style": attr.typography.style,
			"text-decoration": attr.typography.decoration,
			"text-transform": attr.typography.transform,
		};
	};

	const carouselResponsiveCss = (deviceType) => {
		const allResponsiveCss = [
			{
				class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i`,
				styles: {
					color: newsTickerCarouselArrowColor.color,
					background: newsTickerArrowBgColor.color,
					"border-color": newsTickerCarouselArrowBorder.color,
					"border-style": newsTickerCarouselArrowBorder.style,
					"border-radius": spacingGenerate(newsTickerCarouselArrowBorderRadius, deviceType),
					width: rangerCss(newsTickerCarouselArrowWidth, deviceType),
					height: rangerCss(carouselArrowHeight, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i svg`,
				styles: {
					width: rangerCss(carouselArrowSize, deviceType),
					height: rangerCss(carouselArrowSize, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn .divider`,
				styles: {
					color: newsTickerCarouselDividerColor,
				},
			},

			// {
			// 	class: `#${uniqueId} .slider-class`,
			// 	styles: {
			// 		// width: tickerNavigation ? '57%' : '75%',
			// 		width: "-webkit-fill-available",
			// 		// "max-width": tickerNavigation ? "calc( 100% - 265px )" : "calc( 100% - 180px )",
			// 		"max-width": tickerNavigation ? "calc( 100% - 265px )" : "calc( 100% - 180px )",
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i:hover`,
				styles: {
					color: newsTickerCarouselArrowColor.hoverColor,
					background: newsTickerArrowBgColor.hoverColor,
					"border-color": newsTickerCarouselArrowBorder.hoverColor,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow`,
				styles: {
					// width: '17%',
					width: "fit-content",
					position: "relative",
					"align-items": "center",
					"justify-content": HeadingPosition === "right" ? "start" : "end",
					"z-index": 2,
					top: "50%",
					gap:
						newsCarouselArrowSpaceBetween.device?.[deviceType] +
						newsCarouselArrowSpaceBetween.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .rfm-marquee .rfm-initial-child-container, #${uniqueId} .rfm-marquee`,
				styles: {
					gap: tickerTitleGap.device?.[deviceType] + tickerTitleGap.unit?.[deviceType],
					display: "flex",
				},
			},

			{
				class: `#${uniqueId}  .sp-marquee-inner`,
				styles: {
					gap: tickerTitleGap.device?.[deviceType] + tickerTitleGap.unit?.[deviceType],
					display: "flex",
				},
			},

			{
				class: `#${uniqueId}`,
				styles: {
					position: tickerDisplaySticky ? "sticky" : "static",
					top: tickerDisplaySticky
						? tickerStickyTopPosition.device?.[deviceType] + tickerStickyTopPosition.unit?.[deviceType]
						: "auto",
					"z-index": 99999,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading`,
				styles: {
					background: colorControls(
						tickerHeadingBg.color.style,
						tickerHeadingBg.color.solidColor,
						tickerHeadingBg.color.gradient
					),
					"margin-right":
						gapBetweenHeadingContent.device?.[deviceType] + gapBetweenHeadingContent.unit?.[deviceType],
					"border-radius":
						// eslint-disable-next-line no-nested-ternary
						headingStyle === "five"
							? HeadingPosition === "right"
								? "0 4px 4px 0" // rounded on right
								: "4px 0 0 4px" // rounded on left
							: "",
					padding: spacingGenerate(newsTickerHeadingPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading.sp-ticker-heading-six-${HeadingPosition} .ticker-heading-content`,
				styles: {
					background: colorControls(
						tickerHeadingBg.color.style,
						tickerHeadingBg.color.solidColor,
						tickerHeadingBg.color.gradient
					),
					padding: spacingGenerate(newsTickerHeadingPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading.sp-ticker-heading-five-left::after, #${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading.sp-ticker-heading-five-right::after`,
				styles: {
					[`border-${HeadingPosition}`]: `12px solid ${tickerHeadingBg.color.solidColor}`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading .ticker-heading-content`,
				styles: {
					"margin-right": HeadingPosition === "left" ? "12px" : "-12px",
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					gap: "3px",
					"flex-direction": tickerIconPosition === "right" ? "row-reverse" : "",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading .ticker-heading-label`,
				styles: {
					color: headingColor.color,

					...typographyCss(headingTypography),
					"font-size": rangerCss(headingFontSize, deviceType),
					"line-height": headingLineHeight.device?.[deviceType],
					"letter-spacing": rangerCss(headingLatterSpacing, deviceType),
					"word-spacing": rangerCss(headingWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .rfm-marquee .rfm-child`,
				styles: {
					display: "flex",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .sp-ticker-img`,
				styles: {
					width: tickerImgSize === "custom" ? rangerCss(tickerImageWidth) : undefined,
					height: tickerImgSize === "custom" ? rangerCss(tickerImageHeight) : undefined,
					margin: "0px 7px",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .sp-ticker-img.sp-img-square`,
				styles: {
					"border-radius": spacingGenerate(newsTickerImageRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-date`,
				styles: {
					color: tickerDateColor,
					"margin-top": tickerDateStyle === "text" ? "5px" : "",
					"margin-left": "5px",
					...typographyCss(tickerDateTypography),
					"font-size": rangerCss(tickerDateFontSize, deviceType),
					"line-height": tickerDateLineHeight.device?.[deviceType] ?? "",
					"letter-spacing": rangerCss(tickerDateLatterSpacing, deviceType),
					"word-spacing": rangerCss(tickerDateWordSpacing, deviceType),
					display: "flex",
					"align-items": "center",
					...(tickerDateStyle === "button" && {
						background: tickerDateBgColor,
						padding: "3px 8px",
						"border-radius": "5px",
					}),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper  .sp-smart-post-ticker-title`,

				styles: {
					color: tickertitleColor.color,
					...typographyCss(tickerTitleTypography),
					"font-size": rangerCss(tickerTitleFontSize, deviceType),
					"line-height": tickerTitleLineHeight.device?.[deviceType] ?? "",
					"letter-spacing": rangerCss(tickerTitleLatterSpacing, deviceType),
					"word-spacing": rangerCss(tickerTitleWordSpacing, deviceType),
					display: "flex",
					"align-items": "center",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper  .sp-smart-post-ticker-title:hover`,

				styles: {
					color: tickertitleColor.hoverColor,
				},
			},

			// {
			// 	class: `#${ uniqueId } .btn-prev i`,

			// 	styles: {
			// 		transform:
			// 			displayStyle === 'slide' &&
			// 			carouselAnimationEffect === 'fade'
			// 				? 'rotate(90deg)'
			// 				: 'none',
			// 	},
			// },

			// {
			// 	class: `#${ uniqueId } .btn-next i`,

			// 	styles: {
			// 		transform:
			// 			displayStyle === 'slide' &&
			// 			carouselAnimationEffect === 'fade'
			// 				? 'rotate(90deg)'
			// 				: 'none',
			// 	},
			// },

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper`,
				styles: {
					display: "flex",
					height: rangerCss(tickerHeight, deviceType),
					// "flex-direction": "row",
					"align-items": "flex-start",
					"justify-content": "stretch",
					overflow: "hidden",
					// gap:
					// 	gapBetweenHeadingContent.device[ deviceType ] !== ''
					// 		? gapBetweenHeadingContent.device[ deviceType ] +
					// 		  gapBetweenHeadingContent.unit[ deviceType ]
					// 		: '0px',
					"border-style": ContentBorder.style,
					"border-color": ContentBorder.color,
					"border-width": spacingGenerate(ContentBorderWidth, deviceType),
					"border-radius": spacingGenerate(ContentBorderRadius, deviceType),
					background: colorControls(
						contentBg.color.style,
						contentBg.color.solidColor,
						contentBg.color.gradient
					),
					"box-shadow": boxCss(newsTickerShadowEnable, deviceType, newsTickerBoxShadow, "color"),
					"flex-direction": HeadingPosition === "right" ? "row-reverse" : "",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .sp-smart-post-card-content`,
				styles: {
					"border-color": ContentBorder.hoverColor,
					"text-align": displayStyle === "typewriter" ? "left" : "center",
					"margin-left": displayStyle === "typewriter" ? "16px" : undefined,
					display: "flex",
					"align-items": "center",

					// width: displayStyle !== 'typewriter' ? '100%' : '75%',
					"justify-content": displayStyle === "typewriter" ? undefined : "center",
					"flex-shrink": "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sps-news-ticker-wrapper .sps-news-ticker-vanilla-slide.sp-slide-fade`,
				styles: {
					width: "100%",
					"justify-content": "space-around",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker:hover .sp-smart-post-swiper`,
				styles: {
					"border-color": ContentBorder.hoverColor,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .sp-smart-post-ticker`,
				styles: {
					display: "flex",
					"align-items": "center",
					gap: "32px",
					// width: '80%',
					"margin-left": HeadingPosition === "left" ? "-26px" : "",
					"margin-right": HeadingPosition === "right" ? "-26px" : "",
					overflow: "hidden",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-ticker-item .ticker-separator`,
				styles: {
					"margin-right": `-${tickerTitleGap.device?.[deviceType] / 2 + tickerTitleGap.unit?.[deviceType]}`,
					"margin-left": `${tickerTitleGap.device?.[deviceType] / 2 + tickerTitleGap.unit?.[deviceType]}`,
					"font-size": tickerTitleFontSize.device?.[deviceType] + tickerTitleFontSize.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .ticker-heading .ticker-heading-content svg`,
				styles: {
					width: rangerCss(newsTickerIconSize, deviceType),
					height: rangerCss(newsTickerIconSize, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-ticker-item .sp-smart-post-ticker-title svg`,
				styles: {
					width: rangerCss(titleListStyleIconSize, deviceType),
					height: rangerCss(titleListStyleIconSize, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-ticker-item .sp-smart-post-ticker-title`,
				styles: {
					"column-gap": rangerCss(titleListStyleIconGap, deviceType),
				},
			},
		];

		return allResponsiveCss;
	};

	const desktopCss = [
		...carouselResponsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn i svg`,
			styles: {
				fill: newsTickerCarouselArrowColor.color,
			},
		},

		{
			class: `#${uniqueId} .slider-class`,
			styles: {
				// width: tickerNavigation ? '57%' : '75%',
				width: "-webkit-fill-available",
				// "max-width": tickerNavigation ? "calc( 100% - 265px )" : "calc( 100% - 180px )",
				"max-width": tickerNavigation ? "calc( 100% - 265px )" : "calc( 100% - 180px )",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-news-ticker .sp-swiper-slide .swiper-wrapper .sp-slide-item, #${uniqueId} .sps-news-ticker-wrapper .sps-news-ticker-vanilla-slide`,
			styles: {
				"align-items": "center",
				display: "flex",
				"justify-content": carouselAnimationEffect === "fade" ? "space-around" : "center",
			},
		}
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...carouselResponsiveCss("Tablet"),
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
				styles: {
					"align-items": "center",
				},
			}
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...carouselResponsiveCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
				styles: {
					"align-items": "center",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-swiper-slide .swiper-wrapper .sp-slide-item, #${uniqueId} .sps-news-ticker-wrapper .sps-news-ticker-vanilla-slide`,
				styles: {
					"align-items": "center",
					display: "flex",
					"justify-content": carouselAnimationEffect === "fade" ? "space-around" : "start",
				},
			},

			{
				class: `#${uniqueId} .slider-class`,
				styles: {
					width: "-webkit-fill-available",
					"max-width": "calc( 100% - 92px )",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-ticker-title`,
				styles: {
					display: "block !important",
					width: "-webkit-fill-available",
					"max-width": "calc(100% - 2%)",
					"white-space": "nowrap",
					overflow: "hidden",
					"text-overflow": "ellipsis",
				},
			},

			{
				class: `#${uniqueId} .slider-class`,
				styles: {
					width: "78%",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-pagination-dots.swiper-pagination-vertical`,
				styles: {
					"flex-direction": "column",
					transform: "translateX(0px)",
					top: "50%",
					// eslint-disable-next-line no-dupe-keys
					transform: "translateY(-50%)",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .sp-smart-post-card-content`,
				styles: {
					"justify-content":
						// eslint-disable-next-line no-nested-ternary
						displayStyle === "typewriter" ? undefined : HeadingPosition === "left" ? "start" : "flex-start",
					// "margin-left": "8px",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-news-ticker .sp-smart-post-swiper .ticker-heading .ticker-heading-label`,
				styles: {
					display: "none",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-swiper-nav-arrow`,
				styles: {
					display: "none",
				},
			}
		];
		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
