import { memo, useEffect, useRef } from "@wordpress/element";
import { availableLargeContent } from "../../controls/constants";
import { toggleEqualHeight } from "../shared/helpFn";
import LoopContent from "./loopContent";
import { breakpoint } from "../../controls/controls";

const Render = ({ attributes, posts }) => {
	const {
		postGridLayout,
		uniqueId,
		gridLargeContentPosition,
		equalHeightEnable,
		imagePosition,
		contentOrientation,
		catTabCategoryPosition,
		// gridOneMasonryEnable,
	} = attributes;

	const deviceType = breakpoint();

	const isAvailableLargeItem = availableLargeContent.includes(postGridLayout);

	const largeContentPositionClass = isAvailableLargeItem ? gridLargeContentPosition : "";

	useEffect(() => {
		setTimeout(() => {
			toggleEqualHeight(uniqueId, equalHeightEnable);
		}, 50);
	}, [equalHeightEnable, uniqueId, posts]);

	const ref = useRef(null);

	useEffect(() => {
		const style = ref.current.style;
		style.transition = "0.1s";
		style.opacity = "0.5";
	}, []);

	useEffect(() => {
		const style = ref.current.style;

		if (posts?.length > 1) {
			setTimeout(() => {
				style.height = ``;
			}, 200);
		}

		setTimeout(() => {
			style.opacity = "1";
		}, 300);
	}, [posts]);

	const HtmlTag = "div";

	const catePositionClass = catTabCategoryPosition ? ` sp-cat-position-${catTabCategoryPosition}` : "";

	return (
		<div
			ref={ref}
			className={`grid-one-container template-one img-position-${imagePosition} ${contentOrientation} ${postGridLayout} ${largeContentPositionClass}${catePositionClass}`}
		>
			<HtmlTag className={`sp-smart-post-dynamic-grid-contents`}>
				<LoopContent
					bottomStyle={true}
					deviceType={deviceType}
					posts={posts}
					attributes={attributes}
					containerRef={ref}
				/>
			</HtmlTag>
		</div>
	);
};

export default memo(Render);
