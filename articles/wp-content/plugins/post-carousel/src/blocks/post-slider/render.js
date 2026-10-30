import { Fragment, useEffect, useState } from "@wordpress/element";
import { buildFontClasses, paginationDotType, useDeviceType } from "../../controls/controls";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Autoplay,
	EffectCoverflow,
	EffectCube,
	EffectFade,
	EffectFlip,
	FreeMode,
	Keyboard,
	Mousewheel,
	Navigation,
	Pagination,
	Scrollbar,
} from "swiper/modules";
import { SwiperNavButton, SwiperPagination } from "../shared/templates/templates-parts/templates-parts";
import { useRef } from "@wordpress/element";
import classNames from "classnames";
import TemplateOne from "../shared/templates/templateCards/templateOne";

const Render = ({ attributes, posts, swiperKey = "", pageType = "frontend" }) => {
	const {
		// dynamicClassNames,
		postSliderHoverPause,
		carouselArrowStyle,
		// postSliderNavArrow,
		carouselPaginationStyle,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselDirection,
		carouselSpeed,
		postSliderAnimationEffect,
		postSliderTabKeyNav,
		postSliderMouseWheel,
		postSliderFreeScroll,
		postSliderHeight,
		// postSliderPaginationDots,
		postSliderLayout,
		postSliderSlideScroll,
		contentVerticalPosition,
		contentHorizontalPosition,
		infiniteLoop,
		imageHeight,
		navArrowVisibilityOnHover,
		catTabCategoryPosition,
		carouselNavArrow,
		carouselPaginationDot,
	} = attributes;

	const deviceType = useDeviceType();
	const swiperNevNextRef = useRef(null);
	const swiperNevPrevRef = useRef(null);
	const swiperDotsRef = useRef(null);
	const containerRef = useRef(null);

	const postSliderSlidePerGroups = postSliderSlideScroll?.device?.[deviceType];

	const paginationDotStyle = paginationDotType(swiperDotsRef, carouselPaginationStyle);

	const bgPosition = !["post-slider-layout-four", "post-slider-layout-five"].includes(postSliderLayout)
		? "center"
		: "";
	const backgroundSize = ["post-slider-layout-four", "post-slider-layout-five"].includes(postSliderLayout)
		? `100% ${
				imageHeight.device?.[deviceType]
					? imageHeight.device?.[deviceType] + imageHeight.unit?.[deviceType]
					: "100%"
			}`
		: "cover";

	let contentAreaPositionClassName = "";
	if (
		[
			"post-slider-layout-one",
			"post-slider-layout-two",
			// 'post-slider-layout-three',
			"post-slider-layout-four",
		].includes(postSliderLayout)
	) {
		contentAreaPositionClassName = " v-" + contentVerticalPosition;
	}
	// Content Area Horizontal Position ClassName
	if (["post-slider-layout-four", "post-slider-layout-five"].includes(postSliderLayout)) {
		contentAreaPositionClassName = contentAreaPositionClassName + " h-" + contentHorizontalPosition;
	}
	const cardHeightClass = classNames(buildFontClasses("height", postSliderHeight));
	const contentLeftRight =
		"post-slider-layout-five" === postSliderLayout ? ` content-${contentHorizontalPosition}` : "";
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
			className={`sp-smart-post-block-wrapper sp-smart-post-slider  sp-smart-md-10px ${postSliderLayout} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			{posts?.length > 0 && (
				<Fragment key={swiperKey}>
					<Swiper
						slidesPerView={1}
						simulateTouch={"editor" === pageType ? false : true}
						spaceBetween={0}
						navigation={{
							nextEl: swiperNevNextRef.current,
							prevEl: swiperNevPrevRef.current,
						}}
						// Pagination apply if not scrollbar.
						pagination={paginationDotStyle}
						scrollbar={carouselPaginationStyle === "scrollbar" ? { draggable: true } : false}
						loop={!infiniteLoop || "scrollbar" === carouselPaginationStyle ? false : true}
						slidesPerGroup={Math.min(postSliderSlidePerGroups, 10)}
						autoplay={
							carouselAutoPlay && {
								delay: carouselAutoPlayDelay?.value,
								disableOnInteraction: false,
								reverseDirection: carouselDirection === "left_to_right" ? true : false,
								pauseOnMouseEnter: postSliderHoverPause,
							}
						}
						speed={carouselSpeed?.value}
						touchStartPreventDefault={false}
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
						]}
						className={`sp-swiper-${postSliderAnimationEffect} sp-smart-post-swiper ${postSliderLayout} sp-smart-post-background-layout${contentLeftRight}`}
						effect={postSliderAnimationEffect}
						cubeEffect={
							postSliderAnimationEffect === "cube"
								? {
										shadow: true,
										slideShadows: true,
										shadowOffset: 20,
										shadowScale: 0.94,
									}
								: false
						}
						coverflowEffect={
							postSliderAnimationEffect === "coverflow"
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
							postSliderTabKeyNav
								? {
										enabled: true,
										onlyInViewport: true,
									}
								: false
						}
						mousewheel={postSliderMouseWheel}
						freeMode={postSliderFreeScroll || false}
						direction={postSliderLayout === "post-slider-layout-two" ? "vertical" : "horizontal"}
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
										horizontalAlign={postSliderLayout === "post-slider-layout-four" ? true : false}
										contentPosition={contentVerticalPosition}
										contentHeight={`${
											postSliderHeight?.device?.[deviceType] +
											postSliderHeight?.unit?.[deviceType]
										}`}
										layoutName={postSliderLayout}
										HeightClass={cardHeightClass}
										isSelected={selectedPostId === post?.post_id}
										onSelect={() => setSelectedPostId(post?.post_id)}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Fragment>
			)}
			{carouselNavArrow && (
				<SwiperNavButton
					style={carouselArrowStyle}
					swiperNavNextRef={swiperNevNextRef}
					swiperNavPrevRef={swiperNevPrevRef}
					navArrow={carouselNavArrow}
					props={{
						// dynamicClassNames,
						navArrowVisibilityOnHover,
					}}
				/>
			)}
			{carouselPaginationDot && carouselPaginationStyle !== "scrollbar" && (
				<SwiperPagination
					swiperDotsRef={swiperDotsRef}
					bulletStyle={carouselPaginationStyle}
					vertical={postSliderLayout === "post-slider-layout-two"}
				/>
			)}
		</div>
	);
};

export default Render;
