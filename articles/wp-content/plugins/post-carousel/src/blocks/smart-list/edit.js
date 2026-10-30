import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useMemo } from "@wordpress/element";
import { getBlockShortName, jsonStringify } from "../shared/helpFn";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import Inspector from "./inspect";
import { TogglePanelBodyProvider } from "../../context";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import RenderHtml from "./renderHtml";
import dynamicCssFn from "./dynamicCss";
import { googleFonts } from "../../controls/controls";
import { useSyncParentAttributes } from "./hook";
import { useSelect } from "@wordpress/data";

const SmartListEdit = ({ attributes, setAttributes, clientId, name }) => {
	const {
		uniqueId,
		blockName,
		advancedAdditionalClass,
		iconSource,
		svgIconName,
		borderStyle,
		smartListBg,
		smartListRadialShape,
		smartListRadialPosition,
		borderHoverStyle,
		smartListHoverRadialShape,
		smartListHoverRadialPosition,
		borderRadius,
		boxShadowEnable,
		listBoxShadow,
		borderHoverRadius,
		boxShadowHoverEnable,
		borderStyleWidth,
		borderHoverStyleWidth,
		boxShadowHover,
		listPadding,
		iconSize,
		iconCustomWidth,
		iconCustomHeight,
		iconPosition,
		titleDescriptionGap,
		iconHorizontalAlignment,
		iconBackgroundEnable,
		iconBg,
		iconBorderStyle,
		backgroundShape,
		iconHoverBorderStyle,
		iconColor,
		iconPadding,
		iconBgHoverRadialShape,
		iconBgHoverRadialPosition,
		iconHoverBorderStyleWidth,
		iconHoverBorderRadius,
		titleColor,
		descriptionColor,
		iconAlignment,
		titleTypography,
		descriptionTypography,
		iconBorderStyleWidth,
		titleFontSize,
		titleLineHeight,
		titleLatterSpacing,
		titleWordSpacing,
		descriptionFontSize,
		descriptionLineHeight,
		descriptionLatterSpacing,
		descriptionWordSpacing,
		badgeColor,
		badgeTypography,
		badgeBgColor,
		badgeBorderStyle,
		badgeFontSize,
		badgeLineHeight,
		badgeLatterSpacing,
		badgeWordSpacing,
		badgePadding,
		badgeMargin,
		badgeBorderStyleWidth,
		badgeBorderRadius,
		parentListsLayout,
		iconBgRadialShape,
		iconBgRadialPosition,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		iconBorderRadius,
		padding,
		fontLists,
		// listItemWidth,
	} = attributes;

	// Setup
	const parentAttributes = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlock } = select("core/block-editor");
			const parentClientId = getBlockRootClientId(clientId);
			return getBlock(parentClientId)?.attributes;
		},
		[clientId]
	);

	const blockProps = useBlockProps({ className: advancedAdditionalClass });

	// Fonts
	const googleFontLists = useMemo(
		() => [titleTypography, descriptionTypography, badgeTypography],
		[titleTypography, descriptionTypography, badgeTypography]
	);

	const googleFontListsEditor = useMemo(() => googleFonts(googleFontLists), [googleFontLists]);

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
		});
	}, [googleFontLists]);

	useEffect(() => {
		setAttributes({
			uniqueId: `sp-smart-post-smart-list-${clientId?.split("-").pop()}`,
		});
	}, [clientId]);

	// Dynamic CSS
	const dynamicCssValue = useMemo(
		() => dynamicCssFn(attributes, "frontend"),
		[
			uniqueId,
			borderStyle,
			padding,
			smartListBg,
			smartListRadialShape,
			smartListRadialPosition,
			borderHoverStyle,
			smartListHoverRadialShape,
			smartListHoverRadialPosition,
			borderStyleWidth,
			borderRadius,
			boxShadowEnable,
			listBoxShadow,
			borderHoverStyleWidth,
			borderHoverRadius,
			boxShadowHoverEnable,
			iconAlignment,
			boxShadowHover,
			listPadding,
			iconSize,
			iconSource,
			iconBorderRadius,
			iconCustomWidth,
			iconCustomHeight,
			iconPosition,
			iconHorizontalAlignment,
			iconBackgroundEnable,
			iconBg,
			iconBorderStyle,
			backgroundShape,
			iconHoverBorderStyle,
			iconColor,
			iconPadding,
			iconHoverBorderRadius,
			iconHoverBorderStyleWidth,
			iconBorderStyleWidth,
			titleColor,
			descriptionColor,
			titleTypography,
			descriptionTypography,
			titleFontSize,
			titleLineHeight,
			titleLatterSpacing,
			titleWordSpacing,
			descriptionFontSize,
			descriptionLineHeight,
			descriptionLatterSpacing,
			descriptionWordSpacing,
			badgeColor,
			badgeTypography,
			badgeBgColor,
			badgeBorderStyle,
			badgeFontSize,
			badgeLineHeight,
			badgeLatterSpacing,
			badgeWordSpacing,
			badgePadding,
			badgeMargin,
			badgeBorderStyleWidth,
			badgeBorderRadius,
			titleDescriptionGap,
			iconBgHoverRadialShape,
			iconBgHoverRadialPosition,
			iconBg,
			iconBgRadialShape,
			iconBgRadialPosition,
			svgIconName,
			hideOnDesktop,
			hideOnTablet,
			hideOnMobile,
			// listItemWidth,
		]
	);

	// BlockName init
	useEffect(() => {
		if (!blockName) {
			setAttributes({ blockName: getBlockShortName(name) });
		}
	}, []);

	useSyncParentAttributes({ parentAttributes, attributes, setAttributes });

	useEffect(() => {
		const isSpecialLayout = ["layout-four", "layout-five"].includes(parentListsLayout);
		const newPadding = isSpecialLayout
			? { top: "12", right: "12", bottom: "12", left: "12" }
			: { top: "0", right: "0", bottom: "0", left: "0" };

		setAttributes({
			padding: {
				...padding,
				device: { ...padding.device, Desktop: newPadding },
			},
		});
	}, [parentListsLayout]);

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

				<RenderHtml attributes={attributes} setAttributes={setAttributes} />
			</TogglePanelBodyProvider>
		</div>
	);
};

export default SmartListEdit;
