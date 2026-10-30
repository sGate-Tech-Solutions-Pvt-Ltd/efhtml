import { useEffect, useRef, useState } from "@wordpress/element";
import { toggleEqualHeight } from "../shared/helpFn";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { breakpoint, inArray } from "../../controls/controls";

const Render = ({ attributes, posts }) => {
	const {
		timelineLayout,
		uniqueId,
		equalHeightEnable,
		imagePosition,
		contentOrientation,
		postGridLayout,
		catTabCategoryPosition,
	} = attributes;
	const containerRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			toggleEqualHeight(uniqueId, equalHeightEnable);
		}, 50);
	}, [equalHeightEnable, uniqueId, posts]);

	const [selectedPostId, setSelectedPostId] = useState(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setSelectedPostId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className={`sp-smart-post-wrapper post-timeline-one sp-smart-post-show-scroll-wrapper template-one img-position-${imagePosition} ${contentOrientation} sp-cat-position-${catTabCategoryPosition}`}
			id={uniqueId}
			ref={containerRef}
		>
			<div
				className={`sp-smart-post-timeline-container ${
					breakpoint() === "Mobile" && !inArray(["timeline-one-layout-six"], timelineLayout)
						? "timeline-one-layout-five"
						: timelineLayout
				}`}
			>
				{posts?.map((post) => {
					return (
						<div key={post?.post_id} className="sp-smart-post-timeline-one-post-container">
							<div className="sp-smart-indicator">
								<div className="sp-smart-indicator-circle"></div>
								<div className="sp-smart-indicator-arrow"></div>
							</div>
							<TemplateOne
								data={post}
								attributes={attributes}
								posts={posts}
								isSelected={selectedPostId === post?.post_id}
								onSelect={() => setSelectedPostId(post?.post_id)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Render;
