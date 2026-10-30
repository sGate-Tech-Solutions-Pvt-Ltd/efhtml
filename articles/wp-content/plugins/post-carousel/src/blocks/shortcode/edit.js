import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import DynamicShortcodeInput from "./dynamicShortcode";
import { ShortCodeBlockIcon } from "./blockIcon";
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
	const shortCodeList = smartPostShowGbScript.shortCodeList;

	const blockProps = useBlockProps();


	const updateShortcode = (e) => {
		setAttributes({ shortcode: e.target.value });
	};

	const shortcodeUpdate = (e) => {
		updateShortcode(e);
	};


	if (shortCodeList.length === 0) {
		return (
			<div {...blockProps}>
				<div className="spsp_block_shortcode components-placeholder">
					<div className="components-placeholder__label">
						<ShortCodeBlockIcon />
						{__("Smart Post", "post-carousel")}
					</div>
					<p className="spsp_block_shortcode_text">
						{__("No shortcode found.", "post-carousel")}
						<a href={smartPostShowGbScript.link}>{__("Create a shortcode now!", "post-carousel")}</a>
					</p>
				</div>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			<div className="components-placeholder is-large">
				<div className="components-placeholder__label">
					<ShortCodeBlockIcon />
					{__("Smart Post", "post-carousel")}
				</div>
				<div className="components-placeholder__instructions">
					{__("Select a Show", "post-carousel")}
				</div>
				<DynamicShortcodeInput
					attributes={attributes}
					shortCodeList={shortCodeList}
					shortcodeUpdate={shortcodeUpdate}
				/>
			</div>
		</div>
	);
};

export default Edit;
