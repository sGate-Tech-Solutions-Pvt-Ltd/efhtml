import { useState } from "@wordpress/element";
import { Spacing, SpColorPicker, SPRangeControl, SPToggleGroupControl, Toggle, TypographyNew } from "../../components";
import { __ } from "@wordpress/i18n";
export const ExcerptTab = ({ attributes, setAttributes }) => {
	const [colorState, setColorState] = useState("normal");
	const {
		blockName,
		excerptMargin,
		excerptShow,
		excerptLineHeight,
		excerptLatterSpacing,
		excerptFontSize,
		excerptTypography,
		excerptColor,
		excerptLength,
		excerptWordSpacing,
		excerptGlobalTypography,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Show Excerpt", "post-carousel")}
				attributes={excerptShow}
				attributesKey={"excerptShow"}
				setAttributes={setAttributes}
			/>

			{excerptShow && (
				<>
					<SPRangeControl
						label={__("Excerpt Length", "post-carousel")}
						attributes={excerptLength}
						attributesKey={"excerptLength"}
						setAttributes={setAttributes}
						units={[]}
						defaultValue={{
							unit: "words",
							value: 10,
						}}
						max={200}
						className="sp-smart-post-ranger-length"
					/>

					<TypographyNew
						attributes={{
							family: excerptTypography,
							familyKey: "excerptTypography",
							fontSize: excerptFontSize,
							fontSizeKey: "excerptFontSize",
							fontSpacing: excerptLatterSpacing,
							fontSpacingKey: "excerptLatterSpacing",
							lineHeight: excerptLineHeight,
							lineHeightKey: "excerptLineHeight",
							wordSpacing: excerptWordSpacing,
							wordSpacingKey: "excerptWordSpacing",
							globalTypo: excerptGlobalTypography,
							globalTypoKey: "excerptGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: 14,
						}}
						lineDefaultValue={1.2}
						typographyLabel={
							blockName === "taxonomy"
								? __("Typography", "post-carousel")
								: __("Typography", "post-carousel")
						}
					/>

					<SPToggleGroupControl
						attributes={colorState}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
						onClick={(newColor) => setColorState(newColor)}
					/>
					{"normal" === colorState ? (
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={excerptColor.color}
							onChange={(newColor) =>
								setAttributes({
									excerptColor: {
										...excerptColor,
										color: newColor,
									},
								})
							}
							defaultColor="#FFFFFF"
						/>
					) : (
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={excerptColor.hoverColor}
							onChange={(newColor) =>
								setAttributes({
									excerptColor: {
										...excerptColor,
										hoverColor: newColor,
									},
								})
							}
						/>
					)}
					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={excerptMargin}
						attributesKey={"excerptMargin"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "0",
								left: "0",
							},
						}}
					/>
				</>
			)}
		</>
	);
};
