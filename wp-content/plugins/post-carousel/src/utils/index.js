export const blockOptions = {};
sp_smart_post_block_localize?.getBlockOptions.forEach((element) => {
	blockOptions[element.block_name] = element.show;
});

export const isBlockEnabled = (name) => {
	const blockName = name.replaceAll("sp-smart-post-show/", "");
	return blockOptions[blockName];
};
