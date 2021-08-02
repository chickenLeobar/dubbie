import React from "react";
import { principalMenu } from "../../../globals/contants";
import styled from "@emotion/styled";
import {
  Box,
  VStack,
  Link,
  Text,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { getToken, Logo } from "@Common";
import { PaymentIcons } from "../../ui/paymen_icons";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 50px;
  padding: 25px 0;
  align-items: center;
  border-top: 5px solid ${getToken("colors.black")};
  .payment_icons {
    border: 2px solid black;
  }
`;

function RootFooter() {
  return (
    <Wrapper>
      <VStack as="div">
        <Text fontWeight="semibold">Menú</Text>
        {/* menu */}
        <Box
          as="ul"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {principalMenu.map((item, idx) => (
            <Link key={idx}>{item}</Link>
          ))}
        </Box>
      </VStack>
      <VStack alignItems="self-start">
        <Text fontWeight="semibold">Newsletter</Text>
        <Text fontWeight="light">Suscribete para recibir ofertas</Text>
        <HStack>
          <Input placeholder="email"></Input>
          <Button variant="black">Enviar</Button>
        </HStack>
      </VStack>
      <VStack w="250px" textAlign="center">
        <Logo mode="black" width={150} />
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat,
          quam.
        </Text>
        <PaymentIcons />
      </VStack>
    </Wrapper>
  );
}

export default RootFooter;
