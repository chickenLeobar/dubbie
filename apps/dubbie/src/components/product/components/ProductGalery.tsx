import { getToken } from "@Common";
import styled from "@emotion/styled";
import React, { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

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
}

function ProductGalery({ images, size }: ProductGaleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const config = galeryConfigurations[size || "normal"];

  const slidesGalery = images.map((image, idx) => {
    return (
      <SwiperSlide key={idx}>
        <SwiperSliderContent>
          <img src={image} style={{ width: config.width.product }} />
        </SwiperSliderContent>
      </SwiperSlide>
    );
  });

  const thumbnails = images.map((image, idx) => {
    return (
      <SwiperSlide key={idx} className="thumbnail">
        <img src={image} style={{ width: config.width.thumbanail }} />
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
