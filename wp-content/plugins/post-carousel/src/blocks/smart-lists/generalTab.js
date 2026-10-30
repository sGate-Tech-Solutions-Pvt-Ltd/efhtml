import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	Layouts,
	Background,
	Border,
	Spacing,
	Toggle,
	BoxShadow,
	SPRangeControl,
	SelectField,
	SpColorPicker,
	TypographyNew,
	MediaPicker,
	SpSVGIconPicker,
} from "../../components";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import IconsLibrary from "../../components/iconLibrary/iconLibrary";
import { AlignCenter, AlignLeft, AlignRight, AlignTop, AlignMiddle, AlignBottom } from "../../icons/icons";

import { BgIcon, GradientIcon, Image } from "../../components/background/svgIcon";
import {
	LayoutOne,
	LayoutTwo,
	LayoutFour,
	LayoutFive,
	BackgroundShapeCircle,
	BackgroundShapeSquare,
	BackgroundShapeHexagon,
	BackgroundShapeDiamond,
	BackgroundShapeStarburst,
} from "./icons";
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

export const SmartListsGeneralTab = ({ attributes, setAttributes }) => {
	const {
		smartListsLayout,
		listOrientation,
		listsAlignment,
		spaceBetweenLists,
		iconContentGap,
		dividerEnable,
		dividerStyle,
		dividerWidth,
		dividerColor,
		listItemsWidth,
	} = attributes;

	// Default config for layouts
	const layoutConfigs = {
		"layout-one": {
			dividerEnable: false,
			descriptionEnable: false,
			iconBackgroundEnable: false,
			iconContentGap: {
				...iconContentGap,
				device: { ...iconContentGap.device, Desktop: "10" },
			},
			spaceBetweenLists: {
				...spaceBetweenLists,
				device: { ...spaceBetweenLists.device, Desktop: "24" },
			},
			listOrientation: "vertical",
			iconPosition: 0,
		},
		"layout-two": {
			dividerEnable: true,
			descriptionEnable: true,
			iconBackgroundEnable: true,
			iconContentGap: {
				...iconContentGap,
				device: { ...iconContentGap.device, Desktop: "10" },
			},
			spaceBetweenLists: {
				...spaceBetweenLists,
				device: { ...spaceBetweenLists.device, Desktop: "24" },
			},
			listOrientation: "vertical",
			iconPosition: 0,
		},
		"layout-three": {
			dividerEnable: false,
			descriptionEnable: true,
			iconBackgroundEnable: true,
			iconContentGap: {
				...iconContentGap,
				device: { ...iconContentGap.device, Desktop: "10" },
			},
			spaceBetweenLists: {
				...spaceBetweenLists,
				device: { ...spaceBetweenLists.device, Desktop: "24" },
			},
			listOrientation: "vertical",
			iconPosition: 0,
		},
		"layout-four": {
			dividerEnable: false,
			descriptionEnable: true,
			iconBackgroundEnable: true,
			iconContentGap: {
				...iconContentGap,
				device: { ...iconContentGap.device, Desktop: "10" },
			},
			spaceBetweenLists: {
				...spaceBetweenLists,
				device: { ...spaceBetweenLists.device, Desktop: "12" },
			},
			listOrientation: "vertical",
			iconPosition: 0,
		},
		"layout-five": {
			dividerEnable: false,
			descriptionEnable: true,
			iconBackgroundEnable: true,
			iconContentGap: {
				...iconContentGap,
				device: { ...iconContentGap.device, Desktop: "18" },
			},
			listOrientation: "horizontal",
			iconPosition: "top",
		},
	};

	const layoutChange = (newValue) => {
		if (newValue === smartListsLayout) {
			return;
		}
		setAttributes({ smartListsLayout: newValue });

		setAttributes({
			smartListsLayout: newValue,
			...(layoutConfigs[newValue] || {}),
		});
	};

	return (
		<div className="sp-smart-post-lists-general">
			<Layouts
				attributes={smartListsLayout}
				setAttributes={setAttributes}
				attributesKey={"smartListsLayout"}
				displayActive={true}
				showDemoTitle={true}
				grid={3}
				onChange={layoutChange}
				label={__("List Preset", "post-carousel")}
				items={[
					{
						icon: <LayoutOne value={smartListsLayout} />,
						value: "layout-one",
					},
					{
						icon: <LayoutTwo value={smartListsLayout} />,
						value: "layout-two",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3592"
					},

					{
						icon: <LayoutFour value={smartListsLayout} />,
						value: "layout-four",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3592"
					},
					{
						icon: <LayoutFive value={smartListsLayout} />,
						value: "layout-five",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3592"
					},
				]}
			/>

			<div>
				<div className="sp-smart-post-component-title">{__("List Orientation", "post-carousel")}</div>

				<SPToggleGroupControl
					attributes={listOrientation}
					items={[
						{
							label: __("Horizontal", "post-carousel"),
							value: "horizontal",
						},
						{
							label: __("Vertical", "post-carousel"),
							value: "vertical",
						},
					]}
					onClick={(val) => setAttributes({ listOrientation: val })}
				/>

				<SPToggleGroupControl
					label={__("Alignment", "post-carousel")}
					attributes={listsAlignment}
					attributesKey={"listsAlignment"}
					setAttributes={setAttributes}
					items={[
						{ label: <AlignLeft />, value: "start" },
						{ label: <AlignCenter />, value: "center" },
						{ label: <AlignRight />, value: "end" },
					]}
				/>

				<SPRangeControl
					label={__("Space Between Lists", "post-carousel")}
					attributes={spaceBetweenLists}
					attributesKey={"spaceBetweenLists"}
					setAttributes={setAttributes}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: 8 }}
					max={100}
				/>

				<SPRangeControl
					label={__("Icon to Content Gap", "post-carousel")}
					attributes={iconContentGap}
					attributesKey={"iconContentGap"}
					setAttributes={setAttributes}
					units={["PX", "EM"]}
					defaultValue={{ unit: "px", value: 10 }}
					max={100}
				/>
				<SPRangeControl
					label={__("Items Width", "post-carousel")}
					attributes={listItemsWidth}
					attributesKey={"listItemsWidth"}
					setAttributes={setAttributes}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: "" }}
					max={400}
					pro={true}
				/>

				<>
					<Toggle
						label={__("Divider", "post-carousel")}
						attributes={dividerEnable}
						attributesKey={"dividerEnable"}
						setAttributes={setAttributes}
						pro={true}
					/>

					{dividerEnable && (
						<>
							<SelectField
								label={__("Divider Style", "post-carousel")}
								attributes={dividerStyle}
								attributesKey={"dividerStyle"}
								setAttributes={setAttributes}
								items={[
									{
										label: __("Solid", "post-carousel"),
										value: "solid",
									},
									{
										label: __("Dotted", "post-carousel"),
										value: "dotted",
									},
									{
										label: __("Dashed", "post-carousel"),
										value: "dashed",
									},
									{
										label: __("Double Line", "post-carousel"),
										value: "double",
									},
								]}
							/>
							<SPRangeControl
								label={__("Divider Width", "post-carousel")}
								attributes={dividerWidth}
								attributesKey={"dividerWidth"}
								setAttributes={setAttributes}
								units={["px", "em"]}
								defaultValue={{
									unit: "px",
									value: 1,
								}}
								max={20}
							/>
							<SpColorPicker
								label={__("Divider Color", "post-carousel")}
								value={dividerColor}
								onChange={(newColor) =>
									setAttributes({
										dividerColor: newColor,
									})
								}
								defaultColor="#D9D9D9"
							/>
						</>
					)}
				</>
			</div>
			<hr />
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</div>
	);
};

