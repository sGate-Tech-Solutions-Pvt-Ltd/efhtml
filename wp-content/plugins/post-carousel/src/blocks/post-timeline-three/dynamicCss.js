import { swiperPaddingForBoxShadow } from "../../controls/controls";
import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gapBetweenPosts,
		equalHeightEnable,
		postCardBoxShadowEnable,
		postCardBoxShadow,
		postCardHoverBoxShadowEnable,
		postCardHoverBoxShadow,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const responsiveCss = (deviceType) => {
		return [
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		right: `${
			// 			carouselArrowHorizontal.device[ deviceType ] < 3
			// 				? carouselArrowHorizontal.device[ deviceType ] +
			// 				  carouselArrowHorizontal.unit[ deviceType ]
			// 				: 0
			// 		} !important`,
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
			// {
			// 	class: `#${ uniqueId } .swiper .sp-smart-post-card`,
			// 	styles: {
			// 		margin: `${
			// 			( postCardBoxShadowEnable  || postCardHoverBoxShadowEnable ? '5px' : '' )
			// 		}`,
			// 	},
			// },
			{
				class: `#${uniqueId} .rfm-marquee .rfm-child`,
				styles: {
					"margin-right": gapBetweenPosts.device?.[deviceType]
						? gapBetweenPosts.device?.[deviceType] + gapBetweenPosts.unit?.[deviceType]
						: "",
				},
			},
			{
				class: `#${uniqueId} .timeline-three-layout-two .sp-smart-post-timeline-three-post-container:nth-child(even) .sp-smart-post-card`,
				styles: {
					"margin-bottom": "0 !important",
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-timeline-one-post-container .sp-smart-post-card`,
			styles: {
				height: equalHeightEnable ? "100%" : "auto",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-timeline-three-container`,
			styles: {
				gap: gapBetweenPosts.device.Desktop + gapBetweenPosts.unit.Desktop,
			},
		},
		// {
		// 	class: `#${ uniqueId } .post-timeline-three.timeline-three-layout-one .sp-smart-post-swiper-nav-arrow.sp-vertical-none`,
		// 	styles: {
		// 		top: '2%',
		// 	},
		// },
		// {
		// 	class: `#${ uniqueId } .post-timeline-three.timeline-three-layout-two .sp-smart-post-swiper-nav-arrow.sp-vertical-none`,
		// 	styles: {
		// 		top: '51.55%',
		// 	},
		// },
		{
			class: `#${uniqueId} .sp-smart-post-show-equal-height .post-timeline-three.timeline-three-layout-two .sp-smart-post-card-content`,
			styles: {
				height: "100%",
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...sharedTabletCss,
			...responsiveCss("Tablet"),
			{
				class: `#${uniqueId} .sp-smart-post-timeline-three-container .swiper`,
				styles: {
					padding: `${swiperPaddingForBoxShadow(
						postCardBoxShadowEnable,
						postCardBoxShadow.device?.Tablet,
						postCardHoverBoxShadowEnable,
						postCardHoverBoxShadow.device?.Tablet
					)} !important`,
				},
			},
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile styles
		const mobileCss = [
			...sharedMobileCss,
			...responsiveCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-timeline-three-container .swiper`,
				styles: {
					padding: `${swiperPaddingForBoxShadow(
						postCardBoxShadowEnable,
						postCardBoxShadow.device?.Mobile,
						postCardHoverBoxShadowEnable,
						postCardHoverBoxShadow.device?.Mobile
					)} !important`,
				},
			},
			// {
			// 	class: `#${ uniqueId } .sp-smart-post-swiper-nav-arrow`,
			// 	styles: {
			// 		'column-gap': `${
			// 			carouselArrowSpaceBetween.device.Mobile +
			// 			carouselArrowSpaceBetween.unit.Mobile
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
