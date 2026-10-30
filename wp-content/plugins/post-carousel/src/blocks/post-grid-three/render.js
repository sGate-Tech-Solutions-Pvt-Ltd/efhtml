import { toggleEqualHeight } from "../shared/helpFn";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import LoopContent from "./loopContent";
import { breakpoint } from "../../controls/controls";

const Render = ({ attributes, posts }) => {
	const {
		uniqueId,
		postGridLayout,
		equalHeightEnable,
		catTabCategoryPosition,
		// gridThreeMasonryEnable,
	} = attributes;

	const deviceType = breakpoint();
	const containerRef = useRef(null);

	useEffect(() => {
		toggleEqualHeight(uniqueId, equalHeightEnable);
	}, [equalHeightEnable, uniqueId, []]);

	// const HtmlTag = gridThreeMasonryEnable ? Fragment : 'div';
	const HtmlTag = "div";

	return (
		<div
			className={`sp-smart-show-pro grid-three-container sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			<div className={`sp-smart-post-grid-three-contents ${postGridLayout}`}>
				{"Mobile" !== deviceType && (
					<div
						className={`sp-smart-post-static-grid-contents sp-smart-post-background-layout ${postGridLayout}`}
					>
						<LoopContent posts={posts} attributes={attributes} containerRef={containerRef} />
					</div>
				)}
				<HtmlTag
					className={`sp-smart-post-dynamic-grid-contents sp-smart-post-background-layout ${postGridLayout}`}
				>
					<LoopContent
						bottomStyle={true}
						// Masonry={ gridThreeMasonryEnable ? Masonry : false }
						// ResponsiveMasonry={
						// 	gridThreeMasonryEnable
						// 		? ResponsiveMasonry
						// 		: Fragment
						// }
						Masonry={false}
						ResponsiveMasonry={Fragment}
						posts={posts}
						attributes={attributes}
						containerRef={containerRef}
					/>
				</HtmlTag>
			</div>
		</div>
	);
};

export default Render;
