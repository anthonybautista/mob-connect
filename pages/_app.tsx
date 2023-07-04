import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from 'next/head'

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Avalanche;

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThirdwebProvider
          activeChain={activeChainId}
          authConfig={{
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
            authUrl: "/api/thirdweb-auth",
          }}
      >
        <SessionProvider session={pageProps.session}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>The Mob - Connect</title>
          </Head>
          <Component {...pageProps} />
        </SessionProvider>
      </ThirdwebProvider>
  );
}

export default MyApp;