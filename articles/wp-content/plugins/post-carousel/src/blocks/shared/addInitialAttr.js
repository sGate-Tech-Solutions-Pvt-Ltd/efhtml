import { useEffect, useMemo } from "@wordpress/element";
import { getBlockShortName } from "./helpFn";
import { select } from "@wordpress/data";

const getUniqId = (blocks) =>
	blocks.reduce(
		(result, block) => {
			if (block?.attributes?.uniqueId && block.name.includes("sp-smart-post-show")) {
				result.blockIds.push(block.attributes.uniqueId);
				result.clientIds.push(block.clientId);
			}

			if (block.innerBlocks) {
				const { blockIds, clientIds } = getUniqId(block.innerBlocks);
				result.blockIds = [...result.blockIds, ...blockIds];
				result.clientIds = [...result.clientIds, ...clientIds];
			}
			return result;
		},
		{ blockIds: [], clientIds: [] }
	);

const checkDuplicate = (blockIds, block_id, currentIndex) => {
	const getFiltered = blockIds.filter((el) => el === block_id);
	return getFiltered.length > 1 && currentIndex === blockIds.lastIndexOf(block_id);
};

const addInitialAttr = (ChildComponent) => {
	const WrappedComponent = (props) => {
		const {
			name,
			setAttributes,
			clientId,
			attributes: { blockName, uniqueId },
		} = props;

		const blockShortName = useMemo(() => getBlockShortName(name), [name]);
		const updateBlockShortName = blockShortName?.startsWith("smart-")
			? blockShortName.replace(/^smart-/, "")
			: blockShortName;

		useEffect(() => {
			const _uniqueId = `sp-smart-${updateBlockShortName}-${clientId?.split("-").pop()}`;
			const attributeObject = { uniqueId: _uniqueId };

			const getStore = select("core/block-editor");
			const getAllBlocks = getStore?.getBlocks ? getStore.getBlocks() : null;
			const { blockIds, clientIds } = getAllBlocks ? getUniqId(getAllBlocks) : { blockIds: [], clientIds: [] };

			const getGlobalBreakpoint = select("smartpost/global-settings").getCategory("breakpoint");
			if (typeof getGlobalBreakpoint === "object") {
				attributeObject.globalBreakPointData = getGlobalBreakpoint;
			}

			if (!blockName) {
				const updateBlockName =
					blockShortName === "thumbnail-slider" ? "post-thumbnail-slider" : blockShortName;

				attributeObject.blockName = updateBlockName;
			}

			const filterBlocks = [
				"post-carousel",
				"post-carousel-two",
				"post-slider",
				"post-slider-two",
				"thumbnail-slider",
				"thumbnail-slider-two",
				"news-ticker",
				"post-grid-one",
				"post-grid-two",
				"post-grid-three",
				"post-grid-four",
				"post-grid-five",
				"post-grid-six",
				"post-list-one",
				"post-list-two",
				"post-list-three",
				"post-timeline-one",
				"post-timeline-two",
				"post-timeline-three",
				"taxonomy",
				"pagination",
				"taxonomy-filter",
				"sort-filter",
				"live-filter",
				"author-filter",
			];
			// add spBlockId for filter blocks only
			if (filterBlocks.includes(blockShortName)) {
				attributeObject.spBlockId = clientId?.split("-").pop();
			}

			if ("column" === blockShortName) {
				attributeObject.blockClientId = clientId;
			}

			if (
				"not_set" === uniqueId ||
				"0" === uniqueId ||
				!uniqueId ||
				checkDuplicate(blockIds, uniqueId, clientIds.indexOf(clientId)) ||
				!blockName
			) {
				setAttributes(attributeObject);
			}
			// eslint-disable-next-line
		}, [clientId, blockShortName]);

		const _props = {
			...props,
			attributes: {
				...props.attributes,
				clientId,
			},
		};
		return <ChildComponent {..._props} />;
	};

	return WrappedComponent;
};
export default addInitialAttr;
