import { GetStaticProps, GetStaticPropsContext } from "next";
// import eccomercejs from "@dubbie/lib/eccomece";
// import { Product, Category } from "@dubbie/@types/eccomerce.types";
import grapqhlRequest from "@dubbie/lib/graphql-request";
import {
  GetCollectionsDocument,
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
  SearchProductsDocument,
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from "@dubbie/common/generated";

export type PropsHandler = {
  collections: GetCollectionsQuery["collections"]["items"];
  products: SearchProductsQuery["search"]["items"];
};

const handler: GetStaticProps<PropsHandler> = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const {
      collections: { items: collections },
    } = await grapqhlRequest.request<
      GetCollectionsQuery,
      GetCollectionsQueryVariables
    >(GetCollectionsDocument);

    const {
      data: {
        search: { items: products },
      },
      extensions,
    } = await grapqhlRequest.rawRequest<
      SearchProductsQuery,
      SearchProductsQueryVariables
    >(SearchProductsDocument, {
      input: {},
    });

    return {
      props: {
        collections: collections,
        products: products,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default handler;
