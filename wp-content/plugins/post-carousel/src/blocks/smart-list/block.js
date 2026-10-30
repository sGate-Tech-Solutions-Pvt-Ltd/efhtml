import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { SmartListBlockIcon } from "../smart-lists/icons";
import SmartListEdit from "./edit";
import SmartListSave from "./save";

const options = {
	apiVersion: 3,
	icon: SmartListBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/smart-list",
	title: "Smart List Item",
	keywords: ["list", "smart", "smart list", "smart-list"],
	parent: ["sp-smart-post-show/smart-lists"],
	description: "Create stylish, sortable list with powerful customization options.",
	supports: {
		align: ["wide", "full"],
	},
	edit: SmartListEdit,
	save: SmartListSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/smart-list", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled("smart-lists")) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
