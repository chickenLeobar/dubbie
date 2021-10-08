import React from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {
  Stack,
  useToken,
  InputGroup,
  InputLeftElement,
  Input,
  chakra,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import styled from "@emotion/styled";
import { getToken, Logo } from "@Common";

import useUiStore, { searchBarSlice } from "@dubbie/stores/useUiStore";

const Wrapper = styled(motion.div)`
  z-index: ${getToken("zIndices.overlay")};
  box-sizing: border-box;
  position: fixed;
  &.open {
    background: white;
  }
  left: 120px;
  width: 100vw;
  &.input_search {
    max-width: 350px;
  }
  left: 0;
  top: 0;
  height: 350px;
  display: flex;
  justify-content: center;
`;

const WrapperVariants = {
  open: {
    opacity: 1,
    top: 0,
    transition: {
      type: "tween",
    },
  },
  close: {
    top: "-500px",
    opacity: 0,
    transition: {
      type: "tween",
      stiffness: 10,
    },
  },
};

const WrapperIcon = styled.div`
  svg {
    font-size: ${getToken("fontSizes.lg")};
  }
  cursor: pointer;
  padding: 5px;

  border: 1px solid transparent;
  &.close {
    color: ${getToken("colors.white")};
  }
  &.open {
    color: ${getToken("colors.black")};
    display: none;
  }
  &:hover {
    border: 1px solid ${getToken("colors.white")};
  }
  &.closebutton {
    width: 50px;
    height: 50px;
    background: ${getToken("colors.secondary")};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: ${getToken("colors.red.100")};
    }
  }
`;

const WrapperContent = chakra(
  styled.div`
    width: 80%;
    margin: 0 auto;
  `
);

type ContenInSearchProps = {
  onClose: () => void;
};

const ContenInSearh = ({ onClose }: ContenInSearchProps) => {
  const toggle = () => {
    onClose();
  };
  return (
    <WrapperContent
      marginTop={"25px"}
      direction="row"
      justifyContent="center"
      spacing={20}
    >
      <Stack direction={"row"} spacing={20} justifyContent="space-between">
        <Logo mode="black" width="150px" />
        <InputGroup className="input_search" maxWidth="550px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch />}
          ></InputLeftElement>
          <Input placeholder="Buscar" />
        </InputGroup>
        <WrapperIcon
          as="button"
          onClick={() => toggle()}
          className="closebutton"
        >
          <AiOutlineClose />
        </WrapperIcon>
      </Stack>
      <Stack
        marginLeft={"35%"}
        direction="column"
        marginTop="35px"
        justifyContent="center"
      >
        <Text color="gray.400">Buscados recientemente</Text>
        <Stack spacing={3} as="ul" listStyleType="none">
          <Box as="li">
            <Link>Audifonos</Link>
          </Box>
          <Box as="li">
            <Link>Computadoras</Link>
          </Box>
          <Box as="li">
            <Link>Tablets</Link>
          </Box>
        </Stack>
      </Stack>
    </WrapperContent>
  );
};

function SearchMenu() {
  const [isOpen, toggleSeach] = useUiStore(searchBarSlice);
  const [blackColor, whiteColor] = useToken("colors", ["black", "white"]);

  return (
    // <AnimatePresence>
    <Wrapper
      variants={WrapperVariants}
      animate={isOpen ? "open" : "close"}
      className={isOpen ? "open" : "close"}
    >
      <ContenInSearh onClose={() => toggleSeach()} />
    </Wrapper>
    // </AnimatePresence>
  );
}

export default SearchMenu;
