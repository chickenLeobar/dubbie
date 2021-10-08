import { Button, VStack, Text } from "@chakra-ui/react";
import { Logo } from "@Common";
import React from "react";
import { useAuthStore } from "./useAuthStore";
function Login() {
  const { page, preConfirmData } = useAuthStore();
  const { closeModal } = useAuthStore.getState();

  return (
    <VStack
      spacing={20}
      alignItems="center"
      direction="column"
      justifyContent="center"
      my={2}
      px={3}
      display={page == "beforeConfirm" ? "flex" : "none"}
    >
      <Logo width="" size="small" mode="black" />
      <Text textAlign="center">
        Enviamos un email a{" "}
        <Text as="b" fontWeight="semibold">
          {preConfirmData?.email}
        </Text>{" "}
        para confirmar tu identidad. En caso no hayas recibido el correo puedes
        revisar tu carpeta de spam
      </Text>
      <Button onClick={closeModal} variant="black" type="submit">
        Listo
      </Button>
    </VStack>
  );
}

export default Login;
