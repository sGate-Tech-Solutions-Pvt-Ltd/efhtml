import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import GridFourEdit from "./edit";
import { GridFourBlockIcon, PostGridFourPreviewImage } from "./icon";

const options = {
	apiVersion: 3,
	icon: GridFourBlockIcon,
	category: "sp-smart-post-show-pro-blocks",
	name: "sp-smart-post-show/post-grid-four",
	title: "Post Grid 04",
	description: "Display stylish post grids with one large and multiple small items.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostGridFourPreviewImage /> : <GridFourEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-grid-four", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
