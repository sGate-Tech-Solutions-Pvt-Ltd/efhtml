import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SocialItemEdit from "./edit";
import { SocialProfileSingleBlockIcon } from "./icons";

const options = {
	apiVersion: 3,
	icon: SocialProfileSingleBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/social-profile-item",
	parent: ["sp-smart-post-show/social-profiles"],
	title: "Social Profile Item",
	description: "Display a single social media profile link/icon.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: SocialItemEdit,
	save: () => null,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/social-profile-item", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled("social-profiles")) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
