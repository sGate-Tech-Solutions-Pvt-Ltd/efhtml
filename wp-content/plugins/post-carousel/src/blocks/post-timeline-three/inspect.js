import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import SharedInspectors from "../shared/inspectors";
import { PostTimelineCarouselTab, PostTimelineGeneralTab } from "./generalTab";
import { TabControls } from "../../components";
import { PostTimelineConnectorStyleTab } from "../shared/styleTab";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes, isSelected }) => {
	// const { togglePanelBody, openedAccordion } = manageOpenAccordion();
	const { openPanel, togglePanelBody } = usePanelBodyContext();

	const {
		// postTimelineNavArrow,
		carouselStyle,
	} = attributes;

	return (
		<>
			<PanelBody
				title={__("Post Timeline", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					// <PostTimelineGeneralTab
					// 	attributes={ attributes }
					// 	setAttributes={ setAttributes }
					// />
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={PostTimelineGeneralTab}
						SliderTab={PostTimelineCarouselTab}
					/>
				)}
			</PanelBody>
			{/* <PanelBody
				title={ __( 'Carousel', 'post-carousel' ) }
				opened={ openPanel === 'carousel' }
				onToggle={ () => togglePanelBody( 'carousel' ) }
			>
				{ openPanel === 'carousel' && (
					<PostTimelineCarouselTab
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
			</PanelBody> */}
			{/* { postTimelineNavArrow && 'ticker' !== carouselStyle && (
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
			{/* TODO: This features will be implement in next update */}
			<PanelBody
				title={__("Timeline Connector", "post-carousel")}
				opened={openPanel === "timelineConnector"}
				onToggle={() => togglePanelBody("timelineConnector")}
			>
				<PostTimelineConnectorStyleTab attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
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
