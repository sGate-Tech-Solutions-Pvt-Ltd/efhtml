import { useBlockProps } from "@wordpress/block-editor";
import Render from "./render";
import useMetaData from "../../hooks/useMetaData";
import dynamicCssFn from "./dynamicCss";
import { useMemo } from "@wordpress/element";
import { useDeviceType } from "../../controls/controls";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";
const TaxonomyFilterEdit = ({ attributes, setAttributes, clientId, name }) => {
	const { allTaxonomies, additionalCssClass } = useMetaData(attributes, "editSite");
	const blockProps = useBlockProps({
		className: additionalCssClass,
	});
	const deviceType = useDeviceType();

	const blockStyling = useMemo(() => dynamicCssFn(attributes, "frontend", deviceType), [attributes, deviceType]);
	return (
		<div {...blockProps}>
			<style>{blockStyling}</style>
			<Render
				allTaxonomies={allTaxonomies}
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
				name={name}
			/>
		</div>
	);
};

export default compose(addInitialAttr)(TaxonomyFilterEdit);
