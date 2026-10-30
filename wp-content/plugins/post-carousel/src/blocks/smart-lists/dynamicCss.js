import {
	objectToCssString,
	wrapInMediaQuery,
	boxCss,
	spacingGenerate,
	colorControls,
	getClipPathForShape,
	hexToRgba,
} from "../shared/helpFn";

const dynamicCss = (attributes) => {
	const {
		uniqueId,
		listOrientation,
		iconContentGap,
		smartListsBg,
		smartListsBgImage,
		smartListsHoverBgImage,
		smartListsBgImageScale,
		smartListsBgHoverImageScale,
		bgImageOverlayEnable,
		bgImageOverlayColor,
		bgImageOverlayOpacity,
		bgImageOverlayHoverEnable,
		bgImageHoverOverlayOpacity,
		borderStyle,
		borderStyleWidth,
		borderRadius,
		padding,
		boxShadowEnable,
		boxShadow,
		iconPosition,
		margin,
		borderHoverStyleWidth,
		borderHoverRadius,
		boxShadowHoverEnable,
		boxShadowHover,
		iconBorderStyle,
		dividerStyle,
		dividerWidth,
		backgroundShape,
		titleDescriptionGap,
		titleTypography,
		titleColor,
		titleFontSize,
		titleLineHeight,
		titleLatterSpacing,
		iconSource,
		titleWordSpacing,
		descriptionTypography,
		descriptionColor,
		descriptionFontSize,
		descriptionLatterSpacing,
		descriptionWordSpacing,
		descriptionLineHeight,
		listsAlignment,
		iconBg,
		iconPadding,
		iconBorderRadius,
		iconBorderStyleWidth,
		iconColor,
		iconHoverBorderStyle,
		iconHoverBorderRadius,
		iconHoverBorderStyleWidth,
		iconBackgroundEnable,
		dividerColor,
		spaceBetweenLists,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		iconSize,
		iconCustomWidth,
		iconCustomHeight,
		borderHoverStyle,
		svgIconName,
		iconAlignment,
		contentAlignment,
		listItemsWidth,
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

	const generalCSS = () => {
		return [
			{
				class: `#${uniqueId}, #${uniqueId} .block-editor-block-list__layout`,
				styles: {
					"flex-direction": `${listOrientation === "horizontal" ? "row" : "column"}`,
					"align-items": listOrientation === "vertical" ? listsAlignment : "",
					"justify-content": listOrientation === "horizontal" ? listsAlignment : "",
					"row-gap": listOrientation === "horizontal" ? "12px" : "",
				},
			},

			{
				class: `#${uniqueId}.divider.sp-list-orientation-horizontal .wp-block-sp-smart-post-show-smart-list.sp-list-divider  .sp-smart-post-smart-list-wrapper`,
				styles: {
					"border-right-color": dividerColor,
					"border-right-style": dividerStyle,
				},
			},
			{
				class: `#${uniqueId}.divider.sp-list-orientation-vertical .wp-block-sp-smart-post-show-smart-list .sp-smart-post-smart-list-wrapper`,
				styles: {
					"border-bottom-color": dividerColor,
					"border-bottom-style": dividerStyle,
				},
			},

			{
				class: `#${uniqueId}.divider  .wp-block-sp-smart-post-show-smart-list:last-child.wp-block-sp-smart-post-show-smart-list .sp-smart-post-list-wrapper`,
				styles: {
					border: "none !important",
				},
			},

			{
				class: `#${uniqueId}.sp-smart-post-smart-lists-wrapper`,
				styles: {
					background: ` 
					${colorControls(
						smartListsBg?.color?.style,
						smartListsBg?.color?.solidColor,
						smartListsBg?.color?.gradient,
						smartListsBgImage
					)}`,
					"background-size": smartListsBg.color.style === "image" ? smartListsBgImageScale : "",
					"border-style": borderStyle.style,
					"border-color": borderStyle.color,
				},
			},
			bgImageOverlayEnable &&{
				class: `#${uniqueId}.sp-smart-post-smart-lists-wrapper::after`,
				styles: {
					background: bgImageOverlayColor.color,
					opacity: bgImageOverlayOpacity
				},
			},

			{
				class: `#${uniqueId}.sp-smart-post-smart-lists-wrapper:hover`,
				styles: {
					background: `${
						bgImageOverlayHoverEnable && smartListsBg.hover.style === "image"
							? `linear-gradient(${hexToRgba(
									bgImageOverlayColor.hoverColor,
									bgImageHoverOverlayOpacity
								)} )`
							: "linear-gradient(rgba(0, 0, 0, 0))"
					} ,${colorControls(
						smartListsBg?.hover?.style,
						smartListsBg?.hover?.solidColor,
						smartListsBg?.hover?.gradient,
						smartListsHoverBgImage
					)}`,
					"background-size": smartListsBg.hover.style === "image" ? smartListsBgHoverImageScale : "",
					"border-style": borderHoverStyle.style,
					"border-color": borderHoverStyle.color,
				},
			},

			{
				class: `#${uniqueId} .wp-block-sp-smart-post-show-smart-list:last-child.wp-block-sp-smart-post-show-smart-list .sp-smart-post-list-wrapper`,
				styles: {
					"margin-bottom": "0px",
					"padding-bottom": "0px",
				},
			},

			{
				class: `#${uniqueId}.layout-five .sp-smart-post-list-link`,
				styles: {
					"flex-direction": "column",
				},
			},
		];
	};

	const iconImageCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-link`,
				styles: {
					"flex-direction": `${iconPosition === "top" ? "column" : "row"}`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-wrapper`,
				styles: {
					order: iconPosition !== "top" ? iconPosition : "",
					"align-self": iconAlignment,
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-container`,
				styles: {
					background:
						iconBackgroundEnable &&
						colorControls(iconBg?.color?.style, iconBg?.color?.solidColor, iconBg?.color?.gradient),
					"border-style": iconBorderStyle.style,
					"border-color": iconBorderStyle.color,
					"clip-path": getClipPathForShape(backgroundShape),
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
				class: `#${uniqueId} .sp-smart-post-list-icon-svg.iconSet::before `,
				styles: {
					content: svgIconName === "NumberIcon" ? "counter(list-counter)" : '""',
					color: iconColor.color,
				},
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
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon svg `,
				styles: {
					fill: iconColor.color,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-link .sp-smart-post-list-icon:hover svg `,
				styles: {
					fill: iconColor.hoverColor,
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-img .sp-smart-post-list-overlay`,
				styles: {
					"background-color": iconColor.color,
					"border-radius": backgroundShape !== "backgroundShapeSquare" ? "50%" : "",
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-img:hover .sp-smart-post-list-overlay`,
				styles: {
					"background-color": iconColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-img img`,
				styles: {
					"border-radius": backgroundShape !== "backgroundShapeSquare" ? "50%" : "",
				},
			},
		];
	};

	const contentCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-list-title`,
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
				class: `#${uniqueId} .sp-smart-post-list-description`,

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

	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId}  .sp-smart-post-smart-list-wrapper`,
				styles: {
					"margin-bottom":
						listOrientation === "vertical" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
					"padding-bottom":
						listOrientation === "vertical" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
					"margin-right":
						listOrientation === "horizontal" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
					"padding-right":
						listOrientation === "horizontal" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
				},
			},

			// {
			// 	class: `#${uniqueId} .wp-block-sp-smart-post-show-smart-list:last-child.wp-block-sp-smart-post-show-smart-list
			// 	.sp-smart-post-smart-list-wrapper `,
			// 	styles: {
			// 		"margin-bottom": "0px !important",
			// 		"padding-bottom": "0px !important",
			// 		"margin-right": "0px !important",
			// 		"padding-right": "0px !important",
			// 	},
			// },

			{
				class: `#${uniqueId} .sp-smart-post-list-link`,
				styles: {
					gap: rangerCss(iconContentGap, deviceType),
				},
			},

			{
				class: `#${uniqueId}.divider.sp-list-orientation-horizontal .wp-block-sp-smart-post-show-smart-list.sp-list-divider  .sp-smart-post-smart-list-wrapper`,
				styles: {
					"border-right-width": rangerCss(dividerWidth, deviceType),
				},
			},
			{
				class: `#${uniqueId}.divider.sp-list-orientation-vertical .wp-block-sp-smart-post-show-smart-list  .sp-smart-post-smart-list-wrapper`,
				styles: {
					"border-bottom-width": rangerCss(dividerWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId}.divider  .wp-block-sp-smart-post-show-smart-list:last-child.wp-block-sp-smart-post-show-smart-list .sp-smart-post-smart-list-wrapper`,
				styles: {
					border: "none !important",
				},
			},

			{
				class: `#${uniqueId}.sp-smart-post-smart-lists-wrapper`,
				styles: {
					"border-width": spacingGenerate(borderStyleWidth, deviceType),
					padding: spacingGenerate(padding, deviceType),
					margin: spacingGenerate(margin, deviceType),
					"border-radius": spacingGenerate(borderRadius, deviceType),
					"box-shadow": boxCss(boxShadowEnable, deviceType, boxShadow, "color"),
				},
			},

			{
				class: `#${uniqueId}.sp-smart-post-smart-lists-wrapper:hover`,
				styles: {
					"border-width": spacingGenerate(borderHoverStyleWidth, deviceType),
					"border-radius": spacingGenerate(borderHoverRadius, deviceType),
					"box-shadow": boxCss(boxShadowHoverEnable, deviceType, boxShadowHover, "color"),
				},
			},

			// Icon style

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-container`,
				styles: {
					padding: spacingGenerate(iconPadding, deviceType),
					"border-radius": `${
						backgroundShape === "backgroundShapeSquare"
							? spacingGenerate(iconBorderRadius, deviceType)
							: "50%"
					}`,

					"border-width": spacingGenerate(iconBorderStyleWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-container:hover`,
				styles: {
					"border-radius": `${
						backgroundShape === "backgroundShapeSquare"
							? spacingGenerate(iconHoverBorderRadius, deviceType)
							: "50%"
					}`,
					"border-width": spacingGenerate(iconHoverBorderStyleWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-container .sp-smart-post-list-icon-svg svg`,
				styles: {
					width: rangerCss(iconSize, deviceType),
					height: rangerCss(iconSize, deviceType),
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-container .sp-smart-post-list-icon`,
				styles: {
					width: rangerCss(iconSize, deviceType),
					height: rangerCss(iconSize, deviceType),
				},
			},

			{
				class: `#${uniqueId}  .sp-smart-post-list-icon-img img`,
				styles: {
					width: rangerCss(iconCustomWidth, deviceType),
					height: rangerCss(iconCustomHeight, deviceType),
				},
			},

			{
				class: `#${uniqueId} .block-editor-block-list__layout .sp-smart-post-list-wrapper`,
				styles: {
					"margin-bottom":
						listOrientation === "vertical" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
					"padding-bottom":
						listOrientation === "vertical" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
					"margin-right":
						listOrientation === "horizontal" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
					"padding-right":
						listOrientation === "horizontal" ? `calc(${rangerCss(spaceBetweenLists, deviceType)} / 2)` : "",
				},
			},

			{
				class: `#${uniqueId}.divider  .wp-block-sp-smart-post-show-smart-list:last-child.wp-block-sp-smart-post-show-smart-list .sp-smart-post-list-wrapper`,
				styles: {
					border: "none !important",
				},
			},

			// Content Dynamic Style

			{
				class: `#${uniqueId} .sp-smart-post-list-text`,
				styles: {
					gap: rangerCss(titleDescriptionGap, deviceType),
					"text-align": contentAlignment,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-list-title-wrapper`,
				styles: {
					gap: rangerCss(titleDescriptionGap, deviceType),
					"justify-content": contentAlignment,
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
				class: `#${uniqueId}  .sp-smart-post-list-description`,
				styles: {
					"font-size": rangerCss(descriptionFontSize, deviceType),
					"line-height": rangerCss(descriptionLineHeight, deviceType),
					"letter-spacing": rangerCss(descriptionLatterSpacing, deviceType),
					"word-spacing": rangerCss(descriptionWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-list-icon-svg::before `,
				styles: {
					"font-size": rangerCss(iconSize, deviceType),
					width:
						iconSource === "iconSet" && svgIconName === "NumberIcon"
							? rangerCss(iconSize, deviceType)
							: "0%",
					height:
						iconSource === "iconSet" && svgIconName === "NumberIcon"
							? rangerCss(iconSize, deviceType)
							: "0%",
				},
			},

			{
				class: `#${uniqueId} .wp-block-sp-smart-post-show-smart-list`,
				styles: {
					width: rangerCss(listItemsWidth, deviceType),
					"max-width": "100%",
				},
			},
		];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		...generalCSS(),
		...iconImageCSS(),
		...contentCSS(),
		{
			class: `#${uniqueId} `,
			styles: {
				display: hideOnDesktop ? "none" : "flex",
			},
		},
	];

	// Tablet CSS styles.
	const tabletCss = [
		...responsiveCss("Tablet"),
		{
			class: `#${uniqueId} `,
			styles: {
				display: hideOnTablet ? "none" : "flex",
			},
		},
	];

	// Mobile CSS styles.
	const mobileCss = [
		...responsiveCss("Mobile"),
		{
			class: `#${uniqueId} `,
			styles: {
				display: hideOnMobile ? "none" : "flex",
			},
		},
	];

	const tabletMediaQueryCss = wrapInMediaQuery(objectToCssString(tabletCss), "only screen and (max-width: 1023px)");
	const mobileMediaQueryCss = wrapInMediaQuery(objectToCssString(mobileCss), "only screen and (max-width: 599px)");
	return `${objectToCssString(desktopCss)} ${tabletMediaQueryCss} ${mobileMediaQueryCss}`;
};

export default dynamicCss;
