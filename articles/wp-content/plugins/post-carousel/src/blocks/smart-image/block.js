import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { SmartImageBlockIcon, SmartImgPreviewImage } from "./icons";
import SaveComponent from "../shared/SaveComponent";
import SmartImageEdit from "./edit";

const options = {
	apiVersion: 3,
	icon: SmartImageBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/smart-image",
	title: "Smart Image",
	keywords: ["image", "smart", "smart image", "smart-image"],
	description: "showing the image with stylish masking and advanced customization options.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <SmartImgPreviewImage /> : <SmartImageEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/smart-image", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
