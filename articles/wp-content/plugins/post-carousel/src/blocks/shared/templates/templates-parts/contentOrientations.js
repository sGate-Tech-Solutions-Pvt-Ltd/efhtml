import { memo } from "@wordpress/element";
import Layouts from "../../../../components/layouts/layouts";
import {
	OrientationEightIcon,
	OrientationFourIcon,
	OrientationOneIcon,
	OrientationSevenIcon,
	OrientationSixIcon,
	OrientationThreeIcon,
	OrientationTwoIcon,
	OrientationFiveIcons,
	CarouselTwoOrientationOneIcon,
	CarouselTwoOrientationTwoIcon,
	CarouselTwoOrientationThreeIcon,
	CarouselTwoOrientationFourIcon,
} from "../../../../icons/icons";

const ContentOrientations = ({
	label = "",
	attributes,
	setAttributes,
	attributesKey,
	onChange = false,
	blockName = "",
}) => {
	const orientationIconArray = ["post-timeline-one", "post-timeline-three"].includes(blockName)
		? [
				{
					icon: <OrientationOneIcon value={attributes} />,
					value: "orientation_one",
				},
				{
					icon: <OrientationTwoIcon value={attributes} />,
					value: "orientation_two",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationThreeIcon value={attributes} />,
					value: "orientation_three",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationFourIcon value={attributes} />,
					value: "orientation_four",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationFiveIcons value={attributes} />,
					value: "orientation_five",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				}, // card
			]
		: [
				{
					icon: <OrientationOneIcon value={attributes} />,
					value: "orientation_one",
				},
				{
					icon: <OrientationTwoIcon value={attributes} />,
					value: "orientation_two",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationThreeIcon value={attributes} />,
					value: "orientation_three",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationFourIcon value={attributes} />,
					value: "orientation_four",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationFiveIcons value={attributes} />,
					value: "orientation_five",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationSixIcon value={attributes} />,
					value: "orientation_six",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationSevenIcon value={attributes} />,
					value: "orientation_seven",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
				{
					icon: <OrientationEightIcon value={attributes} />,
					value: "orientation_eight",
					type: "pro",
					demoLink: "https://wpsmartpost.com/pricing/"
				},
			];

	const carouselTwoOrientationIconArray = [
		{
			icon: <CarouselTwoOrientationOneIcon value={attributes} />,
			value: "orientation_one",
		},
		{
			icon: <CarouselTwoOrientationTwoIcon value={attributes} />,
			value: "orientations_two",
			type: "pro",
			demoLink: "https://wpsmartpost.com/pricing/"
		},
		{
			icon: <CarouselTwoOrientationThreeIcon value={attributes} />,
			value: "orientation_three",
			type: "pro",
			demoLink: "https://wpsmartpost.com/pricing/"
		},
		{
			icon: <CarouselTwoOrientationFourIcon value={attributes} />,
			value: "orientations_four",
			type: "pro",
			demoLink: "https://wpsmartpost.com/pricing/"
		},
	];

	return (
		<Layouts
			attributes={attributes}
			setAttributes={setAttributes}
			attributesKey={attributesKey}
			displayActive={true}
			grid={4}
			proBtnClass="sp-smart-small-size"
			label={label}
			onChange={onChange}
			items={
				["post-carousel-two", "post-grid-two"].includes(blockName)
					? carouselTwoOrientationIconArray
					: orientationIconArray
			}
		/>
	);
};

export default memo(ContentOrientations);
