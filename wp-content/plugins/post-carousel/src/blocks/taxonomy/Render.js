import { colorControls, jsonParse, randomSolidColor, stringTrim } from "../shared/helpFn";
import { useQueryTerms } from "./query";
import { hoverAnimate, useOverlay } from "./helpFunc";
import { useEffect, useState } from "@wordpress/element";
import { breakpoint } from "../../controls/controls";
import { usePanelBodyContext } from "../../context";
import classNames from "classnames";

export default function Render({ attributes }) {
	const {
		icon,
		taxonomyIconStyle,
		layout,
		titleEnable,
		noResultFoundText,
		countEnable,
		displayOverlyThum,
		displayOverlyHoverThum,
		hoverAnimation,
		excerptShow,
		excerptLength,
		imageEnable,
		imageOverlay,
		hoverEffect,
		afterCount,
		beforeCount,
		counterMultiColorBg,
		limit = 6,
		contentMultiColorBg,
		postCardBg,
		showHideDivider,
		postType,
		SelectTerms,
		taxonomyType,
		emptyCategory,
		allTaxonomyTerm,
		excludeTerms,
		titleGlobalTypography,
		excerptGlobalTypography,
		counterGlobalTypography,
	} = attributes;

	const { overlayColor, overlayHoverColor } = useOverlay(attributes);
	const [randomColor, setRandomColor] = useState(randomSolidColor(imageOverlay));

	const { togglePanelBody } = usePanelBodyContext();

	useEffect(() => {
		setRandomColor(randomSolidColor(imageOverlay));
	}, [imageOverlay]);

	const terms = useQueryTerms(
		(attributes = {
			postType,
			SelectTerms,
			taxonomyType,
			emptyCategory,
			allTaxonomyTerm,
			excludeTerms,
			limit,
		})
	);

	const { transformValue, initialValue } = hoverAnimate(hoverAnimation, layout);
	const isLayoutFiveSix = ["taxonomy-layout-five", "taxonomy-layout-six"].includes(layout);
	const placeholderUrl = `${sp_smart_post_block_localize.placeholderImg}public/assets/img/placeholder.png`;
	const deviceType = breakpoint();

	const getThumbnail = (term) => term?.category_thumbnail || placeholderUrl;
	const getStyle = (term) => ({
		"--bg-url": displayOverlyThum ? `url(${getThumbnail(term)})` : "none",
		"--hover-bg-url": displayOverlyHoverThum
			? `url(${getThumbnail(term)})`
			: colorControls(postCardBg.hover.style, postCardBg.hover.solidColor, postCardBg.hover.gradient),
		"--overlay-color": displayOverlyThum && overlayColor,
		"--overlay-hover-color": overlayHoverColor,
	});

	const getTaxonomyClass = () =>
		[
			"sp-smart-post-taxonomy-info",
			layout !== "taxonomy-layout-one" && "sp-smart-post-taxonomy-info-overlay",
			displayOverlyThum && "sp-taxonomy-overlay",

			displayOverlyHoverThum && "sp-taxonomy-hover-overlay ",
			layout === "taxonomy-layout-one" && showHideDivider && "sp-smart-post-taxonomy-info-layout-one",
		]
			.filter(Boolean)
			.join(" ");

	const shouldShowExcerpt =
		excerptShow &&
		[
			"taxonomy-layout-one",
			"taxonomy-layout-two",
			"taxonomy-layout-three",
			"taxonomy-layout-five",
			"taxonomy-layout-six",
		].includes(layout);

	const shouldShowCountInName = countEnable && ["taxonomy-layout-four", "taxonomy-layout-eight"].includes(layout);

	const shouldShowBeforeAfterCount = ["taxonomy-layout-seven", "taxonomy-layout-eight"].includes(layout);

	const renderExcerpt = (term) =>
		shouldShowExcerpt && (
			<span
				className={classNames(
					"taxonomy-excerpt",
					excerptGlobalTypography?.class ? excerptGlobalTypography.class : ""
				)}
				onClick={(e) => togglePanelBody("excerpt", e)}
			>
				{stringTrim(term?.description, excerptLength)}
			</span>
		);

	const renderCount = (term) =>
		countEnable &&
		!shouldShowCountInName && (
			<div
				className="sp-smart-post-taxonomy-count"
				style={{
					background: counterMultiColorBg && term?.category_color,
				}}
				onClick={(e) => togglePanelBody("counter", e)}
			>
				<span className={counterGlobalTypography?.class ? counterGlobalTypography.class : ""}>
					{shouldShowBeforeAfterCount && beforeCount}
					{term?.count}
					{shouldShowBeforeAfterCount && afterCount}{" "}
					{layout === "taxonomy-layout-three" &&
						deviceType !== "Mobile" &&
						(term?.count <= 1 ? "Post" : "Posts")}
				</span>
			</div>
		);

	const renderTitle = (term) =>
		titleEnable && (
			<div className="sps-taxonomy-title-wrapper" onClick={(e) => togglePanelBody("title", e)}>
				{icon && <i style={{ zIndex: 2 }} className={`sp-icon-right-${taxonomyIconStyle}`} />}
				<span
					className={classNames(
						"sps-taxonomy-title-name",
						titleGlobalTypography?.class ? titleGlobalTypography.class : ""
					)}
				>
					{term?.name}
				</span>
			</div>
		);

	const renderFiveSixLayout = (term) => (
		<div className="sp-smart-post-taxonomy-info taxonomy-layout-five-six sp-smart-post-card" key={term?.id}>
			<div
				className={`taxonomy-layout-five-six-img-div sp-smart-post-card-image img-${hoverEffect}`}
				onClick={(e) => togglePanelBody("general", e)}
				style={{
					"--bg-url": `url(${getThumbnail(term)})`,
					"--hover-bg-url": `url(${getThumbnail(term)})`,
				}}
			>
				{imageEnable && (
					<>
						<img
							className="taxonomy-layout-five-six-img"
							src={getThumbnail(term)}
							alt={getThumbnail(term)}
						/>
						{imageOverlay !== "noOverlay" && (
							<div
								className={`taxonomy-image-overlay overlay-${imageOverlay} pointer-none`}
								style={{ background: randomColor }}
							/>
						)}
					</>
				)}
			</div>
			<div className="sp-smart-post-taxonomy-name">
				<div onClick={(e) => togglePanelBody("title", e)}>
					<span className="sp-smart-post-taxonomy-icon" />
					{titleEnable && (
						<span
							className={classNames(
								"sps-taxonomy-title-name",
								titleGlobalTypography?.class ? titleGlobalTypography.class : ""
							)}
						>
							{term?.name}
						</span>
					)}
					{countEnable && (
						<span className="sp-smart-post-taxonomy-count">
							<span>
								{beforeCount}
								{term?.count}
								{afterCount}
							</span>
						</span>
					)}
				</div>
				{term?.description && renderExcerpt(term)}
			</div>
		</div>
	);

	const renderDefaultLayout = (term) => (
		<div
			className={getTaxonomyClass()}
			style={{
				...(layout !== "taxonomy-layout-three" ? getStyle(term) : {}),
				"--transformValue": transformValue,
				"--initialValue": initialValue,
			}}
			key={term?.id}
		>
			<div
				className={[
					"sp-smart-post-taxonomy-name",
					layout === "taxonomy-layout-three" && "sp-smart-post-taxonomy-name-layout-three",
					displayOverlyThum && layout === "taxonomy-layout-three" && "sp-taxonomy-overlay-three",
					displayOverlyHoverThum && layout === "taxonomy-layout-three" && "sp-taxonomy-hover-overlay-three",
				]
					.filter(Boolean)

					.join(" ")}
				style={{
					...(["taxonomy-layout-eight", "taxonomy-layout-four"].includes(layout)
						? // contentMultiColorBg
							{ background: term?.category_color || "#FFF" }
						: {}),
					...(layout === "taxonomy-layout-three" ? getStyle(term) : {}),
				}}
			>
				<span style={{ zIndex: 2 }} className="sp-smart-post-taxonomy-icon"></span>
				{renderTitle(term)}
				{shouldShowCountInName && (
					<div
						className="sp-smart-post-taxonomy-count"
						style={{
							background: counterMultiColorBg && term?.category_color,
						}}
					>
						<span>
							{shouldShowBeforeAfterCount && beforeCount}
							{term?.count}
							{layout === "taxonomy-layout-eight" && afterCount}
						</span>
					</div>
				)}
				{term?.description && renderExcerpt(term)}
			</div>
			{renderCount(term)}
		</div>
	);

	return (
		<div className="sp-smart-post-taxonomy-render">
			{terms.length > 0 ? (
				terms.map((term) => (isLayoutFiveSix ? renderFiveSixLayout(term) : renderDefaultLayout(term)))
			) : (
				<p className="sp-taxonomy-no-results">{noResultFoundText || "No result found."}</p>
			)}
		</div>
	);
}
