import { __ } from "@wordpress/i18n";
import {
	InputControl,
	Layouts,
	SelectField,
	SPRangeControl,
	TabControls,
	Toggle,
	SPToggleGroupControl,
	Background,
	BoxShadow,
	Spacing,
	Border,
	SelectDropdown,
	TypographyNew,
	SpColorPicker,
	MultipleSelect,
} from "../../components";
import useLayouts from "../../hooks/useLayouts";
import useMetaData from "../../hooks/useMetaData";
import { useSelect } from "@wordpress/data";
import { DividerStyleTab } from "../shared/styleTab";
import { useEffect, useMemo, useRef, useState } from "@wordpress/element";
import { store as coreStore } from "@wordpress/core-data";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";
import { usePostTaxonomies } from "./query";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import ProInfo from "../../components/proInfo/proInfo";

export const GeneralTab = ({ attributes, setAttributes }) => {
	const {
		layout,
		blockName,
		height,
		columns,
		columnGap,
		rowGap,
		icon,
		taxonomyIconStyle,
		counterCardBg,
		counterColor,
		postCardBorder,
		titleColor,
		titleCounterGap,
		postCardHoverBorder,
		excerptColor,
		postCardBg,
		contentAreaBg,
		titleMargin,
		postCardPadding,
	} = attributes;

	const layouts = useLayouts(blockName, layout);

	const layoutChange = (newValue) => {
		const deviceSettings = (desktop, tablet, mobile, unit) => ({
			device: { Desktop: desktop, Tablet: tablet, Mobile: mobile },
			unit: { Desktop: unit, Tablet: unit, Mobile: unit },
		});

		const colorSettings = (color) => ({ ...counterColor, color });
		const titleColorSettings = (color) => ({ ...titleColor, color });

		const counterBgSettings = (solidColor) => ({
			...counterCardBg,
			color: {
				...(counterCardBg.color || {}),
				style: "bgColor",
				transparent: "",
				solidColor,
			},
		});

		// Common default settings
		const commonDefaults = {
			countEnable: true,

			counterCardBg: counterBgSettings("#208da800"),
			columnGap: deviceSettings(10, 10, 10, "px"),
			rowGap: deviceSettings(10, 10, 10, "px"),
			postCardBorder: { ...postCardBorder, style: "none" },
			postCardHoverBorder: { ...postCardHoverBorder, style: "none" },
		};

		const layoutst = {
			"taxonomy-layout-one": {
				...commonDefaults,
				counterHeight: deviceSettings(24, 24, 24, "px"),
				counterWidth: deviceSettings(24, 24, 24, "px"),
				counterColor: colorSettings("#023047"),
				titleColor: titleColorSettings("#023047"),

				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 15,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 15,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				columns: {
					...columns,
					device: {
						Desktop: 1,
						Tablet: 1,
						Mobile: 1,
					},
				},
				displayOverlyThum: false,
				displayOverlyHoverThum: false,
				excerptColor: { ...excerptColor, color: "#023047" },
				height: deviceSettings(80, 80, 80, "px"),

				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						solidColor: "#ffffff",
					},
				},
			},
			"taxonomy-layout-two": {
				...commonDefaults,
				counterHeight: deviceSettings(24, 24, 24, "px"),
				counterWidth: deviceSettings(24, 24, 24, "px"),
				imageOverlayColor: "default",
				imageOverlayCustomColor: "#000000AB",
				counterColor: colorSettings("#ffffffff"),
				titleColor: titleColorSettings("#ffffffff"),
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				columns: {
					...columns,
					device: {
						Desktop: 2,
						Tablet: 2,
						Mobile: 1,
					},
				},
				displayOverlyThum: true,
				displayOverlyHoverThum: true,
				excerptColor: { ...excerptColor, color: "#ffffffff" },
				height: deviceSettings(80, 80, 80, "px"),

				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						solidColor: "#474747",
					},
				},
			},
			"taxonomy-layout-three": {
				...commonDefaults,
				imageOverlayColor: "default",
				imageOverlayCustomColor: "#000000AB",
				counterColor: colorSettings("#ffffffff"),
				titleColor: titleColorSettings("#ffffffff"),
				counterHeight: deviceSettings(100, 100, 100, "%"),
				counterWidth: deviceSettings(20, 20, 20, "%"),
				counterCardBg: counterBgSettings("#1E1E1E"),
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				columns: {
					...columns,
					device: {
						Desktop: 1,
						Tablet: 1,
						Mobile: 1,
					},
				},
				displayOverlyThum: true,
				displayOverlyHoverThum: true,
				postCardPadding: deviceSettings(0, 0, 0, "px"),
				excerptColor: { ...excerptColor, color: "#ffffffff" },
				height: deviceSettings(80, 80, 80, "px"),

				countEnable: true,
				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						solidColor: "#474747",
					},
				},
			},
			"taxonomy-layout-four": {
				...commonDefaults,
				imageOverlayColor: "default",
				counterHeight: deviceSettings(4, 4, 4, "px"),
				counterWidth: deviceSettings(10, 10, 10, "px"),
				imageOverlayCustomColor: "#000000AB",
				counterColor: colorSettings("#ffffffff"),
				titleColor: titleColorSettings("#023047"),
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				columns: {
					...columns,
					device: {
						Desktop: 1,
						Tablet: 1,
						Mobile: 1,
					},
				},
				displayOverlyThum: true,
				displayOverlyHoverThum: true,
				height: deviceSettings(80, 80, 80, "px"),

				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "#ffffff",
					},
				},
			},
			"taxonomy-layout-five": {
				...commonDefaults,
				counterColor: colorSettings("#023047"),
				titleColor: titleColorSettings("#023047"),
				excerptColor: { ...excerptColor, color: "#023047" },

				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				columns: {
					...columns,
					device: {
						Desktop: 3,
						Tablet: 2,
						Mobile: 1,
					},
				},
				displayOverlyThum: false,
				displayOverlyHoverThum: false,

				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						solidColor: "#ffffff",
					},
				},
			},
			"taxonomy-layout-six": {
				...commonDefaults,
				counterColor: colorSettings("#023047"),
				titleColor: titleColorSettings("#023047"),
				excerptColor: { ...excerptColor, color: "#023047" },
				columnGap: deviceSettings(0, 0, 0, "px"),
				rowGap: deviceSettings(0, 0, 0, "px"),
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 15,
							top: 15,
							right: 15,
							bottom: 15,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				columns: {
					...columns,
					device: {
						Desktop: 3,
						Tablet: 2,
						Mobile: 1,
					},
				},

				postCardBorder: { ...postCardBorder, style: "solid" },
				postCardHoverBorder: { ...postCardHoverBorder, style: "solid" },
				displayOverlyThum: false,
				displayOverlyHoverThum: false,

				postCardBg: {
					...postCardBg,
					color: {
						...postCardBg.color,
						solidColor: "#ffffff",
					},
				},
			},
			"taxonomy-layout-seven": {
				...commonDefaults,
				titleColor: titleColorSettings("#ffffffff"),
				counterColor: colorSettings("#ffffffff"),
				countEnable: false,
				columns: {
					...columns,
					device: {
						Desktop: 3,
						Tablet: 2,
						Mobile: 1,
					},
				},
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				displayOverlyThum: true,
				displayOverlyHoverThum: true,
				imageOverlayColor: "default",
				imageOverlayCustomColor: "#000000AB",
				height: deviceSettings(180, 180, 180, "px"),
			},
			"taxonomy-layout-eight": {
				...commonDefaults,
				imageOverlayColor: "default",
				imageOverlayCustomColor: "#000000AB",
				contentMultiColorBg: true,
				counterColor: colorSettings("#023047"),
				titleColor: titleColorSettings("#023047"),
				columnGap: deviceSettings(0, 0, 0, "px"),
				rowGap: deviceSettings(0, 0, 0, "px"),
				titleMargin: {
					...titleMargin,
					device: {
						...titleMargin.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							left: 0,
							top: 0,
							right: 0,
							bottom: 0,
						},
					},

					unit: {
						Desktop: "px",
					},
				},

				columns: {
					...columns,
					device: {
						Desktop: 1,
						Tablet: 1,
						Mobile: 1,
					},
				},

				displayOverlyThum: true,
				excerptShow: false,
				displayOverlyHoverThum: true,
				height: deviceSettings(80, 80, 80, "px"),

				contentAreaBg: {
					...contentAreaBg,
					color: {
						...contentAreaBg.color,
						solidColor: "#2693CD",
					},
				},
			},
		};

		if (layoutst[newValue]) {
			setAttributes({
				layout: newValue,
				...layoutst[newValue],
			});
		}
	};

	return (
		<>
			<Layouts
				attributes={layout}
				setAttributes={setAttributes}
				attributesKey={"layout"}
				displayActive={true}
				showDemoTitle={true}
				grid={3}
				onChange={layoutChange}
				label={__("Taxonomy Layout", "post-carousel")}
				items={layouts}
			/>

			{layout !== "taxonomy-layout-five" && layout !== "taxonomy-layout-six" && (
				<SPRangeControl
					label={__("Height", "post-carousel")}
					attributes={height}
					attributesKey="height"
					setAttributes={setAttributes}
					max={300}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: 80 }}
				/>
			)}

			<SPRangeControl
				label={__("Columns", "post-carousel")}
				attributes={columns}
				attributesKey={"columns"}
				setAttributes={setAttributes}
				max={5}
				units={false}
				defaultValue={{ value: 3 }}
				pro={true}
			/>

			{layout !== "taxonomy-layout-six" && (
				<>
					<SPRangeControl
						label={__("Columns Gap", "post-carousel")}
						attributes={columnGap}
						attributesKey={"columnGap"}
						setAttributes={setAttributes}
						max={100}
						units={["PX", "%", "EM"]}
						defaultValue={{ unit: "px", value: 10 }}
					/>
					<SPRangeControl
						label={__("Row Gap", "post-carousel")}
						attributes={rowGap}
						attributesKey={"rowGap"}
						setAttributes={setAttributes}
						max={100}
						units={["PX", "%", "EM"]}
						defaultValue={{ unit: "px", value: 10 }}
					/>
				</>
			)}

			{layout === "taxonomy-layout-three" && (
				<SPRangeControl
					label={__("Title-Counter Gap", "post-carousel")}
					attributes={titleCounterGap}
					attributesKey={"titleCounterGap"}
					setAttributes={setAttributes}
					max={80}
					units={["PX", "%", "EM"]}
					defaultValue={{ unit: "px", value: 10 }}
				/>
			)}

			{layout !== "taxonomy-layout-five" && layout !== "taxonomy-layout-six" && (
				<>
					<Toggle
						label={__("Icon", "post-carousel")}
						attributes={icon}
						attributesKey={"icon"}
						setAttributes={setAttributes}
						pro={true}
					/>

					{icon && (
						<SelectDropdown
							label={__("Icon Style", "post-carousel")}
							attributes={taxonomyIconStyle}
							attributesKey={"taxonomyIconStyle"}
							setAttributes={setAttributes}
							options={[
								{
									label: "Style One",
									value: "open",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-open"></i>
										</span>
									),
								},
								{
									label: "Style Two",
									value: "open-mini",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-open-mini"></i>
										</span>
									),
								},
								{
									label: "Style Three",
									value: "open-big",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-open-big"></i>
										</span>
									),
								},
								{
									label: "Style Four",
									value: "open-one",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-open-one"></i>
										</span>
									),
								},
								{
									label: "Style Five",
									value: "open-outline",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-open-outline"></i>
										</span>
									),
								},
								{
									label: "Style Six",
									value: "dir",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-dir"></i>
										</span>
									),
								},
								{
									label: "Style Seven",
									value: "one",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-one"></i>
										</span>
									),
								},
								{
									label: "Style Eight",
									value: "circled2",
									icon: (
										<span className="sp-smart-post-select-nav-icon">
											<i className="sp-icon-right-circled2"></i>
										</span>
									),
								},
							]}
						/>
					)}
				</>
			)}
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

