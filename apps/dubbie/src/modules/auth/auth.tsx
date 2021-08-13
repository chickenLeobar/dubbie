import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Register, Login } from "./";

import { useModalAuth } from "./useModalAuth";
function Auth() {
  const { open } = useModalAuth();
  const { onClose, isOpen } = useDisclosure({
    isOpen: open,
    onClose: () => {
      useModalAuth.getState().set((state) => ({ open: !state.open }));
    },
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="0px" p={3} shadow="xl">
        <ModalCloseButton />
        <Register />
        <Login />
      </ModalContent>
    </Modal>
  );
}

export default Auth;
