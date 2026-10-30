import { __ } from "@wordpress/i18n";
import {
	NewsTickerOne,
	NewsTickerSix,
	NewsTickerFour,
	NewsTickerFive,
	NewsTickerThree,
	NewsTickerTwo,
	NewsTickerSeven,
	AlignLeft,
	AlignCenter,
	AlignRight,
	ListStyle1,
	ListStyle2,
	ListStyle3,
	ListStyle4,
	ListStyle5,
	ListStyle6,
	ListStyle7,
	NewsIcon,
	NewsIcon2,
	NewsIcon3,
	NewsIcon4,
	NewsIcon5,
} from "../../icons/icons";
import { openLinksOptions } from "../../controls/constants";
import Border from "../../components/border/border";
import {
	Background,
	InputControl,
	SelectField,
	SpColorPicker,
	SPRangeControl,
	SPToggleGroupControl,
	TypographyNew,
	Toggle,
	Layouts,
	Spacing,
	BoxShadow,
	SelectDropdown,
} from "../../components";
import { useState } from "@wordpress/element";
import { BgIcon, GradientIcon } from "../../components/background/svgIcon";
import {
	ArrowMinimal,
	ArrowOutline,
	ArrowSolid,
	ChevronBold,
	ChevronBorderLine,
	ChevronOutline,
	ChevronSolid,
	DoubleChevron,
	DoubleChevronOutline,
	TriangleOutline,
} from "../../icons/arrowIcons";
import { priceLink } from "../shared/helpFn";
//carousel general tab panel
export const NewsTickerGeneralPanel = ({ attributes, setAttributes }) => {
	const {
		displayStyle,
		carouselAutoPlay,
		carouselAutoPlayDelay,
		carouselDirection,
		carouselPauseOnHover,
		carouselAnimationEffect,
		tickerHeight,
		carouselTickerSpeed,
		headingStyle,
		tickerOpenNewTab,
		tickerDisplaySticky,
		tickerStickyTopPosition,
		tickerHeadingBg,
		headingColor,
		newsTickerItemToDisplay,
		postLimit,
	} = attributes;

	const carouselAnimationItems = [
		{ label: "Slide", value: "slide" },
		{ label: "Fade", value: "fade" },
	];
	const sliderDirection =
		"ticker" === displayStyle
			? [
				{ label: "Right to Left", value: "right_to_left" },
				{ label: "Left to Right", value: "left_to_right" },
			]
			: [
				{ label: "Right to Left", value: "right_to_left" },
				{ label: "Left to Right", value: "left_to_right" },
				{ label: "Top to Bottom", value: "top_to_bottom" },
				{ label: "Bottom to Top", value: "bottom_to_top" },
			];

	const layoutChange = (newValue) => {
		if (newValue === headingStyle) return; // no change, skip

		if (newValue === "seven") {
			setAttributes({
				headingStyle: newValue,
				tickerHeadingBg: {
					...tickerHeadingBg,
					color: {
						...tickerHeadingBg.color,
						solidColor: "#ffffff", // white bg
					},
				},
				headingColor: {
					...headingColor,
					color: "#023047", // blue text
				},
				tickerIconColor: "#023047",
			});
		} else {
			setAttributes({
				headingStyle: newValue,
				tickerHeadingBg: {
					...tickerHeadingBg,
					color: {
						...tickerHeadingBg.color,
						solidColor: "#023047", // dark blue bg
					},
				},
				headingColor: {
					...headingColor,
					color: "#ffffff", // white text
				},
				tickerIconColor: "#ffffff",
			});
		}
	};

	return (
		<>
			<SPToggleGroupControl
				label={__("Display Style", "post-carousel")}
				attributes={displayStyle}
				attributesKey={"displayStyle"}
				setAttributes={setAttributes}
				items={[
					{ label: "Ticker", value: "ticker" },
					{ label: "Slider (Pro)", value: "slide", disabled: "disabled" },
					{ label: "Typewriter", value: "typewriter", disabled: "disabled" },
				]}
			/>
			{"slide" === displayStyle && (
				<SelectField
					label={__("Slider Type", "post-carousel")}
					flexStyle={true}
					attributes={carouselAnimationEffect}
					attributesKey={"carouselAnimationEffect"}
					setAttributes={setAttributes}
					items={carouselAnimationItems}
				/>
			)}

			{(displayStyle === "ticker" || (displayStyle === "slide" && carouselAnimationEffect !== "fade")) && (
				<SelectField
					label={__("Slider Direction", "post-carousel")}
					flexStyle={true}
					attributes={carouselDirection}
					attributesKey="carouselDirection"
					setAttributes={setAttributes}
					items={sliderDirection}
				/>
			)}

			<Layouts
				attributes={headingStyle}
				tickerAttr={{ tickerHeadingBg, headingColor }}
				setAttributes={setAttributes}
				attributesKey={"headingStyle"}
				displayActive={true}
				showDemoTitle={true}
				proBtnClass="sp-smart-small-size"
				ticker={true}
				grid={3}
				onChange={layoutChange}
				label={__("Heading Style", "post-carousel")}
				items={[
					{
						icon: <NewsTickerOne />,
						value: "one",
					},
					{
						icon: <NewsTickerTwo />,
						value: "two",
						type: "pro",
						demoLink: priceLink
					},
					{
						icon: <NewsTickerThree />,
						value: "three",
						type: "pro",
						demoLink: priceLink
					},
					{
						icon: <NewsTickerFour />,
						value: "four",
						type: "pro",
						demoLink: priceLink
					},
					{
						icon: <NewsTickerFive />,
						value: "five",
						type: "pro",
						demoLink: priceLink
					},
					{
						icon: <NewsTickerSix />,
						value: "six",
						type: "pro",
						demoLink: priceLink
					},
					{
						icon: <NewsTickerSeven />,
						value: "seven",
						type: "pro",
						demoLink: priceLink
					},
				]}
			/>

			<InputControl
				label={__("Number of Slides", "post-carousel")}
				className="sp-smart-limit-field"
				ajax={true}
				attributes={postLimit}
				min={1}
				attributesKey={"postLimit"}
				setAttributes={setAttributes}
			/>

			<>
				<SPRangeControl
					label={__("Height", "post-carousel")}
					setAttributes={setAttributes}
					attributes={tickerHeight}
					units={["px", "%", "em"]}
					max={200}
					attributesKey={"tickerHeight"}
					defaultValue={{ unit: "px", value: 48 }}
				/>
			</>

			{"slide" === displayStyle && (
				<>
					<SPRangeControl
						label={__("Item to Display", "post-carousel")}
						attributes={newsTickerItemToDisplay}
						attributesKey={"newsTickerItemToDisplay"}
						setAttributes={setAttributes}
						max={6}
						defaultValue={{ value: 3 }}
					/>
					<Toggle
						label={__("AutoPlay", "post-carousel")}
						attributes={carouselAutoPlay}
						setAttributes={setAttributes}
						attributesKey={"carouselAutoPlay"}
					/>
				</>
			)}
			{carouselAutoPlay && "slide" === displayStyle && (
				<SPRangeControl
					label={__("AutoPlay Delay", "post-carousel")}
					attributes={carouselAutoPlayDelay}
					attributesKey={"carouselAutoPlayDelay"}
					setAttributes={setAttributes}
					units={["ms"]}
					max={5000}
					ajax={true}
					defaultValue={{ unit: "ms", value: 2000 }}
					step={50}
				/>
			)}

			{["ticker", "slide"].includes(displayStyle) && (
				<SPRangeControl
					label={__("Speed", "post-carousel")}
					setAttributes={setAttributes}
					attributes={carouselTickerSpeed}
					units={["ms"]}
					max={5000}
					attributesKey={"carouselTickerSpeed"}
					defaultValue={{ unit: "ms", value: 3000 }}
					step={50}
				/>
			)}

			{((carouselAutoPlay && "slide" === displayStyle) || "ticker" === displayStyle) && (
				<Toggle
					label={__("Pause on Hover", "post-carousel")}
					attributes={carouselPauseOnHover}
					setAttributes={setAttributes}
					attributesKey={"carouselPauseOnHover"}
				/>
			)}

			<Toggle
				label={__("Open in new tab", "post-carousel")}
				attributes={tickerOpenNewTab}
				setAttributes={setAttributes}
				attributesKey={"tickerOpenNewTab"}
			/>

			<Toggle
				label={__("Position Sticky", "post-carousel")}
				attributes={tickerDisplaySticky}
				setAttributes={setAttributes}
				attributesKey={"tickerDisplaySticky"}
				pro={true}
			/>

			{tickerDisplaySticky && (
				<SPRangeControl
					label={__("Sticky Top Position", "post-carousel")}
					setAttributes={setAttributes}
					attributes={tickerStickyTopPosition}
					units={["px"]}
					max={200}
					attributesKey={"tickerStickyTopPosition"}
					defaultValue={{ unit: "px", value: 48 }}
				/>
			)}
		</>
	);
};

