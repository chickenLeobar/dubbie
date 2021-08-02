import { Container, Flex, useToken } from "@chakra-ui/react";
import { NavBarRoot } from "../components/common/NavBar";
import { useEffect } from "react";
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
  useEcommerceStore,
  actionsSelector,
} from "@dubbie/stores/global/eccomerce";
export const getStaticProps = handler;

export function Index({ products, categories }: PropsHandler) {
  const whiteColor = useToken("colors", ["white"]);
  const [setCategories, setProducts] = useEcommerceStore(actionsSelector);
  if (!products || !categories) {
    return <div>load</div>;
  }
  useEffect(() => {
    setCategories(categories);
    setProducts(products);
  }, [products, categories]);

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

      {/* Hero */}
      <Collections />
      <Tendences />
      {/* collections */}
      {/* tendences */}
      {/* addon */}
      <OCassionalProduct />
      <Qualities />
      {/* goals */}
      {/* footer */}
      <RootFooter />
    </>
  );
}

export default Index;
