import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { SmartButtonSingleBlockIcon } from "./icons";
import ButtonEdit from "./edit";
import ButtonSave from "./save";

const options = {
	apiVersion: 3,
	icon: SmartButtonSingleBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/button",
	parent: ["sp-smart-post-show/buttons"],
	title: "Button",
	description: "Display customizable button with flexible styling and link options",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: ButtonEdit,
	save: ButtonSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/button", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled("buttons")) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
