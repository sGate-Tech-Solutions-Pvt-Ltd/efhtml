import { Fragment, memo, useEffect, useRef, useState } from "@wordpress/element";
import { stringTrim } from "../../helpFn";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

import {
	BasicOutline,
	CalenderIcon,
	CategoryIcon,
	Circle,
	EyeIcon,
	Female,
	LoveIcon,
	LoveIconFull,
	MetaCommentCounterIcon,
	MetaReadingTimeIcon,
	Minimal,
	Outline,
	Rounded,
	SharePopupIcon,
	UserAuthor,
	UserSolid,
} from "../../../../icons/icons";
import { countWordAndCharacter, getMediaUrl, humanReadableTimeAgo, isEditor } from "../../../../controls/controls";
import classNames from "classnames";
import { usePanelBodyContext } from "../../../../context";
import { arrowIcons } from "../../../../controls/constants";

// Feature image render component.
export const FeaturedImage = memo(({ data, link, onClick }) => {
	const {
		attachment_metadata,
		content,
		attachment_srcset,
		image_alt,
		generalLinkOpen,
		imageSrcset,
		lazy = false,
		postTitle,
		attachment_url,
		post_image_gallery,
		post_video_meta_data,
		showImageGallery,
		imageGallerySource,
		showImageGalleryNavArrow,
		showImageGalleryNavArrowHover,
		imageGalleryNavArrowStyle,
		showFeatureVideo,
	} = data;

	const { mediaUrl, mediaFromContent, sourceImages } = getMediaUrl(
		{ attachment_metadata, content, attachment_url },
		data
	);

	const type = mediaFromContent?.type;
	const imgSrc = mediaFromContent?.url;

	const imageSrcsetAttr = imageSrcset ? attachment_srcset : "";

	const editPage = isEditor();

	const RenderFeatureImg = memo(({ src, alt = "" }) => {
		return (
			<>
				<img
					// onClick={ onClick || null }
					src={src}
					alt={alt}
					srcSet={imageSrcsetAttr || null}
					{...(lazy ? "lazy" : "")}
				/>
			</>
		);
	});

	return (
		<>
			<a
				{...(generalLinkOpen === "single-popup" || generalLinkOpen === "multi-popup" || editPage
					? { onClick }
					: {})}
				href={
					!editPage && (generalLinkOpen === "current-tab" || generalLinkOpen === "new-tab") ? link : undefined
				}
				rel="noreferrer"
				target={generalLinkOpen === "new-tab" ? "_blank" : "_self"}
				data-component="general"
				className={`sp-smart-post-featured-image-wrapper sp-panel-data`}
				rel="noopener noreferrer"
			>
				<>
					{attachment_metadata && (
						<RenderFeatureImg src={mediaUrl} alt={image_alt ? image_alt : postTitle} />
					)}
					{!attachment_metadata && !["img", "video", "audio"].includes(type) && (
						<RenderFeatureImg
							src={sp_smart_post_block_localize.placeholderImg + "public/assets/img/placeholder.png"}
							alt={image_alt ? image_alt : postTitle}
						/>
					)}
					{!attachment_metadata && type === "img" && (
						<RenderFeatureImg src={imgSrc} alt={image_alt ? image_alt : postTitle} />
					)}
					{!attachment_metadata && type === "video" && (
						<video controls>
							<source src={imgSrc} type="video/mp4" />
						</video>
					)}
					{!attachment_metadata && type === "audio" && (
						<audio controls>
							<source src={imgSrc} type="audio/mpeg" />
						</audio>
					)}
				</>
			</a>
		</>
	);
});

