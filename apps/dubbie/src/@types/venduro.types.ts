import {
  SearchProductsQuery,
  GetCollectionsQuery,
} from "./../common/generated/index";

export type TProduct = SearchProductsQuery["search"]["items"][0];

export type TCollection = GetCollectionsQuery["collections"]["items"][0];
