import { ASSET_FRAGMENT } from "./../fragments.graphql";
import { gql } from "graphql-request";
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
