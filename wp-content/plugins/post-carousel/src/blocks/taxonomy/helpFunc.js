import { useState, useEffect, useMemo } from "@wordpress/element";
import { jsonParse, randomSolidColor } from "../shared/helpFn";

export const hoverAnimate = (hoverAnimation, layout) => {
	let transformValue = "";
	let initialValue = "";

	switch (hoverAnimation) {
		case "zoomIn":
			transformValue = "scale(1.05)";
			initialValue = "scale(1)";
			break;
		case "zoomOut":
			transformValue = "scale(1)";
			initialValue = "scale(1.05)";
			break;
		case "slideLeft":
			transformValue = "scale(1.10) translateX(-10px)";
			initialValue = "scale(1.10) translateX(3%)";
			break;
		case "slideRight":
			transformValue = "scale(1.10) translateX(10px)";
			initialValue = "scale(1.10) translateX(-3%)";
			break;
		default:
			transformValue = "scale(1)";
			initialValue = "scale(1)";
	}

	if (layout === "taxonomy-layout-one") {
		return {};
	}

	return { transformValue, initialValue };
};

export const useOverlay = (attributes) => {
	const { imageOverlayColor, imageOverlayHoverColor, imageOverlayCustomColor, imageOverlayCustomHoverColor, layout } =
		attributes;

	const [randomColor, setRandomColor] = useState(randomSolidColor(imageOverlayColor));
	const [randomHoverColor, setRandomHoverColor] = useState(randomSolidColor(imageOverlayHoverColor));

	useEffect(() => {
		setRandomColor(randomSolidColor(imageOverlayColor));
	}, [imageOverlayColor]);

	useEffect(() => {
		setRandomHoverColor(randomSolidColor(imageOverlayHoverColor));
	}, [imageOverlayHoverColor]);

	const gradientMap = {
		"warm-sunset": "linear-gradient(2deg, rgba(244, 66, 70, 0.4) 33.02%, rgba(221, 36, 118, 0.4) 98.51%)",
		"ocean-breeze": "linear-gradient(1deg, rgba(43, 88, 118, 0.4) 0.5%, rgba(78, 67, 118, 0.4) 99.51%)",
		"royal-gold": "linear-gradient(1deg, rgba(255, 215, 0, 0.4) 0.5%, rgba(184, 134, 11, 0.4) 99.51%)",
		"cool-blues": "linear-gradient(1deg, rgba(30, 60, 114, 0.4) 0.5%, rgba(42, 82, 152, 0.4) 99.51%)",
		"soft-pastel": "linear-gradient(1deg, rgba(252, 227, 138, 0.4) 0.5%, rgba(243, 129, 129, 0.4) 99.51%)",
		"elegant-purple": "linear-gradient(180deg, rgba(65, 41, 90, 0.4) 0%, rgba(47, 7, 67, 0.4) 100%)",
		"energetic-orange": "linear-gradient(180deg, rgba(255, 81, 47, 0.4) 0%, rgba(240, 152, 25, 0.4) 100%)",
	};

	const overlayColor = useMemo(() => {
		if (["multi-gradient", "multi-solid"].includes(imageOverlayColor)) {
			return randomColor;
		}
		if (imageOverlayColor === "custom") {
			return imageOverlayCustomColor;
		}
		return gradientMap[imageOverlayColor] || "transparent";
	}, [imageOverlayColor, imageOverlayCustomColor, randomColor]);

	const overlayHoverColor = useMemo(() => {
		if (["multi-gradient", "multi-solid"].includes(imageOverlayHoverColor)) {
			return randomHoverColor;
		}
		if (imageOverlayHoverColor === "custom") {
			return imageOverlayCustomHoverColor;
		}
		return gradientMap[imageOverlayHoverColor] || "transparent";
	}, [imageOverlayHoverColor, imageOverlayCustomHoverColor, randomHoverColor]);

	if (layout === "taxonomy-layout-one") {
		return {};
	}

	return {
		overlayColor,
		overlayHoverColor,
	};
};
