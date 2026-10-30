import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { CarouselGeneralPanels, CarouselSliderPanel } from "./generalTab";
import TabControls from "../../components/tabControls/tabControls";
import SharedInspectors from "../shared/inspectors";
import { CarouselNavArrowStyleTab, CarouselPaginationStyleTab } from "../shared/styleTab";
import { CarouselNavArrowGeneralTab, CarouselPaginationGeneralTab } from "../shared/generalTab";
import { usePanelBodyContext } from "../../context";

const Inspector = ({ attributes, setAttributes }) => {
	const { carouselStyle, carouselNavArrow, carouselPaginationDot } = attributes;

	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const { blockName } = attributes;

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
						LayoutTab={CarouselGeneralPanels}
						CarouselTab={CarouselSliderPanel}
						blockName={blockName}
						initialTab={"layout"}
					/>
				)}
			</PanelBody>
			{"ticker" !== carouselStyle && carouselNavArrow && (
				<PanelBody
					title={__("Navigation Arrow", "post-carousel")}
					opened={openPanel === "navigation"}
					onToggle={() => togglePanelBody("navigation")}
				>
					{openPanel === "navigation" && (
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={CarouselNavArrowGeneralTab}
							StyleTab={CarouselNavArrowStyleTab}
						/>
					)}
				</PanelBody>
			)}
			{"ticker" !== carouselStyle && carouselPaginationDot && (
				<PanelBody
					title={__("Pagination Dots", "post-carousel")}
					opened={openPanel === "pagination"}
					onToggle={() => togglePanelBody("pagination")}
				>
					{openPanel === "pagination" && (
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={CarouselPaginationGeneralTab}
							StyleTab={CarouselPaginationStyleTab}
						/>
					)}
				</PanelBody>
			)}

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
