import { objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

// eslint-disable-next-line no-unused-vars
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		buttonGap,
		buttonsMargin,
		buttonsHorizontalAlignment,
		fullWidthBtnEnable,
		buttonsAlignment,
		buttonsVerticalAlignment,
		globalBreakPointData,
	} = attributes;

	const rangerCss = (attr, device = "Desktop") => {
		const _unit = attr?.unit?.[device] || "";
		return `${attr?.device?.[device]}${_unit}`;
	};

	const desktopCss = [
		{
			class: `#${uniqueId} .block-editor-block-list__layout, #${uniqueId}.sp-smart-post-buttons-front-page`,
			styles: {
				display: "flex",
				"flex-wrap": "wrap",
				"flex-direction": `${buttonsAlignment === "horizontal" ? "row" : "column"}`,
				gap: rangerCss(buttonGap),
				margin: spacingGenerate(buttonsMargin, "Desktop"),
				"justify-content": `${fullWidthBtnEnable ? "" : buttonsHorizontalAlignment}`,
				"align-items": `${fullWidthBtnEnable ? "" : buttonsVerticalAlignment}`,
			},
		},

		{
			class: `#${uniqueId} .block-editor-block-list__layout > * , #${uniqueId}.sp-smart-post-buttons-front-page .wp-block-sp-smart-post-show-button`,
			styles: {
				flex: `${fullWidthBtnEnable ? "1" : " "} `,
			},
		},
		{
			class: `#${uniqueId} .block-editor-block-list__layout .sp-smart-post-btn, #${uniqueId}.sp-smart-post-buttons-front-page .sp-smart-post-btn`,
			styles: {
				display: `${fullWidthBtnEnable ? "flex" : "inline-flex"} `,
				width: `${fullWidthBtnEnable ? "100%" : "auto"} `,
				"justify-content": `${fullWidthBtnEnable ? "center" : "center"} `,
				"align-items": `${fullWidthBtnEnable ? "center" : "center"} `,
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet CSS styles.
		const tabletCss = [
			{
				class: `#${uniqueId} .block-editor-block-list__layout, #${uniqueId}.sp-smart-post-buttons-front-page`,
				styles: {
					gap: rangerCss(buttonGap, "Tablet"),
					margin: spacingGenerate(buttonsMargin, "Tablet"),
				},
			},
		];

		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile CSS styles.
		const mobileCss = [
			{
				class: `#${uniqueId} .block-editor-block-list__layout, #${uniqueId}.sp-smart-post-buttons-front-page`,
				styles: {
					gap: rangerCss(buttonGap, "Mobile"),
					margin: spacingGenerate(buttonsMargin, "Mobile"),
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
