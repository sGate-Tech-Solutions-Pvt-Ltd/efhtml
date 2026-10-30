import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, InputControl } from "../../components";
import { openLinksOptions } from "../../controls/constants";
import useLayouts from "../../hooks/useLayouts";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import ContentOrientations from "../shared/templates/templates-parts/contentOrientations";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { useMemo } from "@wordpress/element";
import ProInfo from "../../components/proInfo/proInfo";

export const PostTimelineGeneralTab = ({ attributes, setAttributes }) => {
	const {
		equalHeightEnable,
		blockName,
		generalLinkOpen,
		carouselGap,
		timelineLayout,
		preloaderEnable,
		contentOrientation,
		contentAlignment,
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
		liveFilterEnable,
		postLimit,
	} = attributes;
	const layouts = useLayouts(blockName, timelineLayout);

	const orientation_five = useMemo(
		() => ({
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
			postCardBorder: {
				...postCardBorder,
				style: "solid",
				color: "#dddddd",
			},
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
		}),
		[]
	);
	const orientation_other = useMemo(
		() => ({
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
		}),
		[]
	);

	const orientationHandler = (newValue) => {
		if (newValue === contentOrientation) return;

		const newData = {
			...(newValue === "orientation_five" ? orientation_five : orientation_other),
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
			<ContentOrientations
				label={__("Content Orientation", "post-carousel")}
				attributes={contentOrientation}
				setAttributes={setAttributes}
				attributesKey={"contentOrientation"}
				blockName={blockName}
				onChange={orientationHandler}
			/>
			{/* <Toggle
				label={ __( 'Smart Frontend Filter', 'post-carousel' ) }
				attributes={ liveFilterEnable }
				setAttributes={ setAttributes }
				attributesKey={ 'liveFilterEnable' }
			/> */}
			<InputControl
				label={__("Number of Slides", "post-carousel")}
				className="sp-smart-limit-field"
				ajax={true}
				attributes={postLimit}
				min={1}
				attributesKey={"postLimit"}
				setAttributes={setAttributes}
			/>
			<SPRangeControl
				label={__("Gap Between Posts", "post-carousel")}
				attributes={carouselGap}
				attributesKey={"carouselGap"}
				setAttributes={setAttributes}
				max={150}
				min={0}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 32 }}
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

export const PostTimelineCarouselTab = ({ attributes, setAttributes }) => {
	const {
		// postTimelineNavArrow,
		postTimelineAutoPlay,
		postTimelineAutoPlayDelay,
		carouselPauseOnHover,
		carouselDirection,
		carouselStyle,
		carouselColumn,
		timelineLayout,
		carouselSpeed,
		postTimelineTickerSpeed,
		carouselNavArrow,
	} = attributes;

	return (
		<>
			{timelineLayout !== "timeline-three-layout-two" && (
				<SPToggleGroupControl
					label={__("Carousel Style", "post-carousel")}
					attributes={carouselStyle}
					attributesKey={"carouselStyle"}
					setAttributes={setAttributes}
					items={[
						{ label: "Standard", value: "standard" },
						{ label: "Ticker (Pro)", value: "ticker", disabled: true },
					]}
				/>
			)}
			<SPRangeControl
				label={__("Columns", "post-carousel")}
				setAttributes={setAttributes}
				attributes={carouselColumn}
				max={10}
				min={1}
				attributesKey={"carouselColumn"}
				defaultValue={{ unit: "", value: 3 }}
			/>
			{carouselStyle === "standard" && (
				<Toggle
					label={__("AutoPlay", "post-carousel")}
					attributes={postTimelineAutoPlay}
					attributesKey={"postTimelineAutoPlay"}
					setAttributes={setAttributes}
				/>
			)}
			{postTimelineAutoPlay && (
				<>
					{carouselStyle === "standard" && (
						<SPRangeControl
							label={__("AutoPlay Delay", "post-carousel")}
							attributes={postTimelineAutoPlayDelay}
							attributesKey={"postTimelineAutoPlayDelay"}
							setAttributes={setAttributes}
							units={["ms"]}
							max={5000}
							defaultValue={{ unit: "ms", value: 2000 }}
							step={50}
						/>
					)}
				</>
			)}
			{"ticker" !== carouselStyle && (
				<SPRangeControl
					label={__("Carousel Speed", "post-carousel")}
					setAttributes={setAttributes}
					attributes={carouselSpeed}
					max={5000}
					attributesKey={"carouselSpeed"}
					defaultValue={{ unit: "ms", value: 2000 }}
					step={50}
				/>
			)}
			{"ticker" === carouselStyle && (
				<SPRangeControl
					label={__("Carousel Speed", "post-carousel")}
					setAttributes={setAttributes}
					attributes={postTimelineTickerSpeed}
					max={5000}
					attributesKey={"postTimelineTickerSpeed"}
					defaultValue={{ unit: "ms", value: 3000 }}
					step={50}
				/>
			)}
			{(postTimelineAutoPlay || carouselStyle === "ticker") && (
				<Toggle
					label={__("Pause on Hover", "post-carousel")}
					attributes={carouselPauseOnHover}
					setAttributes={setAttributes}
					attributesKey={"carouselPauseOnHover"}
				/>
			)}
			{postTimelineAutoPlay && (
				<>
					<SPToggleGroupControl
						label={__("Carousel Direction", "post-carousel")}
						attributes={carouselDirection}
						attributesKey={"carouselDirection"}
						setAttributes={setAttributes}
						items={[
							{ label: "Right to Left", value: "right_to_left" },
							{ label: "Left to Right", value: "left_to_right" },
						]}
					/>
				</>
			)}
			{(carouselStyle === "standard" || timelineLayout === "timeline-three-layout-two") && (
				<Toggle
					label={__("Navigation Arrow", "post-carousel")}
					attributes={carouselNavArrow}
					attributesKey={"carouselNavArrow"}
					setAttributes={setAttributes}
				/>
			)}
		</>
	);
};
