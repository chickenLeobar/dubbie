import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@Common";
import { RequestCLientProvider } from "@dubbie/core/contexts/requetContex";
import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Cart } from "@dubbie/components/Cart";
import GlobalStyle from "@dubbie/globals/globalStyles";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import "swiper/swiper.scss";

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      {/* react query client */}
      <QueryClientProvider client={queryClient}>
        {/* Hydrate */}
        <Hydrate state={pageProps.dehydratedState}>
          <RequestCLientProvider>
            {/* chakra provider */}
            <ChakraProvider theme={theme}>
              {/* emotion */}

              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
                <Cart />
                <GlobalStyle />
              </ThemeProvider>
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
