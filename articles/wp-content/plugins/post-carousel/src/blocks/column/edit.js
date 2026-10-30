import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { InspectorControl } from "../../components";
import { panelBodyRightIcon } from "../../icons/icons";
import { Inspector } from "./Inspector";
import dynamicCssFn from "./dynamicCss";
import { useEffect, useMemo, useRef, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { useDeviceType } from "../../controls/controls";
import editorStyleDependency from "./editorStyleDependency";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";


const ColumnEdit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const {
		uniqueId,
		columnAdditionalID,
		columnAdditionalClass,
		customCss,
		columnWrapperLink,
		columnWrapperLinkUrl,
		columnWrapperLinkNewTab,
		columnBg,
		columnBgVideo,
	} = attributes;

	const blockProps = useBlockProps();
	const deviceType = useDeviceType();
	const containerColumnRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	const { getBlockOrder, getBlockRootClientId, getBlock } = useSelect((select) => select("core/block-editor"), []);

	const hasChildBlocks = getBlockOrder(clientId).length > 0;
	const parentBlockId = getBlockRootClientId(clientId);
	const parentAttr = getBlock(parentBlockId)?.attributes || {};
	const parentFlexDir = parentAttr?.containerFlexDirection?.device?.[deviceType];


	
	useEffect( () => {
		setAttributes( { parentContainerFlexDirection: parentAttr?.containerFlexDirection })
	}, [ parentFlexDir ])

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "editor", deviceType),
		[...editorStyleDependency(attributes), deviceType]
	);

	return (
		<>
			<style>
				{blockStyling}
				{customCss}
			</style>
			<div
				ref={containerColumnRef}
				id={uniqueId}
				className={`${uniqueId} sp-smart-post-container-column${
					columnAdditionalClass ? " " + columnAdditionalClass : ""
				} ${isHovered ? "sp-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
				{...(columnAdditionalID ? { id: columnAdditionalID } : {})}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="sp-smart-post-column-wrapper">
					{columnBg?.color?.style === "video" && (
						<div className="sp-smart-post-column__video-wrap">
							{columnBgVideo && (
								<video autoPlay loop muted>
									<source src={columnBgVideo.url} type="video/mp4" />
								</video>
							)}
						</div>
					)}
					<div {...blockProps}>
						<InspectorControl
							RightIcon={panelBodyRightIcon}
							attributes={attributes}
							setAttributes={setAttributes}
							Inspector={Inspector}
						/>
						<div className="sp-smart-post-show-column">
							<InnerBlocks
								orientation="horizontal"
								renderAppender={hasChildBlocks ? undefined : InnerBlocks.ButtonBlockAppender}
							/>
							{columnWrapperLink && (
								<a
									className="sp-smart-post-column-block-wrapper-link"
									href={columnWrapperLinkUrl}
									rel="noopener noreferrer"
									target={columnWrapperLinkNewTab ? "_blank" : "_self"}
									content=""
								>
									hidden wrapper
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default compose(addInitialAttr)(ColumnEdit);
