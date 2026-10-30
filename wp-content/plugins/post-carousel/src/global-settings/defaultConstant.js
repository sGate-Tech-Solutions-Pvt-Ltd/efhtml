const defaultSizes = (fontSize, lineHeight = "") => {
	return {
		fontSize: {
			device: {
				Desktop: fontSize,
				Tablet: "",
				Mobile: "",
			},
			unit: {
				Desktop: "px",
				Tablet: "px",
				Mobile: "px",
			},
		},
		lineHeight: {
			device: {
				Desktop: lineHeight,
				Tablet: "",
				Mobile: "",
			},
		},
	};
};
export const defaultTypography = (slug, title, type, sizes) => {
	return {
		slug,
		type,
		title,
		typography: {
			family: "",
			fontWeight: "",
			style: "",
			transform: "",
			decoration: "",
		},
		letterSpacing: {
			device: {
				Desktop: "",
				Tablet: "",
				Mobile: "",
			},
			unit: {
				Desktop: "px",
				Tablet: "px",
				Mobile: "px",
			},
		},
		wordSpacing: {
			device: {
				Desktop: "",
				Tablet: "",
				Mobile: "",
			},
			unit: {
				Desktop: "px",
				Tablet: "px",
				Mobile: "px",
			},
		},
		sizes,
	};
};

export const customTypography = (key, title, type, fontSize) => {
	return {
		...defaultTypography(key, title, type),
		...defaultSizes(fontSize),
	};
};

const headingSizes = [
	defaultSizes(44),
	defaultSizes(32),
	defaultSizes(24),
	defaultSizes(22),
	defaultSizes(20),
	defaultSizes(18),
];

const bodySizes = [defaultSizes(18), defaultSizes(16), defaultSizes(14), defaultSizes(12)];

const buttonSizes = [defaultSizes(18), defaultSizes(16)];

const typographySizes = {
	heading: [defaultTypography("heading", "Heading", "heading", headingSizes)],
	body: [defaultTypography("body", "Body", "body", bodySizes)],
	button: [defaultTypography("button", "Button", "button", buttonSizes)],
	custom: [],
};

export const globalTypographyDefault = {
	overrideThemeTypo: false,
	fontList: [],
	typographySizes,
	typographyCss: "",
};

export const shadowDefaultList = {
	shadowList: [
		{
			title: "Subtle (1dp)",
			custom: false,
			slug: "subtle-1dp",
			type: "outset",
			"x-offset": "0",
			"y-offset": "1",
			blur: "2",
			speared: "0",
			color: "rgba(0, 0, 0, 0.12)",
		},
		{
			title: "Light (2dp)",
			slug: "light-2dp",
			custom: false,
			type: "outset",
			"x-offset": "0",
			"y-offset": "2",
			blur: "4",
			speared: "0",
			color: "rgba(0, 0, 0, 0.14)",
		},
		{
			title: "Medium (4dp)",
			slug: "medium-4dp",
			custom: false,
			type: "outset",
			"x-offset": "0",
			"y-offset": "4",
			blur: "6",
			speared: "0",
			color: "rgba(0, 0, 0, 0.16)",
		},
		{
			title: "Strong (8dp)",
			slug: "strong-8dp",
			custom: false,
			type: "outset",
			"x-offset": "0",
			"y-offset": "8",
			blur: "18",
			speared: "0",
			color: "rgba(0, 0, 0, 0.18)",
		},
		{
			title: "Deep (12dp)",
			slug: "deep-12dp",
			custom: false,
			type: "outset",
			"x-offset": "0",
			"y-offset": "12",
			blur: "17",
			speared: "0",
			color: "rgba(0, 0, 0, 0.20)",
		},
		{
			title: "Sharp (4dp)",
			slug: "sharp-4dp",
			custom: false,
			type: "outset",
			"x-offset": "4",
			"y-offset": "4",
			blur: "0",
			speared: "0",
			color: "rgba(0, 0, 0, 0.25)",
		},
	],
	shadowRootCSS: "",
};

export const breakpointDefault = {
	container: "1200",
	tablet: "1023",
	mobile: "767",
};
