import { useEffect, useState } from "@wordpress/element";
import { jsonStringify } from "../blocks/shared/helpFn";
import { filterDndSelectValues, filteredTaxonomiesValues, queryFn } from "../controls/controls";
import { useSelect } from "@wordpress/data";

const useMetaData = (attributes, editSite = "frontend") => {
	const {
		postType,
		uniqueId,
		multiplePostType,
		quickQuery,
		postLimit,
		offset,
		taxonomies,
		categories,
		filterByAuthor,
		filterByDate,
		filterByKeyword,
		filterByCustomFields,
		orderBy,
		orderDirection,
		includeOnlyPost,
		excludePost,
		excludeTerm,
		excludeAuthor,
		excludeStickyPosts,
		excludeCurrentPosts,
		excludeProtectedPosts,
		excludeChildrenPosts,
		excludePostWithoutImagePosts,
		termId,
		filterProduct,
		relation,
		specificDate,
		specificMonth,
		specificYear,
		specificPeriodAfter,
		specificPeriodBefore,
		specificDateBefore,
		specificDateAfter,
		keywordSearch,
		currentPage,
		itemsPerPage,
		blockName,
		displayAdvertisement,
		page_id,
		excludeDateAfter,
		excludeDateBefore,
	} = attributes;

	// const postId = page_id ? page_id : useSelect((select) => select("core/editor")?.getCurrentPostId());
	const postId = 0;

	const [metaData, setMetaData] = useState({
		authors: [],
		authorList: [],
		allTaxonomies: [],
		postCount: {},
		imageSizes: [],
		allPostTypes: [],
		allMetaKeys: [],
	});

	const filteredTaxonomies = filteredTaxonomiesValues(taxonomies);
	const filteredIncludedPost = filterDndSelectValues(includeOnlyPost);

	const dependencies = {
		postType,
		blockName,
		quickQuery,
		postLimit,
		offset,
		categories,
		filterByAuthor,
		filterByDate,
		filterByKeyword,
		filterByCustomFields,
		orderBy,
		orderDirection,
		excludePost,
		excludeTerm,
		excludeAuthor,
		excludeStickyPosts,
		excludeCurrentPosts,
		excludeProtectedPosts,
		excludeChildrenPosts,
		excludePostWithoutImagePosts,
		termId,
		filterProduct,
		relation,
		specificDate,
		specificMonth,
		specificYear,
		specificPeriodAfter,
		specificPeriodBefore,
		specificDateBefore,
		specificDateAfter,
		keywordSearch,
		currentPage,
		blockName,
		displayAdvertisement,
		multiplePostType,
		postId,
		page_id,
		excludeDateAfter,
		editSite,
		excludeDateBefore,
		taxonomies: filteredTaxonomies,
		includeOnlyPost: filteredIncludedPost,
	};

	const queryData = {
		...dependencies,
	};

	const data = new FormData();
	// const queryData = { postType, multiplePostType };
	data.append("nonce", sp_smart_post_block_localize.ajaxNonce);
	data.append("action", "sp_smart_post_block_meta_data_query");
	data.append("metaQueryData", jsonStringify(queryData));

	const fetchMetaData = async () => {
		try {
			const apiData = await queryFn(data);
			const {
				authors,
				taxonomies,
				author_list,
				post_count,
				image_sizes,
				all_post_type_list,
				all_meta_field_list,
			} = apiData;
			setMetaData({
				authors,
				authorList: author_list,
				allTaxonomies: taxonomies,
				postCount: post_count,
				imageSizes: image_sizes,
				allPostTypes: all_post_type_list ? all_post_type_list : {},
				allMetaKeys: all_meta_field_list,
			});
		} catch (error) {
			console.log("Error fetching metadata:", error.message);
		}
	};

	useEffect(() => {
		const allTemplatesRoute =
			window.location.search.includes("p=%2Ftemplate") || window.location.search.includes("p=/template");
		if (!allTemplatesRoute) {
			fetchMetaData();
		}
	}, [jsonStringify(queryData)]);
	return metaData;
};

export default useMetaData;
