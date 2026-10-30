import { useEffect, useRef, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { inArray, useDeviceType } from "../../controls/controls";
import { EditorWrapper } from "../shared/wrapper";
import Render from "./render";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const GridThreeEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		contentAreaBg,
		postGridLayout,
		gridThreeColumns,
		fontListsEditPage,
		largeItemHeight,
		smallItemHeight,
		customCss,
	} = attributes;

	const blockProps = useBlockProps();

	const firstLoad = useRef(true);
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				// align: 'wide',
				// Set default attributes value for this block.
				postLimit: 5,
				// excerptColor: { ...excerptColor, color: '#EEEEEE' },
				contentHorizontalPosition: "left",
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "transparent",
					},
				},
				// titleColor: { ...titleColor, color: '#ffffff' },
				// metaColors: { ...metaColors, color: '#ffffff' },
				showReadMoreButton: false,
				imagePosition: "background",
				imageOverlayColor: "default",
				contentVerticalPosition: "bottom",
				gridThreeColumns: {
					...gridThreeColumns,
					device: {
						...gridThreeColumns.device,
						[deviceType]: "",
					},
				},
				largeItemHeight: {
					...largeItemHeight,
					device: {
						...largeItemHeight.device,
						Desktop: "372",
					},
				},
				smallItemHeight: {
					...smallItemHeight,
					device: {
						...smallItemHeight.device,
						Desktop: 244,
						Mobile: 210,
					},
				},
				// paginationMargin: {
				// 	...paginationMargin,
				// 	device: {
				// 		...paginationMargin.device,
				// 		Desktop: {
				// 			...paginationMargin.device.Desktop,
				// 			top: '36',
				// 		},
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
				// catTabCategoryColor: {
				// 	...catTabCategoryColor,
				// 	color: '#222222',
				// 	hoverColor: '#FFFFFF',
				// },
				// titleFontSize: {
				// 	...titleFontSize,
				// 	device: {
				// 		...titleFontSize.device,
				// 		Tablet: 22,
				// 		Mobile: 18,
				// 	},
				// },
			});
		}
	}, []);

	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false;
		} else {
			if (inArray(["grid-three-layout-five"], postGridLayout)) {
				setAttributes({ equalHeightEnable: false });
			}
			setAttributes({ blockLayoutName: postGridLayout });
		}
	}, [blockName, postGridLayout]);

	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType, attributes]
	);

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

export default compose(addInitialAttr)(GridThreeEdit);
