import { __ } from "@wordpress/i18n";
import { useState, memo } from "@wordpress/element";
import SpColorPicker from "../color/color";
import SPToggleGroupControl from "../toggleGroupControl/toggleGroupControl";
import { DashedStyle, DottedStyle, DoubleStyle, SolidStyle } from "../../icons/icons";
import "./editor.scss";
import Spacing from "../spacing/spacing";
import { useDeviceType } from "../../controls/controls";

const Border = ({
	label = "Border",
	attributes,
	setAttributes,
	attributesKey,
	units = ["px", "%", "em"],
	btnType = false,
	defaultValue = {unit: "px", value: { top: 0, right: 0, bottom: 0, left: 0 } },
	defaultColor = "#fff",
	onStateUpdate = false,
}) => {
	const { border, borderWidth } = attributes;
	const [buttonTab, setButtonTab] = useState("normal");
	const deviceType = useDeviceType();

	const borderColorOptions = [
		{ label: "Normal", value: "normal" },
		...(attributes.border.hoverColor ||
		attributes.border.hoverColor === "" ||
		attributes.border.hover ||
		attributes.border.hover === ""
			? [{ label: "Hover", value: "hover" }]
			: []),
		...(attributes.border.activeColor ||
		attributes.border.activeColor === "" ||
		attributes.border.active ||
		attributes.border.active === ""
			? [{ label: "Active", value: "activeColor" }]
			: []),
	];

	const hoverColor = () => {
		if (border?.hoverColor !== undefined) {
			return "hoverColor";
		}
		if (border?.hover !== undefined) {
			return "hover";
		}
		if (border?.activeColor !== undefined) {
			return "activeColor";
		}
		return "active";
	};

	const borderStyleString = () => {
		if (btnType && btnType !== "normal") {
			return "hoverStyle";
		}
		return "style";
	};
	const updateBorderWithHandler = (newValue) => {
		if (onStateUpdate) {
			onStateUpdate(attributesKey.borderWidth, newValue);
		}
		return false;
	};
	const updateSpacingUtilityHandler = (type, newUtility) => {
		if (onStateUpdate) {
			onStateUpdate(attributesKey.borderWidth, {
				...attributes.borderWidth,
				[type]: newUtility,
			});
		} else {
			const updateAttr =
				type === "allChange"
					? { ...attributes.borderWidth, [type]: newUtility }
					: {
							...attributes.borderWidth,
							[type]: { ...attributes?.borderWidth?.unit, [deviceType]: newUtility },
						};
			setAttributes({ [attributesKey.borderWidth]: updateAttr });
		}
	};

	return (
		<>
			<div className="sp-smart-post-border-control sp-smart-post-component-mb ">
				<div className="sp-smart-post-header-control sp-mb-8px">
					<span className="sp-smart-post-component-title">{label}</span>
				</div>
				<div
					className={`sp-smart-post-border-style-wrapper${
						!["none", ""].includes(border?.[borderStyleString()]) ? " sp-smart-post-component-mb" : ""
					}`}
				>
					<SPToggleGroupControl
						attributes={border?.[borderStyleString()]}
						onClick={(newValue) =>
							onStateUpdate
								? onStateUpdate(attributesKey.border, { ...border, [borderStyleString()]: newValue })
								: setAttributes({
										[attributesKey.border]: {
											...border,
											[borderStyleString()]: newValue,
										},
									})
						}
						items={[
							{ label: "None", value: "none" },
							{ label: <SolidStyle />, value: "solid" },
							{ label: <DashedStyle />, value: "dashed" },
							{ label: <DottedStyle />, value: "dotted" },
							{ label: <DoubleStyle />, value: "double" },
						]}
					/>
				</div>
				{!["none", ""].includes(border?.[borderStyleString()]) && (
					<>
						<div className="sp-smart-post-component-mb">
							<Spacing
								key={borderStyleString()}
								label={"Border Width"}
								attributes={borderWidth}
								attributesKey={attributesKey.borderWidth}
								setAttributes={setAttributes}
								units={units}
								rangeStep={0.5}
								min={0}
								max={10}
								rangeMax={2}
								defaultValue={defaultValue}
								onChange={onStateUpdate ? updateBorderWithHandler : false}
								onUnitChange={(newValue) => updateSpacingUtilityHandler("unit", newValue)}
								updateAllChange={(newValue) => updateSpacingUtilityHandler("allChange", newValue)}
							/>
						</div>
						{!btnType && (
							<SPToggleGroupControl
								attributes={buttonTab}
								items={borderColorOptions}
								onClick={(newValue) => setButtonTab(newValue)}
							/>
						)}
						{/* {[btnType, buttonTab].includes("normal") && ( */}
						{((btnType && btnType === "normal") || (!btnType && buttonTab === "normal")) && (
							<SpColorPicker
								label={__("Border Color", "post-carousel")}
								value={border?.color}
								onChange={(newValue) =>
									onStateUpdate
										? onStateUpdate(attributesKey.border, { ...border, color: newValue })
										: setAttributes({
												[attributesKey.border]: {
													...border,
													color: newValue,
												},
											})
								}
								defaultColor={typeof defaultColor === "object" ? defaultColor.color : defaultColor}
							/>
						)}
						{([btnType, buttonTab].includes("hover") || [btnType, buttonTab].includes("activeColor")) && (
							<SpColorPicker
								label={__("Border Color Hover", "post-carousel")}
								value={border?.[hoverColor()]}
								onChange={(newValue) =>
									onStateUpdate
										? onStateUpdate(attributesKey.border, { ...border, hoverColor: newValue })
										: setAttributes({
												[attributesKey.border]: {
													...border,
													[hoverColor()]: newValue,
												},
											})
								}
								defaultColor={typeof defaultColor === "object" ? defaultColor.hover : defaultColor}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default memo(Border);
