import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import TimelineOneEdit from "./edit";
import { PostTimelineOnePreviewImage, TimelineOneBlockIcon } from "./icon";

const options = {
	apiVersion: 3,
	icon: TimelineOneBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-timeline-one",
	title: "Post Timeline 01",
	description: "Display vertical post timeline with card and layout variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <PostTimelineOnePreviewImage /> : <TimelineOneEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-timeline-one", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
