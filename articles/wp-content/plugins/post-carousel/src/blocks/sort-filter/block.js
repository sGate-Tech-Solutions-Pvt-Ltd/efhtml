import { registerBlockType } from "@wordpress/blocks";
import { isBlockEnabled } from "../../utils";
import { sortIcon } from "./icons";
import "./editor.scss";


const options = {
	apiVersion: 3,
	icon: sortIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/sort-filter",
	parent: ["sp-smart-post-show/live-filter"],
	title: "Sort By Filter",
	description: "Enable visitors to sort posts by date, title, or custom order.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: () => null,
	save: () => null,
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
