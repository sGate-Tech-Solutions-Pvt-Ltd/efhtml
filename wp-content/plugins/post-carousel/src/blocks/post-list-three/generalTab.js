import { __ } from "@wordpress/i18n";
import {
	Toggle,
	SpColorPicker,
	Layouts,
	SPRangeControl,
	SelectField,
	TabControls,
	Background,
	InputControl,
} from "../../components";
import { openLinksOptions } from "../../controls/constants";
import useLayouts from "../../hooks/useLayouts";
import { getPaginationBlock } from "../shared/helpFn";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";
import ProInfo from "../../components/proInfo/proInfo";

const DividerGeneralTab = ({ attributes, setAttributes }) => {
	const { showHideDivider, dividerBorderStyle, dividerAlignment } = attributes;

	const setBorderStyle = (newValue) => {
		setAttributes({ dividerBorderStyle: newValue });
	};

	return (
		<>
			<Toggle
				label={__("Enable Divider", "post-carousel")}
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
		largeItemHeight,
		metaDisplayType,
		paginationEnable,
		contentAreaPadding,
		liveFilterEnable,
		horizontalGap,
		largeItemAlignment,
		clientId,
	} = attributes;

	const layouts = useLayouts(blockName, postListLayout);

	// const layoutController = ( newValue ) => {
	// 	const newData = {
	// 		showReadMoreButton: [
	// 			'sp-smart-post-list-three-layout-one',
	// 			'sp-smart-post-list-three-layout-two',
	// 		].includes( newValue )
	// 			? true
	// 			: false,
	// 		excerptShow: [
	// 			'sp-smart-post-list-three-layout-one',
	// 			'sp-smart-post-list-three-layout-two',
	// 		].includes( newValue )
	// 			? true
	// 			: false,
	// 		imageOverlayColor: [
	// 			'sp-smart-post-list-three-layout-three',
	// 			'sp-smart-post-list-three-layout-four',
	// 		].includes( newValue )
	// 			? 'custom'
	// 			: 'no-overlay',
	// 		postListLayout: newValue,
	// 	};

	// 	setAttributes( newData );
	// };

	const layoutsChangeHandler = (newValue) => {
		if (postListLayout === newValue) {
			return;
		}

		const newData = {
			showReadMoreButton: ["sp-smart-post-list-three-layout-one", "sp-smart-post-list-three-layout-two"].includes(
				newValue
			),
			excerptShow: ["sp-smart-post-list-three-layout-one", "sp-smart-post-list-three-layout-two"].includes(
				newValue
			),
			imageOverlayColor: [
				"sp-smart-post-list-three-layout-three",
				"sp-smart-post-list-three-layout-four",
			].includes(newValue)
				? "default"
				: "no-overlay",
		};

		const updatedAttributes = {
			...newData,
			postListLayout: newValue,
		};

		if (
			[
				"sp-smart-post-list-three-layout-one",
				"sp-smart-post-list-three-layout-three",
				"sp-smart-post-list-three-layout-five",
				"sp-smart-post-list-three-layout-six",
			].includes(newValue)
		) {
			updatedAttributes.contentAreaPadding = {
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
			};
		}

		if (["sp-smart-post-list-three-layout-two", "sp-smart-post-list-three-layout-four"].includes(newValue)) {
			updatedAttributes.contentAreaPadding = {
				...contentAreaPadding,
				device: {
					...contentAreaPadding.device,
					Desktop: {
						...contentAreaPadding.device.Desktop,
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					},
				},
			};
		}
		if (["sp-smart-post-list-three-layout-five", "sp-smart-post-list-three-layout-six"].includes(newValue)) {
			updatedAttributes.largeItemHeight = {
				...largeItemHeight,
				device: {
					...largeItemHeight.device,
					Desktop: 161,
				},
			};
		} else {
			updatedAttributes.largeItemHeight = {
				...largeItemHeight,
				device: {
					...largeItemHeight.device,
					Desktop: 372,
				},
			};
		}

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
				onChange={layoutsChangeHandler}
				items={layouts}
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
				key={postListLayout}
				label={__("Large Item Height", "post-carousel")}
				attributes={largeItemHeight}
				attributesKey={"largeItemHeight"}
				setAttributes={setAttributes}
				max={1200}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 372 }}
				pro={true}
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
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={horizontalGap}
				attributesKey={"horizontalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			<SPToggleGroupControl
				label={__("Content Alignment (Large Item)", "post-carousel")}
				attributes={largeItemAlignment}
				attributesKey={"largeItemAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
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

			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

export const PostListSeparatorGeneralTab = ({ attributes, setAttributes }) => {
	const { enableSeparator, spaceBetweenListItems, separatorStyle, separatorHeight, separatorColor } = attributes;
	return (
		<>
			<Toggle
				label={__("Enable Separator", "post-carousel")}
				attributes={enableSeparator}
				attributesKey={"enableSeparator"}
				setAttributes={setAttributes}
			/>
			{enableSeparator && (
				<>
					<SelectField
						label={__("Style", "post-carousel")}
						attributes={separatorStyle}
						attributesKey={"separatorStyle"}
						setAttributes={setAttributes}
						flexStyle={true}
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
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={separatorHeight}
						attributesKey={"separatorHeight"}
						setAttributes={setAttributes}
						max={50}
						units={["PX", "%", "EM"]}
						defaultValue={{ unit: "px", value: 20 }}
					/>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={separatorColor}
						onChange={(newColor) => setAttributes({ separatorColor: newColor })}
						defaultColor={"#CECECE"}
					/>
					<SPRangeControl
						label={__("Space Between Items", "post-carousel")}
						attributes={spaceBetweenListItems}
						attributesKey={"spaceBetweenListItems"}
						setAttributes={setAttributes}
						max={50}
						units={["PX", "%", "EM"]}
						defaultValue={{ unit: "px", value: 5 }}
					/>
				</>
			)}
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
