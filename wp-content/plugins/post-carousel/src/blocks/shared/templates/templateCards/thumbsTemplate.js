import { Fragment, useEffect, useMemo, useState } from "@wordpress/element";
import { randomSolidColor } from "../../helpFn";
import { Category, FeaturedImage, Title } from "../templates-parts/templates-parts";

const ThumbsTemplate = ({
	data,
	layout = "default",
	attributes,
	thumbIndex = "",
	contentArray = ["image", "title", "category"],
}) => {
	const {
		attachment_metadata,
		content,
		category_list,
		tag_list,
		format_list,
		attachment_url,
		attachment_srcset,
		link,
		image_alt,
		image_title,
	} = data;

	const {
		titleLength,
		titleHTMLTag: TitleTag,
		imageSize,
		generalLinkOpen,
		imageReplaceWith,
		imageReplaceWithImage,
		imageReplaceWithVideo,
		toggleCustomFallbackBg,
		imageFallbackReplace,
		imageOverlayColor,
		imageLazyLoad,
		imageSrcset,
		catTabCategoryType,
		postListLayout,
	} = attributes;

	const [randomColor, setRandomColor] = useState(randomSolidColor(imageOverlayColor));

	const titleIndex = thumbIndex !== "" ? (thumbIndex + 1).toString().padStart(2, "0") : "";

	useEffect(() => {
		setRandomColor(randomSolidColor(imageOverlayColor));
	}, [imageOverlayColor]);

	// Image Overlay Style.
	let imageOverlayStyle = " overlay-" + imageOverlayColor;

	const taxonomiesType = {
		category: category_list,
		post_tag: tag_list,
		post_format: format_list,
	};
	const imageData = useMemo(
		() => ({
			attachment_metadata,
			content,
			attachment_url,
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
			postTitle: data?.title,
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
		]
	);
	const titleAttr = useMemo(
		() => ({
			TitleTag,
			titleLength,
			generalLinkOpen,
			postListLayout,
		}),
		[TitleTag, titleLength, generalLinkOpen, postListLayout]
	);
	const progressBar = layout === "thumbnail-slider-two-layout-two";

	const contentPartObject = {
		taxonomy: (
			<>
				<Category
					categoryList={taxonomiesType[catTabCategoryType]}
					attributes={{
						// socialShareEnableSocial,
						// socialIconDisplayType,
						// socialShareIconPosition,
						// socialSharingMedia,
						// link,
						// socialOnClick: togglePanelBody,
						// socialShareDisplayOnHover,
						catTabCategoryType,
					}}
				/>
			</>
		),
		title: (
			<>
				{/* Title part component */}
				<Title
					title={data?.title}
					thumbIndex={titleIndex}
					progress={progressBar}
					link={link}
					attributes={titleAttr}
				/>
			</>
		),
	};

	return (
		<div className={`sp-smart-post-card sp-smart-post-thumbs-template`}>
			{/* Featured image part component */}
			<>
				{contentArray.includes("image") && (
					<div className={`sp-smart-post-card-image`}>
						<FeaturedImage data={imageData} link={link} lazy={true} />
						{"no-overlay" !== imageOverlayColor && (
							<div
								className={`image-overlay${imageOverlayStyle} pointer-none`}
								style={{ background: randomColor }}
							></div>
						)}
					</div>
				)}
				{/* content area  */}
				<div className={`sp-smart-post-template-one-content`}>
					<div className={`sp-smart-post-card-content`}>
						{/** Content Area Start */}
						{contentArray?.map((item, index) => {
							return <Fragment key={index}>{contentPartObject[item] || null}</Fragment>;
						})}
						{/** Content Area End */}
					</div>
				</div>
			</>
		</div>
	);
};

export default ThumbsTemplate;
