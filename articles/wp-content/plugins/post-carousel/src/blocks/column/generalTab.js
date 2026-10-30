import { __ } from "@wordpress/i18n";
import { InputControl, SPRangeControl } from "../../components";
import Toggle from "../../components/toggle/toggle";
import { useDeviceType } from "../../controls/controls";

export const ContainerColumnGeneralTab = ({ attributes, setAttributes }) => {
	const { columnWidth } = attributes;
	const deviceType = useDeviceType();
	const columnWidthChangeHandler = ({ value }) => {
		setAttributes({
			columnWidth: {
				...columnWidth,
				device: { ...columnWidth.device, [deviceType]: value },
			},
		});
	};

	return (
		<SPRangeControl
			label={__("Column Width", "post-carousel")}
			attributes={columnWidth}
			attributesKey={"columnWidth"}
			setAttributes={setAttributes}
			// units={ [ 'px', '%', 'em' ] }
			units={["%"]}
			onValueChange={columnWidthChangeHandler}
			max={600}
			step={0.1}
			resetIcon={ true }
			defaultValue={{ unit: "%", value: "" }}
		/>
	);
};

export const ColumnAdvancedGeneralTab = ({ attributes, setAttributes }) => {
	const { columnZIndex, columnWrapperLink, columnWrapperLinkUrl, columnWrapperLinkNewTab } = attributes;

	return (
		<>
			<InputControl
				label={__("Z-Index", "post-carousel")}
				attributes={columnZIndex}
				attributesKey={"columnZIndex"}
				setAttributes={setAttributes}
				inputType="number"
			/>
			<Toggle
				label={__("Wrapper Link", "post-carousel")}
				attributes={columnWrapperLink}
				attributesKey={"columnWrapperLink"}
				setAttributes={setAttributes}
			/>
			{columnWrapperLink && (
				<>
					<InputControl
						label={__("Wrapper Link URL", "post-carousel")}
						attributes={columnWrapperLinkUrl}
						attributesKey={"columnWrapperLinkUrl"}
						setAttributes={setAttributes}
						inputType="url"
						flex={false}
						placeholder={"https://exaple.com"}
					/>
					<Toggle
						label={__("Open in new tab", "post-carousel")}
						attributes={columnWrapperLinkNewTab}
						attributesKey={"columnWrapperLinkNewTab"}
						setAttributes={setAttributes}
					/>
				</>
			)}
		</>
	);
};

export const ColumnAdvanceAdvancedTab = ({ attributes, setAttributes }) => {
	const { columnAdditionalID, columnAdditionalClass, customCss } = attributes;

	const setCustomCss = (value) => {
		setAttributes({ customCss: value });
	};

	return (
		<>
			<InputControl
				label={__("Additional ID", "post-carousel")}
				attributes={columnAdditionalID}
				attributesKey={"columnAdditionalID"}
				setAttributes={setAttributes}
				inputType="text"
				flex={false}
			/>
			<InputControl
				label={__("Additional Class(es)", "post-carousel")}
				attributes={columnAdditionalClass}
				attributesKey={"columnAdditionalClass"}
				setAttributes={setAttributes}
				inputType="text"
				flex={false}
			/>
		</>
	);
};
