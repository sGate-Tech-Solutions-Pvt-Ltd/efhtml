import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { Background, Border, Spacing, SpColorPicker, SPToggleGroupControl } from "../../components";
import { jsonParse } from "../shared/helpFn";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";

export const SocialSingleIconStyleTab = ({ attributes, setAttributes }) => {
	const {
		socialSingleColor,
		socialSingleBG,
		socialSingleBorder,
		socialSingleBorderWidth,
		socialSingleBorderRadius,
		socialSingleBorderHover,
		socialSingleBorderWidthHover,
		socialSingleBorderRadiusHover,
		socialSingleIconType,
	} = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
			<SPToggleGroupControl
				attributes={colorState}
				onClick={(newValue) => setColorState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
			/>
			{"icon" === socialSingleIconType && (
				<>
					{"color" === colorState ? (
						<>
							<SpColorPicker
								label={__("Icon Color", "post-carousel")}
								value={socialSingleColor?.color}
								onChange={(newValue) =>
									setAttributes({
										socialSingleColor: {
											...socialSingleColor,
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
								value={socialSingleColor?.hover}
								onChange={(newValue) =>
									setAttributes({
										socialSingleColor: {
											...socialSingleColor,
											hover: newValue,
										},
									})
								}
							/>
						</>
					)}
				</>
			)}
			<Background
				label={__("Background Type", "post-carousel")}
				attributes={socialSingleBG}
				attributesKey={"socialSingleBG"}
				setAttributes={setAttributes}
				colorType={colorState}
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
			{"color" === colorState ? (
				<>
					<Border
						attributes={{
							border: socialSingleBorder,
							borderWidth: socialSingleBorderWidth,
						}}
						attributesKey={{
							border: "socialSingleBorder",
							borderWidth: "socialSingleBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={socialSingleBorderRadius}
						attributesKey={"socialSingleBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
				</>
			) : (
				<>
					<Border
						label={__("Border on Hover", "post-carousel")}
						attributes={{
							border: socialSingleBorderHover,
							borderWidth: socialSingleBorderWidthHover,
						}}
						attributesKey={{
							border: "socialSingleBorderHover",
							borderWidth: "socialSingleBorderWidthHover",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius on Hover", "post-carousel")}
						attributes={socialSingleBorderRadiusHover}
						attributesKey={"socialSingleBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "%",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
				</>
			)}
		</>
	);
};

export const SocialSingleLabelStyleTab = ({ attributes, setAttributes }) => {
	const { socialSingleLabelColor, socialSingleSubTextColor } = attributes;
	const [colorState, setColorState] = useState("color");

	return (
		<>
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
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={socialSingleLabelColor.color}
						onChange={(newValue) =>
							setAttributes({
								socialSingleLabelColor: {
									...socialSingleLabelColor,
									color: newValue,
								},
							})
						}
					/>
					<SpColorPicker
						label={__("Sub Text Color", "post-carousel")}
						value={socialSingleSubTextColor.color}
						onChange={(newValue) =>
							setAttributes({
								socialSingleSubTextColor: {
									...socialSingleSubTextColor,
									color: newValue,
								},
							})
						}
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={socialSingleLabelColor.hoverColor}
						onChange={(newValue) =>
							setAttributes({
								socialSingleLabelColor: {
									...socialSingleLabelColor,
									hoverColor: newValue,
								},
							})
						}
					/>
					<SpColorPicker
						label={__("Sub Text Color", "post-carousel")}
						value={socialSingleSubTextColor.hoverColor}
						onChange={(newValue) =>
							setAttributes({
								socialSingleSubTextColor: {
									...socialSingleSubTextColor,
									hoverColor: newValue,
								},
							})
						}
					/>
				</>
			)}
		</>
	);
};
