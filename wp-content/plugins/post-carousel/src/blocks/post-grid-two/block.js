import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { GridTwoBlockIcon, PostGridTwoPreviewImage } from "./icon";
import SaveComponent from "../shared/SaveComponent";
import GridTwoEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: GridTwoBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-grid-two",
	title: "Post Grid 02",
	description: "Display stylish post grids with overlay content and customizations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostGridTwoPreviewImage /> : <GridTwoEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-grid-two", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
