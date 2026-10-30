import {
	LayoutEight,
	LayoutFive,
	LayoutFour,
	LayoutOne,
	LayoutSeven,
	LayoutSix,
	LayoutThree,
	LayoutTwo,
} from "../blocks/taxonomy/layoutIcons";

import {
	GridFiveLayoutsEight,
	GridFiveLayoutsFive,
	GridFiveLayoutsFour,
	GridFiveLayoutsNine,
	GridFiveLayoutsOne,
	GridFiveLayoutsSeven,
	GridFiveLayoutsSix,
	GridFiveLayoutsThree,
	GridFiveLayoutsTwo,
	GridFourLayoutsFive,
	GridFourLayoutsFour,
	GridFourLayoutsOne,
	GridFourLayoutsSix,
	GridFourLayoutsThree,
	GridFourLayoutsTwo,
	GridOneLayoutEight,
	GridOneLayoutFive,
	GridOneLayoutFour,
	GridOneLayoutNine,
	GridOneLayoutOne,
	GridOneLayoutSeven,
	GridOneLayoutSix,
	GridOneLayoutSixUpdated,
	GridOneLayoutThree,
	GridThreeLayoutsFour,
	GridThreeLayoutsOne,
	GridThreeLayoutsThree,
	GridThreeLayoutsTwo,
	GridSixLayoutsFour,
	GridSixLayoutsOne,
	GridSixLayoutsThree,
	GridSixLayoutsTwo,
	TimelineOneLayoutFive,
	TimelineOneLayoutFour,
	TimelineOneLayoutOne,
	TimelineOneLayoutSix,
	TimelineOneLayoutTwo,
	PostSliderLayoutOne,
	PostSliderLayoutTwo,
	PostSliderLayoutThree,
	// PostSliderLayoutFive,
	PostSliderLayoutSix,
	TimelineTwoLayoutOne,
	TimelineTwoLayoutTwo,
	TimelineTwoLayoutFour,
	TimelineTwoLayoutFive,
	TimelineTwoLayoutSix,
	PostThumbnailLayoutSix,
	PostThumbnailLayoutFive,
	PostThumbnailLayoutFour,
	PostThumbnailLayoutThree,
	PostThumbnailLayoutTwo,
	PostThumbnailLayoutOne,
	TimelineThreeLayoutOne,
	TimelineThreeLayoutTwo,
	ListOneLayoutOne,
	ListOneLayoutTwo,
	ListOneLayoutThree,
	ListOneLayoutFour,
	ListOneLayoutFive,
	ListOneLayoutSix,
	GridThreeLayoutsFive,
	PostSliderTwoLayoutOne,
	PostSliderTwoLayoutTwo,
	PostSliderTwoLayoutThree,
	PostListTwoLayoutOne,
	PostListTwoLayoutTwo,
	PostListTwoLayoutThree,
	PostListTwoLayoutFour,
	PostListTwoLayoutFive,
	PostListTwoLayoutSix,
	PostListTwoLayoutSeven,
	PostListTwoLayoutEight,
	PostListThreeLayoutOne,
	PostListThreeLayoutTwo,
	PostListThreeLayoutThree,
	PostListThreeLayoutFour,
	PostListThreeLayoutFive,
	PostListThreeLayoutSix,
	ThumbnailSliderTwoLayoutOne,
	ThumbnailSliderTwoLayoutTwo,
	ThumbnailSliderTwoLayoutThree,
	ThumbnailSliderTwoLayoutFour,
	ThumbnailSliderTwoLayoutFive,
	SocialProfilesLayoutOne,
	SocialProfilesLayoutTwo,
	SocialProfilesLayoutThree,
	SocialProfilesLayoutFour,
	SocialProfilesLayoutFive,
} from "../icons/layoutIcons";
import {
	ContainerColumnTwoLayoutOne,
	ContainerColumnTwoLayoutTwo,
	ContainerColumnTwoLayoutThree,
	ContainerColumnTwoLayoutFour,
	ContainerColumnTwoLayoutFive,
	ContainerColumnThreeLayoutOne,
	ContainerColumnThreeLayoutTwo,
	ContainerColumnThreeLayoutThree,
	ContainerColumnThreeLayoutFour,
	ContainerColumnThreeLayoutFive,
	ContainerColumnThreeLayoutSix,
	ContainerColumnOneLayoutOne,
	ContainerColumnFourLayoutOne,
	ContainerColumnFourLayoutTwo,
	ContainerColumnFourLayoutThree,
	ContainerColumnFiveLayoutOne,
	ContainerColumnSixLayoutOne,
	ContainerColumnMultiRowLayoutOne,
	ContainerColumnMultiRowLayoutTwo,
	ContainerColumnMultiRowLayoutThree,
	ContainerColumnMultiRowLayoutFour,
	ContainerColumnMultiRowLayoutFive,
} from "../blocks/container/containerLayoutIcon";
import { priceLink } from "../blocks/shared/helpFn";

