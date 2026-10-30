import { Button } from "@wordpress/components";
import Responsive from "../responsive/responsive";
import { useDeviceType } from "../../controls/controls";
import { ResetIcon } from "../../icons/icons";

export const BoxSpacing = ({
	label,
	customClass,
	attributes,
	attributesKey,
	setAttributes,
	boxUnits,
	units,
	labelItem,
	handleReset,
	onChange = false,
}) => {
	const deviceType = useDeviceType();
	const haveDevice = typeof attributes?.device !== "undefined" ? true : false;
	const attrValue = haveDevice ? attributes?.device?.[deviceType] : attributes?.value;

	const setSpacingData = (newValue, side) => {
		const updateValue = haveDevice
			? {
					...attributes,
					device: {
						...attributes.device,
						[deviceType]: {
							...attributes.device?.[deviceType],
							[side]: parseInt(newValue),
						},
					},
				}
			: {
					...attributes,
					value: {
						...attributes["value"],
						[side]: parseInt(newValue),
					},
				};
		if (onChange) {
			onChange(attributesKey, updateValue);
		} else {
			setAttributes({
				[attributesKey]: updateValue,
			});
		}
	};

	const setUnit = (value) => {
		const updateUnit = haveDevice ? { ...attributes.unit, [deviceType]: value } : value;

		if (onChange) {
			onChange(attributesKey, { ...attributes, unit: updateUnit });
		} else {
			setAttributes({
				[attributesKey]: {
					...attributes,
					unit: updateUnit,
				},
			});
		}
	};

	return (
		<div className={`sp-smart-post-spacing${customClass ? " " + customClass : ""} sp-smart-post-component-mb`}>
			<div className="sp-smart-post-spacing-part-1">
				<div className="sp-smart-post-header-control">
					<div className="sp-smart-post-header-control-left">
						<span className="sp-smart-post-component-title">{label}</span>
						{attributes?.device && <Responsive />}
					</div>
					<div className="sp-smart-post-header-control-right">
						<Button onClick={() => handleReset()} className={`sp-smart-post-header-control-reset`}>
							<ResetIcon />
						</Button>
						<div className={`sp-smart-post-units ${boxUnits ? "box" : ""}`}>
							<span className={boxUnits ? "box-unit" : ""}>
								{"object" !== typeof attributes?.unit ? attributes?.unit : attributes.unit?.[deviceType]}
							</span>
							<div className="sp-smart-post-units-btn">
								{units?.map((item, i) => (
									<Button
										className={attributes?.unit?.[deviceType] === item.toLowerCase() ? "active" : ""}
										key={i}
										value={item}
										onClick={(e) => setUnit(e.target.value)}
									>
										{" "}
										{item}{" "}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sp-smart-post-spacing-part-2">
				{["top", "right", "bottom", "left"].map((side, i) => (
					<div key={i} className={`sp-smart-post-spacing-${side}`}>
						<span className="sp-smart-post-spacing-wrapper">
							<input
								id={`sp-smart-post-spacing-${side}-${i}`}
								onChange={(e) => setSpacingData(e.target.value, [side])}
								type="number"
								value={attrValue?.[side]}
							/>
						</span>
						<label htmlFor={`sp-smart-post-spacing-${side}-${i}`}>{labelItem?.[side]}</label>
					</div>
				))}
			</div>
		</div>
	);
};
