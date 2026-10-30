import { __ } from "@wordpress/i18n";
import {
	Background,
	Border,
	BoxShadow,
	Divider,
	Spacing,
	SpColorPicker,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
	TypographyNew,
} from "../../components";
import { Fragment, useState } from "@wordpress/element";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";

export const PresetStyleTab = ({ attributes, setAttributes }) => {
	const {
		inputPlaceholderTypography,
		inputPlaceholderFontSize,
		inputPlaceholderLatterSpacing,
		inputPlaceholderWordSpacing,
		inputPlaceholderLineHeight,
		inputPlaceholderColor,
		searchFormBgColor,
		searchFormBorder,
		searchFormBorderWidth,
		searchFormHoverBorder,
		searchFormHoverBorderWidth,
		searchFormBorderRadius,
		searchFormHoverBorderRadius,
		searchFormPadding,
		searchFormWidth,
		searchFormHeight,
		inputPlaceHolderGlobalTypography,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			<TypographyNew
				attributes={{
					family: inputPlaceholderTypography,
					familyKey: "inputPlaceholderTypography",
					fontSize: inputPlaceholderFontSize,
					fontSizeKey: "inputPlaceholderFontSize",
					fontSpacing: inputPlaceholderLatterSpacing,
					fontSpacingKey: "inputPlaceholderLatterSpacing",
					lineHeight: inputPlaceholderLineHeight,
					lineHeightKey: "inputPlaceholderLineHeight",
					wordSpacing: inputPlaceholderWordSpacing,
					wordSpacingKey: "inputPlaceholderWordSpacing",
					globalTypo: inputPlaceHolderGlobalTypography,
					globalTypoKey: "inputPlaceHolderGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 14,
				}}
				typographyLabel={__("Placeholder Typography", "post-carousel")}
			/>
			<SPToggleGroupControl
				attributes={colorState}
				attributesKey={"colorState"}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover & Focus", value: "hover" },
				]}
			/>
			<Background
				label={__("Background Type", "post-carousel")}
				attributes={searchFormBgColor}
				attributesKey={"searchFormBgColor"}
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
			{"color" === colorState ? (
				<Fragment key={colorState}>
					<SpColorPicker
						label={__("Placeholder Color", "post-carousel")}
						value={inputPlaceholderColor.color}
						onChange={(newValue) =>
							setAttributes({
								inputPlaceholderColor: {
									...inputPlaceholderColor,
									color: newValue,
								},
							})
						}
					/>

					<Border
						attributes={{
							border: searchFormBorder,
							borderWidth: searchFormBorderWidth,
						}}
						attributesKey={{
							border: "searchFormBorder",
							borderWidth: "searchFormBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>

					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={searchFormBorderRadius}
						attributesKey={"searchFormBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
				</Fragment>
			) : (
				<Fragment key={colorState}>
					<SpColorPicker
						label={__("Hover Placeholder Color", "post-carousel")}
						value={inputPlaceholderColor.hoverColor}
						onChange={(newValue) =>
							setAttributes({
								inputPlaceholderColor: {
									...inputPlaceholderColor,
									hoverColor: newValue,
								},
							})
						}
					/>
					<Border
						attributes={{
							border: searchFormHoverBorder,
							borderWidth: searchFormHoverBorderWidth,
						}}
						attributesKey={{
							border: "searchFormHoverBorder",
							borderWidth: "searchFormHoverBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Hover Border Radius", "post-carousel")}
						attributes={searchFormHoverBorderRadius}
						attributesKey={"searchFormHoverBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
				</Fragment>
			)}
			<Divider position="sp-w-100pct" />
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={searchFormPadding}
				attributesKey={"searchFormPadding"}
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
		</>
	);
};
export const SearchButtonStyleTab = ({ attributes, setAttributes }) => {
	const {
		searchButtonIconColor,
		searchIcon,
		searchIconDivider,
		searchBtnLabelTextColor,
		searchBtnLabel,
		searchBtnBgColor,
		searchFormPreset,
		searchButtonBorderRadius,
		searchButtonBorder,
		searchButtonBorderWidth,
		searchButtonPadding,
		gapWithIcon,
		gapWithSearchField,
		searchBtnLabelTypography,
		searchBtnLabelFontSize,
		searchIconDividerColor,
		searchBtnLabelLineHeight,
		searchButtonHoverBorder,
		searchButtonHoverBorderWidth,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			{searchBtnLabel &&
				[
					"smart-search-form-preset-three",
					"smart-search-form-preset-four",
					"smart-search-form-preset-five",
				].includes(searchFormPreset) && (
					<TypographyNew
						attributes={{
							family: searchBtnLabelTypography,
							familyKey: "searchBtnLabelTypography",
							fontSize: searchBtnLabelFontSize,
							fontSizeKey: "searchBtnLabelFontSize",
							lineHeight: searchBtnLabelLineHeight,
							lineHeightKey: "searchBtnLabelLineHeight",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: 14,
						}}
						lineDefaultValue={{ unit: "px", value: 27.5 }}
						typographyLabel={__("Typography", "post-carousel")}
					/>
				)}
			<SPToggleGroupControl
				attributes={colorState}
				attributesKey={"colorState"}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hoverColor" },
				]}
			/>
			{searchIcon && (
				<SpColorPicker
					label={colorState === "hoverColor" ? "Hover Icon Color" : "Icon Color"}
					value={searchButtonIconColor[colorState]}
					onChange={(newValue) =>
						setAttributes({
							searchButtonIconColor: {
								...searchButtonIconColor,
								[colorState]: newValue,
							},
						})
					}
				/>
			)}
			{searchIconDivider && "smart-search-form-preset-one" === searchFormPreset && (
				<SpColorPicker
					label={colorState === "hoverColor" ? "Hover Divider Color" : "Divider Color"}
					value={searchIconDividerColor[colorState]}
					onChange={(newValue) =>
						setAttributes({
							searchIconDividerColor: {
								...searchIconDividerColor,
								[colorState]: newValue,
							},
						})
					}
				/>
			)}

			{[
				"smart-search-form-preset-three",
				"smart-search-form-preset-four",
				"smart-search-form-preset-five",
			].includes(searchFormPreset) && (
				<>
					{searchBtnLabel && (
						<SpColorPicker
							label={colorState === "hoverColor" ? "Hover Label Color" : "Label Color"}
							value={searchBtnLabelTextColor[colorState]}
							onChange={(newValue) =>
								setAttributes({
									searchBtnLabelTextColor: {
										...searchBtnLabelTextColor,
										[colorState]: newValue,
									},
								})
							}
						/>
					)}
					<Background
						label={colorState === "hoverColor" ? "Hover Background Type" : "Background Type"}
						attributes={searchBtnBgColor}
						attributesKey={"searchBtnBgColor"}
						setAttributes={setAttributes}
						colorType={colorState === "hoverColor" ? "hover" : "color"}
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
					{colorState === "color" ? (
						<Border
							attributes={{
								border: searchButtonBorder,
								borderWidth: searchButtonBorderWidth,
							}}
							attributesKey={{
								border: "searchButtonBorder",
								borderWidth: "searchButtonBorderWidth",
							}}
							setAttributes={setAttributes}
							btnType={"normal"}
						/>
					) : (
						<Border
							attributes={{
								border: searchButtonHoverBorder,
								borderWidth: searchButtonHoverBorderWidth,
							}}
							attributesKey={{
								border: "searchButtonHoverBorder",
								borderWidth: "searchButtonHoverBorderWidth",
							}}
							setAttributes={setAttributes}
							btnType={"normal"}
						/>
					)}

					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={searchButtonBorderRadius}
						attributesKey={"searchButtonBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					{searchIcon && searchBtnLabel && (
						<SPRangeControl
							label={__("Gap With Icon", "post-carousel")}
							attributes={gapWithIcon}
							attributesKey={"gapWithIcon"}
							setAttributes={setAttributes}
							max={50}
							units={["px", "%", "em"]}
							defaultValue={{ unit: "px", value: 20 }}
						/>
					)}
					{"smart-search-form-preset-four" === searchFormPreset && (
						<SPRangeControl
							label={__("Gap With Search Field", "post-carousel")}
							attributes={gapWithSearchField}
							attributesKey={"gapWithSearchField"}
							setAttributes={setAttributes}
							max={50}
							units={["px", "%", "em"]}
							defaultValue={{ unit: "px", value: 20 }}
						/>
					)}
					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={searchButtonPadding}
						attributesKey={"searchButtonPadding"}
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
				</>
			)}
		</>
	);
};

