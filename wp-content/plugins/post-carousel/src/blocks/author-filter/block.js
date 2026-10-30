import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { authorBlockIcon } from "./icon";
import Edit from "./edit";

const options = {
	apiVersion: 3,
	icon: authorBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/author-filter",
	parent: ["sp-smart-post-show/live-filter"],
	title: "Author Filter",
	description: "Filter posts by specific authors.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: Edit,
	save: () => null,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/author-filter", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
