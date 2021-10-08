import React from "react";
import { HStack, Text, useToken, chakra, Link } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { TCollection } from "@dubbie/@types/venduro.types";
const LeftIcon = chakra(AiOutlineRight);
import NextLink from "next/link";
type Props = {
  collection: TCollection;
};
function CategoryComponent({ collection }: Props) {
  const black = useToken("colors", "black");
  return (
    <HStack
      bg="white"
      width={250}
      py={"4"}
      px={"4"}
      justifyContent="space-between"
      flexDirection="row"
      borderRadius="base"
      sx={{
        boxShadow: `2px 5px 10px -7px ${black}`,
        cursor: "pointer",
        margin: "10px",
        transition: "0.2s ease",
        _hover: {
          transform: "scale(1.08)",
        },
      }}
    >
      <NextLink passHref href={`/categories/${collection.slug}`}>
        <Link fontWeight="semibold" fontSize="md">
          {collection.name}
        </Link>
      </NextLink>
      <LeftIcon fontWeight="bold" mr={4} />
    </HStack>
  );
}

export default CategoryComponent;
