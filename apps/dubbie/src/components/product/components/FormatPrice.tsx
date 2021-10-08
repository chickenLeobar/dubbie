import React from "react";
import { TProduct } from "@dubbie/@types/venduro.types";
function FormatPrice({ children }: { children: TProduct }) {
  if (!children.price?.__typename) {
    return null;
  }
  return (
    <>{children.price.__typename == "SinglePrice" && children.price.value}</>
  );
}

export default FormatPrice;
