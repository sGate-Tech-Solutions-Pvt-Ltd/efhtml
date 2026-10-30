import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, InputControl } from "../../components";
import { openLinksOptions } from "../../controls/constants";
import useLayouts from "../../hooks/useLayouts";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import ProInfo from "../../components/proInfo/proInfo";

export const PostTimelineGeneralTab = ({ attributes, setAttributes }) => {
	const {
		itemsPerPage,
		equalHeightEnable,
		blockName,
		generalLinkOpen,
		gapBetweenPosts,
		timelineLayout,
		preloaderEnable,
		contentAlignment,
		postLimit,
		smallItemHeight,
		metaDisplayType,
		paginationEnable,
		liveFilterEnable,
	} = attributes;
	const layouts = useLayouts(blockName, timelineLayout);

	return (
		<>
			<Layouts
				label={__("Timeline Layout", "post-carousel")}
				attributes={timelineLayout}
				attributesKey={"timelineLayout"}
				setAttributes={setAttributes}
				displayActive={true}
				showDemoTitle={true}
				grid={3}
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
				attributesKey={"paginationEnable"}
				setAttributes={setAttributes}
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
			{!equalHeightEnable && (
				<SPRangeControl
					label={__("Items Height", "post-carousel")}
					attributes={smallItemHeight}
					attributesKey={"smallItemHeight"}
					setAttributes={setAttributes}
					max={2000}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: "" }}
				/>
			)}
			<SPRangeControl
				label={__("Gap Between Posts", "post-carousel")}
				attributes={gapBetweenPosts}
				attributesKey={"gapBetweenPosts"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 10 }}
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

export const PostTimelineConnectorTab = ({ attributes, setAttributes }) => {
	const { timelineSize, timelineWidth, timelineHeight, timelineConnectorWidth } = attributes;

	return (
		<>
			<div>
				<strong>Icon Source</strong>
			</div>
			<SPRangeControl
				label={__("Size", "post-carousel")}
				attributes={timelineSize}
				attributesKey={"timelineSize"}
				setAttributes={setAttributes}
				max={60}
				defaultValue={{ unit: "px", value: 16 }}
			/>
			<SPRangeControl
				label={__("Width", "post-carousel")}
				attributes={timelineWidth}
				attributesKey={"timelineWidth"}
				setAttributes={setAttributes}
				max={80}
				defaultValue={{ unit: "px", value: 32 }}
			/>
			<SPRangeControl
				label={__("Height", "post-carousel")}
				attributes={timelineHeight}
				attributesKey={"timelineHeight"}
				setAttributes={setAttributes}
				max={80}
				defaultValue={{ unit: "px", value: 32 }}
			/>
			<SPRangeControl
				label={__("Connector Width", "post-carousel")}
				attributes={timelineConnectorWidth}
				attributesKey={"timelineConnectorWidth"}
				setAttributes={setAttributes}
				max={20}
				defaultValue={{ unit: "px", value: 32 }}
			/>
		</>
	);
};
