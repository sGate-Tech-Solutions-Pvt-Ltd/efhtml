import { useEffect, useRef, useState } from "@wordpress/element";
import { Button, Popover } from "@wordpress/components";
import "./editor.scss";
import { BorderIcon } from "../../icons/icons";
import { jsonParse } from "../../blocks/shared/helpFn";

const SelectField = ({ popupRef, childElement, onClose, anchor = "", divClassName = "" }) => {
	return (
		<>
			<Popover
				ref={popupRef}
				shift={true}
				className={`sp-border-popover sp-smart-post-tab-panel ${divClassName}`}
				anchor={anchor}
				// position={ 'bottom left' }
				offset={10}
				// placement="right"
				focusOnMount={false}
			>
				<div className="sp-smart-post-popup-content">
					<div className="sp-smart-post-popup-wrapper">
						<div className="sp-smart-post-popup-content-area">
							{React?.cloneElement(childElement, { onClose })}
						</div>
					</div>
				</div>
			</Popover>
		</>
	);
};

const Popup = (props) => {
	const {
		label,
		children,
		toggleButton,
		type = "",
		activeLabel = "",
		divClassName = "",
		popupClose = true,
		setPopupClose = () => {},
	} = props;
	const [isContentsVisible, setIsContentsVisible] = useState(false);
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const popupRef = useRef(null);
	const buttonRef = useRef(null);

	const handleButtonClick = () => {
		setIsContentsVisible((prev) => !prev); // Toggle content visibility
		setPopupClose((prev) => !prev);
	};

	// Close the dropdown when clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			const typographyElement = event.target.closest(".sp-smart-post-typography-fonts");
			const popupElement = event.target.closest(".sp-smart-post-popup-content");
			const colorPopupElement = event.target.closest(".sp-smart-post-picker-pallet-wrapper");

			if (
				popupRef.current &&
				!popupRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target) &&
				!typographyElement &&
				!popupElement &&
				!colorPopupElement
			) {
				setIsContentsVisible(false);
				setPopupClose(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [popupRef, buttonRef]);

	const value = toggleButton?.props?.attributes || null;
	const isActivePopUpButton = value ? jsonParse(value) : true;

	return (
		<>
			<div className="sp-smart-post-button sp-smart-post-component-mb">
				{type !== "select" && (
					<>
						<div className={`sp-smart-post-header-left ${toggleButton && "wide-area"}`}>
							{label && (
								<span className="sp-smart-post-component-title">
									{label}
								</span>
							)}
							{toggleButton && toggleButton}
						</div>
						<div className="sp-smart-post-header-right" ref={setPopoverAnchor}>
							<Button
								disabled={!isActivePopUpButton}
								className={`sp-smart-post-border-icon-button ${
									isActivePopUpButton ? "active" : ""
								} ${isContentsVisible ? "button-clicked" : ""}`}
								icon={<BorderIcon isActive={isContentsVisible} />}
								ref={buttonRef}
								onClick={handleButtonClick}
							/>
						</div>
					</>
				)}
				{type === "select" && (
					<>
						<div
							ref={buttonRef}
							className={`sp-smart-post-dropdown-select ${divClassName}`}
							onClick={handleButtonClick}
						>
							{activeLabel?.replaceAll("-", " ")}
							{isContentsVisible && isActivePopUpButton ? (
								<i className="sp-icon-angle-up" />
							) : (
								<i className="sp-icon-angle-down" />
							)}
						</div>
					</>
				)}
			</div>
			{type !== "select" && isContentsVisible && isActivePopUpButton && (
				<SelectField
					popupRef={popupRef}
					childElement={children}
					anchor={popoverAnchor}
					divClassName={ divClassName }
					onClose={() => {
						setIsContentsVisible(false);
						setPopupClose(false);
					}}
				/>
			)}
			{type === "select" && popupClose && (
				<SelectField
					popupRef={popupRef}
					childElement={children}
					divClassName={ divClassName }
					// onClose={() => {
					// 	setIsContentsVisible(false);
					// 	setPopupClose(false);
					// }}
				/>
			)}
		</>
	);
};

export default Popup;
