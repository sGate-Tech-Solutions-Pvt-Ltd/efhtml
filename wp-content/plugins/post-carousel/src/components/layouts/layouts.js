import { memo } from "@wordpress/element";
import { RightSymbolIcon } from "../../icons/icons";
import "./editor.scss";
import ProBtn from "../proBtn/proBtn";

const Layout = ({ layout, handleActive, activeLayout, displayActive, proBtnClass = ""}) => {
	const { icon, value, label, type, demoLink } = layout;

	return (
		<div
			onClick={ type !== "pro" ? () => handleActive(value) : null }
			className={`sp-smart-post-layout-card ${type === "pro" ? "sp-smart-pro-layout" : ""} ${value === activeLayout ? "active" : "inactive"}`}
		>
			{value === activeLayout && displayActive && (
				<span className="active-symbol">
					<RightSymbolIcon />
				</span>
			)}
			{type !== "pro" && <div className="sp-smart-layout-img">
				{icon}
			</div>}
			{type === "pro" && <a href={demoLink} rel="noreferrer" target="_blank" className="sp-smart-layout-img">
				{icon}
				<ProBtn proBtnClass={proBtnClass} demoLink={demoLink} />
			</a>}
			{label && <p className="sp-smart-post-layout-title">{label}</p>}
		</div>
	);
};

const Layouts = ({
	attributes,
	setAttributes,
	attributesKey,
	displayActive = false,
	label = "",
	proBtnClass = "",
	showDemoTitle = false,
	grid = 2,
	items,
	onChange = false,
}) => {
	const handleActive = (value) => {
		if (value === attributes) {
			return;
		}
		if (onChange) {
			onChange(value);
		}
		setAttributes({ [attributesKey]: value });
	};

	return (
		<div className="sp-smart-post-layout-picker sp-smart-post-panel-pb">
			{label && <p className="sp-smart-post-component-title">{label}</p>}
			<div className={`sp-smart-post-layouts grid-${grid}`}>
				{items?.map((layout, index) => (
					<Layout
						key={index}
						layout={layout}
						displayActive={displayActive}
						handleActive={handleActive}
						proBtnClass={proBtnClass}
						showDemoTitle={showDemoTitle}
						activeLayout={attributes}
					/>
				))}
			</div>
		</div>
	);
};

export default memo(Layouts);
