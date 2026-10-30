import { __ } from "@wordpress/i18n";
import ChildPanelBody from "../childPanelBody/childPanelBody";
import InputControl from "../inputControl/inputControl";
import SelectField from "../selectField/selectField";
import { getObjectValuesToJsArray } from "../../blocks/shared/helpFn";

const CustomFields = ({ props }) => {
	const { data, resetButton, updateCustomFieldsData, metaKeysSelectOptions } = props;
	const { id, key, value, operator, type } = data;

	const textOperators = [
		{ label: "Equal (=)", value: "=" },
		{ label: "Not Equal (!=)", value: "!=" },
		{ label: "Like", value: "LIKE" },
		{ label: "Not Like", value: "NOT LIKE" },
		{ label: "In", value: "IN" },
		{ label: "Not In", value: "NOT IN" },
		{ label: "Exists", value: "EXISTS" },
		{ label: "Not Exists", value: "NOT EXISTS" },
	];
	const numberOperators = [
		{ label: "Equal (=)", value: "=" },
		{ label: "Not Equal (!=)", value: "!=" },
		{ label: "Greater (>)", value: ">" },
		{ label: "Greater or Equal (>=)", value: ">=" },
		{ label: "Less (<)", value: "<" },
		{ label: "Less or Equal (<=)", value: "<=" },
		{ label: "In", value: "IN" },
		{ label: "Not In", value: "NOT IN" },
		{ label: "Between", value: "BETWEEN" },
		{ label: "Not Between", value: "NOT BETWEEN" },
		{ label: "Exists", value: "EXISTS" },
		{ label: "Not Exists", value: "NOT EXISTS" },
	];
	const dateOperators = [
		{ label: "Today", value: "TODAY" },
		{ label: "Now and Past", value: "NOW_PAST" },
		{ label: "Now and Future", value: "NOW_FUTURE" },
		{ label: "In the past", value: "IN_PAST" },
		{ label: "Equal(=)", value: "=" },
		{ label: "Not Equal(!=)", value: "!=" },
		{ label: "Greater(>)", value: ">" },
		{ label: "Greater or Equal (>=)", value: ">=" },
		{ label: "Less (<)", value: "<" },
		{ label: "Less or Equal (<=)", value: "<=" },
		{ label: "Between", value: "BETWEEN" },
		{ label: "Not Between", value: "NOT BETWEEN" },
		{ label: "Exists", value: "EXISTS" },
		{ label: "Not Exists", value: "NOT EXISTS" },
	];
	const booleanOperators = [
		{ label: "Equal(=)", value: "=" },
		{ label: "Not Equal(!=)", value: "!=" },
		{ label: "Exists", value: "EXISTS" },
		{ label: "Not Exists", value: "NOT EXISTS" },
	];

	const inputTypesData = {
		CHAR: {
			value: textOperators,
			input: "text",
		},
		NUMERIC: {
			value: numberOperators,
			input: "number",
		},
		DATE: {
			value: dateOperators,
			input: "date",
		},
		BOOLEAN: {
			value: booleanOperators,
			input: "dropdown",
		},
	};
	const operatorValues = inputTypesData[type]?.value;
	const inputType = inputTypesData[type]?.input;
	const metaTitle = key && key.trim() ? key : __("Select Field Key", "post-carousel");

	return (
		<div className="sp-smart-post-taxonomies">
			<ChildPanelBody
				title={metaTitle}
				initialOpen={true}
				resetIcon={true}
				resetButtonAction={() => resetButton(id)}
			>
				<SelectField
					label={__("Custom Fields Key", "post-carousel")}
					attributes={key}
					multiple={false}
					onChange={(e) => updateCustomFieldsData(id, "key", e)}
					items={[{ label: "Select key", value: "" }, ...metaKeysSelectOptions]}
				/>
				<SelectField
					label={__("Value Type", "post-carousel")}
					attributes={type}
					onChange={(e) => updateCustomFieldsData(id, "type", e)}
					items={[
						{ label: "Text", value: "CHAR" },
						{ label: "Number", value: "NUMERIC" },
						{ label: "Date", value: "DATE" },
						{ label: "True/False", value: "BOOLEAN" },
					]}
				/>
				<SelectField
					label={__("Compare Operator", "post-carousel")}
					attributes={operator}
					onChange={(e) => updateCustomFieldsData(id, "operator", e)}
					flexStyle={false}
					items={operatorValues}
				/>
				{inputType !== "dropdown" && (
					<InputControl
						label={__("Compare Value", "post-carousel")}
						attributes={value}
						inputType={inputType}
						flex={false}
						onChange={(e) => updateCustomFieldsData(id, "value", e)}
					/>
				)}
				{inputType === "dropdown" && (
					<SelectField
						label={__("Compare Value", "post-carousel")}
						attributes={value}
						items={[
							{ label: "True", value: "true" },
							{ label: "False", value: "false" },
						]}
						flex={true}
						onChange={(e) => updateCustomFieldsData(id, "value", e)}
					/>
				)}
			</ChildPanelBody>
		</div>
	);
};

let clearSetTimeout;

const FilterByCustomFields = ({ attributes, setAttributes, metaKeys }) => {
	const { filterByCustomFields, customFieldRelation } = attributes;
	const metaKeysArray = getObjectValuesToJsArray(metaKeys);
	const metaKeysSelectOptions = metaKeysArray?.map((meta) => {
		return { label: meta, value: meta };
	});

	const addNewCustomFieldsFn = () => {
		const id = filterByCustomFields?.length + 1;
		const newFilter = {
			id: id,
			type: "CHAR",
			key: "",
			value: "",
			operator: "=",
			ajaxLiveFilter: "",
		};
		setAttributes({
			filterByCustomFields: [...filterByCustomFields, newFilter],
		});
	};
	const resetButton = (id) => {
		if (filterByCustomFields?.length >= 2) {
			const updatedArray = filterByCustomFields?.filter((f) => f.id !== id);
			setAttributes({ filterByCustomFields: updatedArray });
		} else {
			setAttributes({
				filterByCustomFields: [],
			});
		}
	};
	const updateCustomFieldsData = (id, selector, newData) => {
		const updated = filterByCustomFields?.map((t) => {
			if (t.id === id) {
				return { ...t, [selector]: newData };
			}
			return t;
		});

		clearTimeout(clearSetTimeout);

		clearSetTimeout = setTimeout(() => {
			setAttributes({ filterByCustomFields: updated });
		}, 1000);
	};

	return (
		<div className="sp-smart-post-taxonomy-panel-container">
			<h4 className="sp-smart-post-sub-panel-title">Filter By Custom Fields</h4>
			{filterByCustomFields.length > 0 &&
				filterByCustomFields?.map((data, i) => (
					<CustomFields
						key={i}
						props={{
							data: data,
							resetButton: resetButton,
							updateCustomFieldsData: updateCustomFieldsData,
							metaKeysSelectOptions: metaKeysSelectOptions,
						}}
					/>
				))}
			<button
				className="sp-smart-post-taxonomy-add-button sp-smart-post-component-mb"
				onClick={addNewCustomFieldsFn}
			>
				Add New
			</button>
			{filterByCustomFields.length > 1 && (
				<SelectField
					label={__("Relation", "post-carousel")}
					items={[
						{ label: "AND", value: "AND" },
						{ label: "OR", value: "OR" },
					]}
					flexStyle={true}
					attributes={customFieldRelation}
					attributesKey={"customFieldRelation"}
					setAttributes={setAttributes}
				/>
			)}
		</div>
	);
};

export default FilterByCustomFields;
