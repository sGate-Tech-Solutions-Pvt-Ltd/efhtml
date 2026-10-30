const generateUniqueId = (text, existingIds = new Set()) => {
	// Normalize Unicode characters and convert to lowercase
	const id = text
		.normalize("NFD") // Decompose characters
		.toLowerCase()
		// Replace spaces, underscores, and punctuation with hyphens
		.replace(/[\s_.,!?;:()\[\]{}'"`~@#$%^&*+=<>\/\\|]+/g, "-")
		// Remove any characters that are not letters, numbers, or hyphens
		// This now includes Unicode letters (all languages)
		.replace(/[^\p{L}\p{N}-]/gu, "")
		// Replace multiple consecutive hyphens with single hyphen
		.replace(/-+/g, "-")
		// Trim hyphens from beginning and end
		.replace(/^-+|-+$/g, "");

	// If empty after processing, generate random ID
	let finalId = id;
	if (!finalId) {
		finalId = "heading-" + Math.random().toString(36).substr(2, 9);
	}

	// Ensure uniqueness
	let counter = 1;
	let uniqueId = finalId;
	while (existingIds.has(uniqueId)) {
		uniqueId = `${finalId}-${counter}`;
		counter++;
	}
	existingIds.add(uniqueId);
	return uniqueId;
};

export const removePluginContent = (content) => {
	return content
		.replace(/<!-- wp:smart-post-show[^>]*-->.*?<!-- \/wp:smart-post-show -->/gs, "")
		.replace(/<h[1-6][^>]*>Smart Post Show<\/h[1-6]>/gi, "");
};

export const buildNestedStructure = (headings) => {
	const root = { children: [] };
	const stack = [root];
	const existingIds = new Set();

	headings.forEach((heading) => {
		const level = parseInt(heading.tagName.substring(1));
		const text = heading.textContent.trim();
		const id = generateUniqueId(text, existingIds);

		const node = {
			id,
			text,
			level,
			children: [],
		};

		while (stack.length > 1 && stack[stack.length - 1].level >= level) {
			stack.pop();
		}

		const parent = stack[stack.length - 1];
		parent.children.push(node);
		stack.push(node);
	});

	return root.children;
};

export function flattenTOC(items) {
	const result = [];

	function traverse(itemList) {
		for (const item of itemList) {
			// Push the item without the 'children' key
			const { children, ...rest } = item;
			result.push(rest);

			// Recursively flatten children
			if (children && children.length > 0) {
				traverse(children);
			}
		}
	}

	traverse(items);
	return result;
}
