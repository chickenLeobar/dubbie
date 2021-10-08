import { useToast } from "@chakra-ui/react";
import { LineCart, TProduct } from "@dubbie/@types/venduro.types";
import {
  AddToCart,
  useAddToCartMutation,
  useAdjustItemQuantityMutation,
  useGetActiveOrderQuery,
  useGetCollectionQuery,
  useSearchProductsQuery,
} from "@dubbie/common/generated";
import { groupFacetValues } from "@dubbie/utils";
import { useEffect, useRef, useState } from "react";
/// this initlize facets and some products
import { useQueryClient } from "react-query";
import {
  actionsSelector,
  selectectFacetIds,
  useEcommerceStore,
} from "./eccomerce";
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

export const useAddToCartEffect = () => {
  const toast = useToast();
  const productRef = useRef<TProduct>(null);

  const addToCartMutation = useAddToCartMutation();

  const activeOrder = useGetActiveOrderQuery();

  const { setPartialState } = useEcommerceStore();

  const addItemToCart = (product: TProduct) => {
    productRef.current = product;
    addToCartMutation.mutate({
      variantId: product.productId,
      qty: 1,
    });
  };

  useEffect(() => {
    if (addToCartMutation.data) {
      const data = addToCartMutation.data.addItemToOrder;
      setPartialState({
        cart: data as AddToCart.Order,
      });
      toast({
        description:
          productRef.current.productName + " se ha agregado al carrito",
        position: "bottom-right",
      });
    }
    // activeOrder.refetch();
  }, [addToCartMutation.data]);

  // only listen  active order effects
  useEffect(() => {
    if (activeOrder.data) {
      setPartialState({
        cart: activeOrder.data.activeOrder as AddToCart.Order,
      });
    }
  }, [activeOrder.data]);

  return { addItemToCart };
};

export const useAddJustQuantityEffect = () => {
  const justQuantiyMutation = useAdjustItemQuantityMutation();
  const { setPartialState } = useEcommerceStore();
  const addJustQuantity = (line: LineCart, qty: number) => {
    justQuantiyMutation.mutate({
      id: line.id,
      qty: qty,
    });
  };
  useEffect(() => {
    if (justQuantiyMutation.data) {
      const { adjustOrderLine: order } = justQuantiyMutation.data;
      if ("code" in order) {
        setPartialState({
          cart: order,
        });
      }
    }
  }, [justQuantiyMutation.data]);

  return { addJustQuantity };
};
