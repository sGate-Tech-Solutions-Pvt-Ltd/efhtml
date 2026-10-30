import { __ } from "@wordpress/i18n";
import MediaPicker from "../../components/mediaUpload/image";
import SPFocalPointPicker from "../../components/focalPoint/focalPointPicker";
import {
	Background,
	Border,
	ButtonSet,
	Divider,
	InputControl,
	SelectField,
	Spacing,
	SpColorPicker,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
	TypographyNew,
} from "../../components";
import { hoverEffectItems, hoverEffectShortItems, shapeButtonSet } from "./constant";
import { useState } from "@wordpress/element";
import ToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { solidGradientBgType } from "../../controls/constants";
import { AlignCenter, AlignLeft, AlignRight, FlexAlignCenter, FlexAlignEnd, FlexAlignStart } from "./icon";

// Smart Image general tab panel
export const SmartImageGeneralTab = ({ attributes, setAttributes }) => {
	const {
		selectImage,
		imageSize,
		selectImageSizes,
		aspectRatio,
		maxWidth,
		imageFocalPoint,
		enableLink,
		linkType,
		linkUrl,
		buttonLabel,
		buttonPosition,
		imageAltText,
		smartImageWidth,
		smartImageHeight,
		imgMaskingEnable,
		imageShapeSet,
		selectImageShape,
		maskingShapedUpload,
		maskSize,
		// imageZoom,
		openInTab,
		// doubleResolutionRetina,
		lazyLoad,
		// selectImageId,
		imgAlignment,
	} = attributes;

	const defaultSizes = [
		{ label: "Thumbnail", value: "thumbnail" },
		{ label: "Medium", value: "medium" },
		{ label: "Large", value: "large" },
		{ label: "Full", value: "full" },
	];

	const imageSizeItems = selectImageSizes ? selectImageSizes : defaultSizes;

	return (
		<>
			<MediaPicker
				label={__("Select Image", "post-carousel")}
				imageKey="selectImage"
				enableImageSize={false}
				setAttributes={setAttributes}
				backgroundImage={selectImage}
				onSelect={(media) => setAttributes({ selectImageId: media?.id })}
				removeImage={() =>
					setAttributes({
						selectImageId: "",
						imageAltText: "",
						imgTitleLabel: "",
						imgCaptionLabel: "",
						selectImage: {},
					})
				}
			/>
			<Toggle
				label={__("Image Masking", "post-carousel")}
				attributes={imgMaskingEnable}
				attributesKey={"imgMaskingEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{imgMaskingEnable && (
				<>
					<SPToggleGroupControl
						attributes={imageShapeSet}
						attributesKey={"imageShapeSet"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("Shape Set", "post-carousel"),
								value: "shape-set",
							},
							{
								label: __("Custom", "post-carousel"),
								value: "custom",
							},
						]}
					/>
					{"shape-set" === imageShapeSet && (
						<ButtonSet
							label={__("Image Masking", "post-carousel")}
							attributes={selectImageShape}
							attributesKey={"selectImageShape"}
							setAttributes={setAttributes}
							items={shapeButtonSet}
							columns={4}
						/>
					)}
					{"custom" === imageShapeSet && (
						<>
							<MediaPicker
								label={__("Select Image", "post-carousel")}
								imageKey={"maskingShapedUpload"}
								enableImageSize={false}
								setAttributes={setAttributes}
								backgroundImage={maskingShapedUpload}
							/>
							<SelectField
								label={__("Mask Size", "post-carousel")}
								attributes={maskSize}
								attributesKey={"maskSize"}
								setAttributes={setAttributes}
								items={[
									{
										label: __("Auto", "post-carousel"),
										value: "auto",
									},
									{
										label: __("Contain", "post-carousel"),
										value: "contain",
									},
									{
										label: __("Cover", "post-carousel"),
										value: "cover",
									},
								]}
							/>
						</>
					)}
				</>
			)}
			<SelectField
				label={__("Image Size", "post-carousel")}
				attributes={imageSize}
				attributesKey={"imageSize"}
				setAttributes={setAttributes}
				items={imageSizeItems}
			/>
			<SelectField
				label={__("Aspect Ratio", "post-carousel")}
				attributes={aspectRatio}
				attributesKey={"aspectRatio"}
				setAttributes={setAttributes}
				items={[
					{ label: "Original", value: "original" },
					{ label: "1:1", value: "1-1" },
					{ label: "4:3", value: "4-3" },
					{ label: "3:2", value: "3-2" },
					{ label: "16:9", value: "16-9" },
					{ label: "2:1", value: "2-1" },
					{ label: "3:1", value: "3-1" },
					{ label: "4:1", value: "4-1" },
					{ label: "3:4", value: "3-4" },
					{ label: "2:3", value: "2-3" },
					{ label: "9:16", value: "9-16" },
					{ label: "Custom (Pro)", value: "custom", disabled: true },
				]}
				flexStyle={true}
			/>
			{"custom" === aspectRatio ? (
				<>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={smartImageWidth}
						attributesKey={"smartImageWidth"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ value: "", unit: "px" }}
						max={1600}
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={smartImageHeight}
						attributesKey={"smartImageHeight"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ value: "", unit: "px" }}
						max={1600}
					/>
				</>
			) : (
				<SPRangeControl
					label={__("Max Width", "post-carousel")}
					attributes={maxWidth}
					attributesKey={"maxWidth"}
					setAttributes={setAttributes}
					units={["px", "%", "em"]}
					defaultValue={{ value: "", unit: "%" }}
					max={1600}
				/>
			)}
			{/* TODO :  Next Version */}
			{/* <SPRangeControl
				label={ __( "Image Zoom", "post-carousel" ) }
				attributes={ imageZoom }
				attributesKey={ "imageZoom" }
				setAttributes={ setAttributes }
				defaultValue={ { value: "1.1", unit: "px" } }
				min={ 0 }
				max={ 2 }
				step={ 0.1 }
			/> */}
			{"original" !== aspectRatio && (
				<SPFocalPointPicker
					label={__("Focal Point", "post-carousel")}
					attributes={imageFocalPoint}
					url={selectImage.url}
					attributesKey={"imageFocalPoint"}
					setAttributes={setAttributes}
					pro={true}
				/>
			)}
			<Toggle
				label={ __( "Enable Link", "post-carousel" ) }
				attributes={ enableLink }
				attributesKey={ "enableLink" }
				setAttributes={ setAttributes }
			/>
			{enableLink && (
				<>
					<SelectField
						label={__("Link Type", "post-carousel")}
						attributes={linkType}
						attributesKey={"linkType"}
						setAttributes={setAttributes}
						items={[
							{ label: "Full Image", value: "full-img" },
							{ label: "Button (Pro)", value: "button", disabled: true },
						]}
					/>
					{"button" === linkType && (
						<InputControl
							label={__("Button Label", "post-carousel")}
							attributes={buttonLabel}
							attributesKey={"buttonLabel"}
							setAttributes={setAttributes}
							inputType="text"
							flex={false}
						/>
					)}
					<InputControl
						label={
							"button" !== linkType
								? __("Image URL", "post-carousel")
								: __("Button URL", "post-carousel")
						}
						attributes={linkUrl}
						attributesKey={"linkUrl"}
						setAttributes={setAttributes}
						inputType="url"
						placeholder={"#"}
						flex={false}
					/>
					{"button" === linkType && (
						<SelectField
							label={__("Button Position", "post-carousel")}
							attributes={buttonPosition}
							attributesKey={"buttonPosition"}
							setAttributes={setAttributes}
							items={[
								{ label: "Top Left", value: "top-left" },
								{ label: "Top Center", value: "top-center" },
								{ label: "Top Right", value: "top-right" },
								{
									label: "Center Center",
									value: "center-center",
								},
								{ label: "Bottom Left", value: "bottom-left" },
								{
									label: "Bottom Center",
									value: "bottom-center",
								},
								{
									label: "Bottom Right",
									value: "bottom-right",
								},
							]}
						/>
					)}
					<Toggle
						label={ __( "Open In New Tab", "post-carousel" ) }
						attributes={ openInTab }
						attributesKey={ "openInTab" }
						setAttributes={ setAttributes }
					/>
				</>
			)}
			<InputControl
				label={__("Image Alt Text", "post-carousel")}
				attributes={imageAltText}
				attributesKey={"imageAltText"}
				setAttributes={setAttributes}
				inputType="text"
				flex={false}
			/>
			{/* <Toggle
				label={ __(
					'Load 2x Image for Retina Display',
					'post-carousel'
				) }
				attributes={ doubleResolutionRetina }
				attributesKey={ 'doubleResolutionRetina' }
				setAttributes={ setAttributes }
			/> */}
			<Toggle
				label={ __( "Lazy Load", "post-carousel" ) }
				attributes={ lazyLoad }
				attributesKey={ "lazyLoad" }
				setAttributes={ setAttributes }
			/>
			<SPToggleGroupControl
				label={ __("Alignment", "post-carousel" ) }
				attributes={ imgAlignment }
				attributesKey={ "imgAlignment" }
				setAttributes={ setAttributes }
				items={ [
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				] }
			/>
		</>
	);
};

