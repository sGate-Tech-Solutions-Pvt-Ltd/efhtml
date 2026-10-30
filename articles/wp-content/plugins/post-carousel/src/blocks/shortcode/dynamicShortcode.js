import { __ } from "@wordpress/i18n";

const DynamicShortcodeInput = ({ attributes: { shortcode }, shortCodeList, shortcodeUpdate }) => {
	return (
		<div className="spsp-gutenberg-shortcode editor-styles-wrapper">
			<select className="spsp-shortcode-selector" onChange={(e) => shortcodeUpdate(e)} value={shortcode}>
				<option value="0">{__("-- Select a Show --", "post-carousel")}</option>
				{shortCodeList.map((shortcodeItem) => {
					const title =
						shortcodeItem.title.length > 35
							? `${shortcodeItem.title.substring(0, 30)}.... #(${shortcodeItem.id})`
							: `${shortcodeItem.title} #(${shortcodeItem.id})`;

					return (
						<option key={shortcodeItem.id.toString()} value={shortcodeItem.id.toString()}>
							{title}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DynamicShortcodeInput;
