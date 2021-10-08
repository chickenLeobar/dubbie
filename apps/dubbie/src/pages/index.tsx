import { Container, Flex, useToken } from "@chakra-ui/react";
import { useEffect } from "react";
import { NavBarRoot } from "../components/common/NavBar";
import { Hero } from "../components/common/Hero";
import { Collections } from "../modules/principal/Collections";
import Tendences from "../modules/principal/tendences";
import Qualities from "../modules/principal/Qualities";
import handler, {
  PropsHandler,
} from "@dubbie/modules/principal/handlers/initial";
import { RootFooter } from "../components/common/footer";
import OCassionalProduct from "../modules/principal/addons/OcassionProduct";

import {
  actionsSelector,
  useEcommerceStore,
} from "@dubbie/stores/global/eccomerce";

export const getStaticProps = handler;

export function Index({ collections, products }: PropsHandler) {
  const whiteColor = useToken("colors", ["white"]);

  const { setCollections, setProducts } = useEcommerceStore(actionsSelector);

  useEffect(() => {
    setCollections(collections);
    setProducts(products);
  }, [collections, products]);

  return (
    <>
      <Flex
        width="100vw"
        bg={"black"}
        justify="center"
        sx={{
          borderBottom: `3px solid ${whiteColor}`,
        }}
      >
        <Container maxWidth="container.xl">
          <NavBarRoot />
          <Hero />
        </Container>
      </Flex>
      <Collections />
      <Tendences />
      <OCassionalProduct />
      <Qualities />
      <RootFooter />
    </>
  );
}

export default Index;
