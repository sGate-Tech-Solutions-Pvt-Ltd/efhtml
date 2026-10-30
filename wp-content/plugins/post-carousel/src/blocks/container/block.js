import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { ContainerBlockIcon, ContainerPreviewImage } from "./icons";
import ContainerEdit from "./edit";
import ContainerSave from "./save";

const options = {
	apiVersion: 3,
	icon: ContainerBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/container",
	title: "Container",
	description: "Create beautiful layouts with a flexbox-powered container block.",
	// supports: {
	// 	align: ["wide", "full"],
	// },
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <ContainerPreviewImage /> : <ContainerEdit {...props} />),
	save: ContainerSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/container", "frontend"),
	deprecated: [
		{
			attributes: {
				columns: {
					type: "number",
					default: 3,
				},
			},

			// THIS DOES THE MIGRATION
			migrate: ( attributes ) => {
				return {
					...attributes,
					columns: {
						Desktop: attributes.columns ?? 3,
						Tablet: 2,
						Mobile: 1,
					},
				};
			},
		},
	],
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
