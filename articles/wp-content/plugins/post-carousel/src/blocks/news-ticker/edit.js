import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useRef, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyTitleIcon, panelBodyRightIcon } from "../../icons/icons";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { inArray, useDeviceType } from "../../controls/controls";
import { EditorWrapper } from "../shared/wrapper";
import Render from "./render";
import { TogglePanelBodyProvider } from "../../context";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const NewsTickerEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		carouselPaginationStyle,
		carouselStyle,
		carouselColumn,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		slideToScroll,
		carouselPauseOnHover,
		carouselAnimationEffect,
		carouselTabKeyNav,
		carouselMouseWheelControl,
		carouselNavArrow,
		carouselPaginationDot,
		carouselAdaptiveHeight,
		imageOverlayType,
		equalHeightEnable,
		infiniteLoop,
		fontListsEditPage,
		customCss,
		tickerTitleGap,
		carouselDirection,
		carouselTickerSpeed,
		newsTickerItemToDisplay,
		uniqueId,
		additionalCssClass,
	} = attributes;

	const deviceType = useDeviceType();

	const blockProps = useBlockProps({
		className: additionalCssClass.replace(/\s+/g, " ").trim(),
	});

	useEffect(() => {
		setAttributes({
			carouselData: JSON.stringify(swiperOptions),
		});
	}, [
		newsTickerItemToDisplay,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselPauseOnHover,
		carouselAnimationEffect,
		tickerTitleGap,
		carouselDirection,
		carouselTickerSpeed,
		uniqueId,
	]);

	const [carouselAutoPlaySpeed, setCarouselAutoPlaySpeed] = useState({
		value: 2000,
		unit: "ms",
	});

	const [swiperRand, setSwiperRand] = useState(1);
	const firstLoad = useRef(true);

	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

	useEffect(() => {
		if (carouselAutoPlayDelay.unit === "s") {
			setCarouselAutoPlaySpeed(carouselAutoPlayDelay.value * 1000);
		} else {
			setCarouselAutoPlaySpeed(carouselAutoPlayDelay);
		}
	}, [carouselAutoPlayDelay]);

	const blockStyling = useMemo(() => dynamicCssFn(attributes, "frontend", deviceType), [attributes, deviceType]);
	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false;
		} else {
			if (inArray(["ticker", "multi_row"], carouselStyle)) {
				setAttributes({
					carouselAdaptiveHeight: false,
				});
			}
		}
	}, [blockName, carouselPaginationStyle, carouselStyle]);

	useEffect(() => {
		setSwiperRand(Math.floor(Math.random() * 10));
	}, [
		carouselPaginationStyle,
		carouselAnimationEffect,
		carouselTabKeyNav,
		carouselNavArrow,
		carouselPaginationDot,
		carouselAutoPlay,
		carouselPauseOnHover,
		carouselMouseWheelControl,
		carouselAdaptiveHeight,
		carouselColumn,
		slideToScroll,
		imageOverlayType,
		equalHeightEnable,
		infiniteLoop,
		posts,
		carouselStyle,
	]);

	const swiperOptions = {
		slidesPerView: newsTickerItemToDisplay.device?.[deviceType],
		simulateTouch: false,
		navigation: {
			nextEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn.btn-next`,
			prevEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow-btn.btn-prev`,
			enabled: true,
		},
		grabCursor: false,
		loop: true,
		autoplay: carouselAutoPlay && {
			delay: carouselAutoPlayDelay?.value,
			disableOnInteraction: false,
			pauseOnMouseEnter: carouselPauseOnHover,
			reverseDirection: ["left_to_right", "top_to_bottom"].includes(carouselDirection) ? true : false,
		},
		speed: carouselTickerSpeed?.value,
		spaceBetween: carouselAnimationEffect === "cube" ? 0 : tickerTitleGap.device?.[deviceType] || 24,
		effect: carouselAnimationEffect,
		direction: ["top_to_bottom", "bottom_to_top"].includes(carouselDirection) ? "vertical" : "horizontal",
	};

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>
			<TogglePanelBodyProvider>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					attributes={attributes}
					setAttributes={setAttributes}
					Inspector={Inspector}
					isSelected={isSelected}
				/>
				<EditorWrapper setPosts={setPosts} setAttributes={setAttributes} blockType={"builder-block"}>
					<Render pageType="editor" attributes={attributes} posts={posts} swiperKey={swiperRand} />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};
export default compose(addInitialAttr)(NewsTickerEdit);
