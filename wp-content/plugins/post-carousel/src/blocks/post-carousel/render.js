import { useEffect, useRef, useState, Fragment } from "@wordpress/element";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Pagination,
	Grid,
	Autoplay,
	Scrollbar,
	Keyboard,
	Mousewheel,
	EffectFade,
	EffectCoverflow,
	EffectFlip,
	EffectCube,
	FreeMode,
} from "swiper/modules";
import Marquee from "react-fast-marquee";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { arrayChunk, toggleEqualHeight } from "../shared/helpFn";
import { SwiperNavButton, SwiperPagination } from "../shared/templates/templates-parts/templates-parts";
import { breakpoint, inArray, paginationDotType } from "../../controls/controls";

const Render = ({ attributes, posts, swiperKey = "", pageType = "frontend" }) => {
	const {
		uniqueId,
		carouselArrowStyle,
		carouselPaginationStyle,
		carouselStyle,
		carouselColumn,
		carouselHeight,
		carouselGap,
		carouselAutoPlay,
		carouselSpeed,
		carouselAutoPlayDelay,
		carouselDirection,
		slideToScroll,
		carouselPauseOnHover,
		carouselAnimationEffect,
		carouselTabKeyNav,
		carouselMouseWheelControl,
		carouselNavArrow,
		carouselPaginationDot,
		carouselAdaptiveHeight,
		carouselFreeScrollMode,
		equalHeightEnable,
		contentVerticalPosition,
		infiniteLoop,
		imagePosition,
		carouselTickerSpeed,
		contentOrientation,
		navArrowVisibilityOnHover,
		catTabCategoryPosition,
		showPartialView,
	} = attributes;
	const swiperDotsRef = useRef(null);
	const swiperNavNextRef = useRef(null);
	const swiperNavPrevRef = useRef(null);
	const spTickerRef = useRef(null);
	const [tickerWidth, setTickerWidth] = useState(spTickerRef && spTickerRef.current?.clientWidth);

	const deviceType = breakpoint();

	const paginationDotStyle = paginationDotType(swiperDotsRef, carouselPaginationStyle);

	let AllPosts = posts;
	if (inArray(["fade", "cube", "flip"], carouselAnimationEffect)) {
		const columnWithDevice = carouselColumn?.device?.[deviceType] ? carouselColumn?.device?.[deviceType] : 1;
		AllPosts = arrayChunk(posts, columnWithDevice);
	}

	const cardHeightClass = "";

	useEffect(() => {
		setTimeout(() => {
			toggleEqualHeight(uniqueId, equalHeightEnable);
		}, 200);
	}, [equalHeightEnable, uniqueId, AllPosts, carouselStyle, contentOrientation]);

	const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = slideToScroll.device;

	const contentHeight =
		carouselHeight.device?.[deviceType] !== ""
			? carouselHeight.device?.[deviceType] + carouselHeight.unit?.[deviceType]
			: "auto";

	const [selectedPostId, setSelectedPostId] = useState(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (spTickerRef.current && !spTickerRef.current.contains(event.target)) {
				setSelectedPostId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (!spTickerRef.current) {
			return;
		}

		const element = spTickerRef.current;
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newWidth = entry.contentRect.width;
				setTickerWidth(newWidth / carouselColumn.device?.[deviceType] - 20);
			}
		});

		resizeObserver.observe(element);

		return () => resizeObserver.disconnect();
	}, [deviceType, carouselColumn]);
	const templateOneAndTwo = (post) => {
		return (
			<TemplateOne
				key={post?.post_id}
				data={post}
				posts={posts}
				attributes={attributes}
				contentPosition={contentVerticalPosition}
				contentHeight={contentHeight}
				HeightClass={cardHeightClass}
				isSelected={selectedPostId === post?.post_id}
				onSelect={() => setSelectedPostId(post?.post_id)}
				tickerWidth={tickerWidth}
			/>
		);
	};

	const loopContent = (slideType, allPosts) => {
		return allPosts?.map((post, i) => (
			<SwiperSlide key={i} className={`sp-slide-item`}>
				{"fade" === slideType ? post?.map((data, j) => templateOneAndTwo(data, j)) : templateOneAndTwo(post, i)}
			</SwiperSlide>
		));
	};
	return (
		<div
			className={`sp-smart-post-carousel sp-smart-post-block-wrapper sp-smart-post-carousel-${carouselStyle} ${contentOrientation} img-position-${imagePosition} sp-cat-position-${catTabCategoryPosition} ${
				"background" === imagePosition ? "sp-smart-post-background-layout" : ""
			}`}
		>
			<div className="sp-smart-post-swiper sp-relative" ref={spTickerRef}>
				{"ticker" !== carouselStyle && AllPosts?.length > 0 && (
					<>
						<Fragment key={swiperKey}>
							<Swiper
								slidesPerView={carouselColumn.device?.[deviceType] + (showPartialView ? 0.3 : 0)}
								centeredSlides={showPartialView || "center" === carouselStyle}
								simulateTouch={"editor" === pageType ? false : true}
								grid={carouselStyle === "multi_row" ? { rows: 2, fill: "row" } : false}
								navigation={{
									nextEl: swiperNavNextRef.current,
									prevEl: swiperNavPrevRef.current,
									enabled: true,
								}}
								grabCursor={false}
								// Pagination apply if not scrollbar.
								pagination={paginationDotStyle}
								scrollbar={carouselPaginationStyle === "scrollbar" ? { draggable: true } : false}
								loop={
									!infiniteLoop ||
									carouselStyle === "multi_row" ||
									carouselPaginationStyle === "scrollbar" ||
									desktopScroll > 1 ||
									tabletScroll > 1 ||
									mobileScroll > 1
										? false
										: true
								}
								// Slide per group
								slidesPerGroup={slideToScroll.device?.[deviceType] || 1}
								// centeredSlides={
								// 	'center' === carouselStyle ? true : false
								// }
								autoplay={
									carouselAutoPlay && {
										delay: carouselAutoPlayDelay?.value,
										disableOnInteraction: false,
										pauseOnMouseEnter: carouselPauseOnHover,
										reverseDirection: carouselDirection === "left_to_right" ? true : false,
									}
								}
								speed={carouselSpeed?.value}
								spaceBetween={
									carouselAnimationEffect === "cube"
										? 0
										: carouselGap.device?.[deviceType] || carouselGap.device?.Desktop
								}
								modules={[
									Navigation,
									Pagination,
									Scrollbar,
									Grid,
									Autoplay,
									Keyboard,
									Mousewheel,
									EffectFade,
									EffectCoverflow,
									EffectFlip,
									EffectCube,
									FreeMode,
								]} // Include Autoplay in modules
								className={`swiper-${carouselAnimationEffect} sp-smart-post-swiper-slider sp-swiper-slide pagination-${carouselPaginationStyle} layout-${carouselStyle}`}
								effect={carouselAnimationEffect}
								cubeEffect={
									carouselAnimationEffect === "cube"
										? {
												shadow: true,
												slideShadows: true,
												shadowOffset: 20,
												shadowScale: 0.94,
											}
										: false
								}
								coverflowEffect={
									carouselAnimationEffect === "coverflow"
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
									carouselTabKeyNav
										? {
												enabled: true,
												onlyInViewport: true,
											}
										: false
								}
								mousewheel={carouselMouseWheelControl}
								autoHeight={carouselAdaptiveHeight ? true : false}
								freeMode={carouselFreeScrollMode || false}
								direction="horizontal"
								// breakpoints={
								// 	! inArray(
								// 		[ 'fade', 'cube', 'flip' ],
								// 		carouselAnimationEffect
								// 	)
								// 		? {
								// 				0: {
								// 					slidesPerView:
								// 						carouselColumn?.device
								// 							?.Mobile,
								// 					slidesPerGroup:
								// 						mobileScroll > 1
								// 							? parseInt(
								// 									mobileScroll
								// 							  )
								// 							: parseInt(
								// 									desktopScroll
								// 							  ),
								// 					spaceBetween: mobileGap
								// 						? mobileGap.toString()
								// 						: desktopGap,
								// 				},
								// 				600: {
								// 					slidesPerView:
								// 						carouselColumn?.device
								// 							?.Tablet,
								// 					slidesPerGroup:
								// 						tabletScroll > 1
								// 							? parseInt(
								// 									tabletScroll
								// 							  )
								// 							: parseInt(
								// 									desktopScroll
								// 							  ),
								// 					spaceBetween: tabletGap
								// 						? tabletGap.toString()
								// 						: desktopGap,
								// 				},
								// 				1024: {
								// 					slidesPerView:
								// 						carouselColumn?.device
								// 							?.Desktop,
								// 					slidesPerGroup:
								// 						parseInt(
								// 							desktopScroll
								// 						) || 1,
								// 					spaceBetween:
								// 						desktopGap.toString() ||
								// 						20,
								// 				},
								// 		  }
								// 		: false
								// }
							>
								{inArray(["fade", "cube", "flip"], carouselAnimationEffect) &&
									loopContent("fade", AllPosts)}
								{!inArray(["fade", "cube", "flip"], carouselAnimationEffect) &&
									loopContent("slide", posts)}
							</Swiper>
						</Fragment>
						{carouselNavArrow && (
							<SwiperNavButton
								style={carouselArrowStyle}
								navArrow={carouselNavArrow}
								props={{
									navArrowVisibilityOnHover,
								}}
								swiperNavNextRef={swiperNavNextRef}
								swiperNavPrevRef={swiperNavPrevRef}
							/>
						)}

						{carouselPaginationDot && carouselPaginationStyle !== "scrollbar" && (
							<SwiperPagination
								uniqueId={uniqueId}
								bulletStyle={carouselPaginationStyle}
								swiperDotsRef={swiperDotsRef}
							/>
						)}
					</>
				)}
				{"ticker" === carouselStyle && (
					<Marquee
						pauseOnHover={carouselPauseOnHover}
						direction={"left_to_right" === carouselDirection ? "right" : "left"}
						className="sp-smart-post-ticker"
						gradientWidth={300}
						speed={(1000 * 250) / carouselTickerSpeed.value}
					>
						{posts?.map((data, i) => templateOneAndTwo(data, i))}
					</Marquee>
				)}
			</div>
		</div>
	);
};

export default Render;
