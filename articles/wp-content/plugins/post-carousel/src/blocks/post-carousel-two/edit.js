import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useMemo, useRef, useState } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyTitleIcon, panelBodyRightIcon } from "../../icons/icons";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { inArray, useDeviceType, paginationDotType } from "../../controls/controls";
import { EditorWrapper } from "../shared/wrapper";
import Render from "./render";
import { TogglePanelBodyProvider } from "../../context";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const CarouselTwoEdit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const [posts, setPosts] = useState([]);
	attributes.clientId = clientId;

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
		contentAreaBg,
		imageOverlayType,
		equalHeightEnable,
		infiniteLoop,
		fontListsEditPage,
		contentAreaPadding,
		offset,
		carouselGap,
		imageHeight,
		customCss,
		carouselSpeed,
		carouselFreeScrollMode,
		carouselTickerSpeed,
		carouselDirection,
		uniqueId,
		carouselHeight,
		catTabCategoryBorder,
		imageOverlayCustomColor,
		partialViewSlide,
	} = attributes;

	const deviceType = useDeviceType();
	const blockProps = useBlockProps();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				contentHorizontalPosition: "left",
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "transparent",
					},
				},
				showReadMoreButton: false,
				imagePosition: "background",
				imageOverlayColor: "default",
				contentVerticalPosition: "bottom",
				imageHeight: {
					...imageHeight,
					device: {
						...imageHeight?.device,
						Desktop: 244,
					},
				},

				carouselHeight: {
					...carouselHeight,
					device: {
						...carouselHeight.device,
						Desktop: 244,
						Tablet: 210,
						Mobile: 210,
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 0,
							right: 20,
							bottom: 20,
							left: 20,
						},
					},
				},

				catTabCategoryBorder: {
					...catTabCategoryBorder,
					style: "solid",
				},

				imageOverlayCustomColor: {
					...imageOverlayCustomColor,
					color: {
						...imageOverlayCustomColor.color,
						solidColor: "#00000080",
					},
				},
			});
		}
	}, []);

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
		if (carouselAutoPlayDelay.unit == "s") {
			setCarouselAutoPlaySpeed(carouselAutoPlayDelay.value * 1000);
		} else {
			setCarouselAutoPlaySpeed(carouselAutoPlayDelay);
		}
	}, [carouselAutoPlayDelay]);

	const blockStyling = useMemo(() => dynamicCssFn(attributes, "frontend", deviceType), [attributes, deviceType]);

	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false;
		} else if (inArray(["ticker", "multi_row"], carouselStyle)) {
			setAttributes({
				carouselAdaptiveHeight: false,
			});
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
	const desktopGap = carouselGap?.device?.Desktop ? carouselGap?.device?.Desktop.toString() : "0";
	const tabletGap = carouselGap?.device?.Tablet ? carouselGap?.device?.Tablet.toString() : desktopGap;
	const mobileGap = carouselGap?.device?.Mobile ? carouselGap?.device?.Mobile.toString() : desktopGap;
	const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = slideToScroll.device;

	const isPartialView = carouselStyle === "standard" && partialViewSlide === true;
	let swiperOptions = {};
	if (carouselStyle !== "ticker") {
		swiperOptions = {
			slidesPerView: Number(carouselColumn.device?.[deviceType]) + (isPartialView ? 0.3 : 0),

			simulateTouch: true,
			grid: carouselStyle === "multi_row" ? { rows: 2, fill: "row" } : undefined,
			navigation: {
				nextEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-next`,
				prevEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-prev`,
				enabled: true,
			},
			grabCursor: true,
			pagination: paginationDotType(null, carouselPaginationStyle, uniqueId),
			scrollbar:
				carouselPaginationStyle === "scrollbar"
					? {
							draggable: true,
							el: ".swiper-scrollbar",
						}
					: undefined,
			loop:
				!infiniteLoop ||
				carouselStyle === "multi_row" ||
				desktopScroll > 1 ||
				tabletScroll > 1 ||
				mobileScroll > 1
					? false
					: true,

			slidesPerGroup: slideToScroll.device?.[deviceType] || 1,
			centeredSlides: "center" === carouselStyle || isPartialView ? true : false,
			watchSlidesProgress: true,
			autoplay: carouselAutoPlay
				? {
						delay: carouselAutoPlayDelay?.value,
						disableOnInteraction: false,
						pauseOnMouseEnter: carouselPauseOnHover,
						reverseDirection: carouselDirection === "left_to_right",
					}
				: undefined,

			speed: carouselSpeed?.value,

			spaceBetween: carouselAnimationEffect === "cube" ? 0 : carouselGap.device?.[deviceType] || 0,

			breakpoints: !["fade", "cube", "flip"].includes(carouselAnimationEffect)
				? {
						0: {
							slidesPerView: Number(carouselColumn?.device?.Mobile) + (isPartialView ? 0.3 : 0),
							slidesPerGroup: mobileScroll > 1 ? parseInt(mobileScroll) : parseInt(desktopScroll),
							spaceBetween: mobileGap ? mobileGap.toString() : desktopGap,
						},
						600: {
							slidesPerView: Number(carouselColumn?.device?.Tablet) + (isPartialView ? 0.3 : 0),
							slidesPerGroup: tabletScroll > 1 ? parseInt(tabletScroll) : parseInt(desktopScroll),
							spaceBetween: tabletGap ? tabletGap.toString() : desktopGap,
						},
						1024: {
							slidesPerView: Number(carouselColumn?.device?.Desktop) + (isPartialView ? 0.3 : 0),
							slidesPerGroup: parseInt(desktopScroll) || 1,
							spaceBetween: desktopGap.toString() || "0",
						},
					}
				: undefined,
			effect: carouselAnimationEffect,
			cubeEffect:
				carouselAnimationEffect === "cube"
					? {
							shadow: true,
							slideShadows: true,
							shadowOffset: 20,
							shadowScale: 0.94,
						}
					: undefined,
			coverflowEffect:
				carouselAnimationEffect === "coverflow"
					? {
							rotate: 50,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: true,
						}
					: undefined,
			keyboard: carouselTabKeyNav
				? {
						enabled: true,
						onlyInViewport: true,
					}
				: undefined,
			mousewheel: carouselMouseWheelControl || false,
			autoHeight: carouselAdaptiveHeight ? true : false,
			freeMode: carouselFreeScrollMode || false,
			direction: "horizontal",
		};
	} else {
		swiperOptions = {
			slidesPerView: carouselColumn.device?.[deviceType],
			slidesPerViewMobile: carouselColumn?.device?.Mobile,
			slidesPerViewTable: carouselColumn?.device?.Tablet,
			speed: carouselTickerSpeed?.value,
			spaceBetween: carouselGap.device?.[deviceType] || 0,
			spaceBetweenMobile: mobileGap ? mobileGap.toString() : desktopGap,
			spaceBetweenTablet: tabletGap ? tabletGap.toString() : desktopGap,
			direction: carouselDirection,
			pauseOnHover: carouselPauseOnHover,
		};
	}
	useEffect(() => {
		setAttributes({
			carouselData: JSON.stringify(swiperOptions),
		});
	}, [JSON.stringify(swiperOptions)]);

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>
			<TogglePanelBodyProvider blockName={blockName}>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					attributes={attributes}
					setAttributes={setAttributes}
					Inspector={Inspector}
					isSelected={isSelected}
				/>

				<EditorWrapper setPosts={setPosts} setAttributes={setAttributes}>
					<Render pageType="editor" attributes={attributes} posts={posts} swiperKey={swiperRand} />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};
export default compose(addInitialAttr)(CarouselTwoEdit);
