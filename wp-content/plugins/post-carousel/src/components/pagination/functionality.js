import { useEffect, useState } from "@wordpress/element";
import { debounce } from "../../controls/controls";
import { jsonStringify } from "../../blocks/shared/helpFn";

export const usePaginationFn = ({
	posts,
	postCount,
	attributes,
	observerRef,
	ref,
	currentPage,
	setCurrentPage,
	setLoadMorePagination,
	ajaxLiveFilter = {},
	loadMorePagination = false,
}) => {
	const { postLimit, itemsPerPage, loadMoreInfiniteScroll, paginationType, paginationEnable } = attributes;
	// states
	const [allPosts, setAllPosts] = useState([]);
	const [height, setHeight] = useState("");
	const [loading, setLoading] = useState(false);

	const allPostLimit = postLimit > postCount ? postCount : postLimit;

	const totalPage = Math.ceil(allPostLimit / itemsPerPage);

	const handleScroll = () => {
		const offsetTop = observerRef.current.offsetTop - 1000;
		const scrollXPosition = window.scrollY;
		if (offsetTop < scrollXPosition) {
			setLoading(true);
			setLoadMorePagination(true);
		}
	};

	if (loadMoreInfiniteScroll) {
		window.addEventListener("scroll", debounce(handleScroll, 0));
	}

	useEffect(() => {
		if (loading === true && currentPage < totalPage) {
			setCurrentPage((prev) => prev + 1);
		}
	}, [loading]);

	useEffect(() => {
		setAllPosts((prevPosts) => {
			if (loadMorePagination) {
				return [...prevPosts, ...posts];
			}
			return posts;
		});
		setLoading(false);
	}, [posts]);

	useEffect(() => {
		setAllPosts([]);
		setCurrentPage(1);
	}, [jsonStringify(ajaxLiveFilter)]);

	useEffect(() => {
		// if ('load-more' === paginationType) {
		// 	return
		// };

		const style = ref?.current?.style;
		if ("load-more" !== paginationType && posts?.length > 0) {
			style.height = `${height}px`;

			setTimeout(() => {
				style.height = ``;
			}, 60);
		}
	}, [currentPage, height, allPosts]);

	useEffect(() => {
		// if ('load-more' === paginationType) return;
		if ("load-more" !== paginationType && posts?.length > 0) {
			setTimeout(() => {
				setHeight(ref.current?.offsetHeight);
			}, 500);
		}
	}, [allPosts]);

	return {
		allPosts: paginationEnable ? allPosts : posts,
		currentPage: currentPage,
		height: height,
		loading: loading,
		setCurrentPage: setCurrentPage,
	};
};
