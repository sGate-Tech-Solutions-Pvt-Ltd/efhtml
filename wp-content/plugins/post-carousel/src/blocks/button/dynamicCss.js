import { objectToCssString, wrapInMediaQuery, boxCss, spacingGenerate, generateLayeredShadows } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

// eslint-disable-next-line no-unused-vars
const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		buttonLabelTypography,
		buttonLabelFontSize,
		buttonLabelLineHeight,
		buttonLabelLatterSpacing,
		buttonLabelColor,
		iconGap,
		iconPosition,
		buttonBgColor,
		buttonBorderRadius,
		buttonBorder,
		buttonBorderWidth,
		buttonBoxShadowEnable,
		buttonBoxShadow,
		buttonHoverBorderRadius,
		buttonHoverBoxShadow,
		buttonHoverBoxShadowEnable,
		buttonPadding,
		buttonStyle,
		hoverEffects,
		shadowColor,
		buttonGradientBg,
		buttonGradientHoverBg,
		buttonBorderGradient,
		buttonBorderGradientRadiusHover,
		buttonHoverBorder,
		buttonHoverBorderWidth,
		buttonLabelWordSpacing,
		buttonBorderGradientWidthHover,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		smartBtnIconColor,
		smartBtnIconSize,
		globalBreakPointData,
		buttonBorderGradientHover,
	} = attributes;

	const rangerCss = (attr, device = "Desktop") => {
		const unit = attr?.unit?.[device] || "";
		return `${attr.device?.[device]}${unit}`;
	};

	function resolveColor(color) {
		if (color.startsWith("var(")) {
			// Extract variable name
			const varName = color.match(/var\((--[^)]+)\)/)?.[1];
			if (varName) {
				// Get the computed value from :root
				const computedValue = getComputedStyle(document.documentElement).getPropertyValue(varName);
				if (computedValue) {
					return computedValue.trim();
				}
			}
		}
		return color;
	}
	const resolvedColor = resolveColor(shadowColor);

	const typographyCss = (attr) => {
		return {
			"font-family": attr.typography.family,
			"font-weight": attr.typography.fontWeight,
			"font-style": attr.typography.style,
			"text-decoration": attr.typography.decoration,
			"text-transform": attr.typography.transform,
		};
	};

	// Button Css.
	const buttonCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-btn`,
				styles: {
					color: buttonLabelColor?.color,
					"background-color": buttonBgColor?.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn:hover, #${uniqueId} .sp-smart-post-btn.btn-ghost:hover`,
				styles: {
					background: buttonBgColor?.hoverColor,
				},
			},
		];
	};
	const buttonHoverEffectCss = () => {
		let flipStyles;
		if (hoverEffects === "flip") {
			flipStyles = [];
		} else {
			flipStyles = [
				{
					class: `#${uniqueId} .sp-smart-post-btn`,
					styles: {
						"border-style": buttonBorder.style,
						"border-color": buttonBorder?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-post-btn:hover`,
					styles: {
						"border-style": buttonBorderGradient.style,
						"border-color": buttonBorderGradient?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-post-btn:hover, #${uniqueId} .sp-smart-post-btn.btn-ghost:hover`,
					styles: {
						"border-style": buttonHoverBorder.style,
						"border-color": buttonHoverBorder?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-post-btn.btn-gradient:hover`,
					styles: {
						"border-style": buttonBorderGradientHover.style,
						"border-color": buttonBorderGradientHover?.color,
					},
				},
				{
					class: `#${uniqueId} .sp-smart-post-btn.btn-gradient.drawOutline:hover`,
					styles: {
						"border-style": "none",
					},
				},
			];
		}

		return flipStyles;
	};

	// Button Label Css.
	const buttonLabelCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-btn .button-label .front , #${uniqueId} .sp-smart-post-btn .button-label .back`,
				styles: {
					display: "flex",
					"flex-direction": `${iconPosition === "top" || iconPosition === "bottom" ? "column" : "row"}`,
					"z-index": "999",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip .button-label`,
				styles: {
					width: "100%",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn .sp-rich-text.sp-btn-label`,
				styles: {
					...typographyCss(buttonLabelTypography),
					"z-index": "999",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn:not(.neoFollow, .drawOutline):hover .sp-rich-text.sp-btn-label`,
				styles: {
					color: buttonLabelColor.hoverColor,
				},
			},
		];
	};

	// Button icons
	const buttonIconCss = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-btn .icon `,
				styles: {
					order: `${iconPosition === "right" || iconPosition === "bottom" ? "1" : "0"}`,
					"z-index": "999",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn .icon i svg`,
				styles: {
					fill: smartBtnIconColor?.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn:hover .icon i svg`,
				styles: {
					fill: smartBtnIconColor.hover,
				},
			},
		];
	};

	const buttonDefaultHoverEffect = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost`,
				styles: {
					background: buttonBgColor?.color ? buttonBgColor?.color : "transparent",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.slideRight:before`,
				styles: {
					background: buttonBgColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.slideSkew:before`,
				styles: {
					background: buttonBgColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.slideTop:before`,
				styles: {
					background: buttonBgColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.neoFollow:hover	`,
				styles: {
					color: buttonLabelColor?.color,
					background: "transparent",
					"box-shadow": `8px 8px 0px 0px ${buttonBgColor.hoverColor}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.drawOutline	`,
				styles: {
					color: buttonLabelColor?.color,
					"border-style": "none !important",
					"border-radius": spacingGenerate(buttonBorderRadius),
					background: `conic-gradient(${buttonBgColor.hoverColor} 0deg, ${buttonBgColor.hoverColor} calc(var(--angle) * 1deg), transparent calc(var(--angle) * 1deg))`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.drawOutline::before	`,
				styles: {
					border: "none",
					"border-radius": spacingGenerate(buttonBorderRadius),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-ghost.drawOutline::after	`,
				styles: {
					border: "none",
					"border-radius": spacingGenerate(buttonBorderRadius),
					"background-color": buttonBgColor?.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-gradient`,
				styles: {
					background: buttonGradientBg,
					overflow: "hidden",
					transition: "background 0.3s",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-gradient:before`,
				styles: {
					content: "''",
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					opacity: "0",
					"z-index": "2",
					background: buttonGradientHoverBg,
					transition: "opacity .3s",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-gradient:hover:before`,
				styles: {
					content: "''",
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					opacity: "1",
					"z-index": "2",
					background: buttonGradientHoverBg,
				},
			},
			{
				class: `#${uniqueId}  .sp-smart-post-btn.btn-default.flip:hover  `,
				styles: {
					"background-color": "transparent",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip .button-label .back`,
				styles: {
					opacity: "1",
					color: buttonLabelColor.hoverColor,
					"background-color": buttonBgColor.hoverColor,
					"border-style": buttonHoverBorder.style,
					"border-color": buttonHoverBorder?.color,
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip:hover .button-label .back`,
				styles: {
					opacity: "1",
					transform: "translateY(0%) rotateX(0deg)",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip .button-label .front`,
				styles: {
					opacity: "1",
					color: buttonLabelColor?.color,
					"border-style": buttonBorder.style,
					"border-color": buttonBorder?.color,
					"background-color": buttonBgColor?.color,
					width: "100%",
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip:hover .button-label .front`,
				styles: {
					opacity: "1",
					transform: "translateY(50%) rotateX(90deg)",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.gradShadow:hover`,
				styles: {
					"border-radius": spacingGenerate(buttonHoverBorderRadius),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.gradShadow:hover::before, #${uniqueId} .sp-smart-post-btn.btn-default.gradShadow:hover::after`,
				styles: {
					"border-radius": spacingGenerate(buttonHoverBorderRadius),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.raiseShadow:hover`,
				styles: {
					"box-shadow": `0 0.6em 0.5em -0.4em ${shadowColor}`,
					transform: "translateY(-0.25em)",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.gradShadow:after`,
				styles: {
					background: buttonBgColor?.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.gradShadow:hover::after`,
				styles: {
					background: buttonBgColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.gradShadow:active:after`,
				styles: {
					background: "transparent",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.multiLayers:hover`,
				styles: {
					background: buttonBgColor.hoverColor,
					"box-shadow": generateLayeredShadows(resolvedColor),
				},
			},
		];
	};

	const responsiveCss = (deviceType) => {
		const notFlipEffects =
			hoverEffects !== "flip"
				? [
						{
							class: `#${uniqueId} .sp-smart-post-btn`,
							styles: {
								padding: `${spacingGenerate(buttonPadding, deviceType)}`,
								"border-width": `${spacingGenerate(buttonBorderWidth, deviceType)}`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-btn:hover`,
							styles: {
								"border-width": `${spacingGenerate(buttonHoverBorderWidth, deviceType)}`,
							},
						},
						{
							class: `#${uniqueId} .sp-smart-post-btn.btn-gradient:hover`,
							styles: {
								"border-width": `${spacingGenerate(buttonBorderGradientWidthHover, deviceType)}`,
							},
						},
					]
				: [];
		return [
			...notFlipEffects,
			{
				class: `#${uniqueId} .sp-smart-post-btn`,
				styles: {
					"border-radius": `${
						["gradShadow", "flip"].includes(hoverEffects)
							? ""
							: spacingGenerate(buttonBorderRadius, deviceType)
					}`,
					"box-shadow": `${
						["raiseShadow", "gradShadow", "neoFollow", "flip", "multiLayers"].includes(hoverEffects) ||
						buttonStyle === "gradient"
							? ""
							: boxCss(buttonBoxShadowEnable, deviceType, buttonBoxShadow, "color")
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn:hover`,
				styles: {
					"border-radius": spacingGenerate(buttonHoverBorderRadius, deviceType),
				},
			},
			// {
			// 	class: `#${uniqueId} .sp-smart-post-btn.btn-gradient:hover`,
			// 	styles: {
			// 		"border-radius": spacingGenerate(buttonHoverBorderWidth, deviceType),
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-btn:hover`,
				styles: {
					"border-radius": `${
						buttonStyle === "gradient"
							? spacingGenerate(buttonBorderGradientRadiusHover, deviceType)
							: spacingGenerate(buttonHoverBorderRadius, deviceType)
					}`,

					"box-shadow": `${
						hoverEffects === "gradShadow" ||
						hoverEffects === "flip" ||
						hoverEffects === "neoFollow" ||
						buttonStyle === "gradient"
							? ""
							: boxCss(buttonHoverBoxShadowEnable, deviceType, buttonHoverBoxShadow, "color")
					}`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip .button-label .front`,
				styles: {
					"border-width": spacingGenerate(buttonBorderWidth, deviceType),
					padding: spacingGenerate(buttonPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn.btn-default.flip .button-label .back`,
				styles: {
					"border-width": spacingGenerate(buttonHoverBorderWidth, deviceType),
					padding: spacingGenerate(buttonPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn .sp-rich-text.sp-btn-label`,
				styles: {
					"font-size": rangerCss(buttonLabelFontSize, deviceType),
					"line-height": buttonLabelLineHeight.device?.[deviceType],
					"letter-spacing": rangerCss(buttonLabelLatterSpacing, deviceType),
					"word-spacing": rangerCss(buttonLabelWordSpacing, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn .icon i svg`,
				styles: {
					width: rangerCss(smartBtnIconSize, deviceType),
					height: rangerCss(smartBtnIconSize, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-btn .button-label .front , #${uniqueId} .sp-smart-post-btn .button-label .back`,
				styles: {
					gap: rangerCss(iconGap, deviceType),
				},
			},
		];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		...buttonCSS(),
		...buttonLabelCSS(),
		...buttonIconCss(),
		...buttonDefaultHoverEffect(),
		...buttonHoverEffectCss()
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet CSS styles.
		const tabletCss = [
			...responsiveCss("Tablet")
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile CSS styles.
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
