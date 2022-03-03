import "../styles/globals.css";
import "../styles/calendar.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

const components = {
  Drawer: {
    variants: {
      alwaysOpen: {
        parts: ["dialog, dialogContainer"],
        dialog: {
          pointerEvents: "auto",
        },
        dialogContainer: {
          pointerEvents: "none",
        },
      },
    },
  },
};

const fonts = {
  heading: "Source Sans Pro",
  body: "Source Sans Pro",
};
const theme = extendTheme({ components, fonts });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
