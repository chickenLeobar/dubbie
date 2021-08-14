import { getToken } from "@Common";
import styled from "@emotion/styled";
import React, { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import NextImage from "next/image";
import { TProduct } from "@dubbie/@types/venduro.types";
SwiperCore.use([Thumbs, Navigation]);

const SwiperWrapper = styled.div`
  /* width: 500px; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  --swiper-navigation-color: ${getToken("colors.black")};
  .swiper {
    width: 100%;
  }
`;

const SwiperSliderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  min-height: 350px;
  /* border: 2px solid black; */
  img {
    object-fit: contain;
  }
`;

type SizeGalery = "normal";

type Config = {
  width: {
    galery: string;
    thumbanail: string;
    product: string;
  };
};

const galeryConfigurations: { [T in SizeGalery]?: Config } = {
  normal: {
    width: {
      galery: "500px",
      thumbanail: "100px",
      product: "350px",
    },
  },
};

interface ProductGaleryProps {
  images: string[];
  size?: SizeGalery;
  product: TProduct;
}

function ProductGalery({ images, size, product }: ProductGaleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { assets, featuredAsset } = product;
  console.log(product);

  const config = galeryConfigurations[size || "normal"];

  const slidesGalery = assets.map((asset, idx) => {
    return (
      <SwiperSlide key={idx}>
        <SwiperSliderContent>
          <NextImage
            src={asset.preview}
            width={config.width.product}
            height={config.width.product}
            objectFit="contain"
          />
        </SwiperSliderContent>
      </SwiperSlide>
    );
  });

  const thumbnails = assets.map((asset, idx) => {
    return (
      <SwiperSlide key={idx} className="thumbnail">
        <NextImage
          src={asset.preview}
          width={config.width.thumbanail}
          height={config.width.thumbanail}
          objectFit="contain"
        />
      </SwiperSlide>
    );
  });

  return (
    <SwiperWrapper style={{ width: config.width.galery }}>
      <Swiper
        className="swiper"
        slidesPerView={1}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {slidesGalery}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
      >
        {thumbnails}
      </Swiper>
    </SwiperWrapper>
  );
}

export default ProductGalery;
