import { useState } from "@wordpress/element";

const useSearch = (attributes) => {
	const { postType, selectedTaxonomy, initialPostDisplay } = attributes;
	const [allData, setAllData] = useState({
		posts: [],
		remaining_posts: {},
	});

	const fetchPosts = async (searchText, term) => {
		try {
			if (!searchText) {
				return;
			}
			const query = {
				postType,
				s: searchText,
				term,
				taxonomyType: selectedTaxonomy,
				postLimit: initialPostDisplay?.value,
				page: "editor",
			};
			return fetch(sp_smart_post_block_localize.searchRestUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(query),
			})
				.then((res) => res.json())
				.then((data) => {
					setAllData({
						posts: data?.posts,
						remaining_posts: data?.remaining_posts,
					});
				});
		} catch (error) {
			console.error("Error fetching posts:", error.message);
		}
	};

	return { ...allData, fetchPosts };
};

export default useSearch;
