import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { TabControls } from "../../components";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";
import { SmartBtnGeneralTab, SmartBtnIconTab, SmartBtnLabelTab } from "./sidebarControl";

const Inspector = ({ attributes, setAttributes }) => {
	const [togglePanel, setTogglePanel] = useState("general");

	const toggleHandler = (toggleVal, tabName) => {
		setTogglePanel(toggleVal ? tabName : "");
	};

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={togglePanel === "general"}
				onToggle={(value) => toggleHandler(value, "general")}
			>
				<SmartBtnGeneralTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<PanelBody
				title={__("Button Label", "post-carousel")}
				opened={togglePanel === "buttonLabel"}
				onToggle={(value) => toggleHandler(value, "buttonLabel")}
			>
				<SmartBtnLabelTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>

			<PanelBody
				title={__("Icon", "post-carousel")}
				className="sp-button-icon-panel-body"
				opened={togglePanel === "icon"}
				onToggle={(value) => toggleHandler(value, "icon")}
			>
				<SmartBtnIconTab attributes={attributes} setAttributes={setAttributes} />
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
						AdvancedTab={AdvancedTab}
						VisibilityTab={VisibilityTab}
						displayIcon={false}
						initialTab={"visibility"}
					/>
				)}
			</PanelBody>
		</>
	);
};

export default Inspector;
