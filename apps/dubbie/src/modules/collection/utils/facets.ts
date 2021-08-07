import { SearchProducts } from "@dubbie/common/generated";

import { FacetWithValues } from "@dubbie/@types/venduro.types";

export function groupFacetValues(
  facetValues: SearchProducts.FacetValues[] | null
): FacetWithValues[] {
  if (!facetValues) {
    return [];
  }

  const facetMap = new Map<string, FacetWithValues>();
  for (const {
    count,
    facetValue: { id, name, facet },
  } of facetValues) {
    const facetFromMap = facetMap.get(facet.id);
    if (facetFromMap) {
      facetFromMap.values.push({ id, name, count });
    } else {
      facetMap.set(facet.id, {
        id: facet.id,
        name: facet.name,
        values: [{ id, name, count }],
      });
    }
  }
  return Array.from(facetMap.values());
}
