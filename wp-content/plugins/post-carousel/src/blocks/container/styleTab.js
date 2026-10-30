import { __ } from "@wordpress/i18n";
import {
	Background,
	Border,
	BoxShadow,
	Divider,
	InputControl,
	SelectField,
	Spacing,
	SpColorPicker,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
} from "../../components";
import { useState } from "@wordpress/element";
import { BgIcon, GradientIcon, Image, Video } from "../../components/background/svgIcon";

import { allBgType, excludeVideoBgType, imageBlandMode, overlayTypeItems } from "../../controls/constants";
import { useDeviceType } from "../../controls/controls";
import { Editor } from "@monaco-editor/react";

// const overlayTypeItems = [
// 	{
// 		label: __( 'No Overlay', 'post-carousel' ),
// 		value: 'no-overlay',
// 	},
// 	{
// 		label: __( 'Solid', 'post-carousel' ),
// 		value: 'solid-overlay',
// 	},
// 	{
// 		label: __( 'Gradient', 'post-carousel' ),
// 		value: 'gradient-overlay',
// 	},
// ];
// const allBgType = [
// 	{
// 		label: <BgIcon />,
// 		value: 'bgColor',
// 		tooltip: 'Solid',
// 	},
// 	{
// 		label: <GradientIcon />,
// 		value: 'gradient',
// 		tooltip: 'Gradient',
// 	},
// 	{
// 		label: <Image />,
// 		value: 'image',
// 		tooltip: 'Image',
// 	},
// 	{
// 		label: <Video />,
// 		value: 'video',
// 		tooltip: 'Video',
// 	},
// ];
// const excludeVideoBgType = [
// 	{
// 		label: <BgIcon />,
// 		value: 'bgColor',
// 		tooltip: 'Solid',
// 	},
// 	{
// 		label: <GradientIcon />,
// 		value: 'gradient',
// 		tooltip: 'Gradient',
// 	},
// 	{
// 		label: <Image />,
// 		value: 'image',
// 		tooltip: 'Image',
// 	},
// ];

