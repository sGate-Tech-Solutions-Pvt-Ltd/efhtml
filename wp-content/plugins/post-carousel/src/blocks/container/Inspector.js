import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { PanelBody } from "@wordpress/components";
import { TabControls } from "../../components";
import {
	ContainerAdvancedGeneralTab,
	ContainerFlexProperties,
	ContainerGeneralTab,
	ContainerShapeDivider,
} from "./generalTab";
import { ContainerAdvanceAdvancedTab, ContainerStyleTab, ContainerVisibilityTab } from "./styleTab";

const Inspector = ({ attributes, setAttributes, isSelected }) => {
	const [togglePanel, setTogglePanel] = useState("container");

	const toggleHandler = (toggleVal, tabName) => {
		setTogglePanel(toggleVal ? tabName : "");
	};
	useEffect(() => {
		setTogglePanel("container");
	}, [isSelected]);

	return (
		<>
			<PanelBody
				title={__("Container Type", "post-carousel")}
				opened={togglePanel === "container"}
				onToggle={(value) => toggleHandler(value, "container")}
				initialOpen={true}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					GeneralTab={ContainerGeneralTab}
					StyleTab={ContainerStyleTab}
				/>
			</PanelBody>
			<PanelBody
				title={__("Flex Properties", "post-carousel")}
				opened={togglePanel === "flex"}
				onToggle={(value) => toggleHandler(value, "flex")}
			>
				<ContainerFlexProperties attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<PanelBody
				title={__("Shape Divider", "post-carousel")}
				opened={togglePanel === "shape-divider"}
				onToggle={(value) => toggleHandler(value, "shape-divider")}
			>
				<ContainerShapeDivider attributes={attributes} setAttributes={setAttributes} />
			</PanelBody>
			<PanelBody
				title={__("Advanced", "post-carousel")}
				opened={togglePanel === "advance"}
				onToggle={(value) => toggleHandler(value, "advance")}
			>
				<TabControls
					attributes={attributes}
					setAttributes={setAttributes}
					displayIcon={false}
					GeneralTab={ContainerAdvancedGeneralTab}
					VisibilityTab={ContainerVisibilityTab}
					AdvancedTab={ContainerAdvanceAdvancedTab}
				/>
			</PanelBody>
		</>
	);
};

export default Inspector;