//post carousel general tab panel
export const PostCarouselGeneralTab = ({ attributes, setAttributes }) => {
	const { contentAlignment, generalLinkOpen, preloaderEnable, equalHeightEnable } = attributes;
	return (
		<>
			<SPToggleGroupControl
				label={__("Content Alignment", "post-carousel")}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
			/>
			<SelectField
				label={__("Link Open In", "post-carousel")}
				attributes={generalLinkOpen}
				attributesKey={"generalLinkOpen"}
				setAttributes={setAttributes}
				items={openLinksOptions}
			/>
			<Toggle
				label={__("Preloader", "post-carousel")}
				attributes={preloaderEnable}
				attributesKey={"preloaderEnable"}
				setAttributes={setAttributes}
			/>
			<Toggle
				label={__("Enable Equal Height", "post-carousel")}
				attributes={equalHeightEnable}
				attributesKey={"equalHeightEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
		</>
	);
};

export const NewsTickerContentArea = ({ attributes, setAttributes }) => {
	const {
		contentBg,
		ContentBorderWidth,
		ContentBorder,
		ContentBorderRadius,
		gapBetweenHeadingContent,
		newsTickerShadowEnable,
		newsTickerBoxShadow,
	} = attributes;

	return (
		<>
			<Background
				label={__("Background Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor={"#FFFFFF"}
				attributes={contentBg}
				attributesKey={"contentBg"}
				setAttributes={setAttributes}
				colorType={"color"}
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

			<Border
				attributes={{
					border: ContentBorder,
					borderWidth: ContentBorderWidth,
				}}
				setAttributes={setAttributes}
				attributesKey={{
					border: "ContentBorder",
					borderWidth: "ContentBorderWidth",
				}}
				defaultColor={{
					color: "#333333",
					hover: "#333333",
				}}
			/>

			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={ContentBorderRadius}
				attributesKey={"ContentBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					},
				}}
				indicator={"radius"}
			/>

			<SPRangeControl
				label={__("Heading to Title Gap", "post-carousel")}
				attributes={gapBetweenHeadingContent}
				attributesKey={"gapBetweenHeadingContent"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				max={200}
				defaultValue={{ unit: "px", value: 20 }}
			/>

			<Toggle
				label={__("Box Shadow", "post-carousel")}
				attributes={newsTickerShadowEnable}
				attributesKey={"newsTickerShadowEnable"}
				setAttributes={setAttributes}
			/>
			{newsTickerShadowEnable && (
				<BoxShadow
					label={__("Box Shadow", "post-carousel")}
					attributes={newsTickerBoxShadow}
					attributesKey={"newsTickerBoxShadow"}
					setAttributes={setAttributes}
					defaultColor="#A19D9D"
				/>
			)}
		</>
	);
};

export const NewsTickerHeadingTab = ({ attributes, setAttributes }) => {
	const {
		HeadingLabel,
		HeadingPosition,
		blockName,
		headingTypography,
		headingFontSize,
		headingLatterSpacing,
		headingLineHeight,
		headingColor,
		tickerHeadingBg,
		tickerIconEnabled,
		tickerIconSource,
		tickerIconColor,
		tickerIconPosition,
		headingWordSpacing,
		newsTickerIconSize,
		newsTickerHeadingPadding,
		headingGlobalTypography,
	} = attributes;

	return (
		<>
			<InputControl
				attributes={HeadingLabel}
				attributesKey={"HeadingLabel"}
				setAttributes={setAttributes}
				label={__("Heading Label", "post-carousel")}
				flex={false}
				inputType="string"
			/>
			<SPToggleGroupControl
				attributes={HeadingPosition}
				attributesKey={"HeadingPosition"}
				setAttributes={setAttributes}
				items={[
					{ label: "Left", value: "left" },
					{ label: "Right", value: "right" },
				]}
				label="Heading Position"
			/>
			<TypographyNew
				attributes={{
					family: headingTypography,
					familyKey: "headingTypography",
					fontSize: headingFontSize,
					fontSizeKey: "headingFontSize",
					fontSpacing: headingLatterSpacing,
					fontSpacingKey: "headingLatterSpacing",
					lineHeight: headingLineHeight,
					lineHeightKey: "headingLineHeight",
					wordSpacing: headingWordSpacing,
					wordSpacingKey: "headingWordSpacing",
					globalTypo: headingGlobalTypography,
					globalTypoKey: "headingGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 14,
				}}
				lineDefaultValue={1.2}
				typographyLabel={
					blockName === "thumbnail-slider-two"
						? __("Thumb Typography", "post-carousel")
						: __("Typography", "post-carousel")
				}
			/>

			<SpColorPicker
				label={__("Color", "post-carousel")}
				value={headingColor.color}
				onChange={(newColor) =>
					setAttributes({
						headingColor: {
							...headingColor,
							color: newColor,
						},
					})
				}
				defaultColor="#000000"
			/>

			<Background
				label={__("Background Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor={"#023047"}
				attributes={tickerHeadingBg}
				attributesKey={"tickerHeadingBg"}
				setAttributes={setAttributes}
				colorType={"color"}
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

			<Toggle
				label={__("Icon", "post-carousel")}
				attributes={tickerIconEnabled}
				setAttributes={setAttributes}
				attributesKey={"tickerIconEnabled"}
			/>

			{tickerIconEnabled && (
				<>
					<SPToggleGroupControl
						attributes={tickerIconSource}
						attributesKey={"tickerIconSource"}
						setAttributes={setAttributes}
						items={[
							{
								label: <NewsIcon />,
								value: "newsIcon",
							},
							{
								label: <NewsIcon2 />,
								value: "newsIcon2",
								disabled: "disabled"
							},
							{
								label: <NewsIcon3 />,
								value: "newsIcon3",
								disabled: "disabled"
							},
							{
								label: <NewsIcon4 />,
								value: "newsIcon4",
								disabled: "disabled"
							},
							{
								label: <NewsIcon5 />,
								value: "newsIcon5",
								disabled: "disabled"
							},
						]}
						label="Icon Set"
					/>
					<SPRangeControl
						label={__("Icon Size", "post-carousel")}
						attributes={newsTickerIconSize}
						attributesKey={"newsTickerIconSize"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 24 }}
					/>
					<SpColorPicker
						label={__("Icon Color", "post-carousel")}
						value={tickerIconColor}
						onChange={(newColor) =>
							setAttributes({
								tickerIconColor: newColor,
							})
						}
						defaultColor="#000000"
					/>

					<SPToggleGroupControl
						attributes={tickerIconPosition}
						attributesKey={"tickerIconPosition"}
						setAttributes={setAttributes}
						items={[
							{ label: "Left", value: "left" },
							{ label: "Right", value: "right" },
						]}
						label="Icon Position"
					/>
				</>
			)}
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={newsTickerHeadingPadding}
				attributesKey={"newsTickerHeadingPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 15,
						right: 24,
						bottom: 15,
						left: 24,
					},
				}}
			/>
		</>
	);
};

export const NewsTickerTitleTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		tickerTitleGap,
		tickerTitleTypography,
		tickerTitleFontSize,
		tickerTitleLatterSpacing,
		tickerTitleLineHeight,
		tickertitleColor,
		tickerSeparatorEnable,
		tickerTitleListStyleEnble,
		tickerListStyle,
		tickerListStyleColor,
		displayStyle,
		titleLength,
		tickerTitleWordSpacing,
		titleListStyleIconSize,
		titleListStyleIconGap,
		tickerTitleGlobalTypography,
	} = attributes;
	const [colorState, setColorState] = useState("normal");

	return (
		<>
			<TypographyNew
				attributes={{
					family: tickerTitleTypography,
					familyKey: "tickerTitleTypography",
					fontSize: tickerTitleFontSize,
					fontSizeKey: "tickerTitleFontSize",
					fontSpacing: tickerTitleLatterSpacing,
					fontSpacingKey: "tickerTitleLatterSpacing",
					lineHeight: tickerTitleLineHeight,
					lineHeightKey: "tickerTitleLineHeight",
					wordSpacing: tickerTitleWordSpacing,
					wordSpacingKey: "tickerTitleWordSpacing",
					globalTypo: tickerTitleGlobalTypography,
					globalTypoKey: "tickerTitleGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: 14,
				}}
				typographyLabel={
					blockName === "thumbnail-slider-two"
						? __("Thumb Typography", "post-carousel")
						: __("Typography", "post-carousel")
				}
			/>
			<SPRangeControl
				label={__("Title Length", "post-carousel")}
				className="sp-smart-post-ranger-length"
				attributes={titleLength}
				attributesKey={"titleLength"}
				setAttributes={setAttributes}
				units={["Chars", "Words"]}
				defaultValue={{ unit: "Words", value: 7 }}
				min={1}
			/>
			{displayStyle === "ticker" && (
				<SPRangeControl
					label={__("Space Between Title", "post-carousel")}
					setAttributes={setAttributes}
					attributes={tickerTitleGap}
					units={["px", "%", "em"]}
					max={100}
					attributesKey={"tickerTitleGap"}
					defaultValue={{ unit: "px", value: 24 }}
				/>
			)}

			<SPToggleGroupControl
				attributes={colorState}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(val) => setColorState(val)}
			/>
			{"normal" === colorState ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={tickertitleColor.color}
						onChange={(newColor) =>
							setAttributes({
								tickertitleColor: {
									...tickertitleColor,
									color: newColor,
								},
							})
						}
						defaultColor={"#ffffff"}
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Hover Color", "post-carousel")}
						value={tickertitleColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								tickertitleColor: {
									...tickertitleColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor={"#1A1B1C"}
					/>
				</>
			)}

			{displayStyle === "ticker" && (
				<Toggle
					label={__("Titles Separator", "post-carousel")}
					attributes={tickerSeparatorEnable}
					setAttributes={setAttributes}
					attributesKey={"tickerSeparatorEnable"}
				/>
			)}
			{displayStyle !== "typewriter" && (
				<>
					<Toggle
						label={__("Titles List Style", "post-carousel")}
						attributes={tickerTitleListStyleEnble}
						setAttributes={setAttributes}
						attributesKey={"tickerTitleListStyleEnble"}
					/>
					{tickerTitleListStyleEnble && (
						<>
							<SPRangeControl
								label={__("Icon Size", "post-carousel")}
								attributes={titleListStyleIconSize}
								attributesKey={"titleListStyleIconSize"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: "" }}
							/>
							<SPRangeControl
								label={__("Gap", "post-carousel")}
								attributes={titleListStyleIconGap}
								attributesKey={"titleListStyleIconGap"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: "" }}
							/>
							<SPToggleGroupControl
								attributes={tickerListStyle}
								attributesKey={"tickerListStyle"}
								setAttributes={setAttributes}
								items={[
									{
										label: <ListStyle1 />,
										value: "list1",
									},
									{
										label: <ListStyle2 />,
										value: "list2",
									},
									{
										label: <ListStyle3 />,
										value: "list3",
									},
									{
										label: <ListStyle4 />,
										value: "list4",
									},
									{
										label: <ListStyle5 />,
										value: "list5",
									},
									{
										label: <ListStyle6 />,
										value: "list6",
									},
									{
										label: <ListStyle7 />,
										value: "list7",
									},
								]}
								label="List Style Type"
							/>
							<SpColorPicker
								label={__("List Style Color", "post-carousel")}
								value={tickerListStyleColor}
								onChange={(newColor) =>
									setAttributes({
										tickerListStyleColor: newColor,
									})
								}
								defaultColor="#023047"
							/>
						</>
					)}
				</>
			)}
		</>
	);
};

