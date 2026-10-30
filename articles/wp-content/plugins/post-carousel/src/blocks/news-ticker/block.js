import { registerBlockType } from "@wordpress/blocks";
import generateBlockCSS from "../shared/generateBlockCSS";
import { isBlockEnabled } from "../../utils";
import { NewsTicker, NewsTickerPreviewImage } from "./icon";
import NewsTickerEdit from "./edit";
import SaveComponent from "../shared/SaveComponent";

const options = {
	apiVersion: 3,
	icon: NewsTicker,
	category: "sp-smart-post-show",
	name: "sp-smart-post-show/news-ticker",
	title: "News Ticker",
	description: "Display scrolling headlines in a dynamic, eye-catching news ticker.",
	supports: {
		align: ["wide", "full"],
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	edit: (props) => (props.attributes.isPreview ? <NewsTickerPreviewImage /> : <NewsTickerEdit {...props} />),
	save: SaveComponent,
	generateCSS: (attributes) => generateBlockCSS(attributes, "sp-smart-post-show/news-ticker", "frontend"),
};

const registerBlockTypeFn = () => {
	if (isBlockEnabled(options.name)) {
		registerBlockType(options.name, options);
	}
};

registerBlockTypeFn();
