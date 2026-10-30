import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { Toggle, SPRangeControl, SelectField, Layouts, InputControl } from "../../components";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	OrientationEightIcon,
	OrientationFiveIcons,
	OrientationFourIcon,
	OrientationOneIcon,
	OrientationSevenIcon,
	OrientationSixIcon,
	OrientationThreeIcon,
	OrientationTwoIcon,
} from "../../icons/icons";
import { openLinksOptions } from "../../controls/constants";
import { inArray } from "../../controls/controls";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { useOrientationConfig } from "../../hooks/useOrientationValue";
import { CarouselCenterIcon, CarouselMultiRowIcon, CarouselStandardIcon, CarouselTickerIcon } from "./icon";
import ProInfo from "../../components/proInfo/proInfo";
import { priceLink } from "../shared/helpFn";

//carousel general tab panel
export const CarouselGeneralPanel = ({ attributes, setAttributes }) => {
	const {
		carouselStyle,
		contentOrientation,
		carouselColumn,
		carouselHeight,
		carouselGap,
		imagePosition,
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
		carouselAnimationEffect,
		liveFilterEnable,
		contentAlignment,
		generalLinkOpen,
		preloaderEnable,
		equalHeightEnable,
		postLimit,
		showPartialView,
	} = attributes;

	const layoutChange = (newValue) => {
		if (newValue === carouselStyle) {
			return;
		}
		const slideEffect = ["center", "multi_row"].includes(newValue) ? "slide" : carouselAnimationEffect;
		const partialView = ["multi_row"].includes(newValue) ? false : showPartialView;
		setAttributes({
			carouselStyle: newValue,
			carouselAnimationEffect: slideEffect,
			showPartialView: partialView,
		});
	};

	const orientationConfig = useOrientationConfig({
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
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

	return (
		<>
			<Layouts
				attributes={carouselStyle}
				setAttributes={setAttributes}
				attributesKey={"carouselStyle"}
				displayActive={true}
				grid={2}
				onChange={layoutChange}
				label={__("Carousel Style", "post-carousel")}
				showDemoTitle={true}
				items={[
					{
						icon: <CarouselStandardIcon value={carouselStyle} />,
						label: "Standard",
						value: "standard",
						type: "free",
					},
					{
						icon: <CarouselCenterIcon value={carouselStyle} />,
						label: "Center",
						value: "center",
						type: "pro",
						demoLink: priceLink,
					},
					{
						icon: <CarouselTickerIcon value={carouselStyle} />,
						label: "Ticker",
						value: "ticker",
						type: "pro",
						demoLink: priceLink,
					},
					{
						icon: <CarouselMultiRowIcon value={carouselStyle} />,
						label: "Multi-row",
						value: "multi_row",
						type: "pro",
						demoLink: priceLink
					},
				]}
			/>
			{ ["standard", "center"].includes(carouselStyle) && (
				<Toggle
					label={__("Partial Slide View", "post-carousel")}
					pro={true}
					attributes={showPartialView}
					setAttributes={setAttributes}
					attributesKey={"showPartialView"}
				/>
			)}
			{imagePosition !== "background" && (
				<Layouts
					attributes={contentOrientation}
					setAttributes={setAttributes}
					attributesKey={"contentOrientation"}
					displayActive={true}
					grid={4}
					label={__("Content Orientation", "post-carousel")}
					onChange={orientationHandler}
					proBtnClass="sp-smart-small-size"
					items={ [
						{
							icon: <OrientationOneIcon value={attributes} />,
							value: "orientation_one",
							type: "free",
						},
						{
							icon: <OrientationTwoIcon value={attributes} />,
							value: "orientation_two",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
						{
							icon: <OrientationThreeIcon value={attributes} />,
							value: "orientation_three",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
						{
							icon: <OrientationFourIcon value={attributes} />,
							value: "orientation_four",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
						{
							icon: <OrientationFiveIcons value={attributes} />,
							value: "orientation_five",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
						{
							icon: <OrientationSixIcon value={attributes} />,
							value: "orientation_six",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
						{
							icon: <OrientationSevenIcon value={attributes} />,
							value: "orientation_seven",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
						{
							icon: <OrientationEightIcon value={attributes} />,
							value: "orientation_eight",
							type: "pro",
							demoLink: "https://wpsmartpost.com/pricing/?ref=1"
						},
					] }
				/>
			)}
			<Toggle
				label={__("Smart Frontend Filter", "post-carousel")}
				attributes={liveFilterEnable}
				setAttributes={setAttributes}
				attributesKey={"liveFilterEnable"}
			/>
			<SPRangeControl
				label={__("Columns", "post-carousel")}
				setAttributes={setAttributes}
				attributes={carouselColumn}
				max={10}
				min={1}
				ajax={true}
				attributesKey={"carouselColumn"}
				defaultValue={{ unit: "", value: 3 }}
			/>
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
				label={__("Height", "post-carousel")}
				setAttributes={setAttributes}
				attributes={carouselHeight}
				units={["px", "%", "em"]}
				max={1200}
				// ajax={ true }
				attributesKey={"carouselHeight"}
				defaultValue={{ unit: "px", value: "" }}
			/>
			<SPRangeControl
				label={__("Gap", "post-carousel")}
				setAttributes={setAttributes}
				attributes={carouselGap}
				units={["px", "%", "em"]}
				min={0}
				max={100}
				// ajax={ true }
				attributesKey={"carouselGap"}
				defaultValue={{ unit: "px", value: 24 }}
			/>
			{/* General Tabs Components */}
			<SPToggleGroupControl
				label={__("Content Alignment", "post-carousel")}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
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
				<span>Unlock exclusive carousel styles and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};
//Carousel Slider tab panel
export const CarouselSliderPanel = ({ attributes, setAttributes }) => {
	const {
		carouselStyle,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselSpeed,
		slideToScroll,
		carouselDirection,
		carouselPauseOnHover,
		carouselAnimationEffect,
		carouselAdaptiveHeight,
		carouselTabKeyNav,
		carouselMouseWheelControl,
		carouselFreeScrollMode,
		carouselNavArrow,
		carouselPaginationDot,
		infiniteLoop,
		carouselTickerSpeed,
	} = attributes;

	const carouselAnimationItems = [
		{ label: "Slide", value: "slide" },
		{ label: "Cube", value: "cube" },
		{ label: "Flip", value: "flip" },
		{ label: "Coverflow", value: "coverflow", disabled: "disabled" },
		{ label: "Fade (Pro)", value: "fade", disabled: "disabled" },
	];

	useEffect(() => {
		if ("ticker" === carouselStyle) {
			setAttributes({ carouselAnimationEffect: "slide" });
		}
	}, [carouselStyle]);

	return (
		<>
			{"ticker" !== carouselStyle && (
				<Toggle
					label={__("AutoPlay", "post-carousel")}
					attributes={carouselAutoPlay}
					setAttributes={setAttributes}
					attributesKey={"carouselAutoPlay"}
				/>
			)}
			{carouselAutoPlay && "ticker" !== carouselStyle && (
				<SPRangeControl
					label={__("AutoPlay Delay", "post-carousel")}
					attributes={carouselAutoPlayDelay}
					attributesKey={"carouselAutoPlayDelay"}
					setAttributes={setAttributes}
					// units={ ['ms'] }
					max={5000}
					ajax={true}
					defaultValue={{ unit: "ms", value: 2000 }}
					step={50}
				/>
			)}
			{"ticker" !== carouselStyle && (
				<SPRangeControl
					label={__("Carousel Speed", "post-carousel")}
					setAttributes={setAttributes}
					attributes={carouselSpeed}
					// units={ [ 'ms' ] }
					max={5000}
					attributesKey={"carouselSpeed"}
					defaultValue={{ unit: "ms", value: 600 }}
					step={50}
				/>
			)}
			{"ticker" === carouselStyle && (
				<SPRangeControl
					label={__("Carousel Speed", "post-carousel")}
					setAttributes={setAttributes}
					attributes={carouselTickerSpeed}
					// units={ [ 'ms' ] }
					max={5000}
					attributesKey={"carouselTickerSpeed"}
					defaultValue={{ unit: "ms", value: 3000 }}
					step={50}
				/>
			)}
			{(carouselAutoPlay || "ticker" === carouselStyle) && (
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
			)}
			{"ticker" !== carouselStyle && (
				<InputControl
					label={__("Slide to Scroll", "post-carousel")}
					attributes={slideToScroll}
					attributesKey={"slideToScroll"}
					setAttributes={setAttributes}
					min={1}
				/>
			)}
			{carouselAutoPlay && (
				<Toggle
					label={__("Pause on Hover", "post-carousel")}
					attributes={carouselPauseOnHover}
					setAttributes={setAttributes}
					attributesKey={"carouselPauseOnHover"}
				/>
			)}
			{"ticker" !== carouselStyle && (
				<SelectField
					key={carouselStyle}
					label={__("Animation Effect", "post-carousel")}
					flexStyle={true}
					attributes={carouselAnimationEffect}
					attributesKey={"carouselAnimationEffect"}
					setAttributes={setAttributes}
					items={carouselAnimationItems}
				/>
			)}
			{!inArray(["ticker", "multi_row"], carouselStyle) && (
				<>
					<Toggle
						label={__("Adaptive Height", "post-carousel")}
						attributes={carouselAdaptiveHeight}
						attributesKey={"carouselAdaptiveHeight"}
						setAttributes={setAttributes}
					/>
					<Toggle
						label={__("Infinite Loop", "post-carousel")}
						attributes={infiniteLoop}
						attributesKey={"infiniteLoop"}
						setAttributes={setAttributes}
					/>
				</>
			)}
			{"ticker" !== carouselStyle && (
				<Toggle
					label={__("Tab and Key Navigation", "post-carousel")}
					attributes={carouselTabKeyNav}
					attributesKey={"carouselTabKeyNav"}
					setAttributes={setAttributes}
				/>
			)}
			{"ticker" !== carouselStyle && (
				<Toggle
					label={__("MouseWheel Control", "post-carousel")}
					attributes={carouselMouseWheelControl}
					attributesKey={"carouselMouseWheelControl"}
					setAttributes={setAttributes}
				/>
			)}
			{"ticker" !== carouselStyle && (
				<Toggle
					label={__("Free Scroll Mode", "post-carousel")}
					attributes={carouselFreeScrollMode}
					attributesKey={"carouselFreeScrollMode"}
					setAttributes={setAttributes}
				/>
			)}
			{"ticker" !== carouselStyle && (
				<Toggle
					label={__("Navigation Arrow", "post-carousel")}
					attributes={carouselNavArrow}
					attributesKey={"carouselNavArrow"}
					setAttributes={setAttributes}
				/>
			)}
			{"ticker" !== carouselStyle && (
				<Toggle
					label={__("Pagination Dots", "post-carousel")}
					attributes={carouselPaginationDot}
					attributesKey={"carouselPaginationDot"}
					setAttributes={setAttributes}
				/>
			)}
		</>
	);
};

//post carousel general tab panel
// export const PostCarouselGeneralTab = ( { attributes, setAttributes } ) => {
// 	const {
// 		contentAlignment,
// 		generalLinkOpen,
// 		preloaderEnable,
// 		equalHeightEnable,
// 	} = attributes;
// 	return (
// 		<>
// 			<SPToggleGroupControl
// 				label={ __( 'Content Alignment', 'post-carousel' ) }
// 				items={ [
// 					{ label: <AlignLeft />, value: 'left' },
// 					{ label: <AlignCenter />, value: 'center' },
// 					{ label: <AlignRight />, value: 'right' },
// 				] }
// 				attributes={ contentAlignment }
// 				attributesKey={ 'contentAlignment' }
// 				setAttributes={ setAttributes }
// 			/>
// 			<SelectField
// 				label={ __( 'Link Open In', 'post-carousel' ) }
// 				attributes={ generalLinkOpen }
// 				attributesKey={ 'generalLinkOpen' }
// 				setAttributes={ setAttributes }
// 				items={ openLinksOptions }
// 			/>
// 			<Toggle
// 				label={ __( 'Preloader', 'post-carousel' ) }
// 				attributes={ preloaderEnable }
// 				attributesKey={ 'preloaderEnable' }
// 				setAttributes={ setAttributes }
// 			/>
// 			<Toggle
// 				label={ __( 'Enable Equal Height', 'post-carousel' ) }
// 				attributes={ equalHeightEnable }
// 				attributesKey={ 'equalHeightEnable' }
// 				setAttributes={ setAttributes }
// 			/>
// 		</>
// 	);
// };
