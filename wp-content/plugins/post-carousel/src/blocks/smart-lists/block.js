import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { SmartListBlockIcon, SmartListsPreviewImage } from "./icons";
import SmartListsEdit from "./edit";
import SmartListsSave from "./save";

const options = {
	apiVersion: 3,
	icon: SmartListBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/smart-lists",
	title: "Smart List",
	keywords: ["lists", "smart", "smart lists", "smart-lists", "list"],
	description: "Create stylish, sortable lists with powerful customization options.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <SmartListsPreviewImage /> : <SmartListsEdit {...props} />),
	save: SmartListsSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/smart-lists", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
