import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getToken } from "@Common";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { css } from "@emotion/react";
import DefaultSlide from "./Slides/Default";
import { Swiper as SwiperInstance } from "swiper";
SwiperCore.use([Navigation, Pagination]);

const Wrapper = styled.div`
  position: relative;
  .content {
    background: ${getToken("colors.black")};
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    .side {
      height: 350px;
    }
  }
`;

import { AiOutlineLeft } from "react-icons/ai";

const Arrow = styled.button<{ direction: "normal" | "inverse" }>`
  border: none;
  outline: none;
  position: absolute;
  top: 40%;
  left: -40px;
  padding: ${getToken("space[1]")};
  z-index: 50;
  svg {
    color: ${getToken("colors.white")};
    font-size: 35px;
  }
  &:hover {
    background: ${getToken("colors.white")};
    svg {
      color: ${getToken("colors.black")};
    }
  }
  ${(props) =>
    props.direction == "inverse" &&
    css`
      transform: rotate(180deg);
      left: initial !important;
      right: -40px !important;
    `}
`;

function Hero() {
  const [swiper, setSwiper] = useState<SwiperInstance>(undefined);

  const nextSlide = useCallback(() => {
    swiper?.slideNext();
  }, []);
  const prevSlide = useCallback(() => {
    swiper?.slidePrev();
  }, []);

  return (
    <Wrapper>
      <Swiper onSwiper={setSwiper} pagination={true} className="hero_swiper">
        <SwiperSlide className="content">
          <DefaultSlide />
        </SwiperSlide>
        <SwiperSlide className="content">
          <DefaultSlide />
        </SwiperSlide>
        <SwiperSlide className="content">
          <DefaultSlide />
        </SwiperSlide>
        <SwiperSlide className="content">
          <DefaultSlide />
        </SwiperSlide>
      </Swiper>
      <Arrow onClick={() => prevSlide()} direction="normal">
        <AiOutlineLeft />
      </Arrow>
      <Arrow direction="inverse" onClick={() => nextSlide()}>
        <AiOutlineLeft />
      </Arrow>
    </Wrapper>
  );
}

export default Hero;
