import { Dropdown, Tooltip } from "@wordpress/components";
import { useRef, useState } from "@wordpress/element";
import "./editor.scss";
import { DropdownIcon } from "../../icons/icons";

const SPIconPicker = ({
	attributes,
	attributesKey,
	setAttributes,
	label,
	closeBtn = true,
	iconType = "socialIcon",
}) => {
	const socialIcon = [
		"facebook",
		"x",
		"linkedin",
		"pinterest",
		"instagram",
		"vkontakte",
		"digg",
		"tumblr",
		"reddit",
		"whatsapp",
		"pocket",
		"xing",
		"mail",
	];

	const arrowIcon = [
		"right-circled2",
		"left-circled2",
		"right-open",
		"right-open-mini",
		"right-open-big",
		"right-open-one",
		"left-open-one",
		"right-open-outline",
		"left-open",
		"left-open-mini",
		"left-open-big",
		"left-open-outline",
		"left-dir",
		"right-dir",
		"left-one",
		"right-one",
		"angles-right-solid",
		"arrow-right-solid",
		"forward-solid",
		"right-long-solid",
		"angle-up",
	];

	const icons = iconType === "socialIcon" ? socialIcon : arrowIcon;

	const activeIconRef = useRef(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleChange = (newIcon) => {
		setAttributes({ [attributesKey]: newIcon });
	};

	const handleClose = () => {
		setAttributes({ [attributesKey]: "" });
	};

	return (
		<div className="sp-smart-post-icon-picker-area sp-smart-post-component-mb">
			<div className="sp-smart-post-component-title">{label}</div>
			{/* modal */}
			<Dropdown
				// position="top right"
				popoverProps={{ placement: "top-right" }}
				renderToggle={({ isOpen, onToggle }) => (
					<div
						onClick={() => {
							setIsDropdownOpen((prev) => !prev);
							onToggle();
						}}
						aria-expanded={isOpen}
						className="sp-smart-post-icon-picker-dropdown-input"
					>
						<div className="sp-smart-post-media-control__wrapper sp-smart-post-icon-picker">
							{attributes ? (
								<>
									<div className="sp-smart-post-icon-picker-active-icon">
										<i className={`sp-icon-${attributes}`}></i>
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
						</div>
						<div className={`sp-smart-post-iconPicker-dropdown-btn ${isOpen ? "is-open" : "is-close"}`}>
							<DropdownIcon />
						</div>
					</div>
				)}
				onClose={(event, isInside) => {
					setIsDropdownOpen(false);
					if (isInside) {
						event.stopPropagation();
					}
				}}
				renderContent={({ onToggle }) => (
					<div
						onMouseDown={(event) => {
							event.stopPropagation();
						}}
						className="sp-smart-post-icon-picker-popup"
					>
						<div className="sp-smart-post-popup-heading">
							<div className="sp-smart-post-icon-picker-popup-top-section">
								<span className="sp-smart-post-icon-search-heading">Select an Icon</span>
								<span className="sp-smart-post-icon-search-sub-heading">
									Choose an icon for this collection.
								</span>
							</div>
							<button
								className="sp-smart-post-icon-picker-close-btn sp-smart-post-icon-picker-btn"
								onClick={() => {
									setIsDropdownOpen(false);
									onToggle();
								}}
							>
								<i className="fa fa-times" />
							</button>
						</div>
						<div className="sp-smart-post-icon-picker-list">
							{icons?.map((icon, index) => (
								<Tooltip
									key={index}
									text={attributes}
									className="sp-smart-post-component-tooltip"
									position="top"
								>
									<span
										key={index}
										ref={attributes === icon ? activeIconRef : null}
										className={`sp-smart-post-icon-picker-item ${
											attributes === icon ? "active" : ""
										}`}
										onClick={() => handleChange(icon)}
									>
										<i className={`sp-icon-${icon}`}></i>
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

export default SPIconPicker;
