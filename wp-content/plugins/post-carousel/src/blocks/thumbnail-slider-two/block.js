import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import PostThumbnailTwoEdit from "./edit";
import { PostThumbnailSliderTwoBlockIcon, PostThumbnailsSliderTwoPreviewImage } from "./icon";

const options = {
	apiVersion: 3,
	icon: PostThumbnailSliderTwoBlockIcon,
	category: "sp-smart-post-show-pro-blocks",
	name: "sp-smart-post-show/thumbnail-slider-two",
	title: "Thumbnails Slider 02",
	description: "Display posts in a modern slider with internal thumbs navigation.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) =>
		props.attributes.isPreview ? <PostThumbnailsSliderTwoPreviewImage /> : <PostThumbnailTwoEdit {...props} />,
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/thumbnail-slider-two", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
