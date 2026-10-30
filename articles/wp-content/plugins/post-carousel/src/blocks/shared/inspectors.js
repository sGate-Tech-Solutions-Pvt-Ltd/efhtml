import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import {
	CarouselNavArrowGeneralTab,
	CarouselPaginationGeneralTab,
	CategoryGeneralTab,
	ContentAreaGeneralTab,
	ExcerptGeneralTab,
	ImageGeneralTab,
	MetaDataGeneralTab,
	PopupDetailsGeneralTab,
	QueryBuilderGeneralTab,
	ReadMoreGeneralTab,
	SocialShareGeneralTab,
	TitleGeneralTab,
} from "./generalTab";

import { TabControls, Toggle } from "../../components";
import { VisibilityTab, AdvancedTab } from "./advancedTab";
import {
	AdvancedStyleTab,
	CarouselNavArrowStyleTab,
	CarouselPaginationStyleTab,
	CategoryStyleTab,
	ContentAreaStyleTab,
	ExcerptStyleTab,
	ImageStyleTab,
	MetaDataStyleTab,
	PopupDetailsStyleTab,
	ReadMoreStyleTab,
	SocialShareStyleTab,
	TitleStyleTab,
} from "./styleTab";

const SharedInspectors = ({ attributes, setAttributes, openedAccordion, togglePanelBody }) => {
	const {
		generalLinkOpen,
		blockName,
		postType,
		carouselStyle,
		carouselNavArrow,
		carouselPaginationDot,
		imageFeaturedImg,
		titleShow,
		catTabCategoryEnable,
		excerptShow,
		showReadMoreButton,
		socialShareEnableSocial,
		enableMetaData,
		showFeatureVideo,
	} = attributes;
	const checkOpenedAccordion = (accordionName) => {
		return openedAccordion === accordionName ? true : false;
	};

	return (
		<>
			{/* query builder panel body  */}
			<PanelBody
				title={__("Query Builder", "post-carousel")}
				opened={checkOpenedAccordion("query_builder")}
				onToggle={() => togglePanelBody("query_builder")}
			>
				{checkOpenedAccordion("query_builder") && (
					<QueryBuilderGeneralTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			{[
				"post-carousel",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
				"post-timeline-three",
			].includes(blockName) &&
				"ticker" !== carouselStyle && (
					<>
						{carouselNavArrow && (
							<PanelBody
								title={__("Navigation Arrow", "post-carousel")}
								opened={checkOpenedAccordion("navigation")}
								onToggle={() => togglePanelBody("navigation")}
							>
								{checkOpenedAccordion("navigation") && (
									<TabControls
										attributes={attributes}
										setAttributes={setAttributes}
										GeneralTab={CarouselNavArrowGeneralTab}
										StyleTab={CarouselNavArrowStyleTab}
									/>
								)}
							</PanelBody>
						)}
						{!["thumbnail-slider-two"].includes(blockName) && carouselPaginationDot && (
							<PanelBody
								title={__("Pagination Dots", "post-carousel")}
								opened={checkOpenedAccordion("pagination")}
								onToggle={() => togglePanelBody("pagination")}
							>
								{checkOpenedAccordion("pagination") && (
									<TabControls
										attributes={attributes}
										setAttributes={setAttributes}
										GeneralTab={CarouselPaginationGeneralTab}
										StyleTab={CarouselPaginationStyleTab}
									/>
								)}
							</PanelBody>
						)}
					</>
				)}
			{/* Popup details page */}
			{(generalLinkOpen === "single-popup" || generalLinkOpen === "multi-popup") && (
				<PanelBody
					title={__("Popup Details Page", "post-carousel")}
					opened={checkOpenedAccordion("popup_details_page")}
					onToggle={() => togglePanelBody("popup_details_page")}
				>
					{checkOpenedAccordion("popup_details_page") && (
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={PopupDetailsGeneralTab}
							StyleTab={PopupDetailsStyleTab}
						/>
					)}
				</PanelBody>
			)}
			{/* timeline connector panel body for timeline category blocks */}
			<PanelBody
				title={__("Content Area", "post-carousel")}
				opened={checkOpenedAccordion("content_area")}
				onToggle={() => togglePanelBody("content_area")}
			>
				{checkOpenedAccordion("content_area") && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={ContentAreaGeneralTab}
						StyleTab={ContentAreaStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Image and Video", "post-carousel")}
				opened={checkOpenedAccordion("image")}
				onToggle={() => togglePanelBody("image")}
			>
				<Toggle
					label={__("Show Featured Image", "post-carousel")}
					attributes={imageFeaturedImg}
					attributesKey={"imageFeaturedImg"}
					setAttributes={setAttributes}
				/>
				<Toggle
					label={__("Show Featured Video", "post-carousel")}
					attributes={showFeatureVideo}
					attributesKey={"showFeatureVideo"}
					setAttributes={setAttributes}
					pro={true}
				/>
				{checkOpenedAccordion("image") && imageFeaturedImg && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={ImageGeneralTab}
						StyleTab={ImageStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Title", "post-carousel")}
				opened={checkOpenedAccordion("title")}
				onToggle={() => togglePanelBody("title")}
			>
				<Toggle
					label={__("Show Title", "post-carousel")}
					attributes={titleShow}
					attributesKey={"titleShow"}
					setAttributes={setAttributes}
				/>
				{checkOpenedAccordion("title") && titleShow && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={TitleGeneralTab}
						StyleTab={TitleStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Taxonomy", "post-carousel")}
				opened={checkOpenedAccordion("category")}
				onToggle={() => togglePanelBody("category")}
			>
				<Toggle
					label={__("Taxonomy", "post-carousel")}
					attributes={catTabCategoryEnable}
					attributesKey={"catTabCategoryEnable"}
					setAttributes={setAttributes}
				/>
				{checkOpenedAccordion("category") && catTabCategoryEnable && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={CategoryGeneralTab}
						StyleTab={CategoryStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Meta Data", "post-carousel")}
				opened={checkOpenedAccordion("meta_data")}
				onToggle={() => togglePanelBody("meta_data")}
			>
				<Toggle
					label={__("Show Meta Data", "post-carousel")}
					attributes={enableMetaData}
					attributesKey={"enableMetaData"}
					setAttributes={setAttributes}
				/>
				{checkOpenedAccordion("meta_data") && enableMetaData && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={MetaDataGeneralTab}
						StyleTab={MetaDataStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Excerpt", "post-carousel")}
				opened={checkOpenedAccordion("excerpt")}
				onToggle={() => togglePanelBody("excerpt")}
			>
				<Toggle
					label={__("Excerpt", "post-carousel")}
					attributes={excerptShow}
					setAttributes={setAttributes}
					attributesKey={"excerptShow"}
				/>
				{checkOpenedAccordion("excerpt") && excerptShow && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={ExcerptGeneralTab}
						StyleTab={ExcerptStyleTab}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__("Read More", "post-carousel")}
				opened={checkOpenedAccordion("read_more")}
				onToggle={() => togglePanelBody("read_more")}
			>
				<Toggle
					label={__("Read More Button", "post-carousel")}
					attributes={showReadMoreButton}
					setAttributes={setAttributes}
					attributesKey={"showReadMoreButton"}
				/>
				{checkOpenedAccordion("read_more") && showReadMoreButton && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						GeneralTab={ReadMoreGeneralTab}
						StyleTab={ReadMoreStyleTab}
					/>
				)}
			</PanelBody>
			{"product" !== postType && (
				<PanelBody
					title={__("Social Share", "post-carousel")}
					opened={checkOpenedAccordion("social_share")}
					onToggle={() => togglePanelBody("social_share")}
				>
					<Toggle
						label={__("Social Share", "post-carousel")}
						attributes={socialShareEnableSocial}
						attributesKey={"socialShareEnableSocial"}
						setAttributes={setAttributes}
					/>
					{checkOpenedAccordion("social_share") && socialShareEnableSocial && (
						<TabControls
							attributes={attributes}
							setAttributes={setAttributes}
							GeneralTab={SocialShareGeneralTab}
							StyleTab={SocialShareStyleTab}
						/>
					)}
				</PanelBody>
			)}
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={checkOpenedAccordion("advanced")}
				onToggle={() => togglePanelBody("advanced")}
			>
				{checkOpenedAccordion("advanced") && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						displayIcon={false}
						GeneralTab={AdvancedStyleTab}
						VisibilityTab={VisibilityTab}
						AdvancedTab={AdvancedTab}
					/>
				)}
			</PanelBody>
		</>
	);
};

export default SharedInspectors;
