import React from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "@emotion/styled";

type Props = {};

const Wrapper = styled.div``;

function ProductRowGalery(props: Props) {
  const slides = Array(5)
    .fill(null)
    .map((_, idx) => {
      return (
        <SwiperSlide key={idx}>
          <ProductCard />
        </SwiperSlide>
      );
    });
  return (
    <Wrapper>
      <Swiper slidesPerView={3}>{slides}</Swiper>
    </Wrapper>
  );
}

export default ProductRowGalery;
