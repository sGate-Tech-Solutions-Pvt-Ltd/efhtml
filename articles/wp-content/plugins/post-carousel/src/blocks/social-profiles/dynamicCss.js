import {
	boxCss,
	checkInArray,
	colorControls,
	objectToCssString,
	removeEmptyCss,
	spacingGenerate,
	wrapInMediaQuery,
} from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		socialVerticalGap,
		socialHorizontalGap,
		layout,
		columns,
		socialLabelPosition,
		socialLabelEnable,
		socialLabelGap,
		socialSubTextEnable,
		socialSubTextGap,
		socialIconSize,
		socialIconBGSize,
		socialIconCustomColorEnable,
		socialIconColor,
		socialIconBg,
		socialLabelColor,
		socialSubTextColor,
		socialIconBorder,
		socialIconBorderWidth,
		socialIconBorderRadius,
		socialIconBorderHover,
		socialIconBorderWidthHover,
		socialIconBorderRadiusHover,
		socialIconMargin,
		socialLabelTypography,
		socialSubTextTypography,
		socialLabelFontSize,
		socialLabelLetterSpacing,
		socialLabelLineHeight,
		socialSubTextFontSize,
		socialSubTextLetterSpacing,
		socialSubTextLineHeight,
		socialIconBoxShadowEnable,
		socialIconBoxShadowValue,
		socialIconBoxShadowHoverEnable,
		socialIconBoxShadowHoverValue,
		socialContentAreaBG,
		socialContentAreaBorder,
		socialContentAreaBorderHover,
		socialContentAreaBorderWidth,
		socialContentAreaBorderRadius,
		socialContentAreaShadowEnable,
		socialContentAreaShadow,
		socialContentAreaPadding,
		socialContentAreaMargin,
		socialContentAreaBorderWidthHover,
		socialContentAreaBorderRadiusHover,
		socialContentAreaShadowHoverEnable,
		socialContentAreaShadowHover,
		socialIconDividerColor,
		// socialContentAreaBgBlur,
		socialLabelWordSpacing,
		socialSubTextWordSpacing,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		globalBreakPointData,
	} = attributes;

	const layoutGridTemplate = ["social-profiles-layout-one", "social-profiles-layout-two"].includes(layout)
		? "auto"
		: "1fr";

	const responsiveCss = (deviceType) => {
		let responsiveStyle;
		responsiveStyle = [
			{
				class: `#${uniqueId} .sp-social-profile-item-icon-wrapper`,
				styles: {
					width: socialIconBGSize.device?.[deviceType] + socialIconBGSize.unit?.[deviceType],
					height: socialIconBGSize.device?.[deviceType] + socialIconBGSize.unit?.[deviceType],
					"border-width": spacingGenerate(socialIconBorderWidth, [deviceType]),
					"border-radius": spacingGenerate(socialIconBorderRadius, [deviceType]),
					"box-shadow": boxCss(socialIconBoxShadowEnable, [deviceType], socialIconBoxShadowValue, "color"),
					"margin-top": socialIconMargin?.device?.[deviceType]?.top + socialIconMargin?.unit?.[deviceType],
					"margin-right":
						socialIconMargin?.device?.[deviceType]?.right + socialIconMargin?.unit?.[deviceType],
					"margin-bottom":
						socialIconMargin?.device?.[deviceType]?.bottom + socialIconMargin?.unit?.[deviceType],
					"margin-left": socialIconMargin?.device?.[deviceType]?.left + socialIconMargin?.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-social-profile-item-wrapper .sp-social-profile-item .sp-social-profile-item-icon i::before`,
				styles: {
					"font-size": socialIconSize.device?.[deviceType] + socialIconSize.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-social-profile-item-icon-wrapper:hover`,
				styles: {
					"box-shadow": boxCss(
						socialIconBoxShadowHoverEnable,
						[deviceType],
						socialIconBoxShadowHoverValue,
						"color"
					),
					"border-width": spacingGenerate(socialIconBorderWidthHover, [deviceType]),
					"border-radius": spacingGenerate(socialIconBorderRadiusHover, [deviceType]),
				},
			},
			// Social Label
			{
				class: `#${uniqueId} .sp-social-profile-item-label`,
				styles: {
					"font-size": socialLabelFontSize.device?.[deviceType] + socialLabelFontSize.unit?.[deviceType],
					"line-height": socialLabelLineHeight.device?.[deviceType],
					"letter-spacing":
						socialLabelLetterSpacing.device?.[deviceType] + socialLabelLetterSpacing.unit?.[deviceType],
					"word-spacing":
						socialLabelWordSpacing.device?.[deviceType] + socialLabelWordSpacing.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-social-profile-item-sub-text`,
				styles: {
					"font-size": socialSubTextFontSize.device?.[deviceType] + socialSubTextFontSize.unit?.[deviceType],
					"line-height": socialSubTextLineHeight.device?.[deviceType],
					"letter-spacing":
						socialSubTextLetterSpacing.device?.[deviceType] + socialSubTextLetterSpacing.unit?.[deviceType],
					"word-spacing":
						socialSubTextWordSpacing.device?.[deviceType] + socialSubTextWordSpacing.unit?.[deviceType],
				},
			},
			{
				class: `#${uniqueId} .sp-social-profile-item-container .sp-social-profile-item-wrapper`,
				styles: {
					"border-width": spacingGenerate(socialContentAreaBorderWidth, [deviceType]),
					"border-radius": spacingGenerate(socialContentAreaBorderRadius, [deviceType]),
					"box-shadow": boxCss(socialContentAreaShadowEnable, [deviceType], socialContentAreaShadow, "color"),
					padding: spacingGenerate(socialContentAreaPadding, [deviceType]),
					margin: spacingGenerate(socialContentAreaMargin, [deviceType]),
				},
			},
			{
				class: `#${uniqueId} .sp-social-profile-item-container:hover .sp-social-profile-item-wrapper`,
				styles: {
					"border-width": spacingGenerate(socialContentAreaBorderWidthHover, [deviceType]),
					"border-radius": spacingGenerate(socialContentAreaBorderRadiusHover, [deviceType]),
					"box-shadow": boxCss(
						socialContentAreaShadowHoverEnable,
						[deviceType],
						socialContentAreaShadowHover,
						"color"
					),
				},
			},
			{
				class: `#${uniqueId} .sp-social-profile-item-container .sp-social-profile-icon-divider`,
				styles: {
					height: socialIconBGSize.device?.[deviceType] * 0.75 + socialIconBGSize.unit?.[deviceType],
				},
			},
		];
		if ("social-profiles-layout-five" === layout) {
			responsiveStyle.push(
				...[
					{
						class: `#${uniqueId} .sp-social-profile-item-container`,
						styles: {
							"margin-right": `-${
								socialContentAreaBorderWidth?.device?.[deviceType]?.right +
								socialContentAreaBorderWidth?.unit?.[deviceType]
							}`,
							"margin-bottom": `-${
								socialContentAreaBorderWidth?.device?.[deviceType]?.bottom +
								socialContentAreaBorderWidth?.unit?.[deviceType]
							}`,
						},
					},
				]
			);
		}
		if (page === "editor") {
			responsiveStyle.push(
				...[
					{
						class: `#${uniqueId} .block-editor-block-list__layout`,
						styles: {
							"column-gap":
								layout !== "social-profiles-layout-five"
									? socialHorizontalGap.device?.[deviceType] + socialHorizontalGap.unit?.[deviceType]
									: "0",
							"row-gap":
								layout !== "social-profiles-layout-five"
									? socialVerticalGap.device?.[deviceType] + socialVerticalGap.unit?.[deviceType]
									: "0",
							"grid-template-columns": `repeat(${columns.device?.[deviceType]}, ${layoutGridTemplate})`,
						},
					},
				]
			);
		}
		if (page !== "editor") {
			responsiveStyle.push(
				...[
					{
						class: `#${uniqueId} .sp-social-profile-wrapper.${layout} .sp-social-profile-wrapper-grid-class`,
						styles: {
							"column-gap":
								layout !== "social-profiles-layout-five"
									? socialHorizontalGap.device?.[deviceType] + socialHorizontalGap.unit?.[deviceType]
									: "0",
							"row-gap":
								layout !== "social-profiles-layout-five"
									? socialVerticalGap.device?.[deviceType] + socialVerticalGap.unit?.[deviceType]
									: "0",
							"grid-template-columns": `repeat(${columns.device?.[deviceType]}, ${layoutGridTemplate})`,
						},
					},
				]
			);
		}
		return responsiveStyle;
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		{
			class: `#${uniqueId} .sp-social-profile-item-wrapper .sp-social-profile-item`,
			styles: {
				"flex-direction": checkInArray(layout)
					? socialLabelPosition === "bottom"
						? "column"
						: "column-reverse"
					: socialLabelPosition === "right"
						? "row"
						: "row-reverse",
				gap:
					(socialLabelEnable && socialLabelGap.value + socialLabelGap.unit) ||
					(socialSubTextEnable && socialSubTextGap.value + socialSubTextGap.unit) ||
					"0",
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-wrapper .sp-social-profile-item .sp-social-profile-item-text`,
			styles: {
				"flex-direction": checkInArray(layout)
					? socialLabelPosition === "bottom"
						? "column"
						: "column-reverse"
					: socialLabelPosition === "right"
						? "row"
						: "row-reverse",
				gap:
					socialSubTextEnable && layout !== "social-profiles-layout-three"
						? socialSubTextGap.value + socialSubTextGap.unit
						: "0",
			},
		},
		...removeEmptyCss(
			`#${uniqueId} .sp-social-profile-item-label`,
			"font-family",
			socialLabelTypography?.typography?.family,
			false
		),
		{
			class: `#${uniqueId} .sp-social-profile-item-label`,
			styles: {
				color: socialLabelColor.color,
				"font-weight": socialLabelTypography?.typography?.fontWeight,
				"font-style": socialLabelTypography?.typography?.style,
				"text-transform": socialLabelTypography?.typography?.transform,
				"text-decoration": socialLabelTypography?.typography?.decoration,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-container:hover .sp-social-profile-item-label`,
			styles: {
				color: socialLabelColor.hoverColor,
			},
		},
		...removeEmptyCss(
			`#${uniqueId} .sp-social-profile-item-sub-text`,
			"font-family",
			socialSubTextTypography?.typography?.family,
			false
		),
		{
			class: `#${uniqueId} .sp-social-profile-item-sub-text`,
			styles: {
				color: socialSubTextColor.color,
				"font-weight": socialSubTextTypography?.typography?.fontWeight,
				"font-style": socialSubTextTypography?.typography?.style,
				"text-transform": socialSubTextTypography?.typography?.transform,
				"text-decoration": socialSubTextTypography?.typography?.decoration,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-container:hover .sp-social-profile-item-sub-text`,
			styles: {
				color: socialSubTextColor.hoverColor,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-icon-wrapper`,
			styles: {
				background: colorControls(
					socialIconBg?.color?.style,
					socialIconBg?.color?.solidColor,
					socialIconBg?.color?.gradient
				),
				"border-style": socialIconBorder.style,
				"border-color": socialIconBorder.color,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-icon-wrapper:hover`,
			styles: {
				background: colorControls(
					socialIconBg?.hover?.style,
					socialIconBg?.hover?.solidColor,
					socialIconBg?.hover?.gradient
				),
				"border-style": socialIconBorderHover.style,
				"border-color": socialIconBorderHover.color,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-container .sp-social-profile-item-wrapper`,
			styles: {
				background: colorControls(
					socialContentAreaBG?.color?.style,
					socialContentAreaBG?.color?.solidColor,
					socialContentAreaBG?.color?.gradient
				),
				"border-style": socialContentAreaBorder.style,
				"border-color": socialContentAreaBorder.color,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-container:hover .sp-social-profile-item-wrapper`,
			styles: {
				background: colorControls(
					socialContentAreaBG?.hover?.style,
					socialContentAreaBG?.hover?.solidColor,
					socialContentAreaBG?.hover?.gradient
				),
				"border-style": socialContentAreaBorderHover.style,
				"border-color": socialContentAreaBorderHover.color,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-container .sp-social-profile-icon-divider`,
			styles: {
				background: socialIconDividerColor.color,
			},
		},
		{
			class: `#${uniqueId} .sp-social-profile-item-container:hover .sp-social-profile-icon-divider`,
			styles: {
				background: socialIconDividerColor.hover,
			},
		}
	];
	if (socialIconCustomColorEnable) {
		desktopCss.push(
			...[
				{
					class: `#${uniqueId} .sp-social-profile-item-icon .sp-social-profile-item-icon-class`,
					styles: {
						color: socialIconColor?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-social-profile-item-icon .sp-social-profile-item-icon-class:hover`,
					styles: {
						color: socialIconColor?.color,
					},
				},
			]
		);
	}
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
