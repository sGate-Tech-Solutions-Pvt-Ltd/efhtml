import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState, useMemo } from "@wordpress/element";
import { EditorWrapper } from "../shared/wrapper";
import dynamicCssFn from "./dynamicCss";
import { useDeviceType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { InspectorControl } from "../../components";
import Inspect from "./inspect";
import { panelBodyRightIcon } from "../../icons/icons";
import Render from "./render";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const PostThumbnailTwoEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);

	const {
		blockName,
		thumbnailSliderTwoLayout,
		fontListsEditPage,
		customCss,
		carouselAutoPlay,
		thumbnailProgressPosition,
		thumbnailTwoAnimationEffect,
		contentAreaInnerWidth,
		postCardPadding,
		imageOverlayCustomColor,
		titleColor,
		catTabCategoryColor,
		titleFontSize,
		largeItemTitleColor,
		largeItemTitleFontSize,
		carouselArrowSize,
		carouselArrowWidth,
		carouselArrowHeight,
		carouselArrowSpaceBetween,
		carouselArrowHorizontal,
		carouselArrowVertical,
		carouselArrowBgColor,
		carouselArrowBorder,
		thumbnailsSlidePerGroups,
		thumbnailTwoTabKeyNavigation,
		thumbnailTwoAdaptiveHeight,
		thumbnailTwoMouseWheelControl,
		thumbnailTwoFreeScrollMode,
		thumbnailTwoSlideToScroll,
		thumbnailItemsToShow,
		carouselAutoPlayDelay,
		carouselPauseOnHover,
		carouselDirection,
		thumbnailTwoPosition,
		carouselSpeed,
		infiniteLoop,
		carouselArrowBorderRadius,
		uniqueId,
		thumbnailSliderTwoHeight,
		carouselNavArrow,
		globalBreakPointData,
	} = attributes;
	const thumbsGap = (layout) => {
		const thumbsConfig = {
			"thumbnail-slider-two-layout-one": 0,
			"thumbnail-slider-two-layout-two": 48,
			"thumbnail-slider-two-layout-three": 20,
			"thumbnail-slider-two-layout-four": 12,
			"thumbnail-slider-two-layout-five": 24,
		};
		return thumbsConfig[layout];
	};
	const blockProps = useBlockProps();
	const deviceType = useDeviceType();
	const [postSliderKey, setPostSliderKey] = useState(1);

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				postLimit: "3",
				imageLazyLoad: true,
				contentAreaInnerWidth: {
					...contentAreaInnerWidth,
					device: { ...contentAreaInnerWidth.device, Desktop: 80 },
					unit: { ...contentAreaInnerWidth.unit, Desktop: "%" },
				},
				thumbnailSliderTwoHeight: {
					...thumbnailSliderTwoHeight,
					device: {
						...thumbnailSliderTwoHeight.device,
						Desktop: 620,
						Tablet: 500,
						Mobile: 450,
					},
					unit: {
						...contentAreaInnerWidth.unit,
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				contentHorizontalPosition: "center",
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							...postCardPadding.device.Desktop,
							top: 0,
							right: 0,
							bottom: 120,
							left: 0,
						},
						Tablet: {
							...postCardPadding.device.Tablet,
							top: 0,
							right: 0,
							bottom: 60,
							left: 0,
						},
						Mobile: {
							...postCardPadding.device.Mobile,
							top: 0,
							right: 20,
							bottom: 40,
							left: 20,
						},
					},
					unit: { ...postCardPadding.unit, Desktop: "px" },
				},
				imageOverlayColor: "default",
				imageOverlayCustomColor: {
					...imageOverlayCustomColor,
					color: {
						...imageOverlayCustomColor.color,
						style: "gradient",
						gradient: "linear-gradient(89.87deg, rgba(0, 0, 0, 0.68) 20.05%, rgba(0, 0, 0, 0.068) 99.88%)",
					},
					hover: {
						...imageOverlayCustomColor.hover,
						style: "gradient",
						gradient: "linear-gradient(89.87deg, rgba(0, 0, 0, 0.68) 20.05%, rgba(0, 0, 0, 0.068) 99.88%)",
					},
				},
				titleColor: {
					...titleColor,
					color: "",
					hoverColor: "#FFF",
				},
				largeItemTitleColor: {
					...largeItemTitleColor,
					color: "#FFF",
				},
				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Desktop: 16,
					},
				},
				// titleLineHeight: {
				// 	...titleLineHeight,
				// 	device: {
				// 		...titleLineHeight.device,
				// 		Desktop: 21,
				// 		Mobile: 20,
				// 	},
				// },
				// titleTypography: {
				// 	...titleTypography,
				// 	typography: {
				// 		...titleTypography.typography,
				// 		fontWeight: 400,
				// 		family: 'Inter',
				// 	},
				// },
				// largeItemTitleTypography: {
				// 	...largeItemTitleTypography,
				// 	typography: {
				// 		...largeItemTitleTypography.typography,
				// 		fontWeight: 500,
				// 		family: 'Inter',
				// 	},
				// },
				largeItemTitleFontSize: {
					...largeItemTitleFontSize,
					device: {
						...largeItemTitleFontSize.device,
						Desktop: 42,
						Tablet: 36,
						Mobile: 28,
					},
				},

				// largeItemTitleLineHeight: {
				// 	...largeItemTitleLineHeight,
				// 	device: {
				// 		...largeItemTitleLineHeight.device,
				// 		Desktop: 50,
				// 		Mobile: 40,
				// 	},

				// },
				// catTabCategoryBg: {
				// 	...catTabCategoryBg,
				// 	color: {
				// 		...catTabCategoryBg.color,
				// 		solidColor: '#FFFFFF',
				// 	},
				// 	hover: {
				// 		...catTabCategoryBg.hover,
				// 		solidColor: '#EF5D30',
				// 	},
				// },
				catTabCategoryColor: {
					...catTabCategoryColor,
					color: "#222222",
					hoverColor: "#FFFFFF",
				},
				// catTabCategoryBg: {
				// 	...catTabCategoryBg,
				// 	color: {
				// 		...catTabCategoryBg.color,
				// 		style: 'bgColor',
				// 		solidColor: '',
				// 	},
				// 	hover: {
				// 		...catTabCategoryBg.hover,
				// 		style: 'bgColor',
				// 		solidColor: '',
				// 	},
				// },
				// catTabCategoryColor: {
				// 	...catTabCategoryColor,
				// 	color: '',
				// 	hoverColor: '',
				// },
				// metaColors: {
				// 	...metaColors,
				// 	color: '#ffffff',
				// },
				// metaTypography: {
				// 	...metaTypography,
				// 	typography: {
				// 		...metaTypography.typography,
				// 		fontWeight: 400,
				// 		family: 'Inter',
				// 	},
				// },
				carouselArrowSize: {
					...carouselArrowSize,
					device: {
						...carouselArrowSize.device,
						Desktop: 16,
					},
				},

				carouselArrowWidth: {
					...carouselArrowWidth,
					device: {
						...carouselArrowWidth.device,
						Desktop: 36,
						Tablet: 36,
						Mobile: 36,
					},
				},
				carouselArrowHeight: {
					...carouselArrowHeight,
					device: {
						...carouselArrowHeight.device,
						Desktop: 36,
						Tablet: 36,
						Mobile: 36,
					},
				},
				carouselArrowSpaceBetween: {
					...carouselArrowSpaceBetween,
					device: {
						...carouselArrowSpaceBetween.device,
						Desktop: "",
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
					},
				},
				carouselArrowBorderRadius: {
					...carouselArrowBorderRadius,
					device: {
						...carouselArrowBorderRadius.device,
						[deviceType]: {
							top: "",
							right: "",
							bottom: "",
							left: "",
						},
					},
				},
				carouselArrowBgColor: {
					...carouselArrowBgColor,
					color: "",
				},
				carouselArrowBorder: {
					...carouselArrowBorder,
					color: "#FFF",
				},
				contentVerticalPosition: "top",
				imageHoverEffect: "normal",
				carouselNavArrow: false,
				thumbnailItemsToShow: {
					...thumbnailItemsToShow,
					device: {
						Desktop: 3,
						Tablet: 3,
						Mobile: 3,
					},
				},
				infiniteLoop: false,
			});
		}
	}, []);

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType, attributes]
	);

	useEffect(() => {
		setAttributes({ blockLayoutName: thumbnailSliderTwoLayout });
	}, [blockName, thumbnailSliderTwoLayout]);

	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

	useEffect(() => {
		setPostSliderKey(Math.floor(Math.random() * 100));
	}, [
		thumbnailTwoAnimationEffect,
		blockName,
		carouselAutoPlay,
		thumbnailProgressPosition,
		thumbnailSliderTwoLayout,
		posts,
		carouselNavArrow,
	]);

	// const {
	// 	Desktop: desktopGap,
	// 	Tablet: tabletGap,
	// 	Mobile: mobileGap,
	// } = postThumbnailGap.device;

	const { Desktop: desktopScroll, Tablet: tabletScroll, Mobile: mobileScroll } = thumbnailTwoSlideToScroll.device;

	const thumbOption = {
		loop: infiniteLoop ? true : false,
		spaceBetween: thumbsGap(thumbnailSliderTwoLayout),
		freeMode: true,
		watchSlidesProgress: true,
		touchStartPreventDefault: false,
		initialSlide: 0,
		direction:
			!["thumbnail-slider-two-layout-one", "thumbnail-slider-two-layout-three"].includes(
				thumbnailSliderTwoLayout
			) && ["left", "right"].includes(thumbnailTwoPosition)
				? "vertical"
				: "horizontal",
		slideToClickedSlide: true,
		speed: carouselSpeed?.value,
		breakpoints: {
			0: {
				slidesPerView: thumbnailItemsToShow?.device?.Mobile,
				slidesPerGroup: mobileScroll > 1 ? parseInt(mobileScroll) : parseInt(desktopScroll),
			},
			[parseInt(globalBreakPointData.mobile) + 1]: {
				slidesPerView: thumbnailItemsToShow?.device?.Tablet,
				slidesPerGroup: tabletScroll > 1 ? parseInt(tabletScroll) : parseInt(desktopScroll),
			},
			[parseInt(globalBreakPointData.tablet) + 1]: {
				slidesPerView: thumbnailItemsToShow?.device?.Desktop,
				slidesPerGroup: parseInt(desktopScroll) || 1,
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
		loop: infiniteLoop ? true : false,
		slidesPerGroup: Math.min(thumbnailsSlidePerGroups || 1, 10),
		speed: carouselSpeed?.value,
		autoplay: carouselAutoPlay
			? {
					delay: carouselAutoPlayDelay?.value || 3000,
					disableOnInteraction: false,
					pauseOnMouseEnter: carouselPauseOnHover,
					reverseDirection: carouselDirection === "left_to_right",
				}
			: false,
		effect: thumbnailTwoAnimationEffect,
		cubeEffect:
			thumbnailTwoAnimationEffect === "cube"
				? {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					}
				: undefined,
		coverflowEffect:
			thumbnailTwoAnimationEffect === "coverflow"
				? {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true,
					}
				: undefined,
		keyboard: thumbnailTwoTabKeyNavigation
			? {
					enabled: true,
					onlyInViewport: true,
				}
			: false,
		mousewheel: thumbnailTwoMouseWheelControl || false,
		autoHeight: !!thumbnailTwoAdaptiveHeight,
		freeMode: !!thumbnailTwoFreeScrollMode,
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

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>
			<TogglePanelBodyProvider>
				<InspectorControl
					RightIcon={panelBodyRightIcon}
					Inspector={Inspect}
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

export default compose(addInitialAttr)(PostThumbnailTwoEdit);
