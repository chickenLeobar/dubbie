import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Text,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";

import useUiStore, {
  selectCartDrawerState,
  selectActions,
} from "@dubbie/stores/useUiStore";
import NextImage from "next/image";
const CartItem = () => {
  return (
    <HStack maxHeight="100px">
      <Box p={2}>
        <NextImage
          src="/products/mando.png"
          objectFit="contain"
          width="80px"
          height="80px"
        />
      </Box>
      <VStack spacing={1} alignItems="flex-start">
        <Text>Master Dinamyc</Text>
        <Text color="blackAlpha.400">Electronics</Text>
        <Text color="red" fontWeight="bold" fontSize="lg">
          $399.95
        </Text>
      </VStack>
      <Flex width="150px" justifyContent="flex-end" alignItems="center">
        <HStack>
          <Button width="25px" height="25px" color="white" bg={"#C4C4C4"}>
            +
          </Button>
          <Text fontWeight="semibold">8</Text>
          <Button width="25px" height="25px" color="white" bg={"#C4C4C4"}>
            +
          </Button>
        </HStack>
      </Flex>
    </HStack>
  );
};

function Cart() {
  const open = useUiStore(selectCartDrawerState);
  const { toogleCartDrawer } = useUiStore(selectActions);
  return (
    <Drawer
      isOpen={open}
      size="sm"
      placement="right"
      isFullHeight
      onClose={toogleCartDrawer}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody mt={10} bg="white">
          <Text textAlign="center" fontWeight="bold" fontSize="x-large">
            Carrito
          </Text>
          <VStack spacing={4} mt={2}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </VStack>
        </DrawerBody>
        <DrawerFooter
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          height="150px"
        >
          <HStack width="100%" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">
              Total:
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              150 s/.
            </Text>
          </HStack>
          <Button variant="black">Comprar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;
