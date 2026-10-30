import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import {
	Toggle,
	SPRangeControl,
	SpColorPicker,
	Spacing,
	SelectDropdown,
	TabControls,
	TypographyNew,
} from "../../components";
import {
	SectionHeadingIconTwo,
	SectionHeadingIconThree,
	SectionHeadingIconFour,
	SectionHeadingIconSix,
	SectionHeadingIconFive,
	SectionHeadingIconSeven,
	SectionHeadingIconEight,
	SectionHeadingIconNine,
	SectionHeadingIconTen,
	SectionHeadingIconEleven,
	SectionHeadingIconTwelve,
	SectionHeadingIconThirteen,
	SectionHeadingIconFourteen,
	SectionHeadingIconFifteen,
	SectionHeadingIconSixteen,
	SectionHeadingIconSeventeen,
	SectionHeadingIconEightTeen,
	SectionHeadingIconNineteen,
	SectionHeadingIconTwenty,
	SectionHeadingIconTwentyOne,
	SectionHeadingIconTwentyTwo,
	SectionHeadingIconTwentyThree,
	SectionHeadingIconTwentyFour,
	AlignCenter,
	AlignLeft,
	AlignRight,
} from "../../icons/icons";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";

const Inspector = ({ attributes, setAttributes }) => {
	const {
		sectionHeading,
		showSectionHeading,
		sectionHeadingStyle,
		sectionHeadingHTMLTag,
		sectionHeadingAliment,
		showSubHeading,
		sectionHeadingTypography,
		sectionHeadingFontSize,
		sectionHeadingFontSpacing,
		sectionHeadingLineHeight,
		sectionHeadingColor,
		sectionHeadingMargin,
		sectionSubHeadingAliment,
		sectionSubHeadingTypography,
		sectionSubHeadingFontSize,
		sectionSubHeadingFontSpacing,
		sectionSubHeadingLineHeight,
		sectionSubHeadingColor,
		sectionSubHeadingMargin,
		sectionHeadingStyleBackgroundColor,
		sectionHeadingPadding,
		sectionHeadingBorderRadius,
		sectionHeadingWordSpacing,
		sectionSubHeadingWordSpacing,
		headingLineThickness,
	} = attributes;

	const showRadius = [
		"section-heading-two",
		"section-heading-three",
		"section-heading-five",
		"section-heading-eleven",
		"section-heading-twelve",
		"section-heading-fourteen",
		"section-heading-twentyTwo",
		"section-heading-twentyThree",
		"section-heading-twentyFour",
	].includes(sectionHeadingStyle);

	const updateHeadingStyle = (newValue) => {
		if (newValue === sectionHeadingStyle) return;
		setAttributes({ sectionHeadingStyle: newValue });
	};

	return (
		<>
			<PanelBody
				initialOpen={true}
				title={__("General", "post-carousel")}
				className="sp-smart-post-section-heading-block-panel-body"
			>
				<SPToggleGroupControl
					attributes={sectionHeading}
					attributesKey={"sectionHeading"}
					setAttributes={setAttributes}
					items={[
						{ label: "Heading", value: "heading" },
						{ label: "Sub Heading", value: "sub_heading" },
					]}
				/>
				{sectionHeading == "heading" && (
					<Toggle
						label={__("Show Heading", "post-carousel")}
						attributes={showSectionHeading}
						setAttributes={setAttributes}
						attributesKey={"showSectionHeading"}
					/>
				)}
				{sectionHeading == "sub_heading" && (
					<Toggle
						label={__("Show Sub Heading", "post-carousel")}
						attributes={showSubHeading}
						setAttributes={setAttributes}
						attributesKey={"showSubHeading"}
					/>
				)}
				{sectionHeading == "heading" && showSectionHeading && (
					<>
						<SelectDropdown
							label={__("Heading Style", "post-carousel")}
							attributes={sectionHeadingStyle}
							attributesKey={"sectionHeadingStyle"}
							setAttributes={setAttributes}
							className="sp-smart-section-heading-dropdown"
							onClick={(newValue) => updateHeadingStyle(newValue)}
							options={[
								{
									label: "Section Heading 01",
									value: "section-heading-one",
								},
								{
									icon: <SectionHeadingIconTwo />,
									value: "section-heading-two",
								},
								{
									icon: <SectionHeadingIconThree />,
									value: "section-heading-three",
								},
								{
									icon: <SectionHeadingIconFour />,
									value: "section-heading-four",
								},
								{
									icon: <SectionHeadingIconFive />,
									value: "section-heading-five",
								},
								{
									icon: <SectionHeadingIconSix />,
									value: "section-heading-six",
								},
								{
									icon: <SectionHeadingIconSeven />,
									value: "section-heading-seven",
								},
								{
									icon: <SectionHeadingIconEight />,
									value: "section-heading-eight",
								},
								{
									icon: <SectionHeadingIconNine />,
									value: "section-heading-nine",
								},
								{
									icon: <SectionHeadingIconTen />,
									value: "section-heading-ten",
								},
								{
									icon: <SectionHeadingIconEleven />,
									value: "section-heading-eleven",
								},
								{
									icon: <SectionHeadingIconTwelve />,
									value: "section-heading-twelve",
								},
								{
									icon: <SectionHeadingIconThirteen />,
									value: "section-heading-thirteen",
								},
								{
									icon: <SectionHeadingIconFourteen />,
									value: "section-heading-fourteen",
								},
								{
									icon: <SectionHeadingIconFifteen />,
									value: "section-heading-fifteen",
								},
								{
									icon: <SectionHeadingIconSixteen />,
									value: "section-heading-sixteen",
								},
								{
									icon: <SectionHeadingIconSeventeen />,
									value: "section-heading-seventeen",
								},
								{
									icon: <SectionHeadingIconEightTeen />,
									value: "section-heading-eightTeen",
								},
								{
									icon: <SectionHeadingIconNineteen />,
									value: "section-heading-nineteen",
								},
								{
									icon: <SectionHeadingIconTwenty />,
									value: "section-heading-twenty",
								},
								{
									icon: <SectionHeadingIconTwentyOne />,
									value: "section-heading-twentyOne",
								},
								{
									icon: <SectionHeadingIconTwentyTwo />,
									value: "section-heading-twentyTwo",
								},
								{
									icon: <SectionHeadingIconTwentyThree />,
									value: "section-heading-twentyThree",
								},
								{
									icon: <SectionHeadingIconTwentyFour />,
									value: "section-heading-twentyFour",
								},
							]}
						/>
						{![
						"section-heading-one",
						"section-heading-two",
						"section-heading-eleven",
						"section-heading-twelve",
						"section-heading-twentyThree",
						"section-heading-twentyFour",
						].includes(sectionHeadingStyle) && (
						<SPRangeControl
							label={ __("Heading Line Thickness", "post-carousel") }
							attributes={ headingLineThickness }
							attributesKey={ "headingLineThickness" }
							setAttributes={ setAttributes }
							units={["px"]}
							defaultValue={{ unit: "px", value: 2 }}
							min={1}
							max={10}
						/>
					) }
						<SPToggleGroupControl
							label={__("HTML Tag", "post-carousel")}
							attributes={sectionHeadingHTMLTag}
							attributesKey={"sectionHeadingHTMLTag"}
							setAttributes={setAttributes}
							items={[
								{ label: "H1", value: "h1" },
								{ label: "H2", value: "h2" },
								{ label: "H3", value: "h3" },
								{ label: "H4", value: "h4" },
								{ label: "H5", value: "h5" },
								{ label: "H6", value: "h6" },
								{ label: "P", value: "p" },
							]}
						/>
						{!["section-heading-nine", "section-heading-twentyOne"].includes(sectionHeadingStyle) && (
							<SPToggleGroupControl
								attributes={sectionHeadingAliment}
								attributesKey={"sectionHeadingAliment"}
								label={__("Alignment", "post-carousel")}
								setAttributes={setAttributes}
								items={[
									{ label: <AlignLeft />, value: "left" },
									{ label: <AlignCenter />, value: "center" },
									{ label: <AlignRight />, value: "right" },
								]}
							/>
						)}
						<TypographyNew
							attributes={{
								family: sectionHeadingTypography,
								familyKey: "sectionHeadingTypography",
								fontSize: sectionHeadingFontSize,
								fontSizeKey: "sectionHeadingFontSize",
								fontSpacing: sectionHeadingFontSpacing,
								fontSpacingKey: "sectionHeadingFontSpacing",
								lineHeight: sectionHeadingLineHeight,
								lineHeightKey: "sectionHeadingLineHeight",
								wordSpacing: sectionHeadingWordSpacing,
								wordSpacingKey: "sectionHeadingWordSpacing",
								globalTypo: attributes.sectionHeadingGlobalTypo,
								globalTypoKey: "sectionHeadingGlobalTypo",
							}}
							setAttributes={setAttributes}
							spacingDefaultValue={{ unit: "px", value: 0 }}
							fontSizeDefault={{ unit: "px", value: 32 }}
							lineDefaultValue={""}
							fontSizePresetType="heading"
						/>
						{sectionHeadingStyle !== "section-heading-one" && (
							<SpColorPicker
								label={__("Heading Background Color", "post-carousel")}
								value={sectionHeadingStyleBackgroundColor.color}
								onChange={(newColor) =>
									setAttributes({
										sectionHeadingStyleBackgroundColor: {
											...sectionHeadingStyleBackgroundColor,
											color: newColor,
										},
									})
								}
								defaultColor="#2271B1"
							/>
						)}
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={sectionHeadingColor.color}
							defaultColor={"#222222"}
							onChange={(newColor) =>
								setAttributes({
									sectionHeadingColor: {
										...sectionHeadingColor,
										color: newColor,
									},
								})
							}
						/>
						{showRadius && (
							<SPRangeControl
								label={__("Border Radius", "post-carousel")}
								attributes={sectionHeadingBorderRadius}
								attributesKey={"sectionHeadingBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "Em"]}
								defaultValue={{ unit: "px", value: 0 }}
								max="100"
							/>
						)}
						<Spacing
							label={__("Padding", "post-carousel")}
							attributes={sectionHeadingPadding}
							attributesKey={"sectionHeadingPadding"}
							setAttributes={setAttributes}
							units={["px", "%", "em"]}
							labelItem={{
								top: __("Top", "post-carousel"),
								right: __("Right", "post-carousel"),
								bottom: __("Bottom", "post-carousel"),
								left: __("Left", "post-carousel"),
							}}
							defaultValue={{
								unit: "px",
								value: {
									top: "",
									right: "",
									bottom: "",
									left: "",
								},
							}}
						/>
						<Spacing
							label={__("Margin", "post-carousel")}
							attributes={sectionHeadingMargin}
							attributesKey={"sectionHeadingMargin"}
							setAttributes={setAttributes}
							units={["px", "%", "em"]}
							labelItem={{
								top: __("Top", "post-carousel"),
								right: __("Right", "post-carousel"),
								bottom: __("Bottom", "post-carousel"),
								left: __("Left", "post-carousel"),
							}}
							defaultValue={{
								unit: "px",
								value: {
									top: "",
									right: "",
									bottom: "",
									left: "",
								},
							}}
						/>
					</>
				)}
				{sectionHeading == "sub_heading" && showSubHeading && (
					<>
						<SPToggleGroupControl
							attributes={sectionSubHeadingAliment}
							attributesKey={"sectionSubHeadingAliment"}
							label={__("Alignment", "post-carousel")}
							setAttributes={setAttributes}
							items={[
								{ label: <AlignLeft />, value: "left" },
								{ label: <AlignCenter />, value: "center" },
								{ label: <AlignRight />, value: "right" },
							]}
						/>
						<TypographyNew
							attributes={{
								family: sectionSubHeadingTypography,
								familyKey: "sectionSubHeadingTypography",
								fontSize: sectionSubHeadingFontSize,
								fontSizeKey: "sectionSubHeadingFontSize",
								fontSpacing: sectionSubHeadingFontSpacing,
								fontSpacingKey: "sectionSubHeadingFontSpacing",
								lineHeight: sectionSubHeadingLineHeight,
								lineHeightKey: "sectionSubHeadingLineHeight",
								wordSpacing: sectionSubHeadingWordSpacing,
								wordSpacingKey: "sectionSubHeadingWordSpacing",
								globalTypo: attributes.sectionSubHeadingGlobalTypography,
								globalTypoKey: "sectionSubHeadingGlobalTypography",
							}}
							setAttributes={setAttributes}
							spacingDefaultValue={{ unit: "px", value: 0 }}
							fontSizeDefault={{ unit: "px", value: 18 }}
							lineDefaultValue={""}
							fontSizePresetType="body"
						/>
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={sectionSubHeadingColor.color}
							onChange={(newColor) =>
								setAttributes({
									sectionSubHeadingColor: {
										...sectionSubHeadingColor,
										color: newColor,
									},
								})
							}
						/>
						<Spacing
							label={__("Margin", "post-carousel")}
							attributes={sectionSubHeadingMargin}
							attributesKey={"sectionSubHeadingMargin"}
							setAttributes={setAttributes}
							units={["px", "%", "em"]}
							labelItem={{
								top: __("Top", "post-carousel"),
								right: __("Right", "post-carousel"),
								bottom: __("Bottom", "post-carousel"),
								left: __("Left", "post-carousel"),
							}}
							defaultValue={{
								unit: "px",
								value: {
									top: "12",
									right: "0",
									bottom: "0",
									left: "0",
								},
							}}
						/>
					</>
				)}
			</PanelBody>
			<PanelBody initialOpen={false} title={__("Advanced", "post-carousel")}>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					AdvancedTab={AdvancedTab}
					VisibilityTab={VisibilityTab}
					displayIcon={false}
					initialTab={"visibility"}
				/>
			</PanelBody>
		</>
	);
};

export default Inspector;
