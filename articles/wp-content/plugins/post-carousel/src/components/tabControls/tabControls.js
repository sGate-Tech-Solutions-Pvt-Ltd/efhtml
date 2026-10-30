import { TabPanel } from "@wordpress/components";
import { GeneralIcon, StyleIcon, AdvancedIcon, SliderIcon, LayoutsIcon, CarouselIcon } from "./icon";
import "./editor.scss";
import { useState } from "@wordpress/element";

const TabControls = ({
	attributes,
	setAttributes,
	GeneralTab = null,
	StyleTab = null,
	AdvancedTab = null,
	VisibilityTab = null,
	SliderTab = null,
	displayIcon = true,
	props = "",
	verticalPosition = true,
	Preset = null,
	LayoutTab = null,
	CarouselTab = null,
	initialTab = "general",
}) => {
	const Tabs = [];
	const [tabName, setTabName] = useState(initialTab);

	if (LayoutTab) {
		Tabs.push({
			name: `layout`,
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <GeneralIcon />} Layouts</span>,
			className: "sp-smart-post-general-tab",
		});
	}

	if (CarouselTab) {
		Tabs.push({
			name: `carousel`,
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <StyleIcon />} Carousel</span>,
			className: "sp-smart-post-general-tab",
		});
	}

	if (GeneralTab) {
		Tabs.push({
			name: `general`,
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <GeneralIcon />} General</span>,
			className: "sp-smart-post-general-tab",
		});
	}
	if (Preset) {
		Tabs.push({
			name: "preset",
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <GeneralIcon />} Preset</span>,
			className: "sp-smart-post-preset-tab",
		});
	}
	if (StyleTab) {
		Tabs.push({
			name: `style`,
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <StyleIcon />} Style</span>,
			className: "sp-smart-post-style-tab",
		});
	}

	if (VisibilityTab) {
		Tabs.push({
			name: "visibility",
			title: <span className="sp-smart-post-tab-panel-title">Visibility</span>,
			className: "sp-smart-post-visibility-tab",
		});
	}

	if (AdvancedTab) {
		Tabs.push({
			name: "advanced",
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <AdvancedIcon />} Advanced</span>,
			className: "sp-smart-post-advanced-tab",
		});
	}

	if (SliderTab) {
		Tabs.push({
			name: "slider",
			title: <span className="sp-smart-post-tab-panel-title">{displayIcon && <SliderIcon />} Slider</span>,
			className: "sp-smart-post-advanced-tab",
		});
	}

	return (
		<TabPanel
			className="sp-smart-post-tab-panel"
			activeClass="active-tab"
			initialTabName={tabName}
			onSelect={(newVal) => setTabName(newVal)}
			tabs={Tabs}
		>
			{(tab) => {
				return (
					<>
						{tab.name === "layout" && LayoutTab && (
							<LayoutTab
								attributes={attributes}
								verticalPosition={verticalPosition}
								setAttributes={setAttributes}
								props={props}
							/>
						)}
						{tab.name === "carousel" && CarouselTab && (
							<CarouselTab
								attributes={attributes}
								verticalPosition={verticalPosition}
								setAttributes={setAttributes}
								props={props}
							/>
						)}
						{tab.name === "general" && GeneralTab && (
							<GeneralTab
								attributes={attributes}
								verticalPosition={verticalPosition}
								setAttributes={setAttributes}
								props={props}
							/>
						)}
						{tab.name === "style" && StyleTab && (
							<StyleTab attributes={attributes} setAttributes={setAttributes} props={props} />
						)}
						{tab.name === "visibility" && VisibilityTab && (
							<VisibilityTab attributes={attributes} setAttributes={setAttributes} props={props} />
						)}

						{tab.name === "preset" && Preset && (
							<Preset attributes={attributes} setAttributes={setAttributes} props={props} />
						)}
						{tab.name === "advanced" && AdvancedTab && (
							<AdvancedTab attributes={attributes} setAttributes={setAttributes} props={props} />
						)}
						{tab.name === "slider" && SliderTab && (
							<SliderTab attributes={attributes} setAttributes={setAttributes} props={props} />
						)}
					</>
				);
			}}
		</TabPanel>
	);
};

export default TabControls;
