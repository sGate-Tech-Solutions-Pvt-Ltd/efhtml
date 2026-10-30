import { registerBlockType } from "@wordpress/blocks";
import SmartSearchEdit from "./edit";
import generateBlockCSS from "../shared/generateBlockCSS";
import { SearchBlockIcon, SmartSearchPreviewImage } from "./icons";
import { isBlockEnabled } from "../../utils";

const options = {
	apiVersion: 3,
	icon: SearchBlockIcon,
	category: "sp-smart-post-show-pro-blocks",
	name: "sp-smart-post-show/smart-search",
	title: "Smart Search",
	description: "Enable visitors to instantly find content with a stylish, powerful live search.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <SmartSearchPreviewImage /> : <SmartSearchEdit {...props} />),
	save: () => null,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/smart-search", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
