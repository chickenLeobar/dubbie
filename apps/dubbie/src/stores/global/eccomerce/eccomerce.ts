import create from "zustand";

import {
  TCollection,
  TProduct,
  FacetWithValues,
} from "@dubbie/@types/venduro.types";
import { GetCollections } from "@dubbie/common/generated";

interface State {
  products: TProduct[];
  collections: TCollection[];
  facets: FacetWithValues[];
  selectedFacetsIds: number[];
  currentCollection: TCollection | null;
}
interface Operations {
  setCollections: (collections: TCollection[]) => void;
  setProducts: (products: TProduct[]) => void;
  setFacets: (facets: FacetWithValues[]) => void;
  setPartialState: (state: Partial<State>) => void;
}
export type Complete = State & Operations;

export const useEcommerceStore = create<Complete>((set) => ({
  collections: [],
  products: [],
  facets: [],
  currentCollection: null,
  selectedFacetsIds: [],
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
