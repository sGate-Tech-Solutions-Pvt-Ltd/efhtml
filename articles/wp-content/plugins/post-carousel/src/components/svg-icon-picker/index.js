import { Dropdown, Tooltip } from "@wordpress/components";
import { useEffect, useRef, useState } from "@wordpress/element";
import icons from "./icon-lists";
import "./editor.scss";
import {
	ArrowRight,
	Square,
	Check,
	CheckCircle,
	ChevronRight,
	Dot,
	SquareBorder,
	RightArrow,
	Hand,
	FillStar,
	NpArrow,
	BulletPoint,
	CircleIcon,
	NumberIcon,
} from "./icons";
const Icons = {
	CheckCircle,
	Dot,
	NumberIcon,
	Square,
	FillStar,
	NpArrow,
	BulletPoint,
	RightArrow,
	Check,
	CircleIcon,
	SquareBorder,
	Hand,
	ArrowRight,
	ChevronRight,
};

const SpSVGIconPicker = ({
	attributes,
	attributesKey,
	setAttributes,
	label,
	closeBtn = true,
	defaultCategory = "All",
}) => {
	const [CurrentIcon, setCurrentIcon] = useState(attributes);
	const IconComponent = Icons[CurrentIcon];

	const activeIconRef = useRef(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const handleChange = (newIcon) => {
		// const icon = newIcon.split( ' ' )[ 1 ];
		setCurrentIcon(newIcon);
		setAttributes({ [attributesKey]: newIcon });
	};
	const handleClose = () => {
		setAttributes({ [attributesKey]: "" });
		setCurrentIcon(null);
	};
	const flatIcons = selectedCategory === "All" ? Object.values(icons).flat() : icons[selectedCategory];
	// const activeIcon = 'fa ' + attributes;
	const activeIcon = attributes;
	const categories = Object.keys(icons);
	// Filter icons based on search query
	const filteredIcons = flatIcons.filter((icon) => icon.toLowerCase().includes(searchQuery.toLowerCase()));

	const iconNameHandle = (icon) => {
		const iconName = icon?.replace("fa fa-", "")?.replaceAll("-", " ");
		const capitalizedName = iconName?.replace(/\b\w/g, (char) => char.toUpperCase());
		return capitalizedName;
	};

	useEffect(() => {
		if (isDropdownOpen && activeIconRef.current) {
			setTimeout(() => {
				activeIconRef.current.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 100);
		}
	}, [isDropdownOpen]);

	return (
		<div className="sp-smart-post-icon-picker-area sp-smart-post-component-mb">
			<span className="sp-smart-post-component-title">{label}</span>
			{/* modal */}
			<Dropdown
				position="top right"
				renderToggle={({ isOpen, onToggle }) => (
					<div
						onClick={() => {
							setIsDropdownOpen((prev) => !prev);
							onToggle();
						}}
						aria-expanded={isOpen}
					>
						<div className="sp-smart-post-media-control__wrapper sp-smart-post-icon-picker">
							{attributes ? (
								<>
									<div className="sp-smart-post-icon-picker-active-icon">
										<IconComponent />
									</div>
									{closeBtn && (
										<button
											className="sp-smart-post-icon-picker-close-btn sp-smart-post-icon-picker-btn"
											onClick={handleClose}
										>
											<i className="fa fa-times" />
										</button>
									)}
								</>
							) : (
								<button className="sp-smart-post-icon-picker-add-btn  sp-smart-post-icon-picker-btn">
									<i className="fa fa-plus" />
								</button>
							)}
							<div className="sp-smart-post-media-picker-tooltip">
								<span>{attributes ? "Change Icon" : "Choose Icon"}</span>
							</div>
						</div>
					</div>
				)}
				onClose={(event, isInside) => {
					setIsDropdownOpen(false);
					if (isInside) {
						event.stopPropagation();
						return;
					}
				}}
				renderContent={() => (
					<div
						onMouseDown={(event) => {
							event.stopPropagation();
						}}
						className="sp-smart-post-icon-picker-popup"
					>
						<div className="sp-smart-post-icon-picker-popup-top-section">
							<span className="sp-smart-post-icon-search-heading">Select an Icon</span>
							{/* <span className="sp-smart-post-icon-search-sub-heading">
								Choose an icon for this collection.
							</span> */}
							<div className="sp-smart-post-icon-picker-search-and-category-wrapper">
								{/* Search Input */}
								{/* <input
									type="text"
									placeholder="Search... sdf fsfsdfs"
									value={ searchQuery }
									onChange={ ( e ) =>
										setSearchQuery( e.target.value )
									}
									className="sp-smart-post-icon-picker-search"
								/> */}
								{/* Category Dropdown */}
								{/* <select
									className="sp-smart-post-icon-picker-category"
									value={ selectedCategory }
									onChange={ ( e ) =>
										setSelectedCategory( e.target.value )
									}
								>
									<option value="All">All</option>
									{ categories.map( ( category, index ) => (
										<option
											key={ index }
											value={ category }
										>
											{ category }
										</option>
									) ) }
								</select> */}
							</div>
						</div>
						<div className="sp-smart-post-icon-picker-list">
							{/* { filteredIcons?.map( ( icon, index ) => ( */}
							{Object.entries(Icons).map(([name, Icon], index) => (
								<Tooltip
									key={name}
									text={iconNameHandle(name)}
									className={`sp-smart-post-component-tooltip`}
									position="top"
								>
									<span
										key={name}
										// ref={
										// 	activeIcon === icon
										// 		? activeIconRef
										// 		: null
										// }
										className={`sp-smart-post-icon-picker-item${
											activeIcon === name ? " active" : ""
										}${index > 5 ? " sp-is-pro-icon" : ""}`}
										onClick={() => handleChange(name)}
									>
										{/* <i className={ icon }></i> */}
										{/* <ArrowRight /> */}

										<Icon active={activeIcon === name ? true : false} />
									</span>
								</Tooltip>
							))}
						</div>
					</div>
				)}
			/>
		</div>
	);
};

export default SpSVGIconPicker;
