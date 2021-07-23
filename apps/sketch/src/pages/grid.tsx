import React from 'react';
import { Grid, GridItem, Box, Text } from '@chakra-ui/react';

function GridLayout() {
  return (
    <Grid
      gap={1}
      w="100%"
      justifyItems="center"
      templateColumns="repeat(5,1fr)"
    >
      {Array(15)
        .fill(null)
        .map(() => (
          <GridItem
            bg="black"
            d="flex"
            justifyContent="center"
            alignItems="center"
            w="200px"
            h="200px"
          >
            <Text style={{ color: 'white' }} fontStyle="italic">
              hello
            </Text>
          </GridItem>
        ))}
    </Grid>
  );
}

export default GridLayout;
