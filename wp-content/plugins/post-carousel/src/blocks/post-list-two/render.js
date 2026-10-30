import { isEditor } from "../../controls/controls";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { usePanelBodyContext } from "../../context";
import { Fragment, useEffect, useRef, useState } from "@wordpress/element";
import { ProTopBar } from "../shared/helpFn";

const ListDivider = () => {
	const { togglePanelBody } = usePanelBodyContext();
	return (
		<div
			onClick={(e) => (editPage ? togglePanelBody("divider", e) : () => {})}
			className="sp-smart-post-list-divider"
		></div>
	);
};
const Render = ({ attributes, posts }) => {
	const { postListLayout, contentVerticalPosition, showHideDivider, imageOverlayColor, catTabCategoryPosition, blockName } =
		attributes;

	const containerRef = useRef(null);

	const layoutClass = () => {
		if (
			"sp-smart-post-list-two-layout-four" === postListLayout ||
			"sp-smart-post-list-two-layout-seven" === postListLayout ||
			"sp-smart-post-list-two-layout-eight" === postListLayout ||
			"sp-smart-post-list-two-layout-three" === postListLayout
		) {
			return "sp-smart-post-list-two-layout-three" !== postListLayout
				? `sp-smart-post-list-two-layout-three ${postListLayout}`
				: postListLayout;
		}
		return `sp-smart-post-list-two-bg-layout ${postListLayout}`;
	};

	const bgClass = [
		"sp-smart-post-list-two-layout-one",
		"sp-smart-post-list-two-layout-two",
		"sp-smart-post-list-two-layout-five",
		"sp-smart-post-list-two-layout-six",
	].includes(postListLayout)
		? "sp-smart-post-background-layout"
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

	const TemplateOneSimplify = ({ post, type }) => {
		return (
			<TemplateOne
				data={post}
				attributes={attributes}
				layout={type === "small" ? postListLayout : ""}
				posts={posts}
				contentPosition={contentVerticalPosition}
				isSelected={selectedPostId === post?.post_id}
				onSelect={() => setSelectedPostId(post?.post_id)}
			/>
		);
	};

	return (
		<>
		<ProTopBar 
			blockName={blockName}
			title="Post List 02"
		/>
		<div
			id="sp-smart-post-list-wrapper"
			className={`sp-smart-post-list-wrapper ${imageOverlayColor} ${layoutClass()} sp-cat-position-${catTabCategoryPosition}`}
			ref={containerRef}
		>
			<div className="sp-smart-post-list-items">
				<div className={`sp-smart-post-large-items ${bgClass}`}>
					{posts?.slice(0, 1)?.map((post, i) => {
						return (
							<Fragment key={post?.post_id}>
								<div className={`sp-smart-post-list-item`}>
									{/* <TemplateOne
										data={post}
										attributes={attributes}
										posts={posts}
										contentPosition={
											contentVerticalPosition
										}
										isSelected={
											selectedPostId === post?.post_id
										}
										onSelect={() =>
											setSelectedPostId(post?.post_id)
										}
									/> */}
									<TemplateOneSimplify post={post} type={"large"} />
								</div>
							</Fragment>
						);
					})}
				</div>

				{showHideDivider &&
					[
						"sp-smart-post-list-two-layout-three",
						"sp-smart-post-list-two-layout-four",
						"sp-smart-post-list-two-layout-seven",
						"sp-smart-post-list-two-layout-eight",
					].includes(postListLayout) && <ListDivider />}

				<div className="sp-smart-post-small-items">
					{posts?.slice(1)?.map((post, i) => {
						return (
							<Fragment key={post?.post_id}>
								<div className={`sp-smart-post-list-item`}>
									{/* <TemplateOne
										data={post}
										attributes={attributes}
										layout={postListLayout}
										posts={posts}
										contentPosition={
											contentVerticalPosition
										}
										isSelected={
											selectedPostId === post?.post_id
										}
										onSelect={() =>
											setSelectedPostId(post?.post_id)
										}
									/> */}
									<TemplateOneSimplify post={post} type={"small"} />
								</div>
								{showHideDivider &&
									[
										"sp-smart-post-list-two-layout-one",
										"sp-smart-post-list-two-layout-seven",
									].includes(postListLayout) && <ListDivider />}
							</Fragment>
						);
					})}
				</div>
			</div>
		</div>
		</>
	);
};

export default Render;
