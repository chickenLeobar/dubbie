import React from "react";
import { GriProducts } from "./index.styles";

import ProductCard from "@dubbie/components/product/ProductCard";

import { TProduct } from "@dubbie/@types/venduro.types";

type Props = {
  products: TProduct[];
};

function ProductsGrid({ products }: Props) {
  return (
    <GriProducts>
      {products.map((product, idx) => {
        return <ProductCard product={product} key={idx} />;
      })}
    </GriProducts>
  );
}

export default ProductsGrid;
