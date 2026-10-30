import { __ } from "@wordpress/i18n";
import {
	Background,
	Border,
	BoxShadow,
	Divider,
	Layouts,
	SelectField,
	Spacing,
	SPRangeControl,
	SPToggleGroupControl,
	Toggle,
} from "../../components";
import useLayouts from "../../hooks/useLayouts";
import { checkInArray } from "../shared/helpFn";
import { AlignCenter, AlignLeft, AlignRight, AlignStretch } from "../../icons/icons";
import { useMemo, useState } from "@wordpress/element";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";
import { useSelect } from "@wordpress/data";
import { useDeviceType } from "../../controls/controls";
import ProInfo from "../../components/proInfo/proInfo";

export const SocialProfilesGeneralTab = ({ attributes, setAttributes }) => {
	const {
		blockName,
		layout,
		socialListViewEnable,
		columns,
		socialHorizontalGap,
		socialVerticalGap,
		socialHoverEffect,
		socialAlignment,
		uniqueId,
		socialContentAreaBorder,
		socialIconColor,
		socialIconBg,
	} = attributes;

	const [columnKey, setColumnKey] = useState("");

	const layoutDefault = useMemo(
		() => ({
			"social-profiles-layout-one": {
				socialIconDivider: false,
				socialLabelEnable: false,
				socialSubTextEnable: false,
				socialContentAreaBorder: {
					...socialContentAreaBorder,
					style: "none",
				},
				socialIconCustomColorEnable: false,
				socialIconBg: {
					...socialIconBg,
					color: { ...socialIconBg.color, solidColor: "" },
				},
				socialIconColor: { ...socialIconColor, color: "#FFFFFF" },
			},
			"social-profiles-layout-two": {
				socialIconDivider: false,
				socialLabelEnable: true,
				socialSubTextEnable: false,
				socialContentAreaBorder: {
					...socialContentAreaBorder,
					style: "none",
				},
				socialIconCustomColorEnable: false,
				socialIconBg: {
					...socialIconBg,
					color: { ...socialIconBg.color, solidColor: "" },
				},
				socialIconColor: { ...socialIconColor, color: "#FFFFFF" },
			},
			"social-profiles-layout-three": {
				socialIconDivider: true,
				socialLabelEnable: true,
				socialSubTextEnable: true,
				socialContentAreaBorder: {
					...socialContentAreaBorder,
					style: "none",
				},
				socialIconCustomColorEnable: true,
				socialIconBg: {
					...socialIconBg,
					color: { ...socialIconBg.color, solidColor: "#E0E0E000" },
				},
				socialIconColor: { ...socialIconColor, color: "#2F343A;" },
			},
			"social-profiles-layout-four": {
				socialIconDivider: false,
				socialLabelEnable: true,
				socialSubTextEnable: true,
				socialContentAreaBorder: {
					...socialContentAreaBorder,
					style: "solid",
				},
				socialIconCustomColorEnable: false,
				socialIconBg: {
					...socialIconBg,
					color: { ...socialIconBg.color, solidColor: "" },
				},
				socialIconColor: { ...socialIconColor, color: "#FFFFFF" },
			},
			"social-profiles-layout-five": {
				socialIconDivider: false,
				socialLabelEnable: true,
				socialSubTextEnable: true,
				socialContentAreaBorder: {
					...socialContentAreaBorder,
					style: "solid",
				},
				socialIconCustomColorEnable: false,
				socialIconBg: {
					...socialIconBg,
					color: { ...socialIconBg.color, solidColor: "" },
				},
				socialIconColor: { ...socialIconColor, color: "#FFFFFF" },
			},
		}),
		[]
	);

	const layoutChangeHandler = (newValue) => {
		if (newValue === layout) {
			return;
		}
		setColumnKey(newValue);
		const newData = {
			layout: newValue,
			...layoutDefault[newValue],
		};
		if (checkInArray(newValue)) {
			newData.socialLabelPosition = "bottom";
		} else {
			newData.socialLabelPosition = "right";
		}

		setAttributes(newData);
	};
	const parentClientId = uniqueId.replace("sp-social-profiles-", "");
	const childBlocks = useSelect((select) => select("core/block-editor").getBlocks(parentClientId), [parentClientId]);
	const deviceType = useDeviceType();

	const layouts = useLayouts(blockName, layout);

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Layouts", "post-carousel")}
					attributes={layout}
					attributesKey={"layout"}
					setAttributes={setAttributes}
					items={layouts}
					showDemoTitle={true}
					grid={3}
					onChange={layoutChangeHandler}
					displayActive={true}
				/>
			)}
			{/* <Toggle
				label={ __( 'List View', 'post-carousel' ) }
				attributes={ socialListViewEnable }
				attributesKey={ 'socialListViewEnable' }
				setAttributes={ setAttributes }
			/> */}
			<SPRangeControl
				// key={ columnKey }
				label={__("Columns", "post-carousel")}
				attributes={columns}
				attributesKey={"columns"}
				setAttributes={setAttributes}
				max={10}
				min={1}
				defaultValue={{ value: "" }}
				pro={true}
			/>
			{"social-profiles-layout-five" !== layout && (
				<>
					<SPRangeControl
						label={__("Horizontal Gap", "post-carousel")}
						attributes={socialHorizontalGap}
						attributesKey={"socialHorizontalGap"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 24 }}
					/>
					{childBlocks.length > columns ||
						(columns?.device?.[deviceType] && (
							<SPRangeControl
								label={__("Vertical Gap", "post-carousel")}
								attributes={socialVerticalGap}
								attributesKey={"socialVerticalGap"}
								setAttributes={setAttributes}
								units={["px", "%", "em"]}
								defaultValue={{ unit: "px", value: 24 }}
							/>
						))}
				</>
			)}
			<SelectField
				label={__("Hover Effect", "post-carousel")}
				attributes={socialHoverEffect}
				attributesKey={"socialHoverEffect"}
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: "Darken", value: "darken" },
					{ label: "Lift", value: "lift" },
					{ label: "Scale", value: "scale" },
					{ label: "Lift & Scale", value: "lift-scale" },
					{ label: "Lift More", value: "lift-more" },
					{ label: "Scale More", value: "scale-more" },
					{ label: "Lift & Scale More", value: "lift-scale-more" },
				]}
				pro={true}
			/>
			{["social-profiles-layout-one", "social-profiles-layout-two"].includes(layout) && (
				<SPToggleGroupControl
					label={__("Alignment", "post-carousel")}
					attributes={socialAlignment}
					attributesKey={"socialAlignment"}
					setAttributes={setAttributes}
					items={[
						{ label: <AlignLeft />, value: "left" },
						{ label: <AlignCenter />, value: "center" },
						{ label: <AlignRight />, value: "right" },
						{ label: <AlignStretch />, value: "Stretch" },
					]}
				/>
			)}
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};

