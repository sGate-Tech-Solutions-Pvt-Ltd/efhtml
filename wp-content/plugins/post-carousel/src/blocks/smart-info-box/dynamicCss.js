import { unit } from "../../controls/controls";
import { objectToCssString, wrapInMediaQuery, boxCss, spacingGenerate, colorControls } from "../shared/helpFn";

const dynamicCss = (attributes) => {
	const {
		uniqueId,
		padding,
		margin,
		borderRadius,
		boxShadow,
		boxShadowEnable,
		ratingTypography,
		separatorMargin,
		borderStyle,
		caHoverBorderRadius,
		borderStyleWidth,
		infoBoxBg,
		infoBoxBgImage,
		cAIconCustomWidth,
		imageScale,
		imageOverlayColor,
		verticalAlignment,
		iconPositionLayoutFive,
		imageOverlayHoverEnable,
		imageOverlayOpacity,
		contentAlignment,
		borderHoverStyle,
		borderHoverStyleWidth,
		infoBoxHoverBgImage,
		imageHoverScale,
		imageHoverOverlayOpacity,
		borderHoverRadius,
		boxShadowHoverEnable,
		subTitleLatterSpacing,
		boxShadowHover,
		iconSize,
		iconCustomWidth,
		subTitleLineHeight,
		iconPosition,
		iconCustomHeight,
		iconOverlayOpacity,
		iconOverlayColor,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		iconColor,
		caIconColor,
		iconBg,
		iconBorderStyle,
		iconBorderStyleWidth,
		iconBorderRadius,
		iconBoxShadowEnable,
		iconBoxShadow,
		iconPadding,
		iconMargin,
		iconBorderHoverStyle,
		iconBorderStyleHoverWidth,
		iconBorderHoverRadius,
		iconBoxShadowHoverEnable,
		iconBoxShadowHover,
		subTitleGap,
		subTitlePosition,
		separatorPosition,
		titleMargin,
		titleColor,
		subTitleColor,
		titleTypography,
		subTitleTypography,
		titleFontSize,
		titleLineHeight,
		titleLatterSpacing,
		imageOverlayEnable,
		subTitleFontSize,
		descriptionMargin,
		descriptionFontSize,
		descriptionLatterSpacing,
		descriptionTypography,
		descriptionLineHeight,
		dropCapsColor,
		descriptionColor,
		cAIconCustomHeight,
		badgeTypography,
		badgeFontSize,
		badgeWordSpacing,
		hoverEffectsColor,
		badgeColor,
		caHoverBorderStyle,
		ratingLatterSpacing,
		ratingLineHeight,
		caHoverBorderStyleWidth,
		badgeLatterSpacing,
		badgeLineHeight,
		gapBetweenDescription,
		badgeBg,
		badgeBorderStyle,
		badgeBorderRadius,
		badgeBoxShadowEnable,
		badgeBoxShadow,
		badgeBorderStyleWidth,
		badgePadding,
		badgeMargin,
		badgeBorderHoverStyle,
		badgeBorderStyleHoverWidth,
		badgeBorderHoverRadius,
		badgeBoxShadowHoverEnable,
		badgeBoxShadowHover,
		ratingWordSpacing,
		cAWordSpacing,
		descriptionWordSpacing,
		subTitleWordSpacing,
		titleWordSpacing,
		ratingGap,
		caPadding,
		cAFontSize,
		cATypography,
		cALatterSpacing,
		cALineHeight,
		separatorWidth,
		separatorStyle,
		caMargin,
		iconTextGap,
		ratingValuePosition,
		caBorderRadius,
		ratingIconSize,
		externalLinkIconColor,
		iconHoverEffectOpacity,
		scale,
		filledColor,
		emptyColor,
		ratingNumberColor,
		iconSource,
		ratingMargin,
		fullWidthButton,
		cAIconSize,
		cAIconPosition,
		caBorderStyle,
		caBorderStyleWidth,
		cAOverlayColor,
		separatorThinkness,
		cAOverlayOpacity,
		separatorColor,
		cABg,
		ratingFontSize,
		iconHorizontalAlignment,
		iconVerticalAlignment,
	} = attributes;

	const rangerCss = (attr, device = "Desktop") => {
		const unit = attr?.unit?.[device] || "";
		return `${attr.device?.[device]}${unit}`;
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

	// Info Box Css.
	const infoBoxCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box`,
				styles: {
					"border-style": borderStyle.style,
					"border-color": borderStyle.color,
					background: colorControls(
						infoBoxBg.color.style,
						infoBoxBg.color.solidColor,
						infoBoxBg.color.gradient,
						infoBoxBgImage
					),
					"background-size": imageScale,
					"align-items": `${
						contentAlignment === "center"
							? "center"
							: contentAlignment === "left"
								? "flex-start"
								: "flex-end"
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-three`,
				styles: {
					"align-items": "stretch",
					gap: "18px",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box:hover`,
				styles: {
					"border-style": borderHoverStyle.style,
					"border-color": borderHoverStyle.color,
					"background-size": imageHoverScale,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box::before`,
				styles: {
					background: colorControls(
						infoBoxBg.hover.style,
						infoBoxBg.hover.solidColor,
						infoBoxBg.hover.gradient,
						infoBoxHoverBgImage
					),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box:hover .sp-smart-post-info-button-fullbox-overlay`,
				styles: {
					"z-index": "9999",
					opacity: cAOverlayOpacity,
					background: cAOverlayColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-button-fullbox-overlay-svg path`,
				styles: {
					fill: externalLinkIconColor,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-overlay`,
				styles: {
					background: `${
						infoBoxBg.color.style === "image" && imageOverlayEnable ? imageOverlayColor.color : ""
					}`,
					opacity: `${infoBoxBg.color.style === "image" && imageOverlayEnable ? imageOverlayOpacity : ""}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box:hover .sp-smart-post-info-box-overlay`,
				styles: {
					background: `${imageOverlayHoverEnable ? imageOverlayColor.hoverColor : ""} `,
					opacity: `${imageOverlayHoverEnable ? imageHoverOverlayOpacity : "0"} `,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-overlay`,
				styles: {
					"background-color": `${
						infoBoxBg.color.style === "image" ? imageOverlayColor.color : "transparent"
					}`,
					opacity: `${infoBoxBg.color.style === "image" ? imageOverlayOpacity : "1"}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box:hover .sp-smart-post-overlay`,
				styles: {
					"background-color": `${
						infoBoxBg.hover.style === "image" ? imageOverlayColor.hoverColor : "transparent"
					}`,
					opacity: `${infoBoxBg.hover.style === "image" ? imageHoverOverlayOpacity : "1"}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title, 
				#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-desc, #${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-container,
				#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-sub-title`,
				styles: {
					"text-align": contentAlignment,
				},
			},
		];
	};

	// Info Box layout one Css.
	const infoBoxLayoutOneCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-one .sp-smart-post-info-box-icon-container`,
				styles: {
					order: `${
						iconPosition === "below-title" ? "2" : iconPosition === "bottom-content" ? "9" : "0" // default if none matches
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-one .sp-smart-post-info-box-separator-container`,
				styles: {
					order: `${
						separatorPosition === "after-description"
							? "4"
							: separatorPosition === "after-call-Action"
								? "7"
								: "2" // default if none matches
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-separator-container`,
				styles: {
					order: `${
						separatorPosition === "after-description"
							? "3"
							: separatorPosition === "after-call-Action"
								? "5"
								: "1" // default if none matches
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-three .sp-smart-post-info-box-separator-container`,
				styles: {
					order: `${
						separatorPosition === "after-description"
							? "3"
							: separatorPosition === "after-call-Action"
								? "5"
								: "1" // default if none matches
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-four .sp-smart-post-info-box-separator-container`,
				styles: {
					order: `${
						separatorPosition === "after-description"
							? "5"
							: separatorPosition === "after-call-Action"
								? "6"
								: "3" // default if none matches
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-three .sp-smart-post-info-box-icon-wrapper`,
				styles: {
					"align-self": verticalAlignment,
					order: `${iconPosition === "right-content" ? "1" : "0"}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-three .sp-smart-post-info-box-content-wrapper`,
				styles: {
					"align-items": `${
						contentAlignment === "left"
							? "flex-start"
							: contentAlignment === "center"
								? "center"
								: "flex-end"
					}`,
				},
			},
		];
	};

	// Icon/Image Css.
	const iconImageCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container`,
				styles: {
					background: colorControls(iconBg.color.style, iconBg.color.solidColor, iconBg.color.gradient),
					"border-style": iconBorderStyle.style,
					"border-color": iconBorderStyle.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container:hover`,
				styles: {
					"border-style": iconBorderHoverStyle.style,
					"border-color": iconBorderHoverStyle.color,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container::before`,
				styles: {
					background: colorControls(iconBg.hover.style, iconBg.hover.solidColor, iconBg.hover.gradient),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container.icon-img-overlay .sp-smart-post-info-box-img::after `,
				styles: {
					background: `${iconSource === "custom" ? iconOverlayColor : ""}`,
					opacity: `${iconSource === "custom" ? iconOverlayOpacity : ""}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box-icon-container .sp-smart-post-info-box-img img, #${uniqueId} .sp-smart-post-info-box-icon-container .sp-smart-post-info-box-img `,
				styles: {
					transition: "all 0.3s ease-in-out",
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon svg`,
				styles: {
					fill: iconColor.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container:hover svg`,
				styles: {
					fill: iconColor.hoverColor,
				},
			},

			// {
			// 	class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-layout-two-top .sp-smart-post-info-box-icon-container, #${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-layout-two-top .sp-smart-post-info-box-title-container,
			// 	#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-four .sp-smart-post-info-box-layout-two-top .sp-smart-post-info-box-icon-container`,
			// 	styles: {
			// 		margin: "0",
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-title-container`,
				styles: {
					"align-items": `${
						contentAlignment === "left" ? "start" : contentAlignment === "right" ? "end" : "center"
					}`,
					"text-align": contentAlignment,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-sub-title`,
				styles: {
					"text-align": contentAlignment,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-layout-two-top .sp-smart-post-info-box-icon-container`,
				styles: {
					order: `${iconPosition === "right-title" ? "1" : "0"}`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-three .sp-smart-post-info-box-icon-container`,
				styles: {
					"margin-bottom": "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box-icon-container .sp-smart-post-info-box-img.icon-img-overlay::after`,
				styles: {
					"background-color": iconOverlayColor,
					opacity: iconOverlayOpacity,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-five .sp-smart-post-info-box-icon-container `,
				styles: {
					margin: "0",
					top: `${
						iconPositionLayoutFive === "top-content"
							? "0%"
							: (iconPositionLayoutFive === "left-content" && iconVerticalAlignment === "top") ||
								  (iconPositionLayoutFive === "right-content" && iconVerticalAlignment === "top")
								? "0%"
								: (iconPositionLayoutFive === "left-content" && iconVerticalAlignment === "center") ||
									  (iconPositionLayoutFive === "right-content" && iconVerticalAlignment === "center")
									? "50%"
									: (iconPositionLayoutFive === "left-content" &&
												iconVerticalAlignment === "bottom") ||
										  (iconPositionLayoutFive === "right-content" &&
												iconVerticalAlignment === "bottom")
										? "100%"
										: iconPositionLayoutFive === "right-content"
											? "50%"
											: ""
					}`,
					left: `${
						(iconPositionLayoutFive === "top-content" && iconHorizontalAlignment === "left") ||
						(iconPositionLayoutFive === "bottom-content" && iconHorizontalAlignment === "left")
							? "0%"
							: (iconPositionLayoutFive === "top-content" && iconHorizontalAlignment === "center") ||
								  (iconPositionLayoutFive === "bottom-content" && iconHorizontalAlignment === "center")
								? "50%"
								: (iconPositionLayoutFive === "top-content" && iconHorizontalAlignment === "right") ||
									  (iconPositionLayoutFive === "bottom-content" &&
											iconHorizontalAlignment === "right")
									? "100%"
									: iconPositionLayoutFive === "bottom-content"
										? "50%"
										: iconPositionLayoutFive === "left-content"
											? "0%"
											: ""
					}`,
					bottom: `${iconPositionLayoutFive === "bottom-content" ? "0%" : ""}`,
					right: `${iconPositionLayoutFive === "right-content" ? "0%" : ""}`,
					transform: `${
						iconPositionLayoutFive === "top-content"
							? "translateX(-50%) translateY(-50%)"
							: iconPositionLayoutFive === "bottom-content"
								? "translateX(-50%) translateY(50%)"
								: iconPositionLayoutFive === "left-content"
									? "translateX(-50%) translateY(-50%)"
									: iconPositionLayoutFive === "right-content"
										? "translateX(50%) translateY(-50%)"
										: ""
					}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-five .sp-smart-post-info-box-separator-container `,
				styles: {
					order: `${
						separatorPosition === "after-description"
							? "4"
							: separatorPosition === "after-call-Action"
								? "6"
								: "2" // default if none matches
					}`,
				},
			},
		];
	};

	// Title Css.
	const titleCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title`,
				styles: {
					color: titleColor.color,
					...typographyCss(titleTypography),
					margin: "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title:hover`,
				styles: {
					color: titleColor.hoverColor,
					margin: "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-framed:hover, #${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-text:hover`,
				styles: {
					color: hoverEffectsColor,
				},
			},
			{
				class: `
				#${uniqueId} .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-underline::after,
				#${uniqueId} .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-overline::after,
				#${uniqueId} .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-double-line::after,
				#${uniqueId} .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-double-line::before
				 `,
				styles: {
					background: hoverEffectsColor,
				},
			},
			{
				class: `
				#${uniqueId} .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-background`,
				styles: {
					"box-shadow": `inset 0 0 0 0 ${titleColor.hoverColor}`,
				},
			},
			{
				class: `
				#${uniqueId} .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title.title-hover-background:hover`,
				styles: {
					"box-shadow": `inset 1200px 0 0 0 ${hoverEffectsColor}`,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-sub-title`,
				styles: {
					order: `${subTitlePosition === "above-title" ? "0" : "1"}`,
					...typographyCss(subTitleTypography),
					color: subTitleColor.color,
					margin: "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-sub-title:hover`,
				styles: {
					color: subTitleColor.hoverColor,
				},
			},
		];
	};

	// Description Css.
	const descCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-desc`,
				styles: {
					color: descriptionColor.color,
					...typographyCss(descriptionTypography),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-desc:hover`,
				styles: {
					color: descriptionColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-desc.drop-caps::first-letter`,
				styles: {
					color: dropCapsColor,
				},
			},
		];
	};

	// Badge Css.
	const badgeCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge`,
				styles: {
					background: colorControls(badgeBg.color.style, badgeBg.color.solidColor, badgeBg.color.gradient),
					"border-style": badgeBorderStyle.style,
					"border-color": badgeBorderStyle.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge:hover`,
				styles: {
					"border-style": badgeBorderHoverStyle.style,
					"border-color": badgeBorderHoverStyle.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge:hover::before`,
				styles: {
					background: colorControls(badgeBg.hover.style, badgeBg.hover.solidColor, badgeBg.hover.gradient),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge .sp-smart-post-info-box-badge-label`,
				styles: {
					color: badgeColor.color,
					...typographyCss(badgeTypography),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge:hover .sp-smart-post-info-box-badge-label`,
				styles: {
					color: badgeColor.hoverColor,
				},
			},
		];
	};

	// Rating Css.
	const ratingCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper`,
				styles: {},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-container`,
				styles: {
					"border-color": badgeBorderStyle.color,
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-background`,
				styles: {
					"border-color": badgeBorderStyle.color,
					fill: emptyColor.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-background:hover`,
				styles: {
					"border-color": badgeBorderStyle.color,
					fill: emptyColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-foreground`,
				styles: {
					width: `${(scale / 5) * 100}%`,
					fill: filledColor.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-foreground:hover`,
				styles: {
					width: `${(scale / 5) * 100}%`,
					fill: filledColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-label`,
				styles: {
					order: ratingValuePosition === "left" ? "0" : "1",
					color: ratingNumberColor.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-label:hover`,
				styles: {
					order: ratingValuePosition === "left" ? "0" : "1",
					color: ratingNumberColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-label`,
				styles: {
					...typographyCss(ratingTypography),
				},
			},
		];
	};

	// Call To action Css.
	const callToActionCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta, #${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-link, #${uniqueId} .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-icon`,
				styles: {
					color: caIconColor.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta:hover, #${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-link:hover, #${uniqueId} .sp-smart-post-info-box-cta:hover .sp-smart-post-info-box-cta-icon`,
				styles: {
					color: caIconColor.hoverColor,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta.linking-type-button`,
				styles: {
					"border-style": caBorderStyle.style,
					"border-color": caBorderStyle.color,
					background: colorControls(cABg.color.style, cABg.color.solidColor, cABg.color.gradient),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta.linking-type-button:hover`,
				styles: {
					"border-style": caHoverBorderStyle.style,
					"border-color": caHoverBorderStyle.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta.linking-type-button:before`,
				styles: {
					background: colorControls(cABg.hover.style, cABg.hover.solidColor, cABg.hover.gradient),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-label`,
				styles: {
					...typographyCss(cATypography),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-icon`,
				styles: {
					order: `${cAIconPosition === "beforeText" ? "0" : "1"}`,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-icon .overlay`,
				styles: {
					"background-color": caIconColor.color,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta:hover .sp-smart-post-info-box-cta-icon .overlay`,
				styles: {
					"background-color": caIconColor.hoverColor,
				},
			},
		];
	};

	// Separator Css.
	const separatorCSS = () => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-separator-container`,
				styles: {
					"border-bottom-style": separatorStyle,
					color: separatorColor,
				},
			},
		];
	};
	const responsiveCss = (deviceType) => {
		return [
			{
				class: `#${uniqueId} .sp-smart-post-info-box`,
				styles: {
					padding: spacingGenerate(padding, deviceType),
					margin: spacingGenerate(margin, deviceType),
					"border-radius": spacingGenerate(borderRadius, deviceType),
					"box-shadow": boxCss(boxShadowEnable, deviceType, boxShadow, "color"),
					"border-width": spacingGenerate(borderStyleWidth, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box:hover`,
				styles: {
					"border-radius": spacingGenerate(borderHoverRadius, deviceType),
					"box-shadow": boxCss(boxShadowHoverEnable, deviceType, boxShadowHover, "color"),
					"border-width": spacingGenerate(borderHoverStyleWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon svg`,
				styles: {
					width: rangerCss(iconSize, deviceType),
					height: rangerCss(iconSize, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box-icon-container .sp-smart-post-info-box-img.opacity:hover img,
				#${uniqueId} .sp-smart-post-info-box-icon-container .sp-smart-post-info-box-icon.opacity:hover svg`,
				styles: {
					opacity: iconHoverEffectOpacity,
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box-icon-container .sp-smart-post-info-box-img img`,
				styles: {
					width: rangerCss(iconCustomWidth, deviceType),
					height: rangerCss(iconCustomHeight, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container`,
				styles: {
					padding: spacingGenerate(iconPadding, deviceType),
					margin: spacingGenerate(iconMargin, deviceType),
					"border-width": spacingGenerate(iconBorderStyleWidth, deviceType),
					"border-radius": spacingGenerate(iconBorderRadius, deviceType),
					"box-shadow": boxCss(iconBoxShadowEnable, deviceType, iconBoxShadow, "color"),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container:hover`,
				styles: {
					"border-radius": spacingGenerate(iconBorderHoverRadius, deviceType),
					"box-shadow": boxCss(iconBoxShadowHoverEnable, deviceType, iconBoxShadowHover, "color"),
					"border-width": spacingGenerate(iconBorderStyleHoverWidth, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-icon-container:hover::before`,
				styles: {
					"border-radius": spacingGenerate(iconBorderHoverRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container`,
				styles: {
					gap: rangerCss(subTitleGap, deviceType),
					margin: spacingGenerate(titleMargin, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-layout-two-top .sp-smart-post-info-box-icon-container,
	
				#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-four .sp-smart-post-info-box-layout-two-top .sp-smart-post-info-box-icon-container`,
				styles: {
					margin: "0",
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-title`,
				styles: {
					"font-size": rangerCss(titleFontSize, deviceType),
					"line-height": rangerCss(titleLineHeight, deviceType),
					"letter-spacing": rangerCss(titleLatterSpacing, deviceType),
					"word-spacing": rangerCss(titleWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-title-container .sp-smart-post-info-box-sub-title`,
				styles: {
					"font-size": rangerCss(subTitleFontSize, deviceType),
					"line-height": rangerCss(subTitleLineHeight, deviceType),
					"letter-spacing": rangerCss(subTitleLatterSpacing, deviceType),
					"word-spacing": rangerCss(subTitleWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-desc`,
				styles: {
					margin: spacingGenerate(descriptionMargin, deviceType),
					"font-size": rangerCss(descriptionFontSize, deviceType),
					"line-height": rangerCss(descriptionLineHeight, deviceType),
					"letter-spacing": rangerCss(descriptionLatterSpacing, deviceType),
					"word-spacing": rangerCss(descriptionWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge `,
				styles: {
					padding: spacingGenerate(badgePadding, deviceType),
					margin: spacingGenerate(badgeMargin, deviceType),
					"border-radius": spacingGenerate(badgeBorderRadius, deviceType),
					"box-shadow": boxCss(badgeBoxShadowEnable, deviceType, badgeBoxShadow, "color"),
					"border-width": spacingGenerate(badgeBorderStyleWidth, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge:hover `,
				styles: {
					"border-radius": spacingGenerate(badgeBorderHoverRadius, deviceType),
					"box-shadow": boxCss(badgeBoxShadowHoverEnable, deviceType, badgeBoxShadowHover, "color"),
					"border-width": spacingGenerate(badgeBorderStyleHoverWidth, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge:hover::before `,
				styles: {
					"border-radius": spacingGenerate(badgeBorderHoverRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-badge .sp-smart-post-info-box-badge-label`,
				styles: {
					"font-size": rangerCss(badgeFontSize, deviceType),
					"line-height": rangerCss(badgeLineHeight, deviceType),
					"letter-spacing": rangerCss(badgeLatterSpacing, deviceType),
					"word-spacing": rangerCss(badgeWordSpacing, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper`,
				styles: {
					gap: rangerCss(ratingGap, deviceType),
					margin: spacingGenerate(ratingMargin, deviceType),
				},
			},
			// {
			// 	class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-background ,
			// 	#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-foreground `,
			// 	styles: {
			// 		width: '100%',
			// 		height: '100%',
			// 	},
			// },
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-background svg , 
				#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-icons-foreground svg`,
				styles: {
					width: rangerCss(ratingIconSize, deviceType),
					height: rangerCss(ratingIconSize, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-label`,
				styles: {
					"font-size": rangerCss(ratingFontSize, deviceType),
					"line-height": rangerCss(ratingLineHeight, deviceType),
					"letter-spacing": rangerCss(ratingLatterSpacing, deviceType),
					"word-spacing": rangerCss(ratingWordSpacing, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-rating-wrapper .sp-smart-post-info-box-rating-container`,
				styles: {
					height: rangerCss(ratingIconSize, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta`,
				styles: {
					gap: rangerCss(iconTextGap, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-label`,
				styles: {
					"font-size": rangerCss(cAFontSize, deviceType),
					"line-height": rangerCss(cALineHeight, deviceType),
					"letter-spacing": rangerCss(cALatterSpacing, deviceType),
					"word-spacing": rangerCss(cAWordSpacing, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-icon.library svg`,
				styles: {
					width: rangerCss(cAIconSize, deviceType),
					height: rangerCss(cAIconSize, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta`,
				styles: {
					margin: spacingGenerate(caMargin, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta.linking-type-button`,
				styles: {
					"border-width": spacingGenerate(caBorderStyleWidth, deviceType),
					"border-radius": spacingGenerate(caBorderRadius, deviceType),
					padding: spacingGenerate(caPadding, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta .sp-smart-post-info-box-cta-icon img`,
				styles: {
					width: rangerCss(cAIconCustomWidth, deviceType),
					height: rangerCss(cAIconCustomHeight, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta.linking-type-button:hover`,
				styles: {
					"border-width": spacingGenerate(caHoverBorderStyleWidth, deviceType),
					"border-radius": spacingGenerate(caHoverBorderRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-cta.linking-type-button:hover::before`,
				styles: {
					"border-radius": spacingGenerate(caHoverBorderRadius, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-separator-container`,
				styles: {
					margin: spacingGenerate(separatorMargin, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box .sp-smart-post-info-box-separator-container`,
				styles: {
					"border-bottom-width": rangerCss(separatorThinkness, deviceType),
					width: rangerCss(separatorWidth, deviceType),
				},
			},

			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-two .sp-smart-post-info-box-layout-two-top,
				#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-four .sp-smart-post-info-box-layout-two-top `,
				styles: {
					margin: spacingGenerate(gapBetweenDescription, deviceType),
				},
			},
			{
				class: `#${uniqueId} .sp-smart-post-info-box.smart-info-box-layout-four .sp-smart-post-info-box-layout-two-top `,
				styles: {
					gap: `${fullWidthButton ? "8px" : ""}`,
				},
			},
		];
	};

	let desktopCss = [
		...responsiveCss("Desktop"),
		...infoBoxCSS(),
		...iconImageCSS(),
		...infoBoxLayoutOneCSS(),
		...titleCSS(),
		...descCSS(),
		...badgeCSS(),
		...ratingCSS(),
		...callToActionCSS(),
		...separatorCSS(),
		{
			class: `#${uniqueId} .sp-smart-post-info-box`,
			styles: {
				display: hideOnDesktop ? "none" : "flex",
			},
		},
	];

	// Tablet CSS styles.
	let tabletCss = [
		...responsiveCss("Tablet"),
		{
			class: `#${uniqueId} .sp-smart-post-info-box`,
			styles: {
				display: hideOnTablet ? "none" : "flex",
			},
		},
	];

	// Mobile CSS styles.
	let mobileCss = [
		...responsiveCss("Mobile"),
		{
			class: `#${uniqueId} .sp-smart-post-info-box`,
			styles: {
				display: hideOnMobile ? "none" : "flex",
			},
		},
	];

	const tabletMediaQueryCss = wrapInMediaQuery(objectToCssString(tabletCss), "only screen and (max-width: 1023px)");
	const mobileMediaQueryCss = wrapInMediaQuery(objectToCssString(mobileCss), "only screen and (max-width: 599px)");

	// Combine dynamic CSS and tablet CSS based on the page type
	return `${objectToCssString(desktopCss)} ${tabletMediaQueryCss} ${mobileMediaQueryCss}`;
};

export default dynamicCss;
