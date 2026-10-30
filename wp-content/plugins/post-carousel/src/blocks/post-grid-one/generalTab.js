import { __ } from "@wordpress/i18n";
import { Toggle, SPRangeControl, Layouts, SelectField, InputControl } from "../../components";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { getPaginationBlock } from "../shared/helpFn";
import ContentOrientations from "../shared/templates/templates-parts/contentOrientations";
import useLayouts from "../../hooks/useLayouts";
import { availableLargeContent, openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { useOrientationConfig } from "../../hooks/useOrientationValue";
import ProInfo from "../../components/proInfo/proInfo";

export const PostGridGeneralTab = ({
	attributes,
	setAttributes,
	// clientId,
}) => {
	const {
		postGridLayout,
		contentOrientation,
		gridOneColumns,
		gridOneHorizontalGap,
		gridOneVerticalGap,
		contentAlignment,
		// gridOneMasonryEnable,
		preloaderEnable,
		blockName,
		gridLargeContentPosition,
		generalLinkOpen,
		postLimit,
		largeItemHeight,
		smallItemHeight,
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
		paginationEnable,
		liveFilterEnable,
		largeImageHeight,
		clientId,
	} = attributes;
	const layouts = useLayouts(blockName, postGridLayout);

	const paginationBlock = getPaginationBlock(clientId);

	const orientationConfig = useOrientationConfig({
		postCardPadding: postCardPadding,
		postCardBorder: postCardBorder,
		postCardBorderWidth: postCardBorderWidth,
		contentAreaPadding: contentAreaPadding,
	});

	const orientationHandler = (newValue) => {
		if (newValue === contentOrientation) {
			return;
		}

		const newData = {
			contentOrientation: newValue,
			...orientationConfig[newValue],
		};
		setAttributes(newData);
	};
	//largeImageHeight = 6 = 386, 6up = 460, 7=360,
	const largeImageLayout = {
		"grid-one-layout-six": {
			largeImageHeight: {
				...largeImageHeight,
				device: { ...largeImageHeight.device, Desktop: 386 },
			},
		},
		"grid-one-layout-six-updated": {
			largeImageHeight: {
				...largeImageHeight,
				device: { ...largeImageHeight.device, Desktop: 460 },
			},
		},
		"grid-one-layout-seven": {
			largeImageHeight: {
				...largeImageHeight,
				device: { ...largeImageHeight.device, Desktop: 360 },
			},
		},
		"grid-one-layout-eight": {
			largeImageHeight: {
				...largeImageHeight,
				device: { ...largeImageHeight.device, Desktop: 360 },
			},
		},
		"grid-one-layout-nine": {
			largeImageHeight: {
				...largeImageHeight,
				device: { ...largeImageHeight.device, Desktop: 360 },
			},
		},
	};

	const layoutHandler = (layout) => {
		const showItems = [
			"grid-one-layout-six",
			"grid-one-layout-six-updated",
			"grid-one-layout-seven",
			"grid-one-layout-eight",
			"grid-one-layout-nine",
		].includes(layout)
			? {
					showReadMoreButton: true,
					excerptShow: true,
				}
			: {
					showReadMoreButton: false,
					excerptShow: false,
				};
		const updateLayout = {
			postGridLayout: layout,
			...largeImageLayout[layout],
			...showItems,
		};
		setAttributes(updateLayout);
	};

	const paginationToggle = (newValue) => {
		if (!newValue) {
			const { block, select } = paginationBlock;
			select(block.clientId);
		}

		setAttributes({ paginationEnable: !newValue });
	};

	return (
		<div className="sp-smart-post-grid-one-general">
			{layouts?.length > 0 && (
				<Layouts
					label={__("Grid Layout", "post-carousel")}
					attributes={postGridLayout}
					attributesKey={"postGridLayout"}
					setAttributes={setAttributes}
					displayActive={true}
					onChange={layoutHandler}
					grid={3}
					showDemoTitle={true}
					items={layouts}
				/>
			)}
			{availableLargeContent.includes(postGridLayout) && (
				<SPToggleGroupControl
					label={__("Large Item Position", "post-carousel")}
					items={[
						{ label: "Left", value: "left" },
						{ label: "Right", value: "right" },
					]}
					attributes={gridLargeContentPosition}
					attributesKey={"gridLargeContentPosition"}
					setAttributes={setAttributes}
				/>
			)}
			<ContentOrientations
				label={__("Content Orientation", "post-carousel")}
				attributes={contentOrientation}
				setAttributes={setAttributes}
				attributesKey={"contentOrientation"}
				onChange={orientationHandler}
			/>
			<Toggle
				label={__("Smart Frontend Filter", "post-carousel")}
				attributes={liveFilterEnable}
				attributesKey={"liveFilterEnable"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Smart Pagination", "post-carousel")}
				attributes={paginationEnable}
				// attributesKey={ 'paginationEnable' }
				onChange={paginationToggle}
				// setAttributes={ setAttributes }
			/>
			{postGridLayout !== "grid-one-layout-five" && (
				<SPRangeControl
					label={__("Columns", "post-carousel")}
					attributes={gridOneColumns}
					attributesKey={"gridOneColumns"}
					setAttributes={setAttributes}
					max={9}
					min={1}
					defaultValue={{ unit: "", value: 3 }}
				/>
			)}
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
			{!["grid-one-layout-one", "grid-one-layout-five"].includes(postGridLayout) && (
				<>
					<SPRangeControl
						label={__("Large Items Height", "post-carousel")}
						attributes={largeItemHeight}
						attributesKey={"largeItemHeight"}
						setAttributes={setAttributes}
						max={1000}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: "" }}
					/>
					<SPRangeControl
						label={__("Small Items Height", "post-carousel")}
						attributes={smallItemHeight}
						attributesKey={"smallItemHeight"}
						setAttributes={setAttributes}
						max={600}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: "" }}
					/>
				</>
			)}
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={gridOneHorizontalGap}
				attributesKey={"gridOneHorizontalGap"}
				setAttributes={setAttributes}
				max={150}
				min={0}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={gridOneVerticalGap}
				attributesKey={"gridOneVerticalGap"}
				setAttributes={setAttributes}
				max={150}
				min={0}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			{/* { gridOneMasonryEnable && (
				<SPRangeControl
					label={ __( 'Masonry Gap', 'post-carousel' ) }
					attributes={ masonryGap }
					attributesKey={ 'masonryGap' }
					setAttributes={ setAttributes }
					max={ 150 }
					units={ [ 'PX', '%', 'EM' ] }
				/>
			) } */}
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
			{/* <Toggle
				label={ __( 'Masonry', 'post-carousel' ) }
				attributes={  gridOneMasonryEnable ) }
				attributesKey={ 'gridOneMasonryEnable' }
				setAttributes={ setAttributes }
			/> */}
			<Toggle
				label={__("Preloader", "post-carousel")}
				attributes={preloaderEnable}
				attributesKey={"preloaderEnable"}
				setAttributes={setAttributes}
			/>
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</div>
	);
};
