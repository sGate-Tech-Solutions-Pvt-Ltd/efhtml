import { __ } from "@wordpress/i18n";
import { Toggle, SPRangeControl, SelectField, InputControl, Layouts } from "../../components";
import { AlignCenter, AlignLeft, AlignRight, CarouselTwoOrientationFourIcon, CarouselTwoOrientationOneIcon, CarouselTwoOrientationThreeIcon, CarouselTwoOrientationTwoIcon } from "../../icons/icons";
import { getPaginationBlock } from "../shared/helpFn";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import ContentOrientations from "../shared/templates/templates-parts/contentOrientations";
import { useOrientation } from "../../hooks/useOrientation";
import ProInfo from "../../components/proInfo/proInfo";

export const GridTwoGeneralTab = ({ attributes, setAttributes }) => {
	const {
		gridTwoColumns,
		gridTwoHorizontalGap,
		gridTwoVerticalGap,
		contentAlignment,
		preloaderEnable,
		generalLinkOpen,
		postLimit,
		smallItemHeight,
		paginationEnable,
		liveFilterEnable,
		clientId,
		contentOrientation,
		blockName,
		// orientations

		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
		catTabCategoryBg,
		catTabCategoryColor,
		catTabCategoryLineHeight,
		catTabCategoryFontSize,
		catTabCategoryBorder,
		metaTypography,
		metaFontSize,
		imageOverlayCustomColor,
		contentOnHover,
	} = attributes;
	// const layouts = useLayouts( blockName, postGridLayout );

	const orientationConfig = useOrientation({
		postCardPadding,
		postCardBorder,
		postCardBorderWidth,
		contentAreaPadding,
		catTabCategoryBg,
		catTabCategoryColor,
		catTabCategoryLineHeight,
		catTabCategoryFontSize,
		catTabCategoryBorder,
		metaTypography,
		metaFontSize,
		imageOverlayCustomColor,
	});

	const paginationBlock = getPaginationBlock(clientId);

	const paginationToggle = (newValue) => {
		setAttributes({ paginationEnable: !newValue });

		if (!newValue && paginationBlock) {
			const { block, select } = paginationBlock;
			select(block?.clientId);
		}
	};

	const orientationHandler = (newValue) => {
		if (newValue === contentOrientation) {
			return;
		}

		const newData = {
			contentOrientation: newValue,
			...orientationConfig[newValue],
		};
		setAttributes(newData);
	};

	return (
		<>
			{/* { layouts?.length > 0 && (
				<Layouts
					label={ __( 'Grid Layout', 'post-carousel' ) }
					attributes={ postGridLayout }
					attributesKey={ 'postGridLayout' }
					setAttributes={ setAttributes }
					displayActive={ true }
					grid={ 3 }
					items={ layouts }
				/>
			) } */}

			{/* <ContentOrientations
				label={__("Content Orientation", "post-carousel")}
				attributes={contentOrientation}
				setAttributes={setAttributes}
				attributesKey={"contentOrientation"}
				onChange={orientationHandler}
				blockName={blockName}
			/> */}

			<Layouts
				attributes={contentOrientation}
				setAttributes={setAttributes}
				attributesKey={"contentOrientation"}
				displayActive={true}
				grid={4}
				proBtnClass="sp-smart-small-size"
				showDemoTitle={true}
				label={__("Content Orientation", "post-carousel")}
				onChange={orientationHandler}
				items={[
					{
						icon: <CarouselTwoOrientationOneIcon value={contentOrientation} />,
						value: "orientation_one",
					},
					{
						icon: <CarouselTwoOrientationTwoIcon value={contentOrientation} />,
						value: "orientations_two",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3504"
					},
					{
						icon: <CarouselTwoOrientationThreeIcon value={contentOrientation} />,
						value: "orientation_three",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3504"
					},
					{
						icon: <CarouselTwoOrientationFourIcon value={contentOrientation} />,
						value: "orientations_four",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3504"
					},
				]}
			/>

			<Toggle
				label={__("Content on Hover", "post-carousel")}
				attributes={contentOnHover}
				attributesKey={"contentOnHover"}
				setAttributes={setAttributes}
				pro={true}
			/>

			<Toggle
				label={__("Smart Frontend Filter", "post-carousel")}
				attributes={liveFilterEnable}
				setAttributes={setAttributes}
				attributesKey={"liveFilterEnable"}
			/>
			<Toggle
				label={__("Smart Pagination", "post-carousel")}
				attributes={paginationEnable}
				// attributesKey={ 'paginationEnable' }
				// setAttributes={ setAttributes }
				onChange={paginationToggle}
			/>
			<SPRangeControl
				label={__("Columns", "post-carousel")}
				attributes={gridTwoColumns}
				attributesKey={"gridTwoColumns"}
				setAttributes={setAttributes}
				max={9}
				min={1}
				defaultValue={{ unit: "", value: "" }}
			/>
			<InputControl
				label={__("Posts Per Page", "post-carousel")}
				className="sp-smart-limit-field"
				ajax={true}
				attributes={postLimit}
				min={1}
				max={500}
				attributesKey={"postLimit"}
				setAttributes={setAttributes}
			/>
			{/* { ! gridTwoMasonryEnable && ( */}
			<SPRangeControl
				label={__("Items Height", "post-carousel")}
				attributes={smallItemHeight}
				attributesKey={"smallItemHeight"}
				setAttributes={setAttributes}
				max={2000}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: "260" }}
				pro={true}
			/>
			{/* ) } */}
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={gridTwoHorizontalGap}
				attributesKey={"gridTwoHorizontalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 20 }}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={gridTwoVerticalGap}
				attributesKey={"gridTwoVerticalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["PX", "%", "EM"]}
				defaultValue={{ unit: "px", value: 20 }}
			/>
			{/* { gridTwoMasonryEnable && (
				<SPRangeControl
					label={ __( 'Masonry Gap', 'post-carousel' ) }
					attributes={ masonryGap }
					attributesKey={ 'masonryGap' }
					setAttributes={ setAttributes }
					max={ 150 }
					units={ [ 'PX', '%', 'EM' ] }
				/>
			) } */}
			<SPToggleGroupControl
				label={__("Content Alignment", "post-carousel")}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
			<SelectField
				label={__("Link Open In", "post-carousel")}
				attributes={generalLinkOpen}
				attributesKey={"generalLinkOpen"}
				setAttributes={setAttributes}
				items={openLinksOptions}
			/>
			{/* Hide Masonry option from Grid two. */}
			{/* <Toggle
				label={ __( 'Masonry', 'post-carousel' ) }
				attributes={ gridTwoMasonryEnable }
				attributesKey={ 'gridTwoMasonryEnable' }
				setAttributes={ setAttributes }
			/> */}
			<Toggle
				label={__("Preloader", "post-carousel")}
				attributes={preloaderEnable}
				attributesKey={"preloaderEnable"}
				setAttributes={setAttributes}
			/>
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
};