// Query builder tab component.
export const QueryBuilderTab = ({ attributes, setAttributes }) => {
	const { taxonomyType, limit, SelectTerms, emptyCategory, noResultFoundText, allTaxonomyTerm, excludeTerms } =
		attributes;

	const postTaxonomies = usePostTaxonomies(attributes);

	const isInitialMount = useRef(true);
	const prevTaxonomyType = useRef(taxonomyType);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			prevTaxonomyType.current = taxonomyType;
			return;
		}

		// Only reset if taxonomyType actually changed
		if (prevTaxonomyType.current !== taxonomyType) {
			setAttributes({
				SelectTerms: [],
				excludeTerms: [],
			});
			prevTaxonomyType.current = taxonomyType;
		}
	}, [taxonomyType, setAttributes]);

	const taxonomyTerms = useSelect(
		(select) => {
			if (!taxonomyType) return null;
			return select(coreStore).getEntityRecords("taxonomy", taxonomyType, {
				per_page: -1,
			});
		},
		[taxonomyType]
	);

	const termOptions = Array.isArray(taxonomyTerms)
		? taxonomyTerms.map((term) => ({
				label: term.name,
				value: term.id,
				parent: term.parent,
			}))
		: [];

	return (
		<>
			<SelectField
				label={__("Select Taxonomy", "post-carousel")}
				attributes={taxonomyType}
				attributesKey={"taxonomyType"}
				setAttributes={setAttributes}
				flexStyle={false}
				items={Array.isArray(postTaxonomies) && postTaxonomies}
			/>

			<Toggle
				label={__("All Taxonomy Terms", "post-carousel")}
				attributes={allTaxonomyTerm}
				attributesKey={"allTaxonomyTerm"}
				setAttributes={setAttributes}
			/>

			{!allTaxonomyTerm && (
				<MultipleSelect
					label={__("Select Terms", "post-carousel")}
					value={SelectTerms}
					attributes={SelectTerms}
					attributesKey={"SelectTerms"}
					setAttributes={setAttributes}
					onChange={(e) => setAttributes({ SelectTerms: e })}
					items={termOptions}
				/>
			)}

			{allTaxonomyTerm && (
				<>
					<MultipleSelect
						label={__("Exclude Terms", "post-carousel")}
						value={excludeTerms}
						attributes={excludeTerms}
						attributesKey={"excludeTerms"}
						setAttributes={setAttributes}
						onChange={(e) => setAttributes({ excludeTerms: e })}
						items={termOptions}
					/>
					<SPRangeControl
						label={__("Limit", "post-carousel")}
						attributes={limit}
						attributesKey={"limit"}
						setAttributes={setAttributes}
						max={30}
						units={false}
						defaultValue={"6"}
					/>
				</>
			)}

			<Toggle
				label={__("Empty Category", "post-carousel")}
				attributes={emptyCategory}
				attributesKey={"emptyCategory"}
				setAttributes={setAttributes}
			/>

			<InputControl
				label={__("No Result Found Text", "post-carousel")}
				placeholder={__("No Result Found Text", "post-carousel")}
				attributes={noResultFoundText}
				attributesKey={"noResultFoundText"}
				setAttributes={setAttributes}
				flex={false}
				inputType="string"
			/>
		</>
	);
};

