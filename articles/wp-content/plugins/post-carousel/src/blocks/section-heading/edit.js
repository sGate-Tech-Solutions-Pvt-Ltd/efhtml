import { useEffect, useMemo } from "@wordpress/element";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon, SectionNineteenImage } from "../../icons/icons";
import { jsonStringify } from "../shared/helpFn";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspector";
import HeadingWrapper from "./headingWrapper";
import { googleFonts, useDeviceType } from "../../controls/controls";
import classNames from "classnames";
import addInitialAttr from "../shared/addInitialAttr";
import { compose } from "@wordpress/compose";

const SectionHeadingEdit = ({ attributes, setAttributes }) => {
	const {
		uniqueId,
		showSectionHeading,
		fontListsEditPage,
		sectionHeadingLabel,
		sectionHeadingLinkUrl,
		sectionHeadingStyle,
		sectionHeadingStyleBackgroundColor,
		sectionHeadingHTMLTag: HeadingTag,
		showSubHeading,
		sectionSubHeadingAliment,
		subHeadingLabel,
		additionalCssClass,
		customCss,
		sectionHeadingTypography,
		sectionSubHeadingTypography,
		sectionHeadingGlobalTypo,
		sectionSubHeadingGlobalTypography,
	} = attributes;

	const googleFontLists = [sectionHeadingTypography, sectionSubHeadingTypography];
	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists),
		});
	}, googleFontLists);

	const deviceType = useDeviceType();

	const blockStyling = useMemo(() => dynamicCssFn(attributes, deviceType), [attributes, deviceType]);
	const blockProps = useBlockProps();

	const className = classNames("sp-section-heading-container", sectionHeadingStyle);
	const renderSectionNineteenImage = sectionHeadingStyle === "section-heading-nineteen" && (
		<SectionNineteenImage sectionHeadingStyleBackgroundColor={sectionHeadingStyleBackgroundColor} />
	);

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
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

			{showSectionHeading && (
				<div
					id={uniqueId}
					className={classNames(
						"sp-smart-post-wrapper",
						"sp-section-heading-wrapper",
						additionalCssClass ? additionalCssClass : ""
					)}
				>
					<HeadingWrapper sectionHeadingLinkUrl={sectionHeadingLinkUrl} classNames={className}>
						<div className={"section-heading-tag"}>
							<HeadingTag
								className={classNames(
									"sp-heading-text",
									sectionHeadingGlobalTypo?.class ? sectionHeadingGlobalTypo.class : ""
								)}
							>
								<RichText
									tagName={"span"}
									value={sectionHeadingLabel}
									placeholder={"Section heading"}
									onChange={(newValue) =>
										setAttributes({
											sectionHeadingLabel: newValue,
										})
									}
									contentEditable={true}
								/>
								{renderSectionNineteenImage}
							</HeadingTag>
						</div>
					</HeadingWrapper>
					{showSubHeading && (
						<div
							className={classNames(
								"sp-section-subheading-container",
								"sp-d-flex",
								"sp-justify-" + sectionSubHeadingAliment
							)}
						>
							<RichText
								className={classNames(
									"sp-subheading-text",
									sectionSubHeadingGlobalTypography?.class && sectionSubHeadingGlobalTypography.class
								)}
								tagName="span"
								value={subHeadingLabel}
								placeholder={"Here is the subheading"}
								onChange={(newValue) =>
									setAttributes({
										subHeadingLabel: newValue,
									})
								}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default compose(addInitialAttr)(SectionHeadingEdit);
