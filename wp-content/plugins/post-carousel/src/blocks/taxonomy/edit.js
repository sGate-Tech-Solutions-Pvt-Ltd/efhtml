import { useEffect, useMemo } from "@wordpress/element";
import { jsonStringify } from "../shared/helpFn";
import { useBlockProps } from "@wordpress/block-editor";
import { InspectorControl } from "../../components";
import Inspector from "./inspect";
import { TogglePanelBodyProvider } from "../../context";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import Render from "./Render";
import dynamicCssFn from "./dynamicCss";
import { googleFonts, useDeviceType } from "../../controls/controls";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
const TaxonomyEdit = ({ attributes, setAttributes }) => {
	const currentDevice = useDeviceType();
	const blockProps = useBlockProps();
	const { blockName, uniqueId, additionalCssClass, equalHeightEnable, titleTypography, fontListsEditPage } =
		attributes;

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", currentDevice),
		[attributes, currentDevice]
	);

	const googleFontLists = [titleTypography];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists),
		});
	}, googleFontLists);

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
			</style>
			<TogglePanelBodyProvider>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					attributes={attributes}
					setAttributes={setAttributes}
					Inspector={Inspector}
				/>

				<div
					id={uniqueId}
					className={`sp-smart-post-wrapper ${additionalCssClass} sp-smart-${blockName}-editor-page sp-smart-post-${blockName} ${
						equalHeightEnable ? "sp-smart-post-show-equal-height" : ""
					}`}
				>
					<Render attributes={attributes} />
				</div>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(TaxonomyEdit);
