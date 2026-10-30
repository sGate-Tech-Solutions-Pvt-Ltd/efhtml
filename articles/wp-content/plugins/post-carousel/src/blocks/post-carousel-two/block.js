import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { PostCarouselTwoBlockIcon, PostCarouselTwoPreviewImage } from "./icons";
import CarouselTwoEdit from "./edit";
import SaveComponent from "../shared/SaveComponent";

const options = {
	apiVersion: 3,
	icon: PostCarouselTwoBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-carousel-two",
	title: "Post Carousel 02",
	description: "Display posts in an eye-catching carousel with overlay content.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostCarouselTwoPreviewImage /> : <CarouselTwoEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-carousel-two", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
