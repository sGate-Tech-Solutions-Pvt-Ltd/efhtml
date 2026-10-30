import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { SPRangeControl, TabControls } from "../../components";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";

import { PresetToc, TocCollapsibleGeneral, TocHeading, TocListBodyGeneral } from "./generalTabs";
import { StyleTab, TocCollapsibleStyleTab, TocHeadingStyleTab, TocListBodyStyleTab } from "./styleTab";
import { usePanelBodyContext } from "../../context";
import Toggle from "../../components/toggle/toggle";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const { blockName, smoothScroll, backToTop, offsetTop } = attributes;

	return (
		<>
			<PanelBody
				title={__("Preset", "post-carousel")}
				opened={openPanel === "preset"}
				onToggle={() => togglePanelBody("preset")}
			>
				{openPanel === "preset" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						Preset={PresetToc}
						StyleTab={StyleTab}
						displayIcon={true}
						blockName={blockName}
						initialTab={"preset"}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("TOC Heading", "post-carousel")}
				className="sp-smart-post-section-heading-block-panel-body"
				opened={openPanel === "heading"}
				onToggle={() => togglePanelBody("heading")}
			>
				{openPanel === "heading" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={TocHeading}
						StyleTab={TocHeadingStyleTab}
						displayIcon={true}
						blockName={blockName}
					/>
				)}
			</PanelBody>

			<PanelBody
				opened={openPanel === "tocBody"}
				onToggle={() => togglePanelBody("tocBody")}
				title={__("TOC List Body", "post-carousel")}
				className="sp-smart-post-section-heading-block-panel-body"
			>
				{openPanel === "tocBody" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={TocListBodyGeneral}
						StyleTab={TocListBodyStyleTab}
						displayIcon={true}
						blockName={blockName}
					/>
				)}
			</PanelBody>

			<PanelBody
				opened={openPanel === "collapsible"}
				onToggle={() => togglePanelBody("collapsible")}
				title={__("Collapsible", "post-carousel")}
				className="sp-smart-post-section-heading-block-panel-body"
			>
				{openPanel === "collapsible" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={TocCollapsibleGeneral}
						StyleTab={TocCollapsibleStyleTab}
						displayIcon={true}
						blockName={blockName}
					/>
				)}
			</PanelBody>

			<PanelBody
				opened={openPanel === "scroll"}
				onToggle={() => togglePanelBody("scroll")}
				title={__("Scroll", "post-carousel")}
				className="sp-smart-post-section-heading-block-panel-body"
			>
				<Toggle
					label={__("Smooth Scroll", "post-carousel")}
					attributes={smoothScroll}
					attributesKey={"smoothScroll"}
					setAttributes={setAttributes}
				/>

				<SPRangeControl
					label={__("Offset Top", "post-carousel")}
					setAttributes={setAttributes}
					attributes={offsetTop}
					max={200}
					min={1}
					attributesKey={"offsetTop"}
					defaultValue={{ unit: "", value: 50 }}
				/>
				{/* <Toggle
					label={__("Back to Top", "post-carousel")}
					attributes={backToTop}
					attributesKey={"backToTop"}
					setAttributes={setAttributes}
				/> */}
				
			</PanelBody>

			<PanelBody
				opened={openPanel === "advanced"}
				onToggle={() => togglePanelBody("advanced")}
				title={__("Advanced", "post-carousel")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					AdvancedTab={AdvancedTab}
					VisibilityTab={VisibilityTab}
					displayIcon={false}
					initialTab={"visibility"}
				/>
			</PanelBody>
		</>
	);
};

export default Inspector;
