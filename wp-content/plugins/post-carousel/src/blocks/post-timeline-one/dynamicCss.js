import sharedDynamicCss from "../shared/dynamicCss";
import { convertToClassName, objectToCssString, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gapBetweenPosts,
		equalHeightEnable,
		timelineIndicatorColor,
		timelineCircleBgColor,
		timelineConnectorBorder,
		timelineLayout,
		advancedPadding,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId}:has(.post-timeline-one)`,
				styles: {
					"padding-left": advancedPadding.device?.[deviceType].left
						? advancedPadding.device?.[deviceType].left + advancedPadding.unit?.[deviceType] + " !important"
						: "",
					"padding-right": advancedPadding.device?.[deviceType].right
						? advancedPadding.device?.[deviceType].right +
							advancedPadding.unit?.[deviceType] +
							" !important"
						: "",
				},
			},
		];
	};

	const timelineCss = [
		{
			class: `#${uniqueId} .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container .sp-smart-indicator-circle.active`,
			styles: {
				"Background-color": `${timelineCircleBgColor.active} !important`,
				"border-color": `${timelineConnectorBorder.activeColor} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container .sp-smart-indicator-arrow.active`,
			styles: {
				"border-left-color": `${timelineIndicatorColor.active} !important`,
				"border-right-color": `${timelineIndicatorColor.active} !important`,
			},
		},
		{
			class: `
			#${uniqueId} .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:first-child .sp-smart-indicator-circle`,
			styles: {
				"Background-color": `${timelineCircleBgColor.active} !important`,
				"border-color": `${timelineConnectorBorder.activeColor} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:first-child .sp-smart-indicator-arrow`,
			styles: {
				"border-left-color": `${timelineIndicatorColor.active} !important`,
				"border-right-color": `${timelineIndicatorColor.active} !important`,
			},
		},
	];

	const desktopCss = [
		...sharedDesktopCss,
		...timelineCss,
		...responsiveCss("Desktop"),
		{
			class: `.sp-gap-${convertToClassName(gapBetweenPosts.device.Desktop + gapBetweenPosts.unit.Desktop)}`,
			property: "row-gap",
			value: gapBetweenPosts.device.Desktop + gapBetweenPosts.unit.Desktop,
		},
		{
			class: `#${uniqueId} .sp-smart-post-timeline-one-post-container .sp-smart-post-card`,
			styles: {
				height: equalHeightEnable ? "100%" : "auto",
			},
		},
		{
			class: `#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container`,
			styles: {
				"row-gap": gapBetweenPosts.device.Desktop + gapBetweenPosts.unit.Desktop,
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [...sharedTabletCss, ...timelineCss, ...responsiveCss("Tablet")];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...sharedMobileCss,
			...timelineCss,
			...responsiveCss("Mobile"),
			// Timeline bubble speech ( indicator )
			{
				class: `#${uniqueId} .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(odd) .sp-smart-indicator-arrow, #${uniqueId} .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(odd) .sp-smart-indicator-arrow, #${uniqueId} .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even) .sp-smart-indicator-arrow, #${uniqueId} .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even) .sp-smart-indicator-arrow`,
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
			// {
			// 	class: `#${ uniqueId } .post-timeline-one .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even) .sp-smart-indicator-arrow, #${ uniqueId } .post-timeline-two .sp-smart-post-timeline-container .sp-smart-post-timeline-one-post-container:nth-of-type(even) .sp-smart-indicator-arrow`,
			// 	styles: {
			// 		border: `medium solid ${ timelineIndicatorColor.color }`,
			// 		'border-color': `${
			// 			timelineLayout !== 'timeline-one-layout-five'
			// 				? 'transparent ' +
			// 				  timelineIndicatorColor.color +
			// 				  ' transparent transparent'
			// 				: 'transparent transparent transparent ' +
			// 				  timelineIndicatorColor.color
			// 		} `,
			// 		'border-width': `${
			// 			timelineLayout !== 'timeline-one-layout-five'
			// 				? '15px 15px 15px 0'
			// 				: '15px 0 15px 15px'
			// 		}`,
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
