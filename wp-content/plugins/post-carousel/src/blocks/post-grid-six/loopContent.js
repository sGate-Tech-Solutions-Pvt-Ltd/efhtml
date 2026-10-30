import { Fragment, useEffect, useState } from "@wordpress/element";
import TemplateOne from "../shared/templates/templateCards/templateOne";
import { breakpoint, inArray } from "../../controls/controls";

const LoopContent = ({
	posts,
	attributes,
	bottomStyle = false,
	layoutStyle = "grid-six-layout-four",
	containerVAlign = false,
	horizontalAlign = false,
	Masonry = false,
	ResponsiveMasonry = Fragment,
	containerRef,
}) => {
	const { postGridLayout, contentVerticalPosition, gridSixColumns, masonryGap } = attributes;

	const deviceType = breakpoint();

	const largeItemsNumber =
		"Mobile" !== deviceType ? (inArray(["grid-six-layout-one", "grid-six-layout-two"], postGridLayout) ? 1 : 2) : 0;

	const masonryGapCss = `${masonryGap?.device?.Desktop}${masonryGap?.unit?.Desktop}`;

	const columnsBreakPoints = Masonry
		? {
				columnsCountBreakPoints: {
					350: gridSixColumns?.device?.Mobile,
					750: gridSixColumns?.device?.Tablet,
					900: gridSixColumns?.device?.Desktop,
				},
			}
		: {};

	const gutter = Masonry
		? {
				gutter: masonryGapCss,
			}
		: {};
	const [selectedPostId, setSelectedPostId] = useState(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setSelectedPostId(null);
			}
			const targetPostId = parseInt(event.target.closest(".sp-smart-post-card-image")?.dataset?.post_id);
			if (targetPostId && targetPostId !== selectedPostId) {
				setSelectedPostId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [selectedPostId]);

	return (
		<>
			{Masonry && (
				<ResponsiveMasonry {...columnsBreakPoints}>
					<Masonry {...gutter}>
						{posts
							?.slice(bottomStyle ? largeItemsNumber : 0, bottomStyle ? posts?.length : largeItemsNumber)
							?.map(
								(post) => (
									// postGridLayout === layoutStyle ? (
									<TemplateOne
										key={post?.post_id}
										data={post}
										posts={posts}
										containerVAlign={containerVAlign}
										horizontalAlign={horizontalAlign}
										attributes={attributes}
										contentPosition={contentVerticalPosition}
										isSelected={selectedPostId === post?.post_id}
										onSelect={() => setSelectedPostId(post?.post_id)}
									/>
								)
								// ) : (
								// 	<TemplateOne
								// 		key={ post?.post_id }
								// 		data={ post }
								// 		posts={ posts }
								// 		attributes={
								// 			attributes
								// 		}
								// 		contentPosition={
								// 			contentVerticalPosition
								// 		}
								// 		isSelected={ selectedPostId === post?.post_id }
								// 		onSelect={ () => setSelectedPostId( post?.post_id ) }
								// 	/>
								// )
							)}
					</Masonry>
				</ResponsiveMasonry>
			)}
			{!Masonry &&
				posts?.slice(bottomStyle ? largeItemsNumber : 0, bottomStyle ? posts?.length : largeItemsNumber)?.map(
					(post) => (
						// postGridLayout === layoutStyle ? (
						<TemplateOne
							key={post?.post_id}
							data={post}
							posts={posts}
							containerVAlign={containerVAlign}
							horizontalAlign={horizontalAlign}
							attributes={attributes}
							contentPosition={contentVerticalPosition}
							isSelected={selectedPostId === post?.post_id}
							onSelect={() => setSelectedPostId(post?.post_id)}
						/>
					)
					// ) : (
					// 	<TemplateOne
					// 		key={ post?.post_id }
					// 		data={ post }
					// 		posts={ posts }
					// 		attributes={ attributes }
					// 		contentPosition={ contentVerticalPosition }
					// 		isSelected={ selectedPostId === post?.post_id }
					// 		onSelect={ () => setSelectedPostId( post?.post_id ) }
					// 	/>
					// )
				)}
		</>
	);
};

export default LoopContent;
