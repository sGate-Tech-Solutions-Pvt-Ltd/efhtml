import { typographyCss } from "../../controls/controls";
import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		verticalGap,
		enableSeparator,
		separatorStyle,
		separatorHeight,
		separatorColor,
		spaceBetweenListItems,
		contentVerticalPosition,
		largeItemHeight,
		largeItemTitleFontSize,
		largeItemTitleLineHeight,
		largeItemTitleColor,
		largeMetaColors,
		excerptColor,
		largeExcerptColor,
		showHideDivider,
		dividerBg,
		dividerWidth,
		dividerHeight,
		dividerBorderStyle,
		dividerAlignment,
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		postCardHoverBorderWidth,
		postCardHoverBorderRadius,
		imageOverlayCustomColor,
		largeItemPadding,
		readMoreTextColor,
		largeItemTitleLatterSpacing,
		largeItemTitleWordSpacing,
		largeItemTitleTypography,
		globalBreakPointData,
	} = attributes;

	const responsiveCss = (attr, device) => {
		const unit = attr?.unit ? attr?.unit?.[device] : "";
		return `${attr?.device?.[device]}${unit}`;
	};

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const BgColor = (attr, colorType = "color") => {
		const bgStyle = "bgColor" === attr[colorType]?.style ? "solidColor" : attr[colorType]?.style;
		return `${attr[colorType][bgStyle]}`;
	};

	const getSeparatorStyles = (device) => {
		if (enableSeparator) {
			return {
				class: `#${uniqueId} .sp-smart-post-show-separator`,
				styles: {
					"border-bottom-style": separatorStyle,
					"border-bottom-color": separatorColor,
					"border-bottom-width": separatorHeight.device?.[device] + separatorHeight.unit?.[device],
					margin: `${spaceBetweenListItems.device?.[device] + spaceBetweenListItems.unit?.[device]} 0px`,
				},
			};
		}
		return {};
	};

	const flexAlignment = {
		top: "start",
		center: "center",
		bottom: "end",
	};

	let dividerStyle = [];

	if (showHideDivider) {
		const marginAlignment = {
			center: {
				margin: "auto",
			},
			right: {
				"margin-left": "auto",
			},
			left: {},
		};

		dividerStyle = [
			{
				class: `#${uniqueId} .sp-smart-post-list-divider`,
				styles: {
					"border-top": `${responsiveCss(dividerHeight, "Desktop")} ${dividerBorderStyle}`,
					"border-color": "bgColor" === dividerBg["color"].style ? BgColor(dividerBg) : "",
					"border-image-source": "gradient" === dividerBg["color"].style ? BgColor(dividerBg) : "",
					width: `${responsiveCss(dividerWidth, "Desktop")}`,
					...marginAlignment[dividerAlignment],
				},
			},
		];
	}
	const responsiveDeviceCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-two-bg-layout .sp-smart-post-large-items`,
				styles: {
					padding: spacingGenerate(postCardPadding, deviceType),
					"border-width": spacingGenerate(postCardBorderWidth, deviceType),
					"margin-bottom": `${responsiveCss(verticalGap, deviceType)}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items,
				#${uniqueId} .sp-smart-post-large-items + .sp-smart-post-list-divider`,
				styles: {
					"margin-bottom": `${responsiveCss(verticalGap, deviceType)}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-list-two-bg-layout .sp-smart-post-large-items .sp-smart-post-card-content`,
				styles: {
					padding: `${spacingGenerate(largeItemPadding, deviceType)}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-list-two-bg-layout .sp-smart-post-large-items:hover`,
				styles: {
					"border-width": spacingGenerate(postCardHoverBorderWidth, deviceType),
					"border-radius": spacingGenerate(postCardHoverBorderRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-small-items`,
				styles: {
					gap: `${responsiveCss(verticalGap, deviceType)}`,
				},
			},
			{
				class: `
				#${uniqueId} .sp-smart-post-large-items .sp-smart-post-list-item .sp-smart-post-card-image,
				#${uniqueId} .sp-smart-post-list-two-bg-layout .sp-smart-post-large-items .sp-smart-post-list-item`,
				styles: {
					height: responsiveCss(largeItemHeight, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-title`,
				styles: {
					"font-size": `${responsiveCss(largeItemTitleFontSize, deviceType)}`,
					"line-height": `${responsiveCss(largeItemTitleLineHeight, deviceType)}`,
					"letter-spacing": `${responsiveCss(largeItemTitleLatterSpacing, deviceType)}`,
					"word-spacing": `${responsiveCss(largeItemTitleWordSpacing, deviceType)}`,
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...dividerStyle,
		...responsiveDeviceCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-list-two-bg-layout .sp-smart-post-large-items`,
			styles: {
				"border-style": postCardBorder?.style,
				"border-color": postCardBorder?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items:hover .sp-smart-post-card-image .image-overlay.overlay-custom`,
			styles: {
				background: BgColor(imageOverlayCustomColor, "hover"),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-excerpt-read-more`,
			styles: {
				color: readMoreTextColor?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-excerpt-read-more:hover`,
			styles: {
				color: readMoreTextColor?.hover,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-list-two-bg-layout .sp-smart-post-large-items:hover`,
			styles: {
				"border-color": postCardBorder?.hoverColor,
				"border-style": postCardBorder?.hoverStyle,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-list-wrapper .sp-smart-post-small-items .sp-smart-post-card:hover`,
			styles: {
				"border-style": postCardBorder?.hoverStyle,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details span,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-like i,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details svg path`,
			styles: {
				color: `${largeMetaColors.color}`,
				fill: `${largeMetaColors.color}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-meta:hover span,
			#${uniqueId} .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-meta:hover i,
			#${uniqueId} .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-meta:hover svg path`,
			styles: {
				color: `${largeMetaColors.hoverColor}`,
				fill: `${largeMetaColors.hoverColor}`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-excerpt`,
			styles: {
				color: `${largeExcerptColor.color}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-excerpt`,
			styles: {
				color: `${excerptColor.color}`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-title`,
			styles: {
				...typographyCss(largeItemTitleTypography, true),
				color: `${largeItemTitleColor.color}`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-title:hover`,
			styles: {
				color: `${largeItemTitleColor.hoverColor}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-list-one-container .sp-smart-post-card`,
			styles: {
				"align-items": flexAlignment[contentVerticalPosition],
			},
		},
		getSeparatorStyles("Desktop"),
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [...sharedTabletCss, ...responsiveDeviceCss("Tablet"), getSeparatorStyles("Tablet")];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [...sharedMobileCss, ...responsiveDeviceCss("Mobile"), getSeparatorStyles("Mobile")];
		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
