import { __ } from "@wordpress/i18n";
import { GradientPicker } from "@wordpress/components";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { SmartButtonDefaultIcon, SmartButtonGhostIcon, SmartButtonGradientIcon } from "../../icons/icons";

import {
	Toggle,
	BoxShadow,
	Spacing,
	Border,
	InputControl,
	SpColorPicker,
	Layouts,
	Divider,
	TypographyNew,
	SelectDropdown,
	SPRangeControl,
	SelectField,
} from "../../components";
import hoverEffectsItems from "./hoverEffectsItems";
import { useState } from "@wordpress/element";
import {
	ArrowMinimal,
	ArrowOutline,
	ArrowSolid,
	ChevronBold,
	ChevronBorderLine,
	ChevronOutline,
	ChevronSolid,
	DoubleChevron,
	DoubleChevronOutline,
	TriangleOutline,
} from "../../icons/arrowIcons";
import { useSelect } from "@wordpress/data";
import ProInfo from "../../components/proInfo/proInfo";

export const SmartBtnGeneralTab = ({ attributes, setAttributes }) => {
	const {
		buttonBgColor,
		buttonBorderRadius,
		buttonBorder,
		buttonBorderWidth,
		buttonBoxShadowEnable,
		buttonBoxShadow,
		buttonHoverBorderRadius,
		buttonHoverBoxShadowEnable,
		buttonHoverBoxShadow,
		buttonLink,
		buttonPadding,
		buttonStyle,
		hoverEffects,
		shadowColor,
		buttonGradientBg,
		buttonGradientHoverBg,
		buttonHoverBorder,
		buttonHoverBorderWidth,
		openNewTab,
		buttonBorderGradientWidthHover,
		buttonBorderGradientRadiusHover,
		buttonBorderGradientHover,
		buttonLabelColor,
	} = attributes;
	const [bgColorState, setBgColorState] = useState("normal");

	const layoutChange = (newValue) => {
		if (newValue === buttonStyle) {
			return;
		}

		const hoverValue = {
			default: "defaultHover",
			ghost: "ghostDefault",
			gradient: "gradientHover",
		};

		const updatedAttributes = {
			buttonStyle: newValue,
			hoverEffects: hoverValue[newValue] || hoverEffects, // fallback to existing
		};

		// Extra styles for specific layouts
		if (newValue === "ghost") {
			updatedAttributes.buttonBgColor = {
				...buttonBgColor,
				color: "transparent",
			};

			updatedAttributes.buttonLabelColor = {
				...buttonLabelColor,
				color: "var(--smart-post-secondary)",
				hoverColor: "#FFF",
			};
		}

		if (newValue === "default") {
			updatedAttributes.buttonBgColor = {
				...buttonBgColor,
				color: "var(--smart-post-secondary)",
			};

			updatedAttributes.buttonLabelColor = {
				...buttonLabelColor,
				color: "#fff",
				hoverColor: "",
			};
		}
		if (newValue === "gradient") {
			updatedAttributes.buttonLabelColor = {
				...buttonLabelColor,
				color: "#fff",
				hoverColor: "",
			};
		}

		setAttributes(updatedAttributes);
	};

	const hoverEffectsChange = (newValue) => {
		if (newValue === hoverEffects) {
			return;
		}
		setAttributes({ hoverEffects: newValue });
	};

	const { defaultGradients, customGradients } = useSelect((select) => {
		const settings = select("smartpost/global-settings");
		return {
			customGradients: settings.getCustomGradients(),
			defaultGradients: settings.getDefaultGradient(),
		};
	}, []);

	return (
		<>
			<Layouts
				attributes={buttonStyle}
				setAttributes={setAttributes}
				attributesKey={"buttonStyle"}
				displayActive={true}
				grid={3}
				showDemoTitle={true}
				proBtnClass="sp-smart-small-size"
				onChange={layoutChange}
				label={__("Button Style", "post-carousel")}
				items={[
					{
						icon: <SmartButtonDefaultIcon value={buttonStyle} />,
						label: "Default",
						value: "default",
					},
					{
						icon: <SmartButtonGhostIcon value={buttonStyle} />,
						label: "Ghost",
						value: "ghost",
					},
					{
						icon: <SmartButtonGradientIcon value={buttonStyle} />,
						label: "Gradient",
						value: "gradient",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
					},
				]}
			/>
			{!(buttonStyle === "gradient") && (
				<Layouts
					attributes={hoverEffects}
					setAttributes={setAttributes}
					attributesKey={"hoverEffects"}
					displayActive={true}
					grid={3}
					onChange={hoverEffectsChange}
					showDemoTitle={true}
					proBtnClass="sp-smart-small-size"
					label={__("Hover Effects", "post-carousel")}
					items={hoverEffectsItems(buttonStyle, hoverEffects)}
				/>
			)}

			{!(buttonStyle === "gradient") && (
				<>
					<SPToggleGroupControl
						attributes={bgColorState}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
						onClick={(newColor) => setBgColorState(newColor)}
					/>
					{/* Normal State  */}
					{"normal" === bgColorState ? (
						<>
							<SpColorPicker
								label={__("Background Color", "post-carousel")}
								value={buttonBgColor?.color}
								onChange={(newColor) =>
									setAttributes({
										buttonBgColor: {
											...buttonBgColor,
											color: newColor,
										},
									})
								}
								defaultColor=""
							/>

							{["default", "ghost"].includes(buttonStyle) &&
								[
									"defaultHover",
									"shine",
									"ghostDefault",
									"slideRight",
									"slideSkew",
									"slideTop",
									"drawOutline",
								].includes(hoverEffects) && (
									<>
										<Toggle
											label={__("Box Shadow", "post-carousel")}
											attributes={buttonBoxShadowEnable}
											attributesKey={"buttonBoxShadowEnable"}
											setAttributes={setAttributes}
										/>
										{buttonBoxShadowEnable && (
											<BoxShadow
												label={__("Box Shadow", "post-carousel")}
												attributes={buttonBoxShadow}
												attributesKey={"buttonBoxShadow"}
												setAttributes={setAttributes}
												defaultColor={"#4E4F521A"}
											/>
										)}
									</>
								)}

							<Border
								label={__("Border", "post-carousel")}
								attributes={{
									border: buttonBorder,
									borderWidth: buttonBorderWidth,
								}}
								attributesKey={{
									border: "buttonBorder",
									borderWidth: "buttonBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>

							{["default", "ghost"].includes(buttonStyle) &&
								[
									"defaultHover",
									"shine",
									"multiLayers",
									"ghostDefault",
									"slideRight",
									"slideSkew",
									"slideTop",
									"neoFollow",
									"gradient",
									"drawOutline",
									"raiseShadow",
								].includes(hoverEffects) && (
									<Spacing
										label={__("Border Radius", "post-carousel")}
										attributes={buttonBorderRadius}
										attributesKey={"buttonBorderRadius"}
										setAttributes={setAttributes}
										units={["px", "%", "em"]}
										defaultValue={{
											unit: "px",
											value: {
												top: "0",
												right: "0",
												bottom: "0",
												left: "0",
											},
										}}
										indicator={"radius"}
									/>
								)}
						</>
					) : (
						// Hover State
						<>
							<SpColorPicker
								label={__("Background Color", "post-carousel")}
								value={buttonBgColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										buttonBgColor: {
											...buttonBgColor,
											hoverColor: newColor,
										},
									})
								}
							/>

							{["default"].includes(buttonStyle) &&
								["raiseShadow", "multiLayers"].includes(hoverEffects) && (
									<SpColorPicker
										label={__("Shadow Color", "post-carousel")}
										value={shadowColor}
										onChange={(newColor) =>
											setAttributes({
												shadowColor: newColor,
											})
										}
										defaultColor="#333333"
									/>
								)}

							{["default", "ghost"].includes(buttonStyle) &&
								[
									"defaultHover",
									"shine",
									"ghostDefault",
									"slideRight",
									"slideSkew",
									"slideTop",
									"drawOutline",
									"ghostDefault",
								].includes(hoverEffects) && (
									<>
										<Toggle
											label={__("Box Shadow", "post-carousel")}
											attributes={buttonHoverBoxShadowEnable}
											attributesKey={"buttonHoverBoxShadowEnable"}
											setAttributes={setAttributes}
										/>
										{buttonHoverBoxShadowEnable && (
											<BoxShadow
												label={__("Hover Box Shadow", "post-carousel")}
												attributes={buttonHoverBoxShadow}
												attributesKey={"buttonHoverBoxShadow"}
												setAttributes={setAttributes}
												defaultColor={"#4E4F521A"}
											/>
										)}
									</>
								)}

							<Border
								label={__("Border", "post-carousel")}
								attributes={{
									border: buttonHoverBorder,
									borderWidth: buttonHoverBorderWidth,
								}}
								attributesKey={{
									border: "buttonHoverBorder",
									borderWidth: "buttonHoverBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>

							{["default", "ghost"].includes(buttonStyle) &&
								[
									"defaultHover",
									"shine",
									"multiLayers",
									"raiseShadow",
									"gradShadow",
									"neoFollow",
									"ghostDefault",
									"slideRight",
									"slideSkew",
									"slideTop",
									"drawOutline",
								].includes(hoverEffects) && (
									<Spacing
										label={__("Border Radius", "post-carousel")}
										attributes={buttonHoverBorderRadius}
										attributesKey={"buttonHoverBorderRadius"}
										setAttributes={setAttributes}
										units={["px", "%", "em"]}
										defaultValue={{
											unit: "px",
											value: {
												top: "0",
												right: "0",
												bottom: "0",
												left: "0",
											},
										}}
										indicator={"radius"}
									/>
								)}
						</>
					)}
				</>
			)}

			{buttonStyle === "gradient" && (
				<>
					<SPToggleGroupControl
						attributes={bgColorState}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
						onClick={(newColor) => setBgColorState(newColor)}
					/>

					{bgColorState === "normal" ? (
						<>
							<div className="sp-smart-post-component-gradient">
								<p className="sp-smart-post-component-title">Gradient Color</p>
								<GradientPicker
									value={buttonGradientBg}
									gradients={[...defaultGradients, ...customGradients]}
									onChange={(currentGradient) =>
										setAttributes({
											buttonGradientBg: currentGradient,
										})
									}
								/>
							</div>

							<Border
								label={__("Border", "post-carousel")}
								attributes={{
									border: buttonBorder,
									borderWidth: buttonBorderWidth,
								}}
								attributesKey={{
									border: "buttonBorder",
									borderWidth: "buttonBorderWidth",
								}}
								setAttributes={setAttributes}
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
										top: "0",
										right: "0",
										bottom: "0",
										left: "0",
									},
								}}
								indicator={"radius"}
							/>
						</>
					) : (
						<>
							<div className="sp-smart-post-component-gradient">
								<p className="sp-smart-post-component-title">Hover Gradient Color</p>
								<GradientPicker
									value={buttonGradientHoverBg}
									gradients={[...defaultGradients, ...customGradients]}
									onChange={(currentGradient) =>
										setAttributes({
											buttonGradientHoverBg: currentGradient,
										})
									}
								/>
							</div>

							<Border
								label={__("Border", "post-carousel")}
								attributes={{
									border: buttonBorderGradientHover,
									borderWidth: buttonBorderGradientWidthHover,
								}}
								attributesKey={{
									border: "buttonBorderGradientHover",
									borderWidth: "buttonBorderGradientWidthHover",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>

							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={buttonBorderGradientRadiusHover}
								attributesKey={"buttonBorderGradientRadiusHover"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "0",
										right: "0",
										bottom: "0",
										left: "0",
									},
								}}
								indicator={"radius"}
							/>
						</>
					)}
				</>
			)}

			<Divider position={"sp-w-100pct bottom"} />

			<InputControl
				label={__("Button Link", "post-carousel")}
				attributes={buttonLink}
				flex={false}
				inputType="text"
				attributesKey={"buttonLink"}
				setAttributes={setAttributes}
				placeholder={__("Enter Button URL", "post-carousel")}
			/>

			<Toggle
				label={__("Open in New Tab", "post-carousel")}
				attributes={openNewTab}
				attributesKey={"openNewTab"}
				setAttributes={setAttributes}
			/>

			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={buttonPadding}
				attributesKey={"buttonPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{ top: 14, right: 28, bottom: 14, left: 28 }}
			/>
		</>
	);
};

