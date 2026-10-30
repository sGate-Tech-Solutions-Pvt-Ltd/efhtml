import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef } from "@wordpress/element";
import { ensureHttps, priceLink } from "../shared/helpFn";
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
	InputControl,
	MediaPicker,
	Divider,
} from "../../components";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { LayoutOne, LayoutTwo, LayoutThree, LayoutFour, LayoutFive } from "./icons";
import { BgIcon, GradientIcon, Image, TransparentIcon } from "../../components/background/svgIcon";
import useDefaultValue from "../../hooks/useDefaultValue";
import IconsLibrary from "../../components/iconLibrary/iconLibrary";
import ProInfo from "../../components/proInfo/proInfo";

export const InfoBoxGeneralTab = ({ attributes, setAttributes }) => {
	const { infoBoxLayout, contentAlignment, separatorMargin, titleMargin, caMargin, iconPositionLayoutFive } =
		attributes;
	const layoutNameRef = useRef(infoBoxLayout);

	const layoutChange = (newValue) => {
		if (newValue === infoBoxLayout) {
			return;
		}
		setAttributes({ infoBoxLayout: newValue });

		if (newValue === "smart-info-box-layout-five" && iconPositionLayoutFive === "top-content") {
			setAttributes({
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							...titleMargin.device.Desktop,
							top: 25,
						},
					},
				},
			});
		}

		if (newValue === "smart-info-box-layout-five" && iconPositionLayoutFive === "bottom-content") {
			setAttributes({
				caMargin: {
					...caMargin,
					device: {
						...caMargin.device,
						Desktop: {
							...caMargin.device.Desktop,
							bottom: 25,
						},
					},
				},
			});
		}

		if (newValue !== "smart-info-box-layout-five") {
			setAttributes({
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							...titleMargin.device.Desktop,
							bottom: 8,
							top: 0,
						},
					},
				},
			});
			setAttributes({
				caMargin: {
					...caMargin,
					device: {
						...caMargin.device,
						Desktop: {
							...caMargin.device.Desktop,
							bottom: 0,
						},
					},
				},
			});
		}
	};

	useEffect(() => {
		if (layoutNameRef.current === infoBoxLayout) {
			return;
		}
		layoutNameRef.current = infoBoxLayout;
		if (infoBoxLayout === "smart-info-box-layout-one" || infoBoxLayout === "smart-info-box-layout-five") {
			setAttributes({ contentAlignment: "center" });
		}
		if (
			infoBoxLayout === "smart-info-box-layout-two" ||
			infoBoxLayout === "smart-info-box-layout-three" ||
			infoBoxLayout === "smart-info-box-layout-four"
		) {
			setAttributes({ contentAlignment: "left" });
		}
	}, [infoBoxLayout]);

	return (
		<>
			<div className="info-box-layouts">
				<Layouts
					attributes={infoBoxLayout}
					setAttributes={setAttributes}
					attributesKey={"infoBoxLayout"}
					displayActive={true}
					grid={3}
					onChange={layoutChange}
					showDemoTitle={true}
					label={__("Info Box Layout", "post-carousel")}
					items={[
						{
							icon: <LayoutOne value={infoBoxLayout} />,
							value: "smart-info-box-layout-one",
						},
						{
							icon: <LayoutTwo value={infoBoxLayout} />,
							value: "smart-info-box-layout-two",
							type: "pro",
							demoLink: priceLink
						},
						{
							icon: <LayoutThree value={infoBoxLayout} />,
							value: "smart-info-box-layout-three",
							type: "pro",
							demoLink: priceLink
						},
						{
							icon: <LayoutFour value={infoBoxLayout} />,
							value: "smart-info-box-layout-four",
							type: "pro",
							demoLink: priceLink
						},
						{
							icon: <LayoutFive value={infoBoxLayout} />,
							value: "smart-info-box-layout-five",
							type: "pro",
							demoLink: priceLink
						},
					]}
				/>
			</div>

			<SPToggleGroupControl
				label={__("Content Alignment", "post-carousel")}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

export const InfoBoxStyleTab = ({ attributes, setAttributes }) => {
	const {
		infoBoxBg,
		borderStyle,
		borderStyleWidth,
		borderRadius,
		boxShadowEnable,
		boxShadow,
		borderHoverStyle,
		borderHoverStyleWidth,
		borderHoverRadius,
		boxShadowHoverEnable,
		boxShadowHover,
		margin,
		padding,
		infoBoxBgImage,
		imageScale,
		imageOverlayColor,
		imageOverlayOpacity,
		infoBoxRadialShape,
		infoBoxRadialPosition,
		infoBoxHoverBgImage,
		infoBoxHoverRadialShape,
		infoBoxHoverRadialPosition,
		imageHoverScale,
		imageHoverOverlayOpacity,
		infoBoxStyleType,
		imageOverlayEnable,
		imageOverlayHoverEnable,
	} = attributes;

	return (
		<>
			<SPToggleGroupControl
				attributes={infoBoxStyleType}
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
				onClick={(val) => setAttributes({ infoBoxStyleType: val })}
			/>

			{infoBoxStyleType === "color" && (
				<>
					<Background
						label={__("Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="#E9F4FF"
						attributes={infoBoxBg}
						attributesKey={"infoBoxBg"}
						setAttributes={setAttributes}
						colorType={infoBoxStyleType}
						enableImageSize={true}
						items={[
							{
								label: <TransparentIcon />,
								value: "transparent",
								tooltip: __("Transparent", "post-carousel"),
							},
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
							imageKey: "infoBoxBgImage",
							backgroundImage: infoBoxBgImage,
						}}
					/>

					{infoBoxBg[infoBoxStyleType]?.style === "gradient" && (
						<>
							{/^radial-gradient/.test(infoBoxBg[infoBoxStyleType]?.gradient) && (
								<>
									<SelectField
										attributes={infoBoxRadialShape}
										attributesKey={"infoBoxRadialShape"}
										setAttributes={setAttributes}
										items={[
											{
												label: __("Circle", "post-carousel"),
												value: "circle",
											},
											{
												label: __("Ellipse", "post-carousel"),
												value: "ellipse",
											},
										]}
									/>
									<SelectField
										attributes={infoBoxRadialPosition}
										attributesKey={"infoBoxRadialPosition"}
										setAttributes={setAttributes}
										items={[
											{
												label: __("Center Center", "post-carousel"),
												value: "center center",
											},
											{
												label: __("Center Left", "post-carousel"),
												value: "center left",
											},
											{
												label: __("Center Right", "post-carousel"),
												value: "center right",
											},
											{
												label: __("Top Center", "post-carousel"),
												value: "top center",
											},
											{
												label: __("Top Left", "post-carousel"),
												value: "top left",
											},
											{
												label: __("Top Right", "post-carousel"),
												value: "top right",
											},
											{
												label: __("Bottom Center", "post-carousel"),
												value: "bottom center",
											},
											{
												label: __("Bottom Left", "post-carousel"),
												value: "bottom left",
											},
											{
												label: __("Bottom Right", "post-carousel"),
												value: "bottom right",
											},
										]}
									/>
								</>
							)}
						</>
					)}

					{infoBoxBg[infoBoxStyleType]?.style === "image" && (
						<>
							<SPToggleGroupControl
								label={__("Image Scale", "post-carousel")}
								attributes={imageScale}
								attributesKey={"imageScale"}
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
								attributes={imageOverlayEnable}
								attributesKey={"imageOverlayEnable"}
								setAttributes={setAttributes}
							/>

							{imageOverlayEnable && (
								<>
									<SpColorPicker
										label={__("Overlay Color", "post-carousel")}
										value={imageOverlayColor.color}
										onChange={(newColor) =>
											setAttributes({
												imageOverlayColor: {
													...imageOverlayColor,
													color: newColor,
												},
											})
										}
										defaultColor="#fff"
									/>

									<SPRangeControl
										label={__("Overlay Opacity", "post-carousel")}
										attributes={imageOverlayOpacity}
										attributesKey={"imageOverlayOpacity"}
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
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "0",
								left: "0",
							},
						}}
						indicator={"radius"}
					/>

					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={boxShadowEnable}
						attributesKey={"boxShadowEnable"}
						setAttributes={setAttributes}
					/>
					{boxShadowEnable && (
						<BoxShadow
							label={__("Box Shadow", "post-carousel")}
							attributes={boxShadow}
							attributesKey={"boxShadow"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			{infoBoxStyleType === "hover" && (
				<>
					<Background
						label={__("Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="#E9F4FF"
						attributes={infoBoxBg}
						attributesKey={"infoBoxBg"}
						setAttributes={setAttributes}
						colorType={infoBoxStyleType}
						enableImageSize={true}
						items={[
							{
								label: <TransparentIcon />,
								value: "transparent",
								tooltip: __("Transparent", "post-carousel"),
							},
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
							imageKey: "infoBoxHoverBgImage",
							backgroundImage: infoBoxHoverBgImage,
						}}
					/>

					{infoBoxBg[infoBoxStyleType]?.style === "gradient" && (
						<>
							{/^radial-gradient/.test(infoBoxBg[infoBoxStyleType]?.gradient) && (
								<>
									<SelectField
										attributes={infoBoxHoverRadialShape}
										attributesKey={"infoBoxHoverRadialShape"}
										setAttributes={setAttributes}
										items={[
											{
												label: __("Circle", "post-carousel"),
												value: "circle",
											},
											{
												label: __("Ellipse", "post-carousel"),
												value: "ellipse",
											},
										]}
									/>
									<SelectField
										attributes={infoBoxHoverRadialPosition}
										attributesKey={"infoBoxHoverRadialPosition"}
										setAttributes={setAttributes}
										items={[
											{
												label: __("Center Center", "post-carousel"),
												value: "center center",
											},
											{
												label: __("Center Left", "post-carousel"),
												value: "center left",
											},
											{
												label: __("Center Right", "post-carousel"),
												value: "center right",
											},
											{
												label: __("Top Center", "post-carousel"),
												value: "top center",
											},
											{
												label: __("Top Left", "post-carousel"),
												value: "top left",
											},
											{
												label: __("Top Right", "post-carousel"),
												value: "top right",
											},
											{
												label: __("Bottom Center", "post-carousel"),
												value: "bottom center",
											},
											{
												label: __("Bottom Left", "post-carousel"),
												value: "bottom left",
											},
											{
												label: __("Bottom Right", "post-carousel"),
												value: "bottom right",
											},
										]}
									/>
								</>
							)}
						</>
					)}

					{infoBoxBg[infoBoxStyleType]?.style === "image" && (
						<>
							<SPToggleGroupControl
								label={__("Image Scale", "post-carousel")}
								attributes={imageHoverScale}
								attributesKey={"imageHoverScale"}
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
								attributes={imageOverlayHoverEnable}
								attributesKey={"imageOverlayHoverEnable"}
								setAttributes={setAttributes}
							/>
							{imageOverlayHoverEnable && (
								<>
									<SpColorPicker
										label={__("Overlay Color", "post-carousel")}
										value={imageOverlayColor.hoverColor}
										onChange={(newColor) =>
											setAttributes({
												imageOverlayColor: {
													...imageOverlayColor,
													hoverColor: newColor,
												},
											})
										}
										defaultColor="#fff"
									/>

									<SPRangeControl
										label={__("Overlay Opacity", "post-carousel")}
										attributes={imageHoverOverlayOpacity}
										attributesKey={"imageHoverOverlayOpacity"}
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
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "0",
								left: "0",
							},
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={boxShadowHoverEnable}
						attributesKey={"boxShadowHoverEnable"}
						setAttributes={setAttributes}
					/>
					{boxShadowHoverEnable && (
						<BoxShadow
							label={__("Box Shadow", "post-carousel")}
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
				defaultValue={{
					unit: "px",
					value: {
						top: "32",
						right: "24",
						bottom: "32",
						left: "24",
					},
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={margin}
				attributesKey={"margin"}
				setAttributes={setAttributes}
				units={["Px", "%", "em"]}
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
	);
};

export const IconImageGeneralTab = ({ attributes, setAttributes }) => {
	const {
		iconEnable,
		iconSize,
		iconPosition,
		iconSource,
		iconSourceCustom,
		iconCustomWidth,
		iconCustomHeight,
		infoBoxLayout,
		verticalAlignment,
		iconName,
		iconPositionLayoutFive,
		iconHorizontalAlignment,
		iconVerticalAlignment,
		separatorMargin,
		caMargin,
		titleMargin,
		iconMargin,
	} = attributes;

	const iconPositionOptions = {
		"smart-info-box-layout-one": [
			{ label: __("Above Title", "post-carousel"), value: "above-title" },
			{ label: __("Below Title", "post-carousel"), value: "below-title" },
			{ label: __("Bottom of Content", "post-carousel"), value: "bottom-content" },
		],
		"smart-info-box-layout-two": [
			{ label: __("Select Position", "post-carousel"), value: null },
			{ label: __("Left of Title", "post-carousel"), value: "left-title" },
			{ label: __("Right of Title", "post-carousel"), value: "right-title" },
		],
		"smart-info-box-layout-three": [
			{ label: __("Select Position", "post-carousel"), value: null },
			{ label: __("Left of Content", "post-carousel"), value: "left-content" },
			{ label: __("Right of Content", "post-carousel"), value: "right-content" },
		],
	};

	const handleIconPositionLayoutFive = (position) => {
		setAttributes({ iconPositionLayoutFive: position });

		if (position === "top-content") {
			setAttributes({
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							...titleMargin.device.Desktop,
							top: 25,
						},
					},
				},
			});
		} else {
			setAttributes({
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							...titleMargin.device.Desktop,
							top: 8,
						},
					},
				},
			});
		}

		if (position === "bottom-content") {
			setAttributes({
				caMargin: {
					...caMargin,
					device: {
						...caMargin.device,
						Desktop: {
							...caMargin.device.Desktop,
							bottom: 25,
						},
					},
				},
			});

			setAttributes({
				separatorMargin: {
					...separatorMargin,
					device: {
						...separatorMargin.device,
						Desktop: {
							...separatorMargin.device.Desktop,
							top: 8,
						},
					},
				},
			});
		} else {
			setAttributes({
				caMargin: {
					...caMargin,
					device: {
						...caMargin.device,
						Desktop: {
							...caMargin.device.Desktop,
							bottom: 0,
						},
					},
				},
			});
		}
	};

	const handleIconPositionChange = (val) => {
		setAttributes({ iconPosition: val });

		if (val === "bottom-content") {
			setAttributes({
				iconMargin: {
					...iconMargin,
					device: {
						...iconMargin.device,
						Desktop: {
							...iconMargin.device.Desktop,
							top: "24",
							bottom: "0",
						},
					},
				},
			});
		} else {
			setAttributes({
				iconMargin: {
					...iconMargin,
					device: {
						...iconMargin.device,
						Desktop: {
							...iconMargin.device.Desktop,
							top: "0",
							bottom: "24",
						},
					},
				},
			});
		}
	};

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
								label: __("Library", "post-carousel"),
								value: "library",
							},
							{
								label: __("Custom (Pro)", "post-carousel"),
								value: "custom",
								disabled: true,
							},
						]}
					/>
					{iconSource === "library" && (
						<>
							<IconsLibrary
								attributes={iconName}
								attributesKey={"iconName"}
								setAttributes={setAttributes}
							/>

							<SPRangeControl
								label={__("Icon Size", "post-carousel")}
								attributes={iconSize}
								attributesKey={"iconSize"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 32 }}
								max={500}
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
								units={["px", "em"]}
								defaultValue={{ unit: "px", value: 16 }}
							/>

							<SPRangeControl
								label={__("Height", "post-carousel")}
								attributes={iconCustomHeight}
								attributesKey={"iconCustomHeight"}
								setAttributes={setAttributes}
								units={["px", "em"]}
								defaultValue={{ unit: "px", value: 16 }}
							/>
						</>
					)}
					{["smart-info-box-layout-one", "smart-info-box-layout-two", "smart-info-box-layout-three"].includes(
						infoBoxLayout
					) && (
						<SelectField
							label={__("Icon Position", "post-carousel")}
							attributes={iconPosition}
							attributesKey={"iconPosition"}
							setAttributes={setAttributes}
							items={iconPositionOptions[infoBoxLayout] || []}
							onChange={handleIconPositionChange}
						/>
					)}
					{infoBoxLayout === "smart-info-box-layout-five" && (
						<>
							<SelectField
								label={__("Icon Position", "post-carousel")}
								attributes={iconPositionLayoutFive}
								attributesKey={"iconPositionLayoutFive"}
								setAttributes={setAttributes}
								onChange={handleIconPositionLayoutFive}
								items={[
									{
										label: __("Top of Content", "post-carousel"),
										value: "top-content",
									},
									{
										label: __("Bottom of Content", "post-carousel"),
										value: "bottom-content",
									},
									{
										label: __("Left of Content", "post-carousel"),
										value: "left-content",
									},
									{
										label: __("Right of Content", "post-carousel"),
										value: "right-content",
									},
								]}
							/>

							{["top-content", "bottom-content"].includes(iconPositionLayoutFive) && (
								<SPToggleGroupControl
									label={__("Horizontal Alignment", "post-carousel")}
									attributes={iconHorizontalAlignment}
									attributesKey={"iconHorizontalAlignment"}
									setAttributes={setAttributes}
									items={[
										{
											label: __("Left", "post-carousel"),
											value: "left",
										},
										{
											label: __("Center", "post-carousel"),
											value: "center",
										},
										{
											label: __("Right", "post-carousel"),
											value: "right",
										},
									]}
								/>
							)}
							{["left-content", "right-content"].includes(iconPositionLayoutFive) && (
								<SPToggleGroupControl
									label={__("Vertical Alignment", "post-carousel")}
									attributes={iconVerticalAlignment}
									attributesKey={"iconVerticalAlignment"}
									setAttributes={setAttributes}
									items={[
										{
											label: __("Top", "post-carousel"),
											value: "top",
										},
										{
											label: __("Middle", "post-carousel"),
											value: "center",
										},
										{
											label: __("Bottom", "post-carousel"),
											value: "bottom",
										},
									]}
								/>
							)}
						</>
					)}
					{infoBoxLayout === "smart-info-box-layout-three" && (
						<SPToggleGroupControl
							label={__("Vertical Alignment", "post-carousel")}
							attributes={verticalAlignment}
							attributesKey={"verticalAlignment"}
							setAttributes={setAttributes}
							items={[
								{
									label: __("Top", "post-carousel"),
									value: "flex-start",
								},
								{
									label: __("Middle", "post-carousel"),
									value: "center",
								},
								{
									label: __("Bottom", "post-carousel"),
									value: "flex-end",
								},
							]}
						/>
					)}
				</>
			)}
		</>
	);
};
export const IconImageStyleTab = ({ attributes, setAttributes }) => {
	const {
		iconHoverEffects,
		iconBorderStyle,
		iconBorderHoverStyle,
		iconBorderStyleWidth,
		iconBorderStyleHoverWidth,
		iconBorderRadius,
		iconBoxShadowEnable,
		iconBoxShadow,
		iconBorderHoverRadius,
		iconBoxShadowHoverEnable,
		iconBoxShadowHover,
		iconMargin,
		iconPadding,
		iconColor,
		iconOverlayColor,
		iconOverlayEnable,
		iconBg,
		iconOverlayOpacity,
		iconRadialShape,
		iconRadialPosition,
		iconHoverRadialPosition,
		iconHoverRadialShape,
		iconSource,
		iconEnable,
		infoBoxLayout,
		gapBetweenDescription,
		iconHoverEffectOpacity,
	} = attributes;

	const [iconStyleType, setIconStyleType] = useState("color");

	return (
		<>
			{iconEnable && (
				<>
					<SelectField
						label={__("Hover Effects", "post-carousel")}
						attributes={iconHoverEffects}
						attributesKey={"iconHoverEffects"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("Normal", "post-carousel"),
								value: "normal",
							},
							{
								label: __("Zoom In", "post-carousel"),
								value: "zoom-in",
							},
							{
								label: __("Zoom Out", "post-carousel"),
								value: "zoom-out",
							},
							{
								label: __("Slide Left", "post-carousel"),
								value: "slide-left",
							},
							{
								label: __("Slide Right", "post-carousel"),
								value: "slide-right",
							},
							{
								label: __("Opacity", "post-carousel"),
								value: "opacity",
							},
						]}
					/>
					{iconHoverEffects === "opacity" && (
						<SPRangeControl
							label={__("Opacity", "post-carousel")}
							attributes={iconHoverEffectOpacity}
							attributesKey={"iconHoverEffectOpacity"}
							setAttributes={setAttributes}
							max={1}
							step={0.1}
						/>
					)}
				</>
			)}

			{iconEnable && iconSource === "custom" && (
				<>
					<Toggle
						label={__("Icon/Image Overlay", "post-carousel")}
						attributes={iconOverlayEnable}
						attributesKey={"iconOverlayEnable"}
						setAttributes={setAttributes}
					/>
					{iconOverlayEnable && (
						<>
							<SpColorPicker
								label={__("Overlay Color", "post-carousel")}
								value={iconOverlayColor}
								onChange={(newColor) =>
									setAttributes({
										iconOverlayColor: newColor,
									})
								}
								defaultColor="#333333"
							/>

							<SPRangeControl
								label={__("Overlay Opacity", "post-carousel")}
								attributes={iconOverlayOpacity}
								attributesKey={"iconOverlayOpacity"}
								setAttributes={setAttributes}
								max={1}
								step={0.1}
							/>
						</>
					)}
				</>
			)}

			{iconEnable && (
				<>
					<SPToggleGroupControl
						attributes={iconStyleType}
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
						onClick={(val) => setIconStyleType(val)}
					/>

					{iconStyleType === "color" && (
						<>
							{iconSource === "library" && (
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
									defaultColor="#fff"
								/>
							)}

							<Background
								label={__("Background Type", "post-carousel")}
								colorLabel="Solid Color"
								defaultColor="#2F2F2F"
								attributes={iconBg}
								attributesKey={"iconBg"}
								setAttributes={setAttributes}
								colorType={iconStyleType}
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
								]}
							/>
							{/* {iconBg[iconStyleType]?.style === "gradient" && (
								<>
									{/^radial-gradient/.test(iconBg[iconStyleType]?.gradient) && (
										<>
											<SelectField
												attributes={iconRadialShape}
												attributesKey={"iconRadialShape"}
												setAttributes={setAttributes}
												items={[
													{
														label: __("Circle", "post-carousel"),
														value: "circle",
													},
													{
														label: __("Ellipse", "post-carousel"),
														value: "ellipse",
													},
												]}
											/>
											<SelectField
												attributes={iconRadialPosition}
												attributesKey={"iconRadialPosition"}
												setAttributes={setAttributes}
												items={[
													{
														label: __("Center Center", "post-carousel"),
														value: "center center",
													},
													{
														label: __("Center Left", "post-carousel"),
														value: "center left",
													},
													{
														label: __("Center Right", "post-carousel"),
														value: "center right",
													},
													{
														label: __("Top Center", "post-carousel"),
														value: "top center",
													},
													{
														label: __("Top Left", "post-carousel"),
														value: "top left",
													},
													{
														label: __("Top Right", "post-carousel"),
														value: "top right",
													},
													{
														label: __("Bottom Center", "post-carousel"),
														value: "bottom center",
													},
													{
														label: __("Bottom Left", "post-carousel"),
														value: "bottom left",
													},
													{
														label: __("Bottom Right", "post-carousel"),
														value: "bottom right",
													},
												]}
											/>
										</>
									)}
								</>
							)} */}
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
								defaultValue={{
									unit: "px",
									value: {
										top: "0",
										right: "0",
										bottom: "0",
										left: "0",
									},
								}}
								indicator={"radius"}
							/>

							<Toggle
								label={__("Box Shadow", "post-carousel")}
								attributes={iconBoxShadowEnable}
								attributesKey={"iconBoxShadowEnable"}
								setAttributes={setAttributes}
							/>
							{iconBoxShadowEnable && (
								<BoxShadow
									label={__("Box Shadow", "post-carousel")}
									attributes={iconBoxShadow}
									attributesKey={"iconBoxShadow"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}
					{iconStyleType === "hover" && (
						<>
							{iconSource === "library" && (
								<SpColorPicker
									label={__("Icon Hover Color", "post-carousel")}
									value={iconColor.hoverColor}
									onChange={(newColor) =>
										setAttributes({
											iconColor: {
												...iconColor,
												hoverColor: newColor,
											},
										})
									}
									defaultColor="#fff"
								/>
							)}

							<Background
								label={__("Background Type", "post-carousel")}
								colorLabel="Solid Color"
								defaultColor="#2F2F2F"
								attributes={iconBg}
								attributesKey={"iconBg"}
								setAttributes={setAttributes}
								colorType={iconStyleType}
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
								]}
							/>
							{iconBg[iconStyleType]?.style === "gradient" && (
								<>
									{/^radial-gradient/.test(iconBg[iconStyleType]?.gradient) && (
										<>
											<SelectField
												attributes={iconHoverRadialShape}
												attributesKey={"iconHoverRadialShape"}
												setAttributes={setAttributes}
												items={[
													{
														label: __("Circle", "post-carousel"),
														value: "circle",
													},
													{
														label: __("Ellipse", "post-carousel"),
														value: "ellipse",
													},
												]}
											/>
											<SelectField
												attributes={iconHoverRadialPosition}
												attributesKey={"iconHoverRadialPosition"}
												setAttributes={setAttributes}
												items={[
													{
														label: __("Center Center", "post-carousel"),
														value: "center center",
													},
													{
														label: __("Center Left", "post-carousel"),
														value: "center left",
													},
													{
														label: __("Center Right", "post-carousel"),
														value: "center right",
													},
													{
														label: __("Top Center", "post-carousel"),
														value: "top center",
													},
													{
														label: __("Top Left", "post-carousel"),
														value: "top left",
													},
													{
														label: __("Top Right", "post-carousel"),
														value: "top right",
													},
													{
														label: __("Bottom Center", "post-carousel"),
														value: "bottom center",
													},
													{
														label: __("Bottom Left", "post-carousel"),
														value: "bottom left",
													},
													{
														label: __("Bottom Right", "post-carousel"),
														value: "bottom right",
													},
												]}
											/>
										</>
									)}
								</>
							)}
							<Border
								attributes={{
									border: iconBorderHoverStyle,
									borderWidth: iconBorderStyleHoverWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "iconBorderHoverStyle",
									borderWidth: "iconBorderStyleHoverWidth",
								}}
								btnType="normal"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={iconBorderHoverRadius}
								attributesKey={"iconBorderHoverRadius"}
								setAttributes={setAttributes}
								units={["Px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "0",
										right: "0",
										bottom: "0",
										left: "0",
									},
								}}
								indicator={"radius"}
							/>
							<Toggle
								label={__("Box Shadow", "post-carousel")}
								attributes={iconBoxShadowHoverEnable}
								attributesKey={"iconBoxShadowHoverEnable"}
								setAttributes={setAttributes}
							/>
							{iconBoxShadowHoverEnable && (
								<BoxShadow
									label={__("Box Shadow", "post-carousel")}
									attributes={iconBoxShadowHover}
									attributesKey={"iconBoxShadowHover"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}
					<Divider position="sp-w-100pct" />

					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={iconPadding}
						attributesKey={"iconPadding"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "14",
								right: "14",
								bottom: "14",
								left: "14",
							},
						}}
					/>
					{infoBoxLayout === "smart-info-box-layout-one" && (
						<Spacing
							label={__("Margin", "post-carousel")}
							attributes={iconMargin}
							attributesKey={"iconMargin"}
							setAttributes={setAttributes}
							units={["Px", "%", "em"]}
							defaultValue={{
								unit: "px",
								value: {
									top: "0",
									right: "0",
									bottom: "24",
									left: "0",
								},
							}}
						/>
					)}
					{infoBoxLayout === "smart-info-box-layout-two" && (
						<Spacing
							label={__("Gap Between Description", "post-carousel")}
							attributes={gapBetweenDescription}
							attributesKey={"gapBetweenDescription"}
							setAttributes={setAttributes}
							units={["Px", "%", "em"]}
							defaultValue={{
								unit: "px",
								value: {
									top: "0",
									right: "0",
									bottom: "18",
									left: "0",
								},
							}}
						/>
					)}
				</>
			)}
		</>
	);
};

export const TitleGeneralTab = ({ attributes, setAttributes }) => {
	const { titleEnable, titleTag, subTitleEnable, subTitleTag, subTitlePosition, subTitleGap } = attributes;

	return (
		<>
			<Toggle
				label={__("Title", "post-carousel")}
				attributes={titleEnable}
				attributesKey={"titleEnable"}
				setAttributes={setAttributes}
			/>
			{titleEnable && (
				<>
					<>
						<SelectField
							label={__("HTML Tag", "post-carousel")}
							attributes={titleTag}
							attributesKey={"titleTag"}
							setAttributes={setAttributes}
							items={[
								{ label: "H1", value: "h1" },
								{ label: "H2", value: "h2" },
								{ label: "H3", value: "h3" },
								{ label: "H4", value: "h4" },
								{ label: "H5", value: "h5" },
								{ label: "H6", value: "h6" },
								{ label: "P", value: "p" },
								{ label: "Span", value: "span" },
							]}
						/>
					</>

					<Toggle
						label={__("Sub Title", "post-carousel")}
						attributes={subTitleEnable}
						attributesKey={"subTitleEnable"}
						setAttributes={setAttributes}
						pro={true}
					/>

					{subTitleEnable && (
						<>
							<SelectField
								label={__("HTML Tag", "post-carousel")}
								attributes={subTitleTag}
								attributesKey={"subTitleTag"}
								setAttributes={setAttributes}
								items={[
									{ label: "H1", value: "h1" },
									{ label: "H2", value: "h2" },
									{ label: "H3", value: "h3" },
									{ label: "H4", value: "h4" },
									{ label: "H5", value: "h5" },
									{ label: "H6", value: "h6" },
									{ label: "P", value: "p" },
									{ label: "Span", value: "span" },
								]}
							/>

							<SelectField
								label={__("Position", "post-carousel")}
								attributes={subTitlePosition}
								attributesKey={"subTitlePosition"}
								setAttributes={setAttributes}
								items={[
									{
										label: __("Above Title", "post-carousel"),
										value: "above-title",
									},
									{
										label: __("Below Title", "post-carousel"),
										value: "below-title",
									},
								]}
							/>
							<SPRangeControl
								label={__("Sub Title Gap", "post-carousel")}
								attributes={subTitleGap}
								attributesKey={"subTitleGap"}
								setAttributes={setAttributes}
								units={["px", "em"]}
								defaultValue={{ unit: "px", value: 8 }}
							/>
						</>
					)}
				</>
			)}
		</>
	);
};
export const TitleStyleTab = ({ attributes, setAttributes }) => {
	const {
		titleHoverEffects,
		titleColor,
		subTitleColor,
		titleMargin,
		titleTypography,
		titleFontSize,
		titleLatterSpacing,
		titleLineHeight,
		subTitleTypography,
		subTitleFontSize,
		subTitleLatterSpacing,
		subTitleLineHeight,
		subTitleEnable,
		titleEnable,
		titleWordSpacing,
		subTitleWordSpacing,
		hoverEffectsColor,
		titleGlobalTypography,
		subTitleGlobalTypography,
	} = attributes;

	const [iconStyleType, setIconStyleType] = useState("color");

	return (
		<>
			{titleEnable && (
				<>
					<SelectField
						label={__("Title Hover Effects", "post-carousel")}
						attributes={titleHoverEffects}
						attributesKey={"titleHoverEffects"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("None", "post-carousel"),
								value: "none",
							},
							{
								label: __("Underline", "post-carousel"),
								value: "underline",
							},
							{
								label: __("Overline", "post-carousel"),
								value: "overline",
							},
							{
								label: __("Double Line (Pro)", "post-carousel"),
								value: "double-line",
								disabled: true,
							},
							{
								label: __("Framed (Pro)", "post-carousel"),
								value: "framed",
								disabled: true,
							},
							{
								label: __("Background (Pro)", "post-carousel"),
								value: "background",
								disabled: true,
							},
							{
								label: __("Typing (Pro)", "post-carousel"),
								value: "text",
								disabled: true,
							},
						]}
					/>

					{titleHoverEffects !== "none" && (
						<SpColorPicker
							label={__("Hover Effects Color", "post-carousel")}
							value={hoverEffectsColor}
							onChange={(newColor) => setAttributes({ hoverEffectsColor: newColor })}
							defaultColor="#2F2F2F"
						/>
					)}

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
						spacingDefaultValue={{ unit: "px", value: 12 }}
						fontSizeDefault={{
							unit: "px",
							value: 20,
						}}
						lineDefaultValue={{ unit: "%", value: 120 }}
						typographyLabel={__("Title Typography", "post-carousel")}
					/>
					{subTitleEnable && (
						<TypographyNew
							attributes={{
								family: subTitleTypography,
								familyKey: "subTitleTypography",
								fontSize: subTitleFontSize,
								fontSizeKey: "subTitleFontSize",
								fontSpacing: subTitleLatterSpacing,
								fontSpacingKey: "subTitleLatterSpacing",
								lineHeight: subTitleLineHeight,
								lineHeightKey: "subTitleLineHeight",
								wordSpacing: subTitleWordSpacing,
								wordSpacingKey: "subTitleWordSpacing",
								globalTypo: subTitleGlobalTypography,
								globalTypoKey: "subTitleGlobalTypography",
							}}
							setAttributes={setAttributes}
							spacingDefaultValue={{ unit: "px", value: 0 }}
							fontSizeDefault={{
								unit: "px",
								value: 14,
							}}
							lineDefaultValue={{ unit: "px", value: 27.5 }}
							typographyLabel={__("Sub Title Typography", "post-carousel")}
						/>
					)}

					<SPToggleGroupControl
						attributes={iconStyleType}
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
						onClick={(val) => setIconStyleType(val)}
					/>

					{iconStyleType === "color" && (
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
							{subTitleEnable && (
								<SpColorPicker
									label={__("Sub Title Color", "post-carousel")}
									value={subTitleColor.color}
									onChange={(newColor) =>
										setAttributes({
											subTitleColor: {
												...subTitleColor,
												color: newColor,
											},
										})
									}
									defaultColor="#333333"
								/>
							)}
						</>
					)}
					{iconStyleType === "hover" && (
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
							{subTitleEnable && (
								<SpColorPicker
									label={__("Sub Title Color", "post-carousel")}
									value={subTitleColor.hoverColor}
									onChange={(newColor) =>
										setAttributes({
											subTitleColor: {
												...subTitleColor,
												hoverColor: newColor,
											},
										})
									}
									defaultColor="#333333"
								/>
							)}
						</>
					)}

					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={titleMargin}
						attributesKey={"titleMargin"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "8",
								left: "0",
							},
						}}
					/>
				</>
			)}
		</>
	);
};

export const DescriptionGeneralTab = ({ attributes, setAttributes }) => {
	const { descriptionEnable, dropCapsEnable } = attributes;

	return (
		<>
			<Toggle
				label={__("Description", "post-carousel")}
				attributes={descriptionEnable}
				attributesKey={"descriptionEnable"}
				setAttributes={setAttributes}
			/>
			{descriptionEnable && (
				<Toggle
					label={__("Drop Caps", "post-carousel")}
					attributes={dropCapsEnable}
					attributesKey={"dropCapsEnable"}
					setAttributes={setAttributes}
					pro={true}
				/>
			)}
		</>
	);
};
export const DescriptionStyleTab = ({ attributes, setAttributes }) => {
	const {
		descriptionMargin,
		descriptionTypography,
		descriptionFontSize,
		descriptionLatterSpacing,
		descriptionLineHeight,
		blockName,
		descriptionColor,
		dropCapsColor,
		descriptionEnable,
		dropCapsEnable,
		descriptionWordSpacing,
		desGlobalTypography,
	} = attributes;

	const [iconStyleType, setIconStyleType] = useState("color");

	return (
		<>
			{descriptionEnable && (
				<>
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
							globalTypo: desGlobalTypography,
							globalTypoKey: "desGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: useDefaultValue(blockName).descriptionFontSize,
						}}
						lineDefaultValue={{ unit: "px", value: 27.5 }}
						typographyLabel={__("Typography", "post-carousel")}
					/>

					<SPToggleGroupControl
						attributes={iconStyleType}
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
						onClick={(val) => setIconStyleType(val)}
					/>

					{iconStyleType === "color" && (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={descriptionColor.color}
								onChange={(newColor) =>
									setAttributes({
										descriptionColor: {
											...descriptionColor,
											color: newColor,
										},
									})
								}
								defaultColor="#fff"
							/>
							{dropCapsEnable && (
								<SpColorPicker
									label={__("Drop Caps Color", "post-carousel")}
									value={dropCapsColor}
									onChange={(newColor) =>
										setAttributes({
											dropCapsColor: newColor,
										})
									}
									defaultColor="#333333"
								/>
							)}
						</>
					)}
					{iconStyleType === "hover" && (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={descriptionColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										descriptionColor: {
											...descriptionColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#fff"
							/>
						</>
					)}

					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={descriptionMargin}
						attributesKey={"descriptionMargin"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "24",
								left: "0",
							},
						}}
					/>
				</>
			)}
		</>
	);
};

