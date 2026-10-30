import { RichText } from "@wordpress/block-editor";
import { memo, useMemo, useEffect } from "@wordpress/element";
import { usePanelBodyContext } from "../../context";
import useIconList from "../../components/iconLibrary/useIconList";

const Icon = memo(
	({
		iconEnable,
		iconSource,
		iconSourceCustom,
		iconOverlayEnable,
		iconHoverEffects,
		currentIcon,
		togglePanelBody,
	}) => {
		const iconClasses = useMemo(
			() => `sp-smart-post-info-box-icon ${iconOverlayEnable ? "icon-img-overlay" : ""} ${iconHoverEffects}`,
			[iconOverlayEnable, iconHoverEffects]
		);

		const imgClasses = useMemo(
			() => `sp-smart-post-info-box-img ${iconOverlayEnable ? "icon-img-overlay" : ""} ${iconHoverEffects}`,
			[iconOverlayEnable, iconHoverEffects]
		);

		if (
			!iconEnable ||
			(iconSource === "library" && !currentIcon) ||
			(iconSource === "custom" && !iconSourceCustom)
		) {
			return null;
		}

		return (
			<div
				className="sp-smart-post-info-box-icon-container editor-selector-hover sp-panel-data"
				data-component="icon-image"
				onClick={togglePanelBody}
			>
				{iconSource === "library" ? (
					<span className={iconClasses}>
						<svg width={currentIcon?.width} height={currentIcon?.height} viewBox={currentIcon?.viewBox}>
							<path d={currentIcon?.path} />
						</svg>
					</span>
				) : (
					<div className={imgClasses}>
						<img src={iconSourceCustom?.url} alt={iconSourceCustom?.alt || "Custom icon"} />
					</div>
				)}
			</div>
		);
	}
);

const Title = memo(
	({
		titleTag,
		titleText,
		titleHoverEffects,
		subTitleEnable,
		subTitleTag,
		subTitleText,
		setAttributes,
		togglePanelBody,
		titleGlobalTypography,
		subTitleGlobalTypography,
	}) => {
		const handleTitleChange = (newValue) => {
			setAttributes({ titleText: newValue });
		};

		const handleSubTitleChange = (newValue) => {
			setAttributes({ subTitleText: newValue });
		};

		const titleClasses = useMemo(
			() =>
				`sp-smart-post-info-box-title title-hover-${titleHoverEffects} ${titleGlobalTypography?.class ? titleGlobalTypography?.class : ""}`,
			[titleHoverEffects, titleGlobalTypography?.class]
		);

		return (
			<div
				className={`sp-smart-post-info-box-title-container editor-selector-hover sp-panel-data`}
				data-component="title"
				onClick={togglePanelBody}
			>
				<RichText
					tagName={titleTag}
					value={titleText}
					className={titleClasses}
					onChange={handleTitleChange}
					contentEditable={true}
				/>

				{subTitleEnable && (
					<RichText
						tagName={subTitleTag}
						value={subTitleText}
						className={`sp-smart-post-info-box-sub-title ${subTitleGlobalTypography?.class ? subTitleGlobalTypography?.class : ""}`}
						onChange={handleSubTitleChange}
						contentEditable={true}
					/>
				)}
			</div>
		);
	}
);

const Description = memo(({ descText, dropCapsEnable, setAttributes, togglePanelBody, desGlobalTypography }) => {
	const handleChange = (newValue) => {
		setAttributes({ descText: newValue });
	};

	const descClasses = useMemo(
		() =>
			`sp-smart-post-info-box-desc sp-panel-data editor-selector-hover ${
				dropCapsEnable ? "drop-caps" : ""
			} ${desGlobalTypography?.class ? desGlobalTypography?.class : ""}`,
		[dropCapsEnable, desGlobalTypography?.class]
	);

	return (
		<RichText
			tagName="p"
			data-component="description"
			value={descText}
			className={descClasses}
			onChange={handleChange}
			contentEditable={true}
			onClick={togglePanelBody}
		/>
	);
});