export const NewsTickerDateTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		tickerDate,
		tickerDateType,
		tickerDateStyle,
		tickerDateColor,
		tickerDateTypography,
		tickerDateLineHeight,
		tickerDateLatterSpacing,
		tickerDateFontSize,
		tickerDateBgColor,
		metaDateFormat,
		metaDateCustomDateFormat,
		tickerDateWordSpacing,
		tickerDateGlobalTypography,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Date", "post-carousel")}
				attributes={tickerDate}
				setAttributes={setAttributes}
				attributesKey={"tickerDate"}
			/>
			{tickerDate && (
				<>
					<SPToggleGroupControl
						attributes={tickerDateType}
						items={[
							{ label: "Days Ago", value: "daysAgo" },
							{ label: "Date", value: "date" },
						]}
						onClick={(val) => setAttributes({ tickerDateType: val })}
						label="Date Type"
					/>

					{tickerDateType === "date" && (
						<>
							<SelectField
								label={__("Date Format", "post-carousel")}
								attributes={metaDateFormat}
								attributesKey={"metaDateFormat"}
								setAttributes={setAttributes}
								items={[
									{
										label: "Select Date Format",
										value: "",
										disabled: "disabled",
									},
									{
										label: "Default",
										value: "default",
									},
									{
										label: "Oct 7, 2025",
										value: "M j, Y",
									},
									{
										label: "October 7, 2025",
										value: "F j, Y",
									},
									{
										label: "Time Ago (Human Time)",
										value: "time_ago",
										disabled: "disabled"
									},
									{
										label: "Custom (Pro)",
										value: "custom",
										disabled: "disabled"
									},
								]}
							/>
							{metaDateFormat === "custom" && (
								<>
									<InputControl
										help={
											<>
												<span>{__("To define format, check", "post-carousel")}</span>
												<a
													href="https://wordpress.org/support/article/formatting-date-and-time/"
													target="_blank"
												>
													{" "}
													this doc.
												</a>
											</>
										}
										attributes={metaDateCustomDateFormat}
										attributesKey={"metaDateCustomDateFormat"}
										setAttributes={setAttributes}
										inputType={"string"}
										flex={false}
										placeholder={"F j, Y"}
									/>
								</>
							)}
						</>
					)}

					<SelectField
						label={__("Date Display Style", "post-carousel")}
						flexStyle={true}
						attributes={tickerDateStyle}
						attributesKey={"tickerDateStyle"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Text",
								value: "text",
							},
							{
								label: "Button",
								value: "button",
							},
						]}
					/>

					<TypographyNew
						attributes={{
							family: tickerDateTypography,
							familyKey: "tickerDateTypography",
							fontSize: tickerDateFontSize,
							fontSizeKey: "tickerDateFontSize",
							fontSpacing: tickerDateLatterSpacing,
							fontSpacingKey: "tickerDateLatterSpacing",
							lineHeight: tickerDateLineHeight,
							lineHeightKey: "tickerDateLineHeight",
							wordSpacing: tickerDateWordSpacing,
							wordSpacingKey: "tickerDateWordSpacing",
							globalTypo: tickerDateGlobalTypography,
							globalTypoKey: "tickerDateGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{
							unit: "px",
							value: 0,
						}}
						fontSizeDefault={{
							unit: "px",
							value: 10,
						}}
						typographyLabel={
							blockName === "thumbnail-slider-two"
								? __("Thumb Typography", "post-carousel")
								: __("Date Typography", "post-carousel")
						}
					/>
					<SpColorPicker
						label={__("Text Color", "post-carousel")}
						value={tickerDateColor}
						onChange={(newColor) =>
							setAttributes({
								tickerDateColor: newColor,
							})
						}
						defaultColor="#989595"
					/>

					{tickerDateStyle === "button" && (
						<SpColorPicker
							label={__("Background", "post-carousel")}
							value={tickerDateBgColor}
							onChange={(newColor) =>
								setAttributes({
									tickerDateBgColor: newColor,
								})
							}
							defaultColor="#E1E1E1"
						/>
					)}
				</>
			)}
		</>
	);
};

