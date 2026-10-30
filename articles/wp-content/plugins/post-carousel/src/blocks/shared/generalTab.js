import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
	ChildPanelBody,
	SPRangeControl,
	SelectField,
	Divider,
	Background,
	Toggle,
	InputControl,
	MediaPicker,
	MultipleSelect,
	SelectDropdown,
	MultiSelectDndKit,
	Taxonomies,
} from "../../components";
import { BgIcon, GradientIcon, TransparentIcon } from "../../components/background/svgIcon";
import {
	DotsPagination,
	DynamicPagination,
	StrokesPagination,
	ScrollbarPagination,
	FractionPagination,
	NumbersPagination,
	Outline,
	BasicOutline,
	UserSolid,
	Rounded,
	Female,
	Circle,
	Minimal,
	UserAuthor,
	AlignCenter,
	AlignLeft,
	AlignRight
} from "../../icons/icons";
import { capitalizeString, filterSelectOptions, inArray, useDeviceType } from "../../controls/controls";
import { getObjectValuesToJsArray, rearrangeAboveTitle } from "./helpFn";
import useAllPosts from "../../hooks/useAllPosts";
import useMetaData from "../../hooks/useMetaData";
import { orderByOptions, paginationDotsStyle } from "../../controls/constants";
import useApiData from "../../hooks/useApiData";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import useDefaultValue from "../../hooks/useDefaultValue";
import DragAndDropDnd from "../../components/multipleSelect/dragAndDropDnd";
import {
	ArrowMinimal,
	ArrowOutline,
	ArrowSolid,
	ChevronBold,
	ChevronBorderLine,
	ChevronOutline,
	ChevronSolid,
	DoubleChevron,
	DoubleChevronBorderLine,
	DoubleChevronOutline,
	TriangleOutline,
} from "../../icons/arrowIcons";
import ProInfo from "../../components/proInfo/proInfo";

