import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import ToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import {
	Background,
	Border,
	BoxShadow,
	Spacing,
	SpColorPicker,
	SPRangeControl,
	Toggle,
	TypographyNew,
} from "../../components";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";

// Smart Image Style Tab Panel
export const SmartImageStyleTab = ({ attributes, setAttributes }) => {
	const {
		enableLink,
		linkType,
		imageBorder,
		imageBorderWidth,
		imageBorderRadius,
		imageBoxShadowEnable,
		imageBoxShadow,
		imageFilter,
		imageBlur,
		imageBrightness,
		imageContrast,
		imageSaturation,
		imageHue,
		linkBtnTypography,
		linkBtnFontSize,
		linkBtnLineHeight,
		linkBtnLetterSpacing,
		linkBtnWordSpacing,
		linkButtonColor,
		linkButtonBg,
		linkButtonBorder,
		linkBtnBorderWidth,
		linkBtnBorderWidthHover,
		linkBtnBorderRadius,
		linkBtnBorderRadiusHover,
		linkBtnBoxShadowEnable,
		linkBtnBoxShadow,
		linkBtnBoxShadowEnableHover,
		linkBtnBoxShadowHover,
		linkBtnPadding,
	} = attributes;

	const [linkTypeStyle, setLinkTypeStyle] = useState("image");
	const [colorState, setColorState] = useState("normal");

	return (
		<>
			{enableLink && "button" === linkType && (
				<>
					<ToggleGroupControl
						attributes={linkTypeStyle}
						attributesKey={"linkTypeStyle"}
						onClick={(newValue) => setLinkTypeStyle(newValue)}
						items={[
							{ label: "Image", value: "image" },
							{ label: "Button", value: "button" },
						]}
					/>
				</>
			)}
			{"image" === linkTypeStyle ? (
				<>
					<Border
						attributes={{
							border: imageBorder,
							borderWidth: imageBorderWidth,
						}}
						attributesKey={{
							border: "imageBorder",
							borderWidth: "imageBorderWidth",
						}}
						setAttributes={setAttributes}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={imageBorderRadius}
						attributesKey={"imageBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ value: 0, unit: "%" }}
					/>
					<Toggle
						label={__("Box Shadow Enable", "post-carousel")}
						attributes={imageBoxShadowEnable}
						attributesKey={"imageBoxShadowEnable"}
						setAttributes={setAttributes}
					/>
					{imageBoxShadowEnable && (
						<BoxShadow
							attributes={imageBoxShadow}
							attributesKey={"imageBoxShadow"}
							setAttributes={setAttributes}
						/>
					)}
					<Toggle
						label={__("Image Filter", "post-carousel")}
						attributes={imageFilter}
						attributesKey={"imageFilter"}
						setAttributes={setAttributes}
						pro={true}
					/>
					{imageFilter && (
						<>
							<SPRangeControl
								label={__("Blur", "post-carousel")}
								attributes={imageBlur}
								attributesKey={"imageBlur"}
								setAttributes={setAttributes}
								defaultValue={{ value: "" }}
							/>
							<SPRangeControl
								label={__("Brightness", "post-carousel")}
								attributes={imageBrightness}
								attributesKey={"imageBrightness"}
								setAttributes={setAttributes}
								defaultValue={{ value: "" }}
							/>
							<SPRangeControl
								label={__("Contrast", "post-carousel")}
								attributes={imageContrast}
								attributesKey={"imageContrast"}
								setAttributes={setAttributes}
								defaultValue={{ value: "" }}
							/>
							<SPRangeControl
								label={__("Saturation", "post-carousel")}
								attributes={imageSaturation}
								attributesKey={"imageSaturation"}
								setAttributes={setAttributes}
								defaultValue={{ value: "" }}
							/>
							<SPRangeControl
								label={__("Hue", "post-carousel")}
								attributes={imageHue}
								attributesKey={"imageHue"}
								setAttributes={setAttributes}
								defaultValue={{ value: "" }}
							/>
						</>
					)}
				</>
			) : (
				<>
					<TypographyNew
						attributes={{
							family: linkBtnTypography,
							familyKey: "linkBtnTypography",
							fontSize: linkBtnFontSize,
							fontSizeKey: "linkBtnFontSize",
							lineHeight: linkBtnLineHeight,
							lineHeightKey: "linkBtnLineHeight",
							fontSpacing: linkBtnLetterSpacing,
							fontSpacingKey: "linkBtnLetterSpacing",
							wordSpacing: linkBtnWordSpacing,
							wordSpacingKey: "linkBtnWordSpacing",
						}}
						setAttributes={setAttributes}
					/>
					<ToggleGroupControl
						attributes={colorState}
						onClick={(newValue) => {
							setColorState(newValue);
						}}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
					/>
					{"normal" === colorState ? (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={linkButtonColor.color}
								onChange={(newValue) => {
									setAttributes({
										linkButtonColor: {
											...linkButtonColor,
											color: newValue,
										},
									});
								}}
							/>
							<Background
								label={__("Background Type", "post-carousel")}
								colorLabel="Background Color"
								defaultColor="#1A74E4"
								attributes={linkButtonBg}
								attributesKey={"linkButtonBg"}
								setAttributes={setAttributes}
								colorType={"color"}
								items={[
									{
										label: <TransparentIcon />,
										value: "transparent",
										tooltip: "Transparent",
									},
									{
										label: <BgIcon />,
										value: "bgColor",
										tooltip: "Solid",
									},
									{
										label: <GradientIcon />,
										value: "gradient",
										tooltip: "Gradient",
									},
								]}
							/>
							<Border
								attributes={{
									border: linkButtonBorder,
									borderWidth: linkBtnBorderWidth,
								}}
								attributesKey={{
									border: "linkButtonBorder",
									borderWidth: "linkBtnBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType={"normal"}
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={linkBtnBorderRadius}
								attributesKey={"linkBtnBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ value: 0, unit: "px" }}
							/>
							<Toggle
								label={__("Box Shadow Enable", "post-carousel")}
								attributes={linkBtnBoxShadowEnable}
								attributesKey={"linkBtnBoxShadowEnable"}
								setAttributes={setAttributes}
							/>
							{linkBtnBoxShadowEnable && (
								<BoxShadow
									attributes={linkBtnBoxShadow}
									attributesKey={"linkBtnBoxShadow"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					) : (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={linkButtonColor.hover}
								onChange={(newValue) => {
									setAttributes({
										linkButtonColor: {
											...linkButtonColor,
											hover: newValue,
										},
									});
								}}
							/>
							<Background
								label={__("Background Type", "post-carousel")}
								colorLabel="Background Color"
								defaultColor="#1A74E4"
								attributes={linkButtonBg}
								attributesKey={"linkButtonBg"}
								setAttributes={setAttributes}
								colorType={"hover"}
								items={[
									{
										label: <TransparentIcon />,
										value: "transparent",
										tooltip: "Transparent",
									},
									{
										label: <BgIcon />,
										value: "bgColor",
										tooltip: "Solid",
									},
									{
										label: <GradientIcon />,
										value: "gradient",
										tooltip: "Gradient",
									},
								]}
							/>
							<Border
								attributes={{
									border: linkButtonBorder,
									borderWidth: linkBtnBorderWidthHover,
								}}
								attributesKey={{
									border: "linkButtonBorder",
									borderWidth: "linkBtnBorderWidthHover",
								}}
								setAttributes={setAttributes}
								btnType={"hover"}
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={linkBtnBorderRadiusHover}
								attributesKey={"linkBtnBorderRadiusHover"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ value: 0, unit: "px" }}
							/>
							<Toggle
								label={__("Box Shadow Enable", "post-carousel")}
								attributes={linkBtnBoxShadowEnableHover}
								attributesKey={"linkBtnBoxShadowEnableHover"}
								setAttributes={setAttributes}
							/>
							{linkBtnBoxShadowEnableHover && (
								<BoxShadow
									attributes={linkBtnBoxShadowHover}
									attributesKey={"linkBtnBoxShadowHover"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}
					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={linkBtnPadding}
						attributesKey={"linkBtnPadding"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ value: 0, unit: "px" }}
					/>
				</>
			)}
		</>
	);
};
