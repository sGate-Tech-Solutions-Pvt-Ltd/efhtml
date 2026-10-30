import { useBlockProps, RichText } from "@wordpress/block-editor";

const Icon = ({ iconEnable, iconSource, iconSourceCustom, iconOverlayEnable, iconHoverEffects, currentIcon }) => {
	if (!iconEnable || (iconSource === "library" && !currentIcon) || (iconSource === "custom" && !iconSourceCustom)) {
		return null;
	}

	return (
		<div className="sp-smart-post-info-box-icon-container ">
			{iconSource === "library" ? (
				<span
					className={`sp-smart-post-info-box-icon ${
						iconOverlayEnable ? "icon-img-overlay" : ""
					} ${iconHoverEffects}`}
				>
					<svg width={currentIcon?.width} height={currentIcon?.height} viewBox={currentIcon?.viewBox}>
						<path d={currentIcon?.path} />
					</svg>
				</span>
			) : (
				<div
					className={`sp-smart-post-info-box-img ${
						iconOverlayEnable ? "icon-img-overlay" : ""
					} ${iconHoverEffects}`}
				>
					<img src={iconSourceCustom?.url} alt={iconSourceCustom?.alt || "Custom icon"} />
				</div>
			)}
		</div>
	);
};
const Title = ({
	titleTag,
	titleText,
	titleHoverEffects,
	subTitleEnable,
	subTitleTag,
	subTitleText,
	titleEnable,
	titleGlobalTypography,
	subTitleGlobalTypography,
}) => {
	if (!titleEnable) {
		return null;
	}
	return (
		<div className="sp-smart-post-info-box-title-container">
			<RichText.Content
				tagName={titleTag}
				value={titleText}
				className={`sp-smart-post-info-box-title title-hover-${titleHoverEffects} ${titleGlobalTypography?.class ? titleGlobalTypography?.class : ""}`}
			/>

			{subTitleEnable && (
				<RichText.Content
					tagName={subTitleTag}
					value={subTitleText}
					className={`sp-smart-post-info-box-sub-title ${subTitleGlobalTypography?.class ? subTitleGlobalTypography?.class : ""}`}
				/>
			)}
		</div>
	);
};
const Description = ({ descText, dropCapsEnable, descriptionEnable, desGlobalTypography }) => {
	if (!descriptionEnable) {
		return null;
	}

	return (
		<RichText.Content
			tagName="p"
			value={descText}
			className={`sp-smart-post-info-box-desc  ${
				dropCapsEnable ? "drop-caps" : ""
			} ${desGlobalTypography?.class ? desGlobalTypography?.class : ""}`}
		/>
	);
};
const Rating = ({
	iconsNum,
	ratingIconSource,
	ratingIconSourceLibrary,
	ratingValueEnable,
	scale,
	ratingEnable,
	ratingGlobalTypography,
	currentRatingIconSourceLibrary,
}) => {
	if (!ratingEnable) {
		return null;
	}

	const ratingIcons = Array(iconsNum).fill(null);

	return (
		<div
			className={`sp-smart-post-info-box-rating-wrapper ${ratingGlobalTypography?.class ? ratingGlobalTypography?.class : ""}`}
		>
			<div className={`sp-smart-post-info-box-rating-container ${ratingIconSource}`}>
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
};

const Separator = ({ separatorEnable }) => {
	if (!separatorEnable) {
		return null;
	}

	return <div className="sp-smart-post-info-box-separator-container"></div>;
};

const CallToActionIcon = ({
	buttonIconEnable,
	cAIconSource,
	cAIconSourceLibrary,
	cAIconSourceCustom,
	currentCAIcon,
}) => {
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
};

const CallToActionText = ({ caButtonText }) => {
	const buttonTextWithDefault = caButtonText?.trim() || "Learn More";
	return (
		<RichText.Content tagName="span" value={buttonTextWithDefault} className="sp-smart-post-info-box-cta-label" />
	);
};

const CallToActionButton = ({
	linkingType = "button",
	caButtonText,
	buttonIconEnable,
	cAIconSource,
	cAIconSourceLibrary,
	cAIconSourceCustom,
	buttonLink,
	openNewTab,
	callActionGlobalTypography,
	callActionEnable,
	currentCAIcon,
}) => {
	if (!callActionEnable) {
		return null;
	}
	if (linkingType === "fullBox") {
		return null;
	}

	return (
		<a
			href={buttonLink}
			target={`${openNewTab ? "_blank" : ""}`}
			className={`sp-smart-post-info-box-cta linking-type-${linkingType} sp-smart-post-info-box-cta-link ${callActionGlobalTypography?.class ? callActionGlobalTypography?.class : ""}`}
		>
			<CallToActionText caButtonText={caButtonText} />

			<CallToActionIcon
				buttonIconEnable={buttonIconEnable}
				cAIconSource={cAIconSource}
				cAIconSourceLibrary={cAIconSourceLibrary}
				cAIconSourceCustom={cAIconSourceCustom}
				currentCAIcon={currentCAIcon}
			/>
		</a>
	);
};

const Badge = ({ badgeEnable, badgeLabel, badgePosition, badgeGlobalTypography }) => {
	if (!badgeEnable || !badgeLabel) {
		return null;
	}
	return (
		<div
			className={`sp-smart-post-info-box-badge editor-selector-hover ${badgePosition} ${badgeGlobalTypography?.class ? badgeGlobalTypography?.class : ""}`}
		>
			<span className="sp-smart-post-info-box-badge-label">{badgeLabel}</span>
		</div>
	);
};

const Overlay = ({ infoBoxBg, imageOverlayEnable, imageOverlayHoverEnable }) => {
	const shouldShowOverlay =
		(infoBoxBg.color.style === "image" || infoBoxBg.hover.style === "image") &&
		(imageOverlayEnable || imageOverlayHoverEnable);

	if (!shouldShowOverlay) {
		return null;
	}

	return <div className="sp-smart-post-info-box-overlay"></div>;
};

const SmartInfoBoxSave = ({ attributes, clientId, name }) => {
	const {
		uniqueId,
		infoBoxLayout,
		iconEnable,
		iconSource,
		iconSourceLibrary,
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
		infoBoxBg,
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
		advancedAdditionalClass,
		iconName,
		buttonLink,
		openNewTab,
		additionalCssClass,
		titleGlobalTypography,
		subTitleGlobalTypography,
		desGlobalTypography,
		callToActionGlobalTypography,
		ratingGlobalTypography,
		badgeGlobalTypography,
		currentIcon,
		currentCAIcon,
		currentRatingIconSourceLibrary,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: additionalCssClass,
	});
	const iconsNum = 5;

	const layoutOne = () => {
		return (
			<>
				<Badge
					badgeEnable={badgeEnable}
					badgeLabel={badgeLabel}
					badgePosition={badgePosition}
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
				/>

				<Title
					titleTag={titleTag}
					titleText={titleText}
					titleHoverEffects={titleHoverEffects}
					subTitleEnable={subTitleEnable}
					subTitleTag={subTitleTag}
					subTitleText={subTitleText}
					titleEnable={titleEnable}
					titleGlobalTypography={titleGlobalTypography}
					subTitleGlobalTypography={subTitleGlobalTypography}
				/>

				<Separator separatorEnable={separatorEnable} />

				<Description
					descText={descText}
					dropCapsEnable={dropCapsEnable}
					descriptionEnable={descriptionEnable}
					desGlobalTypography={desGlobalTypography}
				/>

				<Rating
					iconsNum={iconsNum}
					ratingIconSource={ratingIconSource}
					ratingIconSourceLibrary={ratingIconSourceLibrary}
					ratingValueEnable={ratingValueEnable}
					scale={scale}
					ratingEnable={ratingEnable}
					ratingGlobalTypography={ratingGlobalTypography}
					currentRatingIconSourceLibrary={currentRatingIconSourceLibrary}
				/>

				<CallToActionButton
					linkingType={linkingType}
					caButtonText={caButtonText}
					buttonIconEnable={buttonIconEnable}
					cAIconSource={cAIconSource}
					cAIconSourceLibrary={cAIconSourceLibrary}
					cAIconSourceCustom={cAIconSourceCustom}
					buttonLink={buttonLink}
					openNewTab={openNewTab}
					callActionEnable={callActionEnable}
					callActionGlobalTypography={callToActionGlobalTypography}
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
					/>
					{infoBoxLayout === "smart-info-box-layout-two" && (
						<Title
							titleTag={titleTag}
							titleText={titleText}
							titleHoverEffects={titleHoverEffects}
							subTitleEnable={subTitleEnable}
							subTitleTag={subTitleTag}
							subTitleText={subTitleText}
							titleEnable={titleEnable}
							titleGlobalTypography={titleGlobalTypography}
							subTitleGlobalTypography={subTitleGlobalTypography}
						/>
					)}
					{infoBoxLayout === "smart-info-box-layout-four" && (
						<CallToActionButton
							linkingType={linkingType}
							caButtonText={caButtonText}
							buttonIconEnable={buttonIconEnable}
							cAIconSource={cAIconSource}
							cAIconSourceLibrary={cAIconSourceLibrary}
							cAIconSourceCustom={cAIconSourceCustom}
							buttonLink={buttonLink}
							openNewTab={openNewTab}
							callActionEnable={callActionEnable}
							callActionGlobalTypography={callToActionGlobalTypography}
							currentCAIcon={currentCAIcon}
						/>
					)}
				</div>
				<Separator separatorEnable={separatorEnable} />
				<Description
					descText={descText}
					dropCapsEnable={dropCapsEnable}
					descriptionEnable={descriptionEnable}
					desGlobalTypography={desGlobalTypography}
				/>
				<Rating
					iconsNum={iconsNum}
					ratingIconSource={ratingIconSource}
					ratingIconSourceLibrary={ratingIconSourceLibrary}
					ratingValueEnable={ratingValueEnable}
					scale={scale}
					ratingEnable={ratingEnable}
					ratingGlobalTypography={ratingGlobalTypography}
					currentRatingIconSourceLibrary={currentRatingIconSourceLibrary}
				/>
				{infoBoxLayout === "smart-info-box-layout-two" && (
					<CallToActionButton
						linkingType={linkingType}
						caButtonText={caButtonText}
						buttonIconEnable={buttonIconEnable}
						cAIconSource={cAIconSource}
						cAIconSourceLibrary={cAIconSourceLibrary}
						cAIconSourceCustom={cAIconSourceCustom}
						buttonLink={buttonLink}
						openNewTab={openNewTab}
						callActionEnable={callActionEnable}
						callActionGlobalTypography={callToActionGlobalTypography}
						currentCAIcon={currentCAIcon}
					/>
				)}
				{infoBoxLayout === "smart-info-box-layout-four" && (
					<Title
						titleTag={titleTag}
						titleText={titleText}
						titleHoverEffects={titleHoverEffects}
						subTitleEnable={subTitleEnable}
						subTitleTag={subTitleTag}
						subTitleText={subTitleText}
						titleEnable={titleEnable}
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
					/>
				</div>
				<article className="sp-smart-post-info-box-content-wrapper">
					<Badge
						badgeEnable={badgeEnable}
						badgeLabel={badgeLabel}
						badgePosition={badgePosition}
						badgeGlobalTypography={badgeGlobalTypography}
					/>

					<Overlay
						infoBoxBg={infoBoxBg}
						imageOverlayEnable={imageOverlayEnable}
						imageOverlayHoverEnable={imageOverlayHoverEnable}
					/>
					<Title
						titleTag={titleTag}
						titleText={titleText}
						titleHoverEffects={titleHoverEffects}
						subTitleEnable={subTitleEnable}
						subTitleTag={subTitleTag}
						subTitleText={subTitleText}
						titleEnable={titleEnable}
						titleGlobalTypography={titleGlobalTypography}
						subTitleGlobalTypography={subTitleGlobalTypography}
					/>
					<Separator separatorEnable={separatorEnable} />
					<Description
						descText={descText}
						dropCapsEnable={dropCapsEnable}
						descriptionEnable={descriptionEnable}
						desGlobalTypography={desGlobalTypography}
					/>
					<Rating
						iconsNum={iconsNum}
						ratingIconSource={ratingIconSource}
						ratingIconSourceLibrary={ratingIconSourceLibrary}
						ratingValueEnable={ratingValueEnable}
						scale={scale}
						ratingEnable={ratingEnable}
						ratingGlobalTypography={ratingGlobalTypography}
						currentRatingIconSourceLibrary={currentRatingIconSourceLibrary}
					/>
					<CallToActionButton
						linkingType={linkingType}
						caButtonText={caButtonText}
						buttonIconEnable={buttonIconEnable}
						cAIconSource={cAIconSource}
						cAIconSourceLibrary={cAIconSourceLibrary}
						cAIconSourceCustom={cAIconSourceCustom}
						buttonLink={buttonLink}
						openNewTab={openNewTab}
						callActionEnable={callActionEnable}
						callActionGlobalTypography={callToActionGlobalTypography}
						currentCAIcon={currentCAIcon}
					/>
				</article>
			</>
		);
	};

	return (
		<div {...blockProps}>
			<div
				className={`sp-smart-post-wrapper sp-smart-post-info-box-wrapper sp-smart-post-info-box-front-page ${advancedAdditionalClass}`}
				id={uniqueId}
			>
				{callActionEnable && linkingType === "fullBox" ? (
					<a
						className="sp-smart-post-info-box-fullbox-link"
						href={buttonLink}
						target={`${openNewTab ? "_blank" : ""}`}
					>
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
					</a>
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
		</div>
	);
};

export default SmartInfoBoxSave;
