import React, { useState } from 'react';
import {
  Box,
  Badge,
  Text,
  useTheme,
  useBreakpoint,
  useToken,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';

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

import { usePrev } from '@hooks/use-prev';
function index() {
  const theme = useTheme();
  //  use specify property of theme
  const almostBlack = useToken('colors', ['gray.900']);
  const breakPoint = useBreakpoint();
  const [value, setValue] = useState('hello');
  const preValue = usePrev(value);

  const colorBox = useBreakpointValue({
    base: almostBlack,
    sm: 'blue',
    md: get(theme, 'colors.gray.200'),
    lg: 'red',
  });

  return (
    <>
      <Text>Prev Value : {preValue}</Text>
      <Text>curren : {value}</Text>
      <Wrapper>
        <Text as="h3">
          breakpoint : <Badge bg={colorBox}>{breakPoint}</Badge>
        </Text>
        <Text as="h1" fontSize="lg" fontWeight="bold" my={12}>
          Responsive
        </Text>
        <Button
          onClick={() => setValue('uwu' + Math.floor(Math.random() * 100))}
          colorScheme="facebook"
          variant="solid"
        >
          changue state
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
    </>
  );
}

export default index;
