import { __ } from "@wordpress/i18n";
import {
	InputControl,
	Layouts,
	MultiSelectDndKit,
	SelectField,
	SPRangeControl,
	SPToggleGroupControl,
} from "../../components";
import { LayoutOne, LayoutTwo } from "./icons";
import { AlignCenter, AlignLeft, AlignRight, AlignFull } from "../../icons/icons";
import { useEffect, useRef } from "@wordpress/element";
import ProInfo from "../../components/proInfo/proInfo";

export const GeneralTab = ({ attributes, setAttributes }) => {
	const {
		layout,
		fieldAlignment,
		gap,
		multipleFilterRelation,
		taxonomyType,
		selectedTerms,
		uniqueId,
		taxonomyStyle,
		allTextLabel,
		taxonomyLimit,
		filterType,
		allTaxonomies,
		menuAlignment,
		selectTermsType,
		excludeTerms,
	} = attributes;

	let allTerms = [];
	const taxonomyTypeList = allTaxonomies?.map((term) => ({
		label: term.label,
		value: term.name,
	}));

	allTaxonomies?.forEach((taxonomy) => {
		if (taxonomyType === taxonomy.name) {
			allTerms = [...allTerms, ...taxonomy.terms_items];
		}
	});

	const layoutChange = (newValue) => {
		if (newValue === layout) {
			return;
		}

		const newData = {
			layout: newValue,
		};
		setAttributes(newData);
	};

	const taxonomyRef = useRef(taxonomyType);

	useEffect(() => {
		// Only run when taxonomyType actually changes value
		if (taxonomyRef.current !== taxonomyType) {
			taxonomyRef.current = taxonomyType;

			if (selectedTerms.length > 0) {
				setAttributes({ selectedTerms: [] });
			}
		}
	}, [taxonomyType]);

	return (
		<div className="sp-live-filter-general">
			<Layouts
				attributes={layout}
				setAttributes={setAttributes}
				attributesKey={"layout"}
				displayActive={true}
				grid={2}
				label={__("Frontend Filter Presets", "post-carousel")}
				items={[
					{
						icon: <LayoutOne value={layout} />,
						value: "layoutOne",
						type: "free"
					},
					{
						icon: <LayoutTwo value={layout} />,
						value: "layoutTwo",
						type: "pro",
						demoLink: "https://wpsmartpost.com/pricing/?ref=1"
					},
				]}
				onChange={layoutChange}
			/>

			{layout === "layoutTwo" ? (
				<>
					<SPToggleGroupControl
						attributes={filterType}
						attributesKey={"filterType"}
						label={__("Filter Type", "post-carousel")}
						border={true}
						setAttributes={setAttributes}
						items={[
							{
								label: "Dropdown",
								value: "dropdown",
							},
							{
								label: "Button",
								value: "button",
							},
						]}
						onClick={(newItem) => {
							setAttributes({
								filterType: newItem,
								taxonomyStyle: "more",
							});
						}}
					/>

					<SelectField
						label={__("Taxonomy Type", "post-carousel")}
						attributes={taxonomyType}
						attributesKey={"taxonomyType"}
						flexStyle={false}
						setAttributes={setAttributes}
						items={[{ label: "Select", value: "" }, ...taxonomyTypeList]}
					/>
					<SelectField
						label={__("Select Terms", "post-carousel")}
						attributes={selectTermsType}
						attributesKey={"selectTermsType"}
						flexStyle={true}
						setAttributes={setAttributes}
						items={[
							{
								label: __("All", "post-carousel"),
								value: "all",
							},
							{
								label: __("Specific", "post-carousel"),
								value: "specific",
							},
							{
								label: __("Exclude", "post-carousel"),
								value: "exclude",
							},
						]}
					/>
					{ selectTermsType === "specific" && (
						<MultiSelectDndKit
							label={__("Select Terms", "post-carousel")}
							attributes={selectedTerms}
							uniqueId={uniqueId}
							values={selectedTerms}
							searchable={true}
							onChange={(e) => setAttributes({ selectedTerms: e })}
							items={allTerms}
						/>
					)}
					{ selectTermsType === "exclude" && (
						<MultiSelectDndKit
							label={__("Select Exclude Terms", "post-carousel")}
							attributes={excludeTerms}
							uniqueId={uniqueId}
							values={excludeTerms}
							searchable={true}
							onChange={(e) => setAttributes({ excludeTerms: e })}
							items={allTerms}
						/>
					)}

					{filterType === "button" && (
						<>
							<SPRangeControl
								label={__("Taxonomy Display Limit", "post-carousel")}
								attributes={taxonomyLimit}
								attributesKey={"taxonomyLimit"}
								setAttributes={setAttributes}
								max={9}
								min={1}
								defaultValue={{ unit: "", value: 3 }}
							/>

							<SPToggleGroupControl
								attributes={taxonomyStyle}
								attributesKey={"taxonomyStyle"}
								label={__("More Taxonomy Style", "post-carousel")}
								border={true}
								setAttributes={setAttributes}
								items={[
									{
										label: "More Text",
										value: "more",
									},
									{
										label: "Kebab Menu",
										value: "kebabMenu",
									},
									{
										label: "Navigation",
										value: "navigation",
									},
								]}
							/>
						</>
					)}

					<InputControl
						label={__("“All” Text Label", "post-carousel")}
						attributes={allTextLabel}
						attributesKey={"allTextLabel"}
						setAttributes={setAttributes}
						flex={false}
						inputType="text"
					/>

					{filterType === "button" && (
						<>
							<SPRangeControl
								label={__("Gap", "post-carousel")}
								attributes={gap}
								attributesKey={"gap"}
								setAttributes={setAttributes}
								max={200}
								defaultValue={16}
							/>
						</>
					)}

					<SPToggleGroupControl
						attributes={menuAlignment}
						attributesKey={"menuAlignment"}
						label={__("Alignment", "post-carousel")}
						border={true}
						setAttributes={setAttributes}
						items={[
							{
								label: <AlignLeft />,
								value: "left",
							},
							{
								label: <AlignCenter />,
								value: "center",
							},
							{
								label: <AlignRight />,
								value: "right",
							},
						]}
					/>
				</>
			) : (
				<>
					<SPToggleGroupControl
						attributes={fieldAlignment}
						attributesKey={"fieldAlignment"}
						label={__("Filter Alignment", "post-carousel")}
						border={true}
						setAttributes={setAttributes}
						items={[
							{
								label: <AlignLeft />,
								value: "left",
							},
							{
								label: <AlignCenter />,
								value: "center",
							},
							{
								label: <AlignRight />,
								value: "right",
							},
							{
								label: <AlignFull />,
								value: "full",
							},
						]}
					/>

					<SPRangeControl
						label={__("Gap", "post-carousel")}
						attributes={gap}
						attributesKey={"gap"}
						setAttributes={setAttributes}
						max={100}
						units={["px", "%"]}
						defaultValue={{unit: "px", value: 16 }}
					/>
					<SPToggleGroupControl
						attributes={multipleFilterRelation}
						attributesKey={"multipleFilterRelation"}
						label={__("Multiple Filter Relation", "post-carousel")}
						setAttributes={setAttributes}
						items={[
							{
								label: "AND",
								value: "and",
							},
							{
								label: "OR",
								value: "or",
							},
						]}
					/>
				</>
			)}
			<ProInfo>
				<h3>Premium Only</h3>
				<h4>Unlock advanced Filter Options, Including:</h4>
				<ul>
					<li>
						— Modern filter layout
					</li>
					<li>
						— Button and Dropdown filter type
					</li>
					<li>
						— Choose specific categories or exclude
					</li>
					<li>
						— Taxonomy display limit
					</li>
					<li>
						— 3 unique taxonomy display style
					</li>
					<li>
						— Show Posts counter
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</div>
	);
};

