import { useCallback, useMemo, memo, useState, useEffect } from "@wordpress/element";
import { FilterPart, HeaderWithFilter } from "./filter/filterPart";
import { __ } from "@wordpress/i18n";
import { HeartIcon, HeartIconFull, ImportIcon, PreviewIcon, ProBadgeIcon, RotateIcon } from "./icons";
import { PATTERN_CATEGORIES, DEFAULTS, KEYBOARD_KEYS, API_ENDPOINTS } from "./constants";
import { decodeEntities } from "@wordpress/html-entities";
import FilterSidebar from "./filter/sidebarFilter";

// Pattern categories moved to constants.js
const Skeleton = (props) => {
	const { type, size, loop, unit, c_s, classes } = props;

	const getSize = () => {
		let css = {};
		switch (type) {
			case "image":
			case "circle":
				css = { width: size ? size + "px" : "300px", height: size ? size + "px" : "300px" };
				break;
			case "title":
				css = { width: `${size ? size : "100"}${unit ? unit : "%"}` };
				break;
			case "button":
				css = { width: size ? size + "px" : "90px" };
				break;
			case "custom_size":
				css = {
					width: `${c_s.size1 ? c_s.size1 : "100"}${c_s.unit1 ? c_s.unit1 : "%"}`,
					height: `${c_s.size2 ? c_s.size2 : "20"}${c_s.unit2 ? c_s.unit2 : "px"}`,
					borderRadius: c_s.br ? c_s.br + "px" : "0px",
				};
				break;
			default:
				break;
		}
		return css;
	};
	return (
		<>
			{loop ? (
				<>
					{Array(parseInt(loop))
						.fill("1")
						.map((x, i) => {
							return (
								<div
									key={i}
									className={`sp_smart_skeleton__${type} sp_smart_frequency loop ${classes ? classes : ""}`}
									style={getSize()}
								></div>
							);
						})}
				</>
			) : (
				<div
					className={`sp_smart_skeleton__${type} sp_smart_frequency ${classes ? classes : ""}`}
					style={getSize()}
				></div>
			)}
		</>
	);
};

const Tooltip = ({text}) => {
	return (
		<div className="sp-smart-import-or-pro-tooltip">
			<span>{text}</span>
		</div>
	)
}

// Individual Card Component.
export const PremadeCard = memo(({ data, localizedData, wishListArr, setWListAction, reload, reloadId, onImport }) => {
	const isInWishlist = wishListArr?.includes(String(data.ID));
	const isLoading = reload && reloadId === data.ID;
	const isPro = data?.pro;
	const handleWishlistClick = useCallback(() => {
		setWListAction(data.ID, isInWishlist ? "remove" : "");
	}, [data.ID, isInWishlist, setWListAction]);

	const handleImportClick = useCallback(() => {
		if(data?.pages?.length > 0) {
			return onImport(data.pages);
		}
		if (!isPro) {
			onImport(data.ID, data.pro);
		}
	}, [data.ID, data.pro, isPro, onImport]);

	return (
		<div className="sp-smart-pattern-card-body">
			<div className="sp-smart-item-list">
				<div className="sp-smart-item-list-overlay">
					<a target="_blank" rel="noopener noreferrer" href={`https://wpsmartpost.com/patterns/#demo${data?.ID}`} className="sp-smart-pattern-img">
						<img src={data.image} loading="lazy" alt={data.name} />
					</a>
					<a target="_blank" rel="noopener noreferrer" href={`https://wpsmartpost.com/patterns/#demo${data?.ID}`}>
						<div className="sp-smart-pattern-overlay">
							<a
								className="sp-smart-overlay-view"
								href={`https://wpsmartpost.com/patterns/#demo${data?.ID}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={__("Preview", "post-carousel") + " " + data.name}
							>
								<PreviewIcon />
							</a>
						</div>
					</a>
				</div>

				<div className="sp-smart-item-list-info">
					<div className="sp-smart-item-info">
						<a
							href={`https://wpsmartpost.com/patterns/#demo${data?.ID}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={__("Preview", "post-carousel") + " " + data.name}
						><span>{decodeEntities(data?.name || "")}</span></a>
					</div>

					<span className="smart-post-action-btn">
						<span
							className="sp-smart-pattern-wishlist"
							onClick={handleWishlistClick}
							role="button"
							tabIndex={0}
							onKeyPress={(e) => {
								if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
									handleWishlistClick();
								}
							}}
							aria-label={
								isInWishlist
									? __("Remove from wishlist", "post-carousel")
									: __("Add to wishlist", "post-carousel")
							}
						>
							{isInWishlist ? <HeartIconFull /> : <HeartIcon />}
						</span>

						{isPro ? (
							<a
								className="sp-smart-btn-pro"
								target="_blank"
								rel="noopener noreferrer"
								href={API_ENDPOINTS.UPGRADE_URL}
								aria-label={__("Upgrade to Pro to access this pattern", "post-carousel")}
							>
								<ProBadgeIcon /> {__("Pro", "post-carousel")}
								<Tooltip 
									text={__("Upgrade to Pro", "post-carousel")}
								/>
							</a>
						) : (
							<span
								onClick={handleImportClick}
								className="sp-smart-import-btn"
								role="button"
								tabIndex={0}
								onKeyPress={(e) => {
									if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
										handleImportClick();
									}
								}}
								aria-label={__("Import", "post-carousel") + " " + data.name}
								style={isLoading ? { pointerEvents: "none", opacity: 0.6 } : {}}
							>
								{isLoading ? (
									<i className=" sp-rotate">
										<RotateIcon />
									</i>
								) : (
									<>
										<ImportIcon /> {__("Import", "post-carousel")}
										<Tooltip 
											text={__("Free Pattern", "post-carousel")}
										/>
									</>
								)}
							</span>
						)}
					</span>
				</div>
			</div>
		</div>
	);
});

