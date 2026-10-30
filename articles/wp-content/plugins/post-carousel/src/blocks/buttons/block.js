import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import ButtonsEdit from "./edit";
import ButtonsSave from "./save";
import { ButtonsBlockIcon, ButtonsPreviewImage } from "./icon";

const options = {
	apiVersion: 3,
	icon: ButtonsBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/buttons",
	title: "Smart Button",
	description: "Add a customizable button with flexible styling and link options.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <ButtonsPreviewImage /> : <ButtonsEdit {...props} />),
	save: ButtonsSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/buttons", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
