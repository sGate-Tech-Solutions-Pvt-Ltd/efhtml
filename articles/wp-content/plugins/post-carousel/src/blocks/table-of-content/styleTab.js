import { useState } from "@wordpress/element";
import { Background, BoxShadow, SpColorPicker, SPToggleGroupControl, TypographyNew } from "../../components";
import Border from "../../components/border/border";
import Spacing from "../../components/spacing/spacing";

import { __ } from "@wordpress/i18n";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";
import { jsonStringify } from "../shared/helpFn";
import Toggle from "../../components/toggle/toggle";
export function StyleTab({ attributes, setAttributes }) {
	const { TOCBorderRadius, tocPadding, tocBorderWidth, tocBg, tocBorder, tocBoxShadow, tocBoxShadowEnable } =
		attributes;
	const [contentAreaBgStyleType, setContentAreaBgStyleType] = useState("color");
	return (
		<>
			<SPToggleGroupControl
				attributes={contentAreaBgStyleType}
				items={[
					{ label: "Normal", value: "color" },
					{
						label: "Hover",
						value: "hover",
					},
				]}
				onClick={(val) => setContentAreaBgStyleType(val)}
			/>

			<Background
				label={__("Background Type", "smart-post-show")}
				colorLabel="Solid Color"
				defaultColor="#fff"
				attributes={tocBg}
				attributesKey={"tocBg"}
				setAttributes={setAttributes}
				colorType={contentAreaBgStyleType}
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
					border: tocBorder,
					borderWidth: tocBorderWidth,
				}}
				attributesKey={{
					border: "tocBorder",
					borderWidth: "tocBorderWidth",
				}}
				setAttributes={setAttributes}
				btnType="normal"
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={TOCBorderRadius}
				attributesKey={"TOCBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "5",
						right: "5",
						bottom: "5",
						left: "5",
					},
				}}
				indicator={"radius"}
			/>

			<>
				<Toggle
					label={__("Box Shadow", "post-carousel")}
					attributes={jsonStringify(tocBoxShadowEnable)}
					attributesKey={"tocBoxShadowEnable"}
					setAttributes={setAttributes}
				/>
				{tocBoxShadowEnable && (
					<BoxShadow
						label={__("Box Shadow", "post-carousel")}
						attributes={tocBoxShadow}
						attributesKey={"tocBoxShadow"}
						setAttributes={setAttributes}
					/>
				)}
			</>

			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={tocPadding}
				attributesKey={"tocPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "8",
						right: "8",
						bottom: "8",
						left: "8",
					},
				}}
			/>
		</>
	);
}

export function TocHeadingStyleTab({ attributes, setAttributes }) {
	const {
		contentBorderRadius,
		headingLineHeight,
		headingWordSpacing,
		headingLetterSpacing,
		headingFontSize,
		headingTypography,
		headingColor,
		headingBg,
		headingPadding,
		headingBorderWidth,
		headingBorder,
		headingBorderRadius,
		headingGlobalTypography,
	} = attributes;
	const [contentAreaBgStyleType, setContentAreaBgStyleType] = useState("color");
	return (
		<>
			<TypographyNew
				attributes={{
					family: headingTypography,
					familyKey: "headingTypography",
					fontSize: headingFontSize,
					fontSizeKey: "headingFontSize",
					fontSpacing: headingLetterSpacing,
					fontSpacingKey: "headingLetterSpacing",
					lineHeight: headingLineHeight,
					lineHeightKey: "headingLineHeight",
					wordSpacing: headingWordSpacing,
					wordSpacingKey: "headingWordSpacing",
					globalTypo: headingGlobalTypography,
					globalTypoKey: "headingGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 16 }}
				lineDefaultValue={{ unit: "px", value: 20 }}
			/>

			<SPToggleGroupControl
				attributes={contentAreaBgStyleType}
				items={[
					{ label: "Normal", value: "color" },
					{
						label: "Hover",
						value: "hover",
					},
				]}
				onClick={(val) => setContentAreaBgStyleType(val)}
			/>

			<SpColorPicker
				label={__("Color", "post-carousel")}
				value={contentAreaBgStyleType === "color" ? headingColor.color : headingColor.hoverColor}
				onChange={(newColor) =>
					setAttributes({
						headingColor: {
							...headingColor,
							...(contentAreaBgStyleType === "color" ? { color: newColor } : { hoverColor: newColor }),
						},
					})
				}
				defaultColor="#333333"
			/>

			<Background
				label={__("Background Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor="#fff"
				attributes={headingBg}
				attributesKey={"headingBg"}
				setAttributes={setAttributes}
				colorType={contentAreaBgStyleType}
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
					border: headingBorder,
					borderWidth: headingBorderWidth,
				}}
				attributesKey={{
					border: "headingBorder",
					borderWidth: "headingBorderWidth",
				}}
				setAttributes={setAttributes}
				btnType="normal"
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={headingBorderRadius}
				attributesKey={"headingBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "8",
						right: "8",
						bottom: "8",
						left: "8",
					},
				}}
				indicator={"radius"}
			/>

			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={headingPadding}
				attributesKey={"headingPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "8",
						right: "8",
						bottom: "8",
						left: "8",
					},
				}}
				indicator={"padding"}
			/>
		</>
	);
}

