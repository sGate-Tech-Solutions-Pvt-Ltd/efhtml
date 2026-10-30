import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import TimelineTwoEdit from "./edit";
import { PostTimelineTwoPreviewImage, TimelineTwoBlockIcon } from "./icon";

const options = {
	apiVersion: 3,
	icon: TimelineTwoBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-timeline-two",
	title: "Post Timeline 02",
	description: "Display vertical post timeline with overlays and layout variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostTimelineTwoPreviewImage /> : <TimelineTwoEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-timeline-two", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
