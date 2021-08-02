import { Flex, Container } from "@chakra-ui/react";
import React, { useCallback } from "react";
import NavbarRooot from "@dubbie/components/common/NavBar/NavbarRoot";
import { Hero } from "@dubbie/modules/collection/Hero";
import {
  selectProductsByCategorie,
  useEcommerceStore,
} from "@dubbie/stores/global/eccomerce";
import ProductsSection from "@dubbie/modules/collection/products";
import { RootFooter } from "@dubbie/components/common/footer";
import { useRouter } from "next/router";
function collection() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const [products, categorie] = useEcommerceStore(
    useCallback((state) => selectProductsByCategorie(state, slug), [])
  );
  console.log(categorie);

  return (
    <>
      <Flex width="100vw" bg="black">
        <Container maxWidth="container.xl">
          <NavbarRooot />
        </Container>
      </Flex>
      <Hero categorie={categorie.name} />
      <ProductsSection products={products} />
      <RootFooter />
    </>
  );
}

export default collection;