// Category render component.
export const Category = memo(({ categoryList, attributes, catTabCategoryPosition = "", onClick, socialOnClick }) => {
	const {
		metaDataClass,
		metaIconClass,
		iconHeightWidthClass,
		socialShareEnableSocial,
		socialIconDisplayType,
		socialShareIconPosition,
		socialSharingMedia,
		socialShareIconContainerClass,
		socialShareAllIconClass,
		link,
		socialShareDisplayOnHover,
		catTabCategoryType,
		socialShareIconType,
		catTabCategoryGlobalTypography,
	} = attributes;

	const categoryListRef = useRef(null);

	useEffect(() => {
		if (categoryListRef.current) {
			const taxonomyItems = categoryListRef.current.querySelectorAll("li a");
			taxonomyItems.forEach((item) => {
				const handleClick = (e) => {
					e.preventDefault(); // this stops the link navigation
				};

				item.addEventListener("click", handleClick);

				// cleanup on unmount
				return () => {
					item.removeEventListener("click", handleClick);
				};
			});
		}
	}, []);

	return (
		categoryList &&
		(catTabCategoryPosition !== "beside-other-meta" ? (
			<div
				className={`${
					catTabCategoryGlobalTypography?.class ? catTabCategoryGlobalTypography?.class : ""
				} sp-smart-post-category`}
			>
				<span
					className={`sp-taxonomy-type-${catTabCategoryType} sp-component-simple sp-panel-data`}
					dangerouslySetInnerHTML={{ __html: categoryList }}
					onClick={onClick || null}
					ref={categoryListRef}
					data-component="category"
				/>
				{socialShareEnableSocial &&
					socialIconDisplayType === "popup-share" &&
					["beside-taxonomy", "space-between-taxonomy"].includes(socialShareIconPosition) && (
						<span
							className={`sp-social-share-popup${
								socialShareDisplayOnHover ? " on-hover" : ""
							} ${socialShareIconPosition}`}
						>
							<span
								className="sp-social-share-popup-icon popup-share-icon sp-component-simple sp-panel-data"
								onClick={(e) => socialOnClick(e, "social_share")}
								data-component="social_share"
							>
								<SharePopupIcon />
							</span>
							<span className="sp-social-share-popup-icon sp-social-popup-icon-list sp-panel-data">
								<SocialShare
									attributes={{
										socialSharingMedia,
										socialShareIconContainerClass,
										socialShareAllIconClass,
										socialShareIconType,
									}}
									link={link}
									onClick={(e) => socialOnClick(e, "social_share")}
								/>
							</span>
						</span>
					)}
			</div>
		) : (
			<>
				<span className={`sp-smart-post-meta sp-component-simple sp-metadata-taxonomy`} ref={categoryListRef}>
					<span
						className={`sp-metadata-taxonomy-icon sp-smart-post-meta-icon ${iconHeightWidthClass} ${metaIconClass}`}
					>
						<CategoryIcon />
					</span>
					<span
						className={`${metaDataClass} sp-smart-post-meta-text`}
						dangerouslySetInnerHTML={{ __html: categoryList }}
					/>
				</span>
				{socialShareEnableSocial &&
					socialIconDisplayType === "popup-share" &&
					["beside-taxonomy", "space-between-taxonomy"].includes(socialShareIconPosition) && (
						<span
							className={`sp-social-share-popup${
								socialShareDisplayOnHover ? " on-hover" : ""
							} ${socialShareIconPosition}`}
						>
							<span
								className="sp-social-share-popup-icon popup-share-icon sp-component-simple sp-panel-data"
								onClick={(e) => socialOnClick(e, "social_share")}
								data-component="social_share"
							>
								<SharePopupIcon />
							</span>
							<span className="sp-social-share-popup-icon sp-social-popup-icon-list">
								<SocialShare
									attributes={{
										socialSharingMedia,
										socialShareIconContainerClass,
										socialShareAllIconClass,
										socialShareIconType,
									}}
									link={link}
									onClick={(e) => socialOnClick(e, "social_share")}
								/>
							</span>
						</span>
					)}
			</>
		))
	);
});

