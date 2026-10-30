import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { GridThreeBlockIcon, PostGridThreePreviewImage } from "./icon";
import GridThreeEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: GridThreeBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-grid-three",
	title: "Post Grid 03",
	description: "Display modern post grids with large and small item combinations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostGridThreePreviewImage /> : <GridThreeEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-grid-three", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
