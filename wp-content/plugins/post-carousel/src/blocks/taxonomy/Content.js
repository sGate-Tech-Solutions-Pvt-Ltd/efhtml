import { useState } from "@wordpress/element";
import {
	Background,
	BoxShadow,
	Divider,
	SelectField,
	Spacing,
	SpColorPicker,
	SPToggleGroupControl,
} from "../../components";
import { __, _n } from "@wordpress/i18n";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";
import Border from "../../components/border/border";
import Toggle from "../../components/toggle/toggle";

export const Content = ({ attributes, setAttributes }) => {
	const {
		contentVerticalPosition,
		contentHorizontalPosition,
		blockName,
		postCardBg,
		postCardBorder,
		postCardHoverBorder,
		postCardBorderWidth,
		postCardBorderRadius,
		postCardBoxShadowEnable,
		postCardBoxShadow,
		postCardPadding,
		postCardHoverBorderWidth,
		postCardHoverBorderRadius,
		postCardHoverBoxShadowEnable,
		postCardHoverBoxShadow,
		contentAreaMargin,
		blockLayoutName,
		hoverAnimation,
		layout,
		displayOverlyThum,
		displayOverlyHoverThum,
		imageOverlayColor,
		imageOverlayCustomColor,
		imageOverlayHoverColor,
		imageOverlayCustomHoverColor,
		contentMultiColorBg,
		contentAreaBg,
		catRadius,
		showHideDivider,
	} = attributes;

	const [contentAreaBgStyleType, setContentAreaBgStyleType] = useState("color");

	return (
		<>
			{!["taxonomy-layout-five", "taxonomy-layout-six", "taxonomy-layout-one"].includes(layout) && (
				<SelectField
					label={__("Hover Animation", "post-carousel")}
					attributes={hoverAnimation}
					attributesKey={"hoverAnimation"}
					setAttributes={setAttributes}
					flexStyle={false}
					items={[
						{ label: "Zoom In", value: "zoomIn" },
						{ label: "Zoom Out", value: "zoomOut" },
						{ label: "Slide Left", value: "slideLeft" },
						{ label: "Slide Right", value: "slideRight" },
					]}
					defaultOption="No Animation"
				/>
			)}

			{[
				"taxonomy-layout-four",
				"taxonomy-layout-seven",
				"taxonomy-layout-eight",
				"taxonomy-layout-five",
				"taxonomy-layout-six",
			].includes(layout) && (
				<>
					<SPToggleGroupControl
						label={__("Horizontal Position", "post-carousel")}
						attributes={contentHorizontalPosition}
						attributesKey="contentHorizontalPosition"
						setAttributes={setAttributes}
						items={
							[
								"post-slider-layout-five",
								"post-slider-two-layout-three",
								"thumbnail-slider-layout-six",
							].includes(blockLayoutName)
								? [
										{ label: "Left", value: "left" },
										{ label: "Right", value: "right" },
									]
								: [
										{ label: "Left", value: "left" },
										{ label: "Center", value: "center" },
										{ label: "Right", value: "right" },
									]
						}
					/>
				</>
			)}

			{["taxonomy-layout-seven"].includes(layout) && (
				<>
					<SPToggleGroupControl
						label={__("Vertical Position", "post-carousel")}
						attributes={contentVerticalPosition}
						attributesKey="contentVerticalPosition"
						setAttributes={setAttributes}
						items={[
							{ label: "Top", value: "start" },
							{ label: "Center", value: "center" },
							{ label: "Bottom", value: "end" },
						]}
					/>
				</>
			)}

			<SPToggleGroupControl
				attributes={contentAreaBgStyleType}
				items={
					"thumbnail-slider-two" !== blockName
						? [
								{ label: "Normal", value: "color" },
								{ label: "Hover", value: "hover" },
							]
						: [
								{ label: "Normal", value: "color" },
								{ label: "Hover & Active", value: "hover" },
							]
				}
				onClick={(val) => setContentAreaBgStyleType(val)}
			/>

			{layout !== "taxonomy-layout-five" &&
				layout !== "taxonomy-layout-six" &&
				layout !== "taxonomy-layout-one" && (
					<>
						{contentAreaBgStyleType === "color" ? (
							<>
								{"taxonomy-layout-eight" === layout && (
									<Toggle
										label={__("Multi-Color Background", "post-carousel")}
										attributes={contentMultiColorBg}
										attributesKey={"contentMultiColorBg"}
										setAttributes={setAttributes}
									/>
								)}

								{!["taxonomy-layout-four", "taxonomy-layout-seven", "taxonomy-layout-eight"].includes(
									layout
								) && (
									<Toggle
										label={__("Display Category Thumb", "post-carousel")}
										attributes={displayOverlyThum}
										attributesKey={"displayOverlyThum"}
										setAttributes={setAttributes}
									/>
								)}

								{displayOverlyThum && (
									<>
										<SelectField
											label={__("Overlay Color", "post-carousel")}
											attributes={imageOverlayColor}
											attributesKey={"imageOverlayColor"}
											setAttributes={setAttributes}
											items={[
												{
													label: "No Overlay",
													value: "no-overlay",
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
										{"custom" === imageOverlayColor && (
											<SpColorPicker
												label={__("Color", "post-carousel")}
												value={imageOverlayCustomColor}
												onChange={(newColor) =>
													setAttributes({
														imageOverlayCustomColor: newColor,
													})
												}
												defaultColor="#eecacaff"
											/>
										)}
									</>
								)}
							</>
						) : (
							<>
								{!["taxonomy-layout-four", "taxonomy-layout-seven", "taxonomy-layout-eight"].includes(
									layout
								) && (
									<Toggle
										label={__("Display Category Thumb", "post-carousel")}
										attributes={displayOverlyHoverThum}
										attributesKey={"displayOverlyHoverThum"}
										setAttributes={setAttributes}
									/>
								)}

								{displayOverlyHoverThum && (
									<>
										<SelectField
											label={__("Overlay Color", "post-carousel")}
											attributes={imageOverlayHoverColor}
											attributesKey={"imageOverlayHoverColor"}
											setAttributes={setAttributes}
											items={[
												{
													label: "No Overlay",
													value: "no-overlay",
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
										{"custom" === imageOverlayHoverColor && (
											<SpColorPicker
												label={__("Color", "post-carousel")}
												value={imageOverlayCustomHoverColor}
												onChange={(newColor) =>
													setAttributes({
														imageOverlayCustomHoverColor: newColor,
													})
												}
												defaultColor="#eecacaff"
											/>
										)}
									</>
								)}
							</>
						)}
					</>
				)}

			{(layout === "taxonomy-layout-five" ||
				(layout === "taxonomy-layout-eight" && !contentMultiColorBg) ||
				layout === "taxonomy-layout-four" ||
				layout === "taxonomy-layout-six" ||
				(!displayOverlyThum && contentAreaBgStyleType === "color") ||
				(contentAreaBgStyleType === "hover" && !displayOverlyHoverThum)) && (
				<Background
					label={__("Background Type", "post-carousel")}
					colorLabel="Solid Color"
					defaultColor="#fff"
					attributes={
						["taxonomy-layout-eight", "taxonomy-layout-four"].includes(layout) ? contentAreaBg : postCardBg
					}
					attributesKey={
						["taxonomy-layout-eight", "taxonomy-layout-four"].includes(layout)
							? "contentAreaBg"
							: "postCardBg"
					}
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

			{contentAreaBgStyleType === "color" ? (
				<>
					{(layout !== "taxonomy-layout-one" || !showHideDivider) && (
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
								units={["Px", "%", "em"]}
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
						</>
					)}

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
						/>
					)}
				</>
			) : (
				<>
					{(layout !== "taxonomy-layout-one" || !showHideDivider) && (
						<>
							<Border
								attributes={{
									border: postCardHoverBorder,
									borderWidth: postCardHoverBorderWidth,
								}}
								attributesKey={{
									border: "postCardHoverBorder",
									borderWidth: "postCardHoverBorderWidth",
								}}
								setAttributes={setAttributes}
								btnType="normal"
							/>

							<Spacing
								label={__("Border Radius", "post-carousel")}
								attributes={postCardHoverBorderRadius}
								attributesKey={"postCardHoverBorderRadius"}
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
						</>
					)}

					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={postCardHoverBoxShadowEnable}
						attributesKey={"postCardHoverBoxShadowEnable"}
						setAttributes={setAttributes}
					/>

					{postCardHoverBoxShadowEnable && (
						<BoxShadow
							label={__("Box Shadow", "post-carousel")}
							attributes={postCardHoverBoxShadow}
							attributesKey={"postCardHoverBoxShadow"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}

			<Divider position={"sp-w-100pct bottom"} />

			{["taxonomy-layout-four", "taxonomy-layout-eight"].includes(layout) && (
				<Spacing
					label={__("Cat Border Radius", "post-carousel")}
					attributes={catRadius}
					attributesKey={"catRadius"}
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
			)}
			{layout !== "taxonomy-layout-three" && (
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
			{layout !== "taxonomy-layout-six" && (
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
			)}
		</>
	);
};
