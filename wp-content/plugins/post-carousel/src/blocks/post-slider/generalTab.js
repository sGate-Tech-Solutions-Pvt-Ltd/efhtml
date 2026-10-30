import { __ } from "@wordpress/i18n";
import { Toggle, Layouts, SPRangeControl, SelectField, InputControl } from "../../components";
import useLayouts from "../../hooks/useLayouts";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import ProInfo from "../../components/proInfo/proInfo";

export const PostSliderLayoutTab = ({ attributes, setAttributes }) => {
	const {
		postSliderLayout,
		blockName,
		postSliderHeight,
		carouselPaginationVertical,
		liveFilterEnable,
		generalLinkOpen,
		postSliderGeneralPreloader,
		contentAlignment,
		postLimit,
		carouselArrowSpaceBetween,
		carouselArrowHorizontal,
	} = attributes;

	const layouts = useLayouts(blockName, postSliderLayout);

	const layoutChange = (newValue) => {
		if (newValue === postSliderLayout) return;

		const layoutDefault = {
			"post-slider-layout-one": {
				contentVerticalPosition: "center",
				// contentHorizontalPosition: 'center',
				contentAlignment: "center",
				imageOverlayType: "full",
				carouselNavArrow: true,
				carouselPaginationDot: true,
				carouselPaginationVertical: {
					...carouselPaginationVertical,
					device: {
						...carouselPaginationVertical.device,
						Desktop: "",
						Tablet: "",
						Mobile: "",
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 100,
						Tablet: 100,
						Mobile: 100,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: 30,
						Tablet: 30,
						Mobile: 30,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
			},
			"post-slider-layout-two": {
				contentVerticalPosition: "center",
				// contentHorizontalPosition: 'left',
				contentAlignment: "left",
				imageOverlayType: "full",
				carouselNavArrow: false,
				carouselPaginationDot: true,
				carouselPaginationVertical: {
					...carouselPaginationVertical,
					device: {
						...carouselPaginationVertical.device,
						Desktop: "210",
						Tablet: "",
						Mobile: "",
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 100,
						Tablet: 100,
						Mobile: 100,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: 30,
						Tablet: 30,
						Mobile: 30,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
			},
			"post-slider-layout-five": {
				contentVerticalPosition: "center",
				// contentHorizontalPosition: 'center',
				contentAlignment: "left",
				imageOverlayType: "full",
				carouselNavArrow: true,
				carouselPaginationDot: true,
				carouselPaginationVertical: {
					...carouselPaginationVertical,
					device: {
						...carouselPaginationVertical.device,
						Desktop: "",
						Tablet: "",
						Mobile: "",
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 20,
						Tablet: 20,
						Mobile: 20,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: 70,
						Tablet: 70,
						Mobile: 70,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
			},
		};

		const newData = {
			postSliderLayout: newValue,
			...layoutDefault[newValue],
			blockLayoutName: newValue,
		};
		setAttributes(newData);
	};

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Post Slider Layout", "post-carousel")}
					attributes={postSliderLayout}
					attributesKey={"postSliderLayout"}
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
				attributes={postSliderHeight}
				attributesKey={"postSliderHeight"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 680 }}
				max={1200}
				pro={true}
			/>
			{/** General Tab Options */}
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

export const PostSliderCarouselTab = ({ attributes, setAttributes }) => {
	const {
		postSliderLayout,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselSpeed,
		carouselDirection,
		postSliderSlideScroll,
		postSliderHoverPause,
		postSliderAnimationEffect,
		postSliderTabKeyNav,
		postSliderMouseWheel,
		postSliderFreeScroll,
		// postSliderNavArrow,
		carouselNavArrow,
		// postSliderPaginationDots,
		carouselPaginationDot,
		infiniteLoop,
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
						// units={ [ 'ms' ] }
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
				// units={ [ 'ms' ] }
				defaultValue={{ unit: "ms", value: 1000 }}
				step={50}
			/>
			{"post-slider-layout-two" !== postSliderLayout && (
				<SPToggleGroupControl
					label={__("Slider Direction", "post-carousel")}
					attributes={carouselDirection}
					attributesKey={"carouselDirection"}
					setAttributes={setAttributes}
					items={[
						{
							label: "Right to Left",
							value: "right_to_left",
						},
						{
							label: "Left to Right",
							value: "left_to_right",
						},
					]}
				/>
			)}
			{"post-slider-layout-two" === postSliderLayout && (
				<SPToggleGroupControl
					label={__("Slider Direction", "post-carousel")}
					attributes={carouselDirection}
					attributesKey={"carouselDirection"}
					setAttributes={setAttributes}
					items={[
						{
							label: "Bottom to Top",
							value: "right_to_left",
						},
						{
							label: "Top to Bottom",
							value: "left_to_right",
						},
					]}
				/>
			)}
			<InputControl
				label={__("Slide to Scroll", "post-carousel")}
				attributes={postSliderSlideScroll}
				attributesKey={"postSliderSlideScroll"}
				setAttributes={setAttributes}
				flex={true}
				min={1}
			/>
			{carouselAutoPlay && (
				<Toggle
					label={__("Pause on Hover", "post-carousel")}
					attributes={postSliderHoverPause}
					attributesKey={"postSliderHoverPause"}
					setAttributes={setAttributes}
				/>
			)}
			<SelectField
				label={__("Animation Effects", "post-carousel")}
				attributes={postSliderAnimationEffect}
				attributesKey={"postSliderAnimationEffect"}
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
				label={__("Infinite loop", "post-carousel")}
				attributes={infiniteLoop}
				attributesKey={"infiniteLoop"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Tab and Key Navigation", "post-carousel")}
				attributes={postSliderTabKeyNav}
				attributesKey={"postSliderTabKeyNav"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("MouseWheelControl", "post-carousel")}
				attributes={postSliderMouseWheel}
				attributesKey={"postSliderMouseWheel"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Free Scroll Mode", "post-carousel")}
				attributes={postSliderFreeScroll}
				attributesKey={"postSliderFreeScroll"}
				setAttributes={setAttributes}
			/>
			{/* { 'post-slider-layout-two' !== postSliderLayout && ( */}
			<Toggle
				label={__("Navigation Arrow", "post-carousel")}
				attributes={carouselNavArrow}
				attributesKey={"carouselNavArrow"}
				setAttributes={setAttributes}
			/>
			{/* ) } */}
			<Toggle
				label={__("Pagination Dots", "post-carousel")}
				attributes={carouselPaginationDot}
				attributesKey={"carouselPaginationDot"}
				setAttributes={setAttributes}
			/>
		</>
	);
};

// export const PostSliderGeneralTab = ( { attributes, setAttributes } ) => {
// 	attributes = jsonParse( attributes );
// 	const { generalLinkOpen, postSliderGeneralPreloader, contentAlignment } =
// 		attributes;

// 	return (
// 		<>
// 			{ /* <SPToggleGroupControl
// 				label={ __( 'Content Alignment', 'post-carousel' ) }
// 				attributes={ contentAlignment }
// 				attributesKey={ 'contentAlignment' }
// 				setAttributes={ setAttributes }
// 				items={ [
// 					{ label: <AlignLeft />, value: 'left' },
// 					{ label: <AlignCenter />, value: 'center' },
// 					{ label: <AlignRight />, value: 'right' },
// 				] }
// 			/> */ }
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
// 				attributes={ postSliderGeneralPreloader ) }
// 				attributesKey={ 'postSliderGeneralPreloader' }
// 				setAttributes={ setAttributes }
// 			/>
// 		</>
// 	);
// };
