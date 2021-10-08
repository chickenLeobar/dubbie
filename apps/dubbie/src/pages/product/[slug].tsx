import React from "react";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import { NavBarRoot } from "@dubbie/components/common/NavBar";
import { DetailProduct } from "@dubbie/components/product";
import { Container, Flex, Accordion, Text } from "@chakra-ui/react";
import request from "@dubbie/lib/graphql-request";
import {
  GetProductDetail,
  GetProductDetailDocument,
} from "@dubbie/common/generated";
import { RootFooter } from "@dubbie/components/common/footer";
import { TProduct } from "@dubbie/@types/venduro.types";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { slug } = ctx.params as { slug: string };

  const data = await request.request<
    GetProductDetail.Query,
    GetProductDetail.Variables
  >(GetProductDetailDocument, {
    slug: slug,
  });

  return {
    props: {
      product: data.product,
    },
  };
};

interface ProductPageProps {
  product: TProduct;
}

function ProductPage({ product }: ProductPageProps) {
  console.log(product);

  return (
    <>
      <Flex width="100vw" bg="black">
        <Container size="lg">
          <NavBarRoot />
        </Container>
      </Flex>

      <DetailProduct product={product} />

      <Container size="md">
        <Accordion allowMultiple defaultIndex={[0]}>
          {/* <DescriptionProduct /> */}
        </Accordion>
      </Container>

      <Container size="md" my={10}>
        <Text fontWeight="bold" fontSize="3xl" textAlign="center">
          Completa tu compra
        </Text>
        {/* <ProductRowGalery /> */}
      </Container>

      <RootFooter />
    </>
  );
}

export default ProductPage;
