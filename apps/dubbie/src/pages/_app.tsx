import { AppProps } from "next/app";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "@Common";
import { css } from "@emotion/react";
import "swiper/swiper.scss";
import "swiper/components/thumbs/thumbs.min.css";
import "swiper/components/navigation/navigation.min.css";
import { RequestCLientProvider } from "@dubbie/core/contexts/requetContex";
import { Global, ThemeProvider } from "@emotion/react";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
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
                `}
              />
            </ChakraProvider>
          </RequestCLientProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
