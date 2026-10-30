import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { PostCarouselBlockIcon, PostCarouselPreviewImage } from "./icon";
import SaveComponent from "../shared/SaveComponent";
import CarouselEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: PostCarouselBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-carousel",
	title: "Post Carousel 01",
	description: "Display posts in a responsive carousel with smooth navigation.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostCarouselPreviewImage /> : <CarouselEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-carousel", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
