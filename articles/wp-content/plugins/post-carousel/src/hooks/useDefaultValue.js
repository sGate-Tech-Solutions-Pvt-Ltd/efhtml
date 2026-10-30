const useDefaultValue = (blockName) => {
	const defaultValue = {
		titleFontSize: 22,
		imageWidth: 100,
		imageSpace: 12,
		largeItemTitleFontSize: 26,
		metaColor: "#333333",
		badgesFontSize: 10,
		carouselArrowHorizontal: 30,
	};

	const defaultData = {
		"post-list-two": {
			...defaultValue,
			titleFontSize: "",
			imageWidth: "",
			imageSpace: "",
		},
		"post-list-three": {
			...defaultValue,
			largeItemTitleFontSize: "",
			titleFontSize: "",
			metaColor: "",
		},
		"post-carousel": {
			...defaultValue,
			carouselArrowHorizontal: -22,
		},
		"post-carousel-two": {
			...defaultValue,
			carouselArrowHorizontal: -22,
		},
		"post-timeline-three": {
			...defaultValue,
			carouselArrowHorizontal: -10,
		},
		"post-slider-two": {
			...defaultValue,
			carouselArrowHorizontal: "",
		},
		"thumbnail-slider-two": {
			...defaultValue,
			carouselArrowHorizontal: "",
		},
		default: {
			...defaultValue,
		},
	};

	return defaultData[blockName] ? defaultData[blockName] : defaultData["default"];
};

export default useDefaultValue;
