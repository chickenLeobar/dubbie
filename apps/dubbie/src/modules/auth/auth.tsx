import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Register, Login, VerifyPage } from "./";
import { useRouter } from "next/router";

import { useAuthStore } from "./useAuthStore";
import { BeforeConfirm } from "./";
function Auth() {
  const { modalIsOpen } = useAuthStore();
  const { openModal, setToken } = useAuthStore.getState();
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    if (!!token && typeof token == "string") {
      openModal("verify");
      setToken(token);
    }
  }, [router]);
  const { onClose, isOpen } = useDisclosure({
    isOpen: modalIsOpen,
    onClose: () => {
      useAuthStore.getState().closeModal();
    },
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="0px" p={3} shadow="xl">
        <ModalCloseButton />
        <Register />
        <Login />
        <VerifyPage />
        <BeforeConfirm />
      </ModalContent>
    </Modal>
  );
}

export default Auth;
