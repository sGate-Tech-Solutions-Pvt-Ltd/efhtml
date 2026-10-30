import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import { HeadingStyle, StyleTab } from "./styleTab";
import { GeneralTab, HeadingTab } from "./generalTab";
// import { useState } from "@wordpress/element";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();

	return (
		<>
			<PanelBody
				title={__("Smart Frontend Filter", "post-carousel")}
				initialOpen={true}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={GeneralTab}
						StyleTab={StyleTab}
					/>
				)}
			</PanelBody>

			{attributes.layout === "layoutTwo" && (
				<PanelBody
					title={__("Heading", "post-carousel")}
					initialOpen={true}
					opened={openPanel === "heading"}
					onToggle={() => togglePanelBody("heading")}
				>
					{openPanel === "heading" && (
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={HeadingTab}
							StyleTab={HeadingStyle}
						/>
					)}
				</PanelBody>
			)}

			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advance"}
				onToggle={() => togglePanelBody("advance")}
			>
				{openPanel === "advance" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={VisibilityTab}
						AdvancedTab={AdvancedTab}
						displayIcon={ false }
					/>
				)}
			</PanelBody>
		</>
	);
};

export default Inspector;
