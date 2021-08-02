import React from "react";
import { NavBarRoot } from "@dubbie/components/common/NavBar";
import { Container, Flex, Accordion, Text } from "@chakra-ui/react";
import SinglePresentation from "@dubbie/components/product/SiglePresentation";
import { RootFooter } from "@dubbie/components/common/footer";
import { DescriptionProduct } from "@dubbie/modules/productSingle";
import { ProductRowGalery } from "@dubbie/components/product";
function Product() {
  return (
    <>
      <Flex width="100vw" bg="black">
        <Container size="lg">
          <NavBarRoot />
        </Container>
      </Flex>
      <SinglePresentation />
      {/*   */}
      <Container size="md">
        <Accordion allowMultiple defaultIndex={[0]}>
          <DescriptionProduct />
        </Accordion>
      </Container>
      <Container size="md" my={10}>
        <Text fontWeight="bold" fontSize="3xl" textAlign="center">
          Completa tu compra
        </Text>
        <ProductRowGalery />
      </Container>
      <RootFooter />
    </>
  );
}

export default Product;
