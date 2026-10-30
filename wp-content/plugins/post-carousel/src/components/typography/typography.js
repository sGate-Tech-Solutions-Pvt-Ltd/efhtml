import Select, { components } from "react-select";
import { __ } from "@wordpress/i18n";
import { Button, Popover, RangeControl, Flex, Tooltip } from "@wordpress/components";
import { useEffect, useRef, useState } from "@wordpress/element";
import SPRangeControl from "../rangeControl/rangeControl.js";
import ComponentsTopSection from "../componentsTopControl/ComponentsTopSection.js";
import { EditIcon } from "./svgIcon.js";
import "./editor.scss";
import SelectField from "../selectField/selectField.js";
import {
	fontWeightMap,
	getFontSizePresets,
	getFontWeightList,
	getGlobalTypoPresets,
	textCaseOptions,
	textDecorationOptions,
} from "./utility.js";
import InputControl from "../inputControl/inputControl.js";
import { useDeviceType } from "../../controls/controls.js";
import Divider from "../divider/divider.js";
import classNames from "classnames";
import { BorderIcon, GlobalIcon } from "../../icons/icons.js";
import { dispatch, useSelect, select } from "@wordpress/data";
import useGoogleFonts from "../../hooks/useGoogleFontApi.js";

const TypographyNew = ({
	setAttributes,
	attributes,
	fontSizeDefault = { unit: "px", value: 16 },
	lineDefaultValue = "",
	typographyLabel = "Typography",
	fontSizePresetType = "body",
	onStateUpdate = false,
}) => {
	const fontFamilies = useSelect((_select) => {
		const settings = _select("core/editor")?.getEditorSettings();
		return settings?.__experimentalFeatures?.typography?.fontFamilies || [];
	}, []);

	const [systemFonts, setSystemFonts] = useState([]);
	const [allFonts, setAllFonts] = useState([]);
	const [fontLists, setFontLists] = useState([]);
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
		globalTypo,
		globalTypoKey,
	} = attributes;
	const deviceType = useDeviceType();
	const fontSizePresets = getFontSizePresets(fontSizePresetType);
	const globalTypoOptions = !onStateUpdate ? getGlobalTypoPresets() : {};

	const [isVisible, setIsVisible] = useState(false);
	const [isCustomFontSize, setIsCustomFontSize] = useState(
		(!fontSizePresets?.find((preset) => preset?.value === fontSize?.device?.[deviceType]) &&
			fontSize?.device?.[deviceType] !== "") ||
			false
	);
	const typoBtnRef = useRef(null);
	const openPluginSidebar = () => {
		const sidebarName = "smart-post-show-pro-global-settings/sidebar";
		if (select("core/edit-site")) {
			dispatch("core/edit-site").openGeneralSidebar(sidebarName);
		} else if (select("core/edit-post")) {
			dispatch("core/edit-post").openGeneralSidebar(sidebarName);
		} else if (select("core/customize-widgets")) {
			dispatch("core/customize-widgets").openGeneralSidebar(sidebarName);
		} else {
			console.log("Could not determine current editor type");
		}
	};
	const toggleVisible = () => {
		setIsVisible((state) => !state);
	};

	const { googleFonts } = useGoogleFonts();

	const rendKey = () => {
		return Math.random().toString(36).substring(2, 9);
	};

	useEffect(() => {
		if (allFonts.length === 0 && googleFonts.length > 0) {
			let wpFonts = [];
			if (fontFamilies) {
				const customFonts = fontFamilies.custom || [];
				const themeFonts = fontFamilies.theme || [];
				const _systemFonts = [...customFonts, ...themeFonts];
				wpFonts = _systemFonts?.map((f) => {
					const variants = f?.fontFace?.map((v) => v.fontWeight);
					let variantsArray = [];
					if (variants?.length > 0) {
						variantsArray = variants?.length === 1 ? variants[0]?.split(" ") : variants;
					} else {
						variantsArray = ["300", "400", "500", "600", "700", "800"];
					}
					return {
						label: f.name,
						value: f.fontFamily,
						font: {
							family: f.fontFamily,
							variants: variantsArray,
						},
					};
				});
			}

			const grouped = [
				...(wpFonts.length > 0 ? [{ label: "System Fonts", options: wpFonts }] : []),
				{
					label: "Google Fonts",
					options: googleFonts.filter((font, i) => i < 50 && font),
				},
			];
			setSystemFonts(wpFonts);
			setAllFonts([...wpFonts, ...googleFonts]);
			setFontLists(grouped);
		}
	}, [googleFonts, fontFamilies, allFonts]);
	const fontSearch = (inputValue) => {
		if (!inputValue) {
			setFontLists([
				...(systemFonts.length > 0
					? [
							{
								label: "System Fonts",
								options: systemFonts,
							},
						]
					: []),
				{
					label: "Google Fonts",
					options: googleFonts.filter((font, i) => i < 50 && font),
				},
			]);
			return;
		}

		const searchedFonts = allFonts
			.filter((font) => font.label.toLowerCase().includes(inputValue.toLowerCase()))
			.slice(0, 30);
		setFontLists([
			{
				label: "Search Result",
				options: searchedFonts,
			},
		]);
	};
	const typoBtnActiveClass = `.sp-${rendKey()}`;

	useEffect(() => {
		const clickOutSite = (e) => {
			const target = e.target.closest(".sp-smart-post-typography-fonts");
			const buttonTarget = e.target.closest(`.sp-smart-post-typography-trigger button${typoBtnActiveClass}`);
			const familyTarget = e.target.closest(".css-1nmdiq5-menu");
			if (!target && isVisible && !buttonTarget && !familyTarget && !typoBtnRef.current?.contains(e.target)) {
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
					label:
						allFonts?.find((font) => font.value === family.typography.family)?.label ||
						family.typography.family,
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
		const _style = fontWeightMap[fontStyle].includes("italic") ? "italic" : "";
		const _fontWeight = arrayOfStyles[arrayOfStyles?.length - 1];

		if (onStateUpdate) {
			onStateUpdate(familyKey, {
				...family,
				typography: {
					...family.typography,
					fontWeight: _fontWeight,
					style: _style,
				},
			});
			return;
		}

		setAttributes({
			[familyKey]: {
				...family,
				typography: {
					...family.typography,
					fontWeight: _fontWeight,
					style: _style,
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
				unit: {
					...fontSize.unit,
					[deviceType]: fontSize?.unit?.[deviceType] ? fontSize?.unit?.[deviceType] : fontSizeDefault.unit,
				},
			},
		});
	};
	const onChangeTextStyles = (key, value) => {
		const newValue = family?.typography[key] === value ? "" : value;
		if (onStateUpdate) {
			onStateUpdate(familyKey, {
				...family,
				typography: {
					...family.typography,
					[key]: newValue,
				},
			});
			return;
		}
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
	const onChangeLineHeight = (newValue) => {
		if (onStateUpdate) {
			onStateUpdate(lineHeightKey, { ...lineHeight, value: newValue?.value });
		} else {
			setAttributes({
				[lineHeightKey]: {
					...lineHeight,
					device: { ...lineHeight.device, [newValue.deviceType]: newValue?.value },
				},
			});
		}
	};

	const onGlobalTypoChange = (value) => {
		// reset typography
		setAttributes({
			[globalTypoKey]: value,
			[fontSizeKey]: {
				...fontSize,
				device: {
					Desktop: value.fontSize,
					Tablet: value.fontSize,
					Mobile: value.fontSize,
				},
				unit: {
					Desktop: "",
					Tablet: "",
					Mobile: "",
				},
			},
			[lineHeightKey]: {
				...lineHeight,
				device: {
					Desktop: value.lineHeight,
					Tablet: value.lineHeight,
					Mobile: value.lineHeight,
				},
				unit: {
					Desktop: "",
					Tablet: "",
					Mobile: "",
				},
			},
			[familyKey]: {
				...family,
				typography: {
					...family.typography,
					family: "",
					fontWeight: "",
					style: "",
					transform: "",
					decoration: "",
				},
			},
			[fontSpacingKey]: {
				...fontSpacing,
				device: {
					Desktop: 0,
					Tablet: 0,
					Mobile: 0,
				},
			},
			[wordSpacingKey]: {
				...wordSpacing,
				device: {
					Desktop: 0,
					Tablet: 0,
					Mobile: 0,
				},
			},
		});
	};

	const activeGlobalTypo = globalTypo?.length === 0 ? { label: "Default", value: "" } : globalTypo;

	return (
		<div className="sp-smart-post-typography sp-smart-post-component-mb">
			<Flex justify="space-between" align="center" className="sp-smart-post-typography-trigger">
				<p> {typographyLabel}</p>
				<Button
					ref={typoBtnRef}
					aria-label={isVisible ? "open typography popup" : "close typography popup"}
					onClick={() => toggleVisible()}
					size="compact"
					className={classNames(isVisible ? `sp-${rendKey()} active` : `sp-${rendKey()}`)}
					icon={<EditIcon />}
				/>
			</Flex>

			{isVisible && (
				<Popover shift={true} focusOnMount={false}>
					<div className={`sp-smart-post-typography-fonts`}>
						<div className="sp-smart-post-typography-header">
							<h4>{__("Typography", "post-carousel")}</h4>
							{!onStateUpdate && (
								<Button onClick={openPluginSidebar} size="compact" icon={<GlobalIcon />} />
							)}
						</div>

						{!onStateUpdate && (
							<>
								<div className="sp-smart-post-select-field sp-smart-post-component-mb">
									<span className="sp-smart-post-component-title">
										{__("Select Global Style", "post-carousel")}
									</span>

									<Select
										className="sp-smart-post-select-react sp-smart-post-wrapper"
										options={[{ label: "Default", value: "" }, ...globalTypoOptions]}
										value={activeGlobalTypo}
										placeholder={"Select Global"}
										onChange={(value) => onGlobalTypoChange(value)}
										formatOptionLabel={(option) => (
											<span
												className={option.class}
												style={{
													fontSize: option.fontSize,
													lineHeight: option.lineHeight,
												}}
											>
												{option.label}
											</span>
										)}
										components={{
											SingleValue: ({ children, data, ...props }) => {
												return (
													<components.SingleValue {...props}>
														{data.label}
													</components.SingleValue>
												);
											},
										}}
									/>
								</div>
								<Divider position={"sp-w-100pct bottom"} text="Customize" />
							</>
						)}

						<div className="sp-smart-post-typography-fields">
							<div className={`sp-smart-post-typography-family sp-smart-post-component-mb`}>
								<div className="sp-smart-post-select-field">
									<div className="sp-smart-post-header">
										<span className="sp-smart-post-component-title">
											{__("Font Family", "post-carousel")}
										</span>
									</div>

									<Select
										options={fontFamilySelectOptions}
										value={activeFontFamily}
										placeholder={activeFontFamily.label}
										onChange={(nextFont) =>
											onStateUpdate
												? onStateUpdate(familyKey, {
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
													})
												: setAttributes({
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

						<div className="sp-smart-post-typography-multiple-button-group sp-smart-post-component-mb">
							<ComponentsTopSection
								label={__("Font Size", "post-carousel")}
								units={["px", "em"]}
								attributes={fontSize}
								setAttributes={setAttributes}
								attributesKey={fontSizeKey}
								onReset={() =>
									!onStateUpdate &&
									setAttributes({
										[fontSizeKey]: {
											...fontSize,
											device: {
												...fontSize?.device,
												[deviceType]: fontSizeDefault.value,
											},
											unit: {
												...fontSize.unit,
												[deviceType]: fontSizeDefault.unit,
											},
										},
									})
								}
								onUnitChange={(newValue) =>
									onStateUpdate
										? onStateUpdate(fontSizeKey, { ...fontSize, unit: newValue?.unit })
										: setAttributes({
												[fontSizeKey]: {
													...attributes.fontSize,
													unit: {
														...attributes.fontSize.unit,
														[deviceType]: newValue,
													},
												},
											})
								}
							/>
							<div
								className={classNames(
									"sp-smart-post-typography-font-size-presets",
									isCustomFontSize && "active"
								)}
							>
								{isCustomFontSize ? (
									<RangeControl
										// value={ ajax ? currentValue : value }
										value={fontSize.device?.[deviceType] || fontSize?.value}
										color="var(--sp-smart-primary-2-400)"
										onChange={(newValue) =>
											onStateUpdate
												? onStateUpdate(fontSizeKey, { ...fontSize, value: newValue })
												: onChangeFontSize({
														value: newValue,
													})
										}
										min={0}
										max={200}
										step={1}
										__nextHasNoMarginBottom={true}
										__next40pxDefaultSize
									/>
								) : (
									<div className="sp-smart-post-button-group-list">
										{fontSizePresets?.map(({ label, value }, i) => (
											<button
												key={i}
												className={`components-button ${
													[fontSize?.device?.[deviceType], fontSize?.value].includes(value)
														? " active"
														: ""
												}`}
												onClick={() =>
													onStateUpdate
														? onStateUpdate(fontSizeKey, { ...fontSize, value })
														: onChangeFontSize({
																value,
															})
												}
											>
												<span title={value}>{label}</span>
											</button>
										))}
									</div>
								)}

								<Button onClick={() => setIsCustomFontSize((prev) => !prev)}>
									<BorderIcon isActive={isCustomFontSize} />
								</Button>
							</div>
						</div>

						<SPRangeControl
							label={__("Line Height", "post-carousel")}
							setAttributes={setAttributes}
							attributes={lineHeight}
							attributesKey={lineHeightKey}
							max={6}
							step={0.1}
							defaultValue={{ value: lineDefaultValue }}
							typoLineHeight={true}
							onValueChange={(newValue) => onChangeLineHeight(newValue)}
						/>

						<div className="sp-smart-post-typography-word-spacing-latter-spacing-wrapper sp-d-flex sp-gap-8px">
							<div className="sp-smart-post-typography-line-height-picker">
								<ComponentsTopSection
									label={__("Letter Spacing", "post-carousel")}
									attributes={fontSpacing}
									attributesKey={fontSpacingKey}
									setAttributes={setAttributes}
									units={["px", "em"]}
									onUnitChange={(newValue) =>
										onStateUpdate
											? onStateUpdate(fontSpacingKey, { ...fontSpacing, unit: newValue })
											: setAttributes({
													[fontSpacingKey]: {
														...attributes.fontSpacing,
														unit: {
															...attributes.fontSpacing.unit,
															[deviceType]: newValue,
														},
													},
												})
									}
								/>

								<InputControl
									attributes={fontSpacing?.device?.[deviceType] || fontSpacing?.value}
									type="number"
									onChange={(newValue) =>
										onStateUpdate
											? onStateUpdate(fontSpacingKey, { ...fontSpacing, value: newValue })
											: setAttributes({
													[fontSpacingKey]: {
														...fontSpacing,
														device: {
															...fontSpacing?.device,
															[deviceType]: newValue,
														},
													},
												})
									}
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
										onUnitChange={(newValue) =>
											onStateUpdate
												? onStateUpdate(wordSpacingKey, { ...wordSpacing, unit: newValue })
												: setAttributes({
														[wordSpacingKey]: {
															...attributes.wordSpacing,
															unit: {
																...attributes.wordSpacing.unit,
																[deviceType]: newValue,
															},
														},
													})
										}
									/>
									<InputControl
										attributes={wordSpacing?.device?.[deviceType] || wordSpacing?.value}
										type="number"
										onChange={(newValue) =>
											onStateUpdate
												? onStateUpdate(wordSpacingKey, { ...wordSpacing, value: newValue })
												: setAttributes({
														[wordSpacingKey]: {
															...wordSpacing,
															device: {
																...wordSpacing?.device,
																[deviceType]: newValue,
															},
														},
													})
										}
										min={0}
									/>
								</div>
							)}
						</div>

						<Flex align="center">
							<div className="sp-smart-post-typography-multiple-button-group sp-smart-post-component-mb">
								<ComponentsTopSection label={__("Decoration", "post-carousel")} />

								<div className="sp-smart-post-button-group-list">
									{textDecorationOptions?.map(({ label, key, value }, i) => (
										<Tooltip placement="top" text={value} key={i}>
											<button
												className={`components-button${
													family?.typography[key] === value ? " active" : ""
												}`}
												onClick={() => onChangeTextStyles(key, value)}
											>
												<span title={value}>{label}</span>
											</button>
										</Tooltip>
									))}
								</div>
							</div>
							<div className="sp-smart-post-typography-multiple-button-group sp-smart-post-component-mb">
								<ComponentsTopSection label={__("Case", "post-carousel")} />

								<div className="sp-smart-post-button-group-list">
									{textCaseOptions?.map(({ label, key, value }, i) => (
										<Tooltip placement="top" text={value} key={i}>
											<button
												className={`components-button ${
													family?.typography[key] === value ? " active" : ""
												}`}
												onClick={() => onChangeTextStyles(key, value)}
											>
												<span title={value}>{label}</span>
											</button>
										</Tooltip>
									))}
								</div>
							</div>
						</Flex>
					</div>
				</Popover>
			)}
		</div>
	);
};

export default TypographyNew;
