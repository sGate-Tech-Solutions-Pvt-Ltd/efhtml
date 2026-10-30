import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { usePanelBodyContext } from "../../context";
import { TabControls } from "../../components";

import {
	SmartListsGeneralTab,
	SmartListsStyleTab,
	IconImageGeneralTab,
	IconImageStyleTab,
	ContentGeneralTab,
	ContentStyleTab,
} from "./generalTab";

import { VisibilityTab, AdvancedTab } from "../shared/advancedTab";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={SmartListsGeneralTab}
						GeneralTabTitle="Presets"
						StyleTab={SmartListsStyleTab}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("Icon / Image", "post-carousel")}
				opened={openPanel === "icon-image"}
				onToggle={() => togglePanelBody("icon-image")}
			>
				{openPanel === "icon-image" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={IconImageGeneralTab}
						StyleTab={IconImageStyleTab}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("Content", "post-carousel")}
				opened={openPanel === "content"}
				onToggle={() => togglePanelBody("content")}
			>
				{openPanel === "content" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={ContentGeneralTab}
						StyleTab={ContentStyleTab}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advance"}
				onToggle={() => togglePanelBody("advance")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					displayIcon={false}
					initialTab="visibility"
					VisibilityTab={VisibilityTab}
					AdvancedTab={AdvancedTab}
				/>
			</PanelBody>
		</>
	);
};

export default Inspector;
