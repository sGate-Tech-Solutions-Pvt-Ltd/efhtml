import { jsonParse, toggleEqualHeight } from "../shared/helpFn";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import LoopContent from "./loopContent";
import { breakpoint } from "../../controls/controls";

const Render = ({ attributes, posts }) => {
	const {
		uniqueId,
		postGridLayout,
		equalHeightEnable,
		// gridFiveMasonryEnable,
		catTabCategoryPosition,
	} = attributes;

	const deviceType = breakpoint();
	const gridRef = useRef(null);

	useEffect(() => {
		toggleEqualHeight(uniqueId, equalHeightEnable);
	}, [equalHeightEnable, uniqueId, []]);

	const HtmlTag = "div";

	return (
		<div
			className={`sp-smart-show-pro grid-five-container sp-cat-position-${catTabCategoryPosition}`}
			ref={gridRef}
		>
			{"Mobile" !== deviceType && (
				<div
					className={`sp-smart-post-grid-five-dynamic-contents sp-smart-post-background-layout ${postGridLayout}`}
				>
					<LoopContent posts={posts} attributes={attributes} gridRef={gridRef} />
				</div>
			)}
			<HtmlTag
				className={`sp-smart-post-grid-five-static-contents sp-smart-post-background-layout ${postGridLayout}`}
			>
				<LoopContent
					bottomStyle={true}
					Masonry={false}
					ResponsiveMasonry={Fragment}
					posts={posts}
					attributes={attributes}
					gridRef={gridRef}
				/>
			</HtmlTag>
		</div>
	);
};

export default Render;
