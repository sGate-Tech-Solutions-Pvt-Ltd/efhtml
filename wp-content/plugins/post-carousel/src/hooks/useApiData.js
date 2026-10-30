import { useEffect, useState } from "@wordpress/element";
import { jsonStringify } from "../blocks/shared/helpFn";
import { filterDndSelectValues, filteredTaxonomiesValues, queryFn } from "../controls/controls";
import { useSelect } from "@wordpress/data";

const useApiData = (attributes) => {
	const {
		postType,
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
		multipleFilterRelation,
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
		page_id,
		excludeDateAfter,
		excludeDateBefore,
		customFieldRelation,
		activeSeoPlugin,
		seoMetaShow,
		metaDateCustomDateFormat,
		metaDateFormat,
		paginationEnable,
		imageLazyLoad,
		imageSrcset,
		imageSize,
		catTabCategoryType,
	} = attributes;
	const pageId = useSelect((select) => select("core/editor")?.getCurrentPostId());
	const postId = page_id ? page_id : pageId;

	const [allData, setAllData] = useState({
		posts: [],
		postCount: {},
		postsStatus: true,
	});
	const filteredTaxonomies = filteredTaxonomiesValues(taxonomies);
	const filteredIncludedPost = filterDndSelectValues(includeOnlyPost);
	const filteredExcludePost = filterDndSelectValues(excludePost);

	const dependencies = {
		postType,
		blockName,
		quickQuery,
		postLimit,
		categories,
		filterByAuthor,
		filterByDate,
		filterByKeyword,
		filterByCustomFields,
		orderBy,
		orderDirection,
		excludePost: filteredExcludePost,
		excludeTerm,
		excludeAuthor,
		excludeStickyPosts,
		excludeCurrentPosts,
		excludeProtectedPosts,
		excludeChildrenPosts,
		excludePostWithoutImagePosts,
		termId,
		filterProduct,
		multipleFilterRelation,
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
		displayAdvertisement,
		multiplePostType,
		postId,
		page_id,
		excludeDateAfter,
		excludeDateBefore,
		customFieldRelation,
		activeSeoPlugin,
		seoMetaShow,
		metaDateCustomDateFormat,
		metaDateFormat,
		imageLazyLoad,
		imageSrcset,
		offset,
		imageSize,
		catTabCategoryType,
	};

	const queryData = {
		taxonomies: filteredTaxonomies,
		includeOnlyPost: filteredIncludedPost,
		paginationEnable,
		catTabCategoryType,
		// imageSize,
		...dependencies,
	};

	const fetchPosts = async () => {
		try {
			const data = new FormData();
			data.append("action", "sp_smart_post_block_post_query");
			data.append("nonce", sp_smart_post_block_localize.ajaxNonce);
			data.append("queryData", jsonStringify(queryData));
			const postQueryData = await queryFn(data);
			const { posts, post_count, posts_status } = postQueryData;

			setAllData({
				posts,
				postCount: post_count,
				postsStatus: posts_status,
			});
		} catch (error) {
			console.error("Error fetching posts:", error.message);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [
		jsonStringify({
			taxonomies,
			includeOnlyPost,
			...dependencies,
		}),
	]);
	return { ...allData, queryData };
};

export default useApiData;
