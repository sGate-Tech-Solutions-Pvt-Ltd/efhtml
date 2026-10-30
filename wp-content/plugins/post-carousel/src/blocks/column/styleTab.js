import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
	Background,
	Border,
	BoxShadow,
	Divider,
	Spacing,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
} from "../../components";
import { allBgType, imageBlandMode, overlayTypeItems, solidGradientBgType } from "../../controls/constants";
import SelectField from "../../components/selectField/selectField";
import { useDeviceType } from "../../controls/controls";

export const ContainerColumnStyleTab = ({ attributes, setAttributes }) => {
	const [bgState, setBgState] = useState("color");
	// const [ shadowState, setShadowState ] = useState( 'color' );
	const {
		columnBg,
		columnBgImage,
		columnBgVideo,
		columnBorder,
		columnBorderWidth,
		columnBorderWidthHover,
		columnBorderRadius,
		columnBorderRadiusHover,
		columnBoxShadowEnable,
		columnBoxShadow,
		columnPadding,
		columnMargin,
		columnBgImageHover,
		columnBoxShadowEnableHover,
		columnBoxShadowHover,
		columnOverlayType,
		columnOverlayBg,
		columnOverlayOpacity,
		columnOverlayBlandMode,
		columnOverlayTypeHover,
		columnOverlayOpacityHover,
		columnOverlayBlandModeHover,
	} = attributes;
	const deviceType = useDeviceType();

	const columnBgBtn = bgState === "color" ? allBgType : solidGradientBgType;

	const overlayTypeHandler = (newValue, key) => {
		setAttributes({
			[key]: newValue,
			columnOverlayBg: {
				...columnOverlayBg,
				[bgState]: {
					...columnOverlayBg[bgState],
					style: newValue === "gradient-overlay" ? "gradient" : "bgColor",
				},
			},
		});
	};
	const overlayOpacityHandler = (newValue, key) => {
		const attr = attributes[key];
		setAttributes({
			[key]: {
				...attr,
				device: { ...attr.device, [deviceType]: newValue.value },
			},
		});
	};

	return (
		<>
			<SPToggleGroupControl
				attributes={bgState}
				onClick={(value) => setBgState(value)}
				items={[
					{
						label: "Normal",
						value: "color",
					},
					{
						label: "Hover",
						value: "hover",
					},
				]}
			/>
			<Background
				label={__("Background", "post-carousel")}
				attributes={columnBg}
				attributesKey={"columnBg"}
				setAttributes={setAttributes}
				colorType={bgState}
				imageObj={{
					imageKey: "columnBgImage",
					hoverKey: "columnBgImageHover",
					backgroundImage: columnBgImage,
					hoverImg: columnBgImageHover,
				}}
				videoObj={{
					imageKey: "columnBgVideo",
					backgroundImage: columnBgVideo,
				}}
				items={columnBgBtn}
			/>
			{"color" === bgState && (
				<>
					{["image", "video"].includes(columnBg.color.style) && (
						<>
							<SelectField
								label={__("Overlay Type", "post-carousel")}
								attributes={columnOverlayType}
								attributesKey={"columnOverlayType"}
								setAttributes={setAttributes}
								onChange={(newValue) => overlayTypeHandler(newValue, "columnOverlayType")}
								items={overlayTypeItems}
							/>
							{"no-overlay" !== columnOverlayType && (
								<>
									<p style={{ marginBottom: "0" }}>
										{columnOverlayBg[bgState].style === "gradient" && "Gradient Color"}
									</p>
									<Background
										attributes={columnOverlayBg}
										attributesKey={"columnOverlayBg"}
										setAttributes={setAttributes}
										colorType={bgState}
									/>
									<SPRangeControl
										label={__("Opacity", "post-carousel")}
										attributes={columnOverlayOpacity}
										attributesKey={"columnOverlayOpacity"}
										setAttributes={setAttributes}
										units={["%"]}
										max={100}
										defaultValue={{
											unit: "%",
											value: 75,
										}}
										customValue={columnOverlayOpacity.device?.[deviceType]}
										onValueChange={(newValue) =>
											overlayOpacityHandler(newValue, "columnOverlayOpacity")
										}
									/>
									<SelectField
										label={__("Blend Mode", "post-carousel")}
										attributes={columnOverlayBlandMode}
										attributesKey={"columnOverlayBlandMode"}
										setAttributes={setAttributes}
										items={imageBlandMode}
									/>
								</>
							)}
						</>
					)}
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: columnBorder,
							borderWidth: columnBorderWidth,
						}}
						attributesKey={{
							border: "columnBorder",
							borderWidth: "columnBorderWidth",
						}}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 1 }}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={columnBorderRadius}
						attributesKey={"columnBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow", "post-carousel")}
						attributes={columnBoxShadowEnable}
						attributesKey={"columnBoxShadowEnable"}
						setAttributes={setAttributes}
					/>
					{columnBoxShadowEnable && (
						<>
							<BoxShadow
								label={__("Box Shadow Value", "post-carousel")}
								attributes={columnBoxShadow}
								attributesKey={"columnBoxShadow"}
								setAttributes={setAttributes}
							/>
						</>
					)}
				</>
			)}
			{"hover" === bgState && (
				<>
					{"image" === columnBg.hover.style && (
						<>
							<SelectField
								label={__("Overlay Type on Hover", "post-carousel")}
								attributes={columnOverlayTypeHover}
								attributesKey={"columnOverlayTypeHover"}
								setAttributes={setAttributes}
								onChange={(newValue) => overlayTypeHandler(newValue, "columnOverlayTypeHover")}
								items={overlayTypeItems}
							/>
							{"no-overlay" !== columnOverlayTypeHover && (
								<>
									<p style={{ marginBottom: "0" }}>
										{columnOverlayBg[bgState].style === "gradient" && "Gradient Color"}
									</p>
									<Background
										attributes={columnOverlayBg}
										attributesKey={"columnOverlayBg"}
										setAttributes={setAttributes}
										colorType={bgState}
									/>
									<SPRangeControl
										label={__("Hover Opacity", "post-carousel")}
										attributes={columnOverlayOpacityHover}
										attributesKey={"columnOverlayOpacityHover"}
										setAttributes={setAttributes}
										units={["%"]}
										max={100}
										defaultValue={{
											unit: "%",
											value: 50,
										}}
										customValue={columnOverlayOpacityHover.device?.[deviceType]}
										onValueChange={(newValue) =>
											overlayOpacityHandler(newValue, "columnOverlayOpacityHover")
										}
									/>
									<SelectField
										label={__("Blend Mode", "post-carousel")}
										attributes={columnOverlayBlandModeHover}
										attributesKey={"columnOverlayBlandModeHover"}
										setAttributes={setAttributes}
										items={imageBlandMode}
									/>
								</>
							)}
						</>
					)}
					<Border
						label={__("Border", "post-carousel")}
						attributes={{
							border: columnBorder,
							borderWidth: columnBorderWidthHover,
						}}
						attributesKey={{
							border: "columnBorder",
							borderWidth: "columnBorderWidthHover",
						}}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: "" }}
						btnType={"hover"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={columnBorderRadiusHover}
						attributesKey={"columnBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow on Hover", "post-carousel")}
						attributes={columnBoxShadowEnableHover}
						attributesKey={"columnBoxShadowEnableHover"}
						setAttributes={setAttributes}
					/>
					{columnBoxShadowEnableHover && (
						<BoxShadow
							label={__("Box Shadow Value on Hover", "post-carousel")}
							attributes={columnBoxShadowHover}
							attributesKey={"columnBoxShadowHover"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			<Divider position={"w-100pct bottom"} />
			{/* <Border
				label={ __( 'Border', 'post-carousel' ) }
				attributes={ {
					border: columnBorder,
					borderWidth: columnBorderWidth,
				} }
				attributesKey={ {
					border: 'columnBorder',
					borderWidth: 'columnBorderWidth',
				} }
				setAttributes={ setAttributes }
			/>
			<Spacing
				label={ __( 'Border Radius', 'post-carousel' ) }
				attributes={ columnBorderRadius }
				attributesKey={ 'columnBorderRadius' }
				setAttributes={ setAttributes }
				units={ [ 'px', '%', 'em' ] }
				defaultValue={ { unit: 'px', value: 0 } }
			/>
			<SPToggleGroupControl
				attributes={ shadowState }
				onClick={ ( value ) => setShadowState( value ) }
				items={ [
					{
						label: 'Normal',
						value: 'color',
					},
					{
						label: 'Hover',
						value: 'hover',
					},
				] }
			/>
			{ 'color' === shadowState ? (
				<>
					<Toggle
						label={ __( 'Box Shadow', 'post-carousel' ) }
						attributes={ columnBoxShadowEnable }
						attributesKey={ 'columnBoxShadowEnable' }
						setAttributes={ setAttributes }
					/>
					{ columnBoxShadowEnable && (
						<BoxShadow
							label={ __( 'Box Shadow', 'post-carousel' ) }
							attributes={ columnBoxShadow }
							attributesKey={ 'columnBoxShadow' }
							setAttributes={ setAttributes }
						/>
					) }
				</>
			) : (
				<>
					<Toggle
						label={ __( 'Box Shadow', 'post-carousel' ) }
						attributes={
							columnBoxShadowEnableHover
						}
						attributesKey={ 'columnBoxShadowEnableHover' }
						setAttributes={ setAttributes }
					/>
					{ columnBoxShadowEnableHover && (
						<BoxShadow
							label={ __( 'Box Shadow', 'post-carousel' ) }
							attributes={ columnBoxShadowHover }
							attributesKey={ 'columnBoxShadowHover' }
							setAttributes={ setAttributes }
						/>
					) }
				</>
			) } */}
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={columnPadding}
				attributesKey={"columnPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: { top: 0, right: 0, bottom: 0, left: 0 },
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={columnMargin}
				attributesKey={"columnMargin"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: { top: 0, right: 0, bottom: 0, left: 0 },
				}}
			/>
		</>
	);
};

export const ColumnAdvanceVisibilityTab = ({ attributes, setAttributes }) => {
	const { columnVisibilityHideDesktop, columnVisibilityHideTablet, columnVisibilityHideMobile } = attributes;

	return (
		<>
			<Toggle
				label={__("Hide on Desktop", "post-carousel")}
				attributes={columnVisibilityHideDesktop}
				attributesKey={"columnVisibilityHideDesktop"}
				setAttributes={setAttributes}
				pro={true}
			/>
			<Toggle
				label={__("Hide on Tablet", "post-carousel")}
				attributes={columnVisibilityHideTablet}
				attributesKey={"columnVisibilityHideTablet"}
				setAttributes={setAttributes}
				pro={true}
			/>
			<Toggle
				label={__("Hide on Mobile", "post-carousel")}
				attributes={columnVisibilityHideMobile}
				attributesKey={"columnVisibilityHideMobile"}
				setAttributes={setAttributes}
				pro={true}
			/>
		</>
	);
};
