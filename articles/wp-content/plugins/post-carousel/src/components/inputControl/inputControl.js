// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalInputControl as Input } from "@wordpress/components";
import "./editor.scss";
import { useDeviceType } from "../../controls/controls";
import Responsive from "../responsive/responsive";
import { useState } from "@wordpress/element";
import { priceLink } from "../../blocks/shared/helpFn";

const InputControl = ({
	attributes,
	attributesKey,
	setAttributes,
	label,
	ajax = false,
	flex = true,
	inputType = "number",
	placeholder,
	onChange = false,
	help = false,
	min = 1,
	step = 1,
	max = 100000,
	className = "",
	pro = false,
}) => {
	// Check device (desktop/tablet/mobile).
	const deviceType = useDeviceType();

	const value = attributes?.device ? attributes?.device?.[deviceType] : attributes;

	const [currentValue, setCurrentValue] = useState(value);
	const [ajaxLod, setAjaxLoad] = useState(false);

	const setInputValue = (newValue) => {
		if (attributes?.device) {
			setAttributes({
				[attributesKey]: {
					...attributes,
					device: { ...attributes.device, [deviceType]: newValue },
				},
			});
		} else {
			setAttributes({ [attributesKey]: newValue });
		}
	};

	const setClearTimeOut = setTimeout(() => {
		if (ajax && ajaxLod) {
			setInputValue(currentValue);
			setAjaxLoad(false);
		}
	}, 500);

	// Set value function.
	const setValue = (newValue) => {
		newValue = newValue > max ? max : newValue;

		if (ajax) {
			clearTimeout(setClearTimeOut);
			setCurrentValue(newValue);
			setAjaxLoad(true);
		} else {
			setInputValue(newValue);
		}
	};

	return (
		<>
			<div className={`sp-smart-post-input-control sp-smart-post-component-mb ${className}${pro ? " sp-is-pro" : ""}`}>
				<div className="sp-smart-post-spacing-part-1">
					<div className={`sp-smart-post-header-input-control ${flex ? "d-flex" : "d-block"}`}>
						<div className="sp-smart-post-header-control-left">
							<span className="sp-smart-post-component-title">
								{label}
								{pro && <a target="_blank" href={priceLink} className="sp-smart-pro-text">(Pro)</a>}
							</span>
							{attributes?.device && <Responsive />}
						</div>
						<div className="sp-smart-post-header-control-right">
							<Input
								type={inputType}
								value={ajax ? currentValue : value}
								onChange={(val) => (onChange ? onChange(val) : setValue(val))}
								placeholder={placeholder} // Use placeholder prop here
								help={help}
								step={step}
								min={min}
								max={max}
								__next40pxDefaultSize
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InputControl;
