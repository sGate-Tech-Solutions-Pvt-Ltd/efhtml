import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import SharedInspectors from "../shared/inspectors";
import TabControls from "../../components/tabControls/tabControls";
import { PostThumbnailCarouselTab, PostThumbnailsLayoutTab } from "./generalTab";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();

	return (
		<>
			<PanelBody
				title={__("Thumbnails Slider", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={PostThumbnailsLayoutTab}
						SliderTab={PostThumbnailCarouselTab}
					/>
				)}
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
