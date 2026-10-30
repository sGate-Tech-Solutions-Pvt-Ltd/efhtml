import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { SectionHeadingBlockIcon, SectionHeadingPreviewImage } from "./icons";
import SectionHeadingEdit from "./edit";
import SectionHeadingSave from "./save";

const options = {
	apiVersion: 3,
	icon: SectionHeadingBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/section-heading",
	title: "Heading",
	description: "Add stylish section headings with powerful customization options",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <SectionHeadingPreviewImage /> : <SectionHeadingEdit {...props} />),
	save: SectionHeadingSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/section-heading", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
