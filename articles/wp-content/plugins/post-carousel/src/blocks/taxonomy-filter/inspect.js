import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import GeneralTab from "./generalTab";
import StyleTab from "./styleTab";
import { TabControls } from "../../components";
import { AdvancedTab } from "../shared/advancedTab";
import { useState } from "@wordpress/element";

const Inspector = ({ attributes, setAttributes }) => {
	const [openPanel, setOpenPanel] = useState("general");
	const toggleHandler = (value, panel) => {
		if (value) {
			setOpenPanel(panel);
		} else {
			setOpenPanel("");
		}
	};
	return (
		<>
			<PanelBody
				title={__("Taxonomy Filter", "post-carousel")}
				initialOpen={true}
				opened={openPanel === "general"}
				onToggle={(value) => toggleHandler(value, "general")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					GeneralTab={GeneralTab}
					StyleTab={StyleTab}
				/>
			</PanelBody>
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advance"}
				onToggle={(value) => toggleHandler(value, "advance")}
			>
				<AdvancedTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
		</>
	);
};

export default Inspector;
