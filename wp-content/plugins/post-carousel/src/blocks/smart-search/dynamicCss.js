import { boxCss, colorControls, objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
// eslint-disable-next-line no-unused-vars
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		searchFormPreset,
		searchFormBorderRadius,
		searchFormHoverBorderRadius,
		searchFormBorderWidth,
		searchFormHoverBorderWidth,
		searchFormBorder,
		searchFormHoverBorder,
		searchFormBgColor,
		searchFormPadding,
		inputPlaceholderTypography,
		inputPlaceholderColor,
		inputPlaceholderFontSize,
		inputPlaceholderLineHeight,
		inputPlaceholderLatterSpacing,
		inputPlaceholderWordSpacing,
		searchFormWidth,
		searchFormHeight,
		searchFormAlignment,
		searchButtonPosition,
		searchIconDivider,
		searchBtnLabelFontSize,
		searchBtnLabelLineHeight,
		searchBtnLabelTypography,
		searchBtnLabelTextColor,
		gapWithIcon,
		searchButtonPadding,
		searchButtonBorder,
		searchButtonBorderRadius,
		searchBtnBgColor,
		searchButtonBorderWidth,
		searchBtnReverse,
		searchButtonIconSize,
		searchButtonIconColor,
		gapWithSearchField,
		searchIcon,
		searchIconDividerColor,
		searchButtonHoverBorder,
		searchButtonHoverBorderWidth,
		searchResultBoxWidth,
		searchResultBoxHeight,
		searchResultColumns,
		searchResultTitleFontSize,
		searchResultTitleLineHeight,
		searchResultTitleTypography,
		searchResultMetaTypography,
		searchResultMetaFontSize,
		searchResultMetaLineHeight,
		searchResultImgBorderRadius,
		searchResultImageSize,
		searchResultBoxPadding,
		searchResultMetaColor,
		searchResultItemSeparator,
		displayType,
		searchResultBoxBorderRadius,
		searchResultItemSeparatorColor,
		searchResultColumnGap,
		searchResultImageContentGap,
		searchResultDisplayType,
		globalBreakPointData,
		searchResultSpaceBetweenMeta,
		searchResultTitleColor,
		searchResultBoxBackground,
		searchResultBoxBorder,
		searchResultHoverBoxBorder,
		searchResultBoxBorderWidth,
		searchResultHoverBoxBorderWidth,
		searchResultBoxHoverBorderRadius,
		moreResultFontSize,
		moreResultLineHeight,
		moreResultLatterSpacing,
		moreResultWordSpacing,
		moreResultTypography,
		moreResultColor,
		popupCanvasPadding,
		popupCanvasBorderRadius,
		popupCanvasBgColor,
		popupCanvasBorder,
		popupCanvasHoverBorder,
		popupCanvasBoxShadowEnable,
		popupCanvasBoxShadowValue,
		popupCanvasHoverBorderWidth,
		popupCanvasBorderWidth,
		popupCanvasMargin,
		popupCanvasWidth,
		popupHeadingFontSize,
		popupHeadingLineHeight,
		popupHeadingLatterSpacing,
		popupHeadingWordSpacing,
		popupHeadingColor,
		popupHeadingTypography,
		popupHeadingAlignment,
		popupCloseBtnIconSize,
		popupHeadingGap,
		searchResultVerticalPosition,
		searchResultHorizontalPosition,
		searchResultHighlightColor,
	} = attributes;

	const searchFieldWrapper =
		"smart-search-form-preset-four" === searchFormPreset
			? "sp-smart-post-search-input-wrapper"
			: "sp-smart-post-search-form";
	const triggerClass = displayType === "popup" ? "sp-smart-post-search-trigger" : "sp-smart-post-search-wrapper";
	const popupWrapper = displayType === "popup" ? "sp-smart-post-search-wrapper" : "sp-smart-post-search-results";

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-search-form`,
				styles: {
					width: searchFormWidth?.device?.[deviceType] + searchFormWidth.unit?.[deviceType],
					height: searchFormHeight?.device?.[deviceType] + searchFormHeight.unit?.[deviceType],
					...("smart-search-form-preset-four" === searchFormPreset && {
						gap: gapWithSearchField.device?.[deviceType] + gapWithSearchField.unit?.[deviceType],
					}),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-wrapper .${searchFieldWrapper}`,
				styles: {
					"border-radius": spacingGenerate(searchFormBorderRadius, [deviceType]),
					"border-width": spacingGenerate(searchFormBorderWidth, [deviceType]) + "!important",
					padding: spacingGenerate(searchFormPadding, [deviceType]),
				},
			},
			{
				class: ` #${uniqueId} .sp-smart-post-search-wrapper .${searchFieldWrapper}:hover, #${uniqueId} .sp-smart-post-search-wrapper .${searchFieldWrapper}:focus-within`,
				styles: {
					"border-radius": spacingGenerate(searchFormHoverBorderRadius, [deviceType]),
					"border-width": spacingGenerate(searchFormHoverBorderWidth, [deviceType]) + "!important",
				},
			},
			{
				class: `
        #${uniqueId} .sp-smart-post-search-input,
        #${uniqueId} .sp-smart-post-search-input::-webkit-input-placeholder
        `,
				styles: {
					"font-size":
						inputPlaceholderFontSize?.device?.[deviceType] + inputPlaceholderFontSize?.unit?.[deviceType],
					"line-height": inputPlaceholderLineHeight?.device?.[deviceType],
					"letter-spacing":
						inputPlaceholderLatterSpacing?.device?.[deviceType] +
						inputPlaceholderLatterSpacing?.unit?.[deviceType],
					"word-spacing":
						inputPlaceholderWordSpacing?.device?.[deviceType] +
						inputPlaceholderWordSpacing?.unit?.[deviceType],
				},
			},
			{
				class: `
        #${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-button
        `,
				styles: {
					...([
						"smart-search-form-preset-three",
						"smart-search-form-preset-four",
						"smart-search-form-preset-five",
					].includes(searchFormPreset) && {
						padding: spacingGenerate(searchButtonPadding, [deviceType]),
						gap: gapWithIcon.device?.[deviceType] + gapWithIcon.unit?.[deviceType],
						"font-size":
							searchBtnLabelFontSize?.device?.[deviceType] + searchBtnLabelFontSize?.unit?.[deviceType],
						"line-height": searchBtnLabelLineHeight?.device?.[deviceType],
						"border-radius": spacingGenerate(searchButtonBorderRadius, [deviceType]),
						"border-width": spacingGenerate(searchButtonBorderWidth, [deviceType]),
					}),
				},
			},
			{
				class: `
        #${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-button:hover
        `,
				styles: {
					...([
						"smart-search-form-preset-three",
						"smart-search-form-preset-four",
						"smart-search-form-preset-five",
					].includes(searchFormPreset) && {
						"border-width": spacingGenerate(searchButtonHoverBorderWidth, [deviceType]),
					}),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-button .sp-smart-post-search-icon`,
				styles: {
					width: searchButtonIconSize?.device?.[deviceType] + searchButtonIconSize?.unit?.[deviceType],
					height: searchButtonIconSize?.device?.[deviceType] + searchButtonIconSize?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-results`,
				styles: {
					width: searchResultBoxWidth?.device?.[deviceType] + searchResultBoxWidth?.unit?.[deviceType],
					"max-height":
						searchResultBoxHeight?.device?.[deviceType] + searchResultBoxHeight?.unit?.[deviceType],
					"border-width": spacingGenerate(searchResultBoxBorderWidth, [deviceType]),
					"border-radius": spacingGenerate(searchResultBoxBorderRadius, [deviceType]),
					...(displayType === "normal" && {
						padding: spacingGenerate(searchResultBoxPadding, [deviceType]),
						"border-radius": spacingGenerate(searchResultBoxBorderRadius, [deviceType]),
					}),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-results:hover`,
				styles: {
					"border-width": spacingGenerate(searchResultHoverBoxBorderWidth, [deviceType]),
					"border-radius": spacingGenerate(searchResultBoxHoverBorderRadius, [deviceType]),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-popup`,
				styles: {
					width: popupCanvasWidth?.device?.[deviceType] + popupCanvasWidth?.unit?.[deviceType],
					padding: spacingGenerate(popupCanvasPadding, [deviceType]),
					margin: spacingGenerate(popupCanvasMargin, [deviceType]),
					"border-radius": spacingGenerate(popupCanvasBorderRadius, [deviceType]),
					"box-shadow": boxCss(popupCanvasBoxShadowEnable, [deviceType], popupCanvasBoxShadowValue, "color"),
					"border-width": spacingGenerate(popupCanvasBorderWidth, [deviceType]),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-popup:hover`,
				styles: {
					"border-width": spacingGenerate(popupCanvasHoverBorderWidth, [deviceType]),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-popup-heading`,
				styles: {
					"font-size": popupHeadingFontSize?.device?.[deviceType] + popupHeadingFontSize?.unit?.[deviceType],
					"line-height": popupHeadingLineHeight?.device?.[deviceType],
					"letter-spacing":
						popupHeadingLatterSpacing?.device?.[deviceType] + popupHeadingLatterSpacing?.unit?.[deviceType],
					"word-spacing":
						popupHeadingWordSpacing?.device?.[deviceType] + popupHeadingWordSpacing?.unit?.[deviceType],
					"margin-bottom": popupHeadingGap?.device?.[deviceType] + popupHeadingGap?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-popup-close-icon svg`,
				styles: {
					width: popupCloseBtnIconSize?.device?.[deviceType] + popupCloseBtnIconSize?.unit?.[deviceType],
					height: popupCloseBtnIconSize?.device?.[deviceType] + popupCloseBtnIconSize?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-results .sp-smart-post-search-list`,
				styles: {
					"grid-template-columns": `repeat(${searchResultColumns.device?.[deviceType]}, 1fr)`,
					"column-gap":
						searchResultColumnGap?.device?.[deviceType] + searchResultColumnGap?.unit?.[deviceType],
					"row-gap": searchResultColumnGap?.device?.[deviceType] + searchResultColumnGap?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item:first-child`,
				styles: {
					...(searchResultItemSeparator &&
						searchResultColumns?.device?.[deviceType] === 1 &&
						displayType === "normal" && {
							"padding-top": 0,
						}),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item`,
				styles: {
					gap:
						searchResultImageContentGap?.device?.[deviceType] +
						searchResultImageContentGap?.unit?.[deviceType],
					...("smart-search-result-layout-three" === searchResultDisplayType && {
						"border-radius": "4px",
						border: "1px solid rgba(0, 0, 0, 0.10)",
						background: "#FFFFFF",
						"box-shadow": "4px 4px 12px 0 rgba(0, 0, 0, 0.08)",
					}),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item:last-child`,
				styles: {
					...(searchResultItemSeparator &&
						searchResultColumns?.device?.[deviceType] === 1 && {
							"border-bottom": "none !important",
						}),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item .sp-smart-post-search-item-img img`,
				styles: {
					"border-radius": spacingGenerate(searchResultImgBorderRadius, [deviceType]),
					width:
						"smart-search-result-layout-one" === searchResultDisplayType
							? searchResultImageSize?.device?.[deviceType] + searchResultImageSize?.unit?.[deviceType]
							: "100%",
					height: searchResultImageSize?.device?.[deviceType] + searchResultImageSize?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item-title`,
				styles: {
					"font-size":
						searchResultTitleFontSize?.device?.[deviceType] + searchResultTitleFontSize?.unit?.[deviceType],
					"line-height": searchResultTitleLineHeight?.device?.[deviceType],
				},
			},
			{
				class: `
				#${uniqueId} .sp-smart-post-category a,
				#${uniqueId} .sp-smart-post-details .sp-smart-post-meta-text,
				#${uniqueId}  .sp-smart-post-excerpt
				`,
				styles: {
					"font-size":
						searchResultMetaFontSize?.device?.[deviceType] + searchResultMetaFontSize?.unit?.[deviceType],
					"line-height": searchResultMetaLineHeight?.device?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item-excerpt`,
				styles: {
					"font-size": `calc(${
						searchResultMetaFontSize?.device?.[deviceType] + searchResultMetaFontSize?.unit?.[deviceType]
					} + 2px)`,
					"line-height": searchResultMetaLineHeight?.device?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-search-item-desc`,
				styles: {
					gap: searchResultColumnGap?.device?.[deviceType] + searchResultColumnGap?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-meta-list`,
				styles: {
					gap:
						searchResultSpaceBetweenMeta?.device?.[deviceType] +
						searchResultSpaceBetweenMeta?.unit?.[deviceType],
				},
			},
			{
				class: `
        #${uniqueId} .sp-smart-post-search-load-more .sp-smart-post-search-load-more-button
        `,
				styles: {
					"font-size": moreResultFontSize?.device?.[deviceType] + moreResultFontSize?.unit?.[deviceType],
					"line-height": moreResultLineHeight?.device?.[deviceType],
					"letter-spacing":
						moreResultLatterSpacing?.device?.[deviceType] + moreResultLatterSpacing?.unit?.[deviceType],
					"word-spacing":
						moreResultWordSpacing?.device?.[deviceType] + moreResultWordSpacing?.unit?.[deviceType],
					color: moreResultColor?.color,
				},
			},
			{
				class: `
        #${uniqueId} .sp-smart-post-search-load-more .sp-smart-post-search-load-more-button:hover
        `,
				styles: {
					color: moreResultColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .${popupWrapper}`,
				styles: {
					top:
						searchResultVerticalPosition?.device?.[deviceType] +
						searchResultVerticalPosition.unit?.[deviceType],
					left:
						searchResultHorizontalPosition?.device?.[deviceType] +
						searchResultHorizontalPosition?.unit?.[deviceType],
				},
			},
			{
				class: `
				#${uniqueId} .sp-smart-post-categories .sp-smart-post-category,
				#${uniqueId} .sp-smart-post-excerpt,
				#${uniqueId} .sp-smart-post-meta
				`,
				styles: {
					"font-size":
						searchResultMetaFontSize?.device?.[deviceType] + searchResultMetaFontSize?.unit?.[deviceType],
					"line-height": searchResultMetaLineHeight?.device?.[deviceType],
				},
			},
		];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .${triggerClass}`,
			styles: {
				...(displayType === "normal" && {
					"align-items": searchFormAlignment,
				}),
				...(displayType === "popup" && {
					display: "flex",
					"justify-content":
						// eslint-disable-next-line no-nested-ternary
						searchFormAlignment === "flex-start"
							? "start"
							: searchFormAlignment === "flex-end"
								? "end"
								: "center",
				}),
			},
		},
		{
			class: `
      #${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-input-wrapper`,
			styles: {
				order: searchButtonPosition === "left" ? 2 : 1,
				...("smart-search-form-preset-one" === searchFormPreset &&
					"left" === searchButtonPosition && {
						padding: "0 6px",
					}),
			},
		},
		{
			class: `
      #${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-input,
      #${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-input:hover,
      #${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-input:focus`,
			styles: {
				...("smart-search-form-preset-four" !== searchFormPreset && {
					padding: 0,
					"background-color": "transparent",
					margin: 0,
					"border-radius": 0,
				}),
				...("smart-search-form-preset-one" === searchFormPreset &&
					"left" === searchButtonPosition && {
						padding: "0 6px",
					}),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-input::-webkit-input-placeholder`,
			styles: {
				"font-family": inputPlaceholderTypography?.typography?.family,
				"font-weight": inputPlaceholderTypography?.typography?.fontWeight,
				"font-style": inputPlaceholderTypography?.typography?.style,
				"text-transform": inputPlaceholderTypography?.typography?.transform,
				"text-decoration": inputPlaceholderTypography?.typography?.decoration,
				color: inputPlaceholderColor?.color,
			},
		},
		{
			class: `
    #${uniqueId} .sp-smart-post-search-form:hover .sp-smart-post-search-input::-webkit-input-placeholder,
    #${uniqueId} .sp-smart-post-search-form:focus-within .sp-smart-post-search-input::-webkit-input-placeholder
  `,
			styles: {
				color: inputPlaceholderColor?.hoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-wrapper .${searchFieldWrapper}`,
			styles: {
				background: colorControls(
					searchFormBgColor?.color?.style,
					searchFormBgColor?.color?.solidColor,
					searchFormBgColor?.color?.gradient
				),
				"border-style": searchFormBorder.style,
				"border-color": searchFormBorder.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-wrapper .${searchFieldWrapper}:hover, #${uniqueId} .sp-smart-post-search-wrapper .${searchFieldWrapper}:focus-within`,
			styles: {
				background: colorControls(
					searchFormBgColor?.hover?.style,
					searchFormBgColor?.hover?.solidColor,
					searchFormBgColor?.hover?.gradient
				),
				"border-style": searchFormHoverBorder.style,
				"border-color": searchFormHoverBorder.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-button`,
			styles: {
				order: searchButtonPosition === "left" ? 1 : 2,
				...(["smart-search-form-preset-one", "smart-search-form-preset-two"].includes(searchFormPreset) && {
					border: "none",
					background: "transparent",
					padding: 0,
					[`padding-${searchButtonPosition === "right" ? "left" : "right"}`]: `6px`,
				}),
				...(searchIconDivider &&
					"smart-search-form-preset-one" === searchFormPreset &&
					searchIcon && {
						[`border-${searchButtonPosition === "right" ? "left" : "right"}`]: `1px solid ${searchIconDividerColor?.color}`,
					}),
				...([
					"smart-search-form-preset-three",
					"smart-search-form-preset-four",
					"smart-search-form-preset-five",
				].includes(searchFormPreset) && {
					"flex-direction": searchBtnReverse ? "row-reverse" : "row",
					background: colorControls(
						searchBtnBgColor?.color?.style,
						searchBtnBgColor?.color?.solidColor,
						searchBtnBgColor?.color?.gradient
					),
					"border-style": searchButtonBorder.style,
					"border-color": searchButtonBorder.color,
					"font-family": searchBtnLabelTypography?.typography?.family,
					"font-weight": searchBtnLabelTypography?.typography?.fontWeight,
					"font-style": searchBtnLabelTypography?.typography?.style,
					"text-transform": searchBtnLabelTypography?.typography?.transform,
					"text-decoration": searchBtnLabelTypography?.typography?.decoration,
					color: searchBtnLabelTextColor?.color,
					transition: "all .3s ease",
				}),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-button:hover`,
			styles: {
				...([
					"smart-search-form-preset-three",
					"smart-search-form-preset-four",
					"smart-search-form-preset-five",
				].includes(searchFormPreset) && {
					background: colorControls(
						searchBtnBgColor?.hover?.style,
						searchBtnBgColor?.hover?.solidColor,
						searchBtnBgColor?.hover?.gradient
					),
					color: searchBtnLabelTextColor?.hoverColor,
					"border-style": searchButtonHoverBorder.style,
					"border-color": searchButtonHoverBorder.color,
					...(searchIconDivider &&
						"smart-search-form-preset-one" === searchFormPreset &&
						searchIcon && {
							[`border-${searchButtonPosition === "right" ? "left" : "right"}`]: `1px solid ${searchIconDividerColor.hoverColor}`,
						}),
				}),
			},
		},
		{
			class: `#${uniqueId}  .sp-smart-post-search-button .sp-smart-post-search-icon`,
			styles: {
				color: searchButtonIconColor?.color,
			},
		},
		{
			class: `#${uniqueId}  .sp-smart-post-search-button:hover .sp-smart-post-search-icon`,
			styles: {
				color: searchButtonIconColor?.hoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-form .sp-smart-post-search-icon`,
			styles: {},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-popup`,
			styles: {
				background: colorControls(
					popupCanvasBgColor?.color?.style,
					popupCanvasBgColor?.color?.solidColor,
					popupCanvasBgColor?.color?.gradient
				),
				"border-style": popupCanvasBorder.style,
				"border-color": popupCanvasBorder.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-popup.sp-smart-post-search-popup--active`,
			styles: {
				...(searchResultDisplayType === "smart-search-result-layout-three" && {
					position: "fixed",
				}),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-popup:hover`,
			styles: {
				background: colorControls(
					popupCanvasBgColor?.hover?.style,
					popupCanvasBgColor?.hover?.solidColor,
					popupCanvasBgColor?.hover?.gradient
				),
				"border-style": popupCanvasHoverBorder?.style,
				"border-color": popupCanvasHoverBorder?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-popup-heading`,
			styles: {
				"font-family": popupHeadingTypography?.typography?.family,
				"font-weight": popupHeadingTypography?.typography?.fontWeight,
				"font-style": popupHeadingTypography?.typography?.style,
				"text-transform": popupHeadingTypography?.typography?.transform,
				"text-decoration": popupHeadingTypography?.typography?.decoration,
				color: popupHeadingColor?.color,
				"text-align": popupHeadingAlignment,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-popup-heading:hover`,
			styles: {
				color: popupHeadingColor?.hoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-results`,
			styles: {
				background: colorControls(
					searchResultBoxBackground?.color?.style,
					searchResultBoxBackground?.color?.solidColor,
					searchResultBoxBackground?.color?.gradient
				),
				"border-style": searchResultBoxBorder.style,
				"border-color": searchResultBoxBorder.color,
				...(displayType === "normal" && {
					"box-shadow": "0 4px 6px 0 rgba(0, 0, 0, 0.1)",
				}),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-results:hover`,
			styles: {
				background: colorControls(
					searchResultBoxBackground?.hover?.style,
					searchResultBoxBackground?.hover?.solidColor,
					searchResultBoxBackground?.hover?.gradient
				),
				"border-style": searchResultHoverBoxBorder?.style,
				"border-color": searchResultHoverBoxBorder?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-item`,
			styles: {
				...(searchResultDisplayType === "smart-search-result-layout-three" && {
					"flex-direction": "column",
				}),
				...(searchResultDisplayType !== "smart-search-result-layout-three" && {
					"padding-bottom": "15px",
				}),
				...(searchResultItemSeparator &&
					"smart-search-result-layout-three" !== searchResultDisplayType && {
						"border-bottom": `1px solid ${searchResultItemSeparatorColor?.color}`,
						"padding-top": "15px",
					}),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-item-desc`,
			styles: {
				...("smart-search-result-layout-three" === searchResultDisplayType && {
					padding: "0px 8px 16px 8px",
				}),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-item-title`,
			styles: {
				"font-family": searchResultTitleTypography?.typography?.family,
				"font-weight": searchResultTitleTypography?.typography?.fontWeight,
				"font-style": searchResultTitleTypography?.typography?.style,
				"text-transform": searchResultTitleTypography?.typography?.transform,
				"text-decoration": searchResultTitleTypography?.typography?.decoration,
				color: searchResultTitleColor?.color,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-search-item-title:hover`,
			styles: {
				color: searchResultTitleColor?.hoverColor,
			},
		},
		{
			class: `
		#${uniqueId} .sp-smart-post-category,
		#${uniqueId} .sp-smart-post-meta,
		#${uniqueId}  .sp-smart-post-excerpt
      `,
			styles: {
				margin: 0,
				"font-family": searchResultMetaTypography?.typography?.family,
				"font-weight": searchResultMetaTypography?.typography?.fontWeight,
				"font-style": searchResultMetaTypography?.typography?.style,
				"text-transform": searchResultMetaTypography?.typography?.transform,
				"text-decoration": searchResultMetaTypography?.typography?.decoration,
			},
		},
		{
			class: `
			#${uniqueId} .sp-smart-post-meta-list .sp-smart-post-meta,
			#${uniqueId} .sp-smart-post-excerpt,
			#${uniqueId} .sp-smart-post-category
			`,
			styles: {
				color: searchResultMetaColor?.color,
			},
		},
		{
			class: `
			#${uniqueId} .sp-smart-post-meta-list .sp-smart-post-meta:hover,
			#${uniqueId} .sp-smart-post-excerpt:hover,
			#${uniqueId} .sp-smart-post-category:hover
			`,
			styles: {
				color: searchResultMetaColor?.hoverColor,
			},
		},
		{
			class: `
        #${uniqueId} .sp-smart-post-search-load-more .sp-smart-post-search-load-more-button
        `,
			styles: {
				"font-family": moreResultTypography?.typography?.family,
				"font-weight": moreResultTypography?.typography?.fontWeight,
				"font-style": moreResultTypography?.typography?.style,
				"text-transform": moreResultTypography?.typography?.transform,
				"text-decoration": moreResultTypography?.typography?.decoration,
			},
		},
		{
			class: `
				#${uniqueId} .sp-smart-post-categories .sp-smart-post-category,
				#${uniqueId} .sp-smart-post-excerpt,
				#${uniqueId} .sp-smart-post-meta
				`,
			styles: {
				"font-family": searchResultMetaTypography?.typography?.family,
				"font-weight": searchResultMetaTypography?.typography?.fontWeight,
				"font-style": searchResultMetaTypography?.typography?.style,
				"text-transform": searchResultMetaTypography?.typography?.transform,
				"text-decoration": searchResultMetaTypography?.typography?.decoration,
			},
		},
		{
			class: `
				#${uniqueId} mark.sp-smart-post-search-highlight
				`,
			styles: {
				color: searchResultHighlightColor?.color,
			},
		},
		{
			class: `
				#${uniqueId} mark.sp-smart-post-search-highlight:hover
				`,
			styles: {
				color: searchResultHighlightColor?.hoverColor,
			},
		},
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
