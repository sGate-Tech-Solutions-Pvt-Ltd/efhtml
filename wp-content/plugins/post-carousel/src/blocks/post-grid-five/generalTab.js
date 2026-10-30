import { __ } from "@wordpress/i18n";
import { Toggle, SPRangeControl, SelectField, Layouts, InputControl } from "../../components";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { getPaginationBlock } from "../shared/helpFn";
import useLayouts from "../../hooks/useLayouts";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { inArray } from "../../controls/controls";
import ProInfo from "../../components/proInfo/proInfo";

export const GridFiveGeneralTab = ({ attributes, setAttributes }) => {
	const {
		postGridLayout,
		gridFiveColumns,
		itemsPerPage,
		gridFiveHorizontalGap,
		gridFiveVerticalGap,
		contentAlignment,
		// gridFiveMasonryEnable,
		preloaderEnable,
		equalHeightEnable,
		blockName,
		generalLinkOpen,
		// masonryGap,
		largeItemHeight,
		smallItemHeight,
		postLimit,
		metaDisplayType,
		paginationEnable,
		liveFilterEnable,
		clientId,
	} = attributes;
	const layouts = useLayouts(blockName, postGridLayout);

	const paginationBlock = getPaginationBlock(clientId);

	const layoutChange = (newValue) => {
		if (newValue === postGridLayout) return;

		const newData = {
			postGridLayout: newValue,
			postLimit:
				3 === postLimit || 4 === postLimit
					? inArray(["grid-five-layout-one", "grid-five-layout-two", "grid-five-layout-three"], newValue)
						? 3
						: 4
					: postLimit,
		};
		setAttributes(newData);
	};

	const paginationToggle = (newValue) => {
		if (!newValue && paginationBlock) {
			const { block, select } = paginationBlock;
			select(block.clientId);
		}

		setAttributes({ paginationEnable: !newValue });
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
					grid={3}
					onChange={layoutChange}
					items={layouts}
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
			<SPRangeControl
				label={__("Columns", "post-carousel")}
				attributes={gridFiveColumns}
				attributesKey={"gridFiveColumns"}
				setAttributes={setAttributes}
				max={9}
				min={1}
				defaultValue={{ unit: "", value: 3 }}
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
				label={__("Large item Height", "post-carousel")}
				attributes={largeItemHeight}
				attributesKey={"largeItemHeight"}
				setAttributes={setAttributes}
				max={2000}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: "" }}
				pro={true}
			/>
			{!equalHeightEnable && (
				<SPRangeControl
					label={__("Small item Height", "post-carousel")}
					attributes={smallItemHeight}
					attributesKey={"smallItemHeight"}
					setAttributes={setAttributes}
					max={2000}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: "" }}
					pro={true}
				/>
			)}
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={gridFiveHorizontalGap}
				attributesKey={"gridFiveHorizontalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 16 }}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={gridFiveVerticalGap}
				attributesKey={"gridFiveVerticalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 16 }}
			/>
			{/* { gridFiveMasonryEnable && (
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
				attributes={ gridFiveMasonryEnable }
				attributesKey={ 'gridFiveMasonryEnable' }
				setAttributes={ setAttributes }
			/> */}
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
