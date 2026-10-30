import { updateCategory } from "@wordpress/blocks";
import domReady from "@wordpress/dom-ready";
import "./style.scss";
import "./editor.scss";
import { SmartPostShowLogoIcon } from "../icons/icons.js";
import saveBlockCSS from "../controls/saveBlockCSS.js";
import "../global-settings/index.js";
import "./section-heading/block.js";
import "./search-filter/block.js";
import "./author-filter/block.js";
import "./post-carousel/block.js";
import "./post-carousel-two/block.js";
import "./post-slider/block.js";
import "./post-slider-two/block.js";
import "./thumbnail-slider/block.js";
import "./thumbnail-slider-two/block.js";
import "./news-ticker/block.js";
import "./post-grid-one/block.js";
import "./post-grid-two/block.js";
import "./post-grid-three/block.js";
import "./post-grid-four/block.js";
import "./post-grid-five/block.js";
import "./post-grid-six/block.js";
import "./post-list-one/block.js";
import "./post-list-two/block.js";
import "./post-list-three/block.js";
import "./post-timeline-one/block.js";
import "./post-timeline-two/block.js";
import "./post-timeline-three/block.js";
import "./container/block.js";
import "./buttons/block.js";
import "./button/block.js";
import "./smart-search/block.js";
import "./column/block.js";
import "./social-profiles/block.js";
import "./social-profile-item/block.js";
import "./pagination/block.js";
import "./taxonomy-filter/block.js";
import "./sort-filter/block.js";
import "./live-filter/block.js";
import "./smart-post-parent/block.js";
import "./taxonomy/block.js";
import "./table-of-content/block.js";
import "./smart-image/block.js";
import "./smart-info-box/block.js";
import "./smart-lists/block.js";
import "./smart-list/block.js";
import "./shortcode/block.js";
import "../prebuild-library/index.js";
import "../saved-template-sidebar/index.js";
import "./explore-blocks.js";

updateCategory("sp-smart-post-show", {
	icon: <SmartPostShowLogoIcon color="var(--sp-smart-primary-2-400)" />,
});

const ProBadgeIcon = () => (
	<svg
		width={18}
		height={18}
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
		d="M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9"
		fill="#4ab866"
		fillOpacity={0.1}
		/>
		<path
		d="M9 .5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Z"
		stroke="#4ab866"
		strokeOpacity={0.6}
		/>
		<g clipPath="url(#a)" fill="#4ab866">
		<path
			d="M10.386 7.761a.84.84 0 0 0 .557.428.78.78 0 0 0 .69-.195l1.46-1.34-.473 3.767H5.39l-.475-3.767 1.462 1.34a.78.78 0 0 0 .69.195.84.84 0 0 0 .557-.428l1.38-2.533z"
			stroke="#4ab866"
			strokeWidth={0.847}
		/>
		<path d="M12.577 13.282H5.432c-.23 0-.416-.228-.416-.508v-1.117h7.977v1.117c0 .28-.186.508-.416.508" />
		</g>
		<defs>
		<clipPath id="a">
			<path fill="#fff" d="M4 4h10v10H4z" />
		</clipPath>
		</defs>
	</svg>
);

updateCategory("sp-smart-post-show-pro-blocks", {
	icon: <ProBadgeIcon />,
});

domReady(() => {
	saveBlockCSS();
});
