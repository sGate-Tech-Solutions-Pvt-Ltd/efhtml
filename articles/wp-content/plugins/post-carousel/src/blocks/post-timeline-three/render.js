import { toggleEqualHeight } from "../shared/helpFn";
import TemplateOne from "../shared/templates/templateCards/templateOne";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { SwiperNavButton } from "../shared/templates/templates-parts/templates-parts";
import { Fragment, useEffect, useRef, useState } from "@wordpress/element";
import Marquee from "react-fast-marquee";
import { breakpoint } from "../../controls/controls";

const Render = ({ attributes, posts, page = "frontend" }) => {
	const {
		uniqueId,
		timelineLayout,
		imagePosition,
		equalHeightEnable,
		// postTimelineNavArrow,
		carouselArrowStyle,
		dynamicClassNames,
		postTimelineAutoPlay,
		postTimelineAutoPlayDelay,
		carouselPauseOnHover,
		carouselDirection,
		carouselStyle,
		contentVerticalPosition,
		carouselColumn,
		carouselGap,
		carouselSpeed,
		postTimelineTickerSpeed,
		navArrowVisibilityOnHover,
		catTabCategoryPosition,
		contentOrientation,
		carouselNavArrow,
		align,
		imageFeaturedImg,
		catTabCategoryEnable,
		titleShow,
		excerptShow,
		showReadMoreButton,
		socialShareEnableSocial,
		metaDataArray,
	} = attributes;

	const swiperNevNextRef = useRef(null);
	const swiperNevPrevRef = useRef(null);
	const spTickerRef = useRef(null);
	const [getLargeItemHeight, setGetLargeItemHeight] = useState(0);
	const [swiperKeys, setSwiperKeys] = useState(null);
	const deviceType = breakpoint();
	const [tickerWidth, setTickerWidth] = useState(spTickerRef && spTickerRef.current?.clientWidth);
	// Equalizing the post cards height.
	useEffect(() => {
		setTimeout(() => {
			toggleEqualHeight(uniqueId, equalHeightEnable);

			let timelineThreeCardElement = spTickerRef?.current
				? spTickerRef?.current?.querySelectorAll(".sp-smart-post-card")
				: [];
			timelineThreeCardElement = Array.from(timelineThreeCardElement);
			let largeItemHeight = 0;
			timelineThreeCardElement.forEach((element) => {
				if (element && element.clientHeight > largeItemHeight) {
					largeItemHeight = element.clientHeight;
				}
			});
			if (largeItemHeight) {
				setGetLargeItemHeight(largeItemHeight + 60);
			}
		}, 50);
	}, [
		equalHeightEnable,
		uniqueId,
		posts,
		align,
		imageFeaturedImg,
		catTabCategoryEnable,
		titleShow,
		excerptShow,
		showReadMoreButton,
		socialShareEnableSocial,
		metaDataArray,
	]);

	useEffect(() => {
		setSwiperKeys(Math.random(Math.random * 10));
	}, [postTimelineAutoPlay]);
	const equalHeightClass = equalHeightEnable ? "sp-equal-height-wrapper" : "";
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
		// Template Card Width for Ticker layout on conditional device type.
		const timeOut = setTimeout(() => {
			let newData = spTickerRef && spTickerRef.current?.clientWidth;
			setTickerWidth(newData);
			newData = newData && newData / carouselColumn.device?.[deviceType] - 20;

			setTickerWidth(newData);
		}, 0);
		return () => clearTimeout(timeOut);
	}, [deviceType, carouselColumn]);

	return (
		<div
			className={`post-timeline-three ${timelineLayout} sp-cat-position-${catTabCategoryPosition} ${contentOrientation}`}
		>
			<style>
				{`
					#${uniqueId} .timeline-three-layout-two .swiper-wrapper,
					#${uniqueId} .timeline-three-layout-two .sp-smart-post-timeline-three-container .sp-smart-post-timeline-border {
						margin-top: ${posts?.length > 1 ? `${getLargeItemHeight}px` : 0} ;
					}
					#${uniqueId} .timeline-three-layout-two .sp-smart-post-timeline-three-post-container:nth-child(odd) {
						margin-top: -5px;
					}#${uniqueId} .timeline-three-layout-two .sp-smart-post-timeline-three-post-container:nth-child(even) {
						top: calc(-100% - 38px);
					}`}
			</style>
			<div
				className={`sp-smart-post-timeline-three-container ${timelineLayout} sp-smart-post-swiper ${equalHeightClass}`}
				ref={spTickerRef}
			>
				<div className="sp-smart-post-timeline-border"></div>
				{(carouselStyle === "standard" || timelineLayout === "timeline-three-layout-two") &&
				posts?.length > 0 ? (
					<Fragment key={swiperKeys}>
						<Swiper
							pagination={false}
							simulateTouch={"editor" === page ? false : true}
							slidesPerView={
								posts?.length > carouselColumn.device?.[deviceType]
									? carouselColumn.device?.[deviceType] || 3
									: posts?.length
							}
							spaceBetween={carouselGap.device?.[deviceType] || carouselGap.device?.Desktop}
							speed={carouselSpeed.value}
							navigation={{
								nextEl: swiperNevNextRef.current,
								prevEl: swiperNevPrevRef.current,
								enabled: true,
							}}
							autoplay={
								postTimelineAutoPlay && {
									delay: postTimelineAutoPlayDelay?.value,
									disableOnInteraction: false,
									pauseOnMouseEnter: carouselPauseOnHover,
									reverseDirection: carouselDirection === "left_to_right" ? true : false,
								}
							}
							touchStartPreventDefault={false}
							modules={[Navigation, Autoplay]}
						>
							{posts?.map((post) => {
								return (
									<SwiperSlide
										key={post?.post_id}
										className="sp-smart-post-timeline-three-post-container"
									>
										{/* { imagePosition === 'background' ? (
											<TemplateTwo
												key={ post?.post_id }
												data={ post }
												posts={ posts }
												attributes={ JSON.stringify(
													attributes
												) }
											/>
										) : ( */}
										<TemplateOne
											key={post?.post_id}
											data={post}
											attributes={attributes}
											posts={posts}
											isSelected={selectedPostId === post?.post_id}
											onSelect={() => setSelectedPostId(post?.post_id)}
										/>
										{/* ) } */}
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Fragment>
				) : (
					<Marquee
						pauseOnHover={carouselPauseOnHover}
						direction={"left_to_right" === carouselDirection ? "right" : "left"}
						speed={(1000 * 250) / postTimelineTickerSpeed.value}
					>
						{posts?.map((data, i) => (
							<div key={data?.post_id || i} className="sp-smart-post-timeline-three-post-container">
								{/* { imagePosition === 'background' ? (
									<TemplateTwo
										data={ data }
										posts={ posts }
										attributes={ JSON.stringify(
											attributes
										) }
									/>
								) : ( */}
								<TemplateOne
									posts={posts}
									data={data}
									attributes={attributes}
									contentPosition={contentVerticalPosition}
									isSelected={selectedPostId === data?.post_id}
									onSelect={() => setSelectedPostId(data?.post_id)}
									tickerWidth={tickerWidth}
								/>
								{/* ) } */}
							</div>
						))}
					</Marquee>
				)}
			</div>
			{carouselNavArrow && (carouselStyle === "standard" || timelineLayout === "timeline-three-layout-two") && (
				<SwiperNavButton
					style={carouselArrowStyle}
					navArrow={carouselNavArrow}
					props={{
						dynamicClassNames,
						navArrowVisibilityOnHover,
					}}
					swiperNavNextRef={swiperNevNextRef}
					swiperNavPrevRef={swiperNevPrevRef}
				/>
			)}
		</div>
	);
};

export default Render;
