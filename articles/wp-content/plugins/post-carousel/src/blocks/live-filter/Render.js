import { useRef, useState, useEffect, useMemo } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import { KebabMenuIcon, LeftArrow, MoreArrowIcon, RightArrow } from "../../icons/arrowIcons";
import { usePanelBodyContext } from "../../context";
export default function Render({ attributes }) {
	const {
		selectedTerms,
		taxonomyLimit,
		taxonomyStyle,
		allTextLabel,
		filterType,
		headingLabel,
		headingTag,
		headingStyle,
		allTaxonomies,
		taxonomyType,
		selectTermsType,
		excludeTerms,
	} = attributes;

	const { togglePanelBody } = usePanelBodyContext();

	const [activeItem, setActiveItem] = useState("all");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const deviceType = useDeviceType();
	const HeadingTag = headingTag || "h2";
	const moreAnchorRef = useRef(null);

	//.........

	const limit = taxonomyLimit.device?.[deviceType]; // e.g., 5
	const [currentPage, setCurrentPage] = useState(0);
	const allItem = {
		id: "all",
		label: allTextLabel,
	};

	let allTerms = [];
	allTaxonomies?.forEach((taxonomy) => {
		if (taxonomyType === taxonomy.name) {
			allTerms = [...allTerms, ...taxonomy.terms_items];
		}
	})
	const updatedSelectedTerms = {
		specific: selectedTerms && selectedTerms.length > 0 ? selectedTerms : allTerms,
		exclude: allTerms.filter( ( term ) => !excludeTerms.some( ex => ex.id === term.id ) ),
		all: allTerms,
	};

	const newSelectedTerms = [allItem, ...updatedSelectedTerms[selectTermsType]];
	//  Split the array into chunks
	const paginatedTerms = useMemo(() => {
		const chunks = [];
		for (let i = 0; i < newSelectedTerms.length; i += limit) {
			chunks.push(newSelectedTerms.slice(i, i + limit));
		}
		return chunks;
	}, [newSelectedTerms, limit]);

	// current page’s terms
	const currentTerms = paginatedTerms[currentPage] || [];

	// handle next/prev
	const nextPage = () => {
		if (currentPage < paginatedTerms.length - 1) {
			setCurrentPage((p) => p + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage((p) => p - 1);
		}
	};

	const handleNavClick = (id) => {
		setActiveItem(id);
		setIsDropdownOpen(false);
	};

	let displayTaxonomies;
	let moreTaxonomies;

	if (filterType === "button") {
		displayTaxonomies = currentTerms;

		moreTaxonomies = updatedSelectedTerms[selectTermsType].slice(limit);
	} else {
		displayTaxonomies = [];
		moreTaxonomies = updatedSelectedTerms[selectTermsType];
	}

	const handleDropdownItemClick = (id) => {
		setActiveItem(id);
		setIsDropdownOpen(false);
	};

	const handleMoreClick = (e) => {
		e.preventDefault();
		if ( taxonomyStyle !== "navigation" ) {
			setIsDropdownOpen(!isDropdownOpen);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="sps-live-filter-layout-two">
			<nav className="sps-live-filter-navbar">
				{ headingLabel && <HeadingTag
					onClick={() => togglePanelBody("heading")}
					className={`sps-live-filter-latest-post-btn ${headingStyle}`}
				>
					{headingLabel}
				</HeadingTag> }
				<div className="sps-live-filter-nav-container">
					<ul className="sps-live-filter-nav-menu">
						{displayTaxonomies.filter( item => item.label ).map((item) => (
							<li key={item?.id} className="sps-live-filter-nav-item">
								<a
									href={"#"}
									className={`sps-live-filter-nav-link ${activeItem === item?.id ? "active" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										handleNavClick(item?.id);
									}}
									rel={"noopener noreferrer"}
								>
									{item?.label}
								</a>
							</li>
						))}

						{moreTaxonomies.length > 0 ? (
							<li
								ref={dropdownRef}
								className={`sps-live-filter-nav-item sps-live-filter-dropdown ${
									isDropdownOpen ? "active" : ""
								}`}
							>
								<a
									ref={moreAnchorRef}
									href="#"
									className="sps-live-filter-nav-link"
									onClick={ handleMoreClick }
								>
									{taxonomyStyle === "kebabMenu" && <KebabMenuIcon />}

									{taxonomyStyle == "more" && (
										<>
											{filterType === "button" ? "More" : allTextLabel}
											<span className="sps-live-filter-dropdown-arrow">
												<MoreArrowIcon />
											</span>
										</>
									)}

									{taxonomyStyle === "navigation" && (
										<>
											<span onClick={ prevPage } disabled={currentPage === 0}>
												<LeftArrow />
											</span>
											<span
												onClick={ nextPage }
												disabled={currentPage === paginatedTerms.length - 1}
											>
												<RightArrow />
											</span>
										</>
									)}
								</a>

								<div className="sps-live-filter-dropdown-menu">
									{moreTaxonomies.map((item) => (
										<a
											key={item?.id}
											href="#"
											className={`sps-live-filter-dropdown-item  ${
												activeItem === item?.id ? "active" : ""
											}`}
											onClick={(e) => {
												e.preventDefault();
												handleDropdownItemClick(item?.id);
											}}
										>
											{item?.label}
										</a>
									))}
								</div>
							</li>
						) : (
							""
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
}
