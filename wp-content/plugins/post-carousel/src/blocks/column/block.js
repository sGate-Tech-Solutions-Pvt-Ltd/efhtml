import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import ColumnEdit from "./edit";
import { ColumnIconBlocks } from "./icons";

const options = {
	apiVersion: 3,
	icon: ColumnIconBlocks,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/column",
	parent: ["sp-smart-post-show/container"],
	title: "Column",
	description: "Display a single column flex box container column.",
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: ColumnEdit,
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/column", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled("container")) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
