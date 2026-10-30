import { useEffect, useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspector";
import { TogglePanelBodyProvider } from "../../context";
import TocRender from "./RenderToc";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
import { jsonStringify } from "../shared/helpFn";
import { googleFonts } from "../../controls/controls";
const TableOfContent = (props) => {
	const { attributes, setAttributes } = props;
	const {
		blockName,
		uniqueId,
		fontListsEditPage,
		additionalCssClass,
		customCss,
		contentTypography,
		headingTypography,
		listTypography,
		collapseTypography,
	} = attributes;
	const blockStyling = useMemo(() => dynamicCssFn(attributes), [attributes]);

	const googleFontLists = [contentTypography, headingTypography, listTypography, collapseTypography];

	const googleFontListsEditor = useMemo(() => googleFonts(googleFontLists), googleFontLists);

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFontListsEditor,
		});
	}, googleFontLists);

	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>
			<TogglePanelBodyProvider blockName={blockName}>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					Inspector={Inspector}
					attributes={attributes}
					setAttributes={setAttributes}
				/>

				<div
					id={uniqueId}
					className={`sp-table-of-content-toc ${additionalCssClass ? additionalCssClass : ""}`}
				>
					<TocRender setAttributes={setAttributes} attributes={attributes} />
				</div>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(TableOfContent);