// Divider tab component.
export const Divider = ({ attributes, setAttributes }) => {
	return (
		<TabControls
			attributes={attributes}
			setAttributes={setAttributes}
			GeneralTab={DividerGeneralTab}
			StyleTab={DividerStyleTab}
		/>
	);
};

const DividerGeneralTab = ({ attributes, setAttributes }) => {
	const { showHideDivider, dividerBorderStyle, dividerAlignment, dividerWidth, dividerThickness } = attributes;

	const setBorderStyle = (newValue) => {
		setAttributes({ dividerBorderStyle: newValue });
	};

	return (
		<>
			<Toggle
				label={__("Enable Divider", "post-carousel")}
				attributes={showHideDivider}
				attributesKey={"showHideDivider"}
				setAttributes={setAttributes}
			/>

			{showHideDivider && (
				<>
					<SelectField
						label={__("Style", "post-carousel")}
						attributes={dividerBorderStyle}
						onChange={(newValue) => setBorderStyle(newValue)}
						items={[
							{ label: "None", value: "none" },
							{ label: "Solid", value: "solid" },
							{ label: "Dotted", value: "dotted" },
							{ label: "Dashed", value: "dashed" },
							{ label: "Double", value: "double" },
							{ label: "Groove", value: "groove" },
							{ label: "Inset", value: "inset" },
							{ label: "Outset", value: "outset" },
							{ label: "Ridge", value: "ridge" },
						]}
						flexStyle={true}
					/>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={dividerWidth}
						attributesKey={"dividerWidth"}
						setAttributes={setAttributes}
						max={100}
						units={["%"]}
						defaultValue={{ unit: "%", value: 100 }}
					/>

					<SPRangeControl
						label={__("Thickness", "post-carousel")}
						attributes={dividerThickness}
						attributesKey={"dividerThickness"}
						setAttributes={setAttributes}
						max={30}
						units={["PX", "%", "EM"]}
						defaultValue={{ unit: "px", value: 1 }}
					/>

					<SPToggleGroupControl
						label={__("Alignment", "post-carousel")}
						attributes={dividerAlignment}
						attributesKey={"dividerAlignment"}
						setAttributes={setAttributes}
						items={[
							{ label: <AlignLeft />, value: "left" },
							{ label: <AlignCenter />, value: "center" },
							{ label: <AlignRight />, value: "right" },
						]}
					/>
				</>
			)}
		</>
	);
};

