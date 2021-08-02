import React from "react";
import { Box, Heading } from "@chakra-ui/react";

type Props = {
  categorie: string;
};

function Hero({ categorie }: Props) {
  return (
    <Box
      bg="black"
      height="150px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100vw"
    >
      <Heading color="white">{categorie}</Heading>
    </Box>
  );
}

export default Hero;
