import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import { ColumnAdvanceAdvancedTab, ColumnAdvancedGeneralTab, ContainerColumnGeneralTab } from "./generalTab";
import { ColumnAdvanceVisibilityTab, ContainerColumnStyleTab } from "./styleTab";

export const Inspector = ({ attributes, setAttributes }) => {
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
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					GeneralTab={ContainerColumnGeneralTab}
					StyleTab={ContainerColumnStyleTab}
				/>
			</PanelBody>
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={togglePanel === "advanced"}
				onToggle={(value) => toggleHandler(value, "advanced")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					displayIcon={false}
					GeneralTab={ColumnAdvancedGeneralTab}
					VisibilityTab={ColumnAdvanceVisibilityTab}
					AdvancedTab={ColumnAdvanceAdvancedTab}
				/>
			</PanelBody>
		</>
	);
};
