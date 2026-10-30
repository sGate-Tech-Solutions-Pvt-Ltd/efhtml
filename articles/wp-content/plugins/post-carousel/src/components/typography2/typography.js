import Select from "react-select";
import { __ } from "@wordpress/i18n";
import { Button, Popover } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import SPRangeControl from "../rangeControl/rangeControl.js";
import ComponentsTopSection from "../componentsTopControl/ComponentsTopSection.js";
import { EditIcon } from "./svgIcon.js";
import "./editor.scss";
import SelectField from "../selectField/selectField.js";
import { fontWeightMap, getFontWeightList, textStylesOptions } from "./utility.js";
import InputControl from "../inputControl/inputControl.js";
import { useDeviceType } from "../../controls/controls.js";

const fetchFonts = async () => {
	try {
		const response = await fetch(
			"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCJIzfKoHlACqsmK1zDzl-OAsgtJPk8BtI"
		);
		if (response.status === 200) {
			return response.json();
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching Google Fonts:", error);
	}
};

const TypographyNew = ({
	setAttributes,
	attributes,
	fontSizeDefault = { unit: "px", value: 16 },
	spacingDefaultValue = { unit: "px", value: 0 },
	lineDefaultValue = { unit: "px", value: 0 },
	typographyLabel = "Typography",
}) => {
	const [allFonts, setAllFonts] = useState([]);
	const [fontLists, setFontLists] = useState([]);
	const [lineHeightUpdateKey, setLineHeightUpdateKey] = useState(0);
	const {
		family,
		familyKey,
		fontSize,
		fontSizeKey,
		lineHeight,
		lineHeightKey,
		fontSpacing,
		fontSpacingKey,
		wordSpacing,
		wordSpacingKey,
	} = attributes;
	const deviceType = useDeviceType();

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisible = () => {
		setIsVisible((state) => !state);
	};

	useEffect(() => {
		if (allFonts.length === 0) {
			fetchFonts().then((data) => {
				const fonts = data.items.map((item) => {
					return {
						label: item.family,
						value: item.family,
						font: { family: item.family, variants: item.variants },
					};
				});
				setAllFonts(fonts);
				setFontLists(fonts.filter((font, i) => i < 50 && font));
			});
		}
	}, []);

	const fontSearch = (inputValue) => {
		const googleFonts = allFonts
			.filter((font) => {
				return font.label.toLowerCase().includes(inputValue.toLowerCase());
			})
			.filter((font, i) => i < 30 && font);
		setFontLists(googleFonts);
	};

	const fontWCheck = Array(
		"100italic",
		"300italic",
		"italic",
		"400italic",
		"500italic",
		"600italic",
		"700italic",
		"800italic",
		"900italic"
	);
	const fontW = family.googleFont?.variants?.map((value) => {
		if (fontWCheck.includes(value) || "100" === value) {
			return "";
		}

		if ("regular" === value) {
			value = "400";
		}
		return { label: value, value: value };
	});

	let fontWeightList = [];
	if (fontW) {
		fontWeightList = fontW.filter(function (item, pos) {
			return "" !== item;
		});
	}

	useEffect(() => {
		const clickOutSite = (e) => {
			const target = e.target.closest(".sp-smart-post-typography-fonts");
			const buttonTarget = e.target.closest(".sp-smart-post-typography-btn button");
			const familyTarget = e.target.closest(".css-1nmdiq5-menu");
			if (!target && isVisible && !buttonTarget && !familyTarget) {
				setIsVisible(false);
			}
		};
		window.addEventListener("click", clickOutSite);

		return () => window.removeEventListener("click", clickOutSite);
	});

	// default and active family options.
	const defaultFamilyOption = {
		label: "Default",
		value: "Default",
		font: {
			family: "Default",
			variants: ["300", "400", "500", "600", "700", "800"],
		},
	};
	const activeFontFamily =
		family.typography.family === ""
			? defaultFamilyOption
			: {
					label: family.googleFont?.family,
					value: family.googleFont?.family,
					font: family.googleFont,
				};

	const allFamilyList = [defaultFamilyOption, ...fontLists];

	const isAvailableOnList = allFamilyList?.find((font) => font.value === activeFontFamily.value);

	const fontFamilySelectOptions = isAvailableOnList
		? allFamilyList
		: [defaultFamilyOption, activeFontFamily, ...fontLists];

	// font family.
	const { fontWeight, style } = family.typography;

	const onChangeFontStyle = (fontStyle) => {
		const arrayOfStyles = fontWeightMap[fontStyle]?.split(" ");
		const style = fontWeightMap[fontStyle].includes("italic") ? "italic" : "";
		const fontWeight = arrayOfStyles[arrayOfStyles?.length - 1];

		setAttributes({
			[familyKey]: {
				...family,
				typography: {
					...family.typography,
					fontWeight: fontWeight,
					style: style,
				},
			},
		});
	};

	const onChangeLineHeight = (value) => {
		setAttributes({
			[lineHeightKey]: {
				...lineHeight,
				device: {
					...lineHeight?.device,
					[deviceType]: value,
				},
				unit: {
					...lineHeight.unit,
					[deviceType]: "px",
				},
			},
		});
	};
	const onChangeFontSize = (newValue) => {
		setAttributes({
			[fontSizeKey]: {
				...fontSize,
				device: {
					...fontSize?.device,
					[deviceType]: newValue.value,
				},
			},
		});
		if (fontSize?.unit?.[deviceType] === "px") {
			const dynamicLineHeight = parseInt(newValue.value * 1.2);
			onChangeLineHeight(dynamicLineHeight);
			setLineHeightUpdateKey(dynamicLineHeight);
		}
	};
	const onChangeTextStyles = (key, value) => {
		const newValue = family?.typography[key] === value ? "" : value;
		setAttributes({
			[familyKey]: {
				...family,
				typography: {
					...family.typography,
					[key]: newValue,
				},
			},
		});
	};

	return (
		<>
			<div className="sp-smart-post-typography sp-smart-post-component-mb sp-smart-post-tab-panel">
				<div className={`sp-smart-post-typography-btn ${isVisible && "active"}`}>
					<p className="sp-smart-post-component-title">{typographyLabel}</p>
					<Button
						aria-label={isVisible ? "open typography popup" : "close typography popup"}
						onClick={() => toggleVisible()}
					>
						{<EditIcon />}
					</Button>
				</div>

				{isVisible && (
					<Popover shift={true} focusOnMount={false}>
						<div className={`sp-smart-post-typography-fonts`}>
							<div className="sp-smart-post-typography-header">
								<h4>Typography</h4>
							</div>
							<div className="sp-smart-post-typography-fields">
								<div className={`sp-smart-post-typography-family sp-smart-post-component-mb`}>
									<div className="sp-smart-post-select-field">
										<div className="sp-smart-post-header">
											<span className="sp-smart-post-component-title"> Font Family</span>
										</div>

										<Select
											options={fontFamilySelectOptions}
											value={activeFontFamily}
											placeholder={activeFontFamily.label}
											onChange={(nextFont) =>
												setAttributes({
													[familyKey]: {
														...family,
														googleFont: nextFont?.font,
														typography: {
															...family.typography,
															family:
																"Default" !== nextFont?.font?.family
																	? nextFont?.font?.family
																	: "",
															fontWeight:
																"regular" === nextFont?.font?.variants[0]
																	? "400"
																	: nextFont?.font?.variants[0],
														},
													},
												})
											}
											onInputChange={(inputValue) => fontSearch(inputValue)}
										/>
									</div>
								</div>
								{/* <SelectField
									label={ __(
										'Font Style',
										'post-carousel'
									) }
									value={ family.typography.style }
									items={ [
										// {label: 'Default', value: 'default'},
										{ label: 'Normal', value: 'normal' },
										{ label: 'Italic', value: 'italic' },
										{ label: 'Oblique', value: 'oblique' },
									] }
									// flexStyle={true}
									onChange={ ( newStyle ) =>
										setAttributes( {
											[ familyKey ]: {
												...family,
												typography: {
													...family.typography,
													style: newStyle,
												},
											},
										} )
									}
									__nextHasNoMarginBottom
								/>
								<SelectField
									label={ __(
										'Font Weight',
										'post-carousel'
									) }
									value={ family.typography.fontWeight }
									items={ fontWeightList }
									// flexStyle={true}
									onChange={ ( newWeight ) =>
										setAttributes( {
											[ familyKey ]: {
												...family,
												typography: {
													...family.typography,
													fontWeight: newWeight,
												},
											},
										} )
									}
									__nextHasNoMarginBottom
								/> */}
								<SelectField
									label={__("Font Style", "post-carousel")}
									attributes={
										activeFontFamily?.font?.variants.includes(`${fontWeight}${style}`)
											? `${fontWeight}${style}`
											: fontWeight
									}
									items={getFontWeightList(activeFontFamily)}
									onChange={(newStyle) => onChangeFontStyle(newStyle)}
									__nextHasNoMarginBottom
								/>
							</div>

							<SPRangeControl
								label={__("Font Size", "post-carousel")}
								customValue={fontSize?.device?.[deviceType]}
								attributes={fontSize}
								attributesKey={fontSizeKey}
								setAttributes={setAttributes}
								onValueChange={(newValue) => onChangeFontSize(newValue)}
								units={["Px", "%", "Em"]}
								defaultValue={fontSizeDefault}
							/>
							<SPRangeControl
								key={lineHeightUpdateKey}
								label={__("Line Height", "post-carousel")}
								setAttributes={setAttributes}
								attributes={lineHeight}
								units={["px", "%", "Em"]}
								attributesKey={lineHeightKey}
								defaultValue={lineDefaultValue}
								typoLineHeight={true}
							/>
							{/* <SPRangeControl
								label={ __(
									'Letter Spacing',
									'post-carousel'
								) }
								setAttributes={ setAttributes }
								attributes={ fontSpacing }
								units={ [ 'px', 'Em' ] }
								step={ '0.1' }
								attributesKey={ fontSpacingKey }
								defaultValue={ spacingDefaultValue }
							/> */}
							{/* <SPToggleGroupControl
								label={ __(
									'Text Decoration',
									'post-carousel'
								) }
								attributes={ family.typography.decoration }
								items={ [
									{
										label: 'Normal',
										value: 'none',
										tooltip: 'none',
									},
									{
										label: <DecorationUnderline />,
										value: 'underline',
										tooltip: 'Underline',
									},
									{
										label: <DecorationLineThrough />,
										value: 'line-through',
										tooltip: 'Line Through',
									},
									{
										label: <DecorationOverLine />,
										value: 'overline',
										tooltip: 'Overline',
									},
								] }
								onClick={ ( newValue ) =>
									setAttributes( {
										[ familyKey ]: {
											...family,
											typography: {
												...family.typography,
												decoration: newValue,
											},
										},
									} )
								}
							/>
							<SPToggleGroupControl
								label={ __(
									'Letter Case',
									'post-carousel'
								) }
								attributes={ family.typography.transform }
								items={ [
									{
										label: 'None',
										value: 'none',
										tooltip: 'None',
									},
									{
										label: 'AB',
										value: 'uppercase',
										tooltip: 'Uppercase',
									},
									{
										label: 'ab',
										value: 'lowercase',
										tooltip: 'Lowercase',
									},
									{
										label: 'Ab',
										value: 'capitalize',
										tooltip: 'Capitalize',
									},
								] }
								onClick={ ( newValue ) =>
									setAttributes( {
										[ familyKey ]: {
											...family,
											typography: {
												...family.typography,
												transform: newValue,
											},
										},
									} )
								}
							/> */}
							<div className="sp-smart-post-typography-word-spacing-latter-spacing-wrapper sp-d-flex sp-gap-8px">
								<div className="sp-smart-post-typography-line-height-picker">
									<ComponentsTopSection
										label={__("Letter Spacing", "post-carousel")}
										attributes={fontSpacing}
										attributesKey={fontSpacingKey}
										setAttributes={setAttributes}
										units={["px", "em"]}
									/>
									<InputControl
										attributes={fontSpacing?.device?.[deviceType]}
										type="number"
										onChange={(newValue) => {
											setAttributes({
												[fontSpacingKey]: {
													...fontSpacing,
													device: {
														...fontSpacing?.device,
														[deviceType]: newValue,
													},
												},
											});
										}}
										min={0}
									/>
								</div>
								{wordSpacing && (
									<div className="sp-smart-post-typography-letter-spacing-picker">
										<ComponentsTopSection
											label={__("Word Spacing", "post-carousel")}
											attributes={wordSpacing}
											attributesKey={wordSpacingKey}
											setAttributes={setAttributes}
											units={["px", "em"]}
										/>
										<InputControl
											attributes={wordSpacing?.device?.[deviceType]}
											type="number"
											onChange={(newValue) => {
												setAttributes({
													[wordSpacingKey]: {
														...wordSpacing,
														device: {
															...wordSpacing?.device,
															[deviceType]: newValue,
														},
													},
												});
											}}
											min={0}
										/>
									</div>
								)}
							</div>
							<div className="sp-smart-post-typography-multiple-button-group sp-smart-post-component-mb">
								<ComponentsTopSection label={__("Text Format", "post-carousel")} />
								<div className="sp-smart-post-button-group-list">
									{textStylesOptions?.map(({ label, key, value }, i) => (
										<button
											key={i}
											className={`components-button${
												family?.typography[key] === value ? " active" : ""
											}`}
											onClick={() => onChangeTextStyles(key, value)}
										>
											<span title={value}>{label}</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</Popover>
				)}
			</div>
		</>
	);
};

export default TypographyNew;
