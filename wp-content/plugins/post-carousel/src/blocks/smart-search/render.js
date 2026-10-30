import classNames from "classnames";
import { SearchIcon } from "./icons";
import { useState, useEffect, useRef, useCallback } from "@wordpress/element";
import useSearch from "../../hooks/useSearch";
import { Excerpt } from "../shared/templates/templates-parts/templates-parts";
import { findDataFromArray } from "../../controls/controls";
import useMetaData from "../../hooks/useMetaData";

const Render = ({ attributes }) => {
	const { displayType, searchResultDisplayType } = attributes;
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	return (
		<>
			{"popup" === displayType && (
				<div className="sp-smart-post-search-trigger">
					<button
						className="sp-smart-post-search-trigger-button"
						onClick={() => setIsPopupOpen((prev) => !prev)}
					>
						<SearchIcon />
					</button>
				</div>
			)}
			{displayType === "popup" && (
				<div
					className={classNames(
						"sp-smart-post-search-overlay",
						searchResultDisplayType,
						isPopupOpen && "sp-d-block"
					)}
					onClick={() => setIsPopupOpen(false)}
				></div>
			)}
			<SmartSearchBody attributes={attributes} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
		</>
	);
};

const SmartSearchBody = ({ attributes, isPopupOpen, setIsPopupOpen }) => {
	const { displayType, popupHeadingText, enablePopupHeading, popupHeadingGlobalTypography, enablePopupCloseButton } =
		attributes;
	const { posts, remaining_posts, fetchPosts } = useSearch(attributes);
	const [isLoading, setIsLoading] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [isShow, setIsShow] = useState(!!searchText && !isLoading);
	const [popupClass, setPopupClass] = useState("");
	const searchRef = useRef(null);

	useEffect(() => {
		if (!!searchText && !isLoading) {
			setIsShow(true);
		}
	}, [searchText, isLoading]);

	useEffect(() => {
		if (!searchRef.current) {
			return;
		}

		const updatePosition = () => {
			const rect = searchRef.current.getBoundingClientRect();
			const viewportWidth = document.documentElement.clientWidth;

			if (rect.right > viewportWidth) {
				setPopupClass("sp-popup-position-right");
			} else {
				setPopupClass("sp-popup-position-left");
			}
		};

		updatePosition();
		window.addEventListener("resize", updatePosition);

		return () => {
			window.removeEventListener("resize", updatePosition);
		};
	}, []);

	return (
		<div
			ref={searchRef}
			tabIndex={-1}
			onBlur={(e) => {
				// If focus left the entire search wrapper → close dropdown
				if (!searchRef.current.contains(e.relatedTarget)) {
					setIsShow(false);
				}
			}}
			className={classNames(
				"sp-smart-post-search-wrapper",
				displayType === "popup" && "sp-smart-post-search-popup",
				isPopupOpen && displayType === "popup" && "sp-smart-post-search-popup--active",
				popupClass
			)}
		>
			{displayType === "popup" && enablePopupHeading && (
				<h4
					className={classNames(
						"sp-smart-post-popup-heading",
						popupHeadingGlobalTypography?.class ? popupHeadingGlobalTypography?.class : ""
					)}
				>
					{popupHeadingText}
				</h4>
			)}
			{displayType === "popup" && enablePopupCloseButton && (
				<span className="sp-smart-post-popup-close-icon" onClick={() => setIsPopupOpen(false)}>
					<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.00003 6.06069L8.71233 9.77299L9.77299 8.71233L6.06069 5.00003L9.773 1.28772L8.71234 0.227059L5.00003 3.93937L1.28771 0.227051L0.227051 1.28771L3.93937 5.00003L0.22706 8.71234L1.28772 9.773L5.00003 6.06069Z"
							fill="#1E1E1E"
						/>
					</svg>
				</span>
			)}
			{/* <select>
				<option>01</option>
				<option>02</option>
				<option>03</option>
				<option>04</option>
			</select> */}
			<SearchForm
				attributes={attributes}
				setIsLoading={setIsLoading}
				searchText={searchText}
				setSearchText={setSearchText}
				isLoading={isLoading}
				fetchPosts={fetchPosts}
			/>

			<SearchResult
				isShow={isShow}
				attributes={attributes}
				posts={posts}
				remaining_posts={remaining_posts}
				isLoading={isLoading}
			/>
		</div>
	);
};

