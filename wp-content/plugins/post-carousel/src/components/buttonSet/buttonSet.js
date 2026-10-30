import "./editor.scss";

const ButtonSet = ({ label = "", attributes, attributesKey, setAttributes, columns = 4, items, onChange = false }) => {
	const handleClick = (value) => {
		if (value === attributes) {
			return;
		}
		if (onChange) {
			onChange(value);
		} else {
			setAttributes({ [attributesKey]: value });
		}
	};
	return (
		<div className="sp-smart-post-button-set sp-smart-post-component-mb">
			{label && (
				<div className="sp-smart-post-component-top sp-smart-post-component-title">
					<span>{label}</span>
				</div>
			)}
			<div className={`sp-smart-post-button-set-list sp-col-${columns}`}>
				{items?.map((item, index) => (
					<span
						key={index}
						className={`sp-smart-post-button-set-item${attributes === item.value ? " active" : ""}`}
						value={item.value}
						onClick={() => handleClick(item.value)}
					>
						<span className="sp-item-set-btn">{item.label}</span>
						{item.tooltip && <p>{item.tooltip}</p>}
					</span>
				))}
			</div>
		</div>
	);
};
export default ButtonSet;
