import { gql } from "graphql-request";
import {
  CART_FRAGMENT,
  ERROR_RESULT_FRAGMENT,
} from "../../../common/graphql/fragments.graphql";
import { ASSET_FRAGMENT } from "./../fragments.graphql";
export const SEARCH_PRODUCTS = gql`
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        collectionIds
        productId
        slug
        productName
        description
        facetIds
        price {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
        }
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
      }
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION = gql`
  query GetCollection($id: ID, $slug: String) {
    collection(id: $id, slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        ...Asset
      }
      breadcrumbs {
        id
        slug
        name
      }
      children {
        id
        slug
        featuredAsset {
          ...Asset
        }
        name
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
      id
      name
      description
      variants {
        id
        name
        options {
          code
          name
        }
        price
        priceWithTax
        sku
      }
      featuredAsset {
        ...Asset
      }
      assets {
        ...Asset
      }
      collections {
        id
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: ID!, $qty: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $qty) {
      ...Cart
      ...ErrorResult
      ... on InsufficientStockError {
        order {
          ...Cart
        }
      }
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;
