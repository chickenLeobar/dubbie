import styled from "styled-components";
import Auth from "../components/Auth";
import { Center, Text } from "@chakra-ui/react";
export function Index() {
  return (
    <Auth fallback={<h1> no molestar</h1>} roles={["admin", ":o"]}>
      <Center w="100vw" h="100vh" bg="blue.600">
        <Text fontSize="5xl">Secret route</Text>
      </Center>
    </Auth>
  );
}

export default Index;
