import { registerBlockType } from "@wordpress/blocks";
import { ShortCodeBlockIcon, ShortCodePreviewImage } from "./icons";
import Edit from "./edit";
import { isBlockEnabled } from "../../utils";

const options = {
	apiVersion: 3,
	icon: ShortCodeBlockIcon,
	category: "sp-smart-post-show",
	name: "smart-post-show-pro/shortcode",
	title: "Shortcode Views",
	description: "Use Smart Post to insert a shortcode in your page.",
	supports: {
		align: ["wide", "full"],
		// inserter: false,
	},
	example: {
		attributes: {
			preview: true,
		},
	},
	edit: (props) =>
		props.attributes.preview ? (
			<div className="spsp_shortcode_block_preview_image">
				<ShortCodePreviewImage />
			</div>
		) : (
			<Edit {...props} />
		),
	save: () => null,
};

// registerBlockType(options.name, options);
const registerBlockTypeFn = () => {
	if (isBlockEnabled("shortcode")) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
