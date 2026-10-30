import { Fragment, useEffect, useState } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import TemplateOne from "../shared/templates/templateCards/templateOne";

const LoopContent = ({
	posts,
	attributes,
	bottomStyle = false,
	Masonry = false,
	ResponsiveMasonry = Fragment,
	containerRef,
}) => {
	const { postGridLayout, contentAreaHeight, contentVerticalPosition, gridTwoColumns, masonryGap } = attributes;

	const deviceType = useDeviceType();

	// const skipPostForLargeLayouts =
	// 	skipItemsForGridThreeTopSection[ postGridLayout ];

	const masonryGapCss = `${masonryGap?.device?.Desktop}${masonryGap?.unit?.Desktop}`;

	const columnsBreakPoints = Masonry
		? {
				columnsCountBreakPoints: {
					350: gridTwoColumns?.device?.Mobile,
					750: gridTwoColumns?.device?.Tablet,
					900: gridTwoColumns?.device?.Desktop,
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
						{posts?.map((post, i) => (
							<TemplateOne
								key={post?.post_id}
								data={post}
								posts={posts}
								containerVAlign={false}
								horizontalAlign={false}
								contentPosition={contentVerticalPosition}
								attributes={attributes}
								contentHeight={`${
									contentAreaHeight?.device?.[deviceType] + contentAreaHeight?.unit?.[deviceType]
								}`}
								layoutName={postGridLayout}
								isSelected={selectedPostId === post?.post_id}
								onSelect={() => setSelectedPostId(post?.post_id)}
							/>
						))}
					</Masonry>
				</ResponsiveMasonry>
			)}
			{!Masonry &&
				posts?.map((post, i) => (
					<TemplateOne
						key={post?.post_id}
						data={post}
						posts={posts}
						containerVAlign={false}
						horizontalAlign={false}
						contentPosition={contentVerticalPosition}
						attributes={attributes}
						contentHeight={`${contentAreaHeight?.device?.[deviceType] + contentAreaHeight?.unit?.[deviceType]}`}
						layoutName={postGridLayout}
						isSelected={selectedPostId === post?.post_id}
						onSelect={() => setSelectedPostId(post?.post_id)}
					/>
				))}
		</>
	);
};

export default LoopContent;
