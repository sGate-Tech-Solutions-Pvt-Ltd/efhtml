import { __ } from "@wordpress/i18n";
import {
	Border,
	BoxShadow,
	Divider,
	InputControl,
	Spacing,
	SpColorPicker,
	SPRangeControl,
	SPToggleGroupControl,
} from "../../components";
import Toggle from "../../components/toggle/toggle";

import { useState } from "@wordpress/element";

const FieldStyle = ({ attributes, setAttributes }) => {
	const { fieldLabelColor, fieldPadding, fieldBorder, fieldBorderWidth, fieldBorderRadius } = attributes;

	return (
		<>
			<SpColorPicker
				label={__("Label Color", "post-carousel")}
				value={fieldLabelColor}
				onChange={(newColor) =>
					setAttributes({
						fieldLabelColor: newColor,
					})
				}
				defaultColor="#333333"
			/>
			<Border
				label="Border"
				attributes={{
					border: fieldBorder,
					borderWidth: fieldBorderWidth,
				}}
				setAttributes={setAttributes}
				attributesKey={{
					border: "fieldBorder",
					borderWidth: "fieldBorderWidth",
				}}
				btnType="normal"
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={fieldBorderRadius}
				attributesKey={"fieldBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "",
						right: "",
						bottom: "",
						left: "",
					},
				}}
				indicator={"radius"}
			/>
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={fieldPadding}
				attributesKey={"fieldPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 10,
						right: 12,
						bottom: 10,
						left: 12,
					},
				}}
			/>
		</>
	);
};
const DropdownStyle = ({ attributes, setAttributes }) => {
	const [colorType, setColorType] = useState("normal");
	const {
		dropdownOptionColor,
		dropdownOptionBg,
		dropdownOptionBorder,
		dropdownOptionBorderWidth,
		dropdownBorderRadius,
		dropdownShadowEnable,
		dropdownShadow,
		dropdownPadding,
		dropdownMargin,
	} = attributes;

	return (
		<>
			<SPToggleGroupControl
				// label={ __( 'Filter Type', 'post-carousel' ) }
				attributes={colorType}
				attributesKey={"colorType"}
				onClick={(newValue) => setColorType(newValue)}
				items={[
					{
						label: __("Normal", "post-carousel"),
						value: "normal",
					},
					{
						label: __("Hover & Active", "post-carousel"),
						value: "hover",
					},
				]}
			/>
			{"normal" === colorType && (
				<>
					<SpColorPicker
						label={__("Option Color", "post-carousel")}
						value={dropdownOptionColor.color}
						onChange={(newColor) =>
							setAttributes({
								dropdownOptionColor: {
									...dropdownOptionColor,
									color: newColor,
								},
							})
						}
						defaultColor="#333333"
					/>
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={dropdownOptionBg.color}
						onChange={(newColor) =>
							setAttributes({
								dropdownOptionBg: {
									...dropdownOptionBg,
									color: newColor,
								},
							})
						}
						defaultColor="#ffffff"
					/>
				</>
			)}
			{"hover" === colorType && (
				<>
					<SpColorPicker
						label={__("Option Color", "post-carousel")}
						value={dropdownOptionColor.hover}
						onChange={(newColor) =>
							setAttributes({
								dropdownOptionColor: {
									...dropdownOptionColor,
									hover: newColor,
								},
							})
						}
						defaultColor="#ffffff"
					/>
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={dropdownOptionBg.hover}
						onChange={(newColor) =>
							setAttributes({
								dropdownOptionBg: {
									...dropdownOptionBg,
									hover: newColor,
								},
							})
						}
						defaultColor="var(--sp-smart-primary-2-600)"
					/>
				</>
			)}

			<Divider position={"sp-w-100pct bottom"} />

			<Border
				label="Border"
				attributes={{
					border: dropdownOptionBorder,
					borderWidth: dropdownOptionBorderWidth,
				}}
				setAttributes={setAttributes}
				attributesKey={{
					border: "dropdownOptionBorder",
					borderWidth: "dropdownOptionBorderWidth",
				}}
				btnType="normal"
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={dropdownBorderRadius}
				attributesKey={"dropdownBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "2",
						right: "2",
						bottom: "2",
						left: "2",
					},
				}}
				indicator={"radius"}
			/>
			<Toggle
				label={__("Box Shadow", "post-carousel")}
				attributes={dropdownShadowEnable}
				attributesKey={"dropdownShadowEnable"}
				setAttributes={setAttributes}
			/>
			{dropdownShadowEnable && (
				<BoxShadow
					label={__("Box Shadow", "post-carousel")}
					attributes={dropdownShadow}
					attributesKey={"dropdownShadow"}
					setAttributes={setAttributes}
				/>
			)}
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={dropdownPadding}
				attributesKey={"dropdownPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "5",
						right: "10",
						bottom: "5",
						left: "10",
					},
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={dropdownMargin}
				attributesKey={"dropdownMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 8,
						right: 0,
						bottom: 0,
						left: 0,
					},
				}}
			/>
		</>
	);
};
const SearchStyle = ({ attributes, setAttributes }) => {
	const { searchPlaceholderText, searchBorder, searchBorderWidth } = attributes;

	return (
		<>
			<InputControl
				label={__("Placeholder Text", "post-carousel")}
				attributes={searchPlaceholderText}
				attributesKey={"searchPlaceholderText"}
				setAttributes={setAttributes}
				placeholder={__("Search…", "post-carousel")}
				flex={false}
				inputType="text"
			/>

			<Border
				label="Border"
				attributes={{
					border: searchBorder,
					borderWidth: searchBorderWidth,
				}}
				setAttributes={setAttributes}
				attributesKey={{
					border: "searchBorder",
					borderWidth: "searchBorderWidth",
				}}
				btnType="normal"
			/>
			{/* <Spacing
                label={__(
                    'Border Radius',
                    'post-carousel'
                )}
                attributes={searchBorderRadius}
                attributesKey={'searchBorderRadius'}
                setAttributes={setAttributes}
                units={['px', '%', 'em']}
                defaultValue={{
                    unit: 'px',
                    value: {
                        top: '',
                        right: '',
                        bottom: '',
                        left: '',
                    },
                }}
            /> */}
		</>
	);
};

