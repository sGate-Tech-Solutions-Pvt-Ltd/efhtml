import { __ } from "@wordpress/i18n";
import { InputControl, MultiSelectDndKit, SelectField, SPRangeControl, SPToggleGroupControl } from "../../components";
import Toggle from "../../components/toggle/toggle";

const GeneralTab = ({ attributes, setAttributes }) => {
	const {
		uniqueId,
		taxonomyType,
		selectTermsType,
		selectedTerms,
		excludeTerms,
		hideEmptyTerm,
		categoryLabel,
		overrideCategoryLabel,
		allTextLabel,
		showPostCount,
		filterType,
		allTaxonomies,
		filterWidth,
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

	return (
		<>
			<SPToggleGroupControl
				label={false}
				attributes={filterType}
				attributesKey={"filterType"}
				setAttributes={setAttributes}
				items={[
					{
						label: __("Dropdown", "post-carousel"),
						value: "dropdown",
					},
					{
						label: __("Button", "post-carousel"),
						value: "button",
					},
				]}
			/>
			<SPRangeControl
				label={ __("Width", "post-carousel") }
				attributes={ filterWidth }
				attributesKey={ "filterWidth" }
				setAttributes={ setAttributes }
				min={0}
				max={1200}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
			/>
			<SelectField
				label={__("Taxonomy Type", "post-carousel")}
				attributes={taxonomyType}
				attributesKey={"taxonomyType"}
				flexStyle={true}
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
			{"specific" === selectTermsType && (
				<>
					<MultiSelectDndKit
						label={__("Select Terms", "post-carousel")}
						attributes={selectedTerms}
						uniqueId={uniqueId}
						values={selectedTerms}
						searchable={true}
						onChange={(e) => setAttributes({ selectedTerms: e })}
						// onInputChange={ ( e ) => {} }
						items={allTerms}
					/>
				</>
			)}
			{"exclude" === selectTermsType && (
				<>
					<MultiSelectDndKit
						label={__("Select Terms", "post-carousel")}
						attributes={excludeTerms}
						uniqueId={uniqueId}
						values={excludeTerms}
						searchable={true}
						onChange={(e) => setAttributes({ excludeTerms: e })}
						// onInputChange={ ( e ) => {} }
						items={allTerms}
					/>
				</>
			)}
			<Toggle
				label={__("Hide Empty Term", "post-carousel")}
				attributes={hideEmptyTerm}
				attributesKey={"hideEmptyTerm"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Taxonomy Label", "post-carousel")}
				attributes={categoryLabel}
				attributesKey={"categoryLabel"}
				setAttributes={setAttributes}
			/>
			<InputControl
				label={__("Override Taxonomy Label", "post-carousel")}
				attributes={overrideCategoryLabel}
				attributesKey={"overrideCategoryLabel"}
				setAttributes={setAttributes}
				flex={false}
				inputType="text"
			/>
			<InputControl
				label={__("“All” Text Label", "post-carousel")}
				attributes={allTextLabel}
				attributesKey={"allTextLabel"}
				setAttributes={setAttributes}
				flex={false}
				inputType="text"
			/>
			<Toggle
				label={__("Post Counter", "post-carousel")}
				attributes={showPostCount}
				attributesKey={"showPostCount"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{/* <Toggle
				label={__('Search Field in Dropdown', 'post-carousel')}
				attributes={searchInDropdown}
				attributesKey={'searchInDropdown'}
				setAttributes={setAttributes}
			/> */}
			{/* <SPToggleGroupControl
				label={ __( 'Alignment', 'post-carousel' ) }
				attributes={ alignment }
				attributesKey={ 'alignment' }
				setAttributes={ setAttributes }
				items={ [
					{ label: <AlignLeft />, value: 'left' },
					{ label: <AlignCenter />, value: 'center' },
					{ label: <AlignRight />, value: 'right' },
				] }
			/> */}
		</>
	);
};

export default GeneralTab;