// Title render component.
export const Title = memo(({ title, link, attributes, onClick, thumbIndex, progress = false, badges }) => {
	const {
		TitleTag,
		titleLength,
		generalLinkOpen,
		postListLayout,
		titleGlobalTypography,
		postBadgesGlobalTypography = {},
		titleEffect = "",
		postBadgesShow,
		postBadgesPosition,
		blockName,
		align,
	} = attributes;
	const titleRef = useRef(null);

	useEffect(() => {
		const titleContainer = titleRef.current;
		if (
			![
				"post-carousel-two",
				"post-grid-two",
				"post-grid-three",
				"post-grid-four",
				"post-grid-five",
				"post-grid-six",
				"post-slider",
				"post-slider-two",
				"post-thumbnail-slider",
				"thumbnail-slider-two",
				"post-timeline-two",
			].includes(blockName)
		) {
			return;
		}

		if (!titleContainer || titleEffect === "none") {
			return;
		}

		//  Only select the inner title text span
		const textElement = titleContainer.querySelector(".sp-smart-post-title-text[data-text='true']");
		if (!textElement) {
			return;
		}

		const wrapLines = () => {
			if (textElement.dataset.processed === "true") {
				return;
			}

			// const rawText = titleLength ? stringTrim(title, titleLength) : title;
			const rawText = title;
			const temp = document.createElement("div");
			const style = window.getComputedStyle(textElement);

			Object.assign(temp.style, {
				position: "absolute",
				visibility: "hidden",
				whiteSpace: "nowrap",
				fontSize: style.fontSize,
				fontFamily: style.fontFamily,
				fontWeight: style.fontWeight,
			});

			document.body.appendChild(temp);

			const parentWidth = textElement?.parentElement;
			const containerWidth = parentWidth?.parentElement?.offsetWidth || 0;
			const words = rawText.split(" ");
			const lines = [];
			let currentLine = "";

			for (const word of words) {
				const testLine = currentLine ? `${currentLine} ${word}` : word;
				temp.textContent = testLine;

				if (temp.offsetWidth > containerWidth && currentLine) {
					lines.push(currentLine);
					currentLine = word;
				} else {
					currentLine = testLine;
				}
			}
			if (currentLine) {
				lines.push(currentLine);
			}
			document.body.removeChild(temp);

			// Clear only the text content area, not badges
			textElement.innerHTML = "";

			lines.forEach((line, index) => {
				const span = document.createElement("span");
				span.className = "line";
				span.textContent = line;
				textElement.appendChild(span);
				if (index < lines.length - 1) {
					textElement.appendChild(document.createElement("br"));
				}
			});

			textElement.dataset.processed = "true";
		};

		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				textElement.dataset.processed = "false";
				wrapLines();
			}, 250);
		};

		const parentElement = titleContainer.parentElement;
		if (!parentElement) {
			return;
		}

		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(parentElement);

		window.addEventListener("resize", handleResize);

		wrapLines();

		return () => {
			window.removeEventListener("resize", handleResize);
			resizeObserver.disconnect();
		};
	}, [title, blockName, titleEffect, align, titleLength]);

	const page = isEditor();
	const badgesMarkup =
		(postBadgesShow &&
			badges &&
			badges.length > 0 &&
			`<ul class="sp-title-badges-list sp-badges-${postBadgesPosition}">
			${badges
				.map(
					(badge) =>
						`<li class="sp-title-badge-item ${postBadgesGlobalTypography?.class ? postBadgesGlobalTypography.class : ""}">${badge?.name}</li>`
				)
				.join("")}
		</ul>`) ||
		"";

	const titleWrapperClasses = classNames(
		"sp-smart-post-title-wrapper",
		titleEffect !== "none" ? `sp-title-effect-${titleEffect}` : "",
		"sp-panel-data"
	);

	return (
		<a
			{...(generalLinkOpen === "single-popup" || generalLinkOpen === "multi-popup" || page ? { onClick } : {})}
			href={!page && (generalLinkOpen === "current-tab" || generalLinkOpen === "new-tab") ? link : undefined}
			target={generalLinkOpen === "new-tab" ? "_blank" : "_self"}
			className={titleWrapperClasses}
			data-component="title"
			rel="noopener noreferrer"
			// onClick={ togglePanelBody }
		>
			{["sp-smart-post-list-three-layout-two", "sp-smart-post-list-three-layout-four"].includes(
				postListLayout
			) && <i className={`sp-icon-right-dir sp-smart-post-title-icon`}></i>}

			<TitleTag
				ref={titleRef}
				className={`sp-smart-post-title sp-component-simple ${
					titleGlobalTypography?.class ? titleGlobalTypography.class : ""
				}`}
				data-component={"title"}
			>
				<span dangerouslySetInnerHTML={{ __html: postBadgesPosition === "before-title" ? badgesMarkup : "" }} />
				<span
					className="sp-smart-post-title-text"
					data-text="true"
					dangerouslySetInnerHTML={{
						__html:`${thumbIndex ? `<span class="sp-thumb-item-page-id">${thumbIndex}</span>` : ""}${title}`,
							titleLength,
					}}
				/>
				<span dangerouslySetInnerHTML={{ __html: postBadgesPosition === "after-title" ? badgesMarkup : "" }} />
			</TitleTag>

			{progress ? <span className="sp-thumbnail-progress-bar"></span> : ""}
		</a>
	);
});

