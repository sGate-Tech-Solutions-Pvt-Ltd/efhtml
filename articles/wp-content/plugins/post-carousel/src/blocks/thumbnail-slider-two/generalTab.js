import { __ } from "@wordpress/i18n";
import { useEffect, useMemo, useState } from "@wordpress/element";
import { Background, InputControl, Layouts, SelectField, SPRangeControl } from "../../components";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import useLayouts from "../../hooks/useLayouts";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import Toggle from "../../components/toggle/toggle";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";
import { openLinksOptions } from "../../controls/constants";
import { useDeviceType } from "../../controls/controls";
import ProInfo from "../../components/proInfo/proInfo";

export const ThumbnailSliderTwoGeneralTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		thumbnailSliderTwoLayout,
		thumbnailTwoAlignment,
		thumbnailTwoPosition,
		thumbnailSliderTwoHeight,
		thumbnailTwoItemsHeight,
		thumbnailItemsToShow,
		catTabCategoryColor,
		titleMargin,
		contentAlignment,
		generalLinkOpen,
		thumbnailTwoGeneralPreloader,
		postLimit,
	} = attributes;

	const layouts = useLayouts(blockName, thumbnailSliderTwoLayout);
	const [thumbnailPositionItem, setThumbnailPositionItem] = useState([]);
	const [layoutName, setLayoutName] = useState("thumbnail-slider-layout-one");
	const deviceType = useDeviceType();

	const layoutDefault = useMemo(
		() => ({
			"thumbnail-slider-two-layout-one": {
				thumbnailTwoPosition: "bottom",
				contentVerticalPosition: "top",
				contentHorizontalPosition: "center",
				thumbnailItemsToShow: {
					...thumbnailItemsToShow,
					device: {
						...thumbnailItemsToShow.device,
						[deviceType]: 3,
					},
				},
				postLimit: "3",
				thumbnailTwoItemsHeight: {
					...thumbnailTwoItemsHeight,
					device: { ...thumbnailTwoItemsHeight.device, Desktop: 132 },
				},
				carouselNavArrow: false,
				catTabCategoryColor: {
					...catTabCategoryColor,
					color: "#222222",
				},
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							...titleMargin.device.Desktop,
							top: 6,
							bottom: 0,
							right: 0,
							left: 0,
						},
					},
				},
			},
			"thumbnail-slider-two-layout-two": {
				contentVerticalPosition: "top",
				contentHorizontalPosition: "center",
				thumbnailTwoPosition: "bottom",

				thumbnailItemsToShow: {
					...thumbnailItemsToShow,
					device: {
						...thumbnailItemsToShow.device,
						[deviceType]: 4,
					},
				},
				postLimit: "4",
				thumbnailTwoItemsHeight: {
					...thumbnailTwoItemsHeight,
					device: { ...thumbnailTwoItemsHeight.device, Desktop: 60 },
				},
				carouselNavArrow: false,
				catTabCategoryColor: {
					...catTabCategoryColor,
					color: "#222222",
				},
			},
			"thumbnail-slider-two-layout-three": {
				contentVerticalPosition: "bottom",
				contentHorizontalPosition: "left",
				thumbnailTwoPosition: "right",
				thumbnailItemsToShow: {
					...thumbnailItemsToShow,
					device: {
						...thumbnailItemsToShow.device,
						[deviceType]: 3,
					},
				},
				postLimit: "4",
				thumbnailTwoItemsHeight: {
					...thumbnailTwoItemsHeight,
					device: { ...thumbnailTwoItemsHeight.device, Desktop: 220 },
				},
				carouselNavArrow: true,
				catTabCategoryColor: {
					...catTabCategoryColor,
					color: "#fff",
				},
			},
			"thumbnail-slider-two-layout-four": {
				contentVerticalPosition: "bottom",
				contentHorizontalPosition: "left",
				thumbnailTwoPosition: "right",
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							...titleMargin.device.Desktop,
							top: 0,
							bottom: 0,
							right: 0,
							left: 0,
						},
					},
				},

				thumbnailItemsToShow: {
					...thumbnailItemsToShow,
					device: {
						...thumbnailItemsToShow.device,
						[deviceType]: 4,
					},
				},
				postLimit: "4",
				thumbnailTwoItemsHeight: {
					...thumbnailTwoItemsHeight,
					device: { ...thumbnailTwoItemsHeight.device, Desktop: 132 },
				},
				carouselNavArrow: true,
				catTabCategoryColor: {
					...catTabCategoryColor,
					color: "#fff",
				},
			},
			"thumbnail-slider-two-layout-five": {
				contentVerticalPosition: "bottom",
				contentHorizontalPosition: "left",
				thumbnailTwoPosition: "right",
				carouselNavArrow: true,
				thumbnailItemsToShow: {
					...thumbnailItemsToShow,
					device: {
						...thumbnailItemsToShow.device,
						[deviceType]: 5,
					},
				},
				postLimit: "8",
				thumbnailTwoItemsHeight: {
					...thumbnailTwoItemsHeight,
					device: { ...thumbnailTwoItemsHeight.device, Desktop: 132 },
				},
				catTabCategoryColor: {
					...catTabCategoryColor,
					color: "#fff",
				},
			},
		}),
		[]
	);

	const layoutsChangeHandler = (newValue) => {
		if (newValue === thumbnailSliderTwoLayout) return;

		const newData = {
			...layoutDefault?.[newValue],
			thumbnailSliderTwoLayout: newValue,
			blockLayoutName: newValue,
		};
		setAttributes(newData);
		setLayoutName(newValue);
	};

	const configThumbPosition = useMemo(
		() => ({
			"thumbnail-slider-two-layout-one": [],
			"thumbnail-slider-two-layout-two": [
				{ label: "Left", value: "left" },
				{ label: "Right", value: "right" },
				{ label: "Bottom", value: "bottom" },
			],
			"thumbnail-slider-two-layout-three": [
				{ label: "Left", value: "left" },
				{ label: "Right", value: "right" },
			],
			"thumbnail-slider-two-layout-four": [
				{ label: "Left", value: "left" },
				{ label: "Right", value: "right" },
			],
			"thumbnail-slider-two-layout-five": [],
		}),
		[]
	);

	useEffect(() => {
		setThumbnailPositionItem(configThumbPosition[thumbnailSliderTwoLayout] || []);
	}, [thumbnailSliderTwoLayout]);

	useEffect(() => {
		if (["left", "right"].includes(thumbnailTwoPosition)) {
			const contentPosition = thumbnailTwoPosition === "left" ? "right" : "left";
			setAttributes({ contentHorizontalPosition: contentPosition });
		}
	}, [thumbnailTwoPosition]);

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Thumbnails Slider Layout", "post-carousel")}
					attributes={thumbnailSliderTwoLayout}
					attributesKey={"thumbnailSliderTwoLayout"}
					setAttributes={setAttributes}
					displayActive={true}
					showDemoTitle={true}
					grid={3}
					items={layouts}
					onChange={layoutsChangeHandler}
				/>
			)}
			{/* <Toggle
				label={ __( 'Smart Frontend Filter', 'post-carousel' ) }
				attributes={ liveFilterEnable }
				setAttributes={ setAttributes }
				attributesKey={ 'liveFilterEnable' }
			/> */}
			{"thumbnail-slider-two-layout-one" === thumbnailSliderTwoLayout && (
				<SPToggleGroupControl
					label={__("Thumbnails Alignment", "post-carousel")}
					attributes={thumbnailTwoAlignment}
					attributesKey={"thumbnailTwoAlignment"}
					setAttributes={setAttributes}
					items={[
						{ label: <AlignLeft />, value: "left" },
						{ label: <AlignCenter />, value: "center" },
						{ label: <AlignRight />, value: "right" },
					]}
				/>
			)}
			{!["thumbnail-slider-two-layout-one", "thumbnail-slider-two-layout-five"].includes(
				thumbnailSliderTwoLayout
			) && (
				<SPToggleGroupControl
					label={__("Thumbnails Position", "post-carousel")}
					attributes={thumbnailTwoPosition}
					attributesKey={"thumbnailTwoPosition"}
					setAttributes={setAttributes}
					items={thumbnailPositionItem}
				/>
			)}
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
				attributes={thumbnailSliderTwoHeight}
				attributesKey={"thumbnailSliderTwoHeight"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				max={1200}
				defaultValue={{ unit: "px", value: 620 }}
			/>
			{!["thumbnail-slider-two-layout-four", "thumbnail-slider-two-layout-five"].includes(
				thumbnailSliderTwoLayout
			) && (
				<SPRangeControl
					key={layoutName}
					label={__("Thumbnails Height", "post-carousel")}
					attributes={thumbnailTwoItemsHeight}
					attributesKey={"thumbnailTwoItemsHeight"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					max={450}
					defaultValue={{
						unit: "px",
						value: 132,
					}}
				/>
			)}
			{!["thumbnail-slider-two-layout-one", "thumbnail-slider-two-layout-five"].includes(
				thumbnailSliderTwoLayout
			) && (
				<SPRangeControl
					key={thumbnailItemsToShow}
					label={__("Thumbnail Items to Show", "post-carousel")}
					attributes={thumbnailItemsToShow}
					attributesKey={"thumbnailItemsToShow"}
					setAttributes={setAttributes}
					min={1}
					max={6}
					defaultValue={{
						value: 3,
					}}
				/>
			)}
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
				attributes={thumbnailTwoGeneralPreloader}
				attributesKey={"thumbnailTwoGeneralPreloader"}
				setAttributes={setAttributes}
			/>
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

export const ThumbnailTwoSliderTab = ({ attributes, setAttributes }) => {
	const {
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselSpeed,
		carouselDirection,
		thumbnailTwoSlideToScroll,
		carouselPauseOnHover,
		thumbnailTwoAnimationEffect,
		thumbnailTwoAdaptiveHeight,
		infiniteLoop,
		thumbnailTwoTabKeyNavigation,
		thumbnailTwoMouseWheelControl,
		thumbnailTwoFreeScrollMode,
		// thumbnailTwoNavArrow,
		carouselNavArrow,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("AutoPlay", "post-carousel")}
				attributes={carouselAutoPlay}
				attributesKey={"carouselAutoPlay"}
				setAttributes={setAttributes}
			/>
			{carouselAutoPlay && (
				<SPRangeControl
					label={__("AutoPlay Delay", "post-carousel")}
					attributes={carouselAutoPlayDelay}
					attributesKey={"carouselAutoPlayDelay"}
					setAttributes={setAttributes}
					units={["ms"]}
					max={6000}
					defaultValue={{ unit: "ms", value: 2000 }}
				/>
			)}
			<SPRangeControl
				label={__("Slider Speed", "post-carousel")}
				attributes={carouselSpeed}
				attributesKey={"carouselSpeed"}
				setAttributes={setAttributes}
				units={["ms"]}
				max={4000}
				defaultValue={{ unit: "ms", value: 600 }}
			/>
			{carouselAutoPlay && (
				<SPToggleGroupControl
					label={__("Slider Direction", "post-carousel")}
					attributes={carouselDirection}
					attributesKey={"carouselDirection"}
					setAttributes={setAttributes}
					items={[
						{ label: "Right to Left", value: "right_to_left" },
						{ label: "Left to Right", value: "left_to_right" },
					]}
				/>
			)}
			<InputControl
				label={__("Slide to Scroll", "post-carousel")}
				attributes={thumbnailTwoSlideToScroll}
				attributesKey={"thumbnailTwoSlideToScroll"}
				setAttributes={setAttributes}
				flex={true}
				inputType={"number"}
				min={0}
				max={10}
			/>
			<Toggle
				label={__("Pause on Hover", "post-carousel")}
				attributes={carouselPauseOnHover}
				attributesKey={"carouselPauseOnHover"}
				setAttributes={setAttributes}
			/>
			<SelectField
				label={__("Animation Effect", "post-carousel")}
				attributes={thumbnailTwoAnimationEffect}
				attributesKey={"thumbnailTwoAnimationEffect"}
				setAttributes={setAttributes}
				flexStyle={true}
				items={[
					{ label: "Slide", value: "slide" },
					{ label: "Cube", value: "cube" },
					{ label: "Flip", value: "flip" },
					{ label: "Coverflow", value: "coverflow", disabled: "disabled" },
					{ label: "Fade (Pro)", value: "fade", disabled: "disabled" },
				]}
			/>
			<Toggle
				label={__("Adaptive Height", "post-carousel")}
				attributes={thumbnailTwoAdaptiveHeight}
				attributesKey={"thumbnailTwoAdaptiveHeight"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Infinite Loop", "post-carousel")}
				attributes={infiniteLoop}
				attributesKey={"infiniteLoop"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Tab and Key Navigation", "post-carousel")}
				attributes={thumbnailTwoTabKeyNavigation}
				attributesKey={"thumbnailTwoTabKeyNavigation"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("MouseWheel Control", "post-carousel")}
				attributes={thumbnailTwoMouseWheelControl}
				attributesKey={"thumbnailTwoMouseWheelControl"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Free Scroll Mode", "post-carousel")}
				attributes={thumbnailTwoFreeScrollMode}
				attributesKey={"thumbnailTwoFreeScrollMode"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Navigation Arrow", "post-carousel")}
				attributes={carouselNavArrow}
				attributesKey={"carouselNavArrow"}
				setAttributes={setAttributes}
			/>
		</>
	);
};

export const ThumbnailProgressBarTab = ({ attributes, setAttributes }) => {
	const [colorState, setColorState] = useState("normal");
	const { thumbnailProgressPosition, thumbnailProgressBarWidth, thumbnailProgressThickness, thumbnailProgressColor } =
		attributes;

	return (
		<>
			<SPToggleGroupControl
				label={__("Bar Position", "post-carousel")}
				attributes={thumbnailProgressPosition}
				attributesKey={"thumbnailProgressPosition"}
				setAttributes={setAttributes}
				items={[
					{ label: "Left", value: "left" },
					{ label: "Top", value: "top" },
					{ label: "Bottom", value: "bottom" },
				]}
			/>
			<SPRangeControl
				label={__(thumbnailProgressPosition === "left" ? "Height" : "Width", "post-carousel")}
				attributes={thumbnailProgressBarWidth}
				attributesKey={"thumbnailProgressBarWidth"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				max={400}
				defaultValue={{ unit: "%", value: 100 }}
			/>
			<SPRangeControl
				label={__("Thickness", "post-carousel")}
				attributes={thumbnailProgressThickness}
				attributesKey={"thumbnailProgressThickness"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				max={10}
				defaultValue={{ unit: "%", value: 1 }}
			/>
			<SPToggleGroupControl
				attributes={colorState}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Active", value: "active" },
				]}
			/>
			{"normal" === colorState && (
				<Background
					label={__("Color Type", "post-carousel")}
					colorLabel="Solid Color"
					defaultColor="#1E1E1E99"
					attributes={thumbnailProgressColor}
					attributesKey={"thumbnailProgressColor"}
					setAttributes={setAttributes}
					colorType={"color"}
					items={[
						{
							label: <TransparentIcon />,
							value: "transparent",
							tooltip: "Transparent",
						},
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
			)}
			{"active" === colorState && (
				<Background
					label={__("Color Type", "post-carousel")}
					colorLabel="Solid Color"
					defaultColor="#1E1E1E99"
					attributes={thumbnailProgressColor}
					attributesKey={"thumbnailProgressColor"}
					setAttributes={setAttributes}
					colorType={"hover"}
					items={[
						{
							label: <TransparentIcon />,
							value: "transparent",
							tooltip: "Transparent",
						},
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
			)}
		</>
	);
};

export const ThumbnailTwoGeneralTab = ({ attributes, setAttributes }) => {
	const { contentAlignment, generalLinkOpen, thumbnailTwoGeneralPreloader } = attributes;

	return (
		<>
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
				attributes={thumbnailTwoGeneralPreloader}
				attributesKey={"thumbnailTwoGeneralPreloader"}
				setAttributes={setAttributes}
			/>
		</>
	);
};
