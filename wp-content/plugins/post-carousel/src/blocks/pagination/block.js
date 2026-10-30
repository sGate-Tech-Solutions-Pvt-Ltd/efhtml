import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import PaginationEdit from "./edit";
import { PaginationBlockIcon } from "./icon";

const options = {
	apiVersion: 3,
	icon: PaginationBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/pagination",
	parent: [
		"sp-smart-post-show/post-grid-one"
	],
	title: "Smart Pagination",
	description: "Enable Smart Pagination to provide visitors with seamless post navigation.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: PaginationEdit,
	save: () => null,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/pagination", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
