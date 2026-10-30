import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
const ButtonsSave = ({ attributes }) => {
	// Destructure attributes
	const { uniqueId, additionalCssClass } = attributes;

	const blockProps = useBlockProps.save({
		className: additionalCssClass,
	});

	return (
		<div {...blockProps}>
			<div id={uniqueId} className={`sp-smart-post-buttons-front-page sp-smart-post-buttons-wrapper`}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default ButtonsSave;
