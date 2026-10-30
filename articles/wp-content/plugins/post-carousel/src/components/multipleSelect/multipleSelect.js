import Select from "react-select";
import "./editor.scss";

const MultipleSelect = ({
	attributes,
	setAttributes,
	attributesKey,
	label,
	items,
	objectData = false,
	value = false,
	onChange = false,
	flex = false,
	reset = false,
	onInputChange = false,
	helpText = "",
}) => {
	const defaultValues = items?.filter((f) => attributes.includes(f.value));
	const updateValue = (data) => {
		if (objectData) {
			const updatedValues = data?.map((d) => {
				return { value: d.value, type: d.type };
			});
			setAttributes({ [attributesKey]: updatedValues });
		} else {
			const updatedValues = data?.map((d) => d.value);
			setAttributes({ [attributesKey]: updatedValues });
		}
	};

	return (
		<div className={`sp-smart-post-multi-select ${flex ? "d-flex" : ""} sp-smart-post-component-mb`}>
			<p className="sp-smart-post-component-title">{label}</p>
			<Select
				defaultValue={value ? value : defaultValues}
				// value={ value ?? defaultValues }
				isMulti
				options={items}
				isClearable={reset}
				onChange={(data) => (onChange ? onChange(data) : updateValue(data))}
				onInputChange={(e) => (onInputChange ? onInputChange(e) : "")}
				className="sp-smart-post-basic-multi-select"
			/>
			{helpText && <p className="sp-smart-help-text">{helpText}</p>}
		</div>
	);
};

export default MultipleSelect;