// TODO: Image Masking Option for Next Version.
// export const SmartImageMaskingGeneralTab = ( {
// 	attributes,
// 	setAttributes,
// } ) => {
// 	const { imgMaskingEnable, imageShapeSet, selectImageShape, maskingShapedUpload, maskSize } =
// 		attributes;

// 	return (
// 		<>
// 			<SPToggleGroupControl
// 				attributes={ imageShapeSet }
// 				attributesKey={ 'imageShapeSet' }
// 				setAttributes={ setAttributes }
// 				items={ [
// 					{
// 						label: __( 'Shape Set', 'post-carousel' ),
// 						value: 'shape-set',
// 					},
// 					{
// 						label: __( 'Custom', 'post-carousel' ),
// 						value: 'custom',
// 					},
// 				] }
// 			/>
// 			{ 'shape-set' === imageShapeSet && (
// 				<ButtonSet
// 					label={ __( 'Image Masking', 'post-carousel' ) }
// 					attributes={ selectImageShape }
// 					attributesKey={ 'selectImageShape' }
// 					setAttributes={ setAttributes }
// 					items={ shapeButtonSet }
// 					columns={ 4 }
// 				/>
// 			) }
// 			{ 'custom' === imageShapeSet && (
// 				<>
// 					<MediaPicker
// 						label={ __( 'Select Image', 'post-carousel' ) }
// 						imageKey={ 'maskingShapedUpload' }
// 						enableImageSize={ false }
// 						setAttributes={ setAttributes }
// 						backgroundImage={ maskingShapedUpload }
// 					/>
// 					<SelectField
// 						label={ __( 'Mask Size', 'post-carousel' ) }
// 						attributes={ maskSize }
// 						attributesKey={ 'maskSize' }
// 						setAttributes={ setAttributes }
// 						items={ [
// 							{
// 								label: __( 'Auto', 'post-carousel' ),
// 								value: 'auto',
// 							},
// 							{
// 								label: __( 'Contain', 'post-carousel' ),
// 								value: 'contain',
// 							},
// 							{
// 								label: __( 'Cover', 'post-carousel' ),
// 								value: 'cover',
// 							},
// 						] }
// 					/>
// 				</>
// 			) }
// 		</>
// 	);
// };

