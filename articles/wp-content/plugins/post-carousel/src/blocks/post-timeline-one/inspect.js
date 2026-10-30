import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import SharedInspectors from "../shared/inspectors";
import { PostTimelineGeneralTab } from "./generalTab";
import { PostTimelineConnectorStyleTab } from "../shared/styleTab";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes, isSelected }) => {
	// const { togglePanelBody, openedAccordion } = manageOpenAccordion();
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
					<PostTimelineGeneralTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Timeline Connector", "post-carousel")}
				opened={openPanel === "timelineConnector"}
				onToggle={() => togglePanelBody("timelineConnector")}
			>
				<PostTimelineConnectorStyleTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<SharedInspectors
				attributes={attributes}
				setAttributes={setAttributes}
				togglePanelBody={togglePanelBody}
				openedAccordion={openPanel}
			/>
		</>
	);
};

export default Inspector;
