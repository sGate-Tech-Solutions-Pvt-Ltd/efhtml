import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { PostSliderBlockIcon, PostSliderPreviewImage } from "./icon";
import PostSliderEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: PostSliderBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-slider",
	title: "Post Slider 01",
	description: "Display posts in a full-width slider with title, meta, and excerpt",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostSliderPreviewImage /> : <PostSliderEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-slider", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