export const SocialProfilesIconGeneralTab = ({ attributes, setAttributes }) => {
	const { socialIconEnable, socialIconSize, socialIconBGSize, layout, socialIconDivider } = attributes;
	return (
		<>
			{/* <Toggle
				label={ __( 'Social Icon', 'post-carousel' ) }
				attributes={ socialIconEnable }
				attributesKey={ 'socialIconEnable' }
				setAttributes={ setAttributes }
			/> */}
			{socialIconEnable && (
				<>
					<SPRangeControl
						label={__("Icon Size", "post-carousel")}
						attributes={socialIconSize}
						attributesKey={"socialIconSize"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 18 }}
					/>
					<SPRangeControl
						label={__("Background Size", "post-carousel")}
						attributes={socialIconBGSize}
						attributesKey={"socialIconBGSize"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 36 }}
					/>
					{"social-profiles-layout-three" === layout && (
						<Toggle
							label={__("Divider", "post-carousel")}
							attributes={socialIconDivider}
							attributesKey={"socialIconDivider"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
		</>
	);
};

export const SocialProfilesLabelGeneralTab = ({ attributes, setAttributes }) => {
	const { socialLabelEnable, socialLabelPosition, socialLabelGap, socialSubTextEnable, socialSubTextGap, layout } =
		attributes;
	const textPositionOption = useMemo(() => {
		if (!checkInArray(layout)) {
			return [
				{ label: "Left", value: "left" },
				{ label: "Right", value: "right" },
			];
		} else {
			return [
				{ label: "Top", value: "top" },
				{ label: "Bottom", value: "bottom" },
			];
		}
	}, [layout]);

	return (
		<>
			{/* <Toggle
				label={ __( 'Social Label', 'post-carousel' ) }
				attributes={ socialLabelEnable }
				attributesKey={ 'socialLabelEnable' }
				setAttributes={ setAttributes }
			/> */}
			{socialLabelEnable && (
				<>
					<SPToggleGroupControl
						label={__("Label Position", "post-carousel")}
						attributes={socialLabelPosition}
						attributesKey={"socialLabelPosition"}
						setAttributes={setAttributes}
						items={textPositionOption}
					/>
					<SPRangeControl
						label={__("Gap", "post-carousel")}
						attributes={socialLabelGap}
						attributesKey={"socialLabelGap"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 8 }}
					/>
				</>
			)}
			{/* <Toggle
				label={ __( 'Sub Text', 'post-carousel' ) }
				attributes={ socialSubTextEnable }
				attributesKey={ 'socialSubTextEnable' }
				setAttributes={ setAttributes }
			/> */}
			{socialSubTextEnable && layout !== "social-profiles-layout-three" && (
				<>
					<SPRangeControl
						label={__("Gap Between Social Label", "post-carousel")}
						attributes={socialSubTextGap}
						attributesKey={"socialSubTextGap"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 8 }}
					/>
				</>
			)}
		</>
	);
};

export const SocialProfilesContentTab = ({ attributes, setAttributes }) => {
	const {
		socialContentAreaBG,
		socialContentAreaBorder,
		socialContentAreaBorderWidth,
		socialContentAreaBorderRadius,
		socialContentAreaBorderHover,
		socialContentAreaBorderWidthHover,
		socialContentAreaBorderRadiusHover,
		socialContentAreaShadowEnable,
		socialContentAreaShadow,
		socialContentAreaShadowHoverEnable,
		socialContentAreaShadowHover,
		socialContentAreaPadding,
		socialContentAreaMargin,
		// socialContentAreaBgBlur,
	} = attributes;
	const [bgState, setBgState] = useState("color");

	return (
		<>
			<SPToggleGroupControl
				attributes={bgState}
				onClick={(newValue) => setBgState(newValue)}
				items={[
					{ label: "Normal", value: "color" },
					{ label: "Hover", value: "hover" },
				]}
			/>
			<Background
				label={__("Background Type", "post-carousel")}
				attributes={socialContentAreaBG}
				attributesKey={"socialContentAreaBG"}
				setAttributes={setAttributes}
				colorType={bgState}
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
			{/* <SPRangeControl
				label={ __( 'Background Blur', 'post-carousel' ) }
				attributes={ socialContentAreaBgBlur }
				attributesKey={ 'socialContentAreaBgBlur' }
				setAttributes={ setAttributes }
				units={ [ '%' ] }
				min={ 0 }
				max={ 100 }
				defaultValue={ { unit: '%', value: 0 } }
			/> */}
			{"color" === bgState ? (
				<>
					<Border
						attributes={{
							border: socialContentAreaBorder,
							borderWidth: socialContentAreaBorderWidth,
						}}
						attributesKey={{
							border: "socialContentAreaBorder",
							borderWidth: "socialContentAreaBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={socialContentAreaBorderRadius}
						attributesKey={"socialContentAreaBorderRadius"}
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
						attributes={socialContentAreaShadowEnable}
						attributesKey={"socialContentAreaShadowEnable"}
						setAttributes={setAttributes}
					/>
					{socialContentAreaShadowEnable && (
						<BoxShadow
							attributes={socialContentAreaShadow}
							attributesKey={"socialContentAreaShadow"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			) : (
				<>
					<Border
						label={__("Border Hover", "post-carousel")}
						attributes={{
							border: socialContentAreaBorderHover,
							borderWidth: socialContentAreaBorderWidthHover,
						}}
						attributesKey={{
							border: "socialContentAreaBorderHover",
							borderWidth: "socialContentAreaBorderWidthHover",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius Hover", "post-carousel")}
						attributes={socialContentAreaBorderRadiusHover}
						attributesKey={"socialContentAreaBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
					<Toggle
						label={__("Box Shadow Hover", "post-carousel")}
						attributes={socialContentAreaShadowHoverEnable}
						attributesKey={"socialContentAreaShadowHoverEnable"}
						setAttributes={setAttributes}
					/>
					{socialContentAreaShadowHoverEnable && (
						<BoxShadow
							customLabel={__("Box Shadow Hover", "post-carousel")}
							attributes={socialContentAreaShadowHover}
							attributesKey={"socialContentAreaShadowHover"}
							setAttributes={setAttributes}
						/>
					)}
				</>
			)}
			<Divider position={"sp-w-100pct bottom"} />
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={socialContentAreaPadding}
				attributesKey={"socialContentAreaPadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: { top: 0, right: 0, bottom: 0, left: 0 },
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={socialContentAreaMargin}
				attributesKey={"socialContentAreaMargin"}
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
