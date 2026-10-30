import { objectToCssString, wrapInMediaQuery, boxCss, spacingGenerate, colorControls } from "../shared/helpFn";

const dynamicCss = (attributes) => {
	const {
		uniqueId,
		smartListBg,
		iconAlignment,
		borderStyle,
		borderStyleWidth,
		badgePadding,
		borderRadius,
		padding,
		boxShadowEnable,
		listBoxShadow,
		borderHoverStyle,
		borderHoverStyleWidth,
		borderHoverRadius,
		iconHorizontalAlignment,
		titleTypography,
		boxShadowHoverEnable,
		boxShadowHover,
		titleColor,
		titleFontSize,
		titleLineHeight,
		titleLatterSpacing,
		descriptionFontSize,
		descriptionLineHeight,
		descriptionLatterSpacing,
		descriptionColor,
		titleDescriptionGap,
		iconBg,
		badgeMargin,
		badgeBorderStyleWidth,
		iconPadding,
		iconBorderRadius,
		iconHoverBorderRadius,
		iconBorderStyleWidth,
		iconBorderStyle,
		badgeBorderStyle,
		iconSize,
		iconCustomWidth,
		iconCustomHeight,
		iconPosition,
		badgeBgColor,
		badgeLatterSpacing,
		badgeLineHeight,
		iconHoverBorderStyleWidth,
		titleWordSpacing,
		badgeFontSize,
		descriptionWordSpacing,
		descriptionTypography,
		badgeBorderRadius,
		iconColor,
		iconHoverBorderStyle,
		iconBackgroundEnable,
		backgroundShape,
		badgeTypography,
		badgeWordSpacing,
		badgeColor,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		svgIconName,
		iconSource,
		// listItemWidth,
	} = attributes;

	const rangerCss = (attr, device = "Desktop") => {
		const unit = attr?.unit?.[device] || "";
		return `${attr?.device?.[device]}${unit}`;
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

	const getClipPath = (shape) => {
		const shapes = {
			backgroundShapeHexagon: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
			backgroundShapeDiamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
			backgroundShapeStarburst:
				"polygon(100% 50%, 92% 58%, 98% 68%, 88% 72%, 92% 84%, 82% 82%, 80% 94%, 70% 88%, 66% 100%, 58% 92%, 50% 100%, 42% 92%, 34% 100%, 30% 88%, 20% 94%, 18% 82%, 8% 84%, 12% 72%, 2% 68%, 8% 58%, 0% 50%, 8% 42%, 2% 32%, 12% 28%, 8% 16%, 18% 18%, 20% 6%, 30% 12%, 34% 0%, 42% 8%, 50% 0%, 58% 8%, 66% 0%, 70% 12%, 80% 6%, 82% 18%, 92% 16%, 88% 28%, 98% 32%, 92% 42%)",
			backgroundShapeCircle: "circle(50% at 50% 50%)",
			backgroundShapeSquare: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		};

		return shapes[shape] || "";
	};
	const generalCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-link`,
				styles: {
					"border-style": borderStyle.style,
					"border-color": borderStyle.color,
					background: colorControls(
						smartListBg?.color?.style,
						smartListBg?.color?.solidColor,
						smartListBg?.color?.gradient
					),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link:hover`,
				styles: {
					"border-style": borderHoverStyle.style,
					"border-color": borderHoverStyle.color,
					background: colorControls(
						smartListBg?.hover?.style,
						smartListBg?.hover?.solidColor,
						smartListBg?.hover?.gradient
					),
				},
			},
		];
	};

	const iconImageCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-link`,
				styles: {
					...(iconPosition !== undefined &&
						iconPosition !== null && {
							"flex-direction": iconPosition === "top" ? "column" : "row",
						}),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-wrapper`,
				styles: {
					order: iconPosition !== "top" ? iconPosition : "0",
					"align-self": iconAlignment,
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-container`,
				styles: {
					...(iconBackgroundEnable !== undefined &&
						iconBackgroundEnable !== null && {
							background:
								iconBackgroundEnable &&
								colorControls(iconBg?.color?.style, iconBg?.color?.solidColor, iconBg?.color?.gradient),
						}),

					"border-style": iconBorderStyle.style,
					"border-color": iconBorderStyle.color,
					"clip-path": getClipPath(backgroundShape),
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-container:hover`,
				styles: {
					background:
						iconBackgroundEnable &&
						colorControls(iconBg?.hover?.style, iconBg?.hover?.solidColor, iconBg?.hover?.gradient),
					"border-style": iconHoverBorderStyle.style,
					"border-color": iconHoverBorderStyle.color,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon-svg::before `,
				...(svgIconName !== undefined && {
					styles: {
						content: svgIconName === "NumberIcon" ? "counter(list-counter)" : '""',
						color: iconColor.color,
					},
				}),
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon-container:hover .sp-smart-post-list-icon-svg::before `,

				...(svgIconName !== undefined && {
					styles: {
						color: iconColor.hoverColor,
					},
				}),
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-svg svg path`,
				styles: {
					fill: `${iconColor.color} !important`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link:hover  .sp-smart-post-list-icon-svg svg path`,
				styles: {
					fill: `${iconColor.hoverColor} !important`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon `,
				styles: {
					color: iconColor.color,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon:hover `,
				styles: {
					color: iconColor.hoverColor,
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-img .sp-smart-post-list-overlay`,
				styles: {
					"background-color": iconColor.color,
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-img:hover .sp-smart-post-list-overlay`,
				styles: {
					"background-color": iconColor.hoverColor,
				},
			},

			{
				class: `.sp-smart-post-smart-lists-wrapper.layout-five #${uniqueId} .sp-smart-post-list-link`,
				styles: {
					"flex-direction": "column",
					"align-items": iconHorizontalAlignment,
				},
			},
		];
	};

	const contentCSS = () => {
		return [
			{
				class: `#${uniqueId}  .sp-smart-post-list-title`,
				styles: {
					color: titleColor.color,
					...typographyCss(titleTypography),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link:hover .sp-smart-post-list-title`,
				styles: {
					color: titleColor.hoverColor,
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-description`,
				styles: {
					color: descriptionColor.color,
					...typographyCss(descriptionTypography),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link:hover .sp-smart-post-list-description`,
				styles: {
					color: descriptionColor.hoverColor,
				},
			},
		];
	};

	const badgeCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-badge`,
				styles: {
					color: badgeColor,
					...typographyCss(badgeTypography),
					background: badgeBgColor,
					"border-style": badgeBorderStyle.style,
					"border-color": badgeBorderStyle.color,
				},
			},
		];
	};

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-link`,
				styles: {
					"box-shadow": boxCss(boxShadowEnable, deviceType, listBoxShadow, "color"),
					"border-width": spacingGenerate(borderStyleWidth, deviceType),
					padding: spacingGenerate(padding, deviceType),
					"border-radius": spacingGenerate(borderRadius, deviceType),
					// width: rangerCss(listItemWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link:hover`,
				styles: {
					"box-shadow": boxCss(boxShadowHoverEnable, deviceType, boxShadowHover, "color"),
					"border-width": spacingGenerate(borderHoverStyleWidth, deviceType),
					"border-radius": spacingGenerate(borderHoverRadius, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-container`,
				styles: {
					padding: spacingGenerate(iconPadding, deviceType),

					"border-radius": `${
						backgroundShape && backgroundShape === "backgroundShapeSquare"
							? spacingGenerate(iconBorderRadius, deviceType)
							: backgroundShape && backgroundShape !== "backgroundShapeSquare"
								? "50%"
								: ""
					}`,

					"border-width": spacingGenerate(iconBorderStyleWidth, deviceType),
					width: iconSource === "library" ? rangerCss(iconSize, deviceType) : "",
					height: iconSource === "library" ? rangerCss(iconSize, deviceType) : "",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-container:hover`,
				styles: {
					"border-radius": `${
						backgroundShape === "backgroundShapeSquare"
							? spacingGenerate(iconHoverBorderRadius, deviceType)
							: backgroundShape === "backgroundShapeCircle"
								? "50%"
								: ""
					}`,

					"border-width": spacingGenerate(iconHoverBorderStyleWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-container .sp-smart-post-list-icon-img img,
				#${uniqueId} .sp-smart-post-list-icon-container .sp-smart-post-list-overlay`,
				styles: {
					"border-radius": `${
						backgroundShape === "backgroundShapeSquare"
							? spacingGenerate(iconBorderRadius, deviceType)
							: backgroundShape === "backgroundShapeCircle"
								? "50%"
								: ""
					}`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon-svg svg`,
				styles: {
					width: rangerCss(iconSize, deviceType),
					height: rangerCss(iconSize, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon`,
				styles: {
					"font-size": rangerCss(iconSize, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-img img`,
				styles: {
					width: rangerCss(iconCustomWidth, deviceType),
					height: rangerCss(iconCustomHeight, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-text`,
				styles: {
					gap: rangerCss(titleDescriptionGap, deviceType),
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-title`,
				styles: {
					"font-size": rangerCss(titleFontSize, deviceType),
					"line-height": rangerCss(titleLineHeight, deviceType),
					"letter-spacing": rangerCss(titleLatterSpacing, deviceType),
					"word-spacing": rangerCss(titleWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-description`,
				styles: {
					"font-size": rangerCss(descriptionFontSize, deviceType),
					"line-height": rangerCss(descriptionLineHeight, deviceType),
					"letter-spacing": rangerCss(descriptionLatterSpacing, deviceType),
					"word-spacing": rangerCss(descriptionWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-badge`,
				styles: {
					"font-size": rangerCss(badgeFontSize, deviceType),
					"line-height": rangerCss(badgeLineHeight, deviceType),
					"letter-spacing": rangerCss(badgeLatterSpacing, deviceType),
					"word-spacing": rangerCss(badgeWordSpacing, deviceType),
					padding: spacingGenerate(badgePadding, deviceType),
					margin: spacingGenerate(badgeMargin, deviceType),
					"border-width": spacingGenerate(badgeBorderStyleWidth, deviceType),
					"border-radius": spacingGenerate(badgeBorderRadius, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-svg::before `,

				styles: {
					"font-size": rangerCss(iconSize, deviceType),
					...(iconSource === "iconSet" && svgIconName === "NumberIcon"
						? {
								width: rangerCss(iconSize, deviceType),
								height: rangerCss(iconSize, deviceType),
							}
						: {}),
					...(iconSource === "iconSet" && svgIconName !== "NumberIcon"
						? {
								width: "0%",
								height: "0%",
							}
						: {}),
				},
			},
		];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		...generalCSS(),
		...iconImageCSS(),
		...contentCSS(),
		...badgeCSS(),
		{
			class: `#${uniqueId} `,
			styles: {
				display: hideOnDesktop ? "none" : "block",
			},
		},
	];

	const tabletCss = [
		...responsiveCss("Tablet"),
		{
			class: `#${uniqueId} `,
			styles: {
				display: hideOnTablet ? "none" : "block",
			},
		},
	];

	const mobileCss = [
		...responsiveCss("Mobile"),
		{
			class: `#${uniqueId} `,
			styles: {
				display: hideOnMobile ? "none" : "block",
			},
		},
	];

	const tabletMediaQueryCss = wrapInMediaQuery(objectToCssString(tabletCss), "only screen and (max-width: 1023px)");
	const mobileMediaQueryCss = wrapInMediaQuery(objectToCssString(mobileCss), "only screen and (max-width: 599px)");
	return `${objectToCssString(desktopCss)} ${tabletMediaQueryCss} ${mobileMediaQueryCss}`;
};

export default dynamicCss;
