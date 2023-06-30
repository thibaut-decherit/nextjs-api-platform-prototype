import type {AppProps} from "next/app";
import {DehydratedState} from "react-query";
import "../components/axios";
import Layout from "../components/Layout";

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
