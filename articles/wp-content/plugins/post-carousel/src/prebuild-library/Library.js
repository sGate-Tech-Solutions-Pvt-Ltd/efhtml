import ReadyPatterns from "./readyPatterns";
import ErrorBoundary from "./ErrorBoundary";
import { __ } from "@wordpress/i18n";
import { CloseIcon } from "./icons";
import { API_ENDPOINTS, KEYBOARD_KEYS } from "./constants";
import { parse } from "@wordpress/blocks";
import { Fragment, useState, useEffect } from "@wordpress/element";
import { SmartPostShowLogoIcon } from "../icons/icons";

// Default attribute values
const DEFAULT_ATTRIBUTES = {
	postType: "multiple_post_type",
	multiplePostType: [
		{
			id: 1,
			label: "Posts",
			value: "post",
		},
	],
	quickQuery: "",
	postLimit: "8",
	offset: 0,
	filterByAuthor: [],
	filterByDate: "",
	filterByKeyword: "",
	filterByCustomFields: [],
	orderBy: "date",
	orderDirection: "DESC",
	excludePost: [],
	excludeTerm: [],
	excludeAuthor: [],
	excludeStickyPosts: false,
	excludeCurrentPosts: true,
	excludeProtectedPosts: false,
	excludeChildrenPosts: false,
	excludePostWithoutImagePosts: false,
	filterProduct: "recent",
	relation: "AND",
	specificMonth: "1",
	specificYear: "2024",
	blockName: "",
	displayAdvertisement: false,
	liveSearchText: "",
	postQuery: "",
	taxonomies: [
		{
			id: 1,
			type: "",
			value: [],
			operator: "IN",
			initialOpen: true,
		},
	],
	categories: [],
	termId: "",
	keywordSearch: "",
	currentPage: 1,
	itemsPerPage: 6,
	page_id: "",
	// Get current date/time in format: Y-m-d H:i:s
	getCurrentDate: () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	},
};

/**
 * Modify block attributes after parsing but before insertion
 * This function recursively processes blocks and their innerBlocks
 * to reset query-related attributes to their default values
 *
 * @param {Array} blocks - Array of parsed block objects
 * @returns {Array} - Modified blocks array
 */
const modifyBlockAttributes = (blocks) => {
	if (!Array.isArray(blocks)) {
		return blocks;
	}

	return blocks.map((block) => {
		// Create a new block object to avoid mutating the original
		const modifiedBlock = {
			...block,
			attributes: {
				...block.attributes,
			},
		};

		// Only modify Smart Post Show blocks
		if (block.name && block.name.startsWith("sp-smart-post-show/") && block.attributes) {
			// Reset all query-related attributes to default values if they exist
			const attributesToReset = [
				"postType",
				"multiplePostType",
				"quickQuery",
				"postLimit",
				"offset",
				"filterByAuthor",
				"filterByDate",
				"filterByKeyword",
				"filterByCustomFields",
				"orderBy",
				"orderDirection",
				"excludePost",
				"excludeTerm",
				"excludeAuthor",
				"excludeStickyPosts",
				"excludeCurrentPosts",
				"excludeProtectedPosts",
				"excludeChildrenPosts",
				"excludePostWithoutImagePosts",
				"filterProduct",
				"relation",
				"specificMonth",
				"specificYear",
				"blockName",
				"displayAdvertisement",
				"liveSearchText",
				"postQuery",
				"taxonomies",
				"categories",
				"termId",
				"keywordSearch",
				"currentPage",
				"itemsPerPage",
				"page_id",
			];

			attributesToReset.forEach((attrName) => {
				if (modifiedBlock.attributes.hasOwnProperty(attrName)) {
					// Get default value
					const defaultValue = DEFAULT_ATTRIBUTES[attrName];

					// Handle array defaults (deep clone)
					if (Array.isArray(defaultValue)) {
						modifiedBlock.attributes[attrName] = JSON.parse(JSON.stringify(defaultValue));
					} else {
						modifiedBlock.attributes[attrName] = defaultValue;
					}
				}
			});

			// Reset date fields to current date/time if they exist
			const dateFields = [
				"specificDate",
				"specificPeriodAfter",
				"specificPeriodBefore",
				"specificDateBefore",
				"specificDateAfter",
				"excludeDateAfter",
				"excludeDateBefore",
			];
			const currentDate = DEFAULT_ATTRIBUTES.getCurrentDate();
			dateFields.forEach((fieldName) => {
				if (modifiedBlock.attributes.hasOwnProperty(fieldName)) {
					modifiedBlock.attributes[fieldName] = currentDate;
				}
			});
		}

		// Recursively process innerBlocks
		if (block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0) {
			modifiedBlock.innerBlocks = modifyBlockAttributes(block.innerBlocks);
		}

		return modifiedBlock;
	});
};

