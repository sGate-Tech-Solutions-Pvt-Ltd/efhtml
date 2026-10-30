import { RotatingLines } from "react-loader-spinner";
import { arrowIcons } from "../../../../controls/constants";
import classNames from "classnames";

const PaginationButtons = ({ paginationShorten = false }) => {
	return (
		<>
			<a href="#" className={`page-numbers current`}>
				1
			</a>
			{paginationShorten ? (
				<a href="#" className={`sp-smart-pagination-number  sp-smart-post-pagination-more-items-dots`}>
					...
				</a>
			) : (
				<>
					<a href="#" className={`page-numbers`}>
						2
					</a>
					<a href="#" className={` page-numbers`}>
						3
					</a>
				</>
			)}
			<a href="#" className={`page-numbers`}>
				4
			</a>
		</>
	);
};

const NavigationButtons = ({ props }) => {
	const { navigationArrowStyle, paginationGlobalTypography } = props;

	const NavIcon = arrowIcons[navigationArrowStyle];

	return (
		<>
			<div className={`sp-smart-post-grid-nav-arrow sp-d-flex`}>
				<span
					className={classNames(
						"sp-smart-post-grid-nav-arrow-btn",
						"sp-prev",
						paginationGlobalTypography?.class ? paginationGlobalTypography?.class : ""
					)}
				>
					<i>
						<NavIcon />
					</i>
				</span>
				<span
					className={classNames(
						"sp-smart-post-grid-nav-arrow-btn",
						"sp-next",
						paginationGlobalTypography?.class ? paginationGlobalTypography?.class : ""
					)}
				>
					<i>
						<NavIcon />
					</i>
				</span>
			</div>
		</>
	);
};

const Pagination = ({ attributes }) => {
	const {
		paginationType,
		loadMoreBtnLabel,
		paginationStyle,
		paginationPrevLabel,
		paginationNextLabel,
		navigationArrowStyle,
		paginationShorten,
		loadMoreInfiniteScroll,
		paginationAlign,
		paginationGlobalTypography,
	} = attributes;

	return (
		<div className={`sp-smart-post-pagination-section sp-justify-${paginationAlign} sp-component-simple`}>
			{paginationType === "load-more" && (
				<div className="sp-smart-post-load-more-button">
					{!loadMoreInfiniteScroll ? (
						<a
							href="#"
							className={classNames(
								paginationGlobalTypography?.class ? paginationGlobalTypography?.class : ""
							)}
						>
							{loadMoreBtnLabel}
						</a>
					) : (
						<div className="sp-smart-post-show-preloading">
							<RotatingLines
								visible={true}
								height="30"
								width="30"
								color="gray"
								strokeColor="#ccc"
								strokeWidth="5"
								animationDuration="0.75"
								ariaLabel="rotating-lines-loading"
							/>
						</div>
					)}
				</div>
			)}
			{paginationType === "navigation" && (
				<div className="sp-smart-post-navigation-buttons">
					<NavigationButtons
						props={{
							navigationArrowStyle: navigationArrowStyle,
							paginationGlobalTypography: paginationGlobalTypography,
						}}
					/>
				</div>
			)}
			{paginationType === "pagination" && (
				<div className={`sp-smart-post-pagination-buttons`}>
					{["number-arrow", "number-prev-next-arrow", "prev-next"].includes(paginationStyle) && (
						<a
							href="#"
							className={classNames(
								"page-numbers",
								"number-arrow" === paginationStyle ? "number" : "prev",
								"disabled",
								paginationGlobalTypography?.class ? paginationGlobalTypography?.class : ""
							)}
							disabled={true}
						>
							<i className={`sp-icon-left-open`}></i>
							{["number-prev-next-arrow", "prev-next"].includes(paginationStyle) && (
								<>{paginationPrevLabel}</>
							)}
						</a>
					)}
					{["number", "number-arrow", "number-prev-next-arrow"].includes(paginationStyle) && (
						<PaginationButtons paginationShorten={paginationShorten} />
					)}
					{["number-arrow", "number-prev-next-arrow", "prev-next"].includes(paginationStyle) && (
						<a
							href="#"
							className={`page-numbers ${"number-arrow" === paginationStyle ? "number" : "next"}`}
						>
							{["number-prev-next-arrow", "prev-next"].includes(paginationStyle) && (
								<>{paginationNextLabel}</>
							)}
							<i className={`sp-icon-right-open`}></i>
						</a>
					)}
				</div>
			)}
		</div>
	);
};

export default Pagination;
