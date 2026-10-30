import { toggleEqualHeight } from "../shared/helpFn";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import LoopContent from "./loopContent";

const Render = ({ attributes, posts }) => {
	const { uniqueId, equalHeightEnable, catTabCategoryPosition, contentOnHover } = attributes;

	const containerRef = useRef(null);

	useEffect(() => {
		toggleEqualHeight(uniqueId, equalHeightEnable);
	}, [equalHeightEnable, uniqueId, []]);

	// const HtmlTag = gridTwoMasonryEnable ? Fragment : 'div';
	const HtmlTag = "div";

	return (
		<div
			className={`sp-smart-show-pro sp-smart-post-block-wrapper grid-two-container sp-cat-position-${catTabCategoryPosition} sp-smart-post-background-layout ${contentOnHover ? "sp-content-on-hover" : ""}`}
			ref={containerRef}
		>
			<div className={`sp-smart-post-grid-two-contents sp-smart-post-grid-two`}>
				<HtmlTag className={`sp-smart-post-dynamic-grid-contents`}>
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
		</div>
	);
};

export default Render;
