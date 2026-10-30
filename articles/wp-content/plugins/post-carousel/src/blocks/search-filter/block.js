import { registerBlockType } from "@wordpress/blocks";
import { isBlockEnabled } from "../../utils";
import { searchBlockIcon } from "./icons";

const options = {
	apiVersion: 3,
	icon: searchBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/search-filter",
	parent: ["sp-smart-post-show/live-filter"],
	title: "Keyword Search Filter",
	description: "Search posts instantly by keywords.",
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
