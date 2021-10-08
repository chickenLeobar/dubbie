import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Text, Box, Button, Stack, useTheme } from "@chakra-ui/react";
const size = 250;
import styled from "@emotion/styled";
import {
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineSearch,
  AiOutlineLink,
} from "react-icons/ai";

import { useHover, getToken } from "@Common";

const variables = {
  widthCircleMenu: "35px",
};

const ImageContainer = styled.div`
  background: #faf6f4;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 35px;
  top: 10px;
  right: 20px;
  z-index: ${getToken("zIndices.docked")};
  &.hide {
    visibility: hidden;
  }
`;

const ButtonMenu = styled.a`
  background: ${getToken("colors.white")};
  border: none;
  outline: none;
  margin: 5px;
  border-radius: 50%;
  text-decoration: none;
  width: ${variables.widthCircleMenu};
  height: ${variables.widthCircleMenu};
  display: flex;
  justify-content: center;
  align-content: center;
  svg {
    font-size: 20px;
    align-self: center;
    padding: 0;
    margin: 0;
  }
  &:hover {
    box-shadow: ${getToken("shadows.lg")};
    transform: scale(1.08);
  }
`;
import { TProduct } from "@dubbie/@types/venduro.types";
import { ImageRamdom } from "@dubbie/components/common/Image";
import { useAddToCartEffect } from "@dubbie/stores/global/eccomerce";
type Props = {
  product?: TProduct;
};

function ProductCard({ product }: Props) {
  const [refObject, isHover] = useHover<HTMLDivElement>();

  const { addItemToCart } = useAddToCartEffect();

  const router = useRouter();

  if (!product) {
    <div>TOODO</div>;
  }

  return (
    <Box
      textAlign="center"
      m={4}
      width={300}
      position="relative"
      sx={{
        transition: "0.2s ease",
        _hover: {
          cursor: "pointer",
          shadow: "xl",
        },
      }}
      ref={refObject}
    >
      {/* menu */}
      <MenuContainer className={!isHover && "hide"}>
        <ButtonMenu>
          <AiFillHeart />
        </ButtonMenu>
        {/* <NextLink passHref href={`/product/${product.slug}`}> */}
        <ButtonMenu>
          <AiOutlineSearch />
        </ButtonMenu>
        {/* </NextLink> */}

        <NextLink passHref href={`/product/${product.slug}`}>
          <ButtonMenu>
            <AiOutlineLink />
          </ButtonMenu>
        </NextLink>
      </MenuContainer>
      <ImageContainer>
        <ImageRamdom asset={product.productAsset} width={size} height={size} />
      </ImageContainer>
      <Stack spacing={3} p={2} flexDirection="column" alignItems="center">
        <Text fontWeight="semibold">{product.productName}</Text>
        <Text fontWeight="extrabold">
          {
            (product.price as { __typename?: "SinglePrice"; value: number })
              .value
          }
        </Text>
        <Button
          leftIcon={<AiOutlineShoppingCart />}
          my={2}
          variant="white"
          border="1px"
          onClick={() => addItemToCart(product)}
        >
          Carrito
        </Button>
      </Stack>
    </Box>
  );
}

export default ProductCard;
