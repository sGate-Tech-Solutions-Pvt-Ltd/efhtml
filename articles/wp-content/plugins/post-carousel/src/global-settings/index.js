/**
 * WordPress dependencies
 */
import { registerPlugin } from "@wordpress/plugins";
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useCallback, useMemo, useRef } from "@wordpress/element";
import { dispatch, useSelect, useDispatch, createReduxStore, register } from "@wordpress/data";
import "./editor.scss";

import { PanelBody, Button, Notice, __experimentalPaletteEdit as PaletteEdit } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import domReady from "@wordpress/dom-ready";
import { SPToggleGroupControl } from "../components";
import { DefaultPresetAttr, generateRootCSS } from "./default-settings";
import { breakpointDefault, globalTypographyDefault, shadowDefaultList } from "./defaultConstant";
import { SmartPostShowLogoIcon } from "../icons/icons";

import TypographySettings from "./typography/typography";
import ShadowSettings from "./shadow/shadow";
import Breakpoint from "./breakpoint/breakpoint";
import CustomCss from "./custom-css/customCss";
import { googleFonts } from "../controls/controls";
import { useEditorSaveStatus } from "../hooks/useEditorSaveStatus";

// ============================================================================
// Constants & Helpers
// ============================================================================

const colorStacks = DefaultPresetAttr("colorStacks");

const COLOR_KEYS = [
	{ name: "Light (Text)", slug: "light-text" },
	{ name: "Background", slug: "background" },
	{ name: "Primary Light", slug: "primary-light" },
	{ name: "Primary", slug: "primary" },
	{ name: "Primary Dark", slug: "primary-dark" },
	{ name: "Secondary", slug: "secondary" },
	{ name: "Dark 2 (Text)", slug: "dark-2-text" },
	{ name: "Dark (Text)", slug: "dark-text" },
	{ name: "Black", slug: "black" },
];

const mapColorStackToPreset = (stackColors) => {
	return stackColors.map((color, index) => ({
		name: COLOR_KEYS[index]?.name || `color-${index}`,
		slug: COLOR_KEYS[index]?.slug || `color-${index}`,
		color,
	}));
};

function normalizeGradient(gradient) {
	if (!gradient) {
		return "";
	}
	return gradient
		.toLowerCase()
		.replace(/\s+/g, "")
		.replace(/(\d+)\.0+deg/g, "$1deg");
}

// ============================================================================
// Default Settings
// ============================================================================

const DEFAULT_SETTINGS = {
	colors: {
		defaultColors: mapColorStackToPreset(colorStacks?.color_type_1),
		selectedColorStack: "color_type_1",
		presetColors: [],
		customColors: [],
		defaultGradient: [
			{
				name: "Ocean Breeze",
				gradient: "linear-gradient(46deg,rgb(0,97,255) 4%,rgb(96,239,255) 93%)",
				slug: "ocean_breeze",
			},
			{
				name: "Cosmic Fusion",
				gradient: "linear-gradient(46deg,rgb(232,28,255) 4%,rgb(64,201,255) 93%)",
				slug: "cosmic_fusion",
			},
			{
				name: "Sunset Blaze",
				gradient: "linear-gradient(46deg,rgb(255,15,123) 4%,rgb(248,155,41) 93%)",
				slug: "sunset_blaze",
			},
			{
				name: "Dreamy Violet",
				gradient: "linear-gradient(46deg,rgb(211,151,250) 4%,rgb(131,100,232) 93%)",
				slug: "dreamy_violet",
			},
			{
				name: "Peach Bloom",
				gradient: "linear-gradient(46deg,rgb(246,213,247) 4%,rgb(251,233,215) 93%)",
				slug: "peach_bloom",
			},
			{
				name: "Aqua Depths",
				gradient: "linear-gradient(46deg,rgb(0,173,181) 4%,rgb(9,95,92) 93%)",
				slug: "aqua_depths",
			},
			{
				name: "Midnight Steel",
				gradient: "linear-gradient(46deg,rgb(36,55,72) 4%,rgb(75,116,159) 93%)",
				slug: "midnight_steel",
			},
		],
		customGradients: [],
	},
	typography: globalTypographyDefault,
	shadow: shadowDefaultList,
	breakpoint: breakpointDefault,
	customCss: "",
	rootcss:
		":root{  --sp-smart-breakpoint-tablet: 1023px; --sp-smart-breakpoint-mobile: 767px; --smart-post-light-text: #FAFAFA; --smart-post-background: #FFFFFF; --smart-post-primary-light: #EBEBEB; --smart-post-primary: #999999; --smart-post-primary-dark: #1D1D1D; --smart-post-secondary: #0054FB; --smart-post-dark-2-text: #3E3E3E; --smart-post-dark-text: #0A0A0A; --smart-post-black: #000000;} :root {  --smart-post-shadow-subtle-1dp: 0px 1px 2px 0px rgba(0, 0, 0, 0.12); --smart-post-shadow-light-2dp: 0px 2px 4px 0px rgba(0, 0, 0, 0.14); --smart-post-shadow-medium-4dp: 0px 4px 6px 0px rgba(0, 0, 0, 0.16); --smart-post-shadow-strong-8dp: 0px 8px 18px 0px rgba(0, 0, 0, 0.18); --smart-post-shadow-deep-12dp: 0px 12px 17px 0px rgba(0, 0, 0, 0.20);  --smart-post-shadow-sharp-4dp: 4px 4px 0px 0px rgba(0, 0, 0, 0.25);}",
};