const SearchForm = ({ attributes, setSearchText, setIsLoading, searchText, isLoading, fetchPosts }) => {
	const {
		searchFormPreset,
		placeholder,
		placeholderEnable,
		searchBtnLabel,
		searchIcon,
		inputPlaceHolderGlobalTypography,
		selectedTaxonomy,
		selectedTerms,
		postType,
		filterLabelText,
		taxonomyFilterEnable,
		searchBtnLabelText,
	} = attributes;
	const { allTaxonomies } = useMetaData(attributes, "editSite");
	const selectedTaxonomyData = findDataFromArray(allTaxonomies, "name", selectedTaxonomy);
	const _terms = selectedTaxonomyData?.terms_items.map((item) => ({
		...item,
		id: item.value,
	}));
	const terms = selectedTerms?.length > 0 ? selectedTerms : _terms;

	const [selectedTerm, setSelectedTerm] = useState("");

	const debounceTimer = useRef(null);
	const inputRef = useRef(null);

	const handleSearch = useCallback(
		async (query, term) => {
			try {
				setIsLoading(true);
				await fetchPosts(query, term);
			} catch (error) {
				console.log("Error fetching posts:", error.message);
			} finally {
				setIsLoading(false);
			}
		},
		[searchText, selectedTerm, postType]
	);

	useEffect(() => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		if (searchText) {
			debounceTimer.current = setTimeout(() => {
				handleSearch(searchText, selectedTerm);
			}, 500);
		}

		return () => clearTimeout(debounceTimer.current);
	}, [searchText, handleSearch, postType]);

	useEffect(() => {
		if (selectedTerm) {
			handleSearch(searchText, selectedTerm);
		}
	}, [selectedTerm]);

	const onSubmit = (e) => {
		e.preventDefault();
		handleSearch(searchText, selectedTerm);
	};
	const handleTermChange = (e) => {
		e.stopPropagation();
		const value = e.target.value;
		if (value) {
			setSelectedTerm(value);
		}
	};
	const formHandler = (e) => {
		e.stopPropagation();
		inputRef.current.focus();
	};

	return (
		<form
			role="search"
			onSubmit={onSubmit}
			method="get"
			className={classNames("sp-smart-post-search-form", searchFormPreset)}
			// onClick={(e) => formHandler ( e )}
		>
			<div className="sp-smart-post-search-input-wrapper">
				<input
					ref={inputRef}
					type="search"
					className={classNames(
						"sp-smart-post-search-input",
						inputPlaceHolderGlobalTypography?.class ? inputPlaceHolderGlobalTypography?.class : ""
					)}
					{...(placeholder && placeholderEnable ? { placeholder } : {})}
					name="s"
					value={searchText}
					required
					readOnly={isLoading}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				{terms?.length > 0 && postType !== "" && taxonomyFilterEnable && (
					<div className="sp-smart-post-search-select">
						<span className="sp-smart-post-search-dropdown-icon">
							<svg
								width={21}
								height={20}
								viewBox="0 0 21 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.7373 6L10.7373 11L15.7373 6L17.7373 7L10.7373 14L3.7373 7L5.7373 6Z"
									fill="#2F2F2F"
								/>
							</svg>
						</span>
						<select className="sp-smart-post-search-cate-list" onChange={handleTermChange}>
							<option value="">{filterLabelText || "Filter by"}</option>
							{terms.map((term) => (
								<option key={term.slug} value={term.id}>
									{term.label}
								</option>
							))}
						</select>
					</div>
				)}
			</div>

			<button type="submit" className={"sp-smart-post-search-button"}>
				{searchIcon && <SearchIcon />}
				{!["smart-search-form-preset-one", "smart-search-form-preset-two"].includes(searchFormPreset) &&
					searchBtnLabel &&
					searchBtnLabelText}
			</button>
		</form>
	);
};

