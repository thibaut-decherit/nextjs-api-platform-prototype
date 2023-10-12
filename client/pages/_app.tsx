import "@/components/axios";
import Layout from "@/components/Layout";
import type {AppProps} from "next/app";
import {DehydratedState} from "react-query";

const App = (
  {
    Component,
    pageProps,
  }: AppProps<{ dehydratedState: DehydratedState }>
) => (
  <Layout dehydratedState={pageProps.dehydratedState}>
    <Component {...pageProps}/>
  </Layout>
);

export default App;
