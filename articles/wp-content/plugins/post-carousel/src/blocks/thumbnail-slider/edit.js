import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { EditorWrapper } from "../shared/wrapper";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspect";
import Render from "./render";
import { useDeviceType, paginationDotType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const PostThumbnailEdit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const [posts, setPosts] = useState([]);
	attributes.clientId = clientId;
	const {
		blockName,
		thumbnailSliderLayout,
		postThumbnailAnimationEffect,
		carouselPaginationStyle,
		carouselAutoPlay,
		postThumbnailPosition,
		contentAreaPadding,
		postCardBg,
		catTabCategoryBorder,
		fontListsEditPage,
		carouselArrowHorizontal,
		carouselPaginationVertical,
		carouselArrowColor,
		titleFontSize,
		carouselSpeed,
		carouselArrowVertical,
		contentAreaInnerWidth,
		carouselArrowWidth,
		carouselArrowHeight,
		carouselPaginationWidth,
		carouselPaginationHeight,
		customCss,
		addToCartColor,
		addToCartBorder,
		priceColor,
		discountColor,
		postThumbnailLoop,
		carouselAutoPlayDelay,
		carouselDirection,
		postThumbnailTabKeyNavigation,
		postThumbnailAdaptiveHeight,
		postThumbnailFreeScrollMode,
		thumbnailsSlidePerGroups,
		carouselPauseOnHover,
		postThumbnailMouseWheelControl,
		uniqueId,
		postThumbnailGap,
		postThumbnailSlideToScroll,
		postThumbnailItemsPerSlide,
		carouselArrowSpaceBetween,
		carouselNavArrow,
		carouselPaginationDot,
		globalBreakPointData,
		carouselPaginationBorder,
	} = attributes;

	const blockProps = useBlockProps();
	const deviceType = useDeviceType();

	const [postSliderKey, setPostSliderKey] = useState(1);

	const { Desktop: desktopGap, Tablet: tabletGap, Mobile: mobileGap } = postThumbnailGap.device;
	const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = postThumbnailSlideToScroll.device;

	const thumbOption = {
		loop: postThumbnailLoop && thumbnailSliderLayout !== "thumbnail-slider-layout-five",
		spaceBetween: desktopGap,
		grid: thumbnailSliderLayout === "thumbnail-slider-layout-five" ? { rows: 2, fill: "row" } : false,
		freeMode: true,
		watchSlidesProgress: true,
		touchStartPreventDefault: false,
		direction: ["left", "right"].includes(postThumbnailPosition) ? "vertical" : "horizontal",
		slideToClickedSlide: true,
		speed: carouselSpeed?.value,
		breakpoints: {
			0: {
				slidesPerView: postThumbnailItemsPerSlide?.device?.Mobile,
				slidesPerGroup: mobileScroll > 1 ? parseInt(mobileScroll) : parseInt(desktopScroll),
				spaceBetween: mobileGap ? mobileGap.toString() : desktopGap,
			},
			[parseInt(globalBreakPointData.mobile) + 1]: {
				slidesPerView: postThumbnailItemsPerSlide?.device?.Tablet,
				slidesPerGroup: tabletScroll > 1 ? parseInt(tabletScroll) : parseInt(desktopScroll),
				spaceBetween: tabletGap ? tabletGap.toString() : desktopGap,
			},
			[parseInt(globalBreakPointData.tablet) + 1]: {
				slidesPerView: postThumbnailItemsPerSlide?.device?.Desktop,
				slidesPerGroup: parseInt(desktopScroll) || 1,
				spaceBetween: desktopGap.toString() || "20",
			},
		},
	};

	const swiperOptions = {
		slidesPerView: 1,
		simulateTouch: true,
		navigation: {
			nextEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-next`,
			prevEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-prev`,
			enabled: true,
		},
		grabCursor: true,
		speed: carouselSpeed?.value,
		pagination: paginationDotType(null, carouselPaginationStyle, uniqueId),
		scrollbar:
			carouselPaginationStyle === "scrollbar"
				? {
						draggable: true,
						el: ".swiper-scrollbar",
					}
				: undefined,
		loop: postThumbnailLoop && thumbnailSliderLayout !== "thumbnail-slider-layout-five",
		// slidesPerGroup: Math.min(thumbnailsSlidePerGroups || 1, 10),
		slidesPerGroup: Number(desktopScroll),
		autoplay: carouselAutoPlay
			? {
					delay: carouselAutoPlayDelay?.value || 3000,
					disableOnInteraction: false,
					pauseOnMouseEnter: carouselPauseOnHover,
					reverseDirection: carouselDirection === "left_to_right",
				}
			: false,
		effect: postThumbnailAnimationEffect,
		cubeEffect:
			postThumbnailAnimationEffect === "cube"
				? {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					}
				: undefined,
		coverflowEffect:
			postThumbnailAnimationEffect === "coverflow"
				? {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}
				: undefined,
		keyboard: postThumbnailTabKeyNavigation
			? {
					enabled: true,
					onlyInViewport: true,
				}
			: false,
		mousewheel: postThumbnailMouseWheelControl || false,
		autoHeight: !!postThumbnailAdaptiveHeight,
		freeMode: !!postThumbnailFreeScrollMode,
	};

	useEffect(() => {
		setAttributes({
			carouselData: JSON.stringify(swiperOptions),
		});
	}, [JSON.stringify(swiperOptions)]);

	useEffect(() => {
		setAttributes({
			thumbnailsData: JSON.stringify(thumbOption),
		});
	}, [JSON.stringify(thumbOption)]);
	useEffect(() => {
		if (!blockName) {
			setAttributes({
				imagePosition: "background",
				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Desktop: 44,
						Tablet: 32,
						Mobile: 20,
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: 30,
						Tablet: 10,
						Mobile: 5,
					},
					unit: {
						...carouselArrowHorizontal.unit,
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 100,
					},
				},
				carouselPaginationVertical: {
					...carouselPaginationVertical,
					device: {
						...carouselPaginationVertical.device,
						Desktop: "",
						Tablet: "",
						Mobile: "",
					},
				},
				carouselArrowColor: {
					...carouselArrowColor,
					color: "#ffffff",
					hoverColor: "#FFFFFF",
				},
				postSliderGeneralContentAlign: "center",
				imageOverlayColor: "default",
				catTabCategoryBorder: {
					...catTabCategoryBorder,
					style: "none",
				},
				contentAlignment: "center",
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
				contentHorizontalPosition: "center",
				// contentAreaPadding: {
				// 	...contentAreaPadding,
				// 	device: {
				// 		...contentAreaPadding.device,
				// 		Desktop: {
				// 			...contentAreaPadding.device.Desktop,
				// 			top: 0,
				// 			right: 90,
				// 			bottom: 0,
				// 			left: 90,
				// 		},
				// 		Tablet: {
				// 			...contentAreaPadding.device.Desktop,
				// 			top: 8,
				// 			right: 16,
				// 			bottom: 8,
				// 			left: 16,
				// 		},
				// 	},
				// },
				carouselSpeed: {
					...carouselSpeed,
					value: 600,
				},
				carouselArrowVertical: {
					...carouselArrowVertical,
					device: {
						...carouselArrowVertical.device,
						Desktop: 50,
					},
					unit: {
						...carouselArrowVertical.unit,
						Desktop: "%",
					},
				},
				contentAreaInnerWidth: {
					...contentAreaInnerWidth,
					device: {
						...contentAreaInnerWidth.device,
						Desktop: 85,
						Tablet: 90,
						Mobile: 100,
					},
				},
				carouselArrowWidth: {
					...carouselArrowWidth,
					device: {
						...carouselArrowWidth.device,
						Mobile: 30,
					},
				},
				carouselArrowHeight: {
					...carouselArrowHeight,
					device: {
						...carouselArrowHeight.device,
						Mobile: 30,
					},
				},
				carouselPaginationWidth: {
					...carouselPaginationWidth,
					device: {
						...carouselPaginationWidth.device,
						Mobile: 10,
					},
				},
				carouselPaginationHeight: {
					...carouselPaginationHeight,
					device: {
						...carouselPaginationHeight.device,
						Mobile: 10,
					},
				},
				addToCartColor: {
					...addToCartColor,
					color: "#FFFFFF",
				},
				addToCartBorder: {
					...addToCartBorder,
					color: "#FFFFFF",
				},
				priceColor: {
					...priceColor,
					color: "#FFFFFF",
				},
				discountColor: {
					...discountColor,
					color: "#FFFFFF",
				},
				imageHoverEffect: "normal",
				carouselPaginationBorder: {
					...carouselPaginationBorder,
					style: "",
					color: "",
				},
			});
		}
	}, []);

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType, attributes]
	);

	useEffect(() => {
		setAttributes({ blockLayoutName: thumbnailSliderLayout });
	}, [blockName, thumbnailSliderLayout]);

	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

	useEffect(() => {
		setPostSliderKey(Math.floor(Math.random() * 100));
	}, [
		postThumbnailAnimationEffect,
		blockName,
		carouselPaginationStyle,
		carouselAutoPlay,
		postThumbnailPosition,
		posts,
		carouselNavArrow,
		carouselPaginationDot,
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
				/>
				<EditorWrapper setPosts={setPosts} setAttributes={setAttributes}>
					<Render key={postSliderKey} attributes={attributes} posts={posts} pageType="editor" />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(PostThumbnailEdit);
