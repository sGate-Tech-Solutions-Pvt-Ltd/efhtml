import { __, _x } from "@wordpress/i18n";
import { PanelBody, __experimentalInputControl as InputControl, Button } from "@wordpress/components";

import { MobileIcon, TabletIcon } from "../../components/responsive/icon";
import "./editor.scss";
import { useDispatch, useSelect } from "@wordpress/data";
import { Divider } from "../../components";
import { ResetIcon } from "../../icons/icons";

const Breakpoint = () => {
	const breakpoint = useSelect((select) => select("smartpost/global-settings").getCategory("breakpoint"));

	const { updateSetting } = useDispatch("smartpost/global-settings");

	const breakpointChange = (newValue, key) => {
		updateSetting("breakpoint", key, newValue);
	};

	const resetBreakpoint = (key) => {
		const resetValue = {
			container: 1200,
			tablet: 1023,
			mobile: 767,
		}
		updateSetting("breakpoint", key, resetValue[key]);
	};

	return (
		<PanelBody title={__("Responsive Breakpoints", "post-carousel")} initialOpen={false}>
			<div className="sp-smart-breakpoint-header">
				<span>Tablet Max Width</span>
				<Button
					onClick={() => resetBreakpoint("tablet")}
					className={`sp-smart-breakpoint-reset ${1023 != breakpoint?.tablet ? "active" : ""}`}
				>
					<ResetIcon />
				</Button>
			</div>
			<div className="sp-smart-breakpoint">
				<div className="sp-smart-breakpoint-icon">
					<TabletIcon />
				</div>
				<InputControl
					type="number"
					value={breakpoint?.tablet}
					onChange={(newValue) => breakpointChange(newValue, "tablet")}
				/>
				<span>Px</span>
			</div>

			<div className="sp-smart-breakpoint-header">
				<span>Mobile Max Width</span>
				<Button
					onClick={() => resetBreakpoint("mobile")}
					className={`sp-smart-breakpoint-reset ${767 != breakpoint?.mobile ? "active" : ""}`}
				>
					<ResetIcon />
				</Button>
			</div>
			<div className="sp-smart-breakpoint">
				<div className="sp-smart-breakpoint-icon">
					<MobileIcon />
				</div>
				<InputControl
					type="number"
					value={breakpoint?.mobile}
					onChange={(newValue) => breakpointChange(newValue, "mobile")}
				/>
				<span>Px</span>
			</div>
		</PanelBody>
	);
};

export default Breakpoint;
