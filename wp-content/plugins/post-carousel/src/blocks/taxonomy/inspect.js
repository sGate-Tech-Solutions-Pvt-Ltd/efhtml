import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";

import { usePanelBodyContext } from "../../context";
import { CounterTab, Divider, GeneralTab, ImageTab, QueryBuilderTab } from "./tabs";
import { AdvancedStyleTab, TitleStyleTab } from "../shared/styleTab";
import { Content } from "./Content";
import { ExcerptTab } from "./excerpt";
import { TabControls } from "../../components";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const { layout } = attributes;

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
			>
				<GeneralTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<PanelBody
				title={__("Query Builder", "post-carousel")}
				opened={openPanel === "queryBuilder"}
				onToggle={() => togglePanelBody("queryBuilder")}
			>
				<QueryBuilderTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>

			{layout === "taxonomy-layout-one" && (
				<PanelBody
					title={__("Divider", "post-carousel")}
					opened={openPanel === "divider"}
					onToggle={() => togglePanelBody("divider")}
				>
					<Divider attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			)}

			<PanelBody
				title={__("Content Area", "post-carousel")}
				opened={openPanel === "contentArea"}
				onToggle={() => togglePanelBody("contentArea")}
			>
				<Content attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>

			{["taxonomy-layout-five", "taxonomy-layout-six"].includes(layout) && (
				<PanelBody
					title={__("Image", "post-carousel")}
					opened={openPanel === "image"}
					onToggle={() => togglePanelBody("image")}
				>
					<ImageTab attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			)}

			<PanelBody
				title={__("Title", "post-carousel")}
				opened={openPanel === "title"}
				onToggle={() => togglePanelBody("title")}
			>
				<TitleStyleTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>

			{!["taxonomy-layout-seven", "taxonomy-layout-eight", "taxonomy-layout-four"].includes(layout) && (
				<PanelBody
					title={__("Excerpt", "post-carousel")}
					opened={openPanel === "excerpt"}
					onToggle={() => togglePanelBody("excerpt")}
				>
					<ExcerptTab attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			)}

			<PanelBody
				title={__("Post Counter", "post-carousel")}
				opened={openPanel === "counter"}
				onToggle={() => togglePanelBody("counter")}
			>
				<CounterTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>

			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advanced"}
				onToggle={() => togglePanelBody("advanced")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					displayIcon={false}
					VisibilityTab={VisibilityTab}
					AdvancedTab={AdvancedTab}
					initialTab="visibility"
				/>
			</PanelBody>
		</>
	);
};

export default Inspector;
