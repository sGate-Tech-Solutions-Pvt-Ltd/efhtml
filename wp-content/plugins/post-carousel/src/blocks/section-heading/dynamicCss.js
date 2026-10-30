import { objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };
const dynamicCss = (attributes, currentDevice = "all") => {
	const {
		uniqueId,
		sectionHeadingTypography,
		sectionHeadingFontSize,
		sectionHeadingAliment,
		sectionHeadingColor,
		sectionHeadingFontSpacing,
		sectionHeadingLineHeight,
		sectionHeadingMargin,
		sectionHeadingBorderRadius,
		sectionHeadingPadding,
		sectionHeadingStyleBackgroundColor,
		showSubHeading,
		sectionHeadingStyle,
		sectionSubHeadingTypography,
		sectionSubHeadingFontSize,
		sectionSubHeadingColor,
		sectionSubHeadingFontSpacing,
		sectionSubHeadingLineHeight,
		sectionSubHeadingMargin,
		sectionSubHeadingAliment,
		sectionHeadingWordSpacing,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		globalBreakPointData,
		headingLineThickness,
	} = attributes;

	const getTypographyStyles = ({
		typography,
		fontSize,
		fontSpacing,
		lineHeight,
		wordSpacing,
		device = "Desktop",
	}) => {
		const { family, fontWeight, decoration, transform, style } = typography;

		const typographyStyles = {
			"font-family": family,
			"font-weight": fontWeight,
			"text-decoration": decoration,
			"text-transform": transform,
			"font-style": style,
		};

		const fontStyles = {};
		const styleProperties = [
			{ key: "font-size", source: fontSize },
			{ key: "letter-spacing", source: fontSpacing },
			{ key: "word-spacing", source: wordSpacing },
		];
		styleProperties.forEach(({ key, source }) => {
			if (source?.device?.[device]) {
				fontStyles[key] = source.device?.[device] + source.unit?.[device];
			}
		});
		fontStyles["line-height"] = lineHeight?.device?.[device];
		return device === "Desktop" ? { ...typographyStyles, ...fontStyles } : fontStyles;
	};

	let desktopCss = [
		{
			class: `#${uniqueId}.sp-section-heading-wrapper`,
			styles: {
				"text-align": sectionHeadingAliment,
				margin: spacingGenerate(sectionHeadingMargin, "Desktop"),
			},
		},
		{
			class: `#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container:not(.section-heading-seventeen,.section-heading-eightTeen,.section-heading-twenty) .section-heading-tag`,
			styles: {
				"border-radius": `${sectionHeadingBorderRadius.value}${sectionHeadingBorderRadius.unit}`,
				padding: !["section-heading-five", "section-heading-fourteen"].includes(sectionHeadingStyle)
					? spacingGenerate(sectionHeadingPadding, "Desktop")
					: "",
			},
		},
		{
			class: `#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container:is(.section-heading-seventeen,.section-heading-eightTeen,.section-heading-twenty) .section-heading-tag .sp-heading-text`,
			styles: {
				"border-radius": `${sectionHeadingBorderRadius.value}${sectionHeadingBorderRadius.unit}`,
				padding: !["section-heading-five", "section-heading-fourteen"].includes(sectionHeadingStyle)
					? spacingGenerate(sectionHeadingPadding, "Desktop")
					: "",
			},
		},
		{
			class: `#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container .section-heading-tag h2, #${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container .section-heading-tag .sp-heading-text`,
			styles: {
				...getTypographyStyles({
					typography: sectionHeadingTypography.typography,
					fontSize: sectionHeadingFontSize,
					fontSpacing: sectionHeadingFontSpacing,
					lineHeight: sectionHeadingLineHeight,
					wordSpacing: sectionHeadingWordSpacing,
				}),
				color: sectionHeadingColor.color,
			},
		},
		// section heading two style
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-two .section-heading-tag`,
			styles: {
				"background-color": `${sectionHeadingStyleBackgroundColor.color}`,
			},
		},
		// section heading three style
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-three .section-heading-tag`,
			styles: {
				"border-left": `${rangerCss( headingLineThickness, "Desktop" )} solid ${sectionHeadingStyleBackgroundColor.color}`,
				display: "inline-block",
			},
		},
		// section heading four style
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-four .section-heading-tag .sp-heading-text`,
			styles: {
				"border-bottom": `${rangerCss( headingLineThickness, "Desktop" )} solid ${sectionHeadingStyleBackgroundColor.color}`,
			},
		},
		// section heading five style
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-five .section-heading-tag .sp-heading-text, #${uniqueId} .sp-section-heading-container.section-heading-fourteen .section-heading-tag .sp-heading-text`,
			styles: {
				"background-color": sectionHeadingStyleBackgroundColor.color,
				padding: spacingGenerate(sectionHeadingPadding, "Desktop"),
				display: "inline-block",
				"border-radius": `${sectionHeadingBorderRadius.value}${sectionHeadingBorderRadius.unit}`,
			},
		},
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-five .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-six .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-seven .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-eight .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-nine .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-nine .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-ten .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-thirteen .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-thirteen .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-fourteen .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-fifteen .section-heading-tag .sp-heading-text::before`,
			styles: {
				height: `${rangerCss( headingLineThickness, "Desktop" )}`,
				"background-color": `${sectionHeadingStyleBackgroundColor.color}`,
			},
		},
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyThree .section-heading-tag::after`,
			styles: {
				"border-top-color": `${sectionHeadingStyleBackgroundColor.color}`,
			},
		},
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-five .section-heading-tag::after`,
			styles: {
				bottom: "0px",
			},
		},
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-eleven .section-heading-tag, #${uniqueId} .sp-section-heading-container.section-heading-twelve .section-heading-tag`,
			styles: {
				"background-color": sectionHeadingStyleBackgroundColor.color,
			},
		},
		//sixteen
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-sixteen .section-heading-tag::after`,
			styles: {
				height: `${rangerCss( headingLineThickness, "Desktop" )}`,
				background: `linear-gradient(to right, ${sectionHeadingStyleBackgroundColor.color} 80px, color-mix(in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 10px 100px);`,
			},
		},
		/// section heading nineteen
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-nineteen .section-heading-tag .sp-heading-text svg`,
			styles: {
				height: `calc(${rangerCss( headingLineThickness, "Desktop" )} * 3)`,
			}
		},
		//seventeen, eighteen and twenty
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-seventeen .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-eightTeen .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-twenty .section-heading-tag .sp-heading-text::after`,
			styles: {
				height: `${rangerCss( headingLineThickness, "Desktop" )}`,
				background: `linear-gradient(to right, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 0%, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 20%, ${sectionHeadingStyleBackgroundColor.color} 20%, ${sectionHeadingStyleBackgroundColor.color} 80%, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 80%, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 100%);`,
			},
		},
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-eightTeen .section-heading-tag .sp-heading-text::after`,
			styles: {
				height: `${rangerCss( headingLineThickness, "Desktop" )}`,
				background: `linear-gradient(to right, ${sectionHeadingStyleBackgroundColor.color} 50%, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 20%, ${sectionHeadingStyleBackgroundColor.color} 20%, ${sectionHeadingStyleBackgroundColor.color} 0%, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 0%, color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%) 20%);`,
			},
		},
		// twenty one
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag .sp-heading-text::before, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag::after`,
			styles: {
				height: `${rangerCss( headingLineThickness, "Desktop" )}`,
				"background-color": sectionHeadingStyleBackgroundColor.color,
			},
		},
		// twenty two
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyTwo .section-heading-tag`,
			styles: {
				"border-top-color": `color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%)`,
				"border-right-color": `color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%)`,
				"border-bottom-color": `color-mix( in srgb, ${sectionHeadingStyleBackgroundColor.color}, transparent 50%)`,
				"border-left-color": sectionHeadingStyleBackgroundColor.color,
				"border-top-width": `calc(${rangerCss( headingLineThickness, "Desktop" )} / 2)`,
				"border-right-width": `calc(${rangerCss( headingLineThickness, "Desktop" )} / 2)`,
				"border-bottom-width": `calc(${rangerCss( headingLineThickness, "Desktop" )} / 2)`,
				"border-left-width": `${rangerCss( headingLineThickness, "Desktop" )}`,
			},
		},
		// twenty three
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyThree .section-heading-tag`,
			styles: {
				"background-color": sectionHeadingStyleBackgroundColor.color,
				"border-radius": `${sectionHeadingBorderRadius.value}${sectionHeadingBorderRadius.unit}`,
				position: "relative",
			},
		},
		// twenty four
		{
			class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyFour .section-heading-tag`,
			styles: {
				"border-radius": `${sectionHeadingBorderRadius.value}${sectionHeadingBorderRadius.unit}`,
				"background-color": sectionHeadingStyleBackgroundColor.color,
			},
		},
		...(hideOnDesktop
			? [
					{
						class: `#${uniqueId}`,
						styles: {
							display: "none",
						},
					},
				]
			: []),
	];

	/* sub heading desktop css */
	if (showSubHeading) {
		desktopCss = [
			...desktopCss,
			{
				class: `#${uniqueId} .sp-section-subheading-container`,
				styles: {
					margin: spacingGenerate(sectionSubHeadingMargin, "Desktop"),
				},
			},
			{
				class: `#${uniqueId} .sp-section-subheading-container .sp-subheading-text`,
				styles: {
					...getTypographyStyles({
						typography: sectionSubHeadingTypography.typography,
						fontSize: sectionSubHeadingFontSize,
						fontSpacing: sectionSubHeadingFontSpacing,
						lineHeight: sectionSubHeadingLineHeight,
					}),
					color: sectionSubHeadingColor.color,
					"text-align": sectionSubHeadingAliment,
				},
			},
		];
	}

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		// Tablet CSS styles.
		let tabletCss = [
			{
				class: `#${uniqueId}.sp-section-heading-wrapper
			.sp-section-heading-container`,
				styles: {
					margin: spacingGenerate(sectionHeadingMargin, "Tablet"),
				},
			},
			{
				class: `#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container .section-heading-tag h2,
			#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container .section-heading-tag .sp-heading-text`,
				styles: {
					...getTypographyStyles({
						typography: sectionHeadingTypography.typography,
						fontSize: sectionHeadingFontSize,
						fontSpacing: sectionHeadingFontSpacing,
						lineHeight: sectionHeadingLineHeight,
						device: "Tablet",
					}),
					padding: spacingGenerate(sectionHeadingPadding, "Tablet"),
				},
			},
			// section heading three style
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-three .section-heading-tag`,
				styles: {
					"border-left": `${rangerCss( headingLineThickness, "Tablet" )} solid ${sectionHeadingStyleBackgroundColor.color}`,
				},
			},
			// section heading four style
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-four .section-heading-tag .sp-heading-text`,
				styles: {
					"border-bottom": `${rangerCss( headingLineThickness, "Tablet" )} solid ${sectionHeadingStyleBackgroundColor.color}`,
				},
			},
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-five .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-six .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-seven .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-eight .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-nine .section-heading-tag::after,
			#${uniqueId} .sp-section-heading-container.section-heading-nine .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-ten .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-thirteen .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-thirteen .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-fourteen .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-fifteen .section-heading-tag::before`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Tablet" )}`,
				},
			},
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-sixteen .section-heading-tag::after`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Tablet" )}`,
				},
			},
			/// section heading nineteen
			//seventeen, eighteen and twenty
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-seventeen .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-eightTeen .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-twenty .section-heading-tag .sp-heading-text::after`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Tablet" )}`,
				},
			},
			// TwentyOne
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag .sp-heading-text::before, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag::after`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Tablet" )}`,
				},
			},
			// twenty two
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyTwo .section-heading-tag`,
				styles: {
					"border-top-width": `calc(${rangerCss( headingLineThickness, "Tablet" )} / 2)`,
					"border-right-width": `calc(${rangerCss( headingLineThickness, "Tablet" )} / 2)`,
					"border-bottom-width": `calc(${rangerCss( headingLineThickness, "Tablet" )} / 2)`,
					"border-left-width": `${rangerCss( headingLineThickness, "Tablet" )}`,
				},
			},
			...(hideOnTablet
				? [
						{
							class: `#${uniqueId}`,
							styles: {
								display: "none",
							},
						},
					]
				: []),
		];

		/* sub heading tablet css */
		if (showSubHeading) {
			tabletCss = [
				...tabletCss,
				{
					class: `#${uniqueId} .sp-section-subheading-container`,
					styles: {
						margin: spacingGenerate(sectionSubHeadingMargin, "Tablet"),
					},
				},
				{
					class: `#${uniqueId} .sp-section-subheading-container .sp-subheading-text`,
					styles: {
						...getTypographyStyles({
							typography: sectionSubHeadingTypography.typography,
							fontSize: sectionSubHeadingFontSize,
							fontSpacing: sectionSubHeadingFontSpacing,
							lineHeight: sectionSubHeadingLineHeight,
							device: "Tablet",
						}),
					},
				},
			];
		}
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		// Mobile CSS styles.
		let mobileCss = [
			{
				class: `#${uniqueId}.sp-section-heading-wrapper
			.sp-section-heading-container`,
				styles: {
					margin: spacingGenerate(sectionHeadingMargin, "Mobile"),
				},
			},
			{
				class: `#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container .section-heading-tag h2,
			#${uniqueId}.sp-section-heading-wrapper .sp-section-heading-container .section-heading-tag .sp-heading-text`,
				styles: {
					...getTypographyStyles({
						typography: sectionHeadingTypography.typography,
						fontSize: sectionHeadingFontSize,
						fontSpacing: sectionHeadingFontSpacing,
						lineHeight: sectionHeadingLineHeight,
						device: "Mobile",
					}),
					padding: spacingGenerate(sectionHeadingPadding, "Mobile"),
				},
			},
			// section heading three style
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-three .section-heading-tag`,
				styles: {
					"border-left": `${rangerCss( headingLineThickness, "Mobile" )} solid ${sectionHeadingStyleBackgroundColor.color}`,
				},
			},
			// section heading four style
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-four .section-heading-tag .sp-heading-text`,
				styles: {
					"border-bottom": `${rangerCss( headingLineThickness, "Mobile" )} solid ${sectionHeadingStyleBackgroundColor.color}`,
				},
			},
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-five .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-six .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-seven .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-eight .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-nine .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-nine .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-ten .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-thirteen .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-thirteen .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-fourteen .section-heading-tag::after, #${uniqueId} .sp-section-heading-container.section-heading-fifteen .section-heading-tag::before`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Mobile" )}`,
				},
			},
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-sixteen .section-heading-tag::after`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Mobile" )}`,
				},
			},
			/// section heading nineteen
			//seventeen, eighteen and twenty
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-seventeen .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-eightTeen .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-twenty .section-heading-tag .sp-heading-text::after`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Mobile" )}`,
				},
			},
			// TwentyOne
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag .sp-heading-text::before, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag::before, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag .sp-heading-text::after, #${uniqueId} .sp-section-heading-container.section-heading-twentyOne .section-heading-tag::after`,
				styles: {
					height: `${rangerCss( headingLineThickness, "Mobile" )}`,
				},
			},
			// twenty two
			{
				class: `#${uniqueId} .sp-section-heading-container.section-heading-twentyTwo .section-heading-tag`,
				styles: {
					"border-top-width": `calc(${rangerCss( headingLineThickness, "Tablet" )} / 2)`,
					"border-right-width": `calc(${rangerCss( headingLineThickness, "Tablet" )} / 2)`,
					"border-bottom-width": `calc(${rangerCss( headingLineThickness, "Tablet" )} / 2)`,
					"border-left-width": `${rangerCss( headingLineThickness, "Tablet" )}`,
				},
			},

			...(hideOnMobile
				? [
						{
							class: `#${uniqueId}`,
							styles: {
								display: "none",
							},
						},
					]
				: []),
		];

		/* sub heading tablet css */
		if (showSubHeading) {
			mobileCss = [
				...mobileCss,
				{
					class: `#${uniqueId} .sp-section-subheading-container`,
					styles: {
						margin: spacingGenerate(sectionSubHeadingMargin, "Mobile"),
					},
				},
				{
					class: `#${uniqueId} .sp-section-subheading-container .sp-subheading-text`,
					styles: {
						...getTypographyStyles({
							typography: sectionSubHeadingTypography.typography,
							fontSize: sectionSubHeadingFontSize,
							fontSpacing: sectionSubHeadingFontSpacing,
							lineHeight: sectionSubHeadingLineHeight,
							device: "Mobile",
						}),
					},
				},
			];
		}

		cacheCss.mobile = wrapInMediaQuery(
			objectToCssString(mobileCss),
			`only screen and (max-width: ${globalBreakPointData?.mobile}px)`
		);
	}

	return `${cacheCss.desktop} ${cacheCss.tablet} ${cacheCss.mobile}`;
};

export default dynamicCss;