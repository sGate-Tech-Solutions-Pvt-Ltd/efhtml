import { Fragment, useEffect, useMemo, useState } from "@wordpress/element";
import { randomSolidColor } from "../../helpFn";
import {
	Category,
	Date,
	Excerpt,
	FeaturedImage,
	MetadataRenderer,
	ReadMoreButton,
	SocialShare,
	Title,
} from "../templates-parts/templates-parts";
import InnerHTML from "dangerously-set-html-content";
import { inArray } from "../../../../controls/controls";
import { usePanelBodyContext } from "../../../../context";
import { EditImageIcon, SharePopupIcon } from "../../../../icons/icons";

const TemplateOne = ({
	data,
	layout = "default",
	attributes,
	index = false,
	largeItem = false,
	largeItemIndex = false,
	contentPosition = "top",
	thumbItem = false,
	thumbIndex = "",
	isSelected = false,
	onSelect = () => {},
	tickerWidth = false,
}) => {
	const {
		attachment_metadata,
		category_list,
		tag_list,
		format_list,
		attachment_srcset,
		author,
		author_avatar_url,
		author_url,
		comment_count,
		link,
		view_count,
		excerpt,
		content,
		seo_meta_excerpt,
		image_alt,
		image_title,
		attachment_url,
		post_thumbnail_url,
		post_image_gallery,
		post_video_meta_data,
		all_term_list,
	} = data;

	const {
		catTabCategoryPosition,
		metaAuthorShow,
		metaDateShow,
		metaCommentCounter,
		metaViewCount,
		// metaLike,
		metaReadingTime,
		excerptShow,
		excerptType,
		socialShareEnableSocial,
		titleShow,
		titleLength,
		titleHTMLTag: TitleTag,
		excerptLength,
		metaDateFormat,
		socialSharingMedia,
		metaAuthorStyle,
		metaUserIcon,
		metaReadingTimePostfix,
		metaPerMin,
		imageFeaturedImg,
		imagePosition,
		contentOrientation,
		ellipsisPointsEndingExcerpt,
		showReadMoreButton,
		readMoreButtonLabel,
		readMoreIconStyle,
		// dynamicClassNames,
		metaSeparator,
		imageSize,
		// carouselColumn,
		carouselStyle,
		postType,
		generalLinkOpen,
		// popupCloseBtnEnable,
		// popupMaxWidth,
		// popupMaxHeight,
		// popupTitleColor,
		// popupOverlayColor,
		// popupBgColor,
		// popupExcerptColor,
		// popupMetaFieldsColor,
		// uniqueId,
		// popupImageSize,
		imageReplaceWith,
		imageReplaceWithImage,
		imageReplaceWithVideo,
		// imageReplaceWithCustomBg,
		toggleCustomFallbackBg,
		imageFallbackReplace,
		imageOverlayColor,
		metaDateCustomDateFormat,
		// imageLazyLoad,
		imageSrcset,
		// popupCloseBtnColor,
		// popupCloseBtnSize,
		// popupNavArrowColor,
		// popupNavArrowBgColor,
		metaDataArray,
		// currentPage,
		// postCardPadding,
		// showPrice,
		// showReviewCount,
		// showRating,
		// reviewCounterColor,
		// emptyStarColor,
		// starColor,
		// showAddToCart,
		catTabCategoryType,
		// contentAreaMargin,
		seoMetaShow,
		catTabCategoryEnable,
		postListLayout,
		contentPartArray,
		socialIconDisplayType,
		socialShareIconPosition,
		socialShareDisplayOnHover,
		metaDataAllContentArray,
		readMoreButtonType,
		socialShareIconType,
		contentHorizontalPosition,
		imageHoverEffect,
		imageOverlayType,
		// contentAlignment,
		metaDisplayType,
		// blockName,
		enableMetaData,
		readMoreIocVisibility,
		titleGlobalTypography,
		catTabCategoryGlobalTypography,
		metaGlobalTypography,
		excerptGlobalTypography,
		readMoreButtonGlobalTypography,
		showImageGallery,
		imageGallerySource,
		showImageGalleryNavArrow,
		showImageGalleryNavArrowHover,
		imageGalleryNavArrowStyle,
		imageGalleryNavArrowSize,
		showFeatureVideo,
		postBadgesGlobalTypography,
		titleEffect,
		postBadgesShow,
		postBadgesPosition,
		blockName,
		align,
	} = attributes;

	const { togglePanelBody } = usePanelBodyContext();

	const [randomColor, setRandomColor] = useState(randomSolidColor(imageOverlayColor));
	useEffect(() => {
		setRandomColor(randomSolidColor(imageOverlayColor));
	}, [imageOverlayColor]);

	const titleIndex = thumbIndex !== "" ? (thumbIndex + 1).toString().padStart(2, "0") : "";

	// Image Overlay Style.
	const imageOverlayStyle = " overlay-" + imageOverlayColor;

	const contentVPosition = ["top", "background"].includes(imagePosition) ? "" : `content-v-${contentPosition}`;

	const taxonomiesType = {
		category: category_list,
		post_tag: tag_list,
		post_format: format_list,
		[catTabCategoryType]: all_term_list,
	};

	const imageShowHide = (layout) => {
		switch (layout) {
			case "sp-smart-post-list-two-layout-eight":
			case "sp-smart-post-list-two-layout-seven":
			case "sp-smart-post-list-two-layout-six":
			case "sp-smart-post-list-two-layout-five":
			case "sp-smart-post-list-three-layout-two":
			case "sp-smart-post-list-three-layout-four":
			case "sp-smart-post-list-three-layout-five":
			case "sp-smart-post-list-three-layout-six":
			case "thumbnail-slider-two-layout-one":
			case "thumbnail-slider-two-layout-two":
				return false;
		}
		return true;
	};

	const contentShowHide = (layout) => {
		if (thumbItem) {
			return false;
		}
		switch (layout) {
			case "sp-smart-post-list-two-layout-two":
			case "sp-smart-post-list-two-layout-four":
			case "sp-smart-post-list-two-layout-five":
			case "sp-smart-post-list-two-layout-six":
			case "sp-smart-post-list-two-layout-eight":
			case "sp-smart-post-list-three-layout-one":
			case "sp-smart-post-list-three-layout-two":
			case "sp-smart-post-list-three-layout-three":
			case "sp-smart-post-list-three-layout-four":
			case "sp-smart-post-list-three-layout-five":
			case "sp-smart-post-list-three-layout-six":
				return false;
		}
		return true;
	};

	const imageData = useMemo(
		() => ({
			attachment_metadata,
			content,
			attachment_srcset,
			image_title,
			image_alt, //data ends,
			generalLinkOpen, // attributes starts
			imageSrcset,
			imageSize,
			imageReplaceWith,
			imageFallbackReplace,
			toggleCustomFallbackBg,
			imageReplaceWithImage,
			imageReplaceWithVideo,
			postTitle: data.title,
			attachment_url,
			post_thumbnail_url,
			post_image_gallery,
			showImageGallery,
			imageGallerySource,
			showImageGalleryNavArrow,
			showImageGalleryNavArrowHover,
			imageGalleryNavArrowStyle,
			imageGalleryNavArrowSize,
			post_video_meta_data,
			showFeatureVideo,
		}),
		[
			generalLinkOpen,
			imageSrcset,
			imageSize,
			imageReplaceWith,
			imageFallbackReplace,
			toggleCustomFallbackBg,
			imageReplaceWithImage,
			imageReplaceWithVideo,
			imageGallerySource,
			imageGalleryNavArrowStyle,
			showImageGallery,
			showImageGalleryNavArrow,
			imageGalleryNavArrowStyle,
			showImageGalleryNavArrowHover,
			imageGalleryNavArrowSize,
			showFeatureVideo,
		]
	);
	const titleAttr = useMemo(
		() => ({
			TitleTag,
			titleLength,
			generalLinkOpen,
			postListLayout,
			titleGlobalTypography,
			postBadgesGlobalTypography,
			titleEffect,
			postBadgesShow,
			postBadgesPosition,
			blockName,
			align,
		}),
		[
			TitleTag,
			titleLength,
			generalLinkOpen,
			postListLayout,
			titleGlobalTypography,
			postBadgesGlobalTypography,
			titleEffect,
			postBadgesShow,
			postBadgesPosition,
			blockName,
			align,
		]
	);
	const metaDataAttr = useMemo(
		() => ({
			author_url,
			author_avatar_url,
			author,
			metaAuthorStyle,
			metaUserIcon,
			metaAuthorShow,
			data,
			metaDateFormat,
			metaDateCustomDateFormat,
			metaDateShow,
			contentOrientation,
			comment_count,
			view_count,
			metaReadingTimePostfix,
			metaPerMin,
			metaSeparator,
			categoryList: taxonomiesType[catTabCategoryType],
			catTabCategoryPosition,
			socialShareEnableSocial,
			socialIconDisplayType,
			socialShareIconPosition,
			socialSharingMedia,
			link,
			socialShareDisplayOnHover,
			metaDataAllContentArray,
			metaDisplayType,
			socialShareIconType,
			catTabCategoryType,
			metaGlobalTypography,
		}),
		[
			// author_url,
			// author_avatar_url,
			// author,
			metaAuthorStyle,
			metaUserIcon,
			metaAuthorShow,
			data,
			metaDateFormat,
			metaDateCustomDateFormat,
			metaDateShow,
			contentOrientation,
			// comment_count,
			metaCommentCounter,
			// view_count,
			metaViewCount,
			// metaLike,
			metaReadingTimePostfix,
			metaPerMin,
			metaReadingTime,
			// metaDataArray,
			metaSeparator,
			taxonomiesType[catTabCategoryType],
			catTabCategoryPosition,
			socialShareEnableSocial,
			socialIconDisplayType,
			socialShareIconPosition,
			socialSharingMedia,
			// link,
			socialShareDisplayOnHover,
			metaDataAllContentArray,
			metaDisplayType,
			socialShareIconType,
			catTabCategoryType,
		]
	);

	const readMoreShowHide = (layout) => {
		if (thumbItem) {
			return false;
		}
		switch (layout) {
			case "sp-smart-post-list-two-layout-two":
			case "sp-smart-post-list-two-layout-four":
			case "sp-smart-post-list-two-layout-five":
			case "sp-smart-post-list-two-layout-six":
			case "sp-smart-post-list-two-layout-seven":
			case "sp-smart-post-list-two-layout-eight":
			case "sp-smart-post-list-three-layout-one":
			case "sp-smart-post-list-three-layout-two":
			case "sp-smart-post-list-three-layout-three":
			case "sp-smart-post-list-three-layout-four":
			case "sp-smart-post-list-three-layout-five":
			case "sp-smart-post-list-three-layout-six":
				return false;
		}
		return true;
	};

	const catShowHide = (layout) => {
		switch (layout) {
			case "sp-smart-post-list-two-layout-five":
			case "sp-smart-post-list-two-layout-six":
			case "sp-smart-post-list-two-layout-seven":
			case "sp-smart-post-list-two-layout-eight":
			case "sp-smart-post-list-three-layout-two":
			case "sp-smart-post-list-three-layout-four":
			case "sp-smart-post-list-three-layout-five":
			case "sp-smart-post-list-three-layout-six":
			case "thumbnail-slider-two-layout-one":
			case "thumbnail-slider-two-layout-two":
			case "grid-six-small-items":
				return false;
		}
		return true;
	};

	const metaShowHide = (layout) => {
		if (thumbItem) {
			return false;
		}
		// switch ( layout ) {
		// 	case 'sp-smart-post-list-three-layout-two':
		// 	case 'sp-smart-post-list-three-layout-four':
		// 		return false;
		// }
		return true;
	};

	const taxonomyCondition =
		(!largeItem || index === largeItemIndex) &&
		catTabCategoryEnable &&
		((!catTabCategoryPosition && !inArray(["orientation_three", "orientation_four"], contentOrientation)) ||
			catTabCategoryPosition === "above-title");

	const contentPartObject = {
		taxonomy: (
			<>
				{/* Category part component */}
				{catShowHide(layout) && taxonomyCondition && (
					<Category
						categoryList={taxonomiesType[catTabCategoryType]}
						attributes={{
							socialShareEnableSocial,
							socialIconDisplayType,
							socialShareIconPosition,
							socialSharingMedia,
							link,
							socialShareDisplayOnHover,
							socialShareIconType,
							catTabCategoryType,
							catTabCategoryGlobalTypography,
						}}
						socialOnClick={togglePanelBody}
						onClick={togglePanelBody}
					/>
				)}
			</>
		),
		title: (
			<>
				{/* Title part component */}
				{titleShow && (
					<>
						<Title
							title={data?.title}
							thumbIndex={titleIndex}
							progress={layout === "thumbnail-slider-two-layout-two"}
							link={link}
							attributes={titleAttr}
							onClick={togglePanelBody}
							badges={data?.badges_list}
						/>
					</>
				)}
			</>
		),
		metadata: (
			<>
				{enableMetaData && metaShowHide(layout) && metaDataAllContentArray?.some((item) => item.show) && (
					<MetadataRenderer
						attributes={metaDataAttr}
						socialOnClick={togglePanelBody}
						onClick={togglePanelBody}
					/>
				)}
				{/* MetaData Part End */}
			</>
		),
		excerpt: (
			<>
				{/* Excerpt Part component */}
				{excerptShow && contentShowHide(layout) && (!largeItem || (largeItem && index === largeItemIndex)) && (
					<Excerpt
						excerpt={
							seoMetaShow && seo_meta_excerpt && seo_meta_excerpt !== "" ? seo_meta_excerpt : excerpt
						}
						attributes={{
							ellipsisPointsEndingExcerpt,
							excerptType,
							excerptLength,
							postListLayout,
							excerptGlobalTypography,
						}}
						onClick={togglePanelBody}
					/>
				)}
			</>
		),
		// starRating: (
		// 	<>
		// 		{ /* Product price and add to cart start */ }
		// 		{ 'product' === postType && (
		// 			<>
		// 				{ showRating && data?.review_count > 0 && (
		// 					<RatingsRenderer
		// 						averageRating={ data?.average_rating }
		// 						reviewCount={ data?.review_count }
		// 						attributes={ {
		// 							showReviewCount,
		// 							reviewCounterColor,
		// 							emptyStarColor,
		// 							starColor,
		// 						} }
		// 						onClick={ ( e ) =>
		// 							togglePanelBody( e, 'rating' )
		// 						}
		// 					/>
		// 				) }
		// 			</>
		// 		) }
		// 	</>
		// ),
		// price: (
		// 	<>
		// 		{ /* Product price and add to cart start */ }
		// 		{ 'product' === postType && showPrice && (
		// 			<div
		// 				className="sp-smart-post-product-price"
		// 				dangerouslySetInnerHTML={ {
		// 					__html: data?.product_price,
		// 				} }
		// 				onClick={ ( e ) => togglePanelBody( e, 'price' ) }
		// 			/>
		// 		) }
		// 	</>
		// ),
		// addToCart: (
		// 	<>
		// 		{ /* Product price and add to cart start */ }
		// 		{ 'product' === postType && showAddToCart && (
		// 			<div
		// 				className="sp-smart-post-product-add-to-cart"
		// 				dangerouslySetInnerHTML={ {
		// 					__html: data?.add_to_cart,
		// 				} }
		// 				onClick={ ( e ) => togglePanelBody( e, 'addToCart' ) }
		// 			/>
		// 		) }
		// 	</>
		// ),
		readMoreButton: (
			<>
				{/* read more component */}
				{showReadMoreButton &&
					readMoreShowHide(layout) &&
					(!largeItem || (largeItem && index === largeItemIndex)) && (
						<ReadMoreButton
							label={readMoreButtonLabel}
							link={link}
							onClick={togglePanelBody}
							attributes={{
								readMoreIconStyle,
								generalLinkOpen,
								readMoreButtonType,
								readMoreIocVisibility,
								readMoreButtonGlobalTypography,
							}}
						/>
					)}
			</>
		),
		socialShare: (
			<>
				{!thumbItem && socialIconDisplayType !== "popup-share" ? (
					<>
						{socialShareEnableSocial && "product" !== postType && (
							<SocialShare
								attributes={{
									socialSharingMedia,
									socialShareIconType,
								}}
								link={link}
								onClick={togglePanelBody}
							/>
						)}
					</>
				) : (
					<>
						{!thumbItem &&
							socialShareEnableSocial &&
							socialIconDisplayType === "popup-share" &&
							[""].includes(socialShareIconPosition) && (
								<div
									className={`sp-social-share-popup${
										socialShareDisplayOnHover ? " on-hover" : ""
									} ${socialShareIconPosition}`}
								>
									<span className="sp-social-share-popup-icon popup-share-icon">
										<SharePopupIcon />
									</span>
									<span className="sp-social-share-popup-icon sp-social-popup-icon-list">
										<SocialShare
											attributes={{
												socialSharingMedia,
												socialShareIconType,
											}}
											link={link}
											onClick={togglePanelBody}
										/>
									</span>
								</div>
							)}
					</>
				)}
			</>
		),
	};
	const bgImageOverlayType = imagePosition === "background" ? ` overlay-type-${imageOverlayType}` : "";

	if (data?.type === "ads") {
		return (
			<InnerHTML
				className={`sp-smart-post-card ${layout} img-position-${imagePosition} ${contentOrientation}`}
				html={data?.content}
			/>
		);
	}

	const PostListLayoutFive = ["list-one-layout-five", "list-one-layout-six"].includes(postListLayout)
		? `div`
		: Fragment;

	const postListClass = () => {
		return ["list-one-layout-five", "list-one-layout-six"].includes(postListLayout)
			? { className: "sp-smart-post-list-one-layout-bottom" }
			: {};
	};

	const handleImageClick = (e) => {
		e.stopPropagation(); // Prevent triggering the outside click
		onSelect();
	};

	return (
		<div
			className={`sp-smart-post-card content-${contentHorizontalPosition}${bgImageOverlayType}`}
			style={
				"ticker" === carouselStyle && tickerWidth
					? {
							width: `${tickerWidth}px`,
						}
					: {}
			}
			// onClick={ ( e ) => togglePanelBody( e, 'content_area' ) }
		>
			{["list-one-layout-five", "list-one-layout-six"].includes(postListLayout) && (
				<div className="sp-smart-post-list-one-layout-top">
					{contentPartObject.title}
					{"list-one-layout-six" !== postListLayout && contentPartObject.metadata}
				</div>
			)}
			{/* Featured image part component */}
			<PostListLayoutFive {...postListClass()}>
				{imageFeaturedImg && imageShowHide(layout) && (
					<div
						className={`sp-smart-post-card-image img-${imageHoverEffect} sp-component-simple-img ${showFeatureVideo ? "sp-show-video" : ""}`}
						// onClick={ ( e ) => togglePanelBody( e 'image' ) }
						data-post_id={data.post_id}
						onClick={handleImageClick}
					>
						{catTabCategoryEnable &&
							((!inArray(["above-title", "beside-other-meta"], catTabCategoryPosition) &&
								inArray(["orientation_three", "orientation_four"], contentOrientation)) ||
								!inArray(["above-title", "beside-other-meta", ""], catTabCategoryPosition)) && (
								<Category
									categoryList={taxonomiesType[catTabCategoryType]}
									attributes={{
										catTabCategoryType,
									}}
									onClick={togglePanelBody}
								/>
							)}
						{/* { (postType === 'product' || multiplePostType.some( item => item.value === 'product' ) ) && data.on_sale && ( */}
						{postType === "product" && data.on_sale && <div className="sp-smart-post-sale-text">Sale!</div>}
						<FeaturedImage data={imageData} link={link} onClick={togglePanelBody} />
						{isSelected && (
							<>
								<button
									className="sp-smart-style-image-sample-components sp-panel-data"
									onClick={togglePanelBody}
									data-component="image"
								>
									<span className="sp-style-image-icon">
										<EditImageIcon />
									</span>
									<span className="sp-style-image-text">Style Image</span>
								</button>
							</>
						)}
						{["orientation_two"].includes(contentOrientation) &&
							metaDataArray.some((meta) => meta.value === "date") &&
							metaDataAllContentArray.some((item) => item.value === "date" && item.show) && (
								<>
									{metaDateShow && enableMetaData && (
										<Date
											date={data?.date}
											postDate={data?.post_date}
											attributes={{
												metaDateFormat,
												contentOrientation,
											}}
											onClick={togglePanelBody}
										/>
									)}
								</>
							)}
						{"no-overlay" !== imageOverlayColor && (
							<div
								className={`image-overlay${imageOverlayStyle} pointer-none`}
								style={{ background: randomColor }}
							></div>
						)}
						{/** Social Share popup */}
						{socialShareEnableSocial &&
							socialIconDisplayType === "popup-share" &&
							["over-thumbnail"].includes(socialShareIconPosition) && (
								<span
									className={`sp-social-share-popup${
										socialShareDisplayOnHover ? " on-hover" : ""
									} ${socialShareIconPosition}`}
								>
									<span className="sp-social-share-popup-icon popup-share-icon">
										<SharePopupIcon />
									</span>
									<span className="sp-social-share-popup-icon sp-social-popup-icon-list">
										<SocialShare
											attributes={{
												socialSharingMedia,
												socialShareIconType,
											}}
											link={link}
											onClick={togglePanelBody}
										/>
									</span>
								</span>
							)}{" "}
						{/** Social Share popup end */}
					</div>
				)}
				{/* content area  */}
				<div className={`sp-smart-post-template-one-content ${contentVPosition}`}>
					<div className={`sp-smart-post-card-content`}>
						{/** Content Area Start */}
						{contentPartArray?.map((item, index) => {
							if (
								("title" === item.value &&
									["list-one-layout-five", "list-one-layout-six"].includes(postListLayout)) ||
								("metadata" === item.value && ["list-one-layout-five"].includes(postListLayout))
							) {
								return null;
							}
							return <Fragment key={index}>{contentPartObject[item.value] || null}</Fragment>;
						})}
						{/** Content Area End */}
					</div>
				</div>
			</PostListLayoutFive>
		</div>
	);
};

export default TemplateOne;
