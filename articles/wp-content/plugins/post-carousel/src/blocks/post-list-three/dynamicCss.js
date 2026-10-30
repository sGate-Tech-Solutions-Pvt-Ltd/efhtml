import { typographyCss } from "../../controls/controls";
import sharedDynamicCss from "../shared/dynamicCss";
import {
	isEmptyObject,
	objectToCssString,
	removeEmptyValues,
	spacingGenerate,
	wrapInMediaQuery,
} from "../shared/helpFn";

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
		postCardBorderRadius,
		postCardHoverBorderWidth,
		postCardHoverBorderRadius,
		imageOverlayCustomColor,
		largeItemPadding,
		readMoreTextColor,
		titleFontSize,
		titleLineHeight,
		titleColor,
		titleMargin,
		largeItemTitleLatterSpacing,
		largeItemTitleWordSpacing,
		largeItemTitleTypography,
		horizontalGap,
		largeItemAlignment,
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
		left: "flex-start",
		right: "flex-end",
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
					"border-color": "bgColor" === dividerBg.color.style ? BgColor(dividerBg) : "",
					"border-image-source": "gradient" === dividerBg.color.style ? BgColor(dividerBg) : "",
					"border-color": "bgColor" === dividerBg["color"].style ? BgColor(dividerBg) : "",
					"border-image-source": "gradient" === dividerBg["color"].style ? BgColor(dividerBg) : "",
					width: `${responsiveCss(dividerWidth, "Desktop")}`,
					...marginAlignment[dividerAlignment],
				},
			},
		];
	}

	const desktopCss = [
		...sharedDesktopCss,
		...dividerStyle,
		{
			class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout`,
			styles: {
				padding: spacingGenerate(postCardPadding, "Desktop"),
				"border-style": postCardBorder?.style,
				"border-color": postCardBorder?.color,
				"border-width": spacingGenerate(postCardBorderWidth, "Desktop"),
				"margin-bottom": `${responsiveCss(verticalGap, "Desktop")}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items,
			#${uniqueId} .sp-smart-post-large-items + .sp-smart-post-list-divider`,
			styles: {
				"margin-bottom": `${responsiveCss(verticalGap, "Desktop")}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-list-item:hover .sp-smart-post-card-image .image-overlay.overlay-custom`,
			styles: {
				background: BgColor(imageOverlayCustomColor, "hover"),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout .sp-smart-post-card-content`,
			styles: {
				padding: `${spacingGenerate(largeItemPadding, "Desktop")} !important`,
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
			class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout:hover`,
			styles: {
				"border-color": postCardBorder?.hoverColor,
				"border-style": postCardBorder?.hoverStyle,
				"border-width": spacingGenerate(postCardHoverBorderWidth, "Desktop"),
				"border-radius": spacingGenerate(postCardHoverBorderRadius, "Desktop"),
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
				color: `${largeMetaColors.color} !important`,
				fill: `${largeMetaColors.color} !important`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-meta:hover span,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-meta:hover i,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-meta:hover svg path,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-reading-time:hover svg path,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-details .sp-smart-post-reading-time:hover span`,
			styles: {
				color: `${largeMetaColors.hoverColor} !important`,
				fill: `${largeMetaColors.hoverColor} !important`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-excerpt`,
			styles: {
				color: `${largeExcerptColor.color} !important`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-excerpt`,
			styles: {
				color: `${excerptColor.color}`,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-title`,
			styles: {
				...typographyCss(largeItemTitleTypography),
				color: `${largeItemTitleColor.color} !important`,
				// 'font-family': '',
				// 'font-weight': largeItemTitleTypography.typography.fontWeight,
				// 'font-style': largeItemTitleTypography.typography.style,
				// 'text-decoration': largeItemTitleTypography.typography.decoration,
				// 'text-transform': largeItemTitleTypography.typography.transform,
			},
		},
		{
			class: `#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-title:hover`,
			styles: {
				color: `${largeItemTitleColor.hoverColor} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-small-items`,
			styles: {
				gap: `${responsiveCss(verticalGap, "Desktop")}`,
			},
		},
		{
			class: `
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items .sp-smart-post-list-item .sp-smart-post-card-image,
			#${uniqueId} #sp-smart-post-list-wrapper .sp-smart-post-large-items.sp-smart-post-background-layout .sp-smart-post-list-item`,
			styles: {
				height: responsiveCss(largeItemHeight, "Desktop"),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-small-items .sp-smart-post-title-wrapper .sp-smart-post-title-icon`,
			styles: {
				"font-size": `${responsiveCss(titleFontSize, "Desktop")}`,
				"line-height": `${responsiveCss(titleLineHeight, "Desktop")}`,
				color: titleColor.color,
				"margin-top": `${titleMargin.device.Desktop.top}px`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-small-items .sp-smart-post-title-wrapper:hover .sp-smart-post-title-icon,
			#${uniqueId} .sp-smart-post-small-items .sp-smart-post-title-wrapper:hover .sp-smart-post-title`,
			styles: {
				color: `${titleColor.hoverColor} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-title`,
			styles: {
				"font-size": `${responsiveCss(largeItemTitleFontSize, "Desktop")} !important`,
				"line-height": `${responsiveCss(largeItemTitleLineHeight, "Desktop")} !important`,
				"letter-spacing": `${responsiveCss(largeItemTitleLatterSpacing, "Desktop")} !important`,
				"word-spacing": `${responsiveCss(largeItemTitleWordSpacing, "Desktop")} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-list-one-container .sp-smart-post-card`,
			styles: {
				"align-items": flexAlignment[contentVerticalPosition],
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-list-items .sp-smart-post-large-items, #${uniqueId} .sp-smart-post-list-items .sp-smart-post-small-items`,
			styles: {
				"column-gap": responsiveCss(horizontalGap, "Desktop"),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-card-content`,
			styles: {
				"text-align": largeItemAlignment,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-card-content .sp-smart-post-category, #${uniqueId} .sp-smart-post-large-items .sp-smart-post-card-content .sp-meta-data, #${uniqueId} .sp-smart-post-large-items .sp-smart-post-card-content .sp-smart-post-read-more-button`,
			styles: {
				"justify-content": flexAlignment[largeItemAlignment],
			},
		},
		getSeparatorStyles("Desktop"),
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...sharedTabletCss,
			{
				class: `#${uniqueId} .sp-smart-post-list-one-container`,
				styles: {
					gap: verticalGap.device.Tablet + verticalGap.unit.Tablet,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout`,
				styles: {
					padding: spacingGenerate(postCardPadding, "Tablet"),
					"border-width": spacingGenerate(postCardBorderWidth, "Tablet"),
					"margin-bottom": `${responsiveCss(verticalGap, "Tablet")}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items,
			#${uniqueId} .sp-smart-post-large-items + .sp-smart-post-list-divider`,
				styles: {
					"margin-bottom": `${responsiveCss(verticalGap, "Tablet")}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(largeItemPadding, "Tablet"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout:hover`,
				styles: {
					"border-width": spacingGenerate(postCardHoverBorderWidth, "Tablet"),
					"border-radius": spacingGenerate(postCardHoverBorderRadius, "Tablet"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-small-items`,
				styles: {
					gap: `${responsiveCss(verticalGap, "Tablet")}`,
				},
			},
			{
				class: `
			#${uniqueId} .sp-smart-post-large-items .sp-smart-post-list-item .sp-smart-post-card-image,
			#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout .sp-smart-post-list-item`,
				styles: {
					height: responsiveCss(largeItemHeight, "Tablet"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-title`,
				styles: {
					"font-size": `${responsiveCss(largeItemTitleFontSize, "Tablet")} !important`,
					"line-height": `${responsiveCss(largeItemTitleLineHeight, "Tablet")} !important`,
					"letter-spacing": `${responsiveCss(largeItemTitleLatterSpacing, "Tablet")} !important`,
					"word-spacing": `${responsiveCss(largeItemTitleWordSpacing, "Tablet")} !important`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-list-items .sp-smart-post-large-items, #${uniqueId} .sp-smart-post-list-items .sp-smart-post-small-items`,
				styles: {
					"column-gap": responsiveCss(horizontalGap, "Tablet"),
				},
			},
			getSeparatorStyles("Tablet"),
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...sharedMobileCss,
			{
				class: `#${uniqueId} .sp-smart-post-list-one-container`,
				styles: {
					gap: verticalGap.device.Mobile + verticalGap.unit.Mobile,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout`,
				styles: {
					padding: spacingGenerate(postCardPadding, "Mobile"),
					"border-width": spacingGenerate(postCardBorderWidth, "Mobile"),
					"margin-bottom": `${responsiveCss(verticalGap, "Mobile")}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items,
			#${uniqueId} .sp-smart-post-large-items + .sp-smart-post-list-divider`,
				styles: {
					"margin-bottom": `${responsiveCss(verticalGap, "Mobile")}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(largeItemPadding, "Mobile"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout:hover`,
				styles: {
					"border-width": spacingGenerate(postCardHoverBorderWidth, "Mobile"),
					"border-radius": spacingGenerate(postCardHoverBorderRadius, "Mobile"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-small-items`,
				styles: {
					gap: `${responsiveCss(verticalGap, "Mobile")}`,
				},
			},
			{
				class: `
			#${uniqueId} .sp-smart-post-large-items .sp-smart-post-list-item .sp-smart-post-card-image,
			#${uniqueId} .sp-smart-post-large-items.sp-smart-post-background-layout .sp-smart-post-list-item`,
				styles: {
					height: responsiveCss(largeItemHeight, "Mobile"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-large-items .sp-smart-post-title`,
				styles: {
					"font-size": `${responsiveCss(largeItemTitleFontSize, "Mobile")} !important`,
					"line-height": `${responsiveCss(largeItemTitleLineHeight, "Mobile")} !important`,
					"letter-spacing": `${responsiveCss(largeItemTitleLatterSpacing, "Mobile")} !important`,
					"word-spacing": `${responsiveCss(largeItemTitleWordSpacing, "Mobile")} !important`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-list-items .sp-smart-post-large-items, #${uniqueId} .sp-smart-post-list-items .sp-smart-post-small-items`,
				styles: {
					"column-gap": responsiveCss(horizontalGap, "Mobile"),
				},
			},
			getSeparatorStyles("Mobile"),
		];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
