import { ToggleControl } from "@wordpress/components";
import "./editor.scss";
import { memo } from "@wordpress/element";
import { DndTitleIcon } from "../../icons/icons";
import { priceLink } from "../../blocks/shared/helpFn";

const Toggle = ({
	label = "",
	attributes,
	pro = false,
	setAttributes = () => {},
	attributesKey = "",
	onChange = false,
	updated = false,
	helpText = false,
}) => {
	return (
		<>
			<div className={`sp-smart-post-toggle sp-smart-post-component-mb ${updated ? "updated-toggle" : ""} ${pro ? "sp-smart-pro-toggle" : ""}`}>
				{(updated || pro) && (
					<>
					{updated && <div className="sp-smart-post-toggle-left">
						<DndTitleIcon />
						<span className="sp-smart-post-component-title">{label}</span>
					</div>}
					{pro && <> <span className="sp-smart-pro-label"> {label} </span> <a target="_blank" href={priceLink} className="sp-smart-pro-text"> (Pro) </a></>}
					</>
				)}
				<ToggleControl
					label={!(updated || pro) ? label : ""}
					checked={attributes}
					onChange={pro ? () => {} : (newField) =>
						onChange
							? onChange(!newField)
							: setAttributes({
									[attributesKey]: !attributes,
								})
					}
					// help={helpText}
					__nextHasNoMarginBottom={true}
				/>
			</div>
			{helpText && <span className="components-toggle-control__help"> {helpText} </span>}
		</>
	);
};

export default memo(Toggle);
