import { __ } from "@wordpress/i18n";
import { Toggle, SPRangeControl, SelectField, Layouts, InputControl } from "../../components";
import { AlignCenter, AlignLeft, AlignRight } from "../../icons/icons";
import { getPaginationBlock } from "../shared/helpFn";
import useLayouts from "../../hooks/useLayouts";
import { openLinksOptions } from "../../controls/constants";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { useMemo } from "@wordpress/element";
import ProInfo from "../../components/proInfo/proInfo";

export const GridSixGeneralTab = ({ attributes, setAttributes }) => {
	const {
		postGridLayout,
		gridSixColumns,
		itemsPerPage,
		gridSixHorizontalGap,
		gridSixVerticalGap,
		contentAlignment,
		// gridSixMasonryEnable,
		preloaderEnable,
		equalHeightEnable,
		blockName,
		generalLinkOpen,
		masonryGap,
		postLimit,
		smallItemContentAlignment,
		largeItemHeight,
		smallItemHeight,
		metaDisplayType,
		paginationEnable,
		liveFilterEnable,
		imageWidth,
		imageHeight,
		largeImageWidth,
		largeImageHeight,
		smallImageHeight,
		clientId,
	} = attributes;
	const layouts = useLayouts(blockName, postGridLayout);
	const defaultImageData = useMemo(() => {
		return {
			"grid-six-layout-one": {
				largeImageWidth: {
					...largeImageWidth,
					device: {
						...largeImageWidth.device,
						Desktop: 50,
					},
					unit: {
						...largeImageWidth.unit,
						Desktop: "%",
					},
				},
				largeImageHeight: {
					...largeImageHeight,
					device: {
						...largeImageHeight.device,
						Desktop: 368,
					},
					unit: {
						...largeImageHeight.unit,
						Desktop: "px",
					},
				},
			},
			"grid-six-layout-two": {
				largeImageWidth: {
					...largeImageWidth,
					device: {
						...largeImageWidth.device,
						Desktop: 50,
					},
					unit: {
						...largeImageWidth.unit,
						Desktop: "%",
					},
				},
				largeImageHeight: {
					...largeImageHeight,
					device: {
						...largeImageHeight.device,
						Desktop: 368,
					},
					unit: {
						...largeImageHeight.unit,
						Desktop: "px",
					},
				},
			},
			"grid-six-layout-three": {
				largeImageWidth: {
					...largeImageWidth,
					device: {
						...largeImageWidth.device,
						Desktop: 100,
					},
					unit: {
						...largeImageWidth.unit,
						Desktop: "%",
					},
				},
				largeImageHeight: {
					...largeImageHeight,
					device: {
						...largeImageHeight.device,
						Desktop: 372,
					},
					unit: {
						...largeImageHeight.unit,
						Desktop: "px",
					},
				},
			},
			"grid-six-layout-four": {
				largeImageWidth: {
					...largeImageWidth,
					device: {
						...largeImageWidth.device,
						Desktop: 100,
					},
					unit: {
						...largeImageWidth.unit,
						Desktop: "%",
					},
				},
				largeImageHeight: {
					...largeImageHeight,
					device: {
						...largeImageHeight.device,
						Desktop: 100,
					},
					unit: {
						...largeImageHeight.unit,
						Desktop: "%",
					},
				},
			},
		};
	}, []);

	const layoutChangeHandler = (newValue) => {
		if (newValue === postGridLayout) return;

		const newData = {
			// ...defaultImageData[ newValue ],
			postGridLayout: newValue,
		};
		// if ( 'grid-six-layout-one' === newValue ) {
		// 	newData.imageWidth = {
		// 		...imageWidth,
		// 		device: {
		// 			...imageWidth.device,
		// 			Desktop: 100,
		// 		},
		// 		unit: {
		// 			...imageWidth.unit,
		// 			Desktop: '%',
		// 		},
		// 	};
		// 	newData.imageHeight = {
		// 		...imageHeight,
		// 		device: {
		// 			...imageHeight.device,
		// 			Desktop: 100,
		// 		},
		// 		unit: {
		// 			...imageHeight.unit,
		// 			Desktop: '%',
		// 		},
		// 	};
		// 	newData.smallItemHeight = {
		// 		...smallItemHeight,
		// 		device: {
		// 			...smallItemHeight.device,
		// 			Desktop: 244,
		// 		},
		// 		unit: {
		// 			...smallItemHeight.unit,
		// 			Desktop: 'px',
		// 		},
		// 	};
		// } else {
		// 	newData.imageWidth = {
		// 		...imageWidth,
		// 		device: {
		// 			...imageWidth.device,
		// 			Desktop: 244,
		// 		},
		// 		unit: {
		// 			...imageWidth.unit,
		// 			Desktop: 'px',
		// 		},
		// 	};
		// 	newData.imageHeight = {
		// 		...imageHeight,
		// 		device: {
		// 			...imageHeight.device,
		// 			Desktop: 161,
		// 		},
		// 		unit: {
		// 			...imageHeight.unit,
		// 			Desktop: 'px',
		// 		},
		// 	};
		// 	newData.smallItemHeight = {
		// 		...smallItemHeight,
		// 		device: {
		// 			...smallItemHeight.device,
		// 			Desktop: '',
		// 		},
		// 		unit: {
		// 			...smallItemHeight.unit,
		// 			Desktop: 'px',
		// 		},
		// 	};
		// }

		setAttributes(newData);
	};

	const paginationBlock = getPaginationBlock(clientId);

	const paginationToggle = (newValue) => {
		setAttributes({ paginationEnable: !newValue });

		if (!newValue && paginationBlock) {
			const { block, select } = paginationBlock;
			select(block?.clientId);
		}
	};

	return (
		<>
			{layouts?.length > 0 && (
				<Layouts
					label={__("Grid Layout", "post-carousel")}
					attributes={postGridLayout}
					attributesKey={"postGridLayout"}
					setAttributes={setAttributes}
					displayActive={true}
					showDemoTitle={true}
					grid={3}
					items={layouts}
					onChange={layoutChangeHandler}
				/>
			)}
			<Toggle
				label={__("Smart Frontend Filter", "post-carousel")}
				attributes={liveFilterEnable}
				setAttributes={setAttributes}
				attributesKey={"liveFilterEnable"}
			/>
			<Toggle
				label={__("Smart Pagination", "post-carousel")}
				attributes={paginationEnable}
				onChange={paginationToggle}
			/>
			<SPRangeControl
				label={__("Columns", "post-carousel")}
				attributes={gridSixColumns}
				attributesKey={"gridSixColumns"}
				setAttributes={setAttributes}
				max={9}
				min={1}
				defaultValue={{ unit: "", value: 3 }}
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
			<SPRangeControl
				label={__("Large Items Height", "post-carousel")}
				attributes={largeItemHeight}
				attributesKey={"largeItemHeight"}
				setAttributes={setAttributes}
				max={1000}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
				pro={true}
			/>
			<SPRangeControl
				label={__("Small Items Height", "post-carousel")}
				attributes={smallItemHeight}
				attributesKey={"smallItemHeight"}
				setAttributes={setAttributes}
				max={600}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
				pro={true}
			/>
			<SPRangeControl
				label={__("Horizontal Gap", "post-carousel")}
				attributes={gridSixHorizontalGap}
				attributesKey={"gridSixHorizontalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 15 }}
			/>
			<SPRangeControl
				label={__("Vertical Gap", "post-carousel")}
				attributes={gridSixVerticalGap}
				attributesKey={"gridSixVerticalGap"}
				setAttributes={setAttributes}
				max={150}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: 15 }}
			/>
			{/* { gridSixMasonryEnable && (
				<SPRangeControl
					label={ __( 'Masonry Gap', 'post-carousel' ) }
					attributes={ masonryGap }
					attributesKey={ 'masonryGap' }
					setAttributes={ setAttributes }
					max={ 150 }
					units={ [ 'px', '%', 'em' ] }
				/>
			) } */}
			<SPToggleGroupControl
				label={__("Content Alignment ( Large Items )", "post-carousel")}
				attributes={contentAlignment}
				attributesKey={"contentAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
			<SPToggleGroupControl
				label={__("Content Alignment ( Small Items )", "post-carousel")}
				attributes={smallItemContentAlignment}
				attributesKey={"smallItemContentAlignment"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "start" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "end" },
				]}
			/>
			<SelectField
				label={__("Link Open In", "post-carousel")}
				attributes={generalLinkOpen}
				attributesKey={"generalLinkOpen"}
				setAttributes={setAttributes}
				items={openLinksOptions}
			/>
			{/* { 'grid-six-layout-one' !== postGridLayout && (
				<Toggle
					label={ __( 'Masonry', 'post-carousel' ) }
					attributes={ gridSixMasonryEnable ) }
					attributesKey={ 'gridSixMasonryEnable' }
					setAttributes={ setAttributes }
				/>
			) } */}
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
