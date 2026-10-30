import { Fragment, useRef } from "@wordpress/element";
import { ProTopBar } from "../shared/helpFn";
import LoopContent from "./loopContent";
import { breakpoint } from "../../controls/controls";

const Render = ({ attributes, posts }) => {
	const deviceType = breakpoint();
	const {
		postGridLayout,
		catTabCategoryPosition,
		blockName,
		// gridFourMasonryEnable
	} = attributes;

	const HtmlTag = "div";
	const containerRef = useRef(null);

	return (
		<>
		<ProTopBar 
			blockName={blockName}
			title="Post Grid 04"
		/>
		<div
			className={`sp-smart-show-pro grid-four-container ${postGridLayout} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			{"Mobile" !== deviceType && (
				<div className={`sp-smart-post-grid-four-static-contents sp-smart-post-background-layout`}>
					<LoopContent posts={posts} attributes={attributes} containerRef={containerRef} />
				</div>
			)}
			<HtmlTag className={`sp-smart-post-dynamic-grid-contents sp-smart-post-background-layout`}>
				<LoopContent
					bottomStyle={true}
					Masonry={false}
					ResponsiveMasonry={Fragment}
					posts={posts}
					attributes={attributes}
					containerRef={containerRef}
				/>
			</HtmlTag>
		</div>
		</>
	);
};

export default Render;
