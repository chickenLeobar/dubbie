import {
  SearchProductsQuery,
  GetCollectionsQuery,
  AddToCart,
  GetProductDetail,
} from "./../common/generated/index";

export type TProduct = SearchProductsQuery["search"]["items"][0] &
  Partial<GetProductDetail.Product>;

export type TCollection = GetCollectionsQuery["collections"]["items"][0];

export type FacetValues = SearchProductsQuery["search"]["facetValues"];

export interface FacetWithValues {
  id: string;
  name: string;
  values: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

export type Cart = AddToCart.Order;

export type LineCart = AddToCart.Order["lines"][0];
