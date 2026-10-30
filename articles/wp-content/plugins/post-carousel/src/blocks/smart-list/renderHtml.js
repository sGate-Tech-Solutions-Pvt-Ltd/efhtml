import { RichText } from "@wordpress/block-editor";
import { usePanelBodyContext } from "../../context";
import { useMemo, memo, useEffect } from "@wordpress/element";
import useIconList from "../../components/iconLibrary/useIconList";

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

function IconRenderer({
	sourceOfIcon,
	svgIconName,
	iconsClassName,
	imageSrc,
	imageAlt,
	onClick,
	togglePanelBody,
	currentIcon,
}) {
	const iconContent = useMemo(() => {
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
	}, [sourceOfIcon, svgIconName, iconsClassName, imageSrc, imageAlt, currentIcon]);

	const iconContainerClasses = () => {
		let suffix = `-svg ${sourceOfIcon}`;
		if (sourceOfIcon === ICON_SOURCES.CUSTOM) {
			suffix = `-img ${sourceOfIcon}`;
		}
		return `sp-smart-post-list-icon${suffix}`;
	};

	return (
		<div
			className="sp-smart-post-list-icon-wrapper editor-selector-hover sp-panel-data"
			onClick={togglePanelBody}
			data-component="icon-image"
		>
			<div className="sp-smart-post-list-icon-container">
				<div className={iconContainerClasses()}>{iconContent}</div>
			</div>
		</div>
	);
}

function TitleRenderer({ titleText, enabled, onTitleChange, togglePanelBody }) {
	if (!enabled) {
		return null;
	}

	return (
		<RichText
			tagName="p"
			value={titleText}
			className="sp-smart-post-list-title editor-selector-hover sp-panel-data"
			onChange={onTitleChange}
			onClick={togglePanelBody}
			data-component="content"
			placeholder="Enter list title..."
		/>
	);
}

function DescriptionRenderer({ descriptionText, enabled, onDescriptionChange, togglePanelBody }) {
	if (!enabled) {
		return null;
	}

	return (
		<RichText
			tagName="p"
			value={descriptionText}
			className="sp-smart-post-list-description editor-selector-hover sp-panel-data"
			onChange={onDescriptionChange}
			onClick={togglePanelBody}
			data-component="content"
			placeholder="Enter description..."
		/>
	);
}

function BadgeRenderer({ badgeLabel, visible, togglePanelBody }) {
	if (!visible) {
		return null;
	}

	return (
		<span
			className="sp-smart-post-list-badge editor-selector-hover sp-panel-data"
			onClick={togglePanelBody}
			data-component="badge"
		>
			{badgeLabel}
		</span>
	);
}

function RenderHtml({ attributes, setAttributes }) {
	const { uniqueId, titleText, descriptionText, badgeLabel, currentIcon } = attributes;
	const { togglePanelBody } = usePanelBodyContext();
	const iconList = useIconList();

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
		enabled: getEffectiveAttr(attributes.listTitleEnable, attributes.parentListTitleEnable, true),
		onTitleChange: handleTitleChange,
	};

	const descriptionProps = {
		descriptionText,
		enabled: getEffectiveAttr(attributes.descriptionEnable, attributes.parentDescriptionEnable, false),
		onDescriptionChange: handleDescriptionChange,
	};

	const badgeProps = {
		badgeLabel,
		visible: (attributes.badgeEnable || false) && badgeLabel && badgeLabel.length > 0,
	};

	function handleTitleChange(newValue) {
		setAttributes({ titleText: newValue });
	}

	function handleDescriptionChange(newValue) {
		setAttributes({ descriptionText: newValue });
	}

	useEffect(() => {
		setAttributes({ currentIcon: iconList[getEffectiveAttr(attributes.iconName, attributes.parentIconName, "")] });
	}, [iconList, attributes.iconName, attributes.parentIconName]);

	return (
		<li className="sp-smart-post-smart-list-wrapper" id={uniqueId}>
			<div className="sp-smart-post-list-link" data-component="general" onClick={togglePanelBody}>
				{iconProps.enabledIcon && <IconRenderer {...iconProps} togglePanelBody={togglePanelBody} />}

				<div className="sp-smart-post-list-text">
					{(titleProps.enabled || attributes.badgeEnable) && (
						<>
							<div className="sp-smart-post-list-title-wrapper">
								<TitleRenderer {...titleProps} togglePanelBody={togglePanelBody} />
								<BadgeRenderer {...badgeProps} togglePanelBody={togglePanelBody} />
							</div>
						</>
					)}
					<DescriptionRenderer {...descriptionProps} togglePanelBody={togglePanelBody} />
				</div>
			</div>
		</li>
	);
}

export default memo(RenderHtml);
