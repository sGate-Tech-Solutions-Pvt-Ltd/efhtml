import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { ListTwoBlockIcon, PostListTwoPreviewImage } from "./icon";
import ListTwoEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: ListTwoBlockIcon,
	category: "sp-smart-post-show-pro-blocks",
	name: "sp-smart-post-show/post-list-two",
	title: "Post List 02",
	description: "Display post lists with the first featured post and layout variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostListTwoPreviewImage /> : <ListTwoEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-list-two", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
