import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { getToken } from "@Common";
import { LineCart } from "@dubbie/@types/venduro.types";
import { useAddJustQuantityEffect } from "@dubbie/stores/global/eccomerce";
import styled from "@emotion/styled";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMinus as _AiOutlineMinus } from "react-icons/ai";
import { FiPlus as _Fiplus } from "react-icons/fi";

type ArrowsProps = {
  quantity: number;
  quantityEvent?: (qty: number) => void;
};
const FiPlus = styled(_Fiplus)``;
const FiMinus = styled(_AiOutlineMinus)``;
const ArrowButton = styled.button`
  background: ${getToken("colors.secondary")};
  padding: 7px;
  svg {
    font-size: 18px;
  }
  &:hover {
    background: ${getToken("colors.black")};
    color: ${getToken("colors.white")};
  }
`;

const Arrows = ({ quantity, quantityEvent }: ArrowsProps) => {
  const [qty, setQty] = useState(quantity);
  useEffect(() => {
    if (quantityEvent) {
      quantityEvent(qty);
    }
  }, [qty]);
  return (
    <HStack>
      <ArrowButton onClick={() => setQty(qty - 1)}>
        <FiMinus />
      </ArrowButton>
      <Text fontWeight="semibold">{qty}</Text>
      <ArrowButton onClick={() => setQty(qty + 1)}>
        <FiPlus />
      </ArrowButton>
    </HStack>
  );
};

type PropsCartItem = {
  line: LineCart;
};

export const CartItem = ({ line }: PropsCartItem) => {
  //  cart should be add item quantity
  const { addJustQuantity } = useAddJustQuantityEffect();

  const aumentQuantity = (qty: number) => {
    addJustQuantity(line, qty);
  };
  console.log(line.quantity);

  return (
    <HStack padding="10px 10px" maxWidth="430px">
      <Box p={2} width="105px">
        <NextImage
          src={line.featuredAsset.preview}
          objectFit="contain"
          width="100%"
          height="80px"
        />
      </Box>
      <VStack minWidth="220px" spacing={1} alignItems="flex-start">
        <Box>
          <Text maxWidth="150px">{line.productVariant.name}</Text>
        </Box>
        <Text color="red" fontWeight="bold" fontSize="md">
          {line.unitPrice}
        </Text>
      </VStack>
      <Flex width="150px" justifyContent="flex-end" alignItems="center">
        <Arrows quantityEvent={aumentQuantity} quantity={line.quantity} />
      </Flex>
    </HStack>
  );
};
