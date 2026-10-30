import { Fragment, useEffect, useState } from "@wordpress/element";
import { skipItemsForGridThreeTopSection } from "../../controls/constants";
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
	const { postGridLayout, contentAreaHeight, contentVerticalPosition, gridThreeColumns, masonryGap } = attributes;

	const deviceType = useDeviceType();

	const skipPostForLargeLayouts = "Mobile" !== deviceType ? skipItemsForGridThreeTopSection[postGridLayout] : 0;

	const masonryGapCss = `${masonryGap?.device?.Desktop}${masonryGap?.unit?.Desktop}`;

	const columnsBreakPoints = Masonry
		? {
				columnsCountBreakPoints: {
					350: gridThreeColumns?.device?.Mobile,
					750: gridThreeColumns?.device?.Tablet,
					900: gridThreeColumns?.device?.Desktop,
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
							?.slice(
								bottomStyle ? skipPostForLargeLayouts : 0,
								bottomStyle ? posts?.length : skipPostForLargeLayouts
							)
							?.map((post, i) => (
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
				posts
					?.slice(
						bottomStyle ? skipPostForLargeLayouts : 0,
						bottomStyle ? posts?.length : skipPostForLargeLayouts
					)
					?.map((post, i) => (
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
		</>
	);
};

export default LoopContent;
