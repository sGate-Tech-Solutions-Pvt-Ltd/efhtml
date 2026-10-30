import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, InputControl } from "../../components";
import useLayouts from "../../hooks/useLayouts";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { useDeviceType } from "../../controls/controls";
import ProInfo from "../../components/proInfo/proInfo";

export const PostSliderTwoLayoutTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		postSliderTwoLayout,
		postSliderTwoHeight,
		contentAreaWidth,
		contentAreaHeight,
		contentAreaBg,
		contentAreaBorder,
		liveFilterEnable,
		generalLinkOpen,
		postSliderGeneralPreloader,
		contentAlignment,
		postLimit,
		carouselArrowSpaceBetween,
		carouselArrowBorderRadius,
	} = attributes;
	const layouts = useLayouts(blockName, postSliderTwoLayout);
	const deviceType = useDeviceType();

	const layoutChange = (newValue) => {
		if (newValue === postSliderTwoLayout) {
			return;
		}

		const layoutDefault = {
			"post-slider-two-layout-one": {
				contentHorizontalPosition: "center",
				contentVerticalPosition: "center",
				contentAlignment: "center",
				contentAreaWidth: {
					...contentAreaWidth,
					device: {
						...contentAreaWidth.device,
						[deviceType]: 580,
					},
					unit: { ...contentAreaWidth.unit, [deviceType]: "px" },
				},
				contentAreaHeight: {
					...contentAreaHeight,
					device: {
						...contentAreaHeight.device,
						[deviceType]: 280,
					},
					unit: {
						...contentAreaHeight.unit,
						[deviceType]: "px",
					},
				},
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "#ffffffe6",
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						[deviceType]: 100,
					},
				},
				carouselArrowBorderRadius: {
					...carouselArrowBorderRadius,
					device: {
						...carouselArrowBorderRadius.device,
						[deviceType]: {
							top: 50,
							right: 50,
							bottom: 50,
							left: 50,
						},
					},
				},
			},
			"post-slider-two-layout-two": {
				contentHorizontalPosition: "center",
				contentVerticalPosition: "bottom",
				contentAlignment: "center",
				contentAreaWidth: {
					...contentAreaWidth,
					device: {
						...contentAreaWidth.device,
						[deviceType]: 70,
					},
					unit: { ...contentAreaWidth.unit, [deviceType]: "%" },
				},
				contentAreaHeight: {
					...contentAreaHeight,
					device: {
						...contentAreaHeight.device,
						[deviceType]: 50,
					},
					unit: {
						...contentAreaHeight.unit,
						[deviceType]: "%",
					},
				},
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "#ffffffe6",
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						[deviceType]: 100,
					},
				},
				carouselArrowBorderRadius: {
					...carouselArrowBorderRadius,
					device: {
						...carouselArrowBorderRadius.device,
						[deviceType]: {
							top: 50,
							right: 50,
							bottom: 50,
							left: 50,
						},
					},
				},
			},
			"post-slider-two-layout-three": {
				contentHorizontalPosition: "right",
				contentVerticalPosition: "center",
				contentAlignment: "left",
				contentAreaWidth: {
					...contentAreaWidth,
					device: {
						...contentAreaWidth.device,
						[deviceType]: 60,
					},
					unit: { ...contentAreaWidth.unit, [deviceType]: "%" },
				},
				contentAreaHeight: {
					...contentAreaHeight,
					device: {
						...contentAreaHeight.device,
						[deviceType]: 280,
					},
					unit: {
						...contentAreaHeight.unit,
						[deviceType]: "px",
					},
				},
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "#ffffff",
					},
				},
				contentAreaBorder: {
					...contentAreaBorder,
					style: "solid",
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 0,
						Tablet: 0,
						Mobile: 0,
					},
				},
				carouselArrowBorderRadius: {
					...carouselArrowBorderRadius,
					device: {
						...carouselArrowBorderRadius.device,
						[deviceType]: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						},
					},
				},
			},
		};

		const newData = {
			postSliderTwoLayout: newValue,
			...layoutDefault?.[newValue],
			blockLayoutName: newValue,
		};
		setAttributes(newData);
	};

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Post Slider Layout", "post-carousel")}
					attributes={postSliderTwoLayout}
					attributesKey={"postSliderTwoLayout"}
					setAttributes={setAttributes}
					displayActive={true}
					showDemoTitle={true}
					onChange={layoutChange}
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
				attributes={postSliderTwoHeight}
				attributesKey={"postSliderTwoHeight"}
				setAttributes={setAttributes}
				max={900}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 620 }}
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
				attributes={postSliderGeneralPreloader}
				attributesKey={"postSliderGeneralPreloader"}
				setAttributes={setAttributes}
			/>
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

