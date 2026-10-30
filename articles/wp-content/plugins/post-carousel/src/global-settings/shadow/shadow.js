import { __ } from "@wordpress/i18n";
import { Button, PanelBody, SelectControl, __experimentalInputControl as InputControl  } from "@wordpress/components";

import "./editor.scss";
import { Popup, SpColorPicker } from "../../components";
import { useEffect, useState } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { generateShadowRootCSS } from "../default-settings";
import { PlusIcon } from "../../icons/arrowIcons";
// import { PlusIcon } from "../../icons/icons";

const ShadowSettings = () => {
	const shadow = useSelect((select) => select("smartpost/global-settings").getCategory("shadow"));

	const { updateSetting } = useDispatch("smartpost/global-settings");

	const [shadowList, setShadowList] = useState(shadow.shadowList);

	const addCustomShadow = () => {
		const customSizeId = shadowList?.length - 6 + 1;
		const randomKey = () => Math.random().toString(36).slice(2, 5);

		const newShadow = [
			...shadowList,
			...[
				{
					...shadowList[0],
					custom: true,
					slug: `custom-shadow-${customSizeId}-${randomKey()}`,
					title: "New Shadow " + customSizeId,
				},
			],
		];

		setShadowList(newShadow);

		updateSetting("shadow", "shadowList", newShadow);
	};

	const changeValue = (newValue, slug, key) => {
		const newData = shadowList.map((item) => (item.slug === slug ? { ...item, [key]: newValue } : item));

		setShadowList(newData);

		updateSetting("shadow", "shadowList", newData);
	};

	const deleteShadow = (slug) => {
		const newData = shadowList.filter((shadow) => shadow.slug !== slug);

		const confirmed = window.confirm("Are you sure you want to delete box shadow?");
		if (confirmed) {
			setShadowList(newData);
			updateSetting("shadow", "shadowList", newData);
		}
	};

	const shadowCss = (item) => {
		return `${"inset" === item["type"] ? "inset" : ""} ${item["x-offset"]}px ${item["y-offset"]}px ${
			item["blur"]
		}px ${item["speared"]}px ${item["color"]}`;
	};

	useEffect(() => {
		const shadowRootCSS = generateShadowRootCSS(shadowList);
		updateSetting("shadow", "shadowRootCSS", shadowRootCSS);
	}, [shadowList]);

	return (
		<PanelBody title={__("Shadow", "post-carousel")} initialOpen={false}>
			<div className="sp-smart-global-shadow">
				<div className="sp-smart-global-shadow-list">
					<ul>
						{shadowList?.map((item) => (
							<li key={item.slug}>
								<Popup label={item.title}>
									<div className="sp-smart-global-shadow-wrapper">
										<div className="sp-smart-global-shadow-header">
											<h4>
												{item.custom ? (
													<>
														<span>Name</span>
														<input
															name={item.slug}
															value={item.title}
															onChange={(e) =>
																changeValue(e.target.value, item.slug, "title")
															}
														/>
													</>
												) : (
													item.title
												)}
											</h4>
											{item.custom && (
												<Button
													className="sp-smart-delete-btn"
													onClick={() => deleteShadow(item.slug)}
												>
													<svg
														width="20"
														height="20"
														viewBox="0 0 20 20"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12 4H15C15.6 4 16 4.4 16 5V6H3V5C3 4.4 3.5 4 4 4H7C7.2 2.9 8.3 2 9.5 2C10.7 2 11.8 2.9 12 4ZM8 4H11C10.8 3.4 10.1 3 9.5 3C8.9 3 8.2 3.4 8 4ZM4 7H15L14.1 17.1C14.1 17.6 13.6 18 13.1 18H5.9C5.4 18 5 17.6 4.9 17.1L4 7Z"
															fill="currentColor"
														/>
													</svg>
												</Button>
											)}
										</div>
										<div className="sp-smart-global-shadow-body">
											<div className="sp-smart-global-shadow-preset">
												<div
													className="sp-smart-shadow-preset-box"
													style={{
														boxShadow: shadowCss(item),
													}}
												></div>
											</div>
											<SelectControl
												options={[
													{
														label: "Outset",
														value: "outset",
													},
													{
														label: "Inset",
														value: "inset",
													},
												]}
												value={item.type}
												onChange={(newValue) => changeValue(newValue, item.slug, "type")}
											/>
											<div className="sp-smart-global-shadow-input-field">
												{["x-offset", "y-offset", "blur", "speared"].map((field, i) => (
													<InputControl
														key={i}
														label={field}
														type="number"
														onChange={(newValue) => changeValue(newValue, item.slug, field)}
														value={item[field]}
													/>
												))}
											</div>
											<div className="sp-smart-global-shadow-color">
												<SpColorPicker
													label={__("Shadow Color", "post-carousel")}
													value={item?.color}
													onChange={(newColor) => changeValue(newColor, item.slug, "color")}
													defaultColor="#333333"
												/>
											</div>
										</div>
									</div>
								</Popup>
							</li>
						))}
					</ul>
				</div>
				<div className="sp-global-add-custom">
					<div className="sp-add-custom-sizes sp-d-flex sp-space-between">
						<span>Custom</span>
						<span className="sp-btn" onClick={() => addCustomShadow()}>
							<PlusIcon />
						</span>
					</div>
				</div>
			</div>
		</PanelBody>
	);
};

export default ShadowSettings;
