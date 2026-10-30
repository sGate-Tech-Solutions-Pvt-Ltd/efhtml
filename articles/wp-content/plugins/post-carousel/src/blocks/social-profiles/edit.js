import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { InspectorControl } from "../../components";
import { Inspector } from "./inspector";
import { panelBodyRightIcon } from "../../icons/icons";
import { jsonStringify } from "../shared/helpFn";
import { useEffect, useMemo } from "@wordpress/element";
import dynamicCss from "./dynamicCss";
import "./editor.scss";
import { dispatch, useSelect } from "@wordpress/data";
import { googleFonts, useDeviceType } from "../../controls/controls";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const SocialProfilesEdit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const currentDevice = useDeviceType();
	const {
		uniqueId,
		templateItems,
		layout,
		socialListViewEnable,
		socialAlignment,
		socialHoverEffect,
		socialIconEnable,
		socialLabelEnable,
		socialSubTextEnable,
		socialLabelTypography,
		socialSubTextTypography,
		additionalCssClass,
		customCss,
		fontListsEditPage,
		socialIconDivider,
		socialLabelGlobalTypography,
		socialSubTextGlobalTypography,
	} = attributes;

	const blockProps = useBlockProps({
		className: additionalCssClass,
	});
	const template = templateItems?.map((item) => [
		"sp-smart-post-show/social-profile-item",
		{
			socialSingleProfile: item,
			socialSingleIcon: item,
		},
	]);

	const googleFontLists = [socialLabelTypography, socialSubTextTypography];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists),
		});
	}, googleFontLists);

	const parentBlock = useSelect((select) => {
		return select("core/block-editor").getBlock(clientId);
	}, []);

	useEffect(() => {
		if (!isSelected) {
			return;
		}
		parentBlock.innerBlocks.forEach((innerBlock) => {
			dispatch("core/block-editor").updateBlockAttributes(innerBlock.clientId, {
				iconEnableParent: socialIconEnable,
				layoutParent: layout,
				labelEnableParent: socialLabelEnable,
				subTextEnableParent: socialSubTextEnable,
				socialLabelGlobalTypographyParent: socialLabelGlobalTypography,
				socialSubTextGlobalTypographyParent: socialSubTextGlobalTypography,
			});
		});
	}, [
		parentBlock.innerBlocks,
		isSelected,
		socialIconEnable,
		socialLabelEnable,
		socialSubTextEnable,
		layout,
		socialLabelGlobalTypography,
		socialSubTextGlobalTypography,
	]);

	const blockStyling = useMemo(() => dynamicCss(attributes, "editor", currentDevice), [attributes, currentDevice]);

	const dividerClass =
		layout === "social-profiles-layout-three" && socialIconDivider ? "sp-icon-divider" : "sp-icon-divider-none";

	return (
		<>
			{isSelected && (
				<InspectorControl
					RightIcon={panelBodyRightIcon}
					attributes={attributes}
					setAttributes={setAttributes}
					Inspector={Inspector}
					templateLibrary={"google.com"}
				/>
			)}
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>
			<div {...blockProps}>
				<div id={uniqueId} className="sp-smart-post-wrapper">
					<div
						className={`sp-social-profile-wrapper ${layout}${
							socialListViewEnable ? " sp-list-view" : ""
						} sp-align-${socialAlignment} sp-icon-hover-effect-${socialHoverEffect} ${dividerClass}`}
					>
						<InnerBlocks allowedBlocks={["sp-smart-post-show/social-profile-item"]} template={template} />
					</div>
				</div>
			</div>
		</>
	);
};
export default compose(addInitialAttr)(SocialProfilesEdit);
