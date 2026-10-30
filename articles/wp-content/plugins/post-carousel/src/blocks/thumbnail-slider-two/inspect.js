import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import { usePanelBodyContext } from "../../context";
import { ThumbnailProgressBarTab, ThumbnailSliderTwoGeneralTab, ThumbnailTwoSliderTab } from "./generalTab";
import SharedInspectors from "../shared/inspectors";

const Inspect = ({ attributes, setAttributes, isSelected }) => {
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const {
		thumbnailSliderTwoLayout,
		// thumbnailTwoNavArrow,
		carouselNavArrow,
	} = attributes;

	return (
		<>
			<PanelBody
				title={__("Thumbnails Slider", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{"general" === openPanel && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={ThumbnailSliderTwoGeneralTab}
						SliderTab={ThumbnailTwoSliderTab}
					/>
				)}
			</PanelBody>
			{"thumbnail-slider-two-layout-two" === thumbnailSliderTwoLayout && (
				<PanelBody
					title={__("Thumbnails Progress Bar", "post-carousel")}
					opened={openPanel === "progressBar"}
					onToggle={() => togglePanelBody("progressBar")}
				>
					{"progressBar" === openPanel && (
						<ThumbnailProgressBarTab attributes={attributes} setAttributes={setAttributes} />
					)}
				</PanelBody>
			)}
			{/* { carouselNavArrow && (
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
			) } */}
			{/* <PanelBody
				title={ __( 'General', 'post-carousel' ) }
				opened={ openPanel === 'general' }
				onToggle={ () => togglePanelBody( 'general' ) }
			>
				{ openPanel === 'general' && (
					<ThumbnailTwoGeneralTab
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

export default Inspect;
