import { useMemo } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import dynamicCssFn from "./dynamicCss";
import Render from "./render";
import { useDeviceType } from "../../controls/controls";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const Edit = ({ attributes, setAttributes, clientId, name }) => {
	const { additionalCssClass } = attributes;
	const blockProps = useBlockProps({
		className: additionalCssClass,
	});

	const currentDevice = useDeviceType();

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend", currentDevice),
		[attributes, currentDevice]
	);
	return (
		<div {...blockProps}>
			<style>{blockStyling}</style>
			<Render attributes={attributes} setAttributes={setAttributes} clientId={clientId} name={name} />
		</div>
	);
};

export default compose(addInitialAttr)(Edit);
