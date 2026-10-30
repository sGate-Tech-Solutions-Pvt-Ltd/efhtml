import { __ } from "@wordpress/i18n";
import { Button, GradientPicker } from "@wordpress/components";
import "./editor.scss";
import SpColorPicker from "../color/color";
import SPRangeControl from "../rangeControl/rangeControl";
import MediaPicker from "../mediaUpload/image";
import { useSelect } from "@wordpress/data";
import { priceLink } from "../../blocks/shared/helpFn";

const Background = ({
	attributes,
	attributesKey,
	setAttributes,
	label,
	items,
	transition,
	colorLabel = "Background Color",
	defaultColor,
	colorType,
	imageObj = { imageKey: "", backgroundImage: "" } || {},
	videoObj = { imageKey: "", backgroundImage: "" } || {},
	onStateUpdate = false,
	pro = false,
}) => {
	const { defaultGradients, customGradients } = useSelect((select) => {
		const settings = select("smartpost/global-settings");
		return {
			customGradients: settings?.getCustomGradients() || [],
			defaultGradients: settings?.getDefaultGradient() || [],
		};
	}, []);

	// Set background type
	const setBgType = (newValue) => {
		if (onStateUpdate && "color" === colorType) {
			onStateUpdate(attributesKey, { ...attributes, color: { ...attributes.color, style: newValue } });
		}
		if (onStateUpdate && "hover" === colorType) {
			onStateUpdate(attributesKey, { ...attributes, hover: { ...attributes.hover, style: newValue } });
		}
		if (!onStateUpdate && "color" === colorType) {
			setAttributes({
				[attributesKey]: {
					...attributes,
					color: { ...attributes.color, style: newValue },
				},
			});
		}
		if (!onStateUpdate && "hover" === colorType) {
			setAttributes({
				[attributesKey]: {
					...attributes,
					hover: { ...attributes.hover, style: newValue },
				},
			});
		}
	};

	const gradientValue =
		attributes[colorType]?.gradient ||
		"linear-gradient(90deg, rgba(0, 0, 0, 0.68) 0.09%, rgba(0, 0, 0, 0.07) 99.95%)";

	return (
		<>
			<div className={`sp-smart-post-background sp-smart-post-component-mb${pro ? " sp-is-pro" : ""}`}>
				{/* Background type */}
				<div className={`sp-smart-post-background-control sp-smart-post-d-flex sp-smart-post-component-mb`}>
					<span className="sp-smart-post-component-title">
						{label}
						{pro && <a target="_blank" href={priceLink} className="sp-smart-pro-text">(Pro)</a>}
					</span>
					<div className={`sp-smart-post-background-left`}>
						{items?.map((item, i) => (
							<Button
								className={attributes[colorType]?.style === item.value ? "active" : ""}
								key={i}
								value={item.value}
								onClick={(e) => setBgType(e.target.closest("button").value)}
							>
								<span>{item.label}</span>
								{<p>{item.tooltip}</p>}
							</Button>
						))}
					</div>
				</div>
				<>
					{"bgColor" === attributes[colorType]?.style && (
						<>
							<SpColorPicker
								label={colorLabel}
								value={attributes[colorType].solidColor}
								onChange={(newColor) =>
									onStateUpdate
										? onStateUpdate(attributesKey, {
												...attributes,
												[colorType]: {
													...attributes[colorType],
													solidColor: newColor,
												},
											})
										: setAttributes({
												[attributesKey]: {
													...attributes,
													[colorType]: {
														...attributes[colorType],
														solidColor: newColor,
													},
												},
											})
								}
								defaultColor={defaultColor}
							/>
							{"hover" === colorType && transition && (
								<SPRangeControl
									label={__("Transition", "post-carousel")}
									setAttributes={setAttributes}
									attributes={transition.value}
									units={false}
									step={0.1}
									min={0}
									max={30}
									defaultValue={{ unit: "px", value: 0.3 }}
									attributesKey={transition.key}
								/>
							)}
						</>
					)}
					{"gradient" === attributes[colorType]?.style && (
						<GradientPicker
							// value={ attributes[ colorType ].gradient }
							value={gradientValue}
							gradients={[...(defaultGradients ?? []), ...(customGradients ?? [])]}
							onChange={(newValue) =>
								onStateUpdate
									? onStateUpdate(attributesKey, {
											...attributes,
											[colorType]: {
												...attributes[colorType],
												gradient: newValue,
											},
										})
									: setAttributes({
											[attributesKey]: {
												...attributes,
												[colorType]: {
													...attributes[colorType],
													gradient: newValue,
												},
											},
										})
							}
						/>
					)}

					{"image" === attributes[colorType]?.style && (
						<MediaPicker
							label={__("Image", "post-carousel")}
							imageKey={imageObj?.imageKey}
							enableImageSize={false}
							setAttributes={setAttributes}
							backgroundImage={imageObj?.backgroundImage}
						/>
					)}
					{"video" === attributes[colorType]?.style && (
						<MediaPicker
							label={__("Video", "post-carousel")}
							imageKey={videoObj.imageKey}
							mediaType="video"
							slug="video"
							enableImageSize={false}
							setAttributes={setAttributes}
							backgroundImage={videoObj.backgroundImage}
						/>
					)}
				</>
			</div>
		</>
	);
};

export default Background;
