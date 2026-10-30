import { __ } from "@wordpress/i18n";
import { Toggle, SPRangeControl, SelectField, Layouts, InputControl } from "../../components";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { getPaginationBlock } from "../shared/helpFn";
import useLayouts from "../../hooks/useLayouts";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import ProInfo from "../../components/proInfo/proInfo";

export const GridFourGeneralTab = ({ attributes, setAttributes }) => {
	const {
		postGridLayout,
		gridFourColumns,
		itemsPerPage,
		gridFourHorizontalGap,
		gridFourVerticalGap,
		contentAlignment,
		// gridFourMasonryEnable,
		preloaderEnable,
		blockName,
		generalLinkOpen,
		// masonryGap,
		smallItemHeight,
		largeItemHeight,
		postLimit,
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
				attributes={gridFourColumns}
				attributesKey={"gridFourColumns"}
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
			<SPRangeControl
				label={__("Small item Height", "post-carousel")}
				attributes={smallItemHeight}
				attributesKey={"smallItemHeight"}
				setAttributes={setAttributes}
				max={2000}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 275 }}
				pro={true}
			/>
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={gridFourHorizontalGap}
				attributesKey={"gridFourHorizontalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 12 }}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={gridFourVerticalGap}
				attributesKey={"gridFourVerticalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 12 }}
			/>
			{/* { gridFourMasonryEnable && (
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
				attributes={  gridFourMasonryEnable ) }
				attributesKey={ 'gridFourMasonryEnable' }
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
