import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { useEffect, useMemo, useRef, useState } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { getBlockShortName, jsonStringify } from "../shared/helpFn";
import Inspector from "./inspect";
import { TogglePanelBodyProvider } from "../../context";
import dynamicCssFn from "./dynamicCss";
import { googleFonts } from "../../controls/controls";

const SmartListsEdit = ({ attributes, setAttributes, clientId, name, isSelected }) => {
	const {
		uniqueId,
		blockName,
		listOrientation,
		iconContentGap,
		smartListsBg,
		smartListsRadialShape,
		smartListsRadialPosition,
		smartListsHoverRadialShape,
		smartListsHoverRadialPosition,
		smartListsBgImage,
		iconAlignment,
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
		iconBgRadialShape,
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
		iconHorizontalAlignment,
		titleWordSpacing,
		descriptionTypography,
		descriptionColor,
		descriptionFontSize,
		descriptionLatterSpacing,
		descriptionWordSpacing,
		descriptionLineHeight,
		iconBgRadialPosition,
		listsAlignment,
		iconBg,
		iconPadding,
		iconBorderRadius,
		iconBorderStyleWidth,
		iconColor,
		iconHoverBorderStyle,
		iconHoverBorderRadius,
		iconHoverBorderStyleWidth,
		iconBgHoverRadialShape,
		iconBgHoverRadialPosition,
		iconBackgroundEnable,
		dividerColor,
		spaceBetweenLists,
		iconVerticalAlignment,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		iconSize,
		iconCustomWidth,
		iconCustomHeight,
		advancedAdditionalClass,
		smartListsLayout,
		dividerEnable,
		borderHoverStyle,
		iconSource,
		svgIconName,
		contentAlignment,
		listItemsWidth,
	} = attributes;

	const googleFontLists = [titleTypography, descriptionTypography];
	const containerRef = useRef();

	useEffect(() => {
		const uniqueId = `sp-smart-post-smart-lists-${clientId?.split("-").pop()}`;
		setAttributes({ uniqueId: uniqueId });
	}, [clientId]);

	const googleFontListsEditor = useMemo(() => googleFonts(googleFontLists), googleFontLists);

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
		});
	}, googleFontLists);

	const dynamicCssValue = useMemo(
		() => dynamicCssFn(attributes, "frontend"),
		[
			uniqueId,
			listOrientation,
			iconContentGap,
			smartListsBg,
			smartListsRadialShape,
			smartListsRadialPosition,
			smartListsHoverRadialShape,
			smartListsHoverRadialPosition,
			smartListsBgImage,
			iconAlignment,
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
			margin,
			borderHoverStyleWidth,
			borderHoverRadius,
			boxShadowHoverEnable,
			boxShadowHover,
			iconBgRadialShape,
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
			iconHorizontalAlignment,
			titleWordSpacing,
			descriptionTypography,
			descriptionColor,
			descriptionFontSize,
			descriptionLatterSpacing,
			descriptionWordSpacing,
			descriptionLineHeight,
			iconBgRadialPosition,
			listsAlignment,
			iconBg,
			iconPadding,
			iconBorderRadius,
			iconBorderStyleWidth,
			iconColor,
			iconHoverBorderStyle,
			iconHoverBorderRadius,
			iconHoverBorderStyleWidth,
			iconBgHoverRadialShape,
			iconBgHoverRadialPosition,
			iconBackgroundEnable,
			dividerColor,
			spaceBetweenLists,
			iconVerticalAlignment,
			hideOnDesktop,
			hideOnTablet,
			hideOnMobile,
			iconSize,
			iconCustomWidth,
			iconCustomHeight,
			borderHoverStyle,
			iconSource,
			svgIconName,
			iconPosition,
			contentAlignment,
			listItemsWidth,
		]
	);
	const blockProps = useBlockProps();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				blockName: getBlockShortName(name),
			});
		}
	}, []);

	const dividerHideShow = () => {
		const container = containerRef.current;
		const horizontalList = container?.classList.contains("sp-list-orientation-horizontal");
		if (!container && !horizontalList) {
			return;
		}
		const itemsEl = container.querySelectorAll(".wp-block-sp-smart-post-show-smart-list");
		let currentTop = null;
		let lastInRow = null;
		itemsEl?.forEach((element) => {
			element.classList.add("sp-list-divider");
		});
		itemsEl?.forEach((element) => {
			if (currentTop === null) {
				currentTop = element.offsetTop;
			}
			if (element.offsetTop !== currentTop) {
				// new row started
				if (lastInRow) {
					lastInRow.classList.remove("sp-list-divider");
				}
				currentTop = element.offsetTop;
			}
			lastInRow = element;
		});
		if (lastInRow) {
			lastInRow.classList.remove("sp-list-divider");
		}
	};

	const listContainer = containerRef.current;
	const totalItems = listContainer?.querySelectorAll(".wp-block-sp-smart-post-show-smart-list");
	const viewAlign = attributes?.align ? attributes.align : "none";

	useEffect(() => {
		dividerHideShow();
		window.addEventListener("resize", dividerHideShow);
		return () => window.removeEventListener("resize", dividerHideShow);
	}, [totalItems?.length, listOrientation, isSelected, viewAlign]);

	return (
		<div {...blockProps}>
			<style>
				{googleFontListsEditor}
				{dynamicCssValue}
			</style>

			<TogglePanelBodyProvider>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					Inspector={Inspector}
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</TogglePanelBodyProvider>
			<ul
				ref={containerRef}
				id={uniqueId}
				className={`sp-smart-post-smart-lists-wrapper ${smartListsLayout} ${dividerEnable ? "divider" : ""} sp-list-orientation-${listOrientation} ${advancedAdditionalClass ? advancedAdditionalClass : ""}`}
			>
				<InnerBlocks
					__experimentalCaptureToolbars={false}
					allowedBlocks={["sp-smart-post-show/smart-list"]}
					template={[
						["sp-smart-post-show/smart-list"],
						["sp-smart-post-show/smart-list"],
						["sp-smart-post-show/smart-list"],
					]}
				/>
			</ul>
		</div>
	);
};

export default SmartListsEdit;
