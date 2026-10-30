import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import { PostSliderTwoLayoutTab, PostSliderTwoSliderTab } from "./generalTab";
import SharedInspectors from "../shared/inspectors";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes }) => {
	// const { togglePanelBody, openedAccordion } = manageOpenAccordion();
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const {
		// postSliderTwoNavArrow,
		// postSliderTwoPaginationDot
	} = attributes;

	return (
		<>
			<PanelBody
				title={__("Post Slider", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={PostSliderTwoLayoutTab}
						SliderTab={PostSliderTwoSliderTab}
					/>
				)}
			</PanelBody>
			{/* { postSliderTwoNavArrow && (
				<PanelBody
					title={ __( 'Navigation Arrow', 'post-carousel' ) }
					opened={ openPanel === 'navigation' }
					onToggle={ () => togglePanelBody( 'navigation' ) }
				>
					{ openPanel === 'navigation' && (
						<TabControls
							attributes={ attributes }
							setAttributes={ setAttributes }
							GeneralTab={ CarouselNavArrowGeneralTab }
							StyleTab={ CarouselNavArrowStyleTab }
						/>
					) }
				</PanelBody>
			) }
			{ postSliderTwoPaginationDot && (
				<PanelBody
					title={ __( 'Pagination Dots', 'post-carousel' ) }
					opened={ openPanel === 'pagination' }
					onToggle={ () => togglePanelBody( 'pagination' ) }
				>
					{ openPanel === 'pagination' && (
						<TabControls
							attributes={ attributes }
							setAttributes={ setAttributes }
							GeneralTab={ CarouselPaginationGeneralTab }
							StyleTab={ CarouselPaginationStyleTab }
						/>
					) }
				</PanelBody>
			) } */}
			{/* <PanelBody
				title={ __( 'General', 'post-carousel' ) }
				opened={ openPanel === 'general' }
				onToggle={ () => togglePanelBody( 'general' ) }
			>
				{ openPanel === 'general' && (
					<PostSliderTwoGeneralTab
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
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