export const ContainerStyleTab = ({ attributes, setAttributes }) => {
	const {
		containerBG,
		containerBGImage,
		containerBGVideo,
		containerOverlayType,
		containerOverlayBg,
		containerOverlayOpacity,
		containerOverlayBlandMode,
		containerBorder,
		containerBorderWidth,
		containerBorderRadius,
		containerBoxShadowEnable,
		containerBoxShadow,
		containerPadding,
		containerMargin,
		containerBGImageHover,
		containerBoxShadowHover,
		containerBoxShadowEnableHover,
		containerBoxShadowDefault,
		containerBoxShadowDefaultHover,
		containerOverlayTypeHover,
		containerOverlayOpacityHover,
		containerOverlayBlandModeHover,
		containerBorderWidthHover,
		containerBorderRadiusHover,
	} = attributes;
	const [bgState, setBgState] = useState("color");

	const bgBtn = bgState === "color" ? allBgType : excludeVideoBgType;
	const deviceType = useDeviceType();

	const overlayTypeHandler = (newValue, key) => {
		setAttributes({
			[key]: newValue,
			containerOverlayBg: {
				...containerOverlayBg,
				[bgState]: {
					...containerOverlayBg[bgState],
					style: newValue === "gradient-overlay" ? "gradient" : "bgColor",
				},
			},
		});
	};
	const overlayOpacityHandler = (newValue, key) => {
		const attr = attributes[key];
		setAttributes({
			[key]: {
				...attr,
				device: { ...attr.device, [deviceType]: newValue.value },
			},
		});
	};

	return (
		<>
			<SPToggleGroupControl
				attributes={bgState}
				onClick={(newValue) => setBgState(newValue)}
				items={[
					{
						value: "color",
						label: __("Normal", "post-carousel"),
					},
					{
						value: "hover",
						label: __("Hover", "post-carousel"),
					},
				]}
			/>
			<Background
				label={__("Background Style", "post-carousel")}
				attributes={containerBG}
				attributesKey={"containerBG"}
				setAttributes={setAttributes}
				colorType={bgState}
				imageObj={{
					imageKey: "containerBGImage",
					// hoverKey: 'containerBGImageHover',
					backgroundImage: containerBGImage,
					// hoverImg: containerBGImageHover,
				}}
				videoObj={{
					imageKey: "containerBGVideo",
					backgroundImage: containerBGVideo,
				}}
				items={bgBtn}
			/>
			{"color" === bgState && (
				<>
					{["image", "video"].includes(containerBG.color.style) && (
						<>
							<SelectField
								label={__("Overlay Type", "post-carousel")}
								attributes={containerOverlayType}
								attributesKey={"containerOverlayType"}
								setAttributes={setAttributes}
								onChange={(newValue) => overlayTypeHandler(newValue, "containerOverlayType")}
								items={overlayTypeItems}
							/>
							{"no-overlay" !== containerOverlayType && (
								<>
									<p style={{ marginBottom: "0" }}>
										{containerOverlayBg[bgState].style === "gradient" && "Gradient Color"}
									</p>
									<Background
										attributes={containerOverlayBg}
										attributesKey={"containerOverlayBg"}
										setAttributes={setAttributes}
										colorType={bgState}
									/>
									<SPRangeControl
										label={__("Opacity", "post-carousel")}
										attributes={containerOverlayOpacity}
										attributesKey={"containerOverlayOpacity"}
										setAttributes={setAttributes}
										units={["%"]}
										max={100}
										defaultValue={{
											unit: "%",
											value: 75,
										}}
										customValue={containerOverlayOpacity.device?.[deviceType]}
										onValueChange={(newValue) =>
											overlayOpacityHandler(newValue, "containerOverlayOpacity")
										}
									/>
									<SelectField
										label={__("Blend Mode", "post-carousel")}
										attributes={containerOverlayBlandMode}
										attributesKey={"containerOverlayBlandMode"}
										setAttributes={setAttributes}
										items={imageBlandMode}
									/>
								</>
							)}
						</>
					)}
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: containerBorder,
							borderWidth: containerBorderWidth,
						}}
						attributesKey={{
							border: "containerBorder",
							borderWidth: "containerBorderWidth",
						}}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 1 }}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={containerBorderRadius}
						attributesKey={"containerBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={containerBoxShadowEnable}
						attributesKey={"containerBoxShadowEnable"}
						setAttributes={setAttributes}
					/>
					{containerBoxShadowEnable && (
						<>
							<BoxShadow
								label={__("Box Shadow Value", "post-carousel")}
								attributes={containerBoxShadow}
								attributesKey={"containerBoxShadow"}
								setAttributes={setAttributes}
							/>
						</>
					)}
				</>
			)}
			{"hover" === bgState && (
				<>
					{"image" === containerBG.hover.style && (
						<>
							<SelectField
								label={__("Overlay Type on Hover", "post-carousel")}
								attributes={containerOverlayTypeHover}
								attributesKey={"containerOverlayTypeHover"}
								setAttributes={setAttributes}
								onChange={(newValue) => overlayTypeHandler(newValue, "containerOverlayTypeHover")}
								items={overlayTypeItems}
							/>
							{"no-overlay" !== containerOverlayTypeHover && (
								<>
									<p style={{ marginBottom: "0" }}>
										{containerOverlayBg[bgState].style === "gradient" && "Gradient Color"}
									</p>
									<Background
										attributes={containerOverlayBg}
										attributesKey={"containerOverlayBg"}
										setAttributes={setAttributes}
										colorType={bgState}
									/>
									<SPRangeControl
										label={__("Hover Opacity", "post-carousel")}
										attributes={containerOverlayOpacityHover}
										attributesKey={"containerOverlayOpacityHover"}
										setAttributes={setAttributes}
										units={["%"]}
										max={100}
										defaultValue={{
											unit: "%",
											value: 50,
										}}
										customValue={containerOverlayOpacityHover.device?.[deviceType]}
										onValueChange={(newValue) =>
											overlayOpacityHandler(newValue, "containerOverlayOpacityHover")
										}
									/>
									<SelectField
										label={__("Blend Mode", "post-carousel")}
										attributes={containerOverlayBlandModeHover}
										attributesKey={"containerOverlayBlandModeHover"}
										setAttributes={setAttributes}
										items={imageBlandMode}
									/>
								</>
							)}
						</>
					)}
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: containerBorder,
							borderWidth: containerBorderWidthHover,
						}}
						attributesKey={{
							border: "containerBorder",
							borderWidth: "containerBorderWidthHover",
						}}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: "" }}
						btnType={"hover"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={containerBorderRadiusHover}
						attributesKey={"containerBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow on Hover", "post-carousel")}
						attributes={containerBoxShadowEnableHover}
						attributesKey={"containerBoxShadowEnableHover"}
						setAttributes={setAttributes}
					/>
					{containerBoxShadowEnableHover && (
						<BoxShadow
							label={__("Box Shadow Value on Hover", "post-carousel")}
							attributes={containerBoxShadowHover}
							attributesKey={"containerBoxShadowHover"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			<Divider position={"w-100pct bottom"} />
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={containerPadding}
				attributesKey={"containerPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				max={200}
				defaultValue={{
					unit: "px",
					value: { top: 8, right: 10, bottom: 8, left: 10 },
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={containerMargin}
				attributesKey={"containerMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				max={200}
				defaultValue={{
					unit: "px",
					value: { top: 8, right: 10, bottom: 8, left: 10 },
				}}
			/>
		</>
	);
};

export const ContainerVisibilityTab = ({ attributes, setAttributes }) => {
	const { advanceVisibilityHideDesktop, advanceVisibilityHideTablet, advanceVisibilityHideMobile } = attributes;

	return (
		<>
			<Toggle
				label={__("Hide on Desktop", "post-carousel")}
				attributes={advanceVisibilityHideDesktop}
				attributesKey={"advanceVisibilityHideDesktop"}
				setAttributes={setAttributes}
				pro={true}
			/>
			<Toggle
				label={__("Hide on Tablet", "post-carousel")}
				attributes={advanceVisibilityHideTablet}
				attributesKey={"advanceVisibilityHideTablet"}
				setAttributes={setAttributes}
				pro={true}
			/>
			<Toggle
				label={__("Hide on Mobile", "post-carousel")}
				attributes={advanceVisibilityHideMobile}
				attributesKey={"advanceVisibilityHideMobile"}
				setAttributes={setAttributes}
				pro={true}
			/>
		</>
	);
};

export const ContainerAdvanceAdvancedTab = ({ attributes, setAttributes }) => {
	const { advancedAdditionalID, advancedAdditionalClass } = attributes;

	return (
		<>
			<InputControl
				label={__("ID", "post-carousel")}
				attributes={advancedAdditionalID}
				attributesKey={"advancedAdditionalID"}
				setAttributes={setAttributes}
				inputType="text"
				flex={false}
			/>
			<InputControl
				label={__("Additional CSS Class(ES)", "post-carousel")}
				attributes={advancedAdditionalClass}
				attributesKey={"advancedAdditionalClass"}
				setAttributes={setAttributes}
				placeholder={__("", "post-carousel")}
				inputType="text"
				flex={false}
			/>
		</>
	);
};
