import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import SharedInspectors from "../shared/inspectors";
import { PostGridGeneralTab } from "./generalTab";
import { usePanelBodyContext } from "../../context";

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
					<PostGridGeneralTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<SharedInspectors
				attributes={attributes}
				setAttributes={setAttributes}
				openedAccordion={openPanel}
				togglePanelBody={togglePanelBody}
			/>
		</>
	);
};

export default Inspector;
