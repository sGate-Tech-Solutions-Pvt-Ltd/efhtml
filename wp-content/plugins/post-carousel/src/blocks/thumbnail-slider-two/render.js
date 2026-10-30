/* eslint-disable import/no-unresolved */
import { useEffect, useRef, useState } from "@wordpress/element";
import { Swiper, SwiperSlide } from "swiper/react";
import { buildFontClasses, useDeviceType } from "../../controls/controls";
import {
	Autoplay,
	EffectCoverflow,
	EffectCube,
	EffectFade,
	EffectFlip,
	FreeMode,
	Grid,
	Keyboard,
	Mousewheel,
	Navigation,
	Pagination,
	Scrollbar,
	Thumbs,
	Controller,
} from "swiper/modules";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { SwiperNavButton } from "../shared/templates/templates-parts/templates-parts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/effect-flip";
import "swiper/css/thumbs";
import "swiper/css/controller";
import classNames from "classnames";
import ThumbsTemplate from "../shared/templates/templateCards/thumbsTemplate";
import { ProTopBar } from "../shared/helpFn";

const Render = ({ posts, attributes, pageType = "frontend" }) => {
	const {
		dynamicClassNames,
		carouselPauseOnHover,
		carouselArrowStyle,
		// thumbnailTwoNavArrow,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselDirection,
		carouselSpeed,
		thumbnailTwoSlideToScroll,
		thumbnailTwoAnimationEffect,
		thumbnailTwoTabKeyNavigation,
		thumbnailTwoMouseWheelControl,
		thumbnailTwoAdaptiveHeight,
		thumbnailTwoFreeScrollMode,
		thumbnailSliderTwoLayout,
		contentVerticalPosition,
		thumbnailTwoPosition,
		currentScreen,
		infiniteLoop,
		navArrowVisibilityOnHover,
		thumbnailItemsToShow,
		thumbnailSliderTwoHeight,
		thumbnailTwoItemsHeight,
		thumbnailProgressPosition,
		blockLayoutName,
		thumbnailTwoAlignment,
		catTabCategoryPosition,
		carouselNavArrow,
		blockName,
	} = attributes;

	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [mainSwiper, setMainSwiper] = useState(null);
	const isInitialize = useRef(false);
	const swiperNevNextRef = useRef(null);
	const swiperNevPrevRef = useRef(null);
	const containerRef = useRef(null);
	const [selectedPostId, setSelectedPostId] = useState(null);

	const deviceType = useDeviceType();
	const thumbnailsSlidePerGroups = thumbnailTwoSlideToScroll?.device?.[deviceType];

	const bgPosition = "center";
	const backgroundSize = "cover";

	// const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = thumbnailTwoSlideToScroll.device;

	const cardHeightClass = classNames(buildFontClasses("height", thumbnailSliderTwoHeight));
	// const thumbsHeight = ["thumbnail-slider-two-layout-four", "thumbnail-slider-two-layout-five"].includes(
	// 	blockLayoutName
	// )
	// 	? "auto"
	// 	: thumbnailTwoItemsHeight.device[currentScreen] + thumbnailTwoItemsHeight.unit[currentScreen];

	const thumbnailItemsPerSlide = thumbnailItemsToShow.device?.[deviceType];
	const thumbPosts = [...posts, ...posts.slice(0, thumbnailItemsPerSlide)];

	const thumbsGap = (layout) => {
		const thumbsConfig = {
			"thumbnail-slider-two-layout-one": 0,
			"thumbnail-slider-two-layout-two": 48,
			"thumbnail-slider-two-layout-three": 20,
			"thumbnail-slider-two-layout-four": 12,
			"thumbnail-slider-two-layout-five": 24,
		};
		return thumbsConfig[layout];
	};

	const handleMainSlideChange = (swiper) => {
		if (thumbnailSliderTwoLayout !== "thumbnail-slider-two-layout-three") {
			return;
		}
		if (!thumbsSwiper || thumbsSwiper.destroyed) {
			return;
		}
		const realIndex = swiper.realIndex;
		let thumbIndex;

		// if ( realIndex > posts?.length - (thumbnailItemsPerSlide + 1) ) {
		if (realIndex > posts?.length - 1) {
			thumbIndex = 1;
		} else {
			thumbIndex = realIndex + 1;
		}

		if (thumbsSwiper.activeIndex !== thumbIndex) {
			thumbsSwiper.slideTo(thumbIndex);
		}
	};

	const thumbnailsContentItem = ["thumbnail-slider-two-layout-one", "thumbnail-slider-two-layout-two"].includes(
		thumbnailSliderTwoLayout
	)
		? ["title"]
		: ["image", "taxonomy", "title"];

	useEffect(() => {
		if (thumbnailSliderTwoLayout === "thumbnail-slider-two-layout-three") {
			if (thumbsSwiper && !isInitialize.current) {
				thumbsSwiper.slideTo(1, 0);
				isInitialize.current = true;
			}
		}
	}, [thumbsSwiper, thumbnailSliderTwoLayout, deviceType]);

	useEffect(() => {
		if (thumbnailSliderTwoLayout === "thumbnail-slider-two-layout-three") {
			if (mainSwiper?.controller && thumbsSwiper) {
				mainSwiper.controller.control = thumbsSwiper;
			}
		}
	}, [mainSwiper?.controller, thumbsSwiper, thumbnailSliderTwoLayout, deviceType]);

	useEffect(() => {
		if (mainSwiper && !mainSwiper.destroyed) {
			handleMainSlideChange(mainSwiper);
		}
	}, [mainSwiper]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setSelectedPostId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
		<ProTopBar 
			blockName={blockName}
			title="Thumbnails Slider 02"
		/>
		<div
			className={`sp-smart-post-block-wrapper sp-smart-post-thumbnail-slider-two sp-smart-thumbnail-slider-two sp-smart-md-10px ${thumbnailSliderTwoLayout} sp-thumbnail-${thumbnailTwoPosition} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			<div className={"sp-smart-post-thumbnail-slide-two"}>
				{posts?.length > 0 && (
					<Swiper
						slidesPerView={1}
						thumbs={{ swiper: thumbsSwiper }}
						onSwiper={setMainSwiper}
						onSlideChange={handleMainSlideChange}
						simulateTouch={"editor" === pageType ? false : true}
						style={{
							"--swiper-navigation-color": "#fff",
							"--swiper-pagination-color": "#fff",
						}}
						initialSlide={0}
						navigation={{
							nextEl: swiperNevNextRef.current,
							prevEl: swiperNevPrevRef.current,
						}}
						loop={
							infiniteLoop
							// &&
							// thumbnailSliderTwoLayout !==
							// 	'thumbnail-slider-layout-five'
							// 	? true
							// 	: false
						}
						slidesPerGroup={Math.min(thumbnailsSlidePerGroups, 10)}
						autoplay={
							carouselAutoPlay
								? {
										delay: carouselAutoPlayDelay?.value,
										disableOnInteraction: false,
										pauseOnMouseEnter: carouselPauseOnHover,
										reverseDirection: carouselDirection === "left_to_right" ? true : false,
									}
								: false
						}
						speed={carouselSpeed?.value}
						// touchStartPreventDefault={ false }
						modules={[
							Navigation,
							Pagination,
							Scrollbar,
							Autoplay,
							Keyboard,
							Mousewheel,
							EffectFade,
							EffectCoverflow,
							EffectFlip,
							EffectCube,
							FreeMode,
							Thumbs,
							Controller,
						]}
						className={`sp-swiper-${thumbnailTwoAnimationEffect} sp-smart-post-swiper ${thumbnailSliderTwoLayout} sp-smart-post-background-layout`}
						effect={thumbnailTwoAnimationEffect}
						cubeEffect={
							thumbnailTwoAnimationEffect === "cube"
								? {
										shadow: true,
										slideShadows: true,
										shadowOffset: 20,
										shadowScale: 0.94,
									}
								: false
						}
						coverflowEffect={
							thumbnailTwoAnimationEffect === "coverflow"
								? {
										rotate: 50,
										stretch: 0,
										depth: 100,
										modifier: 1,
										slideShadows: true,
									}
								: false
						}
						keyboard={
							thumbnailTwoTabKeyNavigation
								? {
										enabled: true,
										onlyInViewport: true,
									}
								: false
						}
						mousewheel={thumbnailTwoMouseWheelControl}
						autoHeight={thumbnailTwoAdaptiveHeight ? true : false}
						freeMode={thumbnailTwoFreeScrollMode || false}
					>
						{posts?.map((post, i) => {
							return (
								<SwiperSlide key={i} className={`sp-slide-item`}>
									<TemplateOne
										key={post?.post_id}
										data={post}
										posts={posts}
										attributes={attributes}
										bgPosition={bgPosition}
										backgroundSize={backgroundSize}
										contentPosition={contentVerticalPosition}
										HeightClass={cardHeightClass}
										isSelected={selectedPostId === post?.post_id}
										onSelect={() => setSelectedPostId(post?.post_id)}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}
				{carouselNavArrow && (
					<SwiperNavButton
						style={carouselArrowStyle}
						navArrow={carouselNavArrow}
						swiperNavNextRef={swiperNevNextRef}
						swiperNavPrevRef={swiperNevPrevRef}
						props={{
							dynamicClassNames,
							navArrowVisibilityOnHover,
						}}
					/>
				)}
			</div>
			<div
				className={`sp-smart-post-thumbnail-two-thumb ${
					!["thumbnail-slider-two-layout-one", "thumbnail-slider-two-layout-five"].includes(
						thumbnailSliderTwoLayout
					)
						? "thumbnails-" + thumbnailTwoPosition
						: ""
				}${
					thumbnailSliderTwoLayout === "thumbnail-slider-two-layout-two"
						? " progress-bar-" + thumbnailProgressPosition
						: ""
				}${
					thumbnailSliderTwoLayout === "thumbnail-slider-two-layout-one"
						? "thumbs-align-" + thumbnailTwoAlignment
						: ""
				}`}
			>
				<Swiper
					onSwiper={setThumbsSwiper}
					loop={!!infiniteLoop && thumbPosts?.length > 1}
					// loop={ false }
					spaceBetween={thumbsGap(thumbnailSliderTwoLayout)}
					slidesPerView={thumbnailItemsPerSlide}
					freeMode={true}
					watchSlidesProgress={true}
					touchStartPreventDefault={false}
					modules={[FreeMode, Navigation, Pagination, Thumbs, Grid, Controller]}
					className="sp-smart-post-swiper2 sp-smart-post-background-layout"
					direction={
						!["thumbnail-slider-two-layout-one", "thumbnail-slider-two-layout-three"].includes(
							thumbnailSliderTwoLayout
						) && ["left", "right"].includes(thumbnailTwoPosition)
							? "vertical"
							: "horizontal"
					}
					slideToClickedSlide={true}
				>
					{/* Thumbnails Thumbs */}
					{thumbPosts?.map((post, index) => {
						return (
							<SwiperSlide key={index} className={`sp-slide-item-thumb`}>
								<ThumbsTemplate
									key={post?.post_id}
									data={post}
									posts={posts}
									layout={thumbnailSliderTwoLayout}
									attributes={attributes}
									thumbIndex={
										thumbnailSliderTwoLayout === "thumbnail-slider-two-layout-one" ? index : ""
									}
									contentArray={thumbnailsContentItem}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
		</>
	);
};

export default Render;
