import { __ } from "@wordpress/i18n";
import {
	Layouts,
	SelectField,
	SPRangeControl,
	Toggle,
	SPToggleGroupControl,
	Background,
	InputControl,
} from "../../components";
import { store as blockEditorStore } from "@wordpress/block-editor";
import useLayouts from "../../hooks/useLayouts";
import { useEffect, useRef, useState } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import {
	FlexAlignCenter,
	FlexAlignEnd,
	FlexAlignStart,
	FlexAlignStretch,
	FlexColumn,
	FlexColumnReverse,
	FlexJustifyCenter,
	FlexJustifyEnd,
	FlexJustifySpaceAround,
	FlexJustifySpaceBetween,
	FlexJustifySpaceEvenly,
	FlexJustifyStart,
	FlexNoWrap,
	FlexRow,
	FlexRowReverse,
	FlexWrap,
} from "../../icons/icons";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";
import { layoutsColumnsWidth } from "./containerConstant";
import { useSelect, useDispatch, select } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import ProInfo from "../../components/proInfo/proInfo";

export const ContainerGeneralTab = ({ attributes, setAttributes }) => {
	const {
		columns,
		blockName,
		blockClientId,
		layerLayoutNo,
		layout,
		containerLayer,
		containerWidth,
		containerCustomWidth,
		contentWidth,
		contentHeightType,
		containerMinHeight,
		columnsGap,
		rowGap,
		equalHeight,
		htmlTag,
		containerOverflow,
		columnsTablet,
		columnsMobile,
	} = attributes;

	const deviceType = useDeviceType();
	const deviceColumn = columns || "multi-row";
	const layouts = useLayouts(`${blockName}-column-${deviceColumn}`, layout);
	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(blockClientId),
		[blockClientId, columns, layout]
	);
	const { updateBlockAttributes, replaceInnerBlocks } = useDispatch(blockEditorStore);

	const layoutChangeHandler = (newValue) => {
		if (newValue === layout) {
			return;
		}

		setAttributes({ layout: newValue });
	};

	const onColumnsChangeHandler = (newValue, key) => {

		setAttributes({ [key]: newValue });

		if (newValue === columns) {
			return;
		}
		// If child block is less then columns value then create and add a new child block.
		if (newValue > innerBlocks?.length && "Desktop" === deviceType) {
			const updatedBlocks = [];
			for (let index = 0; index < newValue; index++) {
				const existingBlock = innerBlocks[index];
				if (existingBlock) {
					const updatedAttributes = {
						...existingBlock.attributes,
					};
					const updatedBlock = createBlock(
						existingBlock.name,
						updatedAttributes,
						existingBlock.innerBlocks // preserve nested content.
					);
					updatedBlocks.push(updatedBlock);
				} else {
					updatedBlocks.push(
						createBlock("sp-smart-post-show/column", {
							id: `sp-smart-column-${101 + index}`,
						})
					);
				}
			}
			replaceInnerBlocks(blockClientId, updatedBlocks, false);
		}
	};

	useEffect(() => {
		const indexNo = layerLayoutNo !== "" ? layerLayoutNo : 0;
		if (containerLayer && layout === "") {
			setAttributes({ layout: layouts[indexNo]?.value });
		}
	}, []);
	useEffect(() => {
		const matchLayout = layouts?.some((item) => item.value === layout);
		if (!matchLayout && layouts && columns) {
			setAttributes({ layout: layouts[0]?.value });
		}
	}, [layouts]);


	const columnsKey = {
		Desktop: "columns",
		Tablet: "columnsTablet",
		Mobile: "columnsMobile",
	}

	const columnsValue = {
		Desktop: columns,
		Tablet: columnsTablet,
		Mobile: columnsMobile,
	}
	const onContainerWidthHandler = ( newValue ) => {
		if ( newValue === containerWidth ) { return; }
		const alignValue = newValue === "full-width" ? "full" : "none";
		setAttributes({
			containerWidth: newValue,
			align: alignValue,
		})
	}

	return (
		<>
			{!containerLayer.includes("layer-multi-row") && (
				<SPRangeControl
					key={deviceType}
					label={__("Columns", "post-carousel")}
					attributes={columnsValue[deviceType]}
					attributesKey={columnsKey[deviceType]}
					setAttributes={setAttributes}
					max={12}
					min={1}
					// defaultValue={{ value: 3 }}
					resetIcon={false}
					onValueChange={({ value }) => onColumnsChangeHandler(value, columnsKey[deviceType])}
					responsiveIcon={true}
				/>
			)}
			{layouts?.length > 0 && (
				<Layouts
					label={__("Layouts", "post-carousel")}
					attributes={layout}
					attributesKey={"layout"}
					setAttributes={setAttributes}
					items={layouts}
					grid={3}
					onChange={layoutChangeHandler}
				/>
			)}
			<SPToggleGroupControl
				label={__("Container Width", "post-carousel")}
				attributes={containerWidth}
				attributesKey={"containerWidth"}
				setAttributes={setAttributes}
				items={[
					{ label: "Full Width", value: "full-width" },
					{ label: "Boxed", value: "boxed" },
				]}
				onClick={ onContainerWidthHandler }
			/>
			{"boxed" === containerWidth && (
				<SPRangeControl
					label={__("Container Width", "post-carousel")}
					attributes={containerCustomWidth}
					attributesKey={"containerCustomWidth"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					max={1600}
					defaultValue={{ unit: "px", value: "" }}
				/>
			)}
			<SPRangeControl
				label={__("Content Width", "post-carousel")}
				attributes={contentWidth}
				attributesKey={"contentWidth"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				max={1400}
				defaultValue={{ unit: "px", value: "" }}
			/>
			<SelectField
				label={__("Container Height", "post-carousel")}
				attributes={contentHeightType}
				attributesKey={"contentHeightType"}
				setAttributes={setAttributes}
				defaultOption={true}
				items={[
					{ label: "Fit to Screen", value: "fit-to-screen" },
					{ label: "Min Height", value: "min-height" },
				]}
			/>
			{contentHeightType === "min-height" && (
				<SPRangeControl
					label={__("Container Min Height", "post-carousel")}
					attributes={containerMinHeight}
					attributesKey={"containerMinHeight"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					max={1400}
					defaultValue={{ unit: "px", value: 300 }}
				/>
			)}
			{innerBlocks.length > 1 && (
				<>
					<SPRangeControl
						label={__("Column Gap", "post-carousel")}
						attributes={columnsGap}
						attributesKey={"columnsGap"}
						setAttributes={setAttributes}
						units={["px"]}
						max={200}
						defaultValue={{ unit: "px", value: 16 }}
					/>
					<SPRangeControl
						label={__("Row Gap", "post-carousel")}
						attributes={rowGap}
						attributesKey={"rowGap"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						max={200}
						defaultValue={{ unit: "px", value: 16 }}
					/>
				</>
			)}
			<Toggle
				label={__("Equal Height", "post-carousel")}
				attributes={equalHeight}
				attributesKey={"equalHeight"}
				setAttributes={setAttributes}
			/>
			<SelectField
				label={__("HTML Tag", "post-carousel")}
				attributes={htmlTag}
				attributesKey={"htmlTag"}
				setAttributes={setAttributes}
				items={[
					{ label: "Div", value: "div" },
					{ label: "Header", value: "header" },
					{ label: "Footer", value: "footer" },
					{ label: "Main", value: "main" },
					{ label: "Article", value: "article" },
					{ label: "Section", value: "section" },
					{ label: "Aside", value: "aside" },
					{ label: "Figure", value: "figure" },
					{ label: "Figcaption", value: "figcaption" },
					{ label: "Summary", value: "summary" },
					{ label: "nav", value: "nav" },
				]}
			/>
			<SPToggleGroupControl
				label={__("Overflow", "post-carousel")}
				attributes={containerOverflow}
				attributesKey={"containerOverflow"}
				setAttributes={setAttributes}
				items={[
					{ label: "Visible", value: "visible" },
					{ label: "Hidden", value: "hidden" },
					{ label: "Auto", value: "auto" },
				]}
			/>
		</>
	);
};

export const ContainerFlexProperties = ({ attributes, setAttributes }) => {
	const { containerFlexDirection, containerJustifyContent, containerFlexWrap, containerAlignItem, blockClientId } =
		attributes;

	const deviceType = useDeviceType();
	const { getBlockOrder } = useSelect((select) => select("core/block-editor"));
	const { updateBlockAttributes } = useDispatch("core/block-editor");

	const handleFlexDir = (value) => {
		if (value === containerFlexDirection?.device?.[deviceType]) {
			return;
		}

		const childBlocks = getBlockOrder(blockClientId);

		if (["column", "column-reverse"].includes(value)) {
			childBlocks?.forEach((childBlock) => {
				updateBlockAttributes(childBlock, {
					// columnWidth: {
					// 	device: { Desktop: 100, Tablet: 100, Mobile: 100 },
					// 	unit: { Desktop: "%", Tablet: "%", Mobile: "%" },
					// },
				});
			});
		} else {
			const colWidth = 100 / childBlocks?.length;
			childBlocks?.forEach((childBlock) => {
				updateBlockAttributes(childBlock, {
					// columnWidth: {
					// 	device: {
					// 		Desktop: colWidth,
					// 		Tablet: colWidth,
					// 		Mobile: 100,
					// 	},
					// 	unit: { Desktop: "%", Tablet: "%", Mobile: "%" },
					// },
				});
			});
		}
		setAttributes({
			containerFlexDirection: {
				...containerFlexDirection,
				device: {
					...containerFlexDirection.device,
					[deviceType]: value,
				},
			},
		});
	};

	const onFlexWarpHandler = (value) => {
		if (value === containerFlexWrap?.device?.[deviceType]) {
			return;
		}
		const childBlocks = getBlockOrder(blockClientId);
		const updateColWidth = parseFloat((100 / childBlocks?.length).toFixed(2));

		if (["nowrap"].includes(value) && ["row", "row-reverse"].includes(containerFlexDirection?.device?.[deviceType])) {
			childBlocks?.forEach((childBlock) => {
				updateBlockAttributes(childBlock, {
					// columnWidth: {
					// 	device: {
					// 		Desktop: updateColWidth,
					// 		Tablet: updateColWidth,
					// 		Mobile: 100
					// 	},
					// 	unit: { Desktop: "%", Tablet: "%", Mobile: "%" },
					// },
				});
			});
		}
		setAttributes({
			containerFlexWrap: {
				...containerFlexWrap,
				device: {
					...containerFlexWrap.device,
					[deviceType]: value,
				},
			},
		});
	};

	return (
		<>
			<SPToggleGroupControl
				label={__("Flex Direction", "post-carousel")}
				attributes={containerFlexDirection}
				attributesKey={"containerFlexDirection"}
				setAttributes={setAttributes}
				onClick={(value) => handleFlexDir(value)}
				items={[
					{ label: <FlexRow />, value: "row", tooltip: "Row" },
					{
						label: <FlexColumn />,
						value: "column",
						tooltip: "Column",
					},
					{
						label: <FlexRowReverse />,
						value: "row-reverse",
						tooltip: "Row Reverse",
					},
					{
						label: <FlexColumnReverse />,
						value: "column-reverse",
						tooltip: "Column Reverse",
					},
				]}
			/>
			<SPToggleGroupControl
				label={__("Justify Content", "post-carousel")}
				attributes={containerJustifyContent}
				attributesKey={"containerJustifyContent"}
				setAttributes={setAttributes}
				extraClass={
					["row", "row-reverse"].includes(containerFlexDirection?.device?.[deviceType])
						? " sp-svg-rotate-90-reverse"
						: ""
				}
				items={[
					{
						label: <FlexJustifyStart />,
						value: "flex-start",
						tooltip: "Flex Start",
					},
					{
						label: <FlexJustifyCenter />,
						value: "center",
						tooltip: "Center",
					},
					{
						label: <FlexJustifyEnd />,
						value: "flex-end",
						tooltip: "Flex End",
					},
					{
						label: <FlexJustifySpaceBetween />,
						value: "space-between",
						tooltip: "Space Between",
					},
					{
						label: <FlexJustifySpaceAround />,
						value: "space-around",
						tooltip: "Space Around",
					},
					{
						label: <FlexJustifySpaceEvenly />,
						value: "space-evenly",
						tooltip: "Space Evenly",
					},
				]}
			/>
			<SPToggleGroupControl
				label={__("Flex Wrap", "post-carousel")}
				attributes={containerFlexWrap}
				attributesKey={"containerFlexWrap"}
				setAttributes={setAttributes}
				onClick={(value) => onFlexWarpHandler(value)}
				items={[
					{ label: <FlexWrap />, value: "wrap", tooltip: "Wrap" },
					{
						label: <FlexNoWrap />,
						value: "nowrap",
						tooltip: "No Wrap",
					},
					// {
					// 	label: <FlexWrapReverse />,
					// 	value: 'wrap-reverse',
					// 	tooltip: 'Wrap Reverse',
					// },
				]}
			/>
			<SPToggleGroupControl
				label={__("Align Items", "post-carousel")}
				attributes={containerAlignItem}
				attributesKey={"containerAlignItem"}
				setAttributes={setAttributes}
				extraClass={
					["row", "row-reverse"].includes(containerFlexDirection?.device?.[deviceType])
						? " sp-svg-rotate-90"
						: ""
				}
				items={[
					{
						label: <FlexAlignStart />,
						value: "flex-start",
						tooltip: "Flex Start",
					},
					{
						label: <FlexAlignCenter />,
						value: "center",
						tooltip: "Center",
					},
					{
						label: <FlexAlignEnd />,
						value: "flex-end",
						tooltip: "Flex End",
					},
					{
						label: <FlexAlignStretch />,
						value: "stretch",
						tooltip: "Stretch",
					},
				]}
			/>
		</>
	);
};

export const ContainerShapeDivider = ({ attributes, setAttributes }) => {
	const {
		containerShapeDivider,
		containerTopDividerType,
		containerBottomDividerType,
		shapeDividerBgColorTop,
		shapeDividerWidthTop,
		shapeDividerHeightTop,
		shapeDividerFlipTop,
		shapeDividerBringToFrontTop,
		shapeDividerBgColorBottom,
		shapeDividerWidthBottom,
		shapeDividerHeightBottom,
		shapeDividerFlipBottom,
		shapeDividerBringToFrontBottom,
	} = attributes;

	const dividerType = [
		{ label: "None", value: "none" },
		{ label: "Waves", value: "waves" },
		{ label: "Mountains (Pro)", value: "mountains", disabled: true },
		{ label: "Drops (Pro)", value: "drops", disabled: true },
		{ label: "Clouds (Pro)", value: "clouds", disabled: true },
		{ label: "Zigzag (Pro)", value: "zigzag", disabled: true },
		{ label: "Pyramids (Pro)", value: "pyramids", disabled: true },
		{ label: "Triangle (Pro)", value: "triangle", disabled: true },
		{ label: "Triangle Asymmetrical (Pro)", value: "triangle-asymmetrical", disabled: true },
		{ label: "Tilt (Pro)", value: "tilt", disabled: true },
		{ label: "Tilt Opacity (Pro)", value: "tilt-opacity", disabled: true },
		{ label: "Fan Opacity (Pro)", value: "fan-opacity", disabled: true },
		{ label: "Curve (Pro)", value: "curve", disabled: true },
		{ label: "Curve Asymmetrical (Pro)", value: "curve-asymmetrical", disabled: true },
		{ label: "Waves Brush (Pro)", value: "waves-brush", disabled: true },
		{ label: "Waves Pattern (Pro)", value: "waves-pattern", disabled: true },
		{ label: "Arrow (Pro)", value: "arrow", disabled: true },
		{ label: "Arrow Split (Pro)", value: "arrow-split", disabled: true },
		{ label: "Book (Pro)", value: "book", disabled: true },
	]

	return (
		<>
			<SPToggleGroupControl
				label={__("Shape Divider", "post-carousel")}
				attributes={containerShapeDivider}
				attributesKey={"containerShapeDivider"}
				setAttributes={setAttributes}
				items={[
					{ label: "Top", value: "top" },
					{ label: "Bottom", value: "bottom" },
				]}
			/>
			{"top" === containerShapeDivider && (
				<SelectField
					label={__("Divider Type", "post-carousel")}
					attributes={containerTopDividerType}
					attributesKey={"containerTopDividerType"}
					setAttributes={setAttributes}
					items={dividerType}
				/>
			)}
			{"bottom" === containerShapeDivider && (
				<SelectField
					label={__("Divider Type", "post-carousel")}
					attributes={containerBottomDividerType}
					attributesKey={"containerBottomDividerType"}
					setAttributes={setAttributes}
					items={dividerType}
				/>
			)}
			{"top" === containerShapeDivider && "none" !== containerTopDividerType && (
				<>
					<Background
						label={__("Color Type", "post-carousel")}
						attributes={shapeDividerBgColorTop}
						attributesKey={"shapeDividerBgColorTop"}
						setAttributes={setAttributes}
						colorType={"color"}
						items={[
							{
								label: <BgIcon />,
								value: "bgColor",
								tooltip: "Solid",
							},
							{
								label: <GradientIcon />,
								value: "gradient",
								tooltip: "Gradient",
							},
						]}
					/>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={shapeDividerWidthTop}
						attributesKey={"shapeDividerWidthTop"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						max={1400}
						defaultValue={{ unit: "px", value: 100 }}
						pro={true}
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={shapeDividerHeightTop}
						attributesKey={"shapeDividerHeightTop"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						max={1400}
						defaultValue={{ unit: "px", value: 100 }}
						pro={true}
					/>
					<Toggle
						label={__("Flip", "post-carousel")}
						attributes={shapeDividerFlipTop}
						attributesKey={"shapeDividerFlipTop"}
						setAttributes={setAttributes}
						pro={true}
					/>
					<Toggle
						label={__("Bring to Front", "post-carousel")}
						attributes={shapeDividerBringToFrontTop}
						attributesKey={"shapeDividerBringToFrontTop"}
						setAttributes={setAttributes}
						pro={true}
					/>
				</>
			)}
			{"bottom" === containerShapeDivider && "none" !== containerBottomDividerType && (
				<>
					<Background
						label={__("Color Type", "post-carousel")}
						attributes={shapeDividerBgColorBottom}
						attributesKey={"shapeDividerBgColorBottom"}
						setAttributes={setAttributes}
						colorType={"color"}
						items={[
							{
								label: <BgIcon />,
								value: "bgColor",
								tooltip: "Solid",
							},
							{
								label: <GradientIcon />,
								value: "gradient",
								tooltip: "Gradient",
							},
						]}
					/>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={shapeDividerWidthBottom}
						attributesKey={"shapeDividerWidthBottom"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						max={1400}
						defaultValue={{ unit: "px", value: 100 }}
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={shapeDividerHeightBottom}
						attributesKey={"shapeDividerHeightBottom"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						max={1400}
						defaultValue={{ unit: "px", value: 100 }}
					/>
					<Toggle
						label={__("Flip", "post-carousel")}
						attributes={shapeDividerFlipBottom}
						attributesKey={"shapeDividerFlipBottom"}
						setAttributes={setAttributes}
					/>
					<Toggle
						label={__("Bring to Front", "post-carousel")}
						attributes={shapeDividerBringToFrontBottom}
						attributesKey={"shapeDividerBringToFrontBottom"}
						setAttributes={setAttributes}
					/>
				</>
			)}
			<ProInfo>
				<h3>Premium Only</h3>
				<h4>Unlock advanced shape divider controls for more flexible section styling.</h4>
				<ul>
					<li>
						— 18+ Unique Divider Styles
					</li>
					<li>
						— Custom width and height adjustment
					</li>
					<li>
						— Flip shape orientation
					</li>
					<li>
						— Bring divider to front
					</li>
					<li>
						— Enhanced layout positioning
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</>
	);
};

export const ContainerAdvancedGeneralTab = ({ attributes, setAttributes }) => {
	const { advanceZIndex, advanceWrapperLink, advanceWrapperLinkUrl, advanceWrapperLinkNewTab } = attributes;

	return (
		<>
			<InputControl
				label={__("Z-Index", "post-carousel")}
				attributes={advanceZIndex}
				attributesKey={"advanceZIndex"}
				setAttributes={setAttributes}
				type="number"
				flex={true}
			/>
			<Toggle
				label={__("Wrapper Link", "post-carousel")}
				attributes={advanceWrapperLink}
				attributesKey={"advanceWrapperLink"}
				setAttributes={setAttributes}
			/>
			{advanceWrapperLink && (
				<>
					<InputControl
						label={__("Wrapper Link URL", "post-carousel")}
						attributes={advanceWrapperLinkUrl}
						attributesKey={"advanceWrapperLinkUrl"}
						setAttributes={setAttributes}
						inputType="url"
						flex={false}
						placeholder={"https://example.com"}
					/>
					<Toggle
						label={__("Link Open in New Tab", "post-carousel")}
						attributes={advanceWrapperLinkNewTab}
						attributesKey={"advanceWrapperLinkNewTab"}
						setAttributes={setAttributes}
					/>
				</>
			)}
		</>
	);
};
