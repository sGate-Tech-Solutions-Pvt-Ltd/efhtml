import { SelectControl } from "@wordpress/components";
import "./editor.scss";
import { memo } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import Responsive from "../responsive/responsive";

const SelectField = ({
	attributes,
	attributesKey,
	setAttributes,
	label,
	items,
	flexStyle = false,
	onChange = false,
	value = false,
	defaultOption = false,
	extraClassName = "",
	pro = false,
}) => {
	// Device check fn
	const deviceType = useDeviceType();
	// Set Button value
	const setNewValue = (newValue) => {
		if (attributes?.device) {
			setAttributes({
				[attributesKey]: {
					device: { ...attributes?.device, [deviceType]: newValue },
				},
			});
		} else {
			setAttributes({ [attributesKey]: newValue });
		}
	};

	// Get active button value
	const activeValue = attributes?.device ? attributes?.device?.[deviceType] : attributes;

	let selectItems = [];
	if (defaultOption) {
		selectItems = [{ label: "Default", value: "" }, ...items];
	} else {
		selectItems = items;
	}

	return (
		<div
			className={`sp-smart-post-select-field sp-smart-post-component-mb ${
				flexStyle ? "sp-smart-post-d-flex" : "sp-smart-post-d-block"
			}${extraClassName}${pro ? " sp-is-pro" : ""}`}
		>
			<div className="sp-smart-post-header">
				<span
					className={
						attributes?.device ? "sp-smart-post-select-component-title" : "sp-smart-post-component-title"
					}
				>
					{" "}
					{label}
					{pro && <a target="_blank" href="https://wpsmartpost.com/pricing/?ref=1" className="sp-smart-pro-text"> (Pro) </a>}
				</span>
				{attributes?.device && <Responsive />}
			</div>
			<SelectControl
				className="custom-select-control"
				value={value ? value : activeValue}
				options={selectItems}
				onChange={(newField) => (onChange ? onChange(newField) : setNewValue(newField))}
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			/>
		</div>
	);
};

export default memo(SelectField);
