import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { customTypography } from "../defaultConstant";
import GlobalTypography from "../../components/global-typography/typography";
import { useEffect, useState } from "@wordpress/element";
import { generateTypoSizesClass } from "../default-settings";
import { PlusIcon } from "../../icons/arrowIcons";

const TypographySettings = () => {
	const typography = useSelect((select) => select("smartpost/global-settings").getCategory("typography"));
	const breakpoint = useSelect((select) => select("smartpost/global-settings").getCategory("breakpoint"));

	const { updateSetting } = useDispatch("smartpost/global-settings");
	const { typographySizes } = typography;

	const { heading, body, button, custom } = typographySizes;

	const [fontTypoSizes, setFontTypoSizes] = useState(typographySizes);

	const onAddCustomSizeHandler = () => {
		const customSizeId = fontTypoSizes?.custom?.length + 1;
		const randomKey = () => Math.random().toString(36).slice(2, 5);

		const addInitialCustomTypo = [
			customTypography(`new-font-size-${customSizeId}-${randomKey()}`, `New Font ${customSizeId}`, "custom", 16),
		];

		const newData = {
			...fontTypoSizes,
			custom: [...fontTypoSizes?.custom, ...addInitialCustomTypo],
		};

		setFontTypoSizes(newData);

		updateSetting("typography", "typographySizes", newData);
	};

	const setTypographyData = (newValue, slug, type) => {
		const newData = {
			...fontTypoSizes,
			[type]: fontTypoSizes[type]?.map((item) => (item.slug === slug ? newValue : item)),
		};

		setFontTypoSizes(newData);

		updateSetting("typography", "typographySizes", newData);
	};

	const deleteTypographySizes = (data) => {
		const { slug, type } = data;

		const newData = {
			...fontTypoSizes,
			[type]: fontTypoSizes[type]?.filter((item) => item.slug !== slug),
		};

		const confirmed = window.confirm("Are you sure you want to delete this font size?");

		if (confirmed) {
			setFontTypoSizes(newData);
			updateSetting("typography", "typographySizes", newData);
		}
	};

	const fontSizes = [...(heading || []), ...(body || []), ...(button || []), ...(custom || [])].filter(Boolean);

	useEffect(() => {
		const typoCss = generateTypoSizesClass(fontSizes, breakpoint);

		const fontList = fontSizes
			.filter((item) => item?.typography?.type === "google")
			.map((item) => `${item?.typography?.family}:${item?.typography?.fontWeight}`);

		updateSetting("typography", "fontList", fontList);
		updateSetting("typography", "typographyCss", typoCss);
	}, [fontTypoSizes]);

	return (
		<PanelBody title={__("Typography", "post-carousel")} initialOpen={false}>
			{/* <Toggle
				label={ __(
					'Override Theme Typography',
					'post-carousel'
				) }
				attributes={
					typography?.overrideThemeTypo || overrideThemeTypo
				}
				onChange={ ( newValue ) =>
					updateSetting(
						'typography',
						'overrideThemeTypo',
						! newValue
					)
				}
			/> */}

			{/* Typography Font Sizes components Start */}
			<div className="sp-global-typography-fonts-list-wrapper sp-mb-16">
				<div className="sp-global-typography-fonts-label sp-smart-mb-5">
					{__("Font Styles", "post-carousel")}
				</div>
				<div className="sp-global-typography-fonts-list sp-mb-12">
					{fontSizes?.map((item, i) => (
						<div key={i} className="sp-global-typography-fonts-list-item">
							<GlobalTypography
								attributes={{
									family: { typography: item.typography },
									fontSize: item.fontSize,
									fontSpacing: item.letterSpacing,
									lineHeight: item.lineHeight,
									wordSpacing: item.wordSpacing,
								}}
								onChangeAttr={(newValue) => setTypographyData(newValue, item.slug, item.type)}
								typoItem={item}
								deleteAction={deleteTypographySizes}
								typographyLabel={item.title}
							/>
						</div>
					))}
				</div>
				<div className="sp-global-add-custom">
					<div className="sp-add-custom-sizes sp-d-flex sp-space-between">
						<span>Custom Font Style</span>
						<span className="sp-btn" onClick={onAddCustomSizeHandler}>
							<PlusIcon />
						</span>
					</div>
				</div>
			</div>
		</PanelBody>
	);
};

export default TypographySettings;