export const BadgeGeneralTab = ({ attributes, setAttributes }) => {
	const { badgeEnable, badgePosition, badgeLabel } = attributes;

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
				<>
					<InputControl
						label={__("Badge Label", "post-carousel")}
						attributes={badgeLabel}
						flex={false}
						inputType="text"
						attributesKey={"badgeLabel"}
						setAttributes={setAttributes}
						placeholder={__("Badge Label", "post-carousel")}
					/>
					<SelectField
						label={__("Badge Position", "post-carousel")}
						attributes={badgePosition}
						attributesKey={"badgePosition"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("Top Left", "post-carousel"),
								value: "top-left",
							},
							{
								label: __("Top Right", "post-carousel"),
								value: "top-right",
							},
							{
								label: __("Bottom Left", "post-carousel"),
								value: "bottom-left",
							},
							{
								label: __("Bottom Right", "post-carousel"),
								value: "bottom-right",
							},
						]}
					/>
				</>
			)}
			<ProInfo>
				<span>Highlight important content with custom badges and flexible positioning.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};
export const BadgeStyleTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		badgeTypography,
		badgeFontSize,
		badgeLatterSpacing,
		badgeLineHeight,
		badgeColor,
		badgeBg,
		badgeBorderStyle,
		badgeBorderStyleWidth,
		badgeBorderRadius,
		badgeBoxShadowEnable,
		badgeBoxShadow,
		badgeBorderHoverStyle,
		badgeBorderStyleHoverWidth,
		badgeBorderHoverRadius,
		badgeBoxShadowHoverEnable,
		badgeBoxShadowHover,
		badgePadding,
		badgeMargin,
		badgeRadialShape,
		badgeRadialPosition,
		badgeHoverRadialShape,
		badgeHoverRadialPosition,
		badgeEnable,
		badgeWordSpacing,
		badgeGlobalTypography,
	} = attributes;

	const [iconStyleType, setIconStyleType] = useState("color");

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
							globalTypo: badgeGlobalTypography,
							globalTypoKey: "badgeGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: useDefaultValue(blockName).badgeFontSize,
						}}
						lineDefaultValue={{ unit: "px", value: 27.5 }}
						typographyLabel={__("Typography", "post-carousel")}
					/>

					<SPToggleGroupControl
						attributes={iconStyleType}
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
						onClick={(val) => setIconStyleType(val)}
					/>

					{iconStyleType === "color" && (
						<>
							<SpColorPicker
								label={__("Text Color", "post-carousel")}
								value={badgeColor.color}
								onChange={(newColor) =>
									setAttributes({
										badgeColor: {
											...badgeColor,
											color: newColor,
										},
									})
								}
								defaultColor="#2F2F2F"
							/>
							<>
								<Background
									label={__("Background Type", "post-carousel")}
									colorLabel="Solid Color"
									defaultColor="#E0E0E0"
									attributes={badgeBg}
									attributesKey={"badgeBg"}
									setAttributes={setAttributes}
									colorType={iconStyleType}
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
									]}
								/>
								{badgeBg[iconStyleType]?.style === "gradient" && (
									<>
										{/^radial-gradient/.test(badgeBg[iconStyleType]?.gradient) && (
											<>
												<SelectField
													attributes={badgeRadialShape}
													attributesKey={"badgeRadialShape"}
													setAttributes={setAttributes}
													items={[
														{
															label: __("Circle", "post-carousel"),
															value: "circle",
														},
														{
															label: __("Ellipse", "post-carousel"),
															value: "ellipse",
														},
													]}
												/>
												<SelectField
													attributes={badgeRadialPosition}
													attributesKey={"badgeRadialPosition"}
													setAttributes={setAttributes}
													items={[
														{
															label: __("Center Center", "post-carousel"),
															value: "center center",
														},
														{
															label: __("Center Left", "post-carousel"),
															value: "center left",
														},
														{
															label: __("Center Right", "post-carousel"),
															value: "center right",
														},
														{
															label: __("Top Center", "post-carousel"),
															value: "top center",
														},
														{
															label: __("Top Left", "post-carousel"),
															value: "top left",
														},
														{
															label: __("Top Right", "post-carousel"),
															value: "top right",
														},
														{
															label: __("Bottom Center", "post-carousel"),
															value: "bottom center",
														},
														{
															label: __("Bottom Left", "post-carousel"),
															value: "bottom left",
														},
														{
															label: __("Bottom Right", "post-carousel"),
															value: "bottom right",
														},
													]}
												/>
											</>
										)}
									</>
								)}
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
									defaultValue={{
										unit: "px",
										value: {
											top: "0",
											right: "0",
											bottom: "0",
											left: "0",
										},
									}}
									indicator={"radius"}
								/>

								<Toggle
									label={__("Box Shadow", "post-carousel")}
									attributes={badgeBoxShadowEnable}
									attributesKey={"badgeBoxShadowEnable"}
									setAttributes={setAttributes}
								/>
								{badgeBoxShadowEnable && (
									<BoxShadow
										label={__("Box Shadow", "post-carousel")}
										attributes={badgeBoxShadow}
										attributesKey={"badgeBoxShadow"}
										setAttributes={setAttributes}
									/>
								)}
							</>
						</>
					)}
					{iconStyleType === "hover" && (
						<>
							<SpColorPicker
								label={__("Hover Text Color", "post-carousel")}
								value={badgeColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										badgeColor: {
											...badgeColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#2F2F2F"
							/>
							<>
								<Background
									label={__("Background Type", "post-carousel")}
									colorLabel="Solid Color"
									defaultColor="#E0E0E0"
									attributes={badgeBg}
									attributesKey={"badgeBg"}
									setAttributes={setAttributes}
									colorType={iconStyleType}
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
									]}
								/>
								{badgeBg[iconStyleType]?.style === "gradient" && (
									<>
										{/^radial-gradient/.test(badgeBg[iconStyleType]?.gradient) && (
											<>
												<SelectField
													attributes={badgeHoverRadialShape}
													attributesKey={"badgeHoverRadialShape"}
													setAttributes={setAttributes}
													items={[
														{
															label: __("Circle", "post-carousel"),
															value: "circle",
														},
														{
															label: __("Ellipse", "post-carousel"),
															value: "ellipse",
														},
													]}
												/>
												<SelectField
													attributes={badgeHoverRadialPosition}
													attributesKey={"badgeHoverRadialPosition"}
													setAttributes={setAttributes}
													items={[
														{
															label: __("Center Center", "post-carousel"),
															value: "center center",
														},
														{
															label: __("Center Left", "post-carousel"),
															value: "center left",
														},
														{
															label: __("Center Right", "post-carousel"),
															value: "center right",
														},
														{
															label: __("Top Center", "post-carousel"),
															value: "top center",
														},
														{
															label: __("Top Left", "post-carousel"),
															value: "top left",
														},
														{
															label: __("Top Right", "post-carousel"),
															value: "top right",
														},
														{
															label: __("Bottom Center", "post-carousel"),
															value: "bottom center",
														},
														{
															label: __("Bottom Left", "post-carousel"),
															value: "bottom left",
														},
														{
															label: __("Bottom Right", "post-carousel"),
															value: "bottom right",
														},
													]}
												/>
											</>
										)}
									</>
								)}
								<Border
									attributes={{
										border: badgeBorderHoverStyle,
										borderWidth: badgeBorderStyleHoverWidth,
									}}
									setAttributes={setAttributes}
									attributesKey={{
										border: "badgeBorderHoverStyle",
										borderWidth: "badgeBorderStyleHoverWidth",
									}}
									btnType="normal"
								/>

								<Spacing
									label={__("Border Radius", "post-carousel")}
									attributes={badgeBorderHoverRadius}
									attributesKey={"badgeBorderHoverRadius"}
									setAttributes={setAttributes}
									units={["Px", "%", "em"]}
									defaultValue={{
										unit: "px",
										value: {
											top: "0",
											right: "0",
											bottom: "0",
											left: "0",
										},
									}}
									indicator={"radius"}
								/>

								<Toggle
									label={__("Box Shadow", "post-carousel")}
									attributes={badgeBoxShadowHoverEnable}
									attributesKey={"badgeBoxShadowHoverEnable"}
									setAttributes={setAttributes}
								/>
								{badgeBoxShadowHoverEnable && (
									<BoxShadow
										label={__("Box Shadow", "post-carousel")}
										attributes={badgeBoxShadowHover}
										attributesKey={"badgeBoxShadowHover"}
										setAttributes={setAttributes}
									/>
								)}
							</>
						</>
					)}

					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={badgePadding}
						attributesKey={"badgePadding"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "6",
								right: "12",
								bottom: "6",
								left: "12",
							},
						}}
					/>
					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={badgeMargin}
						attributesKey={"badgeMargin"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
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

export const RatingGeneralTab = ({ attributes, setAttributes }) => {
	const {
		ratingEnable,
		scale,
		ratingIconSize,
		ratingValueEnable,
		ratingValuePosition,
		ratingIconSourceLibrary,
		ratingGap,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Rating", "post-carousel")}
				attributes={ratingEnable}
				attributesKey={"ratingEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{ratingEnable && (
				<>
					<SPRangeControl
						label={__("Scale", "post-carousel")}
						attributes={scale}
						attributesKey={"scale"}
						setAttributes={setAttributes}
						max={5}
						step={0.1}
					/>

					<p>{__("Icon Source", "post-carousel")}</p>

					<IconsLibrary
						attributes={ratingIconSourceLibrary}
						attributesKey={"ratingIconSourceLibrary"}
						setAttributes={setAttributes}
					/>
					<SPRangeControl
						label={__("Icon Size", "post-carousel")}
						attributes={ratingIconSize}
						attributesKey={"ratingIconSize"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 16 }}
					/>

					<Toggle
						label={__("Rating Value", "post-carousel")}
						attributes={ratingValueEnable}
						attributesKey={"ratingValueEnable"}
						setAttributes={setAttributes}
					/>
					{ratingValueEnable && (
						<>
							<SPToggleGroupControl
								label={__("Rating Value Position", "post-carousel")}
								attributes={ratingValuePosition}
								attributesKey={"ratingValuePosition"}
								setAttributes={setAttributes}
								items={[
									{
										label: __("Left", "post-carousel"),
										value: "left",
									},
									{
										label: __("Right", "post-carousel"),
										value: "right",
									},
								]}
							/>

							<SPRangeControl
								label={__("Gap with Rating", "post-carousel")}
								attributes={ratingGap}
								attributesKey={"ratingGap"}
								setAttributes={setAttributes}
								units={["px", "em"]}
								defaultValue={{ unit: "px", value: 8 }}
							/>
						</>
					)}
				</>
			)}
			<ProInfo>
				<h3>Premium Only</h3>
				<h4>Highlight content with customizable rating controls.</h4>
				<ul>
					<li>
						— Enable star ratings display
					</li>
					<li>
						— Adjustable rating scale
					</li>
					<li>
						— Custom icon selection
					</li>
					<li>
						— Icon size control
					</li>
					<li>
						— Control Rating value
					</li>
					<li>
						— Flexible position and spacing
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</>
	);
};
export const RatingStyleTab = ({ attributes, setAttributes }) => {
	const {
		ratingTypography,
		ratingFontSize,
		ratingLatterSpacing,
		ratingLineHeight,
		ratingMargin,
		filledColor,
		emptyColor,
		ratingNumberColor,
		ratingEnable,
		ratingWordSpacing,
		ratingGlobalTypography,
	} = attributes;

	const [iconStyleType, setIconStyleType] = useState("color");

	return (
		<>
			{ratingEnable && (
				<>
					<TypographyNew
						attributes={{
							family: ratingTypography,
							familyKey: "ratingTypography",
							fontSize: ratingFontSize,
							fontSizeKey: "ratingFontSize",
							fontSpacing: ratingLatterSpacing,
							fontSpacingKey: "ratingLatterSpacing",
							lineHeight: ratingLineHeight,
							lineHeightKey: "ratingLineHeight",
							wordSpacing: ratingWordSpacing,
							wordSpacingKey: "ratingWordSpacing",
							globalTypo: ratingGlobalTypography,
							globalTypoKey: "ratingGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{ unit: "px", value: 16 }}
						lineDefaultValue={{ unit: "px", value: 20 }}
						typographyLabel={__("Typography", "post-carousel")}
					/>

					<SPToggleGroupControl
						attributes={iconStyleType}
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
						onClick={(val) => setIconStyleType(val)}
					/>

					{iconStyleType === "color" && (
						<>
							<SpColorPicker
								label={__("Filled Color", "post-carousel")}
								value={filledColor.color}
								onChange={(newColor) =>
									setAttributes({
										filledColor: {
											...filledColor,
											color: newColor,
										},
									})
								}
								defaultColor="#F0B849"
							/>
							<SpColorPicker
								label={__("Empty Color", "post-carousel")}
								value={emptyColor.color}
								onChange={(newColor) =>
									setAttributes({
										emptyColor: {
											...emptyColor,
											color: newColor,
										},
									})
								}
								defaultColor="#ddd"
							/>
							<SpColorPicker
								label={__("Rating Number Color", "post-carousel")}
								value={ratingNumberColor.color}
								onChange={(newColor) =>
									setAttributes({
										ratingNumberColor: {
											...ratingNumberColor,
											color: newColor,
										},
									})
								}
								defaultColor="#757575"
							/>
						</>
					)}
					{iconStyleType === "hover" && (
						<>
							<SpColorPicker
								label={__("Filled Color", "post-carousel")}
								value={filledColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										filledColor: {
											...filledColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#e79a00ff"
							/>
							<SpColorPicker
								label={__("Empty Color", "post-carousel")}
								value={emptyColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										emptyColor: {
											...emptyColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#757575"
							/>
							<SpColorPicker
								label={__("Rating Number Color", "post-carousel")}
								value={ratingNumberColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										ratingNumberColor: {
											...ratingNumberColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#757575"
							/>
						</>
					)}

					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={ratingMargin}
						attributesKey={"ratingMargin"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "8",
								right: "0",
								bottom: "8",
								left: "0",
							},
						}}
					/>
				</>
			)}
		</>
	);
};

export const CallToActionGeneralTab = ({ attributes, setAttributes }) => {
	const {
		callActionEnable,
		linkingType,
		fullWidthButton,
		cAIconSize,
		cAIconPosition,
		iconTextGap,
		buttonLink,
		openNewTab,
		overlayOnHover,
		externalLinkIcon,
		cAIconSource,
		cAIconSourceLibrary,
		cAIconCustomWidth,
		cAIconCustomHeight,
		cAIconSourceCustom,
		buttonIconEnable,
		infoBoxLayout,
	} = attributes;

	const handleButtonLink = (newLink) => {
		const link = ensureHttps(newLink);
		setAttributes({ buttonLink: link });
	};

	return (
		<>
			<Toggle
				label={__("Call to Action", "post-carousel")}
				attributes={callActionEnable}
				attributesKey={"callActionEnable"}
				setAttributes={setAttributes}
			/>
			{callActionEnable && (
				<>
					<SPToggleGroupControl
						label={__("Linking Type", "post-carousel")}
						attributes={linkingType}
						attributesKey={"linkingType"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("Button", "post-carousel"),
								value: "button",
							},
							{
								label: __("Text", "post-carousel"),
								value: "text",
							},
							{
								label: __("Full Box", "post-carousel"),
								value: "fullBox",
								disabled: true,
							},
						]}
					/>
					{linkingType === "button" && (
						<>
							{infoBoxLayout !== "smart-info-box-layout-four" && (
								<Toggle
									label={__("Full Width Button", "post-carousel")}
									attributes={fullWidthButton}
									attributesKey={"fullWidthButton"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}

					{(linkingType === "button" || linkingType === "text") && (
						<Toggle
							label={__("Button Icon", "post-carousel")}
							attributes={buttonIconEnable}
							attributesKey={"buttonIconEnable"}
							setAttributes={setAttributes}
							pro={true}
						/>
					)}

					{linkingType === "fullBox" && (
						<Toggle
							label={__("Overlay on Hover", "post-carousel")}
							attributes={overlayOnHover}
							attributesKey={"overlayOnHover"}
							setAttributes={setAttributes}
						/>
					)}
					{linkingType === "fullBox" && overlayOnHover && (
						<Toggle
							label={__("External Link Icon", "post-carousel")}
							attributes={externalLinkIcon}
							attributesKey={"externalLinkIcon"}
							setAttributes={setAttributes}
						/>
					)}

					{buttonIconEnable && (
						<>
							{linkingType !== "fullBox" && (
								<>
									<SPToggleGroupControl
										label={__("Icon Source", "post-carousel")}
										attributes={cAIconSource}
										attributesKey={"cAIconSource"}
										setAttributes={setAttributes}
										pro={true}
										items={[
											{
												label: __("Library", "post-carousel"),
												value: "library",
											},
											{
												label: __("Custom", "post-carousel"),
												value: "custom",
											},
										]}
									/>

									{cAIconSource === "library" && (
										<>
											<IconsLibrary
												attributes={cAIconSourceLibrary}
												attributesKey={"cAIconSourceLibrary"}
												setAttributes={setAttributes}
												pro={true}
											/>
											<SPRangeControl
												label={__("Icon Size", "post-carousel")}
												attributes={cAIconSize}
												attributesKey={"cAIconSize"}
												setAttributes={setAttributes}
												units={["px", "%", "em"]}
												defaultValue={{
													unit: "px",
													value: 16,
												}}
												pro={true}
											/>
										</>
									)}

									{cAIconSource === "custom" && (
										<>
											<MediaPicker
												label={__("Icon/Image Source", "post-carousel")}
												imageKey="cAIconSourceCustom"
												enableImageSize={false}
												setAttributes={setAttributes}
												backgroundImage={cAIconSourceCustom}
											/>

											<SPRangeControl
												label={__("Width", "post-carousel")}
												attributes={cAIconCustomWidth}
												attributesKey={"cAIconCustomWidth"}
												setAttributes={setAttributes}
												units={["px", "%", "em"]}
												defaultValue={{
													unit: "px",
													value: 16,
												}}
											/>

											<SPRangeControl
												label={__("Height", "post-carousel")}
												attributes={cAIconCustomHeight}
												attributesKey={"cAIconCustomHeight"}
												setAttributes={setAttributes}
												units={["px", "%", "em"]}
												defaultValue={{
													unit: "px",
													value: 16,
												}}
											/>
										</>
									)}
								</>
							)}

							{linkingType !== "fullBox" && (
								<>
									<SPToggleGroupControl
										label={__("Icon Position", "post-carousel")}
										attributes={cAIconPosition}
										attributesKey={"cAIconPosition"}
										setAttributes={setAttributes}
										pro={true}
										items={[
											{
												label: __("Before Text", "post-carousel"),
												value: "beforeText",
											},
											{
												label: __("After Text", "post-carousel"),
												value: "afterText",
											},
										]}
									/>

									<SPRangeControl
										label={__("Icon to Text Gap", "post-carousel")}
										attributes={iconTextGap}
										attributesKey={"iconTextGap"}
										setAttributes={setAttributes}
										units={["px", "%", "em"]}
										defaultValue={{
											unit: "px",
											value: 8,
										}}
										pro={true}
									/>
								</>
							)}
						</>
					)}

					<InputControl
						label={__("Button Link", "post-carousel")}
						attributes={buttonLink}
						flex={false}
						inputType="text"
						attributesKey={"buttonLink"}
						setAttributes={setAttributes}
						onChange={handleButtonLink}
						placeholder={__("#", "post-carousel")}
					/>
					<Toggle
						label={__("Open In a New Tab", "post-carousel")}
						attributes={openNewTab}
						attributesKey={"openNewTab"}
						setAttributes={setAttributes}
					/>
				</>
			)}

			<ProInfo>
				<h3>Premium Only</h3>
				<h4>Enhance your buttons with customizable icons</h4>
				<ul>
					<li>
						— Add icons to buttons
					</li>
					<li>
						— Icon size and spacing control
					</li>
					<li>
						— Flexible icon positioning
					</li>
					<li>
						— Normal and hover color styling
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</>
	);
};
export const CallToActionStyleTab = ({ attributes, setAttributes }) => {
	const {
		caBorderRadius,
		caHoverBorderStyle,
		caHoverBorderStyleWidth,
		caPadding,
		caMargin,
		caIconColor,
		cABg,
		cATypography,
		caRadialShape,
		cAFontSize,
		cALatterSpacing,
		caHoverRadialPosition,
		cALineHeight,
		cAOverlayColor,
		externalLinkIconColor,
		caRadialPosition,
		cAOverlayOpacity,
		caHoverRadialShape,
		linkingType,
		caBorderStyle,
		caBorderStyleWidth,
		caHoverBorderRadius,
		callActionEnable,
		cAWordSpacing,
		callToActionGlobalTypography,
	} = attributes;

	const [caStyleType, setCaStyleType] = useState("color");
	return (
		<>
			{callActionEnable && (
				<>
					{linkingType === "fullBox" && (
						<>
							<SpColorPicker
								label={__("Overlay Color", "post-carousel")}
								value={cAOverlayColor}
								onChange={(newColor) =>
									setAttributes({
										cAOverlayColor: newColor,
									})
								}
								defaultColor="#333333"
							/>
							<SPRangeControl
								label={__("Overlay Opacity", "post-carousel")}
								attributes={cAOverlayOpacity}
								attributesKey={"cAOverlayOpacity"}
								setAttributes={setAttributes}
								max={1}
								step={0.1}
							/>

							<SpColorPicker
								label={__("External Link Icon Color", "post-carousel")}
								value={externalLinkIconColor}
								onChange={(newColor) =>
									setAttributes({
										externalLinkIconColor: newColor,
									})
								}
								defaultColor="#fff"
							/>
						</>
					)}

					{linkingType !== "fullBox" && (
						<>
							<TypographyNew
								attributes={{
									family: cATypography,
									familyKey: "cATypography",
									fontSize: cAFontSize,
									fontSizeKey: "cAFontSize",
									fontSpacing: cALatterSpacing,
									fontSpacingKey: "cALatterSpacing",
									lineHeight: cALineHeight,
									lineHeightKey: "cALineHeight",
									wordSpacing: cAWordSpacing,
									wordSpacingKey: "cAWordSpacing",
									globalTypo: callToActionGlobalTypography,
									globalTypoKey: "callToActionGlobalTypography",
								}}
								setAttributes={setAttributes}
								spacingDefaultValue={{ unit: "px", value: 0 }}
								fontSizeDefault={{
									unit: "px",
									value: 14,
								}}
								lineDefaultValue={{ unit: "%", value: 120 }}
								typographyLabel={__("Typography", "post-carousel")}
							/>

							<SPToggleGroupControl
								attributes={caStyleType}
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
								onClick={(val) => setCaStyleType(val)}
							/>

							{caStyleType === "color" && (
								<>
									{(linkingType === "button" || linkingType === "text") && (
										<SpColorPicker
											label={__("Color", "post-carousel")}
											value={caIconColor.color}
											onChange={(newColor) =>
												setAttributes({
													caIconColor: {
														...caIconColor,
														color: newColor,
													},
												})
											}
											defaultColor="#2F2F2F"
										/>
									)}

									{linkingType === "button" && (
										<>
											<Background
												label={__("Background Type", "post-carousel")}
												colorLabel="Solid Color"
												defaultColor="#E0E0E0"
												attributes={cABg}
												attributesKey={"cABg"}
												setAttributes={setAttributes}
												colorType={caStyleType}
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
												]}
											/>
											{cABg[caStyleType]?.style === "gradient" && (
												<>
													{/^radial-gradient/.test(cABg[caStyleType]?.gradient) && (
														<>
															<SelectField
																attributes={caRadialShape}
																attributesKey={"caRadialShape"}
																setAttributes={setAttributes}
																items={[
																	{
																		label: __("Circle", "post-carousel"),
																		value: "circle",
																	},
																	{
																		label: __("Ellipse", "post-carousel"),
																		value: "ellipse",
																	},
																]}
															/>
															<SelectField
																attributes={caRadialPosition}
																attributesKey={"caRadialPosition"}
																setAttributes={setAttributes}
																items={[
																	{
																		label: __(
																			"Center Center",
																			"post-carousel"
																		),
																		value: "center center",
																	},
																	{
																		label: __("Center Left", "post-carousel"),
																		value: "center left",
																	},
																	{
																		label: __(
																			"Center Right",
																			"post-carousel"
																		),
																		value: "center right",
																	},
																	{
																		label: __("Top Center", "post-carousel"),
																		value: "top center",
																	},
																	{
																		label: __("Top Left", "post-carousel"),
																		value: "top left",
																	},
																	{
																		label: __("Top Right", "post-carousel"),
																		value: "top right",
																	},
																	{
																		label: __(
																			"Bottom Center",
																			"post-carousel"
																		),
																		value: "bottom center",
																	},
																	{
																		label: __("Bottom Left", "post-carousel"),
																		value: "bottom left",
																	},
																	{
																		label: __(
																			"Bottom Right",
																			"post-carousel"
																		),
																		value: "bottom right",
																	},
																]}
															/>
														</>
													)}
												</>
											)}
											<Border
												attributes={{
													border: caBorderStyle,
													borderWidth: caBorderStyleWidth,
												}}
												setAttributes={setAttributes}
												attributesKey={{
													border: "caBorderStyle",
													borderWidth: "caBorderStyleWidth",
												}}
												btnType="normal"
											/>
											<Spacing
												label={__("Border Radius", "post-carousel")}
												attributes={caBorderRadius}
												attributesKey={"caBorderRadius"}
												setAttributes={setAttributes}
												units={["Px", "%", "em"]}
												defaultValue={{
													unit: "px",
													value: {
														top: "0",
														right: "0",
														bottom: "0",
														left: "0",
													},
												}}
												indicator={"radius"}
											/>
										</>
									)}
								</>
							)}
							{caStyleType === "hover" && (
								<>
									{(linkingType === "button" || linkingType === "text") && (
										<SpColorPicker
											label={__("Hover Color", "post-carousel")}
											value={caIconColor.hoverColor}
											onChange={(newColor) =>
												setAttributes({
													caIconColor: {
														...caIconColor,
														hoverColor: newColor,
													},
												})
											}
											defaultColor="#2F2F2F"
										/>
									)}

									{linkingType === "button" && (
										<>
											<Background
												label={__("Background Type", "post-carousel")}
												colorLabel="Solid Color"
												defaultColor="#E0E0E0"
												attributes={cABg}
												attributesKey={"cABg"}
												setAttributes={setAttributes}
												colorType={caStyleType}
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
												]}
											/>
											{cABg[caStyleType]?.style === "gradient" && (
												<>
													{/^radial-gradient/.test(cABg[caStyleType]?.gradient) && (
														<>
															<SelectField
																attributes={caHoverRadialShape}
																attributesKey={"caHoverRadialShape"}
																setAttributes={setAttributes}
																items={[
																	{
																		label: __("Circle", "post-carousel"),
																		value: "circle",
																	},
																	{
																		label: __("Ellipse", "post-carousel"),
																		value: "ellipse",
																	},
																]}
															/>
															<SelectField
																attributes={caHoverRadialPosition}
																attributesKey={"caHoverRadialPosition"}
																setAttributes={setAttributes}
																items={[
																	{
																		label: __(
																			"Center Center",
																			"post-carousel"
																		),
																		value: "center center",
																	},
																	{
																		label: __("Center Left", "post-carousel"),
																		value: "center left",
																	},
																	{
																		label: __(
																			"Center Right",
																			"post-carousel"
																		),
																		value: "center right",
																	},
																	{
																		label: __("Top Center", "post-carousel"),
																		value: "top center",
																	},
																	{
																		label: __("Top Left", "post-carousel"),
																		value: "top left",
																	},
																	{
																		label: __("Top Right", "post-carousel"),
																		value: "top right",
																	},
																	{
																		label: __(
																			"Bottom Center",
																			"post-carousel"
																		),
																		value: "bottom center",
																	},
																	{
																		label: __("Bottom Left", "post-carousel"),
																		value: "bottom left",
																	},
																	{
																		label: __(
																			"Bottom Right",
																			"post-carousel"
																		),
																		value: "bottom right",
																	},
																]}
															/>
														</>
													)}
												</>
											)}
											<Border
												attributes={{
													border: caHoverBorderStyle,
													borderWidth: caHoverBorderStyleWidth,
												}}
												setAttributes={setAttributes}
												attributesKey={{
													border: "caHoverBorderStyle",
													borderWidth: "caHoverBorderStyleWidth",
												}}
												btnType="normal"
											/>
											<Spacing
												label={__("Border Radius", "post-carousel")}
												attributes={caHoverBorderRadius}
												attributesKey={"caHoverBorderRadius"}
												setAttributes={setAttributes}
												units={["Px", "%", "em"]}
												defaultValue={{
													unit: "px",
													value: {
														top: "0",
														right: "0",
														bottom: "0",
														left: "0",
													},
												}}
												indicator={"radius"}
											/>
										</>
									)}
								</>
							)}

							{linkingType === "button" && (
								<Spacing
									label={__("Padding", "post-carousel")}
									attributes={caPadding}
									attributesKey={"caPadding"}
									setAttributes={setAttributes}
									units={["Px", "%", "em"]}
									defaultValue={{
										unit: "px",
										value: {
											top: "12",
											right: "22",
											bottom: "12",
											left: "22",
										},
									}}
								/>
							)}
							<Spacing
								label={__("Margin", "post-carousel")}
								attributes={caMargin}
								attributesKey={"caMargin"}
								setAttributes={setAttributes}
								units={["Px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "8",
										right: "0",
										bottom: "8",
										left: "0",
									},
								}}
							/>
						</>
					)}
				</>
			)}
		</>
	);
};
export const SeparatorTab = ({ attributes, setAttributes }) => {
	const {
		separatorWidth,
		separatorThinkness,
		separatorEnable,
		separatorStyle,
		separatorPosition,
		separatorColor,
		infoBoxLayout,
		separatorMargin,
	} = attributes;

	const separatorItems =
		infoBoxLayout === "smart-info-box-layout-four"
			? [
					{
						label: __("After Title", "post-carousel"),
						value: "after-title",
					},
					{
						label: __("After Description", "post-carousel"),
						value: "after-description",
					},
				]
			: [
					{
						label: __("After Title", "post-carousel"),
						value: "after-title",
					},
					{
						label: __("After Description", "post-carousel"),
						value: "after-description",
					},
					{
						label: __("After Call to Action", "post-carousel"),
						value: "after-call-Action",
					},
				];

	return (
		<>
			<Toggle
				label={__("Separator", "post-carousel")}
				attributes={separatorEnable}
				attributesKey={"separatorEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{separatorEnable && (
				<>
					<SelectField
						label={__("Style", "post-carousel")}
						attributes={separatorStyle}
						attributesKey={"separatorStyle"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("Solid", "post-carousel"),
								value: "solid ",
							},
							{
								label: __("Double", "post-carousel"),
								value: "double",
							},
							{
								label: __("Dashed", "post-carousel"),
								value: "dashed",
							},
							{
								label: __("Dotted", "post-carousel"),
								value: "dotted",
							},
						]}
					/>

					<SelectField
						label={__("Position", "post-carousel")}
						attributes={separatorPosition}
						attributesKey={"separatorPosition"}
						setAttributes={setAttributes}
						items={separatorItems}
					/>

					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={separatorWidth}
						attributesKey={"separatorWidth"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 60 }}
						max={1000}
					/>

					<SPRangeControl
						label={__("Thickness", "post-carousel")}
						attributes={separatorThinkness}
						attributesKey={"separatorThinkness"}
						setAttributes={setAttributes}
						units={["px", "em"]}
						defaultValue={{ unit: "px", value: 3 }}
						max={15}
					/>

					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={separatorColor}
						onChange={(newColor) => setAttributes({ separatorColor: newColor })}
						defaultColor="#ddd"
					/>

					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={separatorMargin}
						attributesKey={"separatorMargin"}
						setAttributes={setAttributes}
						units={["Px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "8",
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
