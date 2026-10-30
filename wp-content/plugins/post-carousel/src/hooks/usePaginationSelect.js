import { useDispatch, useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";

export const useSelectChildBlock = (parentClientId) => {
	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlock(parentClientId)?.innerBlocks || [],
		[parentClientId]
	);

	const { paginationType, navigationArrowPosition } = innerBlocks[0]?.attributes || {};

	useEffect(() => {
		if (innerBlocks.length === 0) {
			return;
		}
		if (paginationType && navigationArrowPosition) {
			updateBlockAttributes(parentClientId, {
				paginationTypeParent: paginationType,
				paginationPosition: navigationArrowPosition,
			});
		}
	}, [paginationType, navigationArrowPosition, parentClientId, innerBlocks]);
};
