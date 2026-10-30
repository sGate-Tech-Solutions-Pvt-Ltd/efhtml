import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { GridOneBlockIcon, PostGridOnePreviewImage } from "./icon";
import SaveComponent from "../shared/SaveComponent";
import GridOneEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: GridOneBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-grid-one",
	title: "Post Grid 01",
	description: "Display responsive post grids with multiple layout variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostGridOnePreviewImage /> : <GridOneEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-grid-one", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
