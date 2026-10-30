import { InnerBlocks, useBlockProps, store as blockEditorStore, BlockControls } from "@wordpress/block-editor";
import { useEffect, useMemo, useState } from "@wordpress/element";
import { useSelect, select, dispatch } from "@wordpress/data";
import LayoutPreset from "./layoutPreset";
import { InspectorControl } from "../../components";
import { panelBodyRightIcon } from "../../icons/icons";
import Inspector from "./Inspector";
import { useDeviceType } from "../../controls/controls";
import dynamicCss from "./dynamicCss";
import { containerTemplatesConstant, layoutsColumnsWidth, shapeDividerIconConstant } from "./containerConstant";
import "./ContainerSelector.css";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
import { ToolbarDropdownMenu } from "@wordpress/components";
import { AlignNoneIcon } from "./icons";

const ContainerEdit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const [showPresetLayer, setShowPresetLayer] = useState(null);
	const page = "editor";
	const {
		blockName,
		uniqueId,
		containerLayer,
		customCss,
		columns,
		containerFlexDirection,
		layout,
		htmlTag,
		containerTopDividerType,
		containerBottomDividerType,
		shapeDividerFlipTop,
		shapeDividerFlipBottom,
		advancedAdditionalID,
		advancedAdditionalClass,
		advanceWrapperLink,
		advanceWrapperLinkUrl,
		advanceWrapperLinkNewTab,
		containerFlexWrap,
		containerBGVideo,
		containerBG,
		columnsGap,
		columnsTablet,
		columnsMobile,
		align,
		containerWidth,
	} = attributes;
	const deviceType = useDeviceType();
	const blockProps = useBlockProps({
		className: `${uniqueId}-boxed`,
	});
	const [template, setTemplate] = useState("");
	const ContainerTag = htmlTag;
	const containerFlexDir = containerFlexDirection?.device?.[ deviceType ];

	const numberOfColumns = columns;

	useEffect(() => {
		setAttributes({ blockClientId: clientId });
	}, [clientId]);

	const { getBlock } = select("core/block-editor");
	const { updateBlockAttributes } = dispatch("core/block-editor");
	// For updating the template dynamically.
	const innerBlocks = useSelect((select) => select(blockEditorStore).getBlocks(clientId), [clientId, columns]);

	// const getGlobalBreakpoint = select("smartpost/global-settings").getCategory("breakpoint");
	// useEffect( () => {
	// 	if (typeof getGlobalBreakpoint === "object") {
	// 		setAttributes({ globalBreakPointData: getGlobalBreakpoint })
	// 	}
	// }, [ getGlobalBreakpoint ])

	useEffect(() => {
		if (innerBlocks.length < 1 && !containerLayer) {
			setShowPresetLayer("show");
		} else {
			setShowPresetLayer("hide");
		}
	}, [columns, layout]);

	useEffect(() => {
		//reduceColWidth,
		const childBlocks = getBlock(clientId)?.innerBlocks;

		const responsiveColumns = {
			Desktop: columns,
			Tablet: columnsTablet,
			Mobile: columnsMobile,
		}

		const multiRowCols = ("container-column-multi-row-layout-one" !== layout ) ? 2 : 3;

		let reduceGap = 0;

		if([
			"container-column-multi-row-layout-one",
			"container-column-multi-row-layout-two", 
			"container-column-multi-row-layout-three",  "container-column-multi-row-layout-four", "container-column-multi-row-layout-five"].includes(layout)) {
				reduceGap =
			childBlocks?.length > 1
				? (( columnsGap?.device?.[deviceType] || columnsGap?.device?.Desktop ) * (multiRowCols - 1) / multiRowCols ).toFixed(2)
				: 0;
		}else {
			reduceGap = childBlocks?.length > 1
				? (( (columnsGap?.device?.[deviceType] || columnsGap?.device?.Desktop ) * (((responsiveColumns[deviceType] || columns) - 1) / responsiveColumns[deviceType] || columns))).toFixed(2)
				: 0;
		}

		childBlocks?.forEach((child) => {

			const reduceColumnWidth = child?.attributes?.reduceColWidth || {};

			updateBlockAttributes(child?.clientId, {
				reduceColWidth: {
					...reduceColumnWidth,
					device: {
						...reduceColumnWidth.device,
						[deviceType]: reduceGap,
					},
				},
				parentColumnGap: columnsGap,
			});
		});
	}, [columnsGap, columns, innerBlocks.length, columnsTablet, columnsMobile]);

	useEffect( () => {
		if ( !template && containerLayer ) {
			setTemplate( containerTemplatesConstant[ containerLayer ] )
		}
	}, [ containerLayer ]);

	const customAppenderHandler = () => (
		<div>
			<InnerBlocks.ButtonBlockAppender />
		</div>
	);
	const layoutClassName = ( numberOfColumns < 7 || numberOfColumns === "multi-row" ) ? layout : `${blockName}-column-${numberOfColumns}-layout`;

	const blockStyling = useMemo(() => dynamicCss(attributes, page, deviceType), [attributes, deviceType]);
	const multiRowLayout = {
		"container-column-multi-row-layout-one": 3,
	};
	const gapMultiplier = !["multi-row", ""].includes( columns ) ? columns : multiRowLayout[layout] || 2;


	const columnsWidthStyle = layout ? {
		"--columnOne": layoutsColumnsWidth[layout][0] ? `${layoutsColumnsWidth[layout][0]}%` : "auto",
		"--columnTwo": layoutsColumnsWidth[layout][1] ? `${layoutsColumnsWidth[layout][1]}%` : "auto",
		"--columnThree": layoutsColumnsWidth[layout][2] ? `${layoutsColumnsWidth[layout][2]}%` : "auto",
		"--columnFour": layoutsColumnsWidth[layout][3] ? `${layoutsColumnsWidth[layout][3]}%` : "auto",
		"--columnFive": layoutsColumnsWidth[layout][4] ? `${layoutsColumnsWidth[layout][4]}%` : "auto",
		"--columnSix": layoutsColumnsWidth[layout][5] ? `${layoutsColumnsWidth[layout][5]}%` : "auto",
		"--gap": `${(columnsGap?.device?.[ deviceType ] || columnsGap?.device?.Desktop) * ( gapMultiplier - 1 )}px`,
		"--gapMultiplier": layout ? gapMultiplier : 0,
	} : {};

	useEffect( () => {
		setAttributes({
			containerColumnRoot:  columnsWidthStyle,
		})
	}, [layout, columnsGap]);

	const alignClasses = containerWidth === "boxed" ? `${align ? "align"+align : ""}` : "alignfull";
	const activeAlignIcon = {
		none: <AlignNoneIcon />,
		wide: "align-wide",
		full: "align-full-width",
	};

	return (
		<>
			{showPresetLayer && showPresetLayer === "show" && (
				<div {...blockProps}>
					<LayoutPreset
						attributes={{
							containerLayer,
							containerFlexDirection,
							columns,
							containerFlexWrap,
						}}
						setAttributes={setAttributes}
						deviceType={deviceType}
					/>
				</div>
			)}
			<style>
				{blockStyling}
				{customCss}
			</style>
			{showPresetLayer && showPresetLayer === "hide" && (
				<div className={alignClasses}>
					<div {...blockProps} >
						<ContainerTag
							key={layout}
							{...(advancedAdditionalID ? { id: advancedAdditionalID } : {})}
							className={`sp-smart-post-container-editor-page sp-smart-post-show-pro ${uniqueId} ${advancedAdditionalClass}`}
						>
							{/* Container Shape Divider Start */}
							{"none" !== containerTopDividerType && (
								<div
									className={`sp-smart-post-container-shape sp-smart-post-container-shape-top${
										shapeDividerFlipTop ? " sp-smart-post-shape-flip" : ""
									}`}
								>
									{shapeDividerIconConstant[containerTopDividerType]}
								</div>
							)}
							{"none" !== containerBottomDividerType && (
								<div
									className={`sp-smart-post-container-shape sp-smart-post-container-shape-bottom${
										shapeDividerFlipBottom ? " sp-smart-post-shape-flip" : ""
									}`}
								>
									{shapeDividerIconConstant[containerBottomDividerType]}
								</div>
							)}
							{"video" === containerBG?.color?.style && (
								<div className="sp-smart-post-container__video-wrap">
									{containerBGVideo && (
										<video autoPlay loop muted>
											<source src={containerBGVideo.url} type="video/mp4" />
										</video>
									)}
								</div>
							)}
							{/* Container Shape Divider Ends */}
							{/* <div {...blockProps}> */}
							{containerWidth === "boxed" && (
								<BlockControls>
									<ToolbarDropdownMenu
										icon={ activeAlignIcon[ align ] }
										label="Select a direction"
										controls={ [
											{
												title: "None",
												icon: AlignNoneIcon,
												onClick: () => setAttributes({ align: "none", containerWidth: "boxed" }),
											},
											{
												title: "Wide",
												icon: "align-wide",
												onClick: () => setAttributes({ align: "wide", containerWidth: "boxed" }),
											},
											// {
											// 	title: "Full",
											// 	icon: "align-full-width",
											// 	onClick: () => setAttributes({ align: "full", containerWidth: "full-width" }),
											// },
										] }
										/>
								</BlockControls>
							)}

								<div
									className={`sp-smart-post-container-parent-block sp-smart-post-container sp-smart-post-container-column-${ columns ? columns : "multi-row"} ${layoutClassName} sp-smart-post-flex-${containerFlexDir}`}
									style={ columnsWidthStyle }
								>
									<InspectorControl
										RightIcon={panelBodyRightIcon}
										attributes={attributes}
										setAttributes={setAttributes}
										Inspector={Inspector}
										templateLibrary={"google.com"}
										isSelected={isSelected}
									/>
									{/* { containerFlexWrap?.device?.[ deviceType ] !== "wrap" && (
										<ResizableComponents
											attributes={attributes}
											setAttributes={setAttributes}
											clientId={ clientId }
										/> 
									)} */}
										<InnerBlocks
											// __experimentalCaptureToolbars={ true }
											allowedBlocks={["sp-smart-post-show/column"]}
											renderAppender={customAppenderHandler}
											orientation="horizontal"
											template={ template }
										/>
								</div>
								{advanceWrapperLink && (
									<a
										className={"sp-smart-post-container-parent-block-wrapper-link"}
										rel="noopener noreferrer"
										href={advanceWrapperLinkUrl}
										target={advanceWrapperLinkNewTab ? "_blank" : "_self"}
									>
										{" "}
									</a>
								)}
							{/* </div> */}
						</ContainerTag>
					</div>
				</div>
			)}
		</>
	);
};

export default compose(addInitialAttr)(ContainerEdit);
