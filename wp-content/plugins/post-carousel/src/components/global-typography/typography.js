import Select from "react-select";
import { __ } from "@wordpress/i18n";
import { Button, Flex, Popover, Tooltip } from "@wordpress/components";
import { Fragment, useEffect, useRef, useState } from "@wordpress/element";
import ComponentsTopSection from "../componentsTopControl/ComponentsTopSection.js";
import "../typography/editor.scss";
import SelectField from "../selectField/selectField.js";
import { fontWeightMap, getFontWeightList, textCaseOptions, textDecorationOptions } from "../typography/utility.js";
import InputControl from "../inputControl/inputControl.js";
import { useDeviceType } from "../../controls/controls.js";
import { BorderIcon } from "../../icons/icons.js";
import { useSelect } from "@wordpress/data";
import useGoogleFonts from "../../hooks/useGoogleFontApi.js";

const GlobalTypography = ({ attributes, typographyLabel = "Typography", typoItem, onChangeAttr, deleteAction }) => {
	const fontFamilies = useSelect((select) => {
		const settings = select("core/editor")?.getEditorSettings();
		return settings?.__experimentalFeatures?.typography?.fontFamilies || [];
	}, []);
	const [systemFonts, setSystemFonts] = useState([]);
	const [allFonts, setAllFonts] = useState([]);
	const [fontLists, setFontLists] = useState([]);
	const [fontInfo, setFontInfo] = useState(typoItem);
	const { wordSpacing } = attributes;
	const deviceType = useDeviceType();
	const typographyBtnRef = useRef(null);

	const [isVisible, setIsVisible] = useState(false);

	const toggleVisible = () => {
		setIsVisible((state) => !state);

		if (isVisible) {
			onChangeAttr(fontInfo);
		}
	};

	const { googleFonts } = useGoogleFonts();

	useEffect(() => {
		if (allFonts.length === 0 && googleFonts.length > 0) {
			let wpFonts = [];
			if (fontFamilies) {
				const customFonts = fontFamilies.custom || [];
				const themeFonts = fontFamilies.theme || [];
				const _systemFonts = [...customFonts, ...themeFonts];
				wpFonts = _systemFonts?.map((f) => {
					const variants = f?.fontFace?.map((v) => v.fontWeight);
					return {
						label: f.name,
						value: f.fontFamily,
						type: "system",
						font: {
							family: f.fontFamily,
							variants:
								variants?.length > 0
									? variants[0]?.split(" ")
									: ["300", "400", "500", "600", "700", "800"],
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
	}, [googleFonts, fontFamilies]);

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

	// default and active family options.
	const defaultFamilyOption = {
		label: "Default",
		value: "",
		font: { variants: ["regular"] },
	};

	const activeFontFamily =
		fontInfo.typography.family === ""
			? defaultFamilyOption
			: {
					label:
						allFonts?.find((font) => font.value === fontInfo.typography.family)?.label ||
						fontInfo.typography.family,
					value: fontInfo.typography?.family,
					font: fontInfo.typography.font,
				};

	useEffect(() => {
		const clickOutSite = (e) => {
			const target = e.target.closest(".sp-smart-post-typography-fonts");

			const buttonTarget = e.target.closest(`.sp-smart-post-typography-btn button.button-${fontInfo?.slug}`);
			const familyTarget = e.target.closest(".css-1nmdiq5-menu");

			if (!target && isVisible && !buttonTarget && !familyTarget) {
				setIsVisible(false);

				onChangeAttr(fontInfo);
			}
		};
		window.addEventListener("click", clickOutSite);

		return () => window.removeEventListener("click", clickOutSite);
	});

	const allFamilyList = [defaultFamilyOption, ...fontLists];

	const isAvailableOnList = allFamilyList?.find((font) => font.value === activeFontFamily.value);

	const fontFamilySelectOptions = isAvailableOnList
		? allFamilyList
		: [defaultFamilyOption, activeFontFamily, ...fontLists];

	// Set Font Family Function.
	const selectFontFamily = (newValue) => {
		const newData = {
			...fontInfo,
			typography: {
				...fontInfo.typography,
				family: newValue.value,
				type: "system" === newValue.type ? "system" : "google",
				font: newValue.font,
				fontWeight: "400",
			},
		};

		setFontInfo(newData);
	};

	// Set font weight and font style function.
	const onChangeFontWeight = (fontWeight) => {
		const arrayOfStyles = fontWeightMap[fontWeight]?.split(" ");
		const style = fontWeightMap[fontWeight].includes("italic") ? "italic" : "normal";

		let weight = arrayOfStyles[arrayOfStyles.length - 1];
		weight = "italic" === style && "400" === weight ? "italic" : weight;

		const newData = {
			...fontInfo,
			typography: {
				...fontInfo.typography,
				fontWeight: weight,
				style: style,
			},
		};

		setFontInfo(newData);
	};

	// Set font line height function.
	const onChangeLineHeight = (newValue) => {
		const newData = {
			...fontInfo,
			lineHeight: {
				...fontInfo.lineHeight,
				device: {
					...fontInfo.lineHeight.device,
					[deviceType]: newValue,
				},
			},
		};

		setFontInfo(newData);
	};

	// Set letter spacing function.
	const letterSpacing = (newValue) => {
		const newData = {
			...fontInfo,
			letterSpacing: {
				...fontInfo.letterSpacing,
				device: {
					...fontInfo.letterSpacing.device,
					[deviceType]: newValue,
				},
			},
		};

		setFontInfo(newData);
	};

	// Set word spacing function.
	const wordSpacingFn = (newValue) => {
		const newData = {
			...fontInfo,
			wordSpacing: {
				...fontInfo.wordSpacing,
				device: {
					...fontInfo.wordSpacing.device,
					[deviceType]: newValue,
				},
			},
		};

		setFontInfo(newData);
	};

	// Set font size function.
	const onChangeFontSize = (newValue) => {
		const newData = {
			...fontInfo,
			fontSize: {
				...fontInfo.fontSize,
				device: {
					...fontInfo.fontSize.device,
					[deviceType]: newValue,
				},
			},
		};

		setFontInfo(newData);
	};

	// Set unit function.
	const unitChange = (newUnit, key) => {
		const newData = {
			...fontInfo,
			[key]: {
				...fontInfo[key],
				unit: {
					...fontInfo[key].unit,
					[newUnit.deviceType]: newUnit.unit,
				},
			},
		};

		setFontInfo(newData);
	};

	// Reset function.
	// const onReset = ( defaultValue, key ) => {
	// 	const newData = {
	// 		...fontInfo,
	// 		[key]: {
	// 			...fontInfo[key],
	// 			"unit": {
	// 				...fontInfo.fontSize.unit,
	// 				"Desktop": defaultValue.unit,
	// 			},
	// 			"device": {
	// 				...fontInfo.fontSize.device,
	// 				"Desktop": defaultValue.value,
	// 			},
	// 		},
	// 	};

	// 	setFontInfo( newData );
	// };

	// Set text style function.
	const onChangeTextStyles = (key, value) => {
		const newValue = fontInfo?.typography[key] === value ? "" : value;

		const newData = {
			...fontInfo,
			typography: { ...fontInfo.typography, [key]: newValue },
		};

		setFontInfo(newData);
	};

	// Title text change
	const onChangeFontTitle = (e) => {
		const newData = { ...fontInfo, title: e.target.value };

		setFontInfo(newData);
	};

	// Update fontSize and lineHeight
	const onChangeSizes = (newValue, index, key) => {
		const newSizes = fontInfo?.sizes?.map((size, i) =>
			i === index
				? {
						...size,
						[key]: {
							...size[key],
							device: {
								...size[key]?.device,
								[deviceType]: newValue,
							},
						},
					}
				: size
		);

		const newData = { ...fontInfo, sizes: newSizes };

		setFontInfo(newData);
	};

	const onChangeSizesUnit = (newValue, index, key) => {
		const newSizes = fontInfo?.sizes?.map((size, i) =>
			i === index
				? {
						...size,
						[key]: {
							...size[key],
							unit: {
								...size[key]?.unit,
								[deviceType]: newValue?.unit,
							},
						},
					}
				: size
		);

		const newData = { ...fontInfo, sizes: newSizes };

		setFontInfo(newData);
	};

	return (
		<>
			<div className="sp-smart-post-typography sp-smart-post-component-mb sp-smart-post-tab-panel">
				<div
					className={`sp-smart-post-typography-btn sp-smart-post-button ${isVisible && "active"}`}
					ref={typographyBtnRef}
				>
					<p className="sp-smart-post-component-title">{typographyLabel}</p>
					<div className="sp-smart-post-header-right">
						<Button
							className={`components-button sp-smart-post-border-icon-button active  has-icon button-${
								fontInfo?.slug
							} ${isVisible ? "button-clicked" : ""}`}
							aria-label={isVisible ? "open typography popup" : "close typography popup"}
							onClick={() => toggleVisible(fontInfo?.slug)}
						>
							{<BorderIcon isActive={isVisible} />}
						</Button>
					</div>
				</div>

				{isVisible && (
					<Popover shift={true} focusOnMount={false}>
						<div className={`sp-smart-post-typography-fonts sp-smart-global-typography`}>
							<div className="sp-smart-post-typography-header">
								<h4>
									{!["heading", "body", "button"].includes(fontInfo.slug) ? (
										<>
											<span>Name</span>
											<input
												name={fontInfo?.slug}
												value={fontInfo.title}
												onChange={onChangeFontTitle}
											/>
										</>
									) : (
										`${fontInfo.title} Typography`
									)}
								</h4>
								{!["heading", "body", "button"].includes(fontInfo.slug) && (
									<Button
										className="sp-smart-typography-dots"
										onClick={() => {
											deleteAction(typoItem);
											setIsVisible(false);
										}}
									>
										<svg
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="#000"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12 4H15C15.6 4 16 4.4 16 5V6H3V5C3 4.4 3.5 4 4 4H7C7.2 2.9 8.3 2 9.5 2C10.7 2 11.8 2.9 12 4ZM8 4H11C10.8 3.4 10.1 3 9.5 3C8.9 3 8.2 3.4 8 4ZM4 7H15L14.1 17.1C14.1 17.6 13.6 18 13.1 18H5.9C5.4 18 5 17.6 4.9 17.1L4 7Z"
												fill="#000"
											/>
										</svg>
									</Button>
								)}
							</div>
							<div className="sp-smart-post-typography-fields">
								<div className={`sp-smart-post-typography-family sp-smart-post-component-mb`}>
									<div className="sp-smart-post-select-field">
										<div className="sp-smart-post-header">
											<span className="sp-smart-post-component-title">
												{" "}
												Font Family
											</span>
										</div>

										<Select
											options={fontFamilySelectOptions}
											value={activeFontFamily}
											placeholder={activeFontFamily.label}
											onChange={(newValue) => selectFontFamily(newValue)}
											onInputChange={(inputValue) => fontSearch(inputValue)}
										/>
									</div>
								</div>
								<SelectField
									label={__("Font Style", "post-carousel")}
									attributes={fontInfo?.fontWeight}
									items={getFontWeightList(activeFontFamily)}
									onChange={(newStyle) => onChangeFontWeight(newStyle)}
									__nextHasNoMarginBottom
								/>
							</div>

							{!fontInfo.sizes && (
								<>
									<div className="sp-smart-post-typography-word-spacing-latter-spacing-wrapper sp-d-flex sp-gap-8px">
										<div className="sp-smart-post-typography-line-height-picker">
											<ComponentsTopSection
												label={__("Font Size", "post-carousel")}
												onUnitChange={(newUnit) => unitChange(newUnit, "fontSize")}
												attributes={fontInfo?.fontSize}
												// setAttributes={ setAttributes }
												units={["px", "%", "em"]}
											/>
											<InputControl
												attributes={fontInfo?.fontSize?.device?.[deviceType]}
												type="number"
												onChange={onChangeFontSize}
												min={0}
											/>
										</div>
										<div className="sp-smart-post-typography-letter-spacing-picker">
											<ComponentsTopSection
												label={__("Line Height", "post-carousel")}
												attributes={fontInfo?.lineHeight}
												onUnitChange={(newUnit) => unitChange(newUnit, "lineHeight")}
											/>
											<InputControl
												attributes={fontInfo?.lineHeight?.device?.[deviceType]}
												type="number"
												onChange={onChangeLineHeight}
												min={0}
												step={0.1}
												max={6}
											/>
										</div>
									</div>
								</>
							)}
							<div className="sp-smart-post-typography-word-spacing-latter-spacing-wrapper sp-d-flex sp-gap-8px">
								<div className="sp-smart-post-typography-line-height-picker">
									<ComponentsTopSection
										label={__("Letter Spacing", "post-carousel")}
										onUnitChange={(newUnit) => unitChange(newUnit, "letterSpacing")}
										attributes={fontInfo?.letterSpacing}
										// setAttributes={ setAttributes }
										units={["px", "em"]}
									/>
									<InputControl
										attributes={fontInfo?.letterSpacing?.device?.[deviceType]}
										type="number"
										onChange={(newValue) => letterSpacing(newValue)}
										min={0}
									/>
								</div>
								{wordSpacing && (
									<div className="sp-smart-post-typography-letter-spacing-picker">
										<ComponentsTopSection
											label={__("Word Spacing", "post-carousel")}
											attributes={fontInfo?.wordSpacing}
											onUnitChange={(newUnit) => unitChange(newUnit, "wordSpacing")}
											units={["px", "em"]}
										/>
										<InputControl
											attributes={fontInfo?.wordSpacing?.device?.[deviceType]}
											type="number"
											onChange={(newValue) => wordSpacingFn(newValue)}
											min={0}
										/>
									</div>
								)}
							</div>
							{/* <div className="sp-smart-post-typography-multiple-button-group sp-smart-post-component-mb">
								<ComponentsTopSection
									label={ __(
										'Text Format',
										'post-carousel-pro'
									) }
								/>
								<div className="sp-smart-post-button-group-list">
									{ textStylesOptions?.map(
										( { label, key, value }, i ) => (
											<button
												key={ i }
												className={ `components-button${
													fontInfo?.typography[
														key
													] === value
														? ' active'
														: ''
												}` }
												onClick={ () =>
													onChangeTextStyles(
														key,
														value
													)
												}
											>
												<span title={ value }>
													{ label }
												</span>
											</button>
										)
									) }
								</div>
							</div> */}
							<Flex align="center">
								<div className="sp-smart-post-typography-multiple-button-group sp-smart-post-component-mb">
									<ComponentsTopSection label={__("Decoration", "post-carousel")} />

									<div className="sp-smart-post-button-group-list">
										{textDecorationOptions?.map(({ label, key, value }, i) => (
											<Tooltip placement="top" text={value} key={i}>
												<button
													className={`components-button${
														fontInfo?.typography[key] === value ? " active" : ""
													}`}
													onClick={() => onChangeTextStyles(key, value)}
												>
													<span>{label}</span>
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
														fontInfo?.typography[key] === value ? " active" : ""
													}`}
													onClick={() => onChangeTextStyles(key, value)}
												>
													<span>{label}</span>
												</button>
											</Tooltip>
										))}
									</div>
								</div>
							</Flex>
							{fontInfo?.sizes?.map((size, i) => (
								<Fragment key={i}>
									<span className="sp-smart-global-typography-label">{`${fontInfo.title} ${
										i + 1
									}`}</span>

									<div className="sp-smart-post-typography-word-spacing-latter-spacing-wrapper sp-d-flex sp-gap-8px">
										<div className="sp-smart-post-typography-line-height-picker">
											<ComponentsTopSection
												label={__("Font Size", "post-carousel")}
												onUnitChange={(newUnit) => onChangeSizesUnit(newUnit, i, "fontSize")}
												attributes={size?.fontSize}
												// setAttributes={ setAttributes }
												units={["px", "%", "em"]}
											/>
											<InputControl
												attributes={size?.fontSize?.device?.[deviceType]}
												type="number"
												onChange={(newValue) => onChangeSizes(newValue, i, "fontSize")}
												min={0}
											/>
										</div>

										<div className="sp-smart-post-typography-letter-spacing-picker">
											<ComponentsTopSection
												label={__("Line Height", "post-carousel")}
												attributes={size?.lineHeight}
												onUnitChange={(newUnit) => onChangeSizesUnit(newUnit, i, "lineHeight")}
												// units={['px', '%', 'em']}
											/>
											<InputControl
												attributes={size?.lineHeight?.device?.[deviceType]}
												type="number"
												onChange={(newValue) => onChangeSizes(newValue, i, "lineHeight")}
												min={0}
												step={0.1}
												max={6}
											/>
										</div>
									</div>
								</Fragment>
							))}
						</div>
					</Popover>
				)}
			</div>
		</>
	);
};

export default GlobalTypography;
