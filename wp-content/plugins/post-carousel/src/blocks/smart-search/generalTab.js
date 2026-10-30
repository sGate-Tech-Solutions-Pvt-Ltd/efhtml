import { __ } from "@wordpress/i18n";
import {
	InputControl,
	Layouts,
	MultiSelectDndKit,
	SelectField,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
} from "../../components";

import { useMemo } from "@wordpress/element";
import RangeControl from "../../components/rangeControl/rangeControl";
import useMetaData from "../../hooks/useMetaData";
import { getObjectValuesToJsArray } from "../shared/helpFn";
import { capitalizeString, filterSelectOptions, findDataFromArray } from "../../controls/controls";
import {
	SearchFormPresetFive,
	SearchFormPresetFour,
	SearchFormPresetOne,
	SearchFormPresetThree,
	SearchFormPresetTwo,
	SearchResultLayoutOne,
	SearchResultLayoutThree,
	SearchResultLayoutTwo,
} from "./icons";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";

export const PresetTab = ({ attributes, setAttributes }) => {
	const {
		searchFormPreset,
		displayType,
		placeholderEnable,
		placeholder,
		searchFormBorderWidth,
		searchFormHoverBorder,
		searchFormBorder,
		searchFormPadding,
		searchButtonPosition,
		searchFormAlignment,
		searchFormHoverBorderWidth,
		searchFormWidth,
		searchFormHeight,
	} = attributes;

	const layoutDefault = useMemo(
		() => ({
			"smart-search-form-preset-one": {
				searchFormBorderWidth: {
					...searchFormBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormBorder: {
					...searchFormBorder,
					style: "solid",
					color: "#CCCCCC",
				},
				searchFormHoverBorderWidth: {
					...searchFormHoverBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormHoverBorder: {
					...searchFormHoverBorder,
					style: "solid",
					color: "#CCCCCC",
				},
				searchFormPadding: {
					...searchFormPadding,
					device: {
						Desktop: { top: 12, right: 12, bottom: 12, left: 12 },
						Mobile: { top: 12, right: 12, bottom: 12, left: 12 },
						Tablet: { top: 12, right: 12, bottom: 12, left: 12 },
					},
				},
				searchButtonIconColor: {
					color: "#2F2F2F",
					hoverColor: "",
				},
				searchButtonPosition: "right",
			},
			"smart-search-form-preset-two": {
				searchFormBorderWidth: {
					...searchFormBorderWidth,
					device: {
						Desktop: { top: 0, right: 0, bottom: 1, left: 0 },
						Mobile: { top: 0, right: 0, bottom: 1, left: 0 },
						Tablet: { top: 0, right: 0, bottom: 1, left: 0 },
					},
				},
				searchFormBorder: {
					...searchFormBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormHoverBorderWidth: {
					...searchFormHoverBorderWidth,
					device: {
						Desktop: { top: 0, right: 0, bottom: 1, left: 0 },
						Mobile: { top: 0, right: 0, bottom: 1, left: 0 },
						Tablet: { top: 0, right: 0, bottom: 1, left: 0 },
					},
				},
				searchFormHoverBorder: {
					...searchFormHoverBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormPadding: {
					...searchFormPadding,
					device: {
						Desktop: { top: 12, right: 12, bottom: 12, left: 12 },
						Mobile: { top: 12, right: 12, bottom: 12, left: 12 },
						Tablet: { top: 12, right: 12, bottom: 12, left: 12 },
					},
				},
				searchButtonIconColor: {
					color: "#2F2F2F",
					hoverColor: "",
				},
				searchButtonPosition: "left"
			},
			"smart-search-form-preset-three": {
				searchFormBorderWidth: {
					...searchFormBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormBorder: {
					...searchFormBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormHoverBorderWidth: {
					...searchFormHoverBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormHoverBorder: {
					...searchFormHoverBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormPadding: {
					...searchFormPadding,
					device: {
						Desktop: {
							...searchFormPadding.Desktop,
							right: 0,
							left: searchButtonPosition === "left" ? 0 : 12,
						},
						Mobile: {
							...searchFormPadding.Mobile,
							right: 0,
							left: searchButtonPosition === "left" ? 0 : 12,
						},
						Tablet: {
							...searchFormPadding.Tablet,
							right: 0,
							left: searchButtonPosition === "left" ? 0 : 12,
						},
					},
				},
				searchButtonIconColor: {
					color: "#ffffff",
					hoverColor: "",
				},
				searchButtonPosition: "right",
			},
			"smart-search-form-preset-four": {
				searchFormBorderWidth: {
					...searchFormBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormBorder: {
					...searchFormBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormHoverBorderWidth: {
					...searchFormHoverBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormHoverBorder: {
					...searchFormHoverBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormPadding: {
					...searchFormPadding,
					device: {
						Desktop: {
							...searchFormPadding.Desktop,
							right: 0,
							left: 12,
						},
						Mobile: {
							...searchFormPadding.Mobile,
							right: 0,
							left: 12,
						},
						Tablet: {
							...searchFormPadding.Tablet,
							right: 0,
							left: 12,
						},
					},
				},
				searchButtonIconColor: {
					color: "#ffffff",
					hoverColor: "",
				},
				searchButtonPosition: "right",
			},
			"smart-search-form-preset-five": {
				searchFormBorderWidth: {
					...searchFormBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormBorder: {
					...searchFormBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormHoverBorderWidth: {
					...searchFormHoverBorderWidth,
					device: {
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
						Mobile: { top: 1, right: 1, bottom: 1, left: 1 },
						Tablet: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				searchFormHoverBorder: {
					...searchFormHoverBorder,
					style: "solid",
					color: "#2F2F2F",
				},
				searchFormPadding: {
					...searchFormPadding,
					device: {
						Desktop: {
							top: 4,
							right: 4,
							bottom: 4,
							left: searchButtonPosition === "left" ? 4 : 12,
						},
						Mobile: {
							top: 4,
							right: 4,
							bottom: 4,
							left: searchButtonPosition === "left" ? 4 : 12,
						},
						Tablet: {
							top: 4,
							right: 4,
							bottom: 4,
							left: searchButtonPosition === "left" ? 4 : 12,
						},
					},
				},
				searchButtonIconColor: {
					color: "#ffffff",
					hoverColor: "",
				},
				searchButtonPosition: "right",
			},
		}),
		[]
	);

	const layoutChange = (newValue) => {
		if (newValue === searchFormPreset) {
			return;
		}
		const newData = {
			searchFormPreset: newValue,
			...layoutDefault[newValue],
		};
		setAttributes(newData);
	};
	return (
		<>
			<Layouts
				attributes={searchFormPreset}
				setAttributes={setAttributes}
				attributesKey={"searchFormPreset"}
				displayActive={true}
				grid={3}
				showDemoTitle={true}
				onChange={layoutChange}
				label={__("Search Preset", "post-carousel")}
				items={[
					{
						icon: <SearchFormPresetOne value={searchFormPreset} />,
						value: "smart-search-form-preset-one",
					},
					{
						icon: <SearchFormPresetTwo value={searchFormPreset} />,
						value: "smart-search-form-preset-two",
					},
					{
						icon: <SearchFormPresetThree value={searchFormPreset} />,
						value: "smart-search-form-preset-three",
					},
					{
						icon: <SearchFormPresetFour value={searchFormPreset} />,
						value: "smart-search-form-preset-four",
					},
					{
						icon: <SearchFormPresetFive value={searchFormPreset} />,
						value: "smart-search-form-preset-five",
					},
				]}
			/>
			<SPToggleGroupControl
				label={__("Display Type", "post-carousel")}
				attributes={displayType}
				attributesKey={"displayType"}
				setAttributes={setAttributes}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Popup", value: "popup" },
				]}
			/>
			<Toggle
				label={__("Placeholder", "post-carousel")}
				attributes={placeholderEnable}
				attributesKey={"placeholderEnable"}
				setAttributes={setAttributes}
			/>
			{placeholderEnable && (
				<InputControl
					label={__("Placeholder Text", "post-carousel")}
					attributes={placeholder}
					attributesKey={"placeholder"}
					setAttributes={setAttributes}
					flex={false}
					inputType="string"
					placeholder={__("Search…", "post-carousel")}
				/>
			)}
			<SPRangeControl
				label={__("Width", "post-carousel")}
				attributes={searchFormWidth}
				attributesKey={"searchFormWidth"}
				setAttributes={setAttributes}
				max={1000}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "%", value: 100 }}
			/>
			<SPRangeControl
				label={__("Height", "post-carousel")}
				attributes={searchFormHeight}
				attributesKey={"searchFormHeight"}
				setAttributes={setAttributes}
				max={200}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 20 }}
			/>
			<SPToggleGroupControl
				label={__("Alignment", "post-carousel")}
				attributes={searchFormAlignment}
				attributesKey={"searchFormAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "flex-start" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "flex-end" },
				]}
			/>
		</>
	);
};

export const SearchButtonGeneralTab = ({ attributes, setAttributes }) => {
	const {
		searchButtonPosition,
		searchIcon,
		searchButtonIconSize,
		searchButtonNewTabEnable,
		searchIconDivider,
		searchFormPreset,
		searchBtnLabelText,
		searchBtnLabel,
		searchBtnReverse,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Search Icon", "post-carousel")}
				attributes={searchIcon}
				setAttributes={setAttributes}
				attributesKey={"searchIcon"}
			/>
			{searchIcon && (
				<>
					<RangeControl
						label={__("Icon Size", "post-carousel")}
						setAttributes={setAttributes}
						attributes={searchButtonIconSize}
						attributesKey={"searchButtonIconSize"}
						max={100}
						defaultValue={{ value: 20, unit: "px" }}
					/>
					<SPToggleGroupControl
						label={__("Button Position", "post-carousel")}
						attributes={searchButtonPosition}
						attributesKey={"searchButtonPosition"}
						setAttributes={setAttributes}
						items={[
							{ label: "Left", value: "left" },
							{ label: "Right", value: "right" },
						]}
					/>
					{searchFormPreset === "smart-search-form-preset-one" && (
						<Toggle
							label={__("Divider", "post-carousel")}
							attributes={searchIconDivider}
							setAttributes={setAttributes}
							attributesKey={"searchIconDivider"}
						/>
					)}
				</>
			)}
			{[
				"smart-search-form-preset-three",
				"smart-search-form-preset-four",
				"smart-search-form-preset-five",
			].includes(searchFormPreset) && (
				<>
					<Toggle
						label={__("Button Label", "post-carousel")}
						attributes={searchBtnLabel}
						setAttributes={setAttributes}
						attributesKey={"searchBtnLabel"}
					/>
					{searchBtnLabel && (
						<>
							<InputControl
								label={__("Button Label", "post-carousel")}
								attributes={searchBtnLabelText}
								attributesKey={"searchBtnLabelText"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
								placeholder={__("Search…", "post-carousel")}
							/>
							{searchIcon && (
								<Toggle
									label={__("Button Reverse", "post-carousel")}
									attributes={searchBtnReverse}
									setAttributes={setAttributes}
									attributesKey={"searchBtnReverse"}
								/>
							)}
						</>
					)}
				</>
			)}

			<Toggle
				label={__("Link Open In New Tab", "post-carousel")}
				attributes={searchButtonNewTabEnable}
				setAttributes={setAttributes}
				attributesKey={"searchButtonNewTabEnable"}
			/>
		</>
	);
};

export const SearchResultGeneralTab = ({ attributes, setAttributes }) => {
	const {
		ajaxSearch,
		searchResultDisplayType,
		searchResultNotFoundText,
		searchResultColumns,
		searchResultColumnGap,
		searchResultBoxWidth,
		searchResultBoxHeight,
		searchResultShowImage,
		searchResultImageSize,
		searchResultImageContentGap,
		searchResultShowExcerpt,
		searchResultShowTaxonomy,
		searchResultShowAuthor,
		searchResultShowDate,
		hightLightSearchTerm,
		searchResultItemSeparator,
		searchResultHorizontalPosition,
		searchResultVerticalPosition,
		searchResultTitleFontSize,
		searchResultExcerptLimit,
		searchResultSpaceBetweenMeta,
		taxonomyFilterEnable,
	} = attributes;

	const layoutDefault = useMemo(
		() => ({
			"smart-search-result-layout-one": {
				searchResultColumns: {
					...searchResultColumns,
					device: {
						Desktop: 1,
						Tablet: 1,
						Mobile: 1,
					},
				},
				searchResultColumnGap: {
					...searchResultColumnGap,
					device: {
						Desktop: 0,
						Tablet: 0,
						Mobile: 0,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultImageContentGap: {
					...searchResultImageContentGap,
					device: {
						Desktop: 20,
						Tablet: 20,
						Mobile: 20,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultTitleFontSize: {
					...searchResultTitleFontSize,
					device: {
						Desktop: 18,
						Tablet: 18,
						Mobile: 18,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				popupCanvasWidth: {
					device: {
						Desktop: 500,
						Tablet: 500,
						Mobile: 500,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultVerticalPosition: {
					device: {
						Desktop: 100,
						Tablet: 100,
						Mobile: 100,
					},
					unit: {
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
				searchResultImageSize: {
					device: {
						Desktop: 55,
						Tablet: 55,
						Mobile: 55,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
			},
			"smart-search-result-layout-two": {
				searchResultColumns: {
					...searchResultColumns,
					device: {
						Desktop: 1,
						Tablet: 1,
						Mobile: 1,
					},
				},
				searchResultColumnGap: {
					...searchResultColumnGap,
					device: {
						Desktop: 0,
						Tablet: 0,
						Mobile: 0,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultTitleFontSize: {
					...searchResultTitleFontSize,
					device: {
						Desktop: 18,
						Tablet: 18,
						Mobile: 18,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				popupCanvasWidth: {
					device: {
						Desktop: 500,
						Tablet: 500,
						Mobile: 500,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultImageContentGap: {
					device: {
						Desktop: 20,
						Tablet: 20,
						Mobile: 20,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
					searchResultVerticalPosition: {
						device: {
							Desktop: 100,
							Tablet: 100,
							Mobile: 100,
						},
						unit: {
							Desktop: "%",
							Tablet: "%",
							Mobile: "%",
						},
					},
				},
			},
			"smart-search-result-layout-three": {
				searchResultColumns: {
					...searchResultColumns,
					device: {
						Desktop: 6,
						Tablet: 4,
						Mobile: 1,
					},
				},
				searchResultColumnGap: {
					...searchResultColumnGap,
					device: {
						Desktop: 10,
						Tablet: 10,
						Mobile: 10,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultImageContentGap: {
					...searchResultImageContentGap,
					device: {
						Desktop: 12,
						Tablet: 12,
						Mobile: 12,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultTitleFontSize: {
					...searchResultTitleFontSize,
					device: {
						Desktop: 16,
						Tablet: 16,
						Mobile: 16,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				popupCanvasWidth: {
					device: {
						Desktop: 65,
						Tablet: 65,
						Mobile: 65,
					},
					unit: {
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
				searchResultVerticalPosition: {
					device: {
						Desktop: 80,
						Tablet: 80,
						Mobile: 80,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
				searchResultImageSize: {
					device: {
						Desktop: 150,
						Tablet: 150,
						Mobile: 150,
					},
					unit: {
						Desktop: "px",
						Tablet: "px",
						Mobile: "px",
					},
				},
			},
		}),
		[]
	);

	const layoutChange = (newValue) => {
		if (newValue === searchResultDisplayType) {
			return;
		}
		const newData = {
			searchResultDisplayType: newValue,
			...layoutDefault[newValue],
		};
		setAttributes(newData);
	};

	return (
		<>
			{!taxonomyFilterEnable && (
				<Toggle
					label={__("Ajax Search", "post-carousel")}
					attributes={ajaxSearch}
					setAttributes={setAttributes}
					attributesKey={"ajaxSearch"}
				/>
			)}
			<Layouts
				attributes={searchResultDisplayType}
				setAttributes={setAttributes}
				attributesKey={"searchResultDisplayType"}
				displayActive={true}
				grid={3}
				onChange={layoutChange}
				label={__("Search Result Display Type", "post-carousel")}
				items={[
					{
						icon: <SearchResultLayoutOne value={searchResultDisplayType} />,
						value: "smart-search-result-layout-one",
					},
					{
						icon: <SearchResultLayoutTwo value={searchResultDisplayType} />,
						value: "smart-search-result-layout-two",
					},
					{
						icon: <SearchResultLayoutThree value={searchResultDisplayType} />,
						value: "smart-search-result-layout-three",
					},
				]}
			/>
			<InputControl
				label={__("No Result Found Text", "post-carousel")}
				attributes={searchResultNotFoundText}
				attributesKey={"searchResultNotFoundText"}
				setAttributes={setAttributes}
				flex={false}
				inputType="string"
				placeholder={__("No Result Found", "post-carousel")}
			/>
			<SPRangeControl
				label={__("Columns", "post-carousel")}
				attributes={searchResultColumns}
				attributesKey={"searchResultColumns"}
				setAttributes={setAttributes}
				max={12}
			/>
			<SPRangeControl
				label={__("Gap", "post-carousel")}
				attributes={searchResultColumnGap}
				attributesKey={"searchResultColumnGap"}
				setAttributes={setAttributes}
				max={200}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 20 }}
			/>
			<SPRangeControl
				label={__("Result Box Width", "post-carousel")}
				attributes={searchResultBoxWidth}
				attributesKey={"searchResultBoxWidth"}
				setAttributes={setAttributes}
				max={1000}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "%", value: 100 }}
			/>
			<SPRangeControl
				label={__("Result Box Height", "post-carousel")}
				attributes={searchResultBoxHeight}
				attributesKey={"searchResultBoxHeight"}
				setAttributes={setAttributes}
				max={1000}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 552 }}
			/>
			{searchResultDisplayType !== "smart-search-result-layout-two" && (
				<>
					<Toggle
						label={__("Image", "post-carousel")}
						attributes={searchResultShowImage}
						setAttributes={setAttributes}
						attributesKey={"searchResultShowImage"}
					/>
					{!!searchResultShowImage && (
						<>
							<SPRangeControl
								label={__("Image Size", "post-carousel")}
								attributes={searchResultImageSize}
								attributesKey={"searchResultImageSize"}
								setAttributes={setAttributes}
								max={200}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 20 }}
							/>
							<SPRangeControl
								label={__("Image - Content Gap", "post-carousel")}
								attributes={searchResultImageContentGap}
								attributesKey={"searchResultImageContentGap"}
								setAttributes={setAttributes}
								max={200}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 20 }}
							/>
						</>
					)}
				</>
			)}
			<Toggle
				label={__("Excerpt", "post-carousel")}
				attributes={searchResultShowExcerpt}
				setAttributes={setAttributes}
				attributesKey={"searchResultShowExcerpt"}
			/>
			{searchResultShowExcerpt && (
				<SPRangeControl
					label={__("Excerpt Limit", "post-carousel")}
					className="sp-smart-post-ranger-length"
					attributes={searchResultExcerptLimit}
					attributesKey={"searchResultExcerptLimit"}
					setAttributes={setAttributes}
					min={1}
					units={["words", "chars"]}
					defaultValue={{ unit: "words", value: 20 }}
				/>
			)}
			<Toggle
				label={__("Taxonomy", "post-carousel")}
				attributes={searchResultShowTaxonomy}
				setAttributes={setAttributes}
				attributesKey={"searchResultShowTaxonomy"}
			/>
			<Toggle
				label={__("Author", "post-carousel")}
				attributes={searchResultShowAuthor}
				setAttributes={setAttributes}
				attributesKey={"searchResultShowAuthor"}
			/>
			<Toggle
				label={__("Publish Date", "post-carousel")}
				attributes={searchResultShowDate}
				setAttributes={setAttributes}
				attributesKey={"searchResultShowDate"}
			/>
			<SPRangeControl
				label={__("Space Between Meta", "post-carousel")}
				attributes={searchResultSpaceBetweenMeta}
				attributesKey={"searchResultSpaceBetweenMeta"}
				setAttributes={setAttributes}
				max={100}
				defaultValue={{ value: 4 }}
			/>
			<Toggle
				label={__("Highlight Search Term", "post-carousel")}
				attributes={hightLightSearchTerm}
				setAttributes={setAttributes}
				attributesKey={"hightLightSearchTerm"}
			/>
			<Toggle
				label={__("Item Separator", "post-carousel")}
				attributes={searchResultItemSeparator}
				setAttributes={setAttributes}
				attributesKey={"searchResultItemSeparator"}
			/>
			{/* TODO: Need to clarification about this feature*/}
			<SPRangeControl
				label={__("Horizontal Position", "post-carousel")}
				attributes={searchResultHorizontalPosition}
				attributesKey={"searchResultHorizontalPosition"}
				setAttributes={setAttributes}
				max={1000}
				min={-1000}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
			/>
			<SPRangeControl
				label={__("Vertical Position", "post-carousel")}
				attributes={searchResultVerticalPosition}
				attributesKey={"searchResultVerticalPosition"}
				setAttributes={setAttributes}
				max={1000}
				min={-1000}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
			/>
		</>
	);
};
export const MoreResultGeneralTab = ({ attributes, setAttributes }) => {
	const {
		moreResultsEnable,
		moreResultLabelText,
		showResultsCount,
		initialPostDisplay,
		moreResultClickAction,
		taxonomyFilterEnable,
	} = attributes;

	const actionOptions = [
		{
			value: "expanded",
			label: __("Expanded", "post-carousel"),
		},
		{
			value: "same_tab",
			label: __("Same Tab", "post-carousel"),
		},
		{
			value: "new_tab",
			label: __("New Tab", "post-carousel"),
		},
	];

	return (
		<>
			<Toggle
				label={__("More Result", "post-carousel")}
				attributes={moreResultsEnable}
				setAttributes={setAttributes}
				attributesKey={"moreResultsEnable"}
			/>
			{moreResultsEnable && (
				<>
					<Toggle
						label={__("Results Count", "post-carousel")}
						attributes={showResultsCount}
						setAttributes={setAttributes}
						attributesKey={"showResultsCount"}
					/>
					<SPRangeControl
						label={__("Initial Post Display", "post-carousel")}
						attributes={initialPostDisplay}
						attributesKey={"initialPostDisplay"}
						setAttributes={setAttributes}
						max={12}
					/>
					<InputControl
						label={__("More Results Label", "post-carousel")}
						attributes={moreResultLabelText}
						attributesKey={"moreResultLabelText"}
						setAttributes={setAttributes}
						flex={false}
						inputType="string"
						placeholder={__("Enter More Results Label", "post-carousel")}
					/>
					{!taxonomyFilterEnable && (
						<SelectField
							label={__("More Result Click Action", "post-carousel")}
							attributes={moreResultClickAction}
							attributesKey={"moreResultClickAction"}
							setAttributes={setAttributes}
							items={actionOptions}
						/>
					)}
				</>
			)}
		</>
	);
};
export const QueryFilterGeneralTab = ({ attributes, setAttributes }) => {
	const { uniqueId, postType, taxonomyFilterEnable, selectedTaxonomy, selectedTerms, filterLabelText } = attributes;
	const { allPostTypes, allTaxonomies } = useMetaData(attributes, "editSite");
	const postTypeValues = getObjectValuesToJsArray(allPostTypes);
	const postTypeOptions = postTypeValues?.map((singlePostType) => ({
		label: `${capitalizeString(singlePostType)}s`,
		value: singlePostType,
	}));

	const updatePostTypeOptions = postTypeOptions?.map((item, index) => ({
		id: index + 1,
		label: item.value === "attachment" ? "Media" : item.label,
		value: item.value,
	}));

	const defaultPostType = [
		{ label: "Posts", value: "post" },
		{ label: "Pages", value: "page" },
	];
	const postTypeChangeHandler = (newValue) => {
		if (postType === newValue) {
			return;
		}
		setAttributes({ postType: newValue, selectedTerms: [] });
	};

	const taxonomiesSelectOptions = filterSelectOptions(allTaxonomies, "label", "name");

	const selectedTaxonomyData = findDataFromArray(allTaxonomies, "name", selectedTaxonomy);
	const terms = selectedTaxonomyData?.terms_items.map((item) => ({
		...item,
		id: item.value,
	}));

	const taxonomyTypeTitle = selectedTaxonomy ? selectedTaxonomyData?.label : __("Taxonomy", "post-carousel");

	return (
		<>
			<SelectField
				label={__("Search for Post Types", "post-carousel")}
				attributes={postType}
				attributesKey={"postType"}
				setAttributes={setAttributes}
				items={updatePostTypeOptions?.length > 0 ? [...updatePostTypeOptions] : defaultPostType}
				onChange={postTypeChangeHandler}
			/>
			{postType && taxonomiesSelectOptions?.length > 0 && (
				<>
					<Toggle
						label={__("Taxonomy Filter", "post-carousel")}
						attributes={taxonomyFilterEnable}
						setAttributes={setAttributes}
						attributesKey={"taxonomyFilterEnable"}
					/>
					{taxonomyFilterEnable && (
						<>
							<SelectField
								label={__("Taxonomy Type", "post-carousel")}
								attributes={selectedTaxonomy}
								attributesKey={"selectedTaxonomy"}
								setAttributes={setAttributes}
								items={
									taxonomiesSelectOptions?.length > 0
										? taxonomiesSelectOptions
										: [{ label: "Default", value: "" }]
								}
							/>
							{selectedTaxonomy !== "" && taxonomyTypeTitle && (
								<MultiSelectDndKit
									label={`${taxonomyTypeTitle} (s)`}
									uniqueId={uniqueId}
									items={terms}
									values={selectedTerms}
									searchable={true}
									onChange={(e) => setAttributes({ selectedTerms: e })}
								/>
							)}
							<InputControl
								label={__("Filter Label", "post-carousel")}
								attributes={filterLabelText}
								attributesKey={"filterLabelText"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
								placeholder={__("All Categories", "post-carousel")}
							/>
						</>
					)}
				</>
			)}
		</>
	);
};

export const PopupCanvasGeneralTab = ({ attributes, setAttributes }) => {
	const {
		popupHeadingGap,
		enablePopupCloseButton,
		popupHeadingText,
		enablePopupHeading,
		popupCanvasWidth,
		popupCloseBtnIconSize,
		popupHeadingAlignment,
	} = attributes;

	return (
		<>
			<RangeControl
				label={__("Canvas Width", "post-carousel")}
				setAttributes={setAttributes}
				attributes={popupCanvasWidth}
				attributesKey={"popupCanvasWidth"}
				max={1600}
				defaultValue={{ value: 500, unit: "px" }}
				units={["px", "%", "em"]}
			/>
			<Toggle
				label={__("Search Popup Heading", "post-carousel")}
				attributes={enablePopupHeading}
				setAttributes={setAttributes}
				attributesKey={"enablePopupHeading"}
			/>
			{enablePopupHeading && (
				<>
					<InputControl
						label={__("Heading Label", "post-carousel")}
						attributes={popupHeadingText}
						attributesKey={"popupHeadingText"}
						setAttributes={setAttributes}
						flex={false}
						inputType="string"
						placeholder={__("Enter Popup Heading", "post-carousel")}
					/>
					<RangeControl
						label={__("Gap", "post-carousel")}
						setAttributes={setAttributes}
						attributes={popupHeadingGap}
						attributesKey={"popupHeadingGap"}
						max={100}
						defaultValue={{ value: 15, unit: "px" }}
						units={["px", "%", "em"]}
					/>
				</>
			)}

			<Toggle
				label={__("Close Icon", "post-carousel")}
				attributes={enablePopupCloseButton}
				setAttributes={setAttributes}
				attributesKey={"enablePopupCloseButton"}
			/>
			{enablePopupCloseButton && (
				<RangeControl
					label={__("Icon Size", "post-carousel")}
					setAttributes={setAttributes}
					attributes={popupCloseBtnIconSize}
					attributesKey={"popupCloseBtnIconSize"}
					max={100}
					defaultValue={{ value: 10, unit: "px" }}
					units={["px", "%", "em"]}
				/>
			)}
			<SPToggleGroupControl
				label={__("Heading Alignment", "post-carousel")}
				attributes={popupHeadingAlignment}
				attributesKey={"popupHeadingAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
		</>
	);
};
