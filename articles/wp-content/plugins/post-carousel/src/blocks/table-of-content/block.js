import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import SaveComponent from "../shared/SaveComponent";
import TableOfContent from "./edit";
import { TableOfContentPreviewImage, TableOfContentIcon } from "./icons";

const options = {
	apiVersion: 3,
	icon: TableOfContentIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/table-of-content",
	title: "Table of Contents",
	description: "Auto-generate a clickable post table of contents.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <TableOfContentPreviewImage /> : <TableOfContent {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/table-of-content", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
