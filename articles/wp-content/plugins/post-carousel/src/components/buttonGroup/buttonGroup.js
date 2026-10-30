import { ButtonGroup, Button } from "@wordpress/components";
import "./editor.scss";
import { useDeviceType } from "../../controls/controls";
import Responsive from "../responsive/responsive";

const SpButtonGroup = ({
	attributes,
	attributesKey,
	setAttributes,
	label,
	items,
	border = false,
	flexStyle = false,
	onClick = false,
}) => {
	// Device type
	const deviceType = useDeviceType();

	// Update button group value
	const setButtonGroup = (newValue) => {
		if (attributes?.device) {
			setAttributes({
				[attributesKey]: {
					...attributes.device,
					[deviceType]: newValue,
				},
			});
		} else {
			setAttributes({ [attributesKey]: newValue });
		}
	};

	// Get the active value
	const activeValue = attributes?.device ? attributes.device?.[deviceType] : attributes;

	// Handle button click
	const handleClick = (value) => {
		if (onClick) {
			onClick(value);
		} else {
			setButtonGroup(value);
		}
	};

	return (
		<ButtonGroup
			className={`sp-smart-post-button-group sp-smart-post-component-mb ${
				flexStyle ? "sp-smart-post-d-flex button-style-2" : ""
			}`}
		>
			{label && (
				<div className="sp-smart-post-component-top sp-smart-post-component-title">
					<span>{label}</span>
					{attributes?.device && <Responsive />}
				</div>
			)}
			<div className={`sp-smart-post-button-group-list ${border ? "has-border" : ""}`}>
				{items?.map((item, i) => (
					<Button
						className={activeValue === item.value ? "active" : ""}
						key={i}
						value={item.value}
						onClick={() => handleClick(item.value)}
					>
						<span>{item.label}</span>
						{item.tooltip && <p>{item.tooltip}</p>}
					</Button>
				))}
			</div>
		</ButtonGroup>
	);
};

export default SpButtonGroup;
