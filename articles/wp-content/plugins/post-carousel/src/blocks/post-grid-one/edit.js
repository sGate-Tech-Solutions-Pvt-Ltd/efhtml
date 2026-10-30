import { useEffect, useState, useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import Render from "./render";
import { EditorWrapper } from "../shared/wrapper";
import { useDeviceType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const GridOneEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		contentAreaBg,
		// gridOneMasonryEnable,
		postCardBg,
		fontListsEditPage,
		postGridLayout,
		imageHeight,
		titleFontSize,
		largeItemTitleFontSize,
		contentAreaPadding,
		customCss,
		socialPopupShareColor,
	} = attributes;

	const blockProps = useBlockProps();
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				contentAreaBg: {
					...contentAreaBg,
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
				imageSize: "smart-post-landscape",
				imageHeight: {
					...imageHeight,
					device: {
						...imageHeight.device,
						Desktop: 244,
					},
				},
				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Tablet: 18,
						Mobile: 18,
					},
				},
				largeItemTitleFontSize: {
					...largeItemTitleFontSize,
					device: {
						...largeItemTitleFontSize.device,
						Tablet: 22,
						Mobile: 22,
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						},
						Tablet: {
							...contentAreaPadding.device.Desktop,
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						},
						Mobile: {
							...contentAreaPadding.device.Desktop,
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
						},
					},
				},
				socialPopupShareColor: {
					...socialPopupShareColor,
					color: "#333",
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

	useEffect(() => {
		setAttributes({ blockLayoutName: postGridLayout });
	}, [postGridLayout]);

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
					<Render posts={posts} attributes={attributes} page={"editor"} />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(GridOneEdit);
