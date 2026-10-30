import { Button, ColorPicker, ColorIndicator, Popover, Tooltip } from "@wordpress/components";
import "./editor.scss";
import { useMemo, memo, useEffect, useState } from "@wordpress/element";
import { GlobalIcon, ResetIcon } from "../../icons/icons";
import { dispatch, useSelect, select } from "@wordpress/data";
import { priceLink } from "../../blocks/shared/helpFn";

const SpColorPicker = (props) => {
	const {
		setAttributes,
		value,
		attributesKey,
		label,
		colorType = "normal",
		attributes = {},
		onChange,
		resetButton = true,
		defaultColor = "",
		pro = false
	} = props;

	const [isVisible, setIsVisible] = useState(false);
	const [globalColor, setGlobalColor] = useState({});
	const activeColor = value || attributes?.[colorType] || attributes;

	const toggleVisible = () => {
		setIsVisible((state) => !state);
	};

	const themeAllColors = useSelect((_select) => {
		const settings = _select("core/block-editor").getSettings();
		const colors = settings?.colors || [];
		const palette = settings?.__experimentalFeatures?.color?.palette;

		const originalColors = palette?.custom ? palette?.theme : undefined;

		return { colors: colors, originalColors: originalColors };
	}, []);

	const mergedThemeColors = useMemo(
		() => [...(themeAllColors.originalColors || []), ...(themeAllColors.colors || [])],
		[themeAllColors.originalColors, themeAllColors.colors]
	);

	// Get Global Colors.
	const getPresetColors = useSelect((_select) => _select("smartpost/global-settings")?.getPresetColors(), []);
	const getCustomColors = useSelect((_select) => _select("smartpost/global-settings")?.getCustomColors(), []);
	useEffect(() => {
		const colorMap = {};
		const presetColors = getPresetColors?.map((item) => ({
			...item,
			colorRoot: `var(--smart-post-${item.slug.toLowerCase().replaceAll("_", "-")})`,
		}));
		const customColors = getCustomColors?.map((item) => ({
			...item,
			colorRoot: `var(--smart-post-${item.slug.toLowerCase().replaceAll("_", "-")})`,
		}));
		if (presetColors?.length > 0 || customColors?.length > 0) {
			[...presetColors, ...customColors].forEach((c) => (colorMap[c.colorRoot] = c.color));
			setGlobalColor({
				presetColors: presetColors,
				customColors: customColors,
				colorMap: colorMap,
			});
		}
	}, [getPresetColors, getCustomColors]);

	const colorPickerValue = (pickerValue) => {
		if (pickerValue?.startsWith("#")) {
			return pickerValue;
		}
		return globalColor?.colorMap?.[pickerValue] || "";
	};

	const handleColorChange = (_value) => {
		if (colorType && typeof attributes?.[colorType] !== "undefined") {
			setAttributes({
				[attributesKey]: { ...attributes, [colorType]: _value },
			});
		} else {
			setAttributes({ [attributesKey]: _value });
		}
	};

	const setDefault = () => {
		if (onChange) {
			onChange(defaultColor);
		} else {
			handleColorChange(defaultColor);
		}
	};

	useEffect(() => {
		const clickOutSite = (e) => {
			const target = e.target.closest(".sp-smart-post-picker-pallet-wrapper");
			const buttonTarget = e.target.closest(".sp-smart-post-color-picker-right-area .sp-color-picker-btn");
			const familyTarget = e.target.closest(".css-1nmdiq5-menu");
			if (!target && isVisible && !buttonTarget && !familyTarget) {
				setIsVisible(false);
			}
		};
		window.addEventListener("click", clickOutSite);

		return () => window.removeEventListener("click", clickOutSite);
	});
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
	const SpGlobalColors =
		Object?.keys(globalColor).length > 0 ? [...globalColor?.presetColors, ...globalColor?.customColors] : [];

	return (
		<div className={`sp-smart-post-color-picker sp-smart-post-component-mb${pro ? " sp-is-pro" : ""}`}>
			<p className="sp-smart-post-component-title">
				{label}
				{pro && <a target="_blank" href={priceLink} className="sp-smart-pro-text">(Pro)</a>}
			</p>
			<div className="sp-smart-post-color-picker-right-area">
				{resetButton && (
					<Button className="sp-smart-post-header-control-reset" onClick={() => setDefault()}>
						<ResetIcon />
					</Button>
				)}
				<Button className="sp-color-picker-btn" onClick={() => toggleVisible()}>
					<ColorIndicator colorValue={value} />
				</Button>

				{isVisible && (
					<Popover shift={true} focusOnMount={false}>
						<div className={`sp-smart-post-picker-pallet-wrapper`}>
							<ColorPicker
								color={colorPickerValue(value)}
								onChange={onChange || handleColorChange}
								enableAlpha
							/>
							<p className="sp-default-color-pallet sp-default-theme-color">Theme Color</p>
							<ul className="sp-smart-post-color-picker-palette">
								{mergedThemeColors?.map((item, i) => (
									<Tooltip key={i} text={item?.name}>
										<li
											style={{
												backgroundColor: item.color,
											}}
											className={`${item.color === activeColor ? "active" : ""}`}
										>
											<Button
												aria-label={item.name}
												onClick={() =>
													onChange ? onChange(item.color) : handleColorChange(item.color)
												}
												value={item.color}
											/>
										</li>
									</Tooltip>
								))}
							</ul>
							{SpGlobalColors?.length > 0 && (
								<>
									<div className="sp-default-color-pallet-header sp-d-flex sp-space-between">
										<p className="sp-default-color-pallet sp-default-smart-color">Smart Color</p>
										<span
											className="sp-global-settings sp-right sp-pointer"
											onClick={handleGlobalSettings}
										>
											<GlobalIcon />
										</span>
									</div>
									<ul className="sp-smart-post-color-picker-palette">
										{SpGlobalColors?.map((item, i) => (
											<Tooltip key={i} text={item?.name}>
												<li
													style={{
														backgroundColor: item.colorRoot,
													}}
													className={`${item.colorRoot === activeColor ? "active" : ""}`}
												>
													<Button
														aria-label={item.name}
														onClick={() =>
															onChange
																? onChange(item.colorRoot)
																: handleColorChange(item.colorRoot)
														}
													/>
												</li>
											</Tooltip>
										))}
									</ul>
								</>
							)}
							{/* { globalColor?.customColors.length > 0 && (
								<>
									<p className="sp-default-color-pallet sp-default-smart-color sp-left">
										Custom Color
									</p>
									<ul className="sp-smart-post-color-picker-palette">
										{ globalColor?.customColors?.map(
											( item, i ) => (
												<li
													key={ i }
													style={ {
														backgroundColor:
															item.colorRoot,
													} }
													className={ `${
														item.colorRoot ===
														activeColor
															? 'active'
															: ''
													}` }
												>
													<Button
														aria-label={
															'smart post custom color'
														}
														onClick={ () =>
															onChange
																? onChange(
																		item.colorRoot
																  )
																: handleColorChange(
																		item.colorRoot
																  )
														}
													/>
												</li>
											)
										) }
									</ul>
								</>
							) } */}
						</div>
					</Popover>
				)}
			</div>
		</div>
	);
};

export default memo(SpColorPicker);
