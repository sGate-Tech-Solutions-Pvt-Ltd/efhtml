import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { CarouselGeneralPanel, CarouselSliderPanel } from "./generalTab";
import TabControls from "../../components/tabControls/tabControls";
import SharedInspectors from "../shared/inspectors";

import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();

	return (
		<>
			<PanelBody
				title={__("Post Carousel", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={CarouselGeneralPanel}
						SliderTab={CarouselSliderPanel}
					/>
				)}
			</PanelBody>
			{/* { 'ticker' !== carouselStyle && carouselNavArrow && (
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
			{ 'ticker' !== carouselStyle && carouselPaginationDot && (
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
					<PostCarouselGeneralTab
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
