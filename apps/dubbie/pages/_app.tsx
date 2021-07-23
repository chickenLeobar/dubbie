import { AppProps } from 'next/app';
import Head from 'next/head';

import './styles.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to dubbie!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