export const SmartImageBackgroundTab = ({ attributes, setAttributes }) => {
	const {
		smartImgBgEnable,
		smartImgBg,
		smartBgImgBorder,
		smartBgImgBorderWidth,
		smartBgImgBorderRadius,
		smartBgImgInnerPadding,
		// smartImageBgImage, // TODO: for upcoming version.
		// smartImgOverlayType,
		// smartImgOverlayColor,
		// smartBgImgOverlayBlandMode,
		// smartBgImgOverlayBlandModeHover,
		// smartBgImgBlurHover,
		// smartBgImgBlur,
	} = attributes;

	const [hoverState, setHoverState] = useState("color");

	const radiusHandler = ({ newValue, typeKey }) => {
		const updateData = smartBgImgBorderRadius?.allChange
			? {
					top: newValue,
					right: newValue,
					bottom: newValue,
					left: newValue,
				}
			: { ...smartBgImgBorderRadius.value, [typeKey]: newValue };

		setAttributes({
			smartBgImgBorderRadius: {
				...smartBgImgBorderRadius,
				value: updateData,
			},
		});
	};

	const bgToggleHandler = (newValue) => {
		const padding = newValue
			? { top: 0, right: 0, bottom: 0, left: 0 }
			: { top: 12, right: 12, bottom: 12, left: 12 };

		setAttributes({
			smartImgBgEnable: !smartImgBgEnable,
			smartBgImgInnerPadding: {
				...smartBgImgInnerPadding,
				device: {
					Desktop: padding,
					Tablet: padding,
					Mobile: padding,
				},
			},
		});
	};

	return (
		<>
			<Toggle
				label={__("Enable Background", "post-carousel")}
				attributes={smartImgBgEnable}
				attributesKey={"smartImgBgEnable"}
				setAttributes={setAttributes}
				onChange={(newValue) => bgToggleHandler(newValue)}
			/>
			{smartImgBgEnable && (
				<>
					<ToggleGroupControl
						attributes={hoverState}
						onClick={(newValue) => setHoverState(newValue)}
						items={[
							{ label: "Normal", value: "color" },
							{ label: "Hover", value: "hover" },
						]}
					/>
					<Background
						label={__("Background Type", "post-carousel")}
						attributes={smartImgBg}
						attributesKey={"smartImgBg"}
						setAttributes={setAttributes}
						colorType={hoverState}
						items={solidGradientBgType}
						// TODO: Upcoming Version.
						// items={ excludeVideoBgType }
						// imageObj={ {
						// 	imageKey: 'smartImageBgImage',
						// 	backgroundImage: smartImageBgImage,
						// } } // TODO: Upcoming Version.
					/>
					{/* TODO: Upcoming Version. */}
					{/* { 'image' === smartImgBg?.[ hoverState ]?.style && (
					<>
						<SelectField
							label={ __( 'Overlay Color', 'post-carousel' ) }
							attributes={ smartImgOverlayType }
							attributesKey={ 'smartImgOverlayType' }
							setAttributes={ setAttributes }
							items={ imageOverlayTypeItems }
						/>
						{ 'custom' === smartImgOverlayType && (
							<>
								{ 'color' === hoverState ? (
									<>
										<SpColorPicker
											label={ __(
												'Overlay Color',
												'post-carousel'
											) }
											value={ smartImgOverlayColor.color }
											onChange={ ( newValue ) =>
												setAttributes( {
													smartImgOverlayColor: {
														...smartImgOverlayColor,
														color: newValue,
													},
												} )
											}
										/>
										<SelectField
											label={ __(
												'Color Blend Mode',
												'post-carousel'
											) }
											attributes={
												smartBgImgOverlayBlandMode
											}
											attributesKey={
												'smartBgImgOverlayBlandMode'
											}
											setAttributes={ setAttributes }
											flexStyle={ true }
											items={ imageBlandMode }
										/>
										<SPRangeControl
											label={ __(
												'Overlay Blend Mode',
												'post-carousel'
											) }
											attributes={ smartBgImgBlur }
											attributesKey={ 'smartBgImgBlur' }
											setAttributes={ setAttributes }
										/>
									</>
								) : (
									<>
										<SpColorPicker
											label={ __(
												'Overlay Color',
												'post-carousel'
											) }
											value={ smartImgOverlayColor.hover }
											onChange={ ( newValue ) =>
												setAttributes( {
													smartImgOverlayColor: {
														...smartImgOverlayColor,
														hover: newValue,
													},
												} )
											}
										/>
										<SelectField
											label={ __(
												'Color Blend Mode',
												'post-carousel'
											) }
											attributes={
												smartBgImgOverlayBlandModeHover
											}
											attributesKey={
												'smartBgImgOverlayBlandModeHover'
											}
											setAttributes={ setAttributes }
											flexStyle={ true }
											items={ imageBlandMode }
										/>
										<SPRangeControl
											label={ __(
												'Overlay Blend Mode',
												'post-carousel'
											) }
											attributes={ smartBgImgBlurHover }
											attributesKey={ 'smartBgImgBlurHover' }
											setAttributes={ setAttributes }
										/>
									</>
								) }
							</>
						) }
					</>
				) } */}
					<Border
						attributes={{
							border: smartBgImgBorder,
							borderWidth: smartBgImgBorderWidth,
						}}
						attributesKey={{
							border: "smartBgImgBorder",
							borderWidth: "smartBgImgBorderWidth",
						}}
						setAttributes={setAttributes}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={smartBgImgBorderRadius}
						attributesKey={"smartBgImgBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						indicator="radius"
						onChangeValue={radiusHandler}
					/>
				</>
			)}
			<Spacing
				label={__("Inner Padding", "post-carousel")}
				attributes={smartBgImgInnerPadding}
				attributesKey={"smartBgImgInnerPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
			/>
		</>
	);
};

export const SmartImageCaptionTab = ({ attributes, setAttributes }) => {
	const {
		imgTitleEnable,
		imgTitleLabel,
		imgTitleTypography,
		imgTitleFontSize,
		imgTitleLineHeight,
		imgTitleLetterSpacing,
		imgTitleWordSpacing,
		imgCaptionEnable,
		imgCaptionLabel,
		imgCaptionTypography,
		imgCapFontSize,
		imgCapLineHeight,
		imgCapLetterSpacing,
		imgCapWordSpacing,
		imgTextVisibility,
		imgTextColor,
		imgTextPosition,
		imgTextHorizontal,
		imgTextVertical,
		imgTextPadding,
	} = attributes;
	const [hoverState, setHoverState] = useState("color");
	const [titleCap, setTitleCap] = useState("title");

	return (
		<>
			<SPToggleGroupControl
				attributes={titleCap}
				setAttributes={setAttributes}
				onClick={(newValue) => setTitleCap(newValue)}
				items={[
					{ label: "Title", value: "title" },
					{ label: "Caption (Pro)", value: "caption", disabled: true },
				]}
			/>
			{"title" === titleCap ? (
				<>
					<Toggle
						label={__("Enable Image Title", "post-carousel")}
						attributes={imgTitleEnable}
						attributesKey={"imgTitleEnable"}
						setAttributes={setAttributes}
					/>
					{imgTitleEnable && (
						<>
							<InputControl
								label={__("Title Label", "post-carousel")}
								attributes={imgTitleLabel}
								attributesKey={"imgTitleLabel"}
								setAttributes={setAttributes}
								flex={false}
								inputType={"text"}
								onChange={(newValue) => setAttributes({ imgTitleLabel: newValue })}
							/>
							<TypographyNew
								attributes={{
									family: imgTitleTypography,
									familyKey: "imgTitleTypography",
									fontSize: imgTitleFontSize,
									fontSizeKey: "imgTitleFontSize",
									lineHeight: imgTitleLineHeight,
									lineHeightKey: "imgTitleLineHeight",
									fontSpacing: imgTitleLetterSpacing,
									fontSpacingKey: "imgTitleLetterSpacing",
									wordSpacing: imgTitleWordSpacing,
									wordSpacingKey: "imgTitleWordSpacing",
								}}
								setAttributes={setAttributes}
							/>
						</>
					)}
				</>
			) : (
				<>
					<Toggle
						label={__("Enable Image Caption", "post-carousel")}
						attributes={imgCaptionEnable}
						attributesKey={"imgCaptionEnable"}
						setAttributes={setAttributes}
					/>
					{imgCaptionEnable && (
						<>
							<InputControl
								label={__("Caption Label", "post-carousel")}
								attributes={imgCaptionLabel}
								attributesKey={"imgCaptionLabel"}
								setAttributes={setAttributes}
								flex={false}
								inputType={"text"}
							/>
							<TypographyNew
								attributes={{
									family: imgCaptionTypography,
									familyKey: "imgCaptionTypography",
									fontSize: imgCapFontSize,
									fontSizeKey: "imgCapFontSize",
									lineHeight: imgCapLineHeight,
									lineHeightKey: "imgCapLineHeight",
									fontSpacing: imgCapLetterSpacing,
									fontSpacingKey: "imgCapLetterSpacing",
									wordSpacing: imgCapWordSpacing,
									wordSpacingKey: "imgCapWordSpacing",
								}}
								setAttributes={setAttributes}
							/>
						</>
					)}
				</>
			)}
			{(imgTitleEnable || imgCaptionEnable) && (
				<>
					<Divider position="sp-w-100pct bottom" />
					{"over-img" === imgTextPosition && (
						<SelectField
							label={__("Visibility", "post-carousel")}
							attributes={imgTextVisibility}
							attributesKey={"imgTextVisibility"}
							setAttributes={setAttributes}
							items={[
								{ label: "Show Always", value: "show-always" },
								{ label: "Show on Hover (Pro)", value: "show-hover", disabled: true },
							]}
						/>
					)}
					<ToggleGroupControl
						attributes={hoverState}
						onClick={(newValue) => setHoverState(newValue)}
						items={[
							{ label: "Normal", value: "color" },
							{ label: "Hover", value: "hover" },
						]}
					/>
					{"color" === hoverState ? (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={imgTextColor.color}
								onChange={(newValue) =>
									setAttributes({
										imgTextColor: {
											...imgTextColor,
											color: newValue,
										},
									})
								}
							/>
						</>
					) : (
						<>
							<SpColorPicker
								label={__("Color", "post-carousel")}
								value={imgTextColor.color}
								onChange={(newValue) =>
									setAttributes({
										imgTextColor: {
											...imgTextColor,
											color: newValue,
										},
									})
								}
							/>
						</>
					)}
					<Divider position={"sp-w-100pct bottom"} />
					<SelectField
						label={__("Position", "post-carousel")}
						attributes={imgTextPosition}
						attributesKey={"imgTextPosition"}
						setAttributes={setAttributes}
						items={[
							{ label: "Top", value: "top" },
							{ label: "Bottom", value: "bottom" },
							{ label: "Over the image (Pro)", value: "over-img", disabled: true },
						]}
					/>
					<SPToggleGroupControl
						label={__("Horizontal Alignment", "post-carousel")}
						attributes={imgTextHorizontal}
						attributesKey={"imgTextHorizontal"}
						setAttributes={setAttributes}
						items={[
							{ label: <AlignLeft />, value: "left" },
							{ label: <AlignCenter />, value: "center" },
							{ label: <AlignRight />, value: "right" },
						]}
					/>
					{"over-img" === imgTextPosition && (
						<SPToggleGroupControl
							label={__("Vertical Alignment", "post-carousel")}
							attributes={imgTextVertical}
							attributesKey={"imgTextVertical"}
							setAttributes={setAttributes}
							extraClass={" sp-svg-rotate-90"}
							items={[
								{ label: <FlexAlignStart />, value: "top" },
								{ label: <FlexAlignCenter />, value: "center" },
								{ label: <FlexAlignEnd />, value: "bottom" },
							]}
							rotate={true}
						/>
					)}
				</>
			)}
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={imgTextPadding}
				attributesKey={"imgTextPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{ top: 20, right: 20, bottom: 20, left: 20 }}
			/>
		</>
	);
};

export const SmartImageEffectTab = ({ attributes, setAttributes }) => {
	const {
		// imgAnimationEffect,
		// imgAnimationSpeed,
		// imgAnimationLineWidth,
		imgAnimationNormal,
		imgHoverOverlayEnable,
		imgHoverOverlayColor,
		imgMaskingEnable,
		imageShapeSet,
		selectImageShape,
		imgHoverEffectOpacity,
	} = attributes;

	const imageAnimAllItems =
		!imgMaskingEnable || (imgMaskingEnable && "custom" !== imageShapeSet && "original" === selectImageShape);

	return (
		<>
			{/* <SelectField
				label={__("Animation Effect", "post-carousel")}
				attributes={imgAnimationEffect}
				attributesKey={"imgAnimationEffect"}
				setAttributes={setAttributes}
				items={[
					{ label: "Select an Effect", value: "" },
					{ label: "Jazz", value: "jazz" },
					{ label: "Apollo", value: "apollo" },
					{ label: "Selena", value: "selena" },
					{ label: "Oscar", value: "oscar" },
					{ label: "Layla", value: "layla" },
				]}
			/> */}
			{/* TODO: Upcoming Version. */}
			{/* <SPRangeControl
				label={__("Animation Speed", "post-carousel")}
				attributes={imgAnimationSpeed}
				attributesKey={"imgAnimationSpeed"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				min={0}
				max={5}
				step={0.1}
			/>
			<SPRangeControl
				label={__("Line Width", "post-carousel")}
				attributes={imgAnimationLineWidth}
				attributesKey={"imgAnimationLineWidth"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				min={0}
				max={5}
				step={0.1}
			/> */}
			<SelectField
				label={__("Image Animation", "post-carousel")}
				attributes={imgAnimationNormal}
				attributesKey={"imgAnimationNormal"}
				setAttributes={setAttributes}
				items={imageAnimAllItems ? hoverEffectItems : hoverEffectShortItems}
			/>
			<Toggle
				label={__("Hover Overlay", "post-carousel")}
				attributes={imgHoverOverlayEnable}
				attributesKey={"imgHoverOverlayEnable"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{imgHoverOverlayEnable && (
				<>
					<Background
						label={__("Overlay Type", "post-carousel")}
						attributes={imgHoverOverlayColor}
						attributesKey={"imgHoverOverlayColor"}
						setAttributes={setAttributes}
						items={solidGradientBgType}
						colorType={"color"}
						colorLabel={"Overlay Color"}
					/>
					<SPRangeControl
						label={__("Overlay Opacity", "post-carousel")}
						attributes={imgHoverEffectOpacity}
						attributesKey={"imgHoverEffectOpacity"}
						setAttributes={setAttributes}
						defaultValue={0.6}
						min={0}
						step={0.1}
						max={1}
					/>
				</>
			)}
		</>
	);
};
