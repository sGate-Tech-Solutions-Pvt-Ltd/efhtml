import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { ensureHttps } from "../shared/helpFn";
import {
	Background,
	Border,
	Spacing,
	Toggle,
	BoxShadow,
	SPRangeControl,
	SelectField,
	SpColorPicker,
	TypographyNew,
	InputControl,
	MediaPicker,
	SpSVGIconPicker,
} from "../../components";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { AlignCenter, AlignLeft, AlignRight, AlignTop, AlignMiddle, AlignBottom } from "../../icons/icons";
import {
	BackgroundShapeCircle,
	BackgroundShapeSquare,
	BackgroundShapeHexagon,
	BackgroundShapeDiamond,
	BackgroundShapeStarburst,
} from "./icons";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";
import IconsLibrary from "../../components/iconLibrary/iconLibrary";
import ProInfo from "../../components/proInfo/proInfo";

const RADIAL_SHAPES = [
	{ label: __("Circle", "post-carousel"), value: "circle" },
	{ label: __("Ellipse", "post-carousel"), value: "ellipse" },
];

const RADIAL_POSITIONS = [
	{ label: __("Center Center", "post-carousel"), value: "center center" },
	{ label: __("Center Left", "post-carousel"), value: "center left" },
	{ label: __("Center Right", "post-carousel"), value: "center right" },
	{ label: __("Top Center", "post-carousel"), value: "top center" },
	{ label: __("Top Left", "post-carousel"), value: "top left" },
	{ label: __("Top Right", "post-carousel"), value: "top right" },
	{ label: __("Bottom Center", "post-carousel"), value: "bottom center" },
	{ label: __("Bottom Left", "post-carousel"), value: "bottom left" },
	{ label: __("Bottom Right", "post-carousel"), value: "bottom right" },
];

const BACKGROUND_ITEMS = [
	{
		label: <BgIcon />,
		value: "bgColor",
		tooltip: __("Solid", "post-carousel"),
	},
	{
		label: <GradientIcon />,
		value: "gradient",
		tooltip: __("Gradient", "post-carousel"),
	},
];

const DEFAULT_SPACING = {
	unit: "px",
	value: { top: "0", right: "0", bottom: "0", left: "0" },
};

