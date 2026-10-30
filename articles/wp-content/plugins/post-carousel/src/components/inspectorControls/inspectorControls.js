import { InspectorControls } from "@wordpress/block-editor";
import { createRoot } from "@wordpress/element";
import { ArrowUpRight } from "../../icons/icons";
import "./editor.scss";
import { blockDocLink, blockPreviewPanelLink } from "../../controls/constants";
import Library from "../../prebuild-library/Library";

let modalRoot = null;

const InspectorControl = ({ Inspector, attributes, setAttributes, isSelected = false }) => {
	const { blockName } = attributes;

	// Close modal.
	const removeModal = () => {
		if (modalRoot) {
			modalRoot.unmount();
			modalRoot = null;
		}
		const modalNode = document.querySelector(".sp-smart-builder-modal");
		if (modalNode) modalNode.remove();
		document.body.classList.remove("sp-smart-popup-open");
	};
	// Open modal.
	const onInsertButtonClick = (e) => {
		e.preventDefault();

		// If modal already exists, do nothing.
		if (document.querySelector(".sp-smart-builder-modal")) return;

		const node = document.createElement("div");
		node.className = "sp-smart-builder-modal sp-smart-blocks-layouts";
		document.body.appendChild(node);

		modalRoot = createRoot(node);
		modalRoot.render(<Library isShow={true} onClose={removeModal} currentBlockName={blockName} />);
		document.body.classList.add("sp-smart-popup-open");

		// Close when clicking outside.
		setTimeout(() => {
			node.addEventListener("click", (e) => {
				if (e.target === node) removeModal();
			});
		}, 0);
	};

	return (
		<InspectorControls>
			<div className="sp-smart-post-tab-panel">
				{/* Documentation link */}
				{blockDocLink[blockName] && (
					<div className="sp-smart-post-tab-panel-doc-link-wrapper">
						<div className="sp-smart-post-block-doc-link">
							<a href={blockDocLink[blockName]} target="_blank" rel="noreferrer">
								Documentation <ArrowUpRight />
							</a>
						</div>
					</div>
				)}

				{/* Buttons */}
				<div className="sp-smart-post-tab-panel-header-btn-wrapper">
					<div className="sp-smart-post-btn-group">
						{ "container" !== blockName && (
						<button
							type="button"
							data-block={blockName}
							onClick={onInsertButtonClick}
							className="sp-smart-post-tab-panel-header-btn sp-btn-item sp-ready-patterns"
						>
							Ready Patterns
						</button>
						)}

						{blockPreviewPanelLink[blockName] && (
							<a
								className="sp-smart-post-tab-panel-header-btn sp-btn-item sp-block-preview"
								href={blockPreviewPanelLink[blockName]}
								target="_blank"
								rel="noreferrer"
							>
								Block Preview
							</a>
						)}
					</div>
				</div>

				{/* Rest of the inspector */}
				<Inspector attributes={attributes} setAttributes={setAttributes} isSelected={isSelected} />
			</div>
		</InspectorControls>
	);
};

export default InspectorControl;
