/* eslint-disable import/no-unresolved */
import { useEffect, useRef, useState } from "@wordpress/element";
import { Swiper, SwiperSlide } from "swiper/react";
import { breakpoint, buildFontClasses, inArray, paginationDotType, useDeviceType } from "../../controls/controls";
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
} from "swiper/modules";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { SwiperNavButton, SwiperPagination } from "../shared/templates/templates-parts/templates-parts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/effect-flip";
import "swiper/css/thumbs";
import classNames from "classnames";
import ThumbsTemplate from "../shared/templates/templateCards/thumbsTemplate";

const Render = ({ attributes, posts, pageType = "frontend" }) => {
	const {
		dynamicClassNames,
		carouselPauseOnHover,
		carouselArrowStyle,
		// postThumbnailNavigationArrow,
		carouselPaginationStyle,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselDirection,
		carouselSpeed,
		postThumbnailAnimationEffect,
		postThumbnailTabKeyNavigation,
		postThumbnailMouseWheelControl,
		postThumbnailAdaptiveHeight,
		postThumbnailFreeScrollMode,
		postThumbnailHeight,
		// postThumbnailPaginationDot,
		thumbnailSliderLayout,
		postThumbnailSlideToScroll,
		contentVerticalPosition,
		postThumbnailGap,
		postThumbnailItemsPerSlide,
		postThumbnailPosition,
		currentScreen,
		postThumbnailLoop,
		navArrowVisibilityOnHover,
		catTabCategoryPosition,
		uniqueId,
		carouselNavArrow,
		carouselPaginationDot,
	} = attributes;

	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const swiperDotsRef = useRef(null);
	const swiperNevNextRef = useRef(null);
	const swiperNevPrevRef = useRef(null);
	const containerRef = useRef(null);

	const deviceType = useDeviceType();

	const thumbnailsSlidePerGroups = postThumbnailSlideToScroll?.device?.[deviceType];

	const paginationDotStyle = paginationDotType(swiperDotsRef, carouselPaginationStyle, uniqueId);

	const bgPosition = "center";
	const backgroundSize = "cover";

	const { Desktop: desktopGap } = postThumbnailGap.device;

	// const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = postThumbnailSlideToScroll.device;
	const cardHeightClass = classNames(buildFontClasses("height", postThumbnailHeight));

	const thumbnailItemsPerSlide = postThumbnailItemsPerSlide.device[breakpoint()];
	const thumbnailsContentItem = ["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"].includes(
		thumbnailSliderLayout
	)
		? ["image", "taxonomy", "title"]
		: ["image"];
	const [selectedPostId, setSelectedPostId] = useState(null);

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
		<div
			className={`sp-smart-post-block-wrapper sp-smart-post-thumbnail-slider sp-smart-md-10px ${thumbnailSliderLayout} sp-thumbnail-${postThumbnailPosition} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			<div className={"sp-smart-post-thumbnail-slide"}>
				{posts?.length > 0 && (
					<Swiper
						slidesPerView={1}
						thumbs={{ swiper: thumbsSwiper }}
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
						// Pagination apply if not scrollbar.
						pagination={paginationDotStyle}
						scrollbar={carouselPaginationStyle === "scrollbar" ? { draggable: true } : false}
						loop={
							postThumbnailLoop && thumbnailSliderLayout !== "thumbnail-slider-layout-five"
								? true
								: false && posts.length > 1
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
						]}
						className={`sp-smart-post-background-layout sp-swiper-${postThumbnailAnimationEffect} sp-smart-post-swiper ${thumbnailSliderLayout}`}
						effect={postThumbnailAnimationEffect}
						cubeEffect={
							postThumbnailAnimationEffect === "cube"
								? {
										shadow: true,
										slideShadows: true,
										shadowOffset: 20,
										shadowScale: 0.94,
									}
								: false
						}
						coverflowEffect={
							postThumbnailAnimationEffect === "coverflow"
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
							postThumbnailTabKeyNavigation
								? {
										enabled: true,
										onlyInViewport: true,
									}
								: false
						}
						mousewheel={postThumbnailMouseWheelControl}
						autoHeight={postThumbnailAdaptiveHeight ? true : false}
						freeMode={postThumbnailFreeScrollMode || false}
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
						{carouselNavArrow &&
							inArray(
								[
									"thumbnail-slider-layout-one",
									"thumbnail-slider-layout-four",
									"thumbnail-slider-layout-six",
								],
								thumbnailSliderLayout
							) && (
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
					</Swiper>
				)}
				{carouselNavArrow &&
					inArray(
						[
							"thumbnail-slider-layout-two",
							"thumbnail-slider-layout-three",
							"thumbnail-slider-layout-five",
						],
						thumbnailSliderLayout
					) && (
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
			<div className={"sp-smart-post-thumbnail-thumb"}>
				{posts?.length > 0 && (
					<Swiper
						onSwiper={setThumbsSwiper}
						loop={
							postThumbnailLoop &&
							thumbnailSliderLayout !== "thumbnail-slider-layout-five" &&
							posts.length > 1
						}
						spaceBetween={postThumbnailGap?.device?.[currentScreen] || desktopGap}
						slidesPerView={thumbnailItemsPerSlide}
						grid={
							thumbnailSliderLayout === "thumbnail-slider-layout-five" ? { rows: 2, fill: "row" } : false
						}
						freeMode={true}
						watchSlidesProgress={true}
						touchStartPreventDefault={false}
						modules={[FreeMode, Navigation, Pagination, Thumbs, Grid]}
						className={`sp-smart-post-swiper2 ${
							!["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"].includes(
								thumbnailSliderLayout
							)
								? "sp-smart-post-background-layout"
								: ""
						}`}
						direction={
							deviceType === "Desktop" && ["left", "right"].includes(postThumbnailPosition)
								? "vertical"
								: "horizontal"
						}
						slideToClickedSlide={true}
					>
						{posts?.map((post, index) => {
							return (
								<SwiperSlide key={index} className={`sp-slide-item-thumb`}>
									<ThumbsTemplate
										key={post?.post_id}
										data={post}
										posts={posts}
										layout={thumbnailSliderLayout}
										attributes={attributes}
										thumbIndex={""}
										contentArray={thumbnailsContentItem}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}
			</div>
			{carouselPaginationDot && carouselPaginationStyle !== "scrollbar" && (
				<SwiperPagination swiperDotsRef={swiperDotsRef} bulletStyle={carouselPaginationStyle} />
			)}
		</div>
	);
};

export default Render;
