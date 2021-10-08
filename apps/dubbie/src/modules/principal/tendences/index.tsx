import React from "react";
import ProductCard from "../../../components/product/ProductCard";
import { Text, Container, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  getProductsByCollectionSlug,
  useEcommerceStore,
} from "@dubbie/stores/global/eccomerce";
import shallow from "zustand/shallow";
export default function index() {
  const products = useEcommerceStore(
    getProductsByCollectionSlug("recomendados"),
    shallow
  );

  const productRender = products.map((pr, idx) => {
    return (
      <SwiperSlide key={idx}>
        <ProductCard product={pr} />
      </SwiperSlide>
    );
  });
  return (
    <Container
      d="flex"
      my={"14"}
      flexDirection="column"
      justifyContent="center"
      maxWidth="container.xl"
    >
      <Text textAlign="center" fontWeight="semibold" fontSize="large">
        Tendencias
      </Text>
      <Flex justifyContent="center" flexDirection="row">
        <Swiper style={{ width: "100%" }} spaceBetween={10} slidesPerView={3}>
          {productRender}
        </Swiper>
      </Flex>
    </Container>
  );
}