export const QueryBuilderGeneralTab = ({ attributes, setAttributes }) => {
	const {
		postType,
		quickQuery,
		orderBy,
		filterByAuthor,
		filterByDate,
		specificDate,
		specificMonth,
		specificYear,
		specificPeriodAfter,
		specificPeriodBefore,
		specificDateBefore,
		specificDateAfter,
		filterByKeyword,
		orderDirection,
		includeOnlyPost,
		excludePost,
		excludeTerm,
		excludeAuthor,
		excludePostWithoutImagePosts,
		excludeChildrenPosts,
		excludeProtectedPosts,
		excludeCurrentPosts,
		excludeStickyPosts,
		noResultFoundResult,
		postLimit,
		offset,
		filterProduct,
		uniqueId,
		multiplePostType,
		excludeDateAfter,
		excludeDateBefore,
		contentPartArray,
		taxonomies,
	} = attributes;
	const { allPostTypes, allMetaKeys, authorList, allTaxonomies } = useMetaData(attributes, "editSite");
	const { allPosts } = useAllPosts(attributes);
	const dateOptions = [
		{ label: "Default", value: "" },
		{ label: "Yesterday", value: "yesterday" },
		{ label: "Today Only", value: "today_only" },
		{ label: "Today and Onwards", value: "today_onwards" },
		{ label: "This Week", value: "this_week" },
		{ label: "This Month", value: "this_month" },
		{ label: "This Year", value: "this_year" },
		{ label: "Past Week", value: "week_ago" },
		{ label: "Past Month", value: "month_ago" },
		{ label: "Past Quarter", value: "past_quarter" },
		{ label: "Past Year", value: "year_ago" },
		{ label: "Specific Date & Before", value: "specific_date_before" },
		{ label: "Specific Date & After", value: "specific_date_after" },
		{ label: "Specific Date", value: "specific_date" },
		{ label: "Specific Month", value: "specific_month" },
		{ label: "Specific Year", value: "specific_year" },
		{ label: "Specific Period (From & To)", value: "specific_period" },
		{ label: "Exclude Specific Date", value: "exclude_specific_date" },
	];

	// this function create for convert allPostTypes to select control options.
	const postTypeValues = getObjectValuesToJsArray(allPostTypes);
	const postTypeOptions = postTypeValues?.map((singlePostType) => ({
		label: `${capitalizeString(singlePostType)}s`,
		value: singlePostType,
	}));

	const updatePostTypeOptions = postTypeOptions?.map((item, index) => ({
		id: index + 1,
		label: item.value === "attachment" ? "Media" : item.label,
		value: item.value,
	}));
	const multiSelectPostType = [
		...updatePostTypeOptions,
		{
			id: updatePostTypeOptions.length + 1,
			label: "Multiple Post Types",
			value: "multiple_post_type",
		},
	];

	const filterIncludesPost = (inputFieldData) => {
		const lowercaseInput = inputFieldData.toLowerCase();
		setAttributes({ liveSearchText: lowercaseInput });
	};

	const includeExcludePostOptions = filterSelectOptions(allPosts, "post_title", "ID", "ID");

	const defaultPostType = [
		{ label: "Posts", value: "post" },
		{ label: "Pages", value: "page" },
	];

	let allTerms = [];
	allTaxonomies?.forEach((taxonomy) => {
		allTerms = [...allTerms, ...taxonomy.terms_items];
	});

	const onPostTypeChange = (newValue) => {
		if (newValue === postType) {
			return;
		}

		// Add Product Template part value for Content Area Draggable
		const newContentPartArray = [];
		const productComponents = [
			{ id: 7, label: "Star Rating", value: "starRating" },
			{ id: 8, label: "Price", value: "price" },
			{ id: 9, label: "Add To Cart", value: "addToCart" },
		];
		if (newValue === "product") {
			newContentPartArray.push(...contentPartArray, ...productComponents);
		} else {
			const newProductSet = new Set(productComponents.map((item) => JSON.stringify(item)));
			const filterContentArray = contentPartArray.filter((item) => !newProductSet.has(JSON.stringify(item)));
			newContentPartArray.push(...filterContentArray);
		} // It will add product relate object in array when postType is product and remove if not product.

		setAttributes({
			postType: newValue,
			taxonomies: [
				{
					id: 1,
					type: "",
					value: [],
					operator: "IN",
				},
			],
			includeOnlyPost: [],
			excludeTerm: [],
			excludeAuthor: [],
			excludePost: [],
			contentPartArray: newContentPartArray,
		});
	};

	const onDateChangeHandler = (newDate, attrKey) => {
		const d = new Date(newDate);

		const updatedDate = new Date(
			Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds())
		).toISOString();

		setAttributes({ [attrKey]: updatedDate });
	};
	const toLocalDateWithoutShift = (isoString) => {
		const d = new Date(isoString);

		// Extract the stored UTC values as real values
		return new Date(
			d.getUTCFullYear(),
			d.getUTCMonth(),
			d.getUTCDate(),
			d.getUTCHours(),
			d.getUTCMinutes(),
			d.getUTCSeconds()
		);
	};
	const onPostTypeChangeHandler = (e) => {
		setAttributes({
			multiplePostType: e,
			taxonomies: [
				{
					id: 1,
					type: "",
					value: [],
					operator: "IN",
					initialOpen: true,
				},
			],
			catTabCategoryType: "",
		})
	}

	return (
		<>
			{/* <SelectField
				label={ __( 'Post Type(s)', 'post-carousel' ) }
				attributes={ postType }
				onChange={ onPostTypeChange }
				attributesKey={ 'postType' }
				setAttributes={ setAttributes }
				flexStyle={ true }
				items={
					multiSelectPostType.length > 1
						? multiSelectPostType
						: defaultPostType
				}
			/>
			{ 'multiple_post_type' === postType && ( */}
			<MultipleSelect
				label={__("Post Types", "post-carousel")}
				value={multiplePostType}
				attributes={multiplePostType}
				onInputChange={() => { }}
				attributesKey={"multiplePostType"}
				setAttributes={setAttributes}
				onChange={(e) => onPostTypeChangeHandler(e)}
				items={updatePostTypeOptions.length > 0 ? updatePostTypeOptions : defaultPostType}
			/>
			{/* ) } */}
			<SelectField
				label={__("Quick Query", "post-carousel")}
				attributes={quickQuery}
				attributesKey={"quickQuery"}
				setAttributes={setAttributes}
				items={[
					{
						label: "Select Quick Query",
						value: "",
					},
					{
						label: "Popular Posts ( last 24-Hours Views )",
						value: "1 days",
					},
					{
						label: "Popular Posts ( last  3-Days Views ) (Pro)",
						value: "",
						disabled: true,
					},
					{
						label: "Popular Posts ( last 7-Days Views ) (Pro)",
						value: "",
						disabled: true,
					},
					{
						label: "Popular Posts ( last 14-Day Views ) (Pro)",
						value: "",
						disabled: true,
					},
					{
						label: "Popular Posts ( last 30-Day Views ) (Pro)",
						value: "",
						disabled: true,
					},
					{
						label: "Popular Posts ( last 3-Months Views ) (Pro)",
						value: "",
						disabled: true,
					},
					{
						label: "Popular Posts ( last 1-Year Views ) (Pro)",
						value: "",
						disabled: true,
					},
					{
						label: "Popular Posts ( All Times Views ) (Pro)",
						value: "",
						disabled: true,
					},
				]}
			/>
			{/* advanced filtering  */}
			<ChildPanelBody title={__("Advanced Filtering", "post-carousel")}>
				{/* taxonomy type  */}
				<Taxonomies attributes={attributes} setAttributes={setAttributes} allTaxonomies={allTaxonomies} />
				<Divider position="top-bottom" />
				<MultipleSelect
					label={__("Filter By Author", "post-carousel")}
					value={filterByAuthor}
					attributes={filterByAuthor}
					onInputChange={() => { }}
					attributesKey={"multiplePostType"}
					setAttributes={setAttributes}
					onChange={(e) => setAttributes({ filterByAuthor: e })}
					items={authorList}
				/>
				<SelectField
					label={__("Filter By Date", "post-carousel")}
					attributes={filterByDate}
					attributesKey={"filterByDate"}
					setAttributes={setAttributes}
					items={dateOptions}
				/>
				{"specific_date" === filterByDate && (
					<div className="sp-smart-specific-date-item s">
						<span>Date</span>
						<DatePicker
							selected={specificDate}
							dateFormat="MMMM d, yyyy"
							onChange={(date) => setAttributes({ specificDate: date })}
						/>
					</div>
				)}
				{"specific_date_before" === filterByDate && (
					<div className="sp-smart-specific-date-item s">
						<span>Date Before</span>
						<DatePicker
							selected={toLocalDateWithoutShift(specificDateBefore)}
							dateFormat="MMMM d, yyyy"
							onChange={(date) => onDateChangeHandler(date, "specificDateBefore")}
						/>
					</div>
				)}

				{"specific_date_after" === filterByDate && (
					<div className="sp-smart-specific-date-item s">
						<span>Date From</span>
						<DatePicker
							selected={toLocalDateWithoutShift(specificDateAfter)}
							dateFormat="MMMM d, yyyy"
							onChange={(date) => onDateChangeHandler(date, "specificDateAfter")}
						/>
					</div>
				)}

				{"specific_period" === filterByDate && (
					<div className="sp-smart-specific-date">
						<div className="sp-smart-specific-date-item">
							<span>From</span>
							<DatePicker
								selected={specificPeriodAfter}
								dateFormat="MMMM d, yyyy"
								onChange={(date) =>
									setAttributes({
										specificPeriodAfter: date,
									})
								}
								startDate={specificPeriodAfter}
								endDate={specificPeriodBefore}
							/>
						</div>
						<div className="sp-smart-specific-date-item">
							<span>To</span>
							<DatePicker
								className="sp-mt-10"
								selected={specificPeriodBefore}
								dateFormat="MMMM d, yyyy"
								onChange={(date) =>
									setAttributes({
										specificPeriodBefore: date,
									})
								}
								startDate={specificPeriodAfter}
								endDate={specificPeriodBefore}
							/>
						</div>
					</div>
				)}

				{"exclude_specific_date" === filterByDate && (
					<div className="sp-smart-specific-date">
						<div className="sp-smart-specific-date-item">
							<span>From</span>
							<DatePicker
								selected={excludeDateBefore}
								dateFormat="MMMM d, yyyy"
								onChange={(date) => setAttributes({ excludeDateBefore: date })}
								startDate={excludeDateAfter}
								endDate={excludeDateBefore}
							/>
						</div>
						<div className="sp-smart-specific-date-item">
							<span>To</span>
							<DatePicker
								className="sp-mt-10"
								selected={excludeDateAfter}
								dateFormat="MMMM d, yyyy"
								onChange={(date) => setAttributes({ excludeDateAfter: date })}
								startDate={excludeDateAfter}
								endDate={excludeDateBefore}
							/>
						</div>
					</div>
				)}

				{"specific_month" === filterByDate && (
					<SelectField
						label={__("Specific Month", "post-carousel")}
						attributes={specificMonth}
						attributesKey={"specificMonth"}
						setAttributes={setAttributes}
						items={[
							{
								label: __("January", "post-carousel"),
								value: "1",
							},
							{
								label: __("February", "post-carousel"),
								value: "2",
							},
							{
								label: __("March", "post-carousel"),
								value: "3",
							},
							{
								label: __("April", "post-carousel"),
								value: "4",
							},
							{
								label: __("May", "post-carousel"),
								value: "5",
							},
							{
								label: __("June", "post-carousel"),
								value: "6",
							},
							{
								label: __("July", "post-carousel"),
								value: "7",
							},
							{
								label: __("August", "post-carousel"),
								value: "8",
							},
							{
								label: __("September", "post-carousel"),
								value: "9",
							},
							{
								label: __("October", "post-carousel"),
								value: "10",
							},
							{
								label: __("November", "post-carousel"),
								value: "11",
							},
							{
								label: __("December", "post-carousel"),
								value: "12",
							},
						]}
					/>
				)}

				{"specific_year" === filterByDate && (
					<InputControl
						label={__("Specific Year", "post-carousel")}
						attributes={specificYear}
						attributesKey={"specificYear"}
						setAttributes={setAttributes}
						flex={true}
						inputType="number"
					/>
				)}
				{/* <InputControl
					label={__("Filter By Keyword", "post-carousel")}
					attributes={filterByKeyword}
					attributesKey={"filterByKeyword"}
					setAttributes={setAttributes}
					flex={false}
					inputType="text"
				/> */}
				<Divider position="top-bottom" />
				{/* Filter by Custom Fields  */}
				{/* <FilterByCustomFields attributes={attributes} setAttributes={setAttributes} metaKeys={allMetaKeys} /> */}
				<SelectField
					label={__("Order By", "post-carousel")}
					attributes={orderBy}
					attributesKey={"orderBy"}
					setAttributes={setAttributes}
					flexStyle={false}
					items={orderByOptions}
				/>
				{"rand" !== orderBy && (
					<SPToggleGroupControl
						label={__("Order Direction", "post-carousel")}
						attributes={orderDirection}
						attributesKey={"orderDirection"}
						setAttributes={setAttributes}
						items={[
							{ label: "Ascending", value: "ASC", type: "order" },
							{
								label: "Descending",
								value: "DESC",
								type: "order",
							},
						]}
					/>
				)}
			</ChildPanelBody>
			{/* common filtering  */}
			<ChildPanelBody title={__("Common Filtering", "post-carousel")}>
				<MultiSelectDndKit
					label={__("Include Only Post", "post-carousel")}
					items={includeExcludePostOptions}
					uniqueId={uniqueId}
					values={includeOnlyPost}
					searchable={true}
					onInputChange={(e) => filterIncludesPost(e)}
					onChange={(e) => setAttributes({ includeOnlyPost: e })}
				/>
				{includeOnlyPost?.length === 0 && (
					<MultiSelectDndKit
						label={__("Exclude Post", "post-carousel")}
						// attributes={ excludePost }
						uniqueId={uniqueId}
						values={excludePost}
						searchable={true}
						onChange={(e) => setAttributes({ excludePost: e })}
						onInputChange={(e) => filterIncludesPost(e)}
						items={includeExcludePostOptions}
					/>
				)}
				{/* <MultipleSelect
					label={__("Exclude Term", "post-carousel")}
					attributes={excludeTerm}
					value={excludeTerm}
					objectData={true}
					attributesKey={"excludeTerm"}
					onChange={(val) => setAttributes({ excludeTerm: val })}
					onInputChange={() => {}}
					setAttributes={setAttributes}
					items={allTerms}
				/> */}
				{/* <MultipleSelect
					label={__("Exclude Author", "post-carousel")}
					attributes={excludeAuthor}
					attributesKey={"excludeAuthor"}
					onInputChange={() => {}}
					setAttributes={setAttributes}
					items={authorList}
				/> */}
				<Toggle
					label={__("Exclude Sticky Posts", "post-carousel")}
					attributes={excludeStickyPosts}
					attributesKey={"excludeStickyPosts"}
					setAttributes={setAttributes}
				/>
				{/* <Toggle
					label={__("Exclude Current Posts", "post-carousel")}
					attributes={excludeCurrentPosts}
					attributesKey={"excludeCurrentPosts"}
					setAttributes={setAttributes}
				/> */}
				{/* <Toggle
					label={__("Exclude Password Protect Posts", "post-carousel")}
					attributes={excludeProtectedPosts}
					attributesKey={"excludeProtectedPosts"}
					setAttributes={setAttributes}
				/> */}
				{/* <Toggle
					label={__("Exclude Children Posts", "post-carousel")}
					attributes={excludeChildrenPosts}
					attributesKey={"excludeChildrenPosts"}
					setAttributes={setAttributes}
				/> */}
				{/* <Toggle
					label={__("Exclude Posts without Image", "post-carousel")}
					attributes={excludePostWithoutImagePosts}
					attributesKey={"excludePostWithoutImagePosts"}
					setAttributes={setAttributes}
				/> */}
			</ChildPanelBody>
			<Divider position={"blue"} />
			<span className="m-16"></span>
			{/* <InputControl
				label={ __( 'Posts Per Page', 'post-carousel' ) }
				className="sp-smart-limit-field"
				ajax={ true }
				attributes={ postLimit }
				min={ 1 }
				attributesKey={ 'postLimit' }
				setAttributes={ setAttributes }
			/> */}
			<SPRangeControl
				label={__("Offset", "post-carousel")}
				ajax={true}
				attributes={offset}
				attributesKey={"offset"}
				setAttributes={setAttributes}
				max={100}
				min={0}
				defaultValue={0}
				helpText={__("Use this option to skip over posts (e.g. 2 to skip over 2 posts)", "post-carousel")}
			/>
			<InputControl
				label={__("No Result Found Label", "post-carousel")}
				attributes={noResultFoundResult}
				flex={false}
				inputType="text"
				attributesKey={"noResultFoundResult"}
				setAttributes={setAttributes}
				placeholder={__("No post found", "post-carousel")}
			/>
			<ProInfo>
				<h3>Premium Only</h3>
				<h4>Unlock advanced query options, including:</h4>
				<ul>
					<li>
						— Popular Posts by views (3 days, 7 days, 14 days, 30 days, 3 months, 1 year, all time)
					</li>
					<li>
						— Filter by keyword & custom fields
					</li>
					<li>
						— Order by Most Liked and Most Viewed
					</li>
					<li>
						— Exclude by term, author, or current post
					</li>
					<li>
						— Exclude password-protected, child, or posts without thumb, etc...
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</>
	);
};
export const ImageGeneralTab = ({ attributes, setAttributes }) => {
	const {
		imageFeaturedImg,
		imageSize,
		imageWidth,
		imageHeight,
		imagePosition,
		imageOverlayColor,
		imageScale,
		imageFallbackReplace,
		imageSrcset,
		imageLazyLoad,
		imageReplaceWith,
		imageOverlayType,
		imageOverlayCustomColor,
		postSliderLayout,
		blockName,
		imageReplaceWithVideo,
		imageReplaceWithImage,
		toggleCustomFallbackBg,
		contentOrientation,
		thumbnailSliderLayout,
		blockLayoutName,
		largeImageSize,
		largeImageWidth,
		largeImageHeight,
		showImageGallery,
		imageGallerySource,
		showImageGalleryNavArrow,
		showImageGalleryNavArrowHover,
		imageGalleryNavArrowStyle,
		imageGalleryNavArrowSize,
	} = attributes;
	const { imageSizes } = useMetaData(attributes);
	const [contentAreaBgStyleType, setContentAreaBgStyleType] = useState("color");

	const defaultValue = useDefaultValue(blockName);

	const imageSizesOption = imageSizes
		? imageSizes?.map((size) => {
			return { label: size, value: size };
		})
		: [];
	imageSizesOption.unshift({ label: "Original Size", value: "" });

	if (
		imagePosition !== "background" &&
		!["post-thumbnail-slider", "thumbnail-slider-two"].includes(blockName) &&
		![
			"post-slider-layout-one",
			"post-slider-layout-two",
			// 'post-slider-layout-three',
		].includes(blockLayoutName)
	) {
		imageSizesOption.push({
			label: __("Custom Size (Pro)", "post-carousel"),
			value: "custom",
			disabled: "disabled"
		});
	}

	const imagePositionItems = [];
	if (
		![
			"post-slider",
			"post-slider-two",
			"post-thumbnail-slider",
			"thumbnail-slider-two",
			"post-grid-six",
			"post-list-two",
			"post-list-three",
		].includes(blockName)
	) {
		imagePositionItems.push(
			{ label: "Top", value: "top" },
			{ label: "Left", value: "left" },
			{ label: "Right", value: "right" }
		);
	}
	if (["post-slider-two-layout-three"].includes(blockLayoutName)) {
		imagePositionItems.push({ label: "Left", value: "left" }, { label: "Right", value: "right" });
	}
	if (
		![
			"post-grid-one",
			"post-timeline-one",
			"post-slider",
			"post-slider-two",
			"post-thumbnail-slider",
			"timeline-one",
			"post-grid-six",
			"post-list-two",
			"post-list-three",
		].includes(blockName)
	) {
		imagePositionItems.push({ label: "Background", value: "background" });
	}

	return (
		<>
			{/* { ! [
				'post-grid-three',
				'post-grid-four',
				'post-grid-five',
				'post-timeline-two',
				'post-slider',
				'post-slider-two',
				'post-thumbnail-slider',
			].includes(blockName) && (
				<Toggle
					label={__('Show Featured Image', 'post-carousel')}
					attributes={imageFeaturedImg}
					attributesKey={'imageFeaturedImg'}
					setAttributes={setAttributes}
				/>
			) } */}
			{/* TODO: Need get image size for below select fields */}
			{imageFeaturedImg && (
				<>
					{!inArray(
						[
							"grid-six-layout-one",
							"sp-smart-post-list-two-layout-five",
							"sp-smart-post-list-two-layout-six",
							"sp-smart-post-list-two-layout-seven",
							"sp-smart-post-list-two-layout-eight",
						],
						blockLayoutName
					) && (
							<>
								{!["post-timeline-one", "post-list-one", "post-list-two", "post-list-three"].includes(
									blockName
								) && (
										<>
											<SelectField
												label={__("Size", "post-carousel")}
												attributes={imageSize}
												attributesKey={"imageSize"}
												setAttributes={setAttributes}
												items={[...imageSizesOption]}
											/>
										</>
									)}
								{"custom" === imageSize && imageSizesOption.find((v) => v.value === "custom") && (
									<>
										<SPRangeControl
											label={__("Width", "post-carousel")}
											attributes={imageWidth}
											attributesKey={"imageWidth"}
											setAttributes={setAttributes}
											units={["px", "%", "Em"]}
											defaultValue={{
												unit: "%",
												value: defaultValue.imageWidth,
											}}
											max={1200}
										/>
										{!inArray(["post-slider-layout-five"], blockLayoutName) && (
											<SPRangeControl
												label={__("Height", "post-carousel")}
												attributes={imageHeight}
												attributesKey={"imageHeight"}
												setAttributes={setAttributes}
												units={["px", "%", "Em"]}
												defaultValue={{
													unit: "px",
													value: "",
												}}
												max={500}
											/>
										)}
									</>
								)}
							</>
						)}
					{["post-grid-one", "post-grid-six"].includes(blockName) &&
						!["grid-one-layout-one", "grid-one-layout-five", "grid-six-layout-four"].includes(
							blockLayoutName
						) && (
							<>
								<SelectField
									label={__("Size (Large Items)", "post-carousel")}
									attributes={largeImageSize}
									attributesKey={"largeImageSize"}
									setAttributes={setAttributes}
									items={[...imageSizesOption]}
								/>
								{"custom" === largeImageSize && imageSizesOption.find((v) => v.value === "custom") && (
									<>
										<SPRangeControl
											label={__("Width (Large Items)", "post-carousel")}
											attributes={largeImageWidth}
											attributesKey={"largeImageWidth"}
											setAttributes={setAttributes}
											units={["px", "%", "Em"]}
											defaultValue={{
												unit: "%",
												value: "",
											}}
											max={1200}
										/>
										{!inArray(
											["post-slider-layout-five", "grid-six-layout-one", "grid-six-layout-two"],
											blockLayoutName
										) && (
												<SPRangeControl
													label={__("Height (Large Items)", "post-carousel")}
													attributes={largeImageHeight}
													attributesKey={"largeImageHeight"}
													setAttributes={setAttributes}
													units={["px", "%", "Em"]}
													defaultValue={{
														unit: "px",
														value: "",
													}}
													max={1000}
												/>
											)}
									</>
								)}
							</>
						)}
					{/* { ! [
						// 'post-grid-two',
						'post-slider',
						'post-slider-two',
						'post-grid-three',
						'post-grid-four',
						'post-grid-five',
						'post-timeline-two',
						'post-list-one',
						'thumbnail-slider-two',
					].includes( blockName ) &&
						imagePositionItems?.length > 0 && (
						<>
							{ ! [
								'post-slider-layout-four',
								'post-slider-layout-five',
								'thumbnail-slider-layout-six',
							].includes( blockLayoutName ) &&
								! [
									'post-grid-six',
									'post-slider-two',
									'post-grid-two',
								].includes( blockName ) && (
									<SelectField
										label={ __(
											'Position',
											'post-carousel'
										) }
										attributes={ imagePosition }
										attributesKey={ 'imagePosition' }
										setAttributes={ setAttributes }
										items={ [ ...imagePositionItems ] }
										flexStyle={ true }
									/>
								) }
							{ blockLayoutName &&
								[
									'post-slider-layout-four',
									'post-slider-layout-five',
									'post-slider-two-layout-three',
									'thumbnail-slider-layout-six',
									'grid-six-layout-one',
									'grid-six-layout-two',
								].includes( blockLayoutName ) && (
									<SPToggleGroupControl
										label={ __(
											'Position',
											'post-carousel'
										) }
										attributes={ imagePosition }
										attributesKey={ 'imagePosition' }
										setAttributes={ setAttributes }
										items={ [ ...imagePositionItems ] }
									/>
								) }
							{ imagePosition === 'background' &&
								! [
									'post-slider',
									'post-slider-two',
								].includes( blockName ) && (
									<SPToggleGroupControl
										label={ __(
											'Overlay Type',
											'post-carousel'
										) }
										attributes={ imageOverlayType }
										attributesKey={ 'imageOverlayType' }
										setAttributes={ setAttributes }
										items={ [
											{
												label: 'Full',
												value: 'full',
											},
											{ label: 'Box', value: 'box' },
										] }
									/>
								) }
						</>
					) } */}
					{!inArray(["grid-six-layout-two", "grid-six-layout-three"], contentOrientation) && (
						<SelectField
							label={__("Overlay Color", "post-carousel")}
							attributes={imageOverlayColor}
							attributesKey={"imageOverlayColor"}
							setAttributes={setAttributes}
							items={[
								{ label: "Default", value: "default" },
								{ label: "No Overlay", value: "no-overlay" },
								{ label: "Warm Sunset", value: "warm-sunset" },
								{
									label: "Ocean Breeze",
									value: "ocean-breeze",
								},
								{ label: "Royal Gold", value: "royal-gold" },
								{ label: "Cool Blues", value: "cool-blues" },
								{ label: "Soft Pastel", value: "soft-pastel" },
								{
									label: "Elegant Purple",
									value: "elegant-purple",
								},
								{
									label: "Energetic Orange",
									value: "energetic-orange",
								},
								{
									label: "Multi Color - Solid (Pro)",
									value: "multi-solid",
									disabled: "disabled"
								},
								{
									label: "Multi Color - Gradient (Pro)",
									value: "multi-gradient",
									disabled: "disabled"
								},
								{
									label: "Custom (Pro)",
									value: "custom",
									disabled: "disabled"
								},
							]}
						/>
					)}
					{"custom" === imageOverlayColor && (
						<>
							<SPToggleGroupControl
								attributes={contentAreaBgStyleType}
								items={[
									{ label: "Default", value: "color" },
									{ label: "Hover", value: "hover" },
								]}
								onClick={(val) => setContentAreaBgStyleType(val)}
							/>
							<Background
								label={__("Custom Color", "post-carousel")}
								colorLabel="Solid Color"
								defaultColor="#1E1E1E99"
								attributes={imageOverlayCustomColor}
								attributesKey={"imageOverlayCustomColor"}
								setAttributes={setAttributes}
								colorType={contentAreaBgStyleType}
								items={[
									{
										label: <TransparentIcon />,
										value: "transparent",
										tooltip: "Transparent",
									},
									{
										label: <BgIcon />,
										value: "bgColor",
										tooltip: "Solid",
									},
									{
										label: <GradientIcon />,
										value: "gradient",
										tooltip: "Gradient",
									},
								]}
							/>
						</>
					)}
					{!["post-grid-three"].includes(blockName) && (
						<SPToggleGroupControl
							label={__("Image Scale", "post-carousel")}
							attributes={imageScale}
							attributesKey={"imageScale"}
							setAttributes={setAttributes}
							items={[
								{ label: "None", value: "none" },
								{ label: "Cover", value: "cover" },
								{ label: "Contain", value: "contain" },
								{ label: "Fill", value: "fill" },
							]}
						/>
					)}
					<SPToggleGroupControl
						label={__("Fallback Image Replace With", "post-carousel")}
						attributes={imageFallbackReplace}
						attributesKey={"imageFallbackReplace"}
						setAttributes={setAttributes}
						items={[
							{ label: "Post Source", value: "source" },
							{ label: "Custom", value: "custom" },
						]}
					/>
					{/* {imageFallbackReplace === "source" && (
						<MultipleSelect
							label={__("Replace With", "post-carousel")}
							attributes={imageReplaceWith}
							attributesKey={"imageReplaceWith"}
							setAttributes={setAttributes}
							helpText={__("*If no featured image is found", "post-carousel")}
							items={[
								{ label: "Audio", value: "audio" },
								{ label: "Video", value: "video" },
								{ label: "Image", value: "img" },
							]}
						/>
					)} */}
					{imageFallbackReplace === "custom" && (
						<SPToggleGroupControl
							items={[
								{ label: "Image", value: "img" },
								{ label: "Video", value: "video" },
							]}
							attributes={toggleCustomFallbackBg}
							attributesKey={"toggleCustomFallbackBg"}
							setAttributes={setAttributes}
						/>
					)}
					{imageFallbackReplace === "custom" && toggleCustomFallbackBg === "img" && (
						<MediaPicker
							label={__("Image", "post-carousel")}
							imageKey="imageReplaceWithImage"
							enableImageSize={false}
							setAttributes={setAttributes}
							backgroundImage={imageReplaceWithImage}
						/>
					)}
					{imageFallbackReplace === "custom" && toggleCustomFallbackBg === "video" && (
						<MediaPicker
							label={__("Video", "post-carousel")}
							imageKey="imageReplaceWithVideo"
							mediaType="video"
							slug="video"
							enableImageSize={false}
							setAttributes={setAttributes}
							backgroundImage={imageReplaceWithVideo}
						/>
					)}

					<Toggle
						label={__("lazy Loading", "post-carousel")}
						attributes={imageLazyLoad}
						attributesKey={"imageLazyLoad"}
						setAttributes={setAttributes}
					/>

					<Toggle
						label={__("Show Image Gallery", "post-carousel")}
						attributes={showImageGallery}
						attributesKey={"showImageGallery"}
						setAttributes={setAttributes}
						pro={true}
					/>

					<ProInfo>
						<h3>Premium Only</h3>
						<h4>Unlock advanced Image and video Options, including:</h4>
						<ul>
							<li>
								— Image Custom Sizing
							</li>
							<li>
								— Add and display featured video
							</li>
							<li>
								— Replace Featured Image
							</li>
							<li>
								— Display posts gallery images
							</li>
							<li>
								— Boosts image performance by enabling Srcset
							</li>
						</ul>
						<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
					</ProInfo>
				</>
			)}
		</>
	);
};
export const ContentAreaGeneralTab = ({ attributes, setAttributes }) => {
	const { contentPartArray, catTabCategoryPosition } = attributes;

	return (<>
		<DragAndDropDnd
			// key={ rendKey }
			items={contentPartArray}
			onChange={(e) => setAttributes({ contentPartArray: e })}
			catTabCategoryPosition={catTabCategoryPosition}
			setAttributes={setAttributes}
		/>
		<ProInfo>
			<span>Rearrange content easily — Unlock Drag & Drop.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
		</ProInfo>
	</>
	);
};
export const TitleGeneralTab = ({ attributes, setAttributes }) => {
	const {
		titleShow,
		titleHTMLTag,
		titleLength,
		postBadgesShow,
		postBadgesPosition,
		badgesGap,
		contentOnHover,
		blockName,
		titleOnHover,
		titleType,
	} = attributes;

	return (
		<>
			{titleShow && (
				<>
					<SPToggleGroupControl
						label={__("HTML Tag", "post-carousel")}
						attributes={titleHTMLTag}
						attributesKey={"titleHTMLTag"}
						setAttributes={setAttributes}
						items={[
							{ label: "H1", value: "h1" },
							{ label: "H2", value: "h2" },
							{ label: "H3", value: "h3" },
							{ label: "H4", value: "h4" },
							{ label: "H5", value: "h5" },
							{ label: "H6", value: "h6" },
							{ label: "P", value: "p" },
						]}
					/>
					<SPToggleGroupControl
						label={__("Title Display Type", "post-carousel")}
						attributes={titleType}
						attributesKey={"titleType"}
						setAttributes={setAttributes}
						items={[
							{ label: "Full", value: "full" },
							{ label: "Limit (Pro)", value: "limit", disabled: "disabled" }
						]}
					/>
					{titleType === "limit" && (
						<SPRangeControl
							label={__("Length", "post-carousel")}
							className="sp-smart-post-ranger-length"
							attributes={titleLength}
							attributesKey={"titleLength"}
							setAttributes={setAttributes}
							units={["Chars", "Words"]}
							defaultValue={{ unit: "Words", value: 7 }}
							min={1}
							max={60}
						/>
					)}
					<Divider position="sp-w-100pct" />
					
					{!contentOnHover && ["post-carousel-two", "post-grid-two"].includes(blockName) && (
						<Toggle
							label={__("Display on Hover", "post-carousel")}
							attributes={titleOnHover}
							attributesKey={"titleOnHover"}
							setAttributes={setAttributes}
							pro={true}
						/>
					)}
					<Toggle
						label={__("Post Badges", "post-carousel")}
						attributes={postBadgesShow}
						attributesKey={"postBadgesShow"}
						setAttributes={setAttributes}
						pro={true}
					/>
					{/* {!postBadgesModules && postBadgesShow && (
						<p className="sp-smart-post-modules-notes">
							<strong>Note: </strong>
							<a href={modulesLink} target="_blank" rel="noreferrer">
								Post Badge Module
							</a>{" "}
							is disabled. Enable it to use Post Badges.
						</p>
					)} */}
					{postBadgesShow && (
						<>
							<SelectField
								label={__("Badge Display Position", "post-carousel")}
								attributes={postBadgesPosition}
								attributesKey={"postBadgesPosition"}
								setAttributes={setAttributes}
								items={[
									{
										label: "Before Title",
										value: "before-title",
									},
									{
										label: "After Title",
										value: "after-title",
									},
								]}
							/>
							<SPRangeControl
								label={__("Gap Between Badges", "post-carousel")}
								attributes={badgesGap}
								attributesKey={"badgesGap"}
								setAttributes={setAttributes}
								units={["px", "Em", "%"]}
								defaultValue={{ unit: "px", value: 5 }}
								min={0}
								max={24}
							/>
						</>
					)}
					<ProInfo>
						<span>Highlight important posts instantly with eye-catching badges. — Unlock Post Badges. </span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
					</ProInfo>
				</>
			)}
		</>
	);
};
export const MetaDataGeneralTab = ({ attributes, setAttributes }) => {
	const {
		metaAuthorStyle,
		metaDateFormat,
		metaPerMin,
		metaReadingTimePostfix,
		metaUserIcon,
		metaDateCustomDateFormat,
		metaDataArray,
		catTabCategoryPosition,
		metaDataAllContentArray,
		metaDisplayType,
		contentOnHover,
		blockName,
		metaOnHover,
		contentOrientation,
	} = attributes;

	const metaDataContentArray = metaDataAllContentArray.filter((item) => item.value !== "");


	const showAuthor = metaDataContentArray.some((item) => item.value === "author" && item.show);
	const showDate = metaDataContentArray.some((item) => item.value === "date" && item.show);
	const showReadingTime = metaDataContentArray.some((item) => item.value === "reading-time" && item.show);

	return (
		<>
			<DragAndDropDnd
				key={metaDataContentArray}
				label={__("Meta Data", "post-carousel")}
				items={metaDataContentArray}
				toggleBtn={true}
				onChange={(e) => {
					setAttributes({ metaDataAllContentArray: e });
				}}
			/>

			{!contentOnHover && ["post-carousel-two", "post-grid-two"].includes(blockName) && (
				<Toggle
					label={__("Display on Hover", "post-carousel")}
					attributes={metaOnHover}
					attributesKey={"metaOnHover"}
					setAttributes={setAttributes}
					pro={true}
				/>
			)}

			<SPToggleGroupControl
				label={__("Meta Display Type", "post-carousel")}
				attributes={metaDisplayType}
				attributesKey={"metaDisplayType"}
				setAttributes={setAttributes}
				items={[
					{ label: "Inline", value: "inline" },
					{ label: "Split Left-Right", value: "split-left-right", disabled: "disabled" },
				]}
			/>
			{showAuthor && (
				<>
					<SelectField
						label={__("Author Display Style", "post-carousel")}
						attributes={metaAuthorStyle}
						attributesKey={"metaAuthorStyle"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Select Author Style",
								value: "",
								disabled: "disabled",
							},
							{ label: "Show Name", value: "show_name" },
							{ label: "Show Gravatar", value: "show_gravatar" },
							{
								label: "Author Name with Icon",
								value: "name_with_icon",
							},
							{
								label: "Show Name with Gravatar (Pro)",
								value: "name_with_gravatar",
								disabled: "disabled"
							},
						]}
					/>
					{"name_with_icon" === metaAuthorStyle && (
						<div className={"sp-smart-post-metadata-user-icon sp-smart-post-component-mb"}>
							<SelectDropdown
								label={__("Author Icon Style", "post-carousel")}
								attributes={metaUserIcon}
								attributesKey={"metaUserIcon"}
								setAttributes={setAttributes}
								options={[
									{
										label: "Outline",
										value: "outline",
										icon: <Outline />,
									},
									{
										label: "Basic Outline",
										value: "basic-outline",
										icon: <BasicOutline />,
									},
									{
										label: "Solid",
										value: "user-solid",
										icon: <UserSolid />,
									},
									{
										label: "Profile Rounded",
										value: "rounded",
										icon: <Rounded />,
									},
									{
										label: "Profile Circle",
										value: "circle",
										icon: <Circle />,
									},
									{
										label: "Female",
										value: "female",
										icon: <Female />,
									},
									{
										label: "Author",
										value: "author",
										icon: <UserAuthor />,
									},
									{
										label: "Minimal",
										value: "minimal",
										icon: <Minimal />,
									},
								]}
							/>
						</div>
					)}
				</>
			)}
			{/* <Toggle
				label={ __( 'Date', 'post-carousel' ) }
				attributes={ metaDateShow ) }
				attributesKey={ 'metaDateShow' }
				setAttributes={ setAttributes }
			/> */}
			{showDate && "orientation_two" !== contentOrientation && (
				<>
					<SelectField
						label={__("Date Format", "post-carousel")}
						attributes={metaDateFormat}
						attributesKey={"metaDateFormat"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Default",
								value: "default"
							},
							{
								label: "Oct 7, 2025",
								value: "M j, Y",
							},
							{
								label: "October 7, 2025",
								value: "F j, Y",
							},
							{
								label: "Time Ago (Human Time) (Pro)",
								value: "time_ago",
								disabled: "disabled",
							},
							{
								label: "Custom (Pro)",
								value: "custom",
								disabled: "disabled",
							},
						]}
					/>
					{metaDateFormat === "custom" && (
						<>
							<InputControl
								help={
									<>
										<span>{__("To define format, check", "post-carousel")}</span>
										<a
											href="https://wordpress.org/support/article/formatting-date-and-time/"
											target="_blank"
											rel="noreferrer"
										>
											{" "}
											this doc.
										</a>
									</>
								}
								attributes={metaDateCustomDateFormat}
								attributesKey={"metaDateCustomDateFormat"}
								setAttributes={setAttributes}
								inputType={"string"}
								flex={false}
								placeholder={"F j, Y"}
							/>
						</>
					)}
				</>
			)}
			{showReadingTime && (
				<>
					<SPRangeControl
						label={__("Per Min", "post-carousel")}
						className="sp-smart-post-ranger-length"
						attributes={metaPerMin}
						attributesKey={"metaPerMin"}
						setAttributes={setAttributes}
						units={["Words"]}
						defaultValue={{ unit: "words", value: 100 }}
						max={200}
					/>
					<InputControl
						label={__("Reading Time Postfix", "post-carousel")}
						attributes={metaReadingTimePostfix}
						attributesKey={"metaReadingTimePostfix"}
						setAttributes={setAttributes}
						flex={false}
						inputType="text"
					/>
				</>
			)}
			<ProInfo>
				<h4>Take control of your meta styling:</h4>
				<ul>
					<li>
						— Drag & Drop meta items
					</li>
					<li>
						— flexible Left-Right splits
					</li>
				</ul>
				<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" className="sp-smart-upgrade-btn">Upgrade to Pro</a>
			</ProInfo>
		</>
	);
};
export const CategoryGeneralTab = ({ attributes, setAttributes }) => {
	const {
		catTabCategoryEnable,
		catTabCategoryPosition,
		catTabCategoryType,
		metaDataAllContentArray,
		contentPartArray,
		contentOnHover,
		blockName,
		taxonomyOnHover,
		allTaxonomy,
	} = attributes;

	useEffect(() => {
		const hasCategory = metaDataAllContentArray.some((t) => t.value === "taxonomy");
		let besideMetaArray;
		// let updatedContentArray;
		const updatedContentArray = contentPartArray;

		if (catTabCategoryPosition === "beside-other-meta") {
			besideMetaArray = hasCategory
				? [...metaDataAllContentArray]
				: [
					...metaDataAllContentArray,
					{
						label: "Taxonomy",
						value: "taxonomy",
						id: 7,
						show: true,
					},
				];
		} else {
			besideMetaArray = metaDataAllContentArray.filter((t) => t.value !== "taxonomy");
		}
		if (catTabCategoryPosition === "above-title") {
			rearrangeAboveTitle(updatedContentArray);
		}
		setAttributes({
			metaDataAllContentArray: besideMetaArray,
			contentPartArray: updatedContentArray,
		});
	}, [catTabCategoryPosition]);

	const { allTaxonomies } = useMetaData(attributes, "editSite");

	useEffect(() => {
		if (allTaxonomies?.length > 0) {
			setAttributes({ allTaxonomy: allTaxonomies });
		}
	}, [allTaxonomies]);

	return (
		<>
			{!contentOnHover && ["post-carousel-two", "post-grid-two"].includes(blockName) && (
				<Toggle
					label={__("Display on Hover", "post-carousel")}
					attributes={taxonomyOnHover}
					attributesKey={"taxonomyOnHover"}
					setAttributes={setAttributes}
					pro={true}
				/>
			)}
			{catTabCategoryEnable && (
				<>
					<SelectField
						label={__("Position", "post-carousel")}
						attributes={catTabCategoryPosition}
						attributesKey={"catTabCategoryPosition"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Default Position",
								value: "",
							},
							{
								label: "Above Title",
								value: "above-title",
							},
							{
								label: "Over Thumbnail - Bottom Right",
								value: "bottom-right",
							},
							{
								label: "Over Thumbnail - Center Center",
								value: "center-center",
							},
							{
								label: "Over Thumbnail - Center Top",
								value: "center-top",
							},
							{
								label: "Beside Other Meta (Pro)",
								value: "beside-other-meta",
								disabled: "disabled"
							},
							{
								label: "Over Thumbnail - Top Left (Pro)",
								value: "top-left",
								disabled: "disabled"
							},
							{
								label: "Over Thumbnail - Top Right (Pro)",
								value: "top-right",
								disabled: "disabled"
							},
							{
								label: "Over Thumbnail - Bottom Left (Pro)",
								value: "bottom-left",
								disabled: "disabled"
							},
							{
								label: "Over Thumbnail - Center Bottom (Pro)",
								value: "center-bottom",
								disabled: "disabled"
							},
						]}
					/>
					<ProInfo>
						<span>Enhance post discovery by displaying categories or tags — Unlock Taxonomy Type. </span>
						<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" >Upgrade to Pro</a>
					</ProInfo>
				</>
			)}
		</>
	);
};
export const ExcerptGeneralTab = ({ attributes, setAttributes }) => {
	const {
		excerptShow,
		seoMetaShow,
		excerptType,
		excerptLength,
		ellipsisPointsEndingExcerpt,
		contentOnHover,
		blockName,
		excerptOnHover,
	} = attributes;

	const excerptMax = excerptLength?.unit === "words" ? 100 : 200;

	return (
		<>
			{!contentOnHover && ["post-carousel-two", "post-grid-two"].includes(blockName) && excerptShow && (
				<Toggle
					label={__("Display on Hover", "post-carousel")}
					attributes={excerptOnHover}
					attributesKey={"excerptOnHover"}
					setAttributes={setAttributes}
					pro={true}
				/>
			)}
			{excerptShow && (
				<>
					<SPToggleGroupControl
						label={__("Excerpt Type", "post-carousel")}
						attributes={excerptType}
						attributesKey={"excerptType"}
						setAttributes={setAttributes}
						items={[
							{ label: "Full", value: "full" },
							{ label: "Limited", value: "limited" },
						]}
					/>
					{excerptType && excerptType === "limited" && (
						<>
							<SPRangeControl
								label={__("Length", "post-carousel")}
								setAttributes={setAttributes}
								attributes={excerptLength}
								units={["words", "chars"]}
								className={"sp-smart-post-ranger-length"}
								attributesKey={"excerptLength"}
								defaultValue={{ unit: "words", value: 14 }}
								min={1}
								max={excerptMax}
								pro={true}
							/>
							<InputControl
								label={__("Ellipsis Points Ending Excerpt", "post-carousel")}
								attributes={ellipsisPointsEndingExcerpt}
								attributesKey={"ellipsisPointsEndingExcerpt"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
								placeholder={__("…", "post-carousel")}
							/>
						</>
					)}
					<Toggle
						label={__("SEO Meta", "post-carousel")}
						attributes={seoMetaShow}
						setAttributes={setAttributes}
						attributesKey={"seoMetaShow"}
						pro={true}
						helpText={__(
							"Show Meta from SEO Framework, Yoast, RankMath, AIO, SEOPress and Squirrly. Make sure one of this SEO Plugin is active.",
							"post-carousel"
						)}
					/>
					<ProInfo>
						<span>Show SEO meta from Yoast, RankMath, AIO, SEOPress & more.  </span>
						<a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer" >Upgrade to Pro</a>
					</ProInfo>
				</>
			)}
		</>
	);
};
export const ReadMoreGeneralTab = ({ attributes, setAttributes }) => {
	const { showReadMoreButton, readMoreButtonLabel, readMoreButtonType, contentOnHover, blockName, readMoreOnHover } =
		attributes;
	return (
		<>
			{!contentOnHover && ["post-carousel-two", "post-grid-two"].includes(blockName) && showReadMoreButton && (
				<Toggle
					label={__("Display on Hover", "post-carousel")}
					attributes={readMoreOnHover}
					attributesKey={"readMoreOnHover"}
					setAttributes={setAttributes}
					pro={true}
				/>
			)}
			{showReadMoreButton && (
				<>
					<SPToggleGroupControl
						label={__("Read More Type", "post-carousel")}
						attributes={readMoreButtonType}
						attributesKey={"readMoreButtonType"}
						setAttributes={setAttributes}
						items={[
							{ label: "Button", value: "button" },
							{ label: "Text Link", value: "link" },
						]}
					/>
					<InputControl
						label={__("Button Label", "post-carousel")}
						attributes={readMoreButtonLabel}
						attributesKey={"readMoreButtonLabel"}
						setAttributes={setAttributes}
						flex={false}
						inputType="text"
					/>
				</>
			)}
		</>
	);
};
export const SocialShareGeneralTab = ({ attributes, setAttributes }) => {
	const {
		socialShareEnableSocial,
		socialSharingMedia,
		uniqueId,
		socialIconDisplayType,
		socialShareDisplayOnHover,
		socialShareIconPosition,
		metaDisplayType,
		contentOnHover,
		blockName,
		socialShareOnHover,
	} = attributes;

	return (
		<>
			{!contentOnHover &&
				["post-carousel-two", "post-grid-two"].includes(blockName) &&
				socialShareEnableSocial && (
					<Toggle
						label={__("Display on Hover", "post-carousel")}
						attributes={socialShareOnHover}
						attributesKey={"socialShareOnHover"}
						setAttributes={setAttributes}
						pro={true}
					/>
				)}
			{socialShareEnableSocial && (
				<>
					<MultiSelectDndKit
						label={__("Sharing Media", "post-carousel")}
						items={[
							{ label: "Facebook", value: "facebook", id: 1 },
							{ label: "X", value: "x", id: 2 },
							{ label: "LinkedIn", value: "linkedin", id: 3 },
							{ label: "Pinterest", value: "pinterest", id: 4 },
							{ label: "Email", value: "mail", id: 5 },
							{ label: "Instagram", value: "instagram", id: 6 },
							{ label: "VK", value: "vkontakte", id: 7 },
							{ label: "digg", value: "digg", id: 8 },
							{ label: "Tumblr", value: "tumblr", id: 9 },
							{ label: "Reddit", value: "reddit", id: 10 },
							{ label: "WhatsApp", value: "whatsapp", id: 11 },
							{ label: "Pocket", value: "pocket", id: 12 },
							{ label: "Xing", value: "xing", id: 13 },
							{ label: "Copy Post URL (Pro)", value: "clone", id: 14, disabled: "disabled" },
						]}
						uniqueId={uniqueId}
						values={socialSharingMedia}
						searchable={true}
						onChange={(e) => setAttributes({ socialSharingMedia: e })}
					/>
					<SPToggleGroupControl
						label={__("Icon Display Type", "post-carousel")}
						attributes={socialIconDisplayType}
						attributesKey={"socialIconDisplayType"}
						setAttributes={setAttributes}
						items={[
							{ label: "Inline", value: "inline-icon" },
							{
								label: "Popup Share", value: "popup-share",
								disabled: "disabled"
							},
						]}
					/>
					{"popup-share" === socialIconDisplayType && (
						<>
							<Toggle
								label={__("Display on Hover", "post-carousel")}
								attributes={socialShareDisplayOnHover}
								attributesKey={"socialShareDisplayOnHover"}
								setAttributes={setAttributes}
								pro={true}
							/>
						</>
					)}
					{"popup-share" === socialIconDisplayType && (
						<>
							<SelectField
								label={__("Share Icon Position", "post-carousel")}
								attributes={socialShareIconPosition}
								attributesKey={"socialShareIconPosition"}
								setAttributes={setAttributes}
								items={
									metaDisplayType === "inline"
										? [
											{
												label: "Select a Position",
												value: "",
											},
											{
												label: "Beside Taxonomy",
												value: "beside-taxonomy",
											},
											{
												label: "Space Between Taxonomy",
												value: "space-between-taxonomy",
											},
											{
												label: "Beside Meta",
												value: "beside-meta",
											},
											{
												label: "Space Between Meta",
												value: "space-between-meta",
											},
										]
										: [
											{
												label: "Select a Position",
												value: "",
											},
											{
												label: "Beside Taxonomy",
												value: "beside-taxonomy",
											},
											{
												label: "Space Between Taxonomy",
												value: "space-between-taxonomy",
											},
											{
												label: "Beside Meta",
												value: "beside-meta",
											},
										]
								}
							/>
						</>
					)}
					<ProInfo>
						<span>Display social share icons in a popup for a smarter, cleaner, and minimal showcase.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
					</ProInfo>
				</>
			)}
		</>
	);
};

export const PopupDetailsGeneralTab = ({ attributes, setAttributes }) => {
	const {
		popupImageSize,
		popupCloseBtnEnable,
		popupCloseBtnSize,
		popupMaxWidth,
		popupMaxHeight,
		popupImageHeight,
		popupImageWidth,
	} = attributes;

	const { imageSizes } = useMetaData(attributes);

	const imageSizesOption = imageSizes
		? imageSizes?.map((size) => {
			return { label: size, value: size };
		})
		: [];

	return (
		<>
			<SelectField
				label={__("Image Size", "post-carousel")}
				attributes={popupImageSize}
				attributesKey={"popupImageSize"}
				setAttributes={setAttributes}
				items={[
					...imageSizesOption,
					{
						label: __("Custom Size", "post-carousel"),
						value: "custom",
					},
				]}
			/>
			{"custom" === popupImageSize && (
				<>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={popupImageWidth}
						attributesKey={"popupImageWidth"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{ unit: "%", value: 500 }}
						max={1200}
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={popupImageHeight}
						attributesKey={"popupImageHeight"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						defaultValue={{ unit: "px", value: 500 }}
						max={700}
					/>
				</>
			)}
			<Toggle
				label={__("Close Button", "post-carousel")}
				attributes={popupCloseBtnEnable}
				attributesKey={"popupCloseBtnEnable"}
				setAttributes={setAttributes}
			/>
			{popupCloseBtnEnable && (
				<SPRangeControl
					label={__("Size", "post-carousel")}
					setAttributes={setAttributes}
					attributes={popupCloseBtnSize}
					units={["px", "%", "Em"]}
					max={65}
					attributesKey={"popupCloseBtnSize"}
					defaultValue={{ value: 32, unit: "px" }}
				/>
			)}
			<SPRangeControl
				label={__("Max Width", "post-carousel")}
				setAttributes={setAttributes}
				attributes={popupMaxWidth}
				units={["px", "%", "Em"]}
				max={1400}
				attributesKey={"popupMaxWidth"}
				defaultValue={{ value: 1050, unit: "px" }}
			/>
			<SPRangeControl
				label={__("Max Height", "post-carousel")}
				setAttributes={setAttributes}
				attributes={popupMaxHeight}
				units={["px", "%", "Em"]}
				max={1400}
				attributesKey={"popupMaxHeight"}
				defaultValue={{ value: 700, unit: "px" }}
			/>
		</>
	);
};

export const PaginationGeneralTab = ({ attributes, setAttributes }) => {
	const {
		paginationType,
		loadMoreInfiniteScroll,
		loadMoreBtnLabel,
		loadMoreEndMessage,
		paginationAlign,
		paginationStyle,
		paginationPrevLabel,
		paginationNextLabel,
		paginationSpaceBetween,
		navigationArrowStyle,
		navigationArrowSize,
		navigationArrowWidth,
		navigationArrowHeight,
		navigationArrowPosition,
	} = attributes;

	const togglePaginationType = (newValue) => {
		if (newValue !== "load-more") {
			setAttributes({
				paginationType: newValue,
				loadMoreInfiniteScroll: false,
			});
		}
		setAttributes({ paginationType: newValue });
	};

	return (
		<>
			<SPToggleGroupControl
				label={__("Pagination Type", "post-carousel")}
				attributes={paginationType}
				onClick={(e) => togglePaginationType(e)}
				items={[
					{ label: "Load More", value: "load-more" },
					{ label: "Navigation", value: "navigation" },
					{ label: "Number", value: "pagination" },
				]}
			/>
			{paginationType === "load-more" && (
				<>
					<Toggle
						label={__("Infinite Scroll", "post-carousel")}
						attributes={loadMoreInfiniteScroll}
						attributesKey={"loadMoreInfiniteScroll"}
						setAttributes={setAttributes}
						pro={true}
					/>
					{!loadMoreInfiniteScroll && (
						<InputControl
							label={__("Button Label", "post-carousel")}
							attributes={loadMoreBtnLabel}
							attributesKey={"loadMoreBtnLabel"}
							setAttributes={setAttributes}
							flex={false}
							inputType="string"
							placeholder={__("Load More", "post-carousel")}
						/>
					)}
					<InputControl
						label={__("Ending Message", "post-carousel")}
						attributes={loadMoreEndMessage}
						attributesKey={"loadMoreEndMessage"}
						setAttributes={setAttributes}
						flex={false}
						inputType="string"
						placeholder={__("No more posts available", "post-carousel")}
					/>
				</>
			)}
			{paginationType === "navigation" && (
				<>
					<SelectDropdown
						label={__("Arrow Icon Style", "post-carousel")}
						attributes={navigationArrowStyle}
						attributesKey={"navigationArrowStyle"}
						setAttributes={setAttributes}
						options={[
							{
								label: __("Chevron Solid", "post-carousel"),
								value: "chevron-solid",
								icon: <ChevronSolid />,
							},
							{
								label: __("Chevron Outline", "post-carousel"),
								value: "chevron-outline",
								icon: <ChevronOutline />,
							},
							{
								label: __("Chevron Bold", "post-carousel"),
								value: "chevron-bold",
								icon: <ChevronBold />,
							},
							{
								label: __("Double Chevron", "post-carousel"),
								value: "double-chevron",
								icon: <DoubleChevron />,
							},
							{
								label: __("Arrow Solid", "post-carousel"),
								value: "arrow-solid",
								icon: <ArrowSolid />,
							},
							{
								label: __("Arrow Outline", "post-carousel"),
								value: "arrow-outline",
								icon: <ArrowOutline />,
							},
							{
								label: __("Arrow Minimal", "post-carousel"),
								value: "arrow-minimal",
								icon: <ArrowMinimal />,
							},
							{
								label: __("Chevron Border Line", "post-carousel"),
								value: "chevron-border-line",
								icon: <ChevronBorderLine />,
							},
							{
								label: __("Double Chevron Outline", "post-carousel"),
								value: "double-chevron-outline",
								icon: <DoubleChevronOutline />,
							},
							{
								label: __("Triangle Outline", "post-carousel"),
								value: "triangle-outline",
								icon: <TriangleOutline />,
							},
						]}
					/>
					<SPRangeControl
						label={__("Size", "post-carousel")}
						attributes={navigationArrowSize}
						attributesKey={"navigationArrowSize"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 20 }}
					/>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={navigationArrowWidth}
						attributesKey={"navigationArrowWidth"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 40 }}
					/>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={navigationArrowHeight}
						attributesKey={"navigationArrowHeight"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						defaultValue={{ unit: "px", value: 40 }}
					/>
					<SPRangeControl
						label={__("Gap", "post-carousel")}
						attributes={paginationSpaceBetween}
						attributesKey={"paginationSpaceBetween"}
						setAttributes={setAttributes}
						max={1400}
						defaultValue={{ unit: "px", value: 4 }}
						units={["px", "%", "em"]}
					/>
					<SPToggleGroupControl
						label={__("Arrow Position", "post-carousel")}
						attributes={navigationArrowPosition}
						attributesKey={"navigationArrowPosition"}
						setAttributes={setAttributes}
						items={[
							{ label: "Top", value: "top" },
							{ label: "Bottom", value: "bottom" },
						]}
					/>
				</>
			)}
			{paginationType === "pagination" && (
				<>
					<SelectField
						label={__("Number Type", "post-carousel")}
						attributes={paginationStyle}
						attributesKey={"paginationStyle"}
						setAttributes={setAttributes}
						items={[
							{
								label: "Select a Pagination Type",
								value: "",
								disabled: "disabled",
							},
							{ label: "Number", value: "number" },
							{
								label: "Number + Arrow",
								value: "number-arrow",
							},
							{
								label: "Number + Previous/Next with Arrow (Pro)",
								value: "number-prev-next-arrow",
								disabled: true,
							},
							{
								label: "Previous/Next",
								value: "prev-next",
							},
						]}
					/>
					<SPRangeControl
						label={__("Gap", "post-carousel")}
						attributes={paginationSpaceBetween}
						attributesKey={"paginationSpaceBetween"}
						setAttributes={setAttributes}
						max={1400}
						defaultValue={{ unit: "px", value: 4 }}
						units={["px", "%", "em"]}
					/>
					{["number+prev/next+arrow", "prev/next"].includes(paginationStyle) && (
						<>
							<InputControl
								label={__("Previous Label", "post-carousel")}
								attributes={paginationPrevLabel}
								attributesKey={"paginationPrevLabel"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
							/>
							<InputControl
								label={__("Next Label", "post-carousel")}
								attributes={paginationNextLabel}
								attributesKey={"paginationNextLabel"}
								setAttributes={setAttributes}
								flex={false}
								inputType="string"
							/>
						</>
					)}
				</>
			)}
			<SPToggleGroupControl
				label={__("Alignment", "post-carousel")}
				attributes={paginationAlign}
				attributesKey={"paginationAlign"}
				setAttributes={setAttributes}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
			/>
		</>
	);
};

export const CarouselNavArrowGeneralTab = ({ attributes, setAttributes, verticalPosition = true }) => {
	const {
		carouselArrowStyle,
		carouselArrowSize,
		carouselArrowWidth,
		carouselArrowHeight,
		carouselArrowSpaceBetween,
		carouselArrowHorizontal,
		carouselArrowVertical,
		blockName,
		navArrowVisibilityOnHover,
	} = attributes;

	const defaultData = useDefaultValue(blockName);
	return (
		<>
			<SelectDropdown
				label={__("Arrow Icon Style", "post-carousel")}
				attributes={carouselArrowStyle}
				attributesKey={"carouselArrowStyle"}
				setAttributes={setAttributes}
				options={[
					{
						label: __("Chevron Solid", "post-carousel"),
						value: "chevron-solid",
						icon: <ChevronSolid />,
					},
					{
						label: __("Chevron Outline", "post-carousel"),
						value: "chevron-outline",
						icon: <ChevronOutline />,
					},
					{
						label: __("Chevron Bold", "post-carousel"),
						value: "chevron-bold",
						icon: <ChevronBold />,
					},
					{
						label: __("Double Chevron", "post-carousel"),
						value: "double-chevron",
						icon: <DoubleChevron />,
					},
					{
						label: __("Arrow Solid", "post-carousel"),
						value: "arrow-solid",
						icon: <ArrowSolid />,
					},
					{
						label: __("Arrow Outline", "post-carousel"),
						value: "arrow-outline",
						icon: <ArrowOutline />,
					},
					{
						label: __("Arrow Minimal", "post-carousel"),
						value: "arrow-minimal",
						icon: <ArrowMinimal />,
					},
					{
						label: __("Chevron Border Line", "post-carousel"),
						value: "chevron-border-line",
						icon: <ChevronBorderLine />,
					},
					{
						label: __("Double Chevron Outline", "post-carousel"),
						value: "double-chevron-outline",
						icon: <DoubleChevronOutline />,
					},
					{
						label: __("Triangle Outline", "post-carousel"),
						value: "triangle-outline",
						icon: <TriangleOutline />,
					},
				]}
			/>
			<SPRangeControl
				label={__("Size", "post-carousel")}
				attributes={carouselArrowSize}
				attributesKey={"carouselArrowSize"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				defaultValue={{ unit: "px", value: 16 }}
			/>
			<SPRangeControl
				label={__("Width", "post-carousel")}
				attributes={carouselArrowWidth}
				attributesKey={"carouselArrowWidth"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				defaultValue={{ unit: "px", value: 40 }}
			/>
			<SPRangeControl
				label={__("Height", "post-carousel")}
				attributes={carouselArrowHeight}
				attributesKey={"carouselArrowHeight"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				defaultValue={{ unit: "px", value: 40 }}
			/>
			<SPRangeControl
				label={__("Space Between Arrows", "post-carousel")}
				attributes={carouselArrowSpaceBetween}
				attributesKey={"carouselArrowSpaceBetween"}
				setAttributes={setAttributes}
				units={["px", "%", "Em"]}
				max={1600}
				defaultValue={{ unit: "%", value: 100 }}
				typoLineHeight={true}
			/>
			<SPRangeControl
				label={__("Horizontal Position", "post-carousel")}
				attributes={carouselArrowHorizontal}
				attributesKey={"carouselArrowHorizontal"}
				setAttributes={setAttributes}
				units={["%", "px"]}
				max={2000}
				min={-100}
				defaultValue={{
					unit: "px",
					value: defaultData?.carouselArrowHorizontal,
				}}
			// defaultValue={horizontalDefaultValue()}
			/>
			{verticalPosition && (
				<SPRangeControl
					label={__("Vertical Position", "post-carousel")}
					attributes={carouselArrowVertical}
					attributesKey={"carouselArrowVertical"}
					setAttributes={setAttributes}
					units={["%", "px"]}
					max={2000}
					min={-100}
					defaultValue={{ unit: "%", value: 50 }}
				/>
			)}
			<Toggle
				label={__("Visibility on Hover", "post-carousel")}
				attributes={navArrowVisibilityOnHover}
				attributesKey={"navArrowVisibilityOnHover"}
				setAttributes={setAttributes}
				pro={true}
			/>
		</>
	);
};

export const CarouselPaginationGeneralTab = ({ attributes, setAttributes }) => {
	const {
		carouselPaginationStyle,
		carouselPaginationWidth,
		carouselPaginationHeight,
		carouselPaginationSpaceBetween,
		carouselPaginationHorizontal,
		carouselPaginationVertical,
		blockName,
	} = attributes;
	const device = useDeviceType();

	const paginationDotChangeHandler = (value) => {
		setAttributes({
			carouselPaginationStyle: value,
			carouselPaginationWidth: {
				...carouselPaginationWidth,
				device: {
					...carouselPaginationWidth.device,
					[device]: paginationDotsStyle[value].width,
				},
			},
			carouselPaginationHeight: {
				...carouselPaginationHeight,
				device: {
					...carouselPaginationHeight.device,
					[device]: paginationDotsStyle[value].height,
				},
			},
		});
	};

	return (
		<>
			<SelectDropdown
				label={__("Pagination Style", "post-carousel")}
				setAttributes={setAttributes}
				attributesKey={"carouselPaginationStyle"}
				attributes={carouselPaginationStyle}
				onClick={paginationDotChangeHandler}
				options={[
					{ label: "Dots", value: "dots", icon: <DotsPagination /> },
					{
						label: "Scrollbar",
						value: "scrollbar",
						icon: <ScrollbarPagination />,
					},
					{
						label: "Numbers",
						value: "numbers",
						icon: <NumbersPagination />,
					},
					{
						label: "Dynamic",
						value: "dynamic",
						icon: <DynamicPagination />,
						disabled: "disabled",
						type: "pro",
					},
					{
						label: "Strokes",
						value: "strokes",
						icon: <StrokesPagination />,
						type: "pro",
						disabled: "disabled",
					},
					{
						label: "Fraction",
						value: "fraction",
						icon: <FractionPagination />,
						type: "pro",
						disabled: "disabled",
					},
				]}
			/>
			{carouselPaginationStyle !== "scrollbar" && (
				<>
					<SPRangeControl
						label={__("Width", "post-carousel")}
						attributes={carouselPaginationWidth}
						attributesKey={"carouselPaginationWidth"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						min={8}
						max={60}
						defaultValue={{ unit: "px", value: 12 }}
					/>
				</>
			)}
			{carouselPaginationStyle !== "fraction" && (
				<>
					<SPRangeControl
						label={__("Height", "post-carousel")}
						attributes={carouselPaginationHeight}
						attributesKey={"carouselPaginationHeight"}
						setAttributes={setAttributes}
						units={["px", "%", "Em"]}
						max={60}
						min={4}
						defaultValue={{ unit: "px", value: 12 }}
					/>
				</>
			)}
			{carouselPaginationStyle !== "scrollbar" && (
				<>
					{carouselPaginationStyle !== "fraction" && (
						<SPRangeControl
							label={__("Space Between Dots", "post-carousel")}
							attributes={carouselPaginationSpaceBetween}
							attributesKey={"carouselPaginationSpaceBetween"}
							setAttributes={setAttributes}
							units={["px", "%", "Em"]}
							max={40}
							defaultValue={{ unit: "px", value: 6 }}
						/>
					)}
					<SPRangeControl
						label={__("Horizontal Position", "post-carousel")}
						attributes={carouselPaginationHorizontal}
						attributesKey={"carouselPaginationHorizontal"}
						setAttributes={setAttributes}
						units={["%", "px"]}
						max={1400}
						defaultValue={{ unit: "%", value: "" }}
					/>
				</>
			)}
			<SPRangeControl
				label={__("Vertical Position", "post-carousel")}
				attributes={carouselPaginationVertical}
				attributesKey={"carouselPaginationVertical"}
				setAttributes={setAttributes}
				units={["%", "px"]}
				max={1400}
				min={-50}
				defaultValue={{
					unit: "px",
					value: ["post-carousel", "post-carousel-two"].includes(blockName) ? -36 : 30,
				}}
			/>
		</>
	);
};
