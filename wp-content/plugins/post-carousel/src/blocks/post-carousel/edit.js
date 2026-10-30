import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useRef, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyTitleIcon, panelBodyRightIcon } from "../../icons/icons";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { setDefaultValue } from "../shared/helpFn";
import { inArray, useDeviceType, paginationDotType } from "../../controls/controls";
import { EditorWrapper } from "../shared/wrapper";
import Render from "./render";
import { TogglePanelBodyProvider } from "../../context";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const CarouselEdit = ({ attributes, setAttributes, isSelected }) => {
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
		contentAreaBg,
		postCardBg,
		imageOverlayType,
		equalHeightEnable,
		infiniteLoop,
		fontListsEditPage,
		contentAreaPadding,
		carouselArrowBorderWidth,
		carouselGap,
		imageHeight,
		imageWidth,
		advancedPadding,
		carouselPaginationVertical,
		customCss,
		imageSpace,
		socialPopupShareColor,
		carouselSpeed,
		carouselFreeScrollMode,
		carouselTickerSpeed,
		carouselDirection,
		uniqueId,
		carouselArrowSpaceBetween,
		carouselArrowHorizontal,
		showPartialView,
	} = attributes;

	const deviceType = useDeviceType();
	const blockProps = useBlockProps();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				contentHorizontalPosition: "center",
				...setDefaultValue(carouselGap, "carouselGap", 24),
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween?.device,
						Desktop: 100,
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: -22,
						Tablet: 10,
						Mobile: 5,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				carouselArrowBorderWidth: {
					...carouselArrowBorderWidth,
					device: {
						...carouselArrowBorderWidth.device,
						[deviceType]: {
							top: 1,
							right: 1,
							bottom: 1,
							left: 1,
						},
					},
				},
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						style: "",
					},
					hover: {
						...contentAreaBg.hover,
						style: "",
					},
				},
				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						style: "",
					},
					hover: {
						...postCardBg.hover,
						style: "",
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: "",
							right: "",
							bottom: "",
							left: "",
						},
					},
				},
				imageSize: "smart-post-landscape",
				imageHeight: {
					...imageHeight,
					device: {
						...imageHeight?.device,
						Desktop: 244,
					},
				},
				imageWidth: {
					...imageWidth,
					device: {
						...imageWidth.device,
						Desktop: 100,
					},
				},
				advancedPadding: {
					...advancedPadding,
					device: {
						...advancedPadding.device,
						Desktop: {
							...advancedPadding.device.Desktop,
							bottom: 40,
						},
					},
				},
				carouselPaginationVertical: {
					...carouselPaginationVertical,
					device: {
						...carouselPaginationVertical?.device,
						Tablet: -20,
						Mobile: -20,
					},
				},
				imageSpace: {
					...imageSpace,
					device: {
						...imageSpace.device,
						Desktop: 12,
						Tablet: "",
						Mobile: "",
					},
				},
				socialPopupShareColor: {
					...socialPopupShareColor,
					color: "#333",
				},
			});
		}
	}, [blockName]);

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
		showPartialView,
	]);
	const desktopGap = carouselGap?.device?.Desktop >= 0 ? carouselGap?.device?.Desktop.toString() : "0";
	const tabletGap = carouselGap?.device?.Tablet ? carouselGap?.device?.Tablet.toString() : desktopGap;
	const mobileGap = carouselGap?.device?.Mobile ? carouselGap?.device?.Mobile.toString() : desktopGap;
	const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = slideToScroll.device;
	let swiperOptions = {};
	if (carouselStyle !== "ticker") {
		swiperOptions = {
			slidesPerView: carouselColumn.device?.[deviceType] + (showPartialView ? 0.3 : 0),
			simulateTouch: true,
			grid: carouselStyle === "multi_row" ? { rows: 2, fill: "row" } : false,
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
					: false,
			loop:
				!infiniteLoop ||
				carouselStyle === "multi_row" ||
				"scrollbar" === carouselPaginationStyle ||
				desktopScroll > 1 ||
				tabletScroll > 1 ||
				mobileScroll > 1
					? false
					: true,

			slidesPerGroup: slideToScroll.device?.[deviceType] || 1,
			centeredSlides: showPartialView || carouselStyle === "center",
			autoplay: carouselAutoPlay
				? {
						delay: carouselAutoPlayDelay?.value,
						disableOnInteraction: false,
						pauseOnMouseEnter: carouselPauseOnHover,
						reverseDirection: carouselDirection === "left_to_right",
					}
				: false,

			speed: carouselSpeed?.value,

			spaceBetween: carouselAnimationEffect === "cube" ? 0 : carouselGap.device?.[deviceType] || 0,

			breakpoints: !["fade", "cube", "flip"].includes(carouselAnimationEffect)
				? {
						0: {
							slidesPerView: carouselColumn?.device?.Mobile,
							slidesPerGroup: mobileScroll > 1 ? parseInt(mobileScroll) : parseInt(desktopScroll),
							spaceBetween: mobileGap ? mobileGap.toString() : desktopGap,
						},
						600: {
							slidesPerView: carouselColumn?.device?.Tablet + (showPartialView ? 0.3 : 0),
							slidesPerGroup: tabletScroll > 1 ? parseInt(tabletScroll) : parseInt(desktopScroll),
							spaceBetween: tabletGap ? tabletGap.toString() : desktopGap,
						},
						1024: {
							slidesPerView: carouselColumn?.device?.Desktop + (showPartialView ? 0.3 : 0),
							slidesPerGroup: parseInt(desktopScroll) || 1,
							spaceBetween: desktopGap.toString() || "20",
						},
					}
				: false,
			effect: carouselAnimationEffect,
			cubeEffect:
				carouselAnimationEffect === "cube"
					? {
							shadow: true,
							slideShadows: true,
							shadowOffset: 20,
							shadowScale: 0.94,
						}
					: false,
			coverflowEffect:
				carouselAnimationEffect === "coverflow"
					? {
							rotate: 50,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: true,
						}
					: false,
			keyboard: carouselTabKeyNav
				? {
						enabled: true,
						onlyInViewport: true,
					}
				: false,
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
export default compose(addInitialAttr)(CarouselEdit);
