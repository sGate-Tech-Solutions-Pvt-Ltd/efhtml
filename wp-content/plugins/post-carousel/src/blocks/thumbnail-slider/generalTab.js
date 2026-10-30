import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, InputControl } from "../../components";
import useLayouts from "../../hooks/useLayouts";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { inArray, useDeviceType } from "../../controls/controls";
import { useEffect, useState } from "@wordpress/element";
import ProInfo from "../../components/proInfo/proInfo";

export const PostThumbnailCarouselTab = ({ attributes, setAttributes }) => {
	const {
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselSpeed,
		carouselDirection,
		postThumbnailSlideToScroll,
		carouselPauseOnHover,
		postThumbnailAnimationEffect,
		postThumbnailTabKeyNavigation,
		postThumbnailMouseWheelControl,
		postThumbnailFreeScrollMode,
		// postThumbnailNavigationArrow,
		// postThumbnailPaginationDot,
		postThumbnailLoop,
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
				<>
					<SPRangeControl
						label={__("AutoPlay Delay", "post-carousel")}
						attributes={carouselAutoPlayDelay}
						attributesKey={"carouselAutoPlayDelay"}
						setAttributes={setAttributes}
						min={0}
						max={9000}
						units={["ms"]}
						defaultValue={{ unit: "ms", value: 2000 }}
						step={50}
					/>
				</>
			)}
			<SPRangeControl
				label={__("Slider Speed", "post-carousel")}
				attributes={carouselSpeed}
				attributesKey={"carouselSpeed"}
				setAttributes={setAttributes}
				min={0}
				max={9000}
				units={["ms"]}
				defaultValue={{ unit: "ms", value: 600 }}
				step={50}
			/>
			{carouselAutoPlay && (
				<>
					<SPToggleGroupControl
						label={__("Slider Direction", "post-carousel")}
						attributes={carouselDirection}
						attributesKey={"carouselDirection"}
						setAttributes={setAttributes}
						items={[
							{ label: "Right To Left", value: "right_to_left" },
							{ label: "Left To Right", value: "left_to_right" },
						]}
					/>
				</>
			)}
			<InputControl
				label={__("Slide to Scroll", "post-carousel")}
				attributes={postThumbnailSlideToScroll}
				attributesKey={"postThumbnailSlideToScroll"}
				setAttributes={setAttributes}
				flex={true}
				min={1}
			/>
			{carouselAutoPlay && (
				<Toggle
					label={__("Pause on Hover", "post-carousel")}
					attributes={carouselPauseOnHover}
					attributesKey={"carouselPauseOnHover"}
					setAttributes={setAttributes}
				/>
			)}
			<SelectField
				label={__("Animation Effects", "post-carousel")}
				attributes={postThumbnailAnimationEffect}
				attributesKey={"postThumbnailAnimationEffect"}
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
				label={__("Infinite Loop", "post-carousel")}
				attributes={postThumbnailLoop}
				attributesKey={"postThumbnailLoop"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Tab and Key Navigation", "post-carousel")}
				attributes={postThumbnailTabKeyNavigation}
				attributesKey={"postThumbnailTabKeyNavigation"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("MouseWheelControl", "post-carousel")}
				attributes={postThumbnailMouseWheelControl}
				attributesKey={"postThumbnailMouseWheelControl"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Free Scroll Mode", "post-carousel")}
				attributes={postThumbnailFreeScrollMode}
				attributesKey={"postThumbnailFreeScrollMode"}
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

// export const ThumbnailsGeneralTab = ( { attributes, setAttributes } ) => {
// 	attributes = jsonParse( attributes );
// 	const { contentAlignment, generalLinkOpen, preloaderEnable } = attributes;

// 	return (
// 		<>
// 			<SPToggleGroupControl
// 				label={ __( 'Content Alignment', 'post-carousel' ) }
// 				attributes={ contentAlignment }
// 				attributesKey={ 'contentAlignment' }
// 				setAttributes={ setAttributes }
// 				items={ [
// 					{ label: <AlignLeft />, value: 'left' },
// 					{ label: <AlignCenter />, value: 'center' },
// 					{ label: <AlignRight />, value: 'right' },
// 				] }
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
// 				attributes={ preloaderEnable ) }
// 				attributesKey={ 'preloaderEnable' }
// 				setAttributes={ setAttributes }
// 			/>
// 		</>
// 	);
// };

export const PostThumbnailsLayoutTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		thumbnailSliderLayout,
		postThumbnailPosition,
		postThumbnailHeight,
		postThumbnailVerticalGap,
		postThumbnailGap,
		postThumbnailItemsPerSlide,
		thumbnailItemsHeight,
		carouselPaginationVertical,
		advancedPadding,
		contentHorizontalPosition,
		contentAlignment,
		generalLinkOpen,
		preloaderEnable,
		postLimit,
	} = attributes;

	const layouts = useLayouts(blockName, thumbnailSliderLayout);
	const deviceType = useDeviceType();
	const [postThumbnailPositionsItem, setPostThumbnailPositionsItem] = useState([
		{ label: "Top", value: "top", disabled: "disabled" },
		{ label: "Left", value: "left", disabled: "disabled" },
		{ label: "Bottom", value: "bottom" },
		{ label: "Right", value: "right", disabled: "disabled" },
	]);

	const paginationPosition = (postThumbnailPosition, thumbnailSliderLayout) => {
		return "bottom" === postThumbnailPosition
			? inArray(
					["thumbnail-slider-layout-five", "thumbnail-slider-layout-three", "thumbnail-slider-layout-two"],
					thumbnailSliderLayout
				)
				? -30
				: ""
			: 30;
	};

	const advancedPaddingValue = (postThumbnailPosition, thumbnailSliderLayout) => {
		return "bottom" === postThumbnailPosition &&
			inArray(
				["thumbnail-slider-layout-five", "thumbnail-slider-layout-three", "thumbnail-slider-layout-two"],
				thumbnailSliderLayout
			)
			? 40
			: 0;
	};

	const layoutChange = (newValue) => {
		if (newValue === thumbnailSliderLayout) return;

		const carouselDefaultValueSet = {
			carouselPaginationVertical: {
				...carouselPaginationVertical,
				device: {
					...carouselPaginationVertical.device,
					["Desktop"]: paginationPosition(postThumbnailPosition, newValue),
				},
			},
			advancedPadding: {
				...advancedPadding,
				device: {
					...advancedPadding.device,
					Desktop: {
						...advancedPadding.device.Desktop,
						bottom: advancedPaddingValue(postThumbnailPosition, newValue),
					},
					Mobile: {
						...advancedPadding.device.Desktop,
						bottom: 0,
					},
				},
			},
			contentHorizontalPosition:
				"thumbnail-slider-layout-six" === newValue && contentHorizontalPosition === "center"
					? "left"
					: contentHorizontalPosition,
		};
		if (newValue === "thumbnail-slider-layout-five") {
			carouselDefaultValueSet.thumbnailItemsHeight = {
				...thumbnailItemsHeight,
				device: {
					...thumbnailItemsHeight.device,
					Desktop: 110,
				},
			};
		} else {
			carouselDefaultValueSet.thumbnailItemsHeight = {
				...thumbnailItemsHeight,
				device: {
					...thumbnailItemsHeight.device,
					Desktop: 140,
				},
			};
		}
		if (["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"].includes(newValue)) {
			carouselDefaultValueSet.postThumbnailItemsPerSlide = {
				...postThumbnailItemsPerSlide,
				device: {
					...postThumbnailItemsPerSlide.device,
					Desktop: 3,
				},
			};
		} else {
			carouselDefaultValueSet.postThumbnailItemsPerSlide = {
				...postThumbnailItemsPerSlide,
				device: {
					...postThumbnailItemsPerSlide.device,
					Desktop: 5,
				},
			};
		}

		const newData = {
			thumbnailSliderLayout: newValue,
			...carouselDefaultValueSet,
		};

		setAttributes(newData);
	};

	const positionChange = (newValue) => {
		const carouselDefaultValueSet = {
			carouselPaginationVertical: {
				...carouselPaginationVertical,
				device: {
					...carouselPaginationVertical.device,
					["Desktop"]: paginationPosition(newValue, thumbnailSliderLayout),
				},
			},
			advancedPadding: {
				...advancedPadding,
				device: {
					...advancedPadding.device,
					Desktop: {
						...advancedPadding.device.Desktop,
						bottom: advancedPaddingValue(newValue, thumbnailSliderLayout),
					},
					Mobile: {
						...advancedPadding.device.Desktop,
						bottom: 0,
					},
				},
			},
		};

		const newData = {
			postThumbnailPosition: newValue,
			...carouselDefaultValueSet,
		};

		setAttributes(newData);
	};

	useEffect(() => {
		if (deviceType !== "Desktop") {
			setPostThumbnailPositionsItem([
				{ label: "Top", value: "top", disabled: "disabled" },
				{ label: "Bottom", value: "bottom" },
			]);
		} else {
			setPostThumbnailPositionsItem([
				{ label: "Top", value: "top", disabled: "disabled" },
				{ label: "Left", value: "left", disabled: "disabled" },
				{ label: "Bottom", value: "bottom" },
				{ label: "Right", value: "right", disabled: "disabled" },
			]);
		}
	}, [deviceType]);

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Thumbnails Slider Layout", "post-carousel")}
					attributes={thumbnailSliderLayout}
					attributesKey={"thumbnailSliderLayout"}
					setAttributes={setAttributes}
					onChange={layoutChange}
					displayActive={true}
					showDemoTitle={true}
					grid={3}
					items={layouts}
				/>
			)}
			{/* <Toggle
				label={ __( 'Smart Frontend Filter', 'post-carousel' ) }
				attributes={ liveFilterEnable ) }
				setAttributes={ setAttributes }
				attributesKey={ 'liveFilterEnable' }
			/> */}
			<SPToggleGroupControl
				label={__("Thumbnails Position", "post-carousel")}
				attributes={postThumbnailPosition}
				attributesKey={"postThumbnailPosition"}
				setAttributes={setAttributes}
				onClick={positionChange}
				items={postThumbnailPositionsItem}
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
				attributes={postThumbnailHeight}
				attributesKey={"postThumbnailHeight"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 580 }}
				max={1200}
				pro={true}
			/>
			{!["thumbnail-slider-layout-two", "thumbnail-slider-layout-three", "thumbnail-slider-layout-five"].includes(
				thumbnailSliderLayout
			) && (
				<SPRangeControl
					label={__("Vertical Gap", "post-carousel")}
					attributes={postThumbnailVerticalGap}
					attributesKey={"postThumbnailVerticalGap"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{ unit: "px", value: 20 }}
				/>
			)}
			{["top", "bottom"].includes(postThumbnailPosition) && (
				<SPRangeControl
					label={__("Thumbnails Height", "post-carousel")}
					attributes={thumbnailItemsHeight}
					attributesKey={"thumbnailItemsHeight"}
					setAttributes={setAttributes}
					units={["px", "em"]}
					defaultValue={{ unit: "px", value: 140 }}
					pro={true}
				/>
			)}
			<SPRangeControl
				label={__("Thumbnails Gap", "post-carousel")}
				attributes={postThumbnailGap}
				attributesKey={"postThumbnailGap"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 10 }}
			/>
			<SPRangeControl
				label={__("Thumbnail Items Per Slide", "post-carousel")}
				attributes={postThumbnailItemsPerSlide}
				attributesKey={"postThumbnailItemsPerSlide"}
				setAttributes={setAttributes}
				max={10}
				min={1}
				resetIcon={false}
				pro={true}
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
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};
