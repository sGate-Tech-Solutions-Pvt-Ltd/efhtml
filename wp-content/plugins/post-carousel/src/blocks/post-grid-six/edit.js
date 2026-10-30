import { useEffect, useRef, useState, useMemo } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import Render from "./render";
import { EditorWrapper } from "../shared/wrapper";
import { useDeviceType } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import { cssDependency } from "../shared/cssDependency";
import { useSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const GridSixEdit = ({ attributes, setAttributes, isSelected }) => {
	const [posts, setPosts] = useState([]);
	const {
		blockName,
		postGridLayout,
		titleColor,
		largeItemTitleColor,
		metaColors,
		gridSixColumns,
		largeMetaColors,
		excerptColor,
		fontListsEditPage,
		titleFontSize,
		largeItemTitleFontSize,
		imageSpace,
		titleLength,
		imagePosition,
		readMoreButtonFontSize,
		readMoreButtonLineHeight,
		largeItemReadMoreButtonBorder,
		customCss,
		socialPopupShareColor,
		largeImageWidth,
	} = attributes;

	const blockProps = useBlockProps();
	const firstLoad = useRef(true);
	const deviceType = useDeviceType();
	const [horizontalImagePosition, setHorizontalImagePosition] = useState("left");

	useEffect(() => {
		if (!blockName) {
			setAttributes({
				// align: 'wide',
				// Set default attributes value for this block.
				// postLimit: 7,
				excerptShow: true,
				showReadMoreButton: true,
				catTabCategoryEnable: true,
				imageOverlayColor: "default",
				titleColor: { ...titleColor, color: "" },
				metaColors: { ...metaColors, color: "" },
				largeMetaColors: { ...largeMetaColors, color: "" },
				gridSixColumns: {
					...gridSixColumns,
					device: {
						...gridSixColumns.device,
						Desktop: "",
					},
				},
				largeItemTitleColor: {
					...largeItemTitleColor,
					color: "",
				},
				excerptColor: { ...excerptColor, color: "" },
				imageSize: "smart-post-landscape",
				largeImageWidth: {
					...largeImageWidth,
					device: {
						...largeImageWidth.device,
						Desktop: "",
					},
					unit: {
						...largeImageWidth.unit,
						Desktop: "%",
					},
				},
				titleFontSize: {
					...titleFontSize,
					device: {
						...titleFontSize.device,
						Desktop: 22,
						Tablet: 18,
						Mobile: 22,
					},
				},
				titleLength: {
					...titleLength,
					value: 6,
				},
				largeItemTitleFontSize: {
					...largeItemTitleFontSize,
					device: {
						...largeItemTitleFontSize.device,
						Desktop: 32,
						Tablet: 26,
						Mobile: 22,
					},
				},
				imageSpace: {
					...imageSpace,
					device: {
						...imageSpace.device,
						Desktop: 24,
						Tablet: 20,
					},
				},

				smallItemContentAlignment: "start",
				contentVerticalPosition: "bottom",

				readMoreButtonFontSize: {
					...readMoreButtonFontSize,
					device: {
						...readMoreButtonFontSize.device,
						Desktop: 14,
					},
				},
				readMoreButtonLineHeight: {
					...readMoreButtonLineHeight,
					device: {
						...readMoreButtonLineHeight.device,
						Desktop: 150,
					},
					unit: {
						...readMoreButtonLineHeight.unit,
						Desktop: "%",
					},
				},
				largeItemReadMoreButtonBorder: {
					...largeItemReadMoreButtonBorder,
					style: "solid",
					color: "",
				},
				socialPopupShareColor: {
					...socialPopupShareColor,
					color: "",
				},
			});
		}
	}, []);

	// useEffect(() => {
	// 	setAttributes({
	// 		dynamicCss: dynamicCssFn(attributes, 'frontend', setAttributes),
	// 	});
	// }, cssDependency(attributes));
	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", deviceType),
		[...cssDependency(attributes), deviceType, attributes]
	);
	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false;
		} else {
			setAttributes({
				contentOrientation: postGridLayout,
				blockLayoutName: postGridLayout,
			});
			const defaultOption = {
				"grid-six-layout-one": {
					imagePosition: horizontalImagePosition,
				},
				"grid-six-layout-two": {
					imagePosition: horizontalImagePosition,
				},
				"grid-six-layout-three": {
					imagePosition: "top",
				},
				"grid-six-layout-four": {
					imagePosition: "left",
				},
			};
			// Set attributes for grid-six-layout-four
			if (defaultOption[postGridLayout]) {
				const data = defaultOption[postGridLayout];
				setAttributes(data);
			}
		}
	}, [blockName, postGridLayout]);

	useEffect(() => {
		if (["grid-six-layout-one", "grid-six-layout-two"].includes(postGridLayout)) {
			const imgPositionValue = imagePosition;
			setHorizontalImagePosition(imgPositionValue);
		}
	}, [imagePosition]);

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

export default compose(addInitialAttr)(GridSixEdit);
