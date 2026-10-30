import { subscribe, select } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";
import { parse, getBlockType } from "@wordpress/blocks";

const processBlocksRecursively = (blocks) => {
	if (!blocks || !blocks.length) {
		return { css: "", fonts: [], hasOurBlock: false, blockName: [] };
	}
	let combinedCSS = "";
	let blockNames = [];
	const fonts = [];
	let hasOurBlock = false;

	blocks.forEach((block) => {
		const uniqueId = block.attributes?.uniqueId;
		// Detect our custom blocks.
		if (
			uniqueId &&
			(uniqueId.startsWith("sp-smart-") ||
				uniqueId.startsWith("sp-section-") ||
				uniqueId.startsWith("sp-social-"))
		) {
			hasOurBlock = true;
			const blockFonts = block.attributes?.fontLists ?? "";
			if (typeof blockFonts === "string" && blockFonts.trim()) {
				try {
					const parsed = JSON.parse(blockFonts);
					if (Array.isArray(parsed) && parsed.length) {
						fonts.push(...parsed);
					}
				} catch (e) {
					if (/^[A-Za-z0-9\s]+:\d+$/.test(blockFonts)) {
						fonts.push(blockFonts);
					}
				}
			}

			const blockType = getBlockType(block.name);
			if (blockType?.generateCSS) {
				const css = blockType.generateCSS(block.attributes, block.name);
				blockNames.push(block.name);
				combinedCSS += `/* CSS for ${block.name} - ${uniqueId} */\n${css}\n`;
			}
		}

		// recurse children
		if (block.innerBlocks?.length) {
			const {
				css: childCSS,
				fonts: childFonts,
				hasOurBlock: childHas,
				blockName: blockName,
			} = processBlocksRecursively(block.innerBlocks);

			combinedCSS += childCSS;
			fonts.push(...childFonts);
			blockNames.push(...blockName);
			if (childHas) {
				hasOurBlock = true;
			}
		}
	});

	const uniqueFonts = [...new Set(fonts.filter((f) => /^[A-Za-z0-9\s]+:\d+$/.test(f)))];
	blockNames = [...new Set(blockNames.map((name) => name.split("/").pop()))];
	return {
		css: combinedCSS || "",
		fonts: uniqueFonts || [],
		hasOurBlock,
		blockName: blockNames,
	};
};

/**
 * Recursively collect all reusable block refs (core/block with attributes.ref)
 * Returns an array of unique ref IDs (numbers/strings).
 * @param blocks
 * @param set
 */
const collectReusableRefs = (blocks, set = new Set()) => {
	if (!blocks || !blocks.length) {
		return set;
	}
	blocks.forEach((block) => {
		if (block.name === "core/block" && block.attributes?.ref) {
			set.add(block.attributes.ref);
		}
		if (block.innerBlocks?.length) {
			collectReusableRefs(block.innerBlocks, set);
		}
	});
	return set;
};

/**
 * Main save handler:
 * - watches saves for postType entities (except wp_block themselves)
 * - when saving, parse content, collect reusable refs
 * - for each ref: fetch reusable block, parse, if has our block -> POST to smart-save-block-css with slug 'wp_block'
 * - also send the usual API for the main post if it has our block.
 */