// Header Component.
const LibraryHeader = ({ onClose, tabState, setTabState }) => {
	return (
		<div className="sp-smart-popup-header">
			<div className="sp-smart-popup-filter-title">
				<div className="sp-smart-popup-filter-image-head">
					<SmartPostShowLogoIcon />
					<span>{__("Smart Design Library", "post-carousel")}</span>
				</div>
				<div className="sp-smart-popup-filter-nav">
					<div className={`sp-smart-popup-tab-title ${tabState === "ready-pattern" ? "sp-smart-active" : ""}`} onClick={() => setTabState("ready-pattern")}>
						{__("Ready Patterns", "post-carousel")}
					</div>
				</div>
				<div className="sp-smart-popup-filter-sync-close">
					<button
						className="sp-smart-btn-close"
						onClick={onClose}
						id="sp-smart-btn-close"
						aria-label={__("Close", "post-carousel")}
					>
						<CloseIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

// Main Library Component.
const Library = (props) => {
	const [wishListArr, setWishlistArr] = useState([]);
	const [tabState, setTabState] = useState("ready-pattern");
	const isBlockPattern = props.currentBlockName ? true : false;
	let currentBlockName = props.currentBlockName || "all";
	// let currentSitesName = props.currentSitesName || "all";
	if (isBlockPattern && props.currentBlockName === "post-thumbnail-slider") {
		currentBlockName = "thumbnail-slider";
	}

	const [state, setState] = useState({
		isPopup: props.isShow || false,
		designs: [],
		reloadId: "",
		reload: false,
		error: false,
		fetching: false,
		designFilter: currentBlockName || "all",
		current: [],
		sidebarOpen: true,
		templatekitCol: "sp-smart-pattern-col3",
		loading: false,
		sitesDesign: [],
		sitesCurrent: [],
		sitesCategory: [],
	});

	const { isPopup, designFilter } = state;
	const localizedData = sp_smart_post_block_localize || {};
	// Transform nested category data to flat array.
	const handleDesignData = (data) => {
		const transformedData = [];
		for (const category in data) {
			const items = data[category];
			if ( Array.isArray( items ) ) {
				items.forEach( item => {
					transformedData.push({
						...item,
						category,
					})
				})
			} else if ( typeof items === "object" ) {
				transformedData.push({
					...items,
				});
			}
		}
		return transformedData;
	};

	// Fetch Pre-made pattern data from Smart Post Show REST API.
	const fetchTemplates = async () => {
		setState((prev) => ({ ...prev, loading: true, error: false }));
		try {
			const response = await wp.apiFetch({
				path: API_ENDPOINTS.PATTERNS,
				method: "POST",
				data: { type: "get_data" },
			});

			if (!response) {
				throw new Error(__("No response received from server", "post-carousel"));
			}

			if (response.success && response.data) {
				const allDesignData = JSON.parse(response.data);
				let designData = handleDesignData(allDesignData);
				if (isBlockPattern && currentBlockName) {
					designData = allDesignData[currentBlockName] || [];
				}
				setState((prev) => ({
					...prev,
					current: designData,
					designs: designData,
					loading: false,
					error: false,
				}));
			} else {
				throw new Error(response.message || __("Failed to load patterns", "post-carousel"));
			}
		} catch (error) {
			console.error("Error fetching templates:", error);
			setState((prev) => ({
				...prev,
				loading: false,
				error: error.message || __("An unexpected error occurred", "post-carousel"),
			}));
		}
	};
	// Fetch Pre-made sites data from Smart Post Show REST API.
	const fetchSitesData = async () => {
		setState((prev) => ({ ...prev, loading: true, error: false }));
		try {
			const response = await wp.apiFetch({
				path: API_ENDPOINTS.SITES,
				method: "POST",
				// data: { type: "get_data" },
			});

			if (!response) {
				throw new Error(__("No response received from server", "post-carousel"));
			}

			if (response.success && response.data) {
				const allDesignData = JSON.parse(response.data);
				const sitesData = handleDesignData(allDesignData);
				// if (isBlockPattern && currentBlockName) {
				// 	sitesData = allDesignData[currentSitesName] || [];
				// }
				
				
				setState((prev) => ({
					...prev,
					sitesCurrent: sitesData,
					sitesDesign: sitesData,
					loading: false,
					error: false,
				}));
			} else {
				throw new Error(response.message || __("Failed to load patterns", "post-carousel"));
			}
		} catch (error) {
			console.error("Error fetching templates:", error);
			setState((prev) => ({
				...prev,
				loading: false,
				error: error.message || __("An unexpected error occurred", "post-carousel"),
			}));
		}
	};

	// Force fetch and refresh local JSON cache
	const fetchAllData = async () => {
		setState((prev) => ({ ...prev, fetching: true }));;

		try {
			const response = await wp.apiFetch({
				path: API_ENDPOINTS.PATTERNS,
				method: "POST",
				data: { type: "refresh" }, // tells PHP to re-fetch from remote
			});

			if (!response) {
				throw new Error(__("No response received from server", "post-carousel"));
			}

			if (response.success) {
				// after successful refresh, reload data
				await fetchTemplates();
				await fetchSitesData();
			} else {
				throw new Error(response.message || __("Failed to refresh patterns", "post-carousel"));
			}
		} catch (error) {
			console.error("Error fetching all data:", error);
			setState((prev) => ({
				...prev,
				error: error.message || __("Failed to refresh data", "post-carousel"),
			}));
		} finally {
			setState((prev) => ({ ...prev, fetching: false }));
		}
	};

	// Close modal
	const closeModal = () => {
		const element = document.querySelector(".sp-smart-builder-modal");
		if (element) {
			element.remove();
		}
		setState((prev) => ({ ...prev, isPopup: false }));
	};

	// Handle ESC key press
	const handleKeyDown = (e) => {
		if (e.keyCode === KEYBOARD_KEYS.ESCAPE) {
			closeModal();
		}
	};

	// Insert block into editor
	const insertBlock = async (templateID) => {
		if (!templateID) {
			console.log("Template ID is required");
			return;
		}

		setState((prev) => ({ ...prev, reload: true, reloadId: templateID }));

		try {
			const response = await fetch(API_ENDPOINTS.SINGLE_PATTERN, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					license: "",
					template_id: templateID,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const jsonData = await response.json();
			if (jsonData.success && jsonData.rawData) {
				const blockEditor = wp.data.dispatch("core/block-editor");
				if (blockEditor && blockEditor.insertBlocks) {
					// Parse the raw block data - parse() returns an array of blocks
					let blocks = [];
					try {
						blocks = parse(jsonData.rawData);
					} catch (parseError) {
						console.error("Error parsing block data:", parseError);
						throw new Error(__("Failed to parse block data", "post-carousel"));
					}

					// Validate that blocks is an array and not empty
					if (!Array.isArray(blocks)) {
						console.error("Parsed blocks is not an array:", blocks);
						throw new Error(__("Invalid block data format", "post-carousel"));
					}

					if (blocks.length === 0) {
						console.warn("No blocks found in parsed data");
						throw new Error(__("No blocks found in pattern", "post-carousel"));
					}

					// Log parsed blocks for debugging (shows array length and structure)
					console.log(`Parsed ${blocks.length} block(s):`, blocks);

					// Modify block attributes after parsing but before insertion
					// This allows you to change default attributes, reset IDs, etc.
					blocks = modifyBlockAttributes(blocks);

					// Log modified blocks for debugging
					console.log(`Modified ${blocks.length} block(s) before insertion:`, blocks);

					// Insert all blocks into the editor
					// insertBlocks accepts an array of block objects
					blockEditor.insertBlocks(blocks);

					closeModal();
					setState((prev) => ({
						...prev,
						isPopup: false,
						reload: false,
						reloadId: "",
						error: false,
					}));
				} else {
					throw new Error(__("Block editor is not available", "post-carousel"));
				}
			} else {
				throw new Error(jsonData.message || __("Failed to import pattern", "post-carousel"));
			}
		} catch (error) {
			console.error("Error inserting block:", error);
			setState((prev) => ({
				...prev,
				error: error.message || __("Failed to import pattern", "post-carousel"),
				reload: false,
			}));
		}
	};

	// Handle block import
	const handleBlockImport = (templateID, isPro) => {
		if (isPro && !localizedData.isPro) {
			return;
		}
		insertBlock(templateID);
	};

	// Split archive data by category key.
	const filterByCategoryKey = (data = [], key = "") => {
		// Return early if no data or not an array
		if (!Array.isArray(data) || data.length === 0) return [];

		// If key is empty or 'all', return all data
		if (!key || key === "all") return data;
		

		return data.filter((item) => {
			const category = item?.category;

			// Handle category as array
			if (Array.isArray(category)) {
				const pattern = category.some((cat) => cat?.slug === key) || null;
				const starter = category.includes( key ) || null;
				return pattern || starter;
			}

			// Handle category as string or object
			if (typeof category === "string") {
				return category === key;
			}

			if (category && typeof category === "object") {
				return category.slug === key;
			}

			return false;
		});
	};

	// Handle wishlist actions
	const handleWishlistAction = async (id, action = "", type = "") => {
		try {
			const response = await wp.apiFetch({
				path: API_ENDPOINTS.WISHLIST,
				method: "POST",
				data: { id, action, type },
			});

			if (!response) {
				throw new Error(__("No response received from server", "post-carousel"));
			}

			if (response.success) {
				const wishlist = Array.isArray(response.wishListArr)
					? response.wishListArr
					: Object.values(response.wishListArr || {});
				setWishlistArr(wishlist);
			} else {
				throw new Error(response.message || __("Failed to update wishlist", "post-carousel"));
			}
		} catch (error) {
			console.error("Error updating wishlist:", error);
			// Optionally show user-friendly error message
		}
	};

	// Initialize on mount
	useEffect(() => {
		handleWishlistAction("", "", "fetchData");
		fetchTemplates();
		fetchSitesData();
		// fetchCategories();
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Fragment>
			{isPopup && (
				<ErrorBoundary
					onError={(error, errorInfo) => {
						console.error("Library Error Boundary:", error, errorInfo);
					}}
					onRetry={() => { fetchTemplates(); fetchSitesData() }}
				>
					<div className="sp-smart-builder-modal-shadow">
						<div className="sp-smart-popup-wrap">
							{!isBlockPattern && <LibraryHeader onClose={closeModal} tabState={tabState} setTabState={setTabState} />}
							{ tabState === "ready-pattern" && (
								<ReadyPatterns
									filterValue={designFilter}
									currentBlockName={props.currentBlockName}
									isSingleBlock={isBlockPattern}
									onClose={closeModal}
									state={state}
									setState={setState}
									_fetchFile={fetchAllData}
									_changeVal={handleBlockImport}
									filterByCategoryKey={filterByCategoryKey}
									setWListAction={handleWishlistAction}
									wishListArr={wishListArr}
									setWishlistArr={setWishlistArr}
								/>
							)}
						</div>
					</div>
				</ErrorBoundary>
			)}
		</Fragment>
	);
};

export default Library;
