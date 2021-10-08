import React from 'react';
import {
  Box,
  Image,
  Badge,
  Stack,
  Text,
  HStack,
  Button,
  ButtonGroup,
  useTheme,
  useBreakpoint,
} from '@chakra-ui/react';
import {} from '@chakra-ui/icon';
import styled from 'styled-components';
import { MdStar } from 'react-icons/md';
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

  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Wrapper>
      <Text as="h1" fontSize="lg" fontWeight="bold" my={12}>
        Chakra UI is amazing
      </Text>
      <Box
        cursor="pointer"
        sx={{
          transition: '0.1s ease',
          '&:hover': {
            transform: 'scale(1.08)',
          },
        }}
        maxW="sm"
        borderWidth="2px"
        borderRadius="lg"
      >
        <Image src={property.imageUrl} alt={property.imageAlt}></Image>
        <Box p={6}>
          <Stack direction="row" alignItems="baseline">
            <Badge borderRadius="full">new</Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              fontSize="xs"
              ml="2"
              isTruncated
              lineHeight=""
              textTransform="uppercase"
            >
              {property.beds} beds &bull; {property.beds} baths
            </Box>
          </Stack>
          <Stack my="1">
            <Box fontWeight="bold" as="h4" fontSize="sm">
              {property.title}
            </Box>
          </Stack>
          <Box>
            {property.formattedPrice}
            <Box as="span" fontSize="sm" color="gray.600">
              /wk
            </Box>
          </Box>

          <HStack my={2}>
            {Array(5)
              .fill(null)
              .map((_, i) => {
                return <MdStar key={i} />;
              })}
            <Text as="span" fontSize="xs" color="gray.400">
              {property.rating} reviews
            </Text>
          </HStack>
        </Box>
      </Box>
      <Box
        bg="gray.300"
        w={'md'}
        py={'3'}
        my={10}
        d="flex"
        justifyContent="center"
        borderRadius="full"
      >
        <ButtonGroup spacing={6}>
          <Button colorScheme="facebook">toggle theme</Button>
          <Button colorScheme="green">Green :)</Button>
        </ButtonGroup>
      </Box>
    </Wrapper>
  );
}

export default index;
