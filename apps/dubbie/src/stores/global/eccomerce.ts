import create from "zustand";
import { redux } from "zustand/middleware";

import { TCollection, TProduct } from "@dubbie/@types/venduro.types";
/**
 *
 * should be in state :
 * products, categories , current query ,
 */

interface State {
  // categories: Category[];
  products: TProduct[];
  collections: TCollection[];
}

interface Operations {
  // setCategories: (categories: Category[]) => void;
  setCollections: (collections: TCollection[]) => void;
  setProducts: (products: TProduct[]) => void;
}
type Complete = State & Operations;
export const useEcommerceStore = create<Complete>((set) => ({
  collections: [],
  products: [],
  setCollections: (collections) => {
    set({ collections });
  },
  setProducts: (products) => {
    set({ products });
  },
}));

export const actionsSelector = (state: Complete) => ({
  setCollections: state.setCollections,
  setProducts: state.setProducts,
});

export const selectCollections = (state: Complete) => state.collections;

export const getProductsByCollectionSlug = (slug: string) => {
  return (state: Complete) => {
    const collection = state.collections.find((cl) => cl.slug == slug);
    if (!collection) {
      return [];
    }
    let _cache = new Set();
    return state.products.filter((product) => {
      let resp = product.collectionIds.includes(collection.id);
      _cache.has(product.slug) && (resp = false);
      _cache.add(product.slug);
      return resp;
    });
  };
};
