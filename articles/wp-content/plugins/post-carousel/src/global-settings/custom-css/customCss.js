import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelect } from "@wordpress/data";

const CustomCss = () => {
	const customCss = useSelect((select) => select("smartpost/global-settings").getCustomCSS());

	const { setCustomCSS } = useDispatch("smartpost/global-settings");

	return (
		<PanelBody title={__("Custom CSS", "post-carousel")} initialOpen={false}>
			<p className="sp-smart-post-component-title sp-smart-mb-5">
				Use this area to add CSS and customize the page to your preference.
			</p>

			<Editor
				height="200px"
				defaultLanguage="css"
				theme="vs-dark"
				defaultValue=""
				value={customCss}
				onChange={(e) => setCustomCSS(e)}
				options={{
					quickSuggestions: {
						other: "on",
						comments: "off",
						strings: "off",
					},
					quickSuggestionsDelay: 10,
					minimap: {
						enabled: false,
					},
					scrollbar: {
						vertical: "auto",
						horizontal: "auto",
						verticalScrollbarSize: 5,
						horizontalScrollbarSize: 5,
						scrollByPage: false,
						ignoreHorizontalScrollbarInContentHeight: false,
					},
					lineNumbersMinChars: 1,
					folding: false,
					wordWrap: "on",
				}}
			/>
		</PanelBody>
	);
};

export default CustomCss;
