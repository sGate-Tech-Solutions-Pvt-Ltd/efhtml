import { useMemo } from "@wordpress/element";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspect";
import { useDeviceType } from "../../controls/controls";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const ButtonsEdit = ({ attributes, setAttributes }) => {
	const { uniqueId, additionalCssClass, customCss } = attributes;
	const currentDevice = useDeviceType();

	const dynamicCssValue = useMemo(
		() => dynamicCssFn(attributes, "frontend", currentDevice),
		[attributes, currentDevice]
	);
	const blockProps = useBlockProps({
		className: additionalCssClass,
	});

	return (
		<div {...blockProps}>
			<style>
				{dynamicCssValue}
				{customCss}
			</style>

			<InspectorControl
				TitleIcon={panelBodyTitleIcon}
				RightIcon={panelBodyRightIcon}
				Inspector={Inspector}
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<div className="sp-smart-post-buttons-editor-page sp-smart-post-buttons-wrapper" id={uniqueId}>
				<InnerBlocks
					__experimentalCaptureToolbars={false}
					allowedBlocks={["sp-smart-post-show/button"]}
					template={[["sp-smart-post-show/button"]]}
				/>
			</div>
		</div>
	);
};

export default compose(addInitialAttr)(ButtonsEdit);
