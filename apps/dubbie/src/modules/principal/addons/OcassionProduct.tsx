import React from 'react';
import styled from '@emotion/styled';
import { getToken } from '@Common';
import { Box, Stack, Heading, Flex, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
const Wrapper = styled.div`
  display: flex;
  background: ${getToken('colors.black')};
  flex-direction: row;
  width: 100%;
  padding: 30px 0;
  justify-content: space-around;
  color: ${getToken('colors.white')};
`;
const ContainerImage = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

function OcassionProduct() {
  return (
    <Wrapper>
      <Flex
        maxWidth="container.xl"
        width={'100%'}
        justifyContent="space-around"
      >
        <ContainerImage>
          <Image
            src={'/products/phones_rm.png'}
            width={500}
            height={450}
            objectFit="cover"
          />
        </ContainerImage>
        <Stack
          spacing={8}
          textAlign="left"
          justifyContent="flex-start"
          maxWidth="450px"
          mt={'10'}
        >
          <Heading w={'100%'} size="2xl">
            Lleva tu juego al siguiente nivel
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </Text>
          <Button variant="white">Comprar</Button>
        </Stack>
      </Flex>
    </Wrapper>
  );
}

export default OcassionProduct;