// Image Tab.
const ImageGeneralTab = ({ attributes, setAttributes }) => {
	const { imageEnable, imageSize, imageOverlay, taxonomyImageHeight, taxonomyImageWidth, imageOverlayCustom } =
		attributes;

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
			<Toggle
				label={__("Featured Image", "post-carousel")}
				attributes={imageEnable}
				attributesKey={"imageEnable"}
				setAttributes={setAttributes}
			/>
			<SelectField
				label={__("Size", "post-carousel")}
				attributes={imageSize}
				attributesKey={"imageSize"}
				setAttributes={setAttributes}
				flexStyle={false}
				items={imageSizesOption}
			/>

			{imageSize === "custom" && (
				<>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={taxonomyImageWidth}
						attributesKey="taxonomyImageWidth"
						setAttributes={setAttributes}
						units={["Px", "%", "Em"]}
						defaultValue={{
							unit: "px",
							value: 100,
						}}
						max={500}
					/>

					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={taxonomyImageHeight}
						attributesKey="taxonomyImageHeight"
						setAttributes={setAttributes}
						units={["Px", "%", "Em"]}
						defaultValue={{
							unit: "px",
							value: 100,
						}}
						max={500}
					/>
				</>
			)}

			<>
				<SelectField
					label={__("Overlay Color", "post-carousel")}
					attributes={imageOverlay}
					attributesKey={"imageOverlay"}
					setAttributes={setAttributes}
					items={[
						{
							label: "No Overlay",
							value: "noOverlay",
						},
						{
							label: "Multi Color - Solid",
							value: "multi-solid",
						},
						{
							label: "Multi Color - Gradient",
							value: "multi-gradient",
						},
						{
							label: "Warm Sunset",
							value: "warm-sunset",
						},
						{
							label: "Ocean Breeze",
							value: "ocean-breeze",
						},
						{
							label: "Royal Gold",
							value: "royal-gold",
						},
						{
							label: "Cool Blues",
							value: "cool-blues",
						},
						{
							label: "Soft Pastel",
							value: "soft-pastel",
						},
						{
							label: "Elegant Purple",
							value: "elegant-purple",
						},
						{
							label: "Energetic Orange",
							value: "energetic-orange",
						},
						{
							label: "Custom",
							value: "custom",
						},
					]}
				/>
				{"custom" === imageOverlay && (
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={imageOverlayCustom}
						onChange={(newColor) =>
							setAttributes({
								imageOverlayCustom: newColor,
							})
						}
						defaultColor="#eecacaff"
					/>
				)}
			</>
		</>
	);
};
const ImageStyleTab = ({ attributes, setAttributes }) => {
	const {
		hoverEffect,
		grayscaleMode,
		grayscaleOnHover,
		originalOnHover,
		imageBorder,
		imageBorderWidth,
		imageBorderRadius,
		blurEffect,
		brightnessEffect,
		blurEffectHover,
		brightnessEffectHover,
		imageBorderWidthHover,
		imageBorderHover,
		imageBorderRadiusHover,
		hoverOpacityEffect,
	} = attributes;

	const [hoverType, setHoverType] = useState("normal");

	return (
		<>
			<SelectField
				label={__("Hover Effect", "post-carousel")}
				attributes={hoverEffect}
				attributesKey={"hoverEffect"}
				setAttributes={setAttributes}
				items={[
					{
						label: "Select Hover Effect",
						value: "",
						disabled: "disabled",
					},
					{ label: "Normal", value: "normal" },
					{ label: "Zoom In", value: "zoom-in" },
					{ label: "Zoom Out", value: "zoom-out" },
					{ label: "Slide Left", value: "slide-left" },
					{ label: "Slide Right", value: "slide-right" },
					{ label: "Rotate Left", value: "rotate-left" },
					{ label: "Rotate Right", value: "rotate-right" },
					{ label: "Opacity", value: "opacity" },
				]}
			/>
			{hoverEffect === "opacity" && (
				<SPRangeControl
					label={__("Opacity Value", "post-carousel")}
					attributes={hoverOpacityEffect}
					attributesKey={"hoverOpacityEffect"}
					setAttributes={setAttributes}
					min={0}
					max={1}
					step={0.1}
				/>
			)}
			<SPToggleGroupControl
				label={__("Image Mode", "post-carousel")}
				attributes={grayscaleMode}
				attributesKey={"grayscaleMode"}
				setAttributes={setAttributes}
				items={[
					{
						label: __("Original", "post-carousel"),
						value: "original",
					},
					{
						label: __("Grayscale", "post-carousel"),
						value: "grayscale",
					},
				]}
			/>
			{"original" === grayscaleMode && (
				<Toggle
					label={__("Grayscale on Hover", "post-carousel")}
					attributes={grayscaleOnHover}
					attributesKey={"grayscaleOnHover"}
					setAttributes={setAttributes}
				/>
			)}
			{"grayscale" === grayscaleMode && (
				<Toggle
					label={__("Original on Hover", "post-carousel")}
					attributes={originalOnHover}
					attributesKey={"originalOnHover"}
					setAttributes={setAttributes}
				/>
			)}
			<SPToggleGroupControl
				attributes={hoverType}
				onClick={(val) => setHoverType(val)}
				items={[
					{
						label: __("Normal", "post-carousel"),
						value: "normal",
					},
					{
						label: __("Hover", "post-carousel"),
						value: "hover",
					},
				]}
			/>
			{"normal" === hoverType && (
				<>
					<SPRangeControl
						label={__("Blur Effect", "post-carousel")}
						attributes={blurEffect}
						attributesKey={"blurEffect"}
						setAttributes={setAttributes}
						units={["Px"]}
						defaultValue={{
							unit: "px",
							value: 0,
						}}
						max={20}
					/>
					<SPRangeControl
						label={__("Brightness", "post-carousel")}
						attributes={brightnessEffect}
						attributesKey={"brightnessEffect"}
						setAttributes={setAttributes}
						units={[]}
						defaultValue={{
							unit: "",
							value: 1,
						}}
						max={10}
					/>
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: imageBorder,
							borderWidth: imageBorderWidth,
						}}
						btnType={hoverType}
						setAttributes={setAttributes}
						attributesKey={{
							border: "imageBorder",
							borderWidth: "imageBorderWidth",
						}}
					/>

					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={imageBorderRadius}
						attributesKey={"imageBorderRadius"}
						setAttributes={setAttributes}
						units={["Px", "%", "Em"]}
						labelItem={{
							top: __("Top", "post-carousel"),
							right: __("Right", "post-carousel"),
							bottom: __("Bottom", "post-carousel"),
							left: __("Left", "post-carousel"),
						}}
						defaultValue={{
							unit: "px",
							value: {
								top: 3,
								right: 3,
								bottom: 3,
								left: 3,
							},
						}}
						indicator={"radius"}
					/>
				</>
			)}
			{"hover" === hoverType && (
				<>
					<SPRangeControl
						label={__("Blur Effect", "post-carousel")}
						attributes={blurEffectHover}
						attributesKey={"blurEffectHover"}
						setAttributes={setAttributes}
						units={["Px"]}
						defaultValue={{
							unit: "px",
							value: 0,
						}}
						max={20}
					/>
					<SPRangeControl
						label={__("Brightness", "post-carousel")}
						attributes={brightnessEffectHover}
						attributesKey={"brightnessEffectHover"}
						setAttributes={setAttributes}
						units={[]}
						defaultValue={{
							unit: "",
							value: 1,
						}}
						max={10}
					/>
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: imageBorderHover,
							borderWidth: imageBorderWidthHover,
						}}
						btnType={hoverType}
						setAttributes={setAttributes}
						attributesKey={{
							border: "imageBorderHover",
							borderWidth: "imageBorderWidthHover",
						}}
					/>

					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={imageBorderRadiusHover}
						attributesKey={"imageBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["Px", "%", "Em"]}
						labelItem={{
							top: __("Top", "post-carousel"),
							right: __("Right", "post-carousel"),
							bottom: __("Bottom", "post-carousel"),
							left: __("Left", "post-carousel"),
						}}
						defaultValue={{
							unit: "px",
							value: {
								top: 3,
								right: 3,
								bottom: 3,
								left: 3,
							},
						}}
						indicator={"radius"}
					/>
				</>
			)}
		</>
	);
};
export const ImageTab = ({ attributes, setAttributes }) => {
	return (
		<TabControls
			attributes={attributes}
			setAttributes={setAttributes}
			GeneralTab={ImageGeneralTab}
			StyleTab={ImageStyleTab}
		/>
	);
};

