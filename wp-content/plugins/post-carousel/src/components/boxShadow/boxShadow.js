import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import SpColorPicker from "../color/color.js";
import SPToggleGroupControl from "../toggleGroupControl/toggleGroupControl.js";

import { Tooltip } from "@wordpress/components";
import { BorderIcon, CheckMark, GloveIcon, ResetIcon } from "../../icons/icons.js";
import { BoxSpacing } from "./boxSpacing.js";
import "./editor.scss";
import { dispatch, useSelect, select, hasStore } from "@wordpress/data";

const BoxShadow = ({
	shadowColorBtn = false,
	attributes,
	attributesKey,
	setAttributes,
	defaultColor = "#4E4F521A",
	onChange = false,
}) => {
	const [buttonTab, setButtonTab] = useState("default");
	const [globalStyle, setGlobalStyle] = useState(null);
	const [selectedShadow, setSelectedShadow] = useState("var(--smart-post-shadow-medium-4dp)");
	const [customShadow, setCustomShadow] = useState(false);
	const [update, setUpdate] = useState(0);
	const [sidebarState, setSidebarState] = useState(false);

	// Initialize selected shadow from attributes
	useEffect(() => {
		if (attributes?.selectDefault && attributes.selectDefault !== "custom") {
			setSelectedShadow(attributes.selectDefault);
		}
		if (attributes?.selectDefault === "custom") {
			setCustomShadow(true);
		}
	}, [attributes]);

	// Get global shadow styles
	const getGlobalShadow = useSelect((_select) => _select("smartpost/global-settings")?.getCategory("shadow"), []);
	useEffect(() => {
		if (getGlobalShadow) {
			setGlobalStyle(getGlobalShadow?.shadowList);
		}
	}, [getGlobalShadow]);

	useEffect( () => {
		const isPostEditor     = select("core/edit-post");
		const isSiteEditor     = select("core/edit-site");
		const isWidgetEditor   = select("core/customize-widgets");

		if (isPostEditor || isSiteEditor || isWidgetEditor) {
			setSidebarState(true);
		}
	}, [])

	const shadowColor = (newColor) => {
		if (onChange) {
			onChange(attributesKey, { ...attributes, color: newColor });
		} else {
			setAttributes({
				[attributesKey]: { ...attributes, color: newColor },
			});
		}
	};

	const shadowHoverColor = (newColor) => {
		setAttributes({
			[attributesKey]: { ...attributes, hoverColor: newColor },
		});
	};

	const tabButton = (newValue) => {
		setButtonTab(newValue);
	};

	const shadowHandler = (newValue) => {
		setAttributes({
			[attributesKey]: { ...attributes, selectDefault: newValue },
		});
	};

	const handleShadowType = () => {
		const newCustomShadow = !customShadow;
		setCustomShadow(newCustomShadow);

		if (newCustomShadow) {
			// Switching to custom shadow
			if (onChange) {
				onChange(attributesKey, { ...attributes, selectDefault: "custom" });
			} else {
				setAttributes({
					[attributesKey]: { ...attributes, selectDefault: "custom" },
				});
			}
		} else {
			// Switching back to preset shadows
			if (selectedShadow && selectedShadow !== "custom") {
				shadowHandler(selectedShadow);
			}
		}
	};

	const handleShadowSelect = (newValue) => {
		setSelectedShadow(newValue);
		if (onChange) {
			onChange(attributesKey, { ...attributes, selectDefault: newValue });
		} else {
			shadowHandler(newValue);
		}
	};

	const handleReset = () => {
		// Reset to default medium shadow
		setSelectedShadow("var(--smart-post-shadow-medium-4dp)");
		shadowHandler("var(--smart-post-shadow-medium-4dp)");
	};

	const handleGlobalSettings = () => {
		const sidebarName = "smart-post-show-pro-global-settings/sidebar";
		if (select("core/edit-post")) {
			dispatch("core/edit-post").openGeneralSidebar(sidebarName);
		} else if (select("core/edit-site")) {
			dispatch("core/edit-site").openGeneralSidebar(sidebarName);
		} else if (select("core/customize-widgets")) {
			dispatch("core/customize-widgets").openGeneralSidebar(sidebarName);
		} else {
			console.log("Could not determine current editor type");
		}
	};
	const updateGlobalStyleHandler = (slugValue) => {
		if (onChange) {
			onChange(attributesKey, `var(--smart-post-shadow-${slugValue})`);
		} else {
			handleShadowSelect(`var(--smart-post-shadow-${slugValue})`);
		}
	};

	return (
		<>
			<div className="shadow-selector-container">
				{/* Header */}
				<div className="shadow-selector-header">
					<p className="shadow-selector-title">Shadow Type</p>
					<div className="shadow-selector-actions">
						{!customShadow && (
							<>
								<Tooltip text="Reset to default">
									<button className="action-button action-refresh" onClick={handleReset}>
										<ResetIcon />
									</button>
								</Tooltip>
								{ sidebarState && (
									<Tooltip text="Global Settings">
										<button className="action-button" onClick={handleGlobalSettings}>
											<GloveIcon />
										</button>
									</Tooltip>
								)}
							</>
						)}

						<Tooltip text={customShadow ? "Switch to Presets" : "Switch to Custom"}>
							<button onClick={handleShadowType} className="action-button">
								<BorderIcon isActive={customShadow} />
							</button>
						</Tooltip>
					</div>
				</div>

				{customShadow ? (
					<BoxSpacing
						key={update}
						label={__("Box Shadow", "post-carousel")}
						customClass={"sp-box-shadow"}
						attributes={attributes}
						attributesKey={attributesKey}
						setAttributes={setAttributes}
						boxUnits={true}
						units={["Outset", "Inset"]}
						labelItem={{
							top: __("X Offset", "post-carousel"),
							right: __("Y Offset", "post-carousel"),
							bottom: __("Blur", "post-carousel"),
							left: __("Speared", "post-carousel"),
						}}
						handleReset={handleReset}
						onChange={onChange}
					/>
				) : (
					<div className="shadow-options-grid">
						{/* { shadowTypes.map( ( shadow ) => (
							<Tooltip
								key={ shadow.id }
								text={ shadow.name }
								position="top"
								className="custom-tooltip"
							>
								<button
									onClick={ () =>
										handleShadowSelect( shadow.id )
									}
									className={ `shadow-option ${
										selectedShadow === shadow.id
											? 'selected'
											: ''
									}` }
									style={ shadow.style }
								>
									{ selectedShadow === shadow.id && (
										<div className="checkmark">
											<CheckMark />
										</div>
									) }
								</button>
							</Tooltip>
						) ) } */}
						{globalStyle?.map((shadow, i) => (
							<Tooltip
								key={i}
								text={shadow.title}
								// position="top"
								className="custom-tooltip"
							>
								<button
									onClick={() => handleShadowSelect(`var(--smart-post-shadow-${shadow.slug})`)}
									className={`shadow-option ${
										selectedShadow === "var(--smart-post-shadow-" + shadow.slug + ")"
											? "selected"
											: ""
									}`}
									style={{
										boxShadow: `var(--smart-post-shadow-${shadow.slug})`,
									}}
								>
									{selectedShadow === `var(--smart-post-shadow-${shadow.slug})` && (
										<div className="checkmark">
											<CheckMark />
										</div>
									)}
								</button>
							</Tooltip>
						))}
					</div>
				)}
			</div>

			{customShadow && (
				<>
					{shadowColorBtn && (
						<SPToggleGroupControl
							label={__("Shadow Color", "post-carousel")}
							attributes={buttonTab}
							items={[
								{ label: "Default", value: "default" },
								{ label: "Hover", value: "hover" },
							]}
							onClick={tabButton}
						/>
					)}
					{"default" === buttonTab && (
						<SpColorPicker
							label={__("Shadow Color", "post-carousel")}
							value={attributes.color}
							onChange={shadowColor}
							defaultColor={defaultColor}
						/>
					)}
					{"hover" === buttonTab && (
						<>
							<SpColorPicker
								label={__("Hover Color", "post-carousel")}
								value={attributes.hoverColor}
								onChange={shadowHoverColor}
								defaultColor={defaultColor}
							/>
						</>
					)}
				</>
			)}
		</>
	);
};

export default BoxShadow;
