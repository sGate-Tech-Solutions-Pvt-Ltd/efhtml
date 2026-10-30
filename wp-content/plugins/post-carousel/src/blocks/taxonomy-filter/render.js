import { memo, useEffect, useState } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { DownArrow, panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";

import Inspector from "./inspect";
import classNames from "classnames";

const Render = ({ attributes, setAttributes, allTaxonomies }) => {
	const [dropdownOpen, setDropdown] = useState(false);
	const [selectTerm, setSelectTerm] = useState("All");
	const [searchValue, setSearchValue] = useState("");

	attributes.allTaxonomies = allTaxonomies;
	const {
		uniqueId,
		taxonomyType,
		selectTermsType,
		selectedTerms,
		excludeTerms,
		categoryLabel,
		overrideCategoryLabel,
		allTextLabel,
		showPostCount,
		searchInDropdown,
		filterType,
		searchPlaceholderText,
		titleGlobalTypography,
		optionGlobalTypography,
	} = attributes;

	const [activeBtn, setActiveBtn] = useState(allTextLabel);

	useEffect(() => {
		const clickOutSite = (e) => {
			const target = e.target.closest(".sp-smart-post-taxonomy-filter");
			if (!target && dropdownOpen) {
				setDropdown(false);
			}
		};
		window.addEventListener("click", clickOutSite);

		return () => window.removeEventListener("click", clickOutSite);
	});

	let allTerms = [];
	if ("all" === selectTermsType) {
		allTaxonomies?.forEach((taxonomy) => {
			if (taxonomyType === taxonomy.name) {
				allTerms = [...allTerms, ...taxonomy.terms_items];
			}
		});
	}

	if ("exclude" === selectTermsType) {
		const excludeTermIds = excludeTerms.map((term) => term.value);
		allTaxonomies?.forEach((taxonomy) => {
			if (taxonomyType === taxonomy.name) {
				allTerms = [...allTerms, ...taxonomy.terms_items];
			}
		});

		allTerms = allTerms.filter((term) => !excludeTermIds.includes(term.value));
	}

	if ("specific" === selectTermsType) {
		allTerms = selectedTerms;
	}

	const setTaxonomy = (e) => {
		const termValue = e.target.closest("a").dataset.value;

		setActiveBtn(termValue);
		setSelectTerm(termValue);
		setDropdown(false);
	};

	useEffect(() => {
		setActiveBtn("all");
	}, [taxonomyType, selectTermsType]);

	const termLabel = allTerms?.find((term) => term.value === selectTerm);

	if (searchValue) {
		allTerms = allTerms.filter((term) => term.label.toLowerCase().includes(searchValue.toLowerCase()));
	}

	return (
		<>
			<InspectorControl
				TitleIcon={panelBodyTitleIcon}
				RightIcon={panelBodyRightIcon}
				Inspector={Inspector}
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<div id={uniqueId}>
				<div className="sp-smart-post-taxonomy-filter sp-smart-post-live-filter">
					{categoryLabel && (
						<span
							className={classNames(
								"sp-smart-post-live-filter-label",
								titleGlobalTypography?.class ? titleGlobalTypography.class : ""
							)}
						>
							{overrideCategoryLabel ? overrideCategoryLabel : taxonomyType.replaceAll("_", " ")}
						</span>
					)}
					{"dropdown" === filterType && (
						<button
							onClick={() => setDropdown(!dropdownOpen)}
							className={classNames(
								"sp-smart-post-live-filter-btn",
								optionGlobalTypography?.class ? optionGlobalTypography.class : ""
							)}
						>
							<span>{termLabel?.label ? termLabel?.label : activeBtn}</span> <DownArrow />
						</button>
					)}
					<ul className={`sp-smart-post-live-filter-${filterType} ${dropdownOpen ? "open" : ""}`}>
						{"dropdown" === filterType && searchInDropdown && (
							<li key={"searchField"}>
								<div className="sp-dropdown-search-field">
									<input
										type="text"
										name="sp-search-term-field"
										placeholder={searchPlaceholderText}
										onChange={(e) => setSearchValue(e.target.value)}
									/>
								</div>
							</li>
						)}
						<li>
							<a
								className={allTextLabel == activeBtn ? "active" : ""}
								href="#"
								onClick={setTaxonomy}
								data-value={allTextLabel}
							>
								{allTextLabel}
							</a>
						</li>
						{allTerms?.map((term, i) => (
							<li key={term.value}>
								<a
									className={term.value == activeBtn ? "active" : ""}
									href="#"
									onClick={setTaxonomy}
									data-value={term.value}
								>
									{`${term.label} ${showPostCount ? `(${i + 1})` : ""}`}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default memo(Render);
