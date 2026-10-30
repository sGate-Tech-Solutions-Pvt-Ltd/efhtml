import { boxCss, colorControls, objectToCssString, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		layout,
		height,
		columns,
		columnGap,
		rowGap,
		dividerBorderStyle,
		dividerBg,
		dividerWidth,
		titleTypography,
		titleMargin,
		titleColor,
		titleLineHeight,
		titleLatterSpacing,
		titleFontSize,
		postCardBg,
		postCardBorder,
		postCardBorderWidth,
		postCardBorderRadius,
		postCardBoxShadowEnable,
		postCardBoxShadow,
		contentAreaMargin,
		postCardPadding,
		counterHeight,
		counterWidth,
		counterTypography,
		counterLineHeight,
		counterLatterSpacing,
		counterFontSize,
		counterColor,
		counterCardBg,
		counterBorderWidth,
		counterBorder,
		counterBorderRadius,
		counterBoxShadowEnable,
		counterBoxShadow,
		postCardHoverBoxShadow,
		postCardHoverBoxShadowEnable,
		postCardHoverBorderRadius,
		postCardHoverBorderWidth,
		postCardHoverBorder,
		counterHoverBoxShadow,
		counterHoverBoxShadowEnable,
		counterHoverBorderRadius,
		counterHoverBorderWidth,
		counterHoverBorder,
		displayOverlyThum,
		displayOverlyHoverThum,
		contentHorizontalPosition,
		excerptShow,
		excerptMargin,
		excerptLineHeight,
		excerptLatterSpacing,
		excerptFontSize,
		excerptWordSpacing,
		excerptTypography,
		excerptColor,
		taxonomyImageHeight,
		taxonomyImageWidth,
		imageSize,
		imageOverlayCustom,
		hoverOpacityEffect,
		grayscaleMode,
		grayscaleOnHover,
		originalOnHover,
		brightnessEffect,
		blurEffect,
		brightnessEffectHover,
		blurEffectHover,
		imageBorderRadius,
		imageBorderWidth,
		imageBorder,
		imageBorderHover,
		imageBorderWidthHover,
		imageBorderRadiusHover,
		counterMultiColorBg,
		contentVerticalPosition,
		contentAreaBg,
		catRadius,
		titleCounterGap,
		dividerAlignment,
		dividerThickness,
		titleWordSpacing,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		globalBreakPointData,
		showHideDivider,
	} = attributes;

	const rangerCss = (attr, device = "Desktop") => {
		const updateUnit = attr?.unit?.[device] ?? "";

		return `${attr?.device?.[device]}${updateUnit}`;
	};

	const typographyCss = (attr) => {
		return {
			"font-family": attr.typography.family,
			"font-weight": attr.typography.fontWeight,
			"font-style": attr.typography.style,
			"text-decoration": attr.typography.decoration,
			"text-transform": attr.typography.transform,
		};
	};

	const getJustifyContent = () => {
		switch (layout) {
			case "taxonomy-layout-two":
				return "space-between";
			case "taxonomy-layout-four":
			case "taxonomy-layout-seven":
				return "center";
			case "taxonomy-layout-eight":
				return "space-evenly";
			default:
				return "space-between";
		}
	};

	const layoutSixMargin = (width, device) => {
		return width.device?.[device].top;
	};

	function getBoxSpacingStyles(spacingObj, deviceType, property = "margin") {
		if (!spacingObj?.device?.[deviceType] || !spacingObj?.unit?.[deviceType]) {
			return {};
		}

		const units = spacingObj.unit?.[deviceType];
		const values = spacingObj.device?.[deviceType];

		return {
			[`${property}-top`]: `${values.top ?? 0}${units}`,
			[`${property}-right`]: `${values.right ?? 0}${units}`,
			[`${property}-bottom`]: `${values.bottom ?? 0}${units}`,
			[`${property}-left`]: `${values.left ?? 0}${units}`,
		};
	}

	const justifyContentValue = getJustifyContent(layout);

	const taxonomyResponsiveCss = (deviceType) => {
		const marginStyles = getBoxSpacingStyles(contentAreaMargin, deviceType, "margin");
		const paddingStyles = getBoxSpacingStyles(postCardPadding, deviceType, "padding");

		const titleMarginStyles = getBoxSpacingStyles(titleMargin, deviceType, "margin");

		const excerptMarginStyles = getBoxSpacingStyles(excerptMargin, deviceType, "margin");

		const getBorderStyles = () => {
			const borderWidth = rangerCss(dividerThickness, deviceType);

			switch (dividerBg.color.style) {
				case "transparent":
					return {
						"border-bottom": `${borderWidth} ${dividerBorderStyle} transparent`,
					};

				case "gradient":
					return {
						"border-bottom": `${borderWidth} ${dividerBorderStyle} transparent`,
						"border-image": `${colorControls(
							dividerBg.color.style,
							dividerBg.color.solidColor,
							dividerBg.color.gradient
						)} 1`,
					};

				default:
					return {
						"border-bottom": `${borderWidth} ${dividerBorderStyle}  ${dividerBg.color.solidColor}`,
					};
			}
		};

		const allResponsiveCss = [
			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render`,
				styles: {
					"margin-left": "1px",
					"box-sizing": "border-box",
					display: [
						"taxonomy-layout-one",
						"taxonomy-layout-two",
						"taxonomy-layout-three",
						"taxonomy-layout-five",
						"taxonomy-layout-six",
						"taxonomy-layout-seven",
						"taxonomy-layout-four",
						"taxonomy-layout-eight",
					].includes(layout)
						? "grid"
						: "flex",
					"grid-template-columns": [
						"taxonomy-layout-one",
						"taxonomy-layout-two",
						"taxonomy-layout-three",
						"taxonomy-layout-four",
						"taxonomy-layout-five",
						"taxonomy-layout-six",
						"taxonomy-layout-seven",
						"taxonomy-layout-eight",
					].includes(layout)
						? `repeat(${columns?.device?.[deviceType]}, 1fr)`
						: "none",

					"column-gap": rangerCss(columnGap, deviceType),

					"row-gap": rangerCss(rowGap, deviceType),

					width: "100%",
					"flex-direction": "column",
					"justify-content": "center",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info-overlay`,
				styles: {
					position: "relative",
					width: "213.158px",
					height: "142.105px",
					"flex-shrink": "0",
					"aspect-ratio": "213.16 / 142.11",
					"background-size": "cover",
					"background-position": "center",
					"background-repeat": "no-repeat",
					overflow: "hidden",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info`,
				styles: {
					display: "flex",
					width: layout !== "taxonomy-layout-six" && "inherit",
					gap: layout === "taxonomy-layout-three" && rangerCss(titleCounterGap, deviceType),

					height:
						layout === "taxonomy-layout-five" || layout === "taxonomy-layout-six"
							? // ||layout === "taxonomy-layout-seven"
								""
							: rangerCss(height, deviceType),
					"justify-content": [
						"taxonomy-layout-four",
						"taxonomy-layout-seven",
						"taxonomy-layout-eight",
					].includes(layout)
						? contentHorizontalPosition
						: justifyContentValue,
					"align-items": ["taxonomy-layout-seven"].includes(layout) ? contentVerticalPosition : "center",

					"margin-bottom": `-${layoutSixMargin(postCardBorderWidth, deviceType)}px`,
					"margin-right": `-${layoutSixMargin(postCardBorderWidth, deviceType)}px`,
					"box-sizing": "border-box",
					"border-radius": spacingGenerate(postCardBorderRadius, deviceType),

					"border-style": postCardBorder.style,
					"border-color": postCardBorder.color,
					"border-width": spacingGenerate(postCardBorderWidth, deviceType),

					...(!displayOverlyThum && {
						background: colorControls(
							postCardBg.color.style,
							postCardBg.color.solidColor,
							postCardBg.color.gradient
						),
					}),
					"box-shadow": boxCss(postCardBoxShadowEnable, deviceType, postCardBoxShadow, "color"),

					...paddingStyles,

					...(layout !== "taxonomy-layout-six" ? marginStyles : {}),
					position: "relative",
					transition: "all 0.8s ease-in-out",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info-layout-one::after`,
				styles: {
					content: "''",
					position: "absolute",
					bottom: "0",
					...(dividerAlignment === "center" && {
						left: "50%",
						transform: "translateX(-50%)",
					}),
					...(dividerAlignment === "left" && {
						left: "0",
						transform: "none",
					}),
					...(dividerAlignment === "right" && {
						right: "0",
						transform: "none",
					}),
					width: rangerCss(dividerWidth, deviceType),
					...getBorderStyles(),

					background: "none",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info:hover`,
				styles: {
					...(!displayOverlyHoverThum && {
						background: colorControls(
							postCardBg.hover.style,
							postCardBg.hover.solidColor,
							postCardBg.hover.gradient
						),
					}),

					"z-index": "1",
					"box-shadow": boxCss(postCardHoverBoxShadowEnable, deviceType, postCardHoverBoxShadow, "color"),

					"margin-bottom": `-${layoutSixMargin(postCardHoverBorderWidth, deviceType)}px`,
					"margin-right": `-${layoutSixMargin(postCardHoverBorderWidth, deviceType)}px`,
					"box-sizing": "border-box",

					// ...(layout !== "taxonomy-layout-one"  && {
					...((layout !== "taxonomy-layout-one" || !showHideDivider) && {
						"border-style": postCardHoverBorder.style,
						"border-color": postCardHoverBorder.color,
						"border-width": spacingGenerate(postCardHoverBorderWidth, deviceType),
						"border-radius": spacingGenerate(postCardHoverBorderRadius, deviceType),
					}),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-name`,
				styles: {
					color: titleColor?.color,

					width:
						// eslint-disable-next-line no-nested-ternary
						layout === "taxonomy-layout-three"
							? "80%"
							: ["taxonomy-layout-five", "taxonomy-layout-six"].includes(layout)
								? "100%"
								: "",

					"justify-content":
						["taxonomy-layout-five", "taxonomy-layout-six"].includes(layout) && contentHorizontalPosition,

					display: excerptShow ? "grid" : "flex",
					"align-items": "center",
					"margin-left": ["taxonomy-layout-three", "taxonomy-layout-one"].includes(layout) ? "0px" : "10px",
					"margin-right": layout === "taxonomy-layout-three" ? "0px" : "10px",
					margin: layout === "taxonomy-layout-three" && "unset",
					height: layout === "taxonomy-layout-three" && rangerCss(height, deviceType),
					...(["taxonomy-layout-eight", "taxonomy-layout-four"].includes(layout) && {
						"justify-content": "center",

						background: colorControls(
							contentAreaBg.color.style,
							contentAreaBg.color.solidColor,
							contentAreaBg.color.gradient
						),

						"border-radius": spacingGenerate(catRadius, deviceType),
					}),

					padding: layout !== "taxonomy-layout-one" ? "10px 20px" : "",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-name div`,
				styles: {
					display: "flex",
					"align-items": "center",
					// 'justify-content': 'center',
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-layout-five-six-img`,
				styles: {
					width: imageSize === "custom" ? rangerCss(taxonomyImageWidth, deviceType) : "",
					height: imageSize === "custom" ? rangerCss(taxonomyImageHeight, deviceType) : "",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info .sp-smart-post-taxonomy-name .sps-taxonomy-title-name`,
				styles: {
					width: layout === "taxonomy-layout-three" ? "80%" : "",
					"z-index": "2",

					...typographyCss(titleTypography),
					"font-size": rangerCss(titleFontSize, deviceType),
					"line-height": titleLineHeight?.device?.[deviceType],
					"letter-spacing": rangerCss(titleLatterSpacing),
					"word-spacing": rangerCss(titleWordSpacing),
					color: titleColor?.color,
					...titleMarginStyles,
					transition: "color 0.3s ease",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info:hover .sp-smart-post-taxonomy-name .sps-taxonomy-title-name`,
				styles: {
					color: titleColor?.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info:hover .sp-smart-post-taxonomy-name`,
				styles: {
					color: titleColor?.hoverColor,
				},
			},

			...(layout === "taxonomy-layout-four"
				? [
						{
							class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-count`,
							styles: {
								position: "absolute",
								right: "-11px",
								top: "-13px",
								background: "#2F2F2F",
								"border-radius": "50%",
								padding: `${rangerCss(counterHeight, deviceType)} ${rangerCss(
									counterWidth,
									deviceType
								)}`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-name`,
							styles: {
								position: "relative",
								"z-index": "1",
								padding: "8px 14px",

								margin: "0px 15px",
							},
						},
					]
				: [
						{
							class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-count`,
							styles: {
								display: layout === "taxonomy-layout-seven" ? "inline-table" : "flex",
								padding: ![
									"taxonomy-layout-eight",
									"taxonomy-layout-five",
									"taxonomy-layout-six",
								].includes(layout)
									? "8px 10px"
									: "0px 0px 0px 5px",
								"flex-direction": "column",
								"justify-content": "center",
								"align-items": "center",
								gap: "8px",
								"flex-shrink": "0",
								background:
									!counterMultiColorBg &&
									colorControls(
										counterCardBg.color.style,
										counterCardBg.color.solidColor,
										counterCardBg.color.gradient
									),
								color: "#ffebee",
								width:
									!["taxonomy-layout-eight", "taxonomy-layout-five", "taxonomy-layout-six"].includes(
										layout
									) && rangerCss(counterWidth, deviceType),
								height:
									!["taxonomy-layout-eight", "taxonomy-layout-five", "taxonomy-layout-six"].includes(
										layout
									) && rangerCss(counterHeight, deviceType),
								"border-style": counterBorder.style,
								"border-color": counterBorder.color,
								"border-width": spacingGenerate(counterBorderWidth, deviceType),
								"border-radius": spacingGenerate(counterBorderRadius, deviceType),
								"box-shadow": boxCss(counterBoxShadowEnable, deviceType, counterBoxShadow, "color"),
								"margin-right": ![
									"taxonomy-layout-three",
									"taxonomy-layout-eight",
									"taxonomy-layout-five",
									"taxonomy-layout-six",
									"taxonomy-layout-one",
								].includes(layout)
									? "25px"
									: "",
							},
						},
					]),

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-count:hover`,
				styles: {
					background: colorControls(
						counterCardBg.hover.style,
						counterCardBg.hover.solidColor,
						counterCardBg.hover.gradient
					),

					"border-style": counterHoverBorder.style,
					"border-color": counterHoverBorder.color,
					"border-width": spacingGenerate(counterHoverBorderWidth, deviceType),
					"border-radius": spacingGenerate(counterHoverBorderRadius, deviceType),

					"box-shadow": boxCss(counterHoverBoxShadowEnable, deviceType, counterHoverBoxShadow, "color"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-count span`,
				styles: {
					color: counterColor?.color,
					"text-align": "right",
					...typographyCss(counterTypography),
					"font-size": rangerCss(counterFontSize, deviceType),
					"line-height": counterLineHeight?.device?.[deviceType],
					"letter-spacing": rangerCss(counterLatterSpacing),
					transition: "color 0.3s ease",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-info:hover .sp-smart-post-taxonomy-count span`,
				styles: {
					color: counterColor?.hoverColor,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-layout-five-six`,
				styles: {
					"flex-direction": "column",

					...(layout === "taxonomy-layout-six" && {
						"border-width": spacingGenerate(postCardBorderWidth, deviceType),
					}),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-taxonomy-no-results`,
				styles: {
					"text-align": "center",
					color: "#666",
					padding: "1rem",
					"font-style": "italic",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-taxonomy-name,.sp-smart-post-taxonomy-count`,
				styles: {
					position: "relative",
					"z-index": "1",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-layout-five-six-img-div`,
				styles: {
					height: "180px",
					"align-self": "stretch",
					position: "relative",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .sp-smart-post-card .sp-smart-post-card-image.img-opacity img`,
				styles: {
					opacity: hoverOpacityEffect,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-layout-five-six-img-div img`,
				styles: {
					width: imageSize !== "custom" ? "100%" : "",
					height: imageSize !== "custom" ? "180px" : "",
					"object-fit": "cover",
					display: "block",
					filter: `blur(${rangerCss(blurEffect, deviceType)}) brightness(${
						brightnessEffect?.device?.[deviceType]
					}) ${grayscaleMode === "grayscale" ? "grayscale(100%)" : "grayscale(0%)"}`,

					"border-style": imageBorder.style,
					"border-color": imageBorder.color,
					"border-width": spacingGenerate(imageBorderWidth, deviceType),
					"border-radius": spacingGenerate(imageBorderRadius, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-layout-five-six-img-div:hover img`,
				styles: {
					filter: `blur(${rangerCss(blurEffectHover, deviceType)}) brightness(${
						brightnessEffectHover?.device?.[deviceType]
					}) ${
						// eslint-disable-next-line no-nested-ternary
						grayscaleMode === "original" && grayscaleOnHover
							? "grayscale(100%)"
							: grayscaleMode === "grayscale" && !originalOnHover
								? "grayscale(100%)"
								: ""
					}`,

					"border-style": imageBorderHover.hoverStyle,
					"border-color": imageBorderHover.hoverColor,
					"border-width": spacingGenerate(imageBorderWidthHover, deviceType),
					"border-radius": spacingGenerate(imageBorderRadiusHover, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .overlay-custom`,
				styles: {
					background: imageOverlayCustom,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-excerpt`,
				styles: {
					...typographyCss(excerptTypography),
					"font-size": rangerCss(excerptFontSize, deviceType),
					"word-spacing": rangerCss(excerptWordSpacing),
					"line-height": excerptLineHeight?.device?.[deviceType],
					"letter-spacing": rangerCss(excerptLatterSpacing),
					color: excerptColor?.color,
					...excerptMarginStyles,
					"z-index": "2",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-excerpt:hover`,
				styles: {
					color: excerptColor?.hoverColor,
				},
			},
		];

		return allResponsiveCss;
	};

	const desktopCss = [
		...taxonomyResponsiveCss("Desktop")
	];
	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...taxonomyResponsiveCss("Tablet")
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...taxonomyResponsiveCss("Mobile"),
			{
				class: `#${uniqueId} .sp-smart-post-taxonomy-render .taxonomy-hide-post-text`,
				styles: {
					display: "none",
				},
			}
		];

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}
	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;
