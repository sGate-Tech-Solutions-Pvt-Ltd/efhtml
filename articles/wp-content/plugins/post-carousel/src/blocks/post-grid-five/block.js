import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import GridFiveEdit from "./edit";
import { GridFiveBlockIcon, PostGridFivePreviewImage } from "./icon";

const options = {
	apiVersion: 3,
	icon: GridFiveBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-grid-five",
	title: "Post Grid 05",
	description: "Display stylish dynamic grids with main and side posts.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostGridFivePreviewImage /> : <GridFiveEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-grid-five", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
