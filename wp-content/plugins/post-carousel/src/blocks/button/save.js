import { useBlockProps } from "@wordpress/block-editor";
import { arrowIcons } from "../../controls/constants";
import classNames from "classnames";

const ButtonSave = ({ attributes }) => {
	const {
		uniqueId,
		buttonLabel,
		iconSource,
		buttonStyle,
		hoverEffects,
		buttonLink,
		openNewTab,
		enableIcon,
		additionalCssClass,
		buttonLabelEnable,
		buttonLabelGlobalTypography,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: additionalCssClass,
	});

	const BtnIcon = arrowIcons[iconSource];

	return (
		<div {...blockProps}>
			<div
				className={classNames(
					"sp-smart-post-wrapper",
					"sp-smart-post-button-editor-page",
					"sp-smart-post-button-wrapper"
				)}
				id={uniqueId}
			>
				<a
					href={buttonLink}
					target={openNewTab ? "_blank" : undefined}
					className={`sp-smart-post-btn btn-${buttonStyle} ${hoverEffects}`}
					rel="noreferrer"
				>
					<div className="button-label">
						<div className="front">
							{enableIcon && (
								<span
									className="icon"
									aria-label="button arrow icon"
									style={{
										lineHeight: "1",
									}}
								>
									<i aria-hidden="true">
										<BtnIcon />
									</i>
								</span>
							)}
							{buttonLabelEnable && (
								<span
									className={classNames(
										"sp-rich-text",
										"sp-btn-label",
										buttonLabelGlobalTypography?.class ? buttonLabelGlobalTypography.class : ""
									)}
								>
									{buttonLabel}
								</span>
							)}
						</div>

						{hoverEffects === "flip" && (
							<div className="back">
								{iconSource && (
									<span className="icon" aria-label="flip on hover button arrow icon">
										<i className={`sp-icon-${iconSource}`} aria-hidden="true">
											<BtnIcon />
										</i>
									</span>
								)}
								{buttonLabelEnable && (
									<span
										className={classNames(
											"sp-rich-text",
											"sp-btn-label",
											buttonLabelGlobalTypography?.class ? buttonLabelGlobalTypography.class : ""
										)}
									>
										{buttonLabel}
									</span>
								)}
							</div>
						)}
					</div>
				</a>
			</div>
		</div>
	);
};

export default ButtonSave;