// ============================================================================
// Redux Store
// ============================================================================

const smartpostStore = createReduxStore("smartpost/global-settings", {
	reducer: (state = DEFAULT_SETTINGS, action) => {
		switch (action.type) {
			case "SET_SETTINGS":
				return {
					...state,
					...action.settings,
					_isDirty: false,
				};

			case "UPDATE_SETTING":
				const isComputedUpdate =
					action.isComputed ||
					(action.category === "typography" &&
						(action.key === "typographyCss" || action.key === "fontList")) ||
					(action.category === "shadow" && action.key === "shadowRootCSS") ||
					action.key === "rootcss";
				return {
					...state,
					[action.category]: {
						...state[action.category],
						[action.key]: action.value,
					},
					_isDirty: isComputedUpdate ? state._isDirty : true,
				};

			case "ADD_CUSTOM_COLOR":
				return {
					...state,
					colors: {
						...state.colors,
						customColors: [...state.colors.customColors, action.color],
					},
					_isDirty: true,
				};

			case "ADD_DEFAULT_COLOR":
				return {
					...state,
					colors: {
						...state.colors,
						// Changed from defaultColor to defaultColors.
						defaultColors: [...state.colors.defaultColors, action.color],
					},
					_isDirty: true,
				};

			case "SET_ROOT_CSS":
				return {
					...state,
					rootcss: action.css,
					_isDirty: state._isDirty,
				};

			case "SET_CUSTOM_CSS":
				return {
					...state,
					customCss: action.css,
					_isDirty: true,
				};

			case "REMOVE_CUSTOM_COLOR":
				return {
					...state,
					colors: {
						...state.colors,
						customColors: state.colors.customColors.filter((_, i) => i !== action.index),
					},
					_isDirty: true,
				};

			case "UPDATE_PRESET_COLORS":
				return {
					...state,
					colors: {
						...state.colors,
						presetColors: action.colors,
					},
					_isDirty: true,
				};

			case "SET_SELECTED_COLOR_STACK":
				return {
					...state,
					colors: {
						...state.colors,
						selectedColorStack: action.stackKey,
					},
					_isDirty: true,
				};

			default:
				return state;
		}
	},
	actions: {
		setSettings: (settings) => ({ type: "SET_SETTINGS", settings }),
		updateSetting: (category, key, value) => ({
			type: "UPDATE_SETTING",
			category,
			key,
			value,
		}),
		addCustomColor: (color) => ({ type: "ADD_CUSTOM_COLOR", color }),
		addDefaultColor: (color) => ({ type: "ADD_DEFAULT_COLOR", color }),
		removeCustomColor: (index) => ({
			type: "REMOVE_CUSTOM_COLOR",
			index,
		}),
		setRootCSS: (css) => ({ type: "SET_ROOT_CSS", css }),
		setCustomCSS: (css) => ({ type: "SET_CUSTOM_CSS", css }),
		updatePresetColors: (colors) => ({
			type: "UPDATE_PRESET_COLORS",
			colors,
		}),
		setSelectedColorStack: (stackKey) => ({
			type: "SET_SELECTED_COLOR_STACK",
			stackKey,
		}),
	},
	selectors: {
		getSettings: (state) => state,
		getSetting: (state, category, key) => state[category]?.[key],
		getCategory: (state, category) => state[category] || {},
		getSelectedColorStack: (state) => state.colors?.selectedColorStack,
		getPresetColors: (state) => state.colors?.presetColors || [],
		getCustomColors: (state) => state.colors?.customColors || [],
		getDefaultColors: (state) => state.colors?.defaultColors || [],
		getDefaultGradient: (state) => state.colors?.defaultGradient || [],
		getCustomGradients: (state) => state.colors?.customGradients || [],
		getRootCSS: (state) => state.rootcss || "",
		getCustomCSS: (state) => state.customCss || "",
		getAllColors: (state) => state.colors || [],
		isDirty: (state) => state._isDirty || false,
	},
});

