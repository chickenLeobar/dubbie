import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  useDisclosure,
  FormControl,
  Input,
  HStack,
  Button,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { Logo } from "@Common";
import { useAuthStore } from "./useAuthStore";
function Login() {
  const { setPage, page } = useAuthStore();
  return (
    <VStack
      spacing={5}
      alignItems="center"
      direction="column"
      justifyContent="center"
      my={2}
      display={page == "loguin" ? "flex" : "none"}
    >
      <Logo width="" size="small" mode="black" />
      <Heading fontWeight="black" size="md">
        Iniciar sesión
      </Heading>
      <VStack mt={2} width="80%" spacing={5}>
        <FormControl>
          <Input borderRadius="2px" placeholder="Email" />
        </FormControl>
        <FormControl>
          <Input borderRadius="2px" placeholder="Email" />
        </FormControl>

        <Flex width="100%" justifyContent="space-between">
          <FormControl>
            <Checkbox>Recordarme</Checkbox>
          </FormControl>
          <Link color="blackAlpha.500" fontSize="sm" width="350px">
            ¿Olvidaste tu contraseña?
          </Link>
        </Flex>
      </VStack>
      <Button variant="black">Iniciar sesión</Button>
      <Text color="blackAlpha.400">
        ¿No eres miembro?
        <Link pl={2} color="black" onClick={() => setPage("register")}>
          únete
        </Link>
      </Text>
    </VStack>
  );
}

export default Login;
