import { useRef } from "@wordpress/element";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, FreeMode } from "swiper/modules";
import Marquee from "react-fast-marquee";
import Template from "./template";
import TemplateOne from "./templateOne";

import { arrayChunk } from "../shared/helpFn";
import { NewsIcon, NewsIcon2, NewsIcon3, NewsIcon4, NewsIcon5 } from "../../icons/icons";
import { breakpoint, inArray } from "../../controls/controls";
// eslint-disable-next-line no-duplicate-imports
import { Fragment } from "@wordpress/element";
import { SlideButton } from "./SlideButton";
import NewsTickerTypewriter from "./cutomTypewriter";
import classNames from "classnames";

const Render = ({ attributes, posts, swiperKey = "", renderKey = null, pageType = "frontend" }) => {
	const {
		// uniqueId,
		carouselPaginationStyle,
		displayStyle,
		tickerTitleGap,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselDirection,
		carouselPauseOnHover,
		carouselAnimationEffect,
		carouselTickerSpeed,
		HeadingLabel,
		tickerIconColor,
		tickerIconSource,
		tickerIconEnabled,
		tickerSeparatorEnable,
		tickerListStyle,
		tickerListStyleColor,
		tickerDate,
		tickerDateType,
		metaDateFormat,
		tickerImg,
		tickerImagePosition,
		carouselNavArrow,
		carouselArrowStyle,
		dynamicClassNames,
		navArrowVisibilityOnHover,
		tickerNavigation,
		tickerPause,
		tickerDivider,
		tickerTitleListStyleEnble,
		HeadingPosition,
		headingStyle,
		titleLength,
		newsTickerCarouselArrowColor,
		tickerImgShape,
		newsTickerItemToDisplay,
		headingGlobalTypography,
		tickerTitleGlobalTypography,
	} = attributes;
	// const swiperDotsRef = useRef(null);
	const spTickerRef = useRef(null);

	const swiperNevNextRef = useRef(null);
	const swiperNevPrevRef = useRef(null);

	const deviceType = breakpoint();

	// const paginationDotStyle = paginationDotType(swiperDotsRef, carouselPaginationStyle);
	let AllPosts = posts;
	if (inArray(["fade"], carouselAnimationEffect)) {
		const columnWithDevice = newsTickerItemToDisplay.device?.[deviceType];
		AllPosts = arrayChunk(posts, columnWithDevice);
	}

	if (inArray(["fade"], carouselAnimationEffect)) {
		const columnWithDevice = newsTickerItemToDisplay.device?.[deviceType];
		AllPosts = arrayChunk(posts, columnWithDevice);
	}
	const itemToDisplay = newsTickerItemToDisplay.device?.[deviceType];
	const templateOneAndTwo = (post) => {
		return <TemplateOne key={post?.post_id} data={post} attributes={attributes} />;
	};

	const Icon = ({ iconSource }) => {
		switch (iconSource) {
			case "newsIcon":
				return <NewsIcon fillColor={tickerIconColor} />;
			case "newsIcon2":
				return <NewsIcon2 fillColor={tickerIconColor} />;
			case "newsIcon3":
				return <NewsIcon3 fillColor={tickerIconColor} />;
			case "newsIcon4":
				return <NewsIcon4 fillColor={tickerIconColor} />;
			case "newsIcon5":
				return <NewsIcon5 fillColor={tickerIconColor} />;
			default:
				return null;
		}
	};
	const Heading = () => {
		return (
			<div className={`ticker-heading sp-ticker-heading-${headingStyle}-${HeadingPosition}`}>
				<span className="ticker-heading-content">
					{tickerIconEnabled && <Icon iconSource={tickerIconSource} />}

					{deviceType !== "Mobile" && (
						<span
							className={classNames(
								"ticker-heading-label",
								headingGlobalTypography?.class ? headingGlobalTypography?.class : ""
							)}
						>
							{HeadingLabel}
						</span>
					)}
				</span>
			</div>
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
		<div className={`sp-smart-post-news-ticker sp-smart-post-block-wrapper sp-smart-post-carousel-${displayStyle}`}>
			<div className="sp-smart-post-swiper sp-relative" ref={spTickerRef}>
				{"slide" === displayStyle && AllPosts?.length > 0 && (
					<>
						<Fragment key={renderKey ? renderKey : swiperKey}>
							<Heading />
							<Swiper
								slidesPerView={itemToDisplay}
								simulateTouch={false}
								navigation={{
									nextEl: swiperNevNextRef.current,
									prevEl: swiperNevPrevRef.current,
								}}
								grabCursor={false}
								loop={true}
								autoplay={
									carouselAutoPlay && {
										delay: carouselAutoPlayDelay?.value,
										disableOnInteraction: false,
										pauseOnMouseEnter: carouselPauseOnHover,
										reverseDirection: ["left_to_right", "top_to_bottom"].includes(carouselDirection)
											? true
											: false,
									}
								}
								speed={carouselTickerSpeed?.value}
								spaceBetween={
									carouselAnimationEffect === "cube" ? 0 : tickerTitleGap.device?.[deviceType] || 24
								}
								modules={[Navigation, Autoplay, EffectFade, FreeMode]} // Include Autoplay in modules
								className={`slider-class swiper-${carouselAnimationEffect} sp-swiper-slide pagination-${carouselPaginationStyle} layout-${displayStyle}`}
								effect={carouselAnimationEffect}
								direction={
									["top_to_bottom", "bottom_to_top"].includes(carouselDirection)
										? "vertical"
										: "horizontal"
								}
							>
								{inArray(["fade"], carouselAnimationEffect) && loopContent("fade", AllPosts)}
								{!inArray(["fade"], carouselAnimationEffect) && loopContent("slide", posts)}
							</Swiper>
						</Fragment>

						{tickerNavigation && deviceType !== "Mobile" && (
							<SlideButton
								style={carouselArrowStyle}
								tickerPause={tickerPause}
								swiperNavNextRef={swiperNevNextRef}
								swiperNavPrevRef={swiperNevPrevRef}
								navArrow={carouselNavArrow}
								tickerDivider={tickerDivider}
								HeadingPosition={HeadingPosition}
								props={{
									dynamicClassNames,

									navArrowVisibilityOnHover,
								}}
								newsTickerCarouselArrowColor={newsTickerCarouselArrowColor}
								// displayStyle={ displayStyle }
								// carouselAnimationEffect={ carouselAnimationEffect }
							/>
						)}
					</>
				)}

				{"typewriter" === displayStyle && (
					<>
						<Heading />
						{/* <img src={ postsThumbs?.[1] } /> */}
						<div className="sp-smart-post-card-content">
							<div
								className={classNames(
									"sp-smart-post-ticker-title",
									tickerTitleGlobalTypography?.class ? tickerTitleGlobalTypography?.class : ""
								)}
							>
								<NewsTickerTypewriter
									posts={posts}
									limit={titleLength}
									className={"sp-smart-post-ticker-title-img-wrapper sp-d-flex sp-img-left"}
									showImage={tickerImg}
								/>
							</div>
						</div>
					</>
				)}

				{"ticker" === displayStyle && (
					<>
						<Heading />

						<Marquee
							pauseOnHover={carouselPauseOnHover}
							direction={carouselDirection === "left_to_right" ? "right" : "left"}
							className={`sp-smart-post-ticker${
								tickerSeparatorEnable ? " sp-smart-ticker-separator" : ""
							}`}
							gradientWidth={300}
							speed={(1000 * 250) / carouselTickerSpeed.value}
						>
							{posts?.map((post, index) => (
								<span
									key={post?.post_id}
									style={{
										display: "inline-flex",
										alignItems: "center",
									}}
									className="sp-ticker-item"
								>
									<Template
										data={post}
										tickerListStyle={tickerListStyle}
										tickerListStyleColor={tickerListStyleColor}
										tickerDate={tickerDate}
										tickerDateType={tickerDateType}
										metaDateFormat={metaDateFormat}
										tickerImg={tickerImg}
										tickerImagePosition={tickerImagePosition}
										tickerTitleListStyleEnble={tickerTitleListStyleEnble}
										titleLength={titleLength}
										tickerImgShape={tickerImgShape}
										tickerTitleGlobalTypography={tickerTitleGlobalTypography}
									/>
									{tickerSeparatorEnable && (
										// index !== posts?.length - 1 &&
										<span className="ticker-separator">|</span>
									)}
								</span>
							))}
						</Marquee>
					</>
				)}
			</div>
		</div>
	);
};

export default Render;