register(smartpostStore);

// ============================================================================
// API Functions
// ============================================================================

const loadGlobalSettings = async () => {
	try {
		const fetchedSettings = await apiFetch({
			path: "/smart-post/v2/get-global-settings",
		});

		// Ensure we have a selected color stack
		const colorStacks = DefaultPresetAttr("colorStacks");
		const firstStackKey = Object.keys(colorStacks)[0];

		if (!fetchedSettings.colors?.selectedColorStack && firstStackKey) {
			// Changed from undefined 'settings' to 'fetchedSettings'
			fetchedSettings.colors = fetchedSettings.colors || {};
			fetchedSettings.colors.selectedColorStack = firstStackKey;
			fetchedSettings.colors.presetColors = mapColorStackToPreset(colorStacks[firstStackKey]);
		}
		if (!fetchedSettings.colors.defaultGradient) {
			fetchedSettings.colors.defaultGradient = DEFAULT_SETTINGS?.colors?.defaultGradient;
		}

		dispatch("smartpost/global-settings").setSettings(fetchedSettings);
		return fetchedSettings;
	} catch (error) {
		console.log("Failed to load settings:", error);
		// Initialize with first color stack as fallback.
		const colorStacks = DefaultPresetAttr("colorStacks");
		const firstStackKey = Object.keys(colorStacks)[0];
		const fallbackSettings = { ...DEFAULT_SETTINGS };

		if (firstStackKey) {
			fallbackSettings.colors.selectedColorStack = firstStackKey;
			fallbackSettings.colors.presetColors = mapColorStackToPreset(colorStacks[firstStackKey]);
		}

		dispatch("smartpost/global-settings").setSettings(fallbackSettings);
		return fallbackSettings;
	}
};

const saveGlobalSettings = async (settings) => {
	try {
		const updated = await apiFetch({
			path: "/smart-post/v2/global-settings",
			method: "POST",
			data: settings,
		});
		return updated;
	} catch (error) {
		console.log("Failed to save SmartPost settings:", error);
		// Return error object instead of throwing to allow graceful handling.
		return { error: true, message: error.message };
	}
};

// ============================================================================
// CSS Generation & Updates
// ============================================================================

const generateAllRootCSS = (settings) => {
	const cssParts = [];
	const globalFontFamily = settings?.typography?.fontList?.filter(item => {
		const [name] = item.split(":");
		return name.trim() !== "";
	});
	if (globalFontFamily) {
		const fontList = globalFontFamily?.map(
			(item) => `family=${item?.replaceAll(/[:\s]+/g, (match) => (match === ":" ? ":wght@" : "+"))}&`
		);
		const fontsCss = fontList?.length > 0 ? `@import url('https://fonts.googleapis.com/css2?${fontList.join("")}display=swap');` : "";

		cssParts.push(fontsCss);
	}

	if (settings?.typography?.typographyCss) {
		cssParts.push(settings.typography.typographyCss);
	}
	if (settings?.rootcss) {
		cssParts.push(settings.rootcss);
	}
	if (settings?.shadow?.shadowRootCSS) {
		cssParts.push(settings.shadow.shadowRootCSS);
	}
	if (settings?.customCss) {
		cssParts.push(settings.customCss);
	}

	return cssParts.join(" ");
};

// const updateRootCSS = (settings) => {
// 	const googleFonts = "";

