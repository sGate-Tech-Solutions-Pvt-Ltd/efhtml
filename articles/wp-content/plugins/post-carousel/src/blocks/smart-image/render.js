import { Fragment, useEffect, useMemo } from "@wordpress/element";
import { SmartImageCaption } from "./smartImgTemplate";

const RenderSmartImage = ({ attributes, setAttributes, setIsPreloader }) => {
	const {
		uniqueId,
		selectImage,
		imageSize,
		doubleResolutionRetina,
		lazyLoad,
		aspectRatio,
		enableLink,
		linkType,
		buttonLabel,
		buttonPosition,
		imageShapeSet,
		imgTextPosition,
		imgAnimationNormal,
		imgMaskingEnable,
		imgHoverOverlayEnable,
		imageAltText,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		smartImgBgEnable,
		imgAlignment
	} = attributes;

	const imgSelectSizeObj = useMemo(() => {
		return selectImage?.media_details?.sizes?.[imageSize] || null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectImage.id, imageSize]);

	const imgSrcSetRetina = useMemo(() => {
		if (!selectImage?.srcset) {
			return null;
		}

		if (!doubleResolutionRetina) {
			return selectImage.srcset;
		}

		return selectImage.srcset
			.split(",")
			.map((src) => src.trim())
			.filter((src) => {
				const size = parseInt(src.match(/(\d+)w$/)?.[1] || 0, 10);
				return size >= 600; // keep only >=600px
			})
			.join(", ");
	}, [selectImage?.srcset, doubleResolutionRetina]);

	useEffect(() => {
		if (imgSelectSizeObj?.source_url || selectImage?.url) {
			setIsPreloader(false);
		} else {
			setIsPreloader(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imgSelectSizeObj?.source_url, selectImage?.url]);

	const ImgLinkTag = enableLink && "full-img" === linkType ? "a" : Fragment;
	const visibilityClass = `${hideOnDesktop ? " sp-hide-on-desktop " : ""}${
		hideOnTablet ? " sp-hide-on-tablet " : ""
	}${hideOnMobile ? " sp-hide-on-mobile" : ""}`;
	const imgMaskClass = imgMaskingEnable && "custom" === imageShapeSet ? " sp-custom-mask" : "";

	return (
		<>
			<div id={uniqueId} className={`sp-smart-post-block-wrapper${visibilityClass}`}>
				<div className="sp-smart-post-smart-image">
					<figure className={`sp-smart-image-wrapper sp-text-position-${imgTextPosition}`}>
						<div className={`sp-smart-image-button sp-d-flex sp-justify-${ imgAlignment }`}>
							<div
								className={`sp-smart-post sp-smart-image-area${imgMaskClass} ${smartImgBgEnable ? "sp-has-bg" : ""}`}
							>
								<ImgLinkTag>
									<div className="sp-smart-image-wrapper sp-overflow-hidden">
										<img
											className={`sp-smart-image sp-image-ratio-${aspectRatio} sp-${imgAnimationNormal}`}
											src={imgSelectSizeObj?.source_url || selectImage?.url}
											alt={imageAltText}
											srcSet={imgSrcSetRetina}
											loading={lazyLoad ? "lazy" : "eager"}
											sizes={`(max-width: ${imgSelectSizeObj?.width}px) 100vw, ${imgSelectSizeObj?.width}px`}
										/>
									</div>
									{imgHoverOverlayEnable && (
										<div className={`sp-hover-img-overlay  sp-${imgAnimationNormal}`}></div>
									)}
								</ImgLinkTag>
								{enableLink && "button" === linkType && (
									<div className={`sp-smart-image-link-btn-wrapper sp-position-${buttonPosition}`}>
										<span className={`sp-smart-image-link-btn`}>{buttonLabel}</span>
									</div>
								)}
								{"over-img" === imgTextPosition && (
									<SmartImageCaption attributes={attributes} setAttributes={setAttributes} />
								)}
							</div>
						</div>
						{"over-img" !== imgTextPosition && (
							<SmartImageCaption attributes={attributes} setAttributes={setAttributes} />
						)}
					</figure>
				</div>
			</div>
		</>
	);
};
export default RenderSmartImage;
