import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { Toggle, SPRangeControl, Spacing, TabControls } from "../../components";
import {
	FlexJustifyStart,
	FlexJustifyCenter,
	FlexJustifyEnd,
	FlexJustifySpaceBetween,
	FlexJustifySpaceAround,
	FlexJustifySpaceEvenly,
	AlignCenter,
	AlignLeft,
	AlignRight,
} from "../../icons/icons";
import SPToggleGroupControl from "../../components/toggleGroupControl/toggleGroupControl";
import { useState } from "@wordpress/element";
import { AdvancedTab, VisibilityTab } from "../shared/advancedTab";

const Inspector = ({ attributes, setAttributes }) => {
	const {
		fullWidthBtnEnable,
		buttonGap,
		buttonsMargin,
		buttonsHorizontalAlignment,
		buttonsVerticalAlignment,
		buttonsAlignment,
	} = attributes;
	const [openPanel, setOpenPanel] = useState("general");
	const toggleHandler = (value, panelName) => {
		if (value) {
			setOpenPanel(panelName);
		} else {
			setOpenPanel("");
		}
	};

	return (
		<>
			<PanelBody
				// initialOpen={true}
				title={__("General", "post-carousel")}
				className="sp-smart-post-section-heading-block-panel-body"
				onToggle={(value) => toggleHandler(value, "general")}
				opened={openPanel === "general"}
			>
				<>
					<SPToggleGroupControl
						attributes={buttonsAlignment}
						items={[
							{ label: "Horizontal", value: "horizontal" },
							{ label: "Vertical", value: "vertical" },
						]}
						onClick={(newVal) => {
							setAttributes({ buttonsAlignment: newVal });
						}}
					/>

					<Toggle
						label={__("Full Width Buttons", "post-carousel")}
						attributes={fullWidthBtnEnable}
						attributesKey={"fullWidthBtnEnable"}
						setAttributes={setAttributes}
						pro={true}
					/>

					<SPRangeControl
						label={__("Button Gap", "post-carousel")}
						attributes={buttonGap}
						attributesKey={"buttonGap"}
						setAttributes={setAttributes}
						units={["px", "Em"]}
						defaultValue={{ unit: "px", value: 16 }}
						max={100}
					/>

					{"horizontal" === buttonsAlignment ? (
						<>
							{!fullWidthBtnEnable && (
								<SPToggleGroupControl
									attributes={buttonsHorizontalAlignment}
									attributesKey={"buttonsHorizontalAlignment"}
									label={__("Horizontal Alignment", "post-carousel")}
									setAttributes={setAttributes}
									extraClass=" sp-svg-rotate-90-reverse"
									showTooltip={true}
									items={[
										{
											label: <FlexJustifyStart />,
											value: "flex-start",
											tooltip: "Flex Start"
										},
										{
											label: <FlexJustifyCenter />,
											value: "center",
											tooltip: "Center"
										},
										{
											label: <FlexJustifyEnd />,
											value: "flex-end",
											tooltip: "Flex End"
										},
										{
											label: <FlexJustifySpaceBetween />,
											value: "space-between",
											tooltip: "Space Between"
										},
										{
											label: <FlexJustifySpaceAround />,
											value: "space-around",
											tooltip: "Space Around"
										},
										{
											label: <FlexJustifySpaceEvenly />,
											value: "space-evenly",
											tooltip: "Space Evenly"
										},
									]}
								/>
							)}
						</>
					) : (
						// Hover State
						<>
							{!fullWidthBtnEnable && (
								<SPToggleGroupControl
									attributes={buttonsVerticalAlignment}
									attributesKey={"buttonsVerticalAlignment"}
									label={__("Vertical Alignment", "post-carousel")}
									setAttributes={setAttributes}
									showTooltip={true}
									items={[
										{
											label: <AlignLeft />,
											value: "flex-start",
											tooltip: "Flex Start"
										},
										{
											label: <AlignCenter />,
											value: "center",
											tooltip: "Center"
										},
										{
											label: <AlignRight />,
											value: "flex-end",
											tooltip: "Flex End"
										},
									]}
								/>
							)}
						</>
					)}

					<Spacing
						label={__("Margin", "post-carousel")}
						attributes={buttonsMargin}
						attributesKey={"buttonsMargin"}
						setAttributes={setAttributes}
						units={["px", "%", "em"]}
						// labelItem={ {
						// 	top: __( 'Top', 'post-carousel' ),
						// 	right: __( 'Right', 'post-carousel' ),
						// 	bottom: __( 'Bottom', 'post-carousel' ),
						// 	left: __( 'Left', 'post-carousel' ),
						// } }
						defaultValue={{
							unit: "px",
							value: {
								top: "0",
								right: "0",
								bottom: "0",
								left: "0",
							},
						}}
					/>
				</>
			</PanelBody>
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={openPanel === "advanced"}
				onToggle={(value) => toggleHandler(value, "advanced")}
			>
				{openPanel === "advanced" && (
					<TabControls
						attributes={attributes}
						setAttributes={setAttributes}
						AdvancedTab={AdvancedTab}
						VisibilityTab={VisibilityTab}
						displayIcon={false}
						initialTab={"visibility"}
					/>
				)}
			</PanelBody>
		</>
	);
};

export default Inspector;
