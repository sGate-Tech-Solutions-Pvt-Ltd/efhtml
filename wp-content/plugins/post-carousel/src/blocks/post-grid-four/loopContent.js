import { gridFourLargeItemPosition, skipItemsForGridFourTopSection } from "../../controls/constants";
import { Fragment, useEffect, useState } from "@wordpress/element";
import { breakpoint } from "../../controls/controls";
import TemplateOne from "../shared/templates/templateCards/templateOne";

const LoopContent = ({
	posts,
	attributes,
	bottomStyle = false,
	Masonry = false,
	ResponsiveMasonry = Fragment,
	containerRef,
}) => {
	const { postGridLayout, contentVerticalPosition, gridFourColumns, masonryGap } = attributes;

	const deviceType = breakpoint();

	const skipPostForLargeLayouts = "Mobile" !== deviceType ? skipItemsForGridFourTopSection[postGridLayout] : 0;

	const largeItemPosition = gridFourLargeItemPosition[postGridLayout];

	const masonryGapCss = `${masonryGap?.device?.Desktop}${masonryGap?.unit?.Desktop}`;

	const columnsBreakPoints = Masonry
		? {
				columnsCountBreakPoints: {
					350: gridFourColumns?.device?.Mobile,
					750: gridFourColumns?.device?.Tablet,
					900: gridFourColumns?.device?.Desktop,
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
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			{Masonry && (
				<ResponsiveMasonry {...columnsBreakPoints}>
					<Masonry {...gutter}>
						{posts
							?.slice(
								bottomStyle ? skipPostForLargeLayouts : 0,
								bottomStyle ? posts?.length : skipPostForLargeLayouts
							)
							?.map((post, i) => (
								<TemplateOne
									key={post?.post_id}
									index={i}
									data={post}
									posts={posts}
									contentPosition={contentVerticalPosition}
									attributes={attributes}
									largeItemIndex={bottomStyle ? "" : i === largeItemPosition ? "large" : "no"}
									isSelected={selectedPostId === post?.post_id}
									onSelect={() => setSelectedPostId(post?.post_id)}
								/>
							))}
					</Masonry>
				</ResponsiveMasonry>
			)}
			{!Masonry &&
				posts
					?.slice(
						bottomStyle ? skipPostForLargeLayouts : 0,
						bottomStyle ? posts?.length : skipPostForLargeLayouts
					)
					?.map((post, i) => (
						<TemplateOne
							key={post?.post_id}
							index={i}
							data={post}
							posts={posts}
							contentPosition={contentVerticalPosition}
							attributes={attributes}
							largeItemIndex={bottomStyle ? "" : i === largeItemPosition ? "large" : "no"}
							isSelected={selectedPostId === post?.post_id}
							onSelect={() => setSelectedPostId(post?.post_id)}
						/>
					))}
		</>
	);
};

export default LoopContent;