const useLayouts = (blockName, activeLayout) => {
	const gridOneLayouts = [
		{
			icon: <GridOneLayoutOne value={activeLayout} />,
			value: "grid-one-layout-one",
		},
		{
			icon: <GridOneLayoutThree value={activeLayout} />,
			value: "grid-one-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutFour value={activeLayout} />,
			value: "grid-one-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutFive value={activeLayout} />,
			value: "grid-one-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutSix value={activeLayout} />,
			value: "grid-one-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutSixUpdated value={activeLayout} />,
			value: "grid-one-layout-six-updated",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutSeven value={activeLayout} />,
			value: "grid-one-layout-seven",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutEight value={activeLayout} />,
			value: "grid-one-layout-eight",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridOneLayoutNine value={activeLayout} />,
			value: "grid-one-layout-nine",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const gridSixLayouts = [
		{
			icon: <GridSixLayoutsOne value={activeLayout} />,
			value: "grid-six-layout-one",
		},
		{
			icon: <GridSixLayoutsTwo value={activeLayout} />,
			value: "grid-six-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridSixLayoutsThree value={activeLayout} />,
			value: "grid-six-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridSixLayoutsFour value={activeLayout} />,
			value: "grid-six-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const gridThreeLayouts = [
		{
			icon: <GridThreeLayoutsOne value={activeLayout} />,
			value: "grid-three-layout-one",
		},
		{
			icon: <GridThreeLayoutsTwo value={activeLayout} />,
			value: "grid-three-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridThreeLayoutsThree value={activeLayout} />,
			value: "grid-three-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridThreeLayoutsFour value={activeLayout} />,
			value: "grid-three-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridThreeLayoutsFive value={activeLayout} />,
			value: "grid-three-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const gridFourLayouts = [
		{
			icon: <GridFourLayoutsOne value={activeLayout} />,
			value: "grid-four-layout-one",
		},
		{
			icon: <GridFourLayoutsTwo value={activeLayout} />,
			value: "grid-four-layout-two",
		},
		{
			icon: <GridFourLayoutsThree value={activeLayout} />,
			value: "grid-four-layout-three",
		},
		{
			icon: <GridFourLayoutsFour value={activeLayout} />,
			value: "grid-four-layout-four",
		},
		{
			icon: <GridFourLayoutsFive value={activeLayout} />,
			value: "grid-four-layout-five",
		},
		{
			icon: <GridFourLayoutsSix value={activeLayout} />,
			value: "grid-four-layout-six",
		},
	];
	const gridFiveLayouts = [
		{
			icon: <GridFiveLayoutsOne value={activeLayout} />,
			value: "grid-five-layout-one",
		},
		{
			icon: <GridFiveLayoutsTwo value={activeLayout} />,
			value: "grid-five-layout-two",
			type: "pro",
			demoLink: priceLink,
			
		},
		{
			icon: <GridFiveLayoutsThree value={activeLayout} />,
			value: "grid-five-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridFiveLayoutsFour value={activeLayout} />,
			value: "grid-five-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridFiveLayoutsFive value={activeLayout} />,
			value: "grid-five-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridFiveLayoutsSix value={activeLayout} />,
			value: "grid-five-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridFiveLayoutsSeven value={activeLayout} />,
			value: "grid-five-layout-seven",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridFiveLayoutsEight value={activeLayout} />,
			value: "grid-five-layout-eight",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <GridFiveLayoutsNine value={activeLayout} />,
			value: "grid-five-layout-nine",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const listOneLayouts = [
		{
			icon: <ListOneLayoutOne value={activeLayout} />,
			value: "list-one-layout-one",
		},
		{
			icon: <ListOneLayoutTwo value={activeLayout} />,
			value: "list-one-layout-two",
			// type: "pro",
			// demoLink: priceLink,
		},
		{
			icon: <ListOneLayoutThree value={activeLayout} />,
			value: "list-one-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <ListOneLayoutFour value={activeLayout} />,
			value: "list-one-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <ListOneLayoutFive value={activeLayout} />,
			value: "list-one-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <ListOneLayoutSix value={activeLayout} />,
			value: "list-one-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const listTowLayouts = [
		{
			icon: <PostListTwoLayoutOne value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-one",
		},
		{
			icon: <PostListTwoLayoutTwo value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-two",
		},
		{
			icon: <PostListTwoLayoutThree value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-three",
		},
		{
			icon: <PostListTwoLayoutFour value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-four",
		},
		{
			icon: <PostListTwoLayoutFive value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-five",
		},
		{
			icon: <PostListTwoLayoutSix value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-six",
		},
		{
			icon: <PostListTwoLayoutSeven value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-seven",
		},
		{
			icon: <PostListTwoLayoutEight value={activeLayout} />,
			value: "sp-smart-post-list-two-layout-eight",
		},
	];
	const listThreeLayouts = [
		{
			icon: <PostListThreeLayoutOne value={activeLayout} />,
			value: "sp-smart-post-list-three-layout-one",
		},
		{
			icon: <PostListThreeLayoutTwo value={activeLayout} />,
			value: "sp-smart-post-list-three-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostListThreeLayoutThree value={activeLayout} />,
			value: "sp-smart-post-list-three-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostListThreeLayoutFour value={activeLayout} />,
			value: "sp-smart-post-list-three-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostListThreeLayoutFive value={activeLayout} />,
			value: "sp-smart-post-list-three-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostListThreeLayoutSix value={activeLayout} />,
			value: "sp-smart-post-list-three-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const timelineOneLayouts = [
		{
			icon: <TimelineOneLayoutOne value={activeLayout} />,
			value: "timeline-one-layout-one",
		},
		{
			icon: <TimelineOneLayoutTwo value={activeLayout} />,
			value: "timeline-one-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <TimelineOneLayoutFour value={activeLayout} />,
			value: "timeline-one-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <TimelineOneLayoutFive value={activeLayout} />,
			value: "timeline-one-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <TimelineOneLayoutSix value={activeLayout} />,
			value: "timeline-one-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const timelineTwoLayouts = [
		{
			icon: <TimelineTwoLayoutOne value={activeLayout} />,
			value: "timeline-one-layout-one",
		},
		{
			icon: <TimelineTwoLayoutTwo value={activeLayout} />,
			value: "timeline-one-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <TimelineTwoLayoutFour value={activeLayout} />,
			value: "timeline-one-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <TimelineTwoLayoutFive value={activeLayout} />,
			value: "timeline-one-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <TimelineTwoLayoutSix value={activeLayout} />,
			value: "timeline-one-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const timelineThreeLayouts = [
		{
			icon: <TimelineThreeLayoutOne value={activeLayout} />,
			value: "timeline-three-layout-one",
		},
		{
			icon: <TimelineThreeLayoutTwo value={activeLayout} />,
			value: "timeline-three-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const postSliderLayouts = [
		{
			icon: <PostSliderLayoutOne value={activeLayout} />,
			value: "post-slider-layout-one",
		},
		{
			icon: <PostSliderLayoutTwo value={activeLayout} />,
			value: "post-slider-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		// {
		// 	icon: <PostSliderLayoutThree value={ activeLayout } />,
		// 	value: 'post-slider-layout-three',
		// },
		// {
		// 	icon: <PostSliderLayoutFive value={ activeLayout } />,
		// 	value: 'post-slider-layout-four',
		// },
		{
			icon: <PostSliderLayoutSix value={activeLayout} />,
			value: "post-slider-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const postThumbnailLayouts = [
		{
			icon: <PostThumbnailLayoutOne value={activeLayout} />,
			value: "thumbnail-slider-layout-one",
		},
		{
			icon: <PostThumbnailLayoutTwo value={activeLayout} />,
			value: "thumbnail-slider-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostThumbnailLayoutThree value={activeLayout} />,
			value: "thumbnail-slider-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostThumbnailLayoutFour value={activeLayout} />,
			value: "thumbnail-slider-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostThumbnailLayoutFive value={activeLayout} />,
			value: "thumbnail-slider-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <PostThumbnailLayoutSix value={activeLayout} />,
			value: "thumbnail-slider-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
	];
	const postSliderTwoLayout = [
		{
			icon: <PostSliderTwoLayoutOne value={activeLayout} />,
			value: "post-slider-two-layout-one",
		},
		{
			icon: <PostSliderTwoLayoutTwo value={activeLayout} />,
			value: "post-slider-two-layout-two",
		},
		{
			icon: <PostSliderTwoLayoutThree value={activeLayout} />,
			value: "post-slider-two-layout-three",
		},
	];
	const postThumbnailTwoLayout = [
		{
			icon: <ThumbnailSliderTwoLayoutOne value={activeLayout} />,
			value: "thumbnail-slider-two-layout-one",
		},
		{
			icon: <ThumbnailSliderTwoLayoutTwo value={activeLayout} />,
			value: "thumbnail-slider-two-layout-two",
		},
		{
			icon: <ThumbnailSliderTwoLayoutThree value={activeLayout} />,
			value: "thumbnail-slider-two-layout-three",
		},
		{
			icon: <ThumbnailSliderTwoLayoutFour value={activeLayout} />,
			value: "thumbnail-slider-two-layout-four",
		},
		{
			icon: <ThumbnailSliderTwoLayoutFive value={activeLayout} />,
			value: "thumbnail-slider-two-layout-five",
		},
	];

	const taxonomyLayouts = [
		{
			icon: <LayoutOne value={activeLayout} />,
			value: "taxonomy-layout-one",
		},
		{
			icon: <LayoutTwo value={activeLayout} />,
			value: "taxonomy-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <LayoutThree value={activeLayout} />,
			value: "taxonomy-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <LayoutFour value={activeLayout} />,
			value: "taxonomy-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <LayoutFive value={activeLayout} />,
			value: "taxonomy-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <LayoutSix value={activeLayout} />,
			value: "taxonomy-layout-six",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <LayoutSeven value={activeLayout} />,
			value: "taxonomy-layout-seven",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <LayoutEight value={activeLayout} />,
			value: "taxonomy-layout-eight",
			type: "pro",
			demoLink: priceLink,
		},
	];

	const containerColumnOneLayouts = [
		{
			icon: <ContainerColumnOneLayoutOne value={activeLayout} />,
			value: "container-column-one-layout-one",
			label: "100",
		},
	];

	const containerColumnTwoLayouts = [
		{
			icon: <ContainerColumnTwoLayoutOne value={activeLayout} />,
			value: "container-column-two-layout-one",
			label: "50/50",
		},
		{
			icon: <ContainerColumnTwoLayoutTwo value={activeLayout} />,
			value: "container-column-two-layout-two",
			label: "40/60",
		},
		{
			icon: <ContainerColumnTwoLayoutThree value={activeLayout} />,
			value: "container-column-two-layout-three",
			label: "60/40",
		},
		{
			icon: <ContainerColumnTwoLayoutFour value={activeLayout} />,
			value: "container-column-two-layout-four",
			label: "30/70",
		},
		{
			icon: <ContainerColumnTwoLayoutFive value={activeLayout} />,
			value: "container-column-two-layout-five",
			label: "70/30",
		},
	];
	const containerColumnThreeLayouts = [
		{
			icon: <ContainerColumnThreeLayoutOne value={activeLayout} />,
			value: "container-column-three-layout-one",
			label: "33/33/33",
		},
		{
			icon: <ContainerColumnThreeLayoutTwo value={activeLayout} />,
			value: "container-column-three-layout-two",
			label: "60/20/20",
		},
		{
			icon: <ContainerColumnThreeLayoutThree value={activeLayout} />,
			value: "container-column-three-layout-three",
			label: "20/20/60",
		},
		{
			icon: <ContainerColumnThreeLayoutFour value={activeLayout} />,
			value: "container-column-three-layout-four",
			label: "50/25/25",
		},
		{
			icon: <ContainerColumnThreeLayoutFive value={activeLayout} />,
			value: "container-column-three-layout-five",
			label: "25/25/50",
		},
		{
			icon: <ContainerColumnThreeLayoutSix value={activeLayout} />,
			value: "container-column-three-layout-six",
			label: "20/60/20",
		},
	];
	const containerColumnFourLayouts = [
		{
			icon: <ContainerColumnFourLayoutOne value={activeLayout} />,
			value: "container-column-four-layout-one",
			label: "25/25/25/25",
		},
		{
			icon: <ContainerColumnFourLayoutTwo value={activeLayout} />,
			value: "container-column-four-layout-two",
			label: "20/20/20/40",
		},
		{
			icon: <ContainerColumnFourLayoutThree value={activeLayout} />,
			value: "container-column-four-layout-three",
			label: "40/20/20/20",
		},
	];
	const containerColumnFiveLayouts = [
		{
			icon: <ContainerColumnFiveLayoutOne value={activeLayout} />,
			value: "container-column-five-layout-one",
			label: "20x5",
		},
	];

	const containerColumnSixLayouts = [
		{
			icon: <ContainerColumnSixLayoutOne value={activeLayout} />,
			value: "container-column-six-layout-one",
			label: "16x6",
		},
	];

	const containerColumnMultiRowLayouts = [
		{
			icon: <ContainerColumnMultiRowLayoutOne value={activeLayout} />,
			value: "container-column-multi-row-layout-one",
		},
		{
			icon: <ContainerColumnMultiRowLayoutTwo value={activeLayout} />,
			value: "container-column-multi-row-layout-two",
		},
		{
			icon: <ContainerColumnMultiRowLayoutThree value={activeLayout} />,
			value: "container-column-multi-row-layout-three",
		},
		{
			icon: <ContainerColumnMultiRowLayoutFour value={activeLayout} />,
			value: "container-column-multi-row-layout-four",
		},
		{
			icon: <ContainerColumnMultiRowLayoutFive value={activeLayout} />,
			value: "container-column-multi-row-layout-five",
		},
	];
	const socialProfilesLayouts = [
		{
			icon: <SocialProfilesLayoutOne value={activeLayout} />,
			value: "social-profiles-layout-one",
		},
		{
			icon: <SocialProfilesLayoutTwo value={activeLayout} />,
			value: "social-profiles-layout-two",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <SocialProfilesLayoutThree value={activeLayout} />,
			value: "social-profiles-layout-three",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <SocialProfilesLayoutFour value={activeLayout} />,
			value: "social-profiles-layout-four",
			type: "pro",
			demoLink: priceLink,
		},
		{
			icon: <SocialProfilesLayoutFive value={activeLayout} />,
			value: "social-profiles-layout-five",
			type: "pro",
			demoLink: priceLink,
		},
	];

	const layouts = {
		"post-grid-one": gridOneLayouts,
		"post-grid-six": gridSixLayouts,
		"post-grid-three": gridThreeLayouts,
		"post-grid-four": gridFourLayouts,
		"post-grid-five": gridFiveLayouts,
		"post-list-one": listOneLayouts,
		"post-list-two": listTowLayouts,
		"post-list-three": listThreeLayouts,
		"post-timeline-one": timelineOneLayouts,
		"post-timeline-two": timelineTwoLayouts,
		"post-timeline-three": timelineThreeLayouts,
		"post-slider": postSliderLayouts,
		"post-thumbnail-slider": postThumbnailLayouts,
		"post-slider-two": postSliderTwoLayout,
		"post-thumbnail-slider-two": postThumbnailTwoLayout,
		"thumbnail-slider-two": postThumbnailTwoLayout,
		"container-column-1": containerColumnOneLayouts,
		"container-column-2": containerColumnTwoLayouts,
		"container-column-3": containerColumnThreeLayouts,
		"container-column-4": containerColumnFourLayouts,
		"container-column-5": containerColumnFiveLayouts,
		"container-column-6": containerColumnSixLayouts,
		"container-column-multi-row": containerColumnMultiRowLayouts,
		"social-profiles": socialProfilesLayouts,
		taxonomy: taxonomyLayouts,
	};
	return layouts[blockName];
};

export default useLayouts;
