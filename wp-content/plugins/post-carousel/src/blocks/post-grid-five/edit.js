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
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const GridFiveEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		contentAreaBg,
		fontListsEditPage,
		contentAreaPadding,
		largeItemHeight,
		smallItemHeight,
		customCss,
	} = attributes;

	const blockProps = useBlockProps();
	const deviceType = useDeviceType();

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				imagePosition: "background",
				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						style: "transparent",
					},
				},
				imageOverlayColor: "default",
				// titleColor: { ...titleColor, color: '#ffffff' },
				// metaColors: { ...metaColors, color: '#BCBBBB' },
				// excerptColor: { ...excerptColor, color: '#EEEEEE' },
				showReadMoreButton: false,
				contentVerticalPosition: "bottom",
				excerptShow: false,
				// catTabCategoryEnable: false,
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
						Desktop: 660,
						Tablet: 500,
						Mobile: "",
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
				// 		Mobile: 22,
				// 	},
				// },
				// largeItemTitleFontSize: {
				// 	...largeItemTitleFontSize,
				// 	device: {
				// 		...largeItemTitleFontSize.device,
				// 		Mobile: 22,
				// 	},
				// },
				postLimit: 3,
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

	const blockStyling = useMemo(() => dynamicCssFn(attributes, "frontend", deviceType), [attributes, deviceType]);
	useEffect(() => {
		setAttributes({ currentScreen: deviceType });
	}, [deviceType]);

	// useEffect( () => {
	// 	if ( gridFiveMasonryEnable ) {
	// 		setAttributes( { equalHeightEnable: false } );
	// 	}
	// }, [ gridFiveMasonryEnable ] );

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

export default compose(addInitialAttr)(GridFiveEdit);
