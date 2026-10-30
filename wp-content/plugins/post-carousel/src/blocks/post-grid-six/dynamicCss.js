import sharedDynamicCss from "../shared/dynamicCss";
import {
	colorControls,
	isEmptyObject,
	objectToCssString,
	rangerCss,
	removeEmptyCss,
	removeEmptyValues,
	spacingGenerate,
	wrapInMediaQuery,
} from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		gridSixColumns,
		gridSixHorizontalGap,
		gridSixVerticalGap,
		largeItemTitleColor,
		largeItemTitleTypography,
		largeMetaColors,
		metaLargeTypography,
		postGridLayout,
		smallItemContentAlignment,
		largeItemHeight,
		smallItemHeight,
		largeImageSize,
		largeImageWidth,
		largeImageHeight,
		contentAreaMargin,
		largeContentAreaPadding,
		contentAreaPadding,
		excerptColor,
		contentAlignment,
		socialPopupContainerBGColor,
		globalBreakPointData,
	} = attributes;

	const { sharedDesktopCss, sharedTabletCss, sharedMobileCss } = sharedDynamicCss(attributes, page);

	const textAlignObject = {
		start: "left",
		center: "center",
		end: "right",
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-dynamic-contents`,
				styles: {
					"grid-template-columns": `repeat(${
						gridSixColumns.device?.[deviceType]
							? gridSixColumns.device?.[deviceType]
							: postGridLayout === "grid-six-layout-one"
								? 3
								: 2
					},1fr)`,
					"column-gap": `${gridSixHorizontalGap.device?.[deviceType]}${gridSixHorizontalGap.unit?.[deviceType]}`,
					"row-gap": `${gridSixVerticalGap.device?.[deviceType]}${gridSixVerticalGap.unit?.[deviceType]}`,
					"margin-top": `${gridSixVerticalGap.device?.[deviceType]}${gridSixVerticalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents`,
				styles: {
					"column-gap": `${gridSixHorizontalGap.device?.[deviceType]}${gridSixHorizontalGap.unit?.[deviceType]}`,
				},
			},
			{
				class: `#${uniqueId} .grid-six-container .sp-smart-post-grid-six-large-contents`,
				styles: {
					height: largeItemHeight.device?.[deviceType]
						? largeItemHeight.device?.[deviceType] + largeItemHeight.unit?.[deviceType]
						: postGridLayout !== "grid-six-layout-three"
							? "400px"
							: "auto",
				},
			},
			{
				class: `#${uniqueId} .grid-six-container .sp-smart-post-grid-six-dynamic-contents .sp-smart-post-card`,
				styles: {
					height: smallItemHeight.device?.[deviceType]
						? smallItemHeight.device?.[deviceType] + smallItemHeight.unit?.[deviceType] + " !important"
						: postGridLayout !== "grid-six-layout-one"
							? "fit-content"
							: "210px",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-image`,
				styles: {
					// width:
					// 	largeImageSize === 'custom' &&
					// 	largeImageWidth.device[ deviceType ] &&
					// 	postGridLayout !== 'grid-six-layout-four'
					// 		? largeImageWidth.device[ deviceType ] +
					// 		  largeImageWidth.unit[ deviceType ]
					// 		: '100%',
					height:
						largeImageSize === "custom" &&
						postGridLayout !== "grid-six-layout-four" &&
						largeImageHeight.device?.[deviceType]
							? largeImageHeight.device?.[deviceType] + largeImageHeight.unit?.[deviceType]
							: "",
				},
			},
			{
				class: `#${uniqueId} .grid-six-container .sp-smart-post-template-one-content`,
				styles: {
					margin: spacingGenerate(contentAreaMargin, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents:not(.grid-six-layout-four) .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(largeContentAreaPadding, deviceType)
						? spacingGenerate(largeContentAreaPadding, deviceType)
						: "0 !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-four .sp-smart-post-card-content`,
				styles: {
					padding: spacingGenerate(largeContentAreaPadding, deviceType)
						? spacingGenerate(largeContentAreaPadding, deviceType)
						: spacingGenerate(contentAreaPadding, deviceType),
					"padding-top": "15px !important",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-one .sp-smart-post-card-image, #${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-two .sp-smart-post-card-image, #${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-three .sp-smart-post-card-image`,
				styles: {
					width: rangerCss(largeImageWidth, deviceType),
				},
			},
		];
	};

	const desktopCss = [
		...sharedDesktopCss,
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-title`,
			styles: {
				color: `${largeItemTitleColor.color ? largeItemTitleColor.color + " !important" : ""}`,
				"font-style": largeItemTitleTypography?.typography?.style,
				"text-decoration": largeItemTitleTypography?.typography?.decoration + " !important",
				"text-transform": largeItemTitleTypography?.typography?.transform + " !important",
			},
		},
		...removeEmptyCss(
			`#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-title`,
			"font-family",
			largeItemTitleTypography?.typography?.family,
			true
		),
		// {
		// 	class: `#${ uniqueId } .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-readmore-btn-link`,
		// 	styles: {
		// 		color: `${
		// 			largeItemReadMoreColor?.color
		// 				? largeItemReadMoreColor?.color + ' !important'
		// 				: ''
		// 		}`,
		// 		background: colorControls(
		// 			largeItemReadMoreBg?.color?.style,
		// 			largeItemReadMoreBg?.color?.solidColor,
		// 			largeItemReadMoreBg?.color?.gradient
		// 		),
		// 		'border-style': largeItemReadMoreButtonBorder.style,
		// 	},
		// },
		// {
		// 	class: `#${ uniqueId } .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-readmore-btn-link`,
		// 	styles: {
		// 		'border-color': `${
		// 			largeItemReadMoreButtonBorder?.color
		// 				? largeItemReadMoreButtonBorder?.color
		// 				: postGridLayout !== 'grid-six-layout-four'
		// 				? '#333333'
		// 				: '#ffffff'
		// 		}`,
		// 	},
		// },
		// {
		// 	class: `#${ uniqueId } .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-readmore-btn-link:hover`,
		// 	styles: {
		// 		color: `${
		// 			largeItemReadMoreColor?.hoverColor
		// 				? largeItemReadMoreColor?.hoverColor + ' !important'
		// 				: readMoreColor?.hoverColor
		// 		}`,
		// 		background: colorControls(
		// 			largeItemReadMoreBg?.hover?.style ||
		// 				readMoreBg?.hover?.style,
		// 			largeItemReadMoreBg?.hover?.solidColor ||
		// 				readMoreBg?.hover?.solidColor,
		// 			largeItemReadMoreBg?.hover?.gradient ||
		// 				readMoreBg?.hover?.gradient
		// 		),
		// 		'border-color': `${
		// 			largeItemReadMoreButtonBorder?.hoverColor
		// 				? largeItemReadMoreButtonBorder?.hoverColor
		// 				: ''
		// 		}`,
		// 	},
		// },
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-title:hover`,
			styles: {
				color: `${largeItemTitleColor.hoverColor ? largeItemTitleColor.hoverColor + " !important" : ""}`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-author svg path,
			.sp-smart-post-grid-six-large-contents  .sp-smart-post-card-content .sp-smart-post-date .sp-smart-post-release-date svg path,
			.sp-smart-post-grid-six-large-contents  .sp-smart-post-card-content .sp-post-show-comment span svg path,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-view span:first-of-type svg path,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-reading-time span:first-of-type svg path,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like span:first-of-type`,
			styles: {
				fill: `${largeMetaColors.color} !important`,
				color: `${largeMetaColors.color} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-author .sp-smart-post-author-name,
				.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-date span,
				.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-post-show-comment span,
				.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-view span,
				.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like span,
				.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like i,
				.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-reading-time span`,
			styles: {
				"font-style": metaLargeTypography?.typography?.style,
				"text-decoration": metaLargeTypography?.typography?.decoration + " !important",
				"text-transform": metaLargeTypography?.typography?.transform + " !important",
				"font-weight": metaLargeTypography?.typography?.fontWeight + " !important",
			},
		},
		// ...removeEmptyCss(
		// 	`#${ uniqueId } .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-author .sp-smart-post-author-name,
		// 		.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-date span,
		// 		.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-post-show-comment span,
		// 		.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-view span,
		// 		.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like span,
		// 		.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like i,
		// 		.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-reading-time span`,
		// 	'font-family',
		// 	metaLargeTypography?.typography?.family,
		// 	true
		// ),
		// {
		// 	class: `#${ uniqueId } .grid-six-container .sp-smart-post-grid-six-dynamic-contents .sp-smart-post-card-content`,
		// 	styles: {
		// 		'align-items': smallItemContentAlignment,
		// 	},
		// },
		{
			class: `#${uniqueId} .grid-six-container .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-details`,
			styles: {
				"justify-content": contentAlignment + " !important",
			},
		},
		{
			class: `#${uniqueId} .grid-six-container .sp-smart-post-grid-six-dynamic-contents .sp-smart-post-card-content .sp-smart-post-details`,
			styles: {
				"justify-content": smallItemContentAlignment + " !important",
			},
		},
		{
			class: `#${uniqueId} .grid-six-container .sp-smart-post-grid-six-dynamic-contents .sp-smart-post-card-content .sp-smart-post-title`,
			styles: {
				"text-align": textAlignObject[smallItemContentAlignment],
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-three .sp-smart-post-card.template-one .sp-smart-post-card-image`,
			styles: {
				width: "100%",
			},
		},
		// {
		// 	class: `#${ uniqueId } .sp-smart-post-grid-six-dynamic-contents.grid-six-layout-two .sp-smart-post-card-image, #${ uniqueId } .sp-smart-post-grid-six-dynamic-contents.grid-six-layout-three .sp-smart-post-card-image, #${ uniqueId } .sp-smart-post-grid-six-dynamic-contents.grid-six-layout-four .sp-smart-post-card-image`,
		// 	styles: {
		// 		'max-width': '50%',
		// 	},
		// },
		{
			class: `#${uniqueId} .grid-six-container .sp-smart-post-card,
			#${uniqueId} .grid-six-container .sp-smart-post-card`,
			styles: {
				margin: "0 !important",
			},
		},
		// {
		// 	class: `#${ uniqueId } .sp-smart-post-grid-six-large-contents.grid-six-layout-one .sp-smart-post-card-image,
		// #${ uniqueId }  .sp-smart-post-grid-six-large-contents.grid-six-layout-two .sp-smart-post-card-image`,
		// 	styles: {
		// 		height: "100% !important",
		// 	},
		// },
		// Metadata Large items Typography.
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-author .sp-smart-post-author-name,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-date span,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-post-show-comment span,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-view span,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like span,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-like i,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-reading-time span,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-metadata-taxonomy .sp-metadata-taxonomy-icon svg path,
			.sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-metadata-taxonomy span`,
			styles: {
				display: "flex",
				"align-items": "center",
				color: `${largeMetaColors.color} !important`,
				fill: `${largeMetaColors.color} !important`,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-one .sp-smart-post-card.template-one .sp-smart-post-card-image, #${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-two .sp-smart-post-card.template-one .sp-smart-post-card-image`,
			styles: {
				"max-width": "50% !important",
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card-content .sp-smart-post-excerpt`,
			styles: {
				color:
					excerptColor.color === ""
						? postGridLayout !== "grid-six-layout-four"
							? "#4E4F52"
							: "#DDDDDD"
						: excerptColor.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card.grid-six-layout-three .sp-smart-post-card-image img`,
			styles: {
				"max-height":
					largeItemHeight.device.Desktop === "" &&
					largeImageHeight.device.Desktop === 100 &&
					largeImageHeight.unit.Desktop === "%"
						? "350px"
						: "",
			},
		},
		{
			class: `#${uniqueId} .grid-six-container .sp-social-share-popup .sp-social-popup-icon-list:before`,
			styles: {
				"border-bottom-color": socialPopupContainerBGColor.color,
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Add Tablet styles
		const tabletCss = [...sharedTabletCss, ...responsiveCss("Tablet")];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Add Mobile styles
		const mobileCss = [
			...sharedMobileCss,
			...responsiveCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-dynamic-contents, #${uniqueId} .sp-smart-post-grid-six-large-contents`,
				styles: {
					"grid-template-columns": `repeat(${gridSixColumns.device.Mobile || 1},1fr)`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents .sp-smart-post-card`,
				styles: {
					display: "flex",
					"flex-direction": "column",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-one .sp-smart-post-card.template-one .sp-smart-post-card-image, #${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-two .sp-smart-post-card.template-one .sp-smart-post-card-image, #${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-one .sp-smart-post-card.template-one .sp-smart-post-template-one-content, #${uniqueId} .sp-smart-post-grid-six-large-contents.grid-six-layout-two .sp-smart-post-card.template-one .sp-smart-post-template-one-content`,
				styles: {
					"max-width": "100% !important",
					width: "100%",
					height: "fit-content !important",
				},
			},
			{
				class: `#${uniqueId} .grid-six-container .sp-smart-post-grid-six-large-contents`,
				styles: {
					height: "auto",
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
