import { jsonParse, toggleEqualHeight } from "../shared/helpFn";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import LoopContent from "./loopContent";
import { breakpoint } from "../../controls/controls";

const Render = ({ attributes, posts }) => {
	const {
		uniqueId,
		postGridLayout,
		equalHeightEnable,
		catTabCategoryPosition,
		// gridSixMasonryEnable,
	} = attributes;

	const deviceType = breakpoint();
	const containerRef = useRef(null);

	useEffect(() => {
		toggleEqualHeight(uniqueId, equalHeightEnable);
	}, [equalHeightEnable, uniqueId, []]);

	return (
		<div className={`sp-smart-show-pro grid-six-container sp-cat-position-${catTabCategoryPosition}`}>
			{"Mobile" !== deviceType && (
				<div
					className={`sp-smart-post-grid-six-large-contents ${postGridLayout} ${
						"grid-six-layout-four" === postGridLayout ? "sp-smart-post-background-layout" : ""
					}`}
				>
					<LoopContent posts={posts} attributes={attributes} containerRef={containerRef} />
				</div>
			)}
			<div
				className={`sp-smart-post-grid-six-dynamic-contents ${postGridLayout}
				${"grid-six-layout-one" === postGridLayout ? "sp-smart-post-background-layout" : ""}`}
			>
				<LoopContent
					Masonry={false}
					ResponsiveMasonry={Fragment}
					bottomStyle={true}
					layoutStyle="grid-six-layout-one"
					posts={posts}
					attributes={attributes}
					containerRef={containerRef}
				/>
			</div>
		</div>
	);
};

export default Render;
