import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import { PostThumbnailSlider, PostThumbnailsSliderPreviewImage } from "./icon";
import PostThumbnailEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: PostThumbnailSlider,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/thumbnail-slider",
	title: "Thumbnails Slider 01",
	description: "Display posts in a slider with smooth bottom thumbs navigation.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) =>
		props.attributes.isPreview ? <PostThumbnailsSliderPreviewImage /> : <PostThumbnailEdit {...props} />,
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/thumbnail-slider", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