export const SearchResultStyleTab = ({ attributes, setAttributes }) => {
	const {
		searchResultTitleTypography,
		searchResultTitleFontSize,
		searchResultTitleLineHeight,
		searchResultMetaTypography,
		searchResultMetaFontSize,
		searchResultMetaLineHeight,
		searchResultTitleColor,
		searchResultMetaColor,
		searchResultHighlightColor,
		searchResultItemSeparatorColor,
		searchResultBoxBackground,
		searchResultBoxBorder,
		searchResultHoverBoxBorder,
		searchResultBoxBorderWidth,
		searchResultHoverBoxBorderWidth,
		searchResultBoxBorderRadius,
		searchResultBoxHoverBorderRadius,
		searchResultBoxPadding,
		searchResultImgBorderRadius,
		searchResultTitleGlobalTypography,
		searchResultMetaGlobalTypography,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			<TypographyNew
				attributes={{
					family: searchResultTitleTypography,
					familyKey: "searchResultTitleTypography",
					fontSize: searchResultTitleFontSize,
					fontSizeKey: "searchResultTitleFontSize",
					lineHeight: searchResultTitleLineHeight,
					lineHeightKey: "searchResultTitleLineHeight",
					globalTypo: searchResultTitleGlobalTypography,
					globalTypoKey: "searchResultTitleGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 18,
				}}
				lineDefaultValue={{ unit: "px", value: 20 }}
				typographyLabel={__("Title Typography", "post-carousel")}
			/>
			<TypographyNew
				typographyLabel={__("Meta Typography", "post-carousel")}
				attributes={{
					family: searchResultMetaTypography,
					familyKey: "searchResultMetaTypography",
					fontSize: searchResultMetaFontSize,
					fontSizeKey: "searchResultMetaFontSize",
					lineHeight: searchResultMetaLineHeight,
					lineHeightKey: "searchResultMetaLineHeight",
					globalTypo: searchResultMetaGlobalTypography,
					globalTypoKey: "searchResultMetaGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 14,
				}}
				lineDefaultValue={{ unit: "px", value: 16 }}
			/>
			<SPToggleGroupControl
				attributes={colorState}
				attributesKey={"colorState"}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hoverColor" },
				]}
			/>
			<SpColorPicker
				label={colorState === "hoverColor" ? "Hover Title Color" : "Title Color"}
				value={searchResultTitleColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						searchResultTitleColor: {
							...searchResultTitleColor,
							[colorState]: newValue,
						},
					})
				}
			/>
			<SpColorPicker
				label={colorState === "hoverColor" ? "Hover Meta Color" : "Meta Color"}
				value={searchResultMetaColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						searchResultMetaColor: {
							...searchResultMetaColor,
							[colorState]: newValue,
						},
					})
				}
			/>
			<SpColorPicker
				label={
					colorState === "hoverColor" ? "Hover Highlight Search Term Color" : "Highlight Search Term Color"
				}
				value={searchResultHighlightColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						searchResultHighlightColor: {
							...searchResultHighlightColor,
							[colorState]: newValue,
						},
					})
				}
			/>
			<SpColorPicker
				label={colorState === "hoverColor" ? "Hover Item Separator Color" : "Item Separator Color"}
				value={searchResultItemSeparatorColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						searchResultItemSeparatorColor: {
							...searchResultItemSeparatorColor,
							[colorState]: newValue,
						},
					})
				}
			/>
			<Background
				label={colorState === "hoverColor" ? "Hover Area Background Type" : "Area Background Type"}
				attributes={searchResultBoxBackground}
				attributesKey={"searchResultBoxBackground"}
				setAttributes={setAttributes}
				colorType={colorState === "hoverColor" ? "hover" : "color"}
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
			{colorState === "color" ? (
				<>
					<Border
						label={__("Area Border", "post-carousel")}
						attributes={{
							border: searchResultBoxBorder,
							borderWidth: searchResultBoxBorderWidth,
						}}
						attributesKey={{
							border: "searchResultBoxBorder",
							borderWidth: "searchResultBoxBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Area Border Radius", "post-carousel")}
						attributes={searchResultBoxBorderRadius}
						attributesKey={"searchResultBoxBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
					/>
				</>
			) : (
				<>
					<Border
						label={__("Hover Area Border", "post-carousel")}
						attributes={{
							border: searchResultHoverBoxBorder,
							borderWidth: searchResultHoverBoxBorderWidth,
						}}
						attributesKey={{
							border: "searchResultHoverBoxBorder",
							borderWidth: "searchResultHoverBoxBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Hover Area Border Radius", "post-carousel")}
						attributes={searchResultBoxHoverBorderRadius}
						attributesKey={"searchResultBoxHoverBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
					/>
				</>
			)}
			<Spacing
				label={__("Image Border Radius", "post-carousel")}
				attributes={searchResultImgBorderRadius}
				attributesKey={"searchResultImgBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
			/>
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={searchResultBoxPadding}
				attributesKey={"searchResultBoxPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
			/>
		</>
	);
};
export const MoreResultStyleTab = ({ attributes, setAttributes }) => {
	const {
		moreResultTypography,
		moreResultFontSize,
		moreResultLineHeight,
		moreResultGlobalTypography,
		moreResultColor,
		moreResultLatterSpacing,
		moreResultWordSpacing,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			<TypographyNew
				attributes={{
					family: moreResultTypography,
					familyKey: "moreResultTypography",
					fontSize: moreResultFontSize,
					fontSizeKey: "moreResultFontSize",
					lineHeight: moreResultLineHeight,
					lineHeightKey: "moreResultLineHeight",
					letterSpacing: moreResultLatterSpacing,
					letterSpacingKey: "moreResultLatterSpacing",
					wordSpacing: moreResultWordSpacing,
					wordSpacingKey: "moreResultWordSpacing",
					globalTypo: moreResultGlobalTypography,
					globalTypoKey: "moreResultGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 14,
				}}
				lineDefaultValue={1.2}
				typographyLabel={__("Typography", "post-carousel")}
			/>

			<SPToggleGroupControl
				attributes={colorState}
				attributesKey={"colorState"}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hoverColor" },
				]}
			/>
			<SpColorPicker
				label={colorState === "hoverColor" ? "Hover Color" : "Color"}
				value={moreResultColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						moreResultColor: {
							...moreResultColor,
							[colorState]: newValue,
						},
					})
				}
			/>
		</>
	);
};
export const PopupCanvasStyleTab = ({ attributes, setAttributes }) => {
	const {
		popupHeadingTypography,
		popupHeadingFontSize,
		popupCloseIconColor,
		popupHeadingLineHeight,
		popupCanvasBorder,
		popupHeadingLatterSpacing,
		popupHeadingWordSpacing,
		popupHeadingGlobalTypography,
		popupHeadingColor,
		popupCanvasBgColor,
		popupCanvasBorderWidth,
		popupCanvasHoverBorder,
		popupCanvasHoverBorderWidth,
		popupCanvasBorderRadius,
		popupCanvasPadding,
		popupCanvasBoxShadowEnable,
		popupCanvasBoxShadowValue,
		popupCanvasMargin,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			<TypographyNew
				attributes={{
					family: popupHeadingTypography,
					familyKey: "popupHeadingTypography",
					fontSize: popupHeadingFontSize,
					fontSizeKey: "popupHeadingFontSize",
					lineHeight: popupHeadingLineHeight,
					lineHeightKey: "popupHeadingLineHeight",
					letterSpacing: popupHeadingLatterSpacing,
					letterSpacingKey: "popupHeadingLatterSpacing",
					wordSpacing: popupHeadingWordSpacing,
					wordSpacingKey: "popupHeadingWordSpacing",
					globalTypo: popupHeadingGlobalTypography,
					globalTypoKey: "popupHeadingGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 14,
				}}
				lineDefaultValue={1.2}
				typographyLabel={__("Typography", "post-carousel")}
				fontSizePresetType="heading"
			/>

			<SPToggleGroupControl
				attributes={colorState}
				attributesKey={"colorState"}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hoverColor" },
				]}
			/>

			<SpColorPicker
				label={colorState === "hoverColor" ? "Hover Color" : "Color"}
				value={popupHeadingColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						popupHeadingColor: {
							...popupHeadingColor,
							[colorState]: newValue,
						},
					})
				}
			/>

			<SpColorPicker
				label={colorState === "hoverColor" ? "Hover Close Icon  Color" : "Close Icon  Color"}
				value={popupCloseIconColor[colorState]}
				onChange={(newValue) =>
					setAttributes({
						popupCloseIconColor: {
							...popupCloseIconColor,
							[colorState]: newValue,
						},
					})
				}
			/>

			<Background
				label={colorState === "hoverColor" ? "Hover Canvas Background Type" : "Canvas Background Type"}
				attributes={popupCanvasBgColor}
				attributesKey={"popupCanvasBgColor"}
				setAttributes={setAttributes}
				colorType={colorState === "hoverColor" ? "hover" : "color"}
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
			{colorState === "color" ? (
				<>
					<Border
						attributes={{
							border: popupCanvasBorder,
							borderWidth: popupCanvasBorderWidth,
						}}
						attributesKey={{
							border: "popupCanvasBorder",
							borderWidth: "popupCanvasBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
				</>
			) : (
				<>
					<Border
						attributes={{
							border: popupCanvasHoverBorder,
							borderWidth: popupCanvasHoverBorderWidth,
						}}
						attributesKey={{
							border: "popupCanvasHoverBorder",
							borderWidth: "popupCanvasHoverBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
				</>
			)}
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={popupCanvasBorderRadius}
				attributesKey={"popupCanvasBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "2",
						right: "2",
						bottom: "2",
						left: "2",
					},
				}}
				indicator={"radius"}
			/>
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={popupCanvasPadding}
				attributesKey={"popupCanvasPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "24",
						right: "24",
						bottom: "24",
						left: "24",
					},
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={popupCanvasMargin}
				attributesKey={"popupCanvasMargin"}
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
			<Toggle
				label={__("Box Shadow", "post-carousel")}
				attributes={popupCanvasBoxShadowEnable}
				attributesKey={"popupCanvasBoxShadowEnable"}
				setAttributes={setAttributes}
			/>
			{popupCanvasBoxShadowEnable && (
				<>
					<BoxShadow
						attributes={popupCanvasBoxShadowValue}
						attributesKey={"popupCanvasBoxShadowValue"}
						setAttributes={setAttributes}
					/>
				</>
			)}
		</>
	);
};