export const PostSliderTwoSliderTab = ({ attributes, setAttributes }) => {
	const {
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselSpeed,
		carouselDirection,
		postSliderTwoSlideToScroll,
		carouselPauseOnHover,
		postSliderTwoAnimationEffect,
		postSliderTwoAdaptiveHeight,
		infiniteLoop,
		postSliderTwoTabKeyNavigation,
		postSliderTwoMouseWheelControl,
		postSliderTwoFreeScrollMode,
		// postSliderTwoNavArrow,
		// postSliderTwoPaginationDot,
		carouselNavArrow,
		carouselPaginationDot,
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
					min={0}
					max={6000}
					units={["ms"]}
					defaultValue={{ unit: "ms", value: 2000 }}
				/>
			)}
			<SPRangeControl
				label={__("Slider Speed", "post-carousel")}
				attributes={carouselSpeed}
				attributesKey={"carouselSpeed"}
				setAttributes={setAttributes}
				min={0}
				max={3000}
				units={["ms"]}
				defaultValue={{ unit: "ms", value: 600 }}
			/>
			<SPToggleGroupControl
				label={__("Slider Direction", "post-carousel")}
				attributes={carouselDirection}
				attributesKey={"carouselDirection"}
				setAttributes={setAttributes}
				items={[
					{
						label: __("Right To Left", "post-carousel"),
						value: "right_to_left",
					},
					{
						label: __("Left To Right", "post-carousel"),
						value: "left_to_right",
					},
				]}
			/>
			<InputControl
				label={__("Slide to Scroll", "post-carousel")}
				attributes={postSliderTwoSlideToScroll}
				attributesKey={"postSliderTwoSlideToScroll"}
				setAttributes={setAttributes}
				type="number"
				min={1}
				max={10}
				flex={true}
			/>
			<Toggle
				label={__("Pause on Hover", "post-carousel")}
				attributes={carouselPauseOnHover}
				attributesKey={"carouselPauseOnHover"}
				setAttributes={setAttributes}
			/>
			<SelectField
				label={__("Animation Effect", "post-carousel")}
				attributes={postSliderTwoAnimationEffect}
				attributesKey={"postSliderTwoAnimationEffect"}
				setAttributes={setAttributes}
				items={[
					{ label: "Slide", value: "slide" },
					{ label: "Cube", value: "cube" },
					{ label: "Flip", value: "flip" },
					{ label: "Coverflow", value: "coverflow", disabled: "disabled" },
					{ label: "Fade (Pro)", value: "fade", disabled: "disabled" },
				]}
				flexStyle={true}
			/>
			<Toggle
				label={__("Adaptive Height", "post-carousel")}
				attributes={postSliderTwoAdaptiveHeight}
				attributesKey={"postSliderTwoAdaptiveHeight"}
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
				attributes={postSliderTwoTabKeyNavigation}
				attributesKey={"postSliderTwoTabKeyNavigation"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("MouseWheel Control", "post-carousel")}
				attributes={postSliderTwoMouseWheelControl}
				attributesKey={"postSliderTwoMouseWheelControl"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Free Scroll Mode", "post-carousel")}
				attributes={postSliderTwoFreeScrollMode}
				attributesKey={"postSliderTwoFreeScrollMode"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Navigation Arrow", "post-carousel")}
				attributes={carouselNavArrow}
				attributesKey={"carouselNavArrow"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Pagination Dots", "post-carousel")}
				attributes={carouselPaginationDot}
				attributesKey={"carouselPaginationDot"}
				setAttributes={setAttributes}
			/>
		</>
	);
};

export const PostSliderTwoGeneralTab = ({ attributes, setAttributes }) => {
	const { generalLinkOpen, postSliderGeneralPreloader, contentAlignment } = attributes;

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
				attributes={postSliderGeneralPreloader}
				attributesKey={"postSliderGeneralPreloader"}
				setAttributes={setAttributes}
			/>
		</>
	);
};
