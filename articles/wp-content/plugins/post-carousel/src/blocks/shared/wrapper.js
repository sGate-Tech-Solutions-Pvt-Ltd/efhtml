import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import {InnerBlocks, store as blockEditorStore } from "@wordpress/block-editor";
import { useAddChildBlock, jsonStringify } from "./helpFn";
import useApiData from "../../hooks/useApiData";
import preloader from "../../../public/assets/img/preloader.svg";
import { useSelectChildBlock } from "../../hooks/usePaginationSelect";
import { googleFonts } from "../../controls/controls";
import useBlockLocation from "../../hooks/useBlockLocation";

export const EditorWrapper = ({ children, setPosts, setAttributes, blockType = "", customClass = "" }) => {
	const { attributes } = children?.props;

	const { posts, postsStatus, postCount, queryData } = useApiData(attributes);

	const {
		uniqueId,
		additionalCssClass,
		equalHeightEnable,
		noResultFoundResult,
		blockName,
		paginationEnable,
		paginationPosition,
		preloaderEnable,
		liveFilterEnable,
		clientId,
		postLimit,
		titleTypography,
		largeItemTitleTypography,
		catTabCategoryTypography,
		metaTypography,
		excerptTypography,
		readMoreButtonTypography,
		paginationTypography,
		headingTypography,
		tickerTitleTypography,
		tickerDateTypography,
		paginationTypeParent,
		postBadgesTypography,
	} = attributes;

	const liveFilterRelation = useSelect((select) => {

		const parentId = select(blockEditorStore).getBlockRootClientId(clientId);

		if (!parentId) return null;

		const parentBlock = select(blockEditorStore).getBlock(parentId);

		return parentBlock?.attributes?.multipleFilterRelation || null;

	}, []);

	if (clientId) {
		// Select Pagination Child Blocks
		useSelectChildBlock(clientId, paginationEnable);
		useAddChildBlock(liveFilterEnable, paginationEnable, clientId);

		const _blockLocator = useBlockLocation(clientId);
		
		useEffect(() => {
			// Remove null or empty values.
			const cleanLocation = Object.fromEntries(
				Object.entries(_blockLocator).filter(([, value]) => value !== null && value !== "")
			);

			setAttributes({
				blockLocation: JSON.stringify(cleanLocation),
				multipleFilterRelation: liveFilterRelation
			});

		}, [_blockLocator, liveFilterRelation]);
	}

	const googleFontLists = [
		titleTypography,
		largeItemTitleTypography,
		catTabCategoryTypography,
		metaTypography,
		excerptTypography,
		readMoreButtonTypography,
		paginationTypography,
		headingTypography,
		tickerTitleTypography,
		tickerDateTypography,
		postBadgesTypography,
	];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists),
		});
	}, googleFontLists);

	useEffect(() => {
		setPosts(posts);
	}, [posts]);

	// improvement: update queryData on save rather saving on every render
	useEffect(() => {
		if ( attributes?.postQuery !== JSON.stringify( queryData ) ) {
			setAttributes({
				postQuery: jsonStringify(queryData),
			});
		}
	}, [queryData]);

	if (posts?.length < 1) {
		return postsStatus !== false && preloaderEnable ? (
			<div className="sp-smart-post-preloader">
				<img src={preloader} alt="smart post preloader" />
			</div>
		) : (
			<h4>{noResultFoundResult ? noResultFoundResult : "No post found"}</h4>
		);
	}
	return (
		<div
			id={uniqueId}
			className={`sp-smart-post-wrapper ${additionalCssClass} sp-smart-${blockName}-editor-page sp-smart-${blockName} ${
				equalHeightEnable ? "sp-smart-post-show-equal-height" : ""
			} ${customClass}`}
		>
			{uniqueId && (
				<>
					<div
						className={`sp-smart-post-block-with-pagination pagination-${paginationTypeParent === "navigation" ? paginationPosition : "bottom"}`}
					>
						{children}
						{blockType !== "builder-block" && paginationEnable && postCount > postLimit && (
							<InnerBlocks
								allowedBlocks={["sp-smart-post-show/pagination"]}
								template={[["sp-smart-post-show/pagination"]]}
								templateLock="all"
								__experimentalLayout={{
									type: "default",
								}}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};
