import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEcommerceStore } from "@dubbie/stores/global/eccomerce";
import useUiStore, {
  selectActions,
  selectCartDrawerState,
} from "@dubbie/stores/useUiStore";
import React from "react";
import { CartItem } from "./components/CartItem";

function Cart() {
  const open = useUiStore(selectCartDrawerState);
  const { toogleCartDrawer } = useUiStore(selectActions);
  const { cart } = useEcommerceStore();

  return (
    <Drawer
      isOpen={open}
      size="md"
      placement="right"
      isFullHeight
      blockScrollOnMount={true}
      onClose={toogleCartDrawer}
    >
      <DrawerOverlay></DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text textAlign="center" fontWeight="bold" fontSize="x-large">
            Carrito
          </Text>
        </DrawerHeader>
        <DrawerBody mt={5} bg="white">
          <VStack spacing={4} mt={2}>
            {cart?.lines &&
              cart.lines.map((pr, idx) => {
                return <CartItem line={pr} key={idx} />;
              })}
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
              {cart?.total || 0}
            </Text>
          </HStack>
          <Button variant="black">Comprar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;
