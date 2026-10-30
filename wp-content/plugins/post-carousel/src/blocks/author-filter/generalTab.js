import { __ } from "@wordpress/i18n";
import { InputControl, MultiSelectDndKit, SelectField, SPRangeControl, SPToggleGroupControl } from "../../components";
import Toggle from "../../components/toggle/toggle";

const GeneralTab = ({ attributes, setAttributes }) => {
	const {
		uniqueId,
		authorType,
		allTextLabel,
		filterType,
		showAuthorLabel,
		specificAuthor,
		excludeAuthor,
		authorLabel,
		showPostCount,
		authorList,
		filterWidth,
	} = attributes;

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
				label={__("Available Author", "post-carousel")}
				attributes={authorType}
				attributesKey={"authorType"}
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

			{"specific" === authorType && (
				<>
					<MultiSelectDndKit
						label={__("Select Author", "post-carousel")}
						attributes={specificAuthor}
						uniqueId={uniqueId}
						values={specificAuthor}
						searchable={true}
						onChange={(e) => setAttributes({ specificAuthor: e })}
						// onInputChange={ ( e ) => {} }
						items={authorList}
					/>
				</>
			)}
			{"exclude" === authorType && (
				<>
					<MultiSelectDndKit
						label={__("Select Author", "post-carousel")}
						attributes={excludeAuthor}
						uniqueId={uniqueId}
						values={excludeAuthor}
						searchable={true}
						onChange={(e) => setAttributes({ excludeAuthor: e })}
						// onInputChange={ ( e ) => {} }
						items={authorList}
					/>
				</>
			)}

			<Toggle
				label={__("Author Label", "post-carousel")}
				attributes={showAuthorLabel}
				attributesKey={"showAuthorLabel"}
				setAttributes={setAttributes}
			/>
			<InputControl
				label={__("Override Author Label", "post-carousel")}
				attributes={authorLabel}
				attributesKey={"authorLabel"}
				setAttributes={setAttributes}
				flex={false}
				inputType="text"
			/>
			<InputControl
				label={__('"All" Text Label', "post-carousel")}
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
		</>
	);
};

export default GeneralTab;
