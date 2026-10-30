import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { usePanelBodyContext } from "../../context";
import TabControls from "../../components/tabControls/tabControls";

import {
	InfoBoxGeneralTab,
	InfoBoxStyleTab,
	IconImageGeneralTab,
	IconImageStyleTab,
	TitleGeneralTab,
	TitleStyleTab,
	DescriptionGeneralTab,
	DescriptionStyleTab,
	BadgeGeneralTab,
	BadgeStyleTab,
	RatingGeneralTab,
	RatingStyleTab,
	CallToActionGeneralTab,
	CallToActionStyleTab,
	SeparatorTab,
} from "./generalTab";

import { VisibilityTab, AdvancedTab } from "../shared/advancedTab";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();

	return (
		<>
			<PanelBody
				title={__("Info Box", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={InfoBoxGeneralTab}
						GeneralTabTitle="Layout"
						StyleTab={InfoBoxStyleTab}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("Icon/Image", "post-carousel")}
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
				title={__("Title", "post-carousel")}
				opened={openPanel === "title"}
				onToggle={() => togglePanelBody("title")}
			>
				{openPanel === "title" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={TitleGeneralTab}
						StyleTab={TitleStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Description", "post-carousel")}
				opened={openPanel === "description"}
				onToggle={() => togglePanelBody("description")}
			>
				{openPanel === "description" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={DescriptionGeneralTab}
						StyleTab={DescriptionStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Badge", "post-carousel")}
				className="sp-smart-post-badge-panel-body"
				opened={openPanel === "badge"}
				onToggle={() => togglePanelBody("badge")}
			>
				{openPanel === "badge" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={BadgeGeneralTab}
						StyleTab={BadgeStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Rating", "post-carousel")}
				className="sp-smart-post-rating-panel-body"
				opened={openPanel === "rating"}
				onToggle={() => togglePanelBody("rating")}
			>
				{openPanel === "rating" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={RatingGeneralTab}
						StyleTab={RatingStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Call to Action", "post-carousel")}
				opened={openPanel === "callToAction"}
				onToggle={() => togglePanelBody("callToAction")}
			>
				{openPanel === "callToAction" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={CallToActionGeneralTab}
						StyleTab={CallToActionStyleTab}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("Separator", "post-carousel")}
				className="sp-smart-post-separator-panel-body"
				opened={openPanel === "separator"}
				onToggle={() => togglePanelBody("separator")}
			>
				{openPanel === "separator" && <SeparatorTab attributes={attributes} setAttributes={setAttributes} />}
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
