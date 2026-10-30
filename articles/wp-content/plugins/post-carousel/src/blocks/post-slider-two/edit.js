import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { useDeviceType, paginationDotType } from "../../controls/controls";
import { EditorWrapper } from "../shared/wrapper";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspect";
import Render from "./render";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
import { priceLink } from "../shared/helpFn";
import { blockPreviewPanelLink } from "../../controls/constants";

const PostSliderTwoEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		fontListsEditPage,
		customCss,
		carouselArrowVertical,
		carouselArrowHorizontal,
		carouselArrowSpaceBetween,
		infiniteLoop,
		carouselPauseOnHover,
		contentAreaWidth,
		contentAreaHeight,
		contentAreaBg,
		contentAreaPadding,
		carouselArrowBorder,
		contentHorizontalPosition,
		imagePosition,
		blockLayoutName,
		contentAreaBorderWidth,
		socialPopupShareColor,
		paginationDotStyle,
		postSliderSlidePerGroups,
		carouselAutoPlay,
		carouselDirection,
		carouselPaginationStyle,
		postSliderSlideScroll,
		carouselAutoPlayDelay,
		postSliderHoverPause,
		carouselSpeed,
		postSliderLayout,
		uniqueId,
		postSliderTwoAnimationEffect,
		postSliderTwoMouseWheelControl,
		postSliderTwoFreeScrollMode,
		postSliderTwoTabKeyNavigation,
		// postSliderTwoNavArrow,
		titleFontSize,
		carouselNavArrow,
		carouselPaginationDot,
	} = attributes;

	const blockProps = useBlockProps();

	const deviceType = useDeviceType();
	const [postSliderKey, setPostSliderKey] = useState(1);

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				// carouselPauseOnHover: false,
				contentAlignment: "center",
				imagePosition: "background",

				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Desktop: 42,
						Tablet: 32,
						Mobile: 18,
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 100,
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: "",
					},
				},
				carouselArrowVertical: {
					...carouselArrowVertical,
					device: {
						...carouselArrowVertical.device,
						Desktop: "",
						Tablet: "",
						Mobile: "",
					},
				},
				// carouselArrowBgColor: {
				// 	...carouselArrowBgColor,
				// 	color: '#2F2F2F',
				// },
				// carouselArrowBorderRadius: {
				//   ...carouselArrowBorderRadius,
				//   device: {
				//     ...carouselArrowBorderRadius.device,
				//     Desktop: {
				//       top: 0,
				//       right: 0,
				//       bottom: 0,
				//       left: 0,
				//     },
				//   },
				// },
				imageOverlayType: "box",
				contentAreaWidth: {
					...contentAreaWidth,
					device: {
						...contentAreaWidth.device,
						Desktop: 580,
					},
					unit: {
						...contentAreaWidth.unit,
						Desktop: "px",
					},
				},
				contentAreaHeight: {
					...contentAreaHeight,
					device: {
						...contentAreaHeight.device,
						Desktop: 280,
					},
					unit: {
						...contentAreaHeight.unit,
						Desktop: "px",
					},
				},
				contentHorizontalPosition: "center",
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "#ffffffe6",
						style: "bgColor",
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 8,
							right: 32,
							bottom: 8,
							left: 32,
						},
					},
				},
				carouselArrowBorder: {
					...carouselArrowBorder,
					style: "none",
				},
				contentAreaBorderWidth: {
					...contentAreaBorderWidth,
					device: {
						...contentAreaBorderWidth.device,
						Desktop: {
							top: 1,
							right: 1,
							bottom: 1,
							left: 1,
						},
					},
				},
				socialPopupShareColor: {
					...socialPopupShareColor,
					color: "#333",
				},
				imageHoverEffect: "normal",
			});
		}
	}, []);
	const swiperOptions = {
		slidesPerView: 1,
		simulateTouch: true,
		navigation: carouselNavArrow
			? {
					nextEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-next`,
					prevEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-prev`,
					enabled: true,
				}
			: false,
		spaceBetween: 0,
		grabCursor: true,
		pagination: paginationDotType(null, carouselPaginationStyle, uniqueId),
		scrollbar:
			carouselPaginationStyle === "scrollbar"
				? {
						draggable: true,
						el: `#${uniqueId} .swiper-scrollbar`,
					}
				: false,
		loop: !infiniteLoop || "scrollbar" === carouselPaginationStyle ? false : true,
		slidesPerGroup: postSliderSlideScroll?.device?.[deviceType],
		autoplay: carouselAutoPlay
			? {
					delay: carouselAutoPlayDelay?.value,
					disableOnInteraction: false,
					pauseOnMouseEnter: postSliderHoverPause,
					reverseDirection: carouselDirection === "left_to_right",
				}
			: false,
		speed: carouselSpeed?.value,
		effect: postSliderTwoAnimationEffect,
		cubeEffect:
			postSliderTwoAnimationEffect === "cube"
				? {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					}
				: false,
		coverflowEffect:
			postSliderTwoAnimationEffect === "coverflow"
				? {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}
				: false,
		keyboard: postSliderTwoTabKeyNavigation
			? {
					enabled: true,
					onlyInViewport: true,
				}
			: false,
		mousewheel: postSliderTwoMouseWheelControl || false,
		freeMode: postSliderTwoFreeScrollMode || false,
		touchStartPreventDefault: false,
		direction: postSliderLayout === "post-slider-layout-two" ? "vertical" : "horizontal",
	};
	useEffect(() => {
		setAttributes({
			carouselData: JSON.stringify(swiperOptions),
		});
	}, [JSON.stringify(swiperOptions)]);

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType, attributes]
	);

	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

	useEffect(() => {
		if (blockLayoutName === "post-slider-two-layout-three") {
			setAttributes({
				imagePosition: contentHorizontalPosition === "right" ? "left" : "right",
			});
		} else {
			setAttributes({ imagePosition: "background" });
		}
	}, [imagePosition, contentHorizontalPosition]);

	useEffect(() => {
		setPostSliderKey(Math.floor(Math.random() * 1000000));
	}, [
		carouselPauseOnHover,
		infiniteLoop,
		postSliderTwoTabKeyNavigation,
		postSliderTwoMouseWheelControl,
		postSliderTwoFreeScrollMode,
		postSliderTwoAnimationEffect,
		paginationDotStyle,
		postSliderSlidePerGroups,
		carouselAutoPlay,
		carouselDirection,
		posts,
		carouselNavArrow,
		carouselPaginationDot,
		carouselPaginationStyle,
	]);
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
					Inspector={Inspector}
					attributes={attributes}
					setAttributes={setAttributes}
					isSelected={isSelected}
					// templateLibrary={ true }
				/>
				{/* Render Html here */}
				<EditorWrapper
					setPosts={setPosts}
					setAttributes={setAttributes}
					customClass={carouselPaginationDot ? " sp-pagination" : ""}
				>
					<Render attributes={attributes} posts={posts} swiperKey={postSliderKey} pageType="editor" />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(PostSliderTwoEdit);
