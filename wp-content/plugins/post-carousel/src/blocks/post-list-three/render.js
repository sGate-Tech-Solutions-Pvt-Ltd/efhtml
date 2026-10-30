import { isEditor } from "../../controls/controls";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { usePanelBodyContext } from "../../context";
import { Fragment, useEffect, useRef, useState } from "@wordpress/element";

const Render = ({ attributes, posts }) => {
	const { postListLayout, contentVerticalPosition, showHideDivider, imageOverlayColor, catTabCategoryPosition } =
		attributes;

	const { togglePanelBody } = usePanelBodyContext();
	const containerRef = useRef(null);

	const editPage = isEditor();

	const largeItemLength = "sp-smart-post-list-three-layout-six" === postListLayout ? 4 : 2;

	const bgClass = ["sp-smart-post-list-three-layout-three", "sp-smart-post-list-three-layout-four"].includes(
		postListLayout
	)
		? "sp-smart-post-background-layout"
		: "";

	const imageOverlay = ["sp-smart-post-list-three-layout-three", "sp-smart-post-list-three-layout-four"].includes(
		postListLayout
	)
		? imageOverlayColor
		: "";
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
			id="sp-smart-post-list-wrapper"
			className={`sp-smart-post-list-three ${imageOverlay} ${postListLayout} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			<div className="sp-smart-post-list-items">
				<div className={`sp-smart-post-large-items ${bgClass}`}>
					{posts?.slice(0, largeItemLength)?.map((post, i) => {
						return (
							<Fragment key={post?.post_id}>
								<div className={`sp-smart-post-list-item`}>
									<TemplateOne
										data={post}
										attributes={attributes}
										posts={posts}
										contentPosition={contentVerticalPosition}
										isSelected={selectedPostId === post?.post_id}
										onSelect={() => setSelectedPostId(post?.post_id)}
									/>
								</div>
							</Fragment>
						);
					})}
				</div>

				<div className="sp-smart-post-small-items">
					{posts?.slice(largeItemLength)?.map((post, i) => {
						return (
							<Fragment key={post?.post_id}>
								<div className={`sp-smart-post-list-item`}>
									{showHideDivider && (
										<div
											onClick={(e) => (editPage ? togglePanelBody("divider", e) : () => {})}
											className="sp-smart-post-list-divider"
										></div>
									)}
									<TemplateOne
										data={post}
										attributes={attributes}
										layout={postListLayout}
										posts={posts}
										contentPosition={contentVerticalPosition}
										isSelected={selectedPostId === post?.post_id}
										onSelect={() => setSelectedPostId(post?.post_id)}
									/>
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Render;
