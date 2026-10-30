import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { PostSliderTwoBlockIcon, PostSliderTwoPreviewImage } from "./icon";
import PostSliderTwoEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: PostSliderTwoBlockIcon,
	category: "sp-smart-post-show-pro-blocks",
	name: "sp-smart-post-show/post-slider-two",
	title: "Post Slider 02",
	description: "Display posts in full-width elegant slider with rich content.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostSliderTwoPreviewImage /> : <PostSliderTwoEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-slider-two", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
