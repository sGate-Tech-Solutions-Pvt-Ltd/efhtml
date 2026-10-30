import { useEffect } from "@wordpress/element";

export const useSyncParentAttributes = ({ parentAttributes, attributes, setAttributes }) => {
	useEffect(() => {
		const { iconEnable, iconSource, svgIconName, iconName, listTitleEnable, descriptionEnable } = attributes;

		const updates = {};

		if (iconEnable === undefined) {
			updates.iconEnableParent = parentAttributes.iconEnable;
		}
		if (iconSource === undefined) {
			updates.iconSourceParent = parentAttributes.iconSource;
		}
		if (svgIconName === undefined) {
			updates.parentSvgIconName = parentAttributes.svgIconName;
		}
		if (iconName === undefined) {
			updates.parentIconName = parentAttributes.iconName;
		}
		if (listTitleEnable === undefined) {
			updates.parentListTitleEnable = parentAttributes.listTitleEnable;
		}
		if (descriptionEnable === undefined) {
			updates.parentDescriptionEnable = parentAttributes.descriptionEnable;
		}

		if (attributes.parentIconSourceCustom !== parentAttributes.iconSourceCustom) {
			updates.parentIconSourceCustom = parentAttributes.iconSourceCustom;
		}
		if (attributes.parentListsLayout !== parentAttributes.smartListsLayout) {
			updates.parentListsLayout = parentAttributes.smartListsLayout;
		}

		if (Object.keys(updates).length > 0) {
			setAttributes(updates);
		}
	}, [
		attributes.iconEnable,
		attributes.iconSource,
		attributes.svgIconName,
		attributes.iconName,
		attributes.listTitleEnable,
		attributes.descriptionEnable,
		attributes.parentIconSourceCustom,
		attributes.parentListsLayout,
		parentAttributes.iconEnable,
		parentAttributes.iconSource,
		parentAttributes.svgIconName,
		parentAttributes.iconName,
		parentAttributes.listTitleEnable,
		parentAttributes.descriptionEnable,
		parentAttributes.iconSourceCustom,
		parentAttributes.smartListsLayout,
		setAttributes,
	]);
};
