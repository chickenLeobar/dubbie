import create from "zustand";
import { redux } from "zustand/middleware";

import { Product, Category } from "@dubbie/@types/eccomerce.types";
/**
 *
 * should be in state :
 * products, categories , current query ,
 */

interface State {
  categories: Category[];
  products: Product[];
}

interface Operations {
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
}
type Complete = State & Operations;
export const useEcommerceStore = create<Complete>((set) => ({
  categories: [],
  products: [],
  setCategories: (categories) => {
    set({ categories });
  },
  setProducts: (products) => {
    set({ products });
  },
}));

export const actionsSelector = (state: Complete) =>
  [state.setCategories, state.setProducts] as const;

export const selectCategories = (state: Complete) => state.categories;

export const selectProductsByCategorie = (
  { products, categories }: Complete,
  slug: string
) => {
  return [
    products.filter((pr) => pr.categories.some((cat) => cat.slug == slug)),
    categories.find((ca) => ca.slug == slug),
  ] as const;
};

export const selectReccommended = ({ products }: Complete) => {
  return products.filter((pr) =>
    pr.categories.some((d) => d.slug == "recomendados")
  );
};

export type CatalogItem = {
  category: Category;
  products: Product[];
};
export type Catalog = CatalogItem[];

export const selectCatalog = (
  { products, categories }: Complete,
  maxItems: number
) => {
  return categories.map((cat) => {
    return {
      category: cat,
      products: products
        .filter((pr) => pr.categories.some((cat) => cat.id == cat.id))
        .slice(0, maxItems),
    };
  }) as Catalog;
};