const StyleTab = ({ attributes, setAttributes }) => {
	const [fieldType, setFieldType] = useState("field");
	const [colorType, setColorType] = useState("normal");
	const {
		buttonColor,
		buttonBg,
		buttonBorder,
		buttonBorderWidth,
		buttonBorderRadius,
		buttonBorderHover,
		buttonBorderWidthHover,
		buttonBorderRadiusHover,
		buttonPadding,
		filterType,
		buttonGap,
		showSearchFieldInDropdown,
	} = attributes;

	const fieldItemsList = [
		{ label: __("Field", "post-carousel"), value: "field" },
		{ label: __("Dropdown", "post-carousel"), value: "dropdown" },
	];

	if (showSearchFieldInDropdown) {
		fieldItemsList.push({
			label: __("Search", "post-carousel"),
			value: "search",
		});
	}

	return (
		<>
			{"dropdown" === filterType && (
				<>
					<SPToggleGroupControl
						// label={ __( 'Filter Type', 'post-carousel' ) }
						attributes={fieldType}
						onClick={(newValue) => setFieldType(newValue)}
						setAttributes={setAttributes}
						items={fieldItemsList}
					/>

					{"field" === fieldType && <FieldStyle attributes={attributes} setAttributes={setAttributes} />}

					{"dropdown" === fieldType && (
						<DropdownStyle attributes={attributes} setAttributes={setAttributes} />
					)}

					{"search" === fieldType && <SearchStyle attributes={attributes} setAttributes={setAttributes} />}
				</>
			)}
			{"button" === filterType && (
				<>
					<SPToggleGroupControl
						// label={ __( 'Filter Type', 'post-carousel' ) }
						attributes={colorType}
						attributesKey={"colorType"}
						onClick={(newValue) => setColorType(newValue)}
						items={[
							{
								label: __("Normal", "post-carousel"),
								value: "normal",
							},
							{
								label: __("Hover & Active", "post-carousel"),
								value: "hover",
							},
						]}
					/>

					{"normal" === colorType && (
						<>
							<SpColorPicker
								label={__("Option Color", "post-carousel")}
								value={buttonColor.color}
								onChange={(newColor) =>
									setAttributes({
										buttonColor: {
											...buttonColor,
											color: newColor,
										},
									})
								}
								defaultColor="#333333"
							/>
							<SpColorPicker
								label={__("Background Color", "post-carousel")}
								value={buttonBg.color}
								onChange={(newColor) =>
									setAttributes({
										buttonBg: {
											...buttonBg,
											color: newColor,
										},
									})
								}
								defaultColor="var(--sp-smart-primary-2-600)"
							/>
							<Border
								label="Border"
								attributes={{
									border: buttonBorder,
									borderWidth: buttonBorderWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "buttonBorder",
									borderWidth: "buttonBorderWidth",
								}}
								btnType="normal"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={buttonBorderRadius}
								attributesKey={"buttonBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "2",
										right: "2",
										bottom: "2",
										left: "2",
									},
								}}
							/>
						</>
					)}

					{"hover" === colorType && (
						<>
							<SpColorPicker
								label={__("Option Color", "post-carousel")}
								value={buttonColor.hover}
								onChange={(newColor) =>
									setAttributes({
										buttonColor: {
											...buttonColor,
											hover: newColor,
										},
									})
								}
								defaultColor="#ffffff"
							/>
							<SpColorPicker
								label={__("Background Color", "post-carousel")}
								value={buttonBg.hover}
								onChange={(newColor) =>
									setAttributes({
										buttonBg: {
											...buttonBg,
											hover: newColor,
										},
									})
								}
								defaultColor="var(--sp-smart-primary-2-600)"
							/>
							<Border
								label="Border"
								attributes={{
									border: buttonBorderHover,
									borderWidth: buttonBorderWidthHover,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "buttonBorderHover",
									borderWidth: "buttonBorderWidthHover",
								}}
								btnType="normal"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={buttonBorderRadiusHover}
								attributesKey={"buttonBorderRadiusHover"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "2",
										right: "2",
										bottom: "2",
										left: "2",
									},
								}}
							/>
						</>
					)}
					<Divider position={"sp-w-100pct bottom"} />
					<SPRangeControl
						label={__("Gap", "post-carousel")}
						attributes={buttonGap}
						attributesKey={"buttonGap"}
						setAttributes={setAttributes}
						resetIcon={true}
						max={200}
						defaultValue={{ unit: "px", value: 10 }}
					/>
					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={buttonPadding}
						attributesKey={"buttonPadding"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "2",
								right: "2",
								bottom: "2",
								left: "2",
							},
						}}
					/>
				</>
			)}
		</>
	);
};

export default StyleTab;
