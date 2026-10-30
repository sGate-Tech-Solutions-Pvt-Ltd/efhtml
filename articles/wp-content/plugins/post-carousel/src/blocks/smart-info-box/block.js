import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { InfoBoxBlockIcon, InfoBoxPreview } from "./icons";
import InfoBoxEdit from "./edit";
import SmartInfoBoxSave from "./save";

const options = {
	apiVersion: 3,
	icon: InfoBoxBlockIcon,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/smart-info-box",
	title: "Smart Info Box",
	description: "Show info with icon, rating, badge, and link in fully customizable boxes.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <InfoBoxPreview /> : <InfoBoxEdit {...props} />),
	save: SmartInfoBoxSave,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/smart-info-box", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
