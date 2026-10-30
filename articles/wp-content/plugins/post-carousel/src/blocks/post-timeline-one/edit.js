import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { EditorWrapper } from "../shared/wrapper";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspect";
import Render from "./render";
import { useDeviceType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const TimelineOneEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		contentAreaBg,
		postCardBg,
		fontListsEditPage,
		gapBetweenPosts,
		imageSpace,
		contentAreaPadding,
		postCardBoxShadow,
		postCardHoverBoxShadow,
		imageHeight,
		customCss,
	} = attributes;

	const blockProps = useBlockProps();
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				timelineLayout: "timeline-one-layout-one",
				gapBetweenPosts: {
					...gapBetweenPosts,
					device: { ...gapBetweenPosts.device, Desktop: 20 },
				},
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg?.color,
						style: "",
					},
					hover: {
						...contentAreaBg?.hover,
						style: "",
					},
				},
				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg?.color,
						style: "",
					},
					hover: {
						...postCardBg?.hover,
						style: "",
					},
				},
				imageSpace: {
					...imageSpace,
					device: {
						...imageSpace.device,
						Desktop: 16,
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: "0",
							right: "20",
							bottom: "15",
							left: "20",
						},
						Tablet: {
							...contentAreaPadding.device.Tablet,
							top: "0",
							right: "20",
							bottom: "15",
							left: "20",
						},
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
							right: 0,
							bottom: 20,
							left: 0,
						},
					},
					color: "#0000001A",
				},
				postCardHoverBoxShadow: {
					...postCardHoverBoxShadow,
					device: {
						...postCardHoverBoxShadow.device,
						Desktop: {
							top: 0,
							right: 0,
							bottom: 20,
							left: 0,
						},
					},
					color: "#0000001A",
				},
				imageSize: "smart-post-landscape",
				imageHeight: {
					...imageHeight,
					device: {
						...imageHeight?.device,
						Desktop: 310,
						Tablet: 210,
						Mobile: 210,
					},
				},
			});
		}
	}, []);

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

export default compose(addInitialAttr)(TimelineOneEdit);
