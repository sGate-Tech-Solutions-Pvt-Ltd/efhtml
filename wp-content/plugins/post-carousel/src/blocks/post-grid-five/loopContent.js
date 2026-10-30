import { useEffect, useState } from "@wordpress/element";
import { breakpoint, inArray } from "../../controls/controls";
import TemplateOne from "../shared/templates/templateCards/templateOne";

const LoopContent = ({
	posts,
	attributes,
	bottomStyle = false,
	Masonry = false,
	ResponsiveMasonry = false,
	gridRef,
}) => {
	const { postGridLayout, contentVerticalPosition, gridFiveColumns, masonryGap } = attributes;

	const deviceType = breakpoint();

	const dynamicPosts =
		"Mobile" !== deviceType
			? inArray(["grid-five-layout-one", "grid-five-layout-two", "grid-five-layout-three"], postGridLayout)
				? 3
				: 4
			: 0;

	const masonryGapCss = `${masonryGap?.device?.Desktop}${masonryGap?.unit?.Desktop}`;

	const columnsBreakPoints = Masonry
		? {
				columnsCountBreakPoints: {
					350: gridFiveColumns?.device?.Mobile,
					750: gridFiveColumns?.device?.Tablet,
					900: gridFiveColumns?.device?.Desktop,
				},
				style: { marginTop: masonryGapCss },
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
			if (gridRef.current && !gridRef.current.contains(event.target)) {
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
							?.slice(bottomStyle ? dynamicPosts : 0, bottomStyle ? posts?.length : dynamicPosts)
							?.map((post) => (
								<TemplateOne
									key={post?.post_id}
									data={post}
									posts={posts}
									attributes={attributes}
									horizontalAlign={bottomStyle ? "" : false}
									contentPosition={bottomStyle ? "" : contentVerticalPosition}
									isSelected={selectedPostId === post?.post_id}
									onSelect={() => setSelectedPostId(post?.post_id)}
								/>
							))}
					</Masonry>
				</ResponsiveMasonry>
			)}
			{!Masonry &&
				posts
					?.slice(bottomStyle ? dynamicPosts : 0, bottomStyle ? posts?.length : dynamicPosts)
					?.map((post) => (
						<TemplateOne
							key={post?.post_id}
							data={post}
							posts={posts}
							attributes={attributes}
							horizontalAlign={bottomStyle ? "" : false}
							contentPosition={bottomStyle ? "" : contentVerticalPosition}
							isSelected={selectedPostId === post?.post_id}
							onSelect={() => setSelectedPostId(post?.post_id)}
						/>
					))}
		</>
	);
};

export default LoopContent;