const Rating = memo(
	({
		iconsNum,
		ratingIconSource,
		ratingIconSourceLibrary,
		ratingValueEnable,
		scale,
		togglePanelBody,
		ratingGlobalTypography,
		currentRatingIconSourceLibrary,
	}) => {
		const ratingIcons = useMemo(() => Array(iconsNum).fill(null), [iconsNum]);

		const containerClasses = useMemo(
			() => `sp-smart-post-info-box-rating-container ${ratingIconSource}`,
			[ratingIconSource]
		);

		return (
			<div
				className={`sp-smart-post-info-box-rating-wrapper editor-selector-hover sp-panel-data ${ratingGlobalTypography?.class ? ratingGlobalTypography?.class : ""}`}
				data-component="rating"
				onClick={togglePanelBody}
			>
				<div className={containerClasses}>
					<span className="sp-smart-post-info-box-rating-icons-background">
						{ratingIcons.map((_, index) => (
							<svg
								key={index}
								width={currentRatingIconSourceLibrary?.width}
								height={currentRatingIconSourceLibrary?.height}
								viewBox={currentRatingIconSourceLibrary?.viewBox}
								className={ratingIconSourceLibrary}
							>
								<path d={currentRatingIconSourceLibrary?.path} />
							</svg>
						))}
					</span>

					<span className="sp-smart-post-info-box-rating-icons-foreground">
						{ratingIcons.map((_, index) => (
							<svg
								key={index}
								width={currentRatingIconSourceLibrary?.width}
								height={currentRatingIconSourceLibrary?.height}
								viewBox={currentRatingIconSourceLibrary?.viewBox}
								className={ratingIconSourceLibrary}
							>
								<path d={currentRatingIconSourceLibrary?.path} />
							</svg>
						))}
					</span>
				</div>
				{ratingValueEnable && <span className="sp-smart-post-info-box-rating-label">{scale}/5</span>}
			</div>
		);
	}
);

const Separator = memo(({ separatorEnable, togglePanelBody }) => {
	if (!separatorEnable) {
		return null;
	}

	return (
		<div
			className="sp-smart-post-info-box-separator-container editor-selector-hover sp-panel-data"
			data-component="separator"
			onClick={togglePanelBody}
		></div>
	);
});

const CallToActionIcon = memo(
	({ buttonIconEnable, cAIconSource, cAIconSourceLibrary, cAIconSourceCustom, currentCAIcon }) => {
		if (!buttonIconEnable) {
			return null;
		}

		if (cAIconSource === "library" && cAIconSourceLibrary) {
			return (
				<span className={`sp-smart-post-info-box-cta-icon ${cAIconSource}`}>
					<svg width={currentCAIcon?.width} height={currentCAIcon?.height} viewBox={currentCAIcon?.viewBox}>
						<path d={currentCAIcon?.path} />
					</svg>
				</span>
			);
		}

		// Custom image icon rendering
		if (cAIconSource === "custom" && cAIconSourceCustom?.url) {
			return (
				<div className={`sp-smart-post-info-box-cta-icon ${cAIconSource}`}>
					<img src={cAIconSourceCustom.url} alt={cAIconSourceCustom.alt || "CTA Icon"} />
					<div className="overlay"></div>
				</div>
			);
		}

		return null;
	}
);

const CallToActionText = memo(({ caButtonText, setAttributes }) => {
	const handleTextChange = (newValue) => {
		setAttributes({ caButtonText: newValue });
	};

	const buttonTextWithDefault = useMemo(() => caButtonText?.trim() || "Learn More", [caButtonText]);

	return (
		<RichText
			tagName="span"
			value={buttonTextWithDefault}
			className="sp-smart-post-info-box-cta-label"
			onChange={handleTextChange}
		/>
	);
});

const CallToActionButton = memo(
	({
		linkingType = "button",
		caButtonText,
		setAttributes,
		togglePanelBody,
		buttonIconEnable,
		cAIconSource,
		cAIconSourceLibrary,
		cAIconSourceCustom,
		callActionEnable,
		callToActionGlobalTypography,
		fullWidthButton = false,
		currentCAIcon,
	}) => {
		const buttonClasses = useMemo(
			() =>
				`sp-smart-post-info-box-cta sp-panel-data linking-type-${linkingType} sp-smart-post-info-box-cta-link editor-selector-hover${linkingType === "button" && fullWidthButton ? " sp-btn-full-width" : ""} ${callToActionGlobalTypography?.class ? callToActionGlobalTypography?.class : ""}`,
			[linkingType, callToActionGlobalTypography?.class, fullWidthButton]
		);

		if (!callActionEnable) {
			return null;
		}
		if (linkingType === "fullBox") {
			return null;
		}

		return (
			<a
				// href="javascript:void(0)"
				className={buttonClasses}
				data-component="callToAction"
				onClick={(event) => {
					event.preventDefault();
					togglePanelBody();
				}}
			>
				<CallToActionText caButtonText={caButtonText} setAttributes={setAttributes} />

				<CallToActionIcon
					buttonIconEnable={buttonIconEnable}
					cAIconSource={cAIconSource}
					cAIconSourceLibrary={cAIconSourceLibrary}
					cAIconSourceCustom={cAIconSourceCustom}
					currentCAIcon={currentCAIcon}
				/>
			</a>
		);
	}
);

