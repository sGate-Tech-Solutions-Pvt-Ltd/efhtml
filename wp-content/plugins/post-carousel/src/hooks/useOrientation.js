import { useMemo } from "@wordpress/element";

export const useOrientation = ({
	postCardPadding,
	postCardBorder,
	postCardBorderWidth,
	contentAreaPadding,
	catTabCategoryLineHeight,
	catTabCategoryBorder,
	imageOverlayCustomColor,
}) => {
	const emptyDesktopValue = { top: "", right: "", bottom: "", left: "" };
	return useMemo(
		() => ({
			orientation_one: {
				contentAlignment: "left",
				imageOverlayType: "full",
				catTabCategoryPosition: "",

				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 0,
							right: 20,
							bottom: 20,
							left: 20,
						},
					},
				},

				catTabCategoryLineHeight: {
					...catTabCategoryLineHeight,
					device: {
						...catTabCategoryLineHeight.device,
						Desktop: 120,
						Tablet: 120,
						Mobile: 100,
					},
					unit: {
						...catTabCategoryLineHeight.unit,
						Desktop: "%",
						Tablet: "%",
						Mobile: "%",
					},
				},
				catTabCategoryBorder: {
					...catTabCategoryBorder,
					style: "solid",
				},
				excerptShow: false,
				imageOverlayCustomColor: {
					...imageOverlayCustomColor,
					color: {
						...imageOverlayCustomColor.color,
						solidColor: "#00000080",
					},
				},
			},
			orientations_two: {
				contentAlignment: "center",
				catTabCategoryPosition: "",
				imageOverlayType: "orientations-two",
				excerptShow: false,
				catTabCategoryBorder: {
					...catTabCategoryBorder,
					style: "solid",
				},

				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 0,
							right: 25,
							bottom: 35,
							left: 25,
						},
					},
				},
			},
			orientation_three: {
				imageOverlayType: "orientation-three",
				contentAlignment: "left",
				catTabCategoryPosition: "top-left",

				postCardPadding: {
					...postCardPadding,
					device: {
						...postCardPadding.device,
						Desktop: emptyDesktopValue,
					},
				},

				postCardBorder: { ...postCardBorder, style: "" },
				catTabCategoryBorder: {
					...catTabCategoryBorder,
					style: "none",
				},

				postCardBorderWidth: {
					...postCardBorderWidth,
					device: {
						...postCardBorderWidth.device,
						Desktop: emptyDesktopValue,
					},
				},
				excerptShow: false,
				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 20,
							right: 10,
							bottom: 15,
							left: 10,
						},
					},
				},
			},
			orientations_four: {
				imageOverlayType: "orientations-four",
				catTabCategoryPosition: "",
				contentAlignment: "center",
				excerptShow: false,
				catTabCategoryBorder: {
					...catTabCategoryBorder,
					style: "solid",
				},

				contentAreaPadding: {
					...contentAreaPadding,
					device: {
						...contentAreaPadding.device,
						Desktop: {
							top: 20,
							right: 20,
							bottom: 20,
							left: 20,
						},
					},
				},
			},
		}),
		[]
	);
};