const ExcerptReadMore = ({ link, generalLinkOpen, onClick }) => {
	const page = isEditor();

	return (
		<a
			{...(generalLinkOpen === "single-popup" || generalLinkOpen === "multi-popup" || page ? { onClick } : {})}
			href={!page && (generalLinkOpen === "current-tab" || generalLinkOpen === "new-tab") ? link : undefined}
			target={generalLinkOpen === "new-tab" ? "_blank" : "_self"}
			className="sp-smart-post-excerpt-read-more sp-component-simple"
			rel="noopener noreferrer"
		>
			Read More
		</a>
	);
};

// Excerpt render component.
export const Excerpt = memo(({ excerpt, attributes, onClick, link, generalLinkOpen, btnClick }) => {
	const { ellipsisPointsEndingExcerpt, excerptType, excerptLength, postListLayout, excerptGlobalTypography } =
		attributes;

	const endingEllipsis =
		"sp-smart-post-list-two-layout-seven" === postListLayout ? ". " : ellipsisPointsEndingExcerpt;
	const totalExcerptLength = excerptLength.unit === "words" ? excerpt.split(" ").length : excerpt.length;

	excerpt =
		"limited" === excerptType
			? stringTrim(excerpt, excerptLength) + (totalExcerptLength > excerptLength.value ? endingEllipsis : "")
			: excerpt;

	const editPage = isEditor();

	return (
		<div
			className={`sp-smart-post-excerpt-wrapper sp-panel-data`}
			onClick={(editPage && onClick) || null}
			data-component="excerpt"
		>
			<p
				className={`sp-smart-post-excerpt sp-component-simple ${
					excerptGlobalTypography?.class ? excerptGlobalTypography.class : ""
				}`}
			>
				<span dangerouslySetInnerHTML={{ __html: excerpt }} />
				{"sp-smart-post-list-two-layout-seven" === postListLayout && (
					<ExcerptReadMore link={link} generalLinkOpen={generalLinkOpen} onClick={btnClick} />
				)}
			</p>
		</div>
	);
});

// Author render component.
export const Author = memo(({ url, name, avatar, attributes }) => {
	const { metaAuthorStyle, metaUserIcon, userAnchorStyles } = attributes;
	// Custom user icon on Meta
	const userIcon = {
		outline: <Outline />,
		"basic-outline": <BasicOutline />,
		"user-solid": <UserSolid />,
		rounded: <Rounded />,
		female: <Female />,
		author: <UserAuthor />,
		circle: <Circle />,
		minimal: <Minimal />,
	};

	return (
		<>
			{name ? (
				<span className={`sp-smart-post-meta sp-component-simple sp-smart-post-author`}>
					<a href={url} className={userAnchorStyles}>
						{/* If author showcase Name with Gravatar */}
						{(metaAuthorStyle === "show_gravatar" || metaAuthorStyle === "name_with_gravatar") && (
							<img src={avatar} alt="user" className={`sp-smart-post-meta-icon`} />
						)}

						{/* If author showcase Name with Icon */}
						{metaAuthorStyle === "name_with_icon" && (
							<span className={`sp-smart-post-meta-icon`}>{userIcon[metaUserIcon]}</span>
						)}
						{metaAuthorStyle !== "show_gravatar" && (
							<span className={"sp-smart-post-meta-text"}>{name}</span>
						)}
					</a>
				</span>
			) : (
				""
			)}
		</>
	);
});

// Date render component.
export const Date = memo(({ date, attributes, postDate, onClick = () => {} }) => {
	const { metaDateFormat, contentOrientation } = attributes;
	const newDate = date;

	return (
		<div className="sp-smart-post-meta sp-component-simple sp-smart-post-date">
			{"orientation_two" !== contentOrientation && (
				<div
					className={`sp-smart-post-meta-icon`}
					// onClick={ onClick || null }
				>
					<CalenderIcon />
				</div>
			)}
			{"orientation_two" === contentOrientation && (
				<div
					className="sp-smart-post-date-orientation-two sp-component-simple sp-panel-data"
					onClick={onClick || null}
					data-component="meta_data"
				>
					<span className="sp-smart-post-day">{postDate?.day}</span>
					<span className="sp-smart-post-month-year">
						{postDate?.month}
						<br />
						{postDate?.year}
					</span>
				</div>
			)}
			{"orientation_two" !== contentOrientation && (
				<>
					<span className={"sp-smart-post-meta-text"}>
						{metaDateFormat === "default" && postDate?.default + " "}
						{metaDateFormat === "time_ago" && humanReadableTimeAgo(new window.Date(newDate)) + " "}
						{metaDateFormat === "F j, Y" && postDate?.default + " "}
						{metaDateFormat === "M j, Y" && postDate?.default + " "}
						{metaDateFormat === "custom" && postDate?.default + " "}
					</span>
				</>
			)}
		</div>
	);
});

