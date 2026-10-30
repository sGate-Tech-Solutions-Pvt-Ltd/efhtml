import { __ } from "@wordpress/i18n";
import { Toggle, SPRangeControl, SelectField, Layouts, InputControl } from "../../components";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { getPaginationBlock } from "../shared/helpFn";
import useLayouts from "../../hooks/useLayouts";
import { openLinksOptions } from "../../controls/constants";
import { inArray } from "../../controls/controls";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import ProInfo from "../../components/proInfo/proInfo";

export const GridThreeGeneralTab = ({ attributes, setAttributes }) => {
	const {
		postGridLayout,
		gridThreeColumns,
		itemsPerPage,
		gridThreeHorizontalGap,
		gridThreeVerticalGap,
		contentAlignment,
		// gridThreeMasonryEnable,
		preloaderEnable,
		blockName,
		generalLinkOpen,
		masonryGap,
		postLimit,
		largeItemHeight,
		smallItemHeight,
		metaDisplayType,
		paginationEnable,
		liveFilterEnable,
		clientId,
	} = attributes;
	const layouts = useLayouts(blockName, postGridLayout);

	const paginationBlock = getPaginationBlock(clientId);

	const paginationToggle = (newValue) => {
		setAttributes({ paginationEnable: !newValue });

		if (!newValue && paginationBlock) {
			const { block, select } = paginationBlock;
			select(block?.clientId);
		}
	};
	const layoutHandler = (newLayout) => {
		if (newLayout === postGridLayout) {
			return;
		}
		let taxonomyPosition;
		if (newLayout === "grid-three-layout-three") {
			taxonomyPosition = "top-right";
		} else {
			taxonomyPosition = "";
		}
		setAttributes({
			postGridLayout: newLayout,
			catTabCategoryPosition: taxonomyPosition,
		});
	};

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Grid Layout", "post-carousel")}
					attributes={postGridLayout}
					attributesKey={"postGridLayout"}
					setAttributes={setAttributes}
					displayActive={true}
					showDemoTitle={true}
					grid={3}
					items={layouts}
					onChange={layoutHandler}
				/>
			)}
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
			{!["grid-three-layout-four"].includes(postGridLayout) && (
				<SPRangeControl
					label={__("Columns", "post-carousel")}
					attributes={gridThreeColumns}
					attributesKey={"gridThreeColumns"}
					setAttributes={setAttributes}
					max={9}
					min={1}
					defaultValue={{ unit: "", value: "" }}
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
			{!inArray(["grid-three-layout-four"], postGridLayout) && (
				<SPRangeControl
					label={__("Large Items Height", "post-carousel")}
					attributes={largeItemHeight}
					attributesKey={"largeItemHeight"}
					setAttributes={setAttributes}
					max={2000}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: "" }}
					pro={true}
				/>
			)}
			<SPRangeControl
				label={
					inArray(["grid-three-layout-four"], postGridLayout)
						? __("Items Height", "post-carousel")
						: __("Small Items Height", "post-carousel")
				}
				attributes={smallItemHeight}
				attributesKey={"smallItemHeight"}
				setAttributes={setAttributes}
				max={2000}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 244 }}
				pro={true}
			/>
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={gridThreeHorizontalGap}
				attributesKey={"gridThreeHorizontalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={gridThreeVerticalGap}
				attributesKey={"gridThreeVerticalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			{/* { gridThreeMasonryEnable && (
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
				attributes={ gridThreeMasonryEnable ) }
				attributesKey={ 'gridThreeMasonryEnable' }
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
		</>
	);
};
