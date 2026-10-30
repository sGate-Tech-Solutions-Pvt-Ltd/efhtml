import { useEffect, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { useDeviceType } from "../../controls/controls";
import { EditorWrapper } from "../shared/wrapper";
import Render from "./render";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const GridTwoEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const { blockName, contentAreaBg, fontListsEditPage, smallItemHeight, contentAreaPadding, customCss } = attributes;

	const blockProps = useBlockProps();

	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				// align: 'wide',
				// Set default attributes value for this block.
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
				smallItemHeight: {
					...smallItemHeight,
					device: {
						...smallItemHeight.device,
						Desktop: 260,
						Tablet: 210,
						Mobile: 210,
					},
				},
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 0,
							right: 20,
							bottom: 20,
							left: 20,
						},
					},
				},
				// paginationMargin: {
				// 	...paginationMargin,
				// 	device: {
				// 		...paginationMargin.device,
				// 		Desktop: {
				// 			...paginationMargin.device.Desktop,
				// 			top: 48,
				// 		},
				// 		Tablet: {
				// 			...paginationMargin.device.Tablet,
				// 			top: 30,
				// 		},
				// 		Mobile: {
				// 			...paginationMargin.device.Mobile,
				// 			top: 30,
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
				<EditorWrapper setPosts={setPosts} setAttributes={setAttributes}>
					<Render posts={posts} attributes={attributes} page={"editor"} />
				</EditorWrapper>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(GridTwoEdit);