// Comment Counter
export const CommentCounter = memo(({ totalComment, attributes, labelType = "icon" }) => {
	const { metaIconClass, metaDataClass } = attributes;

	return (
		<span className={`sp-smart-post-meta sp-component-simple sp-post-show-comment`}>
			{labelType === "icon" && (
				<span className={`sp-smart-post-meta-icon`}>
					<MetaCommentCounterIcon />
				</span>
			)}
			<span className={`sp-smart-post-meta-text`}>{totalComment.all}</span>
			{labelType === "text" && <span className={`sp-smart-post-meta-icon`}> Comment</span>}
		</span>
	);
});

// View Count render component.
export const ViewCount = memo(({ data, attributes }) => {
	const { metaIconClass, metaDataClass } = attributes;

	return (
		<>
			<span className="sp-smart-post-meta sp-component-simple sp-smart-post-view">
				<span className={`sp-smart-post-meta-icon`}>
					<EyeIcon />
				</span>
				<span className={`sp-smart-post-meta-text`}>{data ? data : 0}</span>
			</span>
		</>
	);
});

// Meta data separator function.
export const MetaSeparatorData = memo(({ attributes }) => {
	const { metaSeparator } = attributes;

	const separator = {
		"normal-space": <span>&nbsp;</span>,
		"full-stop": <span>&#46;</span>,
		"straight-line": <span>&#124;</span>,
		slash: <span>&#47;</span>,
		"back-slash": <span>&#92;</span>,
	};

	return (
		metaSeparator !== "normal-space" && (
			<span className={"sp-smart-post-meta-separator"}>{separator[metaSeparator]}</span>
		)
	);
});

// Like render component.
export const MetaLike = memo(({ data, attributes }) => {
	const likeButtonClasses = `pcpl-button sp-align-i-center ${data?.like_options.button_class}`;
	const likeButtonTitle = data?.like_options.title;
	const likeButtonNonce = data?.like_options.nonce;
	const likeButtonIsComment = data?.like_options.is_comment;
	const likeCount = data?.like_count;

	return (
		<span className="sp-smart-post-meta sp-component-simple pcpl-wrapper sp-smart-post-like">
			<a
				href="#"
				// className={ likeButtonClasses }
				data-nonce={likeButtonNonce}
				title={likeButtonTitle}
				data-post-id={data?.post_id}
				data-iscomment={likeButtonIsComment}
			>
				{(!likeCount || "0" === likeCount || "like" === likeButtonTitle.toLowerCase()) && (
					<div className={`sp-smart-post-meta-icon`}>
						<LoveIcon />
					</div>
				)}
				{"0" !== likeCount && likeCount && "like" !== likeButtonTitle.toLowerCase() && (
					<div className={`sp-smart-post-meta-icon`}>
						<LoveIconFull />
					</div>
				)}
				<span className={`sp-smart-post-meta-text`}>
					{!likeCount || "0" === likeCount ? "Like" : likeCount}
				</span>
			</a>
			<span id="pcpl-loader"></span>
		</span>
	);
});

// Total Time component.
export const TotalTime = ({ metaPrefix, metaPerMin, countAll }) => {
	const type = metaPerMin.unit;

	return (
		<>
			{Math.floor(parseInt(countAll[type]) / parseInt(metaPerMin.value))} Min {metaPrefix}
		</>
	);
};

// Reading Time render component.
export const ReadingTime = memo(({ data, attributes }) => {
	const { metaReadingTimePostfix, metaPerMin } = attributes;
	const rawContent = data;
	const countAll = countWordAndCharacter(rawContent);

	return (
		<span className="sp-smart-post-meta sp-component-simple sp-smart-post-reading-time">
			<span className={`sp-smart-post-meta-icon`}>
				<MetaReadingTimeIcon />
			</span>
			<span className={`sp-smart-post-meta-text`}>
				<TotalTime
					type={metaPerMin.unit}
					metaPrefix={metaReadingTimePostfix}
					metaPerMin={metaPerMin}
					countAll={countAll}
				/>
			</span>
		</span>
	);
});

