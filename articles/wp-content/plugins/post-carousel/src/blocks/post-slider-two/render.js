import { Fragment, useEffect, useState, useRef } from "@wordpress/element";
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
import classNames from "classnames";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { priceLink, ProTopBar } from "../shared/helpFn";
import { blockPreviewPanelLink } from "../../controls/constants";

const Render = ({ attributes, posts, swiperKey = "", pageType = "frontend" }) => {
	const {
		postSliderTwoLayout,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselPaginationStyle,
		infiniteLoop,
		postSliderTwoSlideToScroll,
		carouselDirection,
		carouselPauseOnHover,
		carouselSpeed,
		postSliderTwoAnimationEffect,
		postSliderTwoMouseWheelControl,
		postSliderTwoFreeScrollMode,
		postSliderTwoTabKeyNavigation,
		// postSliderTwoNavArrow,
		postSliderTwoHeight,
		carouselArrowStyle,
		// postSliderTwoPaginationDot,
		dynamicClassNames,
		navArrowVisibilityOnHover,
		catTabCategoryPosition,
		contentHorizontalPosition,
		contentVerticalPosition,
		carouselNavArrow,
		carouselPaginationDot,
		blockName
	} = attributes;

	const deviceType = useDeviceType();
	const swiperNevNextRef = useRef(null);
	const swiperNevPrevRef = useRef(null);
	const swiperDotsRef = useRef(null);
	const containerRef = useRef(null);

	const paginationDotStyle = paginationDotType(swiperDotsRef, carouselPaginationStyle);
	const postSliderSlidePerGroups = postSliderTwoSlideToScroll?.device?.[deviceType];
	const cardHeightClass = classNames(buildFontClasses("height", postSliderTwoHeight));
	const contentPosition = `sp-h-${contentHorizontalPosition} sp-v-${contentVerticalPosition}`;
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
		<>
		<ProTopBar
			blockName={blockName}
			title="Post Slider 02"
		/>
		<div
			className={`sp-smart-post-block-wrapper sp-smart-post-slider-two  sp-smart-md-10px sp-cat-position-${catTabCategoryPosition} ${contentPosition}`}
			ref={containerRef}
		>
			{posts?.length > 0 && (
				<Fragment key={swiperKey}>
					<Swiper
						slidesPerView={1}
						simulateTouch={"editor" === pageType ? false : true}
						spaceBetween={postSliderTwoAnimationEffect === "cube" ? 0 : 10}
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
								pauseOnMouseEnter: carouselPauseOnHover,
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
						className={`sp-swiper-${postSliderTwoAnimationEffect} sp-smart-post-swiper ${postSliderTwoLayout} sp-smart-post-background-layout`}
						effect={postSliderTwoAnimationEffect}
						cubeEffect={
							postSliderTwoAnimationEffect === "cube"
								? {
										shadow: true,
										slideShadows: true,
										shadowOffset: 20,
										shadowScale: 0.94,
									}
								: false
						}
						coverflowEffect={
							postSliderTwoAnimationEffect === "coverflow"
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
							postSliderTwoTabKeyNavigation
								? {
										enabled: true,
										onlyInViewport: true,
									}
								: false
						}
						mousewheel={postSliderTwoMouseWheelControl}
						freeMode={postSliderTwoFreeScrollMode || false}
						direction={"horizontal"}
					>
						{posts?.map((post, i) => {
							return (
								<SwiperSlide key={i} className="sp-slide-item">
									<TemplateOne
										key={post.post_id}
										posts={posts}
										data={post}
										attributes={attributes}
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
						dynamicClassNames: dynamicClassNames,
						navArrowVisibilityOnHover: navArrowVisibilityOnHover,
					}}
				/>
			)}
			{carouselPaginationDot && carouselPaginationStyle !== "scrollbar" && (
				<SwiperPagination swiperDotsRef={swiperDotsRef} bulletStyle={carouselPaginationStyle} />
			)}
		</div>
		</>
	);
};

export default Render;
