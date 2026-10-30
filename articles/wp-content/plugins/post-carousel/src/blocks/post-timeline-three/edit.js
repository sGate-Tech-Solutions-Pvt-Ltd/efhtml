import { useEffect, useState, useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { EditorWrapper } from "../shared/wrapper";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspect";
import Render from "./render";
import { useDeviceType, paginationDotType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { useSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const TimelineThreeEdit = ({ attributes, setAttributes, isSelected }) => {
	const {
		postCardBg,
		contentAreaBg,
		fontListsEditPage,
		timelineIndicatorColor,
		timelineConnectorBorder,
		imageSpace,
		contentAreaPadding,
		gapBetweenPosts,
		postCardBoxShadow,
		postCardHoverBoxShadow,
		imageHeight,
		carouselArrowHorizontal,
		carouselGap,
		customCss,
		carouselStyle,
		carouselColumn,
		uniqueId,
		carouselPaginationStyle,
		postTimelineAutoPlayDelay,
		carouselPauseOnHover,
		carouselDirection,
		postTimelineAutoPlay,
		carouselSpeed,
		postTimelineTickerSpeed,
		timelineLayout,
		postLimit,
	} = attributes;
	const blockProps = useBlockProps();
	const deviceType = useDeviceType();
	const { blockName } = attributes;
	const [posts, setPosts] = useState([]);

	// Get global breakpoint data from the store and set to attributes.
	const getGlobalBreakpoint = useSelect(
		(select) => select("smartpost/global-settings").getCategory("breakpoint"),
		[]
	);
	useEffect(() => {
		if (typeof getGlobalBreakpoint === "object") {
			setAttributes({ globalBreakPointData: getGlobalBreakpoint });
		}
	}, [getGlobalBreakpoint]);

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				timelineLayout: "timeline-three-layout-one",
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
				timelineIndicatorColor: {
					...timelineIndicatorColor,
					color: "var(--smart-post-secondary)",
				},
				timelineConnectorBorder: {
					...timelineConnectorBorder,
					color: "var(--smart-post-secondary)",
				},
				imageSpace: {
					...imageSpace,
					device: {
						...imageSpace.device,
						Desktop: 12,
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: 0,
							right: 20,
							bottom: 15,
							left: 20,
						},
						Tablet: {
							...contentAreaPadding.device.Tablet,
							top: 0,
							right: 20,
							bottom: 15,
							left: 20,
						},
					},
				},
				carouselGap: {
					...carouselGap,
					device: {
						...carouselGap.device,
						Desktop: 32,
					},
				},
				postCardBoxShadowEnable: true,
				postCardHoverBoxShadowEnable: true,
				postCardBoxShadow: {
					...postCardBoxShadow,
					device: {
						...postCardBoxShadow.device,
						Desktop: {
							top: 0,
							right: 8,
							bottom: 10,
							left: 0,
						},
					},
					selectDefault: "var(--smart-post-shadow-medium-4dp)",
					color: "#0000001A",
				},
				postCardHoverBoxShadow: {
					...postCardHoverBoxShadow,
					device: {
						...postCardHoverBoxShadow.device,
						Desktop: {
							top: 0,
							right: 8,
							bottom: 10,
							left: 0,
						},
					},
					selectDefault: "var(--smart-post-shadow-medium-4dp)",
					color: "#0000001A",
				},
				imageSize: "smart-post-landscape",
				imageHeight: {
					...imageHeight,
					device: {
						...imageHeight?.device,
						Desktop: 310,
					},
				},
				carouselArrowHorizontal: {
					...carouselArrowHorizontal,
					device: {
						...carouselArrowHorizontal.device,
						Desktop: -10,
						Tablet: "",
						Mobile: "",
					},
				},
				socialPopupShareColor: {
					color: "",
					hoverColor: "",
				},
			});
		}
	}, []);
	const desktopGap = carouselGap?.device?.Desktop ? carouselGap?.device?.Desktop.toString() : "0";
	const tabletGap = carouselGap?.device?.Tablet ? carouselGap?.device?.Tablet.toString() : desktopGap;
	const mobileGap = carouselGap?.device?.Mobile ? carouselGap?.device?.Mobile.toString() : desktopGap;
	// const {
	// 	Desktop: desktopScroll,
	// 	Tablet: tabletScroll,
	// 	Mobile: mobileScroll,
	// } = slideToScroll.device;
	let swiperOptions = {};
	if (carouselStyle !== "ticker") {
		swiperOptions = {
			slidesPerView:
				carouselColumn.device?.[deviceType] > postLimit ? postLimit : carouselColumn.device?.[deviceType],
			// simulateTouch: true,
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
			loop: "timeline-three-layout-two" === timelineLayout ? false : true,
			slidesPerGroup: 1,
			autoplay: postTimelineAutoPlay
				? {
						delay: postTimelineAutoPlayDelay?.value,
						disableOnInteraction: false,
						pauseOnMouseEnter: carouselPauseOnHover,
						reverseDirection: carouselDirection === "left_to_right",
					}
				: false,

			speed: carouselSpeed?.value,
			spaceBetween: carouselGap.device?.[deviceType] || carouselGap.device?.Desktop || 0,
			breakpoints: {
				0: {
					slidesPerView:
						carouselColumn?.device?.Mobile > postLimit ? postLimit : carouselColumn?.device?.Mobile,
					spaceBetween: mobileGap ? mobileGap.toString() : desktopGap,
				},
				600: {
					slidesPerView:
						carouselColumn?.device?.Tablet > postLimit ? postLimit : carouselColumn?.device?.Tablet,
					spaceBetween: tabletGap ? tabletGap.toString() : desktopGap,
				},
				1024: {
					slidesPerView:
						carouselColumn?.device?.Desktop > postLimit ? postLimit : carouselColumn?.device?.Desktop,
					spaceBetween: desktopGap.toString() || "0",
				},
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			mousewheel: true,
			// autoHeight: carouselAdaptiveHeight ? true : false,
			// freeMode: carouselFreeScrollMode || false,
			direction: "horizontal",
		};
	} else {
		swiperOptions = {
			slidesPerView:
				carouselColumn?.device?.[deviceType] > postLimit ? postLimit : carouselColumn?.device?.[deviceType],
			slidesPerViewMobile:
				carouselColumn?.device?.Mobile > postLimit ? postLimit : carouselColumn?.device?.Mobile,
			slidesPerViewTable: carouselColumn?.device?.Tablet > postLimit ? postLimit : carouselColumn?.device?.Tablet,
			speed: postTimelineTickerSpeed?.value,
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
	// useEffect( () => {
	// 	setAttributes( {
	// 		dynamicCss: dynamicCssFn( attributes, 'frontend', setAttributes ),
	// 	} );
	// }, cssDependency(attributes));

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType]
	);

	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

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
					<Render posts={posts} attributes={attributes} page={"editor"} />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(TimelineThreeEdit);
