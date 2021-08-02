import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Text,
  Flex,
  Badge,
  Stack,
  CheckboxGroup,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import { getToken } from "@Common";
import ProductCard from "@dubbie/components/product/ProductCard";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { BsFillGrid3X3GapFill as GridIcon } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";

const GridCollection = styled(motion.div)`
  display: grid;
  grid-template-areas: ". bar bar bar" "filters products products products";
  grid-template-columns: 280px repeat(3, 1fr);
  grid-row: 50px auto;
  width: 100%;
  .filters {
    max-width: 250px;
    overflow: hidden;
  }
`;

const IconBoxBar = styled.button`
  border: none;
  outline: none;
  svg {
    font-size: 20px;
  }
`;

const GriProducts = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: row dense;
  width: 100%;
  grid-gap: 10px;
  justify-items: center;
  overflow-y: scroll;
  max-height: 80vh;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    //general scroll bar
    width: 0.5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    //track es el pedacito que se mueve en el scroll
    background: ${getToken("colors.gray.900")};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    //las esquinas del scroll bar
    background: transparent;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

const FiltersComponent = () => {
  return (
    <Accordion defaultIndex={[0]} defaultChecked allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Text textAlign="left" flex="1">
            Precio
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex wrap="wrap">
            {Array(6)
              .fill(null)
              .map((_, idx) => (
                <Badge as="button" key={idx} margin={"2"}>
                  10 - 50
                </Badge>
              ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Text textAlign="left" flex="1">
            Marcas
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <CheckboxGroup>
            <VStack alignItems="start">
              <Checkbox value="sonic">Sonic</Checkbox>
              <Checkbox value="Sansung">Samsumng</Checkbox>
              <Checkbox value="Huawei">Huawei</Checkbox>
            </VStack>
          </CheckboxGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

import { Product } from "@dubbie/@types/eccomerce.types";

type Props = {
  products: Product[];
};

function Index({ products }: Props) {
  return (
    <Container mt="30px" size="lg">
      <GridCollection>
        <GridItem gridArea="bar">
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            padding="15px 10px"
            bg="secondary"
          >
            <div></div>
            <HStack alignSelf="end">
              <IconBoxBar>
                <GridIcon />
              </IconBoxBar>
              <IconBoxBar>
                <FaListUl />
              </IconBoxBar>
            </HStack>
          </Box>
        </GridItem>
        <GridItem gridArea="filters" className="filters">
          <FiltersComponent />
        </GridItem>
        <GridItem gridArea="products">
          <GriProducts>
            {products.map((product, idx) => {
              return <ProductCard product={product} key={idx} />;
            })}
          </GriProducts>
        </GridItem>
      </GridCollection>
    </Container>
  );
}

export default Index;
