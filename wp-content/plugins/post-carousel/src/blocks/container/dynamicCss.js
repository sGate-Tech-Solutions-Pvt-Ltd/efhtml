import { select } from "@wordpress/data";
import { backgroundStyle, gradientHoverStyle } from "../../controls/controls";
import { boxCss, colorControls, objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		containerPadding,
		containerMargin,
		containerWidth,
		containerCustomWidth,
		contentWidth,
		contentHeightType,
		containerMinHeight,
		columnsGap,
		rowGap,
		equalHeight,
		containerOverflow,
		containerBG,
		containerBGImage,
		containerOverlayBg,
		containerOverlayType,
		containerOverlayOpacity,
		containerOverlayBlandMode,
		containerBorder,
		containerBorderWidth,
		containerBorderRadius,
		containerBoxShadowEnable,
		containerBoxShadow,
		containerFlexDirection,
		containerJustifyContent,
		containerFlexWrap,
		containerAlignItem,
		shapeDividerWidthTop,
		shapeDividerHeightTop,
		shapeDividerWidthBottom,
		shapeDividerHeightBottom,
		shapeDividerBgColorTop,
		shapeDividerBringToFrontTop,
		shapeDividerBringToFrontBottom,
		advanceZIndex,
		advanceVisibilityHideDesktop,
		advanceVisibilityHideTablet,
		advanceVisibilityHideMobile,
		containerBGImageHover,
		shapeDividerBgColorBottom,
		containerBoxShadowEnableHover,
		containerBoxShadowHover,
		containerOverlayTypeHover,
		containerOverlayOpacityHover,
		containerOverlayBlandModeHover,
		containerBorderWidthHover,
		containerBorderRadiusHover,
		columns,
		columnsTablet,
		columnsMobile,
		// globalBreakPointData
	} = attributes;
	const globalBreakPointData = sp_smart_post_block_localize?.breakPoint;

	// const globalBreakPointData = select("smartpost/global-settings").getCategory("breakpoint");

	const containerHeightObj = {
		default: "fit-content",
		"fit-to-screen": "100vh",
	};

	const imageNormalOverlay = (deviceType) => {
		return ["image", "video"].includes(containerBG.color.style)
			? [
					{
						class: `.${uniqueId}::before`,
						styles: {
							...backgroundStyle(containerOverlayBg, "", false, "no-overlay" !== containerOverlayType),
							"mix-blend-mode": containerOverlayBlandMode,
							opacity:
								"no-overlay" !== containerOverlayType
									? containerOverlayOpacity?.device?.[deviceType] +
										containerOverlayOpacity?.unit?.[deviceType]
									: "0",
							transition: "all 0.3s ease-in-out",
						},
					},
					{
						class: `.${uniqueId}:hover::before`,
						styles: {
							opacity: 0
						},
					},
				]
			: [];
	};
	const imageHoverOverlay = (deviceType) => {
		return ["image"].includes(containerBG.hover.style)
			? [
					{
						class: `.${uniqueId}:hover::after`,
						styles: {
							...backgroundStyle(
								containerOverlayBg,
								"",
								true,
								"no-overlay" !== containerOverlayTypeHover
							),
							"mix-blend-mode": containerOverlayBlandModeHover,
						},
					},
					{
						class: `.${uniqueId}:hover::after`,
						styles: {
							opacity:
								"no-overlay" !== containerOverlayTypeHover
									? containerOverlayOpacityHover?.device?.[deviceType] +
										containerOverlayOpacityHover?.unit?.[deviceType]
									: "0",
							transition: "all 0.3s ease-in-out",
						},
					},
				]
			: [
					{
						class: `.${uniqueId}:hover::after`,
						styles: {
							background: "transparent",
						},
					},
				];
	};
	const imageOverlayStyles = (deviceType) => {
		return [...imageNormalOverlay(deviceType), ...imageHoverOverlay(deviceType)];
	};

	const responsiveCss = (deviceType) => {
		const responsiveData = [
			{
				class: `.${uniqueId}-boxed`,
				styles: {
					margin: spacingGenerate(containerMargin, deviceType),
				},
			},
			{
				class: `.${uniqueId}`,
				styles: {
					padding: spacingGenerate(containerPadding, deviceType),
					width:
						containerWidth === "boxed"
							? (containerCustomWidth?.device?.[deviceType] || 1200) +
								containerCustomWidth?.unit?.[deviceType]
							: "",
					"border-width": spacingGenerate(containerBorderWidth, deviceType),
					"border-radius": spacingGenerate(containerBorderRadius, deviceType),
					"box-shadow": boxCss(containerBoxShadowEnable, deviceType, containerBoxShadow, "color"),
					"box-sizing": "border-box",
					margin: "auto",
					"max-width": "100% !important",
				},
			},
			{
				class: `.${uniqueId}:hover`,
				styles: {
					"box-shadow": boxCss(containerBoxShadowEnableHover, deviceType, containerBoxShadowHover, "color"),
					"border-width": spacingGenerate(containerBorderWidthHover, deviceType),
					"border-radius": spacingGenerate(containerBorderRadiusHover, deviceType),
				},
			},
			{
				class: `.${uniqueId} .sp-smart-post-container-parent-block`,
				styles: {
					"max-width": contentWidth.device?.[deviceType] ? rangerCss(contentWidth, [deviceType]) : `${parseInt(globalBreakPointData?.container) || 1200 }px`,
				},
			},

			{
				class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-top`,
				styles: {
					width: shapeDividerWidthTop.device?.[deviceType] + shapeDividerWidthTop.unit?.[deviceType],
					height: shapeDividerHeightTop.device?.[deviceType] + shapeDividerHeightTop.unit?.[deviceType],
				},
			},
			{
				class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-bottom`,
				styles: {
					width: shapeDividerWidthBottom.device?.[deviceType] + shapeDividerWidthBottom.unit?.[deviceType],
					height: shapeDividerHeightBottom.device?.[deviceType] + shapeDividerHeightBottom.unit?.[deviceType],
				},
			},
			{
                class: `.${uniqueId} .sp-smart-post-container-column`,
                styles: {
                    "flex-basis": (columns > 4 && ["row", "row-reverse"].includes(containerFlexDirection.device[deviceType])) ? `calc(${100 / columns}% - ${rangerCss(columnsGap, [deviceType])})` : "",
                },
            },
		];
		if ( page === "editor" ) {
			responsiveData.push( ...[
				{
					class: `.${uniqueId} .sp-smart-post-container-parent-block > .block-editor-inner-blocks > .block-editor-block-list__layout`,
					styles: {
						"column-gap": columnsGap.device?.[deviceType] + columnsGap.unit?.[deviceType],
						"row-gap": rowGap.device?.[deviceType] + rowGap.unit?.[deviceType],
						"min-height":
							containerHeightObj[contentHeightType] ||
							containerMinHeight?.device?.[deviceType] + containerMinHeight?.unit?.[deviceType] ||
							"auto",
					},
				},
				{
					class: `.${uniqueId} .sp-smart-post-container-parent-block > .block-editor-inner-blocks > .block-editor-block-list__layout`,
					styles: {
						display: "flex",
						"flex-wrap": containerFlexWrap.device?.[deviceType],
						"flex-direction": containerFlexDirection.device?.[deviceType],
						"align-items": containerAlignItem.device?.[deviceType],
						"justify-content": containerJustifyContent.device?.[deviceType],
					},
				},
				{
					class: `.${uniqueId} .sp-resizable-box .components-resizable-box__container .components-resizable-box__handle-right`,
					styles: {
						right: `calc(-11.5px - ${columnsGap?.device?.[ deviceType ] / 2}px)`,
					},
				},
			] );
		}
		if ( page === "frontend" ) {
			responsiveData.push( ...[
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page .sp-smart-post-container-parent-block`,
					styles: {
						"column-gap": columnsGap.device?.[deviceType] + columnsGap.unit?.[deviceType],
						"row-gap": rowGap.device?.[deviceType] + rowGap.unit?.[deviceType],
						"min-height":
							containerHeightObj[contentHeightType] ||
							containerMinHeight?.device?.[deviceType] + containerMinHeight?.unit?.[deviceType] ||
							"auto",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page .sp-smart-post-container-parent-block`,
					styles: {
						display: "flex",
						"flex-wrap": containerFlexWrap.device?.[deviceType],
						"flex-direction": containerFlexDirection.device?.[deviceType],
						"align-items": containerAlignItem.device?.[deviceType],
						"justify-content": containerJustifyContent.device?.[deviceType],
					},
				},
			]);
		}
		if ( page === "frontend"  && ["row", "row-reverse"].includes( containerFlexDirection.device?.[deviceType] ) ) {
			responsiveData.push( ...[
				// Two column layouts
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-2 > .sp-smart-post-container-column:nth-of-type( odd )`,
					styles: {
						width: "calc( var( --columnOne, 50% ) - ( var( --gap, 16px ) / 2) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-2 > .sp-smart-post-container-column:nth-of-type( even )`,
					styles: {
						width: "calc( var( --columnTwo, 50% ) - ( var( --gap, 16px ) / 2) )",
					},
				},
				// Three columns layouts
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-3 > .sp-smart-post-container-column:nth-of-type( 3n + 1 )`,
					styles: {
						width: "calc( var( --columnOne, 33.33% ) - ( var( --gap, 16px ) / 3) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-3 > .sp-smart-post-container-column:nth-of-type( 3n + 2 )`,
					styles: {
						width: "calc( var( --columnTwo, 33.33% ) - ( var( --gap, 16px ) / 3) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-3 > .sp-smart-post-container-column:nth-of-type( 3n + 3 )`,
					styles: {
						width: "calc( var( --columnThree, 33.33% ) - ( var( --gap, 16px ) / 3) )",
					},
				},
				// Four columns layouts
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-4 > .sp-smart-post-container-column:nth-of-type( 4n + 1 )`,
					styles: {
						width: "calc( var( --columnOne, 25% ) - ( var( --gap, 16px ) / 4) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-4 > .sp-smart-post-container-column:nth-of-type( 4n + 2 )`,
					styles: {
						width: "calc( var( --columnTwo, 25% ) - ( var( --gap, 16px ) / 4) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-4 > .sp-smart-post-container-column:nth-of-type( 4n + 3 )`,
					styles: {
						width: "calc( var( --columnThree, 25% ) - ( var( --gap, 16px ) / 4) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-4 > .sp-smart-post-container-column:nth-of-type( 4n + 4 )`,
					styles: {
						width: "calc( var( --columnFour, 25% ) - ( var( --gap, 16px ) / 4) )",
					},
				},
				// Multi-row layout one.
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-one > .sp-smart-post-container-column:nth-of-type( 6n + 1 )`,
					styles: {
						width: "calc( var( --columnOne, 33.33% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-one > .sp-smart-post-container-column:nth-of-type( 6n + 2 )`,
					styles: {
						width: "calc( var( --columnTwo, 33.33% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-one > .sp-smart-post-container-column:nth-of-type( 6n + 3 )`,
					styles: {
						width: "calc( var( --columnThree, 33.33% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-one > .sp-smart-post-container-column:nth-of-type( 6n + 4 )`,
					styles: {
						width: "calc( var( --columnFour, 33.33% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-one > .sp-smart-post-container-column:nth-of-type( 6n + 5 )`,
					styles: {
						width: "calc( var( --columnFive, 33.33% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-one > .sp-smart-post-container-column:nth-of-type( 6n + 6 )`,
					styles: {
						width: "calc( var( --columnSix, 33.33% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				// Multi-row layout five
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-five > .sp-smart-post-container-column:nth-of-type( 3n + 1 )`,
					styles: {
						width: "calc( var( --columnOne, 50% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-five > .sp-smart-post-container-column:nth-of-type( 3n + 2 )`,
					styles: {
						width: "calc( var( --columnTwo, 50% ) - ( var( --gap, 16px ) / var( --gapMultiplier, 3 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row.container-column-multi-row-layout-five > .sp-smart-post-container-column:nth-of-type( 3n + 3 )`,
					styles: {
						width: "calc( var( --columnThree, 100% ) )",
					},
				},
				// Multi row not( layout one, layout five )
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row:not(.container-column-multi-row-layout-one, .container-column-multi-row-layout-five) > .sp-smart-post-container-column:nth-of-type( 4n + 1 )`,
					styles: {
						width: "calc( var( --columnOne, 50% ) - ( var( --gap, 32px ) / var( --gapMultiplier, 2 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row:not(.container-column-multi-row-layout-one, .container-column-multi-row-layout-five) > .sp-smart-post-container-column:nth-of-type( 4n + 2 )`,
					styles: {
						width: "calc( var( --columnTwo, 50% ) - ( var( --gap, 32px ) / var( --gapMultiplier, 2 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row:not(.container-column-multi-row-layout-one, .container-column-multi-row-layout-five) > .sp-smart-post-container-column:nth-of-type( 4n + 3 )`,
					styles: {
						width: "calc( var( --columnThree, 50% ) - ( var( --gap, 32px ) / var( --gapMultiplier, 2 )) )",
					},
				},
				{
					class: `.${uniqueId}.sp-smart-post-show-container-front-page > .sp-smart-post-container-column-multi-row:not(.container-column-multi-row-layout-one, .container-column-multi-row-layout-five) > .sp-smart-post-container-column:nth-of-type( 4n + 4 )`,
					styles: {
						width: "calc( var( --columnFour, 50% ) - ( var( --gap, 32px ) / var( --gapMultiplier, 2 )) )",
					},
				},
			])
		}
		return responsiveData;
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		...imageOverlayStyles("Desktop"),
		{
			class: `.${uniqueId}`,
			styles: {
				// "max-width": "none !important",
				overflow: containerOverflow,
				position: "relative",
				...backgroundStyle(containerBG, containerBGImage, false),
				"background-position": "center",
				"background-attachment": "scroll",
				"background-repeat": "no-repeat",
				"background-size": "cover",
				"border-style": containerBorder.style,
				"border-color": containerBorder.color,
				"z-index": advanceZIndex !== "" ? advanceZIndex : 1,
				transition: "all 0.3s ease-in-out",
			},
		},
		{
			class: `.${uniqueId}:hover`,
			styles: {
				"border-style": containerBorder.hoverStyle,
				"border-color": containerBorder.hoverColor,
			},
		},
		...gradientHoverStyle(`.${uniqueId}`, containerBG, containerBGImageHover ),
		{
			class: `.${uniqueId}::before, .${uniqueId}::after`,
			styles: {
				position: "absolute",
				content: '""',
				top: "0",
				left: "0",
				width: "100%",
				height: "100%",
				"pointer-events": "none",
			},
		},
		{
			class: `.${uniqueId}::after`,
			styles: {
				opacity: 0,
				transition: "all 0.3s ease-in-out"
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-parent-block > .wp-block-sp-smart-post-show-container > .block-editor-inner-blocks > .block-editor-block-list__layout, .${uniqueId}.sp-smart-post-show-container-front-page .sp-smart-post-container-parent-block`,
			styles: {
				display: "flex",
			},
		},
		{
			class: `.${uniqueId} > .block-editor-inner-blocks > .block-editor-block-list__layout .wp-block-sp-smart-post-show-column, .${uniqueId}.sp-smart-post-show-container-front-page .wp-block-sp-smart-post-show-column`,
			styles: {
				height: equalHeight ? "fit-content" : "auto",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape`,
			styles: {
				position: "absolute",
				left: "0",
				display: "block",
				overflow: "hidden",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-top`,
			styles: {
				top: "0",
				"z-index": shapeDividerBringToFrontTop ? "9" : "1",
				"pointer-events": "none",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-bottom`,
			styles: {
				bottom: "0",
				transform: "rotate(180deg)",
				"z-index": shapeDividerBringToFrontBottom ? "9" : "1",
				"pointer-events": "none",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape svg`,
			styles: {
				position: "relative",
				width: "calc( 100% + 3px )",
				left: "-3px",
				display: "block",
				height: "100%",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-top svg .sp-smart-post-show-container_shape-fill`,
			styles: {
				fill: colorControls(
					shapeDividerBgColorTop?.color?.style,
					shapeDividerBgColorTop?.color?.solidColor,
					shapeDividerBgColorTop?.color?.gradient
				),
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-bottom svg .sp-smart-post-show-container_shape-fill`,
			styles: {
				fill: colorControls(
					shapeDividerBgColorBottom?.color?.style,
					shapeDividerBgColorBottom?.color?.solidColor,
					shapeDividerBgColorBottom?.color?.gradient
				),
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-top.sp-smart-post-shape-flip svg`,
			styles: {
				transform: "rotateY(180deg)",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-shape.sp-smart-post-container-shape-bottom.sp-smart-post-shape-flip svg`,
			styles: {
				transform: "rotateY(180deg)",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-container-parent-block-wrapper-link`,
			styles: {
				width: "100%",
				height: "100%",
				position: "absolute",
				top: "0",
				left: "0",
				cursor: "pointer",
				"pointer-events": page === "editor" ? "none" : "all",
				"z-index": "20",
			},
		},
		{
			class: `.${uniqueId} .sp-smart-post-column-wrapper, .${uniqueId} .sp-smart-post-column-wrapper .wp-block-sp-smart-post-show-column, .${uniqueId} .sp-smart-post-show-column, .${uniqueId} .sp-smart-post-show-column .block-editor-inner-blocks, .${uniqueId} .sp-smart-post-show-column .block-editor-block-list__layout`,
			styles: {
				height: equalHeight ? "100%" : "",
			},
		},
		{
			class: `.${uniqueId}`,
			styles: {
				display: advanceVisibilityHideDesktop ? "none" : "block",
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...responsiveCss("Tablet"),
			...imageOverlayStyles("Tablet"),
			{
				class: `.${uniqueId}`,
				styles: {
					display: advanceVisibilityHideTablet ? "none" : "block",
				},
			},
			{
				class: `.${uniqueId} .sp-smart-post-container-parent-block .sp-smart-post-container-column`,
				styles: {
					width: `calc( (100% / ${ columnsTablet || columns }) - (${rangerCss( columnsGap, "Tablet") || rangerCss( columnsGap, "Desktop")} * ${ (columnsTablet || columns) - 1 } / ${ columnsTablet || columns })) !important`,
				},
			},
		];
		cacheCss.tablet = wrapInMediaQuery(
			objectToCssString(tabletCss),
			`only screen and (max-width: ${globalBreakPointData?.tablet}px)`
		);
	}
	if ("Mobile" === currentDevice || "all" === currentDevice) {
		const mobileCss = [
			...responsiveCss("Mobile"),
			...imageOverlayStyles("Mobile"),
			{
				class: `.${uniqueId} .sp-smart-post-container-parent-block > .wp-block-sp-smart-post-show-container > .block-editor-inner-blocks > .block-editor-block-list__layout, .${uniqueId} .sp-smart-post-container-parent-block`,
				styles: {
					"flex-direction": "column",
				},
			},
			{
				class: `.${uniqueId}`,
				styles: {
					display: advanceVisibilityHideMobile ? "none" : "block",
					"margin-left": "auto !important",
					"margin-right": "auto !important",
				},
			},
			{
				class: `.${uniqueId} .sp-smart-post-container-parent-block .sp-smart-post-container-column`,
				styles: {
					width: `calc( (100% / ${ columnsMobile || columns }) - (${rangerCss( columnsGap, "Mobile") || rangerCss( columnsGap, "Desktop")} * ${ (columnsMobile || columns) - 1 } / ${ columnsMobile || columns })) !important`,
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
