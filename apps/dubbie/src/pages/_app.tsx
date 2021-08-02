import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@Common";
import { css } from "@emotion/react";
import "swiper/swiper.scss";
import "swiper/components/thumbs/thumbs.min.css";
import "swiper/components/navigation/navigation.min.css";

// import '@fontsource/nunito-sans';
import { Global, ThemeProvider } from "@emotion/react";
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <Global
          styles={css`
            body {
              overflow-x: hidden;
            }
          `}
        />
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