export const SmartListGeneralTab = ({ attributes, setAttributes }) => {
	const {
		linkURL,
		openInNewTab,
		noFollowLink,
		// listItemWidth
	} = attributes;

	const handleLinkURL = (newLink) => {
		const link = ensureHttps(newLink);
		setAttributes({ linkURL: link });
	};

	return (
		<>
			<InputControl
				label={__("Link URL", "post-carousel")}
				attributes={linkURL}
				flex={false}
				inputType="text"
				attributesKey={"linkURL"}
				onChange={handleLinkURL}
				setAttributes={setAttributes}
				placeholder={__("#", "post-carousel")}
				pro={true}
			/>

			<Toggle
				label={__("Open In a New Tab", "post-carousel")}
				attributes={openInNewTab}
				attributesKey={"openInNewTab"}
				setAttributes={setAttributes}
				pro={true}
			/>

			<Toggle
				label={__("Add “No Follow” to the Link", "post-carousel")}
				attributes={noFollowLink}
				attributesKey={"noFollowLink"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{/* <SPRangeControl
				label={__("Width", "post-carousel")}
				attributes={listItemWidth}
				attributesKey={"listItemWidth"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
				max={600}
				min={0}
			/> */}
		</>
	);
};

export const SmartListStyleTab = ({ attributes, setAttributes }) => {
	const {
		smartListBg,
		borderStyle,
		borderStyleWidth,
		borderRadius,
		boxShadowEnable,
		listBoxShadow,
		borderHoverStyle,
		borderHoverStyleWidth,
		borderHoverRadius,
		boxShadowHoverEnable,
		boxShadowHover,
		padding,
	} = attributes;

	const [smartListStyleType, setSmartListStyleType] = useState("color");

	return (
		<>
			<SPToggleGroupControl
				attributes={smartListStyleType}
				items={[
					{
						label: __("Normal", "post-carousel"),
						value: "color",
					},
					{ label: __("Hover", "post-carousel"), value: "hover" },
				]}
				onClick={(val) => setSmartListStyleType(val)}
			/>

			{smartListStyleType === "color" && (
				<>
					<Background
						label={__("Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="#fff"
						attributes={smartListBg}
						attributesKey={"smartListBg"}
						setAttributes={setAttributes}
						colorType={smartListStyleType}
						pro={true}
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

					<Border
						attributes={{
							border: borderStyle,
							borderWidth: borderStyleWidth,
						}}
						setAttributes={setAttributes}
						attributesKey={{
							border: "borderStyle",
							borderWidth: "borderStyleWidth",
						}}
						btnType="normal"
					/>

					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={borderRadius}
						attributesKey={"borderRadius"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={DEFAULT_SPACING}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Shadow", "post-carousel")}
						attributes={boxShadowEnable}
						attributesKey={"boxShadowEnable"}
						setAttributes={setAttributes}
					/>
					{boxShadowEnable && (
						<BoxShadow
							label={__("Shadow", "post-carousel")}
							attributes={listBoxShadow}
							attributesKey={"listBoxShadow"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			{smartListStyleType === "hover" && (
				<>
					<Background
						label={__("Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="transparent"
						attributes={smartListBg}
						attributesKey={"smartListBg"}
						setAttributes={setAttributes}
						colorType={smartListStyleType}
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
						// items={ BACKGROUND_ITEMS }
					/>

					<Border
						attributes={{
							border: borderHoverStyle,
							borderWidth: borderHoverStyleWidth,
						}}
						setAttributes={setAttributes}
						attributesKey={{
							border: "borderHoverStyle",
							borderWidth: "borderHoverStyleWidth",
						}}
						btnType="normal"
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={borderHoverRadius}
						attributesKey={"borderHoverRadius"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={DEFAULT_SPACING}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Shadow", "post-carousel")}
						attributes={boxShadowHoverEnable}
						attributesKey={"boxShadowHoverEnable"}
						setAttributes={setAttributes}
					/>
					{boxShadowHoverEnable && (
						<BoxShadow
							label={__("Shadow", "post-carousel")}
							attributes={boxShadowHover}
							attributesKey={"boxShadowHover"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}

			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={padding}
				attributesKey={"padding"}
				setAttributes={setAttributes}
				units={["Px", "%", "em"]}
				defaultValue={DEFAULT_SPACING}
			/>
		</>
	);
};

export const IconImageGeneralTab = ({ attributes, setAttributes }) => {
	const {
		iconEnable,
		iconSource,
		svgIconName,
		iconName,
		iconSize,
		iconSourceCustom,
		iconCustomWidth,
		iconCustomHeight,
		iconPosition,
		iconEnableParent,
		parentListsLayout,
		iconAlignment,
	} = attributes;

	const iconAlignmentItems =
		iconPosition === "top"
			? [
					{ label: <AlignLeft />, value: "start" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "end" },
				]
			: [
					{ label: <AlignTop />, value: "start" },
					{ label: <AlignMiddle />, value: "center" },
					{ label: <AlignBottom />, value: "end" },
				];

	return (
		<>
			<Toggle
				label={__("Icon", "post-carousel")}
				attributes={iconEnable ?? iconEnableParent}
				attributesKey={"iconEnable"}
				setAttributes={setAttributes}
			/>
			{(iconEnable ?? iconEnableParent) && (
				<>
					<SPToggleGroupControl
						label={__("Icon Source", "post-carousel")}
						attributes={iconSource}
						attributesKey={"iconSource"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("Icon Set", "post-carousel"),
								value: "iconSet",
							},
							{
								label: __("Library", "post-carousel"),
								value: "library",
								disabled: true,
							},
							{
								label: __("Custom", "post-carousel"),
								value: "custom",
								disabled: true,
							},
						]}
					/>

					{["iconSet", "library"].includes(iconSource) && (
						<>
							{"iconSet" === iconSource && (
								<>
									<SpSVGIconPicker
										label={__("Icon Sources", "post-carousel")}
										attributes={svgIconName}
										attributesKey={"svgIconName"}
										setAttributes={setAttributes}
									/>
								</>
							)}

							{"library" === iconSource && (
								<IconsLibrary
									attributes={iconName}
									attributesKey={"iconName"}
									setAttributes={setAttributes}
								/>
							)}
							<SPRangeControl
								label={__("Icon Size", "post-carousel")}
								attributes={iconSize}
								attributesKey={"iconSize"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 24 }}
								max={100}
								min={9}
							/>
						</>
					)}

					{iconSource === "custom" && (
						<>
							<MediaPicker
								label={__("Icon/Image Source", "post-carousel")}
								imageKey="iconSourceCustom"
								enableImageSize={false}
								setAttributes={setAttributes}
								backgroundImage={iconSourceCustom}
							/>

							<SPRangeControl
								label={__("Width", "post-carousel")}
								attributes={iconCustomWidth}
								attributesKey={"iconCustomWidth"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 24 }}
							/>

							<SPRangeControl
								label={__("Height", "post-carousel")}
								attributes={iconCustomHeight}
								attributesKey={"iconCustomHeight"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 24 }}
							/>
						</>
					)}

					{parentListsLayout !== "layout-five" && (
						<SelectField
							label={__("Icon Position", "post-carousel")}
							attributes={iconPosition}
							attributesKey={"iconPosition"}
							setAttributes={setAttributes}
							items={[
								{
									label: __("Select Position", "post-carousel"),
								},
								{
									label: __("Before", "post-carousel"),
									value: "0",
								},
								{
									label: __("After", "post-carousel"),
									value: "1",
								},
								{
									label: __("Top", "post-carousel"),
									value: "top",
								},
							]}
						/>
					)}

					<SPToggleGroupControl
						label={__("Alignment", "post-carousel")}
						attributes={iconAlignment}
						attributesKey={"iconAlignment"}
						setAttributes={setAttributes}
						items={iconAlignmentItems}
					/>
				</>
			)}
		</>
	);
};

export const IconImageStyleTab = ({ attributes, setAttributes }) => {
	const {
		iconEnable,
		iconEnableParent,
		iconBackgroundEnable,
		backgroundShape,
		iconColor,
		iconBg,
		iconBgRadialShape,
		iconBgRadialPosition,
		iconBorderStyle,
		iconBorderStyleWidth,
		iconBorderRadius,
		iconBgHoverRadialShape,
		iconBgHoverRadialPosition,
		iconHoverBorderStyle,
		iconHoverBorderStyleWidth,
		iconHoverBorderRadius,
		iconPadding,
	} = attributes;

	const [iconStyleState, setIconStyleState] = useState("color");

	return (
		<>
			{(iconEnable ?? iconEnableParent) && (
				<>
					<Toggle
						label={__("Icon Background", "post-carousel")}
						attributes={iconBackgroundEnable}
						attributesKey={"iconBackgroundEnable"}
						setAttributes={setAttributes}
					/>
					{iconBackgroundEnable && (
						<>
							<div className="sp-smart-post-component-title">
								{__("Choose Background Shape", "post-carousel")}
							</div>
							<SPToggleGroupControl
								attributes={backgroundShape}
								items={[
									{
										label: <BackgroundShapeSquare value={backgroundShape} />,
										value: "backgroundShapeSquare",
									},
									{
										label: <BackgroundShapeCircle value={backgroundShape} />,
										value: "backgroundShapeCircle",
									},
									{
										label: <BackgroundShapeHexagon value={backgroundShape} />,
										value: "backgroundShapeHexagon",
									},
									{
										label: <BackgroundShapeDiamond value={backgroundShape} />,
										value: "backgroundShapeDiamond",
									},
									{
										label: <BackgroundShapeStarburst value={backgroundShape} />,
										value: "backgroundShapeStarburst",
									},
								]}
								onClick={(val) => setAttributes({ backgroundShape: val })}
							/>
						</>
					)}

					<SPToggleGroupControl
						attributes={iconStyleState}
						items={[
							{
								label: __("Normal", "post-carousel"),
								value: "color",
							},
							{
								label: __("Hover", "post-carousel"),
								value: "hover",
							},
						]}
						onClick={(val) => setIconStyleState(val)}
					/>

					{iconStyleState === "color" && (
						<>
							<SpColorPicker
								label={__("Icon Color", "post-carousel")}
								value={iconColor.color}
								onChange={(newColor) =>
									setAttributes({
										iconColor: {
											...iconColor,
											color: newColor,
										},
									})
								}
								defaultColor="#757575"
							/>
							{iconBackgroundEnable && (
								<>
									<Background
										label={__("Icon Background Style", "post-carousel")}
										colorLabel="Icon Background Color"
										defaultColor="#E9F4FF"
										attributes={iconBg}
										attributesKey={"iconBg"}
										setAttributes={setAttributes}
										colorType={iconStyleState}
										enableImageSize={true}
										items={BACKGROUND_ITEMS}
									/>

									{iconBg[iconStyleState]?.style === "gradient" && (
										<>
											{/^radial-gradient/.test(iconBg[iconStyleState]?.gradient) && (
												<>
													<SelectField
														attributes={iconBgRadialShape}
														attributesKey={"iconBgRadialShape"}
														setAttributes={setAttributes}
														items={RADIAL_SHAPES}
													/>
													<SelectField
														attributes={iconBgRadialPosition}
														attributesKey={"iconBgRadialPosition"}
														setAttributes={setAttributes}
														items={RADIAL_POSITIONS}
													/>
												</>
											)}
										</>
									)}
								</>
							)}

							<Border
								attributes={{
									border: iconBorderStyle,
									borderWidth: iconBorderStyleWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "iconBorderStyle",
									borderWidth: "iconBorderStyleWidth",
								}}
								btnType="normal"
							/>
							{backgroundShape === "backgroundShapeSquare" && (
								<Spacing
									label={__("Border Radius", "post-carousel")}
									attributes={iconBorderRadius}
									attributesKey={"iconBorderRadius"}
									setAttributes={setAttributes}
									units={["Px", "%", "em"]}
									defaultValue={DEFAULT_SPACING}
									indicator={"radius"}
								/>
							)}
						</>
					)}

					{iconStyleState === "hover" && (
						<>
							<SpColorPicker
								label={__("Icon Color", "post-carousel")}
								value={iconColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										iconColor: {
											...iconColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#757575"
							/>
							{iconBackgroundEnable && (
								<>
									<Background
										label={__("Icon Background Style", "post-carousel")}
										colorLabel="Icon Background Color"
										defaultColor="#E9F4FF"
										attributes={iconBg}
										attributesKey={"iconBg"}
										setAttributes={setAttributes}
										colorType={iconStyleState}
										enableImageSize={true}
										items={BACKGROUND_ITEMS}
									/>

									{iconBg[iconStyleState]?.style === "gradient" && (
										<>
											{/^radial-gradient/.test(iconBg[iconStyleState]?.gradient) && (
												<>
													<SelectField
														attributes={iconBgHoverRadialShape}
														attributesKey={"iconBgHoverRadialShape"}
														setAttributes={setAttributes}
														items={RADIAL_SHAPES}
													/>
													<SelectField
														attributes={iconBgHoverRadialPosition}
														attributesKey={"iconBgHoverRadialPosition"}
														setAttributes={setAttributes}
														items={RADIAL_POSITIONS}
													/>
												</>
											)}
										</>
									)}
								</>
							)}

							<Border
								attributes={{
									border: iconHoverBorderStyle,
									borderWidth: iconHoverBorderStyleWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "iconHoverBorderStyle",
									borderWidth: "iconHoverBorderStyleWidth",
								}}
								btnType="normal"
							/>
							{backgroundShape === "backgroundShapeSquare" && (
								<Spacing
									label={__("Border Radius", "post-carousel")}
									attributes={iconHoverBorderRadius}
									attributesKey={"iconHoverBorderRadius"}
									setAttributes={setAttributes}
									units={["Px", "%", "em"]}
									defaultValue={DEFAULT_SPACING}
									indicator={"radius"}
								/>
							)}
						</>
					)}

					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={iconPadding}
						attributesKey={"iconPadding"}
						setAttributes={setAttributes}
						units={["Px", "em"]}
						defaultValue={DEFAULT_SPACING}
					/>
				</>
			)}
		</>
	);
};

export const ContentGeneralTab = ({ attributes, setAttributes }) => {
	const { listTitleEnable, descriptionEnable, titleDescriptionGap } = attributes;

	return (
		<>
			<Toggle
				label={__("List Title", "post-carousel")}
				attributes={listTitleEnable}
				attributesKey={"listTitleEnable"}
				setAttributes={setAttributes}
			/>

			<Toggle
				label={__("Description", "post-carousel")}
				attributes={descriptionEnable}
				attributesKey={"descriptionEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>

			{listTitleEnable && descriptionEnable && (
				<SPRangeControl
					label={__("Title to Description Gap", "post-carousel")}
					attributes={titleDescriptionGap}
					attributesKey={"titleDescriptionGap"}
					setAttributes={setAttributes}
					units={["px", "em"]}
					defaultValue={{ unit: "px", value: "" }}
					max={100}
				/>
			)}
		</>
	);
};

export const ContentStyleTab = ({ attributes, setAttributes }) => {
	const {
		titleTypography,
		titleFontSize,
		titleLatterSpacing,
		titleLineHeight,
		titleWordSpacing,
		descriptionTypography,
		descriptionFontSize,
		descriptionLatterSpacing,
		descriptionLineHeight,
		descriptionWordSpacing,
		titleColor,
		descriptionColor,
		descriptionEnable,
	} = attributes;

	const [contentStyleType, setContentStyleType] = useState("color");

	return (
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
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 20,
				}}
				lineDefaultValue={{ unit: "px", value: 27.5 }}
				typographyLabel={__("Title Typography", "post-carousel")}
			/>
			{descriptionEnable && (
				<TypographyNew
					attributes={{
						family: descriptionTypography,
						familyKey: "descriptionTypography",
						fontSize: descriptionFontSize,
						fontSizeKey: "descriptionFontSize",
						fontSpacing: descriptionLatterSpacing,
						fontSpacingKey: "descriptionLatterSpacing",
						lineHeight: descriptionLineHeight,
						lineHeightKey: "descriptionLineHeight",
						wordSpacing: descriptionWordSpacing,
						wordSpacingKey: "descriptionWordSpacing",
					}}
					setAttributes={setAttributes}
					spacingDefaultValue={{ unit: "px", value: 0 }}
					fontSizeDefault={{
						unit: "px",
						value: 14,
					}}
					lineDefaultValue={{ unit: "px", value: 27.5 }}
					typographyLabel={__("Description Typography", "post-carousel")}
				/>
			)}

			<SPToggleGroupControl
				attributes={contentStyleType}
				items={[
					{
						label: __("Normal", "post-carousel"),
						value: "color",
					},
					{ label: __("Hover", "post-carousel"), value: "hover" },
				]}
				onClick={(val) => setContentStyleType(val)}
			/>

			{contentStyleType === "color" && (
				<>
					<SpColorPicker
						label={__("Title Color", "post-carousel")}
						value={titleColor.color}
						onChange={(newColor) =>
							setAttributes({
								titleColor: {
									...titleColor,
									color: newColor,
								},
							})
						}
						defaultColor="#2F2F2F"
					/>
					{descriptionEnable && (
						<SpColorPicker
							label={__("Description Color", "post-carousel")}
							value={descriptionColor.color}
							onChange={(newColor) =>
								setAttributes({
									descriptionColor: {
										...descriptionColor,
										color: newColor,
									},
								})
							}
							defaultColor="#757575"
						/>
					)}
				</>
			)}
			{contentStyleType === "hover" && (
				<>
					<SpColorPicker
						label={__("Title Color", "post-carousel")}
						value={titleColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								titleColor: {
									...titleColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor="#2F2F2F"
					/>
					{descriptionEnable && (
						<SpColorPicker
							label={__("Description Color", "post-carousel")}
							value={descriptionColor.hoverColor}
							onChange={(newColor) =>
								setAttributes({
									descriptionColor: {
										...descriptionColor,
										hoverColor: newColor,
									},
								})
							}
							defaultColor="#757575"
						/>
					)}
				</>
			)}
		</>
	);
};

export const BadgeGeneralTab = ({ attributes, setAttributes }) => {
	const { badgeEnable, badgeLabel } = attributes;

	return (
		<>
			<Toggle
				label={__("Badge", "post-carousel")}
				attributes={badgeEnable}
				attributesKey={"badgeEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{badgeEnable && (
				<InputControl
					label={__("Badge Label", "post-carousel")}
					attributes={badgeLabel}
					flex={false}
					inputType="text"
					attributesKey={"badgeLabel"}
					setAttributes={setAttributes}
					placeholder={__("HOT", "post-carousel")}
				/>
			)}
		</>
	);
};

export const BadgeStyleTab = ({ attributes, setAttributes }) => {
	const {
		badgeTypography,
		badgeFontSize,
		badgeLatterSpacing,
		badgeLineHeight,
		badgeWordSpacing,
		badgeColor,
		badgeBgColor,
		badgeBorderStyle,
		badgeBorderStyleWidth,
		badgeBorderRadius,
		badgePadding,
		badgeMargin,
		badgeEnable,
	} = attributes;

	return (
		<>
			{badgeEnable && (
				<>
					<TypographyNew
						attributes={{
							family: badgeTypography,
							familyKey: "badgeTypography",
							fontSize: badgeFontSize,
							fontSizeKey: "badgeFontSize",
							fontSpacing: badgeLatterSpacing,
							fontSpacingKey: "badgeLatterSpacing",
							lineHeight: badgeLineHeight,
							lineHeightKey: "badgeLineHeight",
							wordSpacing: badgeWordSpacing,
							wordSpacingKey: "badgeWordSpacing",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: 20,
						}}
						lineDefaultValue={{ unit: "px", value: 27.5 }}
						typographyLabel={__("Typography", "post-carousel")}
					/>

					<SpColorPicker
						label={__("Text Color", "post-carousel")}
						value={badgeColor}
						onChange={(newColor) => setAttributes({ badgeColor: newColor })}
						defaultColor="#0255A7"
					/>
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={badgeBgColor}
						onChange={(newColor) => setAttributes({ badgeBgColor: newColor })}
						defaultColor="#DFECFF"
					/>

					<Border
						attributes={{
							border: badgeBorderStyle,
							borderWidth: badgeBorderStyleWidth,
						}}
						setAttributes={setAttributes}
						attributesKey={{
							border: "badgeBorderStyle",
							borderWidth: "badgeBorderStyleWidth",
						}}
						btnType="normal"
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={badgeBorderRadius}
						attributesKey={"badgeBorderRadius"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={DEFAULT_SPACING}
						indicator={"radius"}
					/>

					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={badgePadding}
						attributesKey={"badgePadding"}
						setAttributes={setAttributes}
						units={["Px", "em"]}
						defaultValue={DEFAULT_SPACING}
					/>
					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={badgeMargin}
						attributesKey={"badgeMargin"}
						setAttributes={setAttributes}
						units={["Px", "em"]}
						defaultValue={DEFAULT_SPACING}
					/>
				</>
			)}
		</>
	);
};
