import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { useMemo } from "@wordpress/element";

export const useQueryTerms = (attributes) => {
	const {
		postType,
		SelectTerms,
		taxonomyType,
		emptyCategory,
		allTaxonomyTerm,
		excludeTerms,
		limit = -1,
	} = attributes;
	const allTaxonomyTerms = useSelect(
		(select) => {
			const { getTaxonomies, getEntityRecords } = select(coreStore);
			const taxonomies = getTaxonomies();
			if (!Array.isArray(taxonomies)) return [];
			// Filter taxonomies by postType
			const filteredTaxonomies = taxonomies.filter(
				(tax) => Array.isArray(tax.types) && tax.types.includes(postType)
			);
			// Collect terms from each taxonomy and attach taxonomy slug
			return filteredTaxonomies.flatMap((tax) => {
				const terms = getEntityRecords("taxonomy", tax.slug, {
					per_page: -1,
				});
				if (!Array.isArray(terms)) return [];
				const termsWithTaxonomy = terms.map((term) => ({
					...term,
					taxonomy: tax.slug,
				}));
				// If emptyCategory is false, filter terms with count > 0
				return emptyCategory === false ? termsWithTaxonomy.filter((term) => term.count > 0) : termsWithTaxonomy;
			});
		},
		[postType, emptyCategory]
	);
	// Defensive fallback if no terms loaded yet
	let filteredTerms = Array.isArray(allTaxonomyTerms) ? allTaxonomyTerms : [];
	// Filter by taxonomyType if specified
	if (taxonomyType) {
		filteredTerms = filteredTerms.filter((term) => term.taxonomy === taxonomyType);
	}
	// Filter by selected terms when not using all terms
	if (!allTaxonomyTerm && Array.isArray(SelectTerms)) {
		const selectedIds = SelectTerms.map((item) => (typeof item === "object" ? item.value : item));

		// Create a map for O(1) lookups
		const termMap = new Map();
		filteredTerms.forEach((term) => termMap.set(term.id, term));

		// Reorder terms according to SelectTerms sequence
		filteredTerms = SelectTerms.map((item) => {
			const id = typeof item === "object" ? item.value : item;
			return termMap.get(id);
		}).filter((term) => term !== undefined); // Remove any undefined terms
	}
	// Exclude terms if using all terms and excludeTerms provided
	if (allTaxonomyTerm && Array.isArray(excludeTerms)) {
		const excludeIds = excludeTerms.map((item) => (typeof item === "object" ? item.value : item));
		filteredTerms = filteredTerms.filter((term) => !excludeIds.includes(term.id));
	}
	// Apply limit if greater than 0 and using allTaxonomyTerm
	if (limit > 0 && allTaxonomyTerm) {
		filteredTerms = filteredTerms.slice(0, limit);
	}
	return filteredTerms;
};

export const usePostTaxonomies = (attributes) => {
	const { postType } = attributes;

	const allTaxonomies = useSelect((select) => select(coreStore).getTaxonomies(), []);

	return useMemo(() => {
		if (!allTaxonomies) return [];
		return allTaxonomies
			.filter((tax) => tax.types.includes(postType))
			.map((tax) => ({
				label: tax.name,
				value: tax.slug,
			}));
	}, [postType, allTaxonomies]);
};