export const NewsTickerImageTab = ({ attributes, setAttributes }) => {
	const {
		tickerImagePosition,
		tickerImageWidth,
		tickerImageHeight,
		tickerImg,
		tickerImgShape,
		newsTickerImageRadius,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Show Featured Image", "post-carousel")}
				attributes={tickerImg}
				attributesKey="tickerImg"
				setAttributes={setAttributes}
				pro={true}
			/>

			{tickerImg && (
				<>
					<SelectField
						label={__("Image Shape", "post-carousel")}
						flexStyle={true}
						attributes={tickerImgShape}
						attributesKey={"tickerImgShape"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Circle",
								value: "circle",
							},
							{
								label: "Square",
								value: "square",
							},
						]}
					/>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={tickerImageWidth}
						attributesKey="tickerImageWidth"
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{
							unit: "px",
							value: 20,
						}}
						max={100}
					/>

					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={tickerImageHeight}
						attributesKey="tickerImageHeight"
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{
							unit: "px",
							value: 20,
						}}
						max={100}
					/>
					{/* </>
					) } */}
					{"square" === tickerImgShape && (
						<Spacing
							label={__("Radius", "post-carousel")}
							attributes={newsTickerImageRadius}
							attributesKey={"newsTickerImageRadius"}
							setAttributes={setAttributes}
							units={["px", "%", "em"]}
							defaultValue={{
								unit: "px",
								value: {
									top: 0,
									right: 0,
									bottom: 0,
									left: 0,
								},
							}}
						/>
					)}

					<SPToggleGroupControl
						label={__("Position", "post-carousel")}
						attributes={tickerImagePosition}
						attributesKey={"tickerImagePosition"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Left",
								value: "left",
							},
							{
								label: "Right",
								value: "right",
							},
						]}
					/>
				</>
			)}
		</>
	);
};

