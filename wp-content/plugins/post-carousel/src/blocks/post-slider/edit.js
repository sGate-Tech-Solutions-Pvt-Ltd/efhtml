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

const PostSliderEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		postSliderLayout,
		postSliderAnimationEffect,
		postSliderTabKeyNav,
		postSliderHoverPause,
		carouselAutoPlay,
		postSliderMouseWheel,
		postCardBg,
		carouselPaginationStyle,
		carouselPaginationVertical,
		excerptColor,
		contentAreaHeight,
		fontListsEditPage,
		carouselArrowHorizontal,
		carouselArrowVertical,
		carouselArrowSpaceBetween,
		titleFontSize,
		contentAreaPadding,
		carouselSpeed,
		carouselPaginationWidth,
		carouselPaginationHeight,
		excerptFontSize,
		contentAreaInnerWidth,
		postSliderSlideScroll,
		postSliderFreeScroll,
		carouselAutoPlayDelay,
		infiniteLoop,
		carouselDirection,
		customCss,
		uniqueId,
		carouselNavArrow,
		carouselPaginationDot,
	} = attributes;
	const blockProps = useBlockProps();
	const deviceType = useDeviceType();
	const [postSliderKey, setPostSliderKey] = useState(1);

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Desktop: 44,
						Tablet: 32,
						Mobile: 18,
					},
				},
				showReadMoreButton: false,
				postSliderGeneralContentAlign: "center",
				excerptColor: { ...excerptColor, color: "#EEEEEE" },
				excerptFontSize: {
					...excerptFontSize,
					device: {
						...excerptFontSize.device,
						Tablet: 14,
						Mobile: 14,
					},
				},
				imageOverlayColor: "default",
				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						solidColor: "",
						style: "",
					},
				},
				contentHorizontalPosition: "left",
				contentAlignment: "center",
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: 100,
						Tablet: 100,
						Mobile: 100,
					},
				},
				contentAreaHeight: {
					...contentAreaHeight,
					device: { ...contentAreaHeight.device, Desktop: "" },
				},
				imageSize: "",
				imagePosition: "background",
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: 30,
						Tablet: 10,
						Mobile: 5,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
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
				carouselPaginationVertical: {
					...carouselPaginationVertical,
					device: {
						...carouselPaginationVertical.device,
						Desktop: "",
						Tablet: "",
						Mobile: "",
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: 30,
							right: 90,
							bottom: 30,
							left: 90,
						},
						Tablet: {
							...contentAreaPadding.device.Tablet,
							top: 8,
							right: 16,
							bottom: 8,
							left: 16,
						},
						Mobile: {
							...contentAreaPadding.device.Mobile,
							top: 8,
							right: 8,
							bottom: 8,
							left: 8,
						},
					},
				},
				carouselSpeed: {
					...carouselSpeed,
					value: 1000,
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
				contentAreaInnerWidth: {
					...contentAreaInnerWidth,
					device: {
						...contentAreaInnerWidth.device,
						Desktop: 95,
						Tablet: 90,
						Mobile: 85,
					},
					unit: {
						...contentAreaInnerWidth.unit,
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
				imageHoverEffect: "normal",
			});
		}
	}, []);

	const swiperOptions = {
		slidesPerView: 1,
		simulateTouch: true,
		navigation: {
			nextEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-next`,
			prevEl: `#${uniqueId} .sp-smart-post-swiper-nav-arrow .btn-prev`,
			enabled: true,
		},
		spaceBetween: 0,
		grabCursor: true,
		pagination: paginationDotType(null, carouselPaginationStyle, uniqueId),
		scrollbar:
			carouselPaginationStyle === "scrollbar"
				? {
						draggable: true,
						el: `#${uniqueId} .swiper-scrollbar`,
					}
				: undefined,
		loop: !infiniteLoop || "scrollbar" === carouselPaginationStyle ? false : true,
		slidesPerGroup: postSliderSlideScroll?.device?.[deviceType],
		autoplay: carouselAutoPlay
			? {
					delay: carouselAutoPlayDelay?.value,
					disableOnInteraction: false,
					pauseOnMouseEnter: postSliderHoverPause,
					reverseDirection: carouselDirection === "left_to_right",
				}
			: undefined,
		speed: carouselSpeed?.value,
		effect: postSliderAnimationEffect,
		cubeEffect:
			postSliderAnimationEffect === "cube"
				? {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					}
				: undefined,
		coverflowEffect:
			postSliderAnimationEffect === "coverflow"
				? {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}
				: undefined,
		keyboard: postSliderTabKeyNav
			? {
					enabled: true,
					onlyInViewport: true,
				}
			: undefined,
		mousewheel: postSliderMouseWheel || false,
		freeMode: postSliderFreeScroll || false,
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
		setPostSliderKey(Math.floor(Math.random() * 1000000));
	}, [
		postSliderAnimationEffect,
		postSliderTabKeyNav,
		postSliderHoverPause,
		carouselAutoPlay,
		postSliderMouseWheel,
		carouselPaginationStyle,
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
				{/* Render Html here */}
				<EditorWrapper setPosts={setPosts} setAttributes={setAttributes}>
					<Render attributes={attributes} posts={posts} swiperKey={postSliderKey} pageType="editor" />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(PostSliderEdit);
