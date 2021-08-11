import create from "zustand";

import {
  TCollection,
  TProduct,
  FacetWithValues,
  Cart,
} from "@dubbie/@types/venduro.types";

interface State {
  products: TProduct[];
  collections: TCollection[];
  facets: FacetWithValues[];
  selectedFacetsIds: number[];
  currentCollection: TCollection | null;
  cart: Cart | null;
}
export type Complete = State & Operations;

interface Operations {
  setCollections: (collections: TCollection[]) => void;
  setProducts: (products: TProduct[]) => void;
  setFacets: (facets: FacetWithValues[]) => void;
  setPartialState: (state: Partial<Complete>) => void;
}

export const useEcommerceStore = create<Complete>((set) => ({
  collections: [],
  products: [],
  facets: [],
  currentCollection: null,
  selectedFacetsIds: [],
  cart: null,
  setCollections: (collections) => {
    set({ collections });
  },
  setProducts: (products) => {
    set({ products });
  },
  setFacets: (facets: FacetWithValues[]) => {
    set({ facets });
  },
  setPartialState: (state) => {
    set((_state) => ({
      ..._state,
      ...state,
    }));
  },
}));

export * from "./eccomerce.selectors";