// Loading Skeleton Component.
export const LoadingSkeleton = memo(() => (
	<div className="sp-smart-pattern-grid sp-smart-pattern-col3 skeletonOverflow">
		{Array(25)
			.fill(null)
			.map((_, i) => (
				<div key={i} className="sp-smart-item-list">
					<div className="sp-smart-item-list-overlay">
						<Skeleton type="custom_size" c_s={{ size1: 100, unit1: "%", size2: 400, unit2: "px" }} />
					</div>
					<div className="sp-smart-item-list-info">
						<Skeleton type="custom_size" c_s={{ size1: 50, unit1: "%", size2: 25, unit2: "px", br: 2 }} />
						<span className="smart-post-action-btn">
							<span className="sp-smart-pattern-wishlist">
								<Skeleton
									type="custom_size"
									c_s={{ size1: 30, unit1: "px", size2: 25, unit2: "px", br: 2 }}
								/>
							</span>
							<Skeleton
								type="custom_size"
								c_s={{ size1: 70, unit1: "px", size2: 25, unit2: "px", br: 2 }}
							/>
						</span>
					</div>
				</div>
			))}
	</div>
));

// Empty State Component.
export const EmptyState = memo(() => (
	<span className="sp-smart-image-rotate">{__("No Data found...", "post-carousel")}</span>
));

// Main Grid Component.
export const PremadeGrid = memo(
	({
		premadeLists,
		column,
		searchQuery,
		freePro,
		showWishList,
		wishListArr,
		localizedData,
		setWListAction,
		reload,
		reloadId,
		onImport,
		loading,
	}) => {
		// Memoize filter function
		const filteredLists = useMemo(() => {
			return premadeLists.filter((data) => {
				const searchMatch = !searchQuery || data.name?.toLowerCase().includes(searchQuery.toLowerCase());

				const freeProMatch =
					freePro === "all" || (freePro === "pro" && data.pro) || (freePro === "free" && !data.pro);
				const wishListMatch = !showWishList || wishListArr?.includes(String(data.ID));
				return searchMatch && freeProMatch && wishListMatch;
			});
		}, [premadeLists, searchQuery, freePro, showWishList, wishListArr]);

		// Loading state.
		if (loading) {
			return <LoadingSkeleton />;
		}

		// Empty state
		if (filteredLists.length === 0) {
			return <EmptyState />;
		}

		// Grid with data
		return (
			<div className={`sp-smart-pattern-grid sp-smart-pattern-col${column}`}>
				{filteredLists.map((data) => (
					<PremadeCard
						key={data.ID}
						data={data}
						localizedData={localizedData}
						wishListArr={wishListArr}
						setWListAction={setWListAction}
						reload={reload}
						reloadId={reloadId}
						onImport={onImport}
					/>
				))}
			</div>
		);
	}
);

