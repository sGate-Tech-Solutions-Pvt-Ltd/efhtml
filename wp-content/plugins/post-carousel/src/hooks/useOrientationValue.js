import { useMemo } from "@wordpress/element";

export const useOrientationConfig = ({ postCardPadding, postCardBorder, postCardBorderWidth, contentAreaPadding }) => {
	const emptyDesktopValue = { top: "", right: "", bottom: "", left: "" };
	return useMemo(
		() => ({
			orientation_one: {
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				// Reset Six styles
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				catTabCategoryPosition: "",
			},
			orientation_two: {
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				// Reset six styles
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				catTabCategoryPosition: "",
			},
			orientation_three: {
				contentAlignment: "center",
				catTabCategoryPosition: "center-bottom",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				// Reset six styles
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
			},
			orientation_four: {
				catTabCategoryPosition: "top-right",
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 0,
							right: 15,
							bottom: 15,
							left: 15,
						},
						Tablet: {
							top: 0,
							right: 15,
							bottom: 15,
							left: 15,
						},
						Mobile: {
							top: 0,
							right: 15,
							bottom: 15,
							left: 15,
						},
					},
				},
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
			},
			orientation_five: {
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							top: 15,
							right: 15,
							bottom: 15,
							left: 15,
						},
					},
				},
				postCardBorder: { ...postCardBorder, style: "solid" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: { top: 1, right: 1, bottom: 1, left: 1 },
					},
				},
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Six styles
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				catTabCategoryPosition: "",
			},
			orientation_six: {
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 15,
							right: 15,
							bottom: 15,
							left: 15,
						},
						Tablet: {
							top: 12,
							right: 12,
							bottom: 12,
							left: 12,
						},
						Mobile: {
							top: 12,
							right: 12,
							bottom: 12,
							left: 12,
						},
					},
				},
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				catTabCategoryPosition: "",
			},
			orientation_seven: {
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 15,
							right: 15,
							bottom: 15,
							left: 15,
						},
						Tablet: {
							top: 12,
							right: 12,
							bottom: 12,
							left: 12,
						},
						Mobile: {
							top: 12,
							right: 12,
							bottom: 12,
							left: 12,
						},
					},
				},
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: {
							top: "",
							right: "",
							bottom: "",
							left: "",
						},
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				catTabCategoryPosition: "",
			},
			orientation_eight: {
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 15,
							right: 15,
							bottom: 15,
							left: 15,
						},
						Tablet: {
							top: 12,
							right: 12,
							bottom: 12,
							left: 12,
						},
						Mobile: {
							top: 12,
							right: 12,
							bottom: 12,
							left: 12,
						},
					},
				},
				// Reset Three Styles
				contentAlignment: "left",
				// Reset Five styles
				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},
				postCardBorder: { ...postCardBorder, style: "" },
				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				catTabCategoryPosition: "",
			},
		}),
		[]
	);
};
