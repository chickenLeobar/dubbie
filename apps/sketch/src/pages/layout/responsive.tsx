import React from 'react';
import {
  Box,
  Badge,
  Text,
  useTheme,
  useBreakpoint,
  useToken,
  useBreakpointValue,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import {} from '@chakra-ui/icon';
import styled from 'styled-components';

import { get } from 'lodash';
const Wrapper = styled.div`
  .test {
    margin: 10px 0;
  }
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid black;
`;
function index() {
  const theme = useTheme();
  //  use specify property of theme
  const almostBlack = useToken('colors', ['gray.900']);

  /**
    * {
    onOpen: () => {
      console.log('custom on opem');
      // onOpen();
    },
  }
    */
  //  use Disclousure
  const { isOpen, onOpen, onClose } = useDisclosure();

  const breakPoint = useBreakpoint();
  const colorBox = useBreakpointValue({
    base: almostBlack,
    sm: 'blue',
    md: get(theme, 'colors.gray.200'),
    lg: 'red',
  });

  return (
    <>
      <Wrapper>
        <Text as="h3">
          breakpoint : <Badge bg={colorBox}>{breakPoint}</Badge>
        </Text>
        <Text as="h1" fontSize="lg" fontWeight="bold" my={12}>
          Responsive
        </Text>
        <Button colorScheme="facebook" variant="solid" onClick={onOpen}>
          open Modal
        </Button>
        <Box
          bg={colorBox}
          w={20}
          h={20}
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="white">hola</Text>
        </Box>
      </Wrapper>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>My modal</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sunt!
          </ModalBody>
          <ModalFooter>
            <HStack spacing={5}>
              <Button colorScheme="green">cancel</Button>
              <Button colorScheme="blue">Ok</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default index;