export const SmartBtnLabelTab = ({ attributes, setAttributes }) => {
	const {
		buttonLabelTypography,
		buttonLabelFontSize,
		buttonLabelLatterSpacing,
		buttonLabelLineHeight,
		buttonLabelColor,
		buttonLabelWordSpacing,
		buttonLabelEnable,
		buttonLabelGlobalTypography,
	} = attributes;
	const [colorState, setColorState] = useState("normal");

	return (
		<>
			<Toggle
				label={__("Button Label", "post-carousel")}
				attributes={buttonLabelEnable}
				attributesKey={"buttonLabelEnable"}
				setAttributes={setAttributes}
			/>
			{/* <InputControl
                label={ __( 'Button Label', 'post-carousel' ) }
                attributes={ buttonLabel }
                flex={ false }
                inputType="text"
                attributesKey={ 'buttonLabel' }
                setAttributes={ setAttributes }
                placeholder={ __( 'Button Label', 'post-carousel' ) }
            /> */}
			{buttonLabelEnable && (
				<>
					<TypographyNew
						attributes={{
							family: buttonLabelTypography,
							familyKey: "buttonLabelTypography",
							fontSize: buttonLabelFontSize,
							fontSizeKey: "buttonLabelFontSize",
							fontSpacing: buttonLabelLatterSpacing,
							fontSpacingKey: "buttonLabelLatterSpacing",
							lineHeight: buttonLabelLineHeight,
							lineHeightKey: "buttonLabelLineHeight",
							wordSpacing: buttonLabelWordSpacing,
							wordSpacingKey: "buttonLabelWordSpacing",
							globalTypo: buttonLabelGlobalTypography,
							globalTypoKey: "buttonLabelGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: 14,
						}}
						typographyLabel={__("Typography", "post-carousel")}
					/>

					<SPToggleGroupControl
						attributes={colorState}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Hover", value: "hover" },
						]}
						onClick={(newColor) => setColorState(newColor)}
					/>
					{"normal" === colorState ? (
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={buttonLabelColor?.color}
							onChange={(newColor) =>
								setAttributes({
									buttonLabelColor: {
										...buttonLabelColor,
										color: newColor,
									},
								})
							}
							defaultColor="#333333"
						/>
					) : (
						<SpColorPicker
							label={__("Color", "post-carousel")}
							value={buttonLabelColor.hoverColor}
							onChange={(newColor) =>
								setAttributes({
									buttonLabelColor: {
										...buttonLabelColor,
										hoverColor: newColor,
									},
								})
							}
						/>
					)}
				</>
			)}
		</>
	);
};

