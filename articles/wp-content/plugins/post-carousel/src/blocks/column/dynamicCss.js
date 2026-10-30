import { backgroundStyle, gradientHoverStyle } from "../../controls/controls";
import { boxCss, objectToCssString, rangerCss, spacingGenerate, wrapInMediaQuery } from "../shared/helpFn";

const cacheCss = { desktop: "", mobile: "", tablet: "" };

const dynamicCss = (attributes, page = "frontend", currentDevice = "all") => {
	const {
		uniqueId,
		columnWidth,
		columnBg,
		columnBgImage,
		columnBorder,
		columnZIndex,
		columnPadding,
		columnMargin,
		columnBorderWidth,
		columnBorderRadius,
		columnBoxShadowEnable,
		columnBoxShadow,
		columnVisibilityHideDesktop,
		columnVisibilityHideTablet,
		columnVisibilityHideMobile,
		columnBgImageHover,
		columnBoxShadowEnableHover,
		columnBoxShadowHover,
		columnOverlayType,
		columnOverlayBg,
		columnOverlayOpacity,
		columnOverlayBlandMode,
		columnBorderWidthHover,
		columnBorderRadiusHover,
		globalBreakPointData,
		parentColumnGap,
		reduceColWidth,
		parentContainerFlexDirection,
	} = attributes;

	const imageNormalOverlay = (deviceType) => {
		return ["image", "video"].includes(columnBg.color.style)
			? [
					{
						class: `#${uniqueId}`,
						styles: {
							position: "relative",
						},
					},
					{
						class: `#${uniqueId}::after`,
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
						class: `#${uniqueId}::after`,
						styles: {
							...backgroundStyle(columnOverlayBg, "", false, "no-overlay" !== columnOverlayType),
							"mix-blend-mode": columnOverlayBlandMode,
							transition: "all 0.3s ease-in-out",
						},
					},
					{
						class: `#${uniqueId}::after`,
						styles: {
							opacity:
								"no-overlay" !== columnOverlayType
									? columnOverlayOpacity?.device?.[deviceType] +
										columnOverlayOpacity?.unit?.[deviceType]
									: "0",
						},
					},
				]
			: [];
	};

	const imageOverlayStyles = (deviceType) => {
		return [
			...imageNormalOverlay(deviceType),
			// ...imageHoverOverlay( deviceType ),
		];
	};
	const columnMaxWidth = (deviceType) => {
		return page === "frontend"
			? [
					{
						class: `#${uniqueId}`,
						styles: {
							"max-width": rangerCss(columnWidth, [deviceType]) ? `calc(${rangerCss(columnWidth, [deviceType])} - ${ (rangerCss(columnWidth, [deviceType]) !== "100%") ? rangerCss(reduceColWidth, [deviceType]) : "0px" })` : "",
							width: rangerCss(columnWidth, [deviceType]) ? rangerCss(columnWidth, [deviceType]) + "!important" : "",
						},
					},
				]
			: [
					{
						class: `#${uniqueId}`,
						styles: {
							// "flex-basis": columnWidth.device?.[deviceType] + columnWidth.unit?.[deviceType],
							"flex-basis": rangerCss(columnWidth, [deviceType]) ? `calc(${rangerCss(columnWidth, [deviceType])} - ${ (rangerCss(columnWidth, [deviceType]) !== "100%") ? rangerCss(reduceColWidth, [deviceType]) : "0px" })` : "",
							"min-width": 0,
							"max-width": "100%",
							// width: [ "column", "column-reverse" ].includes( parentContainerFlexDirection?.device?.[ deviceType ] ) ? rangerCss(columnWidth, [deviceType]) + "!important" : "",
							width: rangerCss(columnWidth, [deviceType]) ? rangerCss(columnWidth, [deviceType]) + "!important" : "",
						},
					},
					{
						class: `#${uniqueId} .components-resizable-box__container .components-resizable-box__handle-right`,
						styles: {
							right: `calc(-11.5px - (${rangerCss(parentColumnGap, [deviceType])} / 2))`,
						},
					},
					{
						class: `#${uniqueId} .components-resizable-box__container .components-resizable-box__handle-left`,
						styles: {
							left: `calc(-11.5px - (${rangerCss(parentColumnGap, [deviceType])} / 2))`,
						},
					},
				];
	};

	const responsiveCss = (deviceType) => {
		return [
			...columnMaxWidth(deviceType, page),
			{
				class: `#${uniqueId}`,
				styles: {
					// 'max-width':
					// 	columnWidth.device[ deviceType ] +
					// 	columnWidth.unit[ deviceType ],
					"border-width": spacingGenerate(columnBorderWidth, deviceType),
					"border-radius": spacingGenerate(columnBorderRadius, deviceType),
					"box-shadow": boxCss(columnBoxShadowEnable, deviceType, columnBoxShadow, "color"),
				},
			},
			{
				class: `#${uniqueId}:hover`,
				styles: {
					"box-shadow": boxCss(columnBoxShadowEnableHover, deviceType, columnBoxShadowHover, "color"),
					"border-width": spacingGenerate(columnBorderWidthHover, deviceType),
					"border-radius": spacingGenerate(columnBorderRadiusHover, deviceType),
				},
			},
			{
				class: `#${uniqueId} .wp-block-sp-smart-post-show-column`,
				styles: {
					padding: spacingGenerate(columnPadding, deviceType),
					margin: spacingGenerate(columnMargin, deviceType),
				},
			},
		];
	};

	const desktopCss = [
		...responsiveCss("Desktop"),
		...imageOverlayStyles("Desktop"),
		{
			class: `#${uniqueId}`,
			styles: {
				...backgroundStyle(columnBg, columnBgImage, false),
				"border-style": columnBorder.style,
				"border-color": columnBorder.color,
				"z-index": columnZIndex !== "" ? columnZIndex : 2,
			},
		},
		{
			class: `#${uniqueId}:hover`,
			styles: {
				"border-color": columnBorder.hoverColor,
				// ...backgroundStyle( columnBg, {}, true ),
			},
		},
		...gradientHoverStyle(`.${uniqueId}`, columnBg, columnBgImageHover, columnBgImage),
		{
			class: `#${uniqueId} .sp-smart-post-show-column, .${uniqueId} .sp-smart-post-column-wrapper`,
			styles: {
				// position: 'relative',
				// height: '100%',
				"z-index": columnZIndex || 1,
			},
		},
		{
			class: `#${uniqueId} .sp-smart-post-column-block-wrapper-link`,
			styles: {
				// display: 'block',
				// position: 'absolute',
				// top: '0',
				// left: '0',
				// width: '100%',
				// height: '100%',
				// 'text-decoration': 'none',
				// 'background-color': 'transparent',
				"pointer-events": page === "editor" ? "none" : "auto",
			},
		},
		// {
		// 	class: `#${uniqueId} .sp-smart-post-column-block-wrapper-link:focus`,
		// 	styles: {
		// 		outline: 'none',
		// 	},
		// },
		{
			class: `#${uniqueId}`,
			styles: {
				display: columnVisibilityHideDesktop ? "none" : "block",
			},
		},
	];

	cacheCss.desktop = objectToCssString(desktopCss);

	if ("Tablet" === currentDevice || "all" === currentDevice) {
		const tabletCss = [
			...responsiveCss("Tablet"),
			...imageOverlayStyles("Tablet"),
			{
				class: `#${uniqueId}`,
				styles: {
					display: columnVisibilityHideTablet ? "none" : "block",
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
				class: `#${uniqueId}`,
				styles: {
					display: columnVisibilityHideMobile ? "none" : "block",
					// 'max-width': '100%',
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
