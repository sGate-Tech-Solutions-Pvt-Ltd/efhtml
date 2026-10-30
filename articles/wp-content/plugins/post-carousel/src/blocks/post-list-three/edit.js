import { useEffect, useRef, useState, useMemo } from "@wordpress/element";
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

const ListThreeEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		postListLayout,
		contentAreaBg,
		postCardBg,
		customCss,
		fontListsEditPage,
		imageSpace,
		contentAreaPadding,
		largeItemHeight,
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
				contentVerticalPosition: "bottom",
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							...contentAreaPadding.device.Desktop,
							top: 15,
							right: 0,
							bottom: 0,
							left: 0,
						},
					},
				},

				imageSpace: {
					...imageSpace,
					device: {
						...imageSpace.device,
						Desktop: 16,
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
						Desktop: 372,
					},
				},
				// imageWidth: {
				// 	...imageWidth,
				// 	device: {
				// 		...imageWidth.device,
				// 		Desktop: 240,
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
						Desktop: 161,
					},
					unit: {
						...imageHeight.unit,
						Desktop: "px",
					},
				},
				imageOverlay: "custom",
				socialPopupShareColor: {
					color: "",
					hoverColor: "",
				},
			});
		}
	}, []);

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

export default compose(addInitialAttr)(ListThreeEdit);
