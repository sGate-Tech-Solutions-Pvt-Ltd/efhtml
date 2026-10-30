import { __ } from "@wordpress/i18n";
import { InputControl, Toggle } from "../../components";

export const VisibilityTab = ({ attributes, setAttributes }) => {
	const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

	return (
		<div>
			<Toggle
				label={__("Hide on Desktop", "post-carousel")}
				attributes={hideOnDesktop}
				setAttributes={setAttributes}
				attributesKey={"hideOnDesktop"}
				pro={true}
			/>
			<Toggle
				label={__("Hide on Tablet", "post-carousel")}
				attributes={hideOnTablet}
				setAttributes={setAttributes}
				attributesKey={"hideOnTablet"}
				pro={true}
			/>
			<Toggle
				label={__("Hide on Mobile", "post-carousel")}
				attributes={hideOnMobile}
				setAttributes={setAttributes}
				attributesKey={"hideOnMobile"}
				pro={true}
			/>
		</div>
	);
};

export const AdvancedTab = ({ attributes, setAttributes }) => {
	const { additionalCssClass } = attributes;

	return (
		<div>
			<InputControl
				label={__("Additional CSS Class(es)", "post-carousel")}
				attributes={additionalCssClass}
				attributesKey={"additionalCssClass"}
				setAttributes={setAttributes}
				flex={false}
				inputType="string"
			/>
		</div>
	);
};