const Badge = memo(({ badgeEnable, badgeLabel, badgePosition, togglePanelBody, badgeGlobalTypography }) => {
	const badgeClasses = useMemo(
		() =>
			`sp-smart-post-info-box-badge sp-panel-data editor-selector-hover ${badgePosition} ${badgeGlobalTypography?.class ? badgeGlobalTypography?.class : ""}`,
		[badgePosition, badgeGlobalTypography?.class]
	);

	if (!badgeEnable || !badgeLabel) {
		return null;
	}

	return (
		<div className={badgeClasses} data-component="badge" onClick={togglePanelBody}>
			<span className="sp-smart-post-info-box-badge-label">{badgeLabel}</span>
		</div>
	);
});

const Overlay = memo(({ infoBoxBg, imageOverlayEnable, imageOverlayHoverEnable }) => {
	const shouldShowOverlay = useMemo(
		() =>
			(infoBoxBg.color.style === "image" || infoBoxBg.hover.style === "image") &&
			(imageOverlayEnable || imageOverlayHoverEnable),
		[infoBoxBg, imageOverlayEnable, imageOverlayHoverEnable]
	);

	if (!shouldShowOverlay) {
		return null;
	}

	return <div className="sp-smart-post-info-box-overlay"></div>;
});

function EditHtml({ attributes, setAttributes }) {
	const { togglePanelBody } = usePanelBodyContext();
	const iconList = useIconList();

	const {
		uniqueId,
		infoBoxLayout,
		iconEnable,
		iconSource,
		iconHoverEffects,
		iconSourceCustom,
		iconOverlayEnable,
		titleTag,
		titleText,
		subTitleTag,
		subTitleText,
		subTitleEnable,
		separatorEnable,
		titleHoverEffects,
		caButtonText,
		descText,
		descriptionEnable,
		dropCapsEnable,
		badgeEnable,
		badgeLabel,
		badgePosition,
		ratingEnable,
		ratingIconSourceLibrary,
		ratingIconSource,
		cAIconSourceCustom,
		scale,
		linkingType,
		titleEnable,
		buttonIconEnable,
		cAIconSource,
		cAIconSourceLibrary,
		overlayOnHover,
		externalLinkIcon,
		callActionEnable,
		ratingValueEnable,
		imageOverlayEnable,
		imageOverlayHoverEnable,
		iconName,
		infoBoxBg,
		advancedAdditionalClass,
		titleGlobalTypography,
		subTitleGlobalTypography,
		desGlobalTypography,
		callToActionGlobalTypography,
		ratingGlobalTypography,
		badgeGlobalTypography,
		buttonLink,
		currentIcon,
		fullWidthButton,
		currentCAIcon,
		currentRatingIconSourceLibrary,
	} = attributes;

	useEffect(() => {
		setAttributes({ currentIcon: iconList[iconName] });
	}, [iconList, iconName]);

	useEffect(() => {
		setAttributes({ currentCAIcon: iconList[cAIconSourceLibrary] });
	}, [iconList, cAIconSourceLibrary]);

	useEffect(() => {
		setAttributes({ currentRatingIconSourceLibrary: iconList[ratingIconSourceLibrary] });
	}, [iconList, ratingIconSourceLibrary]);

	useEffect(() => {
		setAttributes({ currentIcon: iconList[iconName] });
	}, [iconList, iconName]);

	const iconsNum = 5;

	const layoutOne = () => {
		return (
			<>
				<Badge
					badgeEnable={badgeEnable}
					badgeLabel={badgeLabel}
					badgePosition={badgePosition}
					togglePanelBody={togglePanelBody}
					badgeGlobalTypography={badgeGlobalTypography}
				/>

				<Overlay
					infoBoxBg={infoBoxBg}
					imageOverlayEnable={imageOverlayEnable}
					imageOverlayHoverEnable={imageOverlayHoverEnable}
				/>

				<Icon
					iconEnable={iconEnable}
					iconSource={iconSource}
					iconSourceCustom={iconSourceCustom}
					iconOverlayEnable={iconOverlayEnable}
					iconHoverEffects={iconHoverEffects}
					currentIcon={currentIcon}
					togglePanelBody={togglePanelBody}
				/>

				{titleEnable && (
					<Title
						titleTag={titleTag}
						titleText={titleText}
						titleHoverEffects={titleHoverEffects}
						subTitleEnable={subTitleEnable}
						subTitleTag={subTitleTag}
						subTitleText={subTitleText}
						setAttributes={setAttributes}
						togglePanelBody={togglePanelBody}
						titleGlobalTypography={titleGlobalTypography}
						subTitleGlobalTypography={subTitleGlobalTypography}
					/>
				)}

				<Separator separatorEnable={separatorEnable} togglePanelBody={togglePanelBody} />

				{descriptionEnable && (
					<Description
						descText={descText}
						dropCapsEnable={dropCapsEnable}
						setAttributes={setAttributes}
						togglePanelBody={togglePanelBody}
						desGlobalTypography={desGlobalTypography}
					/>
				)}

				{ratingEnable && (
					<Rating
						iconsNum={iconsNum}
						ratingIconSource={ratingIconSource}
						ratingIconSourceLibrary={ratingIconSourceLibrary}
						ratingValueEnable={ratingValueEnable}
						scale={scale}
						togglePanelBody={togglePanelBody}
						ratingGlobalTypography={ratingGlobalTypography}
						currentRatingIconSourceLibrary={currentRatingIconSourceLibrary}
					/>
				)}

				<CallToActionButton
					linkingType={linkingType}
					caButtonText={caButtonText}
					setAttributes={setAttributes}
					togglePanelBody={togglePanelBody}
					buttonIconEnable={buttonIconEnable}
					cAIconSource={cAIconSource}
					cAIconSourceLibrary={cAIconSourceLibrary}
					cAIconSourceCustom={cAIconSourceCustom}
					buttonLink={buttonLink}
					callActionEnable={callActionEnable}
					callToActionGlobalTypography={callToActionGlobalTypography}
					fullWidthButton={infoBoxLayout !== "smart-info-box-layout-four" && fullWidthButton}
					currentCAIcon={currentCAIcon}
				/>
			</>
		);
	};

	const layoutTwo = () => {
		return (
			<>
				<Badge
					badgeEnable={badgeEnable}
					badgeLabel={badgeLabel}
					badgePosition={badgePosition}
					togglePanelBody={togglePanelBody}
					badgeGlobalTypography={badgeGlobalTypography}
				/>
				<Overlay
					infoBoxBg={infoBoxBg}
					imageOverlayEnable={imageOverlayEnable}
					imageOverlayHoverEnable={imageOverlayHoverEnable}
				/>
				<div className="sp-smart-post-info-box-layout-two-top">
					<Icon
						iconEnable={iconEnable}
						iconSource={iconSource}
						iconSourceCustom={iconSourceCustom}
						iconOverlayEnable={iconOverlayEnable}
						iconHoverEffects={iconHoverEffects}
						currentIcon={currentIcon}
						togglePanelBody={togglePanelBody}
					/>
					{infoBoxLayout === "smart-info-box-layout-two" && titleEnable && (
						<Title
							titleTag={titleTag}
							titleText={titleText}
							titleHoverEffects={titleHoverEffects}
							subTitleEnable={subTitleEnable}
							subTitleTag={subTitleTag}
							subTitleText={subTitleText}
							setAttributes={setAttributes}
							togglePanelBody={togglePanelBody}
							titleGlobalTypography={titleGlobalTypography}
							subTitleGlobalTypography={subTitleGlobalTypography}
						/>
					)}

					{infoBoxLayout === "smart-info-box-layout-four" && (
						<CallToActionButton
							linkingType={linkingType}
							caButtonText={caButtonText}
							setAttributes={setAttributes}
							togglePanelBody={togglePanelBody}
							buttonIconEnable={buttonIconEnable}
							cAIconSource={cAIconSource}
							cAIconSourceLibrary={cAIconSourceLibrary}
							cAIconSourceCustom={cAIconSourceCustom}
							callActionEnable={callActionEnable}
							buttonLink={buttonLink}
							callToActionGlobalTypography={callToActionGlobalTypography}
							fullWidthButton={infoBoxLayout !== "smart-info-box-layout-four" && fullWidthButton}
							currentCAIcon={currentCAIcon}
						/>
					)}
				</div>

				<Separator separatorEnable={separatorEnable} togglePanelBody={togglePanelBody} />

				{descriptionEnable && (
					<Description
						descText={descText}
						dropCapsEnable={dropCapsEnable}
						setAttributes={setAttributes}
						togglePanelBody={togglePanelBody}
						desGlobalTypography={desGlobalTypography}
					/>
				)}

				{ratingEnable && (
					<Rating
						iconsNum={iconsNum}
						ratingIconSource={ratingIconSource}
						ratingIconSourceLibrary={ratingIconSourceLibrary}
						ratingValueEnable={ratingValueEnable}
						scale={scale}
						togglePanelBody={togglePanelBody}
						ratingGlobalTypography={ratingGlobalTypography}
						currentRatingIconSourceLibrary={currentRatingIconSourceLibrary}
					/>
				)}

				{infoBoxLayout === "smart-info-box-layout-two" && (
					<CallToActionButton
						linkingType={linkingType}
						caButtonText={caButtonText}
						setAttributes={setAttributes}
						togglePanelBody={togglePanelBody}
						buttonIconEnable={buttonIconEnable}
						cAIconSource={cAIconSource}
						cAIconSourceLibrary={cAIconSourceLibrary}
						cAIconSourceCustom={cAIconSourceCustom}
						callActionEnable={callActionEnable}
						buttonLink={buttonLink}
						callToActionGlobalTypography={callToActionGlobalTypography}
						fullWidthButton={infoBoxLayout !== "smart-info-box-layout-four" && fullWidthButton}
						currentCAIcon={currentCAIcon}
					/>
				)}

				{infoBoxLayout === "smart-info-box-layout-four" && titleEnable && (
					<Title
						titleTag={titleTag}
						titleText={titleText}
						titleHoverEffects={titleHoverEffects}
						subTitleEnable={subTitleEnable}
						subTitleTag={subTitleTag}
						subTitleText={subTitleText}
						setAttributes={setAttributes}
						togglePanelBody={togglePanelBody}
						titleGlobalTypography={titleGlobalTypography}
						subTitleGlobalTypography={subTitleGlobalTypography}
					/>
				)}
			</>
		);
	};

	const layoutThree = () => {
		return (
			<>
				<div className="sp-smart-post-info-box-icon-wrapper">
					<Icon
						iconEnable={iconEnable}
						iconSource={iconSource}
						iconSourceCustom={iconSourceCustom}
						iconOverlayEnable={iconOverlayEnable}
						iconHoverEffects={iconHoverEffects}
						currentIcon={currentIcon}
						togglePanelBody={togglePanelBody}
					/>
				</div>
				<article className="sp-smart-post-info-box-content-wrapper">
					<Badge
						badgeEnable={badgeEnable}
						badgeLabel={badgeLabel}
						badgePosition={badgePosition}
						togglePanelBody={togglePanelBody}
						badgeGlobalTypography={badgeGlobalTypography}
					/>
					<Overlay
						infoBoxBg={infoBoxBg}
						imageOverlayEnable={imageOverlayEnable}
						imageOverlayHoverEnable={imageOverlayHoverEnable}
					/>

					{titleEnable && (
						<Title
							titleTag={titleTag}
							titleText={titleText}
							titleHoverEffects={titleHoverEffects}
							subTitleEnable={subTitleEnable}
							subTitleTag={subTitleTag}
							subTitleText={subTitleText}
							setAttributes={setAttributes}
							togglePanelBody={togglePanelBody}
							titleGlobalTypography={titleGlobalTypography}
							subTitleGlobalTypography={subTitleGlobalTypography}
						/>
					)}

					<Separator separatorEnable={separatorEnable} togglePanelBody={togglePanelBody} />

					{descriptionEnable && (
						<Description
							descText={descText}
							dropCapsEnable={dropCapsEnable}
							setAttributes={setAttributes}
							togglePanelBody={togglePanelBody}
							desGlobalTypography={desGlobalTypography}
						/>
					)}

					{ratingEnable && (
						<Rating
							iconsNum={iconsNum}
							ratingIconSource={ratingIconSource}
							ratingIconSourceLibrary={ratingIconSourceLibrary}
							ratingValueEnable={ratingValueEnable}
							scale={scale}
							togglePanelBody={togglePanelBody}
							ratingGlobalTypography={ratingGlobalTypography}
							currentRatingIconSourceLibrary={currentRatingIconSourceLibrary}
						/>
					)}

					{callActionEnable && (
						<CallToActionButton
							linkingType={linkingType}
							caButtonText={caButtonText}
							setAttributes={setAttributes}
							togglePanelBody={togglePanelBody}
							buttonIconEnable={buttonIconEnable}
							cAIconSource={cAIconSource}
							cAIconSourceLibrary={cAIconSourceLibrary}
							cAIconSourceCustom={cAIconSourceCustom}
							callActionEnable={callActionEnable}
							buttonLink={buttonLink}
							callToActionGlobalTypography={callToActionGlobalTypography}
							fullWidthButton={infoBoxLayout !== "smart-info-box-layout-four" && fullWidthButton}
							currentCAIcon={currentCAIcon}
						/>
					)}
				</article>
			</>
		);
	};

	return (
		<div
			className={`sp-smart-post-wrapper sp-panel-data sp-smart-post-info-box-wrapper sp-smart-post-info-box-editor-page ${advancedAdditionalClass}`}
			id={uniqueId}
			data-component="general"
			onClick={togglePanelBody}
		>
			{callActionEnable && linkingType === "fullBox" ? (
				<div className="sp-smart-post-info-box-fullbox-link">
					<section className={`sp-smart-post-info-box ${infoBoxLayout}`}>
						{overlayOnHover && (
							<div className="sp-smart-post-info-button-fullbox-overlay">
								{externalLinkIcon && (
									<span>
										<svg
											className="sp-smart-post-info-button-fullbox-overlay-svg"
											xmlns="http://www.w3.org/2000/svg"
											width="40"
											height="40"
											viewBox="0 0 40 40"
											fill="none"
										>
											<path
												d="M32.5001 7.5H20.8334V10H28.2323L18.2829 19.9494L20.0506 21.7172L30.0001 11.7678V19.1667H32.5001V7.5Z"
												fill="white"
											/>
											<path
												d="M10.8333 9.16667C8.99238 9.16667 7.5 10.6591 7.5 12.5V29.1667C7.5 31.0076 8.99238 32.5 10.8333 32.5H27.5C29.3409 32.5 30.8333 31.0076 30.8333 29.1667V24.1667H28.3333V29.1667C28.3333 29.6269 27.9602 30 27.5 30H10.8333C10.3731 30 10 29.6269 10 29.1667V12.5C10 12.0398 10.3731 11.6667 10.8333 11.6667H15.8333V9.16667H10.8333Z"
												fill="white"
											/>
										</svg>
									</span>
								)}
							</div>
						)}

						{(infoBoxLayout === "smart-info-box-layout-one" ||
							infoBoxLayout === "smart-info-box-layout-five") &&
							layoutOne()}
						{(infoBoxLayout === "smart-info-box-layout-two" ||
							infoBoxLayout === "smart-info-box-layout-four") &&
							layoutTwo()}
						{infoBoxLayout === "smart-info-box-layout-three" && layoutThree()}
					</section>
				</div>
			) : (
				<section className={`sp-smart-post-info-box ${infoBoxLayout}`}>
					{(infoBoxLayout === "smart-info-box-layout-one" ||
						infoBoxLayout === "smart-info-box-layout-five") &&
						layoutOne()}
					{(infoBoxLayout === "smart-info-box-layout-two" ||
						infoBoxLayout === "smart-info-box-layout-four") &&
						layoutTwo()}
					{infoBoxLayout === "smart-info-box-layout-three" && layoutThree()}
				</section>
			)}
		</div>
	);
}

export default EditHtml;
