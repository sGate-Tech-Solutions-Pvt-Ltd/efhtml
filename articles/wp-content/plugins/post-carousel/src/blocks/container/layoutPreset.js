import { Placeholder } from "@wordpress/components";
import { presetLayerArray } from "./containerConstant";

const LayoutPreset = ({ setAttributes }) => {
	const handleClick = (item) => {
		setAttributes({
			containerLayer: item.layer,
			containerFlexDirection: {
				device: {
					Desktop: item.flexDirection,
					Tablet: item.flexDirection,
					Mobile: item.flexDirection,
				},
			},
			columns: item?.columns,
			layerLayoutNo: item.indexNo ? item.indexNo : "",
			// containerFlexWrap: {
			// 	device: {
			// 		Desktop: item.flexWrap,
			// 		Tablet: item.flexWrap,
			// 		Mobile: "wrap",
			// 	},
			// },
			layout: item.layout ? item.layout : "",
		});
	};

	return (
		<Placeholder
			label="Container"
			instructions="Customizable containers with endless creation possibilities. Select a container layout to start with."
			className="sp-smart-post-container-variation-picker-wrapper sp-smart-post-container-preset-layout"
		>
			<div className="sp-smart-post-container-variation-layouts-grid">
				<ul>
					{presetLayerArray.map((item, index) => (
						<li key={index}>
							<span
								onClick={() => handleClick(item)}
								role="button"
								tabIndex={0}
								onKeyDown={() => handleClick(item)}
							>
								<span className="sp-container-preset-item">
									{item.icon}
									<span className="sp-container-preset-label">{item.label}</span>
								</span>
							</span>
						</li>
					))}
				</ul>
			</div>
		</Placeholder>
	);
};

export default LayoutPreset;
