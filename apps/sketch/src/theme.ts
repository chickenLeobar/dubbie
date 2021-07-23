import { extendTheme } from '@chakra-ui/react';
// import { mode, StyleConfig } from '@chakra-ui/theme-tools';

// StyleConfig
const Button = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: '600', // Normally, it is "semibold"
    borderRadius: '2px',
    width: '110px',
    widht: '150px',
    fontSize: '20px',
    _hover: {
      transform: 'scale(1.06)',
    },
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    xl: {
      h: '80px',
      fontSize: 'lg',
      px: '32px',
    },
  },
  // 3. We can add a new visual variant
  variants: {
    brand: {},
    black: {
      bg: 'black',
      color: 'white',
      _hover: {
        bg: 'white',
        color: 'black',
        border: '1px solid black',
      },
    },
    white: {
      bg: 'white',
      color: 'black',
      border: '1px solid white',
      _hover: {
        bg: 'black',
        color: 'white',
        border: '1px solid white',
      },
    },

    // 4. We can override existing variants
  },
};
export default extendTheme({
  fonts: {
    heading: 'Nunito Sans',
    body: 'Nunito Sans',
  },
  components: {
    Button,
  },
});
