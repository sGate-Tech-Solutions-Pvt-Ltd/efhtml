import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const SmartListsSave = ({ attributes }) => {
	const blockProps = useBlockProps.save();

	const { uniqueId, smartListsLayout, dividerEnable, additionalCssClass, listOrientation } = attributes;

	return (
		<div {...blockProps}>
			<ul
				id={uniqueId}
				className={`sp-smart-post-smart-lists-wrapper  sp-smart-post-smart-lists-front-end ${smartListsLayout}  ${dividerEnable ? "divider" : ""} sp-list-orientation-${listOrientation} ${additionalCssClass}`}
			>
				<InnerBlocks.Content />
			</ul>
		</div>
	);
};

export default SmartListsSave;
