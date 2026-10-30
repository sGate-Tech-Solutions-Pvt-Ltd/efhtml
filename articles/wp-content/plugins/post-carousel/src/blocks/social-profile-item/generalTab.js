import { __ } from "@wordpress/i18n";
import {
	Background,
	Border,
	Divider,
	InputControl,
	MediaPicker,
	SelectField,
	Spacing,
	SPToggleGroupControl,
} from "../../components";
import { useState } from "@wordpress/element";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";

export const SocialSingleGeneralTab = ({ attributes, setAttributes }) => {
	const { socialSingleProfile, socialSingleLink, socialSingleLinkOpen, socialSingleLinkRelation, socialSingleIcon } =
		attributes;

	return (
		<>
			<SelectField
				label={__("Select Social Profile", "post-carousel")}
				attributes={socialSingleProfile}
				attributesKey={"socialSingleProfile"}
				setAttributes={setAttributes}
				items={[
					{ label: "Facebook", value: "facebook" },
					{ label: "X", value: "x (twitter)" },
					{ label: "LinkedIn", value: "linkedin" },
					{ label: "Pinterest", value: "pinterest" },
					{ label: "Email", value: "mail" },
					{ label: "Instagram", value: "instagram" },
					{ label: "VK", value: "vkontakte" },
					{ label: "digg", value: "digg" },
					{ label: "Tumblr", value: "tumblr" },
					{ label: "Reddit", value: "reddit" },
					{ label: "WhatsApp", value: "whatsapp" },
					{ label: "Pocket", value: "pocket" },
					{ label: "Xing", value: "xing" },
				]}
				onChange={(newValue) =>
					setAttributes({
						socialSingleProfile: newValue,
						socialSingleIcon: newValue,
					})
				}
			/>
			<InputControl
				label={__("Social Link", "post-carousel")}
				attributes={socialSingleLink}
				attributesKey={"socialSingleLink"}
				setAttributes={setAttributes}
				inputType={"url"}
				flex={false}
				placeholder={"#"}
			/>
			<SelectField
				label={__("Link Open In", "post-carousel")}
				attributes={socialSingleLinkOpen}
				attributesKey={"socialSingleLinkOpen"}
				setAttributes={setAttributes}
				items={[
					{ label: "New Tab", value: "_blank" },
					{ label: "Current Tab", value: "_self" },
				]}
			/>
			<SelectField
				label={__("Link Relation", "post-carousel")}
				attributes={socialSingleLinkRelation}
				attributesKey={"socialSingleLinkRelation"}
				setAttributes={setAttributes}
				items={[
					{ label: "None", value: "none" },
					{ label: "No Follow", value: "nofollow" },
					{ label: "No Opener", value: "noopener" },
					{ label: "Sponsored", value: "sponsored" },
				]}
			/>
		</>
	);
};

export const SocialSingleIconGeneralTab = ({ attributes, setAttributes }) => {
	const { socialSingleIconType, socialSingleIcon, socialSingleImage } = attributes;

	return (
		<>
			<SPToggleGroupControl
				label={__("Icon Type", "post-carousel")}
				attributes={socialSingleIconType}
				attributesKey={"socialSingleIconType"}
				setAttributes={setAttributes}
				items={[
					{ label: "Original", value: "icon" },
					{ label: "Image", value: "image", disabled: true },
					{ label: "None", value: "none" },
				]}
			/>
			{/* { 'icon' === socialSingleIconType && (
				<SPIconPicker
					label={ __( 'Icon Source', 'post-carousel' ) }
					attributes={ socialSingleIcon }
					attributesKey={ 'socialSingleIcon' }
					setAttributes={ setAttributes }
					closeBtn={ true }
				/>
			) } */}
			{"image" === socialSingleIconType && (
				<MediaPicker
					label={__("Image", "post-carousel")}
					imageKey={"socialSingleImage"}
					enableImageSize={false}
					setAttributes={setAttributes}
					backgroundImage={socialSingleImage}
				/>
			)}
		</>
	);
};

export const SocialSingleLabelGeneralTab = ({ attributes, setAttributes }) => {
	const { socialSingleLabel, socialSingleSubText, socialSingleProfile, labelEnableParent, subTextEnableParent } =
		attributes;

	return (
		<>
			{labelEnableParent && (
				<InputControl
					label={__("Social Label", "post-carousel")}
					attributes={socialSingleLabel}
					attributesKey={"socialSingleLabel"}
					setAttributes={setAttributes}
					inputType={"text"}
					placeholder={socialSingleProfile}
					flex={false}
				/>
			)}
			{subTextEnableParent && (
				<InputControl
					label={__("Social Sub Text Label", "post-carousel")}
					attributes={socialSingleSubText}
					attributesKey={"socialSingleSubText"}
					setAttributes={setAttributes}
					inputType={"text"}
					flex={false}
				/>
			)}
		</>
	);
};

export const SocialSingleContentAreaTab = ({ attributes, setAttributes }) => {
	const {
		socialSingleAreaBG,
		socialSingleAreaBorder,
		socialSingleAreaBorderWidth,
		socialSingleAreaBorderRadius,
		socialSingleAreaBorderHover,
		socialSingleAreaBorderWidthHover,
		socialSingleAreaBorderRadiusHover,
		socialSinglePadding,
		socialSingleMargin,
		socialSingleContentAreaBgBlur,
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
				attributes={socialSingleAreaBG}
				attributesKey={"socialSingleAreaBG"}
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
				attributes={ socialSingleContentAreaBgBlur }
				attributesKey={ 'socialSingleContentAreaBgBlur' }
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
							border: socialSingleAreaBorder,
							borderWidth: socialSingleAreaBorderWidth,
						}}
						attributesKey={{
							border: "socialSingleAreaBorder",
							borderWidth: "socialSingleAreaBorderWidth",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius", "post-carousel")}
						attributes={socialSingleAreaBorderRadius}
						attributesKey={"socialSingleAreaBorderRadius"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
				</>
			) : (
				<>
					<Border
						label={__("Border Hover", "post-carousel")}
						attributes={{
							border: socialSingleAreaBorderHover,
							borderWidth: socialSingleAreaBorderWidthHover,
						}}
						attributesKey={{
							border: "socialSingleAreaBorderHover",
							borderWidth: "socialSingleAreaBorderWidthHover",
						}}
						setAttributes={setAttributes}
						btnType={"normal"}
					/>
					<Spacing
						label={__("Border Radius Hover", "post-carousel")}
						attributes={socialSingleAreaBorderRadiusHover}
						attributesKey={"socialSingleAreaBorderRadiusHover"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{
							unit: "px",
							value: { top: 0, right: 0, bottom: 0, left: 0 },
						}}
						indicator={"radius"}
					/>
				</>
			)}
			<Divider position="bottom sp-w-100pct" />
			<Spacing
				label={__("Padding", "post-carousel")}
				attributes={socialSinglePadding}
				attributesKey={"socialSinglePadding"}
				setAttributes={setAttributes}
				units={["px", "%", "em"]}
				defaultValue={{
					unit: "px",
					value: { top: 0, right: 0, bottom: 0, left: 0 },
				}}
			/>
			<Spacing
				label={__("Margin", "post-carousel")}
				attributes={socialSingleMargin}
				attributesKey={"socialSingleMargin"}
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