const SearchResult = ({ attributes, posts, remaining_posts, isShow }) => {
	const {
		searchResultDisplayType,
		searchResultNotFoundText,
		moreResultLabelText,
		moreResultsEnable,
		showResultsCount,
	} = attributes;

	return (
		<div className={classNames("sp-smart-post-search-results", isShow && "sp-smart-post-search-results--show")}>
			<div className={classNames("sp-smart-post-search-list", searchResultDisplayType)}>
				{posts?.length > 0 ? (
					posts.map((post, index) => {
						return <SearchItem key={index} post={post} attributes={attributes} />;
					})
				) : (
					<div className="sp-smart-post-search-empty">{searchResultNotFoundText}</div>
				)}
			</div>

			{/* TODO: Need to manage loading state if needed in future */}
			{/* {isLoading ? (
				<div className="sp-smart-post-search-loader">
					<LoaderIcon />
				</div>
			) : (
				<>
				
				</>
			)} */}
			{moreResultsEnable && remaining_posts > 0 && (
				<div className="sp-smart-post-search-load-more">
					<button type="button" className="sp-smart-post-search-load-more-button">
						{moreResultLabelText} {showResultsCount && remaining_posts + "+" + " " + "Posts"}
					</button>
				</div>
			)}
		</div>
	);
};

const SearchItem = ({ post, attributes }) => {
	const { categories, author, image_alt, post_thumbnail_url, date, excerpt, postTitle } = post;

	const {
		searchResultDisplayType,
		searchResultTitleGlobalTypography,
		searchResultMetaGlobalTypography,
		searchResultShowImage,
		searchResultShowExcerpt,
		searchResultShowTaxonomy,
		searchResultExcerptLimit,
		searchResultShowDate,
		searchResultShowAuthor,
	} = attributes;

	return (
		<div className="sp-smart-post-search-item">
			{searchResultDisplayType !== "smart-search-result-layout-two" && searchResultShowImage && (
				<div className="sp-smart-post-search-item-img">
					<img
						src={
							post_thumbnail_url
								? post_thumbnail_url
								: sp_smart_post_block_localize.placeholderImg + "public/assets/img/placeholder.png"
						}
						alt={image_alt ? image_alt : postTitle}
					/>
				</div>
			)}
			<div className="sp-smart-post-search-item-desc">
				{searchResultShowTaxonomy && categories?.length > 0 && (
					<div className={classNames("sp-smart-post-categories", searchResultMetaGlobalTypography?.class)}>
						{categories?.map((category, index) => {
							return (
								<span key={index} className="sp-smart-post-category">
									{category}
								</span>
							);
						})}
					</div>
				)}
				<a
					// href={"#"}
					className={classNames("sp-smart-post-search-item-title", searchResultTitleGlobalTypography?.class)}
				>
					{post?.title}
				</a>
				{searchResultShowExcerpt && excerpt && (
					<Excerpt
						excerpt={excerpt}
						attributes={{
							ellipsisPointsEndingExcerpt: "...",
							excerptType: "limited",
							excerptLength: searchResultExcerptLimit,
							excerptGlobalTypography: searchResultMetaGlobalTypography,
						}}
					/>
				)}
				{(searchResultShowDate || searchResultShowAuthor) && (
					<div className={classNames("sp-smart-post-meta-list", searchResultMetaGlobalTypography?.class)}>
						{author && searchResultShowAuthor && <span className="sp-smart-post-meta">{author}, </span>}
						{date && searchResultShowDate && <span className="sp-smart-post-meta">{date}</span>}
					</div>
				)}
			</div>
		</div>
	);
};
export default Render;
