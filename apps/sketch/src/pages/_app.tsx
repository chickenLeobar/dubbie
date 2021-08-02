import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { Global, css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Global
            styles={css`
              body {
                overflow-x: hidden;
              }
            `}
          />
        </ChakraProvider>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