// Social Share render component.
export const SocialShare = memo(({ link, attributes, onClick }) => {
	const { socialSharingMedia, socialShareIconType } = attributes;

	const editPage = isEditor();

	// Helper function to get the social media share URL based on the platform.
	const getSocialUrl = (platform, permalink) => {
		const socialShareUrl = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${permalink}`,
			x: `https://twitter.com/intent/tweet?url=${permalink}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`,
			pinterest: `https://pinterest.com/pin/create/button/?url=${permalink}`,
			instagram: `https://www.instagram.com/?url=${permalink}`,
			vkontakte: `https://vk.com/share.php?url=${permalink}`,
			digg: `http://digg.com/submit?url=${permalink}`,
			tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${permalink}`,
			reddit: `https://www.reddit.com/submit?url=${permalink}`,
			whatsapp: `https://api.whatsapp.com/send?text=${permalink}`,
			pocket: `https://getpocket.com/save?url=${permalink}`,
			xing: `https://www.xing.com/spi/shares/new?url=${permalink}`,
			mail: `mailto:?subject=&body=${permalink}`,
		};
		return socialShareUrl[platform];
	};

	return (
		<ul
			className={`sp-smart-post-social-share ${socialShareIconType}-css sp-component-simple sp-panel-data`}
			onClick={onClick || null}
			data-component="social_share"
		>
			{socialSharingMedia?.map((social, i) => {
				const platform = social.value.toLowerCase();
				const socialUrl = editPage ? "" : getSocialUrl(platform, link);

				return (
					<li
						key={i}
						className="sp-smart-post-social-share-icon sp-li-style-none"
						style={{ pointerEvents: "all" }}
					>
						{platform === "clone" ? (
							<span className="sp-copy-url-area">
								<a
									href="#"
									title="Copy post URL"
									className="sp-smart-post-social-share-link sp-smart-post-copy-btn"
									data-url={link}
									data-action="copy"
								>
									<i className={`sp-icon-clone`}></i>
									<div className="sp-post-url-copy-popup sp-d-hidden">Copied!</div>
								</a>
							</span>
						) : (
							<a
								href={socialUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="sp-smart-post-social-share-link"
								title={platform.charAt(0).toUpperCase() + platform.slice(1)}
								data-action="share"
							>
								<i className={`sp-icon-${platform}`}></i>
							</a>
						)}
					</li>
				);
			})}
		</ul>
	);
});

export const ReadMoreButton = memo(({ label, link, onClick, attributes }) => {
	const {
		readMoreIconStyle,
		generalLinkOpen,
		readMoreButtonType,
		readMoreIocVisibility,
		readMoreButtonGlobalTypography,
	} = attributes;

	const editPage = isEditor();

	const readMoreIconClass = ` sp-read-more-icon-${readMoreIocVisibility}`;

	return (
		<div className={`sp-smart-post-read-more-button `}>
			<a
				className={`sp-smart-post-read-more-btn-link type-${readMoreButtonType} sp-component-simple sp-panel-data ${
					readMoreButtonGlobalTypography?.class ? readMoreButtonGlobalTypography?.class : ""
				}`}
				data-component="read_more"
				{...(generalLinkOpen === "single-popup" || generalLinkOpen === "multi-popup" || editPage
					? { onClick }
					: {})}
				href={
					!editPage && (generalLinkOpen === "current-tab" || generalLinkOpen === "new-tab") ? link : undefined
				}
				target={generalLinkOpen === "new-tab" ? "_blank" : "_self"}
				role={readMoreButtonType}
				rel="noopener noreferrer"
			>
				{label}
				{<i className={`sp-icon-${readMoreIconStyle}${readMoreIconClass}`}></i>}
			</a>
		</div>
	);
});

export const SwiperNavButton = ({
	props = { dynamicClassNames: "", navArrowVisibilityOnHover: false },
	style,
	navArrow,
	blockName = "sp-smart-post-swiper",
	swiperNavNextRef = null,
	swiperNavPrevRef = null,
}) => {
	const { navArrowVisibilityOnHover } = props;
	const { togglePanelBody } = usePanelBodyContext();
	const editPage = isEditor();

	const Icon = arrowIcons[style];

	return (
		<>
			<div
				className={`sp-smart-post-swiper-nav-arrow ${
					navArrowVisibilityOnHover ? " visible-on-hover" : ""
				} sp-panel-data`}
				onClick={togglePanelBody}
				data-component="navigation"
			>
				<span
					ref={swiperNavPrevRef}
					className={`sp-smart-post-swiper-nav-arrow-btn btn-prev sp-component-simple`}
				>
					<i>
						<Icon />
					</i>
				</span>
				<span
					ref={swiperNavNextRef}
					className={`sp-smart-post-swiper-nav-arrow-btn btn-next sp-component-simple`}
				>
					<i>
						<Icon />
					</i>
				</span>
			</div>
		</>
	);
};

