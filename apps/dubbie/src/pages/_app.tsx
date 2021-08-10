import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@Common";
import { RequestCLientProvider } from "@dubbie/core/contexts/requetContex";
import { css, Global, ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import "swiper/swiper.scss";

// import { ReactQueryDevtools } from "react-query/devtools";

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RequestCLientProvider>
            <ChakraProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
              <Global
                styles={css`
                  body {
                    overflow-x: hidden;
                  }
                  #__next {
                    position: absolute;
                    top: 0;
                  }
                `}
              />
            </ChakraProvider>
          </RequestCLientProvider>
        </Hydrate>
        {/* cart is share between pages */}

        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
