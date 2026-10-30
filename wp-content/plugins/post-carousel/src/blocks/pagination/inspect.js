import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import { PaginationGeneralTab } from "../shared/generalTab";
import { PaginationStyleTab } from "../shared/styleTab";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";
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
			<PanelBody title={__("Pagination", "post-carousel")} initialOpen={true}>
				{/* <div className="sp-smart-post-single-inspector"> */}
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					GeneralTab={PaginationGeneralTab}
					StyleTab={PaginationStyleTab}
				/>
				{/* </div> */}
			</PanelBody>
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advance"}
				onToggle={(value) => toggleHandler(value, "advance")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					GeneralTab={VisibilityTab}
					AdvancedTab={AdvancedTab}
				/>
			</PanelBody>
		</>
	);
};

export default Inspector;
