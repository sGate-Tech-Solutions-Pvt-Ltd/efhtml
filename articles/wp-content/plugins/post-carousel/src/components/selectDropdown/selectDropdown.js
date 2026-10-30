import "./editor.scss";
import Popup from "../popup/popup";

const SelectDropdown = ({
	label,
	options,
	attributes,
	setAttributes,
	attributesKey,
	onClick = null,
	className = "",
	onClose,
}) => {
	return (
		<>
			<Popup label={label}>
				{/* <ul
					className={ `sp-smart-post-select-dropdown ${ className }` }
				>
					{ options?.map( ( option, index ) => (
						<li
							key={ index }
							className={ `sp-smart-post-select-dropdown-option ${
								attributes === option.value ? 'active' : ''
							}  ` }
							onClick={ () => {
								selectHandler( option.value );
								if ( typeof onClose === 'function' ) {
									onClose();
									console.log( 'hello' )
								}
							} }
						>
							{ option.label && <span>{ option.label }</span> }
							{ option.icon && <span>{ option.icon }</span> }
						</li>
					) ) }
				</ul> */}
				<SelectDropField
					options={options}
					attributes={attributes}
					setAttributes={setAttributes}
					attributesKey={attributesKey}
					className={className}
					onClick={onClick}
					onClose={onClose}
				/>
			</Popup>
		</>
	);
};

export default SelectDropdown;

const SelectDropField = ({
	options,
	attributes,
	setAttributes,
	attributesKey,
	onClick = null,
	className = "",
	onClose,
}) => {
	const selectHandler = (value) => {
		if (onClick) {
			onClick(value);
		} else {
			setAttributes({ [attributesKey]: value });
		}
	};

	return (
		<ul className={`sp-smart-post-select-dropdown ${className}`}>
			{options?.map(({value, label, icon, disabled, type = ""}, index) => (
				<li
					key={index}
					className={`sp-smart-post-select-dropdown-option${attributes === value ? " active" : ""}${disabled ? " disabled" : ""}`}
					disabled={disabled}
					onClick={() => {
						selectHandler(value);
						if (typeof onClose === "function") {
							onClose();
						}
					}}
				>
					{label && <span> {`${label}`}   
						{"pro" === type && <a target="_blank" href="https://wpsmartpost.com/pricing/?ref=1" className="sp-smart-pro-text"> (Pro) </a>}
					</span>}
					{icon && <span>{icon}</span>}
				</li>
			))}
		</ul>
	);
};
