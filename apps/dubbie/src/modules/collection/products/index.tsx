import { Box, Container, GridItem, HStack } from "@chakra-ui/react";
import { TProduct } from "@dubbie/@types/venduro.types";

import {
  selectFacets,
  useEcommerceStore,
  actionsSelector,
  selectProductsBySearch,
} from "@dubbie/stores/global/eccomerce";

import React, { useEffect } from "react";
import { BsFillGrid3X3GapFill as GridIcon } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import FiltersComponent from "./FiltersComponent";
import { GridCollection, IconBoxBar } from "./index.styles";
import ProductsGridComponent from "./products.component";

const ToolBar = () => {
  return (
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
  );
};

function Index() {
  const facets = useEcommerceStore(selectFacets);

  const products = useEcommerceStore(selectProductsBySearch);
  return (
    <Container mt="30px" size="lg">
      <GridCollection>
        <GridItem gridArea="bar">
          <ToolBar />
        </GridItem>
        <GridItem gridArea="filters" className="filters">
          <FiltersComponent facets={facets} />
        </GridItem>
        <GridItem gridArea="products">
          <ProductsGridComponent products={products} />
        </GridItem>
      </GridCollection>
    </Container>
  );
}

export default Index;
