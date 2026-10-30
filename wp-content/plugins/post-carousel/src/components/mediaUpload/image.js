import { __ } from "@wordpress/i18n";
import { BaseControl, SelectControl } from "@wordpress/components";
import { MediaUpload } from "@wordpress/block-editor";
import "./editor.scss";

const MediaPicker = ({
	backgroundImage,
	imageKey,
	setAttributes,
	imageSizeValue,
	imageSizeKey,
	slug = "image",
	label = __("Image", "post-carousel"),
	disableLabel = false,
	disableRemove = false,
	mediaType = "image",
	enableImageSize = true,
	onSelect = false,
	removeImage = false,
}) => {
	/*
	 * Event to set Image as while adding.
	 */
	const onSelectImage = (media) => {
		if (!media || !media.url) {
			setAttributes({ [imageKey]: null });
			return;
		}

		// if ( ! media.type || 'image' !== media.type ) {
		// 	setAttributes( { [imageKey]: null } );
		// 	return;
		// }

		setAttributes({ [imageKey]: media });
	};

	const imagesSizeOptions = (image) => {
		const sizeArr = [];
		for (const size in image.sizes) {
			if (image.sizes.hasOwnProperty(size)) {
				const p = {
					value: size,
					label: size.charAt(0).toUpperCase() + size.slice(1),
				};
				sizeArr.push(p);
			}
		}
		return sizeArr;
	};

	/*
	 * Event to set Image as null while removing.
	 */
	const onRemoveImage = () => {
		setAttributes({ [imageKey]: "" });
	};

	// This is used to render an icon in place of the background image when needed.
	let placeholderIcon;

	// These are the localized texts that will show on the Select / Change Button and Popup.
	let selectMediaLabel, replaceMediaLabel;

	switch (slug) {
		case "video":
			selectMediaLabel = __("Select Video", "post-carousel");
			replaceMediaLabel = __("Change Video", "post-carousel");
			// placeholderIcon = UAGB_Block_Icons.video_placeholder;
			break;
		case "lottie":
			selectMediaLabel = __("Select Lottie Animation", "post-carousel");
			replaceMediaLabel = __("Change Lottie Animation", "post-carousel");
			// placeholderIcon = UAGB_Block_Icons.lottie;
			break;
		default:
			selectMediaLabel = __("Select Image", "post-carousel");
			replaceMediaLabel = __("Change Image", "post-carousel");
	}

	const renderMediaUploader = (open) => {
		const uploadType = backgroundImage?.url ? "replace" : "add";
		return (
			<button
				className={`sp-smart-post-show-media-control__clickable sp-smart-post-show-media-control__clickable--${uploadType}`}
				onClick={open}
			>
				{"add" === uploadType ? (
					renderButton(uploadType)
				) : (
					<div className="sp-smart-post-show-control-label">{replaceMediaLabel}</div>
				)}
			</button>
		);
	};

	const renderButton = (buttonType) => (
		<div
			className={`sp-smart-post-show-media-control__button sp-smart-post-show-media-control__button--${buttonType}`}
		>
			<span>{"close" === buttonType ? "×" : "+"}</span>
		</div>
	);

	// This Can Be Deprecated.
	const generateBackground = (media) => {
		const regex = /(?:\.([^.]+))?$/;
		let mediaURL = media;
		switch (regex.exec(String(mediaURL))[1]) {
			// For Lottie JSON Files.
			case "json":
				mediaURL = "";
				break;
			// For Videos.
			case "avi":
			case "mpg":
			case "mp4":
			case "m4v":
			case "mov":
			case "ogv":
			case "vtt":
			case "wmv":
			case "3gp":
			case "3g2":
				mediaURL = "";
				break;
		}
		return mediaURL;
	};

	const backgroundImageURL = generateBackground(backgroundImage?.url);

	return (
		<>
			<BaseControl
				className="sp-smart-post-show-media-control"
				id={`sp-smart-post-show-option-selector-${slug}`}
				label={label}
				hideLabelFromVision={disableLabel}
				__nextHasNoMarginBottom
			>
				<div
					className="sp-smart-post-show-media-control__wrapper"
					style={{
						backgroundImage: !placeholderIcon && backgroundImage?.url && `url("${backgroundImageURL}")`,
					}}
				>
					{"video" === mediaType && backgroundImage?.url && (
						<div className="sp-smart-post-show-media-video">
							<i className="fa-regular fa-circle-play"></i>
						</div>
					)}

					{placeholderIcon && backgroundImage?.url && (
						<div className="sp-smart-post-show-media-control__icon sp-smart-post-show-media-control__icon--stroke">
							{placeholderIcon}
						</div>
					)}
					<MediaUpload
						title={selectMediaLabel}
						onSelect={onSelect ? onSelect : onSelectImage}
						allowedTypes={mediaType}
						value={backgroundImage}
						render={({ open }) => renderMediaUploader(open)}
					/>
					{!disableRemove && backgroundImage?.url && (
						<button
							className="sp-smart-post-show-media-control__clickable sp-smart-post-show-media-control__clickable--close"
							onClick={removeImage ? removeImage : onRemoveImage}
						>
							{renderButton("close")}
						</button>
					)}
				</div>
			</BaseControl>

			{backgroundImage && enableImageSize && backgroundImage.url !== "null" && backgroundImage.url !== "" && (
				<>
					<SelectControl
						label={__("Image Size", "post-carousel")}
						value={imageSizeValue}
						options={imagesSizeOptions(backgroundImage)}
						onChange={(newSize) => setAttributes({ [imageSizeKey]: newSize })}
						__nextHasNoMarginBottom
					/>
				</>
			)}
		</>
	);
};

export default MediaPicker;
