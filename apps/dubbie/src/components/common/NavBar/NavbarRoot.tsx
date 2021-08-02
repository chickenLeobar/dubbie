import React, { FunctionComponent } from "react";
import { getToken } from "@Common";
import { PropsWithChildren } from "react";

import { Logo } from "@Common";

import { Flex, HStack, Text } from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";

import CatalogoMenu from "./components/CatalogoMenu";
import styled from "@emotion/styled";
import useUiStore, { toggleSearchBar } from "@dubbie/stores/useUiStore";
import { Portal } from "@chakra-ui/react";
import { useRefBody } from "@dubbie/utils/hooks/useRefBody";
import SearchMenu from "./components/SearchMenu";
import NextLink from "next/link";
type ButtonHeadProps = PropsWithChildren<{}>;

const ButtonHead = (props: ButtonHeadProps) => {
  return <ButtonHeader>{props.children}</ButtonHeader>;
};

const ButtonHeader = styled.button`
  background: transparent;
  svg {
    color: ${getToken("colors.white")};
  }
  font-size: ${getToken("fontSizes.lg")};
  border: none;
  outline: none;
  padding: 5px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${getToken("colors.white")};
  }
`;

const LeftMenu = () => {
  const toggleSearch = useUiStore(toggleSearchBar);

  return (
    <HStack>
      {/* <SearchMenu /> */}
      <ButtonHead>
        <AiOutlineSearch onClick={() => toggleSearch()} />
      </ButtonHead>
      <ButtonHead>
        <AiOutlineHeart />
      </ButtonHead>
      <ButtonHead>
        <AiOutlineShoppingCart />
      </ButtonHead>
    </HStack>
  );
};

function NavbarRoot() {
  const refBody = useRefBody();

  return (
    <>
      <Portal containerRef={refBody}>
        <SearchMenu />
      </Portal>
      <Flex bg="black" width="100%" py={3} justifyContent="space-between">
        <HStack>
          <NextLink href="/" passHref>
            <a href="">
              <Logo mode="white" width="120px" />
            </a>
          </NextLink>
          <Flex color="black" as="ul" d="flex">
            <CatalogoMenu />
          </Flex>
        </HStack>
        <LeftMenu />
      </Flex>
    </>
  );
}

export default NavbarRoot;
