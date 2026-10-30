import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import { PostSliderLayoutTab, PostSliderCarouselTab } from "./generalTab";
import SharedInspectors from "../shared/inspectors";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes, isSelected }) => {
	// const { togglePanelBody, openedAccordion } = manageOpenAccordion();
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const {
		// postSliderNavArrow,
		// postSliderPaginationDots
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
						GeneralTab={PostSliderLayoutTab}
						SliderTab={PostSliderCarouselTab}
					/>
				)}
			</PanelBody>
			{/* { postSliderNavArrow && (
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
			{ postSliderPaginationDots && (
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
					<PostSliderGeneralTab
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
