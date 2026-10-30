import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import ListThreeEdit from "./edit";
import { ListThreeBlockIcon, PostListThreePreviewImage } from "./icon";

const options = {
	apiVersion: 3,
	icon: ListThreeBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-list-three",
	title: "Post List 03",
	description: "Display modern post lists with multi-columns and design variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostListThreePreviewImage /> : <ListThreeEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-list-three", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
