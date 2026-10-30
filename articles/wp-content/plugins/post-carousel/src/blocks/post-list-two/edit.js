import { useEffect, useMemo, useRef, useState } from "@wordpress/element";
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
const ListTwoEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		postListLayout,
		contentAreaBg,
		postCardBg,
		customCss,
		fontListsEditPage,
		titleFontSize,
		largeItemHeight,
		contentAreaPadding,
		imageHeight,
	} = attributes;
	const blockProps = useBlockProps();
	const reloadRef = useRef(true);
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				largeItemTitleColor: {
					color: "",
					hover: "",
				},
				largeMetaColors: {
					color: "",
					hoverColor: "",
				},
				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Desktop: "",
					},
				},
				contentVerticalPosition: "bottom",
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: 12,
							right: 0,
							bottom: 0,
							left: 0,
						},
					},
				},
				// align: 'wide',
				imagePosition: "left",
				imageSize: "smart-post-landscape",
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg?.color,
						style: "",
						solidColor: "",
					},
					hover: {
						...contentAreaBg?.hover,
						style: "",
						solidColor: "",
					},
				},
				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg?.color,
						style: "",
						solidColor: "",
					},
					hover: {
						...postCardBg?.hover,
						style: "",
						solidColor: "",
					},
				},
				largeItemHeight: {
					...largeItemHeight,
					device: {
						...largeItemHeight.device,
						Desktop: 480,
					},
				},
				// imageWidth: {
				// 	...imageWidth,
				// 	device: {
				// 		...imageWidth.device,
				// 		Desktop: 364,
				// 	},
				// 	unit: {
				// 		...imageWidth.unit,
				// 		Desktop: "px",
				// 	},
				// },
				imageHeight: {
					...imageHeight,
					device: {
						...imageHeight.device,
						Desktop: 244,
					},
				},
				imageOverlayColor: "custom",
				socialPopupShareColor: {
					color: "",
					hoverColor: "",
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
		if (reloadRef.current) {
			reloadRef.current = false;
		} else {
			setAttributes({
				contentOrientation: postListLayout,
			});
		}
	}, [postListLayout]);

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

export default compose(addInitialAttr)(ListTwoEdit);
