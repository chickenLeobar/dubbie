import { createSelector } from "reselect";

import { arrayToTree } from "@dubbie/utils/ArrayToTree";

import { Complete } from "./eccomerce";

// TODO: this is configurations , implement configurations
const EXCLUDE_CATEGORIES = ["recomendados"];

export const selectCollections = (state: Complete) => state.collections;

export const selectProducts = (state: Complete) => state.products;

export const selectFacets = (state: Complete) => state.facets;

export const selectectFacetIds = (state: Complete) => state.selectedFacetsIds;

export const selectCurrentCollection = (state: Complete) =>
  state.currentCollection;

export const selectProductsBySearch = createSelector(
  selectCurrentCollection,
  selectProducts,
  selectectFacetIds,
  (collection, products, facetsIds) => {
    return products;
  }
);
export const getProductsByCollectionSlug = (slug: string) => {
  return createSelector(
    selectCollections,
    selectProducts,
    (collections, products) => {
      const collection = collections.find((cl) => cl.slug == slug);
      if (!collection) {
        return [];
      }
      let _cache = new Set();
      return products.filter((product) => {
        let resp = product.collectionIds.includes(collection.id);
        _cache.has(product.slug) && (resp = false);
        _cache.add(product.slug);
        return resp;
      });
    }
  );
};

export const selectCollectionsTree = createSelector(
  selectCollections,
  (collections) => {
    collections = collections.filter(
      (d) => !EXCLUDE_CATEGORIES.includes(d.slug)
    );
    return arrayToTree(collections);
  }
);

export const selectCollectionBySlug = (slug: string) =>
  createSelector(selectCollections, (collections) =>
    collections.find((cl) => cl.slug == slug)
  );

export const actionsSelector = (state: Complete) => ({
  setCollections: state.setCollections,
  setProducts: state.setProducts,
  setFacets: state.setFacets,
  setPartialState: state.setPartialState,
});

/*=============================================
=            CART SELECTORS            =
=============================================*/
