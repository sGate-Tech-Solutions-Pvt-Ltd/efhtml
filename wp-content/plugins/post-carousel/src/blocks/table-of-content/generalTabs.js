import { __ } from "@wordpress/i18n";
import Layouts from "../../components/layouts/layouts";
import {
	TocOneIcon,
	TocTwoIcon,
	TocThreeIcon,
	TocFourIcon,
	TocFiveIcon,
	AlignLeft,
	AlignCenter,
	AlignRight,
} from "../../icons/icons";
import {
	InputControl,
	MultipleSelect,
	SelectDropdown,
	SelectField,
	SPRangeControl,
	SPToggleGroupControl,
} from "../../components";
import Toggle from "../../components/toggle/toggle";
import {
	Icon1,
	Icon10,
	Icon11,
	Icon13,
	Icon14,
	Icon15,
	Icon3,
	Icon2,
	Icon4,
	Icon5,
	Icon7,
	Icon8,
	Icon9,
	Icon6,
	Icon12,
	Icon16,
} from "../../icons/collapsibleIcons";
import ProInfo from "../../components/proInfo/proInfo";

export function PresetToc({ attributes, setAttributes }) {
	const { preset, listStyle, supportedHeadingTag, displayControl, stickyOffsetTop, floatingPosition, tocWidth } = attributes;
	const layoutChange = (newValue) => {
		if (newValue === preset) {
			return;
		}
		setAttributes({ preset: newValue });
	};

	const listStylesOptions = [
		{
			label: "None",
			value: "none",
			// disabled: true,
		},
		{ label: "Bullet(.)", value: "bullet" },
		{
			label: "Multi level Decimal(1. 1.1. 1.2. 1.2.1.)",
			value: "decimal",
		},
		{ label: "Numeric Outline (1. a. b. i.)", value: "numericOutline" },
		{
			label: "Roman - Alphabetic Mix (I. a. 1.)",
			value: "romanAlphabeticMix",
		},
		{ label: "Padded Numbers (01. a. b. i.)", value: "paddedNumbers" },
	];

	return (
		<>
			<Layouts
				attributes={preset}
				setAttributes={setAttributes}
				attributesKey="preset"
				displayActive={true}
				showDemoTitle={true}
				grid={3}
				onChange={layoutChange}
				label={__("TOC Preset", "post-carousel")}
				items={[
					{ 
						icon: <TocOneIcon value={preset} />, 
						value: "presetOne" 
					},
					{ 
						icon: <TocTwoIcon value={preset} />, 
						value: "presetTwo",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3602"
					},
					{
						icon: <TocThreeIcon value={preset} />,
						value: "presetThree",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3602"
					},
					{
						icon: <TocFourIcon value={preset} />,
						value: "presetFour",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3602"
					},
					{
						icon: <TocFiveIcon value={preset} />,
						value: "presetFive",
						type: "pro",
						demoLink: "https://wpsmartpost.com/blocks/#demoId3602"
					},
				]}
			/>

			<SelectField
				label={__("List Style", "post-carousel")}
				attributes={listStyle}
				attributesKey="listStyle"
				setAttributes={setAttributes}
				items={listStylesOptions}
			/>
			<MultipleSelect
				label={__("Headings to Index", "post-carousel")}
				value={supportedHeadingTag}
				attributes={supportedHeadingTag}
				attributesKey={"supportedHeadingTag"}
				setAttributes={setAttributes}
				onChange={(e) => setAttributes({ supportedHeadingTag: e })}
				items={[
					{ label: "H1", value: "h1" },
					{ label: "H2", value: "h2" },
					{ label: "H3", value: "h3" },
					{ label: "H4", value: "h4" },
					{ label: "H5", value: "h5" },
					{ label: "H6", value: "h6" },
				]}
			/>
			<SPRangeControl
				label={__("Width", "post-carousel")}
				attributes={tocWidth}
				attributesKey={"tocWidth"}
				setAttributes={setAttributes}
				max={1000}
				min={0}
				units={["px", "%", "em"]}
				defaultValue={{ unit: "px", value: "" }}
			/>
			<SelectField
				label={__("Display Control", "post-carousel")}
				attributes={displayControl}
				attributesKey="displayControl"
				setAttributes={setAttributes}
				items={[
					{ label: "Static", value: "static" },
					{ label: "Sticky", value: "sticky", disabled: true },
					{ label: "Floating", value: "floating", disabled: true },
				]}
			/>
			{displayControl === "floating" && (
				<SelectField
					label={__("Floating Position", "post-carousel")}
					attributes={floatingPosition}
					attributesKey="floatingPosition"
					setAttributes={setAttributes}
					items={[
						{ label: "Top Left", value: "top-left" },
						{ label: "Top Center", value: "top-center" },
						{ label: "Top Right", value: "top-right" },
						{ label: "Middle Left", value: "middle-left" },
						{ label: "Middle Right", value: "middle-right" },
					]}
				/>
			)}
			{(displayControl === "sticky" || displayControl === "floating") && (
				<SPRangeControl
					label={__("Offset Top", "post-carousel")}
					setAttributes={setAttributes}
					attributes={stickyOffsetTop}
					max={500}
					units={["px", "%", "em"]}
					min={1}
					attributesKey={"stickyOffsetTop"}
					defaultValue={{ unit: "px", value: 50 }}
					pro={true}
				/>
			)}

			{/* <SPToggleGroupControl
				label={__("Content Alignment", "post-carousel")}
				items={[
				{ label: <AlignLeft />, value: "left" },
				{ label: <AlignCenter />, value: "center" },
				{ label: <AlignRight />, value: "right" },
				]}
				attributes={tocAlignment}
				attributesKey={"tocAlignment"}
				setAttributes={setAttributes}
			/> */}
			<ProInfo>
				<span>Unlock exclusive layouts and advanced display controls.</span> <a href="https://wpsmartpost.com/pricing/?ref=1" target="_blank" rel="noopener noreferrer">Upgrade to Pro!</a>
			</ProInfo>
		</>
	);
}

