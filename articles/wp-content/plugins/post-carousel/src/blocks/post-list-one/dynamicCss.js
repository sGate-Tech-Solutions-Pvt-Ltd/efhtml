import sharedDynamicCss from "../shared/dynamicCss";
import { bgColor, objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

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
		dividerHeight,
		dividerBorderStyle,
		dividerBg,
		dividerAlignment,
		dividerWidth,
		showHideDivider,
		imageHeight,
		imageSize,
		contentAreaBorder,
		contentAreaBorderRadius,
		contentAreaBorderWidth,
		postListLayout,
		globalBreakPointData,
	} = attributes;

	const responsiveCss = (attr, device) => {
		const unit = attr?.unit?.[device];
		return `${attr?.device?.[device]}${unit}`;
	};

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

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
					"border-color": "bgColor" === dividerBg.color.style ? bgColor(dividerBg) : "",
					"border-image-source": "gradient" === dividerBg.color.style ? bgColor(dividerBg) : "",
					width: `${responsiveCss(dividerWidth, "Desktop")}`,
					...marginAlignment[dividerAlignment],
				},
			},
		];
	}

	const responsiveCssFun = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-card-content`,
				styles: {
					...(["list-one-layout-three", "list-one-layout-four"].includes(postListLayout) && {
						"border-style": contentAreaBorder.style,
						"border-color": contentAreaBorder.color,
						"border-width": spacingGenerate(contentAreaBorderWidth, deviceType),
						"border-radius": spacingGenerate(contentAreaBorderRadius, deviceType),
					}),
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...dividerStyle,
		...responsiveCssFun("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-list-one-container`,
			styles: {
				gap: verticalGap.device.Desktop + verticalGap.unit.Desktop,
			},
		},
		{
			class: `#${uniqueId} .list-one-layout-three .sp-smart-post-card,
			#${uniqueId} .list-one-layout-four .sp-smart-post-card`,
			styles: {
				background: "transparent",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-card .sp-smart-post-card-image`,
			styles: {
				height: "custom" === imageSize ? `${imageHeight.device.Desktop}${imageHeight.unit.Desktop}` : "",
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
		const tabletCss = [
			...sharedTabletCss,
			...responsiveCssFun("Tablet"),
			{
				class: `#${uniqueId} .sp-smart-post-list-one-container`,
				styles: {
					gap: verticalGap.device.Tablet + verticalGap.unit.Tablet,
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
			...responsiveCssFun("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-list-one-container`,
				styles: {
					gap: verticalGap.device.Mobile + verticalGap.unit.Mobile,
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