// Content count.

export const CounterTab = ({ attributes, setAttributes }) => {
	const { countEnable, layout } = attributes;
	return (
		<>
			<TabControls
				attributes={attributes}
				setAttributes={setAttributes}
				GeneralTab={CounterGeneralTab}
				StyleTab={CounterStyleTab}
			/>
		</>
	);
};

const CounterGeneralTab = ({ attributes, setAttributes }) => {
	const { countEnable, counterWidth, counterHeight, layout, counterPosition, afterCount, beforeCount } = attributes;

	return (
		<>
			{layout !== "taxonomy-layout-three" && (
				<Toggle
					label={__("Show Counter", "post-carousel")}
					attributes={countEnable}
					attributesKey={"countEnable"}
					setAttributes={setAttributes}
				/>
			)}

			{countEnable && (
				<>
					{[
						"taxonomy-layout-five",
						"taxonomy-layout-six",
						"taxonomy-layout-seven",
						"taxonomy-layout-eight",
					].includes(layout) && (
						<>
							{!["taxonomy-layout-seven", "taxonomy-layout-eight"].includes(layout) && (
								<SelectField
									label={__("Counter Position", "post-carousel")}
									attributes={counterPosition}
									attributesKey={"counterPosition"}
									setAttributes={setAttributes}
									items={[
										{
											label: "Beside Title",
											value: "before",
										},

										{
											label: "Below Title",
											value: "below",
										},
										{
											label: "Space Between",
											value: "spaceBetween",
										},
									]}
								/>
							)}

							<InputControl
								label={__("Before Count", "post-carousel")}
								attributes={beforeCount}
								attributesKey={"beforeCount"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
							/>

							<InputControl
								label={__("After Count", "post-carousel")}
								attributes={afterCount}
								attributesKey={"afterCount"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
							/>
						</>
					)}

					{!["taxonomy-layout-five", "taxonomy-layout-six", "taxonomy-layout-eight"].includes(layout) && (
						<SPRangeControl
							label={__("Width", "post-carousel")}
							attributes={counterWidth}
							attributesKey={"counterWidth"}
							setAttributes={setAttributes}
							units={["Px", "%", "Em"]}
							defaultValue={{
								unit: "px",
								value: 24,
							}}
							max={150}
						/>
					)}

					{![
						"taxonomy-layout-three",
						"taxonomy-layout-five",
						"taxonomy-layout-six",
						"taxonomy-layout-eight",
					].includes(layout) && (
						<SPRangeControl
							label={__("Height", "post-carousel")}
							attributes={counterHeight}
							attributesKey={"counterHeight"}
							setAttributes={setAttributes}
							units={["Px", "%", "Em"]}
							defaultValue={{
								unit: "px",
								value: 24,
							}}
							max={150}
						/>
					)}
				</>
			)}
		</>
	);
};

const CounterStyleTab = ({ attributes, setAttributes }) => {
	const [colorState, setColorState] = useState("color");
	const {
		blockName,
		counterLineHeight,
		counterLatterSpacing,
		counterFontSize,
		counterTypography,
		counterColor,
		counterMultiColorBg,
		counterCardBg,
		counterBorderWidth,
		counterBorder,
		counterBorderRadius,
		counterBoxShadowEnable,
		counterBoxShadow,
		counterHoverBoxShadow,
		counterHoverBoxShadowEnable,
		counterHoverBorderRadius,
		counterHoverBorderWidth,
		counterHoverBorder,
		layout,
		counterGlobalTypography,
	} = attributes;
	return (
		<>
			<TypographyNew
				attributes={{
					family: counterTypography,
					familyKey: "counterTypography",
					fontSize: counterFontSize,
					fontSizeKey: "counterFontSize",
					fontSpacing: counterLatterSpacing,
					fontSpacingKey: "counterLatterSpacing",
					lineHeight: counterLineHeight,
					lineHeightKey: "counterLineHeight",
					globalTypo: counterGlobalTypography,
					globalTypoKey: "counterGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: "18",
				}}
				lineDefaultValue={1.2}
				typographyLabel={
					blockName === "thumbnail-slider-two"
						? __("Thumb Typography", "post-carousel")
						: __("Typography", "post-carousel")
				}
			/>

			<SPToggleGroupControl
				attributes={colorState}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(newColor) => setColorState(newColor)}
			/>
			{"color" === colorState ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={counterColor.color}
						onChange={(newColor) =>
							setAttributes({
								counterColor: {
									...counterColor,
									color: newColor,
								},
							})
						}
						defaultColor="#FFFFFF"
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={counterColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								counterColor: {
									...counterColor,
									hoverColor: newColor,
								},
							})
						}
					/>
				</>
			)}

			{!["taxonomy-layout-five", "taxonomy-layout-six", "taxonomy-layout-eight"].includes(layout) && (
				<>
					<Toggle
						label={__("Multi-Color Background", "post-carousel")}
						attributes={counterMultiColorBg}
						attributesKey={"counterMultiColorBg"}
						setAttributes={setAttributes}
						pro={true}
					/>

					{!counterMultiColorBg && (
						<Background
							label={__("Background Type", "post-carousel")}
							colorLabel="Solid Color"
							defaultColor="#fff"
							attributes={counterCardBg}
							attributesKey={"counterCardBg"}
							setAttributes={setAttributes}
							colorType={colorState}
							items={[
								{
									label: <BgIcon />,
									value: "bgColor",
									tooltip: "Solid",
								},
								{
									label: <GradientIcon />,
									value: "gradient",
									tooltip: "Gradient",
								},
							]}
						/>
					)}

					{colorState === "color" ? (
						<>
							<Border
								attributes={{
									border: counterBorder,
									borderWidth: counterBorderWidth,
								}}
								attributesKey={{
									border: "counterBorder",
									borderWidth: "counterBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={counterBorderRadius}
								attributesKey={"counterBorderRadius"}
								setAttributes={setAttributes}
								units={["Px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "8",
										right: "8",
										bottom: "8",
										left: "8",
									},
								}}
								indicator={"radius"}
							/>

							<Toggle
								label={__("Box Shadow", "post-carousel")}
								attributes={counterBoxShadowEnable}
								attributesKey={"counterBoxShadowEnable"}
								setAttributes={setAttributes}
							/>

							{counterBoxShadowEnable && (
								<BoxShadow
									label={__("Box Shadow", "post-carousel")}
									attributes={counterBoxShadow}
									attributesKey={"counterBoxShadow"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					) : (
						<>
							<Border
								attributes={{
									border: counterHoverBorder,
									borderWidth: counterHoverBorderWidth,
								}}
								attributesKey={{
									border: "counterHoverBorder",
									borderWidth: "counterHoverBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={counterHoverBorderRadius}
								attributesKey={"counterHoverBorderRadius"}
								setAttributes={setAttributes}
								units={["Px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "8",
										right: "8",
										bottom: "8",
										left: "8",
									},
								}}
								indicator={"radius"}
							/>

							<Toggle
								label={__("Box Shadow", "post-carousel")}
								attributes={counterHoverBoxShadowEnable}
								attributesKey={"counterHoverBoxShadowEnable"}
								setAttributes={setAttributes}
							/>

							{counterHoverBoxShadowEnable && (
								<BoxShadow
									label={__("Box Shadow", "post-carousel")}
									attributes={counterHoverBoxShadow}
									attributesKey={"counterHoverBoxShadow"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}
				</>
			)}
		</>
	);
};