export function TocHeading({ attributes, setAttributes }) {
	const { tocHeading, bottomGap, headingHashUrl, headingAlignment } = attributes;

	return (
		<>
			<InputControl
				attributes={tocHeading}
				attributesKey={"tocHeading"}
				setAttributes={setAttributes}
				label={__("Heading Label", "post-carousel")}
				flex={false}
				inputType="string"
			/>

			<SPRangeControl
				label={__("Bottom Gap", "post-carousel")}
				setAttributes={setAttributes}
				attributes={bottomGap}
				max={200}
				units={["px", "%", "em"]}
				min={1}
				attributesKey={"bottomGap"}
				defaultValue={{ unit: "px", value: 16 }}
			/>

			<Toggle
				label={__("Heading Hash Url", "post-carousel")}
				attributes={headingHashUrl}
				setAttributes={setAttributes}
				attributesKey={"headingHashUrl"}
				pro={true}
			/>

			<SPToggleGroupControl
				label={__("Alignment", "post-carousel")}
				items={[
					{ label: <AlignLeft />, value: "left" },
					{ label: <AlignCenter />, value: "center" },
					{ label: <AlignRight />, value: "right" },
				]}
				attributes={headingAlignment}
				attributesKey={"headingAlignment"}
				setAttributes={setAttributes}
			/>
		</>
	);
}

export function TocListBodyGeneral({ attributes, setAttributes }) {
	const {
		listHierarchy,
		hierarchyDistance,
		copyLink,
		childItemGap,
		gapBetweenListItems,
		separator,
		separatorStyle,
		separatorThickness,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("List Hierarchy", "post-carousel")}
				attributes={listHierarchy}
				attributesKey={"listHierarchy"}
				setAttributes={setAttributes}
			/>

			{listHierarchy && (
				<SPRangeControl
					label={__("Hierarchy Distance", "post-carousel")}
					setAttributes={setAttributes}
					attributes={hierarchyDistance}
					max={50}
					units={["px", "%", "em"]}
					min={1}
					attributesKey={"hierarchyDistance"}
					defaultValue={{ unit: "px", value: 16 }}
				/>
			)}

			<Toggle
				label={__("Copy Link (Frontend)", "post-carousel")}
				attributes={copyLink}
				setAttributes={setAttributes}
				attributesKey={"copyLink"}
				pro={true}
			/>

			<SPRangeControl
				label={__("Gap Between List Items", "post-carousel")}
				setAttributes={setAttributes}
				attributes={gapBetweenListItems}
				max={50}
				units={["px", "%", "em"]}
				min={1}
				attributesKey={"gapBetweenListItems"}
				defaultValue={{ unit: "px", value: 16 }}
			/>

			{listHierarchy && (
				<SPRangeControl
					label={__("Child Item Gap", "post-carousel")}
					setAttributes={setAttributes}
					attributes={childItemGap}
					max={50}
					units={["px", "%", "em"]}
					min={1}
					attributesKey={"childItemGap"}
					defaultValue={{ unit: "px", value: 16 }}
				/>
			)}

			<Toggle
				label={__("Separator", "post-carousel")}
				attributes={separator}
				attributesKey={"separator"}
				setAttributes={setAttributes}
			/>

			{separator && (
				<>
					<SelectField
						label={__("Separator Style", "post-carousel")}
						attributes={separatorStyle}
						attributesKey="separatorStyle"
						setAttributes={setAttributes}
						items={[
							{ label: "Solid", value: "solid" },
							{ label: "Dashed", value: "dashed" },
							{ label: "Dotted", value: "dotted" },
							{ label: "Double", value: "double" },
						]}
					/>

					<SPRangeControl
						label={__("Thickness", "post-carousel")}
						setAttributes={setAttributes}
						attributes={separatorThickness}
						max={10}
						min={1}
						attributesKey={"separatorThickness"}
						defaultValue={{ unit: "px", value: 16 }}
					/>
				</>
			)}
		</>
	);
}

