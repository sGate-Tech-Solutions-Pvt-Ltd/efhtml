import { __ } from "@wordpress/i18n";
import {
	Border,
	Spacing,
	SpColorPicker,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
	TypographyNew,
} from "../../components";
import { useState } from "@wordpress/element";

export const StyleTab = ({ attributes, setAttributes }) => {
	const {
		titleTypography,
		titleFontSize,
		titleLatterSpacing,
		titleLineHeight,
		titleWordSpacing,
		optionTypography,
		optionFontSize,
		optionLatterSpacing,
		optionLineHeight,
		optionWordSpacing,
		titleColor,
		optionColor,
		iconColor,
		bgColor,
		borderNormal,
		borderHover,
		borderWidthNormal,
		borderWidthHover,
		borderRadiusNormal,
		borderRadiusHover,
		padding,
		margin,
		titleGlobalTypography,
		optionGlobalTypography,
		layout,
		activeBottomLine,
		menuTypography,
		menuFontSize,
		menuLatterSpacing,
		menuLineHeight,
		menuWordSpacing,
		menuGlobalTypography,
		menuColor,
	} = attributes;

	const [colorType, setColorType] = useState("normal");

	return (
		<>
			{"layoutTwo" === layout ? (
				<>
					<TypographyNew
						attributes={{
							family: menuTypography,
							familyKey: "menuTypography",
							fontSize: menuFontSize,
							fontSizeKey: "menuFontSize",
							fontSpacing: menuLatterSpacing,
							fontSpacingKey: "menuLatterSpacing",
							lineHeight: menuLineHeight,
							lineHeightKey: "menuLineHeight",
							wordSpacing: menuWordSpacing,
							wordSpacingKey: "menuWordSpacing",
							globalTypo: menuGlobalTypography,
							globalTypoKey: "menuGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: 14,
						}}
						typographyLabel={__("Typography", "post-carousel")}
					/>

					<Toggle
						label={__("Active Bottom Line", "post-carousel")}
						attributes={activeBottomLine}
						attributesKey={"activeBottomLine"}
						setAttributes={setAttributes}
					/>

					<SPToggleGroupControl
						attributes={colorType}
						onClick={(newValue) => setColorType(newValue)}
						items={[
							{
								label: "Normal",
								value: "normal",
							},
							{
								label: "Hover & Active",
								value: "hover",
							},
						]}
					/>

					{"normal" === colorType && (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={menuColor.color}
								onChange={(newColor) =>
									setAttributes({
										menuColor: {
											...menuColor,
											color: newColor,
										},
									})
								}
								defaultColor="#4E4F52"
							/>
						</>
					)}
					{"hover" === colorType && (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={menuColor.hover}
								onChange={(newColor) =>
									setAttributes({
										menuColor: {
											...menuColor,
											hover: newColor,
										},
									})
								}
								defaultColor="#4E4F52"
							/>
						</>
					)}
				</>
			) : (
				<>
					<TypographyNew
						attributes={{
							family: titleTypography,
							familyKey: "titleTypography",
							fontSize: titleFontSize,
							fontSizeKey: "titleFontSize",
							fontSpacing: titleLatterSpacing,
							fontSpacingKey: "titleLatterSpacing",
							lineHeight: titleLineHeight,
							lineHeightKey: "titleLineHeight",
							wordSpacing: titleWordSpacing,
							wordSpacingKey: "titleWordSpacing",
							globalTypo: titleGlobalTypography,
							globalTypoKey: "titleGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: 16,
						}}
						typographyLabel={__("Filter Title Typography", "post-carousel")}
					/>
					<TypographyNew
						attributes={{
							family: optionTypography,
							familyKey: "optionTypography",
							fontSize: optionFontSize,
							fontSizeKey: "optionFontSize",
							fontSpacing: optionLatterSpacing,
							fontSpacingKey: "optionLatterSpacing",
							lineHeight: optionLineHeight,
							lineHeightKey: "optionLineHeight",
							wordSpacing: optionWordSpacing,
							wordSpacingKey: "optionWordSpacing",
							globalTypo: optionGlobalTypography,
							globalTypoKey: "optionGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: "16",
						}}
						typographyLabel={__("Filter Option Typography", "post-carousel")}
					/>
					<SpColorPicker
						label={__("Title Color", "post-carousel")}
						value={titleColor.color}
						onChange={(newColor) =>
							setAttributes({
								titleColor: { ...titleColor, color: newColor },
							})
						}
						defaultColor="#4E4F52"
					/>
					<SPToggleGroupControl
						attributes={colorType}
						onClick={(newValue) => setColorType(newValue)}
						items={[
							{
								label: "Normal",
								value: "normal",
							},
							{
								label: "Hover & Active",
								value: "hover",
							},
						]}
					/>
					{"normal" === colorType && (
						<>
							<SpColorPicker
								label={__("Option Color", "post-carousel")}
								value={optionColor.color}
								onChange={(newColor) =>
									setAttributes({
										optionColor: {
											...optionColor,
											color: newColor,
										},
									})
								}
								defaultColor="#4E4F52"
							/>
							<SpColorPicker
								label={__("Background Color", "post-carousel")}
								value={bgColor.color}
								onChange={(newColor) =>
									setAttributes({
										bgColor: {
											...bgColor,
											color: newColor,
										},
									})
								}
								defaultColor="#ffffff"
							/>
						</>
					)}
					{"hover" === colorType && (
						<>
							<SpColorPicker
								label={__("Option Color", "post-carousel")}
								value={optionColor.hover}
								onChange={(newColor) =>
									setAttributes({
										optionColor: {
											...optionColor,
											hover: newColor,
										},
									})
								}
								defaultColor="#4E4F52"
							/>
							<SpColorPicker
								label={__("Background Color", "post-carousel")}
								value={bgColor.hover}
								onChange={(newColor) =>
									setAttributes({
										bgColor: {
											...bgColor,
											hover: newColor,
										},
									})
								}
								defaultColor="#4E4F52"
							/>
							{/* <Border
                    label="Border"
                    attributes={ {
                        border: borderHover,
                        borderWidth: borderWidthHover,
                    } }
                    setAttributes={ setAttributes }
                    attributesKey={ {
                        border: 'borderHover',
                        borderWidth: 'borderWidthHover',
                    } }
                    btnType="normal"
                    defaultColor= {{ color: '#838487' }}
                />
                <Spacing
                    label={ __(
                        'Border Radius',
                        'post-carousel'
                    ) }
                    attributes={ borderRadiusHover }
                    attributesKey={ 'borderRadiusHover' }
                    setAttributes={ setAttributes }
                    units={ [ 'px', '%', 'em' ] }
                    defaultValue={ {
                        unit: 'px',
                        value: {
                            top: 2,
                            right: 2,
                            bottom: 2,
                            left: 2,
                        },
                    } }
                /> */}
						</>
					)}
					<Border
						label="Border"
						attributes={{
							border: borderNormal,
							borderWidth: borderWidthNormal,
						}}
						setAttributes={setAttributes}
						attributesKey={{
							border: "borderNormal",
							borderWidth: "borderWidthNormal",
						}}
						btnType="normal"
						defaultColor={{ color: "#838487" }}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={borderRadiusNormal}
						attributesKey={"borderRadiusNormal"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: 2,
								right: 2,
								bottom: 2,
								left: 2,
							},
						}}
						indicator={"radius"}
					/>

					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={padding}
						attributesKey={"padding"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: 10,
								right: 12,
								bottom: 10,
								left: 12,
							},
						}}
					/>
					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={margin}
						attributesKey={"margin"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: 0,
								right: 80,
								bottom: 0,
								left: 80,
							},
						}}
					/>
				</>
			)}
		</>
	);
};

