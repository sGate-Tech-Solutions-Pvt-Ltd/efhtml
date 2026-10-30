/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useDeviceType } from "../../controls/controls";
// import Responsive from '../responsive/responsive';
import "./editor.scss";
import { memo } from "@wordpress/element";
import Responsive from "../responsive/responsive";
import { priceLink } from "../../blocks/shared/helpFn";

const SPToggleGroupControl = ({
	attributes,
	attributesKey,
	setAttributes,
	label = "",
	items,
	border = false,
	flexStyle = false,
	onClick = false,
	hasDivider = true,
	extraClass = "",
	pro = false,
}) => {
	// Device type
	const deviceType = useDeviceType();

	// Update button group value
	const setButtonGroup = (newValue) => {
		if (attributes?.device) {
			setAttributes({
				[attributesKey]: {
					...attributes,
					device: {
						...attributes.device,
						[deviceType]: newValue,
					},
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
		<div className={`sp-smart-post-toggle-button-group-wrapper sp-smart-post-component-mb${pro ? " sp-is-pro" : ""}`}>
			<div className="sp-smart-post-header">
				<span
					// onClick={ ( e ) => activeLabel( e ) }
					className="sp-smart-post-component-title"
				>
					{label}
					{pro && <a target="_blank" href={priceLink} className="sp-smart-pro-text"> (Pro) </a>}
				</span>
				{attributes?.device && <Responsive />}
			</div>
			<ToggleGroupControl
				className={`sp-smart-post-toggle-button-group sp-smart-post-component-mb${
					label ? "" : " sp-negative-space"
				} ${flexStyle ? "sp-smart-post-d-flex button-style-2" : ""}`}
				// label={ hasDevice ? '' : label }
				// aria-label={
				// 	label
				// 		? label
				// 		: __(
				// 				'Normal and Hover Button Control',
				// 				'smart-post-show'
				// 		  )
				// }
				value={activeValue}
				isBlock
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				onChange={(value) => handleClick(value)}
			>
				<div
					className={`sp-smart-post-toggle-button-group-list ${border ? "has-border" : ""}${
						hasDivider ? " sp-has-divider" : ""
					} ${extraClass}`}
				>
					{items?.map((item, i) => (
						<ToggleGroupControlOption
							key={i}
							value={item.value}
							label={item.label}
							showTooltip={item.tooltip ? true : false}
							aria-label={item.tooltip}
							disabled={item.disabled || ""}
							className={activeValue === item.value ? "active" : ""}
						/>
					))}
				</div>
			</ToggleGroupControl>
		</div>
	);
};

export default memo(SPToggleGroupControl);
