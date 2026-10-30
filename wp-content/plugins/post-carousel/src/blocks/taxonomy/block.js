import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { SmartTaxonomyPreviewImage, TaxonomyBlockIcon } from "./icon";
import TaxonomyEdit from "./edit";
import SaveComponent from "../shared/SaveComponent";

const options = {
	apiVersion: 3,
	icon: TaxonomyBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/taxonomy",
	title: "Taxonomy",
	description: "Display taxonomies with flexible layouts and powerful customizations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <SmartTaxonomyPreviewImage /> : <TaxonomyEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/taxonomy", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
