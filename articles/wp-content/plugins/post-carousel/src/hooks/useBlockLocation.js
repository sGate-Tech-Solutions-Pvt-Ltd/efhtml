import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

const useBlockLocation = (clientId) => {
	return useSelect(
		(select) => {
			const { getBlockParentsByBlockName, getBlock } = select(blockEditorStore);
			const editPost = select("core/edit-post");
			const editSite = select("core/edit-site");
			let editorType = "unknown";
			let postType = null;
			let templateId = null;
			let areaName = null;
			// Determine editor context
			if (editPost?.getCurrentPostType) {
				editorType = "post-editor";
				postType = editPost.getCurrentPostType();
			} else if (editSite?.getEditedPostId) {
				editorType = "site-editor";
				templateId = editSite.getEditedPostId();
				postType = editSite.getEditedPostType?.() || "";
			}
			const coreParents = getBlockParentsByBlockName(clientId, "core/block");
			if (coreParents.length > 0) {
				const parentBlock = getBlock(coreParents[coreParents.length - 1]);
				areaName = parentBlock?.attributes?.ref || "unknown";
				return {
					location: "wp_block",
					editor: editorType,
					areaName,
					blockType: "wp_block",
				};
			}
			// Check for widget area
			const widgetParents = getBlockParentsByBlockName(clientId, "core/widget-area");
			if (widgetParents.length > 0) {
				const parentBlock = getBlock(widgetParents[widgetParents.length - 1]);
				return {
					location: "widget-area",
					editor: editorType,
					areaName: parentBlock?.attributes?.id || "unknown",
					templateId,
					postType,
					blockType: "widget-area",
				};
			}

			// Check for template part
			const templatePartParents = getBlockParentsByBlockName(clientId, "core/template-part");
			if (templatePartParents.length > 0) {
				const parentBlock = getBlock(templatePartParents[templatePartParents.length - 1]);
				areaName = parentBlock?.attributes?.area || parentBlock?.attributes?.slug || "unknown";

				return {
					location: "wp_template_part",
					editor: editorType,
					areaName,
					templateId: areaName, // Use area name as template ID for template parts
					postType: "wp_template_part",
					blockType: "template-part",
				};
			}

			// Check for template
			const templateParents = getBlockParentsByBlockName(clientId, "core/template");
			if (templateParents.length > 0) {
				return {
					location: "wp_template",
					editor: editorType,
					templateId,
					postType: "wp_template",
					blockType: "template",
				};
			}

			if (editSite?.getEditedPostId) {
				editorType = "site-editor";
				templateId = editSite.getEditedPostId();
				postType = editSite.getEditedPostType?.() || "";
				return {
					location: "wp_template",
					editor: editorType,
					postType,
					templateId,
					blockType: "site-editor",
				};
			}

			// Default: Post content
			return {
				location: "post-content",
				editor: editorType,
				postType,
				templateId,
				blockType: "post-content",
			};
		},
		[clientId]
	);
};

export default useBlockLocation;
