import { memo } from "@wordpress/element";
import { FocalPointPicker } from "@wordpress/components";
import "./editor.scss";
import { priceLink } from "../../blocks/shared/helpFn";

const SPFocalPointPicker = ({ label = "Focal Point", url = "", attributes, attributesKey, setAttributes, pro = false }) => {
	const focalPointHandler = (newValue) => {
		setAttributes({ [attributesKey]: newValue });
	};
	return (
		<>
			<div className={`sp-smart-post-focal-point sp-smart-post-component-mb${pro ? " sp-is-pro" : ""}`}>
				<div className="sp-smart-post-header-control">
					<div className="sp-smart-post-header-control-left">
						<span className="sp-smart-post-component-title">
							{label}
							{pro && <a target="_blank" href={priceLink} className="sp-smart-pro-text">(Pro)</a>}
						</span>
					</div>
				</div>
				<div className="sp-smart-post-focal-point-control">
					<FocalPointPicker
						__nextHasNoMarginBottom
						url={url}
						value={attributes}
						onChange={focalPointHandler}
					/>
				</div>
			</div>
		</>
	);
};

export default memo(SPFocalPointPicker);
