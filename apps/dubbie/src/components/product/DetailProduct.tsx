import React, { useState } from "react";
import {
  Box,
  Container,
  HStack,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react";
import { ProductGalery } from "./components";

import { PaymentIcons } from "@dubbie/components/ui/paymen_icons";
import { css } from "@emotion/react";
import { Button, VStack } from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import styled from "@emotion/styled";
import { FormatPrice } from "@dubbie/components/product";

import { TProduct } from "@dubbie/@types/venduro.types";
const fakeImage = [
  "/products/mando.png",
  "/products/mando.png",
  "/products/mando.png",
  "/products/mando.png",
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.2rem;
  /* border: 2px solid black; */
  justify-content: center;
  .product_detail {
    align-items: center;
    margin: 60px;
    .box {
      max-width: 450px;
    }
  }
  .payment_icons {
    justify-content: flex-start;
  }
`;

const ButtonQuantity = styled(Button)`
  width: 50px;
`;

type TProductProps = {
  product: TProduct;
};

function SiglePresentation({ product }: TProductProps) {
  const [fonIconSize] = useToken("fontSizes", ["3xl"]);

  return (
    <Container size="lg">
      <Wrapper>
        <ProductGalery product={product} images={fakeImage} />
        <Box className="product_detail">
          <Stack className="box" spacing={5} mt={1}>
            <Text fontWeight="semibold" fontSize="3xl">
              {product.name}
            </Text>
            <Text>{product.description}</Text>
            <PaymentIcons
              className="payment_icons"
              svgstyles={css`
                font-size: ${fonIconSize};
              `}
            />
            <Stack spacing={5}>
              <HStack spacing={10}>
                <Text fontWeight="bold">Precio:</Text>
                <Text fontWeight="light">
                  <FormatPrice>{product}</FormatPrice>
                </Text>
              </HStack>
              <HStack spacing={10}>
                <Text fontWeight="bold">Cantidad:</Text>
                <HStack as="div" fontWeight="light">
                  <ButtonQuantity variant="white">
                    <AiOutlineLeft />
                  </ButtonQuantity>
                  <Text fontWeight="bold">1</Text>
                  <ButtonQuantity variant="white">
                    <AiOutlineRight />
                  </ButtonQuantity>
                </HStack>
              </HStack>
              <HStack>
                <Button variant="black" p={1}>
                  comprar
                </Button>
                <Button variant="black" rightIcon={<FaCartPlus />}>
                  comprar
                </Button>
                <Button variant="black" width="50px">
                  <AiOutlineHeart />
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Wrapper>
    </Container>
  );
}

export default SiglePresentation;
