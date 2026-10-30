import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import TimelineThreeEdit from "./edit";
import { PostTimelineThreePreviewImage, TimelineThreeBlockIcon } from "./icon";

const options = {
	apiVersion: 3,
	icon: TimelineThreeBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/post-timeline-three",
	title: "Post Timeline 03",
	description: "Display horizontal post timeline with design variations.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) =>
		props.attributes.isPreview ? <PostTimelineThreePreviewImage /> : <TimelineThreeEdit {...props} />,
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/post-timeline-three", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
