import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import TabControls from "../../components/tabControls/tabControls";
import { SmartImageBackgroundTab, SmartImageCaptionTab, SmartImageEffectTab, SmartImageGeneralTab } from "./generalTab";
import { SmartImageStyleTab } from "./styleTab";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";
import { useState } from "@wordpress/element";

const Inspector = ({ attributes, setAttributes }) => {
	const [togglePanel, setTogglePanel] = useState("general");

	const toggleHandler = (toggleVal, tabName) => {
		setTogglePanel(toggleVal ? tabName : "");
	};

	return (
		<>
			<PanelBody
				title={__("Image", "post-carousel")}
				opened={togglePanel === "general"}
				onToggle={(value) => toggleHandler(value, "general")}
				initialOpen={true}
			>
				{togglePanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={SmartImageGeneralTab}
						StyleTab={SmartImageStyleTab}
					/>
				)}
			</PanelBody>
			{/** TODO: All Image Masking Option In Next Version. */}
			{/* <PanelBody
				title={ __( 'Image Masking', 'post-carousel' ) }
				opened={ togglePanel === 'masking' }
				onToggle={ () => togglePanelBody( 'masking' ) }
			>
				{ togglePanel === 'masking' && (
					<SmartImageMaskingGeneralTab
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
			</PanelBody> */}
			<PanelBody
				title={__("Background", "post-carousel")}
				opened={togglePanel === "background"}
				onToggle={(value) => toggleHandler(value, "background")}
			>
				{togglePanel === "background" && (
					<SmartImageBackgroundTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Title and Caption", "post-carousel")}
				opened={togglePanel === "caption"}
				onToggle={(value) => toggleHandler(value, "caption")}
			>
				{togglePanel === "caption" && (
					<SmartImageCaptionTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Hover Effect", "post-carousel")}
				opened={togglePanel === "effect"}
				onToggle={(value) => toggleHandler(value, "effect")}
			>
				{togglePanel === "effect" && (
					<SmartImageEffectTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={togglePanel === "advanced"}
				onToggle={(value) => toggleHandler(value, "advanced")}
			>
				{togglePanel === "advanced" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						VisibilityTab={VisibilityTab}
						AdvancedTab={AdvancedTab}
						initialTab={"visibility"}
						displayIcon={false}
					/>
				)}
			</PanelBody>
		</>
	);
};

export default Inspector;
