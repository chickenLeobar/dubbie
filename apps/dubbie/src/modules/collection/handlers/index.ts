import {
  SearchProductsQuery,
  SearchProductsQueryVariables,
  SearchProductsDocument,
} from "@dubbie/common/generated";
import { QueryClient } from "react-query";

import { GetServerSidePropsContext } from "next";
import { SearchProducts } from "@dubbie/common/generated";

import clientGraphql from "@dubbie/lib/graphql-request";
import * as facets from "../utils/facets";
import { dehydrate } from "react-query/hydration";
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.params as { slug: string };

  const queryClinent = new QueryClient();
  const variables: SearchProductsQueryVariables = {
    input: {
      collectionSlug: slug,
    },
  };

  await queryClinent.prefetchQuery(["SearchProducts", variables], async () =>
    clientGraphql.request<SearchProductsQuery, SearchProductsQueryVariables>(
      SearchProductsDocument,
      variables
    )
  );
  // const {
  //   search: { items, facetValues },
  // } = await clientGraphql.request<
  //   SearchProducts.Query,
  //   SearchProducts.Variables
  // >(SearchProductsDocument, {
  //   input: {
  //     collectionSlug: slug,
  //     take: 10,
  //   },
  // });

  return {
    props: {
      // items,
      // facets: facets.groupFacetValues(facetValues),
      dehydratedState: dehydrate(queryClinent),
    },
  };
};

export default getServerSideProps;
