import { useEffect, useRef, useState } from "@wordpress/element";
import { jsonParse } from "../../blocks/shared/helpFn";
import Pagination from "../../blocks/shared/templates/templates-parts/pagination";
import { usePaginationFn } from "./functionality";
import useApiData from "../../hooks/useApiData";
import useMetaData from "../../hooks/useMetaData";

export const EditorPaginationWrapper = ({ children }) => {
	const { attributes, posts } = children?.props;
	const { postCount } = useMetaData(attributes);
	const { uniqueId, paginationEnable, navigationArrowPosition, paginationType } = jsonParse(attributes);

	return (
		<div id={uniqueId}>
			{posts?.length > 0 && (
				<>
					{/* top pagination  */}
					{paginationEnable && paginationType === "navigation" && navigationArrowPosition === "top" && (
						<Pagination attributes={attributes} />
					)}
					{/* render component  */}
					{children}
					{/* bottom pagination  */}
					{paginationEnable && paginationType === "navigation" && navigationArrowPosition === "bottom" && (
						<Pagination attributes={attributes} />
					)}
					{paginationEnable && paginationType !== "navigation" && (
						<Pagination currentPage={1} postCount={postCount} attributes={attributes} />
					)}
				</>
			)}
		</div>
	);
};

export const SavePaginationWrapper = ({ children, setPosts }) => {
	const observerRef = useRef(null);
	const ref = useRef(null);
	const [currentPage, setCurrentPage] = useState(1);
	const { attributes } = children?.props;
	const parsedAttr = jsonParse(attributes);
	const { paginationEnable, navigationArrowPosition, paginationType, uniqueId } = parsedAttr;
	const { posts, postCount } = useApiData({
		...parsedAttr,
		currentPage: currentPage,
	});

	const { allPosts } = usePaginationFn({
		posts: posts,
		postCount: postCount,
		attributes: parsedAttr,
		observerRef: observerRef,
		ref: ref,
		currentPage: currentPage,
		setCurrentPage: setCurrentPage,
	});

	useEffect(() => {
		setPosts(allPosts);
	}, [allPosts]);

	return (
		<div id={uniqueId} ref={ref}>
			{paginationEnable &&
				paginationType === "navigation" &&
				navigationArrowPosition === "top" &&
				posts?.length > 0 && (
					<Pagination
						postCount={postCount}
						attributes={attributes}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				)}
			{children}
			{paginationEnable &&
				paginationType === "navigation" &&
				navigationArrowPosition === "bottom" &&
				posts?.length > 0 && (
					<Pagination
						postCount={postCount}
						attributes={attributes}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				)}
			{paginationEnable && paginationType !== "navigation" && posts?.length > 0 && (
				<Pagination
					postCount={postCount}
					attributes={attributes}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
			<div ref={observerRef}></div>
		</div>
	);
};
