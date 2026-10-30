import { useEffect, useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import Inspector from "./inspect";
import dynamicCss from "./dynamicCss";
import { jsonStringify } from "../shared/helpFn";
import Pagination from "../shared/templates/templates-parts/pagination";
import { googleFonts, useDeviceType } from "../../controls/controls";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const PaginationEdit = ({ attributes, setAttributes }) => {
	const { customCss, uniqueId, paginationTypography, additionalCssClass } = attributes;

	const blockProps = useBlockProps({
		className: additionalCssClass,
	});

	const deviceType = useDeviceType();
	const googleFontLists = [paginationTypography];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
		});
	}, googleFontLists);

	const blockStyling = useMemo(() => dynamicCss(attributes, "frontend", deviceType), [attributes, deviceType]);
	return (
		<div {...blockProps}>
			<style>
				{googleFonts(googleFontLists)}
				{blockStyling}
				{customCss}
			</style>
			<InspectorControl
				// TitleIcon={ panelBodyTitleIcon }
				// RightIcon={ panelBodyRightIcon }
				Inspector={Inspector}
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<div id={uniqueId}>
				<Pagination attributes={attributes} />
			</div>
		</div>
	);
};

export default compose(addInitialAttr)(PaginationEdit);
