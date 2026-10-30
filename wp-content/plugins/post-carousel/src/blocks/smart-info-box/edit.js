import { useEffect, useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { getBlockShortName, jsonStringify } from "../shared/helpFn";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { googleFonts } from "../../controls/controls";
import { TogglePanelBodyProvider } from "../../context";
import EditHtml from "./editHtml";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
import dynamicDependency from "./infoBoxDependency";

const SmartInfoBoxEdit = ({ attributes, setAttributes, clientId, name }) => {
	const {
		ratingTypography,
		titleTypography,
		subTitleTypography,
		descriptionTypography,
		badgeTypography,
		additionalCssClass,
		blockName,
	} = attributes;

	const googleFontLists = [
		ratingTypography,
		titleTypography,
		subTitleTypography,
		descriptionTypography,
		badgeTypography,
	];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
		});
	}, googleFontLists);

	const blockProps = useBlockProps({
		className: additionalCssClass,
	});

	const googleFontListsEditor = useMemo(() => googleFonts(googleFontLists), googleFontLists);

	const blockStyling = useMemo(() => {
		return dynamicCssFn(attributes, "frontend");
	}, dynamicDependency(attributes));

	// BlockName init
	useEffect(() => {
		if (!blockName) {
			setAttributes({ blockName: getBlockShortName(name) });
		}
	}, []);

	useEffect(() => {
		setAttributes({
			uniqueId: `sp-smart-post-smart-list-${clientId?.split("-").pop()}`,
		});
	}, [clientId]);

	return (
		<div {...blockProps}>
			<style>
				{googleFontListsEditor}
				{blockStyling}
			</style>

			<TogglePanelBodyProvider>
				<InspectorControl Inspector={Inspector} attributes={attributes} setAttributes={setAttributes} />

				<EditHtml attributes={attributes} setAttributes={setAttributes} />
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(SmartInfoBoxEdit);
