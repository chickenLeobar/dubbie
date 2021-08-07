import {
  useSearchProductsQuery,
  useGetCollectionQuery,
  LogicalOperator,
} from "@dubbie/common/generated";
import {
  useEcommerceStore,
  selectectFacetIds,
  actionsSelector,
} from "./eccomerce";
import { useEffect, useState } from "react";
import { groupFacetValues } from "@dubbie/utils";
/// this initlize facets and some products
import { useQueryClient } from "react-query";
export const useRefetchProducts = (slugCollection: string) => {
  const facetdIds = useEcommerceStore(selectectFacetIds);

  const [queryRefetched, setQueryRefetched] = useState(false);

  const queryClient = useQueryClient();

  const { setProducts, setFacets, setPartialState } =
    useEcommerceStore(actionsSelector);

  const { data: dataCollection, isLoading } = useGetCollectionQuery(
    {
      slug: slugCollection,
    },
    {
      // this query will not execute until slug collection exist
      enabled: !!slugCollection,
    }
  );

  const queryInitializeProducts = useSearchProductsQuery(
    {
      input: {
        collectionSlug: slugCollection,
      },
    },
    {
      enabled: !!slugCollection,
    }
  );

  const queryBySearch = useSearchProductsQuery(
    {
      input: {
        collectionSlug: slugCollection,
        facetValueIds: facetdIds.map(String),
        groupByProduct: true,
      },
    },
    {
      enabled: facetdIds.length > 0,
    }
  );

  useEffect(() => {
    if (queryBySearch.data) {
      const {
        search: { items },
      } = queryBySearch.data;
      setProducts(items);
      setQueryRefetched(true);
    }
    if (!facetdIds.length && queryRefetched) {
      // refetch all products
      queryClient.refetchQueries([
        "SearchProducts",
        {
          input: {
            collectionSlug: slugCollection,
          },
        },
      ]);
    }
  }, [queryBySearch.data]);

  useEffect(() => {
    if (queryInitializeProducts.data) {
      const {
        data: {
          search: { items, facetValues },
        },
      } = queryInitializeProducts;
      setProducts(items);
      setFacets(groupFacetValues(facetValues));
    }
    if (dataCollection) {
      setPartialState({ currentCollection: dataCollection.collection });
    }
  }, [queryInitializeProducts.data, dataCollection]);

  return {
    isLoading: isLoading || queryInitializeProducts.isLoading,
  };
};
