import { useEffect, useMemo } from "@wordpress/element";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { jsonStringify } from "../shared/helpFn";
import { googleFonts, useDeviceType } from "../../controls/controls";
import { dispatch, select, useSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
import { TogglePanelBodyProvider } from "../../context";
import Render from "./Render";
import useMetaData from "../../hooks/useMetaData";
import useUpdateParentAttributes from "../../hooks/updateParentAttr";
const Edit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const {
		customCss,
		uniqueId,
		fieldAlignment,
		titleTypography,
		optionTypography,
		additionalCssClass,
		titleGlobalTypography,
		optionGlobalTypography,
		layout,
		blockName,
		headingTypography,
		menuTypography,
		multipleFilterRelation
	} = attributes;

	useUpdateParentAttributes(
		clientId,
		multipleFilterRelation
	);

	const innerBlocks = select("core/block-editor").getBlocks(clientId);
	const { allTaxonomies } = useMetaData(attributes, "editSite");

	// Get the count
	const innerBlocksWidth = innerBlocks.length > 3 ? "sp-width-33" : "";

	const currentDevice = useDeviceType();

	useEffect(() => {
		setAttributes({
			innerBlockLength: innerBlocks.length,
		});
	}, [innerBlocks.length]);

	const blockProps = useBlockProps({
		className: additionalCssClass,
	});

	const parentBlock = useSelect((select) => {
		return select("core/block-editor").getBlock(clientId);
	}, []);

	useEffect(() => {
		if (!isSelected) {
			return;
		}
		parentBlock.innerBlocks.forEach((innerBlock) => {
			dispatch("core/block-editor").updateBlockAttributes(innerBlock.clientId, {
				titleGlobalTypography,
				optionGlobalTypography,
			});
		});
	}, [parentBlock.innerBlocks, isSelected, titleGlobalTypography, optionGlobalTypography]);

	const googleFontLists = [titleTypography, optionTypography, headingTypography, menuTypography];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
		});
	}, googleFontLists);

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", currentDevice),
		[attributes, currentDevice]
	);

	attributes.allTaxonomies = allTaxonomies;

	return (
		<div {...blockProps}>
			<TogglePanelBodyProvider blockName={blockName}>
				<style>
					{googleFonts(googleFontLists)}
					{/* {dynamicCss(attributes)} */}
					{blockStyling}
					{customCss}
				</style>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					Inspector={Inspector}
					attributes={attributes}
					setAttributes={setAttributes}
				/>

				<div
					id={uniqueId}
					className={`sp-smart-post-wrapper sp-smart-${fieldAlignment} ${innerBlocksWidth} ${layout}`}
				>
					<div className="sp-smart-post-live-filter-parent">
						{layout === "layoutOne" ? (
							<InnerBlocks
								allowedBlocks={[
									"sp-smart-post-show/taxonomy-filter",
									"sp-smart-post-show/sort-filter",
									"sp-smart-post-show/search-filter",
									"sp-smart-post-show/author-filter",
								]}
								template={[
									["sp-smart-post-show/taxonomy-filter"],
									["sp-smart-post-show/author-filter"],
								]}
							/>
						) : (
							<Render attributes={attributes} />
						)}
					</div>
				</div>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(Edit);
