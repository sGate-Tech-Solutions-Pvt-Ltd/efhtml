import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useMemo } from "@wordpress/element";

const blockNameList = [
	"post-carousel",
	"post-carousel-two",
	"post-slider",
	"post-slider-two",
	"news-ticker",
	"post-grid-one",
	"post-grid-two",
	"post-grid-three",
	"post-grid-four",
	"post-grid-five",
	"post-grid-six",
	"post-list-one",
	"post-list-two",
	"post-list-three",
	"post-timeline-one",
	"post-timeline-two",
	"post-timeline-three",
];

const ALLOWED_BLOCKS = [
	"sp-smart-post-show/post-carousel",
	"sp-smart-post-show/post-carousel-two",
	"sp-smart-post-show/post-slider",
	"sp-smart-post-show/post-slider-two",
	"sp-smart-post-show/news-ticker",
	"sp-smart-post-show/post-grid-one",
	"sp-smart-post-show/post-grid-two",
	"sp-smart-post-show/post-grid-three",
	"sp-smart-post-show/post-grid-four",
	"sp-smart-post-show/post-grid-five",
	"sp-smart-post-show/post-grid-six",
	"sp-smart-post-show/post-list-one",
	"sp-smart-post-show/post-list-two",
	"sp-smart-post-show/post-list-three",
	"sp-smart-post-show/post-timeline-one",
	"sp-smart-post-show/post-timeline-two",
	"sp-smart-post-show/post-timeline-three",
];

const Edit = ({ clientId }) => {
	const blockProps = useBlockProps();
	const { updateBlockAttributes } = useDispatch("core/block-editor");

	// All child blocks
	const innerBlocks = useSelect((select) => select("core/block-editor").getBlocks(clientId), [clientId]);

	// Find main post block
	const findBlock = useMemo(
		() => innerBlocks.find((block) => blockNameList.includes(block.name.replace("sp-smart-post-show/", ""))),
		[innerBlocks]
	);

	// Find live-filter block
	const filterBlock = useMemo(
		() => innerBlocks.find((block) => block.name === "sp-smart-post-show/live-filter"),
		[innerBlocks]
	);

	// Get inner blocks of live-filter
	const filterInnerBlocks = useSelect(
		(select) => (filterBlock?.clientId ? select("core/block-editor").getBlocks(filterBlock.clientId) : []),
		[filterBlock?.clientId]
	);

	// Sync postType between blocks
	useEffect(() => {
		if (!findBlock || !filterBlock) return;

		const multiplePostType = findBlock.attributes?.multiplePostType;
		const postQuery = findBlock.attributes?.postQuery;

		// Update live-filter block only if value is different
		updateBlockAttributes(filterBlock.clientId, {
			multiplePostType,
			postQuery,
		});

		// Update all child blocks of live-filter if value differs
		filterInnerBlocks.forEach((block) => {
			updateBlockAttributes(block.clientId, {
				multiplePostType,
				postQuery,
			});
		});
	}, [
		findBlock?.attributes?.multiplePostType,
		filterBlock?.clientId,
		filterInnerBlocks,
		findBlock?.attributes?.postQuery,
	]);

	return (
		<div {...blockProps}>
			<InnerBlocks allowedBlocks={[findBlock?.name]} renderAppender={() => null} templateLock={ false } />
		</div>
	);
};

export default Edit;