export const SmartBtnIconTab = ({ attributes, setAttributes }) => {
	const { iconSource, iconGap, iconPosition, enableIcon, buttonLabelEnable, smartBtnIconSize, smartBtnIconColor } =
		attributes;
	const [iconColorState, setIconColorState] = useState("normal");
	const iconPositionItems = [
		{ label: "Left", value: "left" },
		{ label: "Right", value: "right" },
		{ label: "Top", value: "top" },
		{ label: "Bottom", value: "bottom" },
	];

	return (
		<>
			<Toggle
				label={__("Icon", "post-carousel")}
				attributes={enableIcon}
				attributesKey={"enableIcon"}
				setAttributes={setAttributes}
				pro={true}
			/>

			{enableIcon && (
				<>
					{/* <IconPicker
                        attributes={ iconSource }
                        attributesKey="iconSource"
                        setAttributes={ setAttributes }
                        label="Icon Source"
                        onChange={ handleIconSource }
                        iconType="arrowIcon"
                    /> */}

					<SelectDropdown
						label={__("Icon Styles", "post-carousel")}
						attributes={iconSource}
						attributesKey={"iconSource"}
						setAttributes={setAttributes}
						options={[
							{
								label: __("Chevron Solid", "post-carousel"),
								value: "chevron-solid",
								icon: <ChevronSolid />,
							},
							{
								label: __("Chevron Outline", "post-carousel"),
								value: "chevron-outline",
								icon: <ChevronOutline />,
							},
							{
								label: __("Chevron Bold", "post-carousel"),
								value: "chevron-bold",
								icon: <ChevronBold />,
							},
							{
								label: __("Double Chevron", "post-carousel"),
								value: "double-chevron",
								icon: <DoubleChevron />,
							},
							{
								label: __("Arrow Solid", "post-carousel"),
								value: "arrow-solid",
								icon: <ArrowSolid />,
							},
							{
								label: __("Arrow Outline", "post-carousel"),
								value: "arrow-outline",
								icon: <ArrowOutline />,
							},
							{
								label: __("Arrow Minimal", "post-carousel"),
								value: "arrow-minimal",
								icon: <ArrowMinimal />,
							},
							{
								label: __("Chevron Border Line", "post-carousel"),
								value: "chevron-border-line",
								icon: <ChevronBorderLine />,
							},
							{
								label: __("Double Chevron Outline", "post-carousel"),
								value: "double-chevron-outline",
								icon: <DoubleChevronOutline />,
							},
							{
								label: __("Triangle Outline", "post-carousel"),
								value: "triangle-outline",
								icon: <TriangleOutline />,
							},
						]}
					/>
					{iconSource && (
						<>
							{/* <SPRangeControl
                                label={ __(
                                    'Icon Size',
                                    'post-carousel'
                                ) }
                                attributes={ iconSize }
                                attributesKey={ 'iconSize' }
                                setAttributes={ setAttributes }
                                units={ [ 'px', '%', 'Em' ] }
                                defaultValue={ { unit: 'px', value: 14 } }
                                max={ 100 }
                            /> */}

							{/* <SPToggleGroupControl
                                attributes={ iconColorState }
                                items={ [
                                    { label: 'Normal', value: 'normal' },
                                    { label: 'Hover', value: 'hover' },
                                ] }
                                onClick={ ( newColor ) =>
                                    setIconColorState( newColor )
                                }
                            />
                            { 'normal' === iconColorState ? (
                                <SpColorPicker
                                    label={ __(
                                        'Color',
                                        'post-carousel'
                                    ) }
                                    value={ iconColor.color }
                                    onChange={ ( newColor ) =>
                                        setAttributes( {
                                            iconColor: {
                                                ...iconColor,
                                                color: newColor,
                                            },
                                        } )
                                    }
                                    defaultColor="#333333"
                                />
                            ) : (
                                <SpColorPicker
                                    label={ __(
                                        'Color',
                                        'post-carousel'
                                    ) }
                                    value={ iconColor.hoverColor }
                                    onChange={ ( newColor ) =>
                                        setAttributes( {
                                            iconColor: {
                                                ...iconColor,
                                                hoverColor: newColor,
                                            },
                                        } )
                                    }
                                />
                            ) } */}

							<SPRangeControl
								label={__("Icon Size", "post-carousel")}
								attributes={smartBtnIconSize}
								attributesKey={"smartBtnIconSize"}
								setAttributes={setAttributes}
								units={["px", "Em"]}
								defaultValue={{ unit: "px", value: 8 }}
								max={100}
							/>
							{buttonLabelEnable && (
								<SPRangeControl
									label={__("Icon Gap", "post-carousel")}
									attributes={iconGap}
									attributesKey={"iconGap"}
									setAttributes={setAttributes}
									units={["px", "Em"]}
									defaultValue={{
										unit: "px",
										value: 8,
									}}
									max={100}
								/>
							)}

							<SelectField
								label={__("Icon Position", "post-carousel")}
								attributes={iconPosition}
								attributesKey={"iconPosition"}
								setAttributes={setAttributes}
								items={[...iconPositionItems]}
								flexStyle={true}
							/>
							<SPToggleGroupControl
								attributes={iconColorState}
								onClick={(newValue) => setIconColorState(newValue)}
								items={[
									{ label: "Normal", value: "normal" },
									{ label: "Hover", value: "hover" },
								]}
							/>
							{"normal" === iconColorState ? (
								<>
									<SpColorPicker
										label={__("Color", "post-carousel")}
										value={smartBtnIconColor.color}
										onChange={(newValue) =>
											setAttributes({
												smartBtnIconColor: {
													...smartBtnIconColor,
													color: newValue,
												},
											})
										}
									/>
								</>
							) : (
								<>
									<SpColorPicker
										label={__("Hover Color", "post-carousel")}
										value={smartBtnIconColor.hover}
										onChange={(newValue) =>
											setAttributes({
												smartBtnIconColor: {
													...smartBtnIconColor,
													hover: newValue,
												},
											})
										}
									/>
								</>
							)}
						</>
					)}
				</>
			)}
			<ProInfo>
				<h3>Premium Only</h3>
				<h4>Enhance your buttons with customizable icons</h4>
				<ul>
					<li>
						— Add icons to buttons
					</li>
					<li>
						— Icon size and spacing control
					</li>
					<li>
						— Flexible icon positioning
					</li>
					<li>
						— Normal and hover color styling
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</>
	);
};