export const SwiperPagination = ({ bulletStyle, vertical = false, swiperDotsRef = null }) => {
	const { togglePanelBody } = usePanelBodyContext();
	const editPage = isEditor();
	return (
		<div
			className={`sp-smart-post-pagination-${bulletStyle} ${
				vertical ? "sp-pagination-vertical" : "sp-pagination-horizontal"
			} sp-mt-10 sp-component-simple sp-panel-data`}
			ref={swiperDotsRef}
			onClick={togglePanelBody}
			data-component="pagination"
		></div>
	);
};

export const MetadataRenderer = memo(({ attributes, onClick, socialOnClick }) => {
	const {
		author_url,
		author_avatar_url,
		author,
		metaAuthorStyle,
		metaUserIcon,
		userAnchorStyles,
		metaIconClass,
		iconHeightWidthClass,
		// iconColorHoverColorClass,
		authorNameLabelClass,
		data,
		metaDataClass,
		metaDateFormat,
		metaDateCustomDateFormat,
		comment_count,
		view_count,
		metaReadingTimePostfix,
		metaPerMin,
		// metaSeparatorClass,
		metaSeparator,
		catTabCategoryPosition,
		categoryList,
		contentOrientation,
		socialShareEnableSocial,
		socialIconDisplayType,
		socialShareIconPosition,
		socialSharingMedia,
		// socialShareIconContainerClass,
		socialShareAllIconClass,
		link,
		// socialOnClick: togglePanelBody,
		socialShareDisplayOnHover,
		metaDataAllContentArray,
		catTabCategoryType,
		metaDisplayType,
		socialShareIconType,
		metaGlobalTypography,
	} = attributes;

	const metaRight = ["comments", "views", "likes", "social-share"];

	// Inline metadata mapping object
	const metaDataMapping = {
		author: (
			<Fragment key={"1"}>
				<Author
					url={author_url}
					avatar={author_avatar_url}
					name={author}
					attributes={{
						metaAuthorStyle,
						metaUserIcon,
						userAnchorStyles,
						metaIconClass,
						iconHeightWidthClass,
						authorNameLabelClass,
					}}
				/>
				<MetaSeparatorData
					attributes={{
						metaSeparator,
						// metaSeparatorClass,
					}}
				/>
			</Fragment>
		),
		date: (
			<Fragment key={"2"}>
				{"orientation_two" !== contentOrientation && (
					<>
						<Date
							date={data?.date}
							postDate={data?.post_date}
							attributes={{
								metaIconClass,
								metaDataClass,
								metaDateFormat,
								metaDateCustomDateFormat,
							}}
						/>
						<MetaSeparatorData
							attributes={{
								metaSeparator,
								// metaSeparatorClass,
							}}
						/>
					</>
				)}
			</Fragment>
		),
		comments: (
			<Fragment key={"3"}>
				<CommentCounter
					totalComment={comment_count}
					attributes={{
						metaIconClass,
						metaDataClass,
					}}
				/>
				<MetaSeparatorData
					attributes={{
						metaSeparator,
						// metaSeparatorClass,
					}}
				/>
			</Fragment>
		),
		views: (
			<Fragment key={"4"}>
				<ViewCount
					data={view_count}
					attributes={{
						metaIconClass,
						metaDataClass,
					}}
				/>
				<MetaSeparatorData
					attributes={{
						metaSeparator,
						// metaSeparatorClass,
					}}
				/>
			</Fragment>
		),
		likes: (
			<Fragment key={"5"}>
				<MetaLike
					data={data}
					attributes={{
						metaIconClass,
						metaDataClass,
					}}
				/>
				<MetaSeparatorData
					attributes={{
						metaSeparator,
						// metaSeparatorClass,
					}}
				/>
			</Fragment>
		),
		"reading-time": (
			<Fragment key={"6"}>
				<ReadingTime
					data={data?.content}
					attributes={{
						metaReadingTimePostfix,
						metaPerMin,
						metaIconClass,
						metaDataClass,
					}}
				/>
				<MetaSeparatorData
					attributes={{
						metaSeparator,
						// metaSeparatorClass,
					}}
				/>
			</Fragment>
		),
		taxonomy: (
			<Fragment key={"7"}>
				{catTabCategoryPosition === "beside-other-meta" && (
					<>
						<Category
							attributes={{
								metaIconClass,
								metaDataClass,
								iconHeightWidthClass,
								catTabCategoryType,
							}}
							categoryList={categoryList}
							catTabCategoryPosition={catTabCategoryPosition}
						/>
						<MetaSeparatorData
							attributes={{
								metaSeparator,
								// metaSeparatorClass,
							}}
						/>
					</>
				)}
			</Fragment>
		),
	};

	const editPage = isEditor();

	return (
		<div
			className={`sp-meta-data sp-smart-post-meta-details-${metaDisplayType} sp-d-flex ${
				socialShareEnableSocial &&
				socialIconDisplayType === "popup-share" &&
				socialShareIconPosition === "space-between-meta"
					? "sp-space-between"
					: ""
			}`}
		>
			{"inline" === metaDisplayType ? (
				<>
					<span
						key={metaDataAllContentArray}
						className={classNames(
							"sp-smart-post-details ",
							"sp-panel-data",
							metaGlobalTypography?.class ? metaGlobalTypography?.class : ""
						)}
						onClick={(editPage && onClick) || null}
						data-component="meta_data"
					>
						{metaDataAllContentArray?.map((meta) => {
							const metaItem = meta?.show ? metaDataMapping[meta.value] : null;
							return metaItem ? metaItem : null;
						})}
					</span>
					{socialShareEnableSocial &&
						socialIconDisplayType === "popup-share" &&
						["beside-meta", "space-between-meta"].includes(socialShareIconPosition) && (
							<span
								className={`sp-social-share-popup${
									socialShareDisplayOnHover ? " on-hover" : ""
								} ${socialShareIconPosition}`}
							>
								<span
									className="sp-social-share-popup-icon popup-share-icon sp-component-simple sp-panel-data"
									onClick={(e) => socialOnClick(e, "social_share")}
									data-component="social_share"
								>
									<SharePopupIcon />
								</span>
								<span className="sp-social-share-popup-icon sp-social-popup-icon-list">
									<SocialShare
										attributes={{
											socialSharingMedia,
											// socialShareIconContainerClass,
											socialShareAllIconClass,
											socialShareIconType,
										}}
										link={link}
										onClick={(e) => socialOnClick(e, "social_share")}
									/>
								</span>
							</span>
						)}
				</>
			) : (
				<>
					<span className="sp-smart-post-details-left">
						<span
							className={classNames(
								"sp-smart-post-details ",
								"sp-panel-data",
								metaGlobalTypography?.class ? metaGlobalTypography?.class : ""
							)}
							onClick={(editPage && onClick) || null}
							data-component="meta_data"
						>
							{metaDataAllContentArray?.map((meta) => {
								const metaItem =
									meta?.show && !metaRight.includes(meta?.value) ? metaDataMapping[meta.value] : null;
								return metaItem ? metaItem : null;
							})}
						</span>
					</span>
					<span className="sp-smart-post-details-right">
						<span
							className={classNames(
								"sp-smart-post-details ",
								"sp-panel-data",
								metaGlobalTypography?.class ? metaGlobalTypography?.class : ""
							)}
							onClick={(editPage && onClick) || null}
							data-component="meta_data"
						>
							<>
								{metaDataAllContentArray?.map((meta) => {
									const metaItem =
										meta?.show && metaRight.includes(meta?.value)
											? metaDataMapping[meta.value]
											: null;
									return metaItem ? metaItem : null;
								})}
								{socialShareEnableSocial &&
									socialIconDisplayType === "popup-share" &&
									["beside-meta", "space-between-meta"].includes(socialShareIconPosition) && (
										<span
											className={`sp-social-share-popup${
												socialShareDisplayOnHover ? " on-hover" : ""
											} ${socialShareIconPosition}`}
										>
											<span
												className="sp-social-share-popup-icon popup-share-icon sp-component-simple sp-panel-data"
												onClick={(e) => socialOnClick("social_share", e)}
												data-component="social_share"
											>
												<SharePopupIcon />
											</span>
											<span className="sp-social-share-popup-icon sp-social-popup-icon-list">
												<SocialShare
													attributes={{
														socialSharingMedia,
														// socialShareIconContainerClass,
														socialShareAllIconClass,
														socialShareIconType,
													}}
													link={link}
													onClick={(e) => socialOnClick("social_share", e)}
												/>
											</span>
										</span>
									)}
							</>
						</span>
					</span>
				</>
			)}
		</div>
	);
});
