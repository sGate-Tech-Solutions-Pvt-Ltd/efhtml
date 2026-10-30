import { useBlockProps, RichText } from "@wordpress/block-editor";
import {
	ArrowRight,
	Square,
	Check,
	CheckCircle,
	ChevronRight,
	Dot,
	SquareBorder,
	RightArrow,
	Hand,
	FillStar,
	NpArrow,
	BulletPoint,
	CircleIcon,
	NumberIcon,
} from "./icons";

const ICON_COMPONENTS = {
	CheckCircle,
	Dot,
	Square,
	FillStar,
	NpArrow,
	BulletPoint,
	RightArrow,
	Check,
	CircleIcon,
	SquareBorder,
	Hand,
	ArrowRight,
	ChevronRight,
	NumberIcon,
};

const ICON_SOURCES = {
	ICON_SET: "iconSet",
	LIBRARY: "library",
	CUSTOM: "custom",
};

const getEffectiveAttr = (childAttr, parentAttr, defaultValue) => childAttr ?? parentAttr ?? defaultValue;

function IconRenderer({ sourceOfIcon, svgIconName, iconsClassName, imageSrc, imageAlt, currentIcon }) {
	const iconContent = () => {
		switch (sourceOfIcon) {
			case ICON_SOURCES.ICON_SET:
				if (svgIconName === "NumberIcon") {
					return null;
				}
				const IconComponent = ICON_COMPONENTS[svgIconName] || ICON_COMPONENTS.Dot;
				return <IconComponent />;

			case ICON_SOURCES.LIBRARY:
				return currentIcon ? (
					<svg width={currentIcon?.width} height={currentIcon?.height} viewBox={currentIcon?.viewBox}>
						<path d={currentIcon?.path} />
					</svg>
				) : null;

			case ICON_SOURCES.CUSTOM:
				return imageSrc ? (
					<>
						<img src={imageSrc} alt={imageAlt || "Custom icon"} />
						<div className="sp-smart-post-list-overlay" />
					</>
				) : null;

			default:
				return null;
		}
	};

	const iconContainerClasses = () => {
		let suffix = `-svg ${sourceOfIcon}`;
		if (sourceOfIcon === ICON_SOURCES.CUSTOM) {
			suffix = `-img ${sourceOfIcon}`;
		}
		return `sp-smart-post-list-icon${suffix}`;
	};

	return (
		<div className="sp-smart-post-list-icon-wrapper ">
			<div className="sp-smart-post-list-icon-container">
				<div className={iconContainerClasses()}>{iconContent()}</div>
			</div>
		</div>
	);
}

function TitleRenderer({ titleText, enabled }) {
	if (!enabled) {
		return null;
	}

	return (
		<RichText.Content
			tagName="p"
			value={titleText}
			className="sp-smart-post-list-title "
			placeholder="Enter list title..."
		/>
	);
}

function DescriptionRenderer({ descriptionText, enabled }) {
	if (!enabled) {
		return null;
	}

	return (
		<RichText.Content
			tagName="p"
			value={descriptionText}
			className="sp-smart-post-list-description "
			placeholder="Enter description..."
		/>
	);
}

function BadgeRenderer({ badgeLabel, visible }) {
	if (!visible) {
		return null;
	}

	return <span className="sp-smart-post-list-badge ">{badgeLabel}</span>;
}

const SmartListSave = ({ attributes }) => {
	const {
		advancedAdditionalClass,
		uniqueId,
		titleText,
		descriptionText,
		badgeLabel,
		openInNewTab,
		noFollowLink,
		linkURL,
		currentIcon,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: ["sp-smart-post-smart-list-front-end", advancedAdditionalClass || ""].join(" ").trim(),
	});

	const iconProps = {
		sourceOfIcon: getEffectiveAttr(attributes.iconSource, attributes.iconSourceParent, ICON_SOURCES.LIBRARY),
		enabledIcon: getEffectiveAttr(attributes.iconEnable, attributes.iconEnableParent, false),
		svgIconName: getEffectiveAttr(attributes.svgIconName, attributes.parentSvgIconName, "Dot"),
		iconsClassName: getEffectiveAttr(attributes.iconName, attributes.parentIconName, ""),
		imageSrc: getEffectiveAttr(attributes.iconSourceCustom?.url, attributes.parentIconSourceCustom?.url, ""),
		imageAlt: getEffectiveAttr(attributes.iconSourceCustom?.alt, attributes.parentIconSourceCustom?.alt, ""),
		currentIcon: currentIcon,
	};

	const titleProps = {
		titleText,
		enabled: getEffectiveAttr(attributes.listTitleEnable, attributes.parentListTitleEnable, false),
	};

	const descriptionProps = {
		descriptionText,
		enabled: getEffectiveAttr(attributes.descriptionEnable, attributes.parentDescriptionEnable, false),
	};

	const badgeProps = {
		badgeLabel,
		visible: (attributes.badgeEnable || false) && badgeLabel && badgeLabel.length > 0,
	};

	const rels = [];
	if (openInNewTab) {
		rels.push("noreferrer");
	}
	if (noFollowLink) {
		rels.push("nofollow");
	}
	let relAttr = "";
	if (openInNewTab && rels.length > 0) {
		relAttr = rels.join(" ");
	}
	const LinkTag = linkURL && linkURL !== "https://" ? "a" : "div";

	return (
		<div {...blockProps}>
			<li id={uniqueId} className="sp-smart-post-smart-list-wrapper">
				<LinkTag
					className="sp-smart-post-list-link"
					{...(linkURL && linkURL !== "https://"
						? {
								href: linkURL,
								target: openInNewTab ? "_blank" : "_self",
								rel: relAttr,
							}
						: {})}
				>
					{iconProps.enabledIcon && <IconRenderer {...iconProps} />}

					<div className="sp-smart-post-list-text">
						{(titleProps.enabled || attributes.badgeEnable) && (
							<>
								<div className="sp-smart-post-list-title-wrapper">
									<TitleRenderer {...titleProps} />
									<BadgeRenderer {...badgeProps} />
								</div>
							</>
						)}
						<DescriptionRenderer {...descriptionProps} />
					</div>
				</LinkTag>
			</li>
		</div>
	);
};

export default SmartListSave;
