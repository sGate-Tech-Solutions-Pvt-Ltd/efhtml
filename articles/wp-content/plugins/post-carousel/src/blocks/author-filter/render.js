import { memo, useEffect, useState } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { DownArrow, panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import useMetaData from "../../hooks/useMetaData";
import Inspector from "./inspect";
import classNames from "classnames";

const Render = ({ attributes, setAttributes }) => {
	const [searchValue, setSearchValue] = useState("");

	let allAuthors = [];
	const { authorList } = useMetaData(attributes, "editSite");

	authorList?.forEach((author) => {
		allAuthors = [...allAuthors, author];
	});
	attributes.authorList = allAuthors;

	const [dropdownOpen, setDropdown] = useState(false);
	const [optionLabel, setOptionLabel] = useState(false);
	const [activeBtn, setActiveBtn] = useState("all");

	const {
		uniqueId,
		filterType,
		showAuthorLabel,
		authorLabel,
		showSearchFieldInDropdown,
		allTextLabel,
		authorType,
		excludeAuthor,
		specificAuthor,
		showPostCount,
		titleGlobalTypography,
		optionGlobalTypography,
	} = attributes;

	useEffect(() => {
		const clickOutSite = (e) => {
			const target = e.target.closest(".sp-smart-post-author-filter");
			if (!target && dropdownOpen) {
				setDropdown(false);
			}
		};
		window.addEventListener("click", clickOutSite);

		return () => window.removeEventListener("click", clickOutSite);
	});

	if ("exclude" === authorType) {
		const authorIds = excludeAuthor.map((author) => author.value);
		allAuthors = authorList?.filter((author) => !authorIds.includes(author.value));
	}

	if ("specific" === authorType) {
		allAuthors = specificAuthor;
	}

	if (searchValue) {
		allAuthors = allAuthors.filter((author) => author.label.toLowerCase().includes(searchValue.toLowerCase()));
	}

	const changeOptionLabel = (e) => {
		const newValue = e.target.closest("a").dataset.value;
		const label = e.target.closest("a").dataset.label;
		setOptionLabel(label);
		setActiveBtn(newValue);
		setDropdown(false);
	};

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
				<div className="sp-smart-post-author-filter sp-smart-post-live-filter">
					{showAuthorLabel && (
						<span
							className={classNames(
								"sp-smart-post-live-filter-label",
								titleGlobalTypography?.class ? titleGlobalTypography.class : ""
							)}
						>
							{authorLabel}
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
							<span>{optionLabel ? optionLabel : allTextLabel}</span> <DownArrow />
						</button>
					)}
					<ul className={`sp-smart-post-live-filter-${filterType} ${dropdownOpen ? "open" : ""}`}>
						{"dropdown" === filterType && showSearchFieldInDropdown && (
							<li key={"searchField"}>
								<div className="sp-dropdown-search-field">
									<input
										type="text"
										name="sp-search-term-field"
										placeholder={"Search..."}
										onChange={(e) => setSearchValue(e.target.value)}
									/>
								</div>
							</li>
						)}
						<li>
							<a
								className={"all" === activeBtn ? "active" : ""}
								href="#"
								onClick={(e) => changeOptionLabel(e)}
								data-value={"all"}
								data-label={"All"}
							>
								{"All"}
							</a>
						</li>
						{allAuthors?.map((author, i) => (
							<li key={author.value}>
								<a
									className={author.value == activeBtn ? "active" : ""}
									href="#"
									onClick={(e) => changeOptionLabel(e)}
									data-value={author.value}
									data-label={author.label}
								>
									{`${author.label} ${showPostCount ? `(${i + 1})` : ""}`}
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
