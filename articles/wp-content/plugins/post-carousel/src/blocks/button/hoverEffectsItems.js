import {
	SmartButtonGhostIcon,
	SmartButtonHoverMultilayersIcon,
	SmartButtonHoverShineIcon,
	SmartButtonHoverRaiseShadowIcon,
	SmartButtonHoverGradShadowIcon,
	SmartButtonHoverFlipIcon,
	SmartButtonDefaultIcon,
	SmartButtonHoverSlideRightIcon,
	SmartButtonHoverSlideSkewIcon,
	SmartButtonHoverSlidTopIcon,
	SmartButtonHoverNeoFollowIcon,
	SmartButtonHoverDrawOutlineIcon,
} from "../../icons/icons";

const hoverEffectsItems = (buttonStyle, hoverEffects) => {
	let effect = [];
	if (buttonStyle === "default") {
		effect = [
			{
				icon: <SmartButtonDefaultIcon value={hoverEffects} />,
				label: "Default",
				value: "defaultHover",
			},
			{
				icon: <SmartButtonHoverRaiseShadowIcon value={hoverEffects} />,
				label: "Raise Shadow",
				value: "raiseShadow",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverGradShadowIcon value={hoverEffects} />,
				label: "Grad Shadow",
				value: "gradShadow",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverShineIcon value={hoverEffects} />,
				label: "Shine",
				value: "shine",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverMultilayersIcon value={hoverEffects} />,
				label: "Multi-layers",
				value: "multiLayers",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverFlipIcon value={hoverEffects} />,
				label: "Flip",
				value: "flip",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
		];
	} else if (buttonStyle === "ghost") {
		effect = [
			{
				icon: <SmartButtonGhostIcon value={hoverEffects} />,
				label: "Default",
				value: "ghostDefault",
			},
			{
				icon: <SmartButtonHoverSlideRightIcon value={hoverEffects} />,
				label: "Slide Right",
				value: "slideRight",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverSlideSkewIcon value={hoverEffects} />,
				label: "Slide Skew",
				value: "slideSkew",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverSlidTopIcon value={hoverEffects} />,
				label: "Slide Top",
				value: "slideTop",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverNeoFollowIcon value={hoverEffects} />,
				label: "Neo Follow",
				value: "neoFollow",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
			{
				icon: <SmartButtonHoverDrawOutlineIcon value={hoverEffects} />,
				label: "Draw Outline",
				value: "drawOutline",
				type: "pro",
				demoLink: "https://wpsmartpost.com/blocks/#demoId3588",
			},
		];
	}
	return effect;
};

export default hoverEffectsItems;
