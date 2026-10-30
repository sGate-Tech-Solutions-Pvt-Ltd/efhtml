import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import TaxonomyFilterEdit from "./edit";
import { taxonomyFilter } from "./icon";

const options = {
	apiVersion: 3,
	icon: taxonomyFilter,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/taxonomy-filter",
	parent: ["sp-smart-post-show/live-filter"],
	title: "Taxonomy Filter",
	description: "Filter posts by categories, tags, or custom taxonomies.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: TaxonomyFilterEdit,
	save: () => null,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/taxonomy-filter", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
