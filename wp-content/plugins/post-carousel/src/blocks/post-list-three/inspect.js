import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import SharedInspectors from "../shared/inspectors";
import { Divider, PostListGeneralTab } from "./generalTab";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes, isSelected }) => {
	// const { togglePanelBody, openedAccordion } = manageOpenAccordion();
	const { postListLayout } = attributes;

	const { openPanel, togglePanelBody } = usePanelBodyContext();

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<PostListGeneralTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			{![
				"sp-smart-post-list-two-layout-two",
				"sp-smart-post-list-two-layout-five",
				"sp-smart-post-list-two-layout-six",
			].includes(postListLayout) && (
				<PanelBody
					title={__("Divider", "post-carousel")}
					opened={openPanel === "divider"}
					onToggle={() => togglePanelBody("divider")}
				>
					<Divider attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			)}
			{/* <PanelBody
				title={ __( 'Separator', 'post-carousel' ) }
				opened={ openPanel === 'separator' }
				onToggle={ () => togglePanelBody( 'separator' ) }
			>
				<PostListSeparatorGeneralTab
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBody> */}
			<SharedInspectors
				attributes={attributes}
				setAttributes={setAttributes}
				togglePanelBody={togglePanelBody}
				openedAccordion={openPanel}
			/>
		</>
	);
};

export default Inspector;