export function TocCollapsibleGeneral({ attributes, setAttributes }) {
	const {
		collapsedInitially,
		childItemCollapsible,
		CollapsibleButtonType,
		CollapsibleIconSource,
		collapsibleIconPosition,
		tocCollapsed,
		expandText,
		collapseText,
		childCollapsibleIconSource,
	} = attributes;

	return (
		<>
			<Toggle
				label={__("Toc Collapsible", "post-carousel")}
				attributes={tocCollapsed}
				attributesKey={"tocCollapsed"}
				setAttributes={setAttributes}
				pro={true}
			/>
			{tocCollapsed && (
				<Toggle
					label={__("Collapsed Initially", "post-carousel")}
					attributes={collapsedInitially}
					attributesKey={"collapsedInitially"}
					setAttributes={setAttributes}
				/>
			)}

			<Toggle
				label={__("Child Item Collapsible", "post-carousel")}
				attributes={childItemCollapsible}
				attributesKey={"childItemCollapsible"}
				setAttributes={setAttributes}
				pro={true}
			/>

			{tocCollapsed && (
				<SPToggleGroupControl
					label={__("Collapsible Button Type", "post-carousel")}
					items={[
						{ label: "Icon", value: "icon" },
						{ label: "Text", value: "text" },
					]}
					attributes={CollapsibleButtonType}
					attributesKey={"CollapsibleButtonType"}
					setAttributes={setAttributes}
				/>
			)}

			<>
				{childItemCollapsible && (
					<SelectDropdown
						label={__("Child Collapsible Icon Style", "post-carousel")}
						attributes={childCollapsibleIconSource}
						attributesKey={"childCollapsibleIconSource"}
						setAttributes={setAttributes}
						options={[
							{
								label: "Style One",
								value: "one",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon1 />
										<Icon2 />
									</span>
								),
							},
							{
								label: "Style Two",
								value: "two",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon3 />
										<Icon4 />
									</span>
								),
							},
							{
								label: "Style Three",
								value: "three",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon5 />
										<Icon6 />
									</span>
								),
							},
							{
								label: "Style Four",
								value: "four",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon7 />
										<Icon8 />
									</span>
								),
							},
							{
								label: "Style Five",
								value: "five",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon9 />
										<Icon10 />
									</span>
								),
							},
							{
								label: "Style Six",
								value: "six",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon11 />
										<Icon12 />
									</span>
								),
							},
							{
								label: "Style Seven",
								value: "seven",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon13 />
										<Icon14 />
									</span>
								),
							},
							{
								label: "Style Eight",
								value: "eight",
								icon: (
									<span className="sp-smart-post-select-nav-icon">
										<Icon15 />
										<Icon16 />
									</span>
								),
							},
						]}
					/>
				)}

				{CollapsibleButtonType === "icon" ? (
					<>
						{tocCollapsed && (
							<>
								<SelectDropdown
									label={__("Collapsible Icon Style", "post-carousel")}
									attributes={CollapsibleIconSource}
									attributesKey={"CollapsibleIconSource"}
									setAttributes={setAttributes}
									options={[
										{
											label: "Style One",
											value: "one",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon1 />
													<Icon2 />
												</span>
											),
										},
										{
											label: "Style Two",
											value: "two",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon3 />
													<Icon4 />
												</span>
											),
										},
										{
											label: "Style Three",
											value: "three",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon5 />
													<Icon6 />
												</span>
											),
										},
										{
											label: "Style Four",
											value: "four",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon7 />
													<Icon8 />
												</span>
											),
										},
										{
											label: "Style Five",
											value: "five",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon9 />
													<Icon10 />
												</span>
											),
										},
										{
											label: "Style Six",
											value: "six",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon11 />
													<Icon12 />
												</span>
											),
										},
										{
											label: "Style Seven",
											value: "seven",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon13 />
													<Icon14 />
												</span>
											),
										},
										{
											label: "Style Eight",
											value: "eight",
											icon: (
												<span className="sp-smart-post-select-nav-icon">
													<Icon15 />
													<Icon16 />
												</span>
											),
										},
									]}
								/>

								<SPToggleGroupControl
									label={__("Collapsible Icon Position", "post-carousel")}
									items={[
										{
											label: "Beside Title",
											value: "besideTitle",
										},
										{ label: "Right", value: "right" },
									]}
									attributes={collapsibleIconPosition}
									attributesKey={"collapsibleIconPosition"}
									setAttributes={setAttributes}
								/>
							</>
						)}
					</>
				) : (
					<>
						<InputControl
							attributes={expandText}
							attributesKey={"expandText"}
							setAttributes={setAttributes}
							label={__("Expand Label", "post-carousel")}
							flex={false}
							inputType="string"
						/>

						<InputControl
							attributes={collapseText}
							attributesKey={"collapseText"}
							setAttributes={setAttributes}
							label={__("Collapse Label", "post-carousel")}
							flex={false}
							inputType="string"
						/>
					</>
				)}
			</>
		</>
	);
}