export const SmartListsStyleTab = ({ attributes, setAttributes }) => {
	const {
		smartListsBg,
		smartListsBgImage,
		smartListsRadialShape,
		smartListsRadialPosition,
		smartListsBgImageScale,
		bgImageOverlayEnable,
		borderStyle,
		borderStyleWidth,
		borderRadius,
		boxShadowEnable,
		boxShadow,
		smartListsHoverBgImage,
		smartListsHoverRadialShape,
		smartListsHoverRadialPosition,
		smartListsBgHoverImageScale,
		bgImageOverlayHoverEnable,
		bgImageHoverOverlayOpacity,
		borderHoverStyle,
		borderHoverStyleWidth,
		borderHoverRadius,
		boxShadowHoverEnable,
		boxShadowHover,
		padding,
		margin,
		bgImageOverlayColor,
		bgImageOverlayOpacity,
	} = attributes;

	const [smartListsStyleType, setSmartListsStyleType] = useState("color");

	return (
		<>
			<SPToggleGroupControl
				attributes={smartListsStyleType}
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
				onClick={(val) => setSmartListsStyleType(val)}
			/>

			{smartListsStyleType === "color" && (
				<>
					<Background
						label={__("Background Style", "post-carousel")}
						colorLabel="Color"
						defaultColor="transparent"
						attributes={smartListsBg}
						attributesKey={"smartListsBg"}
						setAttributes={setAttributes}
						colorType={smartListsStyleType}
						enableImageSize={true}
						items={[
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
							{
								label: <Image />,
								value: "image",
								tooltip: __("Image", "post-carousel"),
							},
						]}
						imageObj={{
							imageKey: "smartListsBgImage",
							backgroundImage: smartListsBgImage,
						}}
					/>

					{smartListsBg[smartListsStyleType]?.style === "gradient" && (
						<>
							{/^radial-gradient/.test(smartListsBg[smartListsStyleType]?.gradient) && (
								<>
									<SelectField
										attributes={smartListsRadialShape}
										attributesKey={"smartListsRadialShape"}
										setAttributes={setAttributes}
										items={RADIAL_SHAPES}
									/>
									<SelectField
										attributes={smartListsRadialPosition}
										attributesKey={"smartListsRadialPosition"}
										setAttributes={setAttributes}
										items={RADIAL_POSITIONS}
									/>
								</>
							)}
						</>
					)}

					{smartListsBg[smartListsStyleType]?.style === "image" && (
						<>
							<SPToggleGroupControl
								label={__("Image Scale", "post-carousel")}
								attributes={smartListsBgImageScale}
								attributesKey={"smartListsBgImageScale"}
								setAttributes={setAttributes}
								items={[
									{
										label: __("None", "post-carousel"),
										value: "auto",
									},
									{
										label: __("Cover", "post-carousel"),
										value: "cover",
									},
									{
										label: __("Contain", "post-carousel"),
										value: "contain",
									},
								]}
							/>

							<Toggle
								label={__("Overlay", "post-carousel")}
								attributes={bgImageOverlayEnable}
								attributesKey={"bgImageOverlayEnable"}
								setAttributes={setAttributes}
							/>

							{bgImageOverlayEnable && (
								<>
									<SpColorPicker
										label={__("Overlay Color", "post-carousel")}
										value={bgImageOverlayColor.color}
										onChange={(newColor) =>
											setAttributes({
												bgImageOverlayColor: {
													...bgImageOverlayColor,
													color: newColor,
												},
											})
										}
										defaultColor="#fff"
									/>

									<SPRangeControl
										label={__("Overlay Opacity", "post-carousel")}
										attributes={bgImageOverlayOpacity}
										attributesKey={"bgImageOverlayOpacity"}
										setAttributes={setAttributes}
										max={1}
										step={0.1}
									/>
								</>
							)}
						</>
					)}
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
							attributes={boxShadow}
							attributesKey={"boxShadow"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			{smartListsStyleType === "hover" && (
				<>
					<Background
						label={__("Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="#fff"
						attributes={smartListsBg}
						attributesKey={"smartListsBg"}
						setAttributes={setAttributes}
						colorType={smartListsStyleType}
						enableImageSize={true}
						items={[
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
							{
								label: <Image />,
								value: "image",
								tooltip: __("Image", "post-carousel"),
							},
						]}
						imageObj={{
							imageKey: "smartListsHoverBgImage",
							backgroundImage: smartListsHoverBgImage,
						}}
					/>

					{smartListsBg[smartListsStyleType]?.style === "gradient" && (
						<>
							{/^radial-gradient/.test(smartListsBg[smartListsStyleType]?.gradient) && (
								<>
									<SelectField
										attributes={smartListsHoverRadialShape}
										attributesKey={"smartListsHoverRadialShape"}
										setAttributes={setAttributes}
										items={RADIAL_SHAPES}
									/>
									<SelectField
										attributes={smartListsHoverRadialPosition}
										attributesKey={"smartListsHoverRadialPosition"}
										setAttributes={setAttributes}
										items={RADIAL_POSITIONS}
									/>
								</>
							)}
						</>
					)}

					{smartListsBg[smartListsStyleType]?.style === "image" && (
						<>
							<SPToggleGroupControl
								label={__("Image Scale", "post-carousel")}
								attributes={smartListsBgHoverImageScale}
								attributesKey={"smartListsBgHoverImageScale"}
								setAttributes={setAttributes}
								items={[
									{
										label: __("None", "post-carousel"),
										value: "auto",
									},
									{
										label: __("Cover", "post-carousel"),
										value: "cover",
									},
									{
										label: __("Contain", "post-carousel"),
										value: "contain",
									},
								]}
							/>
							<Toggle
								label={__("Overlay", "post-carousel")}
								attributes={bgImageOverlayHoverEnable}
								attributesKey={"bgImageOverlayHoverEnable"}
								setAttributes={setAttributes}
							/>
							{bgImageOverlayHoverEnable && (
								<>
									<SpColorPicker
										label={__("Overlay Color", "post-carousel")}
										value={bgImageOverlayColor.hoverColor}
										onChange={(newColor) =>
											setAttributes({
												bgImageOverlayColor: {
													...bgImageOverlayColor,
													hoverColor: newColor,
												},
											})
										}
										defaultColor="#fff"
									/>

									<SPRangeControl
										label={__("Overlay Opacity", "post-carousel")}
										attributes={bgImageHoverOverlayOpacity}
										attributesKey={"bgImageHoverOverlayOpacity"}
										setAttributes={setAttributes}
										max={1}
										step={0.1}
									/>
								</>
							)}
						</>
					)}
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
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={margin}
				attributesKey={"margin"}
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
		smartListsLayout,
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
				attributes={iconEnable}
				attributesKey={"iconEnable"}
				setAttributes={setAttributes}
			/>
			{iconEnable && (
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
								disabled: true
							},
							{
								label: __("Custom", "post-carousel"),
								value: "custom",
								disabled: true
							},
						]}
					/>

					{["iconSet", "library"].includes(iconSource) && (
						<>
							{"iconSet" === iconSource && (
								<>
									<SpSVGIconPicker
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
								min={2}
							/>
						</>
					)}

					{iconSource === "custom" && (
						<>
							<MediaPicker
								label={__("", "post-carousel")}
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
								max={100}
								min={12}
							/>

							<SPRangeControl
								label={__("Height", "post-carousel")}
								attributes={iconCustomHeight}
								attributesKey={"iconCustomHeight"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 24 }}
								max={100}
								min={12}
							/>
						</>
					)}
					{smartListsLayout !== "layout-five" && (
						<SelectField
							label={__("Icon Position", "post-carousel")}
							attributes={iconPosition}
							attributesKey={"iconPosition"}
							setAttributes={setAttributes}
							items={[
								{
									label: __("Before", "post-carousel"),
									value: "0",
								},
								{
									label: __("After", "post-carousel"),
									value: "1",
								},
								{
									label: __("Top (Pro)", "post-carousel"),
									value: "top",
									disabled: true
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
			{iconEnable && (
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
										defaultColor="#dddddd"
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

							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={iconBorderRadius}
								attributesKey={"iconBorderRadius"}
								setAttributes={setAttributes}
								units={["Px", "%", "em"]}
								defaultValue={DEFAULT_SPACING}
								indicator={"radius"}
							/>
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

							{iconBackgroundEnable && backgroundShape === "backgroundShapeSquare" && (
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
	const { listTitleEnable, descriptionEnable, titleDescriptionGap, contentAlignment } = attributes;

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
				<>
					<SPRangeControl
						label={__("Title to Description Gap", "post-carousel")}
						attributes={titleDescriptionGap}
						attributesKey={"titleDescriptionGap"}
						setAttributes={setAttributes}
						units={["px", "em"]}
						defaultValue={{ unit: "px", value: 6 }}
						max={100}
					/>
				</>
			)}
			<SPToggleGroupControl
				label={__("Alignment", "post-carousel")}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
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
		descriptionEnable,
		descriptionTypography,
		descriptionFontSize,
		descriptionLatterSpacing,
		descriptionLineHeight,
		descriptionWordSpacing,
		titleColor,
		descriptionColor,
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
					value: 16,
				}}
				lineDefaultValue={{ unit: "px", value: 16 }}
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
					{
						label: __("Hover", "post-carousel"),
						value: "hover",
					},
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
