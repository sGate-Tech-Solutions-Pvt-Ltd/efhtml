import { useEffect, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { EditorWrapper } from "../shared/wrapper";
import Render from "./render";
import { useDeviceType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const GridFourEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		postCardBg,
		fontListsEditPage,
		contentAreaPadding,
		largeItemHeight,
		smallItemHeight,
		largeItemTitleFontSize,
		customCss,
	} = attributes;

	const blockProps = useBlockProps();
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				postLimit: 5,
				imagePosition: "background",
				postCardBg: {
					...postCardBg,
					color: { ...postCardBg.color, style: "transparent" },
				},
				imageOverlayColor: "default",
				// titleColor: { ...titleColor, color: '#FFFFFF' },
				// metaColors: { ...metaColors, color: '#FFFFFF' },
				// excerptColor: { ...excerptColor, color: '#EEEEEE' },
				contentVerticalPosition: "bottom",
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
				largeItemHeight: {
					...largeItemHeight,
					device: {
						...largeItemHeight.device,
						Desktop: "560",
					},
				},
				smallItemHeight: {
					...smallItemHeight,
					device: {
						...smallItemHeight.device,
						Desktop: 275,
						Mobile: 210,
					},
				},
				// titleFontSize: {
				// 	...titleFontSize,
				// 	device: {
				// 		...titleFontSize.device,
				// 		Desktop: 22,
				// 		Tablet: 18,
				// 		Mobile: 22,
				// 	},
				// },
				largeItemTitleFontSize: {
					...largeItemTitleFontSize,
					device: {
						...largeItemTitleFontSize.device,
						Mobile: 22,
					},
				},
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

	// useEffect( () => {
	// 	if ( gridFourMasonryEnable ) {
	// 		setAttributes( { equalHeightEnable: false } );
	// 	}
	// }, [ gridFourMasonryEnable ] );

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

export default compose(addInitialAttr)(GridFourEdit);
