import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useMemo, useState } from "@wordpress/element";
import InspectorControl from "../../components/inspectorControls/inspectorControls";
import { panelBodyTitleIcon, panelBodyRightIcon } from "../../icons/icons";
import Inspector from "./inspect";
import dynamicCssFn from "./dynamicCss";
import { jsonStringify } from "../shared/helpFn";
import { PresetTemplate } from "./smartImgTemplate";
import RenderSmartImage from "./render";
import { useSelect } from "@wordpress/data";
import preloader from "../../../public/assets/img/preloader.svg";
import imgCssDependency from "./imgCssDependency";
import { googleFonts } from "../../controls/controls";
import "./editor.scss";
import { compose } from "@wordpress/compose";
import addInitialAttr from "../shared/addInitialAttr";

const SmartImageEdit = ({ attributes, setAttributes }) => {
	const {
		fontListsEditPage,
		customCss,
		selectImage,
		selectImageSizes,
		selectImageId,
		imageAltText,
		imgTitleLabel,
		imgCaptionLabel,
		additionalCssClass,
		linkBtnTypography,
		imgTitleTypography,
		imgCaptionTypography,
	} = attributes;

	const [isPreloader, setIsPreloader] = useState(false);
	const blockProps = useBlockProps({ className: additionalCssClass });

	const blockStyling = useMemo(
		() => dynamicCssFn(attributes, "frontend"),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		imgCssDependency(attributes)
	);
	const googleFontLists = [linkBtnTypography, imgTitleTypography, imgCaptionTypography];
	useEffect(() => {
		setAttributes({
			fontLists: jsonStringify(googleFonts(googleFontLists, "frontend")),
			fontListsEditPage: googleFonts(googleFontLists),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, googleFontLists);

	const imageObject = useSelect(
		(select) => {
			// return select("core").getMedia(selectImageId) || {};
			return select("core").getEntityRecord("postType", "attachment", selectImageId) || {};
		},
		[selectImageId]
	);

	useEffect(() => {
		if (!imageObject) {
			return;
		}
		const srcset = imageObject?.media_details?.sizes
			? Object.values(imageObject.media_details.sizes)
					.map((size) => `${size.source_url} ${size.width}w`)
					.join(", ")
			: null;
		const newImgUrl = imageObject.url || imageObject.source_url;
		const data = {
			...imageObject,
			srcset,
			url: newImgUrl || selectImage?.insertUrl,
			insertUrl: selectImage?.insertUrl || "",
		};
		const imageSizes = imageObject?.media_details?.sizes
			? Object.keys(imageObject?.media_details?.sizes).map((size) => ({
					label: size,
					value: size,
				}))
			: [];
		setAttributes({
			selectImage: data,
			selectImageSizes: imageSizes,
			imageAltText: imageAltText ? imageAltText : data?.alt_text,
			imgTitleLabel: imgTitleLabel ? imgTitleLabel : data?.title?.raw,
			imgCaptionLabel: imgCaptionLabel ? imgCaptionLabel : data?.caption?.raw,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageObject]);

	return (
		<div {...blockProps}>
			<style>
				{fontListsEditPage}
				{blockStyling}
				{customCss}
			</style>
			{isPreloader && (
				<div className="sp-smart-image-upload-preloader">
					<img src={preloader} alt="Loading..." />
				</div>
			)}
			<InspectorControl
				TitleIcon={panelBodyTitleIcon}
				RightIcon={panelBodyRightIcon}
				attributes={attributes}
				setAttributes={setAttributes}
				Inspector={Inspector}
			/>
			{!selectImageId && !selectImage?.insertUrl ? (
				<PresetTemplate
					attributes={{
						selectImage,
						selectImageId,
						selectImageSizes,
					}}
					setAttributes={setAttributes}
					setIsPreloader={setIsPreloader}
					isPreloader={isPreloader}
				/>
			) : (
				<RenderSmartImage
					attributes={attributes}
					setAttributes={setAttributes}
					setIsPreloader={setIsPreloader}
				/>
			)}
		</div>
	);
};
export default compose(addInitialAttr)(SmartImageEdit);
