import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import ListOneEdit from "./edit";
import { ListOneBlockIcon, PostListOnePreviewImage } from "./icon";

const options = {
	apiVersion: 3,
	icon: ListOneBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-list-one",
	title: "Post List 01",
	description: "Display modern post list layouts with multiple design variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostListOnePreviewImage /> : <ListOneEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-list-one", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
