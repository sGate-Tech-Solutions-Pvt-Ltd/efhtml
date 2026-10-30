import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, InputControl } from "../../components";
import { openLinksOptions } from "../../controls/constants";
import useLayouts from "../../hooks/useLayouts";
import ContentOrientations from "../shared/templates/templates-parts/contentOrientations";
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
		contentOrientation,
		contentAlignment,
		postLimit,
		imagePosition,
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
		metaDisplayType,
		paginationEnable,
		liveFilterEnable,
	} = attributes;

	const layouts = useLayouts(blockName, timelineLayout);

	const orientation_five = {
		postCardPadding: {
			...postCardPadding,
			device: {
				...postCardPadding.device,
				Desktop: {
					top: 15,
					right: 15,
					bottom: 15,
					left: 15,
				},
			},
		},
		postCardBorder: { ...postCardBorder, style: "solid" },
		postCardBorderWidth: {
			...postCardBorderWidth,
			device: {
				...postCardBorderWidth.device,
				Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
			},
		},
		contentAlignment: "left",
		contentAreaPadding: {
			...contentAreaPadding,
			device: {
				...contentAreaPadding.device,
				Desktop: { top: "", right: "", bottom: "", left: "" },
			},
		},
	};
	const orientation_other = {
		postCardPadding: {
			...postCardPadding,
			device: {
				...postCardPadding.device,
				Desktop: { top: "", right: "", bottom: "", left: "" },
			},
		},
		postCardBorder: { ...postCardBorder, style: "none" },
		contentAlignment: "left",
		contentAreaPadding: {
			...contentAreaPadding,
			device: {
				...contentAreaPadding.device,
				Desktop: { top: 0, right: 20, bottom: 15, left: 20 },
			},
		},
	};

	const orientationHandler = (newValue) => {
		if (newValue === contentOrientation) return;

		const cardValue = newValue === "orientation_five" ? orientation_five : orientation_other;

		const newData = {
			...cardValue,
			contentOrientation: newValue,
		};
		setAttributes(newData);
	};

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
			{imagePosition !== "background" && (
				<ContentOrientations
					label={__("Content Orientation", "post-carousel")}
					attributes={contentOrientation}
					setAttributes={setAttributes}
					attributesKey={"contentOrientation"}
					blockName={blockName}
					onChange={orientationHandler}
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
			<SPRangeControl
				label={__("Gap Between Posts", "post-carousel")}
				attributes={gapBetweenPosts}
				attributesKey={"gapBetweenPosts"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 20 }}
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
			<Toggle
				label={__("Enable Equal Height", "post-carousel")}
				attributes={equalHeightEnable}
				attributesKey={"equalHeightEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
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
