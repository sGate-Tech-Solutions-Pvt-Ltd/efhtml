import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
	Background,
	Border,
	BoxShadow,
	Divider,
	Spacing,
	SpColorPicker,
	SPToggleGroupControl,
	Toggle,
	TypographyNew,
} from "../../components";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";

export const SocialProfilesIconStyleTab = ({ attributes, setAttributes }) => {
	const {
		socialIconCustomColorEnable,
		socialIconColor,
		socialIconBg,
		socialIconBorder,
		socialIconBorderWidth,
		socialIconBorderRadius,
		socialIconBorderHover,
		socialIconBorderWidthHover,
		socialIconBorderRadiusHover,
		socialIconBoxShadowEnable,
		socialIconBoxShadowValue,
		socialIconBoxShadowHoverEnable,
		socialIconBoxShadowHoverValue,
		socialIconMargin,
		layout,
		socialIconDividerColor,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			<Toggle
				label={__("Custom Icon Color", "post-carousel")}
				attributes={socialIconCustomColorEnable}
				attributesKey={"socialIconCustomColorEnable"}
				setAttributes={setAttributes}
			/>
			<SPToggleGroupControl
				attributes={colorState}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
			/>
			{"social-profiles-layout-three" === layout && (
				<>
					{"color" === colorState ? (
						<SpColorPicker
							label={__("Divider Color", "post-carousel")}
							value={socialIconDividerColor.color}
							onChange={(newValue) =>
								setAttributes({
									socialIconDividerColor: {
										...socialIconDividerColor,
										color: newValue,
									},
								})
							}
						/>
					) : (
						<SpColorPicker
							label={__("Divider Hover Color", "post-carousel")}
							value={socialIconDividerColor.hover}
							onChange={(newValue) =>
								setAttributes({
									socialIconDividerColor: {
										...socialIconDividerColor,
										hover: newValue,
									},
								})
							}
						/>
					)}
				</>
			)}
			{socialIconCustomColorEnable && (
				<>
					{"color" === colorState ? (
						<>
							<SpColorPicker
								label={__("Icon Color", "post-carousel")}
								value={socialIconColor?.color}
								onChange={(newValue) =>
									setAttributes({
										socialIconColor: {
											...socialIconColor,
											color: newValue,
										},
									})
								}
							/>
						</>
					) : (
						<>
							<SpColorPicker
								label={__("Icon Color", "post-carousel")}
								value={socialIconColor?.hover}
								onChange={(newValue) =>
									setAttributes({
										socialIconColor: {
											...socialIconColor,
											hover: newValue,
										},
									})
								}
							/>
						</>
					)}
					<Background
						label={__("Background Type", "post-carousel")}
						attributes={socialIconBg}
						attributesKey={"socialIconBg"}
						setAttributes={setAttributes}
						colorType={colorState}
						items={[
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
				</>
			)}
			{"color" === colorState ? (
				<>
					<Border
						attributes={{
							border: socialIconBorder,
							borderWidth: socialIconBorderWidth,
						}}
						attributesKey={{
							border: "socialIconBorder",
							borderWidth: "socialIconBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={socialIconBorderRadius}
						attributesKey={"socialIconBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={socialIconBoxShadowEnable}
						attributesKey={"socialIconBoxShadowEnable"}
						setAttributes={setAttributes}
					/>
					{socialIconBoxShadowEnable && (
						<>
							<BoxShadow
								attributes={socialIconBoxShadowValue}
								attributesKey={"socialIconBoxShadowValue"}
								setAttributes={setAttributes}
							/>
						</>
					)}
				</>
			) : (
				<>
					<Border
						label={__("Border on Hover", "post-carousel")}
						attributes={{
							border: socialIconBorderHover,
							borderWidth: socialIconBorderWidthHover,
						}}
						attributesKey={{
							border: "socialIconBorderHover",
							borderWidth: "socialIconBorderWidthHover",
						}}
						setAttributes={setAttributes}
						btnType={colorState}
					/>
					<Spacing
						label={__("Border Radius on Hover", "post-carousel")}
						attributes={socialIconBorderRadiusHover}
						attributesKey={"socialIconBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow on Hover", "post-carousel")}
						attributes={socialIconBoxShadowHoverEnable}
						attributesKey={"socialIconBoxShadowHoverEnable"}
						setAttributes={setAttributes}
					/>
					{socialIconBoxShadowHoverEnable && (
						<>
							<BoxShadow
								attributes={socialIconBoxShadowHoverValue}
								attributesKey={"socialIconBoxShadowHoverValue"}
								setAttributes={setAttributes}
							/>
						</>
					)}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={socialIconMargin}
				attributesKey={"socialIconMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "%",
					value: { top: 0, right: 0, bottom: 0, left: 0 },
				}}
			/>
		</>
	);
};

export const SocialProfilesLabelStyleTab = ({ attributes, setAttributes }) => {
	const {
		socialLabelTypography,
		socialLabelFontSize,
		socialLabelLetterSpacing,
		socialLabelLineHeight,
		socialLabelColor,
		socialSubTextTypography,
		socialSubTextFontSize,
		socialSubTextLetterSpacing,
		socialSubTextLineHeight,
		socialSubTextColor,
		socialLabelWordSpacing,
		socialSubTextWordSpacing,
		socialLabelEnable,
		socialSubTextEnable,
		socialLabelGlobalTypography,
		socialSubTextGlobalTypography,
	} = attributes;
	const [colorState, setColorState] = useState("color");
	return (
		<>
			{socialLabelEnable && (
				<TypographyNew
					attributes={{
						family: socialLabelTypography,
						familyKey: "socialLabelTypography",
						fontSize: socialLabelFontSize,
						fontSizeKey: "socialLabelFontSize",
						fontSpacing: socialLabelLetterSpacing,
						fontSpacingKey: "socialLabelLetterSpacing",
						lineHeight: socialLabelLineHeight,
						lineHeightKey: "socialLabelLineHeight",
						wordSpacing: socialLabelWordSpacing,
						wordSpacingKey: "socialLabelWordSpacing",
						globalTypo: socialLabelGlobalTypography,
						globalTypoKey: "socialLabelGlobalTypography",
					}}
					setAttributes={setAttributes}
					spacingDefaultValue={{ unit: "px", value: 0 }}
					fontSizeDefault={{
						unit: "px",
						value: 14,
					}}
					lineDefaultValue={1.2}
				/>
			)}
			{socialSubTextEnable && (
				<TypographyNew
					attributes={{
						family: socialSubTextTypography,
						familyKey: "socialSubTextTypography",
						fontSize: socialSubTextFontSize,
						fontSizeKey: "socialSubTextFontSize",
						fontSpacing: socialSubTextLetterSpacing,
						fontSpacingKey: "socialSubTextLetterSpacing",
						lineHeight: socialSubTextLineHeight,
						lineHeightKey: "socialSubTextLineHeight",
						wordSpacing: socialSubTextWordSpacing,
						wordSpacingKey: "socialSubTextWordSpacing",
						globalTypo: socialSubTextGlobalTypography,
						globalTypoKey: "socialSubTextGlobalTypography",
					}}
					setAttributes={setAttributes}
					spacingDefaultValue={{ unit: "px", value: 0 }}
					fontSizeDefault={{
						unit: "px",
						value: 14,
					}}
					lineDefaultValue={1.2}
					typographyLabel={__("Sub Text Typography", "post-carousel")}
				/>
			)}
			<SPToggleGroupControl
				attributes={colorState}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
			/>
			{"color" === colorState ? (
				<>
					{socialLabelEnable && (
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={socialLabelColor.color}
							onChange={(newValue) =>
								setAttributes({
									socialLabelColor: {
										...socialLabelColor,
										color: newValue,
									},
								})
							}
						/>
					)}
					{socialSubTextEnable && (
						<SpColorPicker
							label={__("Sub Text Color", "post-carousel")}
							value={socialSubTextColor.color}
							onChange={(newValue) =>
								setAttributes({
									socialSubTextColor: {
										...socialSubTextColor,
										color: newValue,
									},
								})
							}
						/>
					)}
				</>
			) : (
				<>
					{socialLabelEnable && (
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={socialLabelColor.hoverColor}
							onChange={(newValue) =>
								setAttributes({
									socialLabelColor: {
										...socialLabelColor,
										hoverColor: newValue,
									},
								})
							}
						/>
					)}
					{socialSubTextEnable && (
						<SpColorPicker
							label={__("Sub Text Color", "post-carousel")}
							value={socialSubTextColor.hoverColor}
							onChange={(newValue) =>
								setAttributes({
									socialSubTextColor: {
										...socialSubTextColor,
										hoverColor: newValue,
									},
								})
							}
						/>
					)}
				</>
			)}
		</>
	);
};
