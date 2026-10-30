import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import {
	NewsTickerContentArea,
	NewsTickerDateTab,
	NewsTickerGeneralPanel,
	NewsTickerHeadingTab,
	NewsTickerImageTab,
	NewsTickerNavigationGeneralTab,
	NewsTickerNavigationStyleTab,
	NewsTickerTitleTab,
} from "./generalTab";
import TabControls from "../../components/tabControls/tabControls";
import { QueryBuilderGeneralTab } from "../shared/generalTab";
import { usePanelBodyContext } from "../../context";
import { useMemo, useState } from "@wordpress/element";
import useMetaData from "../../hooks/useMetaData";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";

const Inspector = ({ attributes, setAttributes, isSelected }) => {
	const { displayStyle, tickerNavigation } = attributes;
	// const { togglePanelBody, openedAccordion } = manageOpenAccordion();
	const { openPanel, togglePanelBody } = usePanelBodyContext();
	const [readMoreButtonStyleType] = useState("color");

	const [colorState, setColorState] = useState("normal");
	const { imageSizes } = useMetaData(attributes);

	const imageSizesOption = useMemo(() => {
		if (!imageSizes || !Array.isArray(imageSizes)) return [];

		const options = imageSizes.map((size) => ({
			label: size,
			value: size,
		}));

		options.unshift({ label: "Original Size", value: "" });
		options.push({ label: "Custom Size", value: "custom" });

		return options;
	}, [imageSizes]);

	return (
		<>
			<PanelBody
				title={__("General", "post-carousel")}
				opened={openPanel === "general"}
				onToggle={() => togglePanelBody("general")}
				initialOpen={true}
			>
				{openPanel === "general" && (
					<NewsTickerGeneralPanel attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			{/* query builder panel body  */}
			<PanelBody
				title={__("Query Builder", "post-carousel")}
				opened={openPanel === "query_builder"}
				onToggle={() => togglePanelBody("query_builder")}
			>
				{openPanel === "query_builder" && (
					<QueryBuilderGeneralTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Content Area", "post-carousel")}
				opened={openPanel === "content_area"}
				onToggle={() => togglePanelBody("content_area")}
			>
				{openPanel === "content_area" && (
					<NewsTickerContentArea attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Ticker Heading", "post-carousel")}
				opened={openPanel === "tickerHeading"}
				onToggle={() => togglePanelBody("tickerHeading")}
			>
				{openPanel === "tickerHeading" && (
					<NewsTickerHeadingTab attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>
			<PanelBody
				title={__("Title", "post-carousel")}
				opened={openPanel === "title"}
				onToggle={() => togglePanelBody("title")}
			>
				{openPanel === "title" && <NewsTickerTitleTab attributes={attributes} setAttributes={setAttributes} />}
			</PanelBody>
			{displayStyle !== "typewriter" && (
				<PanelBody
					title={__("Date", "post-carousel")}
					opened={openPanel === "date"}
					onToggle={() => togglePanelBody("date")}
				>
					{openPanel === "date" && (
						<NewsTickerDateTab attributes={attributes} setAttributes={setAttributes} />
					)}
				</PanelBody>
			)}
			<PanelBody
				title={__("Image", "post-carousel")}
				className="sp-smart-post-image-panel-body"
				opened={openPanel === "image"}
				onToggle={() => togglePanelBody("image")}
			>
				{openPanel === "image" && <NewsTickerImageTab attributes={attributes} setAttributes={setAttributes} />}
			</PanelBody>

			{displayStyle === "slide" && (
				<PanelBody
					title={__("Navigation", "post-carousel")}
					opened={openPanel === "navigation"}
					onToggle={() => togglePanelBody("navigation")}
				>
					{openPanel === "navigation" && (
						<>
							{/* { ! tickerNavigation && (
								<Toggle
									label={ __(
										'Navigation',
										'post-carousel'
									) }
									attributes={ tickerNavigation }
									attributesKey={ 'tickerNavigation' }
									setAttributes={ setAttributes }
								/>
							) } */}
							{/* { tickerNavigation && ( */}
							<TabControls
								attributes={attributes}
								setAttributes={setAttributes}
								GeneralTab={NewsTickerNavigationGeneralTab}
								StyleTab={NewsTickerNavigationStyleTab}
							/>
							{/* ) } */}
						</>
					)}
				</PanelBody>
			)}
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advanced"}
				onToggle={() => togglePanelBody("advanced")}
			>
				{openPanel === "advanced" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						AdvancedTab={AdvancedTab}
						VisibilityTab={VisibilityTab}
						displayIcon={false}
						initialTab={"visibility"}
					/>
				)}
			</PanelBody>
		</>
	);
};

export default Inspector;
