import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SocialProfilesSave from "./save";
import SocialProfilesEdit from "./edit";
import { SocialProfilePreviewImage, SocialProfilesBlockIcon } from "./icons";

const options = {
	apiVersion: 3,
	icon: SocialProfilesBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/social-profiles",
	title: "Social Profiles",
	description: "Add customizable social icons to connect visitors with your social profiles.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <SocialProfilePreviewImage /> : <SocialProfilesEdit {...props} />),
	save: SocialProfilesSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/social-profiles", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
