import { backgroundStyle, gradientHoverStyle } from "../../controls/controls";
import { colorControls, objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		socialSingleIcon,
		socialSingleColor,
		socialSingleBG,
		socialSingleBorder,
		socialSingleBorderWidth,
		socialSingleBorderRadius,
		socialSingleBorderHover,
		socialSingleBorderWidthHover,
		socialSingleBorderRadiusHover,
		socialSingleLabelColor,
		socialSingleSubTextColor,
		socialSingleAreaBG,
		socialSingleAreaBorder,
		socialSingleAreaBorderWidth,
		socialSingleAreaBorderRadius,
		socialSingleAreaBorderHover,
		socialSingleAreaBorderWidthHover,
		socialSingleAreaBorderRadiusHover,
		socialSinglePadding,
		socialSingleMargin,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		globalBreakPointData,
	} = attributes;

	const responsiveCss = (deviceType) => {
		return [];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId}.sp-social-profile-item-container .sp-social-profile-item-wrapper`,
			styles: {
				background: colorControls(
					socialSingleAreaBG?.color?.style,
					socialSingleAreaBG?.color?.solidColor,
					socialSingleAreaBG?.color?.gradient
				),
				"border-style": socialSingleAreaBorder.style,
				"border-color": socialSingleAreaBorder.color,
				"border-width": spacingGenerate(socialSingleAreaBorderWidth, "Desktop"),
				"border-radius": spacingGenerate(socialSingleAreaBorderRadius, "Desktop"),
				padding: spacingGenerate(socialSinglePadding, "Desktop"),
				margin: spacingGenerate(socialSingleMargin, "Desktop"),
			},
		},
		{
			class: `#${uniqueId}.sp-social-profile-item-container:hover .sp-social-profile-item-wrapper`,
			styles: {
				background: colorControls(
					socialSingleAreaBG?.hover?.style,
					socialSingleAreaBG?.hover?.solidColor,
					socialSingleAreaBG?.hover?.gradient
				),
				"border-style": socialSingleAreaBorderHover.style,
				"border-color": socialSingleAreaBorderHover.color,
				"border-width": spacingGenerate(socialSingleAreaBorderWidthHover, "Desktop"),
				"border-radius": spacingGenerate(socialSingleAreaBorderRadiusHover, "Desktop"),
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-icon .sp-social-profile-item-icon-class`,
			styles: {
				color: socialSingleColor.color,
				transition: "color 0.3s ease-in-out",
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-icon .sp-social-profile-item-icon-class:hover`,
			styles: {
				color: socialSingleColor.hoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-icon-wrapper`,
			styles: {
				background: colorControls(
					socialSingleBG?.color?.style,
					socialSingleBG?.color?.solidColor,
					socialSingleBG?.color?.gradient
				),
				"border-style": socialSingleBorder.style,
				"border-color": socialSingleBorder.color,
				"border-width": spacingGenerate(socialSingleBorderWidth, "Desktop"),
				"border-radius": spacingGenerate(socialSingleBorderRadius, "Desktop"),
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-icon-wrapper:hover`,
			styles: {
				background: colorControls(
					socialSingleBG?.hover?.style,
					socialSingleBG?.hover?.solidColor,
					socialSingleBG?.hover?.gradient
				),
				"border-style": socialSingleBorderHover.style,
				"border-color": socialSingleBorderHover.color,
				"border-width": spacingGenerate(socialSingleBorderWidthHover, "Desktop"),
				"border-radius": spacingGenerate(socialSingleBorderRadiusHover, "Desktop"),
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-label`,
			styles: {
				color: socialSingleLabelColor.color,
			},
		},
		{
			class: `#${uniqueId}.sp-social-profile-item-container:hover .sp-social-profile-item-label`,
			styles: {
				color: socialSingleLabelColor.hoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-sub-text`,
			styles: {
				color: socialSingleSubTextColor.color,
			},
		},
		{
			class: `#${uniqueId}.sp-social-profile-item-container:hover .sp-social-profile-item-sub-text`,
			styles: {
				color: socialSingleSubTextColor.hoverColor,
			},
		}
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...responsiveCss("Tablet")
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...responsiveCss("Mobile")
		];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
