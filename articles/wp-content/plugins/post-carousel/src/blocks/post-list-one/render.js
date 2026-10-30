import { Fragment, useEffect, useRef, useState } from "@wordpress/element";
import TemplateOne from "../shared/templates/templateCards/templateOne";

const Render = ({ attributes, posts }) => {
	const { postListLayout, contentVerticalPosition, showHideDivider, catTabCategoryPosition } = attributes;
	const containerRef = useRef(null);

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
			className={`sp-smart-post-list-one-block ${postListLayout} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			<div className={`sp-smart-post-list-one-container ${postListLayout}`}>
				{posts?.map((post, i) => {
					return (
						<Fragment key={post?.post_id}>
							<div className={`sp-smart-post-show-list-one-card-wrapper`}>
								<TemplateOne
									data={post}
									attributes={attributes}
									posts={posts}
									contentPosition={contentVerticalPosition}
									isSelected={selectedPostId === post?.post_id}
									onSelect={() => setSelectedPostId(post?.post_id)}
								/>
							</div>
							{showHideDivider && <div className="sp-smart-post-list-divider"></div>}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Render;
