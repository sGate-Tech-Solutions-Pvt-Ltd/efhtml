import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import {
	MoreResultGeneralTab,
	PopupCanvasGeneralTab,
	PresetTab,
	QueryFilterGeneralTab,
	SearchButtonGeneralTab,
	SearchResultGeneralTab,
} from "./generalTab";
import {
	MoreResultStyleTab,
	PopupCanvasStyleTab,
	PresetStyleTab,
	SearchButtonStyleTab,
	SearchResultStyleTab,
} from "./styleTab";
import { usePanelBodyContext } from "../../context";

export const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const { blockName, displayType } = attributes;

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={"general" === openPanel}
				onToggle={() => togglePanelBody("general")}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={PresetTab}
						StyleTab={PresetStyleTab}
						displayIcon={true}
						blockName={blockName}
						initialTab={"general"}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Query & Filter", "post-carousel")}
				opened={"query_filter" === openPanel}
				onToggle={() => togglePanelBody("query_filter")}
			>
				{openPanel === "query_filter" && (
					<QueryFilterGeneralTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>

			<PanelBody
				title={__("Search Button", "post-carousel")}
				opened={"search_button" === openPanel}
				onToggle={() => togglePanelBody("search_button")}
			>
				{openPanel === "search_button" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={SearchButtonGeneralTab}
						StyleTab={SearchButtonStyleTab}
						displayIcon={true}
						blockName={blockName}
						initialTab={"general"}
					/>
				)}
			</PanelBody>

			{displayType === "popup" && (
				<PanelBody
					title={__("Popup Canvas", "post-carousel")}
					opened={"popup_canvas" === openPanel}
					onToggle={() => togglePanelBody("popup_canvas")}
				>
					{openPanel === "popup_canvas" && (
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={PopupCanvasGeneralTab}
							StyleTab={PopupCanvasStyleTab}
							displayIcon={true}
							blockName={blockName}
							initialTab={"general"}
						/>
					)}
				</PanelBody>
			)}

			<PanelBody
				title={__("Search Result", "post-carousel")}
				opened={"search_result" === openPanel}
				onToggle={() => togglePanelBody("search_result")}
			>
				{openPanel === "search_result" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={SearchResultGeneralTab}
						StyleTab={SearchResultStyleTab}
						displayIcon={true}
						blockName={blockName}
						initialTab={"general"}
					/>
				)}
			</PanelBody>

			<PanelBody
				title={__("More Result", "post-carousel")}
				opened={"more_result" === openPanel}
				onToggle={() => togglePanelBody("more_result")}
			>
				{openPanel === "more_result" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={MoreResultGeneralTab}
						StyleTab={MoreResultStyleTab}
						displayIcon={true}
						blockName={blockName}
						initialTab={"general"}
					/>
				)}
			</PanelBody>
		</>
	);
};
