export const buttonsAttributes = {
	uniqueId: {
		type: "string",
		default: "",
	},
	innerBlockId: {
		type: "string",
		default: "",
	},
	dynamicCss: {
		type: "string",
	},
	additionalCssClass: {
		type: "string",
	},
	fullWidthBtnEnable: {
		type: "boolean",
		default: false,
	},
	buttonGap: {
		type: "object",
		default: {
			device: {
				Desktop: 16,
				Tablet: "",
				Mobile: "",
			},
			unit: {
				Desktop: "px",
				Tablet: "px",
				Mobile: "px",
			},
		},
	},
	buttonsMargin: {
		type: "object",
		default: {
			device: {
				Desktop: {
					top: "0",
					right: "0",
					bottom: "15",
					left: "0",
				},
				Tablet: {
					top: "",
					right: "",
					bottom: "",
					left: "",
				},
				Mobile: {
					top: "",
					right: "",
					bottom: "",
					left: "",
				},
			},
			unit: {
				Desktop: "px",
				Tablet: "px",
				Mobile: "px",
			},
			allChange: false,
		},
	},

	buttonsHorizontalAlignment: {
		type: "string",
		default: "flex-start",
	},
	buttonsVerticalAlignment: {
		type: "string",
		default: "flex-start",
	},
	buttonsAlignment: {
		type: "string",
		default: "horizontal",
	},
};
