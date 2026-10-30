import { __ } from "@wordpress/i18n";
import { Fragment, useState } from "@wordpress/element";
import {
	SPRangeControl,
	SelectField,
	Background,
	Toggle,
	BoxShadow,
	Spacing,
	Border,
	SelectDropdown,
	SpColorPicker,
	TypographyNew,
	Divider,
	Popup,
} from "../../components";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { inArray } from "../../controls/controls";
import useDefaultValue from "../../hooks/useDefaultValue";
import {
	HorizontalCenterIcon,
	HorizontalLeftIcon,
	HorizontalRightIcon,
	VerticalBottomIcon,
	VerticalCenterIcon,
	VerticalTopIcon,
} from "../../icons/icons";

export const ImageStyleTab = ({ attributes, setAttributes }) => {
	const {
		imageHoverEffect,
		imageBorder,
		imageBorderWidth,
		imageRadius,
		imageSpace,
		imageOpacityEffect,
		imagePosition,
		blockName,
		imageGalleryNavArrowColor,
		imageGalleryNavArrowBgColor,
		imageGrayscaleLevel,
		imageBlurEffect,
		imageBrightness,
		imageGrayscaleLevelHover,
		imageBlurEffectHover,
		imageBrightnessHover,
		showImageGallery,
	} = attributes;

	const defaultValues = useDefaultValue(blockName);

	const [imageNormaOrlHover, setImageNormaOrlHover] = useState("normal");
	const [navArrowNormalOrHover, setNavArrowNormaOrlHover] = useState("color");

	return (
		<>
			<SelectField
				label={__("Hover Effect", "post-carousel")}
				attributes={imageHoverEffect}
				attributesKey={"imageHoverEffect"}
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
			{imageHoverEffect === "opacity" && (
				<SPRangeControl
					label={__("Opacity Value", "post-carousel")}
					attributes={imageOpacityEffect}
					attributesKey={"imageOpacityEffect"}
					setAttributes={setAttributes}
					min={0}
					max={1}
					step={0.1}
				/>
			)}
			<SPToggleGroupControl
				attributes={imageNormaOrlHover}
				onClick={(newValue) => setImageNormaOrlHover(newValue)}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
			/>
			{imageNormaOrlHover === "normal" && (
				<>
					<SPRangeControl
						label={__("Grayscale Level", "post-carousel")}
						attributes={imageGrayscaleLevel}
						attributesKey={"imageGrayscaleLevel"}
						setAttributes={setAttributes}
						// units={["%"]}
						defaultValue={{ unit: "%", value: 0 }}
						max={100}
					/>
					<SPRangeControl
						label={__("Blur Effect", "post-carousel")}
						attributes={imageBlurEffect}
						attributesKey={"imageBlurEffect"}
						setAttributes={setAttributes}
						// units={["px"]}
						defaultValue={{ unit: "px", value: 0 }}
						max={20}
						step={0.5}
					/>
					<SPRangeControl
						label={__("Brightness", "post-carousel")}
						attributes={imageBrightness}
						attributesKey={"imageBrightness"}
						setAttributes={setAttributes}
						max={10}
						step={0.1}
						defaultValue={1}
					/>
				</>
			)}
			{imageNormaOrlHover === "hover" && (
				<>
					<SPRangeControl
						label={__("Grayscale Level", "post-carousel")}
						attributes={imageGrayscaleLevelHover}
						attributesKey={"imageGrayscaleLevelHover"}
						setAttributes={setAttributes}
						// units={["%"]}
						defaultValue={{ unit: "%", value: 0 }}
						max={100}
					/>
					<SPRangeControl
						label={__("Blur Effect", "post-carousel")}
						attributes={imageBlurEffectHover}
						attributesKey={"imageBlurEffectHover"}
						setAttributes={setAttributes}
						// units={["px"]}
						defaultValue={{ unit: "px", value: 0 }}
						max={20}
						step={0.5}
					/>
					<SPRangeControl
						label={__("Brightness", "post-carousel")}
						attributes={imageBrightnessHover}
						attributesKey={"imageBrightnessHover"}
						setAttributes={setAttributes}
						max={10}
						step={0.1}
						defaultValue={1}
					/>
				</>
			)}
			{(["post-thumbnail-slider", "post-thumbnail-slider-two", "post-slider", "post-slider-two"].includes(
				blockName
			) ||
				"background" !== imagePosition) && (
				<>
					<Border
						attributes={{
							border: imageBorder,
							borderWidth: imageBorderWidth,
						}}
						attributesKey={{
							border: "imageBorder",
							borderWidth: "imageBorderWidth",
						}}
						setAttributes={setAttributes}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={imageRadius}
						attributesKey={"imageRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: 8,
								right: 8,
								bottom: 8,
								left: 8,
							},
						}}
						indicator={"radius"}
					/>
				</>
			)}
			{imagePosition !== "background" && blockName !== "thumbnail-slider-two" && (
				<SPRangeControl
					label={__("Space Between Content", "post-carousel")}
					attributes={imageSpace}
					attributesKey={"imageSpace"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{
						unit: "px",
						value: defaultValues?.imageSpace,
					}}
				/>
			)}
			{showImageGallery && (
				<Popup label={__("Arrow Settings", "post-carousel")}>
					<>
						<SPToggleGroupControl
							attributes={navArrowNormalOrHover}
							onClick={(newValue) => setNavArrowNormaOrlHover(newValue)}
							items={[
								{ label: "Normal", value: "color" },
								{ label: "Hover", value: "hoverColor" },
							]}
						/>
						<SpColorPicker
							label={__("Icon Color", "post-carousel")}
							value={imageGalleryNavArrowColor[navArrowNormalOrHover]}
							onChange={(newColor) =>
								setAttributes({
									imageGalleryNavArrowColor: {
										...imageGalleryNavArrowColor,
										[navArrowNormalOrHover]: newColor,
									},
								})
							}
							defaultColor=""
						/>
						<SpColorPicker
							label={__("Background Color", "post-carousel")}
							value={imageGalleryNavArrowBgColor[navArrowNormalOrHover]}
							onChange={(newColor) =>
								setAttributes({
									imageGalleryNavArrowBgColor: {
										...imageGalleryNavArrowBgColor,
										[navArrowNormalOrHover]: newColor,
									},
								})
							}
							defaultColor=""
						/>
					</>
				</Popup>
			)}
		</>
	);
};

