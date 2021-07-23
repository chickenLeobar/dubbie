import React from 'react';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
function theme() {
  return (
    <div>
      <Button variant="black">Hola</Button>
      <Box bg={'black'} height="500" width="500">
        <Button variant="white">Hola</Button>
      </Box>
    </div>
  );
}

export default theme;
