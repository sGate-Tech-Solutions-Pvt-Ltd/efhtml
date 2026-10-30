import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { LiveFilterIcon } from "./icons";
import Edit from "./edit";

const options = {
	apiVersion: 3,
	icon: LiveFilterIcon,
	category: "sp-smart-post-show",
	title: "Smart Frontend Filter",
	name: "sp-smart-post-show/live-filter",
	parent: ["sp-smart-post-show/smart-post-parent"],
	description: "Enable your visitors to quickly filter and find content on the front end.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: Edit,
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/live-filter", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
