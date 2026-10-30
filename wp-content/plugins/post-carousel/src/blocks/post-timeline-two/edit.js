import { useEffect, useState, useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
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

const TimelineTwoEdit = ({ attributes, setAttributes, isSelected }) => {
	const { blockName, fontListsEditPage, gapBetweenPosts, contentAreaPadding, smallItemHeight, customCss } =
		attributes;
	const blockProps = useBlockProps();
	const [posts, setPosts] = useState([]);
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				timelineLayout: "timeline-one-layout-one",
				imageOverlayColor: "default",
				gapBetweenPosts: {
					...gapBetweenPosts,
					device: { ...gapBetweenPosts.device, Desktop: 32 },
				},
				imagePosition: "background",
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: "0",
							right: "20",
							bottom: "20",
							left: "20",
						},
					},
				},
				smallItemHeight: {
					...smallItemHeight,
					device: {
						...smallItemHeight.device,
						Desktop: 372,
						Tablet: 210,
					},
				},

				contentVerticalPosition: "bottom",
			});
		}
	}, []);

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType, attributes]
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

export default compose(addInitialAttr)(TimelineTwoEdit);
