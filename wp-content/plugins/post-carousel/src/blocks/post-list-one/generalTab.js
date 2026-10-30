import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, TabControls, Background, InputControl } from "../../components";
import { openLinksOptions } from "../../controls/constants";
import useLayouts from "../../hooks/useLayouts";
import { getPaginationBlock } from "../shared/helpFn";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";
import { useMemo } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import ProInfo from "../../components/proInfo/proInfo";

export const PostListGeneralTab = ({ attributes, setAttributes }) => {
	const {
		itemsPerPage,
		equalHeightEnable,
		blockName,
		generalLinkOpen,
		verticalGap,
		postListLayout,
		preloaderEnable,
		contentAlignment,
		postLimit,
		metaDisplayType,
		paginationEnable,
		contentAreaPadding,
		imageHeight,
		imageWidth,
		postCardBorder,
		contentAreaBorder,
		liveFilterEnable,
		clientId,
	} = attributes;
	const layouts = useLayouts(blockName, postListLayout);
	const deviceType = useDeviceType();

	const layoutsObject = useMemo(() => {
		const typeOne = {
			imageWidth: {
				...imageWidth,
				device: {
					...imageWidth.device,
					[deviceType]: 364,
				},
				unit: {
					...imageWidth.unit,
					[deviceType]: "px",
				},
			},
			imageHeight: {
				...imageHeight,
				device: {
					...imageHeight.device,
					[deviceType]: 244,
				},
			},
			contentVerticalPosition: "top",
			contentAreaBorder: { ...contentAreaBorder, style: "none" },
			contentAreaPadding: {
				...contentAreaPadding,
				device: {
					...contentAreaPadding.device,
					Desktop: {
						...contentAreaPadding.device.Desktop,
						top: 15,
						right: 0,
						bottom: 0,
						left: 0,
					},
				},
			},
			showHideDivider: true,
		};
		const typeTwo = {
			imageWidth: {
				...imageWidth,
				device: {
					...imageWidth.device,
					[deviceType]: 446,
				},
				unit: {
					...imageWidth.unit,
					[deviceType]: "px",
				},
			},
			imageHeight: {
				...imageHeight,
				device: {
					...imageHeight.device,
					[deviceType]: 298,
				},
			},
			contentVerticalPosition: "center",
			contentAreaBorder: { ...contentAreaBorder, style: "solid" },
			contentAreaPadding: {
				...contentAreaPadding,
				device: {
					...contentAreaPadding.device,
					Desktop: {
						...contentAreaPadding.device.Desktop,
						top: 15,
						right: 15,
						bottom: 15,
						left: 15,
					},
				},
			},
			showHideDivider: false,
		};
		const typeThree = {
			imageWidth: {
				...imageWidth,
				device: {
					...imageWidth.device,
					[deviceType]: 364,
				},
				unit: {
					...imageWidth.unit,
					[deviceType]: "px",
				},
			},
			imageHeight: {
				...imageHeight,
				device: {
					...imageHeight.device,
					[deviceType]: 220,
				},
			},
			contentVerticalPosition: "top",
			contentAreaBorder: { ...contentAreaBorder, style: "none" },
			contentAreaPadding: {
				...contentAreaPadding,
				device: {
					...contentAreaPadding.device,
					Desktop: {
						...contentAreaPadding.device.Desktop,
						top: 15,
						right: 0,
						bottom: 0,
						left: 0,
					},
				},
			},
			showHideDivider: true,
		};
		const updatedObject = {
			"list-one-layout-one": typeOne,
			"list-one-layout-two": typeOne,
			"list-one-layout-three": typeTwo,
			"list-one-layout-four": typeTwo,
			"list-one-layout-five": typeThree,
			"list-one-layout-six": typeThree,
		};
		return updatedObject;
	}, []);

	const layoutsChangeHandler = (newValue) => {
		if (postListLayout === newValue) {
			return;
		}

		const updatedWidthHeight = layoutsObject[newValue];
		const updatedAttributes = {
			postListLayout: newValue,
			...updatedWidthHeight,
		};
		// Apply all updates at once
		setAttributes(updatedAttributes);
	};

	const paginationBlock = getPaginationBlock(clientId);

	const paginationToggle = (newValue) => {
		setAttributes({ paginationEnable: !newValue });

		if (!newValue && paginationBlock) {
			const { block, select } = paginationBlock;
			select(block?.clientId);
		}
	};

	return (
		<>
			<Layouts
				label={__("Post List Layout", "post-carousel")}
				attributes={postListLayout}
				attributesKey={"postListLayout"}
				setAttributes={setAttributes}
				displayActive={true}
				showDemoTitle={true}
				grid={3}
				items={layouts}
				onChange={layoutsChangeHandler}
			/>
			<Toggle
				label={__("Smart Frontend Filter", "post-carousel")}
				attributes={liveFilterEnable}
				setAttributes={setAttributes}
				attributesKey={"liveFilterEnable"}
			/>
			<Toggle
				label={__("Smart Pagination", "post-carousel")}
				attributes={paginationEnable}
				// attributesKey={ 'paginationEnable' }
				// setAttributes={ setAttributes }
				onChange={paginationToggle}
			/>
			<InputControl
				label={__("Posts Per Page", "post-carousel")}
				className="sp-smart-limit-field"
				ajax={true}
				attributes={postLimit}
				min={1}
				max={500}
				attributesKey={"postLimit"}
				setAttributes={setAttributes}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={verticalGap}
				attributesKey={"verticalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			<SPToggleGroupControl
				label={__("Content Alignment", "post-carousel")}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
			<SelectField
				label={__("Link Open In", "post-carousel")}
				attributes={generalLinkOpen}
				attributesKey={"generalLinkOpen"}
				setAttributes={setAttributes}
				items={openLinksOptions}
			/>
			<Toggle
				label={__("Preloader", "post-carousel")}
				attributes={preloaderEnable}
				attributesKey={"preloaderEnable"}
				setAttributes={setAttributes}
			/>
			{/* <Toggle
				label={ __( 'Enable Equal Height', 'post-carousel' ) }
				attributes={ equalHeightEnable }
				attributesKey={ 'equalHeightEnable' }
				setAttributes={ setAttributes }
			/> */}
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

const DividerGeneralTab = ({ attributes, setAttributes }) => {
	const { showHideDivider, dividerBorderStyle, dividerAlignment } = attributes;

	const setBorderStyle = (newValue) => {
		setAttributes({ dividerBorderStyle: newValue });
	};

	return (
		<>
			<Toggle
				label={__("Divider", "post-carousel")}
				attributes={showHideDivider}
				attributesKey={"showHideDivider"}
				setAttributes={setAttributes}
			/>

			{showHideDivider && (
				<>
					<SelectField
						label={__("Position", "post-carousel")}
						attributes={dividerBorderStyle}
						onChange={(newValue) => setBorderStyle(newValue)}
						items={[
							{ label: "None", value: "none" },
							{ label: "Solid", value: "solid" },
							{ label: "Dotted", value: "dotted" },
							{ label: "Dashed", value: "dashed" },
							{ label: "Double", value: "double" },
							{ label: "Groove", value: "groove" },
							{ label: "Inset", value: "inset" },
							{ label: "Outset", value: "outset" },
							{ label: "Ridge", value: "ridge" },
						]}
						flexStyle={true}
					/>

					<SPToggleGroupControl
						label={__("Alignment", "post-carousel")}
						attributes={dividerAlignment}
						attributesKey={"dividerAlignment"}
						setAttributes={setAttributes}
						items={[
							{ label: <AlignLeft />, value: "left" },
							{ label: <AlignCenter />, value: "center" },
							{ label: <AlignRight />, value: "right" },
						]}
					/>
				</>
			)}
		</>
	);
};
const DividerStyleTab = ({ attributes, setAttributes }) => {
	const { dividerBg, dividerWidth, dividerHeight } = attributes;

	return (
		<>
			<Background
				label={__("Color Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor="#1E1E1E99"
				attributes={dividerBg}
				attributesKey={"dividerBg"}
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
				attributes={dividerWidth}
				attributesKey={"dividerWidth"}
				setAttributes={setAttributes}
				max={1200}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "%", value: 100 }}
			/>
			<SPRangeControl
				label={__("Thickness", "post-carousel")}
				attributes={dividerHeight}
				attributesKey={"dividerHeight"}
				setAttributes={setAttributes}
				max={100}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "pa", value: 1 }}
			/>
		</>
	);
};

export const Divider = ({ attributes, setAttributes }) => {
	return (
		<TabControls
			attributes={attributes}
			setAttributes={setAttributes}
			GeneralTab={DividerGeneralTab}
			StyleTab={DividerStyleTab}
		/>
	);
};
