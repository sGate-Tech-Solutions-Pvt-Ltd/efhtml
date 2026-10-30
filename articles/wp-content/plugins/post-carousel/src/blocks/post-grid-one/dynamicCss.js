import { inArray } from "../../controls/controls";
import sharedDynamicCss from "../shared/dynamicCss";
import { objectToCssString, removeEmptyCss, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gridOneColumns,
		gridOneVerticalGap,
		gridOneHorizontalGap,
		postGridLayout,
		imageSize,
		imageWidth,
		imageScale,
		imageHeight,
		largeImageSize,
		largeItemHeight,
		largeImageHeight,
		largeImageWidth,
		largeItemTitleTypography,
		largeItemTitleFontSize,
		largeItemTitleLatterSpacing,
		largeItemTitleLineHeight,
		titleFontSize,
		metaFontSize,
		largeItemTitleWordSpacing,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const largeItemTitleClass = `#${uniqueId} .sp-smart-post-large-item-part-one .sp-smart-post-card-content .sp-smart-post-title, #${uniqueId} .grid-one-layout-three .sp-smart-post-large-item-part-two .sp-smart-post-card-content .sp-smart-post-title`;

	const layoutFiveCss = (deviceType) => {
		return postGridLayout === "grid-one-layout-five"
			? []
			: [
					{
						class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents`,
						styles: {
							"grid-template-columns": `repeat(${gridOneColumns.device?.[deviceType]}, 1fr)`,
						},
					},
				];
	};
	const layoutThreeFourCss = (deviceType) => {
		return ["grid-one-layout-three", "grid-one-layout-four"].includes(postGridLayout)
			? [
					{
						class: `#${uniqueId} .grid-one-layout-three .sp-smart-post-static-grid-contents .sp-smart-post-card-image img, #${uniqueId} .grid-one-layout-four .sp-smart-post-static-grid-contents .sp-smart-post-card-image img`,
						styles: {
							height: `${
								largeImageSize === "custom" && largeImageHeight.device?.[deviceType]
									? largeImageHeight.device?.[deviceType] +
										largeImageHeight.unit?.[deviceType] +
										" !important"
									: ""
							}`,
							width: `${
								largeImageSize === "custom" && largeImageWidth.device?.[deviceType]
									? largeImageWidth.device?.[deviceType] +
										largeImageWidth.unit?.[deviceType] +
										" !important"
									: "auto"
							}`,
						},
					},
				]
			: [
					{
						class: `#${uniqueId} .grid-one-container .sp-smart-post-static-grid-contents .sp-smart-post-large-item-part-one .sp-smart-post-card img`,
						styles: {
							height: `${
								largeImageSize === "custom" && largeImageHeight.device?.[deviceType]
									? largeImageHeight.device?.[deviceType] +
										largeImageHeight.unit?.[deviceType] +
										" !important"
									: ""
							}`,
							width: `${
								largeImageSize === "custom" && largeImageWidth.device?.[deviceType]
									? largeImageWidth.device?.[deviceType] +
										largeImageWidth.unit?.[deviceType] +
										" !important"
									: "100%"
							}`,
						},
					},
				];
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .grid-one-container .sp-smart-post-static-grid-contents`,
				styles: {
					height: `${
						largeItemHeight.device?.[deviceType]
							? largeItemHeight.device?.[deviceType] + largeItemHeight.unit?.[deviceType]
							: ""
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"row-gap": `${gridOneVerticalGap.device?.[deviceType]}${gridOneVerticalGap.unit?.[deviceType]}`,
					"column-gap": `${gridOneHorizontalGap.device?.[deviceType]}${gridOneHorizontalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `${largeItemTitleClass}`,
				styles: {
					"font-size": `${largeItemTitleFontSize.device?.[deviceType]}${largeItemTitleFontSize.unit?.[deviceType]} !important`,
					"letter-spacing": `${largeItemTitleLatterSpacing.device?.[deviceType]}${largeItemTitleLatterSpacing.unit?.[deviceType]}`,
					"word-spacing": `${largeItemTitleWordSpacing.device?.[deviceType]}${largeItemTitleWordSpacing.unit?.[deviceType]}`,
					"line-height": `${largeItemTitleLineHeight.device?.[deviceType]} !important`,
				},
			},
		];
	};

	const commonCss = [
		{
			class: `${largeItemTitleClass}`,
			styles: {
				"font-weight": `${largeItemTitleTypography.typography.fontWeight} !important`,
				"font-style": `${largeItemTitleTypography.typography.style || "normal"}`,
				"text-transform": `${largeItemTitleTypography.typography.transform} !important`,
				"text-decoration": `${largeItemTitleTypography.typography.decoration} !important`,
			},
		},
		...removeEmptyCss(`${largeItemTitleClass}`, "font-family", largeItemTitleTypography.typography.family, true),
	];

	const desktopCss = [
		...sharedDesktopCss,
		...commonCss,
		...responsiveCss("Desktop"),
		...layoutFiveCss("Desktop"),
		...layoutThreeFourCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-static-grid-contents`,
			styles: {
				"row-gap": inArray(
					[
						"grid-one-layout-six",
						"grid-one-layout-six-updated",
						"grid-one-layout-seven",
						"grid-one-layout-eight",
						"grid-one-layout-nine",
					],
					postGridLayout
				)
					? `${gridOneVerticalGap.device.Desktop}${gridOneVerticalGap.unit.Desktop}`
					: "",
				"column-gap": `${gridOneHorizontalGap.device.Desktop}${gridOneHorizontalGap.unit.Desktop}`,
				"margin-bottom": `${gridOneVerticalGap.device.Desktop}${gridOneVerticalGap.unit.Desktop}`,
			},
		},

		// dynamic contents image css
		{
			class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents .sp-smart-post-card-image img`,
			styles: {
				width: `${imageSize === "custom" ? imageWidth.device.Desktop + imageWidth.unit.Desktop : "100%"}`,
				height: `${imageSize === "custom" ? imageHeight.device.Desktop + imageHeight.unit.Desktop : ""}`,
				"object-fit": `${imageScale}`,
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Add Tablet styles
		const tabletCss = [
			...sharedTabletCss,
			...commonCss,
			...responsiveCss("Tablet"),
			...layoutFiveCss("Tablet"),
			...layoutThreeFourCss("Tablet"),
			{
				class: `#${uniqueId} .sp-smart-post-static-grid-contents`,
				styles: {
					"row-gap": inArray(
						[
							"grid-one-layout-six",
							"grid-one-layout-six-updated",
							"grid-one-layout-seven",
							"grid-one-layout-eight",
							"grid-one-layout-nine",
						],
						postGridLayout
					)
						? `${gridOneVerticalGap.device.Tablet}${gridOneVerticalGap.unit.Tablet}`
						: "",
					"column-gap": `${gridOneVerticalGap.device.Tablet}${gridOneVerticalGap.unit.Tablet}`,
					"margin-bottom": `${gridOneVerticalGap.device.Tablet}${gridOneVerticalGap.unit.Tablet}`,
				},
			},
			// dynamic contents image css
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents .sp-smart-post-card-image img`,
				styles: {
					width: `${imageSize === "custom" ? imageWidth.device.Tablet + imageWidth.unit.Tablet : "100%"}`,
					height: `${imageSize === "custom" ? imageHeight.device.Tablet + imageHeight.unit.Tablet : "auto"}`,
					"object-fit": `${imageScale}`,
				},
			},
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Add Mobile styles
		const mobileCss = [
			...sharedMobileCss,
			...commonCss,
			...responsiveCss("Mobile"),
			...layoutThreeFourCss("Mobile"),
			{
				class: `#${uniqueId} .grid-one-container .sp-smart-post-static-grid-contents, #${uniqueId} .grid-one-container .sp-smart-post-dynamic-grid-contents`,
				styles: {
					"grid-template-columns": `repeat(${gridOneColumns.device.Mobile || 1},1fr) !important`,
					"row-gap": `${gridOneVerticalGap.device.Mobile + gridOneVerticalGap.unit.Mobile}`,
				},
			},
			// {
			// 	class: `#${ uniqueId } .grid-one-container .sp-smart-post-static-grid-contents .sp-smart-post-card , #${ uniqueId } .grid-one-container .sp-smart-post-dynamic-grid-contents .sp-smart-post-card `,
			// 	styles: {
			// 		"grid-column": "1 !important",
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-static-grid-contents`,
				styles: {
					"row-gap": inArray(
						[
							"grid-one-layout-six",
							"grid-one-layout-six-updated",
							"grid-one-layout-seven",
							"grid-one-layout-eight",
							"grid-one-layout-nine",
						],
						postGridLayout
					)
						? `${gridOneVerticalGap.device.Mobile}${gridOneVerticalGap.unit.Mobile}`
						: "",
					"column-gap": `${gridOneHorizontalGap.device.Mobile}${gridOneHorizontalGap.unit.Mobile}`,
					"margin-bottom": `${gridOneVerticalGap.device.Mobile}${gridOneVerticalGap.unit.Mobile}`,
				},
			},
			{
				class: `#${uniqueId}.grid-one-layout-six .sp-smart-post-static-grid-contents .sp-smart-post-card-image img, #${uniqueId}.grid-one-layout-six-updated .sp-smart-post-static-grid-contents .sp-smart-post-card-image img, #${uniqueId}.grid-one-layout-seven .sp-smart-post-static-grid-contents .sp-smart-post-card-image img, #${uniqueId}.grid-one-layout-eight .sp-smart-post-static-grid-contents .sp-smart-post-card-image img, #${uniqueId}.grid-one-layout-nine .sp-smart-post-static-grid-contents .sp-smart-post-card-image img`,
				styles: {
					height: `${imageSize === "custom" ? imageHeight.device.Mobile + imageHeight.unit.Mobile : "auto"}`,
					width: `${imageSize === "custom" ? imageWidth.device.Mobile + imageWidth.unit.Mobile : "100%"}`,
				},
				"object-fit": `${imageScale}`,
			},
			{
				class: `#${uniqueId}.grid-one-layout-six-updated.left .sp-smart-post-static-grid-contents .sp-smart-post-card:not(:first-child) .sp-smart-post-title, #${uniqueId}.grid-one-layout-six-updated.right .sp-smart-post-static-grid-contents .sp-smart-post-card:not(:last-child) .sp-smart-post-title`,
				styles: {
					"font-size": `${titleFontSize.device.Mobile + titleFontSize.unit.Mobile} !important`,
				},
			},
			{
				class: `#${uniqueId}.grid-one-layout-six-updated.left .sp-smart-post-static-grid-contents .sp-smart-post-card:not(:first-child) .sp-smart-post-date, #${uniqueId}.grid-one-layout-six-updated.right .sp-smart-post-static-grid-contents .sp-smart-post-card:not(:last-child) .sp-smart-post-date, #${uniqueId}.grid-one-layout-six-updated.left .sp-smart-post-static-grid-contents .sp-smart-post-card:not(:first-child) .sp-smart-post-date span, #${uniqueId}.grid-one-layout-six-updated.right .sp-smart-post-static-grid-contents .sp-smart-post-card:not(:last-child) .sp-smart-post-date span`,
				styles: {
					"font-size": `${
						metaFontSize.device.Mobile
							? metaFontSize.device.Mobile + metaFontSize.unit.Mobile + " !important"
							: ""
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-dynamic-grid-contents .sp-smart-post-card-image img`,
				styles: {
					width: `${imageSize === "custom" ? imageWidth.device.Mobile + imageWidth.unit.Mobile : "100%"}`,
					height: `${imageSize === "custom" ? imageHeight.device.Mobile + imageHeight.unit.Mobile : "auto"}`,
					"object-fit": `${imageScale}`,
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