// Main StarterSites Component
const ReadyPatterns = (props) => {
	const {
		filterValue,
		state,
		setState,
		// useState,
		// useEffect,
		// useRef,
		_changeVal,
		filterByCategoryKey,
		setWListAction,
		wishListArr,
		_fetchFile,
		onClose,
		currentBlockName,
		isSingleBlock,
	} = props;

	const { current, designs, reload, reloadId, fetching, loading } = state;
	const localizedData = sp_smart_post_block_localize || {};
	// Local state management.
	const [column, setColumn] = useState(DEFAULTS.COLUMN);
	const [searchQuery, setSearchQuery] = useState(DEFAULTS.SEARCH_QUERY);
	const [trend, setTrend] = useState(DEFAULTS.TREND);
	const [freePro, setFreePro] = useState(DEFAULTS.FREE_PRO);
	const [showWishList, setShowWishList] = useState(false);

	// Memoize sorted lists.
	const premadeLists = useMemo(() => {
		if (!current.length) return [];

		const lists = [...current];

		if (trend === "latest" || trend === "all") {
			return lists.sort((a, b) => b.ID - a.ID);
		}

		if (trend === "popular" && lists[0]?.hit !== undefined) {
			return lists.sort((a, b) => b.hit - a.hit);
		}

		return lists;
	}, [current, trend]);

	// Handle filter changes.
	const handleFilterChange = useCallback(
		(type) => {
			const filteredData = type === "all" ? designs : filterByCategoryKey(designs, type);
			setState((prev) => ({
				...prev,
				designFilter: type,
				current: filteredData,
			}));
		},
		[designs, filterByCategoryKey, setState]
	);

	// Unified state change handler.
	const changeStates = useCallback(
		(type, value) => {
			const handlers = {
				freePro: () => setFreePro(value),
				search: () => setSearchQuery(value),
				column: () => setColumn(value),
				wishlist: () => setShowWishList(value),
				trend: () => setTrend(value),
				filter: () => handleFilterChange(value),
			};

			handlers[type]?.();
		},
		[handleFilterChange]
	);

	// Memoize import handler.
	const handleImport = useCallback(
		(templateID, isPro) => {
			_changeVal(templateID, isPro);
		},
		[_changeVal]
	);

	return (
		<>
			{isSingleBlock && (
				<HeaderWithFilter
					changeStates={changeStates}
					useState={useState}
					onClose={onClose}
					currentBlockName={currentBlockName}
					column={column}
					showWishList={showWishList}
					searchQuery={searchQuery}
					fetching={fetching}
					_fetchFile={_fetchFile}
					fields={{ filter: true, trend: true, freePro: true }}
					fieldOptions={{
						filterArr: PATTERN_CATEGORIES,
						trendArr: [],
						freeProArr: [],
					}}
					fieldValue={{ filter: filterValue, trend, freePro }}
					wishListArr={wishListArr}
				/>
			)}
			<div className="sp-smart-template-wrap sp-smart-pattern">
				<div className="sp-smart-template-library-sidebar-wrapper">
					{/* <h3 className="sp-smart-template-library-sidebar-header">
						{__("Ready Patterns", "post-carousel")}
					</h3> */}
					<div className="sp-smart-template-library-sidebar-content">
						<FilterSidebar
							changeStates={changeStates}
							fieldOptions={{
								filterArr: PATTERN_CATEGORIES,
								trendArr: [],
								freeProArr: [],
							}}
							fields={{ filter: true, trend: true, freePro: true }}
							fieldValue={{ filter: filterValue, trend, freePro }}
							allData={ state?.designs }
							tabName={ "ready-patterns" }
						/>
					</div>
				</div>
				<div className="sp-smart-pattern-list-container sp-smart-pattern-card">
					{!isSingleBlock && (
						<FilterPart
							changeStates={changeStates}
							useState={useState}
							column={column}
							showWishList={showWishList}
							searchQuery={searchQuery}
							fetching={fetching}
							_fetchFile={_fetchFile}
							fields={{ filter: true, trend: true, freePro: true }}
							fieldOptions={{
								filterArr: PATTERN_CATEGORIES,
								trendArr: [],
								freeProArr: [],
							}}
							fieldValue={{ filter: filterValue, trend, freePro }}
							wishListArr={wishListArr}
							designLibrary={ true }
						/>
					)}

					<PremadeGrid
						premadeLists={premadeLists}
						column={column}
						searchQuery={searchQuery}
						freePro={freePro}
						showWishList={showWishList}
						wishListArr={wishListArr}
						localizedData={localizedData}
						setWListAction={setWListAction}
						reload={reload}
						reloadId={reloadId}
						onImport={handleImport}
						loading={loading}
					/>
				</div>
			</div>
		</>
	);
};

export default ReadyPatterns;