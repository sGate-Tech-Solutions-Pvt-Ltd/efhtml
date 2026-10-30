import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const SaveComponent = () => {
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
};

export default SaveComponent;
