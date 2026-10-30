import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import Edit from "./edit";
import { PostBlockIcon } from "./icon";
import SaveComponent from "../shared/SaveComponent";

const options = {
	apiVersion: 3,
	icon: PostBlockIcon,
	category: "sp-smart-post-show",
	title: "Post Block",
	name: "sp-smart-post-show/smart-post-parent",
	supports: {
		align: ["wide", "full"],
		inserter: false,
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: Edit,
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/smart-post-parent", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
