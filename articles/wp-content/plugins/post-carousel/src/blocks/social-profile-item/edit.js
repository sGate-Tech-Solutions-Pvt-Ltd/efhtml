import { useBlockProps } from "@wordpress/block-editor";
import { panelBodyRightIcon } from "../../icons/icons";
import { useEffect, useMemo } from "@wordpress/element";
import dynamicCssFn from "./dynamicCss";
import { InspectorControl } from "../../components";
import { Inspector } from "./inspector";
import { capitalizeWords, useDeviceType } from "../../controls/controls";
import { useSelect } from "@wordpress/data";
import classNames from "classnames";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const SocialItemEdit = ({ attributes, setAttributes, clientId, isSelected }) => {
	const {
		blockName,
		uniqueId,
		socialSingleLinkRelation,
		socialSingleIconType,
		socialSingleIcon,
		socialSingleImage,
		socialSingleLabel,
		socialSingleSubText,
		iconEnableParent,
		labelEnableParent,
		subTextEnableParent,
		socialSingleProfile,
		additionalCssClass,
		socialLabelGlobalTypographyParent,
		socialSubTextGlobalTypographyParent,
	} = attributes;

	const blockProps = useBlockProps({
		className: additionalCssClass,
	});
	const haveLabel = socialSingleLabel.trim();
	const haveSubText = socialSingleSubText.trim();
	const deviceType = useDeviceType();

	const parentAttr = useSelect(
		(select) => {
			const { getBlock, getBlockRootClientId } = select("core/block-editor");
			const parentClientId = getBlockRootClientId(clientId);
			if (!parentClientId) {
				return null;
			}

			return getBlock(parentClientId)?.attributes ?? null;
		},
		[clientId]
	);

	useEffect(() => {
		if (!blockName) {
			const singleSubText = socialSingleProfile === "facebook" ? "Like" : "Follow";
			setAttributes({
				socialSingleLabel: socialSingleLabel ? socialSingleLabel : capitalizeWords(socialSingleProfile),
				socialSingleSubText: socialSingleSubText ? socialSingleSubText : singleSubText,
				socialSingleContentAreaBgBlur: { value: 0, unit: "%" },
				layoutParent: parentAttr?.layout,
				labelEnableParent: parentAttr?.socialLabelEnable,
				subTextEnableParent: parentAttr?.socialSubTextEnable,
			});
		}
	}, [parentAttr]);

	const blockStyling = useMemo(() => dynamicCssFn(attributes, "frontend", deviceType), [attributes, deviceType]);

	return (
		<>
			{isSelected && (
				<InspectorControl
					RightIcon={panelBodyRightIcon}
					attributes={attributes}
					setAttributes={setAttributes}
					Inspector={Inspector}
					templateLibrary={"google.com"}
				/>
			)}
			<style>{blockStyling}</style>
			<div {...blockProps}>
				<div id={uniqueId} className={classNames("sp-social-profile-item-container", "sp-pointer")}>
					<a className="sp-social-profile-item-wrapper" rel={socialSingleLinkRelation}>
						<div className="sp-social-profile-item">
							{/** Social Profile Single Item Icon/Image */}
							{"none" !== socialSingleIconType && iconEnableParent && (
								<>
									<div className="sp-social-profile-item-icon-wrapper">
										{"icon" === socialSingleIconType && (
											<div
												className={`sp-social-profile-item-icon sp-social-icon-${socialSingleIcon}`}
											>
												<i
													className={`sp-icon-${socialSingleIcon} sp-social-profile-item-icon-class`}
												></i>
											</div>
										)}
										{"image" === socialSingleIconType && socialSingleImage && (
											<div className={"sp-social-profile-item-image"}>
												<img
													src={socialSingleImage.url}
													alt={socialSingleImage.alt}
													className="sp-social-image wp-image"
												/>
											</div>
										)}
									</div>
								</>
							)}
							{/* { 'social-profiles-layout-three' ===
								layoutParent && ( */}
							<span className="sp-social-profile-icon-divider"></span>
							{/* ) } */}
							{(haveLabel || haveSubText) && (
								<>
									{/** Social Profile Single Item Label & Sub Text */}
									<div className="sp-social-profile-item-text">
										{haveLabel && labelEnableParent && (
											<span
												className={classNames(
													"sp-social-profile-item-label",
													socialLabelGlobalTypographyParent?.class
														? socialLabelGlobalTypographyParent.class
														: ""
												)}
											>
												{socialSingleLabel}
											</span>
										)}
										{haveSubText && subTextEnableParent && (
											<span
												className={classNames(
													"sp-social-profile-item-sub-text",
													socialSubTextGlobalTypographyParent?.class
														? socialSubTextGlobalTypographyParent.class
														: ""
												)}
											>
												{socialSingleSubText}
											</span>
										)}
									</div>
								</>
							)}
						</div>
					</a>
				</div>
			</div>
		</>
	);
};

export default compose(addInitialAttr)(SocialItemEdit);
