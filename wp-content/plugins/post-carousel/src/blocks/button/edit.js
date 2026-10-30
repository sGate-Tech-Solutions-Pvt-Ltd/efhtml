import { useEffect, useMemo } from "@wordpress/element";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyRightIcon, panelBodyTitleIcon } from "../../icons/icons";
import { jsonStringify } from "../shared/helpFn";
import dynamicCssFn from "./dynamicCss";
import Inspector from "./inspect";
import { googleFonts, useDeviceType } from "../../controls/controls";
import { arrowIcons } from "../../controls/constants";
import classNames from "classnames";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const ButtonEdit = (props) => {
	const { attributes, setAttributes } = props;
	const currentDevice = useDeviceType();
	const {
		uniqueId,
		buttonLabel,
		iconSource,
		buttonStyle,
		hoverEffects,
		enableIcon,
		buttonLabelTypography,
		additionalCssClass,
		customCss,
		fontListsEditPage,
		buttonLabelEnable,
		buttonLabelGlobalTypography,
	} = attributes;

	const googleFontLists = [buttonLabelTypography];

	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists),
		});
	}, googleFontLists);

	const blockProps = useBlockProps({
		className: additionalCssClass,
	});

	const blockStyling = useMemo(() => {
		return dynamicCssFn(attributes, "frontend", currentDevice);
	}, [attributes, currentDevice]);

	useEffect(() => {
		if (buttonStyle !== "default" && hoverEffects === "flip") {
			setAttributes({ hoverEffects: "ghostDefault" });
		}
	}, [buttonStyle]);

	const BtnIcon = arrowIcons[iconSource];

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>

			<InspectorControl
				TitleIcon={panelBodyTitleIcon}
				RightIcon={panelBodyRightIcon}
				Inspector={Inspector}
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<div
				className={classNames(
					"sp-smart-post-wrapper",
					"sp-smart-post-button-editor-page",
					"sp-smart-post-button-wrapper"
				)}
				id={uniqueId}
			>
				<button className={`sp-smart-post-btn  btn-${buttonStyle} ${hoverEffects}`}>
					<div className="button-label">
						<div className="front">
							{enableIcon && (
								<span
									aria-label="arrow icon"
									className="icon"
									style={{
										fontSize: "14px",
										lineHeight: "1",
										display: "inline-block",
									}}
								>
									<i
										aria-hidden={true}
										className={`sp-icon-${iconSource}`}
										// style={ {
										// 	display: 'block',
										// 	width: '1em',
										// 	height: '1em',
										// } }
									>
										<BtnIcon />
									</i>
								</span>
							)}
							{buttonLabelEnable && (
								<RichText
									tagName="span"
									className={classNames(
										"sp-rich-text",
										"sp-btn-label",
										buttonLabelGlobalTypography?.class ? buttonLabelGlobalTypography.class : ""
									)}
									value={buttonLabel}
									onChange={(newVal) => setAttributes({ buttonLabel: newVal })}
									allowedFormats={[]} // optional: no bold/italic/etc.
									placeholder="Enter label"
								/>
							)}
						</div>

						{hoverEffects === "flip" && (
							<div className="back">
								{enableIcon && (
									<span
										aria-label="button flip on hover arrow icon"
										className="icon"
										style={{
											fontSize: "14px",
											lineHeight: "1",
											display: "inline-block",
										}}
									>
										<i
											aria-hidden={true}
											className={`sp-icon-${iconSource}`}
											// style={ {
											// 	display: 'block',
											// 	width: '1em',
											// 	height: '1em',
											// } }
										>
											<BtnIcon />
										</i>
									</span>
								)}
								{buttonLabelEnable && (
									<RichText
										tagName="span"
										className={classNames(
											"sp-rich-text",
											"sp-btn-label",
											buttonLabelGlobalTypography?.class ? buttonLabelGlobalTypography.class : ""
										)}
										value={buttonLabel}
										onChange={(newVal) =>
											setAttributes({
												buttonLabel: newVal,
											})
										}
										allowedFormats={[]} // optional: no bold/italic/etc.
										placeholder="Enter label"
									/>
								)}
							</div>
						)}
					</div>
				</button>
			</div>
		</div>
	);
};

export default compose(addInitialAttr)(ButtonEdit);
