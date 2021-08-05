import React from "react";
import { CategoryRoot } from "@dubbie/components/ui/category";
import { Container, Flex, Text } from "@chakra-ui/react";

import {
  useEcommerceStore,
  selectCollections,
} from "@dubbie/stores/global/eccomerce";
function Collections() {
  const categories = useEcommerceStore(selectCollections);
  let categorieRender = categories.map((categorie, idx) => {
    return <CategoryRoot key={idx} collection={categorie} />;
  });
  return (
    <Container my={3}>
      <Text textAlign="center" my={"14"} fontWeight="semibold" fontSize="large">
        Collecciones
      </Text>
      <Flex w={"100%"} wrap="wrap">
        {categorieRender}
      </Flex>
    </Container>
  );
}

export default Collections;
