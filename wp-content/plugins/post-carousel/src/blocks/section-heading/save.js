import { RichText, useBlockProps } from "@wordpress/block-editor";
import HeadingWrapper from "./headingWrapper";
import { SectionNineteenImage } from "../../icons/icons";
import classNames from "classnames";

const SectionHeadingSave = ({ attributes }) => {
	const {
		uniqueId,
		sectionHeadingLabel,
		sectionHeadingLinkUrl,
		sectionHeadingStyle,
		showSectionHeading,
		sectionHeadingHTMLTag: HeadingTag,
		sectionHeadingStyleBackgroundColor,
		showSubHeading,
		sectionSubHeadingAliment,
		subHeadingLabel,
		additionalCssClass,
		sectionHeadingGlobalTypo,
		sectionSubHeadingGlobalTypography,
	} = attributes;

	const blockProps = useBlockProps.save();
	const className = classNames("sp-section-heading-container", sectionHeadingStyle);
	const renderSectionNineteenImage = sectionHeadingStyle === "section-heading-nineteen" && (
		<SectionNineteenImage sectionHeadingStyleBackgroundColor={sectionHeadingStyleBackgroundColor} />
	);

	return (
		<div {...blockProps}>
			{showSectionHeading && (
				<div
					id={uniqueId}
					className={classNames("sp-smart-post-wrapper", "sp-section-heading-wrapper", additionalCssClass)}
				>
					<HeadingWrapper sectionHeadingLinkUrl={sectionHeadingLinkUrl} classNames={className}>
						<div className={"section-heading-tag"}>
							{sectionHeadingStyle === "section-heading-twentyOne" ? (
								<span>
									<RichText.Content
										tagName={HeadingTag}
										className={classNames(
											"sp-heading-text",
											sectionHeadingGlobalTypo?.class ? sectionHeadingGlobalTypo.class : ""
										)}
										value={sectionHeadingLabel}
									/>
								</span>
							) : (
								<RichText.Content
									tagName={HeadingTag}
									className={classNames(
										"sp-heading-text",
										sectionHeadingGlobalTypo?.class ? sectionHeadingGlobalTypo.class : ""
									)}
									value={sectionHeadingLabel}
								/>
							)}
							{renderSectionNineteenImage}
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
							<RichText.Content
								className={classNames(
									"sp-subheading-text",
									sectionSubHeadingGlobalTypography?.class
										? sectionSubHeadingGlobalTypography.class
										: ""
								)}
								tagName="span"
								value={subHeadingLabel}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SectionHeadingSave;
