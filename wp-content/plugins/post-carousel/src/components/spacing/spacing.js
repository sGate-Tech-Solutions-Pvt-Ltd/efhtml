import { Button, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ResetButton, SpLinkedButton, Units } from "../utility";
import Responsive from "../responsive/responsive";
import { BorderIcon, LinkedIcon } from "../../icons/icons";
import "./editor.scss";
import { sideAxisIcons } from "../../controls/constants";
import { useDeviceType } from "../../controls/controls";
import { memo, useEffect, useState } from "@wordpress/element";

const SpCustomRanger = ({
	attr,
	sideKey = "all",
	onChangeHandler,
	rangeStep,
	min,
	max,
	step,
	rangeMax,
	indicator = "",
	selectUnit = "",
}) => {
	const [showInput, setShowInput] = useState(true); // when user clicks presetControl
	const rangerStep = showInput ? rangeStep : step;
	const iconType = indicator ? `${indicator}-${sideKey}` : sideKey;
	const rangerValue = () => {
		if ( sideKey === "all" ) {
			return Number(attr.top) || "";
		} 
		return Number( attr[sideKey] || "" );
	};
	const rangeValue = rangerValue();
	useEffect(() => {
		if (rangeValue % rangeStep !== 0) {
			setShowInput(false);
		}
		if (rangeMax && rangeValue > rangeMax) {
			setShowInput(false);
		}
		if (typeof rangeValue === "undefined" || rangeValue === "") {
			setShowInput(true);
		}
	}, [step, sideKey, attr]);

	return (
		<div className="sp-smart-range-control-ranger-row">
			<div className="sp-smart-range-control sp-side-demo-icon">
				<span className="sp-link-side-icon">{sideAxisIcons[iconType]}</span>
			</div>
			<div className="sp-smart-range-control sp-ranger">
				<RangeControl
					value={rangeValue}
					onChange={(val) => onChangeHandler(sideKey, val)}
					step={rangerStep}
					min={min}
					max={showInput && rangeMax ? rangeMax : max}
					withInputField={showInput ? false : true}
					marks={showInput ? true : false}
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					renderTooltipContent={(value) => `${value}${selectUnit}`}
				/>
			</div>
			<div className="sp-smart-range-control sp-preset-btn" onClick={() => setShowInput(!showInput)}>
				<BorderIcon isActive={!showInput} />
			</div>
		</div>
	);
};

const Spacing = ({
	label,
	attributes,
	attributesKey,
	setAttributes = () => {},
	onChange,
	units = false,
	rangeStep = 8,
	step = 1,
	min = 0,
	max = 300,
	rangeMax = 50,
	resetIcon = true,
	onUnitChange = false,
	// sidesAxis = false, // array [ 'horizontal', 'vertical']
	indicator = "",
	defaultValue = {unit: "px", value: { top: 0, right: 0, bottom: 0, left: 0 } },
	customClass = "",
	updateAllChange,
}) => {
	const deviceType = useDeviceType();
	const attrValue = () => {
		let attributesValue = {};
		if ("object" === typeof attributes?.device) {
			attributesValue = attributes?.device?.[deviceType];
		} else if ("object" === typeof attributes?.value) {
			attributesValue = attributes?.value;
		} else {
			attributesValue = attributes;
		}
		return attributesValue;
	};

	const [simpleAttr, setSimpleAttr] = useState(attrValue());

	const linked = attributes?.allChange || false;

	const onChangeHandler = (side, newVal) => {
		let updatedValue = { ...simpleAttr };

		switch (side) {
			case "all":
				updatedValue = {
					top: newVal,
					right: newVal,
					bottom: newVal,
					left: newVal,
				};
				break;
			default:
				updatedValue[side] = newVal;
				break;
		}

		const newAttributes =
			attributes?.device && typeof attributes.device === "object"
				? {
						...attributes,
						device: {
							...attributes.device,
							[deviceType]: updatedValue,
						},
					}
				: {
						...attributes,
						value: updatedValue,
					};
		if (onChange) {
			onChange(newAttributes);
		} else {
			setAttributes({ [attributesKey]: newAttributes });
		}
		setSimpleAttr(updatedValue);
	};
	const onValueReset = () => {
		const newAttributes =
			attributes?.device && typeof attributes.device === "object"
				? {
						...attributes,
						device: {
							...attributes.device,
							[deviceType]: defaultValue.value,
						},
					}
				: {
						...attributes,
						value: defaultValue.value,
					};
		setAttributes({ [attributesKey]: newAttributes });
		setSimpleAttr(defaultValue.value);
	};
	useEffect(() => {
		const deviceValue = attributes?.device?.[deviceType];
		if (deviceValue) {
			if (Object.values(deviceValue).every((side) => side === deviceValue.top)) {
				setAttributes({
					[attributesKey]: { ...attributes, allChange: true },
				});
			}
		}
	}, []);

	return (
		<div
			className={`sp-smart-post-spacing-range-control sp-smart-post-range-control sp-smart-post-component-mb${
				customClass ? " " + customClass : ""
			}`}
		>
			<div className="sp-smart-post-header-control">
				<div className="sp-smart-post-header-control-left">
					<span onClick={(e) => activeLabel(e)} className="sp-smart-post-component-title">
						{label}
					</span>
					{attributes?.device && <Responsive />}
				</div>
				<div className="sp-smart-post-header-control-right">
					{resetIcon && <ResetButton onClick={() => onValueReset()} />}
					<SpLinkedButton
						attributes={attributes}
						attributesKey={attributesKey}
						setAttributes={setAttributes}
						Icon={indicator ? sideAxisIcons["radius-all"] : sideAxisIcons.all}
						updateAllChange={updateAllChange ? updateAllChange : false}
					/>
					{units && (
						<Units
							attributes={attributes}
							setAttributes={setAttributes}
							attributesKey={attributesKey}
							units={units}
							onUnitChange={onUnitChange ? onUnitChange : false}
						/>
					)}
				</div>
			</div>
			{linked && (
				
					<SpCustomRanger
						key={linked}
						attr={simpleAttr}
						sideKey={"all"}
						onChangeHandler={onChangeHandler}
						min={min}
						max={max}
						rangeStep={rangeStep}
						step={step}
						rangeMax={rangeMax}
						indicator={indicator}
						selectUnit={attributes.unit?.[deviceType]}
					/>
				) }
			{!linked &&
				["top", "right", "bottom", "left"].map((side) => (
					<SpCustomRanger
						key={`${side}${linked}`}
						attr={simpleAttr}
						sideKey={side}
						onChangeHandler={onChangeHandler}
						min={min}
						max={max}
						rangeStep={rangeStep}
						step={step}
						rangeMax={rangeMax}
						indicator={indicator}
						selectUnit={attributes?.unit?.[deviceType] || attributes?.unit}
					/>
				))}
		</div>
	);
};

export default memo(Spacing);
