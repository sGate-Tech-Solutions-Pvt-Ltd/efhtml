import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { GridSixBlockIcon, PostGridSixPreviewImage } from "./icon";
import GridSixEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: GridSixBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-grid-six",
	title: "Post Grid 06",
	description: "Display stylish grids with one large on top and smaller posts below.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostGridSixPreviewImage /> : <GridSixEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-grid-six", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
