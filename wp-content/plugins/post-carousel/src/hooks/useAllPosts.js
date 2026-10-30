import { useEffect, useState } from "@wordpress/element";
import { jsonStringify } from "../blocks/shared/helpFn";
import { filterDndSelectValues, queryFn } from "../controls/controls";
import { useSelect } from "@wordpress/data";

const useAllPosts = (attributes) => {
	const {
		postType,
		multiplePostType,
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
		itemsPerPage,
		blockName,
		displayAdvertisement,
		page_id,
		excludeDateAfter,
		excludeDateBefore,
		liveSearchText,
	} = attributes;

	const filteredExcludePost = filterDndSelectValues(excludePost);
	const coreEditor = useSelect((select) => select("core/editor"));

	const postId = page_id ? page_id : coreEditor?.getCurrentPostId();

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
		displayAdvertisement,
		multiplePostType,
		postId,
		page_id,
		excludeDateAfter,
		excludeDateBefore,
		liveSearchText,
		multipleFilterRelation
	};

	const [allData, setAllData] = useState({ allPosts: [] });

	const fetchAllPosts = async () => {
		const data = new FormData();
		data.append("nonce", sp_smart_post_block_localize.ajaxNonce);
		data.append("action", "sp_smart_post_block_all_post_query");
		data.append(
			"postQueryData",
			jsonStringify({
				...dependencies,
			})
		);
		try {
			const { posts } = await queryFn(data);

			setAllData({ allPosts: posts });
		} catch (error) {
			console.error("Error fetching all posts:", error.message);
		}
	};

	useEffect(() => {
		fetchAllPosts();
	}, [jsonStringify(dependencies)]);
	return allData;
};

export default useAllPosts;
