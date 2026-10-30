import { __ } from "@wordpress/i18n";
import { useEffect, useRef, useState } from "@wordpress/element";
import { MediaUpload, MediaUploadCheck, RichText } from "@wordpress/block-editor";
import { mediaUpload } from "@wordpress/editor";
import { FormFileUpload, Button } from "@wordpress/components";
import { ImgDemoIcon, ImgUploadIcon, KeyBoardEnter } from "./icon";
import { isBlobURL } from "@wordpress/blob";
import { Placeholder } from "@wordpress/components";

const InsertUrlForm = ({ attributes, setAttributes, attributesKey, onClose }) => {
	const [insertUrlValue, setInsertUrlValue] = useState(attributes?.insertUrl || "");
	const inputRef = useRef(null);
	const submitURL = () => {
		setAttributes({
			[attributesKey]: { ...attributes, url: inputRef.current.value, insertUrl: inputRef.current.value },
		});
		onClose((prev) => !prev);
	};

	useEffect(() => {
		if (inputRef && inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<div className="sp-smart-post-show url-inserter-form sp-d-flex">
			<input
				ref={inputRef}
				type="url"
				value={insertUrlValue}
				className="url-inserter-input"
				onChange={(newValue) => setInsertUrlValue(newValue?.target?.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						submitURL();
					}
				}}
			/>
			<Button
				icon={KeyBoardEnter}
				label={__("Apply", "post-carousel")}
				onClick={submitURL}
				className={insertUrlValue?.trim() ? "" : "sp-disabled"}
			/>
		</div>
	);
};

export const PresetTemplate = ({ attributes, setAttributes, setIsPreloader, isPreloader }) => {
	const { selectImage, selectImageId } = attributes;
	const [showURLInput, setShowURLInput] = useState(false);
	const [imgUrl, setImgUrl] = useState(null);
	const popupRef = useRef(null);
	const [imgId, setImgId] = useState(null);

	useEffect(() => {
		if (!imgId || selectImageId === imgId) {
			return;
		}
		setAttributes({ selectImageId: imgId });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imgId, selectImageId]);

	useEffect(() => {
		if (isBlobURL(imgUrl)) {
			setIsPreloader(true);
		} else {
			setIsPreloader(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imgUrl]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				setShowURLInput(false);
			}
		};
		if (showURLInput) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showURLInput]);

	if (isPreloader) {
		return null;
	}

	return (
		<>
			<Placeholder
				icon={<ImgDemoIcon />}
				label={__("Smart Image", "post-carousel")}
				instructions={__(
					"Upload an image file, pick one from your media library, or add one with a URL.",
					"post-carousel"
				)}
				className="sp-smart-image-preset-template sp-smart-image-preset-wrapper sp-relative"
			>
				<div className="smart-image-upload-button">
					<MediaUploadCheck>
						<FormFileUpload
							__next40pxDefaultSize
							accept="image/*"
							onChange={(event) => {
								const files = event.currentTarget.files;
								mediaUpload({
									filesList: files,
									onFileChange: (media) => {
										const img = media[0];
										setImgUrl(img?.url || img?.source_url);
										setImgId(img?.id);
									},
									allowedTypes: ["image"],
								});
							}}
							onClick={() => setShowURLInput(false)}
						>
							<div
								className="sp-smart-image-preset-btn sp-btn-fill"
								onClick={() => setShowURLInput(false)}
								role="button"
								tabIndex={0}
							>
								<span className="smart-image-upload-icon">
									<ImgUploadIcon />
								</span>
								<span className="smart-image-upload--text">Upload</span>
							</div>
						</FormFileUpload>
					</MediaUploadCheck>

					<MediaUploadCheck>
						<MediaUpload
							__nextHasNoMarginBottom
							gallery={false}
							onSelect={(media) => setImgId(media.id)}
							allowedTypes={["image"]}
							value={imgId}
							render={({ open }) => (
								<div
									className="sp-smart-image-preset-btn"
									role="button"
									tabIndex={0}
									onClick={() => {
										open();
										setShowURLInput(false);
									}}
								>
									<span className="smart-image-upload--text">Media Library</span>
								</div>
							)}
						/>
					</MediaUploadCheck>

					<div className="sp-inserter-btn" ref={popupRef}>
						<div
							className="sp-smart-image-preset-btn"
							role="button"
							tabIndex={0}
							onClick={() => setShowURLInput((prev) => !prev)}
						>
							<span className="smart-image-upload--text">Insert from URL</span>
						</div>
						{showURLInput && (
							<InsertUrlForm
								attributes={selectImage}
								setAttributes={setAttributes}
								attributesKey={"selectImage"}
								onClose={setShowURLInput}
							/>
						)}
					</div>
				</div>
			</Placeholder>
		</>
	);
};

export const SmartImageCaption = ({ attributes, setAttributes }) => {
	const {
		imgTitleEnable,
		imgTitleLabel,
		imgCaptionEnable,
		imgCaptionLabel,
		imgTextVisibility,
		imgTextPosition,
		imgTextVertical,
		imgTextHorizontal,
	} = attributes;

	if (!imgTitleEnable && !imgCaptionEnable) {
		return null;
	}
	const textPosition = imgTextPosition === "over-img" ? ` sp-position-${imgTextVertical}-${imgTextHorizontal} ` : "";

	return (
		<figcaption
			className={`sp-smart-image-text-container sp-visibility-${imgTextVisibility}${textPosition} sp-text-${imgTextHorizontal}`}
		>
			{imgTitleEnable && (
				<div className="sp-smart-post sp-text sp-smart-image-title-area">
					<RichText
						tagName="h4"
						className="sp-smart-image-title"
						onChange={(newValue) => setAttributes({ imgTitleLabel: newValue })}
						value={imgTitleLabel}
						placeholder={__("Image Title", "post-carousel")}
					/>
				</div>
			)}
			{imgCaptionEnable && (
				<div className="sp-smart-post sp-text sp-smart-image-caption-area">
					<RichText
						tagName="p"
						className="sp-smart-image-caption"
						onChange={(newValue) => setAttributes({ imgCaptionLabel: newValue })}
						value={imgCaptionLabel}
						placeholder={__("Image Caption", "post-carousel")}
					/>
				</div>
			)}
		</figcaption>
	);
};