export const HeadingStyle = ({ attributes, setAttributes }) => {
	const {
		headingTypography,
		headingLineHeight,
		headingWordSpacing,
		headingLatterSpacing,
		headingFontSize,
		headingGlobalTypography,
		headingColor,
		widthLineThickness,
		headingBg,
		headingBorder,
		headingBorderWidth,
		headingBorderRadius,
		headingPadding,
		widthLineColor,
	} = attributes;

	const [colorType, setColorType] = useState("normal");

	return (
		<>
			<TypographyNew
				attributes={{
					family: headingTypography,
					familyKey: "headingTypography",
					fontSize: headingFontSize,
					fontSizeKey: "headingFontSize",
					fontSpacing: headingLatterSpacing,
					fontSpacingKey: "headingLatterSpacing",
					lineHeight: headingLineHeight,
					lineHeightKey: "headingLineHeight",
					wordSpacing: headingWordSpacing,
					wordSpacingKey: "headingWordSpacing",
					globalTypo: headingGlobalTypography,
					globalTypoKey: "headingGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 18,
				}}
				typographyLabel={__("Typography", "post-carousel")}
			/>

			<SPRangeControl
				label={__("Full Width Line Thickness", "post-carousel")}
				attributes={widthLineThickness}
				attributesKey={"widthLineThickness"}
				setAttributes={setAttributes}
				max={10}
				defaultValue={2}
			/>

			<SPToggleGroupControl
				attributes={colorType}
				onClick={(newValue) => setColorType(newValue)}
				items={[
					{
						label: "Normal",
						value: "normal",
					},
					{
						label: "Hover & Active",
						value: "hover",
					},
				]}
			/>
			{"normal" === colorType && (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={headingColor.color}
						onChange={(newColor) =>
							setAttributes({
								headingColor: {
									...headingColor,
									color: newColor,
								},
							})
						}
						defaultColor="#4E4F52"
					/>

					<SpColorPicker
						label={__("Full Width Line Color", "post-carousel")}
						value={widthLineColor}
						onChange={(newColor) =>
							setAttributes({
								widthLineColor: newColor,
							})
						}
						defaultColor="#4E4F52"
					/>

					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={headingBg.color}
						onChange={(newColor) =>
							setAttributes({
								headingBg: {
									...headingBg,
									color: newColor,
								},
							})
						}
						defaultColor="#F05D31"
					/>
				</>
			)}
			{"hover" === colorType && (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={headingColor.hover}
						onChange={(newColor) =>
							setAttributes({
								headingColor: {
									...headingColor,
									hover: newColor,
								},
							})
						}
						defaultColor="#4E4F52"
					/>

					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={headingBg.hover}
						onChange={(newColor) =>
							setAttributes({
								headingBg: {
									...headingBg,
									hover: newColor,
								},
							})
						}
						defaultColor=""
					/>
				</>
			)}
			<Border
				label="Border"
				attributes={{
					border: headingBorder,
					borderWidth: headingBorderWidth,
				}}
				setAttributes={setAttributes}
				attributesKey={{
					border: "headingBorder",
					borderWidth: "headingBorderWidth",
				}}
				btnType="normal"
				defaultColor={{ color: "#838487" }}
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
						top: 2,
						right: 2,
						bottom: 2,
						left: 2,
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
						top: 8,
						right: 20,
						bottom: 8,
						left: 20,
					},
				}}
			/>
		</>
	);
};
