import { useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

const useUpdateParentAttributes = (clientId, data) => {

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	// Get parent block id
	const parentId = useSelect((select) => {
		return select(blockEditorStore).getBlockRootClientId(clientId);
	}, [clientId]);

	useEffect(() => {

		if (parentId) {
			updateBlockAttributes(parentId, {
				multipleFilterRelation: data,
			});
		}

	}, [data, parentId]);

};

export default useUpdateParentAttributes;