const saveBlockCSS = () => {
	let previousSaving = false;

	subscribe(() => {
		const { __experimentalGetDirtyEntityRecords, isSavingEntityRecord, getEditedEntityRecord } = select("core");

		const coreEditor = select("core/editor");
		const dirtyEntities = __experimentalGetDirtyEntityRecords();

		// detect a real save (not autosave)
		// const isSaving = dirtyEntities.some((record) =>
		// 	isSavingEntityRecord(record.kind, record.name, record.key)
		// );
		const isSaving = dirtyEntities.some((record) => {
			const entity = getEditedEntityRecord(record.kind, record.name, record.key);
			if (!entity) {
				return false;
			}
			return isSavingEntityRecord(record.kind, record.name, record.key);
		});

		const isAutosavingPost = coreEditor?.isAutosavingPost ? () => coreEditor.isAutosavingPost() : () => false;
		// console.log(!previousSaving, !isAutosavingPost(), isSaving);
		const shouldTrigger = !previousSaving && !isAutosavingPost() && isSaving;

		if (!shouldTrigger) {
			previousSaving = isSaving;
			return;
		}
		// We'll run the async work in an IIFE so subscribe() stays sync.
		(async () => {
			// keep track of refs processed in this save to avoid duplicate API calls.
			const processedRefs = new Set();
			for (const entity of dirtyEntities) {
				// Only care about postType entities (posts/pages/templates), skip wp_block here.
				if (entity.kind !== "postType" && entity.name !== "widget") {
					continue;
				}
				const record = getEditedEntityRecord(entity.kind, entity.name, entity.key);
				// Determine postId for main API (fallbacks like earlier).
				let postId = record?.id || entity.name || "unknown";
				if (entity.name === "wp_template_part" || entity.name === "wp_template" || entity.name === "widget") {
					postId = entity.name;
				}
				if (entity.name === "wp_block") {
					record.slug = "wp_block";
				}
				// Extract content safely (mirror your previous logic)
				let content = "";
				let widgetId = "";
				if (entity.name === "widget") {
					content = record.instance?.raw?.content || "";
					widgetId = record?.id || "";
				} else if (typeof record.content === "string") {
					content = record.content;
				} else if (typeof record.content === "function") {
					try {
						if (record.blocks) {
							if (wp.blocks && wp.blocks.__unstableSerializeAndClean) {
								content = wp.blocks.__unstableSerializeAndClean(record.blocks);
							} else {
								content = "";
							}
						} else {
							content = "";
						}
					} catch (error) {
						// eslint-disable-next-line no-console
						console.log("Error processing content function:", error);
						content = "";
					}
				} else if (record.content && typeof record.content === "object") {
					content = record.content.raw || "";
				} else {
					content = "NO Content Found";
				}

				if (!content || typeof content !== "string") {
					continue;
				}

				// Parse main content blocks.
				let blocks = [];
				try {
					blocks = parse(content);
				} catch (err) {
					// eslint-disable-next-line no-console
					console.log("Error parsing content blocks:", err);
					continue;
				}
				// Collect all reusable refs used inside this content

				const refsSet = collectReusableRefs(blocks);
				// Main post: if it has our block -> send API (same as before)
				const { css: mainCSS, fonts: mainFonts, blockName: blockName } = processBlocksRecursively(blocks);
				try {
					await apiFetch({
						path: "/sp-smart-post/v2/smart-save-block-css",
						method: "POST",
						data: {
							post_id: postId,
							nonce: sp_smart_post_block_localize.ajaxNonce,
							slug: record?.slug || "",
							widget_id: widgetId, // only for widgets earlier
							theme: record?.theme || "",
							block_css: mainCSS || "",
							fonts: mainFonts || [],
							preview: false,
							has_block: mainCSS?.length > 1,
							block_names: blockName,
							has_refs: refsSet?.size > 0,
						},
					});
				} catch (err) {
					// eslint-disable-next-line no-console
					console.log("Main post CSS save error:", err);
				}

				if (!refsSet || refsSet.size === 0) {
					continue;
				}
				// For each unique ref, fetch reusable block content and if it has our blocks -> send API
				for (const refId of refsSet) {
					// Skip if already processed in this save.
					if (processedRefs.has(refId)) {
						continue;
					}

					processedRefs.add(refId);

					try {
						const reusable = await apiFetch({
							path: `/wp/v2/blocks/${refId}`,
						});

						// Support different shapes: prefer content.raw but tolerate fallback.
						const rawContent =
							reusable?.content?.raw ??
							reusable?.content?.rendered ??
							(typeof reusable?.content === "string" ? reusable.content : "");

						if (!rawContent || typeof rawContent !== "string") {
							continue;
						}
						let innerBlocks = [];
						try {
							innerBlocks = parse(rawContent);
						} catch (err) {
							console.log(`Error parsing reusable block (${refId}) content:`, err);
							continue;
						}

						const {
							css: innerCSS,
							fonts: innerFonts,
							hasOurBlock: innerHas,
							blockName: blockName,
						} = processBlocksRecursively(innerBlocks);

						// Send api for the reusable block.
						try {
							await apiFetch({
								path: "/sp-smart-post/v2/smart-save-block-css",
								method: "POST",
								data: {
									post_id: postId,
									ref_id: refId,
									nonce: sp_smart_post_block_localize.ajaxNonce,
									slug: record?.slug,
									widget_id: "",
									theme: record?.theme || "",
									block_css: innerCSS || "",
									fonts: innerFonts || [],
									preview: false,
									block_type: "wp_block",
									reusable_block_ids: Array.from(refsSet),
									has_block: innerCSS?.length > 1,
									block_names: blockName,
								},
							});
							// optional: console.log('Reusable block saved:', refId);
						} catch (err) {
							console.log(`Reusable block CSS save error for ref ${refId}:`, err);
						}
					} catch (err) {
						console.log(`Error fetching reusable block ${refId}:`, err);
					}
				} // end loop refs
			} // end loop entities
		})(); // end IIFE
		previousSaving = isSaving;
	});
};

export default saveBlockCSS;
