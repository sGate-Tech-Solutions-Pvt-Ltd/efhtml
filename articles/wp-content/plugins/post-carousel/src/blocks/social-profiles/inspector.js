import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { Divider, TabControls } from "../../components";
import {
	SocialProfilesContentTab,
	SocialProfilesGeneralTab,
	SocialProfilesIconGeneralTab,
	SocialProfilesLabelGeneralTab,
} from "./generalTab";
import { useState } from "@wordpress/element";
import { SocialProfilesIconStyleTab, SocialProfilesLabelStyleTab } from "./styleTab";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";
import Toggle from "../../components/toggle/toggle";

export const Inspector = ({ attributes, setAttributes }) => {
	const { socialIconEnable, socialLabelEnable, socialSubTextEnable } = attributes;
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
				<SocialProfilesGeneralTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<PanelBody
				title={__("Icon", "post-carousel")}
				opened={"icon" === togglePanel}
				onToggle={(value) => toggleHandler(value, "icon")}
			>
				<Toggle
					label={__("Social Icon", "post-carousel")}
					attributes={socialIconEnable}
					attributesKey={"socialIconEnable"}
					setAttributes={setAttributes}
				/>
				{socialIconEnable && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={SocialProfilesIconGeneralTab}
						StyleTab={SocialProfilesIconStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Social Label", "post-carousel")}
				opened={"social-label" === togglePanel}
				onToggle={(value) => toggleHandler(value, "social-label")}
			>
				<Toggle
					label={__("Social Label", "post-carousel")}
					attributes={socialLabelEnable}
					attributesKey={"socialLabelEnable"}
					setAttributes={setAttributes}
				/>
				<Toggle
					label={__("Sub Text", "post-carousel")}
					attributes={socialSubTextEnable}
					attributesKey={"socialSubTextEnable"}
					setAttributes={setAttributes}
					pro={true}
				/>
				{(socialLabelEnable || (socialLabelEnable && socialSubTextEnable)) && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={SocialProfilesLabelGeneralTab}
						StyleTab={SocialProfilesLabelStyleTab}
					/>
				)}
				{socialSubTextEnable && (
					<>
						<Divider position="sp-w-100pct" />
						<SocialProfilesLabelStyleTab attributes={attributes} setAttributes={setAttributes} />
					</>
				)}
			</PanelBody>
			<PanelBody
				title={__("Content Area", "post-carousel")}
				opened={"content-area" === togglePanel}
				onToggle={(value) => toggleHandler(value, "content-area")}
			>
				<SocialProfilesContentTab attributes={attributes} setAttributes={setAttributes} />
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
