import sharedDynamicCss from "../shared/dynamicCss";
import { bgColor, objectToCssString, rangerCss, wrapInMediaQuery } from "../shared/helpFn";
const dynamicCss = (attributes, page, setAttributes) => {
	const {
		uniqueId,
		carouselHeight,
		carouselGap,
		equalHeightEnable,
		carouselColumn,
		carouselPaginationStyle,
		carouselPaginationVertical,
		contentHoverAnimate,
		titleOnHover,
		contentOnHover,
		taxonomyOnHover,
		metaOnHover,
		readMoreOnHover,
		excerptOnHover,
		socialShareOnHover,
		imageOverlayCustomColor,
	} = attributes;

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

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page, setAttributes);

	const commonHiddenStyles = {
		"max-height": 0,
		overflow: "hidden",

		transition: "opacity 1s ease-out, all 1s ease, max-height 1s ease-out, margin 1s;",
	};

	const carouselResponsiveCss = (deviceType) => {
		const allResponsiveCss = [
			equalHeightEnable
				? {}
				: {
						class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card`,
						styles: {
							height: rangerCss(carouselHeight, deviceType),
						},
					},
			"scrollbar" !== carouselPaginationStyle
				? {}
				: {
						class: `#${uniqueId} .sp-smart-post-carousel-two .swiper`,
						styles: {
							"padding-bottom":
								Math.abs(carouselPaginationVertical.device?.[deviceType]) +
								carouselPaginationVertical.unit?.[deviceType],
						},
					},

			{
				class: `#${uniqueId} .rfm-marquee .rfm-child`,
				styles: {
					"margin-right": carouselGap.device?.[deviceType] + carouselGap.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .swiper-cube .swiper-slide, #${uniqueId} .sp-smart-post-carousel-two .swiper-fade .swiper-slide, #${uniqueId} .sp-smart-post-carousel-two .swiper-flip .swiper-slide`,
				styles: {
					gap: carouselGap.device?.[deviceType] + carouselGap.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .swiper-fade .swiper-slide,
				#${uniqueId} .sp-smart-post-carousel-two .swiper-cube .swiper-slide,#${uniqueId} .sp-smart-post-carousel-two .swiper-flip .swiper-slide`,
				styles: {
					"grid-template-columns": `repeat(${carouselColumn.device?.[deviceType]}, 1fr)`,
				},
			},
			// on hover content..............
			{
				class: `#${uniqueId} .sp-smart-post-carousel-two  .sp-smart-post-card-content`,
				styles: {
					opacity: contentOnHover ? 0 : 1,
					transform: contentOnHover
						? animationTransforms[contentHoverAnimate] || "translateY(0)"
						: "translateY(0)",
					// transition: "opacity 0.3s ease, transform 0.3s ease, background 0.3s ease",
					transition: "all 0.3s ease",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-template-one-content  .sp-smart-post-title`,
				styles: {
					...commonHiddenStyles,
					opacity: titleOnHover && !contentOnHover ? 0 : 1,
					"max-height": titleOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-card .sp-smart-post-category`,
				styles: {
					...commonHiddenStyles,
					opacity: taxonomyOnHover && !contentOnHover ? 0 : 1,
					"max-height": taxonomyOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-template-one-content .sp-meta-data`,
				styles: {
					...commonHiddenStyles,
					opacity: metaOnHover && !contentOnHover ? 0 : 1,
					"max-height": metaOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-template-one-content  .sp-smart-post-read-more-button`,
				styles: {
					...commonHiddenStyles,
					opacity: readMoreOnHover && !contentOnHover ? 0 : 1,
					"max-height": readMoreOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-template-one-content  .sp-smart-post-excerpt-wrapper`,
				styles: {
					...commonHiddenStyles,
					opacity: excerptOnHover && !contentOnHover ? 0 : 1,
					"max-height": excerptOnHover && !contentOnHover ? "0" : "auto",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-template-one-content  .sp-smart-post-social-share`,
				styles: {
					...commonHiddenStyles,
					opacity: socialShareOnHover && !contentOnHover ? 0 : 1,
					"max-height": socialShareOnHover && !contentOnHover ? "0" : "auto",
				},
			},
		];

		return allResponsiveCss;
	};

	const desktopCss = [
		...sharedDesktopCss,
		...carouselResponsiveCss("Desktop"),
		{
			class: `#${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientation-three .sp-smart-post-card-content, #${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientations-four .sp-smart-post-card-content`,
			styles: {
				background: `${bgColor( imageOverlayCustomColor )} !important`,
			},
		},
		// {
		// 	class: `#${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientation-three:hover .sp-smart-post-card-content, #${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientations-four:hover .sp-smart-post-card-content`,
		// 	styles: {
		// 		background: `${bgColor( imageOverlayCustomColor, "hover" )} !important`,
		// 	},
		// },
	];

	if ( imageOverlayCustomColor.hover.style === "bgColor" ) {
		desktopCss.push(...[
			{
				class: `#${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientation-three:hover .sp-smart-post-card-content, #${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientations-four:hover .sp-smart-post-card-content`,
				styles: {
					background: `${bgColor( imageOverlayCustomColor, "hover" )} !important`,
				},
			},
		])
	}
	if ( imageOverlayCustomColor.hover.style !== "bgColor" ) {
		desktopCss.push(...[
			{
				class: `#${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientation-three:hover .sp-smart-post-card-content:after, #${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientations-four:hover .sp-smart-post-card-content:after, #${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientation-three .sp-smart-post-card-content:after, #${uniqueId}.sp-smart-post-carousel-two .sp-smart-post-card.overlay-type-orientations-four .sp-smart-post-card-content:after`,
				styles: {
					background: `${bgColor( imageOverlayCustomColor, "hover" )} !important`,
				},
			},
		])
	}

	const tabletCss = [
		...sharedTabletCss,
		...carouselResponsiveCss("Tablet"),
		// {
		// 	class: `#${uniqueId} .sp-smart-post-carousel-two .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
		// 	styles: {
		// 		"padding-bottom": "10px",
		// 	},
		// },
	];

	const mobileCss = [
		...sharedMobileCss,
		...carouselResponsiveCss("Mobile"),
		// {
		// 	class: `#${uniqueId} .sp-smart-post-carousel-two .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
		// 	styles: {
		// 		"padding-bottom": "10px",
		// 	},
		// },
		{
			class: `#${uniqueId} .sp-smart-post-carousel-two .sp-smart-post-pagination-dots.swiper-pagination-vertical`,
			styles: {
				"flex-direction": "column",
				transform: "translateX(0px)",
				top: "50%",
				transform: "translateY(-50%)",
			},
		},
	];

	const tabletMediaQueryCss = wrapInMediaQuery(objectToCssString(tabletCss), "only screen and (max-width: 1023px)");
	const mobileMediaQueryCss = wrapInMediaQuery(objectToCssString(mobileCss), "only screen and (max-width: 599px)");

	const frontendCss = {
		id: uniqueId,
		desktopCss,
		tabletCss,
		mobileCss,
	};

	return `${objectToCssString(desktopCss)} ${tabletMediaQueryCss} ${mobileMediaQueryCss}`;
};

export default dynamicCss;
