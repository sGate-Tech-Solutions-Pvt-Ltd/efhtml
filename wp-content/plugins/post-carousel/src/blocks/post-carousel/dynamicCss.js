import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, rangerCss, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		carouselHeight,
		carouselGap,
		equalHeightEnable,
		carouselColumn,
		carouselPaginationStyle,
		carouselPaginationVertical,
		globalBreakPointData,
	} = attributes;
	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const carouselResponsiveCss = (deviceType) => {
		const allResponsiveCss = [
			equalHeightEnable
				? {}
				: {
						class: `#${uniqueId}.sp-smart-post-carousel .sp-smart-post-card`,
						styles: {
							height: rangerCss(carouselHeight, deviceType),
						},
					},
			"scrollbar" !== carouselPaginationStyle
				? {}
				: {
						class: `#${uniqueId}.sp-smart-post-carousel .swiper`,
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
				class: `#${uniqueId} .sp-smart-post-carousel .swiper-cube .swiper-slide, #${uniqueId} .sp-smart-post-carousel .swiper-fade .swiper-slide, #${uniqueId} .sp-smart-post-carousel .swiper-flip .swiper-slide`,
				styles: {
					gap: carouselGap.device?.[deviceType] + carouselGap.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-carousel .swiper-fade .swiper-slide,
				#${uniqueId} .sp-smart-post-carousel .swiper-cube .swiper-slide,#${uniqueId} .sp-smart-post-carousel .swiper-flip .swiper-slide`,
				styles: {
					"grid-template-columns": `repeat(${carouselColumn.device?.[deviceType]}, 1fr)`,
				},
			},
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-carousel .sp-smart-post-card.template-two`,
			// 	styles: {
			// 		'min-height': carouselHeight.device[ deviceType ]
			// 			? ''
			// 			: '244px',
			// 	},
			// },
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-carousel .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		opacity: '0',
			// 		right: navArrowVisibilityOnHover
			// 			? `${
			// 					carouselArrowHorizontal.device[ deviceType ] < 0
			// 						? carouselArrowHorizontal.device[
			// 								deviceType
			// 						  ] -
			// 						  ( carouselArrowHorizontal.unit[
			// 								deviceType
			// 						  ] === '%'
			// 								? 2
			// 								: 10 ) +
			// 						  carouselArrowHorizontal.unit[ deviceType ]
			// 						: 0
			// 			  }`
			// 			: `${
			// 					carouselArrowHorizontal.device[ deviceType ] < 0
			// 						? carouselArrowHorizontal.device[
			// 								deviceType
			// 						  ] +
			// 						  carouselArrowHorizontal.unit[ deviceType ]
			// 						: 0
			// 			  }`,
			// 		transition: 'all 0.3s ease-in-out',
			// 	},
			// },
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-carousel:hover .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		opacity: '1',
			// 		right: `${
			// 			carouselArrowHorizontal.device[ deviceType ] < 0
			// 				? carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ]
			// 				: 0
			// 		}`,
			// 	},
			// },
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-swiper-nav-arrow .sp-smart-post-swiper-nav-arrow-btn.btn-next`,
			// 	styles: {
			// 		transform:
			// 			carouselArrowSpaceBetween.unit[ deviceType ] === '%'
			// 				? `translateX(calc(-${
			// 						carouselArrowSpaceBetween.device[
			// 							deviceType
			// 						] +
			// 						carouselArrowSpaceBetween.unit[ deviceType ]
			// 				  } - ${
			// 						carouselArrowWidth.device[ deviceType ] +
			// 						carouselArrowWidth.unit[ deviceType ]
			// 				  })) !important`
			// 				: 'none',
			// 	},
			// },
			// {
			// 	class: `body.rtl #${ uniqueId } .sp-smart-post-swiper-nav-arrow .sp-smart-post-swiper-nav-arrow-btn.btn-next`,
			// 	styles: {
			// 		transform:
			// 			carouselArrowSpaceBetween.unit[ deviceType ] === '%'
			// 				? `translateX(calc(${
			// 						carouselArrowSpaceBetween.device[
			// 							deviceType
			// 						] +
			// 						carouselArrowSpaceBetween.unit[ deviceType ]
			// 				  } + ${
			// 						carouselArrowWidth.device[ deviceType ] +
			// 						carouselArrowWidth.unit[ deviceType ]
			// 				  })) !important`
			// 				: 'none',
			// 	},
			// },
		];

		return allResponsiveCss;
	};

	const desktopCss = [
		...sharedDesktopCss,
		...carouselResponsiveCss("Desktop"),
		// {
		// 	class: `#${ uniqueId } .sp-smart-post-carousel .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
		// 	styles: {
		// 		'padding-bottom': '10px',
		// 	},
		// },
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...sharedTabletCss,
			...carouselResponsiveCss("Tablet"),
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-carousel .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
			// 	styles: {
			// 		'padding-bottom': '10px',
			// 	},
			// },
		];

		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...sharedMobileCss,
			...carouselResponsiveCss("Mobile"),
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-carousel .sp-swiper-slide .swiper-wrapper .sp-slide-item`,
			// 	styles: {
			// 		'padding-bottom': '10px',
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-carousel .sp-smart-post-pagination-dots.swiper-pagination-vertical`,
				styles: {
					"flex-direction": "column",
					transform: "translateX(0px)",
					top: "50%",
					// transform: "translateY(-50%)",
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
