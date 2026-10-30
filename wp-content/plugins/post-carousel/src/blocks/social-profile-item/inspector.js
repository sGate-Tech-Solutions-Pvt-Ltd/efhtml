import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import {
	SocialSingleContentAreaTab,
	SocialSingleGeneralTab,
	SocialSingleIconGeneralTab,
	SocialSingleLabelGeneralTab,
} from "./generalTab";
import { useState } from "@wordpress/element";
import { SocialSingleIconStyleTab, SocialSingleLabelStyleTab } from "./styleTab";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";

export const Inspector = ({ attributes, setAttributes }) => {
	const { labelEnableParent, subTextEnableParent } = attributes;
	const [togglePanel, setTogglePanel] = useState("general");
	const toggleHandler = (toggleVal, tabName) => {
		setTogglePanel(toggleVal ? tabName : "");
	};

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={"general" === togglePanel}
				onToggle={(value) => toggleHandler(value, "general")}
			>
				<SocialSingleGeneralTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<PanelBody
				title={__("Icon", "post-carousel")}
				opened={"icon" === togglePanel}
				onToggle={(value) => toggleHandler(value, "icon")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					GeneralTab={SocialSingleIconGeneralTab}
					StyleTab={SocialSingleIconStyleTab}
				/>
			</PanelBody>
			{(labelEnableParent || subTextEnableParent) && (
				<>
					<PanelBody
						title={__("Social Label", "post-carousel")}
						opened={"social-label" === togglePanel}
						onToggle={(value) => toggleHandler(value, "social-label")}
					>
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={SocialSingleLabelGeneralTab}
							StyleTab={SocialSingleLabelStyleTab}
						/>
					</PanelBody>
				</>
			)}
			<PanelBody
				title={__("Content Area", "post-carousel")}
				opened={"content-area" === togglePanel}
				onToggle={(value) => toggleHandler(value, "content-area")}
			>
				<SocialSingleContentAreaTab attributes={attributes} setAttributes={setAttributes} />
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
