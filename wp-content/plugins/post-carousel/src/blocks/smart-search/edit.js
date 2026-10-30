import { useBlockProps } from "@wordpress/block-editor";
import { InspectorControl } from "../../components";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import Render from "./render";
import dynamicCss from "./dynamicCss";
import { Inspector } from "./inspector";
import { TogglePanelBodyProvider } from "../../context";
import { useEffect, useMemo } from "@wordpress/element";
import classNames from "classnames";
import { googleFonts } from "../../controls/controls";
import { select } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
import { jsonStringify, ProTopBar } from "../shared/helpFn";

const SmartSearchEdit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	const {
		blockName,
		uniqueId,
		additionalCssClass,
		fontListsEditPage,
		inputPlaceholderTypography,
		inputPlaceHolderGlobalTypography,
		searchBtnLabelTypography,
		searchResultTitleTypography,
		searchResultMetaTypography,
		searchResultTitleGlobalTypography,
		searchResultMetaGlobalTypography,
		moreResultTypography,
		moreResultGlobalTypography,
		popupHeadingTypography,
		popupHeadingGlobalTypography,
	} = attributes;

	// set typography.
	const googleFontLists = [
		inputPlaceholderTypography,
		inputPlaceHolderGlobalTypography,
		searchBtnLabelTypography,
		searchResultTitleTypography,
		searchResultMetaTypography,
		searchResultTitleGlobalTypography,
		searchResultMetaGlobalTypography,
		moreResultTypography,
		moreResultGlobalTypography,
		popupHeadingTypography,
		popupHeadingGlobalTypography,
	];
	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists, "edit"),
		});
	}, googleFontLists);

	// set breakpoint
	const getGlobalBreakpoint = select("smartpost/global-settings").getCategory("breakpoint");
	useEffect(() => {
		if (typeof getGlobalBreakpoint === "object") {
			setAttributes({ globalBreakPointData: getGlobalBreakpoint });
		}
	}, [getGlobalBreakpoint]);

	const blockStyling = useMemo(() => dynamicCss(attributes, "frontend"), [attributes]);
	return (
		<div {...blockProps}>
			<style>{blockStyling}</style>
			<style>{fontListsEditPage}</style>
			<TogglePanelBodyProvider>
				<InspectorControl
					TitleIcon={panelBodyTitleIcon}
					RightIcon={panelBodyRightIcon}
					attributes={attributes}
					setAttributes={setAttributes}
					Inspector={Inspector}
				/>

				<div id={uniqueId} className={classNames("sp-smart-post-wrapper", additionalCssClass)}>
					<ProTopBar 
						blockName={blockName}
						title="Smart Search"
					/>
					<Render attributes={attributes} setAttributes={setAttributes} />
				</div>
			</TogglePanelBodyProvider>
		</div>
	);
};

export default compose(addInitialAttr)(SmartSearchEdit);