export const HeadingTab = ({ attributes, setAttributes }) => {
	const { headingStyle, headingLabel, headingTag, headingPadding, taxonomyStyle } = attributes;

	const handleHeadingStyle = (newItem) => {
		if (headingStyle === newItem) {
			return null;
		}
		let newHeadingPadding = headingPadding;
		let newTaxonomyStyle = taxonomyStyle;

		switch (newItem) {
			case "styleOne":
				newHeadingPadding = {
					...headingPadding,
					device: {
						...headingPadding.device,
						Desktop: { top: 8, right: 20, bottom: 8, left: 20 },
						Tablet: { top: 8, right: 20, bottom: 8, left: 20 },
						Mobile: { top: 8, right: 20, bottom: 8, left: 20 },
					},
				};

				break;

			case "styleTwo":
				newHeadingPadding = {
					...headingPadding,
					device: {
						...headingPadding.device,
						Desktop: { top: 8, right: 2, bottom: 8, left: 2 },
						Tablet: { top: 8, right: 2, bottom: 8, left: 2 },
						Mobile: { top: 8, right: 2, bottom: 8, left: 2 },
					},
				};
				break;

			case "styleThree":
				newTaxonomyStyle = "more";
				newHeadingPadding = {
					...headingPadding,
					device: {
						...headingPadding.device,
						Desktop: { top: 8, right: 2, bottom: 8, left: 2 },
						Tablet: { top: 8, right: 2, bottom: 8, left: 2 },
						Mobile: { top: 8, right: 2, bottom: 8, left: 2 },
					},
				};
				break;

			case "styleFour":
				newTaxonomyStyle = "more";

				newHeadingPadding = {
					...headingPadding,
					device: {
						...headingPadding.device,
						Desktop: { top: 8, right: 10, bottom: 8, left: 10 },
						Tablet: { top: 8, right: 10, bottom: 8, left: 10 },
						Mobile: { top: 8, right: 10, bottom: 8, left: 10 },
					},
				};
				break;

			case "styleFive":
				newTaxonomyStyle = "more";

				newHeadingPadding = {
					...headingPadding,
					device: {
						...headingPadding.device,
						Desktop: { top: 8, right: 2, bottom: 8, left: 2 },
						Tablet: { top: 8, right: 2, bottom: 8, left: 2 },
						Mobile: { top: 8, right: 2, bottom: 8, left: 2 },
					},
				};
				break;

			default:
				break;
		}

		setAttributes({
			headingStyle: newItem,
			taxonomyStyle: newTaxonomyStyle,
			headingPadding: newHeadingPadding,
		});
	};

	return (
		<div className="sp-live-filter-heading">
			<SelectField
				label={__("Heading Style", "post-carousel")}
				attributes={headingStyle}
				attributesKey={"headingStyle"}
				flexStyle={false}
				setAttributes={setAttributes}
				items={[
					{ label: "Style One", value: "styleOne" },
					{ label: "Style Two", value: "styleTwo" },
					{ label: "Style Three", value: "styleThree" },
					{ label: "Style Four", value: "styleFour" },
					{ label: "Style Five", value: "styleFive" },
				]}
				onChange={handleHeadingStyle}
			/>

			<InputControl
				label={__("Label", "post-carousel")}
				attributes={headingLabel}
				attributesKey={"headingLabel"}
				setAttributes={setAttributes}
				flex={false}
				inputType="text"
			/>

			<SelectField
				label={__("Heading Style", "post-carousel")}
				attributes={headingTag}
				attributesKey={"headingTag"}
				flexStyle={false}
				setAttributes={setAttributes}
				items={[
					{ label: "H1", value: "h1" },
					{ label: "H2", value: "h2" },
					{ label: "H3", value: "h3" },
					{ label: "H4", value: "h4" },
					{ label: "H5", value: "h5" },
					{ label: "H6", value: "h6" },
				]}
			/>
		</div>
	);
};