export const ContentAreaStyleTab = ({ attributes, setAttributes }) => {
	const {
		contentAreaHeight,
		contentAreaBg,
		contentAreaBorderRadius,
		contentAreaBoxShadow,
		contentAreaPadding,
		contentAreaBorder,
		contentAreaBorderWidth,
		contentAreaEnableBoxShadow,
		postSliderLayout,
		contentVerticalPosition,
		contentHorizontalPosition,
		blockName,
		imagePosition,
		postCardBg,
		postCardBorder,
		postCardBorderWidth,
		postCardBorderRadius,
		postCardBoxShadowEnable,
		postCardBoxShadow,
		postCardPadding,
		postCardHoverBorderWidth,
		postCardHoverBorderRadius,
		postCardHoverBoxShadowEnable,
		postCardHoverBoxShadow,
		contentOrientation,
		imageOverlayType,
		contentAreaWidth,
		contentAreaMargin,
		contentAreaHoverBorderRadius,
		contentAreaHoverBorderWidth,
		blockLayoutName,
		contentAreaInnerWidth,
		largeContentAreaPadding,
		layoutSixPostCardBg,
		largeItemPadding,
		postListLayout,
		thumbnailThumbBGColor,
		contentAreaThumbsBorder,
		contentAreaThumbsBorderWidth,
		contentAreaThumbsBorderRadius,
		thumbnailTwoPosition,
	} = attributes;

	const [contentAreaBgStyleType, setContentAreaBgStyleType] = useState("color");

	return (
		<>
			{["post-slider", "post-thumbnail-slider", "thumbnail-slider-two"].includes(blockName) &&
				![
					// 'post-slider-layout-three',
					// 'post-slider-layout-five',
					"post-slider-two-layout-two",
					"post-slider-two-layout-three",
					"thumbnail-slider-layout-six",
				].includes(blockLayoutName) && (
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={contentAreaInnerWidth}
						attributesKey={"contentAreaInnerWidth"}
						setAttributes={setAttributes}
						units={["px", "%"]}
						max={1600}
						defaultValue={{ unit: "%", value: 85 }}
						pro={true}
					/>
				)}
			{("post-slider-two" === blockName ||
				(imagePosition !== "top" &&
					[
						"sp-smart-post-list-two-layout-one",
						"sp-smart-post-list-two-layout-two",
						"sp-smart-post-list-two-layout-five",
						"sp-smart-post-list-two-layout-six",
					].includes(blockLayoutName)) ||
				("thumbnail-slider-two" === blockName && ["left", "right"].includes(thumbnailTwoPosition))) && (
				<SPToggleGroupControl
					label={__("Vertical Position", "post-carousel")}
					attributes={contentVerticalPosition}
					attributesKey={"contentVerticalPosition"}
					setAttributes={setAttributes}
					items={[
						{ label: <VerticalTopIcon />, value: "top" },
						{ label: <VerticalCenterIcon />, value: "center" },
						{ label: <VerticalBottomIcon />, value: "bottom" },
					]}
				/>
			)}
			{("post-slider-two" === blockName ||
				["post-slider-layout-five", "thumbnail-slider-layout-six"].includes(blockLayoutName) ||
				("background" === imagePosition && imageOverlayType === "box") ||
				("thumbnail-slider-two" !== blockName && thumbnailTwoPosition === "bottom")) && (
				<SPToggleGroupControl
					label={__("Horizontal Position", "post-carousel")}
					attributes={contentHorizontalPosition}
					attributesKey={"contentHorizontalPosition"}
					setAttributes={setAttributes}
					items={
						[
							"post-slider-layout-five",
							"post-slider-two-layout-three",
							"thumbnail-slider-layout-six",
						].includes(blockLayoutName)
							? [
									{
										label: <HorizontalLeftIcon />,
										value: "left",
									},
									{
										label: <HorizontalRightIcon />,
										value: "right",
									},
								]
							: [
									{
										label: <HorizontalLeftIcon />,
										value: "left",
									},
									{
										label: <HorizontalCenterIcon />,
										value: "center",
									},
									{
										label: <HorizontalRightIcon />,
										value: "right",
									},
								]
					}
				/>
			)}
			{"post-slider-two" === blockName && (imageOverlayType === "box" || "background" === imagePosition) && (
				<>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={contentAreaWidth}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						max={1200}
						attributesKey={"contentAreaWidth"}
						defaultValue={{ unit: "%", value: 80 }}
						pro={true}
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={contentAreaHeight}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						max={700}
						attributesKey={"contentAreaHeight"}
						defaultValue={{ unit: "%", value: "" }}
					/>
				</>
			)}
			{![
				// 'thumbnail-slider-two',
				"post-slider",
				// 'post-slider-two',
				// 'thumbnail-slider',
			].includes(blockName) &&
				![
					"thumbnail-slider-two-layout-two",
					"thumbnail-slider-two-layout-three",
					"thumbnail-slider-two-layout-four",
				].includes(blockLayoutName) && (
					<SPToggleGroupControl
						attributes={contentAreaBgStyleType}
						items={
							"thumbnail-slider-two" !== blockName
								? [
										{ label: "Default", value: "color" },
										{ label: "Hover", value: "hover" },
									]
								: [
										{ label: "Normal", value: "color" },
										{
											label: "Hover & Active",
											value: "hover",
										},
									]
						}
						onClick={(val) => setContentAreaBgStyleType(val)}
					/>
				)}
			{((![
				"post-grid-three",
				"post-grid-four",
				"post-grid-five",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
			].includes(blockName) &&
				imagePosition !== "background") ||
				[
					// 'post-slider-layout-five',
					// 'thumbnail-slider-layout-three',
					// 'thumbnail-slider-layout-four',
					// 'thumbnail-slider-layout-six',
				].includes(blockLayoutName)) && (
				<Background
					label={__("Background Type", "post-carousel")}
					colorLabel="Solid Color"
					defaultColor="#fff"
					attributes={postCardBg}
					attributesKey={"postCardBg"}
					setAttributes={setAttributes}
					colorType={contentAreaBgStyleType}
					items={[
						{
							label: <TransparentIcon />,
							value: "transparent",
							tooltip: "Transparent",
						},
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
			{/** For only Thumbnail Slider Layout Six so default color will not conflict */}
			{/* { layoutSixPostCardBg &&
				[ "thumbnail-slider-layout-six" ].includes(
					blockLayoutName
				) && (
					<Background
						label={ __( "Background Type", "post-carousel" ) }
						colorLabel="Solid Color"
						defaultColor="#fff"
						attributes={ layoutSixPostCardBg }
						attributesKey={ "layoutSixPostCardBg" }
						setAttributes={ setAttributes }
						colorType={ contentAreaBgStyleType }
						items={ [
							// {
							// 	label: <TransparentIcon />,
							// 	value: 'transparent',
							// 	tooltip: 'Transparent',
							// },
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
						] }
					/>
				) } */}
			{/** For only Thumbnail Slider Two Thumbnails BG Color so default color will not conflict */}
			{thumbnailThumbBGColor &&
				["thumbnail-slider-two", "post-thumbnail-slider"].includes(blockName) &&
				![
					"thumbnail-slider-two-layout-two",
					"thumbnail-slider-two-layout-three",
					"thumbnail-slider-two-layout-four",
					"thumbnail-slider-layout-one",
					"thumbnail-slider-layout-two",
					"thumbnail-slider-layout-five",
					"thumbnail-slider-layout-six",
				].includes(blockLayoutName) && (
					<Background
						label={__("Thumbs Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="#fff"
						attributes={thumbnailThumbBGColor}
						attributesKey={"thumbnailThumbBGColor"}
						setAttributes={setAttributes}
						colorType={contentAreaBgStyleType}
						items={[
							{
								label: <TransparentIcon />,
								value: "transparent",
								tooltip: "Transparent",
							},
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
			{([
				"orientation_six",
				"orientation_seven",
				"orientation_eight",
				"list-one-layout-five",
				"list-one-layout-six",
				"list-one-layout-seven",
				"list-one-layout-eight",
			].includes(contentOrientation) ||
				["post-grid-three", "post-grid-four", "post-grid-five", "post-slider", "post-slider-two"].includes(
					blockName
				) ||
				(imagePosition === "background" && imageOverlayType === "box")) &&
				!["post-thumbnail-slider", "post-slider"].includes(blockName) && (
					<Background
						label={__("Inner Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor="#fff"
						attributes={contentAreaBg}
						attributesKey={"contentAreaBg"}
						setAttributes={setAttributes}
						colorType={"post-slider-two" === blockName ? "color" : contentAreaBgStyleType}
						items={[
							{
								label: <TransparentIcon />,
								value: "transparent",
								tooltip: "Transparent",
							},
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
			{contentAreaBgStyleType === "color" && (
				<>
					{!["thumbnail-slider-two", "post-slider", "post-slider-two", "post-thumbnail-slider"].includes(
						blockName
					) && (
						<>
							<Border
								attributes={{
									border: postCardBorder,
									borderWidth: postCardBorderWidth,
								}}
								attributesKey={{
									border: "postCardBorder",
									borderWidth: "postCardBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={postCardBorderRadius}
								attributesKey={"postCardBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
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
						</>
					)}
					{(blockName === "post-slider-two" ||
						[
							"orientation_six",
							"orientation_seven",
							"orientation_eight",
							"list-one-layout-three",
							"list-one-layout-four",
						].includes(contentOrientation) ||
						(blockLayoutName &&
							[
								// 'post-slider-layout-three',
								"thumbnail-slider-layout-six",
							].includes(blockLayoutName))) && (
						<>
							<Border
								label="Inner Border"
								attributes={{
									border: contentAreaBorder,
									borderWidth: contentAreaBorderWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "contentAreaBorder",
									borderWidth: "contentAreaBorderWidth",
								}}
								btnType="normal"
							/>
							<Spacing
								label={__("Inner Border Radius", "post-carousel")}
								attributes={contentAreaBorderRadius}
								attributesKey={"contentAreaBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "",
										right: "",
										bottom: "",
										left: "",
									},
								}}
								indicator={"radius"}
							/>
						</>
					)}
					{!["post-slider", "post-slider-two", "post-thumbnail-slider", "thumbnail-slider-two"].includes(
						blockName
					) && (
						<>
							<Toggle
								label={__("Box Shadow", "post-carousel")}
								attributes={postCardBoxShadowEnable}
								attributesKey={"postCardBoxShadowEnable"}
								setAttributes={setAttributes}
							/>
							{postCardBoxShadowEnable && (
								<BoxShadow
									label={__("Box Shadow", "post-carousel")}
									attributes={postCardBoxShadow}
									attributesKey={"postCardBoxShadow"}
									setAttributes={setAttributes}
									disabledOption={
										"post-timeline-three" === blockName ? ["custom", "xl-deep-12dp"] : []
									}
								/>
							)}
						</>
					)}
					{[
						"orientation_six",
						"orientation_seven",
						"orientation_eight",
						"list-one-layout-five",
						"list-one-layout-six",
						"list-one-layout-seven",
						"list-one-layout-eight",
					].includes(contentOrientation) && (
						<>
							<Toggle
								label={__("Inner Box Shadow", "post-carousel")}
								attributes={contentAreaEnableBoxShadow}
								attributesKey={"contentAreaEnableBoxShadow"}
								setAttributes={setAttributes}
							/>
							{contentAreaEnableBoxShadow && (
								<BoxShadow
									label={__("Inner Box Shadow", "post-carousel")}
									attributes={contentAreaBoxShadow}
									attributesKey={"contentAreaBoxShadow"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}
				</>
			)}
			{contentAreaBgStyleType === "hover" && (
				<>
					{!["thumbnail-slider-two", "post-slider", "post-slider-two", "post-thumbnail-slider"].includes(
						blockName
					) && (
						<>
							<Border
								attributes={{
									border: postCardBorder,
									borderWidth: postCardHoverBorderWidth,
								}}
								attributesKey={{
									border: "postCardBorder",
									borderWidth: "postCardHoverBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="hover"
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={postCardHoverBorderRadius}
								attributesKey={"postCardHoverBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
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
						</>
					)}
					{(blockName === "post-slider-two" ||
						[
							"orientation_six",
							"orientation_seven",
							"orientation_eight",
							"list-one-layout-five",
							"list-one-layout-six",
							"list-one-layout-seven",
							"list-one-layout-eight",
						].includes(contentOrientation) ||
						["thumbnail-slider-layout-six"].includes(blockLayoutName)) && (
						<>
							<Border
								label="Inner Border"
								attributes={{
									border: contentAreaBorder,
									borderWidth: contentAreaHoverBorderWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "contentAreaBorder",
									borderWidth: "contentAreaHoverBorderWidth",
								}}
								btnType="hover"
							/>
							<Spacing
								label={__("Inner Border Radius", "post-carousel")}
								attributes={contentAreaHoverBorderRadius}
								attributesKey={"contentAreaHoverBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
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
						</>
					)}
					{!["post-slider", "post-slider-two", "post-thumbnail-slider", "thumbnail-slider-two"].includes(
						blockName
					) && (
						<>
							<Toggle
								label={__("Box Shadow", "post-carousel")}
								attributes={postCardHoverBoxShadowEnable}
								attributesKey={"postCardHoverBoxShadowEnable"}
								setAttributes={setAttributes}
							/>
							{postCardHoverBoxShadowEnable && (
								<BoxShadow
									label={__("Hover Box Shadow", "post-carousel")}
									attributes={postCardHoverBoxShadow}
									attributesKey={"postCardHoverBoxShadow"}
									setAttributes={setAttributes}
								/>
							)}
						</>
					)}
				</>
			)}
			{![
				// 'thumbnail-slider-two',
				"post-slider",
				// 'post-slider-two',
				// 'thumbnail-slider',
			].includes(blockName) && <Divider position={"sp-w-100pct bottom"} />}
			{[
				"thumbnail-slider-two-layout-three",
				"thumbnail-slider-two-layout-four",
				"thumbnail-slider-two-layout-five",
			].includes(blockLayoutName) && (
				<>
					<Border
						label={__("Thumb Border", "post-carousel")}
						attributes={{
							border: contentAreaThumbsBorder,
							borderWidth: contentAreaThumbsBorderWidth,
						}}
						attributesKey={{
							border: "contentAreaThumbsBorder",
							borderWidth: "contentAreaThumbsBorderWidth",
						}}
						setAttributes={setAttributes}
					/>
					<Spacing
						label={__("Thumb Border Radius", "post-carousel")}
						attributes={contentAreaThumbsBorderRadius}
						attributesKey={"contentAreaThumbsBorderRadius"}
						setAttributes={setAttributes}
						defaultValue={{ unit: "px", value: 1 }}
					/>
				</>
			)}
			{![
				"post-slider",
				"post-slider-two",
				// 'post-thumbnail-slider',
				// 'thumbnail-slider-two',
				"post-grid-five",
			].includes(blockName) &&
				imagePosition !== "background" &&
				imageOverlayType !== "box" && (
					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={postCardPadding}
						attributesKey={"postCardPadding"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "0",
								left: "0",
							},
						}}
					/>
				)}
			{[
				"sp-smart-post-list-two-layout-one",
				"sp-smart-post-list-two-layout-two",
				"sp-smart-post-list-two-layout-five",
				"sp-smart-post-list-two-layout-six",
				"sp-smart-post-list-three-layout-three",
				"sp-smart-post-list-three-layout-four",
			].includes(postListLayout) && (
				<Spacing
					label={__("Large Item Padding", "post-carousel")}
					attributes={largeItemPadding}
					attributesKey={"largeItemPadding"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{
						unit: "px",
						value: {
							top: "30",
							right: "30",
							bottom: "30",
							left: "30",
						},
					}}
				/>
			)}
			{"thumbnail-slider-two" !== blockName && (
				<Spacing
					label={__("Inner Padding", "post-carousel")}
					attributes={contentAreaPadding}
					attributesKey={"contentAreaPadding"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{
						unit: "px",
						value: {
							top: "8",
							right: "16",
							bottom: "8",
							left: "16",
						},
					}}
				/>
			)}
			{["post-grid-six"].includes(blockName) && (
				<Spacing
					label={__("Large Item Inner Padding", "post-carousel")}
					attributes={largeContentAreaPadding}
					attributesKey={"largeContentAreaPadding"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{
						unit: "px",
						value: {
							top: "8",
							right: "16",
							bottom: "8",
							left: "16",
						},
					}}
				/>
			)}
			{![
				"post-slider",
				"post-slider-two",
				"post-grid-four",
				// 'thumbnail-slider-two',
			].includes(blockName) && (
				<>
					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={contentAreaMargin}
						attributesKey={"contentAreaMargin"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "0",
								left: "0",
							},
						}}
					/>
				</>
			)}
		</>
	);
};

export const TitleStyleTab = ({ attributes, setAttributes }) => {
	const [colorState, setColorState] = useState("normal");
	const {
		blockName,
		titleColor,
		titleMargin,
		titleTypography,
		titleFontSize,
		titleLatterSpacing,
		titleLineHeight,
		largeItemTitleColor,
		largeItemTitleLineHeight,
		largeItemTitleLatterSpacing,
		largeItemTitleFontSize,
		largeItemTitleTypography,
		blockLayoutName,
		thumbnailItemsTitleColor,
		titleWordSpacing,
		largeItemTitleWordSpacing,
		titleGlobalTypography,
		largeItemTitleGlobalTypography,
		postBadgesTypography,
		postBadgesFontSize,
		postBadgesLineHeight,
		postBadgesLetterSpacing,
		postBadgesWordSpacing,
		postBadgesGlobalTypography,
		badgesLabelColor,
		badgesBgColor,
		badgesBorder,
		badgesBorderWidth,
		badgesBorderRadius,
		badgesPadding,
		titleUnderlineEffect,
		titleEffect,
		titleEffectColor,
		postBadgesShow,
	} = attributes;

	const defaultValues = useDefaultValue(blockName);

	const underLineDirections = [
		{ label: "Left to Right", value: "leftToRight" },
		{ label: "Right to Left", value: "rightToLeft" },
		{ label: "Start Centered", value: "startCentered" },
	];

	const topBottomDirections = [
		{ label: "Left to Right", value: "leftToRight" },
		{ label: "Right to Left", value: "rightToLeft" },
		{ label: "Start Centered", value: "startCentered" },
		{ label: "Opposite Start", value: "oppositeStart" },
		{ label: "Opposite Start Reversed", value: "oppositeStartReversed" },
	];

	return (
		<>
			<TypographyNew
				attributes={{
					family: titleTypography,
					familyKey: "titleTypography",
					fontSize: titleFontSize,
					fontSizeKey: "titleFontSize",
					fontSpacing: titleLatterSpacing,
					fontSpacingKey: "titleLatterSpacing",
					lineHeight: titleLineHeight,
					lineHeightKey: "titleLineHeight",
					wordSpacing: titleWordSpacing,
					wordSpacingKey: "titleWordSpacing",
					globalTypo: titleGlobalTypography,
					globalTypoKey: "titleGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: defaultValues?.titleFontSize,
				}}
				lineDefaultValue={1.25}
				typographyLabel={
					blockName === "thumbnail-slider-two"
						? __("Thumb Typography", "post-carousel")
						: __("Typography", "post-carousel")
				}
				fontSizePresetType={"heading"}
			/>
			{/* <TypographyNew
				attributes={{
					family: postBadgesTypography,
					familyKey: "postBadgesTypography",
					fontSize: postBadgesFontSize,
					fontSizeKey: "postBadgesFontSize",
					fontSpacing: postBadgesLetterSpacing,
					fontSpacingKey: "postBadgesLetterSpacing",
					lineHeight: postBadgesLineHeight,
					lineHeightKey: "postBadgesLineHeight",
					wordSpacing: postBadgesWordSpacing,
					wordSpacingKey: "postBadgesWordSpacing",
					globalTypo: postBadgesGlobalTypography,
					globalTypoKey: "postBadgesGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{
					unit: "px",
					value: defaultValues?.badgesFontSize,
				}}
				lineDefaultValue={1.25}
				typographyLabel={__("Badges Typography", "post-carousel")}
				fontSizePresetType={"heading"}
			/> */}
			{[
				"post-grid-one",
				"post-grid-six",
				"post-grid-three",
				"post-grid-four",
				"post-grid-five",
				"post-list-two",
				"post-list-three",
				"thumbnail-slider-two",
			].includes(blockName) &&
				!["grid-one-layout-one", "grid-one-layout-five"].includes(blockLayoutName) && (
					<TypographyNew
						attributes={{
							family: largeItemTitleTypography,
							familyKey: "largeItemTitleTypography",
							fontSize: largeItemTitleFontSize,
							fontSizeKey: "largeItemTitleFontSize",
							fontSpacing: largeItemTitleLatterSpacing,
							fontSpacingKey: "largeItemTitleLatterSpacing",
							lineHeight: largeItemTitleLineHeight,
							lineHeightKey: "largeItemTitleLineHeight",
							wordSpacing: largeItemTitleWordSpacing,
							wordSpacingKey: "largeItemTitleWordSpacing",
							globalTypo: largeItemTitleGlobalTypography,
							globalTypoKey: "largeItemTitleGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{
							unit: "px",
							value: defaultValues?.largeItemTitleFontSize,
						}}
						typographyLabel="Large Item Typography"
						fontSizePresetType={"heading"}
					/>
				)}
			<SPToggleGroupControl
				attributes={colorState}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(newColor) => setColorState(newColor)}
			/>
			{"normal" === colorState ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={titleColor.color}
						onChange={(newColor) =>
							setAttributes({
								titleColor: { ...titleColor, color: newColor },
							})
						}
						defaultColor=""
					/>
					{["post-grid-six", "post-list-two", "post-list-three", "thumbnail-slider-two"].includes(
						blockName
					) && (
						<SpColorPicker
							label={__("Large Items Color", "post-carousel")}
							value={largeItemTitleColor.color}
							onChange={(newColor) =>
								setAttributes({
									largeItemTitleColor: {
										...largeItemTitleColor,
										color: newColor,
									},
								})
							}
							defaultColor={defaultValues?.metaColor}
						/>
					)}
					{blockLayoutName &&
						inArray(["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"], blockLayoutName) && (
							<SpColorPicker
								label={__("Thumbnails Color", "post-carousel")}
								value={thumbnailItemsTitleColor.color}
								onChange={(newColor) =>
									setAttributes({
										thumbnailItemsTitleColor: {
											...thumbnailItemsTitleColor,
											color: newColor,
										},
									})
								}
								defaultColor="#FFFFFF"
							/>
						)}
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={titleColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								titleColor: {
									...titleColor,
									hoverColor: newColor,
								},
							})
						}
					/>
					{["post-grid-six", "post-list-two", "post-list-three", "thumbnail-slider-two"].includes(
						blockName
					) && (
						<SpColorPicker
							label={__("Large Items Hover Color", "post-carousel")}
							value={largeItemTitleColor.hoverColor}
							onChange={(newColor) =>
								setAttributes({
									largeItemTitleColor: {
										...largeItemTitleColor,
										hoverColor: newColor,
									},
								})
							}
						/>
					)}
					{blockLayoutName &&
						inArray(["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"], blockLayoutName) && (
							<SpColorPicker
								label={__("Thumbnails Hover Color", "post-carousel")}
								value={thumbnailItemsTitleColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										thumbnailItemsTitleColor: {
											...thumbnailItemsTitleColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#FFFFFF"
							/>
						)}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} color="#bcbcbc" />

			{[
				"post-carousel-two",
				"post-grid-two",
				"post-grid-three",
				"post-grid-four",
				"post-grid-five",
				"post-grid-six",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
				"post-timeline-two",
			].includes(blockName) && (
				<>
					<SelectField
						label={__("Hover Effect", "post-carousel")}
						attributes={titleEffect}
						attributesKey={"titleEffect"}
						setAttributes={setAttributes}
						items={[
							{ label: "None", value: "none" },
							{ 
								label: "Underline (Pro)", 
								value: "underline",
								disabled: "disabled"
							},
							{
								label: "Top-Bottom Line (Pro)",
								value: "topBottomLine",
								disabled: "disabled"
							},
							{
								label: "Background Fill (Pro)",
								value: "backgroundFill",
								disabled: "disabled"
							},
						]}
					/>
					{(titleEffect === "underline" || titleEffect === "topBottomLine") && (
						<SelectField
							label={__("Direction", "post-carousel")}
							attributes={titleUnderlineEffect}
							attributesKey={"titleUnderlineEffect"}
							setAttributes={setAttributes}
							items={titleEffect === "underline" ? underLineDirections : topBottomDirections}
						/>
					)}

					<SpColorPicker
						label={__("Hover Effect Color", "post-carousel")}
						value={titleEffectColor}
						onChange={(newColor) =>
							setAttributes({
								titleEffectColor: newColor,
							})
						}
						defaultColor="#FFFFFF"
					/>
				</>
			)}

			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={titleMargin}
				attributesKey={"titleMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "",
						right: "",
						bottom: "",
						left: "",
					},
				}}
			/>
			{postBadgesShow && (
				<Popup
					label={__("Badges Style", "post-carousel")}
					divClassName="sp-smart-post-title-badges-style-tab-wrapper"
				>
					<TitleBadgesStyleTab
						attributes={{
							badgesLabelColor,
							badgesBgColor,
							badgesBorder,
							badgesBorderWidth,
							badgesBorderRadius,
							badgesPadding,
						}}
						setAttributes={setAttributes}
					/>
				</Popup>
			)}
		</>
	);
};
export const TitleBadgesStyleTab = ({ attributes, setAttributes }) => {
	const { badgesLabelColor, badgesBgColor, badgesBorder, badgesBorderWidth, badgesBorderRadius, badgesPadding } =
		attributes;
	return (
		<>
			<SpColorPicker
				label={__("Label Color", "post-carousel")}
				value={badgesLabelColor}
				onChange={(newColor) => {
					setAttributes({ badgesLabelColor: newColor });
				}}
			/>
			<SpColorPicker
				label={__("Background Color", "post-carousel")}
				value={badgesBgColor}
				onChange={(newColor) => {
					setAttributes({ badgesBgColor: newColor });
				}}
			/>
			<Border
				label={__("Border", "post-carousel")}
				attributes={{
					border: badgesBorder,
					borderWidth: badgesBorderWidth,
				}}
				attributesKey={{
					border: "badgesBorder",
					borderWidth: "badgesBorderWidth",
				}}
				setAttributes={setAttributes}
				btnType="normal"
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={badgesBorderRadius}
				attributesKey={"badgesBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 4,
						right: 4,
						bottom: 4,
						left: 4,
					},
				}}
				indicator={"radius"}
			/>
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={badgesPadding}
				attributesKey={"badgesPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 4,
						right: 8,
						bottom: 4,
						left: 8,
					},
				}}
			/>
		</>
	);
};
export const MetaDataStyleTab = ({ attributes, setAttributes }) => {
	const [metadataColorState, setMetadataColorState] = useState("normal");
	const {
		metaTypography,
		metaFontSize,
		metaFontSpacing,
		metaLineHeight,
		metaColors,
		metaSeparator,
		metaSeparatorColor,
		metaSpaceBetween,
		metadataMargin,
		metaLargeTypography,
		metaLargeFontSize,
		metaLargeFontSpacing,
		metaLargeLineHeight,
		largeMetaColors,
		blockName,
		metaRowGap,
		metaWordSpacing,
		metaLargeWordSpacing,
		metaGlobalTypography,
	} = attributes;

	const defaultValues = useDefaultValue(blockName);

	return (
		<>
			<TypographyNew
				attributes={{
					family: metaTypography,
					familyKey: "metaTypography",
					fontSize: metaFontSize,
					fontSizeKey: "metaFontSize",
					fontSpacing: metaFontSpacing,
					fontSpacingKey: "metaFontSpacing",
					lineHeight: metaLineHeight,
					lineHeightKey: "metaLineHeight",
					wordSpacing: metaWordSpacing,
					wordSpacingKey: "metaWordSpacing",
					globalTypo: metaGlobalTypography,
					globalTypoKey: "metaGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 14 }}
			/>
			{["post-grid-six", "post-grid-four", "post-grid-five"].includes(blockName) && (
				<TypographyNew
					attributes={{
						family: metaLargeTypography,
						familyKey: "metaLargeTypography",
						fontSize: metaLargeFontSize,
						fontSizeKey: "metaLargeFontSize",
						fontSpacing: metaLargeFontSpacing,
						fontSpacingKey: "metaLargeFontSpacing",
						lineHeight: metaLargeLineHeight,
						lineHeightKey: "metaLargeLineHeight",
						wordSpacing: metaLargeWordSpacing,
						wordSpacingKey: "metaLargeWordSpacing",
					}}
					setAttributes={setAttributes}
					spacingDefaultValue={{ unit: "px", value: 0 }}
					fontSizeDefault={{ unit: "px", value: 18 }}
					lineDefaultValue={{ unit: "px", value: 26 }}
					typographyLabel={__("Large Item(s) Typography", "post-carousel")}
				/>
			)}
			<SPToggleGroupControl
				attributes={metadataColorState}
				items={[
					{ label: "Normal", value: "normal" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(newColor) => setMetadataColorState(newColor)}
			/>
			{"normal" === metadataColorState ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={metaColors.color}
						onChange={(newColor) =>
							setAttributes({
								metaColors: { ...metaColors, color: newColor },
							})
						}
						defaultColor="#333333"
					/>
					{["post-grid-six", "post-list-two", "post-list-three"].includes(blockName) && (
						<SpColorPicker
							label={__("Large Items Color", "post-carousel")}
							value={largeMetaColors.color}
							onChange={(newColor) =>
								setAttributes({
									largeMetaColors: {
										...largeMetaColors,
										color: newColor,
									},
								})
							}
							defaultColor={defaultValues?.metaColor}
						/>
					)}
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Hover Color", "post-carousel")}
						value={metaColors.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								metaColors: {
									...metaColors,
									hoverColor: newColor,
								},
							})
						}
					/>
					{["post-grid-six", "post-list-two", "post-list-three"].includes(blockName) && (
						<SpColorPicker
							label={__("Large Items Hover Color", "post-carousel")}
							value={largeMetaColors.hoverColor}
							onChange={(newColor) =>
								setAttributes({
									largeMetaColors: {
										...largeMetaColors,
										hoverColor: newColor,
									},
								})
							}
							defaultColor={defaultValues?.metaColor}
						/>
					)}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<SelectField
				label={__("Separator", "post-carousel")}
				attributes={metaSeparator}
				attributesKey={"metaSeparator"}
				setAttributes={setAttributes}
				items={[
					{
						label: "Select a Separator",
						value: "",
						disabled: "disabled",
					},
					{ label: "Normal Space", value: "normal-space" },
					{ label: "Full Stop ( . )", value: "full-stop" },
					{ label: "Straight Line ( | )", value: "straight-line" },
					{ label: "Slash ( / )", value: "slash" },
					{ label: `Back Slash ( \\ )`, value: "back-slash" },
				]}
			/>
			{metaSeparator !== "normal-space" && (
				<SpColorPicker
					label={__("Separator Color", "post-carousel")}
					value={metaSeparatorColor}
					onChange={(newColor) => setAttributes({ metaSeparatorColor: newColor })}
					defaultColor="#333333"
				/>
			)}
			<SPRangeControl
				label={__("Space Between Meta Data", "post-carousel")}
				attributes={metaSpaceBetween}
				attributesKey={"metaSpaceBetween"}
				setAttributes={setAttributes}
				resetIcon={true}
				max={50}
				defaultValue={{ unit: "px", value: 12 }}
			/>
			<SPRangeControl
				label={__("Meta Data Row Gap", "post-carousel")}
				attributes={metaRowGap}
				attributesKey={"metaRowGap"}
				setAttributes={setAttributes}
				resetIcon={true}
				max={50}
				defaultValue={{ unit: "px", value: 8 }}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={metadataMargin}
				attributesKey={"metadataMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "0",
						right: "0",
						bottom: "8",
						left: "0",
					},
				}}
			/>
		</>
	);
};
export const ExcerptStyleTab = ({ attributes, setAttributes }) => {
	const {
		excerptTypography,
		excerptFontSize,
		excerptFontSpacing,
		excerptLineHeight,
		excerptColor,
		excerptMargin,
		blockName,
		largeExcerptColor,
		excerptWordSpacing,
		excerptGlobalTypography,
	} = attributes;
	return (
		<>
			<TypographyNew
				attributes={{
					family: excerptTypography,
					familyKey: "excerptTypography",
					fontSize: excerptFontSize,
					fontSizeKey: "excerptFontSize",
					fontSpacing: excerptFontSpacing,
					fontSpacingKey: "excerptFontSpacing",
					lineHeight: excerptLineHeight,
					lineHeightKey: "excerptLineHeight",
					wordSpacing: excerptWordSpacing,
					wordSpacingKey: "excerptWordSpacing",
					globalTypo: excerptGlobalTypography,
					globalTypoKey: "excerptGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 18 }}
			/>

			<SpColorPicker
				label={__("Color", "post-carousel")}
				value={excerptColor.color}
				onChange={(newColor) =>
					setAttributes({
						excerptColor: {
							...excerptColor,
							color: newColor,
						},
					})
				}
				defaultColor="#4E4F52"
			/>
			{["post-list-two", "post-list-three"].includes(blockName) && (
				<SpColorPicker
					label={__("Large Item Color", "post-carousel")}
					value={largeExcerptColor.color}
					onChange={(newColor) =>
						setAttributes({
							largeExcerptColor: {
								...largeExcerptColor,
								color: newColor,
							},
						})
					}
					defaultColor=""
				/>
			)}
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={excerptMargin}
				attributesKey={"excerptMargin"}
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
		</>
	);
};
export const ReadMoreStyleTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		readMoreButtonTypography,
		readMoreButtonFontSize,
		readMoreButtonFontSpacing,
		readMoreButtonLineHeight,
		readMoreIconStyle,
		readMoreColor,
		readMoreBg,
		readMoreButtonBorderRadius,
		readMoreButtonPadding,
		readMoreButtonMargin,
		readMoreButtonBorder,
		readMoreButtonBorderWidth,
		largeItemReadMoreColor,
		largeItemReadMoreBg,
		largeItemReadMoreButtonBorder,
		largeItemReadMoreButtonBorderWidth,
		readMoreIconGap,
		readMoreTextColor,
		readMoreButtonType,
		readMoreButtonWordSpacing,
		readMoreButtonBorderWidthHover,
		largeItemReadMoreBtnBorderWidthHover,
		readMoreButtonBorderRadiusHover,
		readMoreIocVisibility,
		readMoreButtonGlobalTypography,
	} = attributes;
	const [readMoreButtonStyleType, setReadMoreButtonStyleType] = useState("color");
	return (
		<>
			<TypographyNew
				attributes={{
					family: readMoreButtonTypography,
					familyKey: "readMoreButtonTypography",
					fontSize: readMoreButtonFontSize,
					fontSizeKey: "readMoreButtonFontSize",
					fontSpacing: readMoreButtonFontSpacing,
					fontSpacingKey: "readMoreButtonFontSpacing",
					lineHeight: readMoreButtonLineHeight,
					lineHeightKey: "readMoreButtonLineHeight",
					wordSpacing: readMoreButtonWordSpacing,
					wordSpacingKey: "readMoreButtonWordSpacing",
					globalTypo: readMoreButtonGlobalTypography,
					globalTypoKey: "readMoreButtonGlobalTypography",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 18 }}
			/>
			{/* <Toggle
				label={ __( 'Icon Always', 'post-carousel' ) }
				attributes={ showReadMoreIcon }
				setAttributes={ setAttributes }
				attributesKey={ 'showReadMoreIcon' }
			/>
			<Toggle
				label={ __( 'Icon on Hover', 'post-carousel' ) }
				attributes={ showReadMoreIconHover }
				setAttributes={ setAttributes }
				attributesKey={ 'showReadMoreIconHover' }
			/> */}
			<SPToggleGroupControl
				label={__("Icon Visibility", "post-carousel")}
				attributes={readMoreIocVisibility}
				attributesKey={"readMoreIocVisibility"}
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: "Always", value: "always", disabled: "disabled" },
					{ label: "Hover", value: "hover", disabled: "disabled" },
				]}
			/>
			{["always", "hover"].includes(readMoreIocVisibility) && (
				<>
					<SelectDropdown
						label={__("Icon Style", "post-carousel")}
						attributes={readMoreIconStyle}
						attributesKey={"readMoreIconStyle"}
						setAttributes={setAttributes}
						options={[
							{
								label: "Chevron Solid",
								value: "right-open",
								icon: <i className="sp-icon-right-open"></i>,
							},
							{
								label: "Arrow Solid",
								value: "right-one",
								icon: <i className="sp-icon-right-one"></i>,
							},
							{
								label: "Chevron Outline",
								value: "right-open-outline",
								icon: <i className="sp-icon-right-open-outline"></i>,
							},
							{
								label: "Arrow Minimal",
								value: "arrow-right-solid",
								icon: <i className="sp-icon-arrow-right-solid"></i>,
							},
							{
								label: "Double Chevron",
								value: "angles-right-solid",
								icon: <i className="sp-icon-angles-right-solid"></i>,
							},
						]}
					/>
					<SPRangeControl
						label={__("Icon Gap", "post-carousel")}
						attributes={readMoreIconGap}
						attributesKey={"readMoreIconGap"}
						setAttributes={setAttributes}
						units={["px"]}
						max={50}
						defaultValue={{ unit: "px", value: 4 }}
					/>
				</>
			)}
			<SPToggleGroupControl
				attributes={readMoreButtonStyleType}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(val) => setReadMoreButtonStyleType(val)}
			/>
			{"color" === readMoreButtonStyleType ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={readMoreColor.color}
						onChange={(newColor) =>
							setAttributes({
								readMoreColor: {
									...readMoreColor,
									color: newColor,
								},
							})
						}
						defaultColor="#4E4F52"
					/>
					{["post-list-two"].includes(blockName) && (
						<SpColorPicker
							label={__("Text Link Color", "post-carousel")}
							value={readMoreTextColor.color}
							onChange={(newColor) =>
								setAttributes({
									readMoreTextColor: {
										...readMoreTextColor,
										color: newColor,
									},
								})
							}
							defaultColor="#4E4F52"
						/>
					)}
					{/* { [ 'post-grid-six' ].includes( blockName ) && (
						<>
							<SpColorPicker
								label={ __(
									'Large Item Color',
									'post-carousel'
								) }
								value={ largeItemReadMoreColor.color }
								onChange={ ( newColor ) =>
									setAttributes( {
										largeItemReadMoreColor: {
											...largeItemReadMoreColor,
											color: newColor,
										},
									} )
								}
								defaultColor="#4E4F52"
							/>
						</>
					) } */}
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={readMoreColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								readMoreColor: {
									...readMoreColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor="#FFFFFF"
					/>
					{["post-list-two"].includes(blockName) && (
						<SpColorPicker
							label={__("Text Link Color", "post-carousel")}
							value={readMoreTextColor.hover}
							onChange={(newColor) =>
								setAttributes({
									readMoreTextColor: {
										...readMoreTextColor,
										hover: newColor,
									},
								})
							}
							defaultColor="#4E4F52"
						/>
					)}
					{/* { [ 'post-grid-six' ].includes( blockName ) && (
						<>
							<SpColorPicker
								label={ __(
									'Large Item Color',
									'post-carousel'
								) }
								value={ largeItemReadMoreColor.hoverColor }
								onChange={ ( newColor ) =>
									setAttributes( {
										largeItemReadMoreColor: {
											...largeItemReadMoreColor,
											hoverColor: newColor,
										},
									} )
								}
								defaultColor="#FFFFFF"
							/>
						</>
					) } */}
				</>
			)}
			{readMoreButtonType !== "link" && (
				<>
					<Background
						label={__("Background Type", "post-carousel")}
						colorLabel="Solid Color"
						defaultColor={readMoreButtonStyleType === "color" ? "#FFFFFF" : "#333333"}
						attributes={readMoreBg}
						attributesKey={"readMoreBg"}
						setAttributes={setAttributes}
						colorType={readMoreButtonStyleType}
						items={[
							{
								label: <TransparentIcon />,
								value: "transparent",
								tooltip: "Transparent",
							},
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
					{/* { [ 'post-grid-six' ].includes( blockName ) && (
						<Background
							label={ __(
								'Large Item Background Type',
								'smart-post-show'
							) }
							colorLabel="Solid Color"
							defaultColor={
								readMoreButtonStyleType === 'color'
									? '#FFFFFF'
									: '#333333'
							}
							attributes={ largeItemReadMoreBg }
							attributesKey={ 'largeItemReadMoreBg' }
							setAttributes={ setAttributes }
							colorType={ readMoreButtonStyleType }
							items={ [
								{
									label: <TransparentIcon />,
									value: 'transparent',
									tooltip: 'Transparent',
								},
								{
									label: <BgIcon />,
									value: 'bgColor',
									tooltip: 'Solid',
								},
								{
									label: <GradientIcon />,
									value: 'gradient',
									tooltip: 'Gradient',
								},
							] }
						/>
					) } */}
					{"color" === readMoreButtonStyleType ? (
						<>
							<Border
								attributes={{
									border: readMoreButtonBorder,
									borderWidth: readMoreButtonBorderWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "readMoreButtonBorder",
									borderWidth: "readMoreButtonBorderWidth",
								}}
								defaultColor={{
									color: "#333333",
								}}
								btnType={"normal"}
							/>
							{/* { [ 'post-grid-six' ].includes( blockName ) && (
						<Border
							label={ 'Large Item Border' }
							attributes={ {
								border: largeItemReadMoreButtonBorder,
								borderWidth: largeItemReadMoreButtonBorderWidth,
							} }
							setAttributes={ setAttributes }
							attributesKey={ {
								border: 'largeItemReadMoreButtonBorder',
								borderWidth:
									'largeItemReadMoreButtonBorderWidth',
							} }
							btnType={'normal'}
							defaultColor={ {
								color: '#333333',
							} }
						/>
					) } */}
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={readMoreButtonBorderRadius}
								attributesKey={"readMoreButtonBorderRadius"}
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
						</>
					) : (
						<>
							<Border
								attributes={{
									border: readMoreButtonBorder,
									borderWidth: readMoreButtonBorderWidthHover,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "readMoreButtonBorder",
									borderWidth: "readMoreButtonBorderWidthHover",
								}}
								btnType={"hover"}
							/>
							{/* { [ 'post-grid-six' ].includes( blockName ) && (
							<Border
								label={ 'Large Item Border' }
								attributes={ {
									border: largeItemReadMoreButtonBorder,
									borderWidth: largeItemReadMoreBtnBorderWidthHover,
								} }
								setAttributes={ setAttributes }
								attributesKey={ {
									border: 'largeItemReadMoreButtonBorder',
									borderWidth:
										'largeItemReadMoreBtnBorderWidthHover',
								} }
								btnType={'hover'}
								defaultColor={ {
									color: '#333333',
								} }
							/>
						) } */}
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={readMoreButtonBorderRadiusHover}
								attributesKey={"readMoreButtonBorderRadiusHover"}
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
						</>
					)}
					<Divider position={"sp-w-100pct bottom"} />
					<Spacing
						label={__("Padding", "post-carousel")}
						attributes={readMoreButtonPadding}
						attributesKey={"readMoreButtonPadding"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: {
								top: 8,
								right: 8,
								bottom: 8,
								left: 12,
							},
						}}
					/>
				</>
			)}
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={readMoreButtonMargin}
				attributesKey={"readMoreButtonMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 8,
						right: 0,
						bottom: 8,
						left: 0,
					},
				}}
			/>
		</>
	);
};
export const SocialShareStyleTab = ({ attributes, setAttributes }) => {
	const {
		socialShareIconSize,
		socialShareIconType,
		socialShareCustomColor,
		socialShareCustomBgColor,
		socialShareBorderRadius,
		socialShareSpaceBetween,
		// socialShareHeight,
		// socialShareWidth,
		socialShareMargin,
		// socialIconOnly,
		socialShareBorder,
		socialShareBorderWidth,
		socialSharePadding,
		socialIconDisplayType,
		socialPopupShareColor,
		socialPopupShareBGColor,
		socialPopupCountColor,
		socialPopupContainerBGColor,
		socialSharePopupBorder,
		socialSharePopupBorderWidth,
		socialSharePopupBorderRadius,
		socialShareBoxShadow,
		socialShareBoxShadowValue,
		socialPopupBoxShadow,
		socialPopupBoxShadowValue,
		socialPopupPadding,
		socialShareIconPosition,
	} = attributes;
	const [socialColorState, setSocialColorState] = useState("color");
	const [popupColorState, setPopupColorState] = useState("color");

	return (
		<>
			{/* { 'original' === socialShareIconType && (
				<>
					<Toggle
						label={ __( 'Icon Only', 'post-carousel' ) }
						attributes={ socialIconOnly ) }
						attributesKey={ 'socialIconOnly' }
						setAttributes={ setAttributes }
					/>
				</>
			) } */}
			<SPRangeControl
				label={__("Icon Size", "post-carousel")}
				attributes={socialShareIconSize}
				attributesKey={"socialShareIconSize"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				defaultValue={{
					unit: "px",
					value: 16,
				}}
				max={60}
			/>
			<SPToggleGroupControl
				label={__("Icon Type", "post-carousel")}
				attributes={socialShareIconType}
				attributesKey={"socialShareIconType"}
				setAttributes={setAttributes}
				items={[
					{ label: "Original", value: "original" },
					{ label: "Custom (Pro)", value: "custom", disabled: "disabled" },
				]}
			/>

			{/* { ( ! socialIconOnly || 'custom' === socialShareIconType ) && (
				<>
					<SPRangeControl
						label={ __( 'Height', 'post-carousel' ) }
						attributes={ socialShareHeight }
						attributesKey={ 'socialShareHeight' }
						setAttributes={ setAttributes }
						units={ [ 'px', '%', 'Em' ] }
						max={ 60 }
						defaultValue={ {
							unit: 'px',
							value: 30,
						} }
					/>
					<SPRangeControl
						label={ __( 'Width', 'post-carousel' ) }
						attributes={ socialShareWidth }
						attributesKey={ 'socialShareWidth' }
						setAttributes={ setAttributes }
						units={ [ 'px', '%', 'Em' ] }
						max={ 60 }
						defaultValue={ {
							unit: 'px',
							value: 30,
						} }
					/>
				</>
			) } */}
			{socialShareIconType && ("custom" === socialShareIconType || "popup-share" === socialIconDisplayType) && (
				<>
					<SPToggleGroupControl
						attributes={socialColorState}
						items={[
							{ label: "Normal", value: "color" },
							{ label: "Hover", value: "hover" },
						]}
						onClick={(val) => setSocialColorState(val)}
					/>
				</>
			)}
			{socialColorState === "color" ? (
				<>
					{"custom" === socialShareIconType && (
						<>
							<SpColorPicker
								label={__("Social Icon Color", "post-carousel")}
								value={socialShareCustomColor.color}
								onChange={(newColor) =>
									setAttributes({
										socialShareCustomColor: {
											...socialShareCustomColor,
											color: newColor,
										},
									})
								}
								defaultColor="#FFFFFF"
							/>
							<SpColorPicker
								label={__("Social Background Color", "post-carousel")}
								value={socialShareCustomBgColor.color}
								onChange={(newColor) =>
									setAttributes({
										socialShareCustomBgColor: {
											...socialShareCustomBgColor,
											color: newColor,
										},
									})
								}
								defaultColor="#4e4f52"
							/>
						</>
					)}
					{"popup-share" === socialIconDisplayType && (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={socialPopupShareColor.color}
								onChange={(newColor) =>
									setAttributes({
										socialPopupShareColor: {
											...socialPopupShareColor,
											color: newColor,
										},
									})
								}
							/>
							{/* <SpColorPicker
					label={__("Background Color t", "post-carousel")}
					value={socialPopupShareBGColor.color}
					onChange={(newColor) =>
					setAttributes({
						socialPopupShareBGColor: {
						...socialPopupShareBGColor,
						color: newColor,
						},
					})
					}
				/> */}
							<SpColorPicker
								label={__("Popup Background Color", "post-carousel")}
								value={socialPopupContainerBGColor.color}
								onChange={(newColor) =>
									setAttributes({
										socialPopupContainerBGColor: {
											...socialPopupContainerBGColor,
											color: newColor,
										},
									})
								}
							/>
						</>
					)}
				</>
			) : (
				<>
					{"custom" === socialShareIconType && (
						<>
							<SpColorPicker
								label={__("Social Icon Color", "post-carousel")}
								value={socialShareCustomColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										socialShareCustomColor: {
											...socialShareCustomColor,
											hoverColor: newColor,
										},
									})
								}
							/>
							<SpColorPicker
								label={__("Social Background Color", "post-carousel")}
								value={socialShareCustomBgColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										socialShareCustomBgColor: {
											...socialShareCustomBgColor,
											hoverColor: newColor,
										},
									})
								}
							/>
						</>
					)}
					{"popup-share" === socialIconDisplayType && (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={socialPopupShareColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										socialPopupShareColor: {
											...socialPopupShareColor,
											hoverColor: newColor,
										},
									})
								}
							/>
							{/* <SpColorPicker
					label={__("Background Color", "post-carousel")}
					value={socialPopupShareBGColor.hoverColor}
					onChange={(newColor) =>
					setAttributes({
						socialPopupShareBGColor: {
						...socialPopupShareBGColor,
						hoverColor: newColor,
						},
					})
					}
				/> */}
							{/* <SpColorPicker
								label={ __(
									'PopupBackground Color',
									'post-carousel'
								) }
								value={ socialPopupContainerBGColor.hoverColor }
								onChange={ ( newColor ) =>
									setAttributes( {
										socialPopupContainerBGColor: {
											...socialPopupContainerBGColor,
											hoverColor: newColor,
										},
									} )
								}
							/> */}
						</>
					)}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Border
				label={"Border"}
				attributes={{
					border: socialShareBorder,
					borderWidth: socialShareBorderWidth,
				}}
				setAttributes={setAttributes}
				attributesKey={{
					border: "socialShareBorder",
					borderWidth: "socialShareBorderWidth",
				}}
			/>
			{"popup-share" === socialIconDisplayType && (
				<Border
					label={__("Popup Border", "post-carousel")}
					attributes={{
						border: socialSharePopupBorder,
						borderWidth: socialSharePopupBorderWidth,
					}}
					setAttributes={setAttributes}
					attributesKey={{
						border: "socialSharePopupBorder",
						borderWidth: "socialSharePopupBorderWidth",
					}}
				/>
			)}
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={socialShareBorderRadius}
				attributesKey={"socialShareBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
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
			{"popup-share" === socialIconDisplayType && (
				<Spacing
					label={__("Popup Border Radius", "post-carousel")}
					attributes={socialSharePopupBorderRadius}
					attributesKey={"socialSharePopupBorderRadius"}
					setAttributes={setAttributes}
					units={["px", "%", "Em"]}
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
				/>
			)}
			{"popup-share" !== socialIconDisplayType && (
				<SPRangeControl
					label={__("Space Between Icon", "post-carousel")}
					attributes={socialShareSpaceBetween}
					attributesKey={"socialShareSpaceBetween"}
					setAttributes={setAttributes}
					units={["px"]}
					max={60}
					defaultValue={{
						unit: "px",
						value: 8,
					}}
				/>
			)}
			{"popup-share" === socialIconDisplayType && (
				<>
					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={socialShareBoxShadow}
						attributesKey={"socialShareBoxShadow"}
						setAttributes={setAttributes}
					/>
					{socialShareBoxShadow && (
						<BoxShadow
							label={__("Box Shadow Value", "post-carousel")}
							attributes={socialShareBoxShadowValue}
							attributesKey={"socialShareBoxShadowValue"}
							setAttributes={setAttributes}
						/>
					)}
					<Toggle
						label={__("Popup Box Shadow", "post-carousel")}
						attributes={socialPopupBoxShadow}
						attributesKey={"socialPopupBoxShadow"}
						setAttributes={setAttributes}
					/>
					{socialPopupBoxShadow && (
						<BoxShadow
							label={__("Popup Box Shadow Value", "post-carousel")}
							attributes={socialPopupBoxShadowValue}
							attributesKey={"socialPopupBoxShadowValue"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={socialSharePadding}
				attributesKey={"socialSharePadding"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 8,
						right: 8,
						bottom: 8,
						left: 8,
					},
				}}
			/>
			{"popup-share" === socialIconDisplayType && (
				<Spacing
					label={__("Popup Padding", "post-carousel")}
					attributes={socialPopupPadding}
					attributesKey={"socialPopupPadding"}
					setAttributes={setAttributes}
					units={["px", "%", "Em"]}
					defaultValue={{
						unit: "px",
						value: {
							top: 8,
							right: 8,
							bottom: 8,
							left: 8,
						},
					}}
				/>
			)}
			{("over-thumbnail" === socialShareIconPosition || "inline-icon" === socialIconDisplayType) && (
				<Spacing
					label={__("Margin", "post-carousel")}
					attributes={socialShareMargin}
					attributesKey={"socialShareMargin"}
					setAttributes={setAttributes}
					units={["px", "%", "Em"]}
					defaultValue={{
						unit: "px",
						value: {
							top: 4,
							right: 0,
							bottom: 0,
							left: 0,
						},
					}}
				/>
			)}
		</>
	);
};
export const AdvancedStyleTab = ({ attributes, setAttributes }) => {
	const {
		advancedBg,
		advancedBorderStyle,
		advancedBorderStyleWidth,
		advancedBorderRadius,
		advancedPadding,
		advancedMargin,
		advancedBoxShadow,
		advancedBoxShadowEnable,
		advancedBorderStyleWidthHover,
		advancedBorderRadiusHover,
		blockName,
	} = attributes;
	const [advancedButtonStyleType, setAdvancedButtonStyleType] = useState("color");

	return (
		<>
			<SPToggleGroupControl
				attributes={advancedButtonStyleType}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(val) => setAdvancedButtonStyleType(val)}
			/>
			<Background
				label={__("Background Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor="#E9F4FF"
				attributes={advancedBg}
				attributesKey={"advancedBg"}
				setAttributes={setAttributes}
				colorType={advancedButtonStyleType}
				items={[
					{
						label: <TransparentIcon />,
						value: "transparent",
						tooltip: "Transparent",
					},
					{ label: <BgIcon />, value: "bgColor", tooltip: "Solid" },
					{
						label: <GradientIcon />,
						value: "gradient",
						tooltip: "Gradient",
					},
				]}
			/>
			{!["post-slider", "post-slider-two", "post-thumbnail-slider", "thumbnail-slider-two"].includes(
				blockName
			) && (
				<>
					{"color" === advancedButtonStyleType ? (
						<Fragment key={ "normal" }>
							<Border
								attributes={{
									border: advancedBorderStyle,
									borderWidth: advancedBorderStyleWidth,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "advancedBorderStyle",
									borderWidth: "advancedBorderStyleWidth",
								}}
								btnType={"normal"}
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={advancedBorderRadius}
								attributesKey={"advancedBorderRadius"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "0",
										right: "0",
										bottom: "0",
										left: "0",
									},
								}}
								indicator={"radius"}
							/>
						</Fragment>
					) : (
						<Fragment key={ "hover" }>
							<Border
								attributes={{
									border: advancedBorderStyle,
									borderWidth: advancedBorderStyleWidthHover,
								}}
								setAttributes={setAttributes}
								attributesKey={{
									border: "advancedBorderStyle",
									borderWidth: "advancedBorderStyleWidthHover",
								}}
								btnType={"hover"}
							/>
							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={advancedBorderRadiusHover}
								attributesKey={"advancedBorderRadiusHover"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{
									unit: "px",
									value: {
										top: "0",
										right: "0",
										bottom: "0",
										left: "0",
									},
								}}
								indicator={"radius"}
							/>
						</Fragment>
					)}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Toggle
				label={__("Enable Box Shadow", "post-carousel")}
				attributes={advancedBoxShadowEnable}
				attributesKey={"advancedBoxShadowEnable"}
				setAttributes={setAttributes}
			/>
			{advancedBoxShadowEnable && (
				<BoxShadow
					label={__("Box Shadow", "post-carousel")}
					attributes={advancedBoxShadow}
					attributesKey={"advancedBoxShadow"}
					setAttributes={setAttributes}
				/>
			)}
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={advancedPadding}
				attributesKey={"advancedPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "",
						right: "",
						bottom: "",
						left: "",
					},
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={advancedMargin}
				attributesKey={"advancedMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "8",
						right: "0",
						bottom: "8",
						left: "0",
					},
				}}
			/>
		</>
	);
};
export const CategoryStyleTab = ({ attributes, setAttributes }) => {
	const {
		catTabCategoryTypography,
		catTabCategoryFontSize,
		catTabCategoryLetterSpacing,
		catTabCategoryLineHeight,
		catTabCategoryColor,
		catTabCategoryBg,
		catTabCategoryBorder,
		catTabCategoryBorderWidth,
		catTabCategoryBorderRadius,
		catTabCategorySpaceBetween,
		catTabCategoryPadding,
		catTabCategoryMargin,
		blockLayoutName,
		thumbnailItemsCateColor,
		catTabCategoryBarColor,
		catTabCategoryWordSpacing,
		catTabCategoryBorderWidthHover,
		catTabCategoryBorderRadiusHover,
		catTabCategoryGlobalTypography,
	} = attributes;

	const [catTabBtnState, setCatTabBtnState] = useState("color");

	return (
		<>
			<TypographyNew
				attributes={{
					family: catTabCategoryTypography,
					familyKey: "catTabCategoryTypography",
					fontSize: catTabCategoryFontSize,
					fontSizeKey: "catTabCategoryFontSize",
					fontSpacing: catTabCategoryLetterSpacing,
					fontSpacingKey: "catTabCategoryLetterSpacing",
					lineHeight: catTabCategoryLineHeight,
					lineHeightKey: "catTabCategoryLineHeight",
					wordSpacing: catTabCategoryWordSpacing,
					wordSpacingKey: "catTabCategoryWordSpacing",
					globalTypo: catTabCategoryGlobalTypography,
					globalTypoKey: "catTabCategoryGlobalTypography",
				}}
				setAttributes={setAttributes}
				fontSizeDefault={{ unit: "px", value: 12 }}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				lineDefaultValue={{ unit: "px", value: 14.4 }}
			/>
			{[
				"thumbnail-slider-two-layout-three",
				"thumbnail-slider-two-layout-four",
				"thumbnail-slider-two-layout-five",
			].includes(blockLayoutName) && (
				<SpColorPicker
					label={__("Bar Color", "post-carousel")}
					value={catTabCategoryBarColor}
					onChange={(newColor) => setAttributes({ catTabCategoryBarColor: newColor })}
					defaultColor="#FFFFFF"
				/>
			)}
			<SPToggleGroupControl
				attributes={catTabBtnState}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(newState) => setCatTabBtnState(newState)}
			/>
			{"color" === catTabBtnState ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={catTabCategoryColor.color}
						onChange={(newColor) =>
							setAttributes({
								catTabCategoryColor: {
									...catTabCategoryColor,
									color: newColor,
								},
							})
						}
						defaultColor="#FFFFFF"
					/>
					{blockLayoutName &&
						inArray(["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"], blockLayoutName) && (
							<SpColorPicker
								label={__("Thumbnails Color", "post-carousel")}
								value={thumbnailItemsCateColor.color}
								onChange={(newColor) =>
									setAttributes({
										thumbnailItemsCateColor: {
											...thumbnailItemsCateColor,
											color: newColor,
										},
									})
								}
								defaultColor="#FFFFFF"
							/>
						)}
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Hover Color", "post-carousel")}
						value={catTabCategoryColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								catTabCategoryColor: {
									...catTabCategoryColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor="#000000"
					/>
					{blockLayoutName &&
						inArray(["thumbnail-slider-layout-three", "thumbnail-slider-layout-four"], blockLayoutName) && (
							<SpColorPicker
								label={__("Thumbnails Hover Color", "post-carousel")}
								value={thumbnailItemsCateColor.hoverColor}
								onChange={(newColor) =>
									setAttributes({
										thumbnailItemsCateColor: {
											...thumbnailItemsCateColor,
											hoverColor: newColor,
										},
									})
								}
								defaultColor="#000000"
							/>
						)}
				</>
			)}
			{![
				"thumbnail-slider-two-layout-three",
				"thumbnail-slider-two-layout-four",
				"thumbnail-slider-two-layout-five",
			].includes(blockLayoutName) && (
				<Background
					label={__("Background Type", "post-carousel")}
					colorLabel={__("Solid Color", "post-carousel")}
					attributes={catTabCategoryBg}
					attributesKey={"catTabCategoryBg"}
					setAttributes={setAttributes}
					defaultColor={"#333333"}
					colorType={ catTabBtnState }
					items={[
						{
							label: <TransparentIcon />,
							value: "transparent",
							tooltip: "Transparent",
						},
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

			{"color" === catTabBtnState ? (
				<Fragment key={ catTabBtnState }>
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: catTabCategoryBorder,
							borderWidth: catTabCategoryBorderWidth,
						}}
						attributesKey={{
							border: "catTabCategoryBorder",
							borderWidth: "catTabCategoryBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={catTabCategoryBorderRadius}
						attributesKey={"catTabCategoryBorderRadius"}
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
				</Fragment>
			) : (
				<Fragment key={ catTabBtnState }>
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: catTabCategoryBorder,
							borderWidth: catTabCategoryBorderWidthHover,
						}}
						attributesKey={{
							border: "catTabCategoryBorder",
							borderWidth: "catTabCategoryBorderWidthHover",
						}}
						setAttributes={setAttributes}
						btnType={"hover"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={catTabCategoryBorderRadiusHover}
						attributesKey={"catTabCategoryBorderRadiusHover"}
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
					/>{" "}
				</Fragment>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<SPRangeControl
				label={__("Space Between Items", "post-carousel")}
				attributes={catTabCategorySpaceBetween}
				attributesKey={"catTabCategorySpaceBetween"}
				setAttributes={setAttributes}
				units={["px"]}
				max={50}
				defaultValue={{ unit: "px", value: 4 }}
			/>
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={catTabCategoryPadding}
				attributesKey={"catTabCategoryPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "5",
						right: "10",
						bottom: "5",
						left: "10",
					},
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={catTabCategoryMargin}
				attributesKey={"catTabCategoryMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: "0",
						right: "0",
						bottom: "8",
						left: "0",
					},
				}}
			/>
		</>
	);
};

export const PopupDetailsStyleTab = ({ attributes, setAttributes }) => {
	const {
		popupTitleColor,
		popupMetaFieldsColor,
		popupExcerptColor,
		popupBgColor,
		popupOverlayColor,
		popupNavArrowBgColor,
		popupNavArrowColor,
		popupCloseBtnColor,
		generalLinkOpen,
		popupCloseBtnEnable,
	} = attributes;
	const [popupDetailsColorType, setPopupDetailsColorType] = useState("normal");
	return (
		<>
			<SpColorPicker
				label={__("Title", "post-carousel")}
				value={popupTitleColor}
				defaultColor="#000"
				onChange={(newColor) =>
					setAttributes({
						popupTitleColor: newColor,
					})
				}
			/>
			<SpColorPicker
				label={__("Meta Fields", "post-carousel")}
				value={popupMetaFieldsColor}
				defaultColor="#ddd"
				onChange={(newColor) =>
					setAttributes({
						popupMetaFieldsColor: newColor,
					})
				}
			/>
			<SpColorPicker
				label={__("Excerpt", "post-carousel")}
				value={popupExcerptColor}
				defaultColor="#000"
				onChange={(newColor) =>
					setAttributes({
						popupExcerptColor: newColor,
					})
				}
			/>
			<SpColorPicker
				label={__("Background Color", "post-carousel")}
				value={popupBgColor}
				defaultColor="#fff"
				onChange={(newColor) =>
					setAttributes({
						popupBgColor: newColor,
					})
				}
			/>
			<SpColorPicker
				label={__("Overlay Color", "post-carousel")}
				value={popupOverlayColor}
				defaultColor="#ddd"
				onChange={(newColor) =>
					setAttributes({
						popupOverlayColor: newColor,
					})
				}
			/>
			{popupCloseBtnEnable && (
				<SPToggleGroupControl
					attributes={popupDetailsColorType}
					items={[
						{ label: "Normal", value: "normal" },
						{ label: "Hover", value: "hover" },
					]}
					onClick={(val) => setPopupDetailsColorType(val)}
				/>
			)}
			{popupCloseBtnEnable && (
				<>
					{"normal" === popupDetailsColorType ? (
						<>
							<SpColorPicker
								label={__("Close Button", "post-carousel")}
								value={popupCloseBtnColor.color}
								defaultColor="#FF0000"
								onChange={(newColor) =>
									setAttributes({
										popupCloseBtnColor: {
											...popupCloseBtnColor,
											color: newColor,
										},
									})
								}
							/>
							{generalLinkOpen === "multi-popup" && (
								<>
									<SpColorPicker
										label={__("Navigation Arrow", "post-carousel")}
										value={popupNavArrowColor.color}
										defaultColor="#fff"
										onChange={(newColor) =>
											setAttributes({
												popupNavArrowColor: {
													...popupNavArrowColor,
													color: newColor,
												},
											})
										}
									/>
									<SpColorPicker
										label={__("Background Color", "post-carousel")}
										value={popupNavArrowBgColor.color}
										defaultColor="#ddd"
										onChange={(newColor) =>
											setAttributes({
												popupNavArrowBgColor: {
													...popupNavArrowBgColor,
													color: newColor,
												},
											})
										}
									/>
								</>
							)}
						</>
					) : (
						<>
							<SpColorPicker
								label={__("Close Button", "post-carousel")}
								value={popupCloseBtnColor.hover}
								defaultColor=""
								onChange={(newColor) =>
									setAttributes({
										popupCloseBtnColor: {
											...popupCloseBtnColor,
											hover: newColor,
										},
									})
								}
							/>
							{generalLinkOpen === "multi-popup" && (
								<>
									<SpColorPicker
										label={__("Navigation Arrow", "post-carousel")}
										value={popupNavArrowColor.hover}
										defaultColor=""
										onChange={(newColor) =>
											setAttributes({
												popupNavArrowColor: {
													...popupNavArrowColor,
													hover: newColor,
												},
											})
										}
									/>
									<SpColorPicker
										label={__("Background Color", "post-carousel")}
										value={popupNavArrowBgColor.hover}
										defaultColor=""
										onChange={(newColor) =>
											setAttributes({
												popupNavArrowBgColor: {
													...popupNavArrowBgColor,
													hover: newColor,
												},
											})
										}
									/>
								</>
							)}
						</>
					)}
				</>
			)}
		</>
	);
};

export const PaginationStyleTab = ({ attributes, setAttributes }) => {
	const {
		paginationColor,
		paginationBGColor,
		paginationBorder,
		paginationBorderRadius,
		paginationPadding,
		paginationMargin,
		paginationBorderWidth,
		paginationType,
		paginationTypography,
		paginationFontSize,
		paginationLetterSpacing,
		paginationLineHeight,
		paginationWordSpacing,
		paginationGlobalTypography,
	} = attributes;

	const [paginationColorStyle, setPaginationColorStyle] = useState("normal");

	return (
		<>
			{["load-more", "pagination"].includes(paginationType) && (
				<>
					<TypographyNew
						attributes={{
							family: paginationTypography,
							familyKey: "paginationTypography",
							fontSize: paginationFontSize,
							fontSizeKey: "paginationFontSize",
							fontSpacing: paginationLetterSpacing,
							fontSpacingKey: "paginationLetterSpacing",
							lineHeight: paginationLineHeight,
							lineHeightKey: "paginationLineHeight",
							wordSpacing: paginationWordSpacing,
							wordSpacingKey: "paginationWordSpacing",
							globalTypo: paginationGlobalTypography,
							globalTypoKey: "paginationGlobalTypography",
						}}
						setAttributes={setAttributes}
						spacingDefaultValue={{ unit: "px", value: 0 }}
						fontSizeDefault={{ unit: "px", value: 16 }}
						lineDefaultValue={{ unit: "px", value: 20 }}
					/>
				</>
			)}
			<SPToggleGroupControl
				attributes={paginationColorStyle}
				items={[
					{ label: "Normal", value: "normal" },
					{
						label: paginationType === "pagination" ? "Active & Hover" : "Hover",
						value: "active-hover",
					},
				]}
				onClick={(newValue) => setPaginationColorStyle(newValue)}
			/>
			{"normal" === paginationColorStyle ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={paginationColor?.color}
						onChange={(newColor) => {
							setAttributes({
								paginationColor: {
									...paginationColor,
									color: newColor,
									defaultColor: "",
								},
							});
						}}
						defaultColor={"#FFFFFF"}
					/>
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={paginationBGColor?.color}
						onChange={(newColor) =>
							setAttributes({
								paginationBGColor: {
									...paginationBGColor,
									color: newColor,
									defaultColor: "",
								},
							})
						}
						defaultColor={"#333333"}
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__(" Hover Color", "post-carousel")}
						value={paginationColor?.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								paginationColor: {
									...paginationColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor={"#333333"}
					/>
					{/* {paginationType === "pagination" && (
						<SpColorPicker
							label={__("Active Color", "post-carousel")}
							value={paginationColor.activeColor}
							onChange={(newColor) =>
								setAttributes({
									paginationColor: {
										...paginationColor,
										activeColor: newColor,
									},
								})
							}
							defaultColor={"#000000"}
						/>
					)} */}
					<SpColorPicker
						label={__("Hover Background Color", "post-carousel")}
						value={paginationBGColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								paginationBGColor: {
									...paginationBGColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor={"#FFFFFF00"}
					/>
					{/* {paginationType === "pagination" && (
						<SpColorPicker
							label={__("Active Background Color", "post-carousel")}
							value={paginationBGColor?.activeColor}
							onChange={(newColor) =>
								setAttributes({
									paginationBGColor: {
										...paginationBGColor,
										activeColor: newColor,
									},
								})
							}
							defaultColor={"#FFFFFF00"}
						/>
					)} */}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Border
				attributes={{
					border: paginationBorder,
					borderWidth: paginationBorderWidth,
				}}
				attributesKey={{
					border: "paginationBorder",
					borderWidth: "paginationBorderWidth",
				}}
				setAttributes={setAttributes}
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={paginationBorderRadius}
				attributesKey={"paginationBorderRadius"}
				setAttributes={setAttributes}
				units={["PX", "%", "EM"]}
				labelItem={{
					top: "T-Left",
					right: "T-Right",
					bottom: "B-Right",
					left: "B-Left",
				}}
				defaultValue={{
					unit: "px",
					value: {
						top: 4,
						right: 4,
						bottom: 4,
						left: 4,
					},
				}}
				indicator={"radius"}
			/>
			{["load-more", "pagination"].includes(paginationType) && (
				<Spacing
					label={__("Padding", "post-carousel")}
					attributes={paginationPadding}
					attributesKey={"paginationPadding"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{
						unit: "px",
						value: {
							top: 0,
							right: 8,
							bottom: 0,
							left: 8,
						},
					}}
				/>
			)}
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={paginationMargin}
				attributesKey={"paginationMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: {
						top: 48,
						right: 0,
						bottom: 0,
						left: 0,
					},
				}}
			/>
		</>
	);
};

export const CarouselNavArrowStyleTab = ({ attributes, setAttributes }) => {
	const {
		carouselArrowColor,
		carouselArrowBgColor,
		carouselArrowBorder,
		carouselArrowBorderWidth,
		carouselArrowBorderRadius,
		carouselBoxShadowEnable,
		carouselBoxShadow,
		carouselArrowBorderWidthHover,
	} = attributes;
	const [colorState, setColorState] = useState("normal");
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
						value={carouselArrowColor.color}
						onChange={(newColor) =>
							setAttributes({
								carouselArrowColor: {
									...carouselArrowColor,
									color: newColor,
								},
							})
						}
						defaultColor={"#ffffff"}
					/>
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={carouselArrowBgColor.color}
						onChange={(newBGColor) =>
							setAttributes({
								carouselArrowBgColor: {
									...carouselArrowBgColor,
									color: newBGColor,
								},
							})
						}
						defaultColor={"#1A1B1C"}
					/>
					<Border
						attributes={{
							border: carouselArrowBorder,
							borderWidth: carouselArrowBorderWidth,
						}}
						attributesKey={{
							border: "carouselArrowBorder",
							borderWidth: "carouselArrowBorderWidth",
						}}
						setAttributes={setAttributes}
						defaultColor={{ color: "#1A1B1C" }}
						btnType={"normal"}
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Hover Color", "post-carousel")}
						value={carouselArrowColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								carouselArrowColor: {
									...carouselArrowColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor={"#1A1B1C"}
					/>
					<SpColorPicker
						label={__("Hover Background Color", "post-carousel")}
						value={carouselArrowBgColor.hoverColor}
						onChange={(newBGColor) =>
							setAttributes({
								carouselArrowBgColor: {
									...carouselArrowBgColor,
									hoverColor: newBGColor,
								},
							})
						}
						defaultColor={"#ffffff"}
					/>
					<Border
						attributes={{
							border: carouselArrowBorder,
							borderWidth: carouselArrowBorderWidthHover,
						}}
						attributesKey={{
							border: "carouselArrowBorder",
							borderWidth: "carouselArrowBorderWidthHover",
						}}
						setAttributes={setAttributes}
						defaultColor={{ color: "#1A1B1C", hover: "#1A1B1C" }}
						btnType={"hover"}
					/>
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={carouselArrowBorderRadius}
				attributesKey={"carouselArrowBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "%",
					value: {
						top: 50,
						right: 50,
						bottom: 50,
						left: 50,
					},
				}}
				indicator={"radius"}
			/>
			<Toggle
				label={__("Enable Box Shadow", "post-carousel")}
				attributes={carouselBoxShadowEnable}
				attributesKey={"carouselBoxShadowEnable"}
				setAttributes={setAttributes}
			/>
			{carouselBoxShadowEnable && (
				<BoxShadow
					label={__("Box Shadow", "post-carousel")}
					attributes={carouselBoxShadow}
					attributesKey={"carouselBoxShadow"}
					setAttributes={setAttributes}
					defaultColor={"#4E4F521A"}
				/>
			)}
		</>
	);
};

export const CarouselPaginationStyleTab = ({ attributes, setAttributes }) => {
	const {
		carouselPaginationStyle,
		carouselPaginationTextColor,
		carouselPaginationColor,
		carouselPaginationBorder,
		carouselPaginationBorderWidth,
		carouselPaginationBorderWidthHover,
	} = attributes;

	const [colorState, setColorState] = useState("normal");

	return (
		<>
			<SPToggleGroupControl
				attributes={colorState}
				items={[
					{ label: "Normal", value: "normal" },
					{
						label: carouselPaginationStyle !== "fraction" ? "Active" : "Hover",
						value: "activeAndHover",
					},
				]}
				onClick={(newValue) => setColorState(newValue)}
			/>
			{"normal" === colorState ? (
				<>
					{(carouselPaginationStyle === "fraction" || carouselPaginationStyle === "numbers") && (
						<>
							<SpColorPicker
								label={__("Text Color", "post-carousel")}
								value={carouselPaginationTextColor.color}
								onChange={(newColor) =>
									setAttributes({
										carouselPaginationTextColor: {
											...carouselPaginationTextColor,
											color: newColor,
										},
									})
								}
								defaultColor={"#4e4f52"}
							/>
						</>
					)}
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={carouselPaginationColor.color}
						onChange={(newColor) =>
							setAttributes({
								carouselPaginationColor: {
									...carouselPaginationColor,
									color: newColor,
								},
							})
						}
						defaultColor={"#cacbcf"}
					/>
					{carouselPaginationStyle !== "scrollbar" && (
						<Border
							attributes={{
								border: carouselPaginationBorder,
								borderWidth: carouselPaginationBorderWidth,
							}}
							btnType="normal"
							setAttributes={setAttributes}
							attributesKey={{
								border: "carouselPaginationBorder",
								borderWidth: "carouselPaginationBorderWidth",
							}}
						/>
					)}
				</>
			) : (
				<>
					{(carouselPaginationStyle === "fraction" || carouselPaginationStyle === "numbers") && (
						<>
							<SpColorPicker
								label={__("Text Color", "post-carousel")}
								value={carouselPaginationTextColor.activeColor}
								onChange={(newColor) =>
									setAttributes({
										carouselPaginationTextColor: {
											...carouselPaginationTextColor,
											activeColor: newColor,
										},
									})
								}
								defaultColor="#4e4f52"
							/>
						</>
					)}
					<SpColorPicker
						label={__("Background Color", "post-carousel")}
						value={carouselPaginationColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								carouselPaginationColor: {
									...carouselPaginationColor,
									hoverColor: newColor,
								},
							})
						}
						defaultColor="#4e4f52"
					/>
					{carouselPaginationStyle !== "scrollbar" && (
						<Border
							attributes={{
								border: carouselPaginationBorder,
								borderWidth: carouselPaginationBorderWidthHover,
							}}
							btnType="hover"
							setAttributes={setAttributes}
							attributesKey={{
								border: "carouselPaginationBorder",
								borderWidth: "carouselPaginationBorderWidthHover",
							}}
						/>
					)}
				</>
			)}
		</>
	);
};

export const PriceStyleTab = ({ attributes, setAttributes }) => {
	const {
		priceColor,
		discountColor,
		priceTypography,
		priceFontSize,
		priceLatterSpacing,
		priceLineHeight,
		priceWordSpacing,
	} = attributes;
	return (
		<>
			<TypographyNew
				attributes={{
					family: priceTypography,
					familyKey: "priceTypography",
					fontSize: priceFontSize,
					fontSizeKey: "priceFontSize",
					fontSpacing: priceLatterSpacing,
					fontSpacingKey: "priceLatterSpacing",
					lineHeight: priceLineHeight,
					lineHeightKey: "priceLineHeight",
					wordSpacing: priceWordSpacing,
					wordSpacingKey: "priceWordSpacing",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 18 }}
				lineDefaultValue={{ unit: "px", value: 32 }}
			/>
			<SpColorPicker
				label={__("Price Color", "post-carousel")}
				value={priceColor.color}
				onChange={(newColor) =>
					setAttributes({
						priceColor: {
							...priceColor,
							color: newColor,
						},
					})
				}
			/>
			<SpColorPicker
				label={__("Discount Color", "post-carousel")}
				value={discountColor.color}
				onChange={(newColor) =>
					setAttributes({
						discountColor: {
							...discountColor,
							color: newColor,
						},
					})
				}
			/>
		</>
	);
};

export const RatingStyleTab = ({ attributes, setAttributes }) => {
	const { starColor, emptyStarColor, reviewCounterColor } = attributes;
	return (
		<>
			<SpColorPicker
				label={__("Star Color", "post-carousel")}
				value={starColor.color}
				onChange={(newColor) =>
					setAttributes({
						starColor: {
							...starColor,
							color: newColor,
						},
					})
				}
			/>
			<SpColorPicker
				label={__("Empty Star Color", "post-carousel")}
				value={emptyStarColor.color}
				onChange={(newColor) =>
					setAttributes({
						emptyStarColor: {
							...emptyStarColor,
							color: newColor,
						},
					})
				}
			/>
			<SpColorPicker
				label={__("Review Counter Color", "post-carousel")}
				value={reviewCounterColor.color}
				onChange={(newColor) =>
					setAttributes({
						reviewCounterColor: {
							...reviewCounterColor,
							color: newColor,
						},
					})
				}
			/>
		</>
	);
};

export const AddToCartStyleTab = ({ attributes, setAttributes }) => {
	const {
		addToCartBg,
		addToCartColor,
		addToCartBorder,
		addToCartBorderWidth,
		addToCartTypography,
		addToCartFontSize,
		addToCartLatterSpacing,
		addToCartLineHeight,
		addToCartWordSpacing,
	} = attributes;
	const [addToCartButtonStyleType, setAddToCartButtonStyleType] = useState("color");
	return (
		<>
			<TypographyNew
				attributes={{
					family: addToCartTypography,
					familyKey: "addToCartTypography",
					fontSize: addToCartFontSize,
					fontSizeKey: "addToCartFontSize",
					fontSpacing: addToCartLatterSpacing,
					fontSpacingKey: "addToCartLatterSpacing",
					lineHeight: addToCartLineHeight,
					lineHeightKey: "addToCartLineHeight",
					wordSpacing: addToCartWordSpacing,
					wordSpacingKey: "addToCartWordSpacing",
				}}
				setAttributes={setAttributes}
				spacingDefaultValue={{ unit: "px", value: 0 }}
				fontSizeDefault={{ unit: "px", value: 18 }}
				lineDefaultValue={{ unit: "px", value: 24 }}
			/>
			<SPToggleGroupControl
				attributes={addToCartButtonStyleType}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
				onClick={(val) => setAddToCartButtonStyleType(val)}
			/>
			{"color" === addToCartButtonStyleType ? (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={addToCartColor.color}
						onChange={(newColor) =>
							setAttributes({
								addToCartColor: {
									...addToCartColor,
									color: newColor,
								},
							})
						}
					/>
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Color", "post-carousel")}
						value={addToCartColor.hoverColor}
						onChange={(newColor) =>
							setAttributes({
								addToCartColor: {
									...addToCartColor,
									hoverColor: newColor,
								},
							})
						}
					/>
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Background
				label={__("Background Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor="#4e4f52"
				attributes={addToCartBg}
				attributesKey={"addToCartBg"}
				setAttributes={setAttributes}
				colorType={addToCartButtonStyleType}
				items={[
					{
						label: <TransparentIcon />,
						value: "transparent",
						tooltip: "Transparent",
					},
					{ label: <BgIcon />, value: "bgColor", tooltip: "Solid" },
					{
						label: <GradientIcon />,
						value: "gradient",
						tooltip: "Gradient",
					},
				]}
			/>
			<Border
				attributes={{
					border: addToCartBorder,
					borderWidth: addToCartBorderWidth,
				}}
				attributesKey={{
					border: "addToCartBorder",
					borderWidth: "addToCartBorderWidth",
				}}
				setAttributes={setAttributes}
			/>
		</>
	);
};

export const PostTimelineConnectorStyleTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		timelineConnectorColor,
		timelineIndicatorColor,
		timelineCircleBgColor,
		timelineConnectorBorder,
		timelineConnectorBorderWidth,
		timelineConnectorBorderRadius,
	} = attributes;
	const [colorButton, setColorButton] = useState("normal");

	return (
		<>
			{["post-timeline-one", "post-timeline-two"].includes(blockName) ? (
				<>
					<SPToggleGroupControl
						attributes={colorButton}
						onClick={(value) => setColorButton(value)}
						items={[
							{ label: "Normal", value: "normal" },
							{ label: "Active", value: "active" },
						]}
					/>
					{"normal" === colorButton ? (
						<>
							<SpColorPicker
								label={__("Connector Color", "post-carousel")}
								value={timelineConnectorColor.color}
								onChange={(newColor) =>
									setAttributes({
										timelineConnectorColor: {
											...timelineConnectorColor,
											color: newColor,
										},
									})
								}
								defaultColor={"#E0E0E0"}
							/>
							<SpColorPicker
								label={__("Speech Bubble Color", "post-carousel")}
								value={timelineIndicatorColor.color}
								onChange={(newColor) =>
									setAttributes({
										timelineIndicatorColor: {
											...timelineIndicatorColor,
											color: newColor,
										},
									})
								}
								defaultColor={"#E0E0E0"}
							/>
							<SpColorPicker
								label={__("Circle Background Color", "post-carousel")}
								value={timelineCircleBgColor.color}
								onChange={(newColor) =>
									setAttributes({
										timelineCircleBgColor: {
											...timelineCircleBgColor,
											color: newColor,
										},
									})
								}
								defaultColor={"#FFFFFF"}
							/>
						</>
					) : (
						<>
							<SpColorPicker
								label={__("Connector Color", "post-carousel")}
								value={timelineConnectorColor.active}
								onChange={(newColor) =>
									setAttributes({
										timelineConnectorColor: {
											...timelineConnectorColor,
											active: newColor,
										},
									})
								}
								defaultColor={"var(--sp-smart-primary-2-600)"}
							/>
							<SpColorPicker
								label={__("Speech Bubble Color", "post-carousel")}
								value={timelineIndicatorColor.active}
								onChange={(newColor) =>
									setAttributes({
										timelineIndicatorColor: {
											...timelineIndicatorColor,
											active: newColor,
										},
									})
								}
								defaultColor={"var(--sp-smart-primary-2-600)"}
							/>
							<SpColorPicker
								label={__("Circle Background Color", "post-carousel")}
								value={timelineCircleBgColor.active}
								onChange={(newColor) =>
									setAttributes({
										timelineCircleBgColor: {
											...timelineCircleBgColor,
											active: newColor,
										},
									})
								}
								defaultColor={"#E0E0E0"}
							/>
						</>
					)}
					<Divider position={"sp-w-100pct bottom"} />
				</>
			) : (
				<>
					<SpColorPicker
						label={__("Connector Color", "post-carousel")}
						value={timelineConnectorColor.active}
						onChange={(newColor) =>
							setAttributes({
								timelineConnectorColor: {
									...timelineConnectorColor,
									active: newColor,
								},
							})
						}
						defaultColor={"var(--sp-smart-primary-2-600)"}
					/>
					<SpColorPicker
						label={__("Speech Bubble Color", "post-carousel")}
						value={timelineIndicatorColor.color}
						onChange={(newColor) =>
							setAttributes({
								timelineIndicatorColor: {
									...timelineIndicatorColor,
									color: newColor,
								},
							})
						}
						defaultColor={"var(--sp-smart-primary-2-600)"}
					/>
					<SpColorPicker
						label={__("Circle Background Color", "post-carousel")}
						value={timelineCircleBgColor.color}
						onChange={(newColor) =>
							setAttributes({
								timelineCircleBgColor: {
									...timelineCircleBgColor,
									color: newColor,
								},
							})
						}
						defaultColor={"#FFFFFF"}
					/>
				</>
			)}
			<Border
				attributes={{
					border: timelineConnectorBorder,
					borderWidth: timelineConnectorBorderWidth,
				}}
				attributesKey={{
					border: "timelineConnectorBorder",
					borderWidth: "timelineConnectorBorderWidth",
				}}
				setAttributes={setAttributes}
				btnType={blockName === "post-timeline-three" && "normal"}
			/>
			<Spacing
				label={__("Border Radius", "post-carousel")}
				attributes={timelineConnectorBorderRadius}
				attributesKey={"timelineConnectorBorderRadius"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "%",
					value: { top: 50, right: 50, bottom: 50, left: 50 },
				}}
				indicator={"radius"}
			/>
		</>
	);
};

export const DividerStyleTab = ({ attributes, setAttributes }) => {
	const { dividerBg, dividerWidth, dividerHeight } = attributes;

	return (
		<>
			<Background
				label={__("Color Type", "post-carousel")}
				colorLabel="Solid Color"
				defaultColor="#1E1E1E99"
				attributes={dividerBg}
				attributesKey={"dividerBg"}
				setAttributes={setAttributes}
				colorType={"color"}
				items={[
					{
						label: <TransparentIcon />,
						value: "transparent",
						tooltip: "Transparent",
					},
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
		</>
	);
};
