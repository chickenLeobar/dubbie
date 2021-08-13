import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Logo } from "@Common";
import React, { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
function Register() {
  const { setPage, page } = useAuthStore();
  useEffect(() => {
    console.log(page);
  }, [page]);
  return (
    <VStack
      spacing={5}
      alignItems="center"
      direction="column"
      justifyContent="center"
      my={2}
      display={page == "register" ? "flex" : "none"}
    >
      <Logo width="" size="small" mode="black" />
      <Heading fontWeight="black" size="md" width="70%" textAlign="center">
        Convierte en miembro de dubbie
      </Heading>
      <VStack mt={2} width="80%" spacing={5}>
        <FormControl>
          <Input borderRadius="2px" placeholder="Nombres" />
        </FormControl>
        <FormControl>
          <Input borderRadius="2px" placeholder="Apellidos" />
        </FormControl>
        <FormControl>
          <Input borderRadius="2px" placeholder="Correo electronico" />
        </FormControl>
        <FormControl>
          <Checkbox>
            <Text fontSize="small" color="blackAlpha.500">
              Recibir correos de dubbie sobre nuevas ofertas, nuevos productos y
              beneficios para miembros
            </Text>
          </Checkbox>
        </FormControl>
        <Text color="blackAlpha.500" fontSize="small" textAlign="center">
          Al registrarte aceptas haber leido nuestras{" "}
          <Link fontWeight="semibold" color="black">
            Política de privacidad
          </Link>{" "}
          y Términos de uso
        </Text>
      </VStack>
      <Button variant="black">Iniciar sesión</Button>
      <Text color="blackAlpha.400">
        ¿Ya eres miembro?
        <Link pl={2} color="black" onClick={() => setPage("loguin")}>
          Iniciar sesión
        </Link>
      </Text>
    </VStack>
  );
}

export default Register;
