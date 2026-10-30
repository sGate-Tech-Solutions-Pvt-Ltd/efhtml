import { RangeControl } from "@wordpress/components";
import "./editor.scss";
import { memo, useState, useEffect } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import Responsive from "../responsive/responsive";
import Units from "./units";
import ResetButton from "./resetBtn";
import { priceLink } from "../../blocks/shared/helpFn";

let setClearTimeOut = "";
const SPRangeControl = ({
	attributes,
	attributesKey,
	setAttributes = () => {},
	label,
	onValueChange = false,
	onUnitChange = false,
	units,
	resetIcon = true,
	min = 0,
	max = 200,
	step = 1,
	defaultValue = {},
	className = "",
	helpText = "",
	typoLineHeight = false,
	customValue = "",
	setCustomReset = false,
	responsiveIcon = false,
	pro = false,
}) => {
	const [eventLoad, setEventLoad] = useState(false);
	const deviceType = useDeviceType();

	// Ranger single value and multiple device value.
	const value = attributes?.device
		? attributes?.device?.[deviceType]
		: "number" === typeof attributes?.value
			? attributes?.value
			: attributes;

	const [currentValue, setCurrentValue] = useState(value);

	useEffect(() => {
		setCurrentValue(value);
	}, [deviceType]);

	const setRangerAttributes = (newValue) => {
		// It's multiple device (desktop/tablet/mobile).
		if ( onValueChange ) { 
			return onValueChange({ value: newValue, deviceType: deviceType });
		 }
		if (attributes.device) {
			setAttributes({
				[attributesKey]: {
					...attributes,
					device: {
						...attributes.device,
						[deviceType]: newValue,
					},
				},
			});
		}
		// It's single device (desktop)
		if ("object" === typeof attributes) {
			if ("number" === typeof attributes.value) {
				setAttributes({
					[attributesKey]: {
						...attributes,
						value: newValue,
					},
				});
			}
		} else {
			setAttributes({ [attributesKey]: newValue });
		}
	};

	// Ranger value set function.

	// Fixed useEffect for state sync
	useEffect(() => {
		const newValue = attributes?.device ? attributes.device?.[deviceType] : (attributes?.value ?? attributes);
		setCurrentValue(newValue);
	}, [deviceType, attributes]); // Now watches both

	useEffect(() => {
		if (attributes?.unit === "%" || attributes?.unit?.[deviceType] === "%") {
			const updateValue = currentValue > 100 ? 100 : currentValue;
			setRangerAttributes(updateValue);
			setCurrentValue(updateValue);
		}
	}, [attributes?.unit?.[deviceType]]);

	const setValue = (newValue) => {
		setCurrentValue(newValue);

		clearTimeout(setClearTimeOut);
		setClearTimeOut = setTimeout(() => {
			setRangerAttributes(newValue);
		}, 100);
	};

	// Active Label.
	const activeLabel = (e) => {
		const input = e.target.parentNode.parentNode.parentNode;
		const inputId = input.querySelector("input").getAttribute("id");
		e.target.setAttribute("for", inputId);
		setEventLoad(eventLoad);
	};

	return (
		<>
			<div
				className={`sp-smart-post-range-control sp-smart-post-component-mb${
					!attributes?.device && !units ? " sp-negative-space" : ""
				} ${className} ${pro ? "sp-pro-ranger" : ""}`}
			>
				<div className="sp-smart-post-header-control">
					<div className="sp-smart-post-header-control-left">
						<span onClick={(e) => activeLabel(e)} className="sp-smart-post-component-title">
							{label}
							{pro && <a target="_blank" href={priceLink} className="sp-smart-pro-text"> (Pro) </a>}
						</span>
						{( attributes?.device || responsiveIcon ) && <Responsive />}
					</div>
					<div className="sp-smart-post-header-control-right">
						{resetIcon && (
							<ResetButton
								attributes={attributes}
								setAttributes={setAttributes}
								attributesKey={attributesKey}
								defaultValue={defaultValue}
								value={value}
								setCurrentValue={setCurrentValue}
								setCustomReset={setCustomReset}
							/>
						)}
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

				<RangeControl
					value={customValue ? customValue : currentValue}
					color="var(--sp-smart-primary-2-400)"
					onChange={(newValue) =>
						onValueChange
							? onValueChange({
									value: newValue,
									deviceType: deviceType,
								})
							: setValue(newValue)
					}
					min={min}
					max={
						"object" === typeof attributes?.unit && "%" === attributes?.unit?.[deviceType]
							? typoLineHeight
								? 200
								: 100
							: max
					}
					step={step}
					help={helpText}
					__nextHasNoMarginBottom={true}
					__next40pxDefaultSize
				/>
			</div>
		</>
	);
};

export default memo(SPRangeControl);