export const NewsTickerNavigationGeneralTab = ({ attributes, setAttributes }) => {
	const {
		carouselArrowStyle,
		carouselArrowSize,
		carouselArrowHeight,
		tickerNavigation,
		tickerPause,
		tickerDivider,
		newsTickerCarouselArrowWidth,
		newsCarouselArrowSpaceBetween,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Navigation", "post-carousel")}
				attributes={tickerNavigation}
				attributesKey={"tickerNavigation"}
				setAttributes={setAttributes}
			/>
			{tickerNavigation && (
				<>
					{/* <SelectDropdown
						label={ __( 'Arrow Style', 'post-carousel' ) }
						attributes={ carouselArrowStyle }
						attributesKey={ 'carouselArrowStyle' }
						setAttributes={ setAttributes }
						options={ [
							{
								label: 'Style One',
								value: 'open',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i
											className={ `sp-icon-left-open` }
										></i>
										<i
											className={ `sp-icon-right-open` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Two',
								value: 'open-mini',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i
											className={ `sp-icon-left-open-mini` }
										></i>
										<i
											className={ `sp-icon-right-open-mini` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Three',
								value: 'open-big',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i
											className={ `sp-icon-left-open-big` }
										></i>
										<i
											className={ `sp-icon-right-open-big` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Four',
								value: 'open-one',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i
											className={ `sp-icon-left-open-one` }
										></i>
										<i
											className={ `sp-icon-right-open-one` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Five',
								value: 'open-outline',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i
											className={ `sp-icon-left-open-outline` }
										></i>
										<i
											className={ `sp-icon-right-open-outline` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Six',
								value: 'dir',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i className={ `sp-icon-left-dir` }></i>
										<i
											className={ `sp-icon-right-dir` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Seven',
								value: 'one',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i className={ `sp-icon-left-one` }></i>
										<i
											className={ `sp-icon-right-one` }
										></i>
									</span>
								),
							},
							{
								label: 'Style Eight',
								value: 'circled2',
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<i
											className={ `sp-icon-left-circled2` }
										></i>
										<i
											className={ `sp-icon-right-circled2` }
										></i>
									</span>
								),
							},
						] }
					/> */}

					<SelectDropdown
						label={__("Arrow Icon Style", "post-carousel")}
						attributes={carouselArrowStyle}
						attributesKey={"carouselArrowStyle"}
						setAttributes={setAttributes}
						options={[
							{
								label: __("Chevron Solid", "post-carousel"),
								value: "chevron-solid",
								icon: <ChevronSolid />,
							},
							{
								label: __("Chevron Outline", "post-carousel"),
								value: "chevron-outline",
								icon: <ChevronOutline />,
							},
							{
								label: __("Chevron Bold", "post-carousel"),
								value: "chevron-bold",
								icon: <ChevronBold />,
							},
							{
								label: __("Double Chevron", "post-carousel"),
								value: "double-chevron",
								icon: <DoubleChevron />,
							},
							{
								label: __("Arrow Solid", "post-carousel"),
								value: "arrow-solid",
								icon: <ArrowSolid />,
							},
							{
								label: __("Arrow Outline", "post-carousel"),
								value: "arrow-outline",
								icon: <ArrowOutline />,
							},
							{
								label: __("Arrow Minimal", "post-carousel"),
								value: "arrow-minimal",
								icon: <ArrowMinimal />,
							},
							{
								label: __("Chevron Border Line", "post-carousel"),
								value: "chevron-border-line",
								icon: <ChevronBorderLine />,
							},
							{
								label: __("Double Chevron Outline", "post-carousel"),
								value: "double-chevron-outline",
								icon: <DoubleChevronOutline />,
							},
							{
								label: __("Triangle Outline", "post-carousel"),
								value: "triangle-outline",
								icon: <TriangleOutline />,
							},
						]}
					/>

					<SPRangeControl
						label={__("Size", "post-carousel")}
						attributes={carouselArrowSize}
						attributesKey={"carouselArrowSize"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{ unit: "px", value: 16 }}
					/>
					<SPRangeControl
						label={__("Box Width", "post-carousel")}
						attributes={newsTickerCarouselArrowWidth}
						attributesKey={"newsTickerCarouselArrowWidth"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{ unit: "px", value: 25 }}
					/>
					<SPRangeControl
						label={__("Box Height", "post-carousel")}
						attributes={carouselArrowHeight}
						attributesKey={"carouselArrowHeight"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{ unit: "px", value: 25 }}
					/>
					<SPRangeControl
						label={__("Space Between Arrows", "post-carousel")}
						attributes={newsCarouselArrowSpaceBetween}
						attributesKey={"newsCarouselArrowSpaceBetween"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						max={40}
						defaultValue={{ unit: "px", value: 0 }}
					/>
					<Toggle
						label={__("Divider", "post-carousel")}
						attributes={tickerDivider}
						attributesKey={"tickerDivider"}
						setAttributes={setAttributes}
					/>
					<Toggle
						label={__("Pause Icon", "post-carousel")}
						attributes={tickerPause}
						attributesKey={"tickerPause"}
						setAttributes={setAttributes}
					/>
				</>
			)}
		</>
	);
};

export const NewsTickerNavigationStyleTab = ({ attributes, setAttributes }) => {
	const {
		carouselArrowBorderWidth,
		newsTickerCarouselArrowBorderRadius,
		newsTickerArrowBgColor,
		newsTickerCarouselArrowColor,
		newsTickerCarouselArrowBorder,
		newsTickerCarouselDividerColor,
		tickerDivider,
		tickerNavigation,
	} = attributes;
	const [colorState, setColorState] = useState("normal");
	if (!tickerNavigation) {
		return <p>Please Enable Navigation Toggle from General tab under Navigation tab.</p>;
	}

	return (
		<>
			<SPToggleGroupControl
				attributes={colorState}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(val) => setColorState(val)}
			/>
			{"normal" === colorState ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={newsTickerCarouselArrowColor.color}
						onChange={(newColor) =>
							setAttributes({
								newsTickerCarouselArrowColor: {
									...newsTickerCarouselArrowColor,
									color: newColor,
								},
							})
						}
						defaultColor={"#023047"}
					/>
					{tickerDivider && (
						<SpColorPicker
							label={__("Divider Color", "post-carousel")}
							value={newsTickerCarouselDividerColor}
							onChange={(newColor) =>
								setAttributes({
									newsTickerCarouselDividerColor: newColor,
								})
							}
						/>
					)}
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={newsTickerArrowBgColor.color}
						onChange={(newBGColor) =>
							setAttributes({
								newsTickerArrowBgColor: {
									...newBGColor,
									color: newBGColor,
								},
							})
						}
						defaultColor={"#FFFFFF"}
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Hover Color", "post-carousel")}
						value={newsTickerCarouselArrowColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								newsTickerCarouselArrowColor: {
									...newsTickerCarouselArrowColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor={"#1A1B1C"}
					/>
					<SpColorPicker
						label={__("Hover Background Color", "post-carousel")}
						value={newsTickerArrowBgColor.hoverColor}
						onChange={(newBGColor) =>
							setAttributes({
								newsTickerArrowBgColor: {
									...newsTickerArrowBgColor,
									hoverColor: newBGColor,
								},
							})
						}
						defaultColor={"#ffffff"}
					/>
				</>
			)}
			<Border
				attributes={{
					border: newsTickerCarouselArrowBorder,
					borderWidth: carouselArrowBorderWidth,
				}}
				attributesKey={{
					border: "newsTickerCarouselArrowBorder",
					borderWidth: "carouselArrowBorderWidth",
				}}
				setAttributes={setAttributes}
				defaultColor={{ color: "#1A1B1C", hover: "#1A1B1C" }}
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={newsTickerCarouselArrowBorderRadius}
				attributesKey={"newsTickerCarouselArrowBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "%",
					value: {
						top: 5,
						right: 5,
						bottom: 5,
						left: 5,
					},
				}}
				indicator={"radius"}
			/>
		</>
	);
};
