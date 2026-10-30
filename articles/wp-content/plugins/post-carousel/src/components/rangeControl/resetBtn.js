import { memo } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import { Button } from "@wordpress/components";
import { ResetIcon } from "../../icons/icons";

const ResetButton = ({
	attributes,
	setAttributes,
	attributesKey,
	defaultValue,
	value,
	setCurrentValue = () => {},
	setCustomReset = false,
}) => {
	const deviceType = useDeviceType();
	// Ranger single value and multiple device value.
	const defaultValueOrDevice = defaultValue?.device ? defaultValue?.device?.[deviceType] : defaultValue.value;

	const activeResetButton = () => {
		// If unit is not present, treat it as not changed
		const hasUnit = typeof attributes?.unit === "object" && typeof defaultValue?.unit === "object";
		const isUnitDifferent = hasUnit && defaultValue.unit?.[deviceType] !== attributes.unit?.[deviceType];

		const isValueDifferent = defaultValue?.device?.[deviceType] !== parseInt(value);

		if (isUnitDifferent || isValueDifferent) {
			return "active";
		}

		return "";
	};

	// Set default value function and reset.
	const setDefault = () => {
		if (setCustomReset) {
			// return { value: defaultValue?.value, unit: defaultValue?.unit };
			return setCurrentValue(defaultValueOrDevice);
		}
		// It's multiple device (desktop/tablet/mobile).
		if ( !setCustomReset && attributes.device) {
			setAttributes({
				[attributesKey]: {
					...attributes,
					device: {
						...attributes.device,
						[deviceType]: defaultValue.value,
					},
					unit: {
						...attributes.unit,
						[deviceType]: defaultValue.unit,
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
						value: defaultValue.value,
					},
				});
			}
		} else {
			setAttributes({ [attributesKey]: defaultValue });
		}

		setCurrentValue(defaultValueOrDevice);
	};

	return (
		<Button
			className={`sp-smart-post-header-control-reset ${activeResetButton()}`}
			onClick={() => setDefault()}
			aria-label="Reset to default value"
		>
			<ResetIcon />
		</Button>
	);
};

export default memo(ResetButton);