export function TocListBodyStyleTab({ attributes, setAttributes }) {
	const {
		contentColor,
		listLineHeight,
		listWordSpacing,
		listLetterSpacing,
		listFontSize,
		listTypography,
		contentChildColor,
		separatorColor,
		separator,
		itemBg,
		preset,
		activeLineColor,
		listGlobalTypography,
	} = attributes;
	const [contentAreaBgStyleType, setContentAreaBgStyleType] = useState("color");
	return (
		<>
			<TypographyNew
				attributes={{
					family: listTypography,
					familyKey: "listTypography",
					fontSize: listFontSize,
					fontSizeKey: "listFontSize",
					fontSpacing: listLetterSpacing,
					fontSpacingKey: "listLetterSpacing",
					lineHeight: listLineHeight,
					lineHeightKey: "listLineHeight",
					wordSpacing: listWordSpacing,
					wordSpacingKey: "listWordSpacing",
					globalTypo: listGlobalTypography,
					globalTypoKey: "listGlobalTypography",
				}}
				typographyLabel="List Typography"
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 16 }}
				lineDefaultValue={{ unit: "px", value: 20 }}
			/>

			<SPToggleGroupControl
				attributes={contentAreaBgStyleType}
				items={[
					{ label: "Normal", value: "color" },
					{
						label: "Hover & Active",
						value: "hover",
					},
				]}
				onClick={(val) => setContentAreaBgStyleType(val)}
			/>

			<SpColorPicker
				label={__("Parent Item Color", "post-carousel")}
				value={contentAreaBgStyleType === "color" ? contentColor.color : contentColor.hoverColor}
				onChange={(newColor) =>
					setAttributes({
						contentColor: {
							...contentColor,
							[contentAreaBgStyleType === "color" ? "color" : "hoverColor"]: newColor,
						},
					})
				}
				defaultColor="#333333"
			/>

			<SpColorPicker
				label={__("Child Item Color", "post-carousel")}
				value={contentAreaBgStyleType === "color" ? contentChildColor.color : contentChildColor.hoverColor}
				onChange={(newColor) =>
					setAttributes({
						contentChildColor: {
							...contentChildColor,
							[contentAreaBgStyleType === "color" ? "color" : "hoverColor"]: newColor,
						},
					})
				}
				defaultColor="#333333"
			/>
			{["presetThree", "presetFour"].includes(preset) && (
				<SpColorPicker
					label={__("Active Line Color", "post-carousel")}
					value={activeLineColor}
					onChange={(newColor) =>
						setAttributes({
							activeLineColor: newColor,
						})
					}
					defaultColor="#1A74E4"
				/>
			)}

			{["presetTwo", "presetFive"].includes(preset) && (
				<Background
					label={__("Background Type", "smart-post-show")}
					colorLabel="Solid Color"
					defaultColor="#dddddd"
					attributes={itemBg}
					attributesKey={"itemBg"}
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
			)}

			{separator && (
				<SpColorPicker
					label={__("Separator Color", "post-carousel")}
					value={separatorColor}
					onChange={(newColor) =>
						setAttributes({
							separatorColor: newColor,
						})
					}
					defaultColor="#333333"
				/>
			)}
		</>
	);
}

export function TocCollapsibleStyleTab({ attributes, setAttributes }) {
	const {
		collapsibleColor,
		collapsibleBg,
		collapsibleBorderWidth,
		collapsibleBorder,
		collapsiblePadding,
		collapsibleBorderRadius,
		collapseLineHeight,
		collapseWordSpacing,
		collapseLetterSpacing,
		collapseFontSize,
		collapseTypography,
		CollapsibleButtonType,
		collapseGlobalTypography,
	} = attributes;
	return (
		<>
			{CollapsibleButtonType !== "icon" && (
				<TypographyNew
					attributes={{
						family: collapseTypography,
						familyKey: "collapseTypography",
						fontSize: collapseFontSize,
						fontSizeKey: "collapseFontSize",
						fontSpacing: collapseLetterSpacing,
						fontSpacingKey: "collapseLetterSpacing",
						lineHeight: collapseLineHeight,
						lineHeightKey: "collapseLineHeight",
						wordSpacing: collapseWordSpacing,
						wordSpacingKey: "collapseWordSpacing",
						globalTypo: collapseGlobalTypography,
						globalTypoKey: "collapseGlobalTypography",
					}}
					typographyLabel="Typography"
					setAttributes={setAttributes}
					spacingDefaultValue={{ unit: "px", value: 0 }}
					fontSizeDefault={{ unit: "px", value: 16 }}
					lineDefaultValue={{ unit: "px", value: 20 }}
				/>
			)}

			<SpColorPicker
				label={__("Color", "post-carousel")}
				value={collapsibleColor.color}
				onChange={(newColor) =>
					setAttributes({
						collapsibleColor: {
							...collapsibleColor,
							color: newColor,
						},
					})
				}
				defaultColor="#333333"
			/>

			<Background
				label={__("Background Type", "smart-post-show")}
				colorLabel="Solid Color"
				defaultColor="#fff"
				attributes={collapsibleBg}
				attributesKey={"collapsibleBg"}
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
					border: collapsibleBorder,
					borderWidth: collapsibleBorderWidth,
				}}
				attributesKey={{
					border: "collapsibleBorder",
					borderWidth: "collapsibleBorderWidth",
				}}
				setAttributes={setAttributes}
				btnType="normal"
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={collapsibleBorderRadius}
				attributesKey={"collapsibleBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "8",
						right: "8",
						bottom: "8",
						left: "8",
					},
				}}
				indicator={"radius"}
			/>

			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={collapsiblePadding}
				attributesKey={"collapsiblePadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "8",
						right: "8",
						bottom: "8",
						left: "8",
					},
				}}
				indicator={"padding"}
			/>
		</>
	);
}
