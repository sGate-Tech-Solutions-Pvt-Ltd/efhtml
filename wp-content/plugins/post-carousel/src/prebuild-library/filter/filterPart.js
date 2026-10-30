import "./style.scss";
import Select from "./Select";
import { SearchIcon, GridTwoColIcon, GridThreeColIcon, HeartIcon, CloseIcon, RotateIcon } from "../icons";
import { FILTER_OPTIONS } from "../constants";
import { SmartPostShowLogoIcon } from "../../icons/icons";
const { __ } = wp.i18n;

export const FilterPart = (props) => {
	const {
		changeStates,
		column,
		showWishList,
		_fetchFile,
		fetching,
		searchQuery,
		fields,
		fieldValue,
		fieldOptions,
		wishListArr,
		designLibrary=false,
	} = props;

	return (
		<div className="sp-smart-template-filter">
			<div className="sp-smart-template-filter-search">
				<span>
					<SearchIcon />
				</span>
				<input
					type="search"
					id="sp-smart-template-filter-search-field"
					placeholder="Search..."
					className="sp-smart-template-filter-search-input"
					value={searchQuery}
					onChange={(e) => {
						// searchQuery && searchQuery(e.target.value)
						changeStates && changeStates("search", e.target.value);
					}}
				/>
			</div>
			{!designLibrary && (<div className="sp-smart-template-filter-category">
				{fields?.filter && (
					<>
						<Select
							value={fieldValue?.filter}
							contentWH={{ height: "190px", width: "150px" }}
							onChange={(v) => {
								changeStates("filter", v);
							}}
							options={fieldOptions?.filterArr || []}
						/>
					</>
				)}
			</div>)}
			{!designLibrary && (<div className="sp-smart-template-filter-free-and-pro">
				{fields?.freePro && (
					<Select
						value={fieldValue?.freePro}
						onChange={(v) => {
							changeStates("freePro", v);
						}}
						options={FILTER_OPTIONS.FREE_PRO.map((option) => ({
							...option,
							label: option.label,
						}))}
					/>
				)}
			</div>)}
			<div className="sp-smart-template-filter-sort">
				{fields?.trend && fieldValue?.trend && (
					<Select
						value={fieldValue?.trend}
						onChange={(v) => {
							changeStates("trend", v);
						}}
						options={FILTER_OPTIONS.TREND.map((option) => ({
							...option,
							label: option.label,
						}))}
					/>
				)}
			</div>

			<div className={`sp-smart-template-filter-grid-two-col `} onClick={() => changeStates("column", "2")}>
				<button className={` ${column == "2" ? "active" : ""}`}>
					<GridTwoColIcon />
				</button>
			</div>
			<div
				className={`sp-smart-template-filter-grid-three-col ${column == "3" ? "sp-smart-col-active" : ""}`}
				onClick={() => changeStates("column", "3")}
			>
				<button className={` ${column == "3" ? "active" : ""}`}>
					<GridThreeColIcon />
				</button>
			</div>
			<div className="sp-smart-template-filter-reset">
				<button>
					<span className={"sp-smart-popup-sync"} onClick={() => _fetchFile()}>
						<i className={fetching ? " sp-rotate" : ""}>
							<RotateIcon />
						</i>
					</span>
				</button>
			</div>
			<div className="sp-smart-template-filter-love">
				<button
					onClick={() => {
						changeStates("wishlist", showWishList ? false : true);
					}}
					className={` ${showWishList ? "active" : ""}`}
				>
					<HeartIcon />
					{wishListArr?.length > 0 && (
						<span className="sp-smart-template-filter-love-count">{wishListArr?.length}</span>
					)}
				</button>
			</div>
		</div>
	);
};

export const HeaderWithFilter = (props) => {
	const { changeStates, column, showWishList, _fetchFile, fetching, onClose, currentBlockName, wishListArr } = props;
	const filterBlockName = currentBlockName ? currentBlockName?.replace(/-/g, " ") : "";
	return (
		<div className="sp-smart-popup-header">
			<div className="sp-smart-popup-filter-title">
				<div className="sp-smart-popup-filter-image-head">
					<SmartPostShowLogoIcon />
					<span>{filterBlockName}</span>
				</div>
				<div className="sp-smart-popup-filter-nav-right">
					<div
						className={`sp-smart-template-filter-grid-two-col `}
						onClick={() => changeStates("column", "2")}
					>
						<button className={` ${column == "2" ? "active" : ""}`}>
							<GridTwoColIcon />
						</button>
					</div>
					<div
						className={`sp-smart-template-filter-grid-three-col ${column == "3" ? "sp-smart-col-active" : ""}`}
						onClick={() => changeStates("column", "3")}
					>
						{" "}
						<button className={` ${column == "3" ? "active" : ""}`}>
							<GridThreeColIcon />
						</button>
					</div>
					<div className="sp-smart-template-filter-reset">
						<button>
							<span className={"sp-smart-popup-sync"} onClick={() => _fetchFile()}>
								<i className={fetching ? " sp-rotate" : ""}>
									<RotateIcon />
								</i>
							</span>
						</button>
					</div>
					<div className="sp-smart-template-filter-love">
						<button
							onClick={() => {
								changeStates("wishlist", showWishList ? false : true);
							}}
							className={` ${showWishList ? "active" : ""}`}
						>
							<HeartIcon />
							{wishListArr?.length > 0 && (
								<span className="sp-smart-template-filter-love-count">{wishListArr?.length}</span>
							)}
						</button>
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
		</div>
	);
};
