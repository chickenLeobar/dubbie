import { Flex, Container } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import NavbarRooot from "@dubbie/components/common/NavBar/NavbarRoot";
import { Hero } from "@dubbie/modules/collection/Hero";
import {
  selectProductsBySearch,
  selectCollectionBySlug,
  selectCurrentCollection,
  useEcommerceStore,
} from "@dubbie/stores/global/eccomerce";
import ProductsSection from "@dubbie/modules/collection/products";
import { RootFooter } from "@dubbie/components/common/footer";
import { useRouter } from "next/router";

import { useRefetchProducts } from "@dubbie/stores/global/eccomerce";

function collection() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { isLoading } = useRefetchProducts(slug);
  // this initialize all
  const collection = useEcommerceStore(selectCurrentCollection);

  if (!collection) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <Flex width="100vw" bg="black">
        <Container maxWidth="container.xl">
          <NavbarRooot />
        </Container>
      </Flex>
      <Hero categorie={collection.name} />
      <ProductsSection />
      <RootFooter />
    </>
  );
}

export default collection;
