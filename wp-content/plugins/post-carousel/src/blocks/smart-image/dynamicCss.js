import {
	boxCss,
	colorControls,
	objectToCssString,
	rangerCss,
	spacingGenerate,
	wrapInMediaQuery,
} from "../shared/helpFn";
const dynamicCss = (attributes) => {
	const {
		uniqueId,
		maxWidth,
		smartImageWidth,
		smartImageHeight,
		imageFocalPoint,
		smartImgBgEnable,
		smartImgBg,
		smartBgImgBorder,
		smartBgImgBorderWidth,
		smartBgImgBorderRadius,
		smartBgImgInnerPadding,
		imgTitleEnable,
		imgTitleTypography,
		imgTitleFontSize,
		imgTitleLineHeight,
		imgTitleLetterSpacing,
		imgTitleWordSpacing,
		imgCaptionEnable,
		imgCaptionTypography,
		imgCapFontSize,
		imgCapLineHeight,
		imgCapLetterSpacing,
		imgCapWordSpacing,
		imgTextColor,
		imgTextPadding,
		imageBorder,
		imageBorderWidth,
		imageBorderRadius,
		imageBoxShadowEnable,
		imageBoxShadow,
		imageBlur,
		imageBrightness,
		imageContrast,
		imageSaturation,
		imageHue,
		enableLink,
		linkType,
		linkBtnTypography,
		linkBtnFontSize,
		linkBtnLineHeight,
		linkBtnLetterSpacing,
		linkBtnWordSpacing,
		linkButtonColor,
		linkButtonBg,
		linkButtonBorder,
		linkBtnBorderWidth,
		linkBtnBorderRadius,
		linkBtnBoxShadowEnable,
		linkBtnBoxShadow,
		linkBtnPadding,
		linkBtnBorderWidthHover,
		linkBtnBorderRadiusHover,
		linkBtnBoxShadowEnableHover,
		linkBtnBoxShadowHover,
		imageShapeSet,
		maskingShapedUpload,
		maskSize,
		imgHoverOverlayEnable,
		imgHoverOverlayColor,
		aspectRatio,
		imgMaskingEnable,
		selectImageShape,
		imageFilter,
		imgHoverEffectOpacity,
	} = attributes;

	const rangeValue = (attr, deviceType = "Desktop") => {
		return attr?.device?.[deviceType];
	};
	const getMaskSvgFile = (svgName) => {
		return `${sp_smart_post_block_localize?.pluginUrl}public/assets/img/${svgName}`;
	};
	const imgBrightFilter = (deviceType) =>
		rangeValue(imageBrightness, deviceType) !== "" ? `brightness(${rangeValue(imageBrightness, deviceType)}%)` : "";
	const imgContrastFilter = (deviceType) =>
		rangeValue(imageContrast, deviceType) !== "" ? `contrast(${rangeValue(imageContrast, deviceType)}%)` : "";
	const imgSaturateFilter = (deviceType) =>
		rangeValue(imageSaturation, deviceType) !== "" ? `saturate(${rangeValue(imageSaturation, deviceType)}%)` : "";
	const imgBlurFilter = (deviceType) =>
		rangeValue(imageBlur, deviceType) !== "" ? `blur(${rangeValue(imageBlur, deviceType)}px)` : "";
	const imgHueFilter = (deviceType) =>
		rangeValue(imageHue, deviceType) !== "" ? `hue-rotate(${rangeValue(imageHue, deviceType)}deg)` : "";

	const imgFilterValue = (deviceType) => {
		const brightness = imgBrightFilter(deviceType);
		const contrastFilter = imgContrastFilter(deviceType);
		const saturateFilter = imgSaturateFilter(deviceType);
		const blurFilter = imgBlurFilter(deviceType);
		const hueFilter = imgHueFilter(deviceType);
		return `${brightness} ${contrastFilter} ${saturateFilter} ${blurFilter} ${hueFilter}`;
	};

	const smartImageResponsiveCss = (deviceType) => {
		const allResponsiveCss = [
			{
				class: `#${uniqueId} .sp-smart-post-smart-image`,
				styles: {
					"max-width": aspectRatio !== "custom" ? rangerCss(maxWidth, deviceType) : "unset",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-image-area .sp-smart-image.sp-image-ratio-custom`,
				styles: {
					width: rangerCss(smartImageWidth, deviceType),
					height: rangerCss(smartImageHeight, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-image-area .sp-smart-image`,
				styles: {
					"object-position": `${imageFocalPoint?.x * 100}% ${imageFocalPoint?.y * 100}%`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-image-wrapper .sp-smart-image-area`,
				styles: {
					padding: spacingGenerate(smartBgImgInnerPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-image-area .sp-smart-image-wrapper`,
				styles: {
					"border-width": spacingGenerate(imageBorderWidth, deviceType),
					"border-radius": spacingGenerate(imageBorderRadius, deviceType),
					"box-shadow": boxCss(imageBoxShadowEnable, deviceType, imageBoxShadow, "color"),
				},
			},
		];

		if (smartImgBgEnable) {
			allResponsiveCss.push(
				...[
					{
						class: `#${uniqueId} .sp-smart-image-wrapper .sp-smart-image-area`,
						styles: {
							"border-width": spacingGenerate(smartBgImgBorderWidth, deviceType),
							"border-radius": spacingGenerate(smartBgImgBorderRadius, deviceType),
						},
					},
				]
			);
		}
		if (imgTitleEnable) {
			allResponsiveCss.push(
				...[
					{
						class: `#${uniqueId} .sp-smart-image-title-area .sp-smart-image-title`,
						styles: {
							"font-size": rangerCss(imgTitleFontSize, deviceType),
							"line-height": rangerCss(imgTitleLineHeight, deviceType),
							"letter-spacing": rangerCss(imgTitleLetterSpacing, deviceType),
							"word-spacing": rangerCss(imgTitleWordSpacing, deviceType),
						},
					},
				]
			);
		}
		if (imgCaptionEnable) {
			allResponsiveCss.push(
				...[
					{
						class: `#${uniqueId} .sp-smart-image-caption-area .sp-smart-image-caption`,
						styles: {
							"font-size": rangerCss(imgCapFontSize, deviceType),
							"line-height": rangerCss(imgCapLineHeight, deviceType),
							"letter-spacing": rangerCss(imgCapLetterSpacing, deviceType),
							"word-spacing": rangerCss(imgCapWordSpacing, deviceType),
						},
					},
				]
			);
		}
		if (imgTitleEnable || imgCaptionEnable) {
			allResponsiveCss.push(
				...[
					{
						class: `#${uniqueId} .sp-smart-image-text-container`,
						styles: {
							padding: spacingGenerate(imgTextPadding, deviceType),
						},
					},
				]
			);
		}
		if (enableLink && "button" === linkType) {
			allResponsiveCss.push(
				...[
					{
						class: `#${uniqueId} .sp-smart-image-link-btn-wrapper .sp-smart-image-link-btn`,
						styles: {
							"font-size": rangerCss(linkBtnFontSize, deviceType),
							"line-height": rangerCss(linkBtnLineHeight, deviceType),
							"letter-spacing": rangerCss(linkBtnLetterSpacing, deviceType),
							"word-spacing": rangerCss(linkBtnWordSpacing, deviceType),
							"border-width": spacingGenerate(linkBtnBorderWidth, deviceType),
							"border-radius": spacingGenerate(linkBtnBorderRadius, deviceType),
							"box-shadow": boxCss(linkBtnBoxShadowEnable, deviceType, linkBtnBoxShadow, "color"),
							padding: spacingGenerate(linkBtnPadding, deviceType),
						},
					},
					{
						class: `#${uniqueId} .sp-smart-image-link-btn-wrapper .sp-smart-image-link-btn:hover`,
						styles: {
							"border-width": spacingGenerate(linkBtnBorderWidthHover, deviceType),
							"border-radius": spacingGenerate(linkBtnBorderRadiusHover, deviceType),
							"box-shadow": boxCss(
								linkBtnBoxShadowEnableHover,
								deviceType,
								linkBtnBoxShadowHover,
								"color"
							),
							padding: spacingGenerate(linkBtnPadding, deviceType),
						},
					},
				]
			);
		}
		if (imageFilter) {
			allResponsiveCss.push(
				...[
					{
						class: `#${uniqueId} .sp-smart-image-area .sp-smart-image-wrapper`,
						styles: {
							filter: imgFilterValue(deviceType),
						},
					},
				]
			);
		}

		return allResponsiveCss;
	};

	let desktopCss = [
		...smartImageResponsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-smart-image-area .sp-smart-image-wrapper`,
			styles: {
				"border-style": imageBorder?.style,
				"border-color": imageBorder?.color,
				// filter: imgFilterValue("Desktop"),
			},
		},
		{
			class: `#${uniqueId} .sp-smart-image-area .sp-smart-image-wrapper:hover`,
			styles: {
				"border-color": imageBorder?.hoverColor,
			},
		},
	];

	if (smartImgBgEnable) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-wrapper .sp-smart-image-area`,
					styles: {
						background: colorControls(
							smartImgBg?.color?.style,
							smartImgBg?.color?.solidColor,
							smartImgBg?.color?.gradient
						),
						"border-style": smartBgImgBorder?.style,
						"border-color": smartBgImgBorder?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-image-wrapper .sp-smart-image-area:hover`,
					styles: {
						background: colorControls(
							smartImgBg?.hover?.style,
							smartImgBg?.hover?.solidColor,
							smartImgBg?.hover?.gradient
						),
						"border-color": smartBgImgBorder?.hoverColor,
					},
				},
			]
		);
	}
	if (imgTitleEnable) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-title-area .sp-smart-image-title`,
					styles: {
						color: imgTextColor?.color,
						"font-family": imgTitleTypography?.typography?.family,
						"font-weight": imgTitleTypography?.typography?.fontWeight,
						"font-style": imgTitleTypography?.typography?.style,
						"text-transform": imgTitleTypography?.typography?.transform,
						"text-decoration": imgTitleTypography?.typography?.decoration,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-image-title-area .sp-smart-image-title:hover`,
					styles: {
						color: imgTextColor?.hover,
					},
				},
			]
		);
	}
	if (imgCaptionEnable) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-caption-area .sp-smart-image-caption`,
					styles: {
						color: imgTextColor?.color,
						"font-family": imgCaptionTypography?.typography?.family,
						"font-weight": imgCaptionTypography?.typography?.fontWeight,
						"font-style": imgCaptionTypography?.typography?.style,
						"text-transform": imgCaptionTypography?.typography?.transform,
						"text-decoration": imgCaptionTypography?.typography?.decoration,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-image-caption-area .sp-smart-image-caption:hover`,
					styles: {
						color: imgTextColor?.hover,
					},
				},
			]
		);
	}
	if (enableLink && "button" === linkType) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-link-btn-wrapper .sp-smart-image-link-btn`,
					styles: {
						"font-family": linkBtnTypography?.typography?.family,
						"font-weight": linkBtnTypography?.typography?.fontWeight,
						"font-style": linkBtnTypography?.typography?.style,
						"text-decoration": linkBtnTypography?.typography?.decoration,
						"text-transform": linkBtnTypography?.typography?.transform,
						color: linkButtonColor.color,
						background: colorControls(
							linkButtonBg?.color?.style,
							linkButtonBg?.color?.solidColor,
							linkButtonBg?.color?.gradient
						),
						"border-style": linkButtonBorder?.style,
						"border-color": linkButtonBorder?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-image-link-btn-wrapper .sp-smart-image-link-btn:hover`,
					styles: {
						color: linkButtonColor.hover,
						background: colorControls(
							linkButtonBg?.hover?.style,
							linkButtonBg?.hover?.solidColor,
							linkButtonBg?.hover?.gradient
						),
						"border-color": linkButtonBorder?.hoverColor,
					},
				},
			]
		);
	}
	if (imgMaskingEnable && "custom" === imageShapeSet && maskingShapedUpload?.hasOwnProperty("url")) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-wrapper .sp-smart-image-area.sp-custom-mask`,
					styles: {
						"mask-image": `url("${maskingShapedUpload?.url}")`,
						"mask-size": maskSize,
					},
				},
			]
		);
	}
	if (imgHoverOverlayEnable) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-area:hover .sp-hover-img-overlay`,
					styles: {
						background: colorControls(
							imgHoverOverlayColor?.color?.style,
							imgHoverOverlayColor?.color?.solidColor,
							imgHoverOverlayColor?.color?.gradient
						),
						opacity: imgHoverEffectOpacity,
					},
				},
			]
		);
	}
	if (imgMaskingEnable && imageShapeSet === "shape-set") {
		const maskImage = {
			"shape-two": `url( "${getMaskSvgFile("circle.svg")}")`,
			"shape-six": `url( "${getMaskSvgFile("blobCircle.svg")}")`,
			"shape-seven": `url( "${getMaskSvgFile("blobTriangle.svg")}")`,
		};

		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-smart-image-wrapper .sp-smart-image-area`,
					styles: {
						"mask-image": maskImage[selectImageShape],
					},
				},
			]
		);
	}

	let tabletCss = [...smartImageResponsiveCss("Tablet")];

	let mobileCss = [...smartImageResponsiveCss("Mobile")];

	const tabletMediaQueryCss = wrapInMediaQuery(objectToCssString(tabletCss), "only screen and (max-width: 1023px)");
	const mobileMediaQueryCss = wrapInMediaQuery(objectToCssString(mobileCss), "only screen and (max-width: 599px)");

	desktopCss = desktopCss.filter((item) => item.value !== "" && item.value !== " !important");
	tabletCss = tabletCss.filter((item) => item.value !== "" && item.value !== " !important");
	mobileCss = mobileCss.filter((item) => item.value !== "" && item.value !== " !important");

	return `${objectToCssString(desktopCss)} ${tabletMediaQueryCss} ${mobileMediaQueryCss}`;
};

export default dynamicCss;