// 	const css = generateAllRootCSS(settings);
// 	const existingTag = document.getElementById("sp-smart-post-global-root-inline-css");
// 	let styleTag = document.getElementById("sp-smart-post-global-root-inline-css-extra");

// 	if (!styleTag) {
// 		styleTag = document.createElement("style");
// 		styleTag.id = "sp-smart-post-global-root-inline-css-extra";
// 		if (existingTag && existingTag.parentNode) {
// 			// Insert new style tag immediately after the existing one
// 			existingTag.parentNode.insertBefore(styleTag, existingTag.nextSibling);
// 		}
// 	}
// 	styleTag.innerHTML = css;
// };
const updateRootCSS = (settings) => {
	const googleFonts = ""; // keep this if needed

	const css = generateAllRootCSS(settings);
	const existingTag = document.getElementById("sp-smart-post-global-root-inline-css");
	let styleTag = document.getElementById("sp-smart-post-global-root-inline-css-extra");

	// Insert CSS in Main Document
	if (!styleTag) {
		styleTag = document.createElement("style");
		styleTag.id = "sp-smart-post-global-root-inline-css-extra";
		if (existingTag && existingTag.parentNode) {
			existingTag.parentNode.insertBefore(styleTag, existingTag.nextSibling);
		} else {
			document.head.appendChild(styleTag);
		}
	}

	styleTag.innerHTML = css;

	// ---------------------------------------------
	// ADD CSS ALSO INSIDE THE GUTENBERG IFRAME
	// ---------------------------------------------
	const applyCssToIframe = (iframe) => {
		if (!iframe || !iframe.contentDocument) return;

		const iframeDoc = iframe.contentDocument;
		let iframeStyleTag = iframeDoc.getElementById("sp-smart-post-global-root-inline-css-extra");

		if (!iframeStyleTag) {
			iframeStyleTag = iframeDoc.createElement("style");
			iframeStyleTag.id = "sp-smart-post-global-root-inline-css-extra";
			iframeDoc.head?.appendChild(iframeStyleTag);
		}

		iframeStyleTag.innerHTML = css;
	};

	// Detect Gutenberg iframe (current WP versions)
	// Gutenberg canvas iframe usually looks like:
	// iframe[name="editor-canvas"] OR div.editor-styles-wrapper iframe
	const iframeSelectors = ['iframe[name="editor-canvas"]', ".editor-styles-wrapper iframe", "iframe.editor-canvas"];

	iframeSelectors.forEach((selector) => {
		const iframe = document.querySelector(selector);
		if (iframe) applyCssToIframe(iframe);
	});

	// If iframe loads later (React re-renders), observe and reapply
	const observer = new MutationObserver(() => {
		iframeSelectors.forEach((selector) => {
			const iframe = document.querySelector(selector);
			if (iframe) applyCssToIframe(iframe);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

// ============================================================================
// Color Settings Component
// ============================================================================

const ColorSettings = () => {
	const {
		selectedColorStack,
		presetColors,
		customColors,
		defaultGradient: storedDefaultGradient,
		customGradients,
		allColors,
		breakPoint,
	} = useSelect((select) => {
		const store = select("smartpost/global-settings");
		return {
			selectedColorStack: store.getSelectedColorStack(),
			presetColors: store.getPresetColors(),
			customColors: store.getCustomColors(),
			defaultGradient: store.getDefaultGradient(),
			customGradients: store.getCustomGradients(),
			allColors: store.getAllColors(),
			breakPoint: store.getCategory("breakpoint"),
		};
	}, []);

	const { updateSetting, setSelectedColorStack, updatePresetColors, setRootCSS } =
		useDispatch("smartpost/global-settings");
	const [selectedTab, setSelectedTab] = useState("solid");
	// Memoize base gradient to prevent recreating on every render
	const baseGradient = useMemo(() => DEFAULT_SETTINGS?.colors?.defaultGradient, []);
	// Use fallback if default gradient is empty.
	const defaultGradient = !storedDefaultGradient?.length ? baseGradient : storedDefaultGradient;

	const handleColorStackSelection = useCallback(
		(stackKey, stackColors) => {
			setSelectedColorStack(stackKey);
			const mappedPresetColors = mapColorStackToPreset(stackColors);
			updatePresetColors(mappedPresetColors);
		},
		[setSelectedColorStack, updatePresetColors]
	);

	const popoverProps = useMemo(
		() => ({
			placement: "bottom",
			offset: 36,
			shift: true,
			flip: true,
		}),
		[]
	);

	// Better dependency management for CSS generation
	useEffect(() => {
		if (allColors) {
			const generatedCSS = generateRootCSS(allColors, breakPoint);
			setRootCSS(generatedCSS);
		}
	}, [allColors, breakPoint, setRootCSS]);
	const tabs = useMemo(
		() => [
			{
				name: "solid",
				label: __("Solid", "post-carousel"),
				value: "solid",
			},
			{
				name: "gradient",
				label: __("Gradient", "post-carousel"),
				value: "gradient",
			},
		],
		[]
	);

	return (
		<PanelBody className="sp-smart-post-color-settings" title={__("Color Palette", "post-carousel")}>
			<SPToggleGroupControl attributes={selectedTab} attributesKey="" onClick={setSelectedTab} items={tabs} />

			{selectedTab === "solid" && (
				<div>
					<p className="sp-smart-post-setting-title" style={{ fontSize: "13px", marginBottom: "8px" }}>
						{__("Color Palettes", "post-carousel")}
					</p>
					<div className="smart-post-global-content">
						{Object.keys(colorStacks).map((stackKey) => (
							<div
								key={stackKey}
								onClick={() => handleColorStackSelection(stackKey, colorStacks[stackKey])}
								style={{ cursor: "pointer" }}
								className={`smart-post-global-current-content ${
									selectedColorStack === stackKey ? "selected" : ""
								}`}
							>
								<div className="smart-post-preset-color-show">
									{colorStacks[stackKey]
										// .slice(0, Math.ceil(colorStacks[stackKey].length / 2))
										.filter((_, i) => i === 0 || i % 2 !== 0)
										.map((color, i) => (
											<span
												key={i}
												className="smart-post-global-color"
												style={{
													backgroundColor: color,
												}}
											/>
										))}
								</div>
							</div>
						))}
					</div>

					{presetColors.length > 0 && (
						<PaletteEdit
							colors={presetColors}
							paletteLabel={__("Colors", "post-carousel")}
							onChange={(newColors) => {
								updatePresetColors(newColors);
								updateSetting("colors", "defaultColors", newColors);
							}}
							canOnlyChangeValues
							paletteLabelHeadingLevel={3}
							popoverProps={popoverProps}
						/>
					)}

					<PaletteEdit
						colors={customColors || []}
						onChange={(newColors) => {
							updateSetting("colors", "customColors", newColors || []);
						}}
						paletteLabel={__("Custom", "post-carousel")}
						paletteLabelHeadingLevel={3}
						slugPrefix="custom-"
						popoverProps={popoverProps}
					/>
				</div>
			)}

			{selectedTab === "gradient" && (
				<div>
					{/* <h3>{ __( "Gradients", "post-carousel" ) }</h3> */}
					<PaletteEdit
						canReset={
							normalizeGradient(JSON.stringify(baseGradient)) !==
							normalizeGradient(JSON.stringify(defaultGradient))
						}
						defaultPalette={baseGradient}
						gradients={defaultGradient}
						onChange={(newColors) => {
							updateSetting("colors", "defaultGradient", !newColors?.length ? baseGradient : newColors);
						}}
						paletteLabel={__("Gradients", "post-carousel")}
						paletteLabelLevel={3}
						popoverProps={popoverProps}
						hideAddButton
						canOnlyChangeValues
					/>
					<PaletteEdit
						gradients={customGradients || []}
						onChange={(newGradients) => {
							updateSetting("colors", "customGradients", newGradients || []);
						}}
						paletteLabel={__("Custom", "post-carousel")}
						paletteLabelLevel={3}
						slugPrefix="custom-gradient-"
						popoverProps={popoverProps}
					/>
				</div>
			)}
		</PanelBody>
	);
};

// ============================================================================
// Global Settings Component
// ============================================================================

const GlobalSettings = () => {
	const [userCanManageOptions] = useState(true);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState(null);

	// Use ref to track if save was triggered by post save
	const saveTimeoutRef = useRef(null);
	const lastSaveRef = useRef(null);

	const { isSaving } = useEditorSaveStatus();
	const { isDirty } = useSelect((select) => {
		const settingsStore = select("smartpost/global-settings");
		return {
			isDirty: settingsStore.isDirty(),
		};
	});

	const settings = useSelect((select) => select("smartpost/global-settings").getSettings(), []);
	useEffect(() => {
		if (!loading && settings) {
			updateRootCSS(settings);
		}
	}, [settings, loading]);
	// Load settings on mount
	useEffect(() => {
		const initSettings = async () => {
			try {
				await loadGlobalSettings();
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log("Failed to initialize settings:", error);
			} finally {
				setLoading(false);
			}
		};
		initSettings();
	}, []);

	// Stable save function using useCallback
	const handleSave = useCallback(async () => {
		if (saving) {
			return;
		}

		setSaving(true);
		setSaveStatus(null);

		try {
			const result = await saveGlobalSettings(settings);

			if (result?.error) {
				setSaveStatus("error");
			} else {
				updateRootCSS(settings);
				setSaveStatus("success");
				lastSaveRef.current = Date.now();
				// Reset dirty state after successful save
				dispatch("smartpost/global-settings").setSettings({
					...settings,
					_isDirty: false,
				});
				// Clear success message after 3 seconds
				if (saveTimeoutRef.current) {
					clearTimeout(saveTimeoutRef.current);
				}
				saveTimeoutRef.current = setTimeout(() => {
					setSaveStatus(null);
				}, 3000);
			}
		} catch (error) {
			console.log("Save error:", error);
			setSaveStatus("error");
		} finally {
			setSaving(false);
		}
	}, [settings, saving]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isSaving && !saving) {
			// Debounce saves to prevent multiple rapid saves
			const now = Date.now();
			if (!lastSaveRef.current || now - lastSaveRef.current > 1000) {
				handleSave();
			}
		}
	}, [isSaving, saving]);

	const PluginSidebar =
		window.wp.editor?.PluginSidebar || window.wp.editSite?.PluginSidebar || window.wp.editPost?.PluginSidebar;

	if (!PluginSidebar || !userCanManageOptions) {
		return null;
	}

	return (
		<PluginSidebar
			name="sidebar"
			title={__("SmartPost Global Settings", "post-carousel")}
			className="smart-post-global-settings__inspector sp-smart-post-tab-panel"
			icon={<SmartPostShowLogoIcon />}
		>
			<div>
				<PanelBody>
					<div style={{ textAlign: "center" }}>
						<Button
							variant="primary"
							isBusy={saving}
							disabled={saving || !isDirty}
							onClick={handleSave}
							style={{
								minWidth: "100%",
								display: "inline-block",
							}}
						>
							{saving ? __("Saving.", "post-carousel") : __("Save Settings", "post-carousel")}
						</Button>
					</div>
				</PanelBody>

				{loading && (
					<Notice status="info" isDismissible={false}>
						{__("Loading settings.", "post-carousel")}
					</Notice>
				)}

				{saveStatus === "error" && (
					<Notice status="error" isDismissible={false}>
						{__("Failed to save settings. Please try again.", "post-carousel")}
					</Notice>
				)}

				{!loading && (
					<div className="sp-smart-post-tab-panel">
						<ColorSettings />
						<TypographySettings />
						<ShadowSettings />
						<Breakpoint />
						<CustomCss />
					</div>
				)}
			</div>
		</PluginSidebar>
	);
};

// ============================================================================
// Plugin Registration
// ============================================================================

domReady(() => {
	registerPlugin("smart-post-show-pro-global-settings", {
		render: GlobalSettings,
	});

	// Export global helper
	window.SmartPostSettings = {
		getSettings: () => wp.data.select("smartpost/global-settings").getSettings(),
		getSetting: (category, key) => wp.data.select("smartpost/global-settings").getSetting(category, key),
		getColors: () => wp.data.select("smartpost/global-settings").getCategory("colors"),
		getTypography: () => wp.data.select("smartpost/global-settings").getCategory("typography"),
		getSelectedColorStack: () => wp.data.select("smartpost/global-settings").getSelectedColorStack(),
		getPresetColors: () => wp.data.select("smartpost/global-settings").getPresetColors(),
		getCustomColors: () => wp.data.select("smartpost/global-settings").getCustomColors(),
	};
});
