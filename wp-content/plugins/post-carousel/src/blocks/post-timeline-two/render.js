import { useEffect, useRef, useState } from "@wordpress/element";
import { toggleEqualHeight } from "../shared/helpFn";
import { breakpoint } from "../../controls/controls";
import TemplateOne from "../shared/templates/templateCards/templateOne";

const Render = ({ attributes, posts }) => {
	const { timelineLayout, contentVerticalPosition, equalHeightEnable, uniqueId, catTabCategoryPosition } = attributes;

	const containerRef = useRef(null);

	// Equalizing the post cards height.
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
			className={`post-timeline-two sp-smart-post-show-scroll-wrapper sp-cat-position-${catTabCategoryPosition}`}
			id={uniqueId}
			ref={containerRef}
		>
			<div
				className={`sp-smart-post-timeline-container sp-smart-post-background-layout ${
					breakpoint() === "Mobile" && !["timeline-one-layout-six"].includes(timelineLayout)
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
								key={post?.post_id}
								data={post}
								posts={posts}
								attributes={attributes}
								contentPosition={contentVerticalPosition}
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